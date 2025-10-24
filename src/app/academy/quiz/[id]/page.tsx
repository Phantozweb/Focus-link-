
'use client';

import { useState } from 'react';
import { webinars } from '@/lib/academy';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, BookOpen, Clock, Loader2, Play, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  const params = useParams();
  const id = params.id as string;
  const quiz = webinars.find(w => w.id === id && w.id === 'eye-q-arena-2025');

  const [quizState, setQuizState] = useState<'not-started' | 'active' | 'break' | 'finished'>('not-started');
  const [currentModule, setCurrentModule] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  if (!quiz) {
    notFound();
  }

  const startQuiz = () => {
    setQuizState('active');
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({...prev, [questionId]: value}));
  };

  const renderContent = () => {
    if (quizState === 'not-started') {
      return (
        <div className="text-center">
          <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-headline">Welcome to the Eye Q Arena</h1>
          <p className="text-muted-foreground mt-2">You are about to begin the International Optometry Knowledge Championship.</p>
          <Card className="mt-8 text-left">
            <CardHeader>
              <CardTitle>Before you begin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>The quiz consists of 10 modules with 10 questions each, for a total of 100 questions.</p>
              <p>You will have a total of 60 minutes to complete the entire quiz. Each module is timed individually.</p>
              <p>Your rank will be determined by your score, accuracy, and overall completion time.</p>
              <p>Are you ready to test your knowledge?</p>
            </CardContent>
          </Card>
          <Button size="lg" className="mt-8 text-lg" onClick={startQuiz}>
            <Play className="mr-2 h-6 w-6" />
            Start Quiz
          </Button>
        </div>
      );
    }
    
    if(quizState === 'active') {
       return (
         <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Module {currentModule + 1}/10</p>
                <h2 className="text-lg font-bold">Cornea</h2>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Clock className="h-5 w-5" />
                  <span>06:45</span>
              </div>
            </div>
            <Progress value={((currentQuestion + 1)/10) * 100} className="mb-6" />

            {/* Question */}
            <div>
              <p className="font-semibold text-lg mb-1">Question {currentQuestion + 1} of 10</p>
              <p className="text-xl text-slate-800 mb-6">Which layer of the cornea is responsible for maintaining its dehydrated state?</p>
              <RadioGroup onValueChange={(v) => handleAnswerChange(`q${currentQuestion}`, v)}>
                  <div className="space-y-3">
                      <Label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                          <RadioGroupItem value="a" id="r1" />
                          <span>Epithelium</span>
                      </Label>
                       <Label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                          <RadioGroupItem value="b" id="r2" />
                          <span>Bowman's Layer</span>
                      </Label>
                       <Label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                          <RadioGroupItem value="c" id="r3" />
                          <span>Stroma</span>
                      </Label>
                      <Label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary">
                          <RadioGroupItem value="d" id="r4" />
                          <span>Endothelium</span>
                      </Label>
                  </div>
              </RadioGroup>
            </div>
            
            {/* Navigation */}
            <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentQuestion(q => Math.max(0, q-1))}>Previous</Button>
                <Button onClick={() => setCurrentQuestion(q => Math.min(9, q+1))}>Next</Button>
            </div>
         </div>
       )
    }

    return null;
  };

  return (
    <div className="bg-muted/40 min-h-screen py-12">
      <div className="container mx-auto max-w-2xl">
         <div className="mb-6">
           <Button variant="ghost" asChild className="text-muted-foreground">
             <Link href={`/academy/${id}`}>
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back to Event Details
             </Link>
           </Button>
         </div>
         <Card>
           <CardContent className="p-6 md:p-8">
             {renderContent()}
           </CardContent>
         </Card>
      </div>
    </div>
  );
}
