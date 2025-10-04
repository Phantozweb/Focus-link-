
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, CheckCircle } from 'lucide-react';
import { countries } from '@/lib/countries';
import type { UserProfile } from '@/types';


const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  country: z.string({ required_error: 'Please select a country.'}),
  role: z.enum(profileTypes, { required_error: 'You must select a professional role.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MembershipPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    const profileData = {
        id: String(Date.now()),
        name: data.name,
        type: data.role,
        location: data.country,
        links: {
            email: data.email,
        },
        // Add default empty values for other UserProfile fields
        experience: `${data.role} from ${data.country}`,
        bio: 'A new member of the Focus Links community.',
        skills: [],
        interests: [],
        avatarUrl: 'https://i.ibb.co/jG6L8p3/default-avatar.png',
        workExperience: [],
        education: [],
        languages: [],
        verified: false,
    };

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setShowSuccessDialog(true);
      } else {
        const errorData = await response.json();
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: errorData.message || 'An unknown error occurred.',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'Could not submit your application. Please check your connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    router.push('/');
  }

  return (
    <>
      <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
                <UserPlus className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-headline">Join Our Community</CardTitle>
            </div>
            <CardDescription>
              Become a part of the world's largest eye care network. Fill out the short form below to apply for membership. All applications are reviewed by our team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Dr. Jane Doe" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country of Practice / Study</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {countries.map(c => <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Primary Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your professional role" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {profileTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormDescription>What is your main role in the eye care community?</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Application...</> : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

       <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
             <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Application Submitted!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you for your interest in joining Focus Links. Your application has been submitted for review. You will be notified via email once your membership is approved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessDialog}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
