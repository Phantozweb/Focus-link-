
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Check, Clock, Play, Trophy, Users, Award, Star } from 'lucide-react';
import Link from 'next/link';
import { quizModules } from '@/lib/quiz-questions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function QuizWelcomePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const totalQuestions = quizModules.length * 10;
  const totalTime = quizModules.reduce((acc, m) => acc + m.time, 0) / 60;
  const totalPoints = quizModules.reduce((acc, m) => acc + m.totalPoints, 0);

  const instructions = [
    { text: `${totalQuestions} questions across ${quizModules.length} timed modules.` },
    { text: `${totalTime} minutes total quiz time. Time saved in one module carries over to the next.` },
    { text: 'A score of 50% or higher is required to pass and earn a certificate.' },
    { text: 'Top performers get a Certificate of Excellence and a profile badge.' },
    { text: 'Your performance points will be recorded for future platform rewards!' },
  ];

  return (
    <div className="bg-muted/40 min-h-screen py-12">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground">
            <Link href={`/academy/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Event Details
            </Link>
          </Button>
        </div>
        <Card className="shadow-2xl">
          <CardHeader className="text-center bg-slate-50 p-8 rounded-t-lg">
            <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold font-headline">Welcome to the Eye Q Arena!</CardTitle>
            <CardDescription className="text-lg">You are about to begin the International Optometry Knowledge Championship.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Key Instructions</h2>
              <ul className="space-y-3">
                {instructions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Quiz Modules</h2>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizModules.map((module, index) => (
                      <TableRow key={module.topic}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{module.topic}</TableCell>
                        <TableCell className="text-right font-mono">{module.totalPoints}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-50 font-bold">
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right font-mono">{totalPoints} Points</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <div className="text-center pt-6">
                <Button size="lg" className="w-full max-w-sm text-lg py-6" onClick={() => router.push(`/academy/quiz/${id}`)}>
                    <Play className="mr-2 h-6 w-6" />
                    I'm Ready, Begin Quiz!
                </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
