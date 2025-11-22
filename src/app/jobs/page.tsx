
import type { Metadata } from 'next';
import { JobBoardClient } from '@/components/job-board-client';
import type { Job } from '@/types';

export const metadata: Metadata = {
  title: 'Job Board | Focus Links',
  description: 'Find your next career opportunity in the eye care industry on the Focus Links job board. Browse listings from top clinics, hospitals, and companies.',
};

async function getJobs(): Promise<Job[]> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Jobs1.json";
  try {
    const response = await fetch(url, { cache: 'no-store' });
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
        <p className="text-base opacity-90 max-w-xl mx-auto">
          Connecting vision professionals with leading employers worldwide.
        </p>
      </header>

       <main className="container mx-auto px-4 md:px-6 lg:px-8">
        <JobBoardClient allJobs={jobs} />
      </main>
    </div>
  );
}
