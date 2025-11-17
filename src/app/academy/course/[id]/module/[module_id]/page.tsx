
'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { retinoscopyModules } from '@/lib/data/course-modules';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Info, Lightbulb, PlayCircle, Video, XCircle, Orbit, ListChecks, RefreshCw, Eye, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const moduleData: { [key: number]: any } = {
  1: {
    quiz: [
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
    ]
  },
  3: {
    checklist: [
        { id: 'c1', label: 'Dim room illumination' },
        { id: 'c2', label: 'Patient fixating on a distant, non-accommodative target' },
        { id: 'c3', label: 'Examiner seated at working distance' },
        { id: 'c4', label: 'Trial frame and lenses within reach' }
    ]
  }
};


function ModulePageClient() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const moduleId = parseInt(params.module_id as string, 10);
    const module = retinoscopyModules[moduleId - 1];

    const currentModuleData = moduleData[moduleId];
    
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    
    if (!module) {
        notFound();
    }
    
    const totalModules = retinoscopyModules.length;
    const quizQuestions = currentModuleData?.quiz || [];
    const checklistItems = currentModuleData?.checklist || [];

    const handleAnswerChange = (questionId: string, value: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: value }));
    };
    
    const handleChecklistChange = (itemId: string, checked: boolean) => {
        setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
    };

    const handleSubmitQuiz = () => {
        setIsSubmitted(true);
    };

    const allQuestionsAnswered = Object.keys(selectedAnswers).length === quizQuestions.length;
    const allChecklistItemsCompleted = checklistItems.length > 0 && checklistItems.every((item: any) => checkedItems[item.id]);

    const renderModuleContent = () => {
        switch(moduleId) {
            case 1:
                return (
                    <>
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
                                    Retinoscopy is an objective method to determine refractive error, crucial for patients who cannot provide reliable feedback.
                                </AlertDescription>
                            </Alert>
                        </section>
                        <section>
                            <h3 className="text-2xl font-semibold mb-4">History Quiz</h3>
                            <div className="space-y-6">
                                {quizQuestions.map((q: any, index: number) => {
                                    const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswer;
                                    const isIncorrect = isSubmitted && selectedAnswers[q.id] && selectedAnswers[q.id] !== q.correctAnswer;
                                    
                                    return (
                                        <div key={q.id}>
                                            <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                                            <RadioGroup value={selectedAnswers[q.id]} onValueChange={(value) => handleAnswerChange(q.id, value)} disabled={isSubmitted}>
                                                {q.options.map((option: any) => (
                                                    <div key={option} className={cn("flex items-center space-x-2 p-3 rounded-md border transition-all", isSubmitted && option === q.correctAnswer && "bg-green-100 border-green-300", isSubmitted && selectedAnswers[q.id] === option && option !== q.correctAnswer && "bg-red-100 border-red-300")}>
                                                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                                        <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                                                        {isSubmitted && option === q.correctAnswer && <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />}
                                                        {isSubmitted && selectedAnswers[q.id] === option && option !== q.correctAnswer && <XCircle className="h-5 w-5 text-red-600 ml-auto" />}
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            {isIncorrect && <p className="text-sm text-red-600 mt-2">Correct Answer: {q.correctAnswer}</p>}
                                        </div>
                                    )
                                })}
                            </div>
                            {!isSubmitted && <Button onClick={handleSubmitQuiz} disabled={!allQuestionsAnswered} className="mt-6">Submit Quiz</Button>}
                        </section>
                    </>
                );
            case 2:
                 return (
                    <section>
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Orbit className="h-6 w-6 text-primary" /> Interactive 3D Model</h3>
                        <Card className="overflow-hidden">
                            <div className="aspect-video bg-slate-100 flex items-center justify-center p-4">
                               <p className="text-muted-foreground text-center">[Placeholder for an interactive 3D retinoscope model]</p>
                            </div>
                        </Card>
                         <Alert className="mt-4">
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Exploration Tip</AlertTitle>
                            <AlertDescription>
                                Click and drag to rotate the model. Use your scroll wheel to zoom in and out to inspect different parts.
                            </AlertDescription>
                        </Alert>
                    </section>
                );
            case 3:
                 return (
                    <section>
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><ListChecks className="h-6 w-6 text-primary" /> Interactive Checklist</h3>
                         <Card>
                            <CardHeader><CardTitle>Setup for Success</CardTitle><CardDescription>Ensure you have everything ready before you begin retinoscopy.</CardDescription></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                {checklistItems.map((item: any) => (
                                    <div key={item.id} className="flex items-center space-x-3">
                                    <Checkbox id={item.id} checked={checkedItems[item.id] || false} onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)} />
                                    <label htmlFor={item.id} className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {item.label}
                                    </label>
                                    </div>
                                ))}
                                </div>
                                {allChecklistItemsCompleted && (
                                    <Alert className="mt-6 bg-green-50 border-green-200">
                                        <CheckCircle className="h-4 w-4 text-green-700" />
                                        <AlertTitle className="text-green-800 font-bold">Setup Complete!</AlertTitle>
                                        <AlertDescription className="text-green-700">
                                            You are now ready to proceed.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                         </Card>
                    </section>
                );
            case 10:
                return (
                    <section>
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <Eye className="h-6 w-6 text-primary" /> Advanced Patient Simulator
                        </h3>
                        <Card>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <Label htmlFor="patient-type">Patient Type</Label>
                                        <Select defaultValue="astigmatism">
                                            <SelectTrigger id="patient-type">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="myope">Myope</SelectItem>
                                                <SelectItem value="hyperope">Hyperope</SelectItem>
                                                <SelectItem value="astigmatism">Astigmatism</SelectItem>
                                                <SelectItem value="mixed">Mixed Astigmatism</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label>Lens Power</Label>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon"><Minus className="h-4 w-4" /></Button>
                                            <Input readOnly value="+1.50 D" className="text-center font-mono" />
                                            <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="aspect-video bg-slate-900 rounded-md flex items-center justify-center p-4">
                                    <p className="text-slate-400 text-center">[Interactive Retinoscopy Reflex Simulation]</p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button variant="secondary">
                                        <RefreshCw className="mr-2 h-4 w-4" /> New Case
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Alert className="mt-4">
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Simulation Goal</AlertTitle>
                            <AlertDescription>
                                Practice neutralizing the reflex for different refractive errors. Change the lens power until the reflex fills the entire pupil.
                            </AlertDescription>
                        </Alert>
                    </section>
                );
            default:
                return (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-muted-foreground">Content Coming Soon</h3>
                        <p className="text-lg text-muted-foreground mt-2">This module is under construction.</p>
                    </div>
                );
        }
    };
    
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
                       {renderModuleContent()}
                        
                        {/* Navigation */}
                        <section className="border-t pt-6 flex justify-between items-center">
                             <Button variant="outline" asChild disabled={moduleId <= 1}>
                                <Link href={moduleId > 1 ? `/academy/course/${courseId}/module/${moduleId - 1}` : '#'}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Previous Module
                                </Link>
                            </Button>
                             <Button asChild disabled={moduleId >= totalModules}>
                                <Link href={moduleId < totalModules ? `/academy/course/${courseId}/module/${moduleId + 1}` : '#'}>
                                    Next Module <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
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
