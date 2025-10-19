
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
                            <p>Members only</p>
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
                        <CardContent className="p-4 grid grid-cols-12 items-start gap-4">
                            <div className="col-span-2 sm:col-span-1 h-16 w-16 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0">
                                <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 rounded-sm object-contain" data-ai-hint="logo building" />
                            </div>
                            <div className="col-span-10 sm:col-span-8 flex-grow">
                                <h3 className="text-lg font-bold text-slate-800 hover:text-primary">
                                    <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {job.company}</div>
                                    <span className="hidden sm:inline">&middot;</span>
                                    <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</div>
                                </div>
                                <div className="mt-2">
                                    <Badge>{job.type}</Badge>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-3 flex flex-col items-start sm:items-end justify-between h-full gap-2 text-sm w-full sm:w-auto">
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                                </Button>
                                <div className="flex items-center gap-2 text-muted-foreground w-full justify-end">
                                  <p>{job.applicants} applicants</p>
                                  <span className="text-muted-foreground/50">|</span>
                                  <span>{job.posted}</span>
                                </div>
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

    