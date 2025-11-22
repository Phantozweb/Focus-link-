
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Job } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Search, Building, Lock, X, ArrowRight, Heart, Microscope, Stethoscope, Store, University, Globe } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TimeAgo } from '@/components/time-ago';
import { logSearch } from '@/lib/activity-logger';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const categories = [
    { name: 'All Jobs', filter: 'all', icon: <Briefcase /> },
    { name: 'Clinical', filter: 'clinical', icon: <Stethoscope /> },
    { name: 'Retail', filter: 'retail', icon: <Store /> },
    { name: 'Academic', filter: 'academic', icon: <University /> },
    { name: 'Sales', filter: 'sales', icon: <Briefcase /> },
    { name: 'Remote', filter: 'remote', icon: <Globe /> },
];

export function JobBoardClient({ allJobs }: { allJobs: Job[] }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const debouncedLogSearch = useMemo(
    () =>
      debounce((kw: string, loc: string, cat: string) => {
        if (kw || loc || cat !== 'all') {
          logSearch(`**Job Board Search:**
*   **Keyword:** \`${kw || 'none'}\`
*   **Location:** \`${loc || 'none'}\`
*   **Category:** \`${cat}\``);
        }
      }, 500),
    []
  );
  
  useEffect(() => {
    debouncedLogSearch(keyword, location, activeCategory);
  }, [keyword, location, activeCategory, debouncedLogSearch]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const keywordLower = keyword.toLowerCase();
      const locationLower = location.toLowerCase();

      const matchesKeyword = !keyword ||
        job.title.toLowerCase().includes(keywordLower) ||
        job.company.toLowerCase().includes(keywordLower) ||
        job.description.toLowerCase().includes(keywordLower) ||
        job.type.toLowerCase().includes(keywordLower);

      const matchesLocation = !location ||
        job.location.toLowerCase().includes(locationLower);
      
      const matchesCategory = activeCategory === 'all' || job.type.toLowerCase().includes(activeCategory);

      return matchesKeyword && matchesLocation && matchesCategory;
    });
  }, [allJobs, keyword, location, activeCategory]);

  return (
    <div>
        <div className="relative transform -translate-y-12">
            <div className="max-w-3xl mx-auto bg-white p-2.5 rounded-full-btn shadow-search flex flex-col md:flex-row gap-2.5 items-center">
                <div className="relative flex-grow w-full flex items-center gap-2 px-5 md:border-r">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Job title, keywords..." 
                        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-3"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="relative flex-grow w-full flex items-center gap-2 px-5">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="City or Country" 
                        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-3"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                 <Button className="w-full md:w-auto h-12 rounded-full-btn text-base flex-shrink-0 bg-brand-dark hover:bg-brand-blue">
                    Search Jobs
                </Button>
            </div>
        </div>
        
        <div className="category-scroll -mt-4">
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.filter)} className={cn("cat-pill", activeCategory === cat.filter && "active")}>
                {cat.icon}
                {cat.name}
            </button>
          ))}
        </div>

        <div className="main-container">
            <section>
                <div className="section-header">
                    <div className="section-title">Recommended for You</div>
                </div>
                 <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="-ml-5">
                        {allJobs.slice(0, 5).map((job) => (
                           <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3 pl-5">
                             <div className={cn("rec-card", job.id === '1' && 'urgent')}>
                                <div className="rec-logo"><Briefcase /></div>
                                <h3 className="rec-title">{job.title}</h3>
                                <p className="rec-company">{job.company}</p>
                                <div className="tags">
                                    <span className="tag">{job.type}</span>
                                    <span className="tag salary">Competitive</span>
                                </div>
                                <div className="rec-footer">
                                    <Link href={`/jobs/${job.id}`} className="btn-apply-sm">View Details</Link>
                                    <button className="btn-save"><Heart className="h-5 w-5" /></button>
                                </div>
                            </div>
                           </CarouselItem>
                        ))}
                    </CarouselContent>
                 </Carousel>
            </section>

            <section>
                 <div className="cta-card">
                    <Briefcase className="h-12 w-12 text-amber-400 mx-auto" />
                    <h2 className="text-2xl font-bold mt-4">Hiring? Post a Job Today.</h2>
                    <p className="opacity-80 mt-1">Reach over 350+ qualified vision professionals in our community.</p>
                     <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="secondary" className="mt-4 rounded-full-btn" disabled>
                              <Lock className="mr-2 h-4 w-4" />
                              Post a Job for Free
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Login with your member account to post jobs.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                </div>
            </section>

            <section>
                <div className="section-header">
                    <div className="section-title">Latest Jobs</div>
                </div>
                <div className="space-y-4">
                {filteredJobs.length > 0 ? filteredJobs.map(job => (
                    <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                         <div className="job-card">
                            <div className="job-logo"><Building /></div>
                            <div className="job-info">
                                <h3 className="job-title">{job.title}</h3>
                                <div className="job-meta">
                                    <span><Building className="inline mr-1.5 h-4 w-4" />{job.company}</span>
                                    <span><MapPin className="inline mr-1.5 h-4 w-4" />{job.location}</span>
                                    <Badge variant="outline">{job.type}</Badge>
                                </div>
                            </div>
                            <div className="job-action">
                                <span className="post-time"><TimeAgo dateString={job.posted} /></span>
                                <Button variant="secondary" className="btn-view rounded-full-btn h-auto py-2 px-5">Apply</Button>
                            </div>
                        </div>
                    </Link>
                )) : (
                <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                    No job listings available matching your criteria.
                    </CardContent>
                </Card>
                )}
            </div>
            </section>
        </div>

    </div>
  );
}
