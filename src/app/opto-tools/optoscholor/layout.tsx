
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OptoScholar | Optometry Research Index | Focus Links',
  description: 'Search over 1 million indexed optometry articles, journals, and clinical studies with OptoScholar. Your essential research tool for eye care.',
  keywords: ['optometry research', 'ophthalmology articles', 'eye care journal index', 'clinical studies eye', 'vision science database', 'OptoScholar'],
};

export default function OptoScholarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
