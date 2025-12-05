
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { ForumPost } from '@/types';
import { TimeAgo } from '@/components/time-ago';

export function HomeForumPost({ discussion }: { discussion: ForumPost }) {

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
                {discussion.upvotes}
              </div>
              <div className="flex items-center gap-1.5" title="Views">
                <Eye className="h-4 w-4" />
                {discussion.views}
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
