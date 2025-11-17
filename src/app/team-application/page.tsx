
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserPlus, Zap, Linkedin, CheckCircle, Award, Handshake } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { logFormSubmission } from '@/lib/activity-logger';

const roles = [
  "Regional Leader / Ambassador",
  "State Head (India)",
  "Event Coordinator",
  "Clinical Content Creator",
  "Community Manager",
  "Tech Contributor (Web/AI/App)",
  "Social Media Manager",
  "Graphic Designer"
];

const formSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  linkedin: z.string().url('Please enter a valid LinkedIn profile URL.'),
  role: z.string().min(1, 'Please select a role.'),
  skills: z.string().min(10, 'Please tell us about your skills.'),
  contribution: z.string().min(20, 'Please tell us how you want to contribute.'),
});

type FormData = z.infer<typeof formSchema>;

export default function TeamApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-team-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }
      
      logFormSubmission(`🤝 **New Team Application Submitted**
*   **Name:** ${data.name}
*   **Role:** ${data.role}`);
      
      setIsSubmitted(true);
      toast({
        title: 'Application Sent!',
        description: "Thank you for your interest! We've received your application and will be in touch soon.",
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
    if (isSubmitted) {
    return (
      <div className="bg-muted/40 min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-headline mt-4">Thank You for Applying!</CardTitle>
            <CardDescription className="text-lg">
              We are thrilled to see your interest in joining our mission. Your application has been successfully submitted. Our team will review it and get back to you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">In the meantime, stay connected with us on our social platforms!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Let's Build the Future of Eye Care, Together</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              We are a passionate, non-commercial team building the world's largest digital community for eye care. This is a volunteer opportunity to make a global impact.
            </p>
          </div>
        </section>

        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
           <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center">Why Join Us?</h2>
            <p className="text-lg text-slate-600 mt-2 text-center">This is more than a volunteer role. It's a chance to lead, innovate, and grow.</p>
             <div className="grid md:grid-cols-3 gap-8 mt-8">
                <Card className="p-6 text-center">
                    <Award className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Gain Real Experience</h3>
                    <p className="text-muted-foreground mt-1">Lead projects, manage teams, and build a portfolio that showcases your skills to a global audience.</p>
                </Card>
                 <Card className="p-6 text-center">
                    <Handshake className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Expand Your Network</h3>
                    <p className="text-muted-foreground mt-1">Connect with industry leaders, educators, and peers from around the world. Build relationships that last a lifetime.</p>
                </Card>
                 <Card className="p-6 text-center">
                    <Zap className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Make a Global Impact</h3>
                    <p className="text-muted-foreground mt-1">Your contributions will directly help thousands of students and professionals connect, learn, and advance their careers.</p>
                </Card>
            </div>
          </section>

          <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Open Volunteer Roles</h2>
              <div className="space-y-4">
                  <Card>
                      <CardHeader>
                          <CardTitle>Regional Leader / Ambassador</CardTitle>
                          <CardDescription>Represent Focus Links in your country or region. You will be the key point of contact for local members, institutions, and partners, helping to grow our community presence and organize local initiatives.</CardDescription>
                      </CardHeader>
                  </Card>
                   <Card>
                      <CardHeader>
                          <CardTitle>State Head (India)</CardTitle>
                          <CardDescription>Lead community growth and engagement within your state in India. Your role is to build relationships with colleges, mentor student leaders, and coordinate state-level events and campaigns.</CardDescription>
                      </CardHeader>
                  </Card>
                   <Card>
                      <CardHeader>
                          <CardTitle>Event Coordinator</CardTitle>
                          <CardDescription>Plan and execute our online events, from webinars to international quiz competitions. You'll work with speakers, manage logistics, and ensure a seamless experience for all participants.</CardDescription>
                      </CardHeader>
                  </Card>
                   <Card>
                      <CardHeader>
                          <CardTitle>Clinical Content Creator</CardTitle>
                          <CardDescription>Are you passionate about sharing clinical knowledge? Create engaging case studies, educational articles, and quiz questions for our forum and academy to help others learn.</CardDescription>
                      </CardHeader>
                  </Card>
              </div>
          </section>

          <section id="application-form" className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Volunteer Application</CardTitle>
                <CardDescription>
                  This is a volunteer, non-commercial team. We are driven by passion, not profit. Fill out the form below to join us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" {...register('name')} />
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" {...register('email')} />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                    <Input id="linkedin" {...register('linkedin')} />
                    {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="role">Preferred Role</Label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role you're interested in..." />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="skills">Your Skills & Experience</Label>
                    <Textarea id="skills" {...register('skills')} placeholder="Tell us what you're great at (e.g., content writing, social media, React, clinical research)." />
                    {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="contribution">How would you like to contribute?</Label>
                    <Textarea id="contribution" {...register('contribution')} placeholder="Share your ideas and how you envision yourself helping our mission." />
                    {errors.contribution && <p className="text-sm text-destructive">{errors.contribution.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
