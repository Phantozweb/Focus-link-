
'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, PlayCircle, Video, Bot, ListChecks, Orbit, Dna, Puzzle, Star, FileText, CheckCircle, Trophy, Lock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { retinoscopyModules } from '@/lib/data/course-modules';
import type { CourseModule } from '@/lib/data/course-modules';

const iconMap: { [key: string]: React.ElementType } = {
  video: Video,
  'list-checks': ListChecks,
  'orbit': Orbit,
  'bot': Bot,
  'dna': Dna,
  'puzzle': Puzzle,
  'check-circle': CheckCircle,
  'trophy': Trophy,
  'file-text': FileText,
};

function CourseModuleItem({ module, index, id }: { module: CourseModule, index: number, id: string }) {
  const isCompleted = false; // Placeholder for future progress tracking

  return (
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <div className="flex items-center gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${isCompleted ? 'bg-green-600' : 'bg-primary'}`}>
            {isCompleted ? <CheckCircle className="h-6 w-6" /> : <span className="text-xl font-bold">{index + 1}</span>}
          </div>
          <span className="text-left">{module.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-16 space-y-4 pt-2">
        <p className="text-muted-foreground">{module.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {module.interactiveElements.map(element => {
                const Icon = iconMap[element.icon];
                return (
                    <div key={element.name} className="flex items-center gap-2 text-sm text-slate-600">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{element.name}</span>
                    </div>
                );
            })}
        </div>
        <Button size="sm" asChild>
           <Link href={`/academy/course/${id}/module/${index + 1}`}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Module
           </Link>
        </Button>
      </AccordionContent>
    </AccordionItem>
  )
}

function CoursePageClient() {
  const params = useParams();
  const id = params.id as string;
  
  return (
    <div className="bg-muted/40 min-h-screen py-12">
      <div className="container mx-auto max-w-3xl">
         <div className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground">
            <Link href={`/academy/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course Details
            </Link>
          </Button>
        </div>
         <Card className="overflow-hidden shadow-lg">
           <CardHeader className="bg-slate-800 text-white p-8 text-center">
             <BookOpen className="h-16 w-16 mx-auto mb-4" />
             <CardTitle className="text-3xl font-bold font-headline">Interactive Retinoscopy Course</CardTitle>
             <CardDescription className="text-slate-300 mt-2 text-lg">
                Master objective refraction with AI-powered simulations, 3D models, and hands-on exercises.
             </CardDescription>
           </CardHeader>
           <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {retinoscopyModules.map((module, index) => (
                    <CourseModuleItem key={index} module={module} index={index} id={id} />
                ))}
            </Accordion>
            <div className="text-center mt-8">
                <Button size="lg" disabled>
                    <Trophy className="mr-2 h-5 w-5" />
                    Take Final Assessment
                </Button>
            </div>
           </CardContent>
         </Card>
      </div>
    </div>
  )
}

export default function CoursePage() {
  return (
    <Suspense>
      <CoursePageClient />
    </Suspense>
  );
}
