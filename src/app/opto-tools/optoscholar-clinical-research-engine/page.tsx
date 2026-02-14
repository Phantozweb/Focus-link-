
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowLeft, Search, CheckCircle, BookOpen, UserCheck, Microscope, FlaskConical, Globe, Link2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { WaitlistForm } from '@/components/opto-tools/WaitlistForm';

export const metadata: Metadata = {
  title: 'OptoScholar – Optometry & Ophthalmology Research Engine',
  description: 'Access OptoScholar, the specialized clinical search engine for optometry and ophthalmology. 1M+ indexed articles. Built for students, clinicians, and researchers.',
};


export default function OptoScholarPage() {
  return (
    <>
      <div className="bg-brand-bg">
        <header className="hero">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">OptoScholar – Specialized Clinical Search Engine for Optometry & Ophthalmology</h1>
          <p className="text-base opacity-90 max-w-2xl mx-auto">
            OptoScholar is a discipline-specific research engine designed exclusively for optometry and ophthalmology. Unlike general academic platforms such as PubMed and Google Scholar, OptoScholar filters and prioritizes clinically relevant, peer-reviewed eye-care research to support students, clinicians, and researchers in making evidence-based decisions.
          </p>
        </header>

        <main className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
          
          <WaitlistForm />

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Why Optometry Professionals Need a Specialized Research Engine</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none dark:prose-invert">
              <p>General academic search engines are broad by design. While powerful, they often produce results diluted with non-clinical biomedical data.</p>
              <p>OptoScholar is structured specifically for:</p>
              <ul>
                <li>Clinical optometry research</li>
                <li>Ophthalmic disease management</li>
                <li>Evidence-based practice</li>
                <li>Vision science literature</li>
                <li>Subspecialty-focused indexing (cornea, retina, glaucoma, pediatrics, low vision)</li>
              </ul>
              <p>This eliminates irrelevant search noise and accelerates research precision.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">What Makes OptoScholar Different?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0"><CheckCircle className="h-6 w-6 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold">Curated Eye-Care Indexing</h4>
                  <p className="text-muted-foreground">Only peer-reviewed optometry and ophthalmology journals are indexed.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0"><CheckCircle className="h-6 w-6 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold">Clinical Relevance Ranking</h4>
                  <p className="text-muted-foreground">Search results are weighted by citation impact, guideline relevance, and clinical applicability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0"><CheckCircle className="h-6 w-6 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold">Evidence-Based Filtering</h4>
                  <p className="text-muted-foreground">Filter by: Randomized Controlled Trials, Meta-Analyses, Systematic Reviews, Case Reports, and Clinical Guidelines.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0"><CheckCircle className="h-6 w-6 text-green-500" /></div>
                <div>
                  <h4 className="font-semibold">Fast Abstract-Level Access</h4>
                  <p className="text-muted-foreground">OptoScholar indexes abstracts and references for speed. Full-text access is routed through official journal publishers or institutional credentials.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Who Is OptoScholar Built For?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Optometry Students</h4>
                <p className="text-sm text-muted-foreground">Exam preparation, thesis literature review, case study referencing, and clinical assignment research.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <UserCheck className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Practicing Clinicians</h4>
                <p className="text-sm text-muted-foreground">Chair-side condition lookup, drug interaction review, updated management protocols, and rare case reference.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Microscope className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Researchers & Academics</h4>
                <p className="text-sm text-muted-foreground">Citation tracking, impact-factor-based filtering, comprehensive literature reviews, and export-ready references.</p>
              </div>
            </CardContent>
          </Card>
          
        </main>
      </div>
    </>
  );
}
