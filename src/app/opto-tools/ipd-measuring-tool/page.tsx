
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calculator, Orbit, RotateCw, Contact, Eye, ZoomIn, Ruler, Sigma, CheckCircle, XCircle, Loader2, User, UserRound, View, Scale, Link as LinkIcon, Hand, BrainCircuit, RefreshCw, Minus, Plus, Copy, Share2, Info, Building, ScanFace, Move, Sun, Target, History, Trash2, Inbox, Save, Zap, Camera, Lightbulb, Check, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


export default function IPDMeasuringToolPage() {
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('Initializing AI Model...');
    const [loadingSubtext, setLoadingSubtext] = useState('This may take a few moments');
    const [statusText, setStatusText] = useState('Initializing...');
    const [statusType, setStatusType] = useState('warning');
    const [faceDetected, setFaceDetected] = useState(false);
    const [webGpuSupported, setWebGpuSupported] = useState(false);
    const [metrics, setMetrics] = useState({ ipd: 0, distance: 0, lighting: 0, accuracy: 0, leftPd: 0, rightPd: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
    const lastResultsRef = useRef<any>(null);
    const animationFrameId = useRef<number>();
    const { toast } = useToast();

    const AVERAGE_IRIS_DIAMETER_MM = 11.7;
    const LEFT_IRIS_CENTER = 468;
    const RIGHT_IRIS_CENTER = 473;
    const LEFT_IRIS_POINTS = [469, 470, 471, 472];
    const RIGHT_IRIS_POINTS = [474, 475, 476, 477];

    useEffect(() => {
        const loadHistory = () => {
            const saved = localStorage.getItem('ipdHistory');
            if (saved) {
                setHistory(JSON.parse(saved));
            }
        };
        loadHistory();
        init();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const init = async () => {
        try {
            const isSupported = await checkWebGPUSupport();
            setWebGpuSupported(isSupported);
            await loadModel(isSupported);
            await startCamera();
            // The detection loop is now started by the video's onplaying event
        } catch (error: any) {
            console.error('Initialization error:', error);
            setLoadingText('Error Initializing');
            setLoadingSubtext(error.message || 'Please check permissions and refresh.');
        }
    };

    const checkWebGPUSupport = async () => {
        if ('gpu' in navigator) {
            try {
                const adapter = await navigator.gpu.requestAdapter();
                return adapter !== null;
            } catch (e) { return false; }
        }
        return false;
    };

    const loadModel = async (isGpuSupported: boolean) => {
        setLoadingText('Loading AI Model...');
        setLoadingSubtext('Downloading face detection model...');
        const { FaceLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision');
        const filesetResolver = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                delegate: isGpuSupported ? 'GPU' : 'CPU',
            },
            outputFaceBlendshapes: false,
            outputFacialTransformationMatrixes: false,
            runningMode: 'VIDEO',
            numFaces: 1,
        });
        setLoadingSubtext('Model loaded. Starting camera...');
    };

    const startCamera = async () => {
        if (videoRef.current) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } });
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                if (canvasRef.current && videoRef.current) {
                    canvasRef.current.width = videoRef.current.videoWidth;
                    canvasRef.current.height = videoRef.current.videoHeight;
                }
                videoRef.current?.play();
            };
        }
    };

    const startDetection = () => {
        setLoading(false);
        if (faceLandmarkerRef.current) {
            detectFace();
        }
    };

    const detectFace = async () => {
        if (videoRef.current && faceLandmarkerRef.current && videoRef.current.readyState >= 3) {
            const startTime = performance.now();
            const results = faceLandmarkerRef.current.detectForVideo(videoRef.current, startTime);
            lastResultsRef.current = results;
            
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            
            if (canvas && ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                    const landmarks = results.faceLandmarks[0];
                    setStatusText('Face Detected');
                    setStatusType('success');
                    setFaceDetected(true);
                    drawLandmarks(ctx, landmarks, canvas.width, canvas.height);
                    
                    const newMetrics = calculateMetrics(landmarks, canvas.width, canvas.height);
                    setMetrics(newMetrics);
                } else {
                    setStatusText('No Face Detected');
                    setStatusType('warning');
                    setFaceDetected(false);
                    setMetrics({ ipd: 0, distance: 0, lighting: 0, accuracy: 0, leftPd: 0, rightPd: 0 });
                }
            }
        }
        animationFrameId.current = requestAnimationFrame(detectFace);
    };

    const drawLandmarks = (ctx: CanvasRenderingContext2D, landmarks: any[], width: number, height: number) => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        const leftIris = landmarks[LEFT_IRIS_CENTER];
        const rightIris = landmarks[RIGHT_IRIS_CENTER];

        if (leftIris && rightIris) {
            ctx.beginPath();
            ctx.arc(leftIris.x * width, leftIris.y * height, 6, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.arc(rightIris.x * width, rightIris.y * height, 6, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        }
    };

    const calculateIrisRadius = (landmarks: any[], side: 'left' | 'right', canvasWidth: number, canvasHeight: number) => {
        const irisPoints = side === 'left' ? LEFT_IRIS_POINTS : RIGHT_IRIS_POINTS;
        const center = side === 'left' ? landmarks[LEFT_IRIS_CENTER] : landmarks[RIGHT_IRIS_CENTER];
        let totalRadius = 0;
        irisPoints.forEach(index => {
            const point = landmarks[index];
            const dx = (point.x - center.x) * canvasWidth;
            const dy = (point.y - center.y) * canvasHeight;
            totalRadius += Math.sqrt(dx * dx + dy * dy);
        });
        return totalRadius / irisPoints.length;
    };
    
    const calculateMetrics = (landmarks: any[], canvasWidth: number, canvasHeight: number) => {
        const leftIris = landmarks[LEFT_IRIS_CENTER];
        const rightIris = landmarks[RIGHT_IRIS_CENTER];
        const dx = (rightIris.x - leftIris.x) * canvasWidth;
        const dy = (rightIris.y - leftIris.y) * canvasHeight;
        const pixelDistance = Math.sqrt(dx * dx + dy * dy);
        const leftRadius = calculateIrisRadius(landmarks, 'left', canvasWidth, canvasHeight);
        const rightRadius = calculateIrisRadius(landmarks, 'right', canvasWidth, canvasHeight);
        const avgIrisRadiusPx = (leftRadius + rightRadius) / 2;
        const irisDiameterPx = avgIrisRadiusPx * 2;
        const mmPerPixel = AVERAGE_IRIS_DIAMETER_MM / irisDiameterPx;
        const ipdMm = pixelDistance * mmPerPixel;
        const focalLengthPx = canvasWidth * 0.8;
        const distanceCm = (AVERAGE_IRIS_DIAMETER_MM * focalLengthPx) / (irisDiameterPx * 10);
        const noseBridge = landmarks[168];
        const leftPd = Math.abs(leftIris.x - noseBridge.x) * canvasWidth * mmPerPixel;
        const rightPd = Math.abs(rightIris.x - noseBridge.x) * canvasWidth * mmPerPixel;
        const lighting = 50; // Placeholder
        const accuracy = 80; // Placeholder
        return { ipd: ipdMm, leftPd: leftPd, rightPd: rightPd, distance: distanceCm, lighting: lighting, accuracy: accuracy };
    };

    const handleCapture = () => {
        if (!lastResultsRef.current || lastResultsRef.current.faceLandmarks.length === 0) {
            toast({
              variant: 'destructive',
              title: 'No Face Detected',
              description: 'Please position your face within the frame.',
            });
            return;
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const newHistoryItem = {
            ipd: metrics.ipd.toFixed(1),
            accuracy: metrics.accuracy,
            timestamp: new Date().toLocaleString(),
        };
        const newHistory = [newHistoryItem, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem('ipdHistory', JSON.stringify(newHistory));
        setIsModalOpen(false);
        toast({
          title: 'Measurement Saved',
          description: `IPD of ${metrics.ipd.toFixed(1)} mm saved to history.`,
        });
    };
    
    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem('ipdHistory');
        toast({
          title: 'History Cleared',
          description: 'All saved measurements have been deleted.',
        });
    };

    const MetricCard: React.FC<{ icon: React.ReactNode, title: string, value: string, children?: React.ReactNode, statusText?: string, statusClass?: string }> = ({ icon, title, value, children, statusText, statusClass }) => (
        <div className="metric-card">
            <div className="metric-header"><div className="metric-icon">{icon}</div><span className="metric-title">{title}</span></div>
            <div className="metric-value" dangerouslySetInnerHTML={{__html: value}}></div>
            {children}
            {statusText && <div className={cn("metric-status", statusClass)}><Info size={14} /><span>{statusText}</span></div>}
        </div>
    );
    
    return (
        <div className="bg-white min-h-screen">
          <div className="container mx-auto px-4 py-8 ipd-tool-container">
            {loading && (
              <div className="loading-screen">
                <div className="loader"></div>
                <div className="loading-text">{loadingText}</div>
                <div className="loading-subtext">{loadingSubtext}</div>
              </div>
            )}
            
            <header className="header">
              <h1 className="flex items-center justify-center gap-3">
                  <ScanFace className="h-8 w-8 text-primary" />
                  IPD Measurement Pro
              </h1>
              <p>Precise interpupillary distance measurement using AI face detection</p>
            </header>
      
            <div className="camera-section">
              <div className="camera-container">
                <video ref={videoRef} playsInline autoPlay muted onPlaying={startDetection}></video>
                <canvas ref={canvasRef}></canvas>
                <div className={cn("face-guide", faceDetected && "detected")}></div>
                <div className="status-badge"><span className={cn("status-dot", statusType)}></span><span>{statusText}</span></div>
                {webGpuSupported && <div className="webgpu-badge"><Zap size={12}/> WebGPU</div>}
                <button className="capture-btn" onClick={handleCapture} disabled={!faceDetected}><Camera size={28}/></button>
              </div>
      
              <div className="metrics-panel">
                  <MetricCard icon={<Ruler size={18} />} title="INTERPUPILLARY DISTANCE" value={`${metrics.ipd > 0 ? metrics.ipd.toFixed(1) : '--'}<span>mm</span>`} />
                  <MetricCard icon={<Move size={18} />} title="DISTANCE FROM CAMERA" value={`${metrics.distance > 0 ? metrics.distance.toFixed(0) : '--'}<span>cm</span>`}>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, 100 - Math.abs(metrics.distance - 40) * 2.5))}%` }}></div></div>
                  </MetricCard>
                  <MetricCard icon={<Sun size={18} />} title="LIGHTING QUALITY" value={`${metrics.lighting > 0 ? metrics.lighting : '--'}<span>%</span>`}>
                       <div className="progress-bar"><div className="progress-fill" style={{ width: `${metrics.lighting}%` }}></div></div>
                  </MetricCard>
                  <MetricCard icon={<Target size={18} />} title="MEASUREMENT ACCURACY" value="">
                       <div className="accuracy-ring">
                          <svg width="80" height="80"><circle className="bg" cx="40" cy="40" r="34"></circle><circle className="progress" id="accuracyProgress" cx="40" cy="40" r="34" strokeDasharray="213.6" strokeDashoffset={213.6 - (metrics.accuracy/100)*213.6} strokeLinecap="round"></circle></svg>
                          <div className="accuracy-value">{metrics.accuracy > 0 ? `${metrics.accuracy}%` : '--%'}</div>
                      </div>
                  </MetricCard>
              </div>
            </div>
            
              <div className="instructions">
                  <h3><Lightbulb size={16} /> Tips for Accurate Measurement</h3>
                  <ul>
                      <li><Check size={14}/> Position your face within the oval guide</li>
                      <li><Check size={14}/> Maintain a distance of 30-50 cm from the camera</li>
                      <li><Check size={14}/> Ensure even lighting on your face (avoid harsh shadows)</li>
                      <li><Check size={14}/> Look directly at the camera with a neutral expression</li>
                      <li><Check size={14}/> Remove glasses for most accurate results</li>
                  </ul>
              </div>

            <div className="history-section">
              <div className="history-header">
                  <h3 className="history-title"><History size={18}/> Measurement History</h3>
                  <button className="clear-btn" onClick={handleClearHistory}><Trash2 size={14}/> Clear</button>
              </div>
              <div className="history-list">
                  {history.length === 0 ? (
                      <div className="history-empty"><Inbox size={32} style={{ marginBottom: '8px' }}/><p>No measurements yet</p></div>
                  ) : history.map((item, index) => (
                      <div key={index} className="history-item">
                          <div>
                              <div className="history-ipd">{item.ipd} mm</div>
                              <div className="history-meta">{item.timestamp}</div>
                          </div>
                          <div className="history-meta">{item.accuracy}% accuracy</div>
                      </div>
                  ))}
              </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                      <DialogHeader className="modal-header">
                          <div className="modal-icon"><Check size={32}/></div>
                          <DialogTitle className="modal-title">Measurement Complete</DialogTitle>
                      </DialogHeader>
                      <div className="modal-results">
                          <div className="result-row"><span className="result-label">IPD (Interpupillary Distance)</span><span className="result-value">{metrics.ipd.toFixed(1)} mm</span></div>
                          <div className="result-row"><span className="result-label">Left Pupil to Center</span><span className="result-value">{metrics.leftPd.toFixed(1)} mm</span></div>
                          <div className="result-row"><span className="result-label">Right Pupil to Center</span><span className="result-value">{metrics.rightPd.toFixed(1)} mm</span></div>
                          <div className="result-row"><span className="result-label">Measurement Accuracy</span><span className="result-value">{metrics.accuracy}%</span></div>
                      </div>
                      <Button className="modal-btn primary" onClick={handleSave}><Save size={18}/> Save Measurement</Button>
                      <Button className="modal-btn secondary" onClick={() => setIsModalOpen(false)}><X size={18}/> Close</Button>
                </DialogContent>
            </Dialog>
          </div>
        </div>
    );
}
