
// src/app/opto-tools/ipd-measuring-tool/launch/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';
import {
  ScanFace, Camera, Ruler, Move, Sun, Target, Lightbulb, Check, CheckCircle, Info, History, Trash2, Save, X, Inbox, Zap, Eye, EyeOff, AlertCircle, Timer, Shield, SwitchCamera, User, Loader2
} from 'lucide-react';
import { styles, createKalmanFilter, AVERAGE_IRIS_DIAMETER_MM, AUTO_CAPTURE_DELAY_MS, AUTO_CAPTURE_TOTAL, EYE_ASPECT_RATIO_THRESHOLD, FACE_ANGLE_THRESHOLD, LEFT_EYE_HORIZONTAL, LEFT_EYE_VERTICAL, LEFT_IRIS_CENTER, LEFT_IRIS_POINTS, RIGHT_EYE_HORIZONTAL, RIGHT_EYE_VERTICAL, RIGHT_IRIS_CENTER, RIGHT_IRIS_POINTS, SAMPLES_FOR_CAPTURE, STABILITY_HISTORY_LENGTH } from '@/lib/ipd-helpers';
import type { Metrics, Landmark, FaceResult, HistoryItem, KalmanFilter } from '@/lib/ipd-helpers';

const IPDMeasurement: React.FC = () => {
  // --- Loading & Initialization State ---
  const [loadingStage, setLoadingStage] = useState('permissions'); // permissions, model, ready
  const [loadingMessage, setLoadingMessage] = useState('Requesting camera access...');
  const [webgpuSupported, setWebgpuSupported] = useState(false);
  
  // --- UI & Interaction State ---
  const [statusText, setStatusText] = useState('Initializing...');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'danger'>('warning');
  const [isPerfectCondition, setIsPerfectCondition] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // --- Camera & Mirroring State ---
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMirrored, setIsMirrored] = useState(true);

  // --- Metrics State ---
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [samplesCollected, setSamplesCollected] = useState(0);

  // --- Auto-capture State ---
  const [autoCaptureCount, setAutoCaptureCount] = useState(0);
  const [autoCaptureMeasurements, setAutoCaptureMeasurements] = useState<any[]>([]);
  const [isCollectingCaptures, setIsCollectingCaptures] = useState(false);
  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [autoCaptureProgress, setAutoCaptureProgress] = useState(0);
  const [currentMeasurement, setCurrentMeasurement] = useState<any | null>(null);


  // --- Refs ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const isDetectingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const ipdBufferRef = useRef<number[]>([]);
  const leftPdBufferRef = useRef<number[]>([]);
  const rightPdBufferRef = useRef<number[]>([]);
  const stabilityBufferRef = useRef<{ x: number; y: number }[]>([]);

  const ipdKalmanRef = useRef<KalmanFilter>(createKalmanFilter(62));
  const distanceKalmanRef = useRef<KalmanFilter>(createKalmanFilter(40));
  
  const autoCaptureTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoCaptureStartRef = useRef<number>(0);

  // --- Core Logic ---

  // Silence WASM logs
  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof globalThis !== 'undefined') {
        // @ts-ignore
        globalThis.Module = globalThis.Module || {};
        // @ts-ignore
        globalThis.Module.print = () => {};
        // @ts-ignore
        globalThis.Module.printErr = () => {};
      }
    } catch (err) { /* ignore */ }
  }, []);

  const calculateEARCorrected = useCallback((
    landmarks: Landmark[],
    vertical: { top: number; bottom: number },
    horizontal: { left: number; right: number },
    canvasWidth: number,
    canvasHeight: number
  ): number => {
    const top = landmarks[vertical.top];
    const bottom = landmarks[vertical.bottom];
    const left = landmarks[horizontal.left];
    const right = landmarks[horizontal.right];
  
    const verticalDist = Math.sqrt(
      Math.pow((top.x - bottom.x) * canvasWidth, 2) +
      Math.pow((top.y - bottom.y) * canvasHeight, 2)
    );
  
    const horizontalDist = Math.sqrt(
      Math.pow((left.x - right.x) * canvasWidth, 2) +
      Math.pow((left.y - right.y) * canvasHeight, 2)
    );
  
    return verticalDist / (horizontalDist + 0.0001);
  }, []);

  const calculateMetrics = useCallback((landmarks: Landmark[]): Metrics => {
    const canvas = canvasRef.current;
    if (!canvas) return null as any;
  
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const actualLeftIrisCenter = isMirrored ? RIGHT_IRIS_CENTER : LEFT_IRIS_CENTER;
    const actualRightIrisCenter = isMirrored ? LEFT_IRIS_CENTER : RIGHT_IRIS_CENTER;
    const actualLeftEyeVertical = isMirrored ? RIGHT_EYE_VERTICAL : LEFT_EYE_VERTICAL;
    const actualRightEyeVertical = isMirrored ? LEFT_EYE_VERTICAL : RIGHT_EYE_VERTICAL;
    const actualLeftEyeHorizontal = isMirrored ? RIGHT_EYE_HORIZONTAL : LEFT_EYE_HORIZONTAL;
    const actualRightEyeHorizontal = isMirrored ? LEFT_EYE_HORIZONTAL : RIGHT_EYE_HORIZONTAL;
  
    const leftEAR = calculateEARCorrected(landmarks, actualLeftEyeVertical, actualLeftEyeHorizontal, canvasWidth, canvasHeight);
    const rightEAR = calculateEARCorrected(landmarks, actualRightEyeVertical, actualRightEyeHorizontal, canvasWidth, canvasHeight);
  
    const isLeftEyeOpen = leftEAR > EYE_ASPECT_RATIO_THRESHOLD;
    const isRightEyeOpen = rightEAR > EYE_ASPECT_RATIO_THRESHOLD;
  
    const leftIris = landmarks[LEFT_IRIS_CENTER];
    const rightIris = landmarks[RIGHT_IRIS_CENTER];
  
    const dx = (rightIris.x - leftIris.x) * canvasWidth;
    const dy = (rightIris.y - leftIris.y) * canvasHeight;
    const pixelDistance = Math.sqrt(dx * dx + dy * dy);
  
    const focalLengthPx = canvasWidth * 0.85;
    let rawDistance = (AVERAGE_IRIS_DIAMETER_MM * focalLengthPx) / ((pixelDistance / 63) * 10);
    const filteredDistance = distanceKalmanRef.current.update(rawDistance);
    
    let mmPerPixel = AVERAGE_IRIS_DIAMETER_MM / (filteredDistance * 0.1);

    let rawIpd = pixelDistance * mmPerPixel;
    const filteredIpd = ipdKalmanRef.current.update(rawIpd);

    const noseBridge = landmarks[168];
    const leftPd = Math.abs(leftIris.x - noseBridge.x) * canvasWidth * mmPerPixel;
    const rightPd = Math.abs(rightIris.x - noseBridge.x) * canvasWidth * mmPerPixel;

    const faceAngle = Math.atan2((rightIris.y - leftIris.y) * canvasHeight, dx) * (180 / Math.PI);
    
    const stability = 100; // Placeholder
    const centered = true; // Placeholder
    const lighting = 100; // Placeholder

    let accuracy = 100;
    if (filteredDistance < 30) accuracy -= (30 - filteredDistance) * 3;
    if (filteredDistance > 50) accuracy -= (filteredDistance - 50) * 2;
    if (Math.abs(faceAngle) > FACE_ANGLE_THRESHOLD) accuracy -= Math.abs(faceAngle) * 2;
    if (!isLeftEyeOpen || !isRightEyeOpen) accuracy -= 30;

    return {
      ipd: filteredIpd, leftPd, rightPd, distance: filteredDistance, lighting,
      accuracy, faceAngle, leftEyeOpen: isLeftEyeOpen, rightEyeOpen: isRightEyeOpen, faceStability: stability, faceCentered: centered
    };
  }, [isMirrored, calculateEARCorrected]);

  const drawLandmarks = useCallback((landmarks: Landmark[], metrics: Metrics) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const getDisplayX = (x: number): number => x * canvas.width;
  
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    landmarks.forEach((point) => {
      ctx.beginPath();
      ctx.arc(getDisplayX(point.x), point.y * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    });
  
    const displayLeftIrisIndex = isMirrored ? RIGHT_IRIS_CENTER : LEFT_IRIS_CENTER;
    const displayRightIrisIndex = isMirrored ? LEFT_IRIS_CENTER : RIGHT_IRIS_CENTER;
  
    const leftIrisDisplay = landmarks[displayLeftIrisIndex];
    const rightIrisDisplay = landmarks[displayRightIrisIndex];
  
    const leftColor = metrics.leftEyeOpen ? '#3b82f6' : '#ef4444';
    const rightColor = metrics.rightEyeOpen ? '#3b82f6' : '#ef4444';
  
    ctx.fillStyle = leftColor;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(getDisplayX(leftIrisDisplay.x), leftIrisDisplay.y * canvas.height, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('L', getDisplayX(leftIrisDisplay.x), leftIrisDisplay.y * canvas.height - 15);
  
    ctx.fillStyle = rightColor;
    ctx.beginPath();
    ctx.arc(getDisplayX(rightIrisDisplay.x), rightIrisDisplay.y * canvas.height, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  
    ctx.fillStyle = '#ffffff';
    ctx.fillText('R', getDisplayX(rightIrisDisplay.x), rightIrisDisplay.y * canvas.height - 15);
  
    if (metrics.leftEyeOpen && metrics.rightEyeOpen) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(getDisplayX(leftIrisDisplay.x), leftIrisDisplay.y * canvas.height);
      ctx.lineTo(getDisplayX(rightIrisDisplay.x), rightIrisDisplay.y * canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);
  
      const midX = (getDisplayX(leftIrisDisplay.x) + getDisplayX(rightIrisDisplay.x)) / 2;
      const midY = (leftIrisDisplay.y + rightIrisDisplay.y) * canvas.height / 2 - 25;
  
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.roundRect(midX - 35, midY - 12, 70, 24, 12);
      ctx.fill();
  
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px -apple-system, sans-serif';
      ctx.fillText(`${metrics.ipd.toFixed(1)} mm`, midX, midY + 4);
    }
  }, [isMirrored]);

  const addSample = useCallback((metrics: Metrics) => {
    if (metrics.accuracy >= 85 && metrics.leftEyeOpen && metrics.rightEyeOpen) {
      ipdBufferRef.current.push(metrics.ipd);
      leftPdBufferRef.current.push(metrics.leftPd);
      rightPdBufferRef.current.push(metrics.rightPd);

      if (ipdBufferRef.current.length > SAMPLES_FOR_CAPTURE) {
        ipdBufferRef.current.shift();
        leftPdBufferRef.current.shift();
        rightPdBufferRef.current.shift();
      }
      setSamplesCollected(ipdBufferRef.current.length);
    }
  }, []);

  const calculateAveragedMeasurement = useCallback(() => {
    if (ipdBufferRef.current.length < 10) return null;
    const sorted = [...ipdBufferRef.current].sort((a,b) => a-b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const filteredIpd = ipdBufferRef.current.filter(v => v >= lowerBound && v <= upperBound);
    const filteredLeft = leftPdBufferRef.current.filter((_,i) => ipdBufferRef.current[i] >= lowerBound && ipdBufferRef.current[i] <= upperBound);
    const filteredRight = rightPdBufferRef.current.filter((_,i) => ipdBufferRef.current[i] >= lowerBound && ipdBufferRef.current[i] <= upperBound);

    if (filteredIpd.length < 5) return null;

    const avgIpd = filteredIpd.reduce((a,b) => a+b, 0) / filteredIpd.length;
    const avgLeft = filteredLeft.reduce((a,b) => a+b, 0) / filteredLeft.length;
    const avgRight = filteredRight.reduce((a,b) => a+b, 0) / filteredRight.length;
    const stdDev = Math.sqrt(filteredIpd.reduce((s, v) => s + Math.pow(v - avgIpd, 2), 0) / filteredIpd.length);
    const confidence = Math.max(0, Math.min(100, 100 - stdDev * 10));

    return { ipd: avgIpd, leftPd: avgLeft, rightPd: avgRight, accuracy: Math.round((confidence + 95)/2), samples: filteredIpd.length, confidence };
  }, []);

  const calculateFinalAverage = useCallback((measurements: any[]) => {
    if (measurements.length === 0) return { ipd: 0, leftPd: 0, rightPd: 0, accuracy: 0, samples: 0, confidence: 0 };
    const sortedByIpd = [...measurements].sort((a,b) => a.ipd - b.ipd);
    const medianIpd = sortedByIpd[Math.floor(sortedByIpd.length / 2)].ipd;
    
    let totalWeight = 0, weightedIpd = 0, weightedLeftPd = 0, weightedRightPd = 0, totalSamples = 0, avgConfidence = 0, avgAccuracy = 0;
    
    measurements.forEach(m => {
      const weight = m.confidence / 100;
      totalWeight += weight;
      weightedIpd += m.ipd * weight;
      weightedLeftPd += m.leftPd * weight;
      weightedRightPd += m.rightPd * weight;
      totalSamples += m.samples;
      avgConfidence += m.confidence;
      avgAccuracy += m.accuracy;
    });

    const blendedIpd = (medianIpd * 0.4) + ((weightedIpd/totalWeight) * 0.6);
    const ipdRange = Math.max(...measurements.map(m=>m.ipd)) - Math.min(...measurements.map(m=>m.ipd));
    const consistencyBonus = ipdRange < 1 ? 5 : (ipdRange < 2 ? 2: 0);

    return {
      ipd: blendedIpd,
      leftPd: weightedLeftPd / totalWeight,
      rightPd: weightedRightPd / totalWeight,
      accuracy: Math.min(100, (avgAccuracy / measurements.length) + consistencyBonus),
      samples: totalSamples,
      confidence: Math.min(100, (avgConfidence / measurements.length) + consistencyBonus),
    };
  }, []);

  const checkPerfectConditions = useCallback((m: Metrics) => {
    return (
      m.accuracy >= 92 &&
      m.faceStability >= 95 &&
      m.leftEyeOpen &&
      m.rightEyeOpen &&
      m.faceCentered &&
      Math.abs(m.faceAngle) < FACE_ANGLE_THRESHOLD &&
      m.distance >= 30 &&
      m.distance <= 50 &&
      m.lighting >= 60
    );
  }, []);

  const detectFace = useCallback(async () => {
    if (!isDetectingRef.current || !faceLandmarkerRef.current) return;

    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      animationFrameRef.current = requestAnimationFrame(detectFace);
      return;
    }

    try {
      const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());
      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0];
        const calculatedMetrics = calculateMetrics(landmarks);

        if (calculatedMetrics) {
          setMetrics(calculatedMetrics);
          addSample(calculatedMetrics);
          drawLandmarks(landmarks, calculatedMetrics);
          
          const isPerfect = checkPerfectConditions(calculatedMetrics);
          setIsPerfectCondition(isPerfect);
          setStatusText(isPerfect ? 'Perfect! Hold Still...' : 'Ready');
          setStatusType(isPerfect ? 'success' : 'success');

          if (isPerfect) {
            setStatusText(`Capturing ${autoCaptureCount + 1}/${AUTO_CAPTURE_TOTAL}...`);
            if (!autoCaptureTimerRef.current && ipdBufferRef.current.length >= 15) {
              autoCaptureStartRef.current = Date.now();
              setIsAutoCapturing(true);
              setIsCollectingCaptures(true);
          
              autoCaptureTimerRef.current = setTimeout(() => {
                const measurement = calculateAveragedMeasurement();
                if (measurement) {
                  const newMeasurements = [...autoCaptureMeasurements, measurement];
                  setAutoCaptureMeasurements(newMeasurements);
                  setAutoCaptureCount(prev => prev + 1);
          
                  if (newMeasurements.length >= AUTO_CAPTURE_TOTAL) {
                    const finalMeasurement = calculateFinalAverage(newMeasurements);
                    setCurrentMeasurement(finalMeasurement);
                    setShowModal(true);
                    setAutoCaptureCount(0);
                    setAutoCaptureMeasurements([]);
                    setIsCollectingCaptures(false);
                  } else {
                    ipdBufferRef.current = [];
                    leftPdBufferRef.current = [];
                    rightPdBufferRef.current = [];
                    setSamplesCollected(0);
                  }
                }
                setIsAutoCapturing(false);
                setAutoCaptureProgress(0);
                autoCaptureTimerRef.current = null;
              }, AUTO_CAPTURE_DELAY_MS);
            }
            if (isAutoCapturing) {
              const elapsed = Date.now() - autoCaptureStartRef.current;
              setAutoCaptureProgress(Math.min(100, (elapsed / AUTO_CAPTURE_DELAY_MS) * 100));
            }
          } else if (autoCaptureTimerRef.current) {
            clearTimeout(autoCaptureTimerRef.current);
            autoCaptureTimerRef.current = null;
            setIsAutoCapturing(false);
            setAutoCaptureProgress(0);
          }
        }
      } else {
        setStatusText('No Face Detected');
        setStatusType('warning');
        setMetrics(null);
      }
    } catch(err) {
      console.error(err);
    }

    animationFrameRef.current = requestAnimationFrame(detectFace);
  }, [calculateMetrics, drawLandmarks, addSample, checkPerfectConditions, calculateAveragedMeasurement, autoCaptureCount, autoCaptureMeasurements, isAutoCapturing, calculateFinalAverage]);

  // Main Initialization Effect
  useEffect(() => {
    let cleanup = () => {};

    const initialize = async () => {
      setLoadingStage('permissions');
      setLoadingMessage('Requesting camera access...');

      let stream: MediaStream;
      try {
        const hasWebGPU = await ('gpu' in navigator && (navigator as any).gpu.requestAdapter().then((a:any) => a !== null).catch(()=>false));
        setWebgpuSupported(hasWebGPU);

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setLoadingMessage('Camera access denied. Please enable camera permissions.');
        return;
      }
      
      cleanup = () => stream.getTracks().forEach(track => track.stop());

      setLoadingStage('model');
      setLoadingMessage('Loading AI model...');

      try {
        const vision = await import('@mediapipe/tasks-vision');
        const filesetResolver = await vision.FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        faceLandmarkerRef.current = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: webgpuSupported ? 'GPU' : 'CPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1
        });
      } catch (err) {
        console.error("MediaPipe model load failed:", err);
        setLoadingMessage('Failed to load AI model. Please try again.');
        return;
      }
      
      if(canvasRef.current && videoRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
      }

      setLoadingStage('ready');
      isDetectingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(detectFace);
    };

    initialize();

    const savedHistory = localStorage.getItem('ipdHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    return () => {
      cleanup();
      isDetectingRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [detectFace, webgpuSupported]);

  const switchCamera = useCallback(async () => {
    // Implementation for camera switching
  }, []);

  const getVideoStyle = (): React.CSSProperties => ({
    ...styles.video,
    transform: isMirrored ? 'scaleX(-1)' : 'none',
  });
  
  const getCanvasStyle = (): React.CSSProperties => ({
    ...styles.canvas,
    transform: isMirrored ? 'scaleX(-1)' : 'none',
  });

  const handleManualCapture = () => {
    const measurement = calculateAveragedMeasurement();
    if(measurement) {
      setCurrentMeasurement(measurement);
      setShowModal(true);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setAutoCaptureCount(0);
    setAutoCaptureMeasurements([]);
    setIsCollectingCaptures(false);
    ipdBufferRef.current = [];
    leftPdBufferRef.current = [];
    rightPdBufferRef.current = [];
    setSamplesCollected(0);
  };
  
  const handleSaveResult = () => {
    if (currentMeasurement) {
      const historyItem: HistoryItem = {
        ipd: currentMeasurement.ipd.toFixed(1),
        accuracy: currentMeasurement.accuracy,
        timestamp: new Date().toLocaleString(),
        samples: currentMeasurement.samples,
        captures: AUTO_CAPTURE_TOTAL,
      };
      const newHistory = [historyItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('ipdHistory', JSON.stringify(newHistory));
    }
    handleCloseModal();
  };

  if (loadingStage !== 'ready') {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loader} />
        <div style={styles.loadingText}>{loadingMessage}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle} className="header-title-responsive">
          <ScanFace size={32} color="#2563eb" />
          IPD Measurement Tool
        </h1>
      </header>

      {/* Camera Section */}
      <div style={{ ...styles.cameraSection, gridTemplateColumns: '1fr 340px' }} className="camera-section-responsive">
        <div style={styles.cameraContainer} className="camera-container-responsive">
          <video ref={videoRef} style={getVideoStyle()} playsInline autoPlay muted />
          <canvas ref={canvasRef} style={getCanvasStyle()} />
          <div style={{...styles.statusBadge, top: '16px', left: '16px'}}>
            <div style={{...styles.statusDot, background: statusType === 'success' ? '#10b981' : '#f59e0b'}} />
            <span>{statusText}</span>
          </div>
          {webgpuSupported && <div style={styles.webgpuBadge}><Zap size={12}/> WebGPU</div>}
          <button onClick={switchCamera} style={{...styles.statusBadge, top: '16px', right: '16px', left: 'auto', cursor: 'pointer'}}>
            <SwitchCamera size={20} />
          </button>
           <div style={{...styles.statusBadge, bottom: '20px', left: '16px'}}>
            {facingMode === 'user' ? <User size={14}/> : <Camera size={14}/>}
            <span>{facingMode === 'user' ? 'Selfie' : 'Rear'} Camera</span>
          </div>

          {(isAutoCapturing || isCollectingCaptures) && (
            <div style={styles.autoCaptureIndicator}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Timer size={18} />
                <span>
                  {isAutoCapturing ? `Capturing ${autoCaptureCount + 1}/${AUTO_CAPTURE_TOTAL}...` : `Preparing capture ${autoCaptureCount + 1}/${AUTO_CAPTURE_TOTAL}`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {Array.from({ length: AUTO_CAPTURE_TOTAL }).map((_, i) => (
                  <div key={i} style={{
                      width: i === autoCaptureCount && isAutoCapturing ? '24px' : '12px', height: '12px', borderRadius: '6px',
                      background: i < autoCaptureCount ? '#10b981' : i === autoCaptureCount ? 'white' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                    }}>
                    {i === autoCaptureCount && isAutoCapturing && (
                      <div style={{ width: `${autoCaptureProgress}%`, height: '100%', background: '#10b981', transition: 'width 0.1s' }} />
                    )}
                    {i < autoCaptureCount && <Check size={8} color="white" />}
                  </div>
                ))}
              </div>
              {autoCaptureMeasurements.length > 0 && (
                <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', gap: '12px' }}>
                  {autoCaptureMeasurements.map((m, i) => ( <span key={i}>#{i + 1}: {m.ipd.toFixed(1)}mm</span> ))}
                </div>
              )}
            </div>
          )}

          <button onClick={handleManualCapture} style={{...styles.captureBtn, ...(isPerfectCondition && styles.captureBtnReady)}} disabled={!isPerfectCondition}>
            <Camera size={28} />
          </button>
        </div>
        
        {/* Metrics Panel */}
        <div style={styles.metricsPanel}>
          {/* IPD, Distance, Lighting, Accuracy metrics */}
        </div>
      </div>

      {/* Instructions */}
      <div style={styles.instructions}>
        <h3 style={styles.instructionsTitle}><Lightbulb size={16}/> Tips</h3>
        <ul style={styles.instructionsList}>
          {/* Instruction items */}
        </ul>
      </div>

      {/* History */}
      <div style={styles.historySection}>
        {/* History items */}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ ...styles.modalOverlay, ...styles.modalOverlayShow }}>
          <div style={{ ...styles.modal, ...styles.modalShow }}>
            {/* Modal content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default IPDMeasurement;
