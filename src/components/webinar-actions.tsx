
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Webinar } from '@/lib/academy';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlayCircle, Ticket, Calendar, Clock, Info, XCircle, CheckCircle, UserPlus, Users, Trophy, Lock, Bell, Loader2, BarChart, MessageCircle, Award, Download, Share2 } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { sendQuizStartNotification } from '@/lib/webhook';
import { cn } from '@/lib/utils';
import { quizWinnersData, type LeaderboardEntry, type ModuleResult } from '@/lib/data/quiz-winners';
import { certificateParticipants } from '@/lib/data/verifycertificatedids';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Image from 'next/image';
import { toPng, toBlob } from 'html-to-image';


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
const MAX_ATTEMPTS = 3;
const PASS_PERCENTAGE = 35;


const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center p-2 bg-slate-100 rounded-md w-20">
    <span className="text-3xl font-bold text-slate-800 tracking-tight">{String(value).padStart(2, '0')}</span>
    <span className="text-xs text-muted-foreground uppercase">{label}</span>
  </div>
);

export function CertificateClaimDialog() {
  const [membershipId, setMembershipId] = useState('');
  const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [verificationResult, setVerificationResult] = useState<'idle' | 'success' | 'fail'>('idle');
  const [participantData, setParticipantData] = useState<LeaderboardEntry | null>(null);
  const [participantName, setParticipantName] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const checkIdValidity = useCallback(debounce((id: string) => {
    if (!id || id.trim().length < 5) {
      setIdStatus('idle');
      return;
    }
    setIdStatus('loading');
    const participant = certificateParticipants.find(p => p.id === id);
    if (participant) {
      setIdStatus('valid');
      const winnerData = quizWinnersData.find(p => p.id === id);
      setParticipantData(winnerData || null);
       setParticipantName(winnerData?.name || participant.name);
    } else {
      setIdStatus('invalid');
      setParticipantName(null);
      setParticipantData(null);
    }
  }, 300), []);
  
   useEffect(() => {
    if (membershipId) {
      checkIdValidity(membershipId);
    } else {
      setIdStatus('idle');
      setParticipantData(null);
      setParticipantName(null);
    }
  }, [membershipId, checkIdValidity]);

  const handleClaim = () => {
    if (idStatus === 'valid') {
       setVerificationResult('success');
    } else {
       setVerificationResult('fail');
    }
  };

  const imageFilter = (node: HTMLElement) => {
    if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet' && (node as HTMLLinkElement).href.includes('fonts.googleapis.com')) {
      return false;
    }
    return true;
  };

  const handleDownload = useCallback(() => {
    if (certificateRef.current === null) {
      return;
    }

    toPng(certificateRef.current, { cacheBust: true, pixelRatio: 3, filter: imageFilter })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `FocusLinks_Certificate_${participantName?.replace(/\s/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [participantName]);

  if (verificationResult === 'success' && participantName) {
    const passed = participantData ? participantData.passed : false;
    const score = participantData ? participantData.score : 0;
    const time = participantData ? participantData.time : 0;
    
    const excellenceCertificateUrl = "https://i.postimg.cc/Kv6kxD2T/1.png";
    const participationCertificateUrl = "https://i.postimg.cc/rp0jdmrb/1.png";
    const certificateUrl = passed ? excellenceCertificateUrl : participationCertificateUrl;
    
    return (
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
             <DialogHeader className="text-center items-center">
                <div className={cn("mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-2", passed ? "bg-green-100" : "bg-blue-100")}>
                    {passed ? <CheckCircle className={cn("h-8 w-8", "text-green-500")} /> : <Award className={cn("h-8 w-8", "text-blue-500")} />}
                </div>
                <DialogTitle className="text-2xl font-headline">
                  {passed ? `Congratulations, ${participantName.split(' ')[0]}!` : "Thank You for Participating!"}
                </DialogTitle>
                <DialogDescription>
                  {passed ? `Your dedication has paid off! Here is your official Certificate of Excellence for passing the Eye Q Arena.` : `Your participation is valued, ${participantName}. Here is your Certificate of Participation.`}
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <div ref={certificateRef} className="relative w-full aspect-[1.414] overflow-hidden rounded-md border shadow-lg">
                  <Image src={certificateUrl} alt="Certificate" quality={100} layout="fill" objectFit="cover" />
                   <div className="absolute inset-0 flex items-center justify-center" style={{ transform: passed ? 'translateY(-38px)' : 'translateY(-15px)' }}>
                      <p className="text-black/80 text-4xl sm:text-5xl md:text-6xl" style={{ fontFamily: "'Ms Madi', cursive" }}>{participantName}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {participantData && (
                    <div className="space-y-4">
                      <div className={cn("p-4 rounded-lg text-center border", passed ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200")}>
                          <h4 className={cn("font-semibold", passed ? "text-green-800" : "text-blue-800")}>{passed ? `Outstanding Performance!` : 'Your Results'}</h4>
                          <p className={cn("text-sm", passed ? "text-green-700" : "text-blue-700")}>Score: <strong className="font-mono">{score}%</strong> | Time: <strong className="font-mono">{formatTime(time)}</strong></p>
                      </div>
                      {participantData.moduleResults && (
                        <div className="pt-2">
                            <h4 className="font-semibold text-center mb-2">Module Breakdown</h4>
                            <div className="max-h-40 overflow-y-auto pr-2 rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Module</TableHead>
                                  <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {participantData.moduleResults.map((result) => (
                                    <TableRow key={result.topic}>
                                          <TableCell className="font-medium">{result.topic}</TableCell>
                                          <TableCell className="text-right">
                                              {result.status === 'Passed' ? (
                                                  <span className="flex items-center justify-end gap-1 text-green-600 font-semibold"><CheckCircle className="h-4 w-4"/> Pass</span>
                                              ) : (
                                                  <span className="flex items-center justify-end gap-1 text-red-600 font-semibold"><XCircle className="h-4 w-4"/> Fail</span>
                                              )}
                                          </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                            </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-6">
                <Button variant="outline" onClick={() => setVerificationResult('idle')}>Back</Button>
                <div className="flex-grow" />
                <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download Certificate</Button>
            </DialogFooter>
        </DialogContent>
    )
  }
  
  if (verificationResult === 'fail') {
    return (
         <DialogContent>
             <DialogHeader className="text-center items-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-2">
                    <XCircle className="h-8 w-8 text-red-500" />
                </div>
                <DialogTitle className="text-2xl font-headline">Verification Failed</DialogTitle>
                <DialogDescription>
                  The Membership ID provided does not match a participant. Please check the ID and try again, or contact support if you believe this is an error.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setVerificationResult('idle')}>Try Again</Button>
            </DialogFooter>
        </DialogContent>
    )
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader className="text-center items-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-2">
            <Award className="h-8 w-8 text-amber-500" />
        </div>
        <DialogTitle className="text-2xl font-headline">Claim Certificate</DialogTitle>
        <DialogDescription>
          Enter the membership ID you used to participate in the quiz to verify and receive your certificate.
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
          {idStatus === 'valid' && participantName && <p className="text-center text-sm text-green-600">Verified for: {participantName}</p>}
          {idStatus === 'invalid' && <p className="text-center text-sm text-destructive">This Membership ID is not valid.</p>}
        </div>
      </div>
      <DialogFooter className="sm:justify-end">
        <Button onClick={handleClaim} disabled={idStatus !== 'valid'}>
            <Award className="mr-2 h-4 w-4" />
            Verify & Claim
        </Button>
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
            const durationMultiplier = isQuiz ? (1000 * 60 * 60 * 24) : (1000 * 60);
            const webinarEndTime = webinarStartTime + (durationValue * durationMultiplier);

            if (now < webinarStartTime) {
                if (now < registrationCloseTime && !isQuiz) {
                    setStatus('UPCOMING');
                } else if (!isQuiz) {
                    setStatus('REGISTRATION_CLOSED');
                } else {
                    setStatus('UPCOMING');
                }
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
                const certificateDeadline = webinarEndTime + (7 * 24 * 60 * 60 * 1000); 
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
                    <div className="p-4 bg-blue-50 border-blue-200 rounded-lg text-center">
                        <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-bold text-blue-800">Event Concluded!</h4>
                        <p className="text-sm text-blue-700 mt-1">Thank you to all participants! Check out the final standings below.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         <Button size="lg" className="w-full" asChild>
                            <Link href="#leaderboard">
                                <BarChart className="mr-2 h-5 w-5" />
                                Final Leaderboard
                            </Link>
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                 <Button size="lg" variant="outline" className="w-full">
                                    <Award className="mr-2 h-5 w-5" />
                                    Claim Certificate
                                </Button>
                            </DialogTrigger>
                            <CertificateClaimDialog />
                        </Dialog>
                    </div>
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
