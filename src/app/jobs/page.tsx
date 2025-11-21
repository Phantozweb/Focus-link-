
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
    // Fetch with no-store to ensure we always get the latest jobs
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error('Failed to fetch jobs.json, returning empty array.');
      return [];
    }
    const jobs = await response.json();
    // Sort jobs by date, newest first
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
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Job Board</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          Discover your next career move. Connect with leading employers in the eye care industry.
        </p>
      </header>

       <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
        <JobBoardClient allJobs={jobs} />
      </main>
    </div>
  );
}
