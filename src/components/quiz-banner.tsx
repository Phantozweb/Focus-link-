
'use client';

import type { Webinar } from '@/lib/academy';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { XCircle, Calendar, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface QuizBannerProps {
  webinar: Webinar;
  className?: string;
  variant?: 'default' | 'card';
}

export function QuizBanner({ webinar, className, variant = 'default' }: QuizBannerProps) {
  const [status, setStatus] = useState<'UPCOMING' | 'LIVE' | 'ENDED'>('UPCOMING');

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

    return (
     <div className="absolute top-4 left-4 z-20">
      <Badge variant="secondary" className={cn("bg-white/80 backdrop-blur-sm flex items-center gap-1.5 py-1 px-2.5 text-sm", 'bg-blue-100/80 text-blue-900')}>
        <Calendar className="h-4 w-4" />
        Upcoming Quiz
      </Badge>
    </div>
    );
  };

  const imageClassName = variant === 'card' ? 'rounded-t-lg' : '';

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className, variant === 'card' ? 'rounded-t-lg' : '')}>
      <Image 
        src="https://i.ibb.co/wrSQqJHs/1761374303057-019a1a16-ca7a-7521-a225-6359d53e17ba.png" 
        alt="Eye Q Arena Banner" 
        layout="fill" 
        objectFit="cover" 
        objectPosition="center 15%" 
        className={imageClassName} 
      />
      <StatusBadge />
    </div>
  );
}
