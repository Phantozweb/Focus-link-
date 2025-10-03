
"use client";

import { users as allUsers } from '@/lib/data';
import { webinars } from '@/lib/academy';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, Search, SlidersHorizontal, ArrowRight, CheckCircle2, UserPlus, Building, Hospital, Factory, Calendar, Clock, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserProfile } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { WebinarTime } from '@/components/webinar-time';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry', 'Ophthalmologist', 'Optician'];

const EmptyStateCTA = ({ title, ctaText, ctaLink, icon }: { title: string, ctaText: string, ctaLink: string, icon: React.ReactNode }) => (
    <div className="text-center p-8 bg-card rounded-lg shadow-sm border-2 border-dashed flex flex-col items-center justify-center h-full">
        <div className="mb-4 text-muted-foreground">{icon}</div>
        <h3 className="font-semibold text-xl text-card-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">Be the first to represent your category.</p>
        <Button asChild>
            <Link href={ctaLink}>{ctaText}</Link>
        </Button>
    </div>
);


export default function Home() {
  const professionals = allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type));
  const associations = allUsers.filter(u => u.type === 'Association');
  const colleges = allUsers.filter(u => u.type === 'College');
  const clinicsAndOpticals = allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type));
  const students = allUsers.filter(u => u.type === 'Student');
  const industry = allUsers.filter(u => u.type === 'Industry');
  const now = new Date();
  const upcomingWebinars = webinars.filter(w => new Date(w.dateTime) > now);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');


  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    if (filterCountry !== 'all') {
      params.set('country', filterCountry);
    }

    const categoryMap = {
        'Student': 'students',
        'Optometrist': 'professionals',
        'Ophthalmologist': 'professionals',
        'Optician': 'professionals',
        'Academic': 'professionals',
        'Researcher': 'professionals',
        'Association': 'associations',
        'College': 'colleges',
        'Hospital': 'clinics',
        'Optical': 'clinics',
        'Industry': 'industry',
    }
    
    const category = filterType !== 'all' ? (categoryMap[filterType as keyof typeof categoryMap] || 'all') : 'all';
    
    router.push(`/directory/${category}?${params.toString()}`);
  }

  return (
    <div className="bg-muted/40">
       <section className="relative py-20 md:py-28 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Find Your Next Opportunity in Eye Care</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-blue-100 mx-auto">The world's largest eye care community to find, connect, and grow. Search for professionals, organizations, and resources.</p>
          <div className="w-full max-w-2xl bg-white/20 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/30 mx-auto">
           <div className="flex flex-col md:flex-row gap-2 items-center">
             <div className="flex-grow w-full">
                <label className="relative flex items-center">
                 <Search className="absolute left-3 text-gray-500 h-5 w-5" />
                 <input 
                    className="form-input w-full pl-10 pr-4 py-3 rounded-md bg-white text-gray-800 border-gray-300 focus:ring-primary focus:border-primary placeholder-gray-500" 
                    placeholder="Search by name, skill, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
               </label>
             </div>
             
             <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto h-12 bg-white text-primary hover:bg-gray-200">
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Advanced Search Filters</DialogTitle>
                   <DialogDescription>
                    Refine your search to find the perfect connection.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                   <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Type</label>
                    <div className="col-span-3">
                      <Select onValueChange={setFilterType} value={filterType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a profile type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Profiles</SelectItem>
                           {profileTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right">Country</label>
                     <div className="col-span-3">
                      <Select onValueChange={setFilterCountry} value={filterCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Countries</SelectItem>
                          {countries.map(country => (
                            <SelectItem key={country.code} value={country.name.toLowerCase()}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                 <Button type="submit" onClick={handleSearch} className="w-full">
                    Show Results
                  </Button>
              </DialogContent>
            </Dialog>

             <Button className="w-full md:w-auto h-12 bg-white text-primary hover:bg-gray-200" onClick={handleSearch}>Search</Button>
           </div>
         </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
        
          {upcomingWebinars.length > 0 && (
            <section>
                <div className="flex justify-between items-center mb-8">
                <h2 className="text-slate-800 text-3xl font-bold font-headline">Upcoming Webinars</h2>
                <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/academy">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {upcomingWebinars.map((webinar) => (
                    <CarouselItem key={webinar.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Link href={`/academy/${webinar.id}`} className="h-full block">
                            <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                <div className="relative">
                                    <Image src={webinar.imageUrl} alt={webinar.title} width={400} height={225} className="w-full h-48 object-cover" data-ai-hint="presentation person" />
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        {webinar.tags.slice(0, 2).map(tag => <Badge key={tag} variant="secondary" className="bg-white/80 backdrop-blur-sm">{tag}</Badge>)}
                                    </div>
                                </div>
                                <CardContent className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">{webinar.title}</h3>
                                    <div className="flex items-center gap-3 my-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} data-ai-hint="portrait person" />
                                            <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm text-slate-700">{webinar.speaker.name}</p>
                                            <p className="text-xs text-muted-foreground">{webinar.speaker.title}</p>
                                        </div>
                                    </div>
                                    <div className="border-t pt-3 space-y-2 text-sm text-muted-foreground">
                                        <WebinarTime dateTime={webinar.dateTime} />
                                    </div>
                                    <Button asChild className="w-full mt-4">
                                        <div className="w-full">View Details</div>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </section>
            )}

          {professionals.length > 0 && <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Professionals</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/professionals">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {professionals.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>}

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Associations</h2>
              {associations.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/associations">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
             {associations.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {associations.map((user) => (
                        <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <ProfileCard user={user} />
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
             ) : (
                <EmptyStateCTA
                    title="No Associations Found"
                    ctaText="Be the First to Join!"
                    ctaLink="/join"
                    icon={<UserPlus className="h-12 w-12" />}
                />
             )}
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Colleges & Schools</h2>
               {colleges.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/colleges">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
             {colleges.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {colleges.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <ProfileCard user={user} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
             ) : (
                <EmptyStateCTA
                    title="No Colleges Found"
                    ctaText="List Your Institution"
                    ctaLink="/join"
                    icon={<Building className="h-12 w-12" />}
                />
             )}
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Eye Care Clinics & Opticals</h2>
              {clinicsAndOpticals.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/clinics">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {clinicsAndOpticals.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {clinicsAndOpticals.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <ProfileCard user={user} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            ) : (
                <EmptyStateCTA
                    title="No Clinics Found"
                    ctaText="Add Your Practice"
                    ctaLink="/join"
                    icon={<Hospital className="h-12 w-12" />}
                />
            )}
          </section>
          
           <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Industry Partners</h2>
              {industry.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/industry">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {industry.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {industry.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <ProfileCard user={user} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            ) : (
                 <EmptyStateCTA
                    title="No Industry Partners Found"
                    ctaText="Join as a Partner"
                    ctaLink="/join"
                    icon={<Factory className="h-12 w-12" />}
                />
            )}
          </section>

          {students.length > 0 && <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Student Directory</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/students">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {students.map((student) => (
                  <CarouselItem key={student.id} className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                     <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col text-center">
                        <div className="p-6 flex flex-col items-center flex-grow">
                          <Avatar className="h-24 w-24 mb-4 border-2 border-background shadow-md">
                            <AvatarImage src={student.avatarUrl} alt={student.name} className="object-cover" data-ai-hint="portrait person" />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="text-lg font-bold text-slate-800 flex items-center justify-center gap-2">
                            {student.name}
                            {student.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
                          </h3>
                          <p className="text-sm text-primary">{student.education[0]?.school || 'Optometry Student'}</p>
                          <p className="text-sm text-muted-foreground mt-2 flex-grow">{student.bio.substring(0,80)}...</p>
                        </div>
                        <div className="p-4 border-t bg-muted/50 mt-auto">
                           <Button asChild className="w-full">
                              <Link href={`/profile/${student.id}`}>View Profile</Link>
                            </Button>
                        </div>
                     </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>}

      </div>
    </div>
  );
}
