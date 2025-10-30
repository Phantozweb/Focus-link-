
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { webinars } from '@/lib/academy';
import { quizModules, questions as allQuestions, type Question } from '@/lib/quiz-questions';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, BookOpen, Clock, Loader2, Play, Trophy, Coffee, BarChart, XCircle, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TOTAL_QUESTIONS_PER_MODULE = 10;
const BREAK_TIME_SECONDS = 120; // 2 minutes
const PASS_PERCENTAGE = 0.5; // 50%
const COUNTDOWN_SECONDS = 5;
const MAX_ATTEMPTS = 3;

type Answer = { questionId: string; selectedOption: string };
type ModuleResult = {
  topic: string;
  score: number;
  total: number;
  timeTaken: number;
  totalTime: number;
  passed: boolean;
  totalPoints: number;
  bonusPoints: number;
};
type QuizSession = {
  membershipId: string;
  attemptsLeft: number;
};


function QuizComponent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const quiz = webinars.find(w => w.id === id && w.id === 'eye-q-arena-2025');

  const [session, setSession] = useState<QuizSession | null>(null);

  const getInitialState = () => {
    // Check if we are coming from the welcome page to start the quiz
    if (searchParams.get('start') === 'true') {
        const storedSession = localStorage.getItem(`quizSession-${id}`);
        if (storedSession) {
            const parsedSession: QuizSession = JSON.parse(storedSession);
            if (parsedSession.attemptsLeft > 0) {
                return 'countdown';
            }
        }
    }
    // If not starting, or if attempts are used up, go back to the beginning.
    return 'not-started';
  }

  const [quizState, setQuizState] = useState<'not-started' | 'active' | 'break' | 'finished' | 'countdown'>(getInitialState);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [moduleStartTime, setModuleStartTime] = useState(0);
  const [moduleResults, setModuleResults] = useState<ModuleResult[]>([]);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);


  const currentModule = useMemo(() => quizModules[currentModuleIndex], [currentModuleIndex]);
  const currentQuestions = useMemo(() => {
    if (!currentModule) return [];
    return allQuestions.filter(q => q.module === currentModule.topic);
  }, [currentModule]);
  const currentQuestion = useMemo(() => currentQuestions[currentQuestionIndex], [currentQuestions, currentQuestionIndex]);
  
  const [timeLeftInModule, setTimeLeftInModule] = useState(currentModule?.time || 0);
  const [breakTimeLeft, setBreakTimeLeft] = useState(BREAK_TIME_SECONDS);

  // Load session from local storage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(`quizSession-${id}`);
    if (storedSession) {
        setSession(JSON.parse(storedSession));
    }
  }, [id]);

  // Set initial start time when quiz becomes active
  useEffect(() => {
    if (quizState === 'active' && moduleStartTime === 0) {
      setModuleStartTime(Date.now());
      setTimeLeftInModule(quizModules[0].time);
    }
  }, [quizState, moduleStartTime]);


  // Module Timer
  useEffect(() => {
    if (quizState === 'active' && timeLeftInModule > 0) {
      const timer = setInterval(() => {
        setTimeLeftInModule(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizState === 'active' && timeLeftInModule <= 0) {
      handleNextModule();
    }
  }, [quizState, timeLeftInModule]);

  // Break Timer
  useEffect(() => {
    if (quizState === 'break' && breakTimeLeft > 0) {
      const timer = setInterval(() => {
        setBreakTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizState === 'break' && breakTimeLeft <= 0) {
      startNextModule();
    }
  }, [quizState, breakTimeLeft]);

  // Countdown timer
  useEffect(() => {
    if (quizState === 'countdown' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizState === 'countdown' && countdown === 0) {
      startQuiz();
    }
  }, [quizState, countdown]);


  if (!quiz) {
    notFound();
  }

  const startQuiz = () => {
    const storedSession = localStorage.getItem(`quizSession-${id}`);
    if (storedSession) {
        const currentSession: QuizSession = JSON.parse(storedSession);
        if (currentSession.attemptsLeft > 0) {
            setCurrentModuleIndex(0);
            setCurrentQuestionIndex(0);
            setTimeLeftInModule(quizModules[0].time);
            setModuleStartTime(Date.now());
            setAnswers({});
            setModuleResults([]);
            setQuizState('active');

            const updatedSession = { ...currentSession, attemptsLeft: currentSession.attemptsLeft - 1 };
            setSession(updatedSession);
            localStorage.setItem(`quizSession-${id}`, JSON.stringify(updatedSession));
        } else {
             // No attempts left, force back to not-started
            setQuizState('not-started');
        }
    }
  };

  const calculateModuleScore = () => {
    const moduleQuestions = allQuestions.filter(q => q.module === currentModule.topic);
    let score = 0;
    let totalPoints = 0;
    moduleQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        score += question.points;
      }
    });

    const timeTaken = currentModule.time - timeLeftInModule;
    // Award bonus points: Give max bonus if completed in less than 75% of the time, scaled down to 0.
    const timeThreshold = currentModule.time * 0.75;
    let bonusPoints = 0;
    if (timeTaken < currentModule.time) {
        const timeRatio = Math.max(0, (currentModule.time - timeTaken) / currentModule.time);
        bonusPoints = Math.round(currentModule.timeBonus * timeRatio);
    }

    return {score, totalPoints, bonusPoints, timeTaken};
  };

  const handleNextModule = () => {
    const {score, totalPoints, bonusPoints, timeTaken} = calculateModuleScore();
    const passed = (score / totalPoints) >= PASS_PERCENTAGE;
    
    setModuleResults(prev => [...prev, {
      topic: currentModule.topic,
      score,
      total: currentQuestions.length,
      timeTaken,
      totalTime: currentModule.time,
      passed,
      totalPoints,
      bonusPoints,
    }]);

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
        setCurrentQuestionIndex(0);
        setTimeLeftInModule(quizModules[nextModuleIndex].time);
        setModuleStartTime(Date.now());
        setQuizState('active');
      } else {
        setQuizState('finished');
      }
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({...prev, [questionId]: { questionId, selectedOption: value }}));
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
              <p>Your rank will be determined by your score (knowledge + speed bonus), accuracy, and overall completion time.</p>
              <p>Are you ready to test your knowledge?</p>
            </CardContent>
          </Card>
          <Button size="lg" className="mt-8 text-lg" asChild>
            <Link href={`/academy/quiz/${id}/welcome`}>
                <Play className="mr-2 h-6 w-6" />
                Start Quiz
            </Link>
          </Button>
        </div>
      );
    }
    
    if (quizState === 'countdown') {
        return (
            <div className="text-center flex flex-col items-center justify-center min-h-[300px]">
                <h1 className="text-2xl font-bold font-headline mb-2">Get Ready!</h1>
                <p className="text-muted-foreground">The quiz will begin in...</p>
                <div className="text-8xl font-bold font-mono text-primary my-4">{countdown}</div>
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
       const totalScore = moduleResults.reduce((acc, r) => acc + r.score, 0);
       const totalBonus = moduleResults.reduce((acc, r) => acc + r.bonusPoints, 0);
       const finalScore = totalScore + totalBonus;
       const totalPossiblePoints = moduleResults.reduce((acc, r) => acc + r.totalPoints + r.bonusPoints, 0);
       const totalTimeTaken = moduleResults.reduce((acc, r) => acc + r.timeTaken, 0);
       const overallPercentage = totalPossiblePoints > 0 ? (finalScore / totalPossiblePoints) : 0;
       const overallPassed = overallPercentage >= PASS_PERCENTAGE;

      return (
         <div className="text-center">
            <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold font-headline">Quiz Complete!</h1>
            <p className="text-muted-foreground mt-2">You have finished the Eye Q Arena challenge. Here are your results.</p>
             <Card className="mt-8 text-left">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart /> Performance Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className={cn("flex flex-col sm:flex-row justify-around items-center text-center p-4 rounded-lg", overallPassed ? "bg-green-50" : "bg-red-50")}>
                      <div className={cn("mb-4 sm:mb-0", overallPassed ? "text-green-800" : "text-red-800")}>
                          <p className="text-sm font-semibold">{overallPassed ? 'Congratulations! You Passed!' : 'Attempt Unsuccessful'}</p>
                          <p className="text-4xl font-bold">{finalScore}<span className="text-2xl">/{totalPossiblePoints}</span></p>
                          <p className="text-sm">Final Score ({totalScore} from questions + {totalBonus} bonus)</p>
                      </div>
                       <div className="text-slate-800">
                          <p className="text-sm text-muted-foreground">Total Time</p>
                          <p className="text-4xl font-bold font-mono">{formatTime(totalTimeTaken)}</p>
                      </div>
                   </div>
                   <h3 className="font-semibold pt-4">Module Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead className="text-right">Score</TableHead>
                          <TableHead className="text-right">Bonus</TableHead>
                          <TableHead className="text-right">Time</TableHead>
                          <TableHead className="text-right">Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {moduleResults.map(result => (
                          <TableRow key={result.topic}>
                            <TableCell className="font-medium">{result.topic}</TableCell>
                            <TableCell className="text-right font-mono">{result.score}/{result.totalPoints}</TableCell>
                             <TableCell className="text-right font-mono flex items-center justify-end gap-1">
                                <Sparkles className="h-4 w-4 text-amber-500" />
                                {result.bonusPoints}
                            </TableCell>
                            <TableCell className="text-right font-mono">{formatTime(result.timeTaken)}</TableCell>
                            <TableCell className="text-right">
                                {result.passed ? (
                                    <span className="flex items-center justify-end gap-1 text-green-600 font-semibold"><CheckCircle className="h-4 w-4"/> Pass</span>
                                ) : (
                                    <span className="flex items-center justify-end gap-1 text-red-600 font-semibold"><XCircle className="h-4 w-4"/> Fail</span>
                                )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </CardContent>
             </Card>
             <div className="mt-8 flex gap-4">
                <Button size="lg" className="flex-1" variant="outline" onClick={() => setQuizState('countdown')} disabled={!session || session.attemptsLeft < 0}>
                    Try Again ({session ? Math.max(0, session.attemptsLeft) : MAX_ATTEMPTS - 1} attempts left)
                </Button>
                <Button size="lg" className="flex-1" asChild>
                    <Link href={`/academy/${id}`}>Back to Leaderboard</Link>
                </Button>
             </div>
        </div>
      );
    }
    
    if(quizState === 'active' && currentModule && currentQuestion) {
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
            <Progress value={((currentQuestionIndex + 1)/TOTAL_QUESTIONS_PER_MODULE) * 100} className="mb-6" />

            {/* Question */}
            <div>
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-lg mb-1">Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS_PER_MODULE}</p>
                <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    currentQuestion.difficulty === 'easy' && "bg-green-100 text-green-800",
                    currentQuestion.difficulty === 'medium' && "bg-yellow-100 text-yellow-800",
                    currentQuestion.difficulty === 'hard' && "bg-red-100 text-red-800",
                )}>{currentQuestion.difficulty.toUpperCase()} ({currentQuestion.points} {currentQuestion.points === 1 ? 'Mark' : 'Marks'})</span>
              </div>
              <p className="text-xl text-slate-800 my-6">{currentQuestion.text}</p>
              <RadioGroup 
                value={answers[currentQuestion.id]?.selectedOption || ''}
                onValueChange={(v) => handleAnswerChange(currentQuestion.id, v)}
              >
                  <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                         <Label key={option.id} className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/10 has-[input:checked]:border-primary transition-all">
                            <RadioGroupItem value={option.id} id={`${currentQuestion.id}-${option.id}`} />
                            <span>{option.text}</span>
                        </Label>
                      ))}
                  </div>
              </RadioGroup>
            </div>
            
            {/* Navigation */}
            <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentQuestionIndex(q => Math.max(0, q-1))} disabled={currentQuestionIndex === 0}>Previous</Button>
                 {currentQuestionIndex < currentQuestions.length - 1 ? (
                    <Button onClick={() => setCurrentQuestionIndex(q => q + 1)}>Next</Button>
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


export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizComponent />
    </Suspense>
  );
}
