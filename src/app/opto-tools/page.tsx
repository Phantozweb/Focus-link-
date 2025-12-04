
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Calculator, Orbit, RotateCw, Contact, Eye, ZoomIn, Ruler, Replace, Sigma, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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
            } else {
                effectiveCylinder = 0;
            }
        } else { // clToSpecs
            effectiveSphere = DL_sphere / (1 + d * DL_sphere);
            if (DL_cylinder !== 0) {
                effectiveTotal = (DL_sphere + DL_cylinder) / (1 + d * (DL_sphere + DL_cylinder));
                effectiveCylinder = effectiveTotal - effectiveSphere;
            } else {
                 effectiveCylinder = 0;
            }
        }
        
        let resultText = `Sphere: ${effectiveSphere.toFixed(2)} D`;
        if (effectiveCylinder !== undefined && !isNaN(effectiveCylinder) && effectiveCylinder.toFixed(2) !== '0.00' && effectiveCylinder.toFixed(2) !== '-0.00') {
             resultText += `, Cylinder: ${effectiveCylinder.toFixed(2)} D, Axis: ${axis || 'N/A'}`;
        }
        setResult(resultText);

        setMessage(Math.abs(DL_sphere) < 4 ? 'No significant change in power for sphere value less than ±4.00D.' : '');
    };

    return (
        <div className="space-y-6">
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
        </div>
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
        <div className="space-y-4">
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
        </div>
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
        if (value === '' || isNaN(numValue)) {
            setter(0);
        } else if (numValue >= 0 && numValue <= 180) {
            setter(numValue === 0 ? 180 : numValue);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                    <Label htmlFor="initialAxis">Initial Axis</Label>
                    <div className="flex items-center gap-2">
                        <Slider id="initialAxis" min={0} max={180} step={5} value={[initialAxis]} onValueChange={(v) => setInitialAxis(v[0])} />
                        <Input type="number" value={initialAxis} onChange={(e) => handleAxisChange(setInitialAxis, e.target.value)} className="w-20 text-center"/>
                    </div>
                </div>
                <div className="space-y-4">
                    <Label htmlFor="rotatedAxis">Axis After Blink</Label>
                    <div className="flex items-center gap-2">
                        <Slider id="rotatedAxis" min={0} max={180} step={5} value={[rotatedAxis]} onValueChange={(v) => setRotatedAxis(v[0])} />
                        <Input type="number" value={rotatedAxis} onChange={(e) => handleAxisChange(setRotatedAxis, e.target.value)} className="w-20 text-center"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-8">
                <div className="text-center">
                    <Label>Initial Axis: {initialAxis}°</Label>
                    <canvas ref={initialCanvasRef} width="150" height="150" className="mt-2 bg-slate-50 rounded-full border"></canvas>
                </div>
                <div className="text-center">
                    <Label>Axis After Blink: {rotatedAxis}°</Label>
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
        </div>
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
        <div className="space-y-4">
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
        </div>
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
        let ax = parseInt(axis, 10);

        if (isNaN(sph) || isNaN(cyl) || isNaN(ax) || ax < 0 || ax > 180) {
            setResult(null);
            return;
        }
        
        if (ax === 0) ax = 180;

        const newSphere = sph + cyl;
        const newCylinder = -cyl;
        const newAxis = ax <= 90 ? ax + 90 : ax - 90;

        const transposed = `${newSphere > 0 ? '+' : ''}${newSphere.toFixed(2)} / ${newCylinder > 0 ? '+' : ''}${newCylinder.toFixed(2)} x ${newAxis}`;
        
        const power1 = sph;
        const power2 = sph + cyl;

        let astigmatismType = 'No Astigmatism';

        if (cyl !== 0) {
            if ((power1 >= 0 && power2 > 0) || (power1 > 0 && power2 >= 0)) {
                astigmatismType = 'Compound Hyperopic Astigmatism';
                if(power1 === 0 || power2 === 0) astigmatismType = 'Simple Hyperopic Astigmatism';
            } else if ((power1 <= 0 && power2 < 0) || (power1 < 0 && power2 <= 0)) {
                astigmatismType = 'Compound Myopic Astigmatism';
                if(power1 === 0 || power2 === 0) astigmatismType = 'Simple Myopic Astigmatism';
            } else if ((power1 > 0 && power2 < 0) || (power1 < 0 && power2 > 0)) {
                astigmatismType = 'Mixed Astigmatism';
            }
        }
        
        setResult({ transposed, astigmatismType });
    };

    return (
        <div className="space-y-4">
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
                    <AlertTitle>Results</AlertTitle>
                    <AlertDescription>
                        <p><strong>Transposed:</strong> {result.transposed}</p>
                        <p><strong>Astigmatism Type:</strong> {result.astigmatismType}</p>
                    </AlertDescription>
                </Alert>
            )}
        </div>
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
        setResult(`Spherical Equivalent: ${se > 0 ? '+' : ''}${se.toFixed(2)} D`);
    };

    return (
        <div className="space-y-4">
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
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription className="font-semibold">{result}</AlertDescription>
                </Alert>
            )}
        </div>
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
        if (present.length !== 2 || required.length !== 2 || isNaN(present[0]) || isNaN(present[1]) || isNaN(required[0]) || isNaN(required[1]) || present[1] === 0 || required[1] === 0 || present[0] === 0 || required[0] === 0) {
            setResult('Invalid acuity values.');
            return;
        };

        const magnification = (required[0] * present[1]) / (present[0] * required[1]);
        setResult(`Required Magnification: ${magnification.toFixed(2)}x`);
    };

    return (
        <div className="space-y-4">
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
        </div>
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
        <div className="space-y-4">
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
        </div>
    );
}

