
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ForumPostClient } from './forum-post-client';
import type { ForumPost } from '@/types';

type ForumPostPageProps = {
  params: { id: string }
}

async function getDiscussion(id: string): Promise<ForumPost | undefined> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Case1.json";
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error('Failed to fetch discussions.json');
      return undefined;
    }
    const discussions: ForumPost[] = await response.json();
    return Array.isArray(discussions) ? discussions.find(d => d.id === id) : undefined;
  } catch (error) {
    console.error('Error fetching or parsing discussions.json:', error);
    return undefined;
  }
}

export async function generateStaticParams() {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Case1.json";
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const discussions: ForumPost[] = await response.json();
    return Array.isArray(discussions) ? discussions.map((discussion) => ({
      id: discussion.id,
    })) : [];
  } catch (error) {
    console.error('Failed to fetch discussions for static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ForumPostPageProps): Promise<Metadata> {
    const discussion = await getDiscussion(params.id);
    if (!discussion) {
        return {
            title: 'Discussion Not Found'
        }
    }

    const title = `${discussion.title} | Focus Links Forum`;
    const description = discussion.description.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, ' ').substring(0, 160);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [discussion.avatar],
        },
        twitter: {
            card: 'summary',
            title,
            description,
            images: [discussion.avatar],
        }
    }
}

export default async function ForumPostPage({ params }: ForumPostPageProps) {
  const discussion = await getDiscussion(params.id);

  if (!discussion) {
    notFound();
  }

  return <ForumPostClient discussion={discussion} />;
}
