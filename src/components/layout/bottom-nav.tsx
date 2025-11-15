
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MessageSquare, Briefcase, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { webinars } from '@/lib/academy';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/directory', label: 'Directory', icon: Users },
  { href: '/events', label: 'Events', icon: Calendar, hasLiveIndicator: true },
  { href: '/forum', label: 'Forum', icon: MessageSquare },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
];


export function BottomNav() {
  const pathname = usePathname();
  const [hasUnseenLiveEvent, setHasUnseenLiveEvent] = useState(false);

  useEffect(() => {
    const liveWebinars = webinars.filter(w => {
      const startTime = new Date(w.dateTime).getTime();
      const isQuiz = w.id === 'eye-q-arena-2025';
      const durationParts = w.duration.split(' ');
      const durationValue = parseInt(durationParts[0], 10);
      const durationMultiplier = isQuiz ? (1000 * 60 * 60 * 24) : (1000 * 60);
      const endTime = startTime + (durationValue * durationMultiplier);
      return Date.now() >= startTime && Date.now() < endTime;
    });

    if (liveWebinars.length > 0) {
      const hasSeen = sessionStorage.getItem('seenLiveEvents');
      if (!hasSeen) {
        setHasUnseenLiveEvent(true);
      }
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/events') && hasUnseenLiveEvent) {
      sessionStorage.setItem('seenLiveEvents', 'true');
      setHasUnseenLiveEvent(false);
    }
  }, [pathname, hasUnseenLiveEvent]);

  // Hide bottom nav on login and membership pages for a cleaner look
  const hiddenPaths = ['/login', '/membership', '/profile/create'];
  if (hiddenPaths.some(p => pathname.startsWith(p))) {
    return null;
  }
  
  const isDetailPage = !['/', '/directory', '/events', '/forum', '/jobs'].includes(pathname) && pathname.split('/').length > 2;
  if(isDetailPage && !pathname.startsWith('/directory/')) {
    return null;
  }


  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-transparent">
      <div
        className="flex justify-center items-center relative transition-all duration-[450ms] ease-in-out w-auto"
      >
        <article
          className="border border-solid border-gray-200/80 w-full ease-in-out duration-500 left-0 rounded-2xl flex shadow-2xl shadow-black/30 bg-white/80 backdrop-blur-md"
        >
          {navItems.map((item) => {
             const isActive = (pathname === '/' && item.href === '/') || (item.href !== '/' && pathname.startsWith(item.href));
             const showPing = item.hasLiveIndicator && hasUnseenLiveEvent;
            return (
              <Link href={item.href} key={item.label} className="w-full group">
                <div
                  className={cn(
                    "relative w-full h-16 p-4 ease-in-out duration-300 flex flex-row gap-3 items-center justify-center text-slate-500 rounded-xl",
                    isActive && "shadow-lg border-primary/20 border"
                  )}
                >
                  <div className="relative">
                    <item.icon className={cn(
                        "w-7 h-7 ease-in-out duration-300 group-hover:scale-125 group-hover:text-primary",
                        isActive && "scale-125 text-primary"
                    )} />
                     {showPing && (
                        <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </article>
      </div>
    </div>
  );
}

