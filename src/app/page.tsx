import { allUsers } from '@/lib/data/index';
import type { ForumPost } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, ArrowRight, UserPlus, Building, Hospital, Factory, MapPin, Briefcase, ThumbsUp, Eye, Building2 as CommunityIcon, MessageSquare, BookOpen, Users, Handshake, University, User } from 'lucide-react';
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
        <p className="empty-text">Be the first to represent your category.</p>
        <Button asChild className="rounded-full-btn bg-brand-blue hover:bg-brand-blue/90">
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
  const demoDiscussions = await getDiscussions();

  return (
        <div className="bg-brand-bg">
          <header className="hero">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">A Global Community<br/>for Eye Care</h1>
              <p className="text-base opacity-90 max-w-xl mx-auto mb-12">Connecting vision professionals, students, and organizations worldwide. Find peers, discover opportunities, and grow.</p>
              <div className="transform translate-y-10">
                <HomepageSearch />
              </div>
          </header>

          <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 space-y-12">
            
            <section className="wa-card">
              <div className="wa-stats">350+</div>
              <p className="wa-text">Members in our WhatsApp Community active right now.</p>
              <a href="https://chat.whatsapp.com/GX69BheyhuuDYVCbFuETsS" className="btn-wa" target="_blank" rel="noopener noreferrer">
                  <MessageSquare /> Join WhatsApp Community
              </a>
            </section>

              {professionals.length > 0 && 
              <section>
                <div className="section-header">
                  <h2 className="section-title">Featured Professionals</h2>
                  <Link href="/directory/professionals" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                </div>
                 <div className="scroll-container">
                    {professionals.map((user) => (
                        <ProfileCard user={user} key={user.id}/>
                    ))}
                  </div>
              </section>}
              
              {students.length > 0 && 
              <section>
                 <div className="section-header">
                  <h2 className="section-title">Student Directory</h2>
                  <Link href="/directory/students" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                </div>
                <div className="scroll-container">
                    {students.map((student) => (
                         <ProfileCard user={student} key={student.id}/>
                    ))}
                </div>
              </section>}
              
              {demoDiscussions.length > 0 &&
              <section>
                  <div className="section-header">
                    <h2 className="section-title">From the Forum</h2>
                    <Link href="/forum" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>
                  </div>
                  <div className="space-y-4">
                  {demoDiscussions.slice(0, 1).map((discussion) => (
                      <div key={discussion.id} className="forum-card">
                          <span className="tag">{discussion.category}</span>
                          <h3 className="forum-title">
                              <Link href={`/forum/${discussion.id}`}>{discussion.title}</Link>
                          </h3>
                          <p className="text-sm text-text-muted mt-1 line-clamp-2">{discussion.description}</p>
                          <div className="forum-stats">
                              <span><User className="inline-flex mr-1.5 h-4 w-4" /> {discussion.author}</span>
                              <span><ThumbsUp className="inline-flex mr-1.5 h-4 w-4" /> {discussion.upvotes}</span>
                              <span><Eye className="inline-flex mr-1.5 h-4 w-4" /> {discussion.views}</span>
                          </div>
                      </div>
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
                                  <span><Building className="h-4 w-4 inline mr-1.5" />{job.company}</span>
                                  <span><MapPin className="h-4 w-4 inline mr-1.5" />{job.location}</span>
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
                 <div className="scroll-container">
                    {associations.map((user) => (
                      <div key={user.id} className="logo-card">
                           <div className="logo-icon"><Handshake /></div>
                           <div className="logo-name">{user.name}</div>
                           <Link href={`/profile/${user.id}`} className='view-all text-sm'>View Profile</Link>
                      </div>
                    ))}
                     {colleges.map((user) => (
                      <div key={user.id} className="logo-card">
                           <div className="logo-icon"><University /></div>
                           <div className="logo-name">{user.name}</div>
                           <Link href={`/profile/${user.id}`} className='view-all text-sm'>View Profile</Link>
                      </div>
                    ))}
                  </div>
              </section>

              <section>
                <div className="section-header">
                  <h2 className="section-title">Featured Clinics</h2>
                   {clinicsAndOpticals.length > 0 && <Link href="/directory/clinics" className="view-all">View All <ArrowRight className="inline h-4 w-4" /></Link>}
                </div>
                {clinicsAndOpticals.length > 0 ? (
                    <div className="scroll-container">
                        {clinicsAndOpticals.map((user) => (
                            <ProfileCard user={user} key={user.id} />
                        ))}
                    </div>
                ) : (
                    <EmptyStateCTA
                        title="No Clinics Found"
                        ctaText="Add Your Practice"
                        ctaLink="/membership"
                        icon={<Hospital className="h-12 w-12" />}
                    />
                )}
              </section>
          </main>
        </div>
  );
}
