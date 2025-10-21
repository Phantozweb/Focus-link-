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
import { UserPlus, Loader2, PartyPopper, Trash2, PlusCircle, Sparkles } from 'lucide-react';
import { countries } from '@/lib/countries';
import type { UserProfile } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useDynamicFields } from '@/hooks/use-dynamic-fields';
import { generateBio } from '@/ai/flows/generate-bio';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  type: z.enum(profileTypes, { required_error: 'You must select a professional role.' }),
  location: z.string({ required_error: 'Please select a country.'}),
  avatarUrl: z.string().url({ message: "Please enter a valid URL for your profile picture."}),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  linkedin: z.string().url({ message: 'Please enter a valid LinkedIn/Website URL.' }).optional(),
  experience: z.string().min(3, "Please enter a headline or title."),
  bio: z.string().min(10, "Please provide a short bio."),
  workExperience: z.array(z.object({
    title: z.string().min(2, "Job title is required."),
    company: z.string().min(2, "Company name is required."),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    school: z.string().min(2, "School name is required."),
    degree: z.string().min(2, "Degree is required."),
    fieldOfStudy: z.string().optional(),
    startYear: z.string().optional(),
    endYear: z.string().optional(),
  })).optional(),
   skills: z.array(z.object({ value: z.string().min(1, "Skill cannot be empty.") })).optional(),
  interests: z.array(z.object({ value: z.string().min(1, "Interest cannot be empty.") })).optional(),
  languages: z.array(z.object({ value: z.string().min(1, "Language cannot be empty.") })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      avatarUrl: '',
      email: '',
      linkedin: '',
      experience: '',
      bio: '',
      workExperience: [],
      education: [],
      skills: [],
      interests: [],
      languages: [],
    },
     mode: 'onChange'
  });

  const { fields: workFields, add: addWork, remove: removeWork } = useDynamicFields(form, 'workExperience');
  const { fields: eduFields, add: addEdu, remove: removeEdu } = useDynamicFields(form, 'education');
  const { fields: skillFields, add: addSkill, remove: removeSkill } = useDynamicFields(form, 'skills');
  const { fields: interestFields, add: addInterest, remove: removeInterest } = useDynamicFields(form, 'interests');
  const { fields: languageFields, add: addLanguage, remove: removeLanguage } = useDynamicFields(form, 'languages');

  
  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    const { name, type, skills, interests, education, workExperience } = form.getValues();
    
    if (!name || !type) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in your name and role before generating a bio.",
        });
        setIsGeneratingBio(false);
        return;
    }
    
    const keyPoints = [
        ...skills?.map(s => s.value) || [],
        ...interests?.map(i => i.value) || [],
        ...education?.map(e => `${e.degree} from ${e.school}`) || [],
        ...workExperience?.map(w => `${w.title} at ${w.company}`) || [],
    ].join(', ');
    
    try {
        const result = await generateBio({
            name: name,
            role: type,
            points: keyPoints,
        });
        form.setValue('bio', result.bio);
        toast({
            title: "Bio Generated!",
            description: "Your new AI-powered bio has been added to the form.",
        });
    } catch (error) {
        console.error('Failed to generate bio:', error);
        toast({
            variant: 'destructive',
            title: 'Bio Generation Failed',
            description: 'Could not generate an AI bio at this time.',
        });
    } finally {
        setIsGeneratingBio(false);
    }
  };

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    const submissionId = `focuslinks-${Date.now()}`;
    setSubmissionId(submissionId);
    
    const submissionData = {
      ...data,
      submissionId,
      submissionDate: new Date().toISOString(),
      status: 'In Review',
      skills: data.skills?.map(s => s.value),
      interests: data.interests?.map(i => i.value),
      languages: data.languages?.map(l => l.value),
    };
    
    try {
        const response = await fetch('/api/submit-ai-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
            const errorResult = await response.json().catch(() => ({ message: 'An unexpected API error occurred.' }));
            throw new Error(errorResult.message || `API responded with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.result === 'success') {
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
        description: `Could not submit your profile: ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    form.reset();
    router.push('/directory');
  }

  return (
    <>
     <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-slate-700 to-slate-900 text-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Create Your Profile</h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                    Build a comprehensive profile to showcase your expertise and connect with the global eye care community.
                </p>
            </div>
        </section>

        <div id="profile-builder-form" className="container mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
              {/* Basic Information */}
              <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>This is the first thing people will see. Make it count.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField name="name" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Full Name / Organization Name</FormLabel><FormControl><Input placeholder="e.g., Dr. Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="type" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Primary Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger></FormControl>
                            <SelectContent>{profileTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
                          </Select><FormMessage />
                        </FormItem>
                    )}/>
                  </div>
                   <FormField name="experience" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Headline</FormLabel><FormControl><Input placeholder="e.g., Pediatric Optometrist & Myopia Control Specialist" {...field} /></FormControl><FormDescription>Your professional title or a short, impactful summary.</FormDescription><FormMessage /></FormItem>
                    )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField name="location" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your country" /></SelectTrigger></FormControl>
                            <SelectContent>{countries.map((c) => (<SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>))}</SelectContent>
                          </Select><FormMessage />
                      </FormItem>
                    )}/>
                    <FormField name="avatarUrl" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Profile Picture URL</FormLabel><FormControl><Input placeholder="https://example.com/your-image.png" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField name="email" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField name="linkedin" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>LinkedIn / Website URL (Optional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                  </div>
                </CardContent>
              </Card>
              
               {/* About Section */}
              <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>About</CardTitle>
                            <CardDescription>Tell the community about yourself. What are you passionate about?</CardDescription>
                        </div>
                         <Button type="button" variant="outline" size="sm" onClick={handleGenerateBio} disabled={isGeneratingBio}>
                            {isGeneratingBio ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate with AI
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <FormField name="bio" control={form.control} render={({ field }) => (
                      <FormItem><FormControl><Textarea placeholder="Share your story, your goals, and what drives you..." {...field} rows={6} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
              </Card>
              
              {/* Work Experience */}
              <Card>
                <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {workFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeWork(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name={`workExperience.${index}.title`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField name={`workExperience.${index}.company`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name={`workExperience.${index}.startDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Start Date (Optional)</FormLabel><FormControl><Input placeholder="e.g., Jan 2020" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField name={`workExperience.${index}.endDate`} control={form.control} render={({ field }) => (<FormItem><FormLabel>End Date (Optional)</FormLabel><FormControl><Input placeholder="e.g., Present" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                      <FormField name={`workExperience.${index}.description`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Description (Optional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => addWork()}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                    <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      <FormField name={`education.${index}.school`} control={form.control} render={({ field }) => (<FormItem><FormLabel>School / University</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name={`education.${index}.degree`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField name={`education.${index}.fieldOfStudy`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Field of Study (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name={`education.${index}.startYear`} control={form.control} render={({ field }) => (<FormItem><FormLabel>Start Year (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField name={`education.${index}.endYear`} control={form.control} render={({ field }) => (<FormItem><FormLabel>End Year (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => addEdu()}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
                </CardContent>
              </Card>
              
               {/* Skills & Interests */}
              <Card>
                <CardHeader><CardTitle>Expertise</CardTitle></CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <FormLabel className="text-lg">Skills</FormLabel>
                    <FormDescription>List up to 10 key skills.</FormDescription>
                    <div className="space-y-4 mt-4">
                      {skillFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                          <FormField name={`skills.${index}.value`} control={form.control} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input {...field} placeholder={`Skill ${index + 1}`} /></FormControl><FormMessage /></FormItem>)} />
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addSkill()}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
                    </div>
                  </div>
                  <Separator />
                   <div>
                    <FormLabel className="text-lg">Interests</FormLabel>
                     <FormDescription>What topics are you passionate about?</FormDescription>
                    <div className="space-y-4 mt-4">
                      {interestFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                          <FormField name={`interests.${index}.value`} control={form.control} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input {...field} placeholder={`Interest ${index + 1}`} /></FormControl><FormMessage /></FormItem>)} />
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeInterest(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addInterest()}><PlusCircle className="mr-2 h-4 w-4" /> Add Interest</Button>
                    </div>
                  </div>
                   <Separator />
                   <div>
                    <FormLabel className="text-lg">Languages</FormLabel>
                     <FormDescription>What languages do you speak?</FormDescription>
                    <div className="space-y-4 mt-4">
                      {languageFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                          <FormField name={`languages.${index}.value`} control={form.control} render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input {...field} placeholder={`Language ${index + 1}`} /></FormControl><FormMessage /></FormItem>)} />
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeLanguage(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addLanguage()}><PlusCircle className="mr-2 h-4 w-4" /> Add Language</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                  <Button type="submit" size="lg" className="w-full max-w-xs" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Profile for Review'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Your profile will be reviewed by our team before being published.</p>
              </div>

            </form>
          </Form>
        </div>
    </div>
       <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
             <div className="flex justify-center">
              <PartyPopper className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-center">Profile Submitted!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you! Your profile has been sent for review. Please save your submission ID for future reference.
              <div className="font-mono text-sm bg-muted rounded-md p-2 mt-4">
                  {submissionId}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessDialog}>Explore the Directory</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
