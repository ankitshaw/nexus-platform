'use client';

import { useChat } from '@ai-sdk/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PlaygroundPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as any;

    return (
        <div className="flex h-screen w-full flex-col bg-muted/40 p-4 md:p-8">
            <div className="mx-auto grid w-full max-w-4xl gap-4">
                <Card className="h-[80vh] flex flex-col">
                    <CardHeader>
                        <CardTitle>Nexus Gateway Playground</CardTitle>
                        <CardDescription>
                            Test the AI Gateway proxy directly. Requests are routed through <code>/api/chat</code>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((m: any) => (
                                    <div
                                        key={m.id}
                                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                    >
                                        <div
                                            className={`rounded-lg px-4 py-2 max-w-[80%] ${m.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                                }`}
                                        >
                                            <p className="text-sm">{m.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-muted rounded-lg px-4 py-2">
                                            <p className="text-sm animate-pulse">Thinking...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Send a message..."
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={isLoading}>
                                    Send
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
