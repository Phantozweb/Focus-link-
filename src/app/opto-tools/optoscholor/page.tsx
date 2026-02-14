
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Search, UserPlus, GraduationCap, Stethoscope, Microscope, AlertTriangle, ArrowRight, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do optometry professionals need a specialized research engine like OptoScholar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "General academic search engines like PubMed or Google Scholar are broad by design and often produce results diluted with non-clinical biomedical data. OptoScholar is structured specifically for clinical optometry, ophthalmic disease management, and vision science literature, which eliminates irrelevant search noise and accelerates research precision."
        }
      },
      {
        "@type": "Question",
        "name": "What makes OptoScholar different from PubMed or Google Scholar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OptoScholar differentiates itself through: 1. Curated Eye-Care Indexing of only peer-reviewed optometry and ophthalmology journals. 2. Clinical Relevance Ranking that weights results by citation impact and guideline relevance. 3. Evidence-Based Filtering for study types like RCTs, Meta-Analyses, and Clinical Guidelines. 4. Fast Abstract-Level Access for quick review."
        }
      },
      {
        "@type": "Question",
        "name": "Who is OptoScholar built for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OptoScholar is built for Optometry Students (for exam prep, thesis research), Practicing Clinicians (for chair-side condition lookup, updated management protocols), and Researchers/Academics (for literature reviews, citation tracking)."
        }
      }
    ]
  };

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OptoScholar – Optometry & Ophthalmology Research Engine",
  "operatingSystem": "Web Browser",
  "applicationCategory": "EducationalApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Curated Eye-Care Indexing",
    "Clinical Relevance Ranking",
    "Evidence-Based Filtering",
    "Fast Abstract-Level Access"
  ],
  "description": "A specialized clinical search engine indexing over 1 million optometry and ophthalmology articles."
};


