
'use client';

import { notFound, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, GraduationCap, Languages, Linkedin, Mail, MapPin, Stethoscope, Lightbulb, Globe, Hospital, Glasses, Factory, UserPlus, ArrowLeft, CheckCircle2, User, Phone, Check, Star, Users, ShieldCheck, BatteryCharging, Weight, Puzzle, Award, PlayCircle, Package, Server, Wrench } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Education, WorkExperience, UserProfile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from '@/components/ui/textarea';


function ExperienceItem({ experience }: { experience: WorkExperience }) {
  return (
    <div className="flex gap-4">
      <div className="bg-muted rounded-md p-3 flex-shrink-0 h-14 w-14 flex items-center justify-center">
        <Briefcase className="h-7 w-7 text-muted-foreground" />
      </div>
      <div>
         <div className="flex items-baseline gap-x-2">
            <h4 className="font-semibold text-lg">{experience.title}</h4>
            {experience.duration && <span className="text-sm text-muted-foreground">({experience.duration})</span>}
        </div>
        <p className="text-muted-foreground">{experience.company}</p>
        <p className="text-sm text-muted-foreground">{experience.startDate} - {experience.endDate}</p>
        <div className="text-foreground/80 mt-2" dangerouslySetInnerHTML={{ __html: experience.description.replace(/\n/g, '<br />') }} />
      </div>
    </div>
  )
}

function EducationItem({ education }: { education: Education }) {
  return (
    <div className="flex gap-4">
       <div className="bg-muted rounded-md p-3 flex-shrink-0 h-14 w-14 flex items-center justify-center">
        <GraduationCap className="h-7 w-7 text-muted-foreground" />
      </div>
      <div>
        <h4 className="font-semibold text-lg">{education.school}</h4>
        <p className="text-muted-foreground">{education.degree}, {education.fieldOfStudy}</p>
        <p className="text-sm text-muted-foreground">{education.startYear} - {education.endYear}</p>
      </div>
    </div>
  )
}

function generateMailto(email?: string, name?: string, recipientName?: string) {
    if (!email) return '#';
    const subject = `Connecting from Focus Links`;
    const body = `Hi ${recipientName || 'there'},

I came across your profile on Focus Links and would like to connect.

Best regards,
${name || ''}
`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};


