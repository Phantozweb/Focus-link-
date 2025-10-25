
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MessageSquare, Briefcase, Calendar, User as ProfileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/directory', label: 'Directory', icon: Users },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/forum', label: 'Forum', icon: MessageSquare },
  { href: '/profile', label: 'Profile', icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on login and membership pages for a cleaner look
  if (pathname === '/login' || pathname === '/membership') {
    return null;
  }

  // Hide on specific sub-pages like an individual profile or event
  const isDetailPage = pathname.split('/').length > 2 && (pathname.startsWith('/profile/') || pathname.startsWith('/events/') || pathname.startsWith('/jobs/') || pathname.startsWith('/forum/'));
  if (isDetailPage && pathname !== '/profile/create') {
      return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = (pathname === '/' && item.href === '/') || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-3 hover:bg-gray-50 group',
                isActive ? 'text-primary' : 'text-gray-500'
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[11px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
