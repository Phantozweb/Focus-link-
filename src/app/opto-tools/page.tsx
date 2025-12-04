
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Orbit, RotateCw, Contact, Eye, ZoomIn, Ruler, Replace, Sigma, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        const DL_cylinder = parseFloat(cylinder) || 0;
        const d = parseFloat(vertexDistance) / 1000; // convert mm to meters

        if (isNaN(DL_sphere)) {
            setMessage('Please provide a valid sphere power.');
            setResult('');
            return;
        }

        let effectiveSphere, effectiveTotal, effectiveCylinder;
        
        if (conversion === 'specsToCL') {
            effectiveSphere = DL_sphere / (1 - d * DL_sphere);
            if (DL_cylinder !== 0) {
                effectiveTotal = (DL_sphere + DL_cylinder) / (1 - d * (DL_sphere + DL_cylinder));
                effectiveCylinder = effectiveTotal - effectiveSphere;
            }
        } else { // clToSpecs
            effectiveSphere = DL_sphere / (1 + d * DL_sphere);
            if (DL_cylinder !== 0) {
                effectiveTotal = (DL_sphere + DL_cylinder) / (1 + d * (DL_sphere + DL_cylinder));
                effectiveCylinder = effectiveTotal - effectiveSphere;
            }
        }
        
        let resultText = `Sphere: ${effectiveSphere.toFixed(2)} D`;
        if (effectiveCylinder !== undefined && !isNaN(effectiveCylinder)) {
             resultText += `, Cylinder: ${effectiveCylinder.toFixed(2)} D, Axis: ${axis || 'N/A'}`;
        }
        setResult(resultText);

        setMessage(Math.abs(DL_sphere) < 4 ? 'No significant change in power for sphere value less than ±4.00D.' : '');
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Vertex Distance Effective Power</CardTitle>
                <CardDescription>Calculate the effective power of a prescription at a different vertex distance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup value={conversion} onValueChange={setConversion} className="flex flex-col sm:flex-row gap-4">
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
        if (isNaN(power) || power < 30 || power > 61) {
            setResult('Please enter a valid K value between 30D and 61D.');
            return;
        }
        const baseCurve = 337.5 / power;
        setResult(`Base Curve: ${baseCurve.toFixed(2)} mm`);
    };

    return (
        <Card className="border-none shadow-none">
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
    const [correctedAxisValue, setCorrectedAxisValue] = useState<number | null>(null);

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
            ctx.moveTo(centerX - radius * Math.cos(rad), centerY + radius * Math.sin(rad));
            ctx.lineTo(centerX + radius * Math.cos(rad), centerY - radius * Math.sin(rad));
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
    
     useEffect(() => {
        if (correctedAxisValue !== null) {
            drawAxis(resultCanvasRef.current, correctedAxisValue);
        }
    }, [correctedAxisValue, drawAxis]);

    const applyLarsRule = () => {
        let diff = rotatedAxis - initialAxis;
        if (Math.abs(diff) > 90) {
            if (diff > 0) diff -= 180;
            else diff += 180;
        }

        let correctedAxis;
        if (diff > 0) { // Clockwise rotation (Left) -> ADD
            correctedAxis = initialAxis + Math.abs(diff);
        } else { // Anti-clockwise rotation (Right) -> SUBTRACT
            correctedAxis = initialAxis - Math.abs(diff);
        }
        
        correctedAxis = (correctedAxis + 180) % 180;
        if (correctedAxis === 0) correctedAxis = 180;

        setCorrectedAxisValue(correctedAxis);
        setResult(`Suggested Trial Axis: ${correctedAxis.toFixed(0)}°`);
    };

    const handleAxisChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= 180) {
            setter(numValue);
        } else if (value === '') {
            setter(0);
        }
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>LARS Rule Calculator</CardTitle>
                <CardDescription>Calculate the compensatory axis adjustment for a rotated toric contact lens.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4">
                        <Label htmlFor="initialAxis">Initial Axis</Label>
                        <div className="flex items-center gap-2">
                          <Slider id="initialAxis" min={1} max={180} step={5} value={[initialAxis]} onValueChange={(v) => setInitialAxis(v[0])} />
                          <Input type="number" value={initialAxis} onChange={(e) => handleAxisChange(setInitialAxis, e.target.value)} className="w-20 text-center"/>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <Label htmlFor="rotatedAxis">Axis After Blink</Label>
                         <div className="flex items-center gap-2">
                          <Slider id="rotatedAxis" min={1} max={180} step={5} value={[rotatedAxis]} onValueChange={(v) => setRotatedAxis(v[0])} />
                          <Input type="number" value={rotatedAxis} onChange={(e) => handleAxisChange(setRotatedAxis, e.target.value)} className="w-20 text-center"/>
                        </div>
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


