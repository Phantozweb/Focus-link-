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
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="bg-primary/10 h-32 w-full" />
            <div className="p-6 pt-0 -mt-16 flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="h-32 w-32 border-4 border-background bg-background shadow-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="portrait person" />
                  <AvatarFallback className="text-5xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-16">
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
                            <p className="text-md text-muted-foreground">{user.experience}</p>
                            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> {user.location}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 sm:mt-0">
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
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="space-y-6">
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
                        <h3 className="font-semibold">Registration Number</h3>
                        <p className="text-muted-foreground">{user.registeredNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
