
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Orbit, RotateCw, Contact } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// --- Vertex Distance Calculator ---
function VertexDistanceCalculator() {
    const [conversion, setConversion] = useState('specsToCL');
    const [sphere, setSphere] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [axis, setAxis] = useState('');
    const [vertexDistance, setVertexDistance] = useState('12');
    const [result, setResult] = useState('');
    const [message, setMessage] = useState('');

    const calculatePrescription = () => {
        const DL_sphere = parseFloat(sphere);
        const DL_cylinder = parseFloat(cylinder);
        const d = parseFloat(vertexDistance) / 1000;

        if (isNaN(DL_sphere)) {
            setMessage('Please provide a valid sphere power.');
            setResult('');
            return;
        }

        const effectiveSphere = DL_sphere / (1 - d * DL_sphere);

        if (isNaN(DL_cylinder) || DL_cylinder === 0) {
            setResult(`Sphere: ${effectiveSphere.toFixed(2)} D`);
            setMessage(Math.abs(DL_sphere) < 4 ? 'No significant change in power for sphere value less than ±4.00D.' : '');
            return;
        }

        const DL_total = DL_sphere + DL_cylinder;
        const effectiveTotal = DL_total / (1 - d * DL_total);
        const effectiveCylinder = effectiveTotal - effectiveSphere;

        setResult(`Sphere: ${effectiveSphere.toFixed(2)} D, Cylinder: ${effectiveCylinder.toFixed(2)} D, Axis: ${axis || 'N/A'}`);
        setMessage(Math.abs(DL_sphere) < 4 ? 'No significant change in power for sphere value less than ±4.00D.' : '');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vertex Distance Effective Power</CardTitle>
                <CardDescription>Calculate the effective power of a prescription at a different vertex distance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup value={conversion} onValueChange={setConversion} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specsToCL" id="specsToCL" />
                        <Label htmlFor="specsToCL">Spectacles to Contact Lens</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="clToSpecs" id="clToSpecs" />
                        <Label htmlFor="clToSpecs">Contact Lens to Spectacles</Label>
                    </div>
                </RadioGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sphere">Sphere (D)</Label>
                        <Input id="sphere" type="number" placeholder="-5.00" value={sphere} onChange={(e) => setSphere(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cylinder">Cylinder (D)</Label>
                        <Input id="cylinder" type="number" placeholder="-1.25" value={cylinder} onChange={(e) => setCylinder(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="axis">Axis (°)</Label>
                        <Input id="axis" type="number" placeholder="180" value={axis} onChange={(e) => setAxis(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vertexDistance">Vertex Distance (mm)</Label>
                        <Input id="vertexDistance" type="number" placeholder="12" value={vertexDistance} onChange={(e) => setVertexDistance(e.target.value)} />
                    </div>
                </div>
                <Button onClick={calculatePrescription}>Calculate</Button>
                {result && (
                    <Alert>
                        <Calculator className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription>
                            <p className="font-semibold">{result}</p>
                            {message && <p className="text-sm text-muted-foreground mt-1">{message}</p>}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}


// --- Base Curve Calculator ---
function BaseCurveCalculator() {
    const [avgK, setAvgK] = useState('');
    const [result, setResult] = useState('');

    const calculateBaseCurve = () => {
        const power = parseFloat(avgK);
        if (isNaN(power) || power === 0) {
            setResult('Please enter a valid dioptric power.');
            return;
        }
        const baseCurve = 337.5 / power;
        setResult(`Base Curve: ${baseCurve.toFixed(2)} mm`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Keratometry to Base Curve</CardTitle>
                <CardDescription>Convert the average keratometry reading (in Diopters) to a base curve (in mm).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 max-w-xs">
                    <Label htmlFor="avgK">Average K (D)</Label>
                    <Input id="avgK" type="number" placeholder="43.50" value={avgK} onChange={(e) => setAvgK(e.target.value)} />
                </div>
                <Button onClick={calculateBaseCurve}>Calculate</Button>
                {result && (
                    <Alert>
                        <Orbit className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="font-semibold">{result}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

// --- LARS Rule Calculator ---
function LarsRuleCalculator() {
    const [initialAxis, setInitialAxis] = useState(90);
    const [rotatedAxis, setRotatedAxis] = useState(90);
    const [result, setResult] = useState('');

    const drawAxis = useCallback((canvas: HTMLCanvasElement | null, angle: number) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (!isNaN(angle)) {
            const rad = ((angle % 180)) * (Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(centerX - radius * Math.sin(rad), centerY + radius * Math.cos(rad));
            ctx.lineTo(centerX + radius * Math.sin(rad), centerY - radius * Math.cos(rad));
            ctx.strokeStyle = '#0ea5e9';
            ctx.lineWidth = 4;
            ctx.stroke();
        }
    }, []);
    
    const initialCanvasRef = useRef<HTMLCanvasElement>(null);
    const rotatedCanvasRef = useRef<HTMLCanvasElement>(null);
    const resultCanvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        drawAxis(initialCanvasRef.current, initialAxis);
    }, [initialAxis, drawAxis]);

    useEffect(() => {
        drawAxis(rotatedCanvasRef.current, rotatedAxis);
    }, [rotatedAxis, drawAxis]);

    const applyLarsRule = () => {
        const initial = initialAxis;
        const rotated = rotatedAxis;

        const diff = rotated - initial;
        let correctedAxis;

        if (diff > 0) { // Clockwise rotation (Left)
            correctedAxis = initial + diff;
        } else { // Anti-clockwise rotation (Right)
            correctedAxis = initial + diff; // diff is negative, so it's a subtraction
        }
        
        // Normalize to 1-180 range
        correctedAxis = ((correctedAxis - 1 + 180) % 180) + 1;
        
        setResult(`Suggested Trial Axis: ${correctedAxis.toFixed(0)}°`);
        drawAxis(resultCanvasRef.current, correctedAxis);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>LARS Rule Calculator</CardTitle>
                <CardDescription>Calculate the compensatory axis adjustment for a rotated toric contact lens.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4">
                        <Label htmlFor="initialAxis">Initial Axis: {initialAxis}°</Label>
                        <Slider id="initialAxis" min={1} max={180} step={1} value={[initialAxis]} onValueChange={(v) => setInitialAxis(v[0])} />
                    </div>
                     <div className="space-y-4">
                        <Label htmlFor="rotatedAxis">Axis After Blink: {rotatedAxis}°</Label>
                        <Slider id="rotatedAxis" min={1} max={180} step={1} value={[rotatedAxis]} onValueChange={(v) => setRotatedAxis(v[0])} />
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-8">
                     <div className="text-center">
                        <Label>Initial Axis</Label>
                        <canvas ref={initialCanvasRef} width="150" height="150" className="mt-2 bg-slate-50 rounded-full border"></canvas>
                    </div>
                    <div className="text-center">
                        <Label>Rotated Axis</Label>
                        <canvas ref={rotatedCanvasRef} width="150" height="150" className="mt-2 bg-slate-50 rounded-full border"></canvas>
                    </div>
                </div>
                <Button onClick={applyLarsRule}>Apply LARS Rule</Button>
                 {result && (
                    <Alert>
                        <RotateCw className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="flex flex-col sm:flex-row items-center gap-4">
                            <p className="font-semibold text-base">{result}</p>
                            <div className="text-center">
                                <canvas ref={resultCanvasRef} width="100" height="100" className="mt-2 bg-slate-50 rounded-full border"></canvas>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

export default function OptoToolsPage() {
  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Optometry Tools</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          A suite of calculators and converters designed for eye care professionals.
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <Contact className="h-6 w-6 text-primary" />
                        Contact Lens Calculators
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="vertex" className="w-full">
                        <div className="flex justify-center mb-6">
                            <TabsList className="h-auto p-1.5 bg-blue-100/60 rounded-full">
                                <TabsTrigger value="vertex" className="px-6 py-2 text-sm">Vertex Distance</TabsTrigger>
                                <TabsTrigger value="base-curve" className="px-6 py-2 text-sm">Base Curve</TabsTrigger>
                                <TabsTrigger value="lars" className="px-6 py-2 text-sm">LARS Rule</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="vertex" className="mt-6">
                            <VertexDistanceCalculator />
                        </TabsContent>
                        <TabsContent value="base-curve" className="mt-6">
                            <BaseCurveCalculator />
                        </TabsContent>
                        <TabsContent value="lars" className="mt-6">
                            <LarsRuleCalculator />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
