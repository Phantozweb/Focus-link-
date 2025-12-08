'use client';
// IPDMeasurement.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
} from 'lucide-react';

// Types
interface Landmark {
  x: number;
  y: number;
  z: number;
}

interface FaceResult {
  faceLandmarks: Landmark[][];
}

interface Metrics {
  ipd: number;
  leftPd: number;
  rightPd: number;
  distance: number;
  lighting: number;
  accuracy: number;
  faceAngle: number;
  leftEyeOpen: boolean;
  rightEyeOpen: boolean;
  faceStability: number;
  faceCentered: boolean;
}

interface HistoryItem {
  ipd: string;
  accuracy: number;
  timestamp: string;
  samples: number;
}

interface FaceLandmarkerType {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => FaceResult;
}

interface FaceBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface KalmanFilter {
  x: number;
  p: number;
  q: number;
  r: number;
  update: (measurement: number) => number;
}

// Constants
const AVERAGE_IRIS_DIAMETER_MM = 11.7;
const AVERAGE_FACE_WIDTH_MM = 140;
const IDEAL_DISTANCE_CM = 40;
const MIN_DISTANCE_CM = 30;
const MAX_DISTANCE_CM = 50;

// Landmark indices
const LEFT_IRIS_CENTER = 468;
const RIGHT_IRIS_CENTER = 473;
const LEFT_IRIS_POINTS = [469, 470, 471, 472];
const RIGHT_IRIS_POINTS = [474, 475, 476, 477];

// Eye landmarks for blink detection
const LEFT_EYE_UPPER = [159, 145, 158, 153];
const LEFT_EYE_LOWER = [23, 25, 26, 110];
const RIGHT_EYE_UPPER = [386, 374, 385, 380];
const RIGHT_EYE_LOWER = [253, 255, 256, 339];

// More precise eye landmarks
const LEFT_EYE_VERTICAL = { top: 159, bottom: 145 };
const LEFT_EYE_HORIZONTAL = { left: 33, right: 133 };
const RIGHT_EYE_VERTICAL = { top: 386, bottom: 374 };
const RIGHT_EYE_HORIZONTAL = { left: 362, right: 263 };

// Face contour for bounds
const FACE_CONTOUR = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109, 10,
];

// Face width landmarks
const FACE_WIDTH_LEFT = 234;
const FACE_WIDTH_RIGHT = 454;

// Nose bridge for center reference
const NOSE_BRIDGE = 168;
const NOSE_TIP = 1;

// Forehead and chin for face height
const FOREHEAD = 10;
const CHIN = 152;

// Auto-capture thresholds
const AUTO_CAPTURE_ACCURACY_THRESHOLD = 92;
const AUTO_CAPTURE_STABILITY_THRESHOLD = 95;
const AUTO_CAPTURE_DELAY_MS = 1500;
const SAMPLES_FOR_CAPTURE = 30;
const EYE_ASPECT_RATIO_THRESHOLD = 0.2;
const FACE_ANGLE_THRESHOLD = 8;
const STABILITY_HISTORY_LENGTH = 20;

// Kalman filter factory
const createKalmanFilter = (initialValue: number = 0): KalmanFilter => {
  return {
    x: initialValue,
    p: 1,
    q: 0.1,
    r: 0.5,
    update(measurement: number): number {
      // Prediction
      this.p = this.p + this.q;
      
      // Update
      const k = this.p / (this.p + this.r);
      this.x = this.x + k * (measurement - this.x);
      this.p = (1 - k) * this.p;
      
      return this.x;
    }
  };
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
    color: '#1f2937',
    minHeight: '100vh',
    background: 'white',
  },
  header: {
    textAlign: 'center',
    padding: '24px 0',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '24px',
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  headerSubtitle: {
    color: '#6b7280',
    marginTop: '8px',
    fontSize: '15px',
  },
  loadingScreen: {
    position: 'fixed' as const,
    inset: 0,
    background: 'white',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    transition: 'opacity 0.3s, visibility 0.3s',
  },
  loadingScreenHidden: {
    opacity: 0,
    visibility: 'hidden' as const,
    pointerEvents: 'none' as const,
  },
  loader: {
    width: '56px',
    height: '56px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#4b5563',
    fontWeight: 500,
  },
  loadingSubtext: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#9ca3af',
  },
  cameraSection: {
    display: 'grid',
    gap: '24px',
  },
  cameraContainer: {
    position: 'relative' as const,
    background: '#111827',
    borderRadius: '16px',
    overflow: 'hidden',
    aspectRatio: '4/3',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  video: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  canvas: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    zIndex: 10,
  },
  faceGuide: {
    position: 'absolute' as const,
    border: '3px dashed #9ca3af',
    borderRadius: '50%',
    zIndex: 5,
    opacity: 0.6,
    pointerEvents: 'none' as const,
    transition: 'all 0.3s ease-out',
  },
  faceGuideDetected: {
    borderColor: '#10b981',
    borderStyle: 'solid',
    opacity: 0.9,
  },
  faceGuidePerfect: {
    borderColor: '#3b82f6',
    borderStyle: 'solid',
    opacity: 1,
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
  },
  statusBadge: {
    position: 'absolute' as const,
    top: '16px',
    left: '16px',
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    padding: '8px 14px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'white',
    zIndex: 20,
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#10b981',
    animation: 'pulse 2s infinite',
  },
  webgpuBadge: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'white',
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  eyeStatusBadge: {
    position: 'absolute' as const,
    top: '52px',
    left: '16px',
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    padding: '6px 12px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'white',
    zIndex: 20,
  },
  autoCaptureIndicator: {
    position: 'absolute' as const,
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(59, 130, 246, 0.9)',
    backdropFilter: 'blur(8px)',
    padding: '10px 20px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'white',
    zIndex: 20,
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
  },
  captureBtn: {
    position: 'absolute' as const,
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'white',
    border: '4px solid #d1d5db',
    cursor: 'pointer',
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  captureBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  captureBtnReady: {
    borderColor: '#10b981',
    animation: 'pulseGreen 1.5s infinite',
  },
  metricsPanel: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  metricCard: {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  },
  metricIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricTitle: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: 500,
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#111827',
    lineHeight: 1,
  },
  metricValueUnit: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#6b7280',
  },
  metricStatus: {
    marginTop: '10px',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s, background 0.3s',
  },
  samplesIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    fontSize: '11px',
    color: '#6b7280',
  },
  sampleDots: {
    display: 'flex',
    gap: '3px',
  },
  sampleDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#e5e7eb',
    transition: 'background 0.2s',
  },
  sampleDotFilled: {
    background: '#10b981',
  },
  instructions: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
  },
  instructionsTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  instructionsList: {
    listStyle: 'none',
    display: 'grid',
    gap: '8px',
    padding: 0,
    margin: 0,
  },
  instructionsItem: {
    fontSize: '13px',
    color: '#4b5563',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    opacity: 0,
    visibility: 'hidden' as const,
    transition: 'all 0.3s',
  },
  modalOverlayShow: {
    opacity: 1,
    visibility: 'visible' as const,
  },
  modal: {
    background: 'white',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '420px',
    padding: '24px',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transform: 'scale(0.9)',
    transition: 'transform 0.3s',
  },
  modalShow: {
    transform: 'scale(1)',
  },
  modalHeader: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  modalIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#d1fae5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
  },
  modalResults: {
    display: 'grid',
    gap: '12px',
    marginBottom: '24px',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#f9fafb',
    borderRadius: '10px',
  },
  resultRowHighlight: {
    background: '#dbeafe',
    border: '1px solid #3b82f6',
  },
  resultLabel: {
    fontSize: '14px',
    color: '#4b5563',
  },
  resultValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
  },
  confidenceBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
  },
  modalBtn: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  modalBtnPrimary: {
    background: '#2563eb',
    color: 'white',
  },
  modalBtnSecondary: {
    background: '#f3f4f6',
    color: '#374151',
    marginTop: '10px',
  },
  historySection: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
  },
  historyHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  historyTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  clearBtn: {
    fontSize: '13px',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  historyList: {
    display: 'grid',
    gap: '10px',
  },
  historyItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: '#f9fafb',
    borderRadius: '10px',
  },
  historyIpd: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
  },
  historyMeta: {
    fontSize: '12px',
    color: '#6b7280',
  },
  historyEmpty: {
    textAlign: 'center' as const,
    padding: '32px',
    color: '#9ca3af',
    fontSize: '14px',
  },
  accuracyRing: {
    position: 'relative' as const,
    width: '80px',
    height: '80px',
    margin: '0 auto',
  },
  accuracyValue: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
  },
  warningBanner: {
    background: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '10px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    fontSize: '13px',
    color: '#92400e',
  },
};

