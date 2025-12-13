
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Video, CameraOff, CheckCircle, XCircle } from 'lucide-react';
import {
  FaceLandmarker,
  FilesetResolver,
  DrawingUtils
} from '@mediapipe/tasks-vision';

let faceLandmarker: FaceLandmarker;
let runningMode = 'VIDEO';

const createFaceLandmarker = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: 'GPU'
        },
        outputFaceBlendshapes: true,
        runningMode,
        numFaces: 1
    });
};

export function IpdToolClientWebGpu() {
    const [hasGetUserMedia, setHasGetUserMedia] = useState(false);
    const [webcamRunning, setWebcamRunning] = useState(false);
    const [ipd, setIpd] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing...');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let lastVideoTime = -1;

    useEffect(() => {
        const init = async () => {
            await createFaceLandmarker();
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                setHasGetUserMedia(true);
            }
        };
        init();
    }, []);

    const predictWebcam = async () => {
        if (!videoRef.current || !canvasRef.current || !faceLandmarker) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        if (!canvasCtx) return;

        let startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
            lastVideoTime = video.currentTime;
            const results = faceLandmarker.detectForVideo(video, startTimeMs);

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            const drawingUtils = new DrawingUtils(canvasCtx);

            if (results.faceLandmarks) {
                for (const landmarks of results.faceLandmarks) {
                    // Draw face mesh
                    drawingUtils.drawConnectors(
                        landmarks,
                        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                        { color: '#C0C0C070', lineWidth: 1 }
                    );
                    
                    // The keypoints for the pupils
                    const leftPupil = landmarks[473];
                    const rightPupil = landmarks[468];

                    if(leftPupil && rightPupil) {
                        // Simple pixel distance
                        const pixelDist = Math.sqrt(
                            Math.pow(leftPupil.x - rightPupil.x, 2) +
                            Math.pow(leftPupil.y - rightPupil.y, 2)
                        );
                        
                        // This is a placeholder for a more complex calculation
                        // that would involve known object for scale (e.g. credit card)
                        // For now we will use a very rough estimation
                        const estimatedIpd = pixelDist * 150; 
                        setIpd(estimatedIpd);
                    }
                }
            }
            canvasCtx.restore();
        }

        if (webcamRunning) {
            window.requestAnimationFrame(predictWebcam);
        }
    };

    const enableCam = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!faceLandmarker) {
            console.log('Wait! faceLandmarker not loaded yet.');
            return;
        }

        if (webcamRunning) {
            setWebcamRunning(false);
            if(videoRef.current && videoRef.current.srcObject){
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            }
        } else {
            setWebcamRunning(true);
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                if(videoRef.current){
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadeddata', predictWebcam);
                }
            });
        }
    };


  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-center mb-4">IPD Measurement Tool (WebGPU)</h1>
            <div className="relative flex justify-center items-center">
                <video ref={videoRef} className="w-full h-auto" autoPlay playsInline></video>
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            </div>

            <div className="mt-4 text-center">
              {hasGetUserMedia ? (
                 <Button onClick={enableCam}>
                 {webcamRunning ? <CameraOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                 {webcamRunning ? 'Disable Webcam' : 'Enable Webcam'}
               </Button>
              ): (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Your browser does not support the necessary features for this tool.
                    </AlertDescription>
                </Alert>
              )}
            </div>
            {ipd && (
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">Estimated IPD:</h2>
                    <p className="text-3xl font-bold text-primary">{ipd.toFixed(2)} mm</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
