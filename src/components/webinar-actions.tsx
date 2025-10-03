
'use client';

import { useState, useEffect } from 'react';
import type { Webinar } from '@/lib/academy';
import { Button } from '@/components/ui/button';
import { PlayCircle, Ticket, Calendar, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface WebinarActionsProps {
    webinar: Webinar;
}

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center p-2 bg-slate-100 rounded-md w-20">
    <span className="text-3xl font-bold text-slate-800 tracking-tight">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-muted-foreground uppercase">{label}</span>
  </div>
);

export function WebinarActions({ webinar }: WebinarActionsProps) {
    const [status, setStatus] = useState<'UPCOMING' | 'LIVE' | 'ENDED'>('UPCOMING');
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const calculateState = () => {
            const now = new Date().getTime();
            const webinarStartTime = new Date(webinar.dateTime).getTime();
            // End time is start time + duration + 3 hours grace period
            const durationParts = webinar.duration.split(' ');
            const durationValue = parseInt(durationParts[0], 10);
            const webinarEndTime = webinarStartTime + (durationValue * 60 * 1000) + (3 * 60 * 60 * 1000);

            if (now < webinarStartTime) {
                setStatus('UPCOMING');
                const difference = webinarStartTime - now;
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else if (now >= webinarStartTime && now < webinarEndTime) {
                setStatus('LIVE');
            } else {
                setStatus('ENDED');
            }
        };

        calculateState();
        const timer = setInterval(calculateState, 1000);

        return () => clearInterval(timer);
    }, [webinar.dateTime, webinar.duration]);

    const renderButton = () => {
        switch (status) {
            case 'UPCOMING':
                return (
                    <Button size="lg" className="w-full text-lg py-6">
                        <Ticket className="mr-2 h-6 w-6" />
                        Register Now
                    </Button>
                );
            case 'LIVE':
                 return (
                    <Button size="lg" className="w-full text-lg py-6 animate-pulse">
                        <PlayCircle className="mr-2 h-6 w-6" />
                        Join Live Session
                    </Button>
                );
            case 'ENDED':
                 return (
                    <Button size="lg" className="w-full text-lg py-6" variant="secondary" disabled>
                        Session Ended
                    </Button>
                );
        }
    };

    return (
        <div className="p-6 rounded-lg bg-slate-50 border h-full flex flex-col justify-center">
            <div className="space-y-4">
                {status === 'UPCOMING' && (
                    <div className="text-center">
                        <h3 className="font-semibold text-slate-700 mb-3">Event Starts In</h3>
                        <div className="flex justify-center gap-2">
                            <CountdownUnit value={timeLeft.days} label="Days" />
                            <CountdownUnit value={timeLeft.hours} label="Hours" />
                            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                        </div>
                    </div>
                )}
                
                {renderButton()}
            </div>
        </div>
    );
}
