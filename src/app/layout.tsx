
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexus AI Platform',
  description: 'Integrated AI Developer Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <div className="flex flex-col flex-1 w-full">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px] lg:px-6 md:hidden">
              <span className="font-semibold">Nexus Platform</span>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
