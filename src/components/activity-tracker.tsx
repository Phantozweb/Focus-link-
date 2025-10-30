
'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logActivity } from '@/lib/activity-logger';

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    // Avoid logging very frequent or uninteresting paths if needed
    if (pathname.startsWith('/_next/')) {
        return;
    }

    logActivity(`:mag: Page view: **${fullUrl}**`);

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
