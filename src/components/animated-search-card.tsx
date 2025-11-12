'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const searchProfiles = [
  { name: 'Mohd Tahseen Raza Khan', title: 'Speciality Contact Lens Practitioner', avatar: 'https://i.ibb.co/XrNB2vVJ/5-S9-A8865-2.jpg' },
  { name: 'Rudra Kumar Sinha', title: 'Optometry Intern | B.Optometry Student', avatar: 'https://i.ibb.co/v6XJ3B7X/1747244504223.jpg' },
  { name: 'Shivashangari M', title: 'Masters in Optometry | Contact Lens Specialist', avatar: '' },
  { name: 'Harini L', title: 'Aspiring Optometrist | Patient-Focused Diagnostics', avatar: 'https://i.ibb.co/wNrCZ5SW/1000245623.jpg' },
];

export function AnimatedSearchCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingDelay, setTypingDelay] = useState(100);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const currentProfile = searchProfiles[currentIndex];
    const fullName = currentProfile.name;

    const handleTyping = () => {
      if (isDeleting) {
        setShowResult(false);
        if (displayedName.length > 0) {
          setDisplayedName((prev) => prev.slice(0, -1));
          setTypingDelay(50);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % searchProfiles.length);
          setTypingDelay(100);
        }
      } else {
        if (displayedName.length < fullName.length) {
          setDisplayedName((prev) => fullName.slice(0, prev.length + 1));
          setTypingDelay(100);
        } else {
          setShowResult(true);
          setTypingDelay(2000); 
          setIsDeleting(true);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingDelay);
    return () => clearTimeout(timeout);
  }, [displayedName, isDeleting, currentIndex, typingDelay]);
  
  const currentProfileData = searchProfiles[currentIndex];

  return (
     <div className="rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg h-full bg-white border overflow-hidden">
        <div className="relative">
            <h3 className="font-bold text-xl sm:text-2xl mb-2 text-slate-800 flex items-center gap-2">
                <Sparkles className="text-amber-500 animate-pulse" />
                Rank Higher on Google. Get Seen.
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">An SEO-friendly profile helps you rank higher in searches, making you visible to peers and employers worldwide.</p>

            <div className="mt-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-slate-400" />
                    <p className="text-slate-800 text-sm font-mono h-5">{displayedName}<span className="animate-pulse">|</span></p>
                </div>
            </div>
            
            <div className="relative h-[84px] mt-2">
                 <div 
                    className={cn(
                        "absolute inset-0 p-3 bg-white rounded-lg transition-opacity duration-500",
                        showResult ? "opacity-100" : "opacity-0"
                    )}
                 >
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 text-xs font-bold">FL</div>
                        <div className="flex flex-col">
                            <span className="text-slate-600 text-xs">focuslinks.pro/profile</span>
                            <span className="text-blue-600 text-base leading-tight hover:underline cursor-pointer">{currentProfileData.name} | Focus Links</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        Connect with {currentProfileData.name}, a skilled {currentProfileData.title} on Focus Links, the global eye care community...
                    </p>
                </div>
                 <div
                    className={cn(
                        "absolute inset-0 p-3 space-y-2 transition-opacity duration-300",
                        showResult ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6">
            <Button asChild className="w-full">
                <Link href="/profile/create">
                    Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </div>
  );
}
