
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Physiology of the Eye: Visual Guide | Focus Links',
  description: 'Explore the complete physiology of the human eye. This comprehensive study guide for optometry students covers key functions with detailed mind maps.',
};

export default function PhysiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
