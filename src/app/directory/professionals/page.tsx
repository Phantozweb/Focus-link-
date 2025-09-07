
'use client';

import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight, Briefcase, GraduationCap, Building, Hospital, Users, Factory, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

const professionalCategories = [
    { name: 'Optometrists', icon: <Briefcase className="h-8 w-8 text-primary" />, href: '/directory/professionals/optometrists', description: 'Find licensed Doctors of Optometry.' },
    { name: 'Academics', icon: <GraduationCap className="h-8 w-8 text-primary" />, href: '/directory/professionals/academics', description: 'Connect with educators and lecturers.' },
    { name: 'Researchers', icon: <Search className="h-8 w-8 text-primary" />, href: '/directory/professionals/researchers', description: 'Discover experts in vision science.' },
]


export default function ProfessionalsPage() {
  const router = useRouter();
  const optometrists = allUsers.filter(u => u.type === 'Optometrist').slice(0, 6);
  const academics = allUsers.filter(u => u.type === 'Academic').slice(0, 6);
  const researchers = allUsers.filter(u => u.type === 'Researcher').slice(0, 6);

  return (
    <div className="bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-16">
            <section className="text-center">
              <h1 className="text-4xl font-bold font-headline mb-2">Eye Care Professionals</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Browse our directory of Optometrists, Academics, and Researchers.</p>
            </section>
        
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {professionalCategories.map(link => (
                      <Link href={link.href} key={link.name} className="block group">
                          <Card className="flex flex-col items-center justify-center p-8 bg-card rounded-lg shadow-sm border border-border hover:shadow-xl hover:border-primary transition-all duration-300 h-full text-center">
                              <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                                  {link.icon}
                              </div>
                              <h3 className="mt-3 font-semibold text-xl text-card-foreground">{link.name}</h3>
                              <p className="text-muted-foreground text-sm mt-1">{link.description}</p>
                          </Card>
                      </Link>
                  ))}
              </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-8">
                <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Optometrists</h2>
                <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/directory/professionals/optometrists">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {optometrists.map((user) => (
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
                <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Academics</h2>
                <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/directory/professionals/academics">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {academics.map((user) => (
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
                <h2 className="text-slate-800 text-3xl font-bold font-headline">Featured Researchers</h2>
                <Button asChild variant="link" className="text-primary pr-0">
                    <Link href="/directory/professionals/researchers">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                </div>
                <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {researchers.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <ProfileCard user={user} />
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
