
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function listModels() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach((m: any) => {
                if (m.name.includes("gemini")) {
                    console.log(`- ${m.name} (${m.supportedGenerationMethods?.join(', ')})`);
                }
            });
        } else {
            console.log("Error:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

listModels();
