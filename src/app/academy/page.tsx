
'use client';

import { webinars } from '@/lib/academy';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, UserCircle, PlayCircle, Tv, Radio, Info, Users, Trophy, BookOpen, Headphones, FolderOpen, Newspaper, FileText, Download, Search } from 'lucide-react';
import Link from 'next/link';
import { WebinarTime } from '@/components/webinar-time';
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AudioPlayer } from '@/components/audio-player';
import { Skeleton } from '@/components/ui/skeleton';


type AudioSeries = {
  id: string;
  title: string;
  thumbnailUrl: string;
  episodeCount: number;
  url: string;
  episodes: any[];
  description: string;
};

export default function AcademyPage() {
  const [liveWebinars, setLiveWebinars] = useState<typeof webinars>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<typeof webinars>([]);
  const [pastWebinars, setPastWebinars] = useState<typeof webinars>([]);
  const [audioSeries, setAudioSeries] = useState<AudioSeries[]>([]);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const now = new Date().getTime();
    
    const live: typeof webinars = [];
    const upcoming: typeof webinars = [];
    const past: typeof webinars = [];

    webinars.forEach(w => {
      const startTime = new Date(w.dateTime).getTime();
      const durationParts = w.duration.split(' ');
      const durationValue = parseInt(durationParts[0], 10);
      const isQuiz = w.id === 'eye-q-arena-2025';
      const durationMultiplier = isQuiz ? (1000 * 60 * 60 * 24 * 11) : (1000 * 60);
      const endTime = startTime + (durationValue * durationMultiplier);

      if (now >= startTime && now < endTime) {
        live.push(w);
      } else if (now < startTime) {
        upcoming.push(w);
      } else {
        past.push(w);
      }
    });

    setLiveWebinars(live);
    setUpcomingWebinars(upcoming.sort((a, b) => new Date(a.dateTime).getTime() - new Date(a.dateTime).getTime()));
    setPastWebinars(past.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()));
    
    async function fetchAudioSeries() {
      setIsLoadingAudio(true);
      try {
        const response = await fetch('/api/audio-series');
        if (response.ok) {
          const data = await response.json();
          // Fix for the broken image URL
          const correctedData = data.map((series: AudioSeries) => {
            if (series.id === 'series-ocular-pharmacology') {
               series.thumbnailUrl = "https://i.ibb.co/v69jrMh/b-Change-into-solid-ba.png";
            }
            return series;
          });
          setAudioSeries(correctedData);
        }
      } catch (error) {
        console.error("Failed to fetch audio series:", error);
      } finally {
        setIsLoadingAudio(false);
      }
    }
    fetchAudioSeries();
    
  }, []);
  
  const filters = ['All', 'Webinars', 'Courses', 'Audio', 'E-Books', 'Resources'];

  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Academy & Knowledge Hub</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto mb-8">
            Your all-in-one destination for webinars, courses, ebooks, and clinical resources.
        </p>
         <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses, topics, or resources..."
                className="w-full pl-12 h-12 rounded-full bg-white/90 text-slate-800 placeholder:text-slate-500"
              />
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-8 space-y-16">
        
        {liveWebinars.length > 0 && (
          <section>
            <div className="section-header">
                <h2 className="section-title"><Radio className="text-red-500" /> Live Now</h2>
            </div>
             <Card className="overflow-hidden shadow-soft border-l-4 border-destructive">
                <div className="md:flex">
                    <div className="p-4 bg-red-50 text-center flex md:flex-col items-center justify-center min-w-[120px]">
                        <span className="text-4xl font-bold text-destructive">24</span>
                        <span className="font-semibold text-muted-foreground ml-2 md:ml-0">NOV</span>
                    </div>
                    <div className="p-6 flex-grow">
                        <Badge variant="destructive" className="animate-pulse mb-2"><Radio className="h-3 w-3 mr-1.5" /> Live Webinar</Badge>
                        <h3 className="text-xl font-bold font-headline text-slate-800">Advanced Scleral Lens Fitting</h3>
                        <p className="text-muted-foreground mt-1 mb-4 text-sm">Join Dr. Sarah Miller as she demonstrates live fitting techniques on complex cornea cases.</p>
                        <Button>Join Room</Button>
                    </div>
                </div>
            </Card>
          </section>
        )}

        <section>
            <div className="section-header">
                <h2 className="section-title"><BookOpen className="text-primary" /> Courses</h2>
                <Link href="/academy" className="view-all">View All</Link>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                 {webinars.filter(w => w.type === 'Course').map(course => (
                  <CarouselItem key={course.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                     <Link href={`/academy/${course.id}`}>
                      <Card className="group overflow-hidden shadow-soft h-full flex flex-col">
                        <div className="relative aspect-video">
                          <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt={course.title} layout="fill" objectFit="cover" />
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <h4 className="font-bold text-slate-800 flex-grow">{course.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{course.speaker.name}</p>
                        </div>
                      </Card>
                     </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </section>

        <section>
            <div className="section-header">
                <h2 className="section-title"><Headphones className="text-purple-500" /> Audio Learning</h2>
                 <Link href="https://focuscast.netlify.app" target="_blank" className="view-all">Powered by Focus Cast</Link>
            </div>
            <Carousel opts={{ align: "start", slidesToScroll: 'auto' }} className="w-full">
              <CarouselContent>
                {isLoadingAudio ? (
                  [...Array(6)].map((_, i) => (
                     <CarouselItem key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                        <div className="w-[160px]">
                           <Skeleton className="aspect-square rounded-lg w-full" />
                           <Skeleton className="h-4 w-3/4 mt-2" />
                           <Skeleton className="h-3 w-1/2 mt-1" />
                        </div>
                     </CarouselItem>
                  ))
                ) : audioSeries.length > 0 ? audioSeries.map(series => (
                  <CarouselItem key={series.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                     <Dialog>
                        <DialogTrigger asChild>
                           <div className="block w-[160px] group cursor-pointer">
                            <div className="relative aspect-square rounded-lg shadow-lg bg-slate-100 overflow-hidden">
                                <Image src={series.thumbnailUrl} alt={series.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300"/>
                                <div className="absolute bottom-2 right-2 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md text-purple-600">
                                    <PlayCircle className="h-6 w-6"/>
                                </div>
                            </div>
                            <h4 className="font-semibold text-sm mt-2 truncate">{series.title}</h4>
                            <p className="text-xs text-muted-foreground">{series.episodeCount} Episodes</p>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-md md:max-w-4xl h-full md:h-auto max-h-[95vh] flex flex-col p-0">
                           <AudioPlayer series={series} />
                        </DialogContent>
                    </Dialog>
                </CarouselItem>
                )) : (
                  <p className="text-muted-foreground">No audio series available at this time.</p>
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </section>

        <section>
            <div className="section-header">
                <h2 className="section-title"><BookOpen className="text-amber-500" /> E-Books</h2>
                <Link href="/academy" className="view-all">See All</Link>
            </div>
            <Carousel opts={{ align: "start", slidesToScroll: 'auto' }} className="w-full">
              <CarouselContent>
                 <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <div className="w-[140px]">
                      <div className="relative aspect-[3/4] rounded-lg shadow-lg group overflow-hidden">
                          <Image src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Glaucoma Guide" layout="fill" objectFit="cover" className="rounded-lg"/>
                      </div>
                      <h4 className="font-semibold text-sm mt-2 truncate">Glaucoma Guide</h4>
                      <p className="text-xs text-muted-foreground">2nd Edition</p>
                    </div>
                </CarouselItem>
                 <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <div className="w-[140px]">
                      <div className="relative aspect-[3/4] rounded-lg shadow-lg group overflow-hidden">
                          <Image src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Pediatric Vision" layout="fill" objectFit="cover" className="rounded-lg"/>
                      </div>
                      <h4 className="font-semibold text-sm mt-2 truncate">Pediatric Vision</h4>
                      <p className="text-xs text-muted-foreground">Clinical Manual</p>
                    </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </section>

        <section>
            <div className="section-header">
                <h2 className="section-title"><FolderOpen className="text-green-500" /> Resources & Notes</h2>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                            <FileText className="h-6 w-6"/>
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold text-slate-800">Retinoscopy Cheatsheet</h4>
                            <p className="text-sm text-muted-foreground">PDF • 2.4 MB</p>
                        </div>
                        <Button variant="ghost" size="icon"><Download /></Button>
                    </CardContent>
                </Card>
                 <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FileText className="h-6 w-6"/>
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold text-slate-800">Patient History Form</h4>
                            <p className="text-sm text-muted-foreground">DOCX • 500 KB</p>
                        </div>
                        <Button variant="ghost" size="icon"><Download /></Button>
                    </CardContent>
                </Card>
            </div>
        </section>

         <section>
            <div className="section-header">
                <h2 className="section-title"><Newspaper className="text-slate-600" /> Latest Insights</h2>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                 <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <Card className="group overflow-hidden shadow-soft h-full flex flex-col">
                        <div className="relative aspect-video">
                            <Image src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Blog post" layout="fill" objectFit="cover" />
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-base text-slate-800 mb-2">AI in Optometry: The Next Step</h4>
                            <p className="text-sm text-muted-foreground mb-3">How artificial intelligence is changing diagnostics...</p>
                            <Button variant="link" className="p-0 h-auto">Read Article</Button>
                        </div>
                    </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </section>
        
        {pastWebinars.length > 0 && (
          <section>
              <div className="section-header">
                <h2 className="section-title"><Trophy className="text-amber-500" /> On-Demand &amp; Past Events</h2>
                <Link href="/academy" className="view-all">View All</Link>
              </div>
               <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {pastWebinars.map(webinar => (
                    <CarouselItem key={webinar.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                      <Card className="group overflow-hidden shadow-soft bg-slate-50 h-full flex flex-col">
                        <div className="p-6 flex-grow">
                            <Badge variant="secondary" className="mb-2">{webinar.id === 'eye-q-arena-2025' ? 'Event Concluded' : 'On-Demand'}</Badge>
                            <h4 className="font-bold text-slate-800 text-base">{webinar.title}</h4>
                        </div>
                        <div className="px-6 pb-4 text-sm text-muted-foreground border-t mt-auto pt-4">
                           Originally Aired: <WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} />
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                 </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden smflex" />
              </Carousel>
            </section>
        )}
      </main>
    </div>
  );
}
