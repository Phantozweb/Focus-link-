

'use client';

import { users } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, GraduationCap, Languages, Linkedin, Mail, MapPin, Stethoscope, Lightbulb, Globe, Hospital, Glasses, Factory, UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProfileSummary } from '@/components/profile-summary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Education, WorkExperience, UserProfile } from '@/types';
import Image from 'next/image';

function ExperienceItem({ experience }: { experience: WorkExperience }) {
  return (
    <div className="flex gap-4">
      <div className="bg-muted rounded-md p-3 flex-shrink-0 h-14 w-14 flex items-center justify-center">
        <Briefcase className="h-7 w-7 text-muted-foreground" />
      </div>
      <div>
        <h4 className="font-semibold text-lg">{experience.title}</h4>
        <p className="text-muted-foreground">{experience.company}</p>
        <p className="text-sm text-muted-foreground">{experience.startDate} - {experience.endDate}</p>
        <p className="text-foreground/80 mt-2">{experience.description}</p>
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
  const router = useRouter();

  const totalExperienceYears = user.workExperience.reduce((acc, exp) => {
    // A simple calculation, assuming start and end are just years for now
    const start = new Date(exp.startDate);
    const end = exp.endDate.toLowerCase() === 'present' ? new Date() : new Date(exp.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return acc;
    const diff = end.getTime() - start.getTime();
    return acc + diff / (1000 * 60 * 60 * 24 * 365.25);
  }, 0);

  return (
     <main className="flex flex-1 justify-center py-8 bg-gray-50">
        <Button variant="outline" onClick={() => router.back()} className="absolute top-20 left-4 sm:left-6 lg:left-8 z-10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      <div className="flex w-full max-w-4xl flex-col gap-8 px-4">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col p-6 sm:flex-row sm:items-start sm:gap-6">
             <Avatar className="relative size-32 shrink-0 rounded-full border-4 border-white shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-6xl">{user.name.charAt(0)}</AvatarFallback>
             </Avatar>
            <div className="mt-4 flex-grow sm:mt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {user.name}
                    {user.verified && <CheckCircle2 className="h-6 w-6 text-primary" />}
                  </h1>
                  <p className="text-md text-gray-600">{user.experience} at {user.education[0]?.school}</p>
                  <p className="text-sm text-gray-500">{user.location}</p>
                </div>
                <div className="flex gap-2">
                  {user.links.email && (
                    <Button asChild>
                      <a href={`mailto:${user.links.email}`}>
                        <Mail className="mr-2" /> Email
                      </a>
                    </Button>
                  )}
                  {user.links.linkedin && (
                    <Button asChild variant="outline">
                      <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">
                         <Linkedin className="mr-2" /> LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <p className="mt-4 text-base text-gray-700">{user.bio}</p>
            </div>
          </div>
        </div>

        {user.workExperience.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Experience</h2>
               <span className="text-sm font-medium text-gray-600">Total Experience: {Math.floor(totalExperienceYears)} years</span>
            </div>
            <div className="mt-6 space-y-6">
              {user.workExperience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100">
                     <Briefcase className="h-7 w-7 text-gray-500" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {user.education.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Education</h2>
            <div className="mt-6 space-y-6">
              {user.education.map((edu, index) => (
                 <div key={index} className="flex items-start gap-4">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100">
                        <GraduationCap className="h-7 w-7 text-gray-500" />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-base font-semibold text-gray-800">{edu.school}</h3>
                        <p className="text-sm text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
                        <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {user.skills.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                        <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">{skill}</span>
                    ))}
                </div>
            </div>
        )}

        {user.languages.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Languages</h2>
                <div className="mt-4 space-y-2">
                    {user.languages.map((lang, index) => (
                        <p key={index} className="text-base text-gray-800">{lang}</p>
                    ))}
                </div>
            </div>
        )}

        {user.interests.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Areas of Interest</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                     {user.interests.map((interest, index) => (
                        <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">{interest}</span>
                    ))}
                </div>
            </div>
        )}
      </div>
    </main>
  )
}

function AssociationProfile({ user }: { user: UserProfile }) {
  const router = useRouter();
  
  return (
    <div className="flex-1 bg-gray-50">
        <Button variant="outline" onClick={() => router.back()} className="absolute top-20 left-4 sm:left-6 lg:left-8 z-10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      <div className="relative h-48 md:h-64 w-full">
        <Image src={`https://picsum.photos/seed/${user.id}b/1200/300`} alt={`${user.name} banner`} fill objectFit="cover" data-ai-hint="office building"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-5xl mx-auto -mt-16">
          <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md">
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Image src={user.avatarUrl} alt={`${user.name} logo`} width={128} height={128} className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md shadow-sm border-4 border-white" data-ai-hint="logo building" />
                <div className="flex flex-col gap-1 pt-2">
                  <h1 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight tracking-tight flex items-center gap-2">
                    {user.name}
                    {user.verified && <CheckCircle2 className="h-7 w-7 text-primary" />}
                  </h1>
                  <p className="text-gray-500">{user.experience}</p>
                  <p className="text-gray-500">{user.skills.length * 1000 + 2345} members</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button asChild>
                  <a href="#">Join</a>
                </Button>
                {user.links.linkedin && (
                <Button asChild variant="secondary">
                   <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">Website</a>
                </Button>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div className="flex border-b border-gray-200">
                <a className="flex flex-col items-center justify-center border-b-2 border-b-primary text-primary px-4 py-3" href="#">
                  <p className="text-sm font-semibold">About</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 hover:text-slate-800 hover:border-gray-300 px-4 py-3" href="#">
                  <p className="text-sm font-semibold">Events</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-2 border-b-transparent text-gray-500 hover:text-slate-800 hover:border-gray-300 px-4 py-3" href="#">
                  <p className="text-sm font-semibold">News</p>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="md:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-slate-800 text-xl font-bold leading-tight tracking-tight mb-4">About Us</h2>
                    <div className="space-y-6 text-gray-600 text-base leading-relaxed">
                      <p>{user.bio}</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-slate-800 text-xl font-bold leading-tight tracking-tight mb-4">Headlines</h2>
                    <div className="space-y-6">
                      <div className="rounded-lg border border-gray-200 p-4">
                        <p className="text-slate-800 text-base font-bold leading-tight">New Partnership with Global Eye Health Initiative</p>
                        <p className="text-gray-500 text-sm mt-1">We are thrilled to announce our new partnership to expand access to eye care in underserved communities worldwide.</p>
                        <a className="text-primary hover:underline text-sm font-semibold mt-2 inline-block" href="#">Read More</a>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-4">
                        <p className="text-slate-800 text-base font-bold leading-tight">Annual Conference Registration Now Open</p>
                        <p className="text-gray-500 text-sm mt-1">Join us for our biggest event of the year, featuring renowned speakers and cutting-edge workshops.</p>
                        <a className="text-primary hover:underline text-sm font-semibold mt-2 inline-block" href="#">Register Now</a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-slate-800 text-xl font-bold leading-tight tracking-tight mb-4">Upcoming Events & Webinars</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-6">
                        <Image className="w-40 h-24 bg-center bg-no-repeat aspect-video bg-cover rounded-md flex-shrink-0" src="https://picsum.photos/seed/event1/300/200" alt="Webinar thumbnail" width={160} height={96} data-ai-hint="presentation person" />
                        <div className="flex-grow">
                          <p className="text-xs text-gray-500 uppercase font-semibold">Webinar</p>
                          <p className="text-slate-800 text-base font-bold leading-tight mt-1">Advanced Techniques in Pediatric Optometry</p>
                          <p className="text-gray-500 text-sm mt-1">Join us for an in-depth webinar on the latest advancements in pediatric optometry.</p>
                          <Button variant="secondary" size="sm" className="mt-3">Register Now</Button>
                        </div>
                      </div>
                      <div className="flex items-start gap-6">
                        <Image className="w-40 h-24 bg-center bg-no-repeat aspect-video bg-cover rounded-md flex-shrink-0" src="https://picsum.photos/seed/event2/300/200" alt="Conference thumbnail" width={160} height={96} data-ai-hint="conference room" />
                        <div className="flex-grow">
                          <p className="text-xs text-gray-500 uppercase font-semibold">Conference</p>
                          <p className="text-slate-800 text-base font-bold leading-tight mt-1">Annual Optometry Conference</p>
                          <p className="text-gray-500 text-sm mt-1">Attend our annual conference featuring keynote speakers, workshops, and networking.</p>
                          <Button variant="secondary" size="sm" className="mt-3">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 space-y-8">
                <div>
                  <h3 className="text-slate-800 text-lg font-bold leading-tight tracking-tight mb-4">Contact Information</h3>
                  <div className="space-y-4 text-sm">
                    {user.links.email && (<div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">{user.links.email}</span>
                    </div>)}
                     <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{user.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-800 text-lg font-bold leading-tight tracking-tight mb-4">Social Media</h3>
                  <div className="flex flex-wrap gap-3">
                    <a className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" href="#"><svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg></a>
                    <a className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" href="#"><svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg></a>
                    <a className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" href="#"><svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg></a>
                    <a className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" href="#"><svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function ProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  if (user.type === 'Student') {
    return <StudentProfile user={user} />;
  }
  
  if (user.type === 'Association') {
    return <AssociationProfile user={user} />;
  }

  const isIndividual = ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(user.type);
  const isOrg = ['College', 'Hospital', 'Optical', 'Industry'].includes(user.type);

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
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card className="overflow-hidden">
          <div className="relative h-48 w-full bg-primary/10">
            {/* Placeholder for a banner image */}
          </div>
          <CardContent className="p-0">
            <div className="p-6 sm:p-8 -mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
                <Avatar className="h-36 w-36 border-4 border-background bg-background shadow-lg mx-auto sm:mx-0">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={isOrg ? "logo building" : "portrait person"} />
                  <AvatarFallback className="text-6xl">{user.name.charAt(0)}</AvatarFallback>
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
                  <p className="text-foreground/80 whitespace-pre-wrap">{user.bio}</p>
                  <Separator className="my-6" />
                  <ProfileSummary bio={user.bio} />
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

    