export default function OptoScholarPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [membershipId, setMembershipId] = useState('');
    const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');

    const handleVerify = async () => {
        if (!membershipId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter a membership ID.' });
            return;
        }
        setIdStatus('loading');
        try {
            const response = await fetch('/api/verify-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ membershipId }),
            });
            const data = await response.json();
            if (data.isValid) {
                setIdStatus('valid');
                toast({ title: 'Success', description: 'Membership ID verified.' });
            } else {
                setIdStatus('invalid');
                toast({ variant: 'destructive', title: 'Error', description: 'Invalid or expired membership ID.' });
            }
        } catch (error) {
            setIdStatus('invalid');
            toast({ variant: 'destructive', title: 'Error', description: 'An error occurred during verification.' });
        }
    };
    
    const handleLaunch = () => {
        if (idStatus === 'valid') {
            sessionStorage.setItem('optoscholar_access_id', membershipId);
            router.push('/opto-tools/optoscholor/launch');
        } else {
            toast({ variant: 'destructive', title: 'Verification Required', description: 'Please verify your membership ID to launch the tool.' });
        }
    };


    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <div className="bg-white">
                <div className="bg-slate-50 border-b">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">OptoScholar – Specialized Clinical Search Engine for Optometry & Ophthalmology</h1>
                        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                           OptoScholar is a discipline-specific research engine designed exclusively for optometry and ophthalmology. Unlike general academic platforms such as PubMed and Google Scholar, OptoScholar filters and prioritizes clinically relevant, peer-reviewed eye-care research to support students, clinicians, and researchers in making evidence-based decisions.
                        </p>
                    </div>
                </div>

                 <main className="container mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
                     <section>
                        <h2 className="text-3xl font-bold text-slate-800 text-center">Why Optometry Professionals Need a Specialized Research Engine</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto text-center">
                            General academic search engines are broad by design. While powerful, they often produce results diluted with non-clinical biomedical data. OptoScholar is structured specifically for:
                        </p>
                         <div className="mt-8 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            <ListItem>Clinical optometry research</ListItem>
                            <ListItem>Ophthalmic disease management</ListItem>
                            <ListItem>Evidence-based practice</ListItem>
                            <ListItem>Vision science literature</ListItem>
                            <ListItem>Subspecialty-focused indexing (cornea, retina, glaucoma, etc.)</ListItem>
                        </div>
                        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto text-center">This eliminates irrelevant search noise and accelerates research precision.</p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-800 text-center">What Makes OptoScholar Different?</h2>
                        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <FeatureCard title="Curated Eye-Care Indexing" text="Only peer-reviewed optometry and ophthalmology journals are indexed." />
                            <FeatureCard title="Clinical Relevance Ranking" text="Search results are weighted by citation impact, guideline relevance, and clinical applicability." />
                            <FeatureCard title="Evidence-Based Filtering" text="Filter by: Randomized Controlled Trials, Meta-Analyses, Systematic Reviews, Case Reports, and Clinical Guidelines." />
                            <FeatureCard title="Fast Abstract-Level Access" text="OptoScholar indexes abstracts and references for speed. Full-text access is routed through official journal publishers or institutional credentials." />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-800 text-center">Who Is OptoScholar Built For?</h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <UserCard icon={<GraduationCap />} title="Optometry Students" items={["Exam preparation", "Thesis literature review", "Case study referencing", "Clinical assignment research"]} />
                            <UserCard icon={<Stethoscope />} title="Practicing Clinicians" items={["Chair-side condition lookup", "Drug interaction review", "Updated management protocols", "Rare case reference"]} />
                            <UserCard icon={<Microscope />} title="Researchers & Academics" items={["Citation tracking", "Impact-factor-based filtering", "Comprehensive literature reviews", "Export-ready references"]} />
                        </div>
                    </section>

                    <section className="bg-slate-50 p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-slate-800 text-center">Global Database Access for Eye-Care Research</h2>
                         <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto text-center">
                            OptoScholar aggregates and structures over 1,000,000+ research abstracts from indexed optometry and ophthalmology sources. It works alongside major research ecosystems including PubMed, Google Scholar, and institutional journal access portals. This ensures compliant, fast, and reliable data routing.
                        </p>
                    </section>

                    <section>
                         <h2 className="text-3xl font-bold text-slate-800 text-center">Why OptoScholar is Integrated Within FocusLinks</h2>
                         <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto text-center">
                            OptoScholar operates as the research intelligence module inside FocusLinks. This integration allows for academic networking, structured knowledge sharing, research collaboration, and community-driven journal suggestions. It is not just a search tool; it is part of a growing optometry-focused ecosystem.
                         </p>
                    </section>
                    
                    <section className="text-center">
                        <Card className="max-w-2xl mx-auto p-8 bg-slate-800 text-white">
                            <h2 className="text-2xl font-bold">Access OptoScholar Now</h2>
                             <p className="mt-2 text-slate-300">
                                Cut through academic clutter and access clinically structured research designed specifically for the eye-care discipline.
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="mt-6">
                                        <Search className="mr-2 h-5 w-5" /> Launch OptoScholar
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Membership Verification</DialogTitle>
                                        <DialogDescription>
                                            Please enter your FocusLinks membership ID to access OptoScholar.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="flex items-center space-x-2">
                                        <div className="grid flex-1 gap-2">
                                          <Input
                                            id="membershipId"
                                            placeholder="Enter your membership ID"
                                            value={membershipId}
                                            onChange={(e) => {
                                              setMembershipId(e.target.value)
                                              setIdStatus('idle');
                                            }}
                                            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                                          />
                                        </div>
                                        <Button type="submit" size="sm" className="px-3" onClick={handleVerify} disabled={idStatus === 'loading'}>
                                          <span className="sr-only">Verify ID</span>
                                          {idStatus === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                        </Button>
                                        <div className="h-5 w-5">
                                          {idStatus === 'valid' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                          {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                                        </div>
                                      </div>
                                    </div>
                                    <Button onClick={handleLaunch} disabled={idStatus !== 'valid'} className="w-full">
                                       Verify & Launch
                                       <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <DialogDescription className="text-center text-sm">
                                      Don't have an ID?{' '}
                                      <Link href="/membership" className="underline text-primary font-semibold">
                                        Get one for free
                                      </Link>
                                    </DialogDescription>
                                  </DialogContent>
                            </Dialog>
                        </Card>
                    </section>

                     <section className="text-center max-w-2xl mx-auto">
                        <h3 className="font-semibold text-slate-700">Join FocusLinks to stay updated with:</h3>
                        <ul className="mt-2 text-slate-600 flex flex-wrap justify-center gap-x-4 gap-y-1">
                          <li>New journal additions</li>
                          <li>AI-powered clinical tools</li>
                          <li>Research alerts</li>
                          <li>Academic collaborations</li>
                        </ul>
                         <Button size="lg" variant="outline" className="mt-6" asChild>
                           <Link href="/membership">
                               <UserPlus className="mr-2 h-5 w-5" /> Join FocusLinks
                           </Link>
                        </Button>
                    </section>
                </main>
            </div>
        </>
    );
}

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-2">
        <Check className="h-5 w-5 text-green-600" />
        <span className="text-slate-700">{children}</span>
    </div>
);

const FeatureCard = ({ title, text }: { title: string, text: string }) => (
    <div className="bg-slate-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Check className="h-5 w-5 text-green-600" /> {title}</h3>
        <p className="mt-2 text-slate-600">{text}</p>
    </div>
);

const UserCard = ({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">{icon}{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {items.map(item => <ListItem key={item}>{item}</ListItem>)}
            </ul>
        </CardContent>
    </Card>
);
