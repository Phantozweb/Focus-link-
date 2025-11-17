
'use client';

import { allUsers } from '@/lib/data/index';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight, Briefcase, GraduationCap, Building, Hospital, Users, Factory, Microscope, BookOpen, Stethoscope, Handshake, UserPlus } from 'lucide-react';
import type { UserProfile } from '@/types';
import { Card } from '@/components/ui/card';

const EmptyStateCTA = ({ title, ctaText, ctaLink, icon }: { title: string, ctaText: string, ctaLink: string, icon: React.ReactNode }) => (
    <div className="text-center p-8 bg-card rounded-lg shadow-sm border-2 border-dashed flex flex-col items-center justify-center h-full min-h-[250px]">
        <div className="mb-4 text-muted-foreground">{icon}</div>
        <h3 className="font-semibold text-xl text-card-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">Be the first to represent your category.</p>
        <Button asChild>
            <Link href={ctaLink}>{ctaText}</Link>
        </Button>
    </div>
);

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

export default function DirectoryPage() {
  const professionals = shuffleArray([...allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type))]);
  const associations = shuffleArray([...allUsers.filter(u => u.type === 'Association')]);
  const colleges = shuffleArray([...allUsers.filter(u => u.type === 'College')]);
  const clinicsAndOpticals = shuffleArray([...allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type))]);
  const students = shuffleArray([...allUsers.filter(u => u.type === 'Student')]);
  const industry = shuffleArray([...allUsers.filter(u => u.type === 'Industry')]);

  return (
    <div className="bg-muted/40">
       <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Focus Links Directory</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Explore the global eye care community. Find colleagues, mentors, and partners across every specialty.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
        
         {students.length > 0 && <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Students</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/students">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {students.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>}
          
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
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4 flex flex-col">
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
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Colleges & Schools</h2>
              {colleges.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/colleges">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {colleges.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
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
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Associations</h2>
              {associations.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/associations">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {associations.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
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
              <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Industry Partners</h2>
              {industry.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/industry">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {industry.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
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
                <Carousel opts={{ align: "start" }} className="w-full">
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
