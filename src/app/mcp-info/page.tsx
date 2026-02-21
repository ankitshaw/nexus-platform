'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Terminal, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function McpInfoPage() {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">MCP Server</h2>
                <p className="text-muted-foreground">
                    Connect your AI agents (Claude Desktop, Cursor, etc.) to Nexus Platform.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Connect via SSE</CardTitle>
                        <CardDescription>
                            Use this endpoint to connect web-compatible MCP clients.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg flex items-center justify-between font-mono text-sm">
                            <span>/api/mcp</span>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard('/api/mcp')}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Supports standard Model Context Protocol over Server-Sent Events (SSE).
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Local Development</CardTitle>
                        <CardDescription>
                            Run a local tunnel to expose your localhost to the internet.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-black text-white p-4 rounded-lg font-mono text-sm space-y-2">
                            <div className="flex items-center gap-2">
                                <Terminal className="h-4 w-4" />
                                <span>ngrok http 3000</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Then use the generated URL (e.g., <code>https://xyz.ngrok.io/api/mcp</code>) in Claude Desktop.
                        </p>
                        <Button variant="outline" className="w-full">
                            Download Client Script (Python)
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
