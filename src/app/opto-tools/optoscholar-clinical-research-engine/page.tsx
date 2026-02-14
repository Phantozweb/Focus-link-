
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowLeft, Search, CheckCircle, BookOpen, UserCheck, Microscope, FlaskConical, Globe, Link2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

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
          
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" asChild>
              <Link href="/opto-tools">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Tools
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/opto-tools/optoscholar-clinical-research-engine/launch">
                <Search className="mr-2 h-5 w-5" />
                Launch OptoScholar
              </Link>
            </Button>
          </div>

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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Key Research Areas Covered</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none dark:prose-invert">
                <ul>
                    <li>Glaucoma management</li>
                    <li>Myopia control</li>
                    <li>Scleral lens studies</li>
                    <li>Ocular surface disease</li>
                    <li>Retinal disorders</li>
                    <li>Gene therapy in ophthalmology</li>
                    <li>Neuro-optometry</li>
                    <li>Contact lens innovations</li>
                </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Global Database Access for Eye-Care Research</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none dark:prose-invert">
                <p>OptoScholar aggregates and structures over 1,000,000+ research abstracts from indexed optometry and ophthalmology sources. It works alongside major research ecosystems including:</p>
                <ul>
                    <li>PubMed</li>
                    <li>Google Scholar</li>
                    <li>Institutional journal access portals</li>
                </ul>
                <p>This ensures compliant, fast, and reliable data routing.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Why OptoScholar is Integrated Within FocusLinks</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none dark:prose-invert">
                <p>OptoScholar operates as the research intelligence module inside FocusLinks. This integration allows:</p>
                <ul>
                    <li>Academic networking</li>
                    <li>Structured knowledge sharing</li>
                    <li>Research collaboration</li>
                    <li>Community-driven journal suggestions</li>
                </ul>
                <p>It is not just a search tool. It is part of a growing optometry-focused ecosystem.</p>
            </CardContent>
          </Card>

          <div className="text-center p-8 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Access OptoScholar Now</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Cut through academic clutter and access clinically structured research designed specifically for the eye-care discipline.
            </p>
            <Button asChild size="lg">
              <Link href="/opto-tools/optoscholar-clinical-research-engine/launch">
                <Search className="mr-2 h-5 w-5" />
                Launch OptoScholar
              </Link>
            </Button>
          </div>
          
           <div className="text-center">
                <p className="text-muted-foreground">Join FocusLinks to stay updated with:</p>
                 <p className="text-sm text-muted-foreground">New journal additions, AI-powered clinical tools, research alerts and academic collaborations</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/membership">
                    Join FocusLinks
                  </Link>
                </Button>
          </div>
          
        </main>
      </div>
    </>
  );
}
