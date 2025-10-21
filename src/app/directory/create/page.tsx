
'use client';

import { useState, useTransition } from 'react';
import { GuidedQuestionnaire } from '@/components/guided-questionnaire';
import { generateInterviewQuestions } from '@/ai/flows/generate-interview-questions';
import { processInterviewAnswers } from '@/ai/flows/process-interview-answers';

import type { UserProfile } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, PartyPopper, Bot, FileText, Loader2, ArrowRight, Image as ImageIcon, Sparkles, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProfileSchema } from '@/types';

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

const FinalReviewView = ({ profileData, onApprove, onEdit, isSubmitting }: { profileData: Partial<UserProfile>, onApprove: (data: Partial<UserProfile>) => void, onEdit: () => void, isSubmitting: boolean }) => {
    const form = useForm<Partial<UserProfile>>({
        resolver: zodResolver(UserProfileSchema.partial()),
        defaultValues: profileData,
    });

    const { control, register } = form;

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
    const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({ control, name: "interests" });

    const onSubmit = (data: Partial<UserProfile>) => {
        onApprove(data);
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PartyPopper className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-headline mt-4">Review Your AI-Generated Profile</CardTitle>
                <CardDescription className="mt-1 text-base">
                    The AI has finished. Review and edit any field below, then add a profile picture URL and submit.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-6 overflow-y-auto pr-6">
                <form id="final-review-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="avatarUrl">Profile Picture URL</Label>
                        <Input id="avatarUrl" {...register('avatarUrl')} placeholder="https://example.com/your-photo.jpg" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register('name')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="experience">Headline</Label>
                        <Input id="experience" {...register('experience')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" {...register('bio')} rows={5} />
                    </div>

                    <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="space-y-2">
                            {skillFields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <Input {...register(`skills.${index}` as const)} />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendSkill('')}>Add Skill</Button>
                    </div>

                     <div className="space-y-2">
                        <Label>Interests</Label>
                        <div className="space-y-2">
                            {interestFields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <Input {...register(`interests.${index}` as const)} />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeInterest(index)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendInterest('')}>Add Interest</Button>
                    </div>
                </form>
            </CardContent>
            <CardContent>
                 <div className="flex justify-between items-center mt-8">
                    <Button variant="outline" onClick={onEdit}>
                        <Edit className="mr-2 h-4 w-4" /> Go Back & Re-run AI
                    </Button>
                    <Button form="final-review-form" type="submit" disabled={isSubmitting} size="lg">
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Looks Good, Submit Profile'}
                        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default function CreateProfilePage() {
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<'questionnaire' | 'ai-interview' | 'loading' | 'final-review'>('questionnaire');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<Partial<UserProfile>>({});
  const [aiQuestions, setAiQuestions] = useState<string[]>([]);
  const [aiAnswers, setAiAnswers] = useState<string[]>([]);
  const [currentAiQuestionIndex, setCurrentAiQuestionIndex] = useState(0);
  const [finalProfile, setFinalProfile] = useState<Partial<UserProfile>>({
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
      avatarUrl: '',
  });
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
            setAiAnswers([]);
            setView('ai-interview');
        } else {
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
                // Ensure skills/interests are arrays
                result.profile.skills = Array.isArray(result.profile.skills) ? result.profile.skills : [];
                result.profile.interests = Array.isArray(result.profile.interests) ? result.profile.interests : [];

                setFinalProfile(prev => ({...prev, ...initialData, ...result.profile}));
                setCompletenessScore(result.completenessScore || 0);
              }
              
              setView('final-review');

          } catch (error) {
              console.error('AI Processing Error:', error);
              toast({
                  variant: 'destructive',
                  title: 'Error',
                  description: 'The AI failed to process your profile. Please try again.',
              });
              setView('ai-interview'); 
          }
      });
  };
  
  const handleApprove = async (editedData: Partial<UserProfile>) => {
    startTransition(async () => {
        try {
            const newSubmissionId = `focuslinks-${Date.now()}`;
            const submissionData = {
                ...editedData,
                submissionId: newSubmissionId,
                submissionDate: new Date().toISOString(),
                status: 'In Review',
            };

            const response = await fetch('/api/submit-ai-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit profile.');
            }
            
            setSubmissionId(newSubmissionId);
            setShowSuccessDialog(true);
            setView('questionnaire');

        } catch (error) {
            console.error('Profile Submission Error:', error);
            toast({
                variant: 'destructive',
                title: 'Submission Failed',
                description: 'There was an error submitting your profile. Please try again.',
            });
        }
    });
  }

  const handleRegenerate = () => {
      if (initialData) {
        handleQuestionnaireComplete(initialData);
      } else {
        setView('questionnaire');
      }
  }

  const handleFinalReset = () => {
    setShowSuccessDialog(false);
    setInitialData({});
    setAiQuestions([]);
    setAiAnswers([]);
    setCurrentAiQuestionIndex(0);
    setFinalProfile({
        name: '', type: undefined, location: '', experience: '', bio: '', skills: [], interests: [],
        links: { email: '', linkedin: ''}, workExperience: [], education: [], verified: false, avatarUrl: '',
    });
    setCompletenessScore(0);
    setSubmissionId('');
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
        case 'final-review':
             return (
                <FinalReviewView
                    profileData={finalProfile}
                    onApprove={handleApprove}
                    onEdit={handleRegenerate}
                    isSubmitting={isPending}
                />
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
            <div className="lg:col-span-2 h-[80vh]">
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
                  { (view !== 'questionnaire') &&
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
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Profile Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your profile has been sent for review. Please save your Submission ID for your records.
               <div className="font-mono text-sm bg-muted text-foreground p-2 rounded-md mt-4">
                {submissionId}
               </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleFinalReset}>
              Create Another Profile
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