// CSS Keyframes
const injectStyles = () => {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes pulseGreen {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
      50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
    }
    @keyframes countDown {
      from { stroke-dashoffset: 0; }
      to { stroke-dashoffset: 100; }
    }
    @media (min-width: 768px) {
      .camera-section-responsive {
        grid-template-columns: 1fr 340px !important;
      }
    }
    @media (max-width: 767px) {
      .camera-container-responsive {
        aspect-ratio: 3/4 !important;
      }
      .face-guide-responsive {
        width: 160px !important;
        height: 220px !important;
      }
      .metric-value-responsive {
        font-size: 28px !important;
      }
      .header-title-responsive {
        font-size: 22px !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
};

// Main Component
const IPDMeasurement: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing AI Model...');
  const [loadingSubtext, setLoadingSubtext] = useState('This may take a few moments');
  const [statusText, setStatusText] = useState('Initializing...');
  const [statusType, setStatusType] = useState<'success' | 'warning' | 'danger'>('warning');
  const [faceDetected, setFaceDetected] = useState(false);
  const [isPerfectCondition, setIsPerfectCondition] = useState(false);
  const [webgpuSupported, setWebgpuSupported] = useState(false);
  const [canCapture, setCanCapture] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [leftEyeOpen, setLeftEyeOpen] = useState(true);
  const [rightEyeOpen, setRightEyeOpen] = useState(true);
  const [autoCaptureProgress, setAutoCaptureProgress] = useState(0);
  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [samplesCollected, setSamplesCollected] = useState(0);
  const [faceBounds, setFaceBounds] = useState<FaceBounds | null>(null);

  // Metrics state
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [currentMeasurement, setCurrentMeasurement] = useState<{
    ipd: number;
    leftPd: number;
    rightPd: number;
    accuracy: number;
    samples: number;
    confidence: number;
  } | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceLandmarkerRef = useRef<FaceLandmarkerType | null>(null);
  const isDetectingRef = useRef(false);
  const lastResultsRef = useRef<FaceResult | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Measurement buffers for averaging
  const ipdBufferRef = useRef<number[]>([]);
  const leftPdBufferRef = useRef<number[]>([]);
  const rightPdBufferRef = useRef<number[]>([]);
  const stabilityBufferRef = useRef<{ x: number; y: number }[]>([]);
  
  // Kalman filters for smoothing
  const ipdKalmanRef = useRef<KalmanFilter>(createKalmanFilter(62));
  const distanceKalmanRef = useRef<KalmanFilter>(createKalmanFilter(40));
  
  // Auto-capture timer
  const autoCaptureTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoCaptureStartRef = useRef<number>(0);

  // Check WebGPU support
  const checkWebGPUSupport = useCallback(async (): Promise<boolean> => {
    if ('gpu' in navigator) {
      try {
        const gpu = (navigator as any).gpu;
        const adapter = await gpu.requestAdapter();
        return adapter !== null;
      } catch {
        return false;
      }
    }
    return false;
  }, []);

  // Calculate Eye Aspect Ratio for blink detection
  const calculateEAR = useCallback((
    landmarks: Landmark[],
    eye: 'left' | 'right',
    canvasWidth: number,
    canvasHeight: number
  ): number => {
    const vertical = eye === 'left' ? LEFT_EYE_VERTICAL : RIGHT_EYE_VERTICAL;
    const horizontal = eye === 'left' ? LEFT_EYE_HORIZONTAL : RIGHT_EYE_HORIZONTAL;

    const top = landmarks[vertical.top];
    const bottom = landmarks[vertical.bottom];
    const left = landmarks[horizontal.left];
    const right = landmarks[horizontal.right];

    // Vertical distance
    const verticalDist = Math.sqrt(
      Math.pow((top.x - bottom.x) * canvasWidth, 2) +
      Math.pow((top.y - bottom.y) * canvasHeight, 2)
    );

    // Horizontal distance
    const horizontalDist = Math.sqrt(
      Math.pow((left.x - right.x) * canvasWidth, 2) +
      Math.pow((left.y - right.y) * canvasHeight, 2)
    );

    // EAR = vertical / horizontal
    return verticalDist / (horizontalDist + 0.0001);
  }, []);

  // Calculate iris radius with sub-pixel accuracy
  const calculateIrisRadius = useCallback((
    landmarks: Landmark[],
    side: 'left' | 'right',
    canvasWidth: number,
    canvasHeight: number
  ): number => {
    const irisPoints = side === 'left' ? LEFT_IRIS_POINTS : RIGHT_IRIS_POINTS;
    const centerIndex = side === 'left' ? LEFT_IRIS_CENTER : RIGHT_IRIS_CENTER;
    const center = landmarks[centerIndex];

    let totalRadius = 0;
    let validPoints = 0;

    irisPoints.forEach((index) => {
      const point = landmarks[index];
      if (point) {
        const dx = (point.x - center.x) * canvasWidth;
        const dy = (point.y - center.y) * canvasHeight;
        const radius = Math.sqrt(dx * dx + dy * dy);
        
        // Filter out outliers
        if (radius > 2 && radius < 50) {
          totalRadius += radius;
          validPoints++;
        }
      }
    });

    return validPoints > 0 ? totalRadius / validPoints : 0;
  }, []);

  // Calculate face bounds
  const calculateFaceBounds = useCallback((
    landmarks: Landmark[],
    canvasWidth: number,
    canvasHeight: number
  ): FaceBounds => {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    FACE_CONTOUR.forEach(index => {
      const point = landmarks[index];
      const x = point.x * canvasWidth;
      const y = point.y * canvasHeight;
      
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });

    // Add padding
    const padding = 30;
    minX -= padding;
    maxX += padding;
    minY -= padding * 1.5; // More padding on top for forehead
    maxY += padding;

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }, []);

  // Calculate face angle (head tilt)
  const calculateFaceAngle = useCallback((
    landmarks: Landmark[],
    canvasWidth: number,
    canvasHeight: number
  ): number => {
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    const angle = Math.atan2(
      (rightEye.y - leftEye.y) * canvasHeight,
      (rightEye.x - leftEye.x) * canvasWidth
    ) * (180 / Math.PI);

    return angle;
  }, []);

  // Check if face is centered
  const isFaceCentered = useCallback((
    landmarks: Landmark[],
    canvasWidth: number,
    canvasHeight: number
  ): boolean => {
    const noseTip = landmarks[NOSE_TIP];
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const noseX = noseTip.x * canvasWidth;
    const noseY = noseTip.y * canvasHeight;

    const toleranceX = canvasWidth * 0.15;
    const toleranceY = canvasHeight * 0.15;

    return (
      Math.abs(noseX - centerX) < toleranceX &&
      Math.abs(noseY - centerY) < toleranceY
    );
  }, []);

  // Calculate face stability
  const calculateStability = useCallback((
    landmarks: Landmark[],
    canvasWidth: number,
    canvasHeight: number
  ): number => {
    const noseTip = landmarks[NOSE_TIP];
    const currentPos = {
      x: noseTip.x * canvasWidth,
      y: noseTip.y * canvasHeight
    };

    stabilityBufferRef.current.push(currentPos);
    if (stabilityBufferRef.current.length > STABILITY_HISTORY_LENGTH) {
      stabilityBufferRef.current.shift();
    }

    if (stabilityBufferRef.current.length < 5) return 0;

    let totalMovement = 0;
    for (let i = 1; i < stabilityBufferRef.current.length; i++) {
      const prev = stabilityBufferRef.current[i - 1];
      const curr = stabilityBufferRef.current[i];
      const movement = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      );
      totalMovement += movement;
    }

    const avgMovement = totalMovement / (stabilityBufferRef.current.length - 1);
    // Convert movement to stability percentage (less movement = higher stability)
    const stability = Math.max(0, Math.min(100, 100 - avgMovement * 5));
    
    return stability;
  }, []);

  // Analyze lighting with more accuracy
  const analyzeLighting = useCallback((): number => {
    const video = videoRef.current;
    if (!video) return 0;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return 0;

    // Sample a smaller region for performance
    const sampleSize = 200;
    tempCanvas.width = sampleSize;
    tempCanvas.height = sampleSize;
    
    const startX = (video.videoWidth - sampleSize) / 2;
    const startY = (video.videoHeight - sampleSize) / 2;
    
    tempCtx.drawImage(
      video,
      startX, startY, sampleSize, sampleSize,
      0, 0, sampleSize, sampleSize
    );

    const imageData = tempCtx.getImageData(0, 0, sampleSize, sampleSize);
    const data = imageData.data;

    let totalBrightness = 0;
    let leftBrightness = 0;
    let rightBrightness = 0;
    let topBrightness = 0;
    let bottomBrightness = 0;
    
    const midX = sampleSize / 2;
    const midY = sampleSize / 2;

    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
      totalBrightness += brightness;

      const pixelIndex = i / 4;
      const x = pixelIndex % sampleSize;
      const y = Math.floor(pixelIndex / sampleSize);

      if (x < midX) leftBrightness += brightness;
      else rightBrightness += brightness;
      
      if (y < midY) topBrightness += brightness;
      else bottomBrightness += brightness;
    }

    const pixelCount = data.length / 4;
    const halfPixels = pixelCount / 2;
    
    const avgBrightness = totalBrightness / pixelCount;
    const normalizedBrightness = Math.min(100, (avgBrightness / 180) * 100);

    // Check for even lighting
    const leftAvg = leftBrightness / halfPixels;
    const rightAvg = rightBrightness / halfPixels;
    const topAvg = topBrightness / halfPixels;
    const bottomAvg = bottomBrightness / halfPixels;
    
    const horizontalEvenness = 100 - Math.min(50, Math.abs(leftAvg - rightAvg) * 2);
    const verticalEvenness = 100 - Math.min(50, Math.abs(topAvg - bottomAvg) * 2);
    const evenness = (horizontalEvenness + verticalEvenness) / 2;

    // Check for proper exposure (not too dark or too bright)
    let exposureScore = 100;
    if (avgBrightness < 60) {
      exposureScore -= (60 - avgBrightness);
    } else if (avgBrightness > 200) {
      exposureScore -= (avgBrightness - 200) * 0.5;
    }

    const lightingScore = (normalizedBrightness * 0.4 + evenness * 0.4 + exposureScore * 0.2);

    return Math.round(Math.min(100, Math.max(0, lightingScore)));
  }, []);

  // Calculate accuracy with comprehensive factors
  const calculateAccuracy = useCallback((
    distance: number,
    lighting: number,
    landmarks: Landmark[],
    faceAngle: number,
    stability: number,
    leftEyeOpen: boolean,
    rightEyeOpen: boolean
  ): number => {
    let accuracy = 100;

    // Distance factor (major)
    if (distance < MIN_DISTANCE_CM) {
      accuracy -= (MIN_DISTANCE_CM - distance) * 3;
    } else if (distance > MAX_DISTANCE_CM) {
      accuracy -= (distance - MAX_DISTANCE_CM) * 2;
    } else {
      // Optimal range bonus
      const optimalDeviation = Math.abs(distance - IDEAL_DISTANCE_CM);
      if (optimalDeviation < 5) {
        accuracy += 2; // Small bonus for perfect distance
      } else {
        accuracy -= optimalDeviation * 0.3;
      }
    }

    // Lighting factor
    if (lighting < 40) {
      accuracy -= (40 - lighting) * 0.8;
    } else if (lighting < 60) {
      accuracy -= (60 - lighting) * 0.4;
    } else if (lighting >= 80) {
      accuracy += 2; // Bonus for excellent lighting
    }

    // Face angle factor (major)
    accuracy -= Math.abs(faceAngle) * 2.5;

    // Stability factor
    if (stability < 50) {
      accuracy -= (50 - stability) * 0.5;
    } else if (stability >= 90) {
      accuracy += 3; // Bonus for very stable
    }

    // Eyes closed penalty (major)
    if (!leftEyeOpen || !rightEyeOpen) {
      accuracy -= 30;
    }

    // Clamp to valid range
    return Math.round(Math.max(0, Math.min(100, accuracy)));
  }, []);

  // Calculate metrics with high precision
  const calculateMetrics = useCallback((landmarks: Landmark[]): Metrics => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return {
        ipd: 0, leftPd: 0, rightPd: 0, distance: 0,
        lighting: 0, accuracy: 0, faceAngle: 0,
        leftEyeOpen: true, rightEyeOpen: true,
        faceStability: 0, faceCentered: false
      };
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate Eye Aspect Ratio for both eyes
    const leftEAR = calculateEAR(landmarks, 'left', canvasWidth, canvasHeight);
    const rightEAR = calculateEAR(landmarks, 'right', canvasWidth, canvasHeight);
    
    const isLeftEyeOpen = leftEAR > EYE_ASPECT_RATIO_THRESHOLD;
    const isRightEyeOpen = rightEAR > EYE_ASPECT_RATIO_THRESHOLD;

    // Get iris positions
    const leftIris = landmarks[LEFT_IRIS_CENTER];
    const rightIris = landmarks[RIGHT_IRIS_CENTER];

    // Calculate pixel distance between irises
    const dx = (rightIris.x - leftIris.x) * canvasWidth;
    const dy = (rightIris.y - leftIris.y) * canvasHeight;
    const pixelDistance = Math.sqrt(dx * dx + dy * dy);

    // Calculate average iris radius with both eyes
    const leftRadius = calculateIrisRadius(landmarks, 'left', canvasWidth, canvasHeight);
    const rightRadius = calculateIrisRadius(landmarks, 'right', canvasWidth, canvasHeight);
    const avgIrisRadiusPx = (leftRadius + rightRadius) / 2;
    const irisDiameterPx = avgIrisRadiusPx * 2;

    // Calculate face width for additional reference
    const faceLeftPx = landmarks[FACE_WIDTH_LEFT].x * canvasWidth;
    const faceRightPx = landmarks[FACE_WIDTH_RIGHT].x * canvasWidth;
    const faceWidthPx = Math.abs(faceRightPx - faceLeftPx);

    // Use multiple references for better accuracy
    // Method 1: Iris-based
    const mmPerPixelIris = AVERAGE_IRIS_DIAMETER_MM / irisDiameterPx;
    
    // Method 2: Face width-based (as secondary reference)
    const mmPerPixelFace = AVERAGE_FACE_WIDTH_MM / faceWidthPx;
    
    // Weighted average (favor iris as it's more consistent)
    const mmPerPixel = mmPerPixelIris * 0.7 + mmPerPixelFace * 0.3;

    // Calculate raw IPD
    let rawIpd = pixelDistance * mmPerPixel;
    
    // Apply Kalman filter for smooth, stable readings
    const filteredIpd = ipdKalmanRef.current.update(rawIpd);

    // Calculate distance from camera
    const focalLengthPx = canvasWidth * 0.85;
    let rawDistance = (AVERAGE_IRIS_DIAMETER_MM * focalLengthPx) / (irisDiameterPx * 10);
    const filteredDistance = distanceKalmanRef.current.update(rawDistance);

    // Calculate monocular PD
    const noseBridge = landmarks[NOSE_BRIDGE];
    const leftPd = Math.abs(leftIris.x - noseBridge.x) * canvasWidth * mmPerPixel;
    const rightPd = Math.abs(rightIris.x - noseBridge.x) * canvasWidth * mmPerPixel;

    // Calculate face angle
    const faceAngle = calculateFaceAngle(landmarks, canvasWidth, canvasHeight);

    // Calculate stability
    const stability = calculateStability(landmarks, canvasWidth, canvasHeight);

    // Check if face is centered
    const centered = isFaceCentered(landmarks, canvasWidth, canvasHeight);

    // Analyze lighting
    const lighting = analyzeLighting();

    // Calculate final accuracy
    const accuracy = calculateAccuracy(
      filteredDistance, lighting, landmarks, faceAngle,
      stability, isLeftEyeOpen, isRightEyeOpen
    );

    // Update face bounds
    const bounds = calculateFaceBounds(landmarks, canvasWidth, canvasHeight);
    setFaceBounds(bounds);

    return {
      ipd: filteredIpd,
      leftPd,
      rightPd,
      distance: filteredDistance,
      lighting,
      accuracy,
      faceAngle,
      leftEyeOpen: isLeftEyeOpen,
      rightEyeOpen: isRightEyeOpen,
      faceStability: stability,
      faceCentered: centered
    };
  }, [
    calculateEAR, calculateIrisRadius, calculateFaceAngle,
    calculateStability, isFaceCentered, analyzeLighting,
    calculateAccuracy, calculateFaceBounds
  ]);

  // Add sample to buffer for averaging
  const addSample = useCallback((metrics: Metrics) => {
    if (metrics.accuracy >= AUTO_CAPTURE_ACCURACY_THRESHOLD &&
        metrics.leftEyeOpen && metrics.rightEyeOpen) {
      ipdBufferRef.current.push(metrics.ipd);
      leftPdBufferRef.current.push(metrics.leftPd);
      rightPdBufferRef.current.push(metrics.rightPd);
      
      // Keep buffer size limited
      if (ipdBufferRef.current.length > SAMPLES_FOR_CAPTURE) {
        ipdBufferRef.current.shift();
        leftPdBufferRef.current.shift();
        rightPdBufferRef.current.shift();
      }
      
      setSamplesCollected(ipdBufferRef.current.length);
    }
  }, []);

  // Calculate averaged measurement with outlier rejection
  const calculateAveragedMeasurement = useCallback(() => {
    const samples = ipdBufferRef.current;
    if (samples.length < 10) return null;

    // Sort for median and IQR calculation
    const sorted = [...samples].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    
    // Remove outliers (values outside 1.5 * IQR)
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    const filteredIpd = ipdBufferRef.current.filter(v => v >= lowerBound && v <= upperBound);
    const filteredLeft = leftPdBufferRef.current.filter((_, i) => 
      ipdBufferRef.current[i] >= lowerBound && ipdBufferRef.current[i] <= upperBound
    );
    const filteredRight = rightPdBufferRef.current.filter((_, i) =>
      ipdBufferRef.current[i] >= lowerBound && ipdBufferRef.current[i] <= upperBound
    );

    if (filteredIpd.length < 5) return null;

    // Calculate averages
    const avgIpd = filteredIpd.reduce((a, b) => a + b, 0) / filteredIpd.length;
    const avgLeft = filteredLeft.reduce((a, b) => a + b, 0) / filteredLeft.length;
    const avgRight = filteredRight.reduce((a, b) => a + b, 0) / filteredRight.length;

    // Calculate standard deviation for confidence
    const variance = filteredIpd.reduce((sum, val) => sum + Math.pow(val - avgIpd, 2), 0) / filteredIpd.length;
    const stdDev = Math.sqrt(variance);
    
    // Confidence based on consistency (lower std dev = higher confidence)
    const confidence = Math.max(0, Math.min(100, 100 - stdDev * 10));

    return {
      ipd: avgIpd,
      leftPd: avgLeft,
      rightPd: avgRight,
      accuracy: Math.round((confidence + 95) / 2), // Blend with high base accuracy
      samples: filteredIpd.length,
      confidence
    };
  }, []);

  // Check if conditions are perfect for auto-capture
  const checkPerfectConditions = useCallback((metrics: Metrics): boolean => {
    return (
      metrics.accuracy >= AUTO_CAPTURE_ACCURACY_THRESHOLD &&
      metrics.faceStability >= AUTO_CAPTURE_STABILITY_THRESHOLD &&
      metrics.leftEyeOpen &&
      metrics.rightEyeOpen &&
      metrics.faceCentered &&
      Math.abs(metrics.faceAngle) < FACE_ANGLE_THRESHOLD &&
      metrics.distance >= MIN_DISTANCE_CM &&
      metrics.distance <= MAX_DISTANCE_CM &&
      metrics.lighting >= 60
    );
  }, []);

  // Draw landmarks with enhanced visualization
  const drawLandmarks = useCallback((landmarks: Landmark[], metrics: Metrics) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all landmarks as small dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    landmarks.forEach((point) => {
      const x = point.x * canvas.width;
      const y = point.y * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    });

    // Highlight iris centers
    const leftIris = landmarks[LEFT_IRIS_CENTER];
    const rightIris = landmarks[RIGHT_IRIS_CENTER];

    if (leftIris && rightIris) {
      // Draw irises with different colors based on eye open status
      const leftColor = metrics.leftEyeOpen ? '#3b82f6' : '#ef4444';
      const rightColor = metrics.rightEyeOpen ? '#3b82f6' : '#ef4444';

      // Left iris
      ctx.fillStyle = leftColor;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(leftIris.x * canvas.width, leftIris.y * canvas.height, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right iris
      ctx.fillStyle = rightColor;
      ctx.beginPath();
      ctx.arc(rightIris.x * canvas.width, rightIris.y * canvas.height, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw IPD line if both eyes are open
      if (metrics.leftEyeOpen && metrics.rightEyeOpen) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(leftIris.x * canvas.width, leftIris.y * canvas.height);
        ctx.lineTo(rightIris.x * canvas.width, rightIris.y * canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw IPD value label
        const midX = (leftIris.x + rightIris.x) * canvas.width / 2;
        const midY = (leftIris.y + rightIris.y) * canvas.height / 2 - 20;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.roundRect(midX - 35, midY - 12, 70, 24, 12);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${metrics.ipd.toFixed(1)} mm`, midX, midY + 4);
      }

      // Draw iris circles
      const leftIrisRadius = calculateIrisRadius(landmarks, 'left', canvas.width, canvas.height);
      const rightIrisRadius = calculateIrisRadius(landmarks, 'right', canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(leftIris.x * canvas.width, leftIris.y * canvas.height, leftIrisRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightIris.x * canvas.width, rightIris.y * canvas.height, rightIrisRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw face contour
    const contourColor = metrics.faceCentered ? 'rgba(16, 185, 129, 0.8)' : 'rgba(251, 146, 60, 0.6)';
    ctx.strokeStyle = contourColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    FACE_CONTOUR.forEach((index, i) => {
      const point = landmarks[index];
      const x = point.x * canvas.width;
      const y = point.y * canvas.height;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.stroke();

    // Draw center reference point
    const noseTip = landmarks[NOSE_TIP];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(noseTip.x * canvas.width, noseTip.y * canvas.height, 4, 0, Math.PI * 2);
    ctx.fill();

  }, [calculateIrisRadius]);

  // Detection loop
  const detectFace = useCallback(() => {
    if (!isDetectingRef.current || !faceLandmarkerRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      animationFrameRef.current = requestAnimationFrame(detectFace);
      return;
    }

    const startTime = performance.now();
    const results = faceLandmarkerRef.current.detectForVideo(video, startTime);

    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      lastResultsRef.current = results;
      const landmarks = results.faceLandmarks[0];

      const calculatedMetrics = calculateMetrics(landmarks);
      
      // Update eye status
      setLeftEyeOpen(calculatedMetrics.leftEyeOpen);
      setRightEyeOpen(calculatedMetrics.rightEyeOpen);

      // Check if eyes are closed
      if (!calculatedMetrics.leftEyeOpen || !calculatedMetrics.rightEyeOpen) {
        setStatusText('Eyes Closed - Open Both Eyes');
        setStatusType('warning');
        setFaceDetected(true);
        setIsPerfectCondition(false);
        
        // Cancel auto-capture if in progress
        if (autoCaptureTimerRef.current) {
          clearTimeout(autoCaptureTimerRef.current);
          autoCaptureTimerRef.current = null;
          setIsAutoCapturing(false);
          setAutoCaptureProgress(0);
        }
        
        drawLandmarks(landmarks, calculatedMetrics);
        setMetrics(calculatedMetrics);
        animationFrameRef.current = requestAnimationFrame(detectFace);
        return;
      }

      // Add sample for averaging
      addSample(calculatedMetrics);

      // Check for perfect conditions
      const isPerfect = checkPerfectConditions(calculatedMetrics);
      setIsPerfectCondition(isPerfect);

      if (isPerfect) {
        setStatusText('Perfect! Hold Still...');
        setStatusType('success');
        
        // Start auto-capture countdown if not already started
        if (!autoCaptureTimerRef.current && ipdBufferRef.current.length >= 15) {
          autoCaptureStartRef.current = Date.now();
          setIsAutoCapturing(true);
          
          autoCaptureTimerRef.current = setTimeout(() => {
            // Perform auto-capture
            const measurement = calculateAveragedMeasurement();
            if (measurement) {
              setCurrentMeasurement(measurement);
              setShowModal(true);
            }
            setIsAutoCapturing(false);
            setAutoCaptureProgress(0);
            autoCaptureTimerRef.current = null;
          }, AUTO_CAPTURE_DELAY_MS);
        }
        
        // Update progress
        if (isAutoCapturing) {
          const elapsed = Date.now() - autoCaptureStartRef.current;
          setAutoCaptureProgress(Math.min(100, (elapsed / AUTO_CAPTURE_DELAY_MS) * 100));
        }
      } else {
        // Cancel auto-capture if conditions change
        if (autoCaptureTimerRef.current) {
          clearTimeout(autoCaptureTimerRef.current);
          autoCaptureTimerRef.current = null;
          setIsAutoCapturing(false);
          setAutoCaptureProgress(0);
        }
        
        // Set appropriate status message
        if (!calculatedMetrics.faceCentered) {
          setStatusText('Center Your Face');
          setStatusType('warning');
        } else if (Math.abs(calculatedMetrics.faceAngle) >= FACE_ANGLE_THRESHOLD) {
          setStatusText('Keep Head Straight');
          setStatusType('warning');
        } else if (calculatedMetrics.distance < MIN_DISTANCE_CM) {
          setStatusText('Move Back');
          setStatusType('warning');
        } else if (calculatedMetrics.distance > MAX_DISTANCE_CM) {
          setStatusText('Move Closer');
          setStatusType('warning');
        } else if (calculatedMetrics.lighting < 60) {
          setStatusText('Need Better Lighting');
          setStatusType('warning');
        } else if (calculatedMetrics.faceStability < 80) {
          setStatusText('Hold Still');
          setStatusType('warning');
        } else {
          setStatusText('Face Detected');
          setStatusType('success');
        }
      }

      setFaceDetected(true);
      drawLandmarks(landmarks, calculatedMetrics);
      setMetrics(calculatedMetrics);

    } else {
      lastResultsRef.current = null;
      setStatusText('No Face Detected');
      setStatusType('warning');
      setFaceDetected(false);
      setIsPerfectCondition(false);
      setMetrics(null);
      setLeftEyeOpen(true);
      setRightEyeOpen(true);
      setSamplesCollected(0);
      
      // Clear buffers
      ipdBufferRef.current = [];
      leftPdBufferRef.current = [];
      rightPdBufferRef.current = [];
      stabilityBufferRef.current = [];
      
      // Cancel auto-capture
      if (autoCaptureTimerRef.current) {
        clearTimeout(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
        setIsAutoCapturing(false);
        setAutoCaptureProgress(0);
      }

      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    animationFrameRef.current = requestAnimationFrame(detectFace);
  }, [
    calculateMetrics, drawLandmarks, addSample,
    checkPerfectConditions, calculateAveragedMeasurement
  ]);

  // Start camera
  const startCamera = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const constraints = {
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30 }
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;

    await new Promise<void>((resolve) => {
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        resolve();
      };
    });

    await video.play();
  }, []);

  // Load model
  const loadModel = useCallback(async (hasWebGPU: boolean) => {
    setLoadingText('Loading AI Model...');
    setLoadingSubtext('Downloading face detection model');

    const { FaceLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision');

    setLoadingSubtext('Initializing face landmarker...');

    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
    );

    const faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          delegate: hasWebGPU ? 'GPU' : 'CPU',
        },
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
        runningMode: 'VIDEO',
        numFaces: 1,
      }
    );

    faceLandmarkerRef.current = faceLandmarker;
    setLoadingText('Model Loaded!');
    setLoadingSubtext('Starting camera...');
  }, []);

  // Initialize
  useEffect(() => {
    injectStyles();

    const init = async () => {
      try {
        const hasWebGPU = await checkWebGPUSupport();
        setWebgpuSupported(hasWebGPU);

        await loadModel(hasWebGPU);
        await startCamera();

        setIsLoading(false);
        setCanCapture(true);

        isDetectingRef.current = true;
        detectFace();
      } catch (error) {
        console.error('Initialization error:', error);
        setLoadingText('Error loading model');
        setLoadingSubtext(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    // Load history from localStorage
    const savedHistory = localStorage.getItem('ipdHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    init();

    return () => {
      isDetectingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoCaptureTimerRef.current) {
        clearTimeout(autoCaptureTimerRef.current);
      }
    };
  }, [checkWebGPUSupport, loadModel, startCamera, detectFace]);

  // Handle manual capture
  const handleCapture = () => {
    if (!lastResultsRef.current?.faceLandmarks?.length) {
      alert('No face detected. Please position your face in the frame.');
      return;
    }

    const measurement = calculateAveragedMeasurement();
    if (measurement && measurement.samples >= 10) {
      setCurrentMeasurement(measurement);
      setShowModal(true);
    } else if (metrics) {
      // Fallback to current frame if not enough samples
      setCurrentMeasurement({
        ipd: metrics.ipd,
        leftPd: metrics.leftPd,
        rightPd: metrics.rightPd,
        accuracy: metrics.accuracy,
        samples: 1,
        confidence: metrics.accuracy * 0.8
      });
      setShowModal(true);
    } else {
      alert('Please wait for more samples to be collected.');
    }
  };

  // Handle save result
  const handleSaveResult = () => {
    if (currentMeasurement) {
      const historyItem: HistoryItem = {
        ipd: currentMeasurement.ipd.toFixed(1),
        accuracy: currentMeasurement.accuracy,
        timestamp: new Date().toLocaleString(),
        samples: currentMeasurement.samples
      };

      const newHistory = [historyItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('ipdHistory', JSON.stringify(newHistory));
      
      // Clear buffers after saving
      ipdBufferRef.current = [];
      leftPdBufferRef.current = [];
      rightPdBufferRef.current = [];
      setSamplesCollected(0);
    }
    setShowModal(false);
  };

  // Handle clear history
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('ipdHistory');
  };

  // Get status styles
  const getStatusColor = (type: 'success' | 'warning' | 'danger'): string => {
    switch (type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'danger': return '#ef4444';
      default: return '#10b981';
    }
  };

  // Get metric status
  const getMetricStatus = (
    value: number,
    type: 'ipd' | 'distance' | 'lighting'
  ): { text: string; className: string } => {
    switch (type) {
      case 'ipd':
        if (value >= 54 && value <= 74) {
          return { text: 'Within normal range (54-74mm)', className: 'good' };
        } else if (value < 54) {
          return { text: 'Below average range', className: 'warning' };
        } else {
          return { text: 'Above average range', className: 'warning' };
        }
      case 'distance':
        if (value >= MIN_DISTANCE_CM && value <= MAX_DISTANCE_CM) {
          return { text: 'Optimal distance', className: 'good' };
        } else if (value < MIN_DISTANCE_CM) {
          return { text: 'Move back slightly', className: 'warning' };
        } else {
          return { text: 'Move closer', className: 'warning' };
        }
      case 'lighting':
        if (value >= 70) {
          return { text: 'Excellent lighting', className: 'good' };
        } else if (value >= 50) {
          return { text: 'Acceptable lighting', className: 'warning' };
        } else {
          return { text: 'Improve lighting', className: 'bad' };
        }
      default:
        return { text: '', className: '' };
    }
  };

  const getStatusBgColor = (className: string): string => {
    switch (className) {
      case 'good': return '#d1fae5';
      case 'warning': return '#fef3c7';
      case 'bad': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const getStatusTextColor = (className: string): string => {
    switch (className) {
      case 'good': return '#065f46';
      case 'warning': return '#92400e';
      case 'bad': return '#991b1b';
      default: return '#374151';
    }
  };

  const getProgressColor = (className: string): string => {
    switch (className) {
      case 'good': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'bad': return '#ef4444';
      default: return '#e5e7eb';
    }
  };

  const getAccuracyOffset = (accuracy: number): number => {
    const circumference = 2 * Math.PI * 34;
    return circumference - (accuracy / 100) * circumference;
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 90) return '#10b981';
    if (accuracy >= 70) return '#f59e0b';
    return '#ef4444';
  };

  // Calculate face guide position and size
  const getFaceGuideStyle = (): React.CSSProperties => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return {
        ...styles.faceGuide,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '280px',
      };
    }

    if (faceBounds && faceDetected) {
      // Adaptive guide based on detected face
      const containerWidth = canvas.offsetWidth || 640;
      const containerHeight = canvas.offsetHeight || 480;
      const scaleX = containerWidth / canvas.width;
      const scaleY = containerHeight / canvas.height;

      return {
        ...styles.faceGuide,
        ...(isPerfectCondition ? styles.faceGuidePerfect : 
            faceDetected ? styles.faceGuideDetected : {}),
        left: `${faceBounds.x * scaleX}px`,
        top: `${faceBounds.y * scaleY}px`,
        width: `${faceBounds.width * scaleX}px`,
        height: `${faceBounds.height * scaleY}px`,
        transform: 'none',
        borderRadius: '50%',
      };
    }

    // Default centered guide
    return {
      ...styles.faceGuide,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '200px',
      height: '280px',
    };
  };

  const getConfidenceBadgeStyle = (confidence: number): React.CSSProperties => {
    if (confidence >= 90) {
      return { ...styles.confidenceBadge, background: '#d1fae5', color: '#065f46' };
    } else if (confidence >= 70) {
      return { ...styles.confidenceBadge, background: '#fef3c7', color: '#92400e' };
    }
    return { ...styles.confidenceBadge, background: '#fee2e2', color: '#991b1b' };
  };

  return (
    <div style={styles.container}>
      {/* Loading Screen */}
      <div style={{
        ...styles.loadingScreen,
        ...(isLoading ? {} : styles.loadingScreenHidden),
      }}>
        <div style={styles.loader} />
        <div style={styles.loadingText}>{loadingText}</div>
        <div style={styles.loadingSubtext}>{loadingSubtext}</div>
      </div>

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle} className="header-title-responsive">
          <ScanFace size={32} color="#2563eb" />
          IPD Measurement Pro
        </h1>
        <p style={styles.headerSubtitle}>
          High-precision interpupillary distance measurement with auto-capture
        </p>
      </header>

      {/* Camera Section */}
      <div style={styles.cameraSection} className="camera-section-responsive">
        {/* Camera View */}
        <div style={styles.cameraContainer} className="camera-container-responsive">
          <video ref={videoRef} style={styles.video} playsInline autoPlay muted />
          <canvas ref={canvasRef} style={styles.canvas} />

          {/* Adaptive Face Guide */}
          <div style={getFaceGuideStyle()} className="face-guide-responsive" />

          {/* Status Badge */}
          <div style={styles.statusBadge}>
            <span style={{
              ...styles.statusDot,
              background: getStatusColor(statusType),
            }} />
            <span>{statusText}</span>
          </div>

          {/* Eye Status Badge */}
          {faceDetected && (
            <div style={styles.eyeStatusBadge}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {leftEyeOpen ? <Eye size={14} color="#10b981" /> : <EyeOff size={14} color="#ef4444" />}
                <span style={{ fontSize: '11px' }}>L</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {rightEyeOpen ? <Eye size={14} color="#10b981" /> : <EyeOff size={14} color="#ef4444" />}
                <span style={{ fontSize: '11px' }}>R</span>
              </div>
            </div>
          )}

          {/* WebGPU Badge */}
          {webgpuSupported && (
            <div style={styles.webgpuBadge}>
              <Zap size={12} />
              WebGPU
            </div>
          )}

          {/* Auto-Capture Indicator */}
          {isAutoCapturing && (
            <div style={styles.autoCaptureIndicator}>
              <Timer size={18} />
              <span>Auto-capturing...</span>
              <svg width="24" height="24" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="12" cy="12" r="10"
                  fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"
                />
                <circle
                  cx="12" cy="12" r="10"
                  fill="none" stroke="#ffffff" strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 10}
                  strokeDashoffset={2 * Math.PI * 10 * (1 - autoCaptureProgress / 100)}
                  style={{ transition: 'stroke-dashoffset 0.1s' }}
                />
              </svg>
            </div>
          )}

          {/* Capture Button */}
          <button
            style={{
              ...styles.captureBtn,
              ...(canCapture && metrics && metrics.accuracy >= 70 ? styles.captureBtnReady : {}),
              ...(!canCapture || !metrics || !leftEyeOpen || !rightEyeOpen ? styles.captureBtnDisabled : {}),
            }}
            onClick={handleCapture}
            disabled={!canCapture || !metrics || !leftEyeOpen || !rightEyeOpen}
          >
            <Camera size={28} color="#2563eb" />
          </button>
        </div>

        {/* Metrics Panel */}
        <div style={styles.metricsPanel}>
          {/* Warning if eyes closed */}
          {faceDetected && (!leftEyeOpen || !rightEyeOpen) && (
            <div style={styles.warningBanner}>
              <AlertCircle size={18} />
              <span>Please open both eyes for accurate measurement</span>
            </div>
          )}

          {/* IPD Metric */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <div style={{ ...styles.metricIcon, background: '#dbeafe' }}>
                <Ruler size={18} color="#2563eb" />
              </div>
              <span style={styles.metricTitle}>INTERPUPILLARY DISTANCE</span>
            </div>
            <div style={styles.metricValue} className="metric-value-responsive">
              {metrics && leftEyeOpen && rightEyeOpen ? metrics.ipd.toFixed(1) : '--'}
              <span style={styles.metricValueUnit}>mm</span>
            </div>
            {metrics && leftEyeOpen && rightEyeOpen && (
              <div style={{
                ...styles.metricStatus,
                background: getStatusBgColor(getMetricStatus(metrics.ipd, 'ipd').className),
                color: getStatusTextColor(getMetricStatus(metrics.ipd, 'ipd').className),
              }}>
                <CheckCircle size={14} />
                <span>{getMetricStatus(metrics.ipd, 'ipd').text}</span>
              </div>
            )}
            {/* Samples indicator */}
            <div style={styles.samplesIndicator}>
              <Shield size={12} />
              <span>Samples: {samplesCollected}/{SAMPLES_FOR_CAPTURE}</span>
              <div style={styles.sampleDots}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.sampleDot,
                      ...(i < Math.floor(samplesCollected / 3) ? styles.sampleDotFilled : {}),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Distance Metric */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <div style={{ ...styles.metricIcon, background: '#d1fae5' }}>
                <Move size={18} color="#10b981" />
              </div>
              <span style={styles.metricTitle}>DISTANCE FROM CAMERA</span>
            </div>
            <div style={styles.metricValue} className="metric-value-responsive">
              {metrics ? metrics.distance.toFixed(0) : '--'}
              <span style={styles.metricValueUnit}>cm</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: metrics
                  ? `${Math.min(100, Math.max(0, 100 - Math.abs(metrics.distance - IDEAL_DISTANCE_CM) * 3))}%`
                  : '0%',
                background: metrics
                  ? getProgressColor(getMetricStatus(metrics.distance, 'distance').className)
                  : '#e5e7eb',
              }} />
            </div>
            {metrics && (
              <div style={{
                ...styles.metricStatus,
                background: getStatusBgColor(getMetricStatus(metrics.distance, 'distance').className),
                color: getStatusTextColor(getMetricStatus(metrics.distance, 'distance').className),
              }}>
                <Info size={14} />
                <span>{getMetricStatus(metrics.distance, 'distance').text}</span>
              </div>
            )}
          </div>

          {/* Lighting Metric */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <div style={{ ...styles.metricIcon, background: '#fef3c7' }}>
                <Sun size={18} color="#f59e0b" />
              </div>
              <span style={styles.metricTitle}>LIGHTING QUALITY</span>
            </div>
            <div style={styles.metricValue} className="metric-value-responsive">
              {metrics ? metrics.lighting : '--'}
              <span style={styles.metricValueUnit}>%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: metrics ? `${metrics.lighting}%` : '0%',
                background: metrics
                  ? getProgressColor(getMetricStatus(metrics.lighting, 'lighting').className)
                  : '#e5e7eb',
              }} />
            </div>
            {metrics && (
              <div style={{
                ...styles.metricStatus,
                background: getStatusBgColor(getMetricStatus(metrics.lighting, 'lighting').className),
                color: getStatusTextColor(getMetricStatus(metrics.lighting, 'lighting').className),
              }}>
                <Info size={14} />
                <span>{getMetricStatus(metrics.lighting, 'lighting').text}</span>
              </div>
            )}
          </div>

          {/* Accuracy Metric */}
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <div style={{ ...styles.metricIcon, background: '#ede9fe' }}>
                <Target size={18} color="#7c3aed" />
              </div>
              <span style={styles.metricTitle}>MEASUREMENT ACCURACY</span>
            </div>
            <div style={styles.accuracyRing}>
              <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke={metrics ? getAccuracyColor(metrics.accuracy) : '#e5e7eb'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="213.6"
                  strokeDashoffset={metrics ? getAccuracyOffset(metrics.accuracy) : 213.6}
                  style={{ transition: 'stroke-dashoffset 0.5s' }}
                />
              </svg>
              <div style={styles.accuracyValue}>
                {metrics ? `${metrics.accuracy}%` : '--%'}
              </div>
            </div>
            {metrics && metrics.faceStability > 0 && (
              <div style={{ 
                fontSize: '11px', 
                color: '#6b7280', 
                textAlign: 'center', 
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <span>Stability: {metrics.faceStability.toFixed(0)}%</span>
                <span>Angle: {Math.abs(metrics.faceAngle).toFixed(1)}°</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={styles.instructions}>
        <h3 style={styles.instructionsTitle}>
          <Lightbulb size={16} color="#f59e0b" />
          Tips for Accurate Measurement
        </h3>
        <ul style={styles.instructionsList}>
          <li style={styles.instructionsItem}>
            <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            Position your face within the adaptive guide - it adjusts to fit your face
          </li>
          <li style={styles.instructionsItem}>
            <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            Keep both eyes open and look directly at the camera
          </li>
          <li style={styles.instructionsItem}>
            <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            Maintain a distance of 30-50 cm from the camera (optimal: 40cm)
          </li>
          <li style={styles.instructionsItem}>
            <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            Hold still - auto-capture activates when conditions are perfect
          </li>
          <li style={styles.instructionsItem}>
            <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            Ensure even, well-lit environment (avoid harsh shadows or backlighting)
          </li>
          <li style={styles.instructionsItem}>
            <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            Remove glasses for most accurate results
          </li>
        </ul>
      </div>

      {/* History Section */}
      <div style={styles.historySection}>
        <div style={styles.historyHeader}>
          <h3 style={styles.historyTitle}>
            <History size={18} />
            Measurement History
          </h3>
          <button style={styles.clearBtn} onClick={handleClearHistory}>
            <Trash2 size={14} />
            Clear
          </button>
        </div>
        <div style={styles.historyList}>
          {history.length === 0 ? (
            <div style={styles.historyEmpty}>
              <Inbox size={32} style={{ marginBottom: '8px' }} />
              <p>No measurements yet</p>
            </div>
          ) : (
            history.map((item, index) => (
              <div key={index} style={styles.historyItem}>
                <div>
                  <div style={styles.historyIpd}>{item.ipd} mm</div>
                  <div style={styles.historyMeta}>{item.timestamp}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={styles.historyMeta}>{item.accuracy}% accuracy</div>
                  <div style={styles.historyMeta}>{item.samples} samples</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Results Modal */}
      <div
        style={{
          ...styles.modalOverlay,
          ...(showModal ? styles.modalOverlayShow : {}),
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowModal(false);
        }}
      >
        <div style={{ ...styles.modal, ...(showModal ? styles.modalShow : {}) }}>
          <div style={styles.modalHeader}>
            <div style={styles.modalIcon}>
              <Check size={32} color="#10b981" />
            </div>
            <h2 style={styles.modalTitle}>Measurement Complete</h2>
            {currentMeasurement && (
              <p style={styles.modalSubtitle}>
                Based on {currentMeasurement.samples} samples
              </p>
            )}
          </div>
          
          <div style={styles.modalResults}>
            <div style={{ ...styles.resultRow, ...styles.resultRowHighlight }}>
              <span style={{ ...styles.resultLabel, fontWeight: 600 }}>
                IPD (Interpupillary Distance)
              </span>
              <span style={{ ...styles.resultValue, fontSize: '20px', color: '#2563eb' }}>
                {currentMeasurement ? `${currentMeasurement.ipd.toFixed(1)} mm` : '-- mm'}
              </span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Left Pupil to Center</span>
              <span style={styles.resultValue}>
                {currentMeasurement ? `${currentMeasurement.leftPd.toFixed(1)} mm` : '-- mm'}
              </span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Right Pupil to Center</span>
              <span style={styles.resultValue}>
                {currentMeasurement ? `${currentMeasurement.rightPd.toFixed(1)} mm` : '-- mm'}
              </span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Measurement Confidence</span>
              <span style={getConfidenceBadgeStyle(currentMeasurement?.confidence || 0)}>
                <Shield size={12} />
                {currentMeasurement ? `${currentMeasurement.confidence.toFixed(0)}%` : '--%'}
              </span>
            </div>
          </div>
          
          <button
            style={{ ...styles.modalBtn, ...styles.modalBtnPrimary }}
            onClick={handleSaveResult}
          >
            <Save size={18} />
            Save Measurement
          </button>
          <button
            style={{ ...styles.modalBtn, ...styles.modalBtnSecondary }}
            onClick={() => setShowModal(false)}
          >
            <X size={18} />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IPDMeasurement;