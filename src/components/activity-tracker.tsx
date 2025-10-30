
'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logActivity } from '@/lib/activity-logger';
import { allUsers } from '@/lib/data';
import { webinars } from '@/lib/academy';
import { demoJobs } from '@/lib/jobs';
import { demoDiscussions } from '@/lib/forum';


function getPageTitle(pathname: string): string {
    if (pathname === '/') return '🏠 Viewing Homepage';
    
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];

    if (pathname.startsWith('/profile/')) {
        const user = allUsers.find(u => u.id === lastPart);
        return `👤 Viewing Profile: **${user ? user.name : lastPart}**`;
    }
    if (pathname.startsWith('/events/')) {
        const event = webinars.find(e => e.id === lastPart);
        return `🗓️ Viewing Event: **${event ? event.title : lastPart}**`;
    }
    if (pathname.startsWith('/academy/')) {
        const event = webinars.find(e => e.id === lastPart);
        return `🗓️ Viewing Academy Event: **${event ? event.title : lastPart}**`;
    }
     if (pathname.startsWith('/jobs/')) {
        const job = demoJobs.find(j => j.id === lastPart);
        return `💼 Viewing Job: **${job ? job.title : lastPart}**`;
    }
    if (pathname.startsWith('/forum/')) {
        const discussion = demoDiscussions.find(d => d.id === lastPart);
        return `💬 Viewing Forum Post: **${discussion ? discussion.title : lastPart}**`;
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
