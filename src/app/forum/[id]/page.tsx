
import { demoDiscussions } from '@/lib/forum';
import { notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Paperclip, User, Bot, Send, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ForumPostPageProps = {
  params: { id: string }
}

export default function ForumPostPage({ params }: ForumPostPageProps) {
  const discussion = demoDiscussions.find(d => d.id === params.id);

  if (!discussion) {
    notFound();
  }
  
  return (
    <div className="bg-muted/40">
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <Link href="/forum" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Discussions
            </Link>

            <Card>
                <CardHeader className="p-6">
                    <Badge variant="secondary" className="w-fit mb-2">{discussion.category}</Badge>
                    <CardTitle className="text-3xl font-headline text-slate-800">{discussion.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">{discussion.author}</span>
                        </div>
                        <span>&middot;</span>
                        <span>Last activity {discussion.lastReply}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="prose prose-lg max-w-none text-slate-700 mb-8" dangerouslySetInnerHTML={{ __html: discussion.fullContent.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    
                    {discussion.media.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-4 text-slate-800">Attached Media</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {discussion.media.map((mediaItem, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden">
                                        <Image src={mediaItem.url} alt={mediaItem.caption} width={600} height={400} className="w-full object-cover" data-ai-hint="medical chart" />
                                        <p className="text-sm text-muted-foreground p-2 bg-slate-50">{mediaItem.caption}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator className="my-8" />
                    
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-slate-800">{discussion.replies} Replies</h3>
                        <div className="space-y-6">
                            {/* Reply Form */}
                             <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <Textarea placeholder="Add your reply..." className="mb-2" />
                                    <div className="flex justify-end items-center gap-2">
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Lock className="h-3 w-3" /> Membership required to reply.
                                        </p>
                                        <Button><Send className="h-4 w-4 mr-2" /> Submit Reply</Button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Example Reply */}
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://picsum.photos/seed/r1/40/40" alt="Dr. Sarah" data-ai-hint="portrait person" />
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow rounded-lg border bg-white p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-slate-800">Dr. Sarah Lee</p>
                                        <p className="text-xs text-muted-foreground">1 day ago</p>
                                    </div>
                                    <p className="text-slate-600">Great case. Given the rapid progression and atypical topography, I'd also consider Terrien's Marginal Degeneration, though the lack of vascularization makes it less likely. I agree that CXL seems like a prudent next step to stabilize the cornea before considering any refractive correction. Have you done a pachymetry map?</p>
                                </div>
                            </div>
                             {/* Example Reply 2 */}
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://picsum.photos/seed/r2/40/40" alt="Dr. James" data-ai-hint="portrait person" />
                                    <AvatarFallback>J</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow rounded-lg border bg-white p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-slate-800">Dr. James Green</p>
                                        <p className="text-xs text-muted-foreground">19 hours ago</p>
                                    </div>
                                    <p className="text-slate-600">I had a similar case last year. We proceeded with CXL, and the patient's cornea stabilized remarkably well. Six months post-op, we fitted a scleral lens, and the patient achieved 20/25 vision. Happy to share the follow-up data if interested.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    