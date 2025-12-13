
import { MetadataRoute } from 'next'
import { allUsers } from '@/lib/data/index';
import { webinars } from '@/lib/academy';
import { demoDiscussions } from '@/lib/forum';
import type { Job } from '@/types';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://focuslinks.in';

  const staticPages = [
    '', 
    '/about', 
    '/contact', 
    '/directory', 
    '/directory/students',
    '/directory/professionals',
    '/directory/institutions',
    '/directory/clinics',
    '/directory/industry',
    '/events', 
    '/forum', 
    '/jobs', 
    '/login', 
    '/membership', 
    '/profile/create',
    '/help-center',
    '/terms',
    '/resources/anatomy-of-the-eye-visual-guide',
    '/opto-tools/rapd-simulator',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const userProfiles = allUsers.map(user => ({
    url: `${siteUrl}/profile/${user.id}`,
    lastModified: new Date(),
  }));
  
  const eventPages = webinars.map(event => ({
    url: `${siteUrl}/events/${event.id}`,
    lastModified: new Date(),
  }));

  const forumPages = demoDiscussions.map(discussion => ({
    url: `${siteUrl}/forum/${discussion.id}`,
    lastModified: new Date(),
  }));
  
  let jobPages: MetadataRoute.Sitemap = [];
  try {
    const jobsUrl = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Jobs1.json";
    const response = await fetch(jobsUrl, { next: { revalidate: 3600 } });
    if (response.ok) {
        const jobs: Job[] = await response.json();
        jobPages = Array.isArray(jobs) ? jobs.map(job => ({
            url: `${siteUrl}/jobs/${job.id}`,
            lastModified: new Date(),
        })) : [];
    }
  } catch (error) {
    console.error('Failed to fetch jobs for sitemap:', error);
  }


  return [
    ...staticPages,
    ...userProfiles,
    ...eventPages,
    ...jobPages,
    ...forumPages,
  ];
}
