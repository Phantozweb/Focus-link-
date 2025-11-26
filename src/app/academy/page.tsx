
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
    setUpcomingWebinars(upcoming.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()));
    setPastWebinars(past.filter(w => w.type !== 'Course').sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()));
    
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
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
            <Card className="bg-slate-50 border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>Our library of interactive courses with AI-powered simulations is launching soon. Stay tuned!</p>
                </CardContent>
            </Card>
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
                        <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col p-0">
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
                 <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
            <Card className="bg-slate-50 border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>Our curated library of E-books and clinical guides is launching soon. Stay tuned!</p>
                </CardContent>
            </Card>
        </section>

        <section>
            <div className="section-header">
                <h2 className="section-title"><FolderOpen className="text-green-500" /> Resources & Notes</h2>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
             <Card className="bg-slate-50 border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>A collection of clinical cheatsheets, patient forms, and research summaries is on its way.</p>
                </CardContent>
            </Card>
        </section>

         <section>
            <div className="section-header">
                <h2 className="section-title"><Newspaper className="text-slate-600" /> Latest Insights</h2>
                <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
            <Card className="bg-slate-50 border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>Our blog featuring articles on AI in optometry, clinical case studies, and career advice is coming soon.</p>
                </CardContent>
            </Card>
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
                      <Link href={`/academy/${webinar.id}`} className="block h-full">
                      <Card className="group overflow-hidden shadow-soft bg-slate-50 h-full flex flex-col">
                        <div className="p-6 flex-grow">
                            <Badge variant="secondary" className="mb-2">{webinar.id === 'eye-q-arena-2025' ? 'Event Concluded' : 'On-Demand'}</Badge>
                            <h4 className="font-bold text-slate-800 text-base">{webinar.title}</h4>
                        </div>
                        <div className="px-6 pb-4 text-sm text-muted-foreground border-t mt-auto pt-4">
                           Originally Aired: <WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} />
                        </div>
                      </Card>
                      </Link>
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
