
'use client';
import { demoDiscussions } from '@/lib/forum';
import { notFound, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Paperclip, User, Bot, Send, Lock, Share2, Check, Info, AlertTriangle, MessageCircle, Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { ForumPostContentItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimeAgo } from '@/components/time-ago';
import { useToast } from '@/hooks/use-toast';


function WhatsAppShareBlock({ number, message, title }: { number: string, message: string, title: string }) {
    const { toast } = useToast();
    const pathname = usePathname();
    const caseUrl = `https://focuslinks.in${pathname}`;
    const fullMessage = `${title}\n\n${message}\n\nRead more on Focus Links:\n${caseUrl}`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(fullMessage)}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullMessage);
        toast({
            title: 'Copied to Clipboard',
            description: 'The case details and link have been copied.',
        });
    };

    return (
        <Alert className="bg-green-50 border-green-200 text-green-900 my-6">
            <MessageCircle className="h-5 w-5 !text-green-700" />
            <AlertTitle className="font-bold">Share Case on WhatsApp</AlertTitle>
            <AlertDescription>
                Need a second opinion? Share this case summary with a colleague for a quick consultation.
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-4 w-4 mr-2" /> Share via WhatsApp
                        </a>
                    </Button>
                    <Button size="sm" variant="outline" onClick={copyToClipboard} className="bg-white">
                        <Copy className="h-4 w-4 mr-2" /> Copy Text & Link
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
    );
}

function ContentRenderer({ content, title }: { content: ForumPostContentItem[], title: string }) {
  return (
    <div className="prose prose-lg max-w-none text-slate-700">
      {content.map((item, index) => {
        switch (item.type) {
          case 'heading':
            return <h2 key={index} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{item.content}</h2>;
          case 'subheading':
            return <h3 key={index} className="text-xl font-bold text-slate-800 mt-8 mb-4">{item.content}</h3>;
          case 'paragraph':
            return <p key={index}>{item.content}</p>;
          case 'list':
            return (
              <ul key={index} className="list-none p-0 space-y-3">
                {(item.content as string[]).map((li, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1 flex-shrink-0"><Check className="h-5 w-5" /></span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            );
          case 'alert':
            const Icon = item.variant === 'destructive' ? AlertTriangle : Info;
            const variantClass = {
                destructive: "bg-red-50 border-red-200 text-red-900",
                info: "bg-blue-50 border-blue-200 text-blue-900",
                default: "bg-slate-50 border-slate-200 text-slate-900"
            }[item.variant || 'default'];
            const iconClass = {
                 destructive: "!text-red-700",
                 info: "!text-blue-700",
                 default: "!text-slate-700"
            }[item.variant || 'default'];

            return (
              <Alert key={index} className={`my-6 ${variantClass}`}>
                <Icon className={`h-5 w-5 ${iconClass}`} />
                {item.title && <AlertTitle className="font-bold">{item.title}</AlertTitle>}
                <AlertDescription>{item.content}</AlertDescription>
              </Alert>
            );
          case 'whatsapp':
            if (item.whatsapp) {
              return <WhatsAppShareBlock key={index} number={item.whatsapp.number} message={item.content as string} title={title} />;
            }
            return null;
          default:
            return null;
        }
      })}
    </div>
  );
}


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
            <div className="flex items-center justify-between mb-6">
                 <Button variant="outline" asChild>
                    <Link href="/forum">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Discussions
                    </Link>
                </Button>
                <Share2 className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>

            <Card>
                <CardHeader className="p-6">
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary">{discussion.category}</Badge>
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4" /> {discussion.upvotes}</div>
                            <div className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> {discussion.replies}</div>
                            <div className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {discussion.views}</div>
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-headline text-slate-800 mt-4">{discussion.title}</CardTitle>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3">
                        <Link href={`/profile/${discussion.authorId}`} className="flex items-center gap-2 hover:underline">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-slate-800">{discussion.author}</span>
                        </Link>
                        <span>&middot;</span>
                        <span><TimeAgo dateString={discussion.postedDate} /></span>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <ContentRenderer content={discussion.content} title={discussion.title} />
                    
                    {discussion.media.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-4 text-slate-800">Attached Media</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {discussion.media.map((mediaItem, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden group">
                                        <div className="relative aspect-video">
                                            <Image src={mediaItem.url} alt={mediaItem.caption} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint="medical chart" />
                                        </div>
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
                             <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <Textarea placeholder="Add your reply..." className="mb-2" disabled />
                                    <div className="flex justify-end items-center gap-2">
                                       <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button disabled><Send className="h-4 w-4 mr-2" /> Submit Reply</Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                <p>Login with your member account to reply.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Example Replies */}
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://i.ibb.co/27Z4CkpY/IMG-20251004-WA0001.jpg" alt="Dr. Abhishek" data-ai-hint="portrait person" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow rounded-lg border bg-white p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-slate-800">Dr. Abhishek Kumar Banaita</p>
                                        <p className="text-xs text-muted-foreground">1 day ago</p>
                                    </div>
                                    <p className="text-slate-600">Great case. Given the rapid progression and atypical topography, I'd also consider Terrien's Marginal Degeneration, though the lack of vascularization makes it less likely. I agree that CXL seems like a prudent next step to stabilize the cornea before considering any refractive correction. Have you done a pachymetry map?</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://i.ibb.co/v6XJ3B7X/1747244504223.jpg" alt="Rudra Kumar Sinha" data-ai-hint="portrait person" />
                                    <AvatarFallback>R</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow rounded-lg border bg-white p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-slate-800">Rudra Kumar Sinha</p>
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
