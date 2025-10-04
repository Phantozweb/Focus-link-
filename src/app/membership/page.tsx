
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useDynamicFields } from '@/hooks/use-dynamic-fields';
import { PlusCircle, Trash2, UserPlus, Loader2, CheckCircle } from 'lucide-react';
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
import type { UserProfile } from '@/types';


const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  type: z.enum(profileTypes, { required_error: 'You must select a profile type.' }),
  location: z.string().min(3, { message: 'Please enter your location.' }),
  experience: z.string().min(10, { message: 'Headline must be at least 10 characters.' }),
  bio: z.string().min(50, { message: 'Bio must be at least 50 characters.' }).max(1000),
  linkedin: z.string().url().optional().or(z.literal('')),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  skills: z.array(z.object({ value: z.string().min(1, { message: 'Skill cannot be empty.' }) })).min(1, { message: 'At least one skill is required.' }),
  interests: z.array(z.object({ value: z.string().min(1, { message: 'Interest cannot be empty.' }) })).min(1, { message: 'At least one interest is required.' }),
  languages: z.array(z.object({ value: z.string().min(1, { message: 'Language cannot be empty.' }) })).optional(),
  workExperience: z.array(z.object({
    title: z.string().min(2),
    company: z.string().min(2),
    startDate: z.string().min(4),
    endDate: z.string(),
    description: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    school: z.string().min(3),
    degree: z.string().min(3),
    fieldOfStudy: z.string().min(3),
    startYear: z.string().min(4),
    endYear: z.string().min(4),
  })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DynamicFieldArray = ({ form, name, label, placeholder }: { form: any, name: 'skills' | 'interests' | 'languages', label: string, placeholder: string }) => {
  const { fields, add, remove } = useDynamicFields(form, name);
  return (
    <div className="space-y-4">
      <FormLabel>{label}</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <FormField
            control={form.control}
            name={`${name}.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => add()}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );
};


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
      location: '',
      experience: '',
      bio: '',
      linkedin: '',
      avatarUrl: '',
      skills: [{ value: '' }],
      interests: [{ value: '' }],
      languages: [],
      workExperience: [],
      education: [],
    },
  });
  
  const { fields: workFields, add: addWork, remove: removeWork } = useDynamicFields(form, 'workExperience');
  const { fields: eduFields, add: addEdu, remove: removeEdu } = useDynamicFields(form, 'education');

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    // Transform data to match UserProfile structure
    const profileData: Omit<UserProfile, 'id' | 'verified'> = {
        name: data.name,
        type: data.type,
        experience: data.experience,
        location: data.location,
        bio: data.bio,
        links: {
            email: data.email,
            linkedin: data.linkedin || undefined,
        },
        avatarUrl: data.avatarUrl || 'https://i.ibb.co/jG6L8p3/default-avatar.png',
        skills: data.skills.map(s => s.value),
        interests: data.interests.map(i => i.value),
        languages: data.languages?.map(l => l.value) ?? [],
        workExperience: data.workExperience ?? [],
        education: data.education?.map(e => ({...e, university: ''})) ?? [],
    };
    
    const finalPayload = {
      ...profileData,
      id: String(Date.now()),
      verified: false,
    }


    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
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
        description: 'Could not submit your profile. Please check your connection.',
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
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-2">
                <UserPlus className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-headline">Join Our Community</CardTitle>
            </div>
            <CardDescription className="text-center">Fill out the form below to create your profile and get listed in the Focus Links directory. Submissions are reviewed by our team.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Basic Information */}
                <div className="space-y-6">
                   <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>I am a...</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a profile type" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {profileTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl><Input placeholder="City, Country" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                   </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Professional Summary</h3>
                    <FormField control={form.control} name="experience" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Headline</FormLabel>
                            <FormControl><Input placeholder="e.g., 5+ years in pediatric optometry" {...field} /></FormControl>
                            <FormDescription>A short, impactful tagline for your profile.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="bio" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Biography</FormLabel>
                            <FormControl><Textarea placeholder="Tell us about your background, mission, and what makes you unique." rows={5} {...field} /></FormControl>
                            <FormDescription>Write a professional bio in the first person.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                
                 {/* Links & Avatar */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Links & Avatar</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="linkedin" render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn or Website URL</FormLabel>
                                <FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="avatarUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Avatar URL</FormLabel>
                                <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                                <FormDescription>Optional. A direct link to your profile picture.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}/>
                     </div>
                </div>
                
                {/* Skills & Interests */}
                 <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Skills & Interests</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <DynamicFieldArray form={form} name="skills" label="Skills" placeholder="e.g., Contact Lenses" />
                       <DynamicFieldArray form={form} name="interests" label="Interests" placeholder="e.g., Clinical Research" />
                     </div>
                 </div>

                {/* Experience */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Work Experience (Optional)</h3>
                     {workFields.map((field, index) => (
                        <Card key={field.id} className="p-4 bg-slate-50 relative">
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeWork(index)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name={`workExperience.${index}.title`} render={({ field }) => (
                                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (
                                    <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name={`workExperience.${index}.startDate`} render={({ field }) => (
                                    <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="e.g., Jan 2020" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name={`workExperience.${index}.endDate`} render={({ field }) => (
                                    <FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="e.g., Present" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="md:col-span-2">
                                     <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => (
                                        <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={2} {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addWork()}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                </div>
                
                {/* Education */}
                 <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Education (Optional)</h3>
                     {eduFields.map((field, index) => (
                        <Card key={field.id} className="p-4 bg-slate-50 relative">
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => (
                                    <FormItem><FormLabel>School/University</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (
                                    <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name={`education.${index}.fieldOfStudy`} render={({ field }) => (
                                    <FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name={`education.${index}.startYear`} render={({ field }) => (
                                    <FormItem><FormLabel>Start Year</FormLabel><FormControl><Input placeholder="e.g., 2018" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name={`education.${index}.endYear`} render={({ field }) => (
                                    <FormItem><FormLabel>End Year</FormLabel><FormControl><Input placeholder="e.g., 2022" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addEdu()}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                </div>

                {/* Languages */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Languages (Optional)</h3>
                     <DynamicFieldArray form={form} name="languages" label="Languages" placeholder="e.g., English (Professional)" />
                 </div>


                <Separator className="my-8" />

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit for Review'}
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
    </>
  );
}
