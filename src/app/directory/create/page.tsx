
'use client';

import { useState, useTransition, useMemo } from 'react';
import { Chat } from '@/components/chat-ui';
import { GuidedQuestionnaire } from '@/components/guided-questionnaire';
import { interviewerChat } from '@/ai/flows/interviewer-chat';
import type { Message, UserProfile, InterviewerChatOutput } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, CheckCircle, PartyPopper, Bot, FileText, ChevronRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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


export default function CreateProfilePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<Partial<UserProfile>>(initialProfile);
  const [completenessScore, setCompletenessScore] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  const [view, setView] = useState<'questionnaire' | 'chat'>('questionnaire');

  const handleQuestionnaireComplete = (data: Partial<UserProfile>) => {
    const initialContext = `Great, I have your initial information. You've set your name as ${data.name}, your role as ${data.type}, and your location as ${data.location}. Now, let's build out the rest of your profile. To start, could you tell me a bit more about your work or studies for your bio?`;
    
    setProfile(data);
    setMessages([{ role: 'model', content: initialContext }]);
    setView('chat');
  };


  const handleSendMessage = async (text: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);

    startTransition(async () => {
      try {
        const result = await interviewerChat(newMessages);
        const { reply, suggestions, completenessScore: scoreUpdate, profile: profileUpdate } = result;

        if (scoreUpdate !== undefined) {
            setCompletenessScore(scoreUpdate);
        }
        
        if (profileUpdate) {
            setProfile(prev => ({...prev, ...profileUpdate}));
        }

        if (reply) {
            setMessages(prev => [...prev, { role: 'model', content: reply, suggestions }]);
        }
        
        if (scoreUpdate === 10) {
            setShowSuccessDialog(true);
        }

      } catch (error) {
        console.error('AI Chat Error:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'The AI assistant ran into a problem. Please try again.',
        });
        setMessages(messages); // Roll back on error
      }
    });
  };
  
  const handleApprove = async () => {
    setShowSuccessDialog(false);
    toast({
        title: "Profile Submitted!",
        description: "Your new profile has been sent for approval.",
    });
    setMessages([]);
    setProfile(initialProfile);
    setCompletenessScore(0);
    setView('questionnaire');
  }
  
  const ReportItem = ({ label, value }: { label: string, value: string | string[] | undefined | null }) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
          return null;
      }
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
              {view === 'questionnaire' ? (
                  <GuidedQuestionnaire onComplete={handleQuestionnaireComplete} />
              ) : (
                  <Chat messages={messages} onSendMessage={handleSendMessage} />
              )}
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText /> Interview Report</CardTitle>
                  <CardDescription>
                      {view === 'questionnaire'
                        ? 'Complete the initial questions to begin the AI interview.'
                        : 'Your profile is built in real-time as you answer questions. A score of 10/10 is required.'
                      }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">Profile Completeness Score</h4>
                      <p className="font-bold text-primary text-lg">{completenessScore}/10</p>
                    </div>
                    <Progress value={completenessScore * 10} />
                  </div>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                     <ReportItem label="Name" value={profile.name} />
                     <ReportItem label="Role" value={profile.type} />
                     <ReportItem label="Location" value={profile.location} />
                     <ReportItem label="Headline" value={profile.experience} />
                     <ReportItem label="Bio" value={profile.bio} />
                     <ReportItem label="Skills" value={profile.skills} />
                     <ReportItem label="Interests" value={profile.interests} />
                     <ReportItem label="Email" value={profile.links?.email} />
                     <ReportItem label="LinkedIn/Website" value={profile.links?.linkedin} />
                     <ReportItem label="Work Experience" value={profile.workExperience?.map(w => w.title)} />
                     <ReportItem label="Education" value={profile.education?.map(e => e.degree)} />
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
            <AlertDialogTitle className="text-center">Profile Ready! Score: 10/10</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              The AI has gathered all the necessary information. You can now submit your profile for review.
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
