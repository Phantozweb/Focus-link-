
import { allUsers } from '@/lib/data/index';
import { webinars } from '@/lib/academy';
import { demoDiscussions } from '@/lib/forum';
import { ProfileCard } from '@/components/profile-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, ArrowRight, CheckCircle2, UserPlus, Building, Hospital, Factory, Calendar, Radio, Sparkles, BookUser, Award, Briefcase, Users, ThumbsUp, Eye, MessageSquare, Building2 as CommunityIcon, Trophy, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserProfile, Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { WebinarTime } from '@/components/webinar-time';
import { WebinarBanner } from '@/components/webinar-banner';
import { TimeAgo } from '@/components/time-ago';
import { AnimatedCommunityGraph } from '@/components/animated-community-graph';
import { AnimatedSearchCard } from '@/components/animated-search-card';
import { HomepageSearch } from '@/components/homepage-search';

async function getJobs(): Promise<Job[]> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Jobs1.json";
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error('Failed to fetch jobs.json, returning empty array.');
      return [];
    }
    const jobs = await response.json();
    return Array.isArray(jobs) ? jobs.filter(job => job.id !== 'docs') : [];
  } catch (error) {
    console.error('Error fetching or parsing jobs.json:', error);
    return [];
  }
}

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

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


export default async function Home() {
  const professionals = shuffleArray([...allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type))]);
  const associations = shuffleArray([...allUsers.filter(u => u.type === 'Association')]);
  const colleges = shuffleArray([...allUsers.filter(u => u.type === 'College')]);
  const clinicsAndOpticals = shuffleArray([...allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type))]);
  const students = shuffleArray([...allUsers.filter(u => u.type === 'Student')]);
  const industry = shuffleArray([...allUsers.filter(u => u.type === 'Industry')]);
  const demoJobs = await getJobs();

  const now = new Date().getTime();
  const liveWebinars: typeof webinars = [];
  const upcomingWebinars: typeof webinars = [];
  webinars.forEach(w => {
    const startTime = new Date(w.dateTime).getTime();
    const durationParts = w.duration.split(' ');
    const durationValue = parseInt(durationParts[0], 10);
    const endTime = startTime + (durationValue * 60 * 60 * 1000) * (w.id === 'eye-q-arena-2025' ? 24 * 11 : 1);
    if (now >= startTime && now < endTime) {
      liveWebinars.push(w);
    } else if (now < startTime) {
      upcomingWebinars.push(w);
    }
  });

  const ctaCards = [
    {
      isAnimated: true,
    },
    {
      title: "Eye Q Arena Has Ended!",
      description: "With 320+ participants, only 50 survived the quiz! The International Optometry Knowledge Championship is complete. View the final leaderboard and claim your certificate now.",
      href: "/academy/eye-q-arena-2025",
      icon: <Trophy className="h-8 w-8 text-white animate-bounce" />,
      cta: "Claim Certificate",
      cta2: "View Leaderboard",
      href2: "/academy/eye-q-arena-2025#leaderboard",
      className: "bg-gradient-to-br from-amber-500 to-orange-600 shining-button",
    },
    {
      title: "350+ Members in our WhatsApp Community",
      description: "Join our active WhatsApp group for discussions, quick updates, and informal networking. This is separate from official membership.",
      href: "https://chat.whatsapp.com/E5O5Y5Z2Y3Z2Z5Y5Z2Y3Z2",
      icon: <AnimatedCommunityGraph />,
      cta: "Join WhatsApp Community",
      className: "bg-gradient-to-br from-slate-700 to-slate-900",
      tooltipText: "Last updated on Nov 12 2025"
    },
  ];

  return (
        <div className="bg-muted/40">
          <section className="relative bg-gradient-to-r from-cyan-600 to-blue-700 text-white overflow-hidden py-20 md:py-28">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">A Global Community for Eye Care</h1>
                  <p className="text-lg md:text-xl mb-8 max-w-3xl text-blue-100 mx-auto">Connecting vision professionals, students, and organizations worldwide. Find peers, discover opportunities, and grow your network.</p>
                  
                 <HomepageSearch />
              </div>
          </section>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
            
            <section>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {ctaCards.map((card, index) => (
                    <CarouselItem key={index} className="pl-4 flex flex-col">
                      {card.isAnimated ? (
                          <AnimatedSearchCard />
                      ) : (
                          <div className={`rounded-xl p-8 flex flex-col justify-between shadow-xl flex-grow ${card.className}`}>
                            <div>
                              <div className="mb-4">{card.icon}</div>
                              <div className='flex items-center gap-2'>
                                <h3 className="font-bold text-2xl mb-2 text-white">{card.title}</h3>
                                {card.tooltipText && (
                                  <p className="text-xs text-white/70 mt-1">{card.tooltipText}</p>
                                )}
                              </div>
                              <p className="text-white/80">{card.description}</p>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                              {card.cta && (
                                <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors">
                                  <Link href={card.href || '#'} target={card.href?.startsWith('http') ? '_blank' : '_self'}>
                                    {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                              {card.cta2 && (
                                 <Button asChild variant="ghost" className="bg-transparent text-white hover:bg-white/20 hover:text-white transition-colors">
                                  <Link href={card.href2 || '#'}>
                                    {card.cta2} <BarChart className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                      )}
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
                        <CarouselItem key={webinar.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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
                                <Link href={`/events/${webinar.id}`}>
                                  Join Live
                                </Link>
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
                        <CarouselItem key={webinar.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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
                 <Carousel 
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {professionals.map((user) => (
                      <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
                        <ProfileCard user={user} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </section>}
              
              {students.length > 0 && <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-slate-800 text-3xl font-bold font-headline">Student Directory</h2>
                  <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/directory/students">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <Carousel 
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {students.map((student) => (
                      <CarouselItem key={student.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 flex flex-col">
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
                              <p className="text-sm text-primary font-medium">{student.experience.split('|')[0]}</p>
                              <p className="text-sm text-muted-foreground mt-2 flex-grow line-clamp-3">{student.bio.substring(0,100)}...</p>
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
              
              <section>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-slate-800 text-3xl font-bold font-headline">From the Forum</h2>
                    <Button asChild variant="link" className="text-primary pr-0">
                      <Link href="/forum">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <Carousel 
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {demoDiscussions.map((discussion) => (
                        <CarouselItem key={discussion.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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

                {demoJobs && demoJobs.length > 0 && <section>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-slate-800 text-3xl font-bold font-headline">Latest Job Postings</h2>
                    <Button asChild variant="link" className="text-primary pr-0">
                      <Link href="/jobs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <Carousel 
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {demoJobs.map((job) => (
                        <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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
                                  <p><span className="font-semibold text-slate-700">Posted:</span> <TimeAgo dateString={job.posted} /></p>
                              </div>
                            </CardContent>
                          </Card>
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
                    <Carousel 
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {associations.map((user) => (
                            <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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
                    <Carousel 
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                    <CarouselContent className="-ml-4">
                        {colleges.map((user) => (
                        <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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
                  <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Industry Partners</h2>
                  {industry.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/directory/industry">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>}
                </div>
                {industry.length > 0 ? (
                    <Carousel 
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                    <CarouselContent className="-ml-4">
                        {industry.map((user) => (
                        <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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

              <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Clinics & Opticals</h2>
                  {clinicsAndOpticals.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/directory/clinics">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>}
                </div>
                {clinicsAndOpticals.length > 0 ? (
                    <Carousel 
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                    <CarouselContent className="-ml-4">
                        {clinicsAndOpticals.map((user) => (
                        <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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

          </div>
        </div>
  );
}
