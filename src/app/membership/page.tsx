
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Award, BookOpen, Handshake, Globe } from 'lucide-react';
import Link from 'next/link';

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
                    Join our WhatsApp community for free to get verified, access exclusive perks, and become a recognized part of the world's largest eye care community.
                </p>
            </div>
        </section>

        <div id="membership-join" className="container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <UserPlus className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Join Our Community</CardTitle>
                    <CardDescription className="mt-1 text-base">
                        As we are in the early stages of building our platform, we invite you to join our official WhatsApp community. This is the fastest way to get connected with the core team, apply for verification, and get early access to new features.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button size="lg" asChild>
                    <a href={whatsAppCommunityLink} target="_blank" rel="noopener noreferrer">
                      Join the WhatsApp Community
                    </a>
                  </Button>
                   <p className="text-xs text-muted-foreground mt-2">You will be redirected to WhatsApp.</p>
                </CardContent>
            </Card>
        </div>
        
        <section className="py-16">
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
    </div>
    </>
  );
}
