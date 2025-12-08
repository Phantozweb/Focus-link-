
import type { Metadata } from 'next';
import { IpdToolClientPage } from './ipd-tool-client-page';

export const metadata: Metadata = {
  title: 'AI-Powered IPD Measuring Tool | Focus Links',
  description: "Measure your interpupillary distance (PD) accurately with our free, AI-driven tool. Get precise results in seconds using your device's camera. Perfect for ordering glasses online.",
  keywords: ['IPD tool', 'pupillary distance measurement', 'free PD measurement', 'AI vision tool', 'online IPD calculator', 'Focus Links tools'],
  openGraph: {
    title: 'Free AI-Powered IPD Measuring Tool | Focus Links',
    description: 'Get an accurate pupillary distance (PD) measurement in seconds using your camera. Free, fast, and easy to use.',
    images: ['https://i.ibb.co/2Z5d3K0/ipd-tool-og-image.png'],
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Free AI-Powered IPD Measuring Tool | Focus Links',
    description: 'Get an accurate pupillary distance (PD) measurement in seconds using your camera. Free, fast, and easy to use.',
    images: ['https://i.ibb.co/2Z5d3K0/ipd-tool-og-image.png'],
  },
};

export default function IpdToolPage() {
  return <IpdToolClientPage />;
}
