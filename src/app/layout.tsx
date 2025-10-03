
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Announcement } from '@/components/layout/announcement';

export const metadata: Metadata = {
  title: 'FocusLinks',
  description: 'The world\'s largest eye care community to find, connect, and grow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={cn('antialiased bg-gray-50')}>
        <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
            <Announcement />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
