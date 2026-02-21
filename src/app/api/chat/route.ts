
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Use streaming response
        const result = await streamText({
            model: google('gemini-flash-latest'),
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        return new Response(JSON.stringify({
            error: "Chat Error",
            details: error.message,
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
