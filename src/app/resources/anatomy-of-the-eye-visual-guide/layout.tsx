
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anatomy of the Eye: A Visual Guide for Optometry Students | Focus Links',
  description: 'Explore the complete anatomy of the human eye from anterior to posterior. This comprehensive study guide for optometry students covers the cornea, lens, retina, and all major structures with detailed mind maps.',
};

export default function AnatomyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
