
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Building, Hospital, Users, Factory, Microscope, BookOpen, Stethoscope, Handshake } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categoryLinks = [
    { name: 'Students', icon: <GraduationCap className="h-8 w-8 text-primary" />, href: '/directory/students', description: 'Find the next generation of talent.' },
    { name: 'Professionals', icon: <Stethoscope className="h-8 w-8 text-primary" />, href: '/directory/professionals', description: 'Connect with experienced ODs, MDs, and Opticians.' },
    { name: 'Associations', icon: <Handshake className="h-8 w-8 text-primary" />, href: '/directory/associations', description: 'Explore leading professional organizations.' },
    { name: 'Colleges & Schools', icon: <BookOpen className="h-8 w-8 text-primary" />, href: '/directory/colleges', description: 'Discover top-tier educational institutions.' },
    { name: 'Clinics & Opticals', icon: <Hospital className="h-8 w-8 text-primary" />, href: '/directory/clinics', description: 'Find top-rated practices and eye care centers.' },
    { name: 'Industry Partners', icon: <Factory className="h-8 w-8 text-primary" />, href: '/directory/industry', description: 'Connect with industry leaders and innovators.' },
];

export default function DirectoryPage() {
  const router = useRouter();

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-headline mb-2">FocusLinks Directory</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore the global eye care community. Find colleagues, mentors, and partners across every specialty.</p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryLinks.map(link => (
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
      </div>
    </div>
  );
}
