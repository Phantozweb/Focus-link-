
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { ForumPost } from '@/types';
import { TimeAgo } from '@/components/time-ago';
import { Skeleton } from '@/components/ui/skeleton';

export function HomeForumPost({ discussion }: { discussion: ForumPost }) {
  const [stats, setStats] = useState<{ likes: number; views: number } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`/api/case-stats?id=${discussion.id}`);
        const data = await response.json();
        if (data.likes !== undefined && data.views !== undefined) {
          setStats(data);
        } else {
          setStats({ likes: discussion.upvotes, views: discussion.views }); // Fallback
        }
      } catch (error) {
        console.error("Failed to fetch case stats:", error);
        setStats({ likes: discussion.upvotes, views: discussion.views }); // Fallback on error
      }
    }
    fetchStats();
  }, [discussion.id, discussion.upvotes, discussion.views]);

  return (
    <Card className="hover:shadow-hover transition-shadow rounded-3xl shadow-soft">
      <CardContent className="p-4 sm:p-6 flex gap-4">
        <Avatar className="hidden sm:block h-12 w-12 border">
          <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
          <AvatarFallback>{discussion.author?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-y-2">
            <Badge variant="secondary">{discussion.category}</Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0">
              <div className="flex items-center gap-1.5" title="Upvotes">
                <ThumbsUp className="h-4 w-4" />
                {stats ? stats.likes : <Skeleton className="h-4 w-6" />}
              </div>
              <div className="flex items-center gap-1.5" title="Views">
                <Eye className="h-4 w-4" />
                {stats ? stats.views : <Skeleton className="h-4 w-8" />}
              </div>
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-800 hover:text-primary mt-2">
            <Link href={`/forum/${discussion.id}`}>{discussion.title}</Link>
          </h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{discussion.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
            <Avatar className="sm:hidden h-6 w-6">
              <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
              <AvatarFallback>{discussion.author?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link href={`/profile/${discussion.authorId}`} className="font-semibold text-slate-700 hover:underline">{discussion.author}</Link>
            <span>&middot;</span>
            <span>Posted <TimeAgo dateString={discussion.postedDate} /></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
