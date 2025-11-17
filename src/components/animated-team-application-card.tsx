'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Globe, Award, Handshake, Calendar, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

const volunteerRoles = [
  {
    icon: <Globe className="h-6 w-6 text-indigo-400" />,
    title: 'Regional & National Leaders',
    description: 'Shape strategy and build partnerships in your region.',
  },
  {
    icon: <Calendar className="h-6 w-6 text-rose-400" />,
    title: 'Event Coordinators',
    description: 'Organize webinars and global quiz competitions.',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-amber-500" />,
    title: 'Job Board Curators',
    description: 'Source and verify high-quality clinical job opportunities.',
  },
];

export function AnimatedTeamApplicationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % volunteerRoles.length);
    }, 4000); // Change item every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentRole = volunteerRoles[currentIndex];

  return (
    <div className="relative rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg bg-indigo-600 border border-indigo-500 overflow-hidden h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_100%_200px,#a29bfe_25%,transparent_50%)] opacity-30"></div>
        <div className="relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl mb-2 text-white flex items-center gap-2">
                <Handshake />
                Join Our Global Team
            </h3>
            <p className="text-indigo-200 text-sm sm:text-base">Help us build the world's largest digital community for eye care. We are looking for passionate volunteers.</p>

            <div className="relative h-28 mt-4">
                 {volunteerRoles.map((role, index) => (
                    <div
                        key={role.title}
                        className={cn(
                            "absolute w-full transition-all duration-500 ease-in-out",
                            index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                        )}
                    >
                         <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                             <div className="p-4 flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    {role.icon}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-white">{role.title}</h4>
                                    <p className="text-sm text-indigo-200">{role.description}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-auto pt-4 relative z-10">
            <Button asChild className="w-full bg-white text-indigo-600 hover:bg-indigo-100">
                <Link href="/team-application">
                    View Open Roles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </div>
  );
}
