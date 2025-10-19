
import { demoJobs } from '@/lib/jobs';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Building, Briefcase, Check, Users } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type JobDetailPageProps = {
  params: { id: string }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = demoJobs.find(j => j.id === params.id);

  if (!job) {
    notFound();
  }
  
  return (
    <div className="bg-muted/40">
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Jobs
            </Link>

            <Card>
                <CardHeader className="p-6 flex flex-col sm:flex-row items-start gap-6">
                    <Image src={job.logo} alt={`${job.company} logo`} width={80} height={80} className="rounded-md object-contain" data-ai-hint="logo building" />
                    <div>
                        <Badge className="mb-2">{job.type}</Badge>
                        <CardTitle className="text-3xl font-headline text-slate-800">{job.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mt-2">
                            <div className="flex items-center gap-2"><Building className="h-5 w-5" />{job.company}</div>
                            <div className="flex items-center gap-2"><MapPin className="h-5 w-5" />{job.location}</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">Job Description</h2>
                                <p className="text-slate-600 whitespace-pre-wrap">{job.description}</p>
                            </section>
                             <section>
                                <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">Responsibilities</h2>
                                <ul className="space-y-3">
                                  {job.responsibilities.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                      <span className="text-slate-600">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                            </section>
                             <section>
                                <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">Qualifications</h2>
                                 <ul className="space-y-3">
                                  {job.qualifications.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                      <span className="text-slate-600">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                            </section>
                        </div>
                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="sticky top-24 space-y-4">
                               <Button size="lg" className="w-full">Apply Now</Button>
                               <Card className="bg-slate-50">
                                   <CardHeader>
                                        <CardTitle className="text-lg font-bold">About {job.company}</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                        <p className="text-sm text-slate-600">More information about the company would go here, describing their mission, values, and work environment.</p>
                                   </CardContent>
                               </Card>
                                <div className="text-sm text-center text-muted-foreground">
                                    Posted {job.posted} by {job.postedBy}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    