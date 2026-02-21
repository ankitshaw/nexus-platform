
import { inngest } from './client';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { google } from '@ai-sdk/google';
import { embedMany } from 'ai';
import { upstashIndex } from '@/lib/upstash';

export const processDocument = inngest.createFunction(
    { id: 'process-document' },
    { event: 'ingest.document' },
    async ({ event, step }) => {
        const { text, fileId } = event.data;

        // 1. Chunk the text
        const chunks = await step.run('split-text', async () => {
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            // Convert to simple array of strings for embedding
            const docs = await splitter.createDocuments([text]);
            return docs.map(d => d.pageContent);
        });

        // 2. Reduce cost by checking if text is too short or empty
        if (!chunks.length) return { success: true, count: 0 };

        // 3. Generate Embeddings (Google Gemini)
        const { embeddings } = await step.run('generate-embeddings', async () => {
            const { embeddings } = await embedMany({
                model: google.textEmbeddingModel('gemini-embedding-001'),
                values: chunks,
            });
            return { embeddings };
        });

        // 4. Store in Upstash Vector (Metric: Cosine, Dim: 768)
        await step.run('store-in-upstash', async () => {
            const vectors = chunks.map((chunk, i) => ({
                id: `${fileId}-${i}`,
                vector: embeddings[i],
                metadata: {
                    text: chunk,
                    fileId: fileId
                }
            }));

            // Batch upsert (Upstash handles up to 1000 usually, safely slice if needed in prod)
            await upstashIndex.upsert(vectors);
            return { count: vectors.length };
        });

        // 5. Store in Graph (Neo4j) - For Structural Retrieval
        await step.run('store-in-graph', async () => {
            const { getGraphSession } = await import('@/lib/graph');
            const session = await getGraphSession();

            try {
                await session.run(
                    `
                    MERGE (d:Document {id: $fileId})
                    WITH d
                    UNWIND $data as item
                    CREATE (c:Chunk {id: item.id})
                    SET c.text = item.text
                    MERGE (d)-[:HAS_CHUNK]->(c)
                    `,
                    {
                        fileId,
                        data: chunks.map((c, i) => ({
                            id: `${fileId}-${i}`,
                            text: c
                        })),
                    }
                );
            } finally {
                await session.close();
            }

            return { success: true };
        });

        return { success: true, chunks: chunks.length };
    }
);
