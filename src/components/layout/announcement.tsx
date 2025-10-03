
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Megaphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Announcement() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn(
      "bg-primary text-primary-foreground",
      "relative transition-all duration-300 ease-in-out",
      isOpen ? "py-2" : "py-0"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Megaphone className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">
              <span className="hidden sm:inline">Announcing our new webinar series!</span>
              <Link href="/webinars" className="underline hover:text-blue-200 ml-2">
                View Schedule
              </Link>
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-7 w-7 rounded-full hover:bg-white/20"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
