
'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logActivity } from '@/lib/activity-logger';

function getPageTitle(pathname: string): string {
    if (pathname === '/') return '🏠 Viewing Homepage';
    
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];

    if (pathname.startsWith('/profile/')) {
        return `👤 Viewing Profile: **${lastPart}**`;
    }
    if (pathname.startsWith('/events/')) {
         return `🗓️ Viewing Event: **${lastPart}**`;
    }
    if (pathname.startsWith('/academy/')) {
         return `🗓️ Viewing Academy Event: **${lastPart}**`;
    }
     if (pathname.startsWith('/jobs/')) {
         return `💼 Viewing Job: **${lastPart}**`;
    }
    if (pathname.startsWith('/forum/')) {
         return `💬 Viewing Forum Post: **${lastPart}**`;
    }

    // Generic fallback
    const pageName = lastPart.replace(/-/g, ' ');
    const capitalized = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return `📄 Navigating to: **${capitalized}**`;
}


function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Avoid logging internal Next.js paths
    if (pathname.startsWith('/_next/')) {
        return;
    }
    
    const queryString = searchParams.toString();
    const fullUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
    
    let message = getPageTitle(pathname);
    if(queryString) {
        message += `\n*Query:* \`${queryString}\``
    }

    logActivity(message);

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
