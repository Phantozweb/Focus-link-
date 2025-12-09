
'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  ScanFace,
  Camera,
  Ruler,
  Move,
  Sun,
  Target,
  Lightbulb,
  Check,
  CheckCircle,
  Info,
  History,
  Trash2,
  Save,
  X,
  Inbox,
  Zap,
  Eye,
  EyeOff,
  AlertCircle,
  Timer,
  Shield,
  SwitchCamera,
  User,
  RefreshCw
} from 'lucide-react';
import type { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// --- Type Definitions ---
type FaceLandmarkerType = FaceLandmarker;
type FaceResult = {
  faceLandmarks: { x: number; y: number; z: number }[][];
};

type FaceDetectorAPI = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => FaceResult;
  close?: () => void;
};

// --- Main Component ---
export default function IPDMeasurementPageClient() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detectorRef = useRef<FaceDetectorAPI | null>(null);
  const runningRef = useRef(false);
  const lastFrameTsRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  // --- SILENCE WASM / Emscripten printing BEFORE loading MediaPipe ---
  useEffect(() => {
    setIsClient(true);
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.Module = window.Module || {};
        // @ts-ignore
        window.Module.print = () => {};
        // @ts-ignore
        window.Module.printErr = () => {};
      }
    } catch (err) {
      // Best effort, ignore if it fails (e.g. in a very restrictive environment)
    }
  }, []);

  // --- Initialize camera ---
  useEffect(() => {
    let cancelled = false;
    async function setupCamera() {
      if (!isClient) return;
      const video = document.createElement('video');
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      video.width = 640;
      video.height = 480;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        video.srcObject = stream;
        await video.play();
        if (videoRef.current == null) {
          videoRef.current = video;
        }
      } catch (e) {
        console.error('Camera init failed', e);
      }
    }
    void setupCamera();
    return () => {
      cancelled = true;
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isClient]);

  // --- Initialize MediaPipe detector safely ---
  useEffect(() => {
    if (!isClient) return;
    let mounted = true;
    let currentDetector: FaceDetectorAPI | null = null;

    async function initDetector() {
      try {
        const mp = await import('@mediapipe/tasks-vision');
        const { FilesetResolver, FaceLandmarker } = mp;

        const visionWasmPath = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/vision_wasm_internal.wasm';
        const fileset = await FilesetResolver.forVisionTasks(visionWasmPath);
        
        const detector = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU'
          },
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
          runningMode: 'VIDEO',
          numFaces: 1,
        });

        if (!mounted) {
          detector.close?.();
          return;
        }

        currentDetector = detector as unknown as FaceDetectorAPI;
        detectorRef.current = currentDetector;
      } catch (err) {
        console.error('MediaPipe init failed', err);
      }
    }

    void initDetector();

    return () => {
      mounted = false;
      currentDetector?.close?.();
      detectorRef.current = null;
    };
  }, [isClient]);

  // --- Detection loop with throttle and single-active-processing guard ---
  const detectLoop = useCallback(async () => {
    if (!isClient) return;
    const video = videoRef.current;
    const detector = detectorRef.current;

    if (!video || !detector) {
      if (mountedRef.current) {
        animationFrameId.current = requestAnimationFrame(detectLoop);
      }
      return;
    }
    
    if (runningRef.current) {
      if (mountedRef.current) {
        animationFrameId.current = requestAnimationFrame(detectLoop);
      }
      return;
    }

    const now = performance.now();
    if (now - lastFrameTsRef.current < 100) {
      if (mountedRef.current) {
        animationFrameId.current = requestAnimationFrame(detectLoop);
      }
      return;
    }
    lastFrameTsRef.current = now;

    runningRef.current = true;
    try {
      const result = detector.detectForVideo(video, now);
      // Your existing logic to handle `result` (measure IPD, draw overlays, etc.) goes here.
    } catch (err) {
      console.error('Detection error (caught)', err);
      await new Promise((res) => setTimeout(res, 200));
    } finally {
      runningRef.current = false;
      if (mountedRef.current) {
        animationFrameId.current = requestAnimationFrame(detectLoop);
      }
    }
  }, [isClient]);

  // Ref to track if component is mounted
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);


  // --- Start the loop once video + detector are ready ---
  useEffect(() => {
    if (!isClient) return;

    const startWhenReady = () => {
      if (videoRef.current && detectorRef.current) {
        if (mountedRef.current) {
          animationFrameId.current = requestAnimationFrame(detectLoop);
        }
      } else {
        if (mountedRef.current) {
          animationFrameId.current = requestAnimationFrame(startWhenReady);
        }
      }
    };

    animationFrameId.current = requestAnimationFrame(startWhenReady);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isClient, detectLoop]);

  return (
     <div>
      {isClient ? (
        <>
          <h2>IPD Measurement (client)</h2>
          <p>Video runs offscreen. Check console for status (errors are suppressed by Module.printErr override).</p>
          {/* You can add a visible video element here for debugging if needed */}
          {/* <video ref={el => { if (el && videoRef.current) el.srcObject = videoRef.current.srcObject; }} autoPlay playsInline muted /> */}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

