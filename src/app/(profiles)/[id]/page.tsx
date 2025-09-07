import { users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, GraduationCap, Languages, Linkedin, Mail, MapPin, Stethoscope, Lightbulb, Globe, Hospital, Glasses, Factory } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProfileSummary } from '@/components/profile-summary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Education, WorkExperience } from '@/types';

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


export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }
  
  const isIndividual = ['Student', 'Optometrist', 'Academic', 'Researcher'].includes(user.type);
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);

  const getOrgIcon = () => {
    switch (user.type) {
        case 'Hospital': return <Hospital className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
        case 'Optical': return <Glasses className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
        case 'Association': return <Globe className="h-5 w-5 text-primary mt-1 flex-shrink-0" />;
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
        case 'Association':
        case 'College': 
        default: return 'Focus Areas';
      }
    }
    if (type === 'interests') {
       switch (user.type) {
        case 'Hospital': return 'Specialties';
        case 'Optical': return 'Styles';
        case 'Industry': return 'Market Focus';
        case 'Association':
        case 'College': 
        default: return 'Keywords';
      }
    }
    return '';
  }


  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
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
                  <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
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