// --- Retinoscopy Working Lens Calculator ---
function RetinoscopyWorkingLensCalculator() {
    const [distance, setDistance] = useState('67');
    const [result, setResult] = useState('');

    const calculatePower = () => {
        const d = parseFloat(distance);
        if (isNaN(d) || d <= 0) {
            setResult('Please enter a valid working distance.');
            return;
        }
        const power = 100 / d;
        setResult(`Compensating Lens: +${power.toFixed(2)} D`);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Retinoscopy Working Lens</CardTitle>
                <CardDescription>Calculate the required compensating lens for your retinoscopy working distance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 max-w-xs">
                    <Label htmlFor="workingDistance">Working Distance (cm)</Label>
                    <Input id="workingDistance" type="number" placeholder="67" value={distance} onChange={(e) => setDistance(e.target.value)} />
                </div>
                <Button onClick={calculatePower}>Calculate</Button>
                {result && (
                    <Alert>
                        <Calculator className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="font-semibold">{result}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

// --- Simple Transposition Calculator ---
function SimpleTranspositionCalculator() {
    const [sphere, setSphere] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [axis, setAxis] = useState('');
    const [result, setResult] = useState<{transposed: string, astigmatismType: string} | null>(null);

    const transpose = () => {
        const sph = parseFloat(sphere);
        const cyl = parseFloat(cylinder);
        const ax = parseInt(axis, 10);

        if (isNaN(sph) || isNaN(cyl) || isNaN(ax)) {
            setResult(null);
            return;
        }

        const newSphere = sph + cyl;
        const newCylinder = -cyl;
        const newAxis = ax <= 90 ? ax + 90 : ax - 90;

        const transposed = `${newSphere > 0 ? '+' : ''}${newSphere.toFixed(2)} / ${newCylinder > 0 ? '+' : ''}${newCylinder.toFixed(2)} x ${newAxis}`;
        
        let astigmatismType = '';
        if (cyl !== 0) {
            const power1 = sph;
            const power2 = sph + cyl;

            if (power1 === 0 || power2 === 0) {
                 astigmatismType = 'Simple Astigmatism';
            } else if (power1 > 0 && power2 > 0) {
                 astigmatismType = 'Compound Hyperopic Astigmatism';
            } else if (power1 < 0 && power2 < 0) {
                 astigmatismType = 'Compound Myopic Astigmatism';
            } else {
                 astigmatismType = 'Mixed Astigmatism';
            }
        } else {
            astigmatismType = 'No Astigmatism';
        }

        setResult({ transposed, astigmatismType });
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Simple Transposition</CardTitle>
                <CardDescription>Transpose a prescription and determine the type of astigmatism.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sph-t">Sphere</Label>
                        <Input id="sph-t" type="number" placeholder="+2.00" value={sphere} onChange={e => setSphere(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cyl-t">Cylinder</Label>
                        <Input id="cyl-t" type="number" placeholder="-1.00" value={cylinder} onChange={e => setCylinder(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="axis-t">Axis</Label>
                        <Input id="axis-t" type="number" placeholder="90" value={axis} onChange={e => setAxis(e.target.value)} />
                    </div>
                </div>
                <Button onClick={transpose}>Transpose</Button>
                {result && (
                    <Alert>
                        <Replace className="h-4 w-4" />
                        <AlertTitle>Results</AlertTitle>
                        <AlertDescription>
                            <p><strong>Transposed:</strong> {result.transposed}</p>
                            <p><strong>Astigmatism Type:</strong> {result.astigmatismType}</p>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

// --- Spherical Equivalent Calculator ---
function SphericalEquivalentCalculator() {
    const [sphere, setSphere] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [result, setResult] = useState('');

    const calculateSE = () => {
        const sph = parseFloat(sphere);
        const cyl = parseFloat(cylinder);

        if (isNaN(sph)) {
            setResult('Please enter a valid sphere value.');
            return;
        }

        const se = sph + (cyl / 2 || 0);
        setResult(`Spherical Equivalent: ${se.toFixed(2)} D`);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Spherical Equivalent</CardTitle>
                <CardDescription>Calculate the spherical equivalent of a prescription.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sph-se">Sphere (D)</Label>
                        <Input id="sph-se" type="number" placeholder="-2.50" value={sphere} onChange={e => setSphere(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cyl-se">Cylinder (D)</Label>
                        <Input id="cyl-se" type="number" placeholder="-1.00" value={cylinder} onChange={e => setCylinder(e.target.value)} />
                    </div>
                </div>
                <Button onClick={calculateSE}>Calculate</Button>
                {result && (
                     <Alert>
                        <Sigma className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="font-semibold">{result}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}


const visualAcuityOptions = [ "6/6", "6/9", "6/12", "6/18", "6/24", "6/36", "6/60", "5/6", "5/9", "5/12", "5/18", "5/24", "5/36", "5/60", "4/6", "4/9", "4/12", "4/18", "4/24", "4/36", "4/60", "3/6", "3/9", "3/12", "3/18", "3/24", "3/36", "3/60", "2/6", "2/9", "2/12", "2/18", "2/24", "2/36", "2/60", "1/6", "1/9", "1/12", "1/18", "1/24", "1/36", "1/60" ];
const nearAcuityOptions = ["N6", "N8", "N12", "N18", "N24", "N36"];
const kestenbaumAcuityOptions = visualAcuityOptions.filter(val => parseFloat(val.split('/')[1]) >= 18);

function MagnificationDistanceCalculator() {
    const [presentAcuity, setPresentAcuity] = useState('6/60');
    const [requiredAcuity, setRequiredAcuity] = useState('6/18');
    const [result, setResult] = useState('');

    const calculateMagnification = () => {
        const present = presentAcuity.split('/').map(Number);
        const required = requiredAcuity.split('/').map(Number);
        if (present.length !== 2 || required.length !== 2 || present[1] === 0 || required[1] === 0) {
            setResult('Invalid acuity values.');
            return;
        };

        const magnification = (required[0] * present[1]) / (present[0] * required[1]);
        setResult(`Required Magnification: ${magnification.toFixed(2)}x`);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Magnification Calculator (Distance)</CardTitle>
                <CardDescription>Calculate the required magnification to achieve a target visual acuity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="present-acuity">Present Visual Acuity</Label>
                        <Select value={presentAcuity} onValueChange={setPresentAcuity}>
                            <SelectTrigger id="present-acuity"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {visualAcuityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="required-acuity">Required Visual Acuity</Label>
                        <Select value={requiredAcuity} onValueChange={setRequiredAcuity}>
                            <SelectTrigger id="required-acuity"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {visualAcuityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={calculateMagnification}>Calculate</Button>
                {result && (
                    <Alert>
                        <ZoomIn className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="font-semibold">{result}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

function MagnificationNearCalculator() {
    const [presentAcuity, setPresentAcuity] = useState('N36');
    const [requiredAcuity, setRequiredAcuity] = useState('N6');
    const [result, setResult] = useState('');

    const calculateMagnification = () => {
        const presentN = parseInt(presentAcuity.substring(1));
        const requiredN = parseInt(requiredAcuity.substring(1));
        if (isNaN(presentN) || isNaN(requiredN) || requiredN === 0) {
            setResult('Invalid N-notation values.');
            return;
        }
        const magnification = presentN / requiredN;
        setResult(`Required Magnification: ${magnification.toFixed(2)}x`);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Magnification Calculator (Near)</CardTitle>
                <CardDescription>Calculate required near magnification based on N-notation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="present-near-acuity">Present Near Acuity</Label>
                        <Select value={presentAcuity} onValueChange={setPresentAcuity}>
                            <SelectTrigger id="present-near-acuity"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {nearAcuityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="required-near-acuity">Required Near Acuity</Label>
                        <Select value={requiredAcuity} onValueChange={setRequiredAcuity}>
                            <SelectTrigger id="required-near-acuity"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {nearAcuityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={calculateMagnification}>Calculate</Button>
                {result && (
                    <Alert>
                        <ZoomIn className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="font-semibold">{result}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

function KestenbaumRuleCalculator() {
    const [bcva, setBcva] = useState('6/60');
    const [result, setResult] = useState('');

    const calculateAdd = () => {
        const values = bcva.split('/').map(Number);
        if (values.length !== 2 || values[0] === 0) {
            setResult('Invalid BCVA value.');
            return;
        };
        const add = values[1] / values[0];
        setResult(`Estimated Near Add: +${add.toFixed(2)} D`);
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Kestenbaum's Rule</CardTitle>
                <CardDescription>Estimate the required near add based on distance Best Corrected Visual Acuity (BCVA).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 max-w-xs">
                    <Label htmlFor="bcva">BCVA for Distance</Label>
                    <Select value={bcva} onValueChange={setBcva}>
                        <SelectTrigger id="bcva"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {kestenbaumAcuityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={calculateAdd}>Calculate ADD</Button>
                {result && (
                    <Alert>
                        <ZoomIn className="h-4 w-4" />
                        <AlertTitle>Result</AlertTitle>
                        <AlertDescription className="font-semibold">{result}</AlertDescription>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <Contact className="h-6 w-6 text-primary" />
                        Contact Lens
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   <Tabs defaultValue="vertex" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-auto rounded-none p-1 bg-primary/10">
                            <TabsTrigger value="vertex" className="py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Vertex</TabsTrigger>
                            <TabsTrigger value="base-curve" className="py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Base Curve</TabsTrigger>
                            <TabsTrigger value="lars" className="py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">LARS</TabsTrigger>
                        </TabsList>
                        <div className="p-2 sm:p-6">
                            <TabsContent value="vertex" className="mt-0">
                                <VertexDistanceCalculator />
                            </TabsContent>
                            <TabsContent value="base-curve" className="mt-0">
                                <BaseCurveCalculator />
                            </TabsContent>
                            <TabsContent value="lars" className="mt-0">
                                <LarsRuleCalculator />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>

            <Card className="shadow-lg overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <Eye className="h-6 w-6 text-purple-600" />
                        Low Vision
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="magnification-distance" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-auto rounded-none p-1 bg-purple-100/50">
                            <TabsTrigger value="magnification-distance" className="py-2 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm">Magnification (Distance)</TabsTrigger>
                            <TabsTrigger value="magnification-near" className="py-2 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm">Magnification (Near)</TabsTrigger>
                            <TabsTrigger value="kestenbaum" className="py-2 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm">Kestenbaum's</TabsTrigger>
                        </TabsList>
                         <div className="p-2 sm:p-6">
                            <TabsContent value="magnification-distance" className="mt-0">
                                <MagnificationDistanceCalculator />
                            </TabsContent>
                            <TabsContent value="magnification-near" className="mt-0">
                                <MagnificationNearCalculator />
                            </TabsContent>
                            <TabsContent value="kestenbaum" className="mt-0">
                                <KestenbaumRuleCalculator />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
            
            <Card className="shadow-lg overflow-hidden lg:col-span-2">
                <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <Ruler className="h-6 w-6 text-green-600" />
                        Optics & Refraction
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="working-lens" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto rounded-none p-1 bg-green-100/50">
                            <TabsTrigger value="working-lens" className="py-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Working Lens</TabsTrigger>
                            <TabsTrigger value="transposition" className="py-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Transposition</TabsTrigger>
                            <TabsTrigger value="sph-equivalent" className="py-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Sph. Equivalent</TabsTrigger>
                        </TabsList>
                         <div className="p-2 sm:p-6">
                            <TabsContent value="working-lens" className="mt-0"><RetinoscopyWorkingLensCalculator /></TabsContent>
                            <TabsContent value="transposition" className="mt-0"><SimpleTranspositionCalculator /></TabsContent>
                            <TabsContent value="sph-equivalent" className="mt-0"><SphericalEquivalentCalculator /></TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}

```