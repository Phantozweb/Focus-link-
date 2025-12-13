
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const SimulatorContent = () => (
    <div dangerouslySetInnerHTML={{ __html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RAPD Video Demo</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .demo-video-container {
                position: relative;
                width: 100%;
                max-width: 900px;
                aspect-ratio: 16 / 9;
                background: radial-gradient(circle at center, #1f2937 0%, #0f172a 100%);
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
                border: 1px solid #374151;
            }
            .scanlines {
                background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
                background-size: 100% 4px;
                pointer-events: none;
            }
            .pupil-transition { transition: r 0.1s linear; }
            .light-beam-demo { opacity: 0; transition: opacity 0.15s ease-out; transform-origin: bottom center; }
            .player-ui { background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
        </style>
    </head>
    <body class="bg-gray-900 p-0 flex justify-center items-center min-h-screen">
        <div class="demo-video-container group">
            <div class="scanlines absolute inset-0 z-10 opacity-30"></div>
            <div class="absolute inset-0 flex items-center justify-center" id="demoScene">
                <div class="relative w-[80%] max-w-[600px] flex justify-between items-center z-0" style="margin-top: -40px;">
                    <div class="relative w-[45%] aspect-[3/2]">
                        <div id="demo_leftIllum" class="absolute -inset-8 rounded-full transition-opacity duration-200 opacity-0" 
                             style="background: radial-gradient(circle, rgba(255,250,205,0.4) 0%, transparent 70%);"></div>
                        <svg viewBox="0 0 180 120" class="w-full h-full">
                            <defs>
                                <radialGradient id="demo_sclera" cx="50%" cy="45%" r="55%"><stop offset="0%" stop-color="#e5e7eb"/><stop offset="100%" stop-color="#9ca3af"/></radialGradient>
                                <radialGradient id="demo_irisBlue" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#6b9bc3"/><stop offset="60%" stop-color="#2d5a7b"/><stop offset="100%" stop-color="#1a3a55"/></radialGradient>
                                <radialGradient id="demo_pupil" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#000000"/></radialGradient>
                                <clipPath id="demo_eyeShape"><ellipse cx="90" cy="60" rx="80" ry="48"/></clipPath>
                            </defs>
                            <ellipse cx="90" cy="60" rx="80" ry="48" fill="url(#demo_sclera)"/>
                            <circle cx="90" cy="60" r="30" fill="url(#demo_irisBlue)"/>
                            <circle id="demo_leftPupil" cx="90" cy="60" r="10" fill="url(#demo_pupil)" class="pupil-transition"/>
                            <ellipse cx="82" cy="52" rx="5" ry="3.5" fill="white" opacity="0.6"/>
                            <g clip-path="url(#demo_eyeShape)">
                                <path d="M10 55 Q90 35 170 52" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/>
                                <path d="M10 65 Q90 85 170 68" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/>
                            </g>
                        </svg>
                        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-mono">Left (OS)</div>
                    </div>
                    <div class="w-4 h-16 bg-gray-700/30 rounded-full blur-sm"></div>
                    <div class="relative w-[45%] aspect-[3/2]">
                        <div id="demo_rightIllum" class="absolute -inset-8 rounded-full transition-opacity duration-200 opacity-0" 
                             style="background: radial-gradient(circle, rgba(255,250,205,0.4) 0%, transparent 70%);"></div>
                        <svg viewBox="0 0 180 120" class="w-full h-full">
                            <ellipse cx="90" cy="60" rx="80" ry="48" fill="url(#demo_sclera)"/>
                            <circle cx="90" cy="60" r="30" fill="url(#demo_irisBlue)"/>
                            <circle id="demo_rightPupil" cx="90" cy="60" r="10" fill="url(#demo_pupil)" class="pupil-transition"/>
                            <ellipse cx="82" cy="52" rx="5" ry="3.5" fill="white" opacity="0.6"/>
                            <g clip-path="url(#demo_eyeShape)"><path d="M10 55 Q90 35 170 52" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/><path d="M10 65 Q90 85 170 68" stroke="#4b5563" stroke-width="2" fill="none" opacity="0.3"/></g>
                        </svg>
                        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-mono">Right (OD)</div>
                    </div>
                </div>
                <div id="demo_flashlight" class="absolute z-20 w-16 h-32 will-change-transform" style="top: 100%; left: 50%;">
                    <div id="demo_lightCone" class="light-beam-demo absolute bottom-[85%] left-1/2 -translate-x-1/2 w-[140px] h-[200px] pointer-events-none">
                         <svg viewBox="0 0 120 160" class="w-full h-full" style="filter: blur(8px);"><path d="M40 160 Q60 80 60 0 Q60 80 80 160 Z" fill="rgba(255, 250, 205, 0.6)"/></svg>
                    </div>
                    <svg viewBox="0 0 60 100" class="w-full h-full drop-shadow-2xl">
                        <defs><linearGradient id="demo_bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#374151"/><stop offset="50%" stop-color="#6b7280"/><stop offset="100%" stop-color="#374151"/></linearGradient><radialGradient id="demo_lensGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fefce8"/><stop offset="100%" stop-color="#eab308"/></radialGradient></defs>
                        <ellipse cx="30" cy="10" rx="24" ry="9" fill="#b45309"/><ellipse cx="30" cy="10" rx="20" ry="7" fill="url(#demo_lensGrad)"/><rect x="12" y="24" width="36" height="42" rx="4" fill="url(#demo_bodyGrad)"/><rect x="22" y="26" width="16" height="5" rx="2" fill="#22c55e"/><rect x="16" y="66" width="28" height="12" rx="3" fill="#44403c"/>
                    </svg>
                </div>
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
                    flashlight.style.transform = \`translate(calc(-50% + \${xPos}px), \${-140 + yPos}px) rotate(\${-xPos * 0.15}deg)\`;
                    const isLeft = xPos < -60;
                    const isRight = xPos > 60;
                    const isCenter = !isLeft && !isRight;
                    const progress = (Math.sin(elapsed * CONFIG.swingSpeed - Math.PI/2) + 1) / 2 * 100;
                    progressBar.style.width = \`\${progress}%\`;
                    if (isCenter) {
                        lightCone.style.opacity = '0.3';
                        leftIllum.style.opacity = '0';
                        rightIllum.style.opacity = '0';
                        diagnosisLabel.textContent = "Transit (Darkness)";
                        diagnosisLabel.className = "text-sm font-bold text-gray-400 bg-gray-800/50 px-2 py-1 rounded";
                    } else { lightCone.style.opacity = '0.8'; }
                    let targetLeft, targetRight;
                    if (isRight) {
                        targetLeft = CONFIG.constrictedSize; targetRight = CONFIG.constrictedSize;
                        rightIllum.style.opacity = '1'; leftIllum.style.opacity = '0';
                        diagnosisLabel.innerHTML = "Right Eye Illuminated <br><span class='text-[10px] font-normal text-green-300'>Normal Constriction</span>";
                        diagnosisLabel.className = "text-sm font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded border border-green-500/30 text-right";
                    } else if (isLeft) {
                        targetLeft = CONFIG.rapdSize; targetRight = CONFIG.rapdSize;
                        leftIllum.style.opacity = '1'; rightIllum.style.opacity = '0';
                        diagnosisLabel.innerHTML = "Left Eye Illuminated <br><span class='text-[10px] font-normal text-red-300'>Paradoxical Dilation (RAPD)</span>";
                        diagnosisLabel.className = "text-sm font-bold text-red-400 bg-red-900/30 px-2 py-1 rounded border border-red-500/30 text-right";
                    } else { targetLeft = CONFIG.baselineSize; targetRight = CONFIG.baselineSize; }
                    const currentLeft = parseFloat(leftPupil.getAttribute('r'));
                    const currentRight = parseFloat(rightPupil.getAttribute('r'));
                    const newLeft = currentLeft + (targetLeft - currentLeft) * 0.1;
                    const newRight = currentRight + (targetRight - currentRight) * 0.1;
                    leftPupil.setAttribute('r', newLeft);
                    rightPupil.setAttribute('r', newRight);
                    requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
            })();
        </script>
    </body></html>
    `}}>
    </div>
);


export default function RapdSimulatorLaunchPage() {
    const [membershipId, setMembershipId] = useState('');
    const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
    const [isVerified, setIsVerified] = useState(false);
    const { toast } = useToast();

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

    const handleVerify = () => {
        if (idStatus === 'valid') {
            setIsVerified(true);
            toast({ title: 'Access Granted', description: 'Welcome to the RAPD Simulator.' });
        } else {
            toast({ variant: 'destructive', title: 'Invalid ID', description: 'Please enter a valid membership ID.' });
        }
    };

    if (isVerified) {
        return <SimulatorContent />;
    }

    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">Member Access Required</CardTitle>
                    <CardDescription className="text-lg">
                        This clinical simulator is an exclusive tool for Focus Links members.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="membershipId">Enter Your Membership ID</Label>
                        <div className="relative">
                            <Input
                                id="membershipId"
                                placeholder="e.g., IN20251026084533"
                                className="h-12 text-center text-lg"
                                value={membershipId}
                                onChange={(e) => {
                                    setMembershipId(e.target.value);
                                    checkIdValidity(e.target.value);
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                                {idStatus === 'valid' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleVerify} disabled={idStatus !== 'valid'} className="w-full" size="lg">
                        Launch Simulator <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Separator />
                    <div className="text-center">
                        <p className="text-muted-foreground mb-2">Don't have an ID?</p>
                        <Button variant="outline" asChild>
                            <Link href="/membership">
                                <UserPlus className="mr-2 h-4 w-4" /> Get a Free Membership ID
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
