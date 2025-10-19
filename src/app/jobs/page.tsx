
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, Search, Building, Users, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Job Board | Focus Links',
  description: 'Find your next career opportunity in the eye care industry on the Focus Links job board. Browse listings from top clinics, hospitals, and companies. Coming soon!',
};

const demoJobs = [
    {
        id: 1,
        title: 'Full-Time Optometrist',
        company: 'VisionCare Associates',
        logo: 'https://picsum.photos/seed/c1/40/40',
        location: 'New York, NY',
        type: 'Full-Time',
        posted: '2 days ago',
        applicants: 12
    },
    {
        id: 2,
        title: 'Pediatric Optometrist Specialist',
        company: 'KidsEye Center',
        logo: 'https://picsum.photos/seed/c2/40/40',
        location: 'Los Angeles, CA',
        type: 'Part-Time',
        posted: '5 days ago',
        applicants: 5
    },
    {
        id: 3,
        title: 'Ophthalmic Technician',
        company: 'Advanced Eye Hospital',
        logo: 'https://picsum.photos/seed/c3/40/40',
        location: 'Chicago, IL',
        type: 'Full-Time',
        posted: '1 week ago',
        applicants: 28
    },
    {
        id: 4,
        title: 'Retail Optician',
        company: 'Modern Eyewear Co.',
        logo: 'https://picsum.photos/seed/c4/40/40',
        location: 'Houston, TX',
        type: 'Full-Time',
        posted: '1 week ago',
        applicants: 7
    }
];

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
        <div className="text-center mb-12 bg-card p-8 rounded-lg shadow-md border">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Coming Soon!</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our job board is under construction! Below is a preview of how you'll be able to browse and post job opportunities from top clinics, hospitals, and industry partners.
            </p>
        </div>

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
                      <div className="text-center">
                        <Button variant="secondary" className="w-full md:w-auto">Post a Job</Button>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                           <Lock className="h-3 w-3" /> Members only
                        </p>
                      </div>
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
                                    <Link href="#">{job.title}</Link>
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
                                    <Link href="#">View Details</Link>
                                </Button>
                                <div className="flex items-center gap-2 text-muted-foreground w-full justify-end">
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>{job.applicants} applicants</span>
                                  </div>
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
