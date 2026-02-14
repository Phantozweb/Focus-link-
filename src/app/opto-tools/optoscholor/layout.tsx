
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OptoScholar – Optometry & Ophthalmology Research Engine',
  description: 'Access OptoScholar, the specialized clinical search engine for optometry and ophthalmology. 1M+ indexed articles. Built for students, clinicians, and researchers.',
  keywords: ['Optometry research engine', 'Ophthalmology search tool', 'Clinical optometry database', 'Evidence-based eye-care research', 'Optometry journal search', 'Vision science literature search', 'Peer-reviewed optometry articles'],
};

export default function OptoScholarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
