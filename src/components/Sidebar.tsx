'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Zap, Box, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const sidebarItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Playground', href: '/playground', icon: Zap },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'MCP Server', href: '/mcp-info', icon: Box },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen flex-col border-r bg-muted/20 w-64 hidden md:flex">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Activity className="h-6 w-6 text-primary" />
                    <span className="">Nexus Platform</span>
                </Link>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4 gap-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                pathname === item.href
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card className="bg-muted/50 border-0 shadow-none">
                    <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Pro Plan</CardTitle>
                        <CardDescription className="text-xs">
                            Using Google Gemini 1.5 Pro
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                        <Button size="sm" className="w-full" variant="secondary">
                            Upgrade
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


