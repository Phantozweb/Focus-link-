
'use client';

import { useState, useTransition } from 'react';
import { Chat } from '@/components/chat-ui';
import { interviewerChat } from '@/ai/flows/interviewer-chat';
import type { Message, InterviewerChatOutput } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, CheckCircle, PartyPopper } from 'lucide-react';
import { ProfileCard } from '@/components/profile-card';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function CreateProfilePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm the Focus Links AI Interviewer. I'll ask you a few questions to help build your professional profile. To start, what is your full name?" },
  ]);
  const [liveProfile, setLiveProfile] = useState<InterviewerChatOutput['profile'] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (text: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);

    startTransition(async () => {
      try {
        const result = await interviewerChat(newMessages);
        const { reply, suggestions, profile } = result;

        if (profile) {
            setLiveProfile(profile);
        }

        if (reply) {
            setMessages(prev => [...prev, { role: 'model', content: reply, suggestions }]);
        }
        
        if (profile?.id) {
            setShowSuccessDialog(true);
        }

      } catch (error) {
        console.error('AI Chat Error:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'The AI assistant ran into a problem. Please try again.',
        });
        setMessages(messages);
      }
    });
  };
  
  const handleApprove = async () => {
    if (!liveProfile) return;
    setShowSuccessDialog(false);
    toast({
        title: "Profile Created!",
        description: "Your new profile is now available in the directory.",
    });
    setMessages([messages[0]]);
    setLiveProfile(null);
  }

  return (
    <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">AI Profile Creation</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Have a natural conversation with our AI assistant. It will ask you questions one by one to build your professional profile.
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
                  <CardTitle>Live Profile Preview</CardTitle>
                  <CardDescription>As you answer, your profile will be updated here in real-time.</CardDescription>
                </CardHeader>
                <CardContent>
                  {liveProfile && liveProfile.name ? (
                    <ProfileCard user={{...liveProfile, id: 'preview'} as any} hideButton={true} />
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <User className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>Your profile preview will appear here.</p>
                    </div>
                  )}
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
            <AlertDialogTitle className="text-center">Profile Ready!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              The AI has finished creating your profile. Please review the final version. You can now add it to the directory.
            </AlertDialogDescription>
          </AlertDialogHeader>
           {liveProfile && (
              <div className="my-4">
                <ProfileCard user={liveProfile as any} hideButton />
              </div>
            )}
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>Make Changes</Button>
            <AlertDialogAction onClick={handleApprove}>Looks Good, Create Profile</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
