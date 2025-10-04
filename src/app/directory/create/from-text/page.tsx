
'use client';

import { useState, useTransition } from 'react';
import { interview } from '@/ai/flows/interviewer';
import type { InterviewOutput } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ArrowLeft, PartyPopper } from 'lucide-react';
import { ProfileCard } from '@/components/profile-card';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


export default function InterviewerPage() {
  const [text, setText] = useState('');
  const [profile, setProfile] = useState<InterviewOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateProfile = () => {
    if (!text.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please provide some text about yourself.',
      });
      return;
    }

    setProfile(null);
    startTransition(async () => {
      try {
        const result = await interview({ text });
        setProfile(result);
      } catch (error) {
        console.error('AI Interview Error:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'The AI failed to generate a profile. Please try modifying your text or try again later.',
        });
      }
    });
  };

  const handleApprove = async () => {
    if (!profile) return;
    
    // In a real application, you would save the profile to your database here.
    // For this demo, we'll simulate a success message.
    toast({
        title: "Profile Created!",
        description: "Your new profile has been successfully added to the directory.",
    });

    // Reset the state
    setProfile(null);
    setText('');
  }

  return (
    <>
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
             <Button variant="outline" asChild>
                <Link href="/directory/create"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Options</Link>
            </Button>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>AI Profile Builder</CardTitle>
              <CardDescription>
                Paste your resume, LinkedIn bio, or simply write about your experience. Our AI will analyze the text and create a structured professional profile for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g., 'I am Dr. Jane Doe, an optometrist with over 10 years of experience specializing in pediatric eye care...'"
                  rows={15}
                  disabled={isPending}
                />
                <Button onClick={handleGenerateProfile} disabled={isPending} className="w-full">
                  {isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Wand2 className="mr-2 h-4 w-4" /> Generate Profile</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold font-headline mb-4">Generated Profile Preview</h2>
            {isPending && (
                <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">AI is building your profile...</p>
                </div>
            )}
            
            {profile && (
              <div className="space-y-4">
                <ProfileCard user={profile} hideButton />
                <Button onClick={handleApprove} size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    Looks Good, Create Profile
                </Button>
                 <Button onClick={() => setProfile(null)} size="lg" variant="outline" className="w-full">
                    Start Over
                </Button>
              </div>
            )}

            {!isPending && !profile && (
                 <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg bg-card">
                    <PartyPopper className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground text-center">Your generated profile will appear here.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
