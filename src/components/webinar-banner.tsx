
'use client';

import type { Webinar } from '@/lib/academy';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Ticket, XCircle, Calendar, Clock, Video, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WebinarTime } from './webinar-time';

interface WebinarBannerProps {
  webinar: Webinar;
  className?: string;
  variant?: 'default' | 'card';
}

export function WebinarBanner({ webinar, className, variant = 'default' }: WebinarBannerProps) {
  const isCard = variant === 'card';
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const webinarDate = new Date(webinar.dateTime);
    const now = new Date();
    setIsPast(webinarDate.getTime() < now.getTime());
  }, [webinar.dateTime]);

  if (isCard) {
    return (
      <div className={cn("relative w-full h-full bg-gradient-to-br from-cyan-800 to-blue-900 text-white overflow-hidden rounded-lg p-4 flex flex-col justify-between", className)}>
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl opacity-80"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl opacity-80"></div>
        
        <div className="absolute top-4 left-4 z-20">
          <Badge variant={isPast ? "destructive" : "secondary"} className={cn("bg-white/80 backdrop-blur-sm flex items-center gap-1.5 py-1 px-2.5 text-sm", isPast ? 'bg-red-100/80 text-red-900' : 'bg-green-100/80 text-green-900')}>
            {isPast ? <XCircle className="h-4 w-4" /> : <Ticket className="h-4 w-4" />}
            {isPast ? 'Registration Closed' : 'Registration Open'}
          </Badge>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between pt-8">
            <div>
              <h2 className="font-bold leading-tight text-lg">
                  {webinar.title}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-sm pt-3 mt-3">
              <Avatar className="w-8 h-8 border-2 border-white/20">
                  <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} />
                  <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                  <p className="font-bold">{webinar.speaker.name}</p>
                  <p className="text-white/70 text-xs">{webinar.speaker.title}</p>
              </div>
            </div>
        </div>
      </div>
    );
  }

  // Default, detailed banner for the webinar page
  return (
     <div className={cn("relative w-full h-full bg-gradient-to-br from-cyan-800 to-blue-900 text-white overflow-hidden rounded-lg p-8 flex flex-col justify-between", className)}>
      <div className="absolute inset-0 -translate-x-1/4 -translate-y-1/4 w-[150%] h-[150%] rounded-full bg-blue-500/20 blur-3xl opacity-60"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 h-full">
         <div className="flex-shrink-0 mx-auto md:mx-0">
             <Avatar className="h-40 w-40 border-4 border-white/30 shadow-lg">
                <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} />
                <AvatarFallback className="text-6xl">{webinar.speaker.name.charAt(0)}</AvatarFallback>
            </Avatar>
         </div>
         <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-4xl font-bold font-headline leading-tight mb-4">
              {webinar.title}
            </h1>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-cyan-300" />
                    <span><WebinarTime dateTime={webinar.dateTime} format={{ dateOnly: true }} /></span>
                </div>
                 <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-cyan-300" />
                    <span><WebinarTime dateTime={webinar.dateTime} format={{ timeOnly: true }} /></span>
                </div>
                 <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-cyan-300" />
                    <span>{webinar.platform}</span>
                </div>
                 <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-cyan-300" />
                    <span>Hosted by {webinar.host.name}</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
