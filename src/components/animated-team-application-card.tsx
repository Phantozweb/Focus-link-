'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Globe, Award, Handshake, Calendar, Briefcase, Code, BrainCircuit, Users } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

const volunteerRoles = [
  {
    icon: <Globe className="h-6 w-6 text-indigo-300" />,
    title: 'Regional & National Leaders',
    description: 'Lead strategy and build partnerships in your region.',
  },
  {
    icon: <Calendar className="h-6 w-6 text-rose-300" />,
    title: 'Event Coordinators',
    description: 'Organize webinars and global competitions.',
  },
   {
    icon: <BrainCircuit className="h-6 w-6 text-amber-300" />,
    title: 'Content & AI Developers',
    description: 'Contribute to our AI tools and clinical content.',
  },
  {
    icon: <Users className="h-6 w-6 text-emerald-300" />,
    title: 'Community Managers',
    description: 'Engage and support our growing member base.',
  },
];

export function AnimatedTeamApplicationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % volunteerRoles.length);
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg bg-slate-900 border border-slate-800 overflow-hidden h-full">
        <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_20%,transparent_90%)]"></div>
        <div className="relative z-10">
            <h3 className="font-bold text-xl sm:text-2xl mb-2 text-white flex items-center gap-2">
                <Handshake />
                Build the Future of Eye Care
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">We are a volunteer-driven community. Join our global team to lead, innovate, and connect the world of vision.</p>

            <div className="relative h-20 mt-6">
                {volunteerRoles.map((role, index) => (
                    <div 
                        key={index} 
                        className={cn(
                            "absolute w-full transition-all duration-500 ease-in-out",
                            index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                        )}
                    >
                         <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                {role.icon}
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-white">{role.title}</h4>
                                <p className="text-sm text-slate-400">
                                  {role.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-auto pt-6 relative z-10">
            <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-200">
                <Link href="/team-application">
                    View All Open Roles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </div>
  );
}
