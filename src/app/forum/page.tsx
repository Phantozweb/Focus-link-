
'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Eye, Paperclip, Lock, Search, Construction, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { demoDiscussions } from '@/lib/forum';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimeAgo } from '@/components/time-ago';


export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiscussions = demoDiscussions.filter((discussion) => {
    const term = searchTerm.toLowerCase();
    return (
      discussion.title.toLowerCase().includes(term) ||
      discussion.description.toLowerCase().includes(term) ||
      discussion.author.toLowerCase().includes(term) ||
      discussion.category.toLowerCase().includes(term) ||
      (discussion.tags && discussion.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  });

  return (
    <div className="bg-muted/40">
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Case Forum</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            A dedicated space for eye care professionals to share, discuss, and learn from real-world clinical cases.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <Alert className="mb-8 bg-yellow-50 border-yellow-200 text-yellow-900">
              <Construction className="h-4 w-4 !text-yellow-700" />
              <AlertTitle className="font-bold">Feature Coming Soon!</AlertTitle>
              <AlertDescription>
                The ability to post new discussions and reply is currently under development. For now, enjoy a preview of the types of cases our community will engage with.
              </AlertDescription>
            </Alert>
           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-auto md:flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search cases, tags, or categories..."
                  className="pl-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-right flex-shrink-0 w-full md:w-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button disabled className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Start a New Discussion
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Official membership required to post.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6 flex gap-4">
                           <Avatar className="hidden sm:block h-12 w-12 border">
                                <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-y-2">
                                    <Badge variant="secondary">{discussion.category}</Badge>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0">
                                      <div className="flex items-center gap-1.5" title="Upvotes"><ThumbsUp className="h-4 w-4" /> {discussion.upvotes}</div>
                                      <div className="flex items-center gap-1.5" title="Replies"><MessageSquare className="h-4 w-4" /> {discussion.replies}</div>
                                      <div className="flex items-center gap-1.5" title="Views"><Eye className="h-4 w-4" /> {discussion.views}</div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 hover:text-primary mt-2">
                                    <Link href={`/forum/${discussion.id}`}>{discussion.title}</Link>
                                </h3>
                                 <p className="text-sm text-slate-600 mt-1 line-clamp-2">{discussion.description}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                                    <Avatar className="sm:hidden h-6 w-6">
                                        <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                        <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Link href={`/profile/${discussion.authorId}`} className="font-semibold text-slate-700 hover:underline">{discussion.author}</Link>
                                    <span>&middot;</span>
                                    <span>Posted <TimeAgo dateString={discussion.postedDate} /></span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
