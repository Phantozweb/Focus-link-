
'use client';

import { useState, useEffect } from 'react';
import { allUsers } from '@/lib/data/index';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight, Briefcase, GraduationCap, Building, Hospital, Users, Factory, Microscope, BookOpen, Stethoscope, Handshake, UserPlus } from 'lucide-react';
import type { UserProfile } from '@/types';
import { Card } from '@/components/ui/card';

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
  const [shuffledProfessionals, setShuffledProfessionals] = useState<UserProfile[]>([]);
  const [shuffledAssociations, setShuffledAssociations] = useState<UserProfile[]>([]);
  const [shuffledColleges, setShuffledColleges] = useState<UserProfile[]>([]);
  const [shuffledClinics, setShuffledClinics] = useState<UserProfile[]>([]);
  const [shuffledStudents, setShuffledStudents] = useState<UserProfile[]>([]);
  const [shuffledIndustry, setShuffledIndustry] = useState<UserProfile[]>([]);

  useEffect(() => {
    // Filter and shuffle data on the client side to avoid hydration errors
    setShuffledProfessionals(shuffleArray([...allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type))]));
    setShuffledAssociations(shuffleArray([...allUsers.filter(u => u.type === 'Association')]));
    setShuffledColleges(shuffleArray([...allUsers.filter(u => u.type === 'College')]));
    setShuffledClinics(shuffleArray([...allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type))]));
    setShuffledStudents(shuffleArray([...allUsers.filter(u => u.type === 'Student')]));
    setShuffledIndustry(shuffleArray([...allUsers.filter(u => u.type === 'Industry')]));
  }, []);
  
  const professionals = allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'].includes(u.type));
  const associations = allUsers.filter(u => u.type === 'Association');
  const colleges = allUsers.filter(u => u.type === 'College');
  const clinicsAndOpticals = allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type));
  const students = allUsers.filter(u => u.type === 'Student');
  const industry = allUsers.filter(u => u.type === 'Industry');
  
  const displayStudents = shuffledStudents.length > 0 ? shuffledStudents : students;
  const displayProfessionals = shuffledProfessionals.length > 0 ? shuffledProfessionals : professionals;
  const displayColleges = shuffledColleges.length > 0 ? shuffledColleges : colleges;
  const displayAssociations = shuffledAssociations.length > 0 ? shuffledAssociations : associations;
  const displayIndustry = shuffledIndustry.length > 0 ? shuffledIndustry : industry;
  const displayClinics = shuffledClinics.length > 0 ? shuffledClinics : clinicsAndOpticals;

  return (
    <div className="bg-brand-bg">
       <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Focus Links Directory</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          Explore the global eye care community. Find colleagues, mentors, and partners across every specialty.
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 space-y-16">
        
         {students.length > 0 && <section>
            <div className="section-header">
              <h2 className="section-title">Featured Students</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/students">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {displayStudents.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>}
          
          {professionals.length > 0 && <section>
            <div className="section-header">
              <h2 className="section-title">Featured Professionals</h2>
              <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/professionals">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {displayProfessionals.map((user) => (
                  <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
                    <ProfileCard user={user} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>}
          
          <section>
            <div className="section-header">
              <h2 className="section-title">Featured Colleges & Schools</h2>
              {colleges.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/colleges">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {colleges.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {displayColleges.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
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
            <div className="section-header">
              <h2 className="section-title">Featured Associations</h2>
              {associations.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/associations">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {associations.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent>
                        {displayAssociations.map((user) => (
                        <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
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
            <div className="section-header">
              <h2 className="section-title">Featured Industry Partners</h2>
              {industry.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/industry">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {industry.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {displayIndustry.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
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
            <div className="section-header">
              <h2 className="section-title">Featured Clinics & Opticals</h2>
              {clinicsAndOpticals.length > 0 && <Button asChild variant="link" className="text-primary pr-0">
                <Link href="/directory/clinics">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>}
            </div>
            {clinicsAndOpticals.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {displayClinics.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3">
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
      </main>
    </div>
  );
}
