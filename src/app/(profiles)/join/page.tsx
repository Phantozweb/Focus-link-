
'use client';

import { useState } from 'react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { interviewerChat } from '@/ai/flows/interviewer-chat';
import { ProfileCard } from '@/components/profile-card';
import type { UserProfile, InterviewOutput, Message } from '@/types';
import { Chat } from '@/components/chat-ui';

export default function JoinPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<InterviewOutput | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm the Focus Links Interviewer AI. I'm here to help you create your professional profile. To start, please tell me a little bit about yourself. For example, you can mention your name, your role (like Student or Optometrist), where you're located, and what you do.",
    },
  ]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const result = await interviewerChat(newMessages);
      
      if (result.profile) {
        setGeneratedProfile(result.profile);
        const finalBotMessage: Message = { role: 'model', content: result.reply || "Thanks! Here is your generated profile." };
        setMessages(prev => [...prev, finalBotMessage]);

        toast({
            title: 'Profile Generated!',
            description: 'Review your profile below and submit when you are ready.',
        });
      } else if (result.reply) {
         const botMessage: Message = { role: 'model', content: result.reply };
         setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error("The AI didn't provide a reply or a profile.");
      }
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = { role: 'model', content: "I'm sorry, I encountered an error. Could you please try rephrasing your last message?" };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        variant: 'destructive',
        title: 'AI Chat Error',
        description: 'Could not get a response from the AI. Please try again.',
      });
    }
  };


  async function onSubmit() {
    if (!generatedProfile) {
        toast({ variant: 'destructive', title: 'Please generate a profile first.' });
        return;
    }
    setIsSubmitting(true);
    
    const now = new Date();
    const profileId = `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    
    const webhookUrl = 'https://discord.com/api/webhooks/1416675826577182780/gxAG9Kz0YJB1v9dRRA0TRMs2oDXH6CLOomD_qqzPjab0Iy78oWQ64n3bDc1tFnL-oa-k';

    let details = `**Profile Type**: ${generatedProfile.type}\n`;
    details += `**Location**: ${generatedProfile.location}\n`;
    details += `**Headline/Tagline**: ${generatedProfile.experience}\n`;
    details += `**Bio/Description**: ${generatedProfile.bio}\n`;
    details += `**Skills**: ${generatedProfile.skills.join(', ')}\n`;
    details += `**Interests**: ${generatedProfile.interests.join(', ')}\n`;

    if (generatedProfile.links?.email) {
      details += `**Email**: ${generatedProfile.links.email}\n`;
    }
    if (generatedProfile.links?.linkedin) {
      details += `**LinkedIn/Website**: ${generatedProfile.links.linkedin}\n`;
    }
    if (generatedProfile.languages && generatedProfile.languages.length > 0) {
      details += `**Languages**: ${generatedProfile.languages.join(', ')}\n`;
    }
    if (generatedProfile.workExperience && generatedProfile.workExperience.length > 0) {
      details += `**Work Experience**: ${generatedProfile.workExperience.map(w => `${w.title} at ${w.company} (${w.startDate} - ${w.endDate})`).join('; ')}\n`;
    }
    if (generatedProfile.education && generatedProfile.education.length > 0) {
      details += `**Education**: ${generatedProfile.education.map(e => `${e.degree} from ${e.school} (${e.startYear} - ${e.endYear})`).join('; ')}\n`;
    }

    const embed = {
      title: `New Profile Submission: ${generatedProfile.name}`,
      color: 3447003, // A nice blue color
      description: `\`\`\`${details}\`\`\``,
      footer: {
        text: `Profile ID: ${profileId}`
      },
      timestamp: new Date().toISOString()
    };
    
    const formData = new FormData();
    formData.append('payload_json', JSON.stringify({ embeds: [embed] }));

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowSuccessDialog(true);
      } else {
        const errorData = await response.json();
        console.error('Discord Webhook Error:', errorData);
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: 'Could not send data to Discord. Please check the logs.',
        });
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'A network error occurred. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    startOver();
  }

  const startOver = () => {
      setGeneratedProfile(null);
      setMessages([
        {
          role: 'model',
          content: "Hello! I'm the Focus Links Interviewer AI. Let's start over. Tell me a bit about yourself to begin creating your profile.",
        },
      ]);
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center font-headline text-3xl flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" /> Focus Links Interviewer AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {!generatedProfile ? (
            <div className="h-[60vh]">
                <Chat messages={messages} onSendMessage={handleSendMessage} />
            </div>
          ) : (
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-headline">Your Generated Profile</h2>
                    <p className="text-muted-foreground">Here is a preview of what your profile will look like. Review it and submit when you are ready.</p>
                </div>
                
                <div className="max-w-md mx-auto">
                    <ProfileCard user={generatedProfile as UserProfile} />
                </div>
                
                <Separator />

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={onSubmit} size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                        </>
                    ) : (
                        'Submit for Review'
                    )}
                    </Button>
                    <Button onClick={startOver} size="lg" variant="outline" className="w-full sm:w-auto">
                        <RefreshCw className="mr-2 h-4 w-4" /> Start Over
                    </Button>
                </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
             <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Submission Successful!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your profile has been submitted for review. It will appear on the directory once it has been approved. This may take some time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessDialog}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
