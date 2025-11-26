
'use client';

import { webinars } from '@/lib/academy';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, UserCircle, PlayCircle, Tv, Radio, Info, Users, Trophy, BookOpen, Headphones, FolderOpen, Newspaper, FileText, Download, Search, Sparkles, Bot, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { WebinarTime } from '@/components/webinar-time';
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AudioPlayer } from '@/components/audio-player';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { askOptometryAI } from '@/ai/flows/ask-optometry-ai';
import { useToast } from '@/hooks/use-toast';
import { marked } from 'marked';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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

  // AI Chat state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const now = new Date().getTime();
    
    const live: typeof webinars = [];
    const upcoming: typeof webinars = [];
    const past: typeof webinars = [];

    webinars.forEach(w => {
      // Special handling for Eye Q Arena to always be considered a past event
      if (w.id === 'eye-q-arena-2025') {
        past.push(w);
        return;
      }
      
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

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoadingAI(true);
    setAnswer('');

    try {
      const result = await askOptometryAI({ question });
      setAnswer(result.answer);
    } catch (error) {
      console.error('AI question failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get an answer from the AI. Please try again.',
      });
    } finally {
      setIsLoadingAI(false);
    }
  };
  
  const comingSoonFeatures = [
    { title: 'Interactive Courses', icon: <BookOpen className="h-8 w-8" />, description: 'Simulator and Valuable courses instead of videos Pure virtual engagement' },
    { title: 'E-Books & Guides', icon: <FileText className="h-8 w-8" />, description: 'Access a curated library of clinical guides and textbooks.' },
    { title: 'Clinical Resources', icon: <FolderOpen className="h-8 w-8" />, description: 'Download cheatsheets, patient forms, and research summaries.' },
    { title: 'Latest Insights Blog', icon: <Newspaper className="h-8 w-8" />, description: 'Explore articles on career growth, skill development, and future industry trends.' },
  ];

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
        
        <section>
            <div className="section-header">
                <h2 className="section-title"><Sparkles className="text-purple-500" /> Ask Optometry AI</h2>
                <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Powered by Focus.ai</span>
            </div>
             <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 border-purple-200/50">
                {(!answer && !isLoadingAI) && (
                  <CardHeader>
                      <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Bot className="h-9 w-9" />
                      </div>
                      <CardTitle className="text-center text-2xl font-bold text-slate-800">Have a Question? Get an Instant Answer.</CardTitle>
                      <CardDescription className="text-center text-slate-600 mt-2 max-w-lg mx-auto">
                        This AI is meant to help you get ideas. Always cross-check the information provided.
                      </CardDescription>
                  </CardHeader>
                )}
                <CardContent className="p-8 pt-2 min-h-[240px] flex flex-col justify-center">
                    {!answer && !isLoadingAI && (
                      <form onSubmit={handleAISubmit} className="space-y-4 max-w-xl mx-auto w-full">
                        <Textarea
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="e.g., 'What are the key differences between scleritis and episcleritis?'"
                          rows={3}
                          className="text-base bg-white/80"
                          disabled={isLoadingAI}
                        />
                        <Button type="submit" className="w-full" size="lg" disabled={isLoadingAI || !question.trim()}>
                          {isLoadingAI ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                          Ask Focus.ai
                        </Button>
                      </form>
                    )}

                    {isLoadingAI && (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-4 font-semibold text-lg text-slate-700">Focus.ai is thinking...</p>
                        <p className="mt-1 text-sm">Scanning clinical guidelines to find the best answer for you.</p>
                      </div>
                    )}

                    {answer && (
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                          Focus.ai's Answer
                        </h3>
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Tap to view the answer</AccordionTrigger>
                            <AccordionContent>
                                <div 
                                  className="prose prose-slate max-w-none bg-white/50 p-4 rounded-lg"
                                  dangerouslySetInnerHTML={{ __html: marked(answer) }}
                                />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                         <Button variant="link" onClick={() => { setAnswer(''); setQuestion(''); }} className="mt-4">Ask another question</Button>
                      </div>
                    )}
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

        {pastWebinars.length > 0 && (
          <section>
              <div className="section-header">
                <h2 className="section-title"><Trophy className="text-amber-500" /> Past Events</h2>
                <Link href="/academy" className="view-all">View All</Link>
              </div>
               <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {pastWebinars.map(webinar => (
                    <CarouselItem key={webinar.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                      <Link href={`/academy/${webinar.id}`} className="block h-full">
                      <Card className="group overflow-hidden shadow-soft bg-slate-50 h-full flex flex-col">
                        <div className="p-6 flex-grow">
                            <Badge variant="secondary" className="mb-2">{webinar.id === 'eye-q-arena-2025' ? 'Event Concluded' : 'Webinar Ended'}</Badge>
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
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </section>
        )}
        
        <section>
            <div className="section-header">
                <h2 className="section-title"><Sparkles className="text-blue-500" /> What's Next?</h2>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Coming Soon</span>
            </div>
             <Card className="bg-slate-50 border-dashed">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-muted-foreground">
                    {comingSoonFeatures.map(feature => (
                      <div key={feature.title} className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mb-3">
                          {feature.icon}
                        </div>
                        <h4 className="font-semibold text-slate-600">{feature.title}</h4>
                        <p className="text-xs mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
            </Card>
        </section>

      </main>
    </div>
  );
}
