
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Announcement } from '@/components/layout/announcement';
import { BottomNav } from '@/components/layout/bottom-nav';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ActivityTracker } from '@/components/activity-tracker';


export const metadata: Metadata = {
  metadataBase: new URL('https://focuslinks.in'),
  title: {
    default: 'Focus Links | Global Eye Care Community',
    template: '%s | Focus Links',
  },
  description: "Join Focus Links, the world's largest digital ecosystem for the eye care industry. Connect with optometrists, students, and organizations, explore clinical cases, and advance your career through our global directory and events.",
  verification: {
    google: 'fSr_QLZTbWD5LoE_1W24DXS2WzwufIajevt9RIR2ijE',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: [
      {
        rel: 'icon',
        url: 'https://i.ibb.co/pwnL1Xy/IMG-20251025-WA0014.jpg',
        sizes: '32x32',
      },
    ],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Focus Links',
  url: 'https://focuslinks.in',
  logo: 'https://i.ibb.co/cKdXV9gV/IMG-20251025-WA0014.jpg',
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
    url: 'https://focuslinks.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://focuslinks.in/directory/all?q={search_term_string}'
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
        <meta name="google-site-verification" content="8mO8b4Ylc2hheiV-tqdNspyLlP22f8oE8-M8PRiab-U" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Public+Sans:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&family=Ms+Madi&display=swap" rel="stylesheet" />
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
                <Footer />
                <BottomNav />
            </div>
            <Toaster />
        </TooltipProvider>
        <ActivityTracker />
      </body>
    </html>
  );
}
