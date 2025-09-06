import { users } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, GraduationCap, Languages, Linkedin, Mail, MapPin, Stethoscope } from 'lucide-react';
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

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <Card>
              <CardContent className="p-6 text-center">
                  <Avatar className="h-32 w-32 border-4 border-background bg-background shadow-lg mx-auto -mt-20">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="portrait person" />
                    <AvatarFallback className="text-5xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold font-headline mt-4">{user.name}</h1>
                  <p className="text-md text-muted-foreground">{user.experience}</p>
                   <div className="flex items-center justify-center gap-2 mt-4">
                    {user.links.email && (
                      <Button asChild variant="outline" size="icon">
                        <a href={`mailto:${user.links.email}`} aria-label="Email">
                          <Mail className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {user.links.linkedin && (
                      <Button asChild variant="outline" size="icon">
                        <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                  <Briefcase className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Role</h3>
                    <p className="text-muted-foreground">{user.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Stethoscope className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Registration</h3>
                    <p className="text-muted-foreground">{user.registeredNumber}</p>
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
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-8">
             <Card className="overflow-hidden">
                <div className="relative h-32 w-full bg-primary/10" />
             </Card>
            <div className="space-y-8 -mt-[140px] px-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 whitespace-pre-wrap">{user.bio}</p>
                  <Separator className="my-6" />
                  <ProfileSummary bio={user.bio} />
                </CardContent>
              </Card>

              {user.workExperience.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {user.workExperience.map((exp, index) => <ExperienceItem key={index} experience={exp} />)}
                  </CardContent>
                </Card>
              )}
              
              {user.education.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {user.education.map((edu, index) => <EducationItem key={index} education={edu} />)}
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Specialties & Interests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Stethoscope className="h-5 w-5 text-accent" /> Specialties
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.specialties.map(specialty => <Badge key={specialty} variant="secondary" className="text-sm py-1 px-3">{specialty}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Building className="h-5 w-5 text-accent" /> Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map(interest => <Badge key={interest} variant="outline" className="text-sm py-1 px-3">{interest}</Badge>)}
                      </div>
                    </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
