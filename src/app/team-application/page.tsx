
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserPlus, Zap, Linkedin, CheckCircle, Award, Handshake, Globe, Briefcase, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { logFormSubmission } from '@/lib/activity-logger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const roles = [
  "Regional Leader / Ambassador",
  "National Head",
  "Event Coordinator",
  "Job Board Curator",
  "Clinical Content Creator",
  "Community Manager",
  "Tech Contributor (Web/AI/App)",
  "Social Media Manager",
  "Graphic Designer"
];

const roleDetails = [
  {
    role: "Regional Leader / Ambassador",
    mission: "Serve as the primary representative for Focus Links in a major global region (e.g., Southeast Asia, Africa, Europe).",
    responsibilities: [
      "Establish strategic partnerships with continental or multi-national eye care associations.",
      "Mentor and guide National Heads within the region.",
      "Represent Focus Links at major international conferences.",
      "Provide high-level feedback to the core team on global strategy."
    ],
    benefits: "Gain high-level leadership experience, build a global professional network, and directly shape the international growth of the community."
  },
  {
    role: "National Head",
    mission: "Lead Focus Links' growth, engagement, and operations within a specific country.",
    responsibilities: [
      "Build and manage a national team of volunteers (Event Coordinators, Community Managers, etc.).",
      "Forge relationships with national optometry colleges, hospitals, and associations.",
      "Adapt global campaigns for local relevance and execute country-specific initiatives.",
      "Act as the main point of contact for all members and partners within the country."
    ],
    benefits: "Develop strong leadership and project management skills, become a recognized leader in your country's eye care community, and make a tangible national impact."
  },
  {
    role: "Event Coordinator",
    mission: "Plan and execute engaging online events for our global community.",
    responsibilities: [
      "Organize webinars with industry experts and international quiz competitions like the 'Eye Q Arena'.",
      "Coordinate with speakers and partners on logistics and content.",
      "Promote events across our platforms to maximize participation.",
      "Ensure a seamless, high-quality experience for all attendees."
    ],
    benefits: "Develop expertise in event management, connect with leading professionals and speakers, and play a key role in the platform's most exciting initiatives."
  },
  {
    role: "Job Board Curator",
    mission: "Ensure the Focus Links Job Board is the leading source for high-quality, authentic clinical opportunities.",
    responsibilities: [
      "Source and verify job vacancies primarily from hospitals, clinics, and academic institutions, filtering out retail-only positions.",
      "Maintain relationships with HR departments at leading eye care organizations.",
      "Regularly update the job listings to ensure all information is current and accurate.",
      "Develop strategies to attract premium employers to our platform."
    ],
    benefits: "Gain insight into the eye care job market, build connections with top employers, and directly help peers find meaningful clinical career opportunities."
  },
  {
    role: "Clinical Content Creator",
    mission: "Translate complex clinical knowledge into engaging, accessible content for our community.",
    responsibilities: [
      "Create high-quality case studies for the Case Forum.",
      "Develop educational articles and tutorials for the Academy.",
      "Design challenging and relevant questions for our quiz competitions.",
      "Collaborate with subject matter experts to ensure clinical accuracy."
    ],
    benefits: "Sharpen your own clinical knowledge, build a reputation as an expert in your field, and contribute to the professional development of thousands of peers."
  },
  {
    role: "Tech Contributor (Web/AI/App)",
    mission: "Help build and improve the digital infrastructure of the Focus Links platform.",
    responsibilities: [
      "Contribute code for new features on our Next.js and React-based web application.",
      "Assist in developing and integrating AI-powered tools (Genkit).",
      "Troubleshoot bugs and optimize platform performance.",
      "Collaborate with a team of developers shaping the future of eye care technology."
    ],
    benefits: "Gain hands-on experience with a modern tech stack (Next.js, React, Genkit), build a portfolio of impactful work, and solve real-world problems for a global community."
  }
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
      <div className="bg-brand-bg">
        <header className="hero">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Let's Build the Future of Eye Care, Together</h1>
            <p className="text-base opacity-90 max-w-xl mx-auto">
              We are a passionate, non-commercial team building the world's largest digital community for eye care. This is a volunteer opportunity to make a global impact.
            </p>
        </header>

        <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 space-y-16">
           <section className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center">Why Join Us?</h2>
            <p className="text-lg text-slate-600 mt-2 text-center">This is more than a volunteer role. It's a chance to lead, innovate, and grow.</p>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <Card className="p-6 text-center rounded-3xl shadow-soft">
                    <Award className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Gain Real Experience</h3>
                    <p className="text-muted-foreground mt-1">Lead projects, manage teams, and build a portfolio that showcases your skills to a global audience.</p>
                </Card>
                 <Card className="p-6 text-center rounded-3xl shadow-soft">
                    <Handshake className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Expand Your Network</h3>
                    <p className="text-muted-foreground mt-1">Connect with industry leaders, educators, and peers from around the world.</p>
                </Card>
                 <Card className="p-6 text-center rounded-3xl shadow-soft">
                    <Globe className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Make a Global Impact</h3>
                    <p className="text-muted-foreground mt-1">Your contributions will directly help thousands of students and professionals advance their careers.</p>
                </Card>
                 <Card className="p-6 text-center rounded-3xl shadow-soft">
                    <BadgeCheck className="h-10 w-10 text-primary mb-3 mx-auto" />
                    <h3 className="text-xl font-bold">Official Recognition</h3>
                    <p className="text-muted-foreground mt-1">Receive a verified badge on your profile and a virtual ID card to share your professional role.</p>
                </Card>
            </div>
          </section>

          <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Open Volunteer Roles</h2>
              <Accordion type="single" collapsible className="w-full">
                  {roleDetails.map(detail => (
                      <AccordionItem key={detail.role} value={detail.role}>
                          <AccordionTrigger className="text-lg font-semibold">{detail.role}</AccordionTrigger>
                          <AccordionContent className="text-base text-slate-600 space-y-4 px-2">
                              <p className="italic">{detail.mission}</p>
                              <div>
                                <h4 className="font-semibold text-slate-700 mb-2">Key Responsibilities:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {detail.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-700 mb-2">What You Gain:</h4>
                                <p>{detail.benefits}</p>
                              </div>
                          </AccordionContent>
                      </AccordionItem>
                  ))}
                   <AccordionItem value="Community & Social Media Roles">
                      <AccordionTrigger className="text-lg font-semibold">Community & Social Media Roles</AccordionTrigger>
                      <AccordionContent className="text-base text-slate-600 space-y-4 px-2">
                          <p className="italic">Foster a vibrant, supportive, and rapidly growing community across all our digital platforms.</p>
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-2">Key Responsibilities:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Manage and grow our presence on LinkedIn, Instagram, and other social channels (as a <strong>Social Media Manager</strong>).</li>
                                <li>Create engaging visual content, infographics, and event branding (as a <strong>Graphic Designer</strong>).</li>
                                <li>Moderate discussions, welcome new members, and facilitate connections within our community forums (as a <strong>Community Manager</strong>).</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-700 mb-2">What You Gain:</h4>
                            <p>Develop valuable digital marketing and community management skills, express your creativity on a global stage, and be the voice of a leading brand in the eye care industry.</p>
                          </div>
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </section>

          <section id="application-form" className="max-w-3xl mx-auto pb-16">
            <Card className="rounded-3xl shadow-soft">
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
                      <Input id="name" {...register('name')} className="rounded-xl"/>
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" {...register('email')} className="rounded-xl"/>
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                    <Input id="linkedin" {...register('linkedin')} className="rounded-xl"/>
                    {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="role">Preferred Role</Label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id="role" className="rounded-xl">
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
                    <Textarea id="skills" {...register('skills')} placeholder="Tell us what you're great at (e.g., content writing, social media, React, clinical research)." className="rounded-2xl"/>
                    {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="contribution">How would you like to contribute?</Label>
                    <Textarea id="contribution" {...register('contribution')} placeholder="Share your ideas and how you envision yourself helping our mission." className="rounded-2xl"/>
                    {errors.contribution && <p className="text-sm text-destructive">{errors.contribution.message}</p>}
                  </div>
                  <Button type="submit" className="w-full rounded-full-btn" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}
