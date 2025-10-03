
import { webinars } from '@/lib/academy';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, UserCircle, PlayCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { WebinarTime } from '@/components/webinar-time';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
            {upcomingWebinars.length > 0 ? upcomingWebinars.map(webinar => (
              <Card key={webinar.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="relative h-64">
                  <Image src={webinar.imageUrl} alt={webinar.title} fill className="object-cover" data-ai-hint="presentation person" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                     <div className="flex flex-wrap gap-2 mb-3">
                      {webinar.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 font-headline">{webinar.title}</h3>
                    
                    <div className="space-y-3 text-sm text-muted-foreground mt-4">
                      <WebinarTime dateTime={webinar.dateTime} />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />

                  <div className="flex items-center gap-3 mb-6">
                    <Avatar>
                        <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} data-ai-hint="portrait person" />
                        <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-slate-700">{webinar.speaker.name}</p>
                        <p className="text-xs text-muted-foreground">{webinar.speaker.title}</p>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastWebinars.map(webinar => (
                  <Card key={webinar.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row">
                     <Image src={webinar.imageUrl} alt={webinar.title} width={400} height={400} className="w-full sm:w-48 h-48 sm:h-auto object-cover" data-ai-hint="conference room" />
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {webinar.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2 font-headline">{webinar.title}</h3>
                      <p className="text-muted-foreground text-sm flex-grow mb-4">Originally aired: <WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} /></p>
                      
                      <Button asChild variant="secondary" className="w-full sm:w-auto mt-auto">
                        <Link href={`/academy/${webinar.id}`}>
                           <PlayCircle className="mr-2 h-4 w-4" />
                           Watch Recording
                        </Link>
                      </Button>
                    </CardContent>
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
