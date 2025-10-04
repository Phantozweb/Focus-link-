
'use client';

import { useState, useTransition } from 'react';
import { Chat } from '@/components/chat-ui';
import { interviewerChat } from '@/ai/flows/interviewer-chat';
import type { Message, InterviewerChatOutput, UserProfile } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, CheckCircle, PartyPopper, Bot, FileText, ChevronRight } from 'lucide-react';
import { ProfileCard } from '@/components/profile-card';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';


export default function CreateProfilePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm the Focus Links AI Interviewer. I'll ask you a few questions to help build your professional profile. To start, what is your full name?" },
  ]);
  const [completenessScore, setCompletenessScore] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (text: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);

    startTransition(async () => {
      try {
        const result = await interviewerChat(newMessages);
        const { reply, suggestions, completenessScore: scoreUpdate } = result;

        if (scoreUpdate !== undefined) {
            setCompletenessScore(scoreUpdate);
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
    setMessages([messages[0]]);
    setCompletenessScore(0);
  }

  return (
    <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">AI Profile Creation</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Have a natural conversation with our AI assistant. It will ask you questions one by one and score your profile's completeness.
            </p>
            </div>
        </section>
    
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 h-[70vh]">
              <Chat messages={messages} onSendMessage={handleSendMessage} />
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText /> Interview Report</CardTitle>
                  <CardDescription>Your profile completeness will be scored as you answer the AI's questions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">Profile Score</h4>
                      <p className="font-bold text-primary text-lg">{completenessScore}/10</p>
                    </div>
                    <Progress value={completenessScore * 10} />
                  </div>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                     {messages.slice(1).map((message, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm">
                           <div className={cn("p-2 rounded-full", message.role === 'model' ? 'bg-primary/10' : 'bg-muted')}>
                            {message.role === 'model' ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-semibold">{message.role === 'model' ? "AI Question" : "Your Answer"}</p>
                            <p className="text-muted-foreground">{message.content}</p>
                          </div>
                        </div>
                     ))}
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
