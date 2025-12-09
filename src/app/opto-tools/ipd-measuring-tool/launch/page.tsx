
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import {
  ScanFace, Camera, Ruler, Move, Sun, Target, Lightbulb, Check, CheckCircle, Info, History, Trash2, Save, X, Inbox, Zap, Eye, EyeOff, AlertCircle, Timer, Shield, SwitchCamera, User, RefreshCw
} from 'lucide-react';

// Types
type Landmark = { x: number; y: number; z: number };
type FaceResult = { faceLandmarks: Landmark[][] };
type Metrics = {
  ipd: number; leftPd: number; rightPd: number; distance: number; lighting: number; accuracy: number; faceAngle: number;
  leftEyeOpen: boolean; rightEyeOpen: boolean; faceStability: number; faceCentered: boolean;
};
type HistoryItem = { ipd: string; accuracy: number; timestamp: string; samples: number, captures?: number };
type FaceLandmarkerType = FaceLandmarker;
type FaceBounds = { x: number; y: number; width: number; height: number };
interface KalmanFilter {
  x: number; p: number; q: number; r: number;
  update: (measurement: number) => number;
}
type LoadingStage = 'IDLE' | 'LOADING_PERMISSIONS' | 'LOADING_MODEL' | 'STARTING_CAMERA' | 'READY' | 'ERROR';

// Constants
const AVERAGE_IRIS_DIAMETER_MM = 11.7;
const AVERAGE_FACE_WIDTH_MM = 140;
const IDEAL_DISTANCE_CM = 40;
const MIN_DISTANCE_CM = 30;
const MAX_DISTANCE_CM = 50;
const LEFT_IRIS_CENTER = 468;
const RIGHT_IRIS_CENTER = 473;
const LEFT_IRIS_POINTS = [469, 470, 471, 472];
const RIGHT_IRIS_POINTS = [474, 475, 476, 477];
const LEFT_EYE_VERTICAL = { top: 159, bottom: 145 };
const LEFT_EYE_HORIZONTAL = { left: 33, right: 133 };
const RIGHT_EYE_VERTICAL = { top: 386, bottom: 374 };
const RIGHT_EYE_HORIZONTAL = { left: 362, right: 263 };
const FACE_CONTOUR = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109, 10,
];
const FACE_WIDTH_LEFT = 234;
const FACE_WIDTH_RIGHT = 454;
const NOSE_BRIDGE = 168;
const NOSE_TIP = 1;
const AUTO_CAPTURE_ACCURACY_THRESHOLD = 92;
const AUTO_CAPTURE_STABILITY_THRESHOLD = 95;
const AUTO_CAPTURE_DELAY_MS = 1500;
const SAMPLES_FOR_CAPTURE = 30;
const EYE_ASPECT_RATIO_THRESHOLD = 0.2;
const FACE_ANGLE_THRESHOLD = 8;
const STABILITY_HISTORY_LENGTH = 20;
const AUTO_CAPTURE_TOTAL = 3;


// Kalman filter factory
const createKalmanFilter = (initialValue: number = 0): KalmanFilter => ({
    x: initialValue, p: 1, q: 0.1, r: 0.5,
    update(measurement: number) {
      this.p += this.q;
      const k = this.p / (this.p + this.r);
      this.x += k * (measurement - this.x);
      this.p = (1 - k) * this.p;
      return this.x;
    },
});

