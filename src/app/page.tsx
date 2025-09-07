
"use client";

import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, Search, SlidersHorizontal, ArrowRight, Calendar, Video, Users as UsersIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserProfile } from '@/types';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

export default function Home() {
  const professionals = allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher'].includes(u.type)).slice(0, 6);
  const associations = allUsers.filter(u => u.type === 'Association').slice(0, 6);
  const colleges = allUsers.filter(u => u.type === 'College').slice(0, 6);
  const clinicsAndOpticals = allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type)).slice(0, 6);
  const students = allUsers.filter(u => u.type === 'Student').slice(0, 6);
  const industry = allUsers.filter(u => u.type === 'Industry').slice(0, 6);
  const router = useRouter();


  const handleSearch = () => {
    // In a real app, you'd collect filter values from state
    // and pass them as query params to the directory page.
    router.push('/directory/all');
  }

  const events = [
    {
      date: 'Oct 25, 2024',
      title: 'Advances in Glaucoma Management',
      description: 'Join our webinar to learn about the latest treatment options for glaucoma.',
      type: 'Webinar',
      icon: <Video className="h-5 w-5 text-primary" />,
      image: 'https://picsum.photos/seed/event1/400/200'
    },
    {
      date: 'Nov 12, 2024',
      title: 'Pediatric Vision Screening Workshop',
      description: 'A hands-on workshop for professionals on effective pediatric vision screening.',
       type: 'Workshop',
       icon: <Calendar className="h-5 w-5 text-primary" />,
       image: 'https://picsum.photos/seed/event2/400/200'
    },
    {
      date: 'Dec 01, 2024',
      title: 'The Future of Contact Lens Technology',
      description: 'Explore innovative materials and designs in contact lenses with industry leaders.',
       type: 'Conference',
       icon: <UsersIcon className="h-5 w-5 text-primary" />,
       image: 'https://picsum.photos/seed/event3/400/200'
    },
     {
      date: 'Dec 15, 2024',
      title: 'AI in Eye Care Diagnostics',
      description: 'Discover how artificial intelligence is revolutionizing diagnostics in eye care.',
       type: 'Webinar',
       icon: <Video className="h-5 w-5 text-primary" />,
       image: 'https://picsum.photos/seed/event4/400/200'
    },
  ]

  return (
    <div className="bg-muted/40">
       <section className="relative py-20 md:py-28 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Find Your Next Opportunity in Eye Care</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-blue-100 mx-auto">The world's largest eye care community to find, connect, and grow. Search for professionals, organizations, and resources.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
         <div className="w-full max-w-2xl bg-white p-2 rounded-lg shadow-lg border border-gray-200 mx-auto">
           <div className="flex flex-col md:flex-row gap-2 items-center">
             <div className="flex-grow w-full">
                <label className="relative flex items-center">
                 <Search className="absolute left-3 text-gray-500 h-5 w-5" />
                 <input className="form-input w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:ring-primary focus:border-primary placeholder-gray-500" placeholder="Search by name, skill, or keyword..."/>
               </label>
             </div>
             
             <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto h-12">
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
                      <Select>
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
                      <Select>
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

             <Button className="w-full md:w-auto h-12" onClick={handleSearch}>Search</Button>
           </div>
         </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
        
          <section>
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
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Associations</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/associations">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {associations.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Colleges & Schools</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/colleges">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {colleges.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Eye Care Clinics & Opticals</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/clinics">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {clinicsAndOpticals.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </section>
          
           <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Industry Partners</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/industry">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {industry.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translatey-1/2" />
            </Carousel>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Events & Webinars</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="#">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {events.map((event, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      <Image src={event.image} alt={event.title} width={400} height={200} className="w-full h-40 object-cover" data-ai-hint="conference room" />
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          {event.icon}
                          <span>{event.type}</span>
                          <span className="mx-1">•</span>
                          <span>{event.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 flex-grow">{event.title}</h3>
                        <Button asChild variant="link" className="p-0 h-auto justify-start mt-4 text-primary">
                          <Link href="#">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </section>

          <section>
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
                            <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="portrait person" />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="text-lg font-bold text-slate-800">{student.name}</h3>
                          <p className="text-sm text-primary">{student.education[0]?.school || 'Optometry Student'}</p>
                          <p className="text-sm text-muted-foreground mt-2 flex-grow">{student.bio.substring(0,80)}...</p>
                        </div>
                        <div className="p-4 border-t bg-muted/50 mt-auto">
                           <Button asChild className="w-full">
                              <Link href={`/${student.id}`}>View Profile</Link>
                            </Button>
                        </div>
                     </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2" />
            </Carousel>
          </section>

      </div>
    </div>
  );
}

    