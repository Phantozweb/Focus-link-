
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Building, Check, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata, ResolvingMetadata } from 'next';
import type { Job } from '@/types';
import { ShareButton } from '@/components/share-button';
import { Separator } from '@/components/ui/separator';
import { TimeAgo } from '@/components/time-ago';

type JobDetailPageProps = {
  params: { id: string }
}

async function getJob(id: string): Promise<Job | undefined> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Jobs1.json";
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error('Failed to fetch jobs.json');
      return undefined;
    }
    const jobs: Job[] = await response.json();
    return Array.isArray(jobs) ? jobs.find(j => j.id === id) : undefined;
  } catch (error) {
    console.error('Error fetching or parsing jobs.json:', error);
    return undefined;
  }
}

export async function generateMetadata(
  { params }: JobDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const job = await getJob(params.id);

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

const lucideIconSVGs: { [key: string]: string } = {
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  award: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  'graduation-cap': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/></svg>`,
  'bar-chart': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
};

function formatJobDescription(markdown: string) {
    let html = markdown;

    // Headings
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold font-headline mt-8 mb-4 text-slate-800">$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold font-headline mt-8 mb-4 text-slate-800">$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold font-headline mt-6 mb-3 text-slate-800">$1</h3>');

    // Blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-slate-600 my-4">$1</blockquote>');

    // General Icon Replacement
    html = html.replace(/:(\w+-?\w+):/g, (match, iconName) => {
        const key = iconName.toLowerCase();
        if (lucideIconSVGs[key]) {
            return `<span class="inline-flex items-center justify-center align-middle mr-2">${lucideIconSVGs[key]}</span>`;
        }
        return match;
    });
    
    // Unordered lists
    html = html.replace(/^\* (.*?)$/gm, (match, content) => {
        return `<li class="flex items-start gap-3"><span class="icon-placeholder text-primary mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-current rounded-full"></span><span class="text-slate-600">${content.trim()}</span></li>`;
    });
    html = html.replace(/(<li class="flex items-start gap-3">.*?<\/li>)/gs, '<ul class="space-y-2 my-4">$1</ul>');
    html = html.replace(/<\/ul>\n<ul/g, '');


    // Tables
    const tableRegex = /(\|.*\|(?:\n\|.*\|)+)/g;
    html = html.replace(tableRegex, (match) => {
        const rows = match.trim().split('\n');
        const headerSeparator = rows[1];
        if (!headerSeparator || !headerSeparator.includes('|')) return match; // Not a valid table

        const header = `<thead><tr class="m-0 border-t p-0 even:bg-muted">${rows[0].split('|').slice(1, -1).map(cell => `<th class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</th>`).join('')}</tr></thead>`;
        
        const bodyRows = rows.slice(2);
        const body = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-muted">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;

        return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full">${header}${body}</table></div>`;
    });

    // Paragraphs and line breaks
    html = html.replace(/\n\n/g, '<br /><br />').replace(/\n/g, '<br />');

    return html;
}



export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  const isHttpLink = job.applyUrl.startsWith('http');
  const isMailtoLink = job.applyUrl.startsWith('mailto:');
  const isWhatsAppLink = job.applyUrl.startsWith('https://wa.me/');
  
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": `<p>${job.description.replace(/\n/g, ' ').replace(/###/g, '')}</p>`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Focus Links Job ID",
      "value": job.id
    },
    "datePosted": job.posted,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "logo": job.logo
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.split(',')[0],
        "addressCountry": job.location.split(',').pop()?.trim()
      }
    },
    "employmentType": job.type.toUpperCase().replace('-', '_'),
  };

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
    />
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
                           <Button size="lg" className="w-full" asChild>
                                <a 
                                  href={job.applyUrl} 
                                  target={(isHttpLink || isWhatsAppLink) ? "_blank" : "_self"} 
                                  rel={(isHttpLink || isWhatsAppLink) ? "noopener noreferrer" : undefined}
                                >
                                    Apply Now
                                </a>
                           </Button>
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
                       <Button size="lg" asChild>
                            <a 
                              href={job.applyUrl} 
                              target={(isHttpLink || isWhatsAppLink) ? "_blank" : "_self"} 
                              rel={(isHttpLink || isWhatsAppLink) ? "noopener noreferrer" : undefined}
                            >
                                Apply Now
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="text-xs text-center text-muted-foreground mt-4">
                Posted <TimeAgo dateString={job.posted} /> by <span className="font-semibold text-slate-700">{job.postedBy}</span>
            </div>
        </div>
    </div>
    </>
  );
}
