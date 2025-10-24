
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Award, BookOpen, Handshake, Globe, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { MembershipForm } from '@/components/membership-form';

const membershipPerks = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Official Member Status",
    description: "Receive a verified badge on your profile to stand out as a trusted member of the community."
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Priority Academy Access",
    description: "Get early notifications and priority registration for exclusive webinars and workshops."
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "Exclusive Networking",
    description: "Gain access to member-only channels and events to connect with peers, mentors, and collaborators."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Community Recognition",
    description: "Get opportunities to be featured in our newsletters and on our platform, showcasing your expertise."
  }
];


export default function MembershipPage() {
  const whatsAppCommunityLink = "https://chat.whatsapp.com/E5O5Y5Z2Y3Z2Z5Y5Z2Y3Z2"; // Replace with your actual WhatsApp link

  return (
    <>
     <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Become an Official Member</h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                   Submit your application to get verified, create your official directory profile, and unlock exclusive community perks.
                </p>
            </div>
        </section>

        <div id="membership-join" className="container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
            <MembershipForm />
        </div>
        
        <section className="py-16 bg-background border-t border-b">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800">Exclusive Membership Perks</h2>
                    <p className="mt-2 text-lg text-slate-600">Go beyond the directory. Unlock benefits available only to official members.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {membershipPerks.map((perk, index) => (
                        <div key={index} className="text-center p-6 bg-card rounded-lg shadow-sm border">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                                {perk.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{perk.title}</h3>
                            <p className="text-slate-600">{perk.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <div className="container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
            <Card className='bg-slate-800 text-white'>
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                        <MessageCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Join our WhatsApp Community</CardTitle>
                    <CardDescription className="mt-1 text-base text-slate-300">
                        While your official membership application is being reviewed, join our WhatsApp community for discussions, event updates, and networking. Note that this is separate from official membership.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href={whatsAppCommunityLink} target="_blank" rel="noopener noreferrer">
                      Join WhatsApp
                    </a>
                  </Button>
                   <p className="text-xs text-slate-400 mt-2">You will be redirected to WhatsApp.</p>
                </CardContent>
            </Card>
        </div>
    </div>
    </>
  );
}
