
'use client';

import { useState, useTransition } from 'react';
import { GuidedQuestionnaire } from '@/components/guided-questionnaire';
import { generateInterviewQuestions } from '@/ai/flows/generate-interview-questions';
import { processInterviewAnswers } from '@/ai/flows/process-interview-answers';

import type { UserProfile } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, PartyPopper, Bot, FileText, Loader2, ArrowRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialProfile: Partial<UserProfile> = {
    name: '',
    type: undefined,
    location: '',
    experience: '',
    bio: '',
    skills: [],
    interests: [],
    links: { email: '', linkedin: ''},
    workExperience: [],
    education: [],
    verified: false,
};

const AiQuestionView = ({ question, onAnswer, isPending, totalQuestions, currentQuestionIndex }: { question: string, onAnswer: (answer: string) => void, isPending: boolean, totalQuestions: number, currentQuestionIndex: number }) => {
    const [answer, setAnswer] = useState('');

    const handleSend = () => {
        if (answer.trim()) {
            onAnswer(answer);
            setAnswer('');
        }
    };
    
    const isFinalQuestion = currentQuestionIndex === totalQuestions - 1;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>AI Interview</CardTitle>
                <CardDescription>Answer the AI's questions to complete your profile.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
                 <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="mb-8" />
                <div className="space-y-4">
                    <Label htmlFor="ai-question" className="text-xl font-semibold text-center block">{question}</Label>
                    <Input
                        id="ai-question"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && answer.trim() && handleSend()}
                        placeholder="Type your answer here..."
                        className="text-center text-lg h-12"
                        autoFocus
                        disabled={isPending}
                    />
                </div>
                <div className="flex justify-end items-center mt-8">
                     <Button onClick={handleSend} disabled={!answer.trim() || isPending}>
                        {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : 
                         isFinalQuestion ? 'Finish & Review' : 'Next'}
                        {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function CreateProfilePage() {
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<'questionnaire' | 'ai-interview' | 'loading'>('questionnaire');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<Partial<UserProfile>>({});
  const [aiQuestions, setAiQuestions] = useState<string[]>([]);
  const [aiAnswers, setAiAnswers] = useState<string[]>([]);
  const [currentAiQuestionIndex, setCurrentAiQuestionIndex] = useState(0);
  const [finalProfile, setFinalProfile] = useState<Partial<UserProfile>>(initialProfile);
  const [completenessScore, setCompletenessScore] = useState(0);


  const handleQuestionnaireComplete = async (data: Partial<UserProfile>) => {
    setInitialData(data);
    setView('loading');
    startTransition(async () => {
      try {
        const { questions } = await generateInterviewQuestions({ initialData: JSON.stringify(data) });
        if (questions && questions.length > 0) {
            setAiQuestions(questions);
            setCurrentAiQuestionIndex(0);
            setView('ai-interview');
        } else {
            // If no questions are generated, proceed to final processing
            await processFinalProfile([]);
        }
      } catch (error) {
        console.error('AI Question Generation Error:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'The AI assistant failed to generate interview questions. Please try again.',
        });
        setView('questionnaire');
      }
    });
  };

  const handleAiAnswer = (answer: string) => {
    const newAnswers = [...aiAnswers, answer];
    setAiAnswers(newAnswers);
    if (currentAiQuestionIndex < aiQuestions.length - 1) {
        setCurrentAiQuestionIndex(prev => prev + 1);
    } else {
        processFinalProfile(newAnswers);
    }
  };

  const processFinalProfile = async (finalAnswers: string[]) => {
      setView('loading');
      startTransition(async () => {
          try {
              const fullConversation = {
                  initialData: JSON.stringify(initialData),
                  questions: aiQuestions,
                  answers: finalAnswers,
              };

              const result = await processInterviewAnswers(fullConversation);
              
              if (result.profile) {
                setFinalProfile(prev => ({...prev, ...initialData, ...result.profile}));
                setCompletenessScore(result.completenessScore || 0);
              }
              
              setShowSuccessDialog(true);

          } catch (error) {
              console.error('AI Processing Error:', error);
              toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: 'The AI failed to process your profile. Please try again.',
              });
              // Go back to the last question
              setView('ai-interview'); 
          }
      });
  };
  
  const handleApprove = async () => {
    setShowSuccessDialog(false);
    toast({
        title: "Profile Submitted!",
        description: "Your new profile has been sent for approval.",
    });
    // Reset all state for a new session
    setInitialData({});
    setAiQuestions([]);
    setAiAnswers([]);
    setCurrentAiQuestionIndex(0);
    setFinalProfile(initialProfile);
    setCompletenessScore(0);
    setView('questionnaire');
  }

  const ReportItem = ({ label, value }: { label: string, value: string | string[] | undefined | null }) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return null;
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      return (
          <div className="flex items-start gap-3 text-sm">
             <div className="p-2 rounded-full bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
             </div>
             <div>
                <p className="font-semibold">{label}</p>
                <p className="text-muted-foreground">{displayValue}</p>
             </div>
          </div>
      );
  }

  const renderContent = () => {
    switch(view) {
        case 'questionnaire':
            return <GuidedQuestionnaire onComplete={handleQuestionnaireComplete} />;
        case 'ai-interview':
            return <AiQuestionView 
                question={aiQuestions[currentAiQuestionIndex]} 
                onAnswer={handleAiAnswer}
                isPending={isPending}
                totalQuestions={aiQuestions.length}
                currentQuestionIndex={currentAiQuestionIndex}
            />
        case 'loading':
            return (
                <Card className="h-full flex flex-col items-center justify-center">
                    <CardContent className="text-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <h2 className="text-xl font-semibold text-slate-700">AI is Preparing Your Profile...</h2>
                        <p className="text-muted-foreground">This may take a moment.</p>
                    </CardContent>
                </Card>
            )
        default:
             return <GuidedQuestionnaire onComplete={handleQuestionnaireComplete} />;
    }
  }

  return (
    <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">AI Profile Creation</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Answer a few quick questions, then have a natural conversation with our AI to build your complete professional profile.
            </p>
            </div>
        </section>
    
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 h-[70vh]">
              {renderContent()}
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText /> Interview Report</CardTitle>
                  <CardDescription>
                      {view === 'questionnaire'
                        ? 'Complete the initial questions to begin the AI interview.'
                        : 'Your profile is built in real-time as you answer questions.'
                      }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  { (view === 'ai-interview' || view === 'loading' || showSuccessDialog) &&
                    <div>
                        <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-sm">Profile Completeness Score</h4>
                        <p className="font-bold text-primary text-lg">{completenessScore}/10</p>
                        </div>
                        <Progress value={completenessScore * 10} />
                    </div>
                  }
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                     <ReportItem label="Name" value={finalProfile.name || initialData.name} />
                     <ReportItem label="Role" value={finalProfile.type || initialData.type} />
                     <ReportItem label="Location" value={finalProfile.location || initialData.location} />
                     <ReportItem label="Headline" value={finalProfile.experience} />
                     <ReportItem label="Bio" value={finalProfile.bio} />
                     <ReportItem label="Skills" value={finalProfile.skills} />
                     <ReportItem label="Interests" value={finalProfile.interests} />
                     <ReportItem label="Email" value={finalProfile.links?.email} />
                     <ReportItem label="LinkedIn/Website" value={finalProfile.links?.linkedin} />
                     <ReportItem label="Work Experience" value={finalProfile.workExperience?.map(w => w.title)} />
                     <ReportItem label="Education" value={finalProfile.education?.map(e => e.degree)} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      
       <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
             <div className="flex justify-center">
              <PartyPopper className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Profile Ready! Score: {completenessScore}/10</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              The AI has processed your answers. Review your generated profile information. You can now submit it for final approval.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>Make Changes</Button>
            <AlertDialogAction onClick={handleApprove}>Looks Good, Submit Profile</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

    