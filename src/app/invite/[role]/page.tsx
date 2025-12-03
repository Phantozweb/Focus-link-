'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { regionalHeads } from '@/lib/data/regional-heads';
import { inviteInfo } from '@/lib/data/invite-info';
import { notFound } from 'next/navigation';
import { MembershipForm } from '@/components/membership-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, Handshake, Linkedin, Mail } from 'lucide-react';

function InviteClient() {
  const searchParams = useSearchParams();
  const region = (searchParams.get('region') || 'default').toLowerCase();
  
  const head = regionalHeads.find(h => h.region.toLowerCase() === region);
  const info = inviteInfo[region] || inviteInfo['default'];

  if (!head) {
    // Render a default invite page or a 'not found' message
    // For now, let's use default info. A more robust solution might redirect.
    return (
         <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-8">
            <h1 className="text-3xl font-bold text-center">Invalid Invitation Link</h1>
            <p className="text-center text-muted-foreground">The invitation link is missing a valid region. Please check the URL or contact the person who invited you.</p>
        </div>
    );
  }

  return (
    <div className="bg-muted/40">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-8">
            <Card className="overflow-hidden">
                <CardHeader className="p-8 bg-card flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                        <AvatarImage src={head.avatarUrl} alt={head.name} />
                        <AvatarFallback>{head.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <p className="text-primary font-semibold">An invitation from your Regional Head</p>
                        <CardTitle className="text-3xl font-headline mt-1">{head.name}</CardTitle>
                        <CardDescription className="text-base mt-2">{info.welcomeMessage}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Handshake className="h-5 w-5 text-primary" /> Benefits for You</h3>
                            <ul className="mt-4 space-y-3">
                                {info.regionBenefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <span className="text-slate-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-slate-800">Contact</h3>
                            <p className="mt-2 text-slate-600">{info.contactInfo}</p>
                            <div className="flex items-center gap-2 mt-3">
                                {head.links.email && (
                                    <a href={`mailto:${head.links.email}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                                        <Mail className="h-4 w-4" /> Email
                                    </a>
                                )}
                                 {head.links.email && head.links.linkedin && <span>&middot;</span>}
                                {head.links.linkedin && (
                                    <a href={head.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                                        <Linkedin className="h-4 w-4" /> LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <MembershipForm />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}


export default function InvitePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InviteClient />
        </Suspense>
    )
}
