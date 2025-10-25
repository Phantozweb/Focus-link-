
'use client';

import { allUsers } from '@/lib/data/index';
import { notFound, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, GraduationCap, Languages, Linkedin, Mail, MapPin, Stethoscope, Lightbulb, Globe, Hospital, Glasses, Factory, UserPlus, ArrowLeft, CheckCircle2, User, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Education, WorkExperience, UserProfile } from '@/types';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// This function can't be used in a client component, but it's a good
// pattern for server components. For this client component, we'll
// set the metadata dynamically in the component itself.
// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const user = users.find((u) => u.id === params.id);
//   if (!user) {
//     return {
//       title: 'Profile Not Found',
//       description: 'The profile you are looking for does not exist.',
//     };
//   }

//   return {
//     title: `${user.name} | ${user.type} on Focus Links`,
//     description: user.bio.substring(0, 160),
//     openGraph: {
//       title: `${user.name} | Focus Links`,
//       description: user.bio.substring(0, 160),
//       images: [
//         {
//           url: user.avatarUrl,
//           width: 800,
//           height: 600,
//           alt: user.name,
//         },
//       ],
//       type: 'profile',
//       profile: {
//         firstName: user.name.split(' ')[0],
//         lastName: user.name.split(' ').slice(1).join(' '),
//         username: user.id,
//       },
//     },
//   };
// }

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
                    <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" data-ai-hint={"portrait person"} />
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
                      <Button asChild variant="outline" size="icon">
                        <a href={`mailto:${user.links.email}`} aria-label="Email">
                          <Mail className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {user.links.linkedin && (
                      <Button asChild variant="outline" size="icon">
                        <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={"LinkedIn"}>
                          <Linkedin className="h-5 w-5" />
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
                                <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" data-ai-hint={"logo building"} />
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
                              <a href="#">Join</a>
                            </Button>
                            {user.links.linkedin && (
                            <Button asChild variant="secondary" className="flex-1 md:flex-initial">
                              <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">Website</a>
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

  const generateMailto = () => {
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6 bg-card">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
                        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md shadow-lg border-4 border-card -mt-20 md:-mt-24 relative z-10 shrink-0">
                          {user.avatarUrl ? (
                              <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" data-ai-hint={"logo building"} />
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
                                  <Button className="flex-1 md:flex-initial">Apply Now</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Application Inquiry</DialogTitle>
                                        <DialogDescription>
                                            Enter your details below to send an application inquiry to {user.name}. Your email client will open with a pre-filled message.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">Name</Label>
                                            <Input id="name" value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right">Email</Label>
                                            <Input id="email" type="email" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="phone" className="text-right">Phone</Label>
                                            <Input id="phone" type="tel" value={inquiryPhone} onChange={(e) => setInquiryPhone(e.target.value)} className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button asChild>
                                            <a href={generateMailto()}>Send Inquiry</a>
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {user.links.linkedin && (
                              <Button asChild variant="secondary" className="flex-1 md:flex-initial">
                                <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">Website</a>
                              </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="border-b">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            <a className="border-primary text-primary whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" href="#">About</a>
                            <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" href="#">Programs</a>
                            <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium" href="#">Gallery</a>
                        </nav>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">About Us</h2>
                            <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: user.bio.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </section>
                        {user.gallery && user.gallery.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold font-headline mb-4 text-slate-800">Gallery</h2>
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
                            </section>
                        )}
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
                        <Card>
                            <CardHeader><CardTitle className="text-lg">Focus Areas</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {user.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="text-lg">Placement Partners</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {user.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
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


export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const user = allUsers.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  const isIndividual = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(user.type);
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);

  // Dynamically create schema
  let schema: any;
  if (isIndividual) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": user.name,
      "jobTitle": user.type,
      "description": user.bio.replace(/<[^>]*>/g, ''),
      "image": user.avatarUrl,
      "url": `https://focuslinks.pro/profile/${user.id}`,
      "sameAs": user.links.linkedin,
      "email": user.links.email,
      "knowsAbout": user.skills,
      "alumniOf": user.education.map(edu => ({
        "@type": "EducationalOrganization",
        "name": edu.school
      }))
    };
  } else if (isOrg) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": user.name,
      "description": user.bio.replace(/<[^>]*>/g, ''),
      "image": user.avatarUrl,
      "url": `https://focuslinks.pro/profile/${user.id}`,
      "sameAs": user.links.linkedin,
      "email": user.links.email,
      "location": {
        "@type": "Place",
        "address": user.location
      }
    };
  }

  // Set metadata dynamically
  if (typeof window !== 'undefined') {
      document.title = `${user.name} - ${user.type} | Focus Links`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', user.bio.substring(0, 160));
  }


  if (user.type === 'Student') {
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> <StudentProfile user={user} /></>;
  }
  
  if (user.type === 'Association') {
    return <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><AssociationProfile user={user} /></>;
  }

  if (user.type === 'College') {
    return <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><CollegeProfile user={user} /></>;
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
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
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
                      <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" data-ai-hint={isOrg ? "logo building" : "portrait person"} />
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
                        <Button asChild variant="outline" size="icon">
                          <a href={`mailto:${user.links.email}`} aria-label="Email">
                            <Mail className="h-5 w-5" />
                          </a>
                        </Button>
                      )}
                      {user.links.linkedin && (
                        <Button asChild variant="outline" size="icon">
                          <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={isIndividual ? "LinkedIn" : "Website"}>
                            {isIndividual ? <Linkedin className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
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
    </>
  );
}
