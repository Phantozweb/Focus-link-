
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

const CONFIG = {
  baselineSize: 22,
  constrictedSize: 9,
  rapdSize: 18,
  swingSpeed: 0.002,
  widthSpan: 160,
};

export function RapdSimulatorDemo() {
  const [flashlightPos, setFlashlightPos] = useState({ x: 0, y: 0, rotation: 0 });
  const [pupilState, setPupilState] = useState({ left: CONFIG.baselineSize, right: CONFIG.baselineSize });
  const [illumination, setIllumination] = useState({ left: 0, right: 0 });
  const [progress, setProgress] = useState(0);
  const [diagnosis, setDiagnosis] = useState({ text: 'Transit (Darkness)', className: 'text-sm font-bold text-gray-400 bg-gray-800/50 px-2 py-1 rounded' });

  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }
    const elapsed = timestamp - startTimeRef.current;
    
    // Animate Flashlight
    const cycle = Math.sin(elapsed * CONFIG.swingSpeed);
    const xPos = cycle * CONFIG.widthSpan;
    const yPos = Math.cos(elapsed * CONFIG.swingSpeed * 2) * 10;
    setFlashlightPos({
      x: xPos,
      y: -140 + yPos,
      rotation: -xPos * 0.15,
    });

    // Animate Progress Bar
    const newProgress = (Math.sin(elapsed * CONFIG.swingSpeed - Math.PI / 2) + 1) / 2 * 100;
    setProgress(newProgress);

    // Determine Illumination and Diagnosis
    const isLeft = xPos < -60;
    const isRight = xPos > 60;

    let targetLeft = CONFIG.baselineSize;
    let targetRight = CONFIG.baselineSize;
    let newIllumination = { left: 0, right: 0 };
    let newDiagnosis = { ...diagnosis };

    if (isRight) {
      targetLeft = CONFIG.constrictedSize;
      targetRight = CONFIG.constrictedSize;
      newIllumination = { left: 0, right: 1 };
      newDiagnosis = { text: 'Right Eye Illuminated<br/><span class="text-[10px] font-normal text-green-300">Normal Constriction</span>', className: 'text-sm font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded border border-green-500/30 text-right' };
    } else if (isLeft) {
      targetLeft = CONFIG.rapdSize;
      targetRight = CONFIG.rapdSize;
      newIllumination = { left: 1, right: 0 };
      newDiagnosis = { text: 'Left Eye Illuminated<br/><span class="text-[10px] font-normal text-red-300">Paradoxical Dilation (RAPD)</span>', className: 'text-sm font-bold text-red-400 bg-red-900/30 px-2 py-1 rounded border border-red-500/30 text-right' };
    } else {
      newDiagnosis = { text: "Transit (Darkness)", className: "text-sm font-bold text-gray-400 bg-gray-800/50 px-2 py-1 rounded" };
    }
    setIllumination(newIllumination);
    setDiagnosis(newDiagnosis);

    // Animate Pupils
    setPupilState(prevState => ({
      left: prevState.left + (targetLeft - prevState.left) * 0.1,
      right: prevState.right + (targetRight - prevState.right) * 0.1,
    }));

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [diagnosis]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="demo-video-container group" style={{ aspectRatio: '16/9.5' }}>
      <div className="scanlines absolute inset-0 z-10 opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80%] max-w-[600px] flex justify-between items-center z-0" style={{ marginTop: '-40px' }}>
          {/* Left Eye */}
          <div className="relative w-[45%] aspect-[3/2]">
            <div className="absolute -inset-8 rounded-full transition-opacity duration-200" style={{ opacity: illumination.left, background: 'radial-gradient(circle, rgba(255,250,205,0.4) 0%, transparent 70%)' }}></div>
            <svg viewBox="0 0 180 120" className="w-full h-full">
              <defs>
                  <radialGradient id="demo_sclera" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="#e5e7eb"/><stop offset="100%" stopColor="#9ca3af"/></radialGradient>
                  <radialGradient id="demo_irisBlue" cx="35%" cy="35%" r="65%"><stop offset="0%" stopColor="#6b9bc3"/><stop offset="60%" stopColor="#2d5a7b"/><stop offset="100%" stopColor="#1a3a55"/></radialGradient>
                  <radialGradient id="demo_pupil" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#1a1a1a"/><stop offset="100%" stopColor="#000000"/></radialGradient>
                  <clipPath id="demo_eyeShape"><ellipse cx="90" cy="60" rx="80" ry="48"/></clipPath>
              </defs>
              <ellipse cx="90" cy="60" rx="80" ry="48" fill="url(#demo_sclera)"/>
              <circle cx="90" cy="60" r="30" fill="url(#demo_irisBlue)"/>
              <circle cx="90" cy="60" r={pupilState.left} fill="url(#demo_pupil)" className="pupil-transition"/>
              <ellipse cx="82" cy="52" rx="5" ry="3.5" fill="white" opacity="0.6"/>
              <g clipPath="url(#demo_eyeShape)"><path d="M10 55 Q90 35 170 52" stroke="#4b5563" strokeWidth="2" fill="none" opacity="0.3"/><path d="M10 65 Q90 85 170 68" stroke="#4b5563" strokeWidth="2" fill="none" opacity="0.3"/></g>
            </svg>
          </div>
          {/* Nose Bridge */}
          <div className="w-4 h-16 bg-gray-700/30 rounded-full blur-sm"></div>
          {/* Right Eye */}
          <div className="relative w-[45%] aspect-[3/2]">
              <div className="absolute -inset-8 rounded-full transition-opacity duration-200" style={{ opacity: illumination.right, background: 'radial-gradient(circle, rgba(255,250,205,0.4) 0%, transparent 70%)' }}></div>
              <svg viewBox="0 0 180 120" className="w-full h-full">
                  <ellipse cx="90" cy="60" rx="80" ry="48" fill="url(#demo_sclera)"/>
                  <circle cx="90" cy="60" r="30" fill="url(#demo_irisBlue)"/>
                  <circle cx="90" cy="60" r={pupilState.right} fill="url(#demo_pupil)" className="pupil-transition"/>
                  <ellipse cx="82" cy="52" rx="5" ry="3.5" fill="white" opacity="0.6"/>
                  <g clipPath="url(#demo_eyeShape)"><path d="M10 55 Q90 35 170 52" stroke="#4b5563" strokeWidth="2" fill="none" opacity="0.3"/><path d="M10 65 Q90 85 170 68" stroke="#4b5563" strokeWidth="2" fill="none" opacity="0.3"/></g>
              </svg>
          </div>
        </div>
        {/* Flashlight */}
        <div className="absolute z-20 w-16 h-32 will-change-transform" style={{ top: '100%', left: '50%', transform: `translate(calc(-50% + ${flashlightPos.x}px), ${flashlightPos.y}px) rotate(${flashlightPos.rotation}deg)` }}>
          <div className="light-beam-demo absolute bottom-[85%] left-1/2 -translate-x-1/2 w-[140px] h-[200px] pointer-events-none" style={{opacity: (illumination.left || illumination.right) ? 0.8 : 0.3 }}>
              <svg viewBox="0 0 120 160" className="w-full h-full" style={{filter: 'blur(8px)'}}><path d="M40 160 Q60 80 60 0 Q60 80 80 160 Z" fill="rgba(255, 250, 205, 0.6)"/></svg>
          </div>
          <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-2xl">
              <defs><linearGradient id="demo_bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#374151"/><stop offset="50%" stopColor="#6b7280"/><stop offset="100%" stopColor="#374151"/></linearGradient><radialGradient id="demo_lensGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fefce8"/><stop offset="100%" stopColor="#eab308"/></radialGradient></defs>
              <ellipse cx="30" cy="10" rx="24" ry="9" fill="#b45309"/><ellipse cx="30" cy="10" rx="20" ry="7" fill="url(#demo_lensGrad)"/><rect x="12" y="24" width="36" height="42" rx="4" fill="url(#demo_bodyGrad)"/><rect x="22" y="26" width="16" height="5" rx="2" fill="#22c55e"/><rect x="16" y="66" width="28" height="12" rx="3" fill="#44403c"/>
          </svg>
        </div>
      </div>
      {/* Player UI */}
      <div className="player-ui absolute bottom-0 left-0 right-0 p-4 z-30">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-1.5 flex-1 bg-gray-600/50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span className="text-xs font-bold text-white tracking-widest uppercase">Left RAPD Simulation</span></div>
            <p className="text-[10px] text-gray-400 mt-1">Automatic Swinging Flashlight Test Loop</p>
          </div>
          <div className="text-right">
            <div className={diagnosis.className} dangerouslySetInnerHTML={{ __html: diagnosis.text }} />
          </div>
        </div>
      </div>

       <style jsx>{`
        .demo-video-container { position: relative; width: 100%; max-width: 900px; background: radial-gradient(circle at center, #1f2937 0%, #0f172a 100%); border-radius: 8px; overflow: hidden; }
        .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1)); background-size: 100% 4px; pointer-events: none; }
        .pupil-transition { transition: r 0.1s linear; }
        .light-beam-demo { transition: opacity 0.15s ease-out; transform-origin: bottom center; }
        .player-ui { background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
        .will-change-transform { will-change: transform; }
      `}</style>
    </div>
  );
}
