import type { ForumPost } from '@/types';

async function getDiscussions(): Promise<ForumPost[]> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Case1.json";
  try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
          console.error('Failed to fetch discussions, returning empty array.');
          return [];
      }
      const discussions: ForumPost[] = await response.json();
      // Sort by date, newest first
      return Array.isArray(discussions) ? discussions.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) : [];
  } catch (error) {
      console.error('Error fetching or parsing discussions:', error);
      return [];
  }
}

export const demoDiscussions = await getDiscussions();
