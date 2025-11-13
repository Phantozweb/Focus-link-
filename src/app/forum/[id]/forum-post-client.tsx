
'use client';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Lock, Share2, Check, Info, AlertTriangle, MessageCircle, Copy, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { ForumPost } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimeAgo } from '@/components/time-ago';
import { useToast } from '@/hooks/use-toast';

function WhatsAppShareBlock({ title, description }: { title: string, description: string }) {
    const { toast } = useToast();
    const pathname = usePathname();
    const caseUrl = `https://focuslinks.in${pathname}`;
    const fullMessage = `Check out this case on Focus Links:\n"${title}"\n\nRead more here:\n${caseUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;

    const copyToClipboard = () => {
        const messageToCopy = `Check out this interesting case study on Focus Links:\n\n*${title}*\n${description}\n\nSee the full details here: ${caseUrl}`;
        navigator.clipboard.writeText(messageToCopy);
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
                Need a second opinion? Share this case with a colleague for a quick consultation.
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

function formatForumContent(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  let html = '';
  let listType: 'ul' | 'ol' | null = null;
  let inBlockquote = false;
  let blockquoteContent = '';

  const closeList = () => {
    if (listType) {
      html += `</${listType}>`;
      listType = null;
    }
  };
  
  const closeBlockquote = () => {
    if (inBlockquote) {
      const titleMatch = blockquoteContent.match(/^###\s(.*?)(?:\n|$)/);
      const title = titleMatch ? titleMatch[1] : 'Clinical Discussion';
      const content = titleMatch ? blockquoteContent.substring(titleMatch[0].length).trim() : blockquoteContent.trim();
      
      const isQuestion = title.toLowerCase().includes('question') || title.toLowerCase().includes('advice');
      const isDilemma = title.toLowerCase().includes('dilemma');
      let variant: 'info' | 'destructive' | 'default' = 'default';
      if (isQuestion) variant = 'info';
      if (isDilemma) variant = 'destructive';
       const icon = {
          info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info h-5 w-5 !text-blue-700"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
          destructive: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle h-5 w-5 !text-red-700"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
          default: ''
      }[variant];
       const variantClass = {
          destructive: "bg-red-50 border-red-200 text-red-900",
          info: "bg-blue-50 border-blue-200 text-blue-900",
          default: "bg-slate-50 border-slate-200 text-slate-900"
      }[variant];

      const processedContent = formatForumContent(content); // Recursive call
      html += `<div role="alert" class="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground my-6 ${variantClass}">${icon}<h5 class="mb-1 font-bold leading-none tracking-tight">${title}</h5><div class="text-sm [&_p]:leading-relaxed">${processedContent}</div></div>`;

      blockquoteContent = '';
      inBlockquote = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith('>')) {
      closeList();
      if (!inBlockquote) {
        inBlockquote = true;
      }
      blockquoteContent += line.replace(/^>\s?/, '') + '\n';
      continue;
    }

    if (inBlockquote) {
      closeBlockquote();
    }
    
    if (line.startsWith('### ')) {
      closeList();
      html += `<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4">${line.substring(4)}</h3>`;
    } else if (line.startsWith('- ')) {
      if (listType !== 'ul') {
        closeList();
        html += `<ul class="list-disc list-inside space-y-2 my-4 pl-4">`;
        listType = 'ul';
      }
      html += `<li>${line.substring(2)}</li>`;
    } else if (line.match(/^\d+\.\s/)) {
      if (listType !== 'ol') {
        closeList();
        html += `<ol class="list-decimal list-inside space-y-2 my-4 pl-4">`;
        listType = 'ol';
      }
      html += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
    } else if (line.trim() === '') {
      closeList();
      html += '<br />';
    } else {
      closeList();
      html += `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
    }
  }

  closeList();
  closeBlockquote();

  return html;
}

export function ForumPostClient({ discussion }: { discussion: ForumPost }) {
    const pathname = usePathname();
    const { toast } = useToast();

    const handleShare = async () => {
        const shareData = {
          title: discussion.title,
          text: discussion.description,
          url: window.location.href,
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
             if ((err as Error).name !== 'AbortError') {
               console.error('Share failed:', err);
            }
          }
        } else {
          await navigator.clipboard.writeText(shareData.url);
          toast({
            title: 'Link Copied!',
            description: 'The link to this discussion has been copied to your clipboard.',
          });
        }
    };
    
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
                    <Button onClick={handleShare} variant="ghost" size="icon">
                        <Share2 className="h-5 w-5 text-muted-foreground" />
                    </Button>
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
                        <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: formatForumContent(discussion.content) }} />
                        
                        <WhatsAppShareBlock title={discussion.title} description={discussion.description} />

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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
