'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function DocumentsPage() {
    const [text, setText] = useState('');
    const [fileId, setFileId] = useState('doc-1');
    const [loading, setLoading] = useState(false);

    const handleIngest = async () => {
        if (!text) {
            toast.error('Please enter some text');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/ingest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, fileId }),
            });

            if (res.ok) {
                toast.success('Ingestion started! Check Inngest dashboard.');
                setText('');
            } else {
                toast.error('Failed to start ingestion');
            }
        } catch (e) {
            toast.error('Error submitting document');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full flex-col bg-muted/40 p-4 md:p-8">
            <div className="mx-auto grid w-full max-w-4xl gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Document Ingestion</CardTitle>
                        <CardDescription>
                            Upload text to be processed by the Serverless GraphRAG pipeline.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="fileId">File ID</Label>
                            <Input
                                id="fileId"
                                value={fileId}
                                onChange={(e) => setFileId(e.target.value)}
                                placeholder="doc-123"
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="text">Content</Label>
                            <Textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste document text here..."
                                className="min-h-[200px]"
                            />
                        </div>
                        <Button onClick={handleIngest} disabled={loading}>
                            {loading ? 'Starting Ingestion...' : 'Start Ingestion Workflow'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
