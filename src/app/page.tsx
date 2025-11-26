
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
import { HomeForumPost } from '@/components/home-forum-post';

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
        <Button asChild>
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
  
  const allStudents = allUsers.filter(u => u.type === 'Student');
  const featuredStudentIds = ['3', '11', '21']; // Anshi Jha, Rudra Kumar, Esakkiammal Iyyappan
  const featuredStudents = featuredStudentIds.map(id => allStudents.find(s => s.id === id)).filter((s): s is UserProfile => !!s);
  const otherStudents = allStudents.filter(s => !featuredStudentIds.includes(s.id));
  const students = [...featuredStudents, ...shuffleArray(otherStudents)];

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
            <section className="section-wrap">
              <div className="section-header">
                <h2 className="section-title">Featured Professionals</h2>
                <Link href="/directory/professionals" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
              </div>
              <div className="rec-scroll">
                  {professionals.slice(0, 8).map((user) => (
                      <ProfileCard key={user.id} user={user} />
                  ))}
              </div>
            </section>
            )}
            
            {students.length > 0 && (
            <section className="section-wrap">
               <div className="section-header">
                <h2 className="section-title">Student Directory</h2>
                <Link href="/directory/students" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
              </div>
              <div className="rec-scroll">
                  {students.slice(0, 8).map((student) => (
                      <ProfileCard key={student.id} user={student} />
                  ))}
              </div>
            </section>
            )}
              
              {demoDiscussions.length > 0 && (
                <section className="section-wrap">
                    <div className="section-header">
                        <h2 className="section-title">From the Forum</h2>
                        <Link href="/forum" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                    </div>
                    <div className="space-y-4">
                        {demoDiscussions.slice(0, 1).map((discussion) => (
                            <HomeForumPost key={discussion.id} discussion={discussion} />
                        ))}
                    </div>
                </section>
              )}

                {demoJobs && demoJobs.length > 0 && 
                <section className="section-wrap">
                  <div className="section-header">
                    <h2 className="section-title">Latest Job Postings</h2>
                    <Link href="/jobs" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                  </div>
                  <div className="space-y-4">
                      {demoJobs.slice(0,3).map((job) => (
                        <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                           <div className="job-card">
                              <div className="job-logo"><Building /></div>
                              <div className="job-info">
                                  <h3 className="job-title">{job.title}</h3>
                                  <div className="job-meta">
                                      <span><Building className="inline mr-1.5 h-4 w-4" />{job.company}</span>
                                      <span><MapPin className="inline mr-1.5 h-4 w-4" />{job.location}</span>
                                      <Badge variant="outline">{job.type}</Badge>
                                  </div>
                              </div>
                              <div className="job-action">
                                  <span className="post-time"><TimeAgo dateString={job.posted} /></span>
                                  <Button variant="secondary" className="btn-view rounded-full-btn h-auto py-2 px-5">Apply</Button>
                              </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </section>}
             
               <section className="section-wrap">
                <div className="section-header">
                  <h2 className="section-title">Associations & Colleges</h2>
                  <Link href="/directory/institutions" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                </div>
                 <div className="rec-scroll">
                      {institutions.slice(0, 8).map((user) => (
                          <ProfileCard key={user.id} user={user} />
                      ))}
                 </div>
              </section>

              <section className="section-wrap">
                <div className="section-header">
                  <h2 className="section-title">Featured Clinics</h2>
                   {clinicsAndOpticals.length > 0 && <Link href="/directory/clinics" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>}
                </div>
                {clinicsAndOpticals.length > 0 ? (
                    <div className="rec-scroll">
                        {clinicsAndOpticals.slice(0, 8).map((user) => (
                            <ProfileCard key={user.id} user={user} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon"><Hospital className="h-12 w-12" /></div>
                        <h3 className='text-xl font-bold mb-2'>No Clinics Found</h3>
                        <p className="text-sm text-text-muted mb-5">Be the first clinic in your area to be featured.</p>
                        <Button asChild>
                            <Link href="/membership">Add Your Practice</Link>
                        </Button>
                    </div>
                )}
              </section>
          </main>
        </div>
  );
}
