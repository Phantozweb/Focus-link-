
'use client';

import { useState, useTransition } from 'react';
import { Chat } from '@/components/chat-ui';
import { interviewerChat } from '@/ai/flows/interviewer-chat';
import type { Message, InterviewerChatOutput } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, ArrowLeft, CheckCircle, PartyPopper } from 'lucide-react';
import { ProfileCard } from '@/components/profile-card';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hello! I\'m the Focus Links AI Interviewer. I\'ll ask you a few questions to help build your professional profile. To start, what is your full name?' },
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
        
        // If the AI has returned a profile with an ID, it means the process is complete.
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
        // Optionally, remove the last user message to allow them to retry
        setMessages(messages);
      }
    });
  };
  
  const handleApprove = async () => {
    if (!liveProfile) return;

    // In a real app, you'd save this to a DB. Here, we can simulate it.
    // The profile is already "complete" by the AI, we just close the dialog.
    setShowSuccessDialog(false);
    // You could redirect them to their new profile page, for example.
    // For now, we'll just show a toast.
    toast({
        title: "Profile Created!",
        description: "Your new profile is now available in the directory.",
    });
    setMessages([messages[0]]); // Reset chat
    setLiveProfile(null);
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
             <Button variant="outline" asChild>
                <Link href="/directory/create"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Options</Link>
            </Button>
        </div>
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
