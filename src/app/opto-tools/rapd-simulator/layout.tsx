
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive RAPD Simulator for Optometry Students & Professionals',
  description: 'Master the swinging flashlight test and enhance your clinical skills with our free, interactive RAPD simulator. Designed for both students and seasoned optometrists.',
  keywords: ['RAPD', 'Relative Afferent Pupillary Defect', 'Optometry', 'Swinging Flashlight Test', 'Clinical Skills', 'Optometry Student', 'Ophthalmology'],
  openGraph: {
    title: 'Interactive RAPD Simulator | Focus Links',
    description: 'A free, interactive tool for practicing the swinging flashlight test to identify Relative Afferent Pupillary Defects.',
    url: 'https://focus-links.com/opto-tools/rapd-simulator',
    siteName: 'Focus Links',
    images: [
      {
        url: 'https://i.ibb.co/bX0vV53/rapd-og-image.png',
        width: 1200,
        height: 630,
        alt: 'RAPD Simulator in Action',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive RAPD Simulator for Optometry Students & Professionals',
    description: 'Practice identifying RAPD with an interactive swinging flashlight test simulator.',
    images: ['https://i.ibb.co/bX0vV53/rapd-og-image.png'],
  },
};

export default function RapdSimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
