
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Check, Loader2, UserPlus, Info, Copy, MessageCircle, Mail, Phone, Globe, Briefcase, MapPin, AlertCircle } from 'lucide-react';
import { countries } from '@/lib/countries';
import type { UserProfile } from '@/types';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  whatsapp: z.string().startsWith('+', { message: "Number must include country code (e.g., +91...)"}).min(8, 'Please enter a valid WhatsApp number'),
  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  role: z.enum(profileTypes, { required_error: 'Please select your role' }),
  country: z.string().min(2, 'Please select your country'),
  location: z.string().min(2, 'City and State/Region are required'),
});

type FormData = z.infer<typeof formSchema>;

export function MembershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionData, setSubmissionData] = useState<FormData | null>(null);
  const [membershipId, setMembershipId] = useState<string | null>(null);
  const [errorDialog, setErrorDialog] = useState<{open: boolean; message: string;}>({open: false, message: ''});
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const getCountryCode = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    return country ? country.code : 'XX';
  };
  
  const generateMembershipId = (countryCode: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${countryCode}${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const countryCode = getCountryCode(data.country);
    const newId = generateMembershipId(countryCode);
    
    let fullLinkedinUrl = data.linkedin;
    if (fullLinkedinUrl && !fullLinkedinUrl.startsWith('http')) {
        fullLinkedinUrl = `https://${fullLinkedinUrl}`;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      membershipId: newId,
      ...data,
      linkedin: fullLinkedinUrl,
    };
    
    try {
      const response = await fetch('/api/submit-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message || 'An unknown error occurred during submission.');
      }
      
      if (result.exists) {
        toast({
            variant: "destructive",
            title: "Email Already Registered",
            description: "An application with this email address already exists. Please use a different email or contact support.",
        });
      } else if (result.result === 'success') {
        setMembershipId(newId);
        setSubmissionData(data);
        toast({
          title: 'Application Submitted!',
          description: "Your details have been recorded. Welcome to Focus Links!",
        });
      } else {
        // This case handles unexpected but successful responses from the API
        throw new Error(result.message || 'Received an unexpected response from the server.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
      console.error("Submission error:", errorMessage);
      setErrorDialog({open: true, message: errorMessage});
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const copyToClipboard = () => {
    if (membershipId) {
      navigator.clipboard.writeText(membershipId);
      toast({
        title: 'Copied!',
        description: 'Your membership ID has been copied to the clipboard.',
      });
    }
  };

  if (submissionData && membershipId) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Welcome, {submissionData.name}!</CardTitle>
          <CardDescription className="mt-1 text-base">
            Your application has been submitted successfully. Here is a summary of your details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-blue-50 border-blue-200">
             <Info className="h-4 w-4" />
            <AlertTitle className="font-bold">Your Official Membership ID</AlertTitle>
            <AlertDescription>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-xl font-bold font-mono text-blue-800 tracking-wider break-all">{membershipId}</p>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="bg-white ml-4">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                    </Button>
                </div>
                 <p className="text-xs text-blue-700 mt-2">
                    **Important:** Please save this ID. You will need it for all future events and interactions.
                 </p>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Submission Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center"><Mail className="h-4 w-4 mr-3 text-muted-foreground" /> {submissionData.email}</div>
              <div className="flex items-center"><Phone className="h-4 w-4 mr-3 text-muted-foreground" /> {submissionData.whatsapp}</div>
              {submissionData.linkedin && <div className="flex items-center"><Globe className="h-4 w-4 mr-3 text-muted-foreground" /> {submissionData.linkedin}</div>}
              <div className="flex items-center"><Briefcase className="h-4 w-4 mr-3 text-muted-foreground" /> {submissionData.role}</div>
              <div className="flex items-center"><MapPin className="h-4 w-4 mr-3 text-muted-foreground" /> {submissionData.location}, {submissionData.country}</div>
            </CardContent>
          </Card>
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>What's Next?</AlertTitle>
            <AlertDescription>
              While we verify your application (48-72 hours), join our WhatsApp community for instant updates and networking!
            </AlertDescription>
          </Alert>

          <Button size="lg" className="w-full" asChild>
            <a href="https://chat.whatsapp.com/E5O5Y5Z2Y3Z2Z5Y5Z2Y3Z2" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp Community
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    <AlertDialog open={errorDialog.open} onOpenChange={(open) => setErrorDialog({...errorDialog, open })}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2"><AlertCircle className="text-destructive"/> Submission Error</AlertDialogTitle>
          <AlertDialogDescription>
            {errorDialog.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <UserPlus className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-headline mt-4">Membership Application</CardTitle>
        <CardDescription className="mt-1 text-base">
          Fill out the form below to create your official profile and join the Focus Links directory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name or Organization Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" type="tel" {...register('whatsapp')} placeholder="+919876543210" />
                {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile URL (or Website for Orgs)</Label>
            <Input id="linkedin" {...register('linkedin')} placeholder="linkedin.com/in/your-profile" />
            {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="role">Primary Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role..." />
                    </SelectTrigger>
                    <SelectContent>
                      {profileTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select your country..." />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => <SelectItem key={country.code} value={country.name}>{country.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">City & State/Province</Label>
            <Input id="location" {...register('location')} placeholder="e.g., San Francisco, California" />
            {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
          </div>
          <div className='pt-4'>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </>
  );
}