function KestenbaumRuleCalculator() {
    const [bcva, setBcva] = useState('6/60');
    const [result, setResult] = useState('');

    const calculateAdd = () => {
        const values = bcva.split('/').map(Number);
        if (values.length !== 2 || isNaN(values[0]) || isNaN(values[1]) || values[0] === 0) {
            setResult('Invalid BCVA value.');
            return;
        };
        const add = values[1] / values[0];
        setResult(`Estimated Near Add: +${add.toFixed(2)} D`);
    };

    return (
        <div className="space-y-4">
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
        </div>
    );
}

const tools = [
  {
    id: 'vertex',
    title: 'Vertex Distance',
    description: 'Calculate effective power at a different vertex distance.',
    component: <VertexDistanceCalculator />,
    category: 'contact-lens'
  },
  {
    id: 'base-curve',
    title: 'Keratometry to Base Curve',
    description: 'Convert keratometry (D) to a base curve (mm).',
    component: <BaseCurveCalculator />,
    category: 'contact-lens'
  },
  {
    id: 'lars',
    title: 'LARS Rule',
    description: 'Adjust axis for a rotated toric contact lens.',
    component: <LarsRuleCalculator />,
    category: 'contact-lens'
  },
  {
    id: 'mag-distance',
    title: 'Magnification (Distance)',
    description: 'Calculate required distance magnification.',
    component: <MagnificationDistanceCalculator />,
    category: 'low-vision'
  },
  {
    id: 'mag-near',
    title: 'Magnification (Near)',
    description: 'Calculate required near magnification from N-notation.',
    component: <MagnificationNearCalculator />,
    category: 'low-vision'
  },
  {
    id: 'kestenbaum',
    title: 'Kestenbaum\'s Rule',
    description: 'Estimate the required near add for low vision patients.',
    component: <KestenbaumRuleCalculator />,
    category: 'low-vision'
  },
  {
    id: 'working-lens',
    title: 'Retinoscopy Working Lens',
    description: 'Calculate the required compensating lens power.',
    component: <RetinoscopyWorkingLensCalculator />,
    category: 'refraction'
  },
  {
    id: 'transposition',
    title: 'Simple Transposition',
    description: 'Transpose a prescription and determine astigmatism type.',
    component: <SimpleTranspositionCalculator />,
    category: 'refraction'
  },
  {
    id: 'sph-equivalent',
    title: 'Spherical Equivalent',
    description: 'Calculate the spherical equivalent of a prescription.',
    component: <SphericalEquivalentCalculator />,
    category: 'refraction'
  }
];

const categories = [
    { id: 'contact-lens', name: 'Contact Lens', icon: <Contact className="h-5 w-5" /> },
    { id: 'low-vision', name: 'Low Vision', icon: <Eye className="h-5 w-5" /> },
    { id: 'refraction', name: 'Optics & Refraction', icon: <Ruler className="h-5 w-5" /> },
];

export default function OptoToolsPage() {
  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Optometry Tools</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          A suite of calculators and converters designed for eye care professionals.
        </p>
      </header>

      <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-16">
        <Tabs defaultValue="contact-lens" className="w-full">
          <div className="mb-8">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="py-3 text-base sm:text-sm flex items-center gap-2">
                        {category.icon}
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.filter(tool => tool.category === category.id).map(tool => (
                  <Dialog key={tool.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all group h-full flex flex-col">
                        <CardHeader>
                          <CardTitle>{tool.title}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{tool.title}</DialogTitle>
                        <DialogDescription>{tool.description}</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        {tool.component}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
