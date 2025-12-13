
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

const SimulatorContent = () => (
    <div dangerouslySetInnerHTML={{ __html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RAPD Video Demo</title>
        <style>
            body { margin: 0; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
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
            .player-ui { background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 1rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            .absolute { position: absolute; }
            .relative { position: relative; }
            .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
            .z-10 { z-index: 10; }
            .z-20 { z-index: 20; }
            .z-30 { z-index: 30; }
            .text-white { color: white; }
            .text-gray-400 { color: #9ca3af; }
            .font-mono { font-family: monospace; }
            .text-xs { font-size: 0.75rem; }
            .text-sm { font-size: 0.875rem; }
            .font-bold { font-weight: 700; }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            .max-w-\\[600px\\] { max-width: 600px; }
            .w-\\[80\\%\\] { width: 80%; }
            .aspect-\\[3\\/2\\] { aspect-ratio: 3 / 2; }
            .w-\\[45\\%\\] { width: 45%; }
            .w-16 { width: 4rem; }
            .h-32 { height: 8rem; }
            .w-2 { width: 0.5rem; }
            .h-2 { height: 0.5rem; }
            .h-1\\.5 { height: 0.375rem; }
            .rounded-full { border-radius: 9999px; }
            .rounded { border-radius: 0.25rem; }
            .bg-red-500 { background-color: #ef4444; }
            .bg-blue-500 { background-color: #3b82f6; }
            .bg-gray-600\\/50 { background-color: rgba(75, 85, 99, 0.5); }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse { 50% { opacity: .5; } }
            .will-change-transform { will-change: transform; }
            .drop-shadow-2xl { filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)); }
            .text-right { text-align: right; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .bg-yellow-400\\/10 { background-color: rgba(250, 204, 21, 0.1); }
            .border-yellow-400\\/20 { border-color: rgba(250, 204, 21, 0.2); }
            .text-yellow-400 { color: #facc15; }
            .border { border-width: 1px; }
        </style>
    </head>
    <body>
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
            <div class="player-ui absolute bottom-0 left-0 right-0 z-30">
                <div class="flex items-center gap-3 mb-1"><div class="h-1.5 flex-1 bg-gray-600/50 rounded-full overflow-hidden"><div id="demo_progressBar" class="h-full bg-blue-500 w-0"></div></div></div>
                <div class="flex justify-between items-end">
                    <div><div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span class="text-xs font-bold text-white tracking-widest uppercase">Left RAPD Simulation</span></div><p class="text-xs text-gray-400 mt-1">Automatic Swinging Flashlight Test Loop</p></div>
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
                        diagnosisLabel.innerHTML = "Right Eye Illuminated <br><span class='text-xs font-normal text-green-300'>Normal Constriction</span>";
                        diagnosisLabel.className = "text-sm font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded border border-green-500/30 text-right";
                    } else if (isLeft) {
                        targetLeft = CONFIG.rapdSize; targetRight = CONFIG.rapdSize;
                        leftIllum.style.opacity = '1'; rightIllum.style.opacity = '0';
                        diagnosisLabel.innerHTML = "Left Eye Illuminated <br><span class='text-xs font-normal text-red-300'>Paradoxical Dilation (RAPD)</span>";
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
    const [isVerified, setIsVerified] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const verifiedId = sessionStorage.getItem('rapd_simulator_access_id');
        if (verifiedId) {
            setMembershipId(verifiedId);
            setIsVerified(true);
        }
    }, []);

    if (!isVerified) {
        // This is a fallback for users who land here directly without verification
        return (
            <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline">Access Denied</CardTitle>
                        <CardDescription className="text-lg">
                           Please launch the simulator from the main information page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Button asChild>
                           <Link href="/opto-tools/rapd-simulator">
                             <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                           </Link>
                       </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return <SimulatorContent />;
}

