
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowLeft, Search, CheckCircle, BookOpen, UserCheck, Microscope, FlaskConical, Globe, Link2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { OptoScholarAccess } from '@/components/opto-tools/OptoScholarAccess';

export const metadata: Metadata = {
  title: 'OptoScholar – Optometry & Ophthalmology Research Engine',
  description: 'Access OptoScholar, the specialized clinical search engine for optometry and ophthalmology. 1M+ indexed articles. Built for students, clinicians, and researchers.',
};


export default function OptoScholarPage() {
  return (
    <>
      <div className="w-full bg-background text-foreground">
        <header 
          className="relative text-center px-4 py-20 md:py-28 lg:py-32 bg-cover bg-center"
          style={{backgroundImage: 'url(/path-to-your-background-image.jpg)'}}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
            style={{maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'}}
          ></div>

          <div className="relative z-10 mx-auto max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">OptoScholar</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  The specialized clinical search engine for optometry and ophthalmology. Access over 1 million indexed articles, curated for students, clinicians, and researchers.
              </p>
          </div>
        </header>

        <main className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-16 space-y-20">
          
          <OptoScholarAccess />

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">Why a Specialized Research Engine?</CardTitle>
              <CardDescription className="text-base text-muted-foreground max-w-2xl mx-auto pt-2">
                General academic search engines are powerful but often diluted with non-clinical data. OptoScholar is built to eliminate noise and accelerate precision.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none dark:prose-invert prose-p:text-muted-foreground prose-li:text-muted-foreground">
              <p className="text-center text-lg">OptoScholar is structured specifically for:</p>
              <ul className="columns-2 md:columns-3 gap-x-8 list-none p-0 text-center md:text-left">
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Clinical optometry research</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Ophthalmic disease management</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Evidence-based practice</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Vision science literature</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Cornea & contact lenses</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Retina and vitreous</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Glaucoma management</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Pediatrics & binocular vision</li>
                <li className="flex items-center justify-center md:justify-start gap-3 mb-3"><CheckCircle className="h-5 w-5 text-primary"/>Low vision rehabilitation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold tracking-tight">Who Is OptoScholar Built For?</CardTitle>
                <CardDescription className="text-base text-muted-foreground max-w-2xl mx-auto pt-2">
                    Designed to meet the unique needs of every eye-care professional.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-8 pt-6">
              <div className="flex flex-col items-center text-center p-6 bg-background/40 rounded-xl border-2 border-transparent hover:border-primary/30 transition-all">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <h4 className="font-bold text-lg">Optometry Students</h4>
                <p className="text-sm text-muted-foreground mt-2">Exam prep, thesis literature review, case study referencing, and clinical assignment research.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background/40 rounded-xl border-2 border-transparent hover:border-primary/30 transition-all">
                <UserCheck className="h-10 w-10 text-primary mb-4" />
                <h4 className="font-bold text-lg">Practicing Clinicians</h4>
                <p className="text-sm text-muted-foreground mt-2">Chair-side condition lookup, drug interaction review, updated management protocols, and rare case reference.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background/40 rounded-xl border-2 border-transparent hover:border-primary/30 transition-all">
                <Microscope className="h-10 w-10 text-primary mb-4" />
                <h4 className="font-bold text-lg">Researchers & Academics</h4>
                <p className="text-sm text-muted-foreground mt-2">Citation tracking, impact-based filtering, comprehensive literature reviews, and export-ready references.</p>
              </div>
            </CardContent>
          </Card>
          
        </main>
      </div>
    </>
  );
}
