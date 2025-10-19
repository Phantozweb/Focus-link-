
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Eye, Paperclip, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Discussion Forum | Focus Links',
  description: 'Engage with eye care professionals in our case discussion forum. Share your insights, ask questions, and collaborate on complex cases. Coming soon!',
};

const demoDiscussions = [
  {
    id: 1,
    title: 'Unusual Presentation of Keratoconus in a Young Patient',
    author: 'Dr. Emily Carter',
    avatar: 'https://picsum.photos/seed/p1/40/40',
    category: 'Cornea & External Disease',
    description: 'A 19-year-old male presented with rapidly progressing astigmatism and visual distortion in the left eye. Topography reveals an atypical pattern, not classic for Pellucid Marginal Degeneration or Keratoconus. Looking for opinions on differential diagnosis and management strategies...',
    mediaCount: 2,
    replies: 12,
    views: 156,
    upvotes: 45,
    lastReply: '2 hours ago',
  },
  {
    id: 2,
    title: 'Managing Progressive Myopia in Children: What’s Working?',
    author: 'Dr. Ben Hanson',
    avatar: 'https://picsum.photos/seed/p2/40/40',
    category: 'Pediatric Optometry',
    description: 'Sharing a case of an 8-year-old with a -1.50D/year progression rate. We\'ve tried multifocal soft lenses with limited success. Has anyone had consistent results with Atropine 0.05% or new DIMS lenses in similar cases? Seeking practical insights.',
    mediaCount: 0,
    replies: 34,
    views: 432,
    upvotes: 88,
    lastReply: '5 hours ago',
  },
  {
    id: 3,
    title: 'Atypical Macular Degeneration Case Study',
    author: 'Dr. Aisha Khan',
    avatar: 'https://picsum.photos/seed/p3/40/40',
    category: 'Retina',
    description: 'Patient is a 55-year-old female with drusen deposits but no CNV, yet experiencing significant central vision loss. OCT and FAF images attached. Is this a rare form of AMD or could it be a macular dystrophy? All thoughts are welcome.',
    mediaCount: 3,
    replies: 21,
    views: 289,
    upvotes: 62,
    lastReply: '1 day ago',
  },
   {
    id: 4,
    title: 'Best Practices for Fitting Scleral Lenses Post-Corneal Transplant',
    author: 'Optom. David Chen',
    avatar: 'https://picsum.photos/seed/p4/40/40',
    category: 'Contact Lenses',
    description: 'I have a patient who underwent a penetrating keratoplasty 1 year ago and now requires a scleral lens for visual rehabilitation. The graft is clear, but the topography is highly irregular. Looking for tips on initial lens selection and vaulting strategies.',
    mediaCount: 1,
    replies: 18,
    views: 205,
    upvotes: 51,
    lastReply: '3 days ago',
  },
];


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
        <div className="text-center mb-12 bg-card p-8 rounded-lg shadow-md border">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Coming Soon!</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                We are building an interactive and secure forum for case discussions. Below is a preview of what you can expect. 
                Stay tuned for a platform where you can collaborate with peers and enhance your clinical knowledge.
            </p>
        </div>

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
                                    <Link href="#">{discussion.title}</Link>
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
