

'use client';

import { webinars } from '@/lib/academy';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, UserCircle, PlayCircle, Tv, Radio, Info, Users, Trophy, BookOpen, Headphones, FolderOpen, Newspaper, FileText, Download, Search, Sparkles, Bot, Loader2, Send, Eye, FileQuestion, MessageCircle, PencilRuler, Palette, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { WebinarTime } from '@/components/webinar-time';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AudioPlayer } from '@/components/audio-player';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { askOptometryAI } from '@/ai/flows/ask-optometry-ai';
import { generateCaseStudy, type GenerateCaseStudyOutput } from '@/ai/flows/generate-case-study';
import { useToast } from '@/hooks/use-toast';
import { marked } from 'marked';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toPng } from 'html-to-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CaseSheet } from '@/components/case-sheet';
import { logSearch } from '@/lib/activity-logger';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


type AudioSeries = {
  id: string;
  title: string;
  thumbnailUrl: string;
  episodeCount: number;
  url: string;
  episodes: any[];
  description: string;
};

const MAX_AI_ATTEMPTS = 5;

export default function AcademyPage() {
  const [liveWebinars, setLiveWebinars] = useState<typeof webinars>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<typeof webinars>([]);
  const [pastWebinars, setPastWebinars] = useState<typeof webinars>([]);
  const [audioSeries, setAudioSeries] = useState<AudioSeries[]>([]);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // AI Chat state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { toast } = useToast();
  const answerCardRef = useRef<HTMLDivElement>(null);
  
  // AI Case Gen state
  const [caseTopic, setCaseTopic] = useState('');
  const [generatedCase, setGeneratedCase] = useState<GenerateCaseStudyOutput | null>(null);
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);

  // AI Usage Limit State
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_AI_ATTEMPTS);
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const usageData = JSON.parse(localStorage.getItem('focusAiUsage') || '{}');

    if (usageData.date === today) {
      setAttemptsLeft(Math.max(0, MAX_AI_ATTEMPTS - usageData.count));
    } else {
      localStorage.setItem('focusAiUsage', JSON.stringify({ date: today, count: 0 }));
      setAttemptsLeft(MAX_AI_ATTEMPTS);
    }
  }, []);

  const incrementAttemptCount = () => {
    const today = new Date().toISOString().split('T')[0];
    const usageData = JSON.parse(localStorage.getItem('focusAiUsage') || '{"date": "","count":0}');
    
    if (usageData.date === today) {
      const newCount = usageData.count + 1;
      localStorage.setItem('focusAiUsage', JSON.stringify({ date: today, count: newCount }));
      setAttemptsLeft(MAX_AI_ATTEMPTS - newCount);
    } else {
      // If date is old, reset it. This is a fallback.
      localStorage.setItem('focusAiUsage', JSON.stringify({ date: today, count: 1 }));
      setAttemptsLeft(MAX_AI_ATTEMPTS - 1);
    }
  };
  
  const imageFilter = (node: HTMLElement) => {
    const exclusion = (node.tagName === 'LINK') && (node as HTMLLinkElement).href.includes('fonts.googleapis');
    return !exclusion;
  };
  
  const handleDownloadImage = useCallback(() => {
    if (answerCardRef.current === null) {
      return;
    }
    toPng(answerCardRef.current, { cacheBust: true, pixelRatio: 2, filter: imageFilter })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "focus-ai-answer.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
        toast({
            variant: "destructive",
            title: "Download Failed",
            description: "Could not generate an image of the answer."
        });
      });
  }, [toast]);

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
    setUpcomingWebinars(upcoming.sort((a, b) => new Date(a.dateTime).getTime() - new Date(a.dateTime).getTime()));
    setPastWebinars(past.filter(w => w.type !== 'Course').sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.postedDate).getTime()));
    
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
    if (!question.trim() || attemptsLeft <= 0) return;

    setIsLoadingAI(true);
    setAnswer('');
    incrementAttemptCount();
    logSearch(`❓ **Focus.AI Chat:**\n*   **Question:** "${question}"`);


    try {
      const result = await askOptometryAI({ question });
      const htmlAnswer = await marked(result.answer, { 
          gfm: true,
          breaks: true,
          mangle: false,
          headerIds: false,
      });
      setAnswer(htmlAnswer);
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
  
  const handleCaseGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseTopic.trim() || attemptsLeft <= 0) return;

    setIsGeneratingCase(true);
    setGeneratedCase(null);
    incrementAttemptCount();
    logSearch(`📝 **Focus.AI Case Gen:**\n*   **Topic:** "${caseTopic}"`);

    try {
      const result = await generateCaseStudy({ topic: caseTopic });
      setGeneratedCase(result);
    } catch (error) {
      console.error('Case generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate a case study. Please try again.',
      });
    } finally {
      setIsGeneratingCase(false);
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-8 space-y-16">
        
        <section>
          <div className="section-header">
              <h2 className="section-title"><Sparkles className="text-purple-500" /> Ask a Optometry AI</h2>
              <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Powered by Focus.Ai</span>
          </div>
          <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 border-purple-200/50">
            <Tabs defaultValue="chat" className="w-full">
              <div className="p-4 border-b border-purple-200/50">
                  <TabsList className="grid w-full grid-cols-2 bg-purple-100/50 text-purple-800">
                    <TabsTrigger value="chat"><MessageCircle className="h-4 w-4 mr-2"/> <span>Chat</span></TabsTrigger>
                    <TabsTrigger value="case-generator"><FileQuestion className="h-4 w-4 mr-2"/> <span>Case Gen</span></TabsTrigger>
                  </TabsList>
              </div>

              <TabsContent value="chat">
                 <CardContent className="p-4 sm:p-8 min-h-[300px] flex flex-col justify-center">
                    {(!answer && !isLoadingAI) && (
                        <div className="text-center">
                             <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <Bot className="h-9 w-9" />
                            </div>
                            <CardTitle className="text-center text-2xl font-bold text-slate-800">Have a Question? Get an Instant Answer.</CardTitle>
                            <CardDescription className="text-center text-slate-600 mt-2 max-w-lg mx-auto">
                               This AI is meant to help you get ideas. Always cross-check the information provided.
                            </CardDescription>
                            <div className="font-semibold mt-2 text-sm text-center text-slate-600">{attemptsLeft} of {MAX_AI_ATTEMPTS} daily attempts remaining.</div>
                            <form onSubmit={handleAISubmit} className="space-y-4 max-w-xl mx-auto w-full mt-6">
                                <Textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="e.g., 'What are the key differences between scleritis and episcleritis?'"
                                rows={3}
                                className="text-base bg-white/80"
                                disabled={isLoadingAI || attemptsLeft <= 0}
                                />
                                <Button type="submit" className="w-full" size="lg" disabled={isLoadingAI || !question.trim() || attemptsLeft <= 0}>
                                {isLoadingAI ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                                {attemptsLeft > 0 ? 'Ask Focus.AI' : 'Daily Limit Reached'}
                                </Button>
                            </form>
                        </div>
                    )}

                    {isLoadingAI && (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-4 font-semibold text-lg text-slate-700">Focus.AI is thinking...</p>
                        <p className="mt-1 text-sm">Scanning clinical guidelines to find the best answer for you.</p>
                      </div>
                    )}

                    {answer && (
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2 text-slate-800">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                          Focus.AI has generated an answer!
                        </h3>
                         <Dialog defaultOpen>
                          <DialogTrigger asChild>
                            <Button>See Answer</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl p-0">
                            <div className="p-6 bg-slate-50 border-b">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-3 text-2xl font-headline text-slate-800">
                                        <Sparkles className="h-6 w-6 text-purple-600" /> AI-Generated Note
                                    </DialogTitle>
                                    <DialogDescription className="text-left pt-2">
                                      The following information is AI-generated and for reference only. Always verify with trusted clinical sources.
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                                <div ref={answerCardRef} className="p-8 bg-white">
                                    <div className="flex justify-between items-center mb-8 pb-4 border-b">
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-8 w-8 text-primary" />
                                            <div>
                                                <p className="font-bold text-xl text-primary">Focus<span className="text-slate-800">Links</span></p>
                                                <p className="text-xs text-slate-500">AI Generated Response</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b pb-4 mb-6">
                                        <h3 className="text-sm font-semibold text-slate-500 mb-2">Your Question:</h3>
                                        <p className='text-slate-800 font-semibold text-lg'>{question}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-purple-500" />
                                            Focus.AI Answer:
                                        </h3>
                                        <div className="prose prose-slate max-w-none prose-p:my-3 prose-headings:my-4 prose-ul:my-3"
                                            dangerouslySetInnerHTML={{ __html: answer }}
                                        />
                                    </div>
                                     <div className="mt-8 pt-4 border-t text-center text-xs text-slate-500">
                                        <p><strong>Disclaimer:</strong> This content was generated by an AI for educational purposes and should not be used for clinical decision-making.</p>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="px-6 py-4 bg-slate-50 border-t sm:justify-between">
                                <Button variant="ghost" onClick={() => { setAnswer(''); setQuestion(''); }}>
                                  Ask Another Question
                                </Button>
                                <Button onClick={handleDownloadImage}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                         <Button variant="link" onClick={() => { setAnswer(''); setQuestion(''); }} className="mt-4">Ask another question</Button>
                      </div>
                    )}
                  </CardContent>
              </TabsContent>
              <TabsContent value="case-generator">
                 <CardContent className="p-4 sm:p-8 min-h-[300px] flex flex-col justify-center">
                    {(!generatedCase && !isGeneratingCase) && (
                      <div className="text-center">
                        <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <FileQuestion className="h-9 w-9" />
                        </div>
                        <CardTitle className="text-center text-2xl font-bold text-slate-800">AI Case Study Generator</CardTitle>
                        <CardDescription className="text-center text-slate-600 mt-2 max-w-lg mx-auto">
                          Enter a clinical topic to generate a realistic patient case for learning and discussion.
                        </CardDescription>
                        <div className="font-semibold mt-2 text-sm text-center text-slate-600">{attemptsLeft} of {MAX_AI_ATTEMPTS} daily attempts remaining.</div>
                        <form onSubmit={handleCaseGenerate} className="space-y-4 max-w-xl mx-auto w-full mt-6">
                          <Input
                            value={caseTopic}
                            onChange={(e) => setCaseTopic(e.target.value)}
                            placeholder="e.g., 'Angle Closure Glaucoma' or 'Accommodative Esotropia'"
                            className="text-base bg-white/80 text-center"
                            disabled={isGeneratingCase || attemptsLeft <= 0}
                          />
                          <Button type="submit" className="w-full" size="lg" disabled={isGeneratingCase || !caseTopic.trim() || attemptsLeft <= 0}>
                            {isGeneratingCase ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                            {attemptsLeft > 0 ? 'Generate Case' : 'Daily Limit Reached'}
                          </Button>
                        </form>
                      </div>
                    )}

                    {isGeneratingCase && (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-4 font-semibold text-lg text-slate-700">Generating Case Study...</p>
                        <p className="mt-1 text-sm">Focus.AI is crafting a detailed clinical scenario for you.</p>
                      </div>
                    )}

                    {generatedCase && (
                       <div className="text-center">
                         <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2 text-slate-800">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                           Case Study Generated!
                        </h3>
                         <Dialog defaultOpen>
                          <DialogTrigger asChild>
                            <Button>View Case Study</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-3xl p-0">
                            <DialogHeader>
                              <DialogTitle className='sr-only'>AI Generated Case Study</DialogTitle>
                              <DialogDescription className='sr-only'>A case study about {caseTopic} generated by AI.</DialogDescription>
                            </DialogHeader>
                             <CaseSheet caseData={generatedCase} topic={caseTopic} />
                          </DialogContent>
                        </Dialog>
                         <Button variant="link" onClick={() => { setGeneratedCase(null); setCaseTopic(''); }} className="mt-4">Generate another case</Button>
                      </div>
                    )}
                 </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </section>

        <section>
          <div className="section-header">
            <h2 className="section-title"><Palette className="text-purple-500" /> Visual Learning</h2>
            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">New!</span>
          </div>
          <Card className="bg-slate-50 border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Anatomy of Eye: A Visual Guide</h3>
                        <p className="text-slate-600 mb-4">An anterior to posterior visual guide covering key structures from the cornea to the retina.</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                            <span>Posted on Sat Dec 6, 2025</span>
                        </div>
                        <div className="flex-shrink-0 mt-auto">
                            <Button disabled>View Details</Button>
                        </div>
                    </div>
                    <div className="relative aspect-video md:aspect-auto">
                       <Image src="https://i.ibb.co/KssMB1g/1688f191-236b-48b4-a212-325785a0655c.webp" alt="Diabetic Retinopathy Art" layout="fill" objectFit="cover" className="md:rounded-l-none rounded-b-lg" />
                    </div>
                </div>
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
