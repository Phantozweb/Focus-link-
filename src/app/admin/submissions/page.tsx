'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Check, X, User, ShieldCheck } from 'lucide-react';
import type { UserProfile } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function SubmissionDetails({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-3 text-sm">
      <p><strong>Role:</strong> {profile.type}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Headline:</strong> {profile.experience}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <p><strong>Interests:</strong> {profile.interests.join(', ')}</p>
      <p><strong>Email:</strong> {profile.links.email}</p>
      <p><strong>LinkedIn/Website:</strong> {profile.links.linkedin}</p>
      {profile.workExperience && profile.workExperience.length > 0 && (
        <div>
          <strong>Work Experience:</strong>
          <ul className="list-disc pl-5">
            {profile.workExperience.map((exp, i) => <li key={i}>{exp.title} at {exp.company}</li>)}
          </ul>
        </div>
      )}
       {profile.education && profile.education.length > 0 && (
        <div>
          <strong>Education:</strong>
          <ul className="list-disc pl-5">
            {profile.education.map((edu, i) => <li key={i}>{edu.degree} from {edu.school}</li>)}
          </ul>
        </div>
      )}
       {profile.languages && profile.languages.length > 0 && (
         <p><strong>Languages:</strong> {profile.languages.join(', ')}</p>
      )}
    </div>
  )
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // IMPORTANT: This is a simple protection mechanism for demonstration.
    // In a real app, use a proper authentication system with server-side checks.
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      router.replace('/admin');
      return;
    }

    async function fetchSubmissions() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/submissions');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          toast({ variant: 'destructive', title: 'Failed to load submissions.' });
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'An error occurred while fetching submissions.' });
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubmissions();
  }, [router, toast]);


  const handleReview = async (profileId: string, action: 'approve' | 'reject') => {
    setIsProcessing(profileId);
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, action }),
      });

      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== profileId));
        toast({
          title: `Profile ${action === 'approve' ? 'Approved' : 'Rejected'}`,
          description: `The profile has been successfully ${action === 'approve' ? 'added to the directory' : 'removed'}.`,
        });
      } else {
        const errorData = await response.json();
        toast({ variant: 'destructive', title: 'Action Failed', description: errorData.message });
      }
    } catch (error) {
       toast({ variant: 'destructive', title: 'An error occurred.' });
    } finally {
      setIsProcessing(null);
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.replace('/admin');
     toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  }

  if (isLoading && !submissions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    Admin Dashboard
                </CardTitle>
                <CardDescription>
                    Review and approve new profile submissions. Found {submissions.length} pending profiles.
                </CardDescription>
            </div>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </CardHeader>
          <CardContent>
            {submissions.length > 0 ? (
               <Accordion type="single" collapsible className="w-full">
                {submissions.map(profile => (
                  <AccordionItem value={profile.id} key={profile.id}>
                    <AccordionTrigger>
                       <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <span className="font-semibold">{profile.name}</span>
                          <span className="text-sm text-muted-foreground">({profile.type})</span>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SubmissionDetails profile={profile} />
                      <div className="flex gap-4 mt-6">
                        <Button
                          onClick={() => handleReview(profile.id, 'approve')}
                          disabled={isProcessing === profile.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isProcessing === profile.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReview(profile.id, 'reject')}
                          disabled={isProcessing === profile.id}
                          variant="destructive"
                        >
                           {isProcessing === profile.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                          Reject
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No pending submissions.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
