
import { allUsers } from '@/lib/data/index';
import type { ForumPost } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, ArrowRight, UserPlus, Building, Hospital, Factory, MapPin, Briefcase, ThumbsUp, Eye, Building2 as CommunityIcon, MessageSquare, BookOpen, Users, Handshake, University, User, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserProfile, Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TimeAgo } from '@/components/time-ago';
import { HomepageSearch } from '@/components/homepage-search';
import { AnimatedSearchCard } from '@/components/animated-search-card';
import { AnimatedTeamApplicationCard } from '@/components/animated-team-application-card';
import { AnimatedCommunityUpdateCard } from '@/components/animated-community-update-card';
import { ProfileCard } from '@/components/profile-card';

async function getJobs(): Promise<Job[]> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Jobs1.json";
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error('Failed to fetch jobs.json, returning empty array.');
      return [];
    }
    const jobs = await response.json();
    return Array.isArray(jobs) ? jobs : [];
  } catch (error) {
    console.error('Error fetching or parsing jobs.json:', error);
    return [];
  }
}

async function getDiscussions(): Promise<ForumPost[]> {
  const url = "https://raw.githubusercontent.com/Phantozweb/Jobslistingsopto/refs/heads/main/Case1.json";
  try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
          console.error('Failed to fetch discussions, returning empty array.');
          return [];
      }
      const discussions: ForumPost[] = await response.json();
      return Array.isArray(discussions) ? discussions.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) : [];
  } catch (error) {
      console.error('Error fetching or parsing discussions:', error);
      return [];
  }
}

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
    <div className="empty-state">
        <div className="empty-icon">{icon}</div>
        <h3 className='text-xl font-bold mb-2'>{title}</h3>
        <p className="text-sm text-text-muted mb-5">Be the first to represent your category.</p>
        <Button asChild className="search-btn">
            <Link href={ctaLink}>{ctaText}</Link>
        </Button>
    </div>
);


export default async function Home() {
  const professionals = shuffleArray([...allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type))]);
  const associations = shuffleArray([...allUsers.filter(u => u.type === 'Association')]);
  const colleges = shuffleArray([...allUsers.filter(u => u.type === 'College')]);
  const institutions = shuffleArray([...associations, ...colleges]);
  const clinicsAndOpticals = shuffleArray([...allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type))]);
  const students = shuffleArray([...allUsers.filter(u => u.type === 'Student')]);
  const industry = shuffleArray([...allUsers.filter(u => u.type === 'Industry')]);
  const demoJobs = await getJobs();
  const demoDiscussions = await getDiscussions();

  return (
        <div className="bg-brand-bg">
          <header className="hero">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">A Global Community<br/>for Eye Care</h1>
              <p className="text-base opacity-90 max-w-xl mx-auto mb-12">Connecting vision professionals, students, and organizations worldwide. Find peers, discover opportunities, and grow.</p>
              <HomepageSearch />
          </header>

          <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 space-y-12">
            
            <Carousel opts={{ loop: true, align: 'start' }} className="w-full">
                <CarouselContent className="-ml-4">
                    <CarouselItem className="pl-4 basis-full">
                        <AnimatedTeamApplicationCard />
                    </CarouselItem>
                     <CarouselItem className="pl-4 basis-full">
                        <AnimatedSearchCard />
                    </CarouselItem>
                    <CarouselItem className="pl-4 basis-full">
                        <AnimatedCommunityUpdateCard />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>

            {professionals.length > 0 && (
            <section>
              <div className="section-header">
                <h2 className="section-title">Featured Professionals</h2>
                <Link href="/directory/professionals" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
              </div>
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {professionals.map((user) => (
                    <CarouselItem key={user.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>
            )}
            
            {students.length > 0 && (
            <section>
               <div className="section-header">
                <h2 className="section-title">Student Directory</h2>
                <Link href="/directory/students" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
              </div>
              <Carousel className="w-full">
                  <CarouselContent className="-ml-4">
                    {students.map((student) => (
                      <CarouselItem key={student.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                        <ProfileCard user={student} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
              </Carousel>
            </section>
            )}
              
              {demoDiscussions.length > 0 &&
              <section>
                  <div className="section-header">
                    <h2 className="section-title">From the Forum</h2>
                    <Link href="/forum" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                  </div>
                  <div className="space-y-4">
                  {demoDiscussions.slice(0, 1).map((discussion) => (
                      <Card key={discussion.id} className="hover:shadow-hover transition-shadow rounded-3xl shadow-soft">
                        <CardContent className="p-4 sm:p-6 flex gap-4">
                          <Avatar className="hidden sm:block h-12 w-12 border">
                            <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                            <AvatarFallback>{discussion.author?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-y-2">
                              <Badge variant="secondary">{discussion.category}</Badge>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0">
                                <div className="flex items-center gap-1.5" title="Upvotes"><ThumbsUp className="h-4 w-4" /> {discussion.upvotes}</div>
                                <div className="flex items-center gap-1.5" title="Views"><Eye className="h-4 w-4" /> {discussion.views}</div>
                              </div>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 hover:text-primary mt-2">
                              <Link href={`/forum/${discussion.id}`}>{discussion.title}</Link>
                            </h3>
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{discussion.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                              <Avatar className="sm:hidden h-6 w-6">
                                <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint="portrait person" />
                                <AvatarFallback>{discussion.author?.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Link href={`/profile/${discussion.authorId}`} className="font-semibold text-slate-700 hover:underline">{discussion.author}</Link>
                              <span>&middot;</span>
                              <span>Posted <TimeAgo dateString={discussion.postedDate} /></span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                  </div>
                </section>}

                {demoJobs && demoJobs.length > 0 && 
                <section>
                  <div className="section-header">
                    <h2 className="section-title">Latest Job Postings</h2>
                    <Link href="/jobs" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                  </div>
                  <div className="job-list">
                      {demoJobs.slice(0,3).map((job) => (
                        <Link href={`/jobs/${job.id}`} key={job.id} className="job-item">
                           <div className="job-main">
                                <h4>{job.title}</h4>
                                <div className="job-meta">
                                  <span className='flex items-center gap-1.5'><Building className="h-4 w-4" />{job.company}</span>
                                  <span className='flex items-center gap-1.5'><MapPin className="h-4 w-4" />{job.location}</span>
                                </div>
                            </div>
                            <div className="job-icon"><ArrowRight /></div>
                        </Link>
                      ))}
                  </div>
                </section>}
             
               <section>
                <div className="section-header">
                  <h2 className="section-title">Associations & Colleges</h2>
                  <Link href="/directory/institutions" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                </div>
                 <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                      {institutions.map((user) => (
                        <CarouselItem key={user.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                          <ProfileCard user={user} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                 </Carousel>
              </section>

              <section>
                <div className="section-header">
                  <h2 className="section-title">Featured Clinics</h2>
                   {clinicsAndOpticals.length > 0 && <Link href="/directory/clinics" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>}
                </div>
                {clinicsAndOpticals.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent className="-ml-4">
                          {clinicsAndOpticals.map((user) => (
                            <CarouselItem key={user.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                              <ProfileCard user={user} />
                            </CarouselItem>
                          ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon"><Hospital className="h-12 w-12" /></div>
                        <h3 className='text-xl font-bold mb-2'>No Clinics Found</h3>
                        <p className="text-sm text-text-muted mb-5">Be the first to represent your category.</p>
                        <Button asChild className="search-btn">
                            <Link href="/membership">Add Your Practice</Link>
                        </Button>
                    </div>
                )}
              </section>
          </main>
        </div>
  );
}
