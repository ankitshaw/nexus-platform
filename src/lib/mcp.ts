
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function createMcpServer() {
    const server = new McpServer({
        name: "Nexus Platform",
        version: "1.0.0",
    });

    server.tool(
        "add-two-numbers",
        { a: z.number(), b: z.number() },
        async ({ a, b }) => {
            return { content: [{ type: "text", text: String(a + b) }] };
        }
    );

    server.tool(
        "query_knowledge_base",
        { query: z.string(), fileId: z.string().optional() },
        async ({ query, fileId }) => {
            console.log(`MCP Query: "${query}" on file: ${fileId || 'ALL'}`);

            try {
                const { upstashIndex } = await import('@/lib/upstash');

                // 1. Search Upstash (Managed Embeddings)
                const results = await upstashIndex.query({
                    data: query, // Upstash generates embedding automatically
                    topK: 5,
                    filter: fileId ? `fileId = '${fileId}'` : undefined,
                    includeMetadata: true,
                });

                if (results.length === 0) {
                    return {
                        content: [{ type: "text", text: "No relevant information found in the knowledge base." }]
                    };
                }

                const context = results.map(r => r.metadata?.text).filter(Boolean).join('\n---\n');

                return {
                    content: [{
                        type: "text",
                        text: `Found ${results.length} relevant chunks:\n\n${context}`
                    }]
                };

            } catch (error: any) {
                console.error("Vector query error:", error);
                return {
                    content: [{ type: "text", text: `Error querying knowledge base: ${error.message}` }],
                    isError: true,
                };
            }
        }
    );

    return server;
}
