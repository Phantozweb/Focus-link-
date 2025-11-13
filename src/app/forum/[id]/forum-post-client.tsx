
'use client';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ThumbsUp, Eye, Share2, Copy, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { ForumPost } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimeAgo } from '@/components/time-ago';
import { useToast } from '@/hooks/use-toast';
import { ShareButton } from '@/components/share-button';

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 !text-green-700"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91z"></path><path d="M16.99 13.28c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.69.87-.85 1.04-.15.18-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.12-.51.12-.12.27-.31.4-.42.14-.12.18-.2.27-.34.09-.14.05-.26-.02-.37-.07-.12-1.59-3.84-1.84-4.59-.24-.72-.49-.62-.67-.63-.17 0-.36-.01-.54-.01-.18 0-.48.07-.73.34-.25.27-.96.93-1.18 2.2s.22 3.12.25 3.34.96 2.21 2.33 3.65c1.93 2.03 3.15 2.65 4.34 3.25.98.49 1.58.53 2.12.51.58-.02 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28l-.07.02z"></path></svg>
            <AlertTitle className="font-bold">Share Case on WhatsApp</AlertTitle>
            <AlertDescription>
                Need a second opinion? Share this case with a colleague for a quick consultation.
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91z"></path><path d="M16.99 13.28c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.69.87-.85 1.04-.15.18-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.12-.51.12-.12.27-.31.4-.42.14-.12.18-.2.27-.34.09-.14.05-.26-.02-.37-.07-.12-1.59-3.84-1.84-4.59-.24-.72-.49-.62-.67-.63-.17 0-.36-.01-.54-.01-.18 0-.48.07-.73.34-.25.27-.96.93-1.18 2.2s.22 3.12.25 3.34.96 2.21 2.33 3.65c1.93 2.03 3.15 2.65 4.34 3.25.98.49 1.58.53 2.12.51.58-.02 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28l-.07.02z"></path></svg> Share via WhatsApp
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

  const processLine = (line: string): string => {
    return line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };
  
  const lines = markdown.split('\n');
  let html = '';
  let inList: 'ul' | 'ol' | null = null;
  let inBlockquote = false;

  const closeList = () => {
    if (inList) {
      html += `</${inList}>`;
      inList = null;
    }
  };
  
  const closeBlockquote = () => {
     if (inBlockquote) {
      closeList();
      html += `</div>`;
      inBlockquote = false;
    }
  };

  lines.forEach(line => {
    const trimmedLine = line.trim();

    // Handle blockquotes
    if (trimmedLine.startsWith('>')) {
      if (!inBlockquote) {
        closeList();
        html += `<div class="my-6 border-l-4 border-primary pl-4 italic text-slate-600 space-y-4">`;
        inBlockquote = true;
      }
      
      let blockquoteContent = trimmedLine.substring(1).trim();
      
      // Process markdown inside the blockquote line
      if (blockquoteContent.match(/^\d+\.\s/)) { // Ordered list item
        if (inList !== 'ol') { closeList(); html += `<ol class="list-decimal list-inside space-y-2">`; inList = 'ol'; }
        html += `<li>${processLine(blockquoteContent.replace(/^\d+\.\s/, ''))}</li>`;
      } else if (blockquoteContent.startsWith('- ')) { // Unordered list item
        if (inList !== 'ul') { closeList(); html += `<ul class="list-disc list-inside space-y-2">`; inList = 'ul'; }
        html += `<li>${processLine(blockquoteContent.substring(2))}</li>`;
      } else if (blockquoteContent.startsWith('### ')) {
         closeList();
         html += `<h3 class="text-xl font-bold text-slate-800 not-italic mt-6 mb-2">${processLine(blockquoteContent.replace('### ', ''))}</h3>`;
      } else if (blockquoteContent === '') {
        closeList();
      } else {
        closeList();
        html += `<p>${processLine(blockquoteContent)}</p>`;
      }
    } else {
      closeBlockquote();
      closeList();
      
      if (trimmedLine.startsWith('### ')) {
        html += `<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4">${processLine(trimmedLine.replace('### ', ''))}</h3>`;
      } else if (trimmedLine.match(/^\d+\.\s/)) {
        if (inList !== 'ol') { html += `<ol class="list-decimal list-inside space-y-2 my-4">`; inList = 'ol'; }
        html += `<li>${processLine(trimmedLine.replace(/^\d+\.\s/, ''))}</li>`;
      } else if (trimmedLine.startsWith('- ')) {
        if (inList !== 'ul') { html += `<ul class="list-disc list-inside space-y-2 my-4">`; inList = 'ul'; }
        html += `<li>${processLine(trimmedLine.substring(2))}</li>`;
      } else if (trimmedLine === '') {
        // This will be handled by block-level elements, effectively creating paragraph breaks
      } else {
        html += `<p class="my-4">${processLine(trimmedLine)}</p>`;
      }
    }
  });

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
                    <ShareButton title={`${discussion.title} on Focus Links`} text={`Check out this case on Focus Links: ${discussion.title}`} />
                </div>

                <Card>
                    <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary">{discussion.category}</Badge>
                             <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4" /> {discussion.upvotes}</div>
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
