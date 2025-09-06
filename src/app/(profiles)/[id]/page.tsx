import { users } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, Linkedin, Mail, MapPin, Stethoscope } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProfileSummary } from '@/components/profile-summary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <Avatar className="h-40 w-40 border-4 border-primary/20 shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="portrait person" />
              <AvatarFallback className="text-5xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold font-headline mt-4">{user.name}</h1>
            <Badge variant={user.type === 'Optometrist' ? 'default' : 'secondary'} className="mt-2 text-md py-1 px-3">{user.type}</Badge>
            <p className="text-muted-foreground mt-2">{user.registeredNumber}</p>
            <div className="flex items-center justify-center gap-3 mt-4">
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
        </div>
        
        <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 whitespace-pre-wrap">{user.bio}</p>
                <Separator className="my-4" />
                <ProfileSummary bio={user.bio} />
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
                    <h3 className="font-semibold">Experience</h3>
                    <p className="text-muted-foreground">{user.experience}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">{user.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Specialties & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Stethoscope className="h-4 w-4 text-accent" /> Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.specialties.map(specialty => <Badge key={specialty} variant="secondary">{specialty}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Building className="h-4 w-4 text-accent" /> Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
                    </div>
                  </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