const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif", color: '#1f2937', minHeight: '100vh', background: 'white' },
  header: { textAlign: 'center', padding: '24px 0', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' },
  headerTitle: { fontSize: '28px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' },
  headerSubtitle: { color: '#6b7280', marginTop: '8px', fontSize: '15px' },
  loadingScreen: { position: 'fixed', inset: 0, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000, transition: 'opacity 0.3s, visibility 0.3s' },
  loadingScreenHidden: { opacity: 0, visibility: 'hidden', pointerEvents: 'none' },
  loader: { width: '56px', height: '56px', border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  loadingText: { marginTop: '20px', fontSize: '16px', color: '#4b5563', fontWeight: 500 },
  loadingSubtext: { marginTop: '8px', fontSize: '13px', color: '#9ca3af' },
  cameraSection: { display: 'grid', gap: '24px' },
  cameraContainer: { position: 'relative', background: '#111827', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' },
  canvas: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 },
  faceGuide: { position: 'absolute', border: '3px dashed #9ca3af', borderRadius: '50%', zIndex: 5, opacity: 0.6, pointerEvents: 'none', transition: 'all 0.3s ease-out' },
  faceGuideDetected: { borderColor: '#10b981', borderStyle: 'solid', opacity: 0.9 },
  faceGuidePerfect: { borderColor: '#3b82f6', borderStyle: 'solid', opacity: 1, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
  statusBadge: { position: 'absolute', top: '16px', left: '16px', background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500, color: 'white', zIndex: 20 },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' },
  webgpuBadge: { position: 'absolute', top: '16px', right: '16px', background: '#10b981', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: 'white', zIndex: 20, display: 'flex', alignItems: 'center', gap: '6px' },
  eyeStatusBadge: { position: 'absolute', top: '52px', left: '16px', background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 500, color: 'white', zIndex: 20 },
  autoCaptureIndicator: { position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(59, 130, 246, 0.9)', backdropFilter: 'blur(8px)', padding: '12px 24px', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'white', zIndex: 20, boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)', minWidth: '200px' },
  captureBtn: { position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'white', border: '4px solid #d1d5db', cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
  captureBtnDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  captureBtnReady: { borderColor: '#10b981', animation: 'pulseGreen 1.5s infinite' },
  metricsPanel: { display: 'flex', flexDirection: 'column', gap: '16px' },
  metricCard: { background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
  metricHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  metricIcon: { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  metricTitle: { fontSize: '13px', color: '#6b7280', fontWeight: 500 },
  metricValue: { fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1 },
  metricValueUnit: { fontSize: '16px', fontWeight: 500, color: '#6b7280' },
  metricStatus: { marginTop: '10px', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' },
  progressBar: { width: '100%', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden', marginTop: '10px' },
  progressFill: { height: '100%', borderRadius: '3px', transition: 'width 0.3s, background 0.3s' },
  samplesIndicator: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '11px', color: '#6b7280' },
  sampleDots: { display: 'flex', gap: '3px' },
  sampleDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#e5e7eb', transition: 'background 0.2s' },
  sampleDotFilled: { background: '#10b981' },
  instructions: { background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', marginTop: '24px' },
  instructionsTitle: { fontSize: '14px', fontWeight: 600, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' },
  instructionsList: { listStyle: 'none', display: 'grid', gap: '8px', padding: 0, margin: 0 },
  instructionsItem: { fontSize: '13px', color: '#4b5563', display: 'flex', alignItems: 'flex-start', gap: '8px' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', opacity: 0, visibility: 'hidden', transition: 'all 0.3s' },
  modalOverlayShow: { opacity: 1, visibility: 'visible' },
  modal: { background: 'white', borderRadius: '20px', width: '100%', maxWidth: '420px', padding: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', transform: 'scale(0.9)', transition: 'transform 0.3s' },
  modalShow: { transform: 'scale(1)' },
  modalHeader: { textAlign: 'center', marginBottom: '24px' },
  modalIcon: { width: '64px', height: '64px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  modalTitle: { fontSize: '20px', fontWeight: 700, color: '#111827' },
  modalSubtitle: { fontSize: '14px', color: '#6b7280', marginTop: '4px' },
  modalResults: { display: 'grid', gap: '12px', marginBottom: '24px' },
  resultRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f9fafb', borderRadius: '10px' },
  resultRowHighlight: { background: '#dbeafe', border: '1px solid #3b82f6' },
  resultLabel: { fontSize: '14px', color: '#4b5563' },
  resultValue: { fontSize: '16px', fontWeight: 600, color: '#111827' },
  confidenceBadge: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 },
  modalBtn: { width: '100%', padding: '14px', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' },
  modalBtnPrimary: { background: '#2563eb', color: 'white' },
  modalBtnSecondary: { background: '#f3f4f6', color: '#374151', marginTop: '10px' },
  historySection: { marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' },
  historyHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  historyTitle: { fontSize: '16px', fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' },
  clearBtn: { fontSize: '13px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' },
  historyList: { display: 'grid', gap: '10px' },
  historyItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f9fafb', borderRadius: '10px' },
  historyIpd: { fontSize: '18px', fontWeight: 600, color: '#111827' },
  historyMeta: { fontSize: '12px', color: '#6b7280' },
  historyEmpty: { textAlign: 'center', padding: '32px', color: '#9ca3af', fontSize: '14px' },
  accuracyRing: { position: 'relative', width: '80px', height: '80px', margin: '0 auto' },
  accuracyValue: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '18px', fontWeight: 700, color: '#111827' },
  warningBanner: { background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontSize: '13px', color: '#92400e' },
};

const injectStyles = () => {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes pulseGreen { 0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } }
    @keyframes countDown { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 100; } }
    @media (min-width: 768px) { .camera-section-responsive { grid-template-columns: 1fr 340px !important; } }
    @media (max-width: 767px) { .camera-container-responsive { aspect-ratio: 3/4 !important; } .face-guide-responsive { width: 160px !important; height: 220px !important; } .metric-value-responsive { font-size: 28px !important; } .header-title-responsive { font-size: 22px !important; } }
  `;
  document.head.appendChild(styleSheet);
};

const IPDMeasurement: React.FC = () => {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('IDLE');
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [statusText, setStatusText] = useState('Initializing...');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'danger'>('warning');
  const [faceDetected, setFaceDetected] = useState(false);
  const [isPerfectCondition, setIsPerfectCondition] = useState(false);
  const [webgpuSupported, setWebgpuSupported] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [leftEyeOpen, setLeftEyeOpen] = useState(true);
  const [rightEyeOpen, setRightEyeOpen] = useState(true);
  const [autoCaptureProgress, setAutoCaptureProgress] = useState(0);
  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [samplesCollected, setSamplesCollected] = useState(0);
  const [faceBounds, setFaceBounds] = useState<FaceBounds | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [currentMeasurement, setCurrentMeasurement] = useState<{ ipd: number; leftPd: number; rightPd: number; accuracy: number; samples: number; confidence: number; } | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMirrored, setIsMirrored] = useState(true);
  const [autoCaptureCount, setAutoCaptureCount] = useState(0);
  const [autoCaptureMeasurements, setAutoCaptureMeasurements] = useState<{ ipd: number; leftPd: number; rightPd: number; accuracy: number; samples: number; confidence: number; }[]>([]);
  const [isCollectingCaptures, setIsCollectingCaptures] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceLandmarkerRef = useRef<FaceLandmarkerType | null>(null);
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

  const calculateEARCorrected = useCallback((landmarks: Landmark[], vertical: { top: number; bottom: number }, horizontal: { left: number; right: number }, canvasWidth: number, canvasHeight: number): number => {
    const top = landmarks[vertical.top];
    const bottom = landmarks[vertical.bottom];
    const left = landmarks[horizontal.left];
    const right = landmarks[horizontal.right];
    const verticalDist = Math.sqrt(Math.pow((top.x - bottom.x) * canvasWidth, 2) + Math.pow((top.y - bottom.y) * canvasHeight, 2));
    const horizontalDist = Math.sqrt(Math.pow((left.x - right.x) * canvasWidth, 2) + Math.pow((left.y - right.y) * canvasHeight, 2));
    return verticalDist / (horizontalDist + 0.0001);
  }, []);

  const switchCamera = useCallback(async () => {
    isDetectingRef.current = false;
    const video = videoRef.current;
    if (!video) return;
    const currentStream = video.srcObject as MediaStream;
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    setIsMirrored(newFacingMode === 'user');
    ipdBufferRef.current = [];
    leftPdBufferRef.current = [];
    rightPdBufferRef.current = [];
    stabilityBufferRef.current = [];
    setSamplesCollected(0);
    setAutoCaptureCount(0);
    setAutoCaptureMeasurements([]);
    setIsCollectingCaptures(false);
    
    setLoadingStage('STARTING_CAMERA');
    try {
      const constraints = { video: { facingMode: newFacingMode, width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          if (canvasRef.current) {
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;
          }
          resolve();
        };
      });
      await video.play();
      setLoadingStage('READY');
      isDetectingRef.current = true;
      detectFace();
    } catch (error) {
      console.error('Error switching camera:', error);
      setLoadingStage('ERROR');
      setErrorMessage(error instanceof Error ? error.message : "Failed to switch camera.");
    }
  }, [facingMode]);

  const calculateIrisRadius = useCallback((landmarks: Landmark[], side: 'left' | 'right', canvasWidth: number, canvasHeight: number): number => {
    const irisPoints = side === 'left' ? LEFT_IRIS_POINTS : RIGHT_IRIS_POINTS;
    const centerIndex = side === 'left' ? LEFT_IRIS_CENTER : RIGHT_IRIS_CENTER;
    const center = landmarks[centerIndex];
    let totalRadius = 0, validPoints = 0;
    irisPoints.forEach((index) => {
      const point = landmarks[index];
      if (point) {
        const dx = (point.x - center.x) * canvasWidth;
        const dy = (point.y - center.y) * canvasHeight;
        const radius = Math.sqrt(dx * dx + dy * dy);
        if (radius > 2 && radius < 50) { totalRadius += radius; validPoints++; }
      }
    });
    return validPoints > 0 ? totalRadius / validPoints : 0;
  }, []);

  const calculateFaceBounds = useCallback((landmarks: Landmark[], canvasWidth: number, canvasHeight: number): FaceBounds => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    FACE_CONTOUR.forEach(index => {
      const point = landmarks[index];
      const x = point.x * canvasWidth;
      const y = point.y * canvasHeight;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    });
    const padding = 30;
    return { x: minX - padding, y: minY - padding * 1.5, width: (maxX - minX) + padding*2, height: (maxY - minY) + padding*2.5 };
  }, []);

  const calculateFaceAngle = useCallback((landmarks: Landmark[], canvasWidth: number, canvasHeight: number): number => {
    const leftEye = landmarks[33], rightEye = landmarks[263];
    return Math.atan2((rightEye.y - leftEye.y) * canvasHeight, (rightEye.x - leftEye.x) * canvasWidth) * (180 / Math.PI);
  }, []);

  const isFaceCentered = useCallback((landmarks: Landmark[], canvasWidth: number, canvasHeight: number): boolean => {
    const noseTip = landmarks[NOSE_TIP];
    const noseX = noseTip.x * canvasWidth, noseY = noseTip.y * canvasHeight;
    const toleranceX = canvasWidth * 0.15, toleranceY = canvasHeight * 0.15;
    return Math.abs(noseX - canvasWidth / 2) < toleranceX && Math.abs(noseY - canvasHeight / 2) < toleranceY;
  }, []);

  const calculateStability = useCallback((landmarks: Landmark[], canvasWidth: number, canvasHeight: number): number => {
    const noseTip = landmarks[NOSE_TIP];
    const currentPos = { x: noseTip.x * canvasWidth, y: noseTip.y * canvasHeight };
    stabilityBufferRef.current.push(currentPos);
    if (stabilityBufferRef.current.length > STABILITY_HISTORY_LENGTH) stabilityBufferRef.current.shift();
    if (stabilityBufferRef.current.length < 5) return 0;
    let totalMovement = 0;
    for (let i = 1; i < stabilityBufferRef.current.length; i++) {
      const prev = stabilityBufferRef.current[i - 1], curr = stabilityBufferRef.current[i];
      totalMovement += Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
    }
    const avgMovement = totalMovement / (stabilityBufferRef.current.length - 1);
    return Math.max(0, Math.min(100, 100 - avgMovement * 5));
  }, []);

  const analyzeLighting = useCallback((): number => {
    const video = videoRef.current;
    if (!video) return 0;
    const tempCanvas = document.createElement('canvas'), tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return 0;
    const sampleSize = 200;
    tempCanvas.width = sampleSize; tempCanvas.height = sampleSize;
    tempCtx.drawImage(video, (video.videoWidth - sampleSize) / 2, (video.videoHeight - sampleSize) / 2, sampleSize, sampleSize, 0, 0, sampleSize, sampleSize);
    const data = tempCtx.getImageData(0, 0, sampleSize, sampleSize).data;
    let totalBrightness = 0, leftBrightness = 0, rightBrightness = 0, topBrightness = 0, bottomBrightness = 0;
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
      totalBrightness += brightness;
      const x = (i / 4) % sampleSize, y = Math.floor((i / 4) / sampleSize);
      if (x < sampleSize / 2) leftBrightness += brightness; else rightBrightness += brightness;
      if (y < sampleSize / 2) topBrightness += brightness; else bottomBrightness += brightness;
    }
    const pixelCount = data.length / 4;
    const avgBrightness = totalBrightness / pixelCount;
    const normalizedBrightness = Math.min(100, (avgBrightness / 180) * 100);
    const horizontalEvenness = 100 - Math.min(50, Math.abs(leftBrightness - rightBrightness) / (pixelCount / 2) * 2);
    const verticalEvenness = 100 - Math.min(50, Math.abs(topBrightness - bottomBrightness) / (pixelCount / 2) * 2);
    const evenness = (horizontalEvenness + verticalEvenness) / 2;
    let exposureScore = 100;
    if (avgBrightness < 60) exposureScore -= (60 - avgBrightness); else if (avgBrightness > 200) exposureScore -= (avgBrightness - 200) * 0.5;
    return Math.round(Math.min(100, Math.max(0, (normalizedBrightness * 0.4 + evenness * 0.4 + exposureScore * 0.2))));
  }, []);

  const calculateAccuracy = useCallback((distance: number, lighting: number, faceAngle: number, stability: number, leftEyeOpen: boolean, rightEyeOpen: boolean): number => {
    let accuracy = 100;
    if (distance < MIN_DISTANCE_CM) accuracy -= (MIN_DISTANCE_CM - distance) * 3;
    else if (distance > MAX_DISTANCE_CM) accuracy -= (distance - MAX_DISTANCE_CM) * 2;
    else accuracy += Math.abs(distance - IDEAL_DISTANCE_CM) < 5 ? 2 : -Math.abs(distance - IDEAL_DISTANCE_CM) * 0.3;
    if (lighting < 40) accuracy -= (40 - lighting) * 0.8; else if (lighting < 60) accuracy -= (60 - lighting) * 0.4; else if (lighting >= 80) accuracy += 2;
    accuracy -= Math.abs(faceAngle) * 2.5;
    if (stability < 50) accuracy -= (50 - stability) * 0.5; else if (stability >= 90) accuracy += 3;
    if (!leftEyeOpen || !rightEyeOpen) accuracy -= 30;
    return Math.round(Math.max(0, Math.min(100, accuracy)));
  }, []);

  const calculateMetrics = useCallback((landmarks: Landmark[]): Metrics => {
    const canvas = canvasRef.current;
    if (!canvas) return { ipd: 0, leftPd: 0, rightPd: 0, distance: 0, lighting: 0, accuracy: 0, faceAngle: 0, leftEyeOpen: true, rightEyeOpen: true, faceStability: 0, faceCentered: false };
    const { width: canvasWidth, height: canvasHeight } = canvas;
    const getCorrectedX = (x: number): number => isMirrored ? (1 - x) : x;
    
    const actualLeftEyeVertical = isMirrored ? RIGHT_EYE_VERTICAL : LEFT_EYE_VERTICAL;
    const actualRightEyeVertical = isMirrored ? LEFT_EYE_VERTICAL : RIGHT_EYE_VERTICAL;
    const actualLeftEyeHorizontal = isMirrored ? RIGHT_EYE_HORIZONTAL : LEFT_EYE_HORIZONTAL;
    const actualRightEyeHorizontal = isMirrored ? LEFT_EYE_HORIZONTAL : RIGHT_EYE_HORIZONTAL;

    const leftEAR = calculateEARCorrected(landmarks, actualLeftEyeVertical, actualLeftEyeHorizontal, canvasWidth, canvasHeight);
    const rightEAR = calculateEARCorrected(landmarks, actualRightEyeVertical, actualRightEyeHorizontal, canvasWidth, canvasHeight);
    const isLeftEyeOpen = leftEAR > EYE_ASPECT_RATIO_THRESHOLD;
    const isRightEyeOpen = rightEAR > EYE_ASPECT_RATIO_THRESHOLD;

    const leftIris = landmarks[LEFT_IRIS_CENTER], rightIris = landmarks[RIGHT_IRIS_CENTER];
    const dx = (rightIris.x - leftIris.x) * canvasWidth, dy = (rightIris.y - leftIris.y) * canvasHeight;
    const pixelDistance = Math.sqrt(dx * dx + dy * dy);
    
    const leftRadius = calculateIrisRadius(landmarks, 'left', canvasWidth, canvasHeight);
    const rightRadius = calculateIrisRadius(landmarks, 'right', canvasWidth, canvasHeight);
    const avgIrisRadiusPx = (leftRadius + rightRadius) / 2, irisDiameterPx = avgIrisRadiusPx * 2;
    
    const faceLeftPx = landmarks[FACE_WIDTH_LEFT].x * canvasWidth, faceRightPx = landmarks[FACE_WIDTH_RIGHT].x * canvasWidth;
    const faceWidthPx = Math.abs(faceRightPx - faceLeftPx);
    
    const mmPerPixelIris = AVERAGE_IRIS_DIAMETER_MM / irisDiameterPx;
    const mmPerPixelFace = AVERAGE_FACE_WIDTH_MM / faceWidthPx;
    const mmPerPixel = mmPerPixelIris * 0.7 + mmPerPixelFace * 0.3;
    
    let rawIpd = pixelDistance * mmPerPixel;
    const filteredIpd = ipdKalmanRef.current.update(rawIpd);
    
    const focalLengthPx = canvasWidth * 0.85;
    let rawDistance = (AVERAGE_IRIS_DIAMETER_MM * focalLengthPx) / (irisDiameterPx * 10);
    const filteredDistance = distanceKalmanRef.current.update(rawDistance);
    
    const noseBridge = landmarks[NOSE_BRIDGE];
    const leftPd = Math.abs(getCorrectedX(leftIris.x) - getCorrectedX(noseBridge.x)) * canvasWidth * mmPerPixel;
    const rightPd = Math.abs(getCorrectedX(rightIris.x) - getCorrectedX(noseBridge.x)) * canvasWidth * mmPerPixel;
    
    const faceAngle = calculateFaceAngle(landmarks, canvasWidth, canvasHeight);
    const stability = calculateStability(landmarks, canvasWidth, canvasHeight);
    const centered = isFaceCentered(landmarks, canvasWidth, canvasHeight);
    const lighting = analyzeLighting();
    const accuracy = calculateAccuracy(filteredDistance, lighting, faceAngle, stability, isLeftEyeOpen, isRightEyeOpen);
    
    setFaceBounds(calculateFaceBounds(landmarks, canvasWidth, canvasHeight));
    
    return { ipd: filteredIpd, leftPd, rightPd, distance: filteredDistance, lighting, accuracy, faceAngle, leftEyeOpen: isLeftEyeOpen, rightEyeOpen: isRightEyeOpen, faceStability: stability, faceCentered: centered };
  }, [isMirrored, calculateEARCorrected, calculateIrisRadius, calculateFaceAngle, calculateStability, isFaceCentered, analyzeLighting, calculateAccuracy, calculateFaceBounds]);

  const addSample = useCallback((metrics: Metrics) => {
    if (metrics.accuracy >= AUTO_CAPTURE_ACCURACY_THRESHOLD && metrics.leftEyeOpen && metrics.rightEyeOpen) {
      ipdBufferRef.current.push(metrics.ipd); leftPdBufferRef.current.push(metrics.leftPd); rightPdBufferRef.current.push(metrics.rightPd);
      if (ipdBufferRef.current.length > SAMPLES_FOR_CAPTURE) { ipdBufferRef.current.shift(); leftPdBufferRef.current.shift(); rightPdBufferRef.current.shift(); }
      setSamplesCollected(ipdBufferRef.current.length);
    }
  }, []);

  const calculateAveragedMeasurement = useCallback(() => {
    const samples = ipdBufferRef.current;
    if (samples.length < 10) return null;
    const sorted = [...samples].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)], q3 = sorted[Math.floor(sorted.length * 0.75)], iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr, upperBound = q3 + 1.5 * iqr;
    const filteredIpd = ipdBufferRef.current.filter(v => v >= lowerBound && v <= upperBound);
    if (filteredIpd.length < 5) return null;
    const avgIpd = filteredIpd.reduce((a, b) => a + b, 0) / filteredIpd.length;
    const variance = filteredIpd.reduce((sum, val) => sum + Math.pow(val - avgIpd, 2), 0) / filteredIpd.length;
    const stdDev = Math.sqrt(variance);
    const confidence = Math.max(0, Math.min(100, 100 - stdDev * 10));
    return {
      ipd: avgIpd,
      leftPd: leftPdBufferRef.current.reduce((a, b) => a + b, 0) / leftPdBufferRef.current.length,
      rightPd: rightPdBufferRef.current.reduce((a, b) => a + b, 0) / rightPdBufferRef.current.length,
      accuracy: Math.round((confidence + 95) / 2),
      samples: filteredIpd.length,
      confidence
    };
  }, []);

  const calculateFinalAverage = useCallback((measurements: typeof autoCaptureMeasurements) => {
    if (measurements.length === 0) return { ipd: 0, leftPd: 0, rightPd: 0, accuracy: 0, samples: 0, confidence: 0 };
    const sortedByIpd = [...measurements].sort((a, b) => a.ipd - b.ipd);
    const medianIpd = sortedByIpd[Math.floor(sortedByIpd.length / 2)].ipd;
    let totalWeight = 0, weightedIpd = 0, weightedLeftPd = 0, weightedRightPd = 0, totalSamples = 0, avgConfidence = 0, avgAccuracy = 0;
    measurements.forEach(m => {
      const weight = m.confidence / 100;
      totalWeight += weight; weightedIpd += m.ipd * weight; weightedLeftPd += m.leftPd * weight; weightedRightPd += m.rightPd * weight;
      totalSamples += m.samples; avgConfidence += m.confidence; avgAccuracy += m.accuracy;
    });
    const blendedIpd = (medianIpd * 0.4) + ((weightedIpd / totalWeight) * 0.6);
    const ipdValues = measurements.map(m => m.ipd);
    const ipdRange = Math.max(...ipdValues) - Math.min(...ipdValues);
    const consistencyBonus = ipdRange < 1 ? 5 : (ipdRange < 2 ? 2 : 0);
    return {
      ipd: blendedIpd, leftPd: weightedLeftPd / totalWeight, rightPd: weightedRightPd / totalWeight,
      accuracy: Math.min(100, (avgAccuracy / measurements.length) + consistencyBonus), samples: totalSamples,
      confidence: Math.min(100, (avgConfidence / measurements.length) + consistencyBonus)
    };
  }, []);

  const checkPerfectConditions = useCallback((metrics: Metrics): boolean => (
    metrics.accuracy >= AUTO_CAPTURE_ACCURACY_THRESHOLD && metrics.faceStability >= AUTO_CAPTURE_STABILITY_THRESHOLD &&
    metrics.leftEyeOpen && metrics.rightEyeOpen && metrics.faceCentered &&
    Math.abs(metrics.faceAngle) < FACE_ANGLE_THRESHOLD && metrics.distance >= MIN_DISTANCE_CM &&
    metrics.distance <= MAX_DISTANCE_CM && metrics.lighting >= 60
  ), []);

  const drawLandmarks = useCallback((landmarks: Landmark[], metrics: Metrics) => {
    const canvas = canvasRef.current, ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const getDisplayX = (x: number): number => x * canvas.width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    landmarks.forEach(point => {
      const x = getDisplayX(point.x), y = point.y * canvas.height;
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
    });
    const displayLeftIrisIndex = isMirrored ? RIGHT_IRIS_CENTER : LEFT_IRIS_CENTER;
    const displayRightIrisIndex = isMirrored ? LEFT_IRIS_CENTER : RIGHT_IRIS_CENTER;
    const leftIrisDisplay = landmarks[displayLeftIrisIndex], rightIrisDisplay = landmarks[displayRightIrisIndex];
    const leftColor = metrics.leftEyeOpen ? '#3b82f6' : '#ef4444', rightColor = metrics.rightEyeOpen ? '#3b82f6' : '#ef4444';
    ctx.fillStyle = leftColor; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(getDisplayX(leftIrisDisplay.x), leftIrisDisplay.y * canvas.height, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 10px -apple-system, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('L', getDisplayX(leftIrisDisplay.x), leftIrisDisplay.y * canvas.height - 15);
    ctx.fillStyle = rightColor; ctx.strokeStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(getDisplayX(rightIrisDisplay.x), rightIrisDisplay.y * canvas.height, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('R', getDisplayX(rightIrisDisplay.x), rightIrisDisplay.y * canvas.height - 15);
    if (metrics.leftEyeOpen && metrics.rightEyeOpen) {
      ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(getDisplayX(leftIrisDisplay.x), leftIrisDisplay.y * canvas.height);
      ctx.lineTo(getDisplayX(rightIrisDisplay.x), rightIrisDisplay.y * canvas.height);
      ctx.stroke(); ctx.setLineDash([]);
      const midX = (getDisplayX(leftIrisDisplay.x) + getDisplayX(rightIrisDisplay.x)) / 2;
      const midY = (leftIrisDisplay.y + rightIrisDisplay.y) * canvas.height / 2 - 25;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; const path = new Path2D(); path.roundRect(midX - 35, midY - 12, 70, 24, 12); ctx.fill(path);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 12px -apple-system, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(`${metrics.ipd.toFixed(1)} mm`, midX, midY + 4);
    }
  }, [isMirrored]);

  const detectFace = useCallback(() => {
    if (!isDetectingRef.current || !faceLandmarkerRef.current) return;
    const video = videoRef.current;
    if (!video) { animationFrameRef.current = requestAnimationFrame(detectFace); return; }
    const startTime = performance.now();
    const results = faceLandmarkerRef.current.detectForVideo(video, startTime);
    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];
      const calculatedMetrics = calculateMetrics(landmarks);
      setLeftEyeOpen(calculatedMetrics.leftEyeOpen); setRightEyeOpen(calculatedMetrics.rightEyeOpen);
      if (!calculatedMetrics.leftEyeOpen || !calculatedMetrics.rightEyeOpen) {
        setStatusText('Eyes Closed - Open Both Eyes'); setStatusType('warning'); setFaceDetected(true); setIsPerfectCondition(false);
        if (autoCaptureTimerRef.current) { clearTimeout(autoCaptureTimerRef.current); autoCaptureTimerRef.current = null; setIsAutoCapturing(false); setAutoCaptureProgress(0); }
        drawLandmarks(landmarks, calculatedMetrics); setMetrics(calculatedMetrics);
        animationFrameRef.current = requestAnimationFrame(detectFace); return;
      }
      addSample(calculatedMetrics);
      const isPerfect = checkPerfectConditions(calculatedMetrics);
      setIsPerfectCondition(isPerfect);
      if (isPerfect) {
        setStatusText(`Capturing ${autoCaptureCount + 1}/${AUTO_CAPTURE_TOTAL}...`); setStatusType('success');
        if (!autoCaptureTimerRef.current && ipdBufferRef.current.length >= 15) {
          autoCaptureStartRef.current = Date.now(); setIsAutoCapturing(true); setIsCollectingCaptures(true);
          autoCaptureTimerRef.current = setTimeout(() => {
            const measurement = calculateAveragedMeasurement();
            if (measurement) {
              const newMeasurements = [...autoCaptureMeasurements, measurement];
              setAutoCaptureMeasurements(newMeasurements); setAutoCaptureCount(prev => prev + 1);
              if (newMeasurements.length >= AUTO_CAPTURE_TOTAL) {
                const finalMeasurement = calculateFinalAverage(newMeasurements);
                setCurrentMeasurement(finalMeasurement); setShowModal(true); setAutoCaptureCount(0);
                setAutoCaptureMeasurements([]); setIsCollectingCaptures(false);
              } else { ipdBufferRef.current = []; leftPdBufferRef.current = []; rightPdBufferRef.current = []; setSamplesCollected(0); }
            }
            setIsAutoCapturing(false); setAutoCaptureProgress(0); autoCaptureTimerRef.current = null;
          }, AUTO_CAPTURE_DELAY_MS);
        }
        if (isAutoCapturing) setAutoCaptureProgress(Math.min(100, (Date.now() - autoCaptureStartRef.current) / AUTO_CAPTURE_DELAY_MS * 100));
      } else {
        if (autoCaptureTimerRef.current) { clearTimeout(autoCaptureTimerRef.current); autoCaptureTimerRef.current = null; setIsAutoCapturing(false); setAutoCaptureProgress(0); }
        if (!calculatedMetrics.faceCentered) { setStatusText('Center Your Face'); setStatusType('warning'); }
        else if (Math.abs(calculatedMetrics.faceAngle) >= FACE_ANGLE_THRESHOLD) { setStatusText('Keep Head Straight'); setStatusType('warning'); }
        else if (calculatedMetrics.distance < MIN_DISTANCE_CM) { setStatusText('Move Back'); setStatusType('warning'); }
        else if (calculatedMetrics.distance > MAX_DISTANCE_CM) { setStatusText('Move Closer'); setStatusType('warning'); }
        else if (calculatedMetrics.lighting < 60) { setStatusText('Need Better Lighting'); setStatusType('warning'); }
        else if (calculatedMetrics.faceStability < 80) { setStatusText('Hold Still'); setStatusType('warning'); }
        else { setStatusText('Face Detected'); setStatusType('success'); }
      }
      setFaceDetected(true); drawLandmarks(landmarks, calculatedMetrics); setMetrics(calculatedMetrics);
    } else {
      setStatusText('No Face Detected'); setStatusType('warning'); setFaceDetected(false); setIsPerfectCondition(false);
      setMetrics(null); setLeftEyeOpen(true); setRightEyeOpen(true); setSamplesCollected(0);
      ipdBufferRef.current = []; leftPdBufferRef.current = []; rightPdBufferRef.current = []; stabilityBufferRef.current = [];
      if (autoCaptureTimerRef.current) { clearTimeout(autoCaptureTimerRef.current); autoCaptureTimerRef.current = null; setIsAutoCapturing(false); setAutoCaptureProgress(0); }
      const ctx = canvasRef.current?.getContext('2d'); if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    animationFrameRef.current = requestAnimationFrame(detectFace);
  }, [calculateMetrics, drawLandmarks, addSample, checkPerfectConditions, calculateAveragedMeasurement, calculateFinalAverage, isAutoCapturing, autoCaptureCount, autoCaptureMeasurements]);
  
  useEffect(() => {
    injectStyles();
    const init = async () => {
      setLoadingStage('LOADING_PERMISSIONS');
      setLoadingText('Requesting camera access...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } });
        if (videoRef.current) videoRef.current.srcObject = stream;
        
        setLoadingStage('LOADING_MODEL');
        setLoadingText('Loading AI model...');
        const filesetResolver = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task', delegate: 'GPU' },
          outputFaceBlendshapes: false, outputFacialTransformationMatrixes: false, runningMode: 'VIDEO', numFaces: 1,
        });

        setLoadingStage('STARTING_CAMERA');
        setLoadingText('Starting camera...');
        const video = videoRef.current;
        if (video) {
            await new Promise(resolve => { video.onloadedmetadata = resolve; });
            await video.play();
            if (canvasRef.current) {
                canvasRef.current.width = video.videoWidth;
                canvasRef.current.height = video.videoHeight;
            }
        }
        
        isDetectingRef.current = true;
        detectFace();
        setLoadingStage('READY');

      } catch (error) {
        console.error("Initialization failed:", error);
        setLoadingStage('ERROR');
        setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred.");
      }
    };

    const savedHistory = localStorage.getItem('ipdHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    init();
    return () => {
      isDetectingRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (autoCaptureTimerRef.current) clearTimeout(autoCaptureTimerRef.current);
      const video = videoRef.current;
      if (video && video.srcObject) (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false); setAutoCaptureCount(0); setAutoCaptureMeasurements([]); setIsCollectingCaptures(false);
    ipdBufferRef.current = []; leftPdBufferRef.current = []; rightPdBufferRef.current = []; setSamplesCollected(0);
  };
  const handleSaveResult = () => {
    if (currentMeasurement) {
      const newHistory = [{ ipd: currentMeasurement.ipd.toFixed(1), accuracy: currentMeasurement.accuracy, timestamp: new Date().toLocaleString(), samples: currentMeasurement.samples, captures: AUTO_CAPTURE_TOTAL }, ...history].slice(0, 10);
      setHistory(newHistory); localStorage.setItem('ipdHistory', JSON.stringify(newHistory));
    }
    handleCloseModal();
  };
  const handleClearHistory = () => { setHistory([]); localStorage.removeItem('ipdHistory'); };
  const getStatusColor = (type: 'success' | 'warning' | 'danger'): string => ({ success: '#10b981', warning: '#f59e0b', danger: '#ef4444' }[type] || '#10b981');
  const getMetricStatus = (value: number, type: 'ipd' | 'distance' | 'lighting'): { text: string; className: string } => {
    if (type === 'ipd') { if (value >= 54 && value <= 74) return { text: 'Within normal range (54-74mm)', className: 'good' }; if (value < 54) return { text: 'Below average range', className: 'warning' }; return { text: 'Above average range', className: 'warning' }; }
    if (type === 'distance') { if (value >= MIN_DISTANCE_CM && value <= MAX_DISTANCE_CM) return { text: 'Optimal distance', className: 'good' }; if (value < MIN_DISTANCE_CM) return { text: 'Move back slightly', className: 'warning' }; return { text: 'Move closer', className: 'warning' }; }
    if (type === 'lighting') { if (value >= 70) return { text: 'Excellent lighting', className: 'good' }; if (value >= 50) return { text: 'Acceptable lighting', className: 'warning' }; return { text: 'Improve lighting', className: 'bad' }; }
    return { text: '', className: '' };
  };
  const getStatusBgColor = (className: string): string => ({ good: '#d1fae5', warning: '#fef3c7', bad: '#fee2e2' }[className] || '#f3f4f6');
  const getStatusTextColor = (className: string): string => ({ good: '#065f46', warning: '#92400e', bad: '#991b1b' }[className] || '#374151');
  const getProgressColor = (className: string): string => ({ good: '#10b981', warning: '#f59e0b', bad: '#ef4444' }[className] || '#e5e7eb');
  const getAccuracyOffset = (accuracy: number): number => 213.6 - (accuracy / 100) * 213.6;
  const getAccuracyColor = (accuracy: number): string => accuracy >= 90 ? '#10b981' : accuracy >= 70 ? '#f59e0b' : '#ef4444';
  const getFaceGuideStyle = (): React.CSSProperties => {
    const canvas = canvasRef.current; if (!canvas) return { ...styles.faceGuide, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '280px' };
    if (faceBounds && faceDetected) {
      const containerWidth = canvas.offsetWidth || 640, containerHeight = canvas.offsetHeight || 480;
      const scaleX = containerWidth / canvas.width, scaleY = containerHeight / canvas.height;
      return { ...styles.faceGuide, ...(isPerfectCondition ? styles.faceGuidePerfect : faceDetected ? styles.faceGuideDetected : {}), left: `${faceBounds.x * scaleX}px`, top: `${faceBounds.y * scaleY}px`, width: `${faceBounds.width * scaleX}px`, height: `${faceBounds.height * scaleY}px`, transform: 'none', borderRadius: '50%' };
    }
    return { ...styles.faceGuide, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '280px' };
  };
  const getConfidenceBadgeStyle = (confidence: number): React.CSSProperties => {
    if (confidence >= 90) return { ...styles.confidenceBadge, background: '#d1fae5', color: '#065f46' };
    if (confidence >= 70) return { ...styles.confidenceBadge, background: '#fef3c7', color: '#92400e' };
    return { ...styles.confidenceBadge, background: '#fee2e2', color: '#991b1b' };
  };
  const getVideoStyle = (): React.CSSProperties => ({ ...styles.video, transform: isMirrored ? 'scaleX(-1)' : 'none' });
  const getCanvasStyle = (): React.CSSProperties => ({ ...styles.canvas, transform: isMirrored ? 'scaleX(-1)' : 'none' });

  const renderLoadingState = () => (
    <div style={{ ...styles.loadingScreen, ...{ position: 'absolute', background: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(4px)', color: 'white'} }}>
        <div style={styles.loader} />
        <div style={{...styles.loadingText, color: 'white'}}>{loadingText}</div>
        {loadingStage === 'LOADING_MODEL' && <div style={{...styles.loadingSubtext, color: '#d1d5db'}}>Model found in cache. Loading quickly!</div>}
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle} className="header-title-responsive"><ScanFace size={32} color="#2563eb" /> IPD Measurement Pro</h1>
        <p style={styles.headerSubtitle}>High-precision interpupillary distance measurement with auto-capture</p>
      </header>
      <div style={styles.cameraSection} className="camera-section-responsive">
        <div style={styles.cameraContainer} className="camera-container-responsive">
          {loadingStage !== 'READY' ? renderLoadingState() : (
            <>
              <video ref={videoRef} style={getVideoStyle()} playsInline autoPlay muted />
              <canvas ref={canvasRef} style={getCanvasStyle()} />
              <div style={getFaceGuideStyle()} className="face-guide-responsive" />
              <div style={styles.statusBadge}><span style={{ ...styles.statusDot, background: getStatusColor(statusType) }} /><span>{statusText}</span></div>
              {faceDetected && <div style={styles.eyeStatusBadge}><div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{leftEyeOpen ? <Eye size={14} color="#10b981" /> : <EyeOff size={14} color="#ef4444" />}<span style={{ fontSize: '11px' }}>L</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{rightEyeOpen ? <Eye size={14} color="#10b981" /> : <EyeOff size={14} color="#ef4444" />}<span style={{ fontSize: '11px' }}>R</span></div></div>}
              {webgpuSupported && <div style={{...styles.webgpuBadge, background: '#10b981'}}><Zap size={12} /> WebGPU</div>}
              <button onClick={switchCamera} style={{ position: 'absolute', top: '16px', right: webgpuSupported ? '100px' : '16px', background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, transition: 'transform 0.2s, background 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'; e.currentTarget.style.transform = 'scale(1)'; }}><SwitchCamera size={20} color="#ffffff" /></button>
              <div style={{ position: 'absolute', bottom: '100px', right: '16px', background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: 500, color: 'white', zIndex: 20, display: 'flex', alignItems: 'center', gap: '6px' }}>{facingMode === 'user' ? (<><User size={12} />Selfie</>) : (<><Camera size={12} />Rear</>)}</div>
              {(isAutoCapturing || isCollectingCaptures) && (
                <div style={styles.autoCaptureIndicator}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Timer size={18} /><span>{isAutoCapturing ? `Capturing ${autoCaptureCount + 1}/${AUTO_CAPTURE_TOTAL}...` : `Preparing capture ${autoCaptureCount + 1}/${AUTO_CAPTURE_TOTAL}`}</span></div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {Array.from({ length: AUTO_CAPTURE_TOTAL }).map((_, i) => (
                      <div key={i} style={{ width: i === autoCaptureCount && isAutoCapturing ? '24px' : '12px', height: '12px', borderRadius: '6px', background: i < autoCaptureCount ? '#10b981' : i === autoCaptureCount ? 'white' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {i === autoCaptureCount && isAutoCapturing && <div style={{ width: `${autoCaptureProgress}%`, height: '100%', background: '#10b981', transition: 'width 0.1s' }} />}
                        {i < autoCaptureCount && <Check size={8} color="white" />}
                      </div>
                    ))}
                  </div>
                  {autoCaptureMeasurements.length > 0 && <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', gap: '12px' }}>{autoCaptureMeasurements.map((m, i) => (<span key={i}>#{i + 1}: {m.ipd.toFixed(1)}mm</span>))}</div>}
                </div>
              )}
            </>
          )}
          {errorMessage && (
             <div style={{color: 'white', textAlign: 'center', padding: '20px'}}>
                <AlertCircle size={48} style={{margin: '0 auto 16px', color: '#ef4444'}}/>
                <h2 style={{fontSize: '18px', fontWeight: 600}}>Camera Error</h2>
                <p style={{color: '#d1d5db', marginTop: '8px'}}>{errorMessage}</p>
            </div>
          )}
        </div>
        <div style={styles.metricsPanel}>
              {faceDetected && (!leftEyeOpen || !rightEyeOpen) && <div style={styles.warningBanner}><AlertCircle size={18} /><span>Please open both eyes for accurate measurement</span></div>}
              <div style={styles.metricCard}>
                <div style={styles.metricHeader}><div style={{ ...styles.metricIcon, background: '#dbeafe' }}><Ruler size={18} color="#2563eb" /></div><span style={styles.metricTitle}>INTERPUPILLARY DISTANCE</span></div>
                <div style={styles.metricValue} className="metric-value-responsive">{metrics && leftEyeOpen && rightEyeOpen ? metrics.ipd.toFixed(1) : '--'}<span style={styles.metricValueUnit}>mm</span></div>
                {metrics && leftEyeOpen && rightEyeOpen && <div style={{ ...styles.metricStatus, background: getStatusBgColor(getMetricStatus(metrics.ipd, 'ipd').className), color: getStatusTextColor(getMetricStatus(metrics.ipd, 'ipd').className) }}><CheckCircle size={14} /><span>{getMetricStatus(metrics.ipd, 'ipd').text}</span></div>}
                <div style={styles.samplesIndicator}><Shield size={12} /><span>Samples: {samplesCollected}/{SAMPLES_FOR_CAPTURE}</span><div style={styles.sampleDots}>{Array.from({ length: 10 }).map((_, i) => (<div key={i} style={{ ...styles.sampleDot, ...(i < Math.floor(samplesCollected / 3) ? styles.sampleDotFilled : {}) }} />))}</div></div>
              </div>
              <div style={styles.metricCard}>
                <div style={styles.metricHeader}><div style={{ ...styles.metricIcon, background: '#d1fae5' }}><Move size={18} color="#10b981" /></div><span style={styles.metricTitle}>DISTANCE FROM CAMERA</span></div>
                <div style={styles.metricValue} className="metric-value-responsive">{metrics ? metrics.distance.toFixed(0) : '--'}<span style={styles.metricValueUnit}>cm</span></div>
                <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: metrics ? `${Math.min(100, Math.max(0, 100 - Math.abs(metrics.distance - IDEAL_DISTANCE_CM) * 3))}%` : '0%', background: metrics ? getProgressColor(getMetricStatus(metrics.distance, 'distance').className) : '#e5e7eb' }} /></div>
                {metrics && <div style={{ ...styles.metricStatus, background: getStatusBgColor(getMetricStatus(metrics.distance, 'distance').className), color: getStatusTextColor(getMetricStatus(metrics.distance, 'distance').className) }}><Info size={14} /><span>{getMetricStatus(metrics.distance, 'distance').text}</span></div>}
              </div>
              <div style={styles.metricCard}>
                <div style={styles.metricHeader}><div style={{ ...styles.metricIcon, background: '#fef3c7' }}><Sun size={18} color="#f59e0b" /></div><span style={styles.metricTitle}>LIGHTING QUALITY</span></div>
                <div style={styles.metricValue} className="metric-value-responsive">{metrics ? metrics.lighting : '--'}<span style={styles.metricValueUnit}>%</span></div>
                <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: metrics ? `${metrics.lighting}%` : '0%', background: metrics ? getProgressColor(getMetricStatus(metrics.lighting, 'lighting').className) : '#e5e7eb' }} /></div>
                {metrics && <div style={{ ...styles.metricStatus, background: getStatusBgColor(getMetricStatus(metrics.lighting, 'lighting').className), color: getStatusTextColor(getMetricStatus(metrics.lighting, 'lighting').className) }}><Info size={14} /><span>{getMetricStatus(metrics.lighting, 'lighting').text}</span></div>}
              </div>
              <div style={styles.metricCard}>
                <div style={styles.metricHeader}><div style={{ ...styles.metricIcon, background: '#ede9fe' }}><Target size={18} color="#7c3aed" /></div><span style={styles.metricTitle}>MEASUREMENT ACCURACY</span></div>
                <div style={styles.accuracyRing}><svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}><circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" /><circle cx="40" cy="40" r="34" fill="none" stroke={metrics ? getAccuracyColor(metrics.accuracy) : '#e5e7eb'} strokeWidth="6" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset={metrics ? getAccuracyOffset(metrics.accuracy) : 213.6} style={{ transition: 'stroke-dashoffset 0.5s' }} /></svg><div style={styles.accuracyValue}>{metrics ? `${metrics.accuracy}%` : '--%'}</div></div>
                {metrics && metrics.faceStability > 0 && <div style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '12px' }}><span>Stability: {metrics.faceStability.toFixed(0)}%</span><span>Angle: {Math.abs(metrics.faceAngle).toFixed(1)}°</span></div>}
              </div>
            </div>
      </div>
      <div style={styles.instructions}>
        <h3 style={styles.instructionsTitle}><Lightbulb size={16} color="#f59e0b" /> Tips for Accurate Measurement</h3>
        <ul style={styles.instructionsList}>
          <li style={styles.instructionsItem}><Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> Position your face within the adaptive guide - it adjusts to fit your face</li>
          <li style={styles.instructionsItem}><Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> Keep both eyes open and look directly at the camera</li>
          <li style={styles.instructionsItem}><Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> Maintain a distance of 30-50 cm from the camera (optimal: 40cm)</li>
          <li style={styles.instructionsItem}><Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> Hold still - auto-capture activates when conditions are perfect</li>
          <li style={styles.instructionsItem}><Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> Ensure even, well-lit environment (avoid harsh shadows or backlighting)</li>
          <li style={styles.instructionsItem}><Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} /> Remove glasses for most accurate results</li>
        </ul>
      </div>
      <div style={styles.historySection}>
        <div style={styles.historyHeader}><h3 style={styles.historyTitle}><History size={18} /> Measurement History</h3><button style={styles.clearBtn} onClick={handleClearHistory}><Trash2 size={14} /> Clear</button></div>
        <div style={styles.historyList}>{history.length === 0 ? <div style={styles.historyEmpty}><Inbox size={32} style={{ marginBottom: '8px' }} /><p>No measurements yet</p></div> : history.map((item, index) => (<div key={index} style={styles.historyItem}><div><div style={styles.historyIpd}>{item.ipd} mm</div><div style={styles.historyMeta}>{item.timestamp}</div></div><div style={{ textAlign: 'right' }}><div style={styles.historyMeta}>{item.accuracy}% accuracy</div><div style={styles.historyMeta}>{item.samples} samples</div></div></div>))}</div>
      </div>
      <div style={{ ...styles.modalOverlay, ...(showModal ? styles.modalOverlayShow : {}) }} onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}>
        <div style={{ ...styles.modal, ...(showModal ? styles.modalShow : {}) }}>
          <div style={styles.modalHeader}><div style={styles.modalIcon}><Check size={32} color="#10b981" /></div><h2 style={styles.modalTitle}>Measurement Complete</h2>{currentMeasurement && <p style={styles.modalSubtitle}>Average of {AUTO_CAPTURE_TOTAL} captures • {currentMeasurement.samples} total samples</p>}</div>
          <div style={styles.modalResults}>
            <div style={{ ...styles.resultRow, ...styles.resultRowHighlight }}><span style={{ ...styles.resultLabel, fontWeight: 600 }}>IPD (Interpupillary Distance)</span><span style={{ ...styles.resultValue, fontSize: '20px', color: '#2563eb' }}>{currentMeasurement ? `${currentMeasurement.ipd.toFixed(1)} mm` : '-- mm'}</span></div>
            <div style={styles.resultRow}><span style={styles.resultLabel}>Left Pupil to Center</span><span style={styles.resultValue}>{currentMeasurement ? `${currentMeasurement.leftPd.toFixed(1)} mm` : '-- mm'}</span></div>
            <div style={styles.resultRow}><span style={styles.resultLabel}>Right Pupil to Center</span><span style={styles.resultValue}>{currentMeasurement ? `${currentMeasurement.rightPd.toFixed(1)} mm` : '-- mm'}</span></div>
            <div style={styles.resultRow}><span style={styles.resultLabel}>Measurement Confidence</span><span style={getConfidenceBadgeStyle(currentMeasurement?.confidence || 0)}><Shield size={12} />{currentMeasurement ? `${currentMeasurement.confidence.toFixed(0)}%` : '--%'}</span></div>
            {autoCaptureMeasurements.length === AUTO_CAPTURE_TOTAL && <div style={{ ...styles.resultRow, flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}><span style={{ ...styles.resultLabel, marginBottom: '4px' }}>Individual Captures:</span><div style={{ display: 'flex', justifyContent: 'space-around' }}>{autoCaptureMeasurements.map((m, i) => (<div key={i} style={{ textAlign: 'center' }}><div style={{ fontSize: '11px', color: '#6b7280' }}>#{i + 1}</div><div style={{ fontSize: '14px', fontWeight: 600 }}>{m.ipd.toFixed(1)}mm</div></div>))}</div></div>}
          </div>
          <button style={{ ...styles.modalBtn, ...styles.modalBtnPrimary }} onClick={handleSaveResult}><Save size={18} /> Save Measurement</button>
          <button style={{ ...styles.modalBtn, ...styles.modalBtnSecondary }} onClick={handleCloseModal}><X size={18} /> Close</button>
        </div>
      </div>
    </div>
  );
};

export default IPDMeasurement;