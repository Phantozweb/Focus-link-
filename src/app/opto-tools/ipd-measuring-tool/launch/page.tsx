// src/app/opto-tools/ipd-measuring-tool/launch/page.client.tsx
'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

type FaceDetectorAPI = {
  // replace with the concrete types you use (FaceLandmarker/FaceDetector etc.)
  detect: (input: HTMLVideoElement | ImageBitmap | HTMLCanvasElement) => Promise<any>;
  close?: () => void;
};

export default function IPDMeasurementPageClient() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detectorRef = useRef<FaceLandmarker | null>(null);
  const runningRef = useRef(false);
  const lastFrameTsRef = useRef(0);

  // --- SILENCE WASM / Emscripten printing BEFORE loading MediaPipe ---
  // This must run before the wasm script executes. We set minimal Module print handlers.
  useEffect(() => {
    // If Module already exists (older runtime), patch print functions too.
    // This prevents Emscripten runtime from writing to console.error which Next overlays.
    try {
      // set no-op print functions to suppress harmless wasm logs
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof globalThis !== 'undefined') {
        // Provide minimal Emscripten module hooks used by some mediapipe builds
        // These are intentionally tiny no-ops — if you want logs, change them.
        // Set them very early (before importing the mediapipe bundle).
        // Some bundlers or CDNs will honor these when the wasm module initializes.
        // We create the object if missing.
        // @ts-ignore
        globalThis.Module = globalThis.Module || {};
        // @ts-ignore
        globalThis.Module.print = () => {};        // stdout
        // @ts-ignore
        globalThis.Module.printErr = () => {};     // stderr (where XNNPACK prints)
      }
    } catch (err) {
      // ignore - best effort
      // If this throws, we'll still proceed to normal initialization below.
      // Avoid throwing here because this runs during render lifecycle.
    }
  }, []);

  // --- Initialize camera ---
  useEffect(() => {
    let cancelled = false;
    async function setupCamera() {
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
          // append offscreen or hidden to DOM if needed (not required)
          // document.body.appendChild(video) // avoid unless you want preview
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
  }, []);

  // --- Initialize MediaPipe detector safely (dynamic import) ---
  useEffect(() => {
    let mounted = true;
    let currentDetector: FaceLandmarker | null = null;

    async function initDetector() {
      try {
        const fileset = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        const detector = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
        });

        if (!mounted) {
          detector.close?.();
          return;
        }

        currentDetector = detector;
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
  }, []);

  // --- Detection loop with throttle and single-active-processing guard ---
  const detectLoop = useCallback(async () => {
    const video = videoRef.current;
    const detector = detectorRef.current;
    if (!video || !detector) {
        if (typeof window !== 'undefined') requestAnimationFrame(detectLoop);
        return;
    }
    if (runningRef.current) {
        if (typeof window !== 'undefined') requestAnimationFrame(detectLoop);
        return;
    } 

    const now = performance.now();
    // throttle to ~10 FPS (100 ms) — tune down/up as needed for your CPU
    if (now - lastFrameTsRef.current < 100) {
      if (typeof window !== 'undefined') requestAnimationFrame(detectLoop);
      return;
    }
    lastFrameTsRef.current = now;

    runningRef.current = true;
    try {
      // Use try/catch around each single detection to avoid unhandled WASM exceptions.
      const result = detector.detectForVideo(video, now);
      // handle result (measure IPD, draw overlays, etc.)
    } catch (err) {
      // if wasm reported an internal error, we catch it here and avoid crashing the loop
      console.error('Detection error (caught)', err);
      // wait a short time if errors repeat to avoid tight error loops
      await new Promise((res) => setTimeout(res, 200));
    } finally {
      // If the Emscripten module needs to be idled, allow it to finish safely.
      // Many builds expose Module._waitUntilIdle — we call it defensively if present.
      try {
        // @ts-ignore
        if (globalThis.Module && typeof globalThis.Module._waitUntilIdle === 'function') {
          // don't await forever — give it a small timeout wrapper if necessary
          // but most builds return quickly
          // @ts-ignore
          await Promise.race([
            // @ts-ignore
            globalThis.Module._waitUntilIdle(),
            new Promise((r) => setTimeout(r, 250)),
          ]);
        }
      } catch (e) {
        // ignore _waitUntilIdle errors — we don't want detection to crash
      }
      runningRef.current = false;
      if (typeof window !== 'undefined') requestAnimationFrame(detectLoop);
    }
  }, []);

  // start the loop once video + detector are ready
  useEffect(() => {
    let raf: number;
    const startWhenReady = () => {
      // attempt to start only if video and detector are available
      if (videoRef.current && detectorRef.current) {
        // start loop
        raf = requestAnimationFrame(detectLoop);
        return;
      }
      // poll until both ready
      raf = requestAnimationFrame(startWhenReady);
    };
    raf = requestAnimationFrame(startWhenReady);
    return () => cancelAnimationFrame(raf);
  }, [detectLoop]);

  return (
    <div>
      <h2>IPD Measurement (client)</h2>
      <p>Video runs offscreen. Check console for status (errors are suppressed by Module.printErr override).</p>
      {/* If you want to show preview: */}
      {/* <video ref={(el) => { if (el && !el.srcObject) { if (videoRef.current) el.srcObject = videoRef.current.srcObject; }}} autoPlay muted playsInline /> */}
    </div>
  );
}
