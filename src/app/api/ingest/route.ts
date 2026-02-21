import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { text, fileId } = await req.json();

    if (!text || !fileId) {
        return NextResponse.json({ error: 'Missing text or fileId' }, { status: 400 });
    }

    await inngest.send({
        name: 'ingest.document',
        data: {
            text,
            fileId,
        },
    });

    return NextResponse.json({ success: true, message: 'Ingestion started' }, { status: 202 });
}
