
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ListChecks, Play, Lightbulb, UserPlus, Loader2, CheckCircle, XCircle, Award, ArrowRight, ArrowLeft, ScanFace, Ruler, Download, Info, Search, GraduationCap, Stethoscope, Microscope } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function OptoScholarPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [membershipId, setMembershipId] = useState('');
  const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const { toast } = useToast();
  const router = useRouter();

  const checkIdValidity = useCallback(debounce(async (id: string) => {
    if (!id || id.trim().length < 5) {
      setIdStatus('idle');
      return;
    }
    setIdStatus('loading');
    try {
      const response = await fetch(`/api/verify-id?id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (data.isValid) {
        setIdStatus('valid');
      } else {
        setIdStatus('invalid');
      }
    } catch (error) {
      console.error('ID validation failed:', error);
      setIdStatus('invalid');
      toast({ variant: 'destructive', title: 'Error', description: 'Could not verify ID. Please check your connection.' });
    }
  }, 500), [toast]);
  
   useEffect(() => {
    if (membershipId) {
      checkIdValidity(membershipId);
    } else {
      setIdStatus('idle');
    }
  }, [membershipId, checkIdValidity]);

  const handleLaunch = () => {
    if (idStatus === 'valid') {
        sessionStorage.setItem('optoscholor_access_id', membershipId);
        router.push('/opto-tools/optoscholor/launch');
    } else {
        toast({ variant: 'destructive', title: 'Invalid ID', description: 'Please enter a valid membership ID to launch the tool.' });
    }
  };


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

  return (
    <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <div className="bg-brand-bg">
        <header className="hero">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">OptoScholar</h1>
          <p className="text-base opacity-90 max-w-xl mx-auto">
            A specialized clinical search engine indexing over 1 million optometry and ophthalmology articles.
          </p>
        </header>

        <main className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="flex items-center justify-between mb-6">
                 <Button variant="outline" asChild>
                    <Link href="/opto-tools">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Tools
                    </Link>
                </Button>
          </div>
          
          <div className="mt-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full text-lg py-6">
                  <Play className="mr-2 h-6 w-6" />
                  Launch OptoScholar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                 <DialogHeader className="text-center items-center">
                    <DialogTitle className="text-2xl font-headline">Member Access Required</DialogTitle>
                    <DialogDescription>
                        This clinical tool is available exclusively for Focus Links members. Please verify your ID to proceed.
                    </DialogDescription>
                </DialogHeader>
                 <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="membership-id">Membership ID</Label>
                    <div className="relative">
                      <Input
                        id="membership-id"
                        value={membershipId}
                        onChange={(e) => setMembershipId(e.target.value)}
                        placeholder="e.g., IN20251026084533"
                        className="h-12"
                      />
                       <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                          {idStatus === 'valid' && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                        </div>
                    </div>
                  </div>
                   <Button onClick={handleLaunch} disabled={idStatus !== 'valid'} className="w-full">
                      Verify & Launch
                      <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>
                <DialogDescription className="text-center text-sm">
                  Don't have an ID?{' '}
                  <Link href="/membership" className="underline text-primary font-semibold">
                    Get one for free
                  </Link>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>

        <Card className="mt-12">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Tool Features</CardTitle>
                <CardDescription>
                   Leveraging advanced on-device processing for accurate and private measurements.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <Search className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Curated Eye-Care Indexing</h4>
                        <p className="text-sm text-muted-foreground">Only peer-reviewed optometry and ophthalmology journals are indexed.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <GraduationCap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Clinical Relevance Ranking</h4>
                        <p className="text-sm text-muted-foreground">Search results are weighted by citation impact, guideline relevance, and clinical applicability.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Stethoscope className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Evidence-Based Filtering</h4>
                        <p className="text-sm text-muted-foreground">Filter by: Randomized Controlled Trials, Meta-Analyses, Systematic Reviews, Case Reports, and Clinical Guidelines.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Microscope className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Fast Abstract-Level Access</h4>
                        <p className="text-sm text-muted-foreground">OptoScholar indexes abstracts and references for speed. Full-text access is routed through official journal publishers or institutional credentials.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        </main>
      </div>
    </>
  );
}

