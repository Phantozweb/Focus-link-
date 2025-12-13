
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ListChecks, Play, Lightbulb, UserPlus, Loader2, CheckCircle, XCircle, Award, ArrowRight, ArrowLeft, MessageSquare, Twitter, Copy, HelpCircle, Sparkles, SlidersHorizontal, BarChart, Palette, TestTube, ChevronsRightLeft, Bot, Orbit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { logFormSubmission } from '@/lib/activity-logger';
import { Separator } from '@/components/ui/separator';

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const feedbackSchema = z.object({
  feedback: z.string().min(10, 'Please provide at least 10 characters of feedback.'),
  contact: z.string().optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

function FeedbackForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: 'RAPD Simulator',
          feedback: data.feedback,
          contact: data.contact,
        }),
      });

      if (!response.ok) throw new Error('Server response not OK');

      logFormSubmission(`📝 **Feedback Submitted**
*   **Page:** RAPD Simulator
*   **Feedback:** ${data.feedback}
*   **Contact:** ${data.contact || 'N/A'}`);
      
      toast({
        title: 'Feedback Sent!',
        description: 'Thank you for your valuable input.',
      });
      reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Could not send feedback. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Share Your Feedback</CardTitle>
        <CardDescription>Help us improve this tool. Let us know what you think!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea id="feedback" {...register('feedback')} placeholder="What did you like? What could be better?" />
            {errors.feedback && <p className="text-sm text-destructive">{errors.feedback.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Your Name or Email (Optional)</Label>
            <Input id="contact" {...register('contact')} placeholder="So we can follow up if needed" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

const featureCategories = [
    {
        title: "Core Features",
        icon: <Sparkles className="h-5 w-5 text-amber-500" />,
        items: [
            "Physics-Based Pupillary Reflex: Simulates realistic physiological responses including latency, constriction velocity, and redilation.",
            "Accurate Swinging Flashlight Test: Perform the gold-standard examination for detecting Relative Afferent Pupillary Defects (RAPD).",
            "Direct & Consensual Response: Visualizes how both eyes react simultaneously to unilateral stimulation, essential for understanding neural pathways."
        ]
    },
    {
        title: "Pathology Simulation",
        icon: <TestTube className="h-5 w-5 text-red-500" />,
        items: [
            "Gradable RAPD Severity: Adjust the defect from Grade 1+ (Mild) to Grade 4+ (Amaurotic) to see how subtle vs. severe defects present clinically.",
            "Customizable Pathology: Apply defects to either the Left (OS) or Right (OD) eye, or reset to a healthy normal state.",
        ]
    },
     {
        title: "Advanced Physiological Phenomena",
        icon: <Orbit className="h-5 w-5 text-purple-500" />,
        items: [
            "Pupil Escape: Simulates the subtle dilation after initial constriction in mild RAPD.",
            "Hippus: Toggles natural physiological pupil unrest (oscillation) for added realism.",
            "Fixed Pupils: Simulate non-reactive eyes (e.g., pharmacological dilation or nerve palsy).",
        ]
    },
    {
        title: "Examination Controls",
        icon: <SlidersHorizontal className="h-5 w-5 text-blue-500" />,
        items: [
            "Dynamic Room Lighting: Adjust ambient light from 'Dark' (scotopic) to 'Bright' (photopic) to observe how baseline pupil size changes.",
            "Automated Testing: 'Auto Swing' mode performs a perfect rhythmic test for you—great for teaching demonstrations.",
            "Variable Swing Speed: Change the speed of the test (1.2s to 3.0s) to practice identifying subtle defects.",
            "Visual Customization: Change iris colors (Blue, Brown, Green, Hazel, Gray) to test visibility against different backgrounds."
        ]
    },
    {
        title: "Real-Time Feedback",
        icon: <BarChart className="h-5 w-5 text-green-500" />,
        items: [
            "Millimeter Precision: Live digital readout of pupil diameter (e.g., 4.2 mm).",
            "Diagnostic Interpretation: The system automatically classifies the finding (e.g., 'Normal', '3+ RAPD') to help students verify their diagnosis."
        ]
    }
];


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
        sessionStorage.setItem('rapd_simulator_access_id', membershipId);
        router.push('/opto-tools/rapd-simulator/launch');
    } else {
        toast({ variant: 'destructive', title: 'Invalid ID', description: 'Please enter a valid membership ID to launch the simulator.' });
    }
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = "Practice identifying RAPD with this interactive simulator on Focus Links!";
    let shareUrl = '';

    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      window.open(shareUrl, '_blank');
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    } else {
      navigator.clipboard.writeText(url).then(() => {
        toast({ title: 'Link Copied!', description: 'The simulator link has been copied to your clipboard.' });
      });
    }
  };


  return (
    <>
      <div className="bg-brand-bg">
        <header className="hero">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">RAPD Simulator</h1>
          <p className="text-base opacity-90 max-w-xl mx-auto">
            An interactive tool for practicing the swinging flashlight test to identify Relative Afferent Pupillary Defects (RAPD).
          </p>
        </header>

        <main className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="flex items-center justify-between mb-6">
                 <Button variant="outline" asChild>
                    <Link href="/opto-tools">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Tools
                    </Link>
                </Button>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleShare('whatsapp')} aria-label="Share on WhatsApp">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-1.653-3.957-2.029-4.593-.372-.636-.744-.551-.994-.56-.25-.009-.542-.01-.83-.01-.287 0-.743.118-1.128.52-.385.402-1.48 1.45-1.48 3.53 0 2.08.809 4.09 1.48 4.63.67.54 2.97.462 3.53.54 2.08.297 3.47.375 4.63.375 1.162 0 2.544-.223 3.53-1.164.984-.94.984-2.23.984-2.544 0-.313-.224-.551-.52-.698zM6.577 12.012c.15-.223.347-.497.496-.698.149-.198.297-.347.446-.52.149-.149.248-.223.372-.223.124 0 .248.05.372.148.124.099.173.223.173.347 0 .124-.05.248-.173.371-.124.124-.272.272-.42.42-.149.149-.248.248-.248.42 0 .174.05.322.148.47.099.149.223.297.372.446.149.149.297.272.47.372.148.099.297.148.47.148.173 0 .322-.05.446-.148.124-.099.223-.223.297-.372.075-.149.124-.297.124-.47 0-.173-.05-.322-.148-.446-.099-.124-.223-.248-.372-.372l-.024-.025c-.174-.173-.298-.396-.298-.668 0-.272.124-.496.298-.668l.024-.025c.149-.124.272-.248.372-.372.099-.124.148-.248.148-.372 0-.124-.05-.248-.148-.371-.099-.124-.223-.248-.372-.372-.149-.124-.297-.173-.446-.173-.149 0-.297.05-.446.148-.149.099-.272.223-.372.372l-.024.05c-.174.347-.42.644-.717.893-.297.248-.644.47-.993.644a5.35 5.35 0 0 1-1.378.542 5.35 5.35 0 0 1-1.378-.542z"/></svg>
                      <span className="sr-only">Share on WhatsApp</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                       <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleShare('copy')} aria-label="Copy Link">
                       <Copy className="h-5 w-5" />
                    </Button>
                </div>
          </div>
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
                <CardTitle className="text-2xl font-headline">Key Simulator Features</CardTitle>
                <CardDescription>
                   A comprehensive tool designed for both teaching and self-assessment.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {featureCategories.map((category) => (
                        <div key={category.title}>
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                                {category.icon}
                                {category.title}
                            </h3>
                            <ul className="list-none space-y-2 text-muted-foreground pl-7">
                                {category.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <ChevronsRightLeft className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="mt-4 px-0">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        View Full User Manual
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">RAPD Simulator: User Manual</DialogTitle>
                            <DialogDescription>
                                An interactive web-based tool designed for ophthalmology and optometry students.
                            </DialogDescription>
                        </DialogHeader>
                         <div className="prose prose-sm max-w-none overflow-y-auto pr-4">
                            <h4>2. Interaction Controls</h4>
                            <p><strong>Manual Mode:</strong> Click/Touch and drag the flashlight. The pupils will only react when the "cone" of light directly hits the visual axis.</p>
                            <p><strong>Mouse & Touch:</strong> Works on both Desktop (click and drag) and Mobile (touch and drag). A "Drag Hint" appears if the flashlight is idle to guide new users.</p>

                            <h4>3. Control Panel Settings</h4>
                            <h5>A. Room Lighting</h5>
                            <p>Controls the ambient environment.</p>
                            <ul>
                                <li><strong>Dark (0-30%):</strong> Maximizes baseline pupil size. Best for observing subtle RAPD.</li>
                                <li><strong>Bright (70-100%):</strong> Constricts baseline pupil size, making observation harder.</li>
                            </ul>

                            <h5>B. RAPD Configuration (Pathology)</h5>
                            <p>The core educational engine. Set the affected eye and grade:</p>
                            <ul>
                                <li><strong>1-2+ (Mild):</strong> Affected eye constricts initially, then escapes (dilates) under direct light.</li>
                                <li><strong>3+ (Moderate):</strong> Affected eye shows immediate dilation when light swings to it.</li>
                                <li><strong>4+ (Severe/Amaurotic):</strong> No direct light response, but constricts consensually.</li>
                            </ul>

                            <h5>C. Pupil Response Settings</h5>
                            <p>Customize the health of the efferent (motor) pathway.</p>
                            <ul>
                                <li><strong>Normal vs. Sluggish:</strong> Simulates brisk vs. slow constriction (e.g., Adie's tonic pupil).</li>
                                <li><strong>Fixed:</strong> Pupil remains at a specific size regardless of light.</li>
                                <li><strong>Hippus Toggle:</strong> Adds natural physiological pupil unrest (oscillation).</li>
                                <li><strong>Pupil Escape Toggle:</strong> Simulates slight re-dilation after prolonged light exposure.</li>
                            </ul>

                            <h5>D. Auto Swing Test</h5>
                            <p>Automatically animates the flashlight. Speeds: <strong>Slow (3s)</strong> for beginners, <strong>Normal (2s)</strong> for clinical pace, and <strong>Fast (1.2s)</strong> to challenge quick diagnosis.</p>

                            <h4>4. Understanding the Display Indicators</h4>
                            <ul>
                                <li><strong>Status Badges:</strong> "DIRECT" for the illuminated eye, "CONSENSUAL" for the other.</li>
                                <li><strong>Digital Readout:</strong> Shows the exact pupil diameter in millimeters.</li>
                                <li><strong>Finding Display:</strong> Automatically classifies the diagnosis (e.g., "Finding: 2+ RAPD (OS)").</li>
                            </ul>
                            
                            <h4>5. Clinical Reference Guide</h4>
                            <table>
                                <thead><tr><th>Grade</th><th>Clinical Observation</th></tr></thead>
                                <tbody>
                                    <tr><td>Normal</td><td>Both pupils constrict equally and hold constriction.</td></tr>
                                    <tr><td>Grade 1+</td><td>Weak initial constriction, followed by early redilation (escape).</td></tr>
                                    <tr><td>Grade 2+</td><td>No initial constriction or dilation; pupil size stays roughly the same.</td></tr>
                                    <tr><td>Grade 3+</td><td>Immediate dilation when light swings to affected eye.</td></tr>
                                    <tr><td>Grade 4+</td><td>"Amaurotic Pupil." No direct response to light. Eye is blind.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
          <Separator className="my-12" />
          <FeedbackForm />
        </main>
      </div>
    </>
  );
}
