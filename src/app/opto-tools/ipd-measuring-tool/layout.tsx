import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Powered IPD Measurement Tool | Focus Links',
  description: 'Use our free, AI-driven IPD Measure Pro tool to accurately measure your interpupillary distance using your device\'s camera. A fast, reliable clinical tool for eye care professionals and students.',
  keywords: ['IPD measurement tool', 'interpupillary distance calculator', 'PD meter online', 'AI eye measurement', 'optometry tools', 'vision screening', 'virtual try-on', 'Focus Links'],
  openGraph: {
    title: 'Free AI-Powered IPD Measurement Tool | Focus Links',
    description: 'Accurately measure interpupillary distance online with your webcam. A private, secure, and easy-to-use clinical tool for the eye care community.',
    url: 'https://focuslinks.in/opto-tools/ipd-measuring-tool',
    siteName: 'Focus Links',
    images: [
      {
        url: 'https://i.ibb.co/Ld8d5wG/ipd-og-image.png',
        width: 1200,
        height: 630,
        alt: 'IPD Measurement Tool Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI-Powered IPD Measurement Tool | Focus Links',
    description: 'Accurately measure interpupillary distance online with your webcam. A private, secure, and easy-to-use clinical tool for the eye care community.',
    images: ['https://i.ibb.co/Ld8d5wG/ipd-og-image.png'],
  },
};

export default function IpdToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
