
'use client';

import { useState, useEffect, useMemo } from 'react';
import { webinars } from '@/lib/academy';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, BookOpen, Clock, Loader2, Play, Trophy, Coffee } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const quizModules = [
  { topic: 'Eyelids & Adnexa', time: 5 * 60 },
  { topic: 'Conjunctiva & Sclera', time: 6 * 60 },
  { topic: 'Cornea', time: 7 * 60 },
  { topic: 'Anterior Chamber & Aqueous Humor', time: 6 * 60 },
  { topic: 'Iris & Pupil', time: 6 * 60 },
  { topic: 'Crystalline Lens & Accommodation', time: 7 * 60 },
  { topic: 'Vitreous Body', time: 5 * 60 },
  { topic: 'Retina', time: 9 * 60 },
  { topic: 'Optic Nerve & Pathways', time: 9 * 60 },
  { topic: 'Extraocular Muscles & Ocular Motility', time: 5 * 60 },
];

const TOTAL_QUESTIONS_PER_MODULE = 10;
const BREAK_TIME_SECONDS = 120; // 2 minutes

export default function QuizPage() {
  const params = useParams();
  const id = params.id as string;
  const quiz = webinars.find(w => w.id === id && w.id === 'eye-q-arena-2025');

  const [quizState, setQuizState] = useState<'not-started' | 'active' | 'break' | 'finished'>('not-started');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const currentModule = useMemo(() => quizModules[currentModuleIndex], [currentModuleIndex]);
  const [timeLeftInModule, setTimeLeftInModule] = useState(currentModule?.time || 0);
  const [breakTimeLeft, setBreakTimeLeft] = useState(BREAK_TIME_SECONDS);

  useEffect(() => {
    if (quizState === 'active' && timeLeftInModule > 0) {
      const timer = setInterval(() => {
        setTimeLeftInModule(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizState === 'active' && timeLeftInModule === 0) {
      handleNextModule();
    }
  }, [quizState, timeLeftInModule]);

  useEffect(() => {
    if (quizState === 'break' && breakTimeLeft > 0) {
      const timer = setInterval(() => {
        setBreakTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizState === 'break' && breakTimeLeft === 0) {
      startNextModule();
    }
  }, [quizState, breakTimeLeft]);

  if (!quiz) {
    notFound();
  }

  const startQuiz = () => {
    setCurrentModuleIndex(0);
    setTimeLeftInModule(quizModules[0].time);
    setQuizState('active');
  };

  const handleNextModule = () => {
    if (currentModuleIndex < quizModules.length - 1) {
      setQuizState('break');
      setBreakTimeLeft(BREAK_TIME_SECONDS);
    } else {
      setQuizState('finished');
    }
  };
  
  const startNextModule = () => {
     const nextModuleIndex = currentModuleIndex + 1;
      if (nextModuleIndex < quizModules.length) {
        setCurrentModuleIndex(nextModuleIndex);
        setCurrentQuestion(0);
        setTimeLeftInModule(quizModules[nextModuleIndex].time);
        setQuizState('active');
      } else {
        setQuizState('finished');
      }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({...prev, [questionId]: value}));
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
              <p>The quiz consists of {quizModules.length} modules with {TOTAL_QUESTIONS_PER_MODULE} questions each, for a total of {quizModules.length * TOTAL_QUESTIONS_PER_MODULE} questions.</p>
              <p>You will have a total of {quizModules.reduce((acc, m) => acc + m.time, 0) / 60} minutes to complete the entire quiz. Each module is timed individually.</p>
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
    
    if (quizState === 'break') {
      return (
         <div className="text-center">
            <Coffee className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-headline">Module Complete!</h1>
            <p className="text-muted-foreground mt-2">Take a short break. The next module will begin soon.</p>
            <div className="my-8">
              <p className="text-lg">Next module starts in:</p>
              <p className="text-6xl font-bold font-mono text-primary my-2">{formatTime(breakTimeLeft)}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-1 text-lg" onClick={startNextModule}>
                 Skip Break
              </Button>
              <div className="flex-1 text-left text-sm text-muted-foreground">
                <p><strong>Next Up:</strong></p>
                <p>{quizModules[currentModuleIndex + 1].topic}</p>
              </div>
            </div>
          </div>
      );
    }
    
     if (quizState === 'finished') {
      return (
         <div className="text-center">
            <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-headline">Quiz Complete!</h1>
            <p className="text-muted-foreground mt-2">You have finished the Eye Q Arena challenge.</p>
             <Card className="mt-8 text-left">
                <CardHeader>
                    <CardTitle>Your Preliminary Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-4xl font-bold text-center">85 / 100</p>
                   <p className="text-muted-foreground text-center">Detailed report and leaderboard ranking will be available shortly.</p>
                </CardContent>
             </Card>
             <div className="mt-8 flex gap-4">
                <Button size="lg" className="flex-1" variant="outline">Try Again (2 attempts left)</Button>
                <Button size="lg" className="flex-1" asChild>
                    <Link href={`/academy/${id}`}>Back to Leaderboard</Link>
                </Button>
             </div>
        </div>
      );
    }
    
    if(quizState === 'active' && currentModule) {
       return (
         <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Module {currentModuleIndex + 1}/{quizModules.length}</p>
                <h2 className="text-lg font-bold">{currentModule.topic}</h2>
              </div>
              <div className={cn("flex items-center gap-2 text-lg font-semibold", timeLeftInModule <= 60 ? 'text-destructive' : 'text-primary')}>
                  <Clock className="h-5 w-5" />
                  <span>{formatTime(timeLeftInModule)}</span>
              </div>
            </div>
            <Progress value={((currentQuestion + 1)/TOTAL_QUESTIONS_PER_MODULE) * 100} className="mb-6" />

            {/* Question */}
            <div>
              <p className="font-semibold text-lg mb-1">Question {currentQuestion + 1} of {TOTAL_QUESTIONS_PER_MODULE}</p>
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
                <Button variant="outline" onClick={() => setCurrentQuestion(q => Math.max(0, q-1))} disabled={currentQuestion === 0}>Previous</Button>
                 {currentQuestion < TOTAL_QUESTIONS_PER_MODULE - 1 ? (
                    <Button onClick={() => setCurrentQuestion(q => q + 1)}>Next</Button>
                ) : (
                    <Button onClick={handleNextModule} variant="default">Finish Module</Button>
                )}
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

    