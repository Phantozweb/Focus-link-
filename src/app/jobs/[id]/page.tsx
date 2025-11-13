
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
  scroll: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z"/></svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
  white_check_mark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  moneybag: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  truck: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  gift: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>`,
};

function formatJobDescription(markdown: string) {
    let html = markdown;

    // Headings
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold font-headline mt-8 mb-4 text-slate-800">$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold font-headline mt-8 mb-4 text-slate-800">$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold font-headline mt-6 mb-3 text-slate-800">$1</h3>');

    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-slate-600 my-4">$1</blockquote>');

    // General Icon Replacement
    html = html.replace(/:(\w+):/g, (match, iconName) => {
        const key = iconName.toLowerCase().replace(/ /g, '_');
        if (lucideIconSVGs[key]) {
            return `<span class="inline-flex items-center justify-center align-middle mr-2">${lucideIconSVGs[key]}</span>`;
        }
        return match;
    });
    
    // Unordered lists (must run after icon replacement)
    html = html.replace(/^\* (.*?)$/gm, (match, content) => {
        const processedContent = content.trim();
        return `<li class="flex items-start gap-3"><span class="icon-placeholder text-primary mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-current rounded-full"></span><span class="text-slate-600">${processedContent}</span></li>`;
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
    html = html.replace(/<br \/>(\s*<br \/>)+/g, '<br /><br />'); // Consolidate multiple line breaks
    html = html.replace(/<br \/>(<h[1-3]>)/g, '$1'); // Remove line break before heading
    html = html.replace(/<br \/>(<blockquote)/g, '$1'); // Remove line break before blockquote
    html = html.replace(/<br \/>(<ul)/g, '$1'); // Remove line break before list

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
