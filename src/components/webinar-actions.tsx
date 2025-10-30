
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Webinar } from '@/lib/academy';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlayCircle, Ticket, Calendar, Clock, Info, XCircle, CheckCircle, UserPlus, Users, Trophy, Lock, Bell, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

interface WebinarActionsProps {
    webinar: Webinar;
}

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center p-2 bg-slate-100 rounded-md w-20">
    <span className="text-3xl font-bold text-slate-800 tracking-tight">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-muted-foreground uppercase">{label}</span>
  </div>
);

function QuizEntryDialog({ webinarId }: { webinarId: string }) {
  const [membershipId, setMembershipId] = useState('');
  const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const router = useRouter();

  const checkIdValidity = useCallback(debounce(async (id: string) => {
    if (!id || id.trim().length < 5) {
      setIdStatus('idle');
      return;
    }
    setIdStatus('loading');
    try {
      const response = await fetch(`/api/verify-id?id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (data.isValid) {
        setIdStatus('valid');
      } else {
        setIdStatus('invalid');
      }
    } catch (error) {
      console.error('ID validation failed:', error);
      setIdStatus('invalid');
    }
  }, 500), []);
  
   useEffect(() => {
    if (membershipId) {
      checkIdValidity(membershipId);
    } else {
      setIdStatus('idle');
    }
  }, [membershipId, checkIdValidity]);

  const handleStartQuiz = () => {
    if (idStatus === 'valid') {
      router.push(`/academy/quiz/${webinarId}`);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader className="text-center items-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-2">
            <Trophy className="h-8 w-8 text-amber-500" />
        </div>
        <DialogTitle className="text-2xl font-headline">Enter the Arena</DialogTitle>
        <DialogDescription>
          Please enter your Focus Links membership ID to begin the quiz.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="membership-id" className="sr-only">Membership ID</Label>
           <div className="relative">
            <Input 
              id="membership-id" 
              value={membershipId}
              onChange={(e) => setMembershipId(e.target.value)}
              placeholder="Your Membership ID"
              className="text-center h-12 text-base"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
              {idStatus === 'valid' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
            </div>
          </div>
          {idStatus === 'invalid' && <p className="text-center text-sm text-destructive">This Membership ID is not valid or does not exist.</p>}
        </div>
      </div>
      <DialogFooter className="sm:justify-between flex-col-reverse sm:flex-row gap-2">
         <div className="text-sm text-muted-foreground">
            Not a member?{' '}
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/membership#membership-join">Join for free</Link>
            </Button>
        </div>
        <Button onClick={handleStartQuiz} disabled={idStatus !== 'valid'}>
            <Trophy className="mr-2 h-4 w-4" />
            Start Quiz
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

function ReminderDialog({webinar}: {webinar: Webinar}) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNotify = async () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1416675826577182780/gxAG9Kz0YJB1v9dRRA0TRMs2oDXH6CLOomD_qqzPjab0Iy78oWQ64n3bDc1tFnL-oa-k';
    
    const embed = {
      title: `🔔 New Reminder Request for Eye Q Arena!`,
      description: `A user wants to be notified about the **${webinar.title}**.`,
      color: 3066993, // Green color
      thumbnail: {
        url: webinar.speaker.avatarUrl,
      },
      fields: [
        { name: '👤 Name', value: name, inline: true },
        { name: '📧 Email', value: email, inline: true },
      ],
      footer: {
        text: `Reminder requested on ${new Date().toLocaleString()}`,
      },
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embeds: [embed] }),
      });

      toast({
        title: "You're on the list!",
        description: `We'll email ${email} when the arena opens.`,
      });

    } catch (error) {
      console.error('Failed to send Discord notification:', error);
       toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: `We couldn't set your reminder. Please try again later.`,
      });
    }
  }

  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Get Notified</DialogTitle>
            <DialogDescription>
                Enter your details below, and we'll send you an email reminder just before the Eye Q Arena opens.
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleNotify} disabled={!name || !email}>
              Notify Me
            </Button>
          </DialogClose>
        </DialogFooter>
    </DialogContent>
  )
}

export function WebinarActions({ webinar }: WebinarActionsProps) {
    const [status, setStatus] = useState<'UPCOMING' | 'REGISTRATION_CLOSED' | 'LIVE' | 'ENDED'>('UPCOMING');
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [showCertificateInfo, setShowCertificateInfo] = useState(false);
    const isQuiz = webinar.id === 'eye-q-arena-2025';

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

            if (isQuiz) {
                // For testing, always show the LIVE state for the quiz
                setStatus('LIVE');
            } else if (now < webinarStartTime) {
                if (now < registrationCloseTime) {
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

        if (isQuiz) {
            return (
                <div className="space-y-4 text-center">
                    <h3 className="font-semibold text-slate-700 mb-3">The Arena is Open!</h3>
                    <Dialog>
                        <div className="space-y-3 pt-3">
                           <DialogTrigger asChild>
                                <Button size="lg" className="w-full text-lg py-6 animate-pulse">
                                    <Trophy className="mr-2 h-6 w-6" />
                                    Enter Arena Now
                                </Button>
                            </DialogTrigger>
                           <Dialog>
                            <DialogTrigger asChild>
                              <Button size="lg" variant="outline" className="w-full">
                                  <Bell className="mr-2 h-5 w-5" />
                                  Remind Me Later
                              </Button>
                            </DialogTrigger>
                            <ReminderDialog webinar={webinar} />
                          </Dialog>
                        </div>
                        <QuizEntryDialog webinarId={webinar.id} />
                    </Dialog>
                </div>
            );
        }
        
        switch (status) {
            case 'UPCOMING':
                return (
                    <div className="space-y-4 text-center">
                        <h3 className="font-semibold text-slate-700 mb-3">Event Starts In</h3>
                        <div className="flex justify-center gap-2">
                            <CountdownUnit value={timeLeft.days} label="Days" />
                            <CountdownUnit value={timeLeft.hours} label="Hours" />
                            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                        </div>
                        <div className='space-y-3 pt-4'>
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="font-bold text-primary flex items-center justify-center gap-2"><Users className="h-5 w-5" /> 100+ People Registered!</p>
                          </div>
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
                    </div>
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
                    <Button size="lg" className="w-full text-lg py-6 animate-pulse" asChild>
                        <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer">
                            <PlayCircle className="mr-2 h-6 w-6" />
                            Join Live Session
                        </a>
                    </Button>
                );
            case 'ENDED':
                 return (
                     <>
                        <Button size="lg" className="w-full text-lg py-6" variant="secondary" disabled>
                            {'Session Ended'}
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
