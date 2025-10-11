
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
import { UserPlus, Loader2, PartyPopper, CheckCircle, Globe, BookOpen, Handshake, Award } from 'lucide-react';
import { countries } from '@/lib/countries';
import type { UserProfile } from '@/types';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  country: z.string({ required_error: 'Please select a country.'}),
  role: z.enum(profileTypes, { required_error: 'You must select a professional role.' }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions to continue.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const membershipPerks = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Official Member Status",
    description: "Receive a verified badge on your profile (once approved) to stand out as a trusted member of the community."
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Priority Academy Access",
    description: "Get early notifications and priority registration for exclusive webinars and workshops from industry leaders."
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "Exclusive Networking",
    description: "Gain access to member-only channels and events to connect with peers, mentors, and collaborators."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Community Recognition",
    description: "Get opportunities to be featured in our newsletters and on our platform, showcasing your expertise to a global audience."
  }
];


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
      terms: false,
    },
  });
  
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
        const response = await fetch('/api/submit-membership', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResult = await response.json().catch(() => ({ message: 'An unexpected API error occurred.' }));
            throw new Error(errorResult.message || `API responded with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.exists) {
             toast({
                variant: 'destructive',
                title: 'Already Registered',
                description: 'You registered earlier with this email. Please check your inbox for details.',
            });
        } else if (result.result === 'success') {
            setShowSuccessDialog(true);
        } else {
           throw new Error(result.message || 'An unknown error occurred during submission.');
        }

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: `Could not submit your application: ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    form.reset();
    router.push('/');
  }

  return (
    <>
     <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Become an Official Member</h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                    Join for free to get verified, access exclusive perks, and become a recognized part of the world's largest eye care community.
                </p>
                 <Button size="lg" className="mt-8" onClick={() => document.getElementById('membership-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Apply for Membership
                </Button>
            </div>
        </section>

        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-800">Exclusive Membership Perks</h2>
                    <p className="mt-2 text-lg text-slate-600">Go beyond the directory. Unlock benefits available only to official members.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {membershipPerks.map((perk, index) => (
                        <div key={index} className="text-center p-6 bg-card rounded-lg shadow-sm border">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                                {perk.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{perk.title}</h3>
                            <p className="text-slate-600">{perk.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      
        <div id="membership-form" className="container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
            <Card>
            <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline mt-4">Membership Application</CardTitle>
                <CardDescription className="mt-1 text-base">
                Fill out the details below to apply. Your submission will be reviewed by our team.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Dr. Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {countries.map((c) => (
                                <SelectItem key={c.code} value={c.name}>
                                    {c.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {profileTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    
                    <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-muted/50">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            Accept Terms & Conditions
                            </FormLabel>
                            <FormDescription>
                            By submitting, you agree to our{' '}
                            <Link href="/terms" className="underline hover:text-primary" target="_blank">
                                Terms of Service
                            </Link>
                            .
                            </FormDescription>
                            <FormMessage />
                        </div>
                        </FormItem>
                    )}
                    />


                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Application'}
                    </Button>
                </form>
                </Form>
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
            <AlertDialogTitle className="text-center">Application Received!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you for applying! Your membership application has been sent and will be added to our records shortly after review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessDialog}>Explore the Community</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
