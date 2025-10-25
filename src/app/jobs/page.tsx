
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Search, Building, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { demoJobs } from '@/lib/jobs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Job Board | Focus Links',
  description: 'Find your next career opportunity in the eye care industry on the Focus Links job board. Browse listings from top clinics, hospitals, and companies.',
};

export default function JobsPage() {
  return (
    <div className="bg-muted/40">
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Job Board</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover your next career move. Connect with leading employers in the eye care industry.
          </p>
        </div>
      </section>

       <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
            {/* Filter Bar */}
            <Card className="mb-8">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Job title, keyword, or company" className="pl-10" />
                        </div>
                        <div className="relative flex-grow w-full">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="City, state, or zip code" className="pl-10" />
                        </div>
                    </div>
                     <div className="w-full flex-shrink-0 sm:w-auto flex flex-col md:flex-row gap-2">
                      <Button className="w-full md:w-auto">Find Jobs</Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="secondary" className="w-full md:w-auto" disabled>
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
            <div className="space-y-4">
                {demoJobs.map(job => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                           <div className="flex flex-col sm:flex-row items-start gap-6">
                              <div className="flex-shrink-0">
                                <Image src={job.logo} alt={`${job.company} logo`} width={64} height={64} className="rounded-md object-contain border" data-ai-hint="logo building" />
                              </div>
                              <div className="flex-grow">
                                  <h3 className="text-xl font-bold text-slate-800 hover:text-primary">
                                      <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                                  </h3>
                                  <p className="text-muted-foreground font-semibold">{job.company}</p>
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                                      <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</div>
                                      <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.type}</div>
                                  </div>
                              </div>
                              <div className="sm:text-right flex-shrink-0">
                                  <Button asChild>
                                      <Link href={`/jobs/${job.id}`}>View Details</Link>
                                  </Button>
                              </div>
                           </div>
                           <div className="border-t mt-4 pt-3 text-xs text-muted-foreground text-right">
                                Posted {job.posted} by <span className="font-semibold text-slate-600">{job.postedBy}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="text-center mt-8">
                <Button variant="outline">Load More Jobs</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
