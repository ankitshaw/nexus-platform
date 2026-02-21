import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    console.log("API Key loaded:", apiKey ? apiKey.slice(0, 10) + "..." : "Length: " + (apiKey?.length || 0));

    try {
        const { text } = await generateText({
            model: google('gemini-2.5-pro'),
            prompt: 'Say hello!',
        });

        console.log("Response:", text);

        const { embed } = await import('ai');
        const { embedding } = await embed({
            model: google.textEmbeddingModel('gemini-embedding-001'),
            value: 'Hello world',
        });
        console.log("Embedding generated:", embedding.length);

    } catch (error) {
        console.error("Error:", error);
    }
}

main();
