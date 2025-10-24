
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Announcement } from '@/components/layout/announcement';
import { BottomNav } from '@/components/layout/bottom-nav';
import { TooltipProvider } from '@/components/ui/tooltip';


export const metadata: Metadata = {
  title: {
    default: 'Focus Links | Global Eye Care Community',
    template: '%s | Focus Links',
  },
  description: 'The world\'s largest eye care community for students, optometrists, and industry professionals to find, connect, and grow. Explore our directory and academy.',
  verification: {
    google: 'fSr_QLZTbWD5LoE_1W24DXS2WzwufIajevt9RIR2ijE',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Focus Links',
  url: 'https://focuslinks.pro',
  logo: 'https://focuslinks.pro/logo.png', // Assuming you have a logo at this URL
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@focuslink.com',
  },
  sameAs: [
    'https://www.linkedin.com/company/focus-links'
  ]
};

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Focus Links',
    url: 'https://focuslinks.pro',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://focuslinks.pro/directory/all?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="google-site-verification" content="fSr_QLZTbWD5LoE_1W24DXS2WzwufIajevt9RIR2ijE" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={cn('antialiased bg-gray-50')}>
        <TooltipProvider>
            <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
                <Announcement />
                <Header />
                <main className="flex-1 pb-20 md:pb-0">
                  {children}
                </main>
                <div className="hidden md:block">
                  <Footer />
                </div>
                <BottomNav />
            </div>
            <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
