
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ListChecks, Play, Lightbulb, UserPlus, Loader2, CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function RapdSimulatorInfoPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [membershipId, setMembershipId] = useState('');
  const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const { toast } = useToast();
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
      toast({ variant: 'destructive', title: 'Error', description: 'Could not verify ID. Please check your connection.' });
    }
  }, 500), [toast]);
  
   useEffect(() => {
    if (membershipId) {
      checkIdValidity(membershipId);
    } else {
      setIdStatus('idle');
    }
  }, [membershipId, checkIdValidity]);

  const handleLaunch = () => {
    if (idStatus === 'valid') {
        // Store the verified ID to be used by the launch page
        sessionStorage.setItem('rapd_simulator_access_id', membershipId);
        router.push('/opto-tools/rapd-simulator/launch');
    } else {
        toast({ variant: 'destructive', title: 'Invalid ID', description: 'Please enter a valid membership ID to launch the simulator.' });
    }
  };


  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">RAPD Simulator</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          An interactive tool for practicing the swinging flashlight test to identify Relative Afferent Pupillary Defects (RAPD).
        </p>
      </header>

      <main className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
        
        <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-slate-200">
          <div dangerouslySetInnerHTML={{ __html: `
            <div class="demo-video-container group" style="aspect-ratio: 16/9.5;">
                <style>
                    .demo-video-container { position: relative; width: 100%; max-width: 900px; background: radial-gradient(circle at center, #1f2937 0%, #0f172a 100%); border-radius: 8px; overflow: hidden; }
                    .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1)); background-size: 100% 4px; pointer-events: none; }
                    .pupil-transition { transition: r 0.1s linear; }
                    .light-beam-demo { opacity: 0; transition: opacity 0.15s ease-out; transform-origin: bottom center; }
                    .player-ui { background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
                </style>
                <div class="scanlines absolute inset-0 z-10 opacity-30"></div>
                <div class="absolute inset-0 flex items-center justify-center" id="demoScene">
                    <div class="relative w-[80%] max-w-[600px] flex justify-between items-center z-0" style="margin-top: -40px;">
                        <div class="relative w-[45%] aspect-[3/2]">
                            <div id="demo_leftIllum" class="absolute -inset-8 rounded-full transition-opacity duration-200 opacity-0" style="background: radial-gradient(circle, rgba(255,250,205,0.4) 0%, transparent 70%);"></div>
                            <svg viewBox="0 0 180 120" class="w-full h-full"><defs><radialGradient id="demo_sclera" cx="50%" cy="45%" r="55%"><stop offset="0%" stop-color="#e5e7eb"/><stop offset="100%" stop-color="#9ca3af"/></radialGradient><radialGradient id="demo_irisBlue" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#6b9bc3"/><stop offset="60%" stop-color="#2d5a7b"/><stop offset="100%" stop-color="#1a3a55"/></radialGradient><radialGradient id="demo_pupil" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#000000"/></radialGradient><clipPath id="demo_eyeShape"><ellipse cx="90" cy="60" rx="80" ry="48"/></clipPath></defs><ellipse cx="90" cy="60" rx="80" ry="48" fill="url(#demo_sclera)"/><circle cx="90" cy="60" r="30" fill="url(#demo_irisBlue)"/><circle id="demo_leftPupil" cx="90" cy="60" r="10" fill="url(#demo_pupil)" class="pupil-transition"/><ellipse cx="82" cy="52" rx="5" ry="3.5" fill="white" opacity="0.6"/><g clip-path="url(#demo_eyeShape)"><path d="M10 55 Q90 35 170 52" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/><path d="M10 65 Q90 85 170 68" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/></g></svg>
                        </div>
                        <div class="w-4 h-16 bg-gray-700/30 rounded-full blur-sm"></div>
                        <div class="relative w-[45%] aspect-[3/2]">
                            <div id="demo_rightIllum" class="absolute -inset-8 rounded-full transition-opacity duration-200 opacity-0" style="background: radial-gradient(circle, rgba(255,250,205,0.4) 0%, transparent 70%);"></div>
                            <svg viewBox="0 0 180 120" class="w-full h-full"><ellipse cx="90" cy="60" rx="80" ry="48" fill="url(#demo_sclera)"/><circle cx="90" cy="60" r="30" fill="url(#demo_irisBlue)"/><circle id="demo_rightPupil" cx="90" cy="60" r="10" fill="url(#demo_pupil)" class="pupil-transition"/><ellipse cx="82" cy="52" rx="5" ry="3.5" fill="white" opacity="0.6"/><g clip-path="url(#demo_eyeShape)"><path d="M10 55 Q90 35 170 52" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/><path d="M10 65 Q90 85 170 68" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/></g></svg>
                        </div>
                    </div>
                    <div id="demo_flashlight" class="absolute z-20 w-16 h-32 will-change-transform" style="top: 100%; left: 50%;"><div id="demo_lightCone" class="light-beam-demo absolute bottom-[85%] left-1/2 -translate-x-1/2 w-[140px] h-[200px] pointer-events-none"><svg viewBox="0 0 120 160" class="w-full h-full" style="filter: blur(8px);"><path d="M40 160 Q60 80 60 0 Q60 80 80 160 Z" fill="rgba(255, 250, 205, 0.6)"/></svg></div><svg viewBox="0 0 60 100" class="w-full h-full drop-shadow-2xl"><defs><linearGradient id="demo_bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#374151"/><stop offset="50%" stop-color="#6b7280"/><stop offset="100%" stop-color="#374151"/></linearGradient><radialGradient id="demo_lensGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fefce8"/><stop offset="100%" stop-color="#eab308"/></radialGradient></defs><ellipse cx="30" cy="10" rx="24" ry="9" fill="#b45309"/><ellipse cx="30" cy="10" rx="20" ry="7" fill="url(#demo_lensGrad)"/><rect x="12" y="24" width="36" height="42" rx="4" fill="url(#demo_bodyGrad)"/><rect x="22" y="26" width="16" height="5" rx="2" fill="#22c55e"/><rect x="16" y="66" width="28" height="12" rx="3" fill="#44403c"/></svg></div>
                </div>
                <div class="player-ui absolute bottom-0 left-0 right-0 p-4 z-30">
                    <div class="flex items-center gap-3 mb-1"><div class="h-1.5 flex-1 bg-gray-600/50 rounded-full overflow-hidden"><div id="demo_progressBar" class="h-full bg-blue-500 w-0"></div></div></div>
                    <div class="flex justify-between items-end">
                        <div><div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span class="text-xs font-bold text-white tracking-widest uppercase">Left RAPD Simulation</span></div><p class="text-[10px] text-gray-400 mt-1">Automatic Swinging Flashlight Test Loop</p></div>
                        <div class="text-right"><div id="demo_diagnosis" class="text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Paradoxical Dilation</div></div>
                    </div>
                </div>
            </div>
            <script>
            (function() {
                const CONFIG = { baselineSize: 22, constrictedSize: 9, rapdSize: 18, swingSpeed: 0.002, widthSpan: 160 };
                const flashlight = document.getElementById('demo_flashlight');
                const lightCone = document.getElementById('demo_lightCone');
                const leftIllum = document.getElementById('demo_leftIllum');
                const rightIllum = document.getElementById('demo_rightIllum');
                const leftPupil = document.getElementById('demo_leftPupil');
                const rightPupil = document.getElementById('demo_rightPupil');
                const progressBar = document.getElementById('demo_progressBar');
                const diagnosisLabel = document.getElementById('demo_diagnosis');
                let startTime = null;
                function animate(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    const cycle = Math.sin(elapsed * CONFIG.swingSpeed);
                    const xPos = cycle * CONFIG.widthSpan; 
                    const yPos = Math.cos(elapsed * CONFIG.swingSpeed * 2) * 10;
                    if (!flashlight) return;
                    flashlight.style.transform = \`translate(calc(-50% + \${xPos}px), \${-140 + yPos}px) rotate(\${-xPos * 0.15}deg)\`;
                    const isLeft = xPos < -60;
                    const isRight = xPos > 60;
                    const isCenter = !isLeft && !isRight;
                    const progress = (Math.sin(elapsed * CONFIG.swingSpeed - Math.PI/2) + 1) / 2 * 100;
                    if (progressBar) progressBar.style.width = \`\${progress}%\`;
                    if (isCenter) {
                        if (lightCone) lightCone.style.opacity = '0.3';
                        if (leftIllum) leftIllum.style.opacity = '0';
                        if (rightIllum) rightIllum.style.opacity = '0';
                        if (diagnosisLabel) { diagnosisLabel.textContent = "Transit (Darkness)"; diagnosisLabel.className = "text-sm font-bold text-gray-400 bg-gray-800/50 px-2 py-1 rounded"; }
                    } else { if (lightCone) lightCone.style.opacity = '0.8'; }
                    let targetLeft, targetRight;
                    if (isRight) {
                        targetLeft = CONFIG.constrictedSize; targetRight = CONFIG.constrictedSize;
                        if (rightIllum) rightIllum.style.opacity = '1';
                        if (leftIllum) leftIllum.style.opacity = '0';
                        if (diagnosisLabel) { diagnosisLabel.innerHTML = "Right Eye Illuminated <br><span class='text-[10px] font-normal text-green-300'>Normal Constriction</span>"; diagnosisLabel.className = "text-sm font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded border border-green-500/30 text-right"; }
                    } else if (isLeft) {
                        targetLeft = CONFIG.rapdSize; targetRight = CONFIG.rapdSize;
                        if (leftIllum) leftIllum.style.opacity = '1';
                        if (rightIllum) rightIllum.style.opacity = '0';
                        if (diagnosisLabel) { diagnosisLabel.innerHTML = "Left Eye Illuminated <br><span class='text-[10px] font-normal text-red-300'>Paradoxical Dilation (RAPD)</span>"; diagnosisLabel.className = "text-sm font-bold text-red-400 bg-red-900/30 px-2 py-1 rounded border border-red-500/30 text-right"; }
                    } else { targetLeft = CONFIG.baselineSize; targetRight = CONFIG.baselineSize; }
                    if (leftPupil && rightPupil) {
                        const currentLeft = parseFloat(leftPupil.getAttribute('r'));
                        const currentRight = parseFloat(rightPupil.getAttribute('r'));
                        const newLeft = currentLeft + (targetLeft - currentLeft) * 0.1;
                        const newRight = currentRight + (targetRight - currentRight) * 0.1;
                        leftPupil.setAttribute('r', newLeft);
                        rightPupil.setAttribute('r', newRight);
                    }
                    requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
            })();
            </script>
          ` }}
        />
        </div>

        <div className="mt-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full text-lg py-6">
                  <Play className="mr-2 h-6 w-6" />
                  Launch Full Simulator
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline text-center">Member Access</DialogTitle>
                  <DialogDescription className="text-center">
                    This clinical simulator is an exclusive tool for Focus Links members. Please verify your ID to continue.
                  </DialogDescription>
                </DialogHeader>
                 <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="membership-id">Membership ID</Label>
                    <div className="relative">
                      <Input
                        id="membership-id"
                        value={membershipId}
                        onChange={(e) => setMembershipId(e.target.value)}
                        placeholder="e.g., IN20251026084533"
                        className="h-12"
                      />
                       <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                          {idStatus === 'valid' && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                        </div>
                    </div>
                  </div>
                   <Button onClick={handleLaunch} disabled={idStatus !== 'valid'} className="w-full">
                      Verify & Launch Simulator
                      <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>
                <DialogDescription className="text-center text-sm">
                  Don't have an ID?{' '}
                  <Link href="/membership" className="underline text-primary font-semibold">
                    Get one for free
                  </Link>
                </DialogDescription>
              </DialogContent>
            </Dialog>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-2xl font-headline">Practice the Swinging Flashlight Test</CardTitle>
                    <CardDescription className="text-base mt-1">Sharpen your diagnostic skills in a safe, repeatable environment.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><ListChecks className="text-primary h-5 w-5" /> Features</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Realistic simulation of pupillary responses.</li>
                        <li>Practice identifying normal, mild, moderate, and severe RAPD.</li>
                        <li>Interactive flashlight control to simulate the test.</li>
                        <li>Instant feedback on your observations.</li>
                        <li>Learn to recognize the key signs of an afferent defect.</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="text-primary h-5 w-5" /> Learning Objectives</h3>
                     <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Master the timing of the swinging flashlight test.</li>
                        <li>Differentiate between normal constriction and paradoxical dilation.</li>
                        <li>Build confidence in diagnosing RAPD.</li>
                        <li>Understand the clinical significance of a positive finding.</li>
                    </ul>
                </div>
            </div>
            
            <div className="text-center pt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg">
                        <Play className="mr-2 h-5 w-5" />
                        Launch Simulator
                    </Button>
                  </DialogTrigger>
                   <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-headline text-center">Member Access</DialogTitle>
                      <DialogDescription className="text-center">
                        This clinical simulator is an exclusive tool for Focus Links members. Please verify your ID to continue.
                      </DialogDescription>
                    </DialogHeader>
                     <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="membership-id-2">Membership ID</Label>
                        <div className="relative">
                          <Input
                            id="membership-id-2"
                            value={membershipId}
                            onChange={(e) => setMembershipId(e.target.value)}
                            placeholder="e.g., IN20251026084533"
                            className="h-12"
                          />
                           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                              {idStatus === 'valid' && <CheckCircle className="h-5 w-5 text-green-500" />}
                              {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                            </div>
                        </div>
                      </div>
                       <Button onClick={handleLaunch} disabled={idStatus !== 'valid'} className="w-full">
                          Verify & Launch Simulator
                          <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                    </div>
                    <DialogDescription className="text-center text-sm">
                      Don't have an ID?{' '}
                      <Link href="/membership" className="underline text-primary font-semibold">
                        Get one for free
                      </Link>
                    </DialogDescription>
                  </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
