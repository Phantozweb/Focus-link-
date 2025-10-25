
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Handshake, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const institutionLinks = [
    { name: 'Colleges & Schools', icon: <BookOpen className="h-8 w-8 text-primary" />, href: '/directory/colleges', description: 'Discover top-tier educational institutions.' },
    { name: 'Associations', icon: <Handshake className="h-8 w-8 text-primary" />, href: '/directory/associations', description: 'Explore leading professional organizations.' },
];

export default function InstitutionsDirectoryPage() {
  const router = useRouter();

  return (
    <div className="bg-muted/40">
       <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <Building className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Institutions Directory</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Find and connect with the leading educational and professional institutions in the eye care industry.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutionLinks.map(link => (
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
