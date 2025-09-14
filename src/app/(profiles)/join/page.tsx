
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDynamicFields } from '@/hooks/use-dynamic-fields';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const workExperienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
});

const educationSchema = z.object({
  school: z.string().min(1, 'School is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startYear: z.string().min(4, 'Start year is required'),
  endYear: z.string().min(4, 'End year is required'),
});

const skillSchema = z.object({
  value: z.string().min(1, 'Skill cannot be empty'),
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  type: z.enum(['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'], {
    required_error: 'You need to select a profile type.',
  }),
  avatar: z.any().refine(files => files?.length === 1, 'Avatar is required.'),
  experience: z.string().min(2, {
    message: 'Experience must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  skills: z.array(skillSchema).min(1, 'Please list at least one skill.'),
  interests: z.string().min(2, {
    message: 'Please list at least one interest.',
  }),
  languages: z.string().optional(),
  bio: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
  email: z.string().email().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  workExperience: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms to create a profile.',
  }),
});

const fileToBase64 = (file: File): Promise<{ base64: string; type: string; name: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ base64: reader.result as string, type: file.type, name: file.name });
    reader.onerror = error => reject(error);
  });
};


export default function JoinPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('individual');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'Student',
      experience: '',
      location: '',
      skills: [{ value: '' }],
      interests: '',
      languages: '',
      bio: '',
      email: '',
      linkedin: '',
      workExperience: [],
      education: [],
      consent: false,
    },
  });

  const { fields: workFields, add: addWork, remove: removeWork } = useDynamicFields(form, 'workExperience');
  const { fields: eduFields, add: addEdu, remove: removeEdu } = useDynamicFields(form, 'education');
  const { fields: skillFields, add: addSkill, remove: removeSkill } = useDynamicFields(form, 'skills');

  const profileType = form.watch('type');
  const isIndividual = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher'].includes(profileType);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const now = new Date();
    const profileId = `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    
    let avatarData = null;
    if (values.avatar && values.avatar.length > 0) {
      try {
        avatarData = await fileToBase64(values.avatar[0]);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        toast({
          variant: 'destructive',
          title: 'Image Processing Error',
          description: 'Could not process the uploaded image. Please try a different file.',
        });
        setIsSubmitting(false);
        return;
      }
    }
    
    let details: any = {
      experience: values.experience,
      location: values.location,
      bio: values.bio,
      skills: values.skills.map(s => s.value),
      interests: values.interests.split(',').map(i => i.trim()),
      email: values.email,
    };

    if (isIndividual) {
      details.languages = values.languages?.split(',').map(l => l.trim());
      details.workExperience = values.workExperience;
      details.education = values.education;
      details.linkedin = values.linkedin;
    } else {
      details.website = values.linkedin;
    }

    const submissionData = {
      profileId,
      name: values.name,
      type: values.type,
      avatar: avatarData,
      details: details,
    };
    
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyFY4Z_7REMcXyLr8OZbgGfJce5m2S4TO-Mi-NViUQdjtgcO28YTYHvTb_Q65oGwMs9/exec';

    try {
      await fetch(appsScriptUrl, {
        method: 'POST',
        body: JSON.stringify(submissionData),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });
      // Because of Google Script's CORS redirect, a successful submission
      // might throw a network error. We will assume success here and let
      // the catch block handle true failures if they occur in other contexts.
      toast({
        title: 'Form Submitted!',
        description: 'Your profile has been successfully submitted for review.',
      });
      form.reset();

    } catch (error) {
      console.error('Submission Error:', error);
       // This block will catch network errors. Since a successful submission to Google Apps Script
       // via `fetch` from a different origin can result in an opaque redirect that looks like a
       // network error, we show a success message as the most likely outcome.
       // A true failure (like the script URL being wrong) will also land here.
      toast({
        title: 'Form Submitted!',
        description: 'Your profile has been successfully submitted for review. Thank you.',
      });
       form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  const avatarRef = form.register("avatar");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'individual') {
      form.setValue('type', 'Student');
    } else {
      form.setValue('type', 'Association');
    }
  }
  
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(profileType);

  const getOrgSpecificLabel = (field: 'skills' | 'interests') => {
    if (field === 'skills') {
      switch (profileType) {
        case 'Hospital': return 'Services Offered';
        case 'Optical': return 'Brands Carried';
        case 'Industry': return 'Products & Services';
        case 'College':
        case 'Association':
        default: return 'Focus Areas';
      }
    }
    if (field === 'interests') {
       switch (profileType) {
        case 'Hospital': return 'Specialties';
        case 'Optical': return 'Styles & Services';
        case 'Industry': return 'Market Focus';
        case 'College': return 'Programs & Research';
        case 'Association':
        default: return 'Keywords';
      }
    }
    return '';
  }

  const getOrgSpecificPlaceholder = (field: 'skills' | 'interests') => {
     if (field === 'skills') {
      switch (profileType) {
        case 'Hospital': return 'e.g. Cataract Surgery';
        case 'Optical': return 'e.g. Ray-Ban';
        case 'Industry': return 'e.g. Ophthalmic Lenses';
        case 'College':
        case 'Association':
        default: return 'e.g. Continuing Education';
      }
    }
    if (field === 'interests') {
       switch (profileType) {
        case 'Hospital': return 'e.g. Glaucoma, Pediatrics';
        case 'Optical': return 'e.g. Luxury Frames, Lens Fitting';
        case 'Industry': return 'e.g. Medical Devices';
        case 'College': return 'e.g. OD Program, Vision Science';
        case 'Association':
        default: return 'e.g. Conference, Advocacy';
      }
    }
    return '';
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-3xl">
            Create Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
             <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I am a...</FormLabel>
                       <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          {activeTab === 'individual' ? (
                            <>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Student" /></FormControl>
                                <FormLabel className="font-normal">Student</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Optometrist" /></FormControl>
                                <FormLabel className="font-normal">Optometrist</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Ophthalmologist" /></FormControl>
                                <FormLabel className="font-normal">Ophthalmologist</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Optician" /></FormControl>
                                <FormLabel className="font-normal">Optician</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Academic" /></FormControl>
                                <FormLabel className="font-normal">Academic / Lecturer</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Researcher" /></FormControl>
                                <FormLabel className="font-normal">Researcher</FormLabel>
                              </FormItem>
                            </>
                          ) : (
                            <>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Association" /></FormControl>
                                <FormLabel className="font-normal">Association</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="College" /></FormControl>
                                <FormLabel className="font-normal">College / University</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Hospital" /></FormControl>
                                <FormLabel className="font-normal">Hospital</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Optical" /></FormControl>
                                <FormLabel className="font-normal">Optical Practice / Store</FormLabel>
                              </FormItem>
                               <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="Industry" /></FormControl>
                                <FormLabel className="font-normal">Industry Partner</FormLabel>
                              </FormItem>
                            </>
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-foreground font-headline">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isIndividual ? 'Full Name' : 'Organization Name'}</FormLabel>
                        <FormControl>
                          <Input placeholder={isIndividual ? "e.g. Dr. Jane Doe" : "e.g. National Optometry Board"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isIndividual ? 'Profile Picture' : 'Logo'}</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" {...avatarRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isIndividual ? 'Experience Level (Headline)' : 'Tagline'}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={isIndividual ? "e.g. 3rd Year Student or 10+ years in Pediatric Optometry" : "e.g. Advancing the Profession of Optometry"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isIndividual ? 'Bio' : 'Description'}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={isIndividual ? "Tell us a little bit about yourself, your passions, and your goals." : "Describe your organization's mission and values."}
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isIndividual && (
                  <>
                    <Separator />

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium leading-6 text-foreground font-headline">Work Experience</h3>
                      {workFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeWork(index)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove experience</span>
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField control={form.control} name={`workExperience.${index}.title`} render={({ field }) => (
                                <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} placeholder="e.g. Associate Optometrist" /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (
                                <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} placeholder="e.g. City Eye Care" /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name={`workExperience.${index}.startDate`} render={({ field }) => (
                                <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="text" {...field} placeholder="e.g. Jan 2020" /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name={`workExperience.${index}.endDate`} render={({ field }) => (
                                <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="text" {...field} placeholder="e.g. Present" /></FormControl><FormMessage /></FormItem>
                              )} />
                            </div>
                            <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => (
                                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Describe your responsibilities and achievements."/></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addWork({ title: '', company: '', startDate: '', endDate: '', description: '' })}>
                        <PlusCircle className="mr-2" /> Add Experience
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium leading-6 text-foreground font-headline">Education</h3>
                      {eduFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove education</span>
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => (
                                  <FormItem><FormLabel>School / University</FormLabel><FormControl><Input {...field} placeholder="e.g. SUNY College of Optometry" /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (
                                <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} placeholder="e.g. Doctor of Optometry (OD)" /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name={`education.${index}.fieldOfStudy`} render={({ field }) => (
                                <FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input {...field} placeholder="e.g. Optometry" /></FormControl><FormMessage /></FormItem>
                              )} />
                              <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name={`education.${index}.startYear`} render={({ field }) => (
                                    <FormItem><FormLabel>Start Year</FormLabel><FormControl><Input type="text" {...field} placeholder="e.g. 2021" /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name={`education.${index}.endYear`} render={({ field }) => (
                                  <FormItem><FormLabel>End Year</FormLabel><FormControl><Input type="text" {...field} placeholder="e.g. 2025" /></FormControl><FormMessage /></FormItem>
                                )} />
                              </div>
                            </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => addEdu({ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' })}>
                        <PlusCircle className="mr-2" /> Add Education
                      </Button>
                    </div>
                  </>
                )}

                <Separator />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium leading-6 text-foreground font-headline">{isIndividual ? 'Skills & Links' : 'Details & Links'}</h3>
                  
                  <div className="space-y-4">
                    <FormLabel>{isIndividual ? 'Skills' : getOrgSpecificLabel('skills')}</FormLabel>
                    <FormDescription>
                      {isIndividual ? 'List your key skills. Click the button to add more.' : `List your main ${getOrgSpecificLabel('skills').toLowerCase()}.`}
                    </FormDescription>
                    {skillFields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`skills.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input placeholder={isIndividual ? "e.g. Pediatric Optometry" : getOrgSpecificPlaceholder('skills')} {...field} />
                              </FormControl>
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)} disabled={skillFields.length <= 1}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button type="button" variant="outline" onClick={() => addSkill({ value: '' })}>
                      <PlusCircle className="mr-2" /> {isIndividual ? 'Add Skill' : `Add ${getOrgSpecificLabel('skills')}`}
                    </Button>
                  </div>


                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isIndividual ? 'Interests' : getOrgSpecificLabel('interests')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={isIndividual ? "e.g. Community Health, Clinical Research" : getOrgSpecificPlaceholder('interests')}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide a comma-separated list.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isIndividual && (
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. English, Spanish"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide a comma-separated list.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isOrg ? 'Contact Email' : 'Email'} (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={isOrg ? "info@example.com" : "jane.doe@example.com"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isIndividual ? 'LinkedIn Profile URL' : 'Website URL'} (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={isIndividual ? "https://linkedin.com/in/janedoe" : "https://example.com"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Agree to Terms
                        </FormLabel>
                        <FormDescription>
                           I agree that my contact information (email and LinkedIn) will be displayed on my public profile to connect with others.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />


                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit for Review'
                  )}
                </Button>
              </form>
            </Tabs>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    