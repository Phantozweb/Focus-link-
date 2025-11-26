

import type { Metadata } from 'next';
import { JobBoardClient } from '@/components/job-board-client';
import type { Job } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Job Board | Focus Links',
  description: 'Find your next career opportunity in the eye care industry on the Focus Links job board. Browse listings from top clinics, hospitals, and companies.',
};

async function getJobs(): Promise<Job[]> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Jobs1.json";
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error('Failed to fetch jobs.json, returning empty array.');
      return [];
    }
    const jobs = await response.json();
    return Array.isArray(jobs) ? jobs.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime()) : [];
  } catch (error) {
    console.error('Error fetching or parsing jobs.json:', error);
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Find Your Next Role</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto mb-8">
          Connecting vision professionals with leading employers worldwide.
        </p>
         <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search job title, keywords, or company..."
                className="w-full pl-12 h-12 rounded-full bg-white/90 text-slate-800 placeholder:text-slate-500"
              />
            </div>
        </div>
      </header>

       <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
        <JobBoardClient allJobs={jobs} />
      </main>
    </div>
  );
}
