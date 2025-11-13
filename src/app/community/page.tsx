
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Eye, Paperclip, Lock, Search, Info, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { ForumPost } from '@/types';
import { webinars } from '@/lib/academy';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebinarBanner } from '@/components/webinar-banner';
import { WebinarTime } from '@/components/webinar-time';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


function ForumList({ discussions }: { discussions: ForumPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiscussions = discussions.filter((discussion) => {
    const term = searchTerm.toLowerCase();
    return (
      discussion.title.toLowerCase().includes(term) ||
      discussion.description.toLowerCase().includes(term) ||
      discussion.author.toLowerCase().includes(term) ||
      discussion.category.toLowerCase().includes(term) ||
      (discussion.tags && discussion.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  });
  
  return (
      <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto md:flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search cases, tags, or categories..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-right flex-shrink-0 w-full md:w-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="w-full" disabled>
                        <Lock className="mr-2 h-4 w-4" />
                        Start a New Discussion
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Official membership required to post.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start">
                            <div className="flex-shrink-0 flex flex-row sm:flex-col items-center gap-4 w-full sm:w-20 text-center">
                                <Button variant="outline" size="sm" className="w-full">
                                    <ThumbsUp className="h-4 w-4 mr-2" /> {discussion.upvotes}
                                </Button>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground sm:w-full">
                                  <div className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {discussion.views}</div>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <Badge variant="secondary" className="mb-2">{discussion.category}</Badge>
                                <h3 className="text-lg font-bold text-slate-800 hover:text-primary">
                                    <Link href={`/forum/${discussion.id}`}>{discussion.title}</Link>
                                </h3>
                                 <p className="text-sm text-slate-600 mt-1 line-clamp-2">{discussion.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                          <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                          <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span>{discussion.author}</span>
                                    </div>
                                    <span>&middot;</span>
                                    <span>Last reply {discussion.lastReply}</span>
                                     {discussion.mediaCount > 0 && (
                                      <>
                                        <span>&middot;</span>
                                        <span className="flex items-center gap-1">
                                          <Paperclip className="h-4 w-4" /> {discussion.mediaCount}
                                        </span>
                                      </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
      </div>
  );
}


function EventsList() {
    const liveWebinars = webinars.filter(w => new Date(w.dateTime).getTime() < Date.now() && new Date(w.dateTime).getTime() + (parseInt(w.duration.split(' ')[0], 10) * 60 * 1000) > Date.now());
    const upcomingWebinars = webinars.filter(w => new Date(w.dateTime).getTime() > Date.now());
    const pastWebinars = webinars.filter(w => new Date(w.dateTime).getTime() + (parseInt(w.duration.split(' ')[0], 10) * 60 * 1000) < Date.now());
  
    return (
      <div className="space-y-16">
        {/* Live Webinars */}
        {liveWebinars.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-headline mb-6 text-slate-800 flex items-center gap-3">
              <Radio className="h-7 w-7 text-red-500 animate-pulse" />
              Live Now
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {liveWebinars.map(webinar => (
                <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <Link href={`/events/${webinar.id}`} className="block">
                    <div className="relative w-full aspect-video">
                      <WebinarBanner webinar={webinar} variant="card" />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                      <Link href={`/events/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                        <WebinarTime dateTime={webinar.dateTime} />
                    </div>
                    
                    <Button asChild className="w-full mt-4" variant="destructive">
                      <Link href={`/events/${webinar.id}`}>Join Live</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Webinars */}
        <section>
          <h2 className="text-2xl font-bold font-headline mb-6 text-slate-800">Upcoming Live Events</h2>
          <div className="grid grid-cols-1 gap-6">
            {upcomingWebinars.length > 0 ? upcomingWebinars.map(webinar => (
              <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <Link href={`/events/${webinar.id}`} className="block">
                  <div className="relative w-full aspect-video">
                    <WebinarBanner webinar={webinar} variant="card" />
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                    <Link href={`/events/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                      <WebinarTime dateTime={webinar.dateTime} />
                  </div>
                  
                  <Button asChild className="w-full mt-4">
                    <Link href={`/events/${webinar.id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            )) : (
              <p className="text-muted-foreground col-span-full text-center">No upcoming events scheduled. Please check back soon!</p>
            )}
          </div>
        </section>

        {/* Past Webinars */}
        {pastWebinars.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold font-headline mb-6 text-slate-800">On-Demand & Past Events</h2>
              <div className="grid grid-cols-1 gap-6">
                {pastWebinars.map(webinar => (
                   <Card key={webinar.id} className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <Link href={`/events/${webinar.id}`} className="block">
                       <div className="relative w-full aspect-video">
                          <WebinarBanner webinar={webinar} variant="card" />
                       </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                        <Link href={`/events/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mt-auto border-t pt-4">Originally aired: <WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} /></p>
                      
                      <Button asChild variant="secondary" className="w-full mt-4">
                        <Link href={`/events/${webinar.id}`}>
                           <Info className="mr-2 h-4 w-4" />
                           View Details
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
        )}
      </div>
    )
}

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState<ForumPost[]>([]);

  useEffect(() => {
    async function getDiscussions(): Promise<ForumPost[]> {
        const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Case1.json";
        try {
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) {
                console.error('Failed to fetch discussions, returning empty array.');
                return [];
            }
            const discussions: ForumPost[] = await response.json();
            return Array.isArray(discussions) ? discussions.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) : [];
        } catch (error) {
            console.error('Error fetching or parsing discussions:', error);
            return [];
        }
    }
    
    getDiscussions().then(setDiscussions);
  }, []);

  return (
    <div className="bg-muted/40 md:hidden">
      <div className="container mx-auto py-8 px-4">
          <Tabs defaultValue="events">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="forum">Case Forum</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
                <EventsList />
            </TabsContent>
            <TabsContent value="forum">
                <ForumList discussions={discussions} />
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
