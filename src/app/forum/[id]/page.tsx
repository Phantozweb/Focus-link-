
import { demoDiscussions } from '@/lib/forum';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ForumPostClient } from './forum-post-client';

type ForumPostPageProps = {
  params: { id: string }
}

export function generateMetadata({ params }: ForumPostPageProps): Metadata {
    const discussion = demoDiscussions.find(d => d.id === params.id);
    if (!discussion) {
        return {
            title: 'Discussion Not Found'
        }
    }

    const title = `${discussion.title} | Focus Links Forum`;
    const description = discussion.description;

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

export default function ForumPostPage({ params }: ForumPostPageProps) {
  const discussion = demoDiscussions.find(d => d.id === params.id);

  if (!discussion) {
    notFound();
  }

  return <ForumPostClient discussion={discussion} />;
}
