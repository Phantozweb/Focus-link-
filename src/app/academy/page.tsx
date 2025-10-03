

import { webinars } from '@/lib/academy';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, UserCircle, PlayCircle, Tv } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { WebinarTime } from '@/components/webinar-time';
import { WebinarBanner } from '@/components/webinar-banner';

export default function AcademyPage() {
  const now = new Date();
  const upcomingWebinars = webinars.filter(w => new Date(w.dateTime) > now);
  const pastWebinars = webinars.filter(w => new Date(w.dateTime) <= now);

  return (
    <div className="bg-muted/40">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Focus Links Academy</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Stay at the forefront of vision care with expert-led sessions on the latest research, clinical techniques, and industry innovations.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Upcoming Webinars */}
        <section>
          <h2 className="text-3xl font-bold font-headline mb-8 text-slate-800">Upcoming Live Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWebinars.length > 0 ? upcomingWebinars.map(webinar => (
              <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <Link href={`/academy/${webinar.id}`} className="block">
                  <div className="relative w-full aspect-video">
                    <WebinarBanner webinar={webinar} variant="card" />
                     <div className="absolute top-2 left-2 z-20">
                         <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm flex items-center gap-1.5">
                            <Tv className="h-3 w-3" />
                            Live Event
                        </Badge>
                     </div>
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
              <p className="text-muted-foreground col-span-full text-center">No upcoming events scheduled. Please check back soon!</p>
            )}
          </div>
        </section>

        {pastWebinars.length > 0 && (
          <>
            <Separator className="my-16" />
            {/* Past Webinars */}
            <section>
              <h2 className="text-3xl font-bold font-headline mb-8 text-slate-800">Watch On-Demand</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastWebinars.map(webinar => (
                   <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <Link href={`/academy/${webinar.id}`} className="block">
                       <div className="relative w-full aspect-video">
                          <WebinarBanner webinar={webinar} variant="card" />
                           <div className="absolute top-2 left-2 z-20">
                               <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm flex items-center gap-1.5">
                                  <Tv className="h-3 w-3" />
                                  On-Demand
                              </Badge>
                           </div>
                       </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                        <Link href={`/academy/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mt-auto border-t pt-4">Originally aired: <WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} /></p>
                      
                      <Button asChild variant="secondary" className="w-full mt-4">
                        <Link href={`/academy/${webinar.id}`}>
                           <PlayCircle className="mr-2 h-4 w-4" />
                           Watch Recording
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
