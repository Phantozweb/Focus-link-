
'use client';

import type { Webinar } from '@/lib/academy';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Ticket, XCircle, Calendar, Clock, Video, User, Radio, Users, Tv, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WebinarTime } from './webinar-time';
import Image from 'next/image';
import { QuizBanner } from './quiz-banner';

interface WebinarBannerProps {
  webinar: Webinar;
  className?: string;
  variant?: 'default' | 'card';
}

export function WebinarBanner({ webinar, className, variant = 'default' }: WebinarBannerProps) {
  const isCard = variant === 'card';
  const [status, setStatus] = useState<'UPCOMING' | 'LIVE' | 'ENDED'>('UPCOMING');
  const isQuiz = webinar.id === 'eye-q-arena-2025';

  useEffect(() => {
    const calculateState = () => {
        const now = new Date().getTime();
        const webinarStartTime = new Date(webinar.dateTime).getTime();
        const durationParts = webinar.duration.split(' ');
        const durationValue = parseInt(durationParts[0], 10);
        const webinarEndTime = webinarStartTime + (durationValue * 60 * 60 * 1000) * (webinar.id === 'eye-q-arena-2025' ? 24 * 11 : 1);

        if (now < webinarStartTime) {
            setStatus('UPCOMING');
        } else if (now >= webinarStartTime && now < webinarEndTime) {
            setStatus('LIVE');
        } else {
            setStatus('ENDED');
        }
    };

    calculateState();
    const timer = setInterval(calculateState, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, [webinar.dateTime, webinar.duration, webinar.id]);
  
  const StatusBadge = () => {
    if (status === 'LIVE') {
        return (
            <div className="absolute top-4 left-4 z-20">
                <Badge className={cn("bg-red-500/80 backdrop-blur-sm flex items-center gap-1.5 py-1 px-2.5 text-sm text-white")}>
                    <Radio className="h-4 w-4" /> Live
                </Badge>
            </div>
        );
    }
    
    if (status === 'ENDED') {
        return (
            <div className="absolute top-4 left-4 z-20">
                <Badge variant="destructive" className={cn("bg-red-100/80 backdrop-blur-sm flex items-center gap-1.5 py-1 px-2.5 text-sm text-red-900")}>
                    <XCircle className="h-4 w-4" />
                    Event Ended
                </Badge>
            </div>
        );
    }

    // UPCOMING
    const badgeText = isQuiz ? 'Upcoming Quiz' : 'Upcoming Webinar';
    return (
     <div className="absolute top-4 left-4 z-20">
      <Badge variant="secondary" className={cn("bg-white/80 backdrop-blur-sm flex items-center gap-1.5 py-1 px-2.5 text-sm", 'bg-blue-100/80 text-blue-900')}>
        <Calendar className="h-4 w-4" />
        {badgeText}
      </Badge>
    </div>
    );
  };


  if (isQuiz) {
    if (variant === 'card') {
      return <QuizBanner webinar={webinar} className={className} variant={variant} />;
    }
    // Detailed quiz banner for detail page
    return (
      <div className={cn("relative w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 text-white overflow-hidden p-6 md:p-8 flex flex-col justify-between", className)}>
        <div className="absolute inset-0 -translate-x-1/4 -translate-y-1/4 w-[150%] h-[150%] rounded-full bg-orange-500/20 blur-3xl opacity-60"></div>
        <StatusBadge />
        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 h-full items-center">
           <div className="flex-shrink-0 mx-auto md:mx-0">
               <div className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border-4 border-white/30 shadow-lg flex items-center justify-center bg-white/20">
                  <Trophy className="h-12 w-12 md:h-16 md:w-16 text-white" />
               </div>
           </div>
           <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-headline leading-tight mb-4">
                {webinar.title}
              </h1>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-200 flex-shrink-0" />
                      <span>November 2 - 12, 2025</span>
                  </div>
                   <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-200 flex-shrink-0" />
                      <span>{webinar.duration}</span>
                  </div>
                   <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-200 flex-shrink-0" />
                      <span>Organized by {webinar.speaker.name}</span>
                  </div>
                   <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4 text-amber-200 flex-shrink-0" />
                      <span>Hosted by {webinar.host.name}</span>
                  </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Default, detailed banner for the webinar page
  return (
     <div className={cn("relative w-full h-full bg-gradient-to-br from-cyan-800 to-blue-900 text-white overflow-hidden p-6 md:p-8 flex flex-col justify-between", className)}>
      <div className="absolute inset-0 -translate-x-1/4 -translate-y-1/4 w-[150%] h-[150%] rounded-full bg-blue-500/20 blur-3xl opacity-60"></div>
      
       <StatusBadge />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 h-full items-center">
         <div className="flex-shrink-0 mx-auto md:mx-0">
             <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white/30 shadow-lg">
                <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} />
                <AvatarFallback className="text-5xl md:text-6xl">{webinar.speaker.name.charAt(0)}</AvatarFallback>
            </Avatar>
         </div>
         <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold font-headline leading-tight mb-4">
              {webinar.title}
            </h1>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <span><WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} /></span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <span><WebinarTime dateTime={webinar.dateTime} format={{ timeOnly: true }} /></span>
                </div>
                 <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <span>Organized by {webinar.speaker.name}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Tv className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <span>Hosted by {webinar.host.name}</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
