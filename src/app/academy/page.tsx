
'use client';

import { webinars } from '@/lib/academy';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, UserCircle, PlayCircle, Tv, Radio, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { WebinarTime } from '@/components/webinar-time';
import { WebinarBanner } from '@/components/webinar-banner';
import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

export default function AcademyPage() {
  const [liveWebinars, setLiveWebinars] = useState<typeof webinars>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<typeof webinars>([]);
  const [pastWebinars, setPastWebinars] = useState<typeof webinars>([]);

  useEffect(() => {
    const now = new Date().getTime();
    
    const live: typeof webinars = [];
    const upcoming: typeof webinars = [];
    const past: typeof webinars = [];

    webinars.forEach(w => {
      const startTime = new Date(w.dateTime).getTime();
      const durationParts = w.duration.split(' ');
      const durationValue = parseInt(durationParts[0], 10);
      const endTime = startTime + (durationValue * 60 * 1000) + (3 * 60 * 60 * 1000); // 3-hour grace period

      if (now >= startTime && now < endTime) {
        live.push(w);
      } else if (now < startTime) {
        upcoming.push(w);
      } else {
        past.push(w);
      }
    });

    setLiveWebinars(live);
    setUpcomingWebinars(upcoming);
    setPastWebinars(past);
  }, []);

  return (
    <div className="bg-muted/40">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Academy & Events</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Stay at the forefront of vision care with expert-led sessions on the latest research, clinical techniques, and industry innovations.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Live Webinars */}
        {liveWebinars.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold font-headline mb-8 text-slate-800 flex items-center gap-3">
              <Radio className="h-8 w-8 text-red-500 animate-pulse" />
              Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveWebinars.map(webinar => (
                <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <Link href={`/academy/${webinar.id}`} className="block">
                    <div className="relative w-full aspect-video">
                      <WebinarBanner webinar={webinar} variant="card" />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                      <Link href={`/academy/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                        <WebinarTime dateTime={webinar.dateTime} />
                    </div>
                    
                    <Button asChild className="w-full mt-4" variant="destructive">
                      <Link href={`/academy/${webinar.id}`}>Join Live</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Webinars */}
        <section>
          <h2 className="text-3xl font-bold font-headline mb-8 text-slate-800">Upcoming Live Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWebinars.length > 0 ? upcomingWebinars.map(webinar => (
              <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <Link href={`/academy/${webinar.id}`} className="block">
                  <div className="relative w-full aspect-video">
                    <WebinarBanner webinar={webinar} variant="card" />
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                    <Link href={`/academy/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                      <WebinarTime dateTime={webinar.dateTime} />
                  </div>
                  
                  <Button asChild className="w-full mt-4">
                    <Link href={`/academy/${webinar.id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            )) : (
              <Card className="col-span-full">
                <CardContent className="p-8 text-center text-muted-foreground">No upcoming events scheduled. Please check back soon!</CardContent>
              </Card>
            )}
          </div>
        </section>

        {pastWebinars.length > 0 && (
          <>
            {/* Past Webinars */}
            <section>
              <h2 className="text-3xl font-bold font-headline mb-8 text-slate-800">On-Demand & Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastWebinars.map(webinar => (
                   <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <Link href={`/academy/${webinar.id}`} className="block">
                       <div className="relative w-full aspect-video">
                          <WebinarBanner webinar={webinar} variant="card" />
                       </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                        <Link href={`/academy/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mt-auto border-t pt-4">Originally aired: <WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} /></p>
                      
                      <Button asChild variant="secondary" className="w-full mt-4">
                        <Link href={`/academy/${webinar.id}`}>
                           <Info className="mr-2 h-4 w-4" />
                           View Details
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
