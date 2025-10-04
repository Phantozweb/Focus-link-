
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, Sparkles, RefreshCw, FileText } from 'lucide-react';
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
import type { UserProfile, Message } from '@/types';
import { Chat } from '@/components/chat-ui';

const ReportItem = ({ label, value }: { label: string; value: string | string[] | undefined }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    const displayValue = Array.isArray(value) ? value.join(', ') : value;

    return (
        <div className="grid grid-cols-3 gap-2 text-sm">
            <dt className="font-semibold text-gray-600 col-span-1">{label}</dt>
            <dd className="text-gray-800 col-span-2">{displayValue}</dd>
        </div>
    );
};

export default function JoinPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<Partial<UserProfile>>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm the Focus Links Interviewer AI. I'll help you create your professional profile by asking a few questions.\n\nTo start, what is your full name?",
    },
  ]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const result = await interviewerChat(newMessages);
      
      if (result.profile) {
        setGeneratedProfile(currentProfile => ({...currentProfile, ...result.profile}));
      }

      if (result.reply) {
         const botMessage: Message = { role: 'model', content: result.reply, suggestions: result.suggestions };
         setMessages(prev => [...prev, botMessage]);
      }
      
      if (result.profile?.id) {
        setIsComplete(true);
        toast({
            title: 'Profile Generated!',
            description: 'Your interview report is ready. Please review and submit it.',
        });
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
    if (!isComplete || !generatedProfile.id) {
        toast({ variant: 'destructive', title: 'Please complete the interview to generate a full profile first.' });
        return;
    }
    setIsSubmitting(true);
    
    const webhookUrl = 'https://discord.com/api/webhooks/1416675826577182780/gxAG9Kz0YJB1v9dRRA0TRMs2oDXH6CLOomD_qqzPjab0Iy78oWQ64n3bDc1tFnL-oa-k';

    let details = `**Profile Type**: ${generatedProfile.type}\n`;
    details += `**Location**: ${generatedProfile.location}\n`;
    details += `**Headline/Tagline**: ${generatedProfile.experience}\n`;
    details += `**Bio/Description**: ${generatedProfile.bio}\n`;
    if (generatedProfile.skills && generatedProfile.skills.length > 0) details += `**Skills**: ${generatedProfile.skills.join(', ')}\n`;
    if (generatedProfile.interests && generatedProfile.interests.length > 0) details += `**Interests**: ${generatedProfile.interests.join(', ')}\n`;

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
        text: `Profile ID: ${generatedProfile.id}`
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
      setIsComplete(false);
      setGeneratedProfile({});
      setMessages([
        {
          role: 'model',
          content: "Hello! I'm the Focus Links Interviewer AI. Let's start over. What is your full name?",
        },
      ]);
  }
  
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center font-headline text-3xl flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" /> Focus Links Interviewer AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Chat Panel */}
            <div className="lg:col-span-2 h-[70vh]">
              <Chat messages={messages} onSendMessage={handleSendMessage} />
            </div>

            {/* Data Preview Panel */}
            <div className="lg:col-span-3">
               <div className="sticky top-24">
                  <div className="text-center mb-4">
                      <h2 className="text-2xl font-bold font-headline flex items-center justify-center gap-2">
                        <FileText className="h-6 w-6" /> Your Interview Report
                      </h2>
                      <p className="text-muted-foreground">The information gathered by the AI will appear here in real-time.</p>
                  </div>
                  <Card className="bg-slate-50 border-slate-200 max-h-[50vh] overflow-y-auto">
                      <CardContent className="p-6">
                        {Object.keys(generatedProfile).length > 0 ? (
                            <dl className="space-y-4">
                                <ReportItem label="Name" value={generatedProfile.name} />
                                <ReportItem label="Role" value={generatedProfile.type} />
                                <ReportItem label="Headline" value={generatedProfile.experience} />
                                <ReportItem label="Location" value={generatedProfile.location} />
                                <ReportItem label="Bio" value={generatedProfile.bio} />
                                <ReportItem label="Skills" value={generatedProfile.skills} />
                                <ReportItem label="Interests" value={generatedProfile.interests} />
                                <ReportItem label="Email" value={generatedProfile.links?.email} />
                                <ReportItem label="Website/LinkedIn" value={generatedProfile.links?.linkedin} />
                                <ReportItem label="Languages" value={generatedProfile.languages} />
                                {generatedProfile.workExperience && generatedProfile.workExperience.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                        <dt className="font-semibold text-gray-600 col-span-1">Work Experience</dt>
                                        <dd className="text-gray-800 col-span-2">
                                            {generatedProfile.workExperience.map((exp, i) => (
                                                <div key={i} className="mb-2">{exp.title} at {exp.company}</div>
                                            ))}
                                        </dd>
                                    </div>
                                )}
                                {generatedProfile.education && generatedProfile.education.length > 0 && (
                                     <div className="grid grid-cols-3 gap-2 text-sm">
                                        <dt className="font-semibold text-gray-600 col-span-1">Education</dt>
                                        <dd className="text-gray-800 col-span-2">
                                             {generatedProfile.education.map((edu, i) => (
                                                <div key={i} className="mb-2">{edu.degree} from {edu.school}</div>
                                            ))}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                <p>Your report will be generated here as you answer the questions.</p>
                            </div>
                        )}
                      </CardContent>
                  </Card>

                  {isComplete && (
                     <>
                        <Separator className="my-6" />
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
                     </>
                  )}
               </div>
            </div>
          </div>
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
