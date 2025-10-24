
'use client';

import { useState, useEffect } from 'react';
import type { Webinar } from '@/lib/academy';
import { Button } from '@/components/ui/button';
import { PlayCircle, Ticket, Calendar, Clock, Info, XCircle, CheckCircle, UserPlus, Users, Trophy } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';

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
    const [status, setStatus] = useState<'UPCOMING' | 'REGISTRATION_CLOSED' | 'LIVE' | 'ENDED'>('UPCOMING');
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [showCertificateInfo, setShowCertificateInfo] = useState(false);
    const isQuiz = webinar.id === 'quiz-event-1';

    useEffect(() => {
        const calculateState = () => {
            const now = new Date().getTime();
            const webinarStartTime = new Date(webinar.dateTime).getTime();
            const registrationCloseTime = webinarStartTime - (2 * 60 * 60 * 1000); // 2 hours before start
            const durationParts = webinar.duration.split(' ');
            const durationValue = parseInt(durationParts[0], 10);
            const webinarEndTime = webinarStartTime + (durationValue * 60 * 1000);
            const liveGracePeriod = webinarEndTime + (3 * 60 * 60 * 1000); // 3-hour grace period for LIVE status
            const certificateDeadline = webinarEndTime + (7 * 24 * 60 * 60 * 1000); // 7 days after event end

            if (now < webinarStartTime) {
                if (now < registrationCloseTime || isQuiz) {
                    setStatus('UPCOMING');
                } else {
                    setStatus('REGISTRATION_CLOSED');
                }
                const difference = webinarStartTime - now;
                 setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else if (now >= webinarStartTime && now < liveGracePeriod) {
                setStatus('LIVE');
            } else {
                setStatus('ENDED');
                if (now < certificateDeadline) {
                    setShowCertificateInfo(true);
                } else {
                    setShowCertificateInfo(false);
                }
            }
        };

        calculateState();
        const timer = setInterval(calculateState, 1000);

        return () => clearInterval(timer);
    }, [webinar.dateTime, webinar.duration, isQuiz]);

    const handleRegister = () => {
        setIsRegistered(true);
    };

    const renderContent = () => {
         if (isRegistered && !isQuiz && (status === 'UPCOMING' || status === 'REGISTRATION_CLOSED')) {
             return (
                 <div className="text-center p-4 bg-green-50 border-green-200 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-bold text-green-800">You're Registered!</h3>
                    <p className="text-sm text-green-700 mt-1">Please wait patiently. Our team will send the meeting link to your registered email address one hour before the session begins. While you wait, feel free to <a href="https://www.linkedin.com/company/focus-links" target="_blank" rel="noopener noreferrer" className="font-bold underline">connect with us on LinkedIn</a>! If you do not receive the link, please contact us.</p>
                </div>
            )
        }
        
        switch (status) {
            case 'UPCOMING':
                return (
                    <>
                        <div className="text-center">
                            <h3 className="font-semibold text-slate-700 mb-3">Event Starts In</h3>
                            <div className="flex justify-center gap-2">
                                <CountdownUnit value={timeLeft.days} label="Days" />
                                <CountdownUnit value={timeLeft.hours} label="Hours" />
                                <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                            </div>
                        </div>
                        {isQuiz ? (
                             <div className='space-y-3'>
                                <Button size="lg" className="w-full text-lg py-6" asChild>
                                  <Link href={`/academy/quiz/${webinar.id}`}>
                                      <Trophy className="mr-2 h-6 w-6" />
                                      Enter Arena
                                  </Link>
                                </Button>
                             </div>
                        ) : (
                          <>
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
                              <p className="font-bold text-primary flex items-center justify-center gap-2"><Users className="h-5 w-5" /> 100+ People Registered!</p>
                            </div>
                            <div className='space-y-3'>
                                <Button size="lg" className="w-full text-lg py-6" asChild>
                                    <a href={webinar.registrationLink} target="_blank" rel="noopener noreferrer" onClick={handleRegister}>
                                        <Ticket className="mr-2 h-6 w-6" />
                                        Register Now
                                    </a>
                                </Button>
                                <Button size="lg" variant="outline" className="w-full" asChild>
                                    <Link href="/membership">
                                        <UserPlus className="mr-2 h-5 w-5" />
                                        Become a Member
                                    </Link>
                                </Button>
                            </div>
                          </>
                        )}
                    </>
                );
            case 'REGISTRATION_CLOSED':
                 return (
                    <>
                        <Button size="lg" className="w-full text-lg py-6" variant="secondary" disabled>
                            <XCircle className="mr-2 h-6 w-6" />
                            Registration Closed
                        </Button>
                        <div className="text-center text-sm text-muted-foreground p-2">
                           Registration for this event closed 2 hours before the start time. If you have already registered, please check your email for the join link.
                        </div>
                    </>
                 );
            case 'LIVE':
                 return (
                    isQuiz ? (
                         <Button size="lg" className="w-full text-lg py-6 animate-pulse" asChild>
                            <Link href={`/academy/quiz/${webinar.id}`}>
                                <Trophy className="mr-2 h-6 w-6" />
                                Start Quiz Now
                            </Link>
                        </Button>
                    ) : (
                        <Button size="lg" className="w-full text-lg py-6 animate-pulse" asChild>
                            <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer">
                                <PlayCircle className="mr-2 h-6 w-6" />
                                Join Live Session
                            </a>
                        </Button>
                    )
                );
            case 'ENDED':
                 return (
                     <>
                        <Button size="lg" className="w-full text-lg py-6" variant="secondary" disabled>
                            {isQuiz ? 'Competition Ended' : 'Session Ended'}
                        </Button>
                        {showCertificateInfo && (
                            <div className="text-center p-4 bg-blue-50 border-blue-200 border rounded-lg">
                                <Info className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                <h3 className="font-bold text-blue-800">Claim Your Certificate</h3>
                                <p className="text-sm text-blue-700 mt-1">If you registered and attended this session, you can claim your certificate of attendance. Please check your email for instructions.</p>
                            </div>
                        )}
                    </>
                );
        }
    };

    return (
        <div className="p-6 rounded-lg bg-slate-50 border h-full flex flex-col justify-center">
            <div className="space-y-4">
                {renderContent()}
            </div>
        </div>
    );
}
