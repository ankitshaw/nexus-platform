import { NextRequest } from 'next/server';
import { createMcpServer } from '@/lib/mcp';
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

interface Session {
    transport: NextJSSETransport;
    server: ReturnType<typeof createMcpServer>;
}

// Global session store (Note: In production serverless, use Redis)
// This works for local dev or single-instance deployments
const sessions = new Map<string, Session>();

class NextJSSETransport implements Transport {
    private controller: ReadableStreamDefaultController | null = null;
    onmessage?: (message: JSONRPCMessage) => void;
    onclose?: () => void;
    onerror?: (error: Error) => void;

    constructor(public sessionId: string) { }

    setController(controller: ReadableStreamDefaultController) {
        this.controller = controller;
    }

    async start(): Promise<void> {
        // Ready to send
    }

    async send(message: JSONRPCMessage): Promise<void> {
        if (this.controller) {
            this.controller.enqueue(
                `event: message\ndata: ${JSON.stringify(message)}\n\n`
            );
        }
    }

    async close(): Promise<void> {
        if (this.controller) {
            this.controller.close();
        }
        this.onclose?.();
    }

    handlePostMessage(message: JSONRPCMessage) {
        this.onmessage?.(message);
    }
}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const sessionId = crypto.randomUUID();
    const transport = new NextJSSETransport(sessionId);

    const stream = new ReadableStream({
        start(controller) {
            transport.setController(controller);
            // Send endpoint event
            const endpoint = `/api/mcp?sessionId=${sessionId}`;
            controller.enqueue(`event: endpoint\ndata: ${endpoint}\n\n`);
        },
        cancel() {
            transport.close();
            sessions.delete(sessionId);
        },
    });

    const server = createMcpServer();
    await server.connect(transport);

    sessions.set(sessionId, { transport, server });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId || !sessions.has(sessionId)) {
        return new Response('Session not found', { status: 404 });
    }

    const session = sessions.get(sessionId)!;
    const message = await req.json();

    await session.transport.handlePostMessage(message);

    return new Response('Accepted', { status: 202 });
}
