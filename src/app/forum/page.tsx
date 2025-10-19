
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Eye, Paperclip, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { demoDiscussions } from '@/lib/forum';

export const metadata: Metadata = {
  title: 'Case Discussion Forum | Focus Links',
  description: 'Engage with eye care professionals in our case discussion forum. Share your insights, ask questions, and collaborate on complex cases.',
};

export default function ForumPage() {
  return (
    <div className="bg-muted/40">
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Case Discussion Forum</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            A dedicated space for eye care professionals to share, discuss, and learn from real-world clinical cases.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
           <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Trending Discussions</h2>
                <div className="text-right">
                  <Button>Start a New Discussion</Button>
                   <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                      <Lock className="h-3 w-3" /> Membership required to post.
                   </p>
                </div>
            </div>
            <div className="space-y-4">
                {demoDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start">
                            <div className="flex-shrink-0 flex flex-col items-center gap-2 w-full sm:w-20 text-center">
                                <Button variant="outline" size="sm" className="w-full">
                                    <ThumbsUp className="h-4 w-4 mr-2" /> {discussion.upvotes}
                                </Button>
                                <div className="text-sm text-muted-foreground flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> {discussion.replies}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1.5"><Eye className="h-4 w-4" /> {discussion.views}</div>
                            </div>
                            <div className="flex-grow">
                                <Badge variant="secondary" className="mb-2">{discussion.category}</Badge>
                                <h3 className="text-lg font-bold text-slate-800 hover:text-primary">
                                    <Link href={`/forum/${discussion.id}`}>{discussion.title}</Link>
                                </h3>
                                 <p className="text-sm text-slate-600 mt-1 line-clamp-2">{discussion.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                          <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                          <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span>{discussion.author}</span>
                                    </div>
                                    <span>&middot;</span>
                                    <span>Last reply {discussion.lastReply}</span>
                                     {discussion.mediaCount > 0 && (
                                      <>
                                        <span>&middot;</span>
                                        <span className="flex items-center gap-1">
                                          <Paperclip className="h-4 w-4" /> {discussion.mediaCount}
                                        </span>
                                      </>
                                    )}
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
