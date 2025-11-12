
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

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
  const [typingDelay, setTypingDelay] = useState(150);

  useEffect(() => {
    const currentProfile = searchProfiles[currentIndex];
    const fullName = currentProfile.name;

    const handleTyping = () => {
      if (isDeleting) {
        if (displayedName.length > 0) {
          setDisplayedName((prev) => prev.slice(0, -1));
          setTypingDelay(80);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % searchProfiles.length);
          setTypingDelay(150);
        }
      } else {
        if (displayedName.length < fullName.length) {
          setDisplayedName((prev) => fullName.slice(0, prev.length + 1));
          setTypingDelay(150);
        } else {
          setTypingDelay(2000); // Pause before deleting
          setIsDeleting(true);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingDelay);
    return () => clearTimeout(timeout);
  }, [displayedName, isDeleting, currentIndex, typingDelay]);
  
  const currentProfileData = searchProfiles[currentIndex];

  return (
     <div className="rounded-xl p-8 flex flex-col justify-between shadow-xl h-80 bg-gradient-to-br from-slate-800 to-gray-900 overflow-hidden">
        <div className="relative">
            <h3 className="font-bold text-2xl mb-2 text-white flex items-center gap-2"><Sparkles className="text-amber-400" /> Get Discovered on Google</h3>
            <p className="text-white/80">An SEO-friendly profile helps you rank higher in searches, making you visible to peers and employers worldwide.</p>

            <div className="mt-4 bg-slate-700/50 backdrop-blur-sm p-2 rounded-lg border border-slate-600">
                <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-slate-400" />
                    <p className="text-white/90 text-sm font-mono h-5">{displayedName}<span className="animate-pulse">|</span></p>
                </div>
            </div>
            
            <div className="relative h-20 mt-2">
                 <div key={currentIndex} className="absolute inset-0 flex items-center p-3 bg-slate-700/30 rounded-lg animate-fade-in-out">
                    <Avatar className="h-10 w-10 border-2 border-slate-500">
                        <AvatarImage src={currentProfileData.avatar} />
                        <AvatarFallback>{currentProfileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                        <p className="font-semibold text-white text-sm">{currentProfileData.name}</p>
                        <p className="text-xs text-slate-400">{currentProfileData.title}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6">
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors">
                <Link href="/profile/create">
                Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </div>
  );
}
