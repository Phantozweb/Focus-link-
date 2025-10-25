
"use client";

import { useRef, useState, useEffect } from 'react';
import { users as allUsers } from '@/lib/data';
import { webinars } from '@/lib/academy';
import { demoDiscussions } from '@/lib/forum';
import { demoJobs } from '@/lib/jobs';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, Search, SlidersHorizontal, ArrowRight, CheckCircle2, UserPlus, Building, Hospital, Factory, Calendar, Clock, User, Tv, Radio, Sparkles, BookUser, Award, MessageSquare, Briefcase, MapPin, Users, ThumbsUp, Eye, Mail, MessageCircle, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserProfile } from '@/types';
import { Badge } from '@/components/ui/badge';
import { WebinarTime } from '@/components/webinar-time';
import { WebinarBanner } from '@/components/webinar-banner';
import Autoplay from "embla-carousel-autoplay";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

function ProfileRequestDialog() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const generateMailto = () => {
    const subject = `Profile Listing Request: ${name}`;
    const body = `Hello Focus Links Team,\n\nI would like to request to be listed in the directory.\n\n- Name: ${name}\n- Email: ${email}\n- Primary Role: ${role}\n\nThank you!`;
    return `mailto:team.focuslinks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Request a Profile Listing</DialogTitle>
        <DialogDescription>
          Our platform is in its early stages. Fill out this form, and we'll email you to get your profile set up manually.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Dr. Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Primary Role</Label>
          <Select onValueChange={setRole} value={role}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {profileTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button asChild disabled={!name || !email || !role}>
        <a href={generateMailto()}>
          <Mail className="mr-2 h-4 w-4" /> Send Mail
        </a>
      </Button>
    </DialogContent>
  );
}


export default function Home() {
  const professionals = allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type));
  const associations = allUsers.filter(u => u.type === 'Association');
  const colleges = allUsers.filter(u => u.type === 'College');
  const clinicsAndOpticals = allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type));
  const students = allUsers.filter(u => u.type === 'Student');
  const industry = allUsers.filter(u => u.type === 'Industry');
  
  const [liveWebinars, setLiveWebinars] = useState<typeof webinars>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<typeof webinars>([]);

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');
  
  const ctaCards = [
    {
      title: "Become an Official Member",
      description: "Submit an application to get verified, create your official profile, and unlock exclusive community perks.",
      href: "/membership",
      icon: <Award className="h-8 w-8 text-white" />,
      cta: "Apply Now",
      className: "bg-gradient-to-br from-blue-600 to-cyan-500",
      isDialog: false,
    },
    {
      title: "215+ Members in our WhatsApp Community",
      description: "Join our active WhatsApp group for discussions, quick updates, and informal networking. Note: This is separate from official membership.",
      href: "https://chat.whatsapp.com/E5O5Y5Z2Y3Z2Z5Y5Z2Y3Z2",
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      cta: "Join WhatsApp Community",
      className: "bg-gradient-to-br from-slate-700 to-slate-900",
      isDialog: false,
      tooltipText: "Last updated Oct 24, 2025"
    },
    {
      title: "Create Your Professional Profile",
      description: "Already a member? Complete your profile to showcase your skills, experience, and interests to the global community.",
      href: "/profile/create",
      icon: <UserPlus className="h-8 w-8 text-white" />,
      cta: "Create Profile",
      className: "bg-gradient-to-br from-cyan-700 to-blue-800",
      isDialog: false,
    },
  ];


  useEffect(() => {
    const now = new Date().getTime();
    
    const live: typeof webinars = [];
    const upcoming: typeof webinars = [];

    webinars.forEach(w => {
      const startTime = new Date(w.dateTime).getTime();
      const durationParts = w.duration.split(' ');
      const durationValue = parseInt(durationParts[0], 10);
      const endTime = startTime + (durationValue * 60 * 60 * 1000) * (w.id === 'eye-q-arena-2025' ? 24 * 11 : 1); // Handle days for quiz

      if (now >= startTime && now < endTime) {
        live.push(w);
      } else if (now < startTime) {
        upcoming.push(w);
      }
    });

    setLiveWebinars(live);
    setUpcomingWebinars(upcoming);
  }, []);

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
    <Dialog>
       <TooltipProvider>
      <div className="bg-muted/40">
        <section className="relative bg-gradient-to-r from-cyan-600 to-blue-700 text-white overflow-hidden py-20 md:py-28">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">The World's Largest Eye Care Community</h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl text-blue-100 mx-auto">Find, connect, and grow with professionals, students, and organizations in the vision care industry.</p>
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
          
          <section>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {ctaCards.map((card, index) => (
                  <CarouselItem key={index}>
                    <div className={`rounded-xl p-8 flex flex-col justify-between shadow-xl h-80 ${card.className}`}>
                      <div>
                        <div className="mb-4">{card.icon}</div>
                         <div className='flex items-center gap-2'>
                           <h3 className="font-bold text-2xl mb-2 text-white">{card.title}</h3>
                           {card.tooltipText && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-white/70" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{card.tooltipText}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                         </div>
                        <p className="text-white/80">{card.description}</p>
                      </div>
                      <div className="mt-6">
                        {card.isDialog ? (
                          <DialogTrigger asChild>
                            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors">
                              {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        ) : (
                          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors">
                            <Link href={card.href} target={card.href.startsWith('http') ? '_blank' : '_self'}>
                              {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="pt-4">
                <CarouselDots />
              </div>
            </Carousel>
          </section>

            {liveWebinars.length > 0 && (
              <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-slate-800 text-3xl font-bold font-headline flex items-center gap-3">
                    <Radio className="h-8 w-8 text-red-500 animate-pulse" />
                    Live Now
                  </h2>
                  <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/events">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {liveWebinars.map((webinar) => (
                      <CarouselItem key={webinar.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                          <Link href={`/events/${webinar.id}`} className="block">
                            <div className="relative w-full aspect-video">
                              <WebinarBanner webinar={webinar} variant="card" />
                            </div>
                          </Link>
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                              <Link href={`/events/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                            </h3>
                            <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                              <WebinarTime dateTime={webinar.dateTime} />
                            </div>
                            <Button asChild className="w-full mt-4" variant="destructive">
                              <Link href={`/events/${webinar.id}`}>Join Live</Link>
                            </Button>
                          </div>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </section>
            )}

            {upcomingWebinars.length > 0 && (
              <section>
                  <div className="flex justify-between items-center mb-8">
                  <h2 className="text-slate-800 text-3xl font-bold font-headline">Upcoming Live Events</h2>
                  <Button asChild variant="link" className="text-primary pr-0">
                      <Link href="/events">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  </div>
                  <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent className="-ml-4">
                      {upcomingWebinars.map((webinar) => (
                      <CarouselItem key={webinar.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                          <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                              <Link href={`/events/${webinar.id}`} className="block">
                                  <div className="relative w-full aspect-video">
                                      <WebinarBanner webinar={webinar} variant="card" />
                                  </div>
                              </Link>
                              <div className="p-6 flex flex-col flex-grow">
                                  <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                                      <Link href={`/events/${webinar.id}`} className="hover:text-primary transition-colors">{webinar.title}</Link>
                                  </h3>
                                  <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                                      <WebinarTime dateTime={webinar.dateTime} />
                                  </div>
                                  
                                  <Button asChild className="w-full mt-4">
                                      <Link href={`/events/${webinar.id}`}>View Details</Link>
                                  </Button>
                              </div>
                          </Card>
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
                  <h2 className="text-slate-800 text-3xl font-bold font-headline">From the Forum (Demo)</h2>
                  <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/forum">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {demoDiscussions.map((discussion) => (
                      <CarouselItem key={discussion.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <Badge variant="secondary" className="mb-2 w-fit">{discussion.category}</Badge>
                            <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                              <Link href={`/forum/${discussion.id}`} className="hover:text-primary transition-colors">{discussion.title}</Link>
                            </h3>
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2 flex-grow">{discussion.description}</p>
                            <div className="border-t pt-4 mt-4 space-y-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Avatar className="h-6 w-6">
                                      <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                      <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{discussion.author}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4" /> {discussion.upvotes}</div>
                                  <div className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> {discussion.replies}</div>
                                  <div className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {discussion.views}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </section>

              <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-slate-800 text-3xl font-bold font-headline">Latest Job Postings (Demo)</h2>
                  <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/jobs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {demoJobs.map((job) => (
                      <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-4">
                                <Image src={job.logo} alt={`${job.company} logo`} width={48} height={48} className="rounded-md object-contain" data-ai-hint="logo building" />
                                <div>
                                    <p className="font-semibold text-slate-800">{job.company}</p>
                                    <Badge variant="outline">{job.type}</Badge>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold font-headline text-slate-800 mb-2 flex-grow">
                              <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors">{job.title}</Link>
                            </h3>
                            <div className="space-y-3 text-sm text-muted-foreground border-t pt-4 mt-auto">
                                <p><span className="font-semibold text-slate-700">Location:</span> {job.location}</p>
                                <p><span className="font-semibold text-slate-700">Posted by:</span> {job.postedBy}</p>
                                <p><span className="font-semibold text-slate-700">Posted:</span> {job.posted}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </section>
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
                      ctaLink="/membership"
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
                      ctaLink="/membership"
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
                      ctaLink="/membership"
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
                      ctaLink="/membership"
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
        <ProfileRequestDialog />
      </div>
      </TooltipProvider>
    </Dialog>
  );
}
