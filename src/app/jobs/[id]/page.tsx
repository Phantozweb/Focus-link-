
import { demoJobs } from '@/lib/jobs';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Building, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata, ResolvingMetadata } from 'next';
import { ShareButton } from '@/components/share-button';
import { Separator } from '@/components/ui/separator';

type JobDetailPageProps = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: JobDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const job = demoJobs.find(j => j.id === params.id);

  if (!job) {
    return {
      title: 'Job Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const title = `${job.title} at ${job.company} | Focus Links Jobs`;
  const description = job.description.substring(0, 160);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [job.logo, ...previousImages],
    },
     twitter: {
      card: 'summary',
      title,
      description,
      images: [job.logo],
    },
  }
}

function formatJobDescription(markdown: string) {
  return markdown
    .replace(/^### (.*?)$/gm, '<h2 class="text-xl font-bold font-headline mt-8 mb-4 text-slate-800">$1</h2>')
    .replace(/^\* (.*?)$/gm, (match, content) => {
        return `<li class="flex items-start gap-3"><span class="icon-placeholder text-primary mt-1 flex-shrink-0">&#10003;</span><span class="text-slate-600">${content}</span></li>`;
    })
    .replace(/(<li.*<\/li>)/gs, '<ul class="space-y-3">$1</ul>')
    .replace(/\n\n/g, '<br /><br />');
}


export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = demoJobs.find(j => j.id === params.id);

  if (!job) {
    notFound();
  }
  
  return (
    <div className="bg-muted/40">
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                 <Button variant="outline" asChild>
                    <Link href="/jobs">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Jobs
                    </Link>
                </Button>
                <ShareButton title={`${job.title} at ${job.company}`} text={`Check out this job opening on Focus Links: ${job.title} at ${job.company}`} />
            </div>

            <Card>
                <CardHeader className="p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="flex-grow">
                            <Badge className="mb-2">{job.type}</Badge>
                            <CardTitle className="text-3xl font-headline text-slate-800">{job.title}</CardTitle>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-muted-foreground mt-2">
                                <div className="flex items-center gap-2"><Building className="h-5 w-5" />{job.company}</div>
                                <div className="flex items-center gap-2"><MapPin className="h-5 w-5" />{job.location}</div>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto flex-shrink-0">
                           <Button size="lg" className="w-full">Apply Now</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                   <Separator className="my-6" />
                   
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formatJobDescription(job.description) }} />
                   
                    <Separator className="my-8" />
                    
                    <div className="text-center space-y-4">
                       <h3 className="text-lg font-semibold">Ready to Apply?</h3>
                       <p className="text-muted-foreground max-w-md mx-auto">Click the button below to be redirected to the application page for this exciting opportunity.</p>
                       <Button size="lg">Apply Now</Button>
                    </div>
                </CardContent>
            </Card>
            <div className="text-xs text-center text-muted-foreground mt-4">
                Posted {job.posted} by <span className="font-semibold text-slate-700">{job.postedBy}</span>
            </div>
        </div>
    </div>
  );
}