function StudentProfile({ user }: { user: UserProfile }) {

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/directory/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
        <Card className="overflow-hidden">
          <div className="relative h-48 w-full bg-primary/10">
            {/* Placeholder for a banner image */}
          </div>
          <CardContent className="p-0">
            <div className="p-6 sm:p-8 -mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
                <Avatar className="h-36 w-36 border-4 border-background bg-background shadow-lg mx-auto sm:mx-0">
                   {user.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt={`${user.name} - ${user.type}`} data-ai-hint={"portrait person"} />
                   ) : null}
                  <AvatarFallback className="text-6xl">
                    {user.avatarUrl ? (user.name?.charAt(0) ?? 'U') : <User className="h-20 w-20" />}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left pt-4 sm:pt-0 flex-1">
                  <h1 className="text-3xl font-bold font-headline flex items-center justify-center sm:justify-start gap-2">
                    {user.name}
                    {user.verified && <CheckCircle2 className="h-7 w-7 text-primary" />}
                  </h1>
                  <p className="text-lg text-muted-foreground">{user.experience}</p>
                   <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    {user.links.email && (
                      <Button asChild variant="outline">
                        <a href={generateMailto(user.links.email, '', user.name)} aria-label={`Email ${user.name}`}>
                          <Mail className="mr-2 h-4 w-4" /> Connect via Email
                        </a>
                      </Button>
                    )}
                    {user.links.linkedin && (
                      <Button asChild variant="outline">
                        <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${user.name}'s LinkedIn profile`}>
                          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8 pt-0">
              {/* Left Column / Details */}
              <div className="lg:col-span-1 space-y-6">
                <section>
                  <h2 className="text-xl font-bold font-headline mb-4">Details</h2>
                  <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Briefcase className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold">Role</h3>
                          <p className="text-muted-foreground">{user.type}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold">Location</h3>
                          <p className="text-muted-foreground">{user.location}</p>
                        </div>
                      </div>
                      {user.languages.length > 0 && (
                        <div className="flex items-start gap-4">
                          <Languages className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold">Languages</h3>
                            <p className="text-muted-foreground">{user.languages.join(', ')}</p>
                          </div>
                        </div>
                      )}
                  </div>
                </section>
              </div>

              {/* Right Column / Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold font-headline mb-4">About</h2>
                  <div className="text-foreground/80 whitespace-pre-wrap space-y-4" dangerouslySetInnerHTML={{ __html: user.bio.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </section>
                
                {user.workExperience.length > 0 && (
                   <section>
                    <h2 className="text-xl font-bold font-headline mb-4">Experience</h2>
                    <div className="space-y-6">
                      {user.workExperience.map((exp, index) => <ExperienceItem key={index} experience={exp} />)}
                    </div>
                  </section>
                )}
                
                {user.education.length > 0 && (
                   <section>
                    <h2 className="text-xl font-bold font-headline mb-4">Education</h2>
                    <div className="space-y-6">
                      {user.education.map((edu, index) => <EducationItem key={index} education={edu} />)}
                    </div>
                  </section>
                )}
              
                <section>
                  <h2 className="text-xl font-bold font-headline mb-4">Skills & Interests</h2>
                   <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-accent" /> Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map(skill => <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">{skill}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Stethoscope className="h-5 w-5 text-accent" /> Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map(interest => <Badge key={interest} variant="outline" className="text-sm py-1 px-3">{interest}</Badge>)}
                      </div>
                    </div>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AssociationProfile({ user }: { user: UserProfile }) {
  
  return (
    <div className="bg-muted/40">
        <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
            <Button variant="outline" asChild className="mb-4">
              <Link href="/directory/associations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Card>
                <div className="relative h-48 md:h-64 w-full">
                    <Image src={`https://picsum.photos/seed/${user.id}b/1200/300`} alt={`${user.name} banner`} fill style={{objectFit: 'cover'}} data-ai-hint="office building"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
                        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md shadow-lg border-4 border-card -mt-20 md:-mt-24 relative z-10 shrink-0">
                            {user.avatarUrl ? (
                                <AvatarImage src={user.avatarUrl} alt={`${user.name} logo`} data-ai-hint={"logo building"} />
                            ) : null}
                            <AvatarFallback className="text-6xl rounded-md">
                                {user.avatarUrl ? (user.name?.charAt(0) ?? 'U') : <Building className="h-16 w-16" />}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow pt-2">
                            <h1 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight tracking-tight flex items-center gap-2">
                                {user.name}
                                {user.verified && <CheckCircle2 className="h-7 w-7 text-primary" />}
                            </h1>
                            <p className="text-muted-foreground mt-1 text-base">{user.experience}</p>
                            <p className="text-muted-foreground text-sm">{user.skills.length * 1000 + 2345} members</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 self-start md:self-end w-full md:w-auto">
                            <Button asChild className="flex-1 md:flex-initial">
                              <a href={generateMailto(user.links.email, '', user.name)}>
                                <Mail className="mr-2 h-4 w-4" /> Connect via Email
                              </a>
                            </Button>
                            {user.links.linkedin && (
                            <Button asChild variant="secondary" className="flex-1 md:flex-initial">
                              <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">
                                <Globe className="mr-2 h-4 w-4" /> Website
                              </a>
                            </Button>
                            )}
                        </div>
                    </div>
                </div>
                 <div className="p-6 pt-0">
                    <div className="border-b">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            <a className="border-primary text-primary whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" href="#">About</a>
                            <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" href="#">Events</a>
                            <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" href="#">News</a>
                        </nav>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">About Us</h2>
                                <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: user.bio.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </section>
                            <section>
                                <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">Headlines</h2>
                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-bold">New Partnership with Global Eye Health Initiative</p>
                                            <p className="text-sm text-muted-foreground mt-1">We are thrilled to announce our new partnership to expand access to eye care in underserved communities worldwide.</p>
                                            <Button variant="link" asChild className="p-0 mt-2"><a href="#">Read More</a></Button>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-4">
                                            <p className="font-bold">Annual Conference Registration Now Open</p>
                                            <p className="text-sm text-muted-foreground mt-1">Join us for our biggest event of the year, featuring renowned speakers and cutting-edge workshops.</p>
                                            <Button variant="link" asChild className="p-0 mt-2"><a href="#">Register Now</a></Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                        </div>
                        <div className="md:col-span-1 space-y-6">
                             <Card>
                                <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                {user.links.email && (<div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 break-all">{user.links.email}</span>
                                </div>)}
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{user.location}</span>
                                </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                 </div>
            </Card>
        </div>
    </div>
  );
}

function CollegeProfile({ user }: { user: UserProfile }) {
  const bannerImage = user.gallery && user.gallery.length > 0 ? user.gallery[0] : `https://picsum.photos/seed/${user.id}b/1200/300`;
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');

  const generateInquiryMailto = () => {
    const subject = `Inquiry from Focus Links Website: Application for ${user.name}`;
    const body = `
Hello ${user.name},

I found your institution on Focus Links and would like to inquire about applications. Please find my details below:

**Full Name:** ${inquiryName}
**Email Address:** ${inquiryEmail}
**Contact Number:** ${inquiryPhone}

Thank you.

---
*Sent via Focus Links - The Global Eye Care Community*
    `;
    return `mailto:${user.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  return (
    <div className="bg-muted/40">
        <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
            <Button variant="outline" asChild className="mb-4">
            <Link href="/directory/colleges">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Link>
            </Button>
            <Card className="overflow-hidden">
                <div className="relative h-48 md:h-64 w-full">
                    <Image src={bannerImage} alt={`${user.name} banner`} fill style={{objectFit: 'cover'}} data-ai-hint="college campus"/>
                </div>
                <div className="p-6 bg-card">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
                        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md shadow-lg border-4 border-card relative z-10 shrink-0">
                          {user.avatarUrl ? (
                              <AvatarImage src={user.avatarUrl} alt={`${user.name} logo`} data-ai-hint={"logo building"} />
                          ) : null}
                          <AvatarFallback className="text-6xl rounded-md">
                              {user.avatarUrl ? (user.name?.charAt(0) ?? 'U') : <Building className="h-16 w-16" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow pt-2">
                            <h1 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight tracking-tight flex items-center gap-2">
                                {user.name}
                                {user.verified && <CheckCircle2 className="h-7 w-7 text-primary" />}
                            </h1>
                            <p className="text-muted-foreground mt-1 text-base">{user.experience}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 self-start md:self-end w-full md:w-auto">
                            <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="flex-1 md:flex-initial">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Inquire via Email
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Application Inquiry</DialogTitle>
                                        <DialogDescription>
                                            Enter your details below to send an application inquiry to {user.name}. Your email client will open with a pre-filled message.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input id="phone" type="tel" value={inquiryPhone} onChange={(e) => setInquiryPhone(e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button asChild>
                                            <a href={generateInquiryMailto()}>Send Inquiry</a>
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {user.links.linkedin && (
                              <Button asChild variant="secondary" className="flex-1 md:flex-initial">
                                <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">
                                <Globe className="mr-2 h-4 w-4" />
                                Website</a>
                              </Button>
                            )}
                        </div>
                    </div>
                </div>
                 <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="programs">Programs</TabsTrigger>
                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>
                    <TabsContent value="about">
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-8">
                                <section>
                                    <h2 className="text-xl md:text-2xl font-bold font-headline mb-4 text-slate-800">About Us</h2>
                                    <div className="prose-lg max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: user.bio.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </section>
                            </div>
                            <div className="md:col-span-1 space-y-6">
                                <Card>
                                    <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
                                    <CardContent className="space-y-4 text-sm">
                                    {user.links.email && (<div className="flex items-start gap-3">
                                        <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 break-all">{user.links.email}</span>
                                    </div>)}
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600">{user.location}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600">96559 07744</span>
                                    </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="programs">
                       <div className="p-6 md:p-8 space-y-8">
                            <Card>
                                <CardHeader><CardTitle className="text-lg md:text-xl">Focus Areas</CardTitle></CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {user.skills.map(skill => <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>)}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg md:text-xl">Placement Partners</CardTitle></CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {user.interests.map(interest => <Badge key={interest} variant="outline" className="text-base py-1 px-3">{interest}</Badge>)}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="gallery">
                        {user.gallery && user.gallery.length > 0 ? (
                            <div className="p-6 md:p-8">
                                <Carousel opts={{ loop: true }}>
                                    <CarouselContent>
                                    {user.gallery.map((imgUrl, index) => (
                                        <CarouselItem key={index}>
                                            <div className="aspect-video relative rounded-lg overflow-hidden">
                                                <Image src={imgUrl} alt={`${user.name} gallery image ${index + 1}`} layout="fill" objectFit="cover" />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                                </Carousel>
                            </div>
                        ) : <p className="p-6 text-center text-muted-foreground">No gallery images available.</p>}
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    </div>
  );
}

function InquiryDialog({ triggerText, title, description, user }: { triggerText: string, title: string, description: string, user: UserProfile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const generateInquiryMailto = () => {
    const subject = `Focus Links Inquiry: ${title} for ${user.name}`;
    const body = `
Hello ${user.name},

I found your profile on Focus Links and would like to make an inquiry.

**My Details:**
**Name:** ${name}
**Email:** ${email}

**Message:**
${message}

Thank you.
---
*Sent via Focus Links - The Global Eye Care Community*
    `;
    return `mailto:${user.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
     <Dialog>
        <DialogTrigger asChild>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900">
                {triggerText}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="inquiry-name">Name</Label>
                        <Input id="inquiry-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="inquiry-email">Email</Label>
                        <Input id="inquiry-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="inquiry-message">Message</Label>
                    <Textarea id="inquiry-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." />
                </div>
            </div>
            <DialogFooter>
                <Button asChild>
                    <a href={generateInquiryMailto()}>Send Inquiry</a>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}

function OrderDialog({ user }: { user: UserProfile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [units, setUnits] = useState(1);

  const generateOrderMailto = () => {
    const subject = `Order Request from Focus Links: DrishtiKit Complete`;
    const body = `
Hello DrishtiKit Team,

I would like to place an order for the DrishtiKit Complete system, as seen on Focus Links.

**Order Details:**
**Contact Name:** ${name}
**Organization:** ${organization}
**Email:** ${email}
**Country:** ${country}
**Number of Units:** ${units}

Please provide a quote and further instructions to complete this order.

Thank you.
---
*Sent via Focus Links - The Global Eye Care Community*
    `;
    return `mailto:${user.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog>
        <DialogTrigger asChild>
             <Button size="lg" className="w-full mt-4 bg-white text-primary hover:bg-slate-100">
                Order DrishtiKit Now
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Order DrishtiKit</DialogTitle>
                <DialogDescription>
                    Fill out your details below to request an order. We will respond with a quote and payment details. Bulk discounts are available.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="order-name">Your Name</Label>
                        <Input id="order-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order-email">Your Email</Label>
                        <Input id="order-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="order-org">Organization / Hospital</Label>
                    <Input id="order-org" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="order-country">Country</Label>
                        <Input id="order-country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order-units">Number of Units</Label>
                        <Input id="order-units" type="number" min="1" value={units} onChange={(e) => setUnits(parseInt(e.target.value, 10))} />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button asChild>
                    <a href={generateOrderMailto()}>Request Order</a>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}


function DrishtiKitProfile({ user }: { user: UserProfile }) {
    const stats = [
      { value: "50+", label: "Healthcare Organizations" },
      { value: "15,000+", label: "Vision Screenings Completed" },
      { value: "10+", label: "Countries Reached" },
      { value: "95%", label: "Clinician Satisfaction Rate" },
    ];

    const mobileAppFeatures = [
        { title: "Patient Registration", description: "Complete patient data collection.", icon: <Users className="w-6 h-6 text-primary"/> },
        { title: "Patient Management", description: "Organize screening campaigns.", icon: <Briefcase className="w-6 h-6 text-primary"/> },
        { title: "Health Records", description: "Detailed vision test results.", icon: <Stethoscope className="w-6 h-6 text-primary"/> },
        { title: "Secure Login", description: "Multi-user access control.", icon: <ShieldCheck className="w-6 h-6 text-primary"/> },
    ];

    const whyChooseFeatures = [
        { title: "Portable & Lightweight", description: "Weighs only 2kg, fits in a briefcase.", icon: <Weight className="w-8 h-8 text-primary"/> },
        { title: "Battery Powered", description: "8+ hours continuous operation.", icon: <BatteryCharging className="w-8 h-8 text-primary"/> },
        { title: "Easy to Use", description: "Minimal training required.", icon: <Puzzle className="w-8 h-8 text-primary"/> },
        { title: "Cost Effective", description: "90% lower cost than traditional setups.", icon: <Star className="w-8 h-8 text-primary"/> },
    ];

    const appScreenshots = [
        "https://www.drishtikit.com/app-screenshots/app_screenshot_1.png",
        "https://www.drishtikit.com/app-screenshots/app_screenshot_2.png",
        "https://www.drishtikit.com/app-screenshots/app_screenshot_3.png",
        "https://www.drishtikit.com/app-screenshots/app_screenshot_4.png",
        "https://www.drishtikit.com/app-screenshots/app_screenshot_5.png",
    ];

    const testimonials = [
        { name: "Dr. Priya Sharma", title: "Rural Eye Care Specialist", quote: "DrishtiKit has revolutionized our rural eye camps. We can now screen hundreds of patients in remote villages without electricity or specialized equipment. The accuracy is comparable to our clinic-based equipment." },
        { name: "Dr. Puneet", title: "Founder, Curesee", quote: "The innovative design and portability of DrishtiKit make it a game-changer for eye care accessibility. It's exactly what we need to revolutionize vision screening in India's underserved communities." },
        { name: "Meera Patel", title: "School Health Program Coordinator", quote: "Our school screening program has been able to reach twice as many children since we started using DrishtiKit. It's simple enough for teachers to use effectively for basic screenings." },
        { name: "Optom. Subrata Roy", title: "Director, Eye Vision Prosthetic Lab", quote: "The portability of DrishtiKit has been a game-changer for our disaster response team. We can now include comprehensive vision screening in our medical relief efforts." },
    ]

    const faqs = [
        { value: "q1", question: "What types of eye tests can DrishtiKit perform?", answer: "DrishtiKit can perform comprehensive vision screenings including visual acuity testing, refraction measurement (spherical), color vision assessment, and basic eye health screening. It provides the same level of accuracy as traditional phoropters." },
        { value: "q2", question: "How much training is required to use DrishtiKit?", answer: "Basic operation can be learned in 2-3 hours with our training modules. For comprehensive proficiency, we recommend 1-2 days of training. We provide video tutorials, live sessions, and ongoing support." },
        { value: "q3", question: "What is the battery life and power requirements?", answer: "DrishtiKit operates for 8+ hours on a single charge, making it ideal for full-day screening programs. It can be charged using standard power outlets or portable power banks." },
        { value: "q4", question: "How does the mobile app work offline?", answer: "The DrishtiKit mobile app stores patient data locally when internet isn't available. Once connectivity is restored, all data automatically syncs to the cloud, ensuring uninterrupted operation in remote areas." },
        { value: "q5", question: "What support and warranty is provided?", answer: "We provide 24/7 technical support, comprehensive training materials, and a 2-year warranty on all hardware components. Our team offers ongoing support for implementation and training." },
        { value: "q6", question: "Is the data secure?", answer: "Yes, all patient data is encrypted end-to-end and stored in secure cloud infrastructure. We follow strict data protection protocols to ensure compliance with healthcare regulations." }
    ];

    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="py-20 md:py-28 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DrishtiKit%20Logo%20%284%29-CcbkbLu47u6ODPXvh4zXmjBxnHZpWd.png" alt="DrishtiKit Logo" width={100} height={100} className="mx-auto mb-4" data-ai-hint="logo eye"/>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Revolutionary Eye Care Technology</h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        दृष्टिKit - The world's most portable and affordable eye testing solution. Conduct comprehensive vision screenings anywhere with our revolutionary all-in-one portable phoropter.
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button size="lg" asChild>
                            <a href="https://app.drishtikit.com/" target="_blank" rel="noopener noreferrer">Try Mobile App</a>
                        </Button>
                        <InquiryDialog 
                            triggerText="Request a Demo"
                            title="Request a Product Demo"
                            description="Please provide your details, and our team will contact you to schedule a live demonstration of DrishtiKit."
                            user={user}
                        />
                    </div>
                </div>
            </section>
            
            {/* Stats Section */}
            <section className="bg-muted/50 py-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</h3>
                                <p className="text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-20">
                {/* Mobile App Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Digital Eye Care Companion</h2>
                        <p className="text-lg text-slate-600 mb-8">A powerful companion to the physical vision screening kit, our mobile app enables healthcare workers to conduct professional-level exams and manage patient data—even offline.</p>
                        <div className="grid grid-cols-2 gap-6">
                            {mobileAppFeatures.map(feature => (
                                <div key={feature.title} className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">{feature.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-slate-700">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-8 flex gap-4">
                            <Button asChild><a href="https://app.drishtikit.com/" target="_blank" rel="noopener noreferrer">Access Mobile App</a></Button>
                             <InquiryDialog 
                                triggerText="Request Demo"
                                title="Request a Product Demo"
                                description="Please provide your details, and our team will contact you to schedule a live demonstration of DrishtiKit."
                                user={user}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                         <Carousel className="w-full max-w-xs" plugins={[Carousel.plugins.autoplay({ delay: 2000, stopOnInteraction: true })]}>
                            <CarouselContent>
                                {appScreenshots.map((src, index) => (
                                <CarouselItem key={index}>
                                    <Image src={src} alt={`DrishtiKit App Screenshot ${index + 1}`} width={400} height={800} className="rounded-2xl shadow-2xl" data-ai-hint="mobile phone"/>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </section>

                {/* Product Demo Video */}
                <section className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">See DrishtiKit in Action</h2>
                    <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
                        Watch how DrishtiKit is transforming vision screening in communities around the world with our revolutionary portable eye testing solution.
                    </p>
                    <Card className="mt-8 shadow-2xl overflow-hidden">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe 
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/_AeNy3nE928" 
                                title="DrishtiKit: Bringing Professional Vision Screening to Every Community" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen>
                            </iframe>
                        </div>
                    </Card>
                </section>


                {/* Made in India Section */}
                <section className="bg-slate-50 p-8 md:p-12 rounded-lg border">
                    <div className="grid md:grid-cols-3 gap-8 items-center text-center">
                        <div className="md:col-span-2 md:text-left">
                            <h2 className="text-3xl font-bold text-slate-800">Government Recognized & Proudly Made in India</h2>
                            <p className="text-lg text-slate-600 mt-4">DrishtiKit is a proud Indian innovation, officially recognized by DPIIT under the Startup India initiative. Our indigenous healthcare technology represents the best of Indian innovation in portable eye care solutions.</p>
                        </div>
                        <div className="flex justify-center md:justify-end items-center gap-8">
                            <Image src="https://www.drishtikit.com/dpiit.png" alt="DPIIT Recognized" width={120} height={120} data-ai-hint="logo government"/>
                            <Image src="https://www.drishtikit.com/make_in_india.png" alt="Made in India" width={120} height={120} data-ai-hint="logo india"/>
                        </div>
                    </div>
                </section>
                
                 {/* Why Choose Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Choose DrishtiKit?</h2>
                        <p className="mt-2 text-lg text-slate-600">The ultimate solution for portable, affordable, and accurate vision screening.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseFeatures.map(feature => (
                            <div key={feature.title} className="text-center p-8 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow border">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Ecosystem Section */}
                 <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">The Complete Ecosystem</h2>
                        <p className="mt-2 text-lg text-slate-600">Everything you need for professional eye care, anywhere.</p>
                    </div>
                     <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="p-6 border rounded-lg">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Portable Phoropter</h3>
                                <p className="text-slate-600">Complete refraction testing in a compact, portable device with digital precision. Sphere: -3D to +3D (0.5D intervals).</p>
                            </div>
                            <div className="p-6 border rounded-lg">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">AI-Powered Mobile App</h3>
                                <p className="text-slate-600">Manage patients, get AI summaries, and sync data to the cloud, even when offline.</p>
                            </div>
                            <div className="p-6 border rounded-lg">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Training & Support</h3>
                                <p className="text-slate-600">Comprehensive video modules, live virtual sessions, and 24/7 technical support.</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Image src="https://www.drishtikit.com/phoropter.png" alt="DrishtiKit Phoropter" width={500} height={500} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <Image src="https://www.drishtikit.com/whats_inside.png" alt="What's inside the DrishtiKit" width={1200} height={400} className="w-full rounded-lg shadow-lg" />
                    </div>
                </section>


                {/* Testimonials */}
                <section>
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Trusted by Healthcare Professionals Worldwide</h2>
                         <p className="mt-2 text-lg text-slate-600">Hear from the experts transforming eye care with DrishtiKit.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map(testimonial => (
                            <Card key={testimonial.name} className="p-6">
                                <CardContent className="p-0">
                                    <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="font-bold text-slate-800">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Frequently Asked Questions</h2>
                         <p className="mt-2 text-lg text-slate-600">Everything you need to know about DrishtiKit.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                        {faqs.map(faq => (
                            <AccordionItem value={faq.value} key={faq.value}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-slate-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
                
                 {/* Pricing */}
                <section>
                    <Card className="bg-gradient-to-br from-primary to-cyan-600 text-white shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Simple, Transparent Pricing</CardTitle>
                            <CardDescription className="text-blue-100 text-lg">Get your complete DrishtiKit at an affordable price.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="max-w-md mx-auto bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                                <h4 className="text-2xl font-bold">DrishtiKit Complete</h4>
                                <ul className="text-left space-y-2 my-4">
                                    <li className="flex items-center gap-2"><Check/> Portable Phoropter</li>
                                    <li className="flex items-center gap-2"><Check/> Vision Charts (Distance & Near)</li>
                                    <li className="flex items-center gap-2"><Check/> AI-Powered Mobile App License</li>
                                    <li className="flex items-center gap-2"><Check/> 2-Year Warranty & Support</li>
                                </ul>
                                <OrderDialog user={user} />
                            </div>
                            <p className="mt-4 text-sm text-blue-200">Special bulk discounts available for NGOs, healthcare organizations, and government programs.</p>
                        </CardContent>
                    </Card>
                </section>

                 {/* Final CTA */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Ready to Transform Eye Care in Your Community?</h2>
                    <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">Join the revolution in portable eye testing technology. Contact us today to learn how DrishtiKit can help you bring professional vision screening to underserved populations.</p>
                    <div className="flex justify-center gap-4 mt-8">
                       <InquiryDialog 
                            triggerText="Enquire Now"
                            title="General Inquiry"
                            description="Have a question? Fill out the form and our team will get back to you shortly."
                            user={user}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}


export function ProfileClient({ user }: { user: UserProfile }) {

  const isIndividual = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(user.type);
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);

  if (user.id === '15') {
    return <DrishtiKitProfile user={user} />;
  }

  if (user.type === 'Student') {
    return <StudentProfile user={user} />;
  }
  
  if (user.type === 'Association') {
    return <AssociationProfile user={user} />;
  }

  if (user.type === 'College') {
    return <CollegeProfile user={user} />;
  }


  const getOrgIcon = () => {
    switch (user.type) {
        case 'Hospital': return <Hospital className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
        case 'Optical': return <Glasses className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
        case 'College': return <Building className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
        case 'Industry': return <Factory className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
        default: return <Briefcase className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
    }
  }
  
  const getOrgSpecificTitle = (type: 'skills' | 'interests') => {
     if (type === 'skills') {
      switch (user.type) {
        case 'Hospital': return 'Services';
        case 'Optical': return 'Brands';
        case 'Industry': return 'Products & Services';
        case 'College': 
        default: return 'Focus Areas';
      }
    }
    if (type === 'interests') {
       switch (user.type) {
        case 'Hospital': return 'Specialties';
        case 'Optical': return 'Styles';
        case 'Industry': return 'Market Focus';
        case 'College': 
        default: return 'Keywords';
      }
    }
    return '';
  }


  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/directory">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
          </Link>
        </Button>
        <Card className="overflow-hidden">
          <div className="relative h-48 w-full bg-primary/10">
            {/* Placeholder for a banner image */}
          </div>
          <CardContent className="p-0">
            <div className="p-6 sm:p-8 -mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
                <Avatar className="h-36 w-36 border-4 border-background bg-background shadow-lg mx-auto sm:mx-0">
                  {user.avatarUrl ? (
                    <AvatarImage 
                      src={user.avatarUrl} 
                      alt={`${user.name} - ${user.type}`} 
                      data-ai-hint={isOrg ? "logo building" : "portrait person"} 
                      style={{ objectPosition: 'center 20%' }}
                    />
                  ) : null}
                  <AvatarFallback className="text-6xl">
                    {user.avatarUrl ? (user.name?.charAt(0) ?? 'U') : <User className="h-20 w-20" />}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left pt-4 sm:pt-0 flex-1">
                  <h1 className="text-3xl font-bold font-headline flex items-center justify-center sm:justify-start gap-2">
                    {user.name}
                    {user.verified && <CheckCircle2 className="h-7 w-7 text-primary" />}
                  </h1>
                  <p className="text-lg text-muted-foreground">{user.experience}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    {user.links.email && (
                      <Button asChild variant="outline">
                        <a href={generateMailto(user.links.email, '', user.name)} aria-label={`Email ${user.name}`}>
                          <Mail className="mr-2 h-4 w-4" /> Connect via Email
                        </a>
                      </Button>
                    )}
                    {user.links.linkedin && (
                      <Button asChild variant="outline">
                        <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={isIndividual ? `${user.name}'s LinkedIn profile` : `${user.name} Website`}>
                          {isIndividual ? <Linkedin className="mr-2 h-4 w-4" /> : <Globe className="mr-2 h-4 w-4" />}
                          {isIndividual ? 'LinkedIn' : 'Website'}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8 pt-0">
              {/* Left Column / Details */}
              <div className="lg:col-span-1 space-y-6">
                <section>
                  <h2 className="text-xl font-bold font-headline mb-4">Details</h2>
                  <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        {isOrg ? getOrgIcon() : <Briefcase className="h-5 w-5 text-primary mt-1 flex-shrink-0" />}
                        <div>
                          <h3 className="font-semibold">Role</h3>
                          <p className="text-muted-foreground">{user.type}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold">Location</h3>
                          <p className="text-muted-foreground">{user.location}</p>
                        </div>
                      </div>
                      {isIndividual && user.languages.length > 0 && (
                        <div className="flex items-start gap-4">
                          <Languages className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold">Languages</h3>
                            <p className="text-muted-foreground">{user.languages.join(', ')}</p>                          </div>
                        </div>
                      )}
                  </div>
                </section>
              </div>

              {/* Right Column / Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold font-headline mb-4">About</h2>
                  <div className="text-foreground/80 whitespace-pre-wrap space-y-4" dangerouslySetInnerHTML={{ __html: user.bio.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </section>
                
                {isIndividual && user.workExperience.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold font-headline mb-4">Experience</h2>
                    <div className="space-y-6">
                      {user.workExperience.map((exp, index) => <ExperienceItem key={index} experience={exp} />)}
                    </div>
                  </section>
                )}
                
                {isIndividual && user.education.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold font-headline mb-4">Education</h2>
                    <div className="space-y-6">
                      {user.education.map((edu, index) => <EducationItem key={index} education={edu} />)}
                    </div>
                  </section>
                )}
              
                <section>
                  <h2 className="text-xl font-bold font-headline mb-4">{isIndividual ? 'Skills & Interests' : 'Focus Areas & Keywords'}</h2>
                  <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-accent" /> {isIndividual ? 'Skills' : getOrgSpecificTitle('skills')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map(skill => <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">{skill}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Stethoscope className="h-5 w-5 text-accent" /> {isIndividual ? 'Interests' : getOrgSpecificTitle('interests')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map(interest => <Badge key={interest} variant="outline" className="text-sm py-1 px-3">{interest}</Badge>)}
                      </div>
                    </div>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
