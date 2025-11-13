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

function WhatsAppShareBlock({ title }: { title: string }) {
    const { toast } = useToast();
    const pathname = usePathname();
    const caseUrl = `https://focuslinks.in${pathname}`;
    const fullMessage = `Check out this case on Focus Links:\n"${title}"\n\nRead more here:\n${caseUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;

    const copyToClipboard = () => {
        const messageToCopy = `Check out this interesting case study on Focus Links: "${title}". See the full details here: ${caseUrl}`;
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

function formatForumContent(text: string) {
    if (!text) return '';
    let html = text;
    // Headings
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4">$1</h3>');
    // Blockquotes
    html = html.replace(/^> #### (.*?)\n> (.*)/gm, (match, title, content) => {
        const variant = title.toLowerCase().includes('question') ? 'info' : (title.toLowerCase().includes('dilemma') ? 'destructive' : 'default');
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
         return `<div role="alert" class="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground my-6 ${variantClass}">${icon}<h5 class="mb-1 font-bold leading-none tracking-tight">${title}</h5><div class="text-sm [&_p]:leading-relaxed">${content.replace(/\n> /g, '<br/>')}</div></div>`;
    });
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Unordered lists
    html = html.replace(/^- (.*?)(?:\n|$)/gm, '<li class="flex items-start gap-3 mt-3"><span class="text-primary mt-1 flex-shrink-0">&#10003;</span><span>$1</span></li>');
    html = html.replace(/(<li.*<\/li>)/gs, (match) => `<ul class="list-none p-0">${match.replace(/\n\n/g, '\n')}</ul>`);
    // Tables
    const tableRegex = /(\|.*\|(?:\r?\n|\r|\n\|.*\|)+)/g;
    html = html.replace(tableRegex, (match) => {
        const rows = match.trim().split('\n');
        const headerSeparator = rows[1];
        if (!headerSeparator || !headerSeparator.includes('|')) return match; 
        const tableHead = `<thead><tr class="m-0 border-t p-0 even:bg-muted">${rows[0].split('|').slice(1, -1).map(cell => `<th class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</th>`).join('')}</tr></thead>`;
        const bodyRows = rows.slice(2);
        const tableBody = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-muted">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;
        return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full">${tableHead}${tableBody}</table></div>`;
    });
    // Paragraphs and line breaks
    html = html.replace(/\n/g, '<br />');

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
                        <div className="prose prose-lg max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: formatForumContent(discussion.content) }} />
                        
                        <WhatsAppShareBlock title={discussion.title} />

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
                                                        <Button disabled><MessageCircle className="h-4 w-4 mr-2" /> Submit Reply</Button>
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
