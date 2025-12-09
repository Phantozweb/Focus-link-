
import type { CSSProperties } from 'react';

// Types
export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface FaceResult {
  faceLandmarks: Landmark[][];
}

export interface Metrics {
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

export interface HistoryItem {
  ipd: string;
  accuracy: number;
  timestamp: string;
  samples: number;
  captures: number;
}

export interface KalmanFilter {
  x: number;
  p: number;
  q: number;
  r: number;
  update: (measurement: number) => number;
}

// Constants
export const AVERAGE_IRIS_DIAMETER_MM = 11.7;
export const IDEAL_DISTANCE_CM = 40;
export const MIN_DISTANCE_CM = 30;
export const MAX_DISTANCE_CM = 50;

// Landmark indices
export const LEFT_IRIS_CENTER = 473;
export const RIGHT_IRIS_CENTER = 468;
export const LEFT_IRIS_POINTS = [474, 475, 476, 477];
export const RIGHT_IRIS_POINTS = [469, 470, 471, 472];

// Eye landmarks for blink detection
export const LEFT_EYE_VERTICAL = { top: 386, bottom: 374 };
export const LEFT_EYE_HORIZONTAL = { left: 362, right: 263 };
export const RIGHT_EYE_VERTICAL = { top: 159, bottom: 145 };
export const RIGHT_EYE_HORIZONTAL = { left: 33, right: 133 };

// Auto-capture thresholds
export const AUTO_CAPTURE_ACCURACY_THRESHOLD = 92;
export const AUTO_CAPTURE_STABILITY_THRESHOLD = 95;
export const AUTO_CAPTURE_DELAY_MS = 1500;
export const AUTO_CAPTURE_TOTAL = 3;
export const SAMPLES_FOR_CAPTURE = 30;
export const EYE_ASPECT_RATIO_THRESHOLD = 0.22;
export const FACE_ANGLE_THRESHOLD = 8;
export const STABILITY_HISTORY_LENGTH = 20;

// Kalman filter factory
export const createKalmanFilter = (initialValue: number = 0): KalmanFilter => {
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
export const styles: { [key: string]: CSSProperties } = {
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
  loadingScreen: {
    position: 'fixed',
    inset: 0,
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    transition: 'opacity 0.3s, visibility 0.3s',
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
  cameraSection: {
    display: 'grid',
    gap: '24px',
  },
  cameraContainer: {
    position: 'relative',
    background: '#111827',
    borderRadius: '16px',
    overflow: 'hidden',
    aspectRatio: '4/3',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 10,
  },
  statusBadge: {
    position: 'absolute',
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
    position: 'absolute',
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
  autoCaptureIndicator: {
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(59, 130, 246, 0.9)',
    backdropFilter: 'blur(8px)',
    padding: '10px 20px',
    borderRadius: '25px',
    color: 'white',
    zIndex: 20,
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
    textAlign: 'center'
  },
  captureBtn: {
    position: 'absolute',
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
  captureBtnReady: {
    borderColor: '#10b981',
    animation: 'pulseGreen 1.5s infinite',
  },
  metricsPanel: {
    display: 'flex',
    flexDirection: 'column',
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
    textAlign: 'center',
    padding: '32px',
    color: '#9ca3af',
    fontSize: '14px',
  },
  accuracyRing: {
    position: 'relative',
    width: '80px',
    height: '80px',
    margin: '0 auto',
  },
  accuracyValue: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s',
  },
  modalOverlayShow: {
    opacity: 1,
    visibility: 'visible',
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
    textAlign: 'center',
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
  resultLabel: {
    fontSize: '14px',
    color: '#4b5563',
  },
  resultValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
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
};
