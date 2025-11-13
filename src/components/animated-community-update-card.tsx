
'use client';

import { useState, useEffect } from 'react';
import { Briefcase, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

const communityUpdates = [
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: 'Explore the Job Board',
    description: 'Discover your next career opportunity.',
    href: '/jobs'
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-indigo-500" />,
    title: 'Discuss Clinical Cases',
    description: 'Share insights in the Case Forum.',
    href: '/forum'
  }
];

export function AnimatedCommunityUpdateCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % communityUpdates.length);
        setIsAnimating(false);
      }, 500); // This should match the animation duration
    }, 4000); // Change item every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentUpdate = communityUpdates[currentIndex];

  return (
    <div className="relative rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg bg-slate-800 border border-slate-700 overflow-hidden h-full">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>

        <div>
            <h3 className="font-bold text-xl sm:text-2xl mb-2 text-white">
                Community Update!
            </h3>
            <p className="text-slate-300 text-sm sm:text-base">The Job Board and Case Forum are now open to all members. Start exploring and contributing today.</p>

            <div className="relative h-24 mt-4">
                 {communityUpdates.map((update, index) => (
                    <div
                        key={update.title}
                        className={cn(
                            "absolute w-full transition-all duration-500 ease-in-out",
                            index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                        )}
                    >
                         <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700">
                             <div className="p-4 flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    {update.icon}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-white">{update.title}</h4>
                                    <p className="text-sm text-slate-400">{update.description}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto" variant="secondary">
                <Link href={currentUpdate.href}>
                    {currentUpdate.title.includes('Job') ? 'Find a Job' : 'View Cases'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </div>
  );
}
