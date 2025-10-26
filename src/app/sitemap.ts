
import { MetadataRoute } from 'next'
import { allUsers } from '@/lib/data';
import { webinars } from '@/lib/academy';
import { demoJobs } from '@/lib/jobs';
import { demoDiscussions } from '@/lib/forum';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://focuslinks.pro';

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
    '/terms'
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

  const jobPages = demoJobs.map(job => ({
    url: `${siteUrl}/jobs/${job.id}`,
    lastModified: new Date(),
  }));

  const forumPages = demoDiscussions.map(discussion => ({
    url: `${siteUrl}/forum/${discussion.id}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...userProfiles,
    ...eventPages,
    ...jobPages,
    ...forumPages,
  ];
}
