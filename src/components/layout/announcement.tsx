'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Megaphone, X, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { webinars, type Webinar } from '@/lib/academy';

export function Announcement() {
  const [isOpen, setIsOpen] = useState(true);
  const [liveWebinars, setLiveWebinars] = useState<Webinar[]>([]);

  useEffect(() => {
    const now = new Date().getTime();
    
    const live = webinars.filter(w => {
      const startTime = new Date(w.dateTime).getTime();
      const durationParts = w.duration.split(' ');
      const durationValue = parseInt(durationParts[0], 10);
      const endTime = startTime + (durationValue * 60 * 1000) + (3 * 60 * 60 * 1000); // 3-hour grace period
      return now >= startTime && now < endTime;
    });

    setLiveWebinars(live);
  }, []);

  if (!isOpen) {
    return null;
  }
  
  const AnnouncementContent = () => {
    if (liveWebinars.length > 0) {
      const liveWebinar = liveWebinars[0];
      return (
        <div className="flex items-center gap-3">
          <PlayCircle className="h-5 w-5 flex-shrink-0 text-green-300" />
          <p className="text-sm font-medium">
            <span className="hidden sm:inline font-bold">LIVE NOW:</span> {liveWebinar.title}
            <Link href={`/academy/${liveWebinar.id}`} className="underline hover:text-blue-200 ml-2 font-bold">
              Join Session
            </Link>
          </p>
        </div>
      );
    }
    return (
     <div className="flex items-center gap-3">
        <Megaphone className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">
          <span className="hidden sm:inline">Announcing our new Academy!</span>
          <Link href="/academy" className="underline hover:text-blue-200 ml-2">
            View Schedule
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-primary text-primary-foreground",
      "relative transition-all duration-300 ease-in-out w-full top-0 z-50",
      isOpen ? "py-2" : "py-0"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee-fast">
              <div className="flex-shrink-0 pr-12">
                <AnnouncementContent />
              </div>
              <div className="flex-shrink-0 pr-12" aria-hidden="true">
                <AnnouncementContent />
              </div>
              <div className="flex-shrink-0 pr-12" aria-hidden="true">
                <AnnouncementContent />
              </div>
               <div className="flex-shrink-0 pr-12" aria-hidden="true">
                <AnnouncementContent />
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-7 w-7 rounded-full hover:bg-white/20 flex-shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
