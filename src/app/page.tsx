
"use client";

import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, Search, SlidersHorizontal, ArrowRight, Calendar, Video, Users as UsersIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    router.push('/directory');
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
    <main>
       <section className="relative py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 text-left text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">Find Your Next Opportunity in Eye Care</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-slate-600">Search for professionals, organizations, and resources in the eye care community.</p>
            <div className="w-full max-w-2xl bg-white p-2 rounded-lg shadow-lg border border-gray-200">
               <div className="flex flex-col md:flex-row gap-2 items-center">
                 <div className="flex-grow w-full">
                    <label className="relative flex items-center">
                     <Search className="absolute left-3 text-gray-500 h-5 w-5" />
                     <input className="form-input w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500" placeholder="Search by name, skill, or keyword..."/>
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
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="optometrist">Optometrist</SelectItem>
                              <SelectItem value="academic">Academic / Researcher</SelectItem>
                              <SelectItem value="association">Association</SelectItem>
                              <SelectItem value="college">College / University</SelectItem>
                              <SelectItem value="hospital">Hospital / Clinic</SelectItem>
                              <SelectItem value="optical">Optical</SelectItem>
                              <SelectItem value="industry">Industry</SelectItem>
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
                              {countries.map(country => (
                                <SelectItem key={country.code} value={country.code}>
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
        </div>
      </section>

      <div className="px-4 md:px-10 lg:px-20 py-16 bg-white">
        <div className="space-y-16">
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Professionals</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {professionals.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Associations</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
             <div className="relative">
               <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {associations.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Colleges & Schools</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
             <div className="relative">
               <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {colleges.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Communities</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
             <div className="relative">
               <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {associations.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Eye Care Clinics &amp; Opticals</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {clinicsAndOpticals.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>
          
           <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Industry Partners</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {industry.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Events &amp; Webinars</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
             <div className="relative">
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
              </Carousel>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Student Directory</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {students.map((student) => (
                    <CarouselItem key={student.id} className="md:basis-1/2 lg:basis-1/4 pl-4">
                       <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col text-center">
                          <div className="p-6 flex flex-col items-center flex-grow">
                            <Avatar className="h-24 w-24 mb-4">
                              <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="portrait person" />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-bold text-slate-800">{student.name}</h3>
                            <p className="text-sm text-cyan-600">{student.education[0]?.school || 'Optometry Student'}</p>
                            <p className="text-sm text-muted-foreground mt-2 flex-grow">{student.bio.substring(0,80)}...</p>
                          </div>
                          <div className="p-4 border-t mt-auto">
                             <Button asChild className="w-full">
                                <Link href={`/${student.id}`}>View Profile</Link>
                              </Button>
                          </div>
                       </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

    