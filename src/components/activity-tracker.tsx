
'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logActivity } from '@/lib/activity-logger';

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Avoid logging internal Next.js paths
    if (pathname.startsWith('/_next/')) {
        return;
    }
    
    logActivity(pathname, searchParams.toString());

  }, [pathname, searchParams]);

  return null; // This component does not render anything
}

export function ActivityTracker() {
    return (
        <Suspense fallback={null}>
            <Tracker />
        </Suspense>
    )
}
