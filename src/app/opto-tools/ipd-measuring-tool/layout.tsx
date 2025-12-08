
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IPD Measuring Tool | Focus Links',
  description: 'Measure your interpupillary distance (IPD) accurately using your device camera and our advanced AI-powered face detection technology. A free tool for eye care professionals and patients.',
};

export default function IPDToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  );
}
