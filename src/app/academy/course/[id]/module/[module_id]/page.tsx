
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { retinoscopyModules } from '@/lib/data/course-modules';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Info, Lightbulb, PlayCircle, Video, XCircle, Orbit, ListChecks, RefreshCw, Eye, Plus, Minus, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

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

const reflexExamples = [
  { id: 1, type: 'with', description: 'Light reflex moves in the same direction as the retinoscope', condition: 'Myopia (Nearsightedness)' },
  { id: 2, type: 'against', description: 'Light reflex moves opposite to the retinoscope direction', condition: 'Hyperopia (Farsightedness)' },
  { id: 3, type: 'neutral', description: 'The entire pupil lights up uniformly - no movement', condition: 'Emmetropia (Perfect focus)' },
  { id: 4, type: 'with', description: 'Reflex follows the movement of the streak', condition: 'Myopia' },
  { id: 5, type: 'against', description: 'Reflex moves in the opposite direction', condition: 'Hyperopia' },
];

function ModulePageClient() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const moduleId = parseInt(params.module_id as string, 10);
    const module = retinoscopyModules[moduleId - 1];

    const currentModuleData = moduleData[moduleId];
    
    // State for quizzes
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // State for checklists
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // State for Module 5 Reflex Quiz
    const [currentReflex, setCurrentReflex] = useState(0);
    const [selectedReflexAnswer, setSelectedReflexAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // State for Module 10 Simulator
    const [refractiveError, setRefractiveError] = useState({ sphere: 0, cylinder: 0, axis: 90 });
    const [trialLens, setTrialLens] = useState({ sphere: 0, cylinder: 0, axis: 90 });
    const [streakRotation, setStreakRotation] = useState(90);
    const [isNeutralized, setIsNeutralized] = useState(false);

    useEffect(() => {
        if(moduleId === 10) {
            generateNewCase();
        }
    }, [moduleId]);

    const generateNewCase = () => {
        const sphere = (Math.floor(Math.random() * 8) - 4) * 0.5; // -2.00 to +1.50
        const cylinder = -Math.floor(Math.random() * 5) * 0.5; // 0.00 to -2.00
        const axis = Math.floor(Math.random() * 180);
        setRefractiveError({ sphere, cylinder, axis });
        setTrialLens({ sphere: 0, cylinder: 0, axis: 90 });
        setStreakRotation(90);
        setIsNeutralized(false);
    };

    const getReflexDetails = () => {
        const workingDistance = -1.5; // Assuming a 67cm working distance
        const netSphere = refractiveError.sphere - (trialLens.sphere + workingDistance);
        
        // This is a simplified model for demonstration
        const powerAtStreakAxis = netSphere + refractiveError.cylinder * Math.pow(Math.sin(Math.PI / 180 * (streakRotation - refractiveError.axis)), 2);

        let motion: 'with' | 'against' | 'neutral' = 'neutral';
        if (powerAtStreakAxis > 0.25) motion = 'against';
        if (powerAtStreakAxis < -0.25) motion = 'with';
        
        const speed = 1 / (Math.abs(powerAtStreakAxis) + 0.1);
        const width = 20 / (Math.abs(powerAtStreakAxis) + 1);

        if (Math.abs(powerAtStreakAxis) < 0.25) {
             const remainingCyl = refractiveError.cylinder + trialLens.cylinder;
             if(Math.abs(remainingCyl) < 0.25) setIsNeutralized(true);
             else setIsNeutralized(false);
        } else {
            setIsNeutralized(false);
        }

        return { motion, speed, width };
    };

    const simulatorReflex = getReflexDetails();

    
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

    const handleReflexAnswer = (answer: string) => {
        setSelectedReflexAnswer(answer);
        const correct = answer === reflexExamples[currentReflex].type;

        if (correct) {
        setScore(score + 1);
        }

        setTimeout(() => {
        if (currentReflex < reflexExamples.length - 1) {
            setCurrentReflex(currentReflex + 1);
            setSelectedReflexAnswer(null);
        } else {
            setShowResult(true);
        }
        }, 1500);
    };

    const resetReflexQuiz = () => {
        setCurrentReflex(0);
        setSelectedReflexAnswer(null);
        setScore(0);
        setShowResult(false);
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
             case 5: {
                if (showResult) {
                    return (
                    <section>
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Eye className="h-6 w-6 text-primary" /> Reflex Identification Quiz</h3>
                        <Card className="p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                        <div className="mb-6">
                            <div className="text-lg text-muted-foreground mb-2">Your Score</div>
                            <div className="text-4xl font-bold text-primary">
                            {score} out of {reflexExamples.length}
                            </div>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            {score === reflexExamples.length
                            ? 'Perfect! You have mastered reflex identification!'
                            : score >= reflexExamples.length * 0.7
                            ? 'Great job! You have a good understanding of the concepts.'
                            : 'Keep practicing! Review the concepts and try again.'}
                        </p>
                        <Button onClick={resetReflexQuiz} variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retake Quiz
                        </Button>
                        </Card>
                    </section>
                    );
                }

                const reflex = reflexExamples[currentReflex];
                const isAnswered = selectedReflexAnswer !== null;
                const isCorrect = selectedReflexAnswer === reflex.type;

                return (
                    <section>
                         <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Eye className="h-6 w-6 text-primary" /> Reflex Identification Quiz</h3>
                         <div>
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-muted-foreground">
                                    Question {currentReflex + 1} of {reflexExamples.length}
                                </span>
                                <span className="text-sm font-semibold text-primary">
                                    Score: {score}/{reflexExamples.length}
                                </span>
                                </div>
                                <Progress value={((currentReflex + 1) / reflexExamples.length) * 100} />
                            </div>

                            <Card className="p-6 mb-6 bg-slate-900 text-white">
                                <div className="aspect-video flex items-center justify-center">
                                    <p className="text-center text-slate-400">[Placeholder for animated reflex: {reflex.description}]</p>
                                </div>
                            </Card>

                            <h4 className="text-lg font-semibold mb-4 text-center">What type of motion is this?</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <Button
                                onClick={() => handleReflexAnswer('with')}
                                disabled={isAnswered}
                                className={cn('h-20 text-lg', isAnswered && selectedReflexAnswer === 'with' && (isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-600'))}
                            >
                                With Motion
                            </Button>

                            <Button
                                onClick={() => handleReflexAnswer('against')}
                                disabled={isAnswered}
                                className={cn('h-20 text-lg', isAnswered && selectedReflexAnswer === 'against' && (isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-600'))}
                            >
                                Against Motion
                            </Button>

                            <Button
                                onClick={() => handleReflexAnswer('neutral')}
                                disabled={isAnswered}
                                className={cn('h-20 text-lg', isAnswered && selectedReflexAnswer === 'neutral' && (isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-600'))}
                            >
                                Neutral
                            </Button>
                            </div>

                            {isAnswered && (
                            <Alert className={cn(isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200')}>
                                <AlertTitle className={cn('flex items-center gap-2', isCorrect ? 'text-green-800' : 'text-red-800')}>
                                    {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                    {isCorrect ? 'Correct!' : 'Incorrect.'}
                                </AlertTitle>
                                <AlertDescription className={cn(isCorrect ? 'text-green-700' : 'text-red-700')}>
                                This is <strong>{reflex.type}</strong> motion, indicating {reflex.condition}.
                                </AlertDescription>
                            </Alert>
                            )}
                        </div>
                    </section>
                )
             }
            case 10:
                return (
                    <section>
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            <Eye className="h-6 w-6 text-primary" /> Advanced Patient Simulator
                        </h3>
                        <Card>
                            <CardContent className="p-4 md:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Controls */}
                                    <div className="space-y-4">
                                        <Card>
                                            <CardHeader className="p-3"><CardTitle className="text-base">Patient's Rx (Hidden)</CardTitle></CardHeader>
                                            <CardContent className="p-3 pt-0 text-sm text-muted-foreground">
                                                <p>Sphere: {refractiveError.sphere.toFixed(2)} D</p>
                                                <p>Cylinder: {refractiveError.cylinder.toFixed(2)} D</p>
                                                <p>Axis: {refractiveError.axis}°</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="p-3"><CardTitle className="text-base">Trial Lens Power</CardTitle></CardHeader>
                                            <CardContent className="p-3 pt-0 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="trial-sphere" className="w-16">Sphere</Label>
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setTrialLens(p => ({...p, sphere: p.sphere - 0.25}))}><Minus className="h-4 w-4" /></Button>
                                                    <Input id="trial-sphere" readOnly value={`${trialLens.sphere.toFixed(2)} D`} className="text-center font-mono h-8" />
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setTrialLens(p => ({...p, sphere: p.sphere + 0.25}))}><Plus className="h-4 w-4" /></Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                             <CardHeader className="p-3"><CardTitle className="text-base">Streak Rotation</CardTitle></CardHeader>
                                             <CardContent className="p-3 pt-0 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Slider defaultValue={[90]} value={[streakRotation]} max={180} step={1} onValueChange={(v) => setStreakRotation(v[0])} />
                                                    <Input readOnly value={`${streakRotation}°`} className="w-20 text-center font-mono h-8" />
                                                </div>
                                             </CardContent>
                                        </Card>
                                    </div>
                                    {/* Simulation View */}
                                    <div className="flex flex-col items-center justify-center bg-slate-900 rounded-lg p-4 space-y-4">
                                        <div className="w-40 h-40 rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-slate-700 relative">
                                            {/* Pupil */}
                                            <div className="absolute inset-0 bg-red-900/30"></div>
                                            
                                            {/* Reflex */}
                                            <div 
                                                className="bg-orange-400/80 rounded-full"
                                                style={{
                                                    height: '120%',
                                                    width: `${simulatorReflex.width}px`,
                                                    transform: `rotate(${streakRotation}deg)`,
                                                    animation: simulatorReflex.motion === 'with' ? `move 1s linear infinite` : simulatorReflex.motion === 'against' ? `move-rev 1s linear infinite` : 'none',
                                                    transition: 'width 0.3s ease',
                                                    opacity: simulatorReflex.motion === 'neutral' ? 1 : 0.8,
                                                }}
                                            ></div>
                                             <style>{`
                                                @keyframes move { 0% { transform: translate(-10px, -10px) rotate(${streakRotation}deg); } 100% { transform: translate(10px, 10px) rotate(${streakRotation}deg); } }
                                                @keyframes move-rev { 0% { transform: translate(10px, 10px) rotate(${streakRotation}deg); } 100% { transform: translate(-10px, -10px) rotate(${streakRotation}deg); } }
                                            `}</style>
                                        </div>
                                         <div className="text-center text-white">
                                            <p className="font-mono text-lg">
                                                {simulatorReflex.motion.charAt(0).toUpperCase() + simulatorReflex.motion.slice(1)} Motion
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                Speed: {simulatorReflex.speed.toFixed(1)}x, Width: {simulatorReflex.width.toFixed(1)}px
                                            </p>
                                        </div>
                                         {isNeutralized && (
                                            <div className="bg-green-500 text-white font-bold py-1 px-3 rounded-full text-sm">
                                                NEUTRALIZED!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button onClick={generateNewCase} variant="secondary">
                                        <RefreshCw className="mr-2 h-4 w-4" /> New Case
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Alert className="mt-4">
                            <Lightbulb className="h-4 w-4" />
                            <AlertTitle>Simulation Goal</AlertTitle>
                            <AlertDescription>
                                Your working distance is <strong>-1.50 D</strong>. Adjust the sphere power until you see neutral motion. Then, if astigmatism is present, find the two principal meridians, neutralize them, and calculate the final prescription.
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

    

    