
'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { retinoscopyModules } from '@/lib/data/course-modules';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Info, Lightbulb, PlayCircle, Video, XCircle } from 'lucide-react';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const quizQuestions = [
  {
    id: 'q1',
    question: "Who is often credited with inventing the retinoscope in 1859?",
    options: ["Hermann von Helmholtz", "Frans Donders", "Hermann Snellen", "Ferdinand Cuignet"],
    correctAnswer: "Ferdinand Cuignet"
  },
  {
    id: 'q2',
    question: "Retinoscopy is considered an 'objective' measurement because it:",
    options: ["Is always 100% accurate", "Does not require verbal feedback from the patient", "Is the only way to measure refractive error", "Can be performed by anyone"],
    correctAnswer: "Does not require verbal feedback from the patient"
  }
];

function ModulePageClient() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const moduleId = parseInt(params.module_id as string, 10);
    const module = retinoscopyModules[moduleId - 1];

    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    if (!module) {
        notFound();
    }
    
    const totalModules = retinoscopyModules.length;

    const handleAnswerChange = (questionId: string, value: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmitQuiz = () => {
        setIsSubmitted(true);
    };

    const allQuestionsAnswered = Object.keys(selectedAnswers).length === quizQuestions.length;
    
    return (
        <div className="bg-muted/40 min-h-screen py-12">
            <div className="container mx-auto max-w-4xl">
                 <div className="mb-6">
                  <Button variant="ghost" asChild className="text-muted-foreground">
                    <Link href={`/academy/course/${courseId}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Course Curriculum
                    </Link>
                  </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold font-headline">Module {moduleId}: {module.title}</CardTitle>
                        <CardDescription className="text-lg">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Video Section */}
                        <section>
                            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Video className="h-6 w-6 text-primary" /> AI-Narrated Video</h3>
                            <Card className="overflow-hidden">
                                <div className="aspect-video bg-slate-900 flex items-center justify-center">
                                    <iframe 
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/S4_A7F0-A-Q" 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            </Card>
                             <Alert className="mt-4 bg-blue-50 border-blue-200">
                                <Lightbulb className="h-4 w-4" />
                                <AlertTitle>Key Takeaway</AlertTitle>
                                <AlertDescription>
                                    Retinoscopy is an objective method to determine refractive error, crucial for patients who cannot provide reliable feedback, such as young children.
                                </AlertDescription>
                            </Alert>
                        </section>

                        {/* Quiz Section */}
                        <section>
                            <h3 className="text-2xl font-semibold mb-4">History Quiz</h3>
                            <div className="space-y-6">
                                {quizQuestions.map((q, index) => {
                                    const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswer;
                                    const isIncorrect = isSubmitted && selectedAnswers[q.id] && selectedAnswers[q.id] !== q.correctAnswer;
                                    
                                    return (
                                        <div key={q.id}>
                                            <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                                            <RadioGroup
                                                value={selectedAnswers[q.id]}
                                                onValueChange={(value) => handleAnswerChange(q.id, value)}
                                                disabled={isSubmitted}
                                            >
                                                {q.options.map(option => (
                                                    <div
                                                        key={option}
                                                        className={cn(
                                                            "flex items-center space-x-2 p-3 rounded-md border transition-all",
                                                            isSubmitted && option === q.correctAnswer && "bg-green-100 border-green-300",
                                                            isSubmitted && selectedAnswers[q.id] === option && option !== q.correctAnswer && "bg-red-100 border-red-300"
                                                        )}
                                                    >
                                                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                                        <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                                                        {isSubmitted && option === q.correctAnswer && <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />}
                                                        {isSubmitted && selectedAnswers[q.id] === option && option !== q.correctAnswer && <XCircle className="h-5 w-5 text-red-600 ml-auto" />}
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            {isIncorrect && (
                                                <p className="text-sm text-red-600 mt-2">Correct Answer: {q.correctAnswer}</p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            {!isSubmitted && (
                                <Button onClick={handleSubmitQuiz} disabled={!allQuestionsAnswered} className="mt-6">
                                    Submit Quiz
                                </Button>
                            )}
                        </section>
                        
                        {/* Navigation */}
                        <section className="border-t pt-6 flex justify-between items-center">
                            <Button variant="outline" asChild>
                                <Link href={`/academy/course/${courseId}`}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Curriculum
                                </Link>
                            </Button>
                             {moduleId < totalModules && (
                                <Button asChild variant="secondary" disabled>
                                    <Link href={`/academy/course/${courseId}/module/${moduleId + 1}`}>
                                        Next Module <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function ModulePage() {
    return (
        <Suspense>
            <ModulePageClient />
        </Suspense>
    );
}
