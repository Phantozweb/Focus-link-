
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Briefcase, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const AnimatedItem = ({ icon, label, className }: { icon: React.ReactNode, label: string, className?: string }) => (
  <div className={cn("absolute top-0 flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 transition-all duration-500", className)}>
    {icon}
    <span className="font-semibold text-white">{label}</span>
  </div>
);

export function AnimatedAnnouncementCard() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-xl p-8 flex flex-col justify-between shadow-xl flex-grow h-full bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
        <div className="relative z-10">
            <h3 className="font-bold text-2xl mb-2 text-white">Community Update!</h3>
            <p className="text-white/80">The Job Board and Case Forum are now open to all members. Start exploring and contributing today.</p>
        </div>
        
        <div className="relative z-10 h-24 flex items-center">
            <AnimatedItem 
                icon={<Briefcase className="h-6 w-6 text-white" />} 
                label="Explore Job Board" 
                className={cn(visibleIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4")} 
            />
            <AnimatedItem 
                icon={<MessageSquare className="h-6 w-6 text-white" />} 
                label="Discuss Cases" 
                className={cn(visibleIndex === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}
            />
        </div>

        <div className="relative z-10 mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors">
              <Link href="/jobs">
                Find a Job <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:bg-white/20 hover:text-white transition-colors">
              <Link href="/forum">
                View Cases
              </Link>
            </Button>
        </div>
    </div>
  );
}
