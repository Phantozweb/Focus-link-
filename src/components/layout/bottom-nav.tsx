'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MessageSquare, Briefcase, User, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/directory', label: 'Directory', icon: Users },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/community', label: 'Community', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  
  const hiddenPaths = ['/login', '/membership', '/profile/create'];
  if (hiddenPaths.some(p => pathname.startsWith(p))) {
    return null;
  }
  
  const isDetailPage = !navItems.map(item => item.href).includes(pathname) && pathname.split('/').length > 2;

  if (isDetailPage && !pathname.startsWith('/directory/')) {
      return null;
  }

  return (
    <div className="dock">
      {navItems.map((item) => {
        const isActive = (pathname === '/' && item.href === '/') || 
                         (item.href !== '/' && pathname.startsWith(item.href)) ||
                         (item.href === '/community' && (pathname.startsWith('/forum') || pathname.startsWith('/academy')));

        return (
          <Link href={item.href} key={item.label} className={cn("dock-item", isActive && "active")}>
            <item.icon className="dock-icon" />
            <span className="dock-label">{item.label}</span>
          </Link>
        )
      })}
    </div>
  );
}
