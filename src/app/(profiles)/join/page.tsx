
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDynamicFields } from '@/hooks/use-dynamic-fields';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  type: z.enum(['Student', 'Optometrist', 'Academic', 'Researcher'], {
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
  languages: z.string().min(2, {
    message: 'Please list at least one language.',
  }),
  bio: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
  email: z.string().email().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  workExperience: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),
});

export default function JoinPage() {
  const { toast } = useToast();
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
    },
  });

  const { fields: workFields, add: addWork, remove: removeWork } = useDynamicFields(form, 'workExperience');
  const { fields: eduFields, add: addEdu, remove: removeEdu } = useDynamicFields(form, 'education');
  const { fields: skillFields, add: addSkill, remove: removeSkill } = useDynamicFields(form, 'skills');


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Form Submitted!',
      description: 'Your profile has been submitted for review.',
    });
    form.reset();
  }

  const avatarRef = form.register("avatar");

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-3xl">
            Create Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium leading-6 text-foreground font-headline">Basic Information</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Dr. Jane Doe" {...field} />
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
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" {...avatarRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I am a...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Student" />
                            </FormControl>
                            <FormLabel className="font-normal">Student</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Optometrist" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Optometrist
                            </FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Academic" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Academic / Lecturer
                            </FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Researcher" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Researcher
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
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
                      <FormLabel>Experience Level (Headline)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 3rd Year Student or 10+ years in Pediatric Optometry"
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
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself, your passions, and your goals."
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

              <Separator />

              {/* Work Experience Section */}
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

              {/* Education Section */}
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

               <Separator />
              
               <div className="space-y-6">
                <h3 className="text-lg font-medium leading-6 text-foreground font-headline">Skills & Links</h3>
                
                {/* Skills Section */}
                <div className="space-y-4">
                  <FormLabel>Skills</FormLabel>
                   <FormDescription>
                    List your key skills. Click the button to add more.
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
                              <Input placeholder="e.g. Pediatric Optometry" {...field} />
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
                    <PlusCircle className="mr-2" /> Add Skill
                  </Button>
                </div>


                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Community Health, Clinical Research"
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

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="e.g. jane.doe@example.com"
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
                      <FormLabel>LinkedIn Profile URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. https://linkedin.com/in/janedoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               </div>


              <Button type="submit" size="lg" className="w-full">
                Submit for Review
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
