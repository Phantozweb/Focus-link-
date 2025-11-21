
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Job } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Search, Building, Lock, X } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TimeAgo } from '@/components/time-ago';
import { logSearch } from '@/lib/activity-logger';

// Debounce function
function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export function JobBoardClient({ allJobs }: { allJobs: Job[] }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedLogSearch = useMemo(
    () =>
      debounce((kw: string, loc: string) => {
        if (kw || loc) {
          logSearch(`**Job Board Search:**
*   **Keyword:** \`${kw || 'none'}\`
*   **Location:** \`${loc || 'none'}\``);
        }
      }, 500),
    []
  );
  
  useEffect(() => {
    if (keyword || location) {
      setHasSearched(true);
      debouncedLogSearch(keyword, location);
    } else {
      setHasSearched(false);
    }
  }, [keyword, location, debouncedLogSearch]);

  const filteredJobs = useMemo(() => {
    if (!keyword && !location) {
      return allJobs;
    }
    
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

      return matchesKeyword && matchesLocation;
    });
  }, [allJobs, keyword, location]);

  const clearFilters = () => {
    setKeyword('');
    setLocation('');
  };

  return (
    <div className="max-w-5xl mx-auto">
        {/* Filter Bar */}
        <Card className="mb-8 rounded-3xl shadow-soft">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Job title, keyword, or company" 
                            className="pl-10 h-12 rounded-xl"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="relative flex-grow w-full">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="City or Country" 
                            className="pl-10 h-12 rounded-xl"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>
                 <div className="w-full flex-shrink-0 sm:w-auto flex flex-col md:flex-row gap-2">
                   {hasSearched && (
                     <Button onClick={clearFilters} variant="ghost" className="w-full md:w-auto h-12 rounded-full-btn">
                        <X className="h-5 w-5 mr-2" />
                        Clear
                    </Button>
                   )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" className="w-full md:w-auto h-12 rounded-full-btn" disabled>
                          <Lock className="mr-2 h-4 w-4" />
                          Post a Job
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Login with your member account to post jobs.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
            </CardContent>
        </Card>

        {/* Job Listings */}
        {hasSearched && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            <p className="text-muted-foreground">{filteredJobs.length} jobs found.</p>
          </div>
        )}
        
        {!hasSearched && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Latest Jobs</h2>
          </div>
        )}

        <div className="space-y-4">
            {filteredJobs.length > 0 ? filteredJobs.map(job => (
                <Card key={job.id} className="hover:shadow-md transition-shadow rounded-2xl">
                    <CardContent className="p-6">
                       <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
                          <div className="flex-grow">
                              <h3 className="text-xl font-bold text-slate-800 hover:text-primary">
                                  <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                              </h3>
                              <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                                <Building className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                                  <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</div>
                                  <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.type}</div>
                              </div>
                          </div>
                          <div className="md:text-right flex-shrink-0">
                              <Button asChild className="rounded-full-btn">
                                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                              </Button>
                          </div>
                       </div>
                       <div className="border-t mt-4 pt-3 text-xs text-muted-foreground text-right">
                            Posted <TimeAgo dateString={job.posted} /> by <span className="font-semibold text-slate-600">{job.postedBy}</span>
                        </div>
                    </CardContent>
                </Card>
            )) : (
              <Card className="rounded-3xl">
                <CardContent className="p-8 text-center text-muted-foreground">
                  No job listings available matching your criteria.
                </CardContent>
              </Card>
            )}
        </div>
    </div>
  );
}
