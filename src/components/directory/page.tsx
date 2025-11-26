
'use client';

import { Suspense } from 'react';
import DirectoryPageClient from './directory-client'; // Assuming you rename the original page content to this
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

function DirectoryPageSkeleton() {
  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1>Directory</h1>
        <p className="mb-8">Connect with peers in the global eye care community.</p>
        <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Skeleton className="w-full pl-12 h-12 rounded-full bg-white/50" />
            </div>
        </div>
      </header>
    </div>
  )
}

// This is the new page.tsx file
export default function DirectoryPage() {
  return (
    <Suspense fallback={<DirectoryPageSkeleton />}>
      <DirectoryPageClient />
    </Suspense>
  );
}
