
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
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calculator, Orbit, RotateCw, Contact, Eye, ZoomIn, Ruler, Sigma, CheckCircle, XCircle, Loader2, User, UserRound, View, Scale, Link as LinkIcon, Hand } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { allUsers } from '@/lib/data';


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
        let numValue = parseInt(value, 10);
        if (value === '' || isNaN(numValue)) {
            numValue = 0;
        }
        
        if (numValue === 0) numValue = 180;
        
        if (numValue >= 1 && numValue <= 180) {
            setter(numValue);
        } else if (value === '') {
             setter(0);
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
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Note:</h4>
                <p className="text-sm text-slate-500">
                    Provide your working distance (cm) from the patient's eye to the retinoscope while performing retinoscopy to calculate the compensating working lens.
                </p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Instructions:</h4>
                <p className="text-sm text-slate-500">
                    Simply enter the working distance (cm), then click 'Calculate'.
                </p>
            </div>
            <div className="space-y-2 max-w-xs pt-2">
                <Label htmlFor="workingDistance">Working Distance (cm)</Label>
                <Input id="workingDistance" type="number" placeholder="67" value={distance} onChange={(e) => setDistance(e.target.value)} />
            </div>
            <Button onClick={calculatePower}>Calculate</Button>
            {result && (
                <Alert>
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription className="font-semibold">{result}</AlertDescription>
                </Alert>
            )}
            <div className="text-sm text-slate-500 pt-4">
                <h4 className="font-semibold text-slate-700">Formula:</h4>
                <p className="font-mono">Compensating lens = 1 / D</p>
                <p className="text-xs mt-1">Where D = Distance from patient's eye to retinoscope (in meters)</p>
            </div>
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
             <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Note:</h4>
                <p className="text-sm text-slate-500">
                    Provide a prescription to get the transposed format and determine the types of astigmatism.
                </p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Instructions:</h4>
                <p className="text-sm text-slate-500">
                    Enter the sphere, cylinder, and axis, then click 'Transpose'.
                </p>
            </div>
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
                    <AlertDescription className='space-y-2'>
                        <p><strong>Transposed Prescription:</strong> {result.transposed}</p>
                        <p><strong>Type of Astigmatism:</strong> {result.astigmatismType}</p>
                    </AlertDescription>
                </Alert>
            )}
             <div className="text-sm text-slate-500 pt-4 space-y-2">
                <h4 className="font-semibold text-slate-700">Steps for Simple Transposition:</h4>
                <ul className='list-decimal list-inside pl-2 space-y-1'>
                    <li><b>Sum:</b> Add the sphere and cylinder powers of the prescription to determine the new sphere power.</li>
                    <li><b>Sign:</b> Change the sign of the cylinder.</li>
                    <li><b>Axis:</b> Change the axis by 90 degrees. If the original axis is less than or equal to 90°, add 90° to the axis; if more than 90°, subtract 90°.</li>
                </ul>
            </div>
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


const acuityLevels = [
  { meters: "6/6", feet: "20/20", mar: "1.0", logMAR: "0.0", decimal: "1.0", percentage: "100" },
  { meters: "6/7.5", feet: "20/25", mar: "1.25", logMAR: "0.1", decimal: "0.8", percentage: "80" },
  { meters: "6/9", feet: "20/30", mar: "1.5", logMAR: "0.2", decimal: "0.67", percentage: "67" },
  { meters: "6/12", feet: "20/40", mar: "2.0", logMAR: "0.3", decimal: "0.5", percentage: "50" },
  { meters: "6/15", feet: "20/50", mar: "2.5", logMAR: "0.4", decimal: "0.4", percentage: "40" },
  { meters: "6/18", feet: "20/60", mar: "3.0", logMAR: "0.5", decimal: "0.33", percentage: "33" },
  { meters: "6/24", feet: "20/80", mar: "4.0", logMAR: "0.6", decimal: "0.25", percentage: "25" },
  { meters: "6/30", feet: "20/100", mar: "5.0", logMAR: "0.7", decimal: "0.2", percentage: "20" },
  { meters: "6/48", feet: "20/160", mar: "8.0", logMAR: "0.9", decimal: "0.125", percentage: "12.5" },
  { meters: "6/60", feet: "20/200", mar: "10.0", logMAR: "1.0", decimal: "0.1", percentage: "10" },
  { meters: "6/120", feet: "20/400", mar: "20.0", logMAR: "1.3", decimal: "0.05", percentage: "5" },
];

function VisualAcuityConverter() {
  const [selectedDecimal, setSelectedDecimal] = useState("1.0");

  const handleSelectionChange = (decimalValue: string) => {
    setSelectedDecimal(decimalValue);
  };

  const selectedLevel = acuityLevels.find(level => level.decimal === selectedDecimal) || acuityLevels[0];

  return (
    <div className="space-y-6">
       <div>
        <h4 className="font-semibold text-slate-700">Instructions:</h4>
        <p className="text-sm text-slate-500">
          Select any one line of visual acuity from any of the 6 dropdown menus; it will simultaneously display the corresponding visual acuity line for all other notations.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Meters", key: "meters" },
          { label: "Feet", key: "feet" },
          { label: "MAR", key: "mar" },
          { label: "Log MAR", key: "logMAR" },
          { label: "Decimal", key: "decimal" },
          { label: "Percentage", key: "percentage" },
        ].map(({ label, key }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{label}</Label>
            <Select
              value={selectedLevel.decimal}
              onValueChange={handleSelectionChange}
            >
              <SelectTrigger id={key}>
                <SelectValue placeholder="Select...">{(selectedLevel as any)[key]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {acuityLevels.map((level) => (
                  <SelectItem key={level.decimal} value={level.decimal}>
                    {(level as any)[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

       <div>
        <h4 className="font-semibold text-slate-700 mt-6 mb-2">How to convert?</h4>
        <ol className="list-decimal list-inside text-sm text-slate-600 space-y-1">
            <li>Snellen Meter to Feet = MAR x 20</li>
            <li>Snellen Meter to MAR = Divide the Denominator by Numerator of Snellen Meter notation</li>
            <li>LogMAR = log₁₀(MAR)</li>
            <li>Snellen Meter to Decimal = Divide the Numerator by Denominator of Snellen Meter notation</li>
            <li>Snellen Decimal to percentage = Decimal * 100</li>
        </ol>
      </div>
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
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription className="font-semibold">{result}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}

function RetinoscopyPrescriptionConverter() {
    const [method, setMethod] = useState('oneSphereOneCylinder');
    const [sphere, setSphere] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [axis, setAxis] = useState('');
    const [sphere1, setSphere1] = useState('');
    const [axis1, setAxis1] = useState('');
    const [sphere2, setSphere2] = useState('');
    const [axis2, setAxis2] = useState('');
    const [compensatingLens, setCompensatingLens] = useState('no');
    const [result, setResult] = useState('');

    const handleConvert = () => {
        let finalPrescription = '';
        const wd = compensatingLens === 'yes' ? 1.50 : 0; // Example working distance compensation

        if (method === 'oneSphereOneCylinder') {
            const sph = parseFloat(sphere) || 0;
            const cyl = parseFloat(cylinder) || 0;
            const ax = parseInt(axis, 10) || 0;
            const netSph = sph - wd;
            finalPrescription = `${netSph.toFixed(2)} DS / ${cyl.toFixed(2)} DC @ ${ax}°`;
        } else if (method === 'twoSphere') {
             const sph1 = parseFloat(sphere1) || 0;
             const ax1 = parseInt(axis1, 10) || 0;
             const sph2 = parseFloat(sphere2) || 0;
             
             const netSph1 = sph1 - wd;
             const netSph2 = sph2 - wd;

             finalPrescription = `${netSph1.toFixed(2)} DS @ ${ax1}° / ${netSph2.toFixed(2)} DS @ ${ax1 + 90}°`;
        } else if (method === 'twoCylinder') {
             const cyl1 = parseFloat(sphere1) || 0;
             const ax1 = parseInt(axis1, 10) || 0;
             const cyl2 = parseFloat(sphere2) || 0;

            finalPrescription = `This method is complex and results may vary. A common approach is to find the spherocylindrical equivalent.`;
        }

        setResult(finalPrescription);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Note:</h4>
                <p className="text-sm text-slate-500">
                    Provide the retinoscopy value (Gross/Net) to obtain the retinoscopy prescription here.
                    Provide '0' if there is no neutral power for any of the meridians.
                </p>
            </div>
             <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Instructions:</h4>
                <p className="text-sm text-slate-500">
                    Select the method of retinoscopy, enter the neutral powers, choose 'Yes/No' for the working lens, then click 'Convert'.
                </p>
            </div>
            
            <div className='space-y-2'>
                <Label>Select Method:</Label>
                <RadioGroup value={method} onValueChange={setMethod} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oneSphereOneCylinder" id="r1" />
                        <Label htmlFor="r1">One Sphere & One Cylinder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="twoSphere" id="r2" />
                        <Label htmlFor="r2">Two Sphere Method</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="twoCylinder" id="r3" />
                        <Label htmlFor="r3">Two Cylinder Method</Label>
                    </div>
                </RadioGroup>
            </div>

            {method === 'oneSphereOneCylinder' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sph-rpc">Sphere (DS)</Label>
                        <Input id="sph-rpc" type="number" step="0.25" placeholder="e.g. -2.00" value={sphere} onChange={e => setSphere(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cyl-rpc">Cylinder (DC)</Label>
                        <Input id="cyl-rpc" type="number" step="0.25" placeholder="e.g. -1.00" value={cylinder} onChange={e => setCylinder(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="axis-rpc">Cylinder Axis</Label>
                        <Input id="axis-rpc" type="number" placeholder="1-180" value={axis} onChange={e => setAxis(e.target.value)} />
                    </div>
                </div>
            )}
            
            {method === 'twoSphere' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sph1-rpc">Sphere 1 (DS)</Label>
                        <Input id="sph1-rpc" type="number" step="0.25" placeholder="e.g. -2.00" value={sphere1} onChange={e => setSphere1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="axis1-rpc">Axis 1</Label>
                        <Input id="axis1-rpc" type="number" placeholder="e.g. 90" value={axis1} onChange={e => setAxis1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sph2-rpc">Sphere 2 (DS)</Label>
                        <Input id="sph2-rpc" type="number" step="0.25" placeholder="e.g. -3.00" value={sphere2} onChange={e => setSphere2(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="axis2-rpc">Axis 2</Label>
                        <Input id="axis2-rpc" type="number" placeholder="e.g. 180" value={axis2} onChange={e => setAxis2(e.target.value)} disabled />
                    </div>
                </div>
            )}

            {method === 'twoCylinder' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="cyl1-rpc">Cylinder 1 (DC)</Label>
                        <Input id="cyl1-rpc" type="number" step="0.25" placeholder="e.g. -2.00" value={sphere1} onChange={e => setSphere1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="axis1-rpc-cyl">Axis 1</Label>
                        <Input id="axis1-rpc-cyl" type="number" placeholder="e.g. 90" value={axis1} onChange={e => setAxis1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cyl2-rpc">Cylinder 2 (DC)</Label>
                        <Input id="cyl2-rpc" type="number" step="0.25" placeholder="e.g. -3.00" value={sphere2} onChange={e => setSphere2(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="axis2-rpc-cyl">Axis 2</Label>
                        <Input id="axis2-rpc-cyl" type="number" placeholder="e.g. 180" value={axis2} onChange={e => setAxis2(e.target.value)} />
                    </div>
                </div>
            )}

            <div className="space-y-3 pt-2">
                 <Label>Are you using compensating(WD) lens, have removed it(Ex: +1.50DS) ?</Label>
                 <RadioGroup value={compensatingLens} onValueChange={setCompensatingLens} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="wd-yes" />
                        <Label htmlFor="wd-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="wd-no" />
                        <Label htmlFor="wd-no">No</Label>
                    </div>
                </RadioGroup>
            </div>
            
            <Button onClick={handleConvert}>Convert</Button>

             {result && (
                <Alert>
                    <AlertTitle>Prescription</AlertTitle>
                    <AlertDescription className="font-semibold text-lg">{result}</AlertDescription>
                </Alert>
            )}

            <div className="text-sm text-slate-500 pt-4 space-y-2">
                <h4 className="font-semibold text-slate-700">How it converts:</h4>
                 <ul className='list-disc list-inside pl-2 space-y-1'>
                    <li><strong>One Sphere and One Cylinder:</strong> The same will be a prescription.</li>
                    <li>To convert the Gross retinoscopy to Net retinoscopy of Spherical & Spherocylinder prescription, simply minus the 'working distance compensation power' from the Sphere power.</li>
                </ul>
            </div>
        </div>
    );
}

function SnellenLetterSizeCalculator() {
    const chartDistances = [6, 5, 4, 3, 2, 1];
    const [distance, setDistance] = useState('6');
    const [line, setLine] = useState('6/6');
    const [lines, setLines] = useState<string[]>(['6/6', '6/9', '6/12', '6/18', '6/24', '6/36', '6/60']);
    const [result, setResult] = useState('');

    useEffect(() => {
        const d = parseInt(distance, 10);
        setLines([`${d}/6`, `${d}/9`, `${d}/12`, `${d}/18`, `${d}/24`, `${d}/36`, `${d}/60`]);
        setLine(`${d}/${d}`);
    }, [distance]);
    
    const calculateSize = () => {
        const denominator = parseFloat(line.split('/')[1]);
        if (isNaN(denominator)) {
            setResult('Invalid line selected.');
            return;
        }
        
        const tan5arcmin = 0.00145444; // tan(5/60 degrees)
        const sizeInMeters = denominator * tan5arcmin;
        const sizeInMm = sizeInMeters * 1000;
        
        setResult(`Letter Size: ${sizeInMm.toFixed(2)} mm`);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Note:</h4>
                <p className="text-sm text-slate-500">The height and width of the individual Snellen letters remain the same.</p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Instructions:</h4>
                <p className="text-sm text-slate-500">Select the chart's distance and line of Snellen's chart from the dropdown menus, then click 'Calculate'.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="chart-distance">Chart's Distance (m)</Label>
                    <Select value={distance} onValueChange={setDistance}>
                        <SelectTrigger id="chart-distance"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {chartDistances.map(d => <SelectItem key={d} value={String(d)}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="snellen-line">Select Line</Label>
                    <Select value={line} onValueChange={setLine}>
                        <SelectTrigger id="snellen-line"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {lines.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button onClick={calculateSize}>Calculate</Button>
            {result && (
                <Alert>
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription className="font-semibold">{result}</AlertDescription>
                </Alert>
            )}
            <div className="text-sm text-slate-500 pt-4 space-y-1">
                <h4 className="font-semibold text-slate-700">How to calculate?</h4>
                <p className="font-mono">W = D x tan(θ)</p>
                <ul className='list-disc list-inside pl-2 text-xs'>
                    <li>W = Height or width</li>
                    <li>D = Denominator of the line</li>
                    <li>θ = 5 (min of arc)</li>
                    <li>tan(5/60°) ≈ 0.00145</li>
                </ul>
            </div>
        </div>
    );
}

// --- AC/A Ratio Calculator ---
function AcaRatioCalculator() {
    const [ipd, setIpd] = useState('');
    const [nfd, setNfd] = useState('');
    const [nearPhoria, setNearPhoria] = useState('');
    const [distancePhoria, setDistancePhoria] = useState('');
    const [result, setResult] = useState('');

    const calculateAca = () => {
        const ipdCm = parseFloat(ipd) / 10;
        const nfdM = parseFloat(nfd) / 100;
        const Hn = parseFloat(nearPhoria);
        const Hd = parseFloat(distancePhoria);

        if (isNaN(ipdCm) || isNaN(nfdM) || isNaN(Hn) || isNaN(Hd)) {
            setResult('Please enter valid numeric values for all fields.');
            return;
        }

        const acaRatio = ipdCm + nfdM * (Hn - Hd);
        setResult(`AC/A Ratio: ${acaRatio.toFixed(2)} PD/D`);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Note:</h4>
                <p className="text-sm text-slate-500">Provide the IPD, NFD, and phoria at near and distance to get the AC/A ratio.</p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Instructions:</h4>
                <p className="text-sm text-slate-500">Enter the IPD, NFD, and phoria at near and distance, then click 'Calculate'.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ipd">Inter Pupillary Distance (mm)</Label>
                    <Input id="ipd" type="number" placeholder="60" value={ipd} onChange={e => setIpd(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nfd">Near Fixation Distance (cm)</Label>
                    <Input id="nfd" type="number" placeholder="40" value={nfd} onChange={e => setNfd(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="near-phoria">Heterophoria at Near (PD)</Label>
                    <Input id="near-phoria" type="number" placeholder="e.g., -4 for Exo" value={nearPhoria} onChange={e => setNearPhoria(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="distance-phoria">Heterophoria at Distance (PD)</Label>
                    <Input id="distance-phoria" type="number" placeholder="e.g., +2 for Eso" value={distancePhoria} onChange={e => setDistancePhoria(e.target.value)} />
                </div>
            </div>
            <Button onClick={calculateAca}>Calculate</Button>
            {result && (
                <Alert>
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription className="font-semibold">{result}</AlertDescription>
                </Alert>
            )}
             <div className="text-sm text-slate-500 pt-4">
                <h4 className="font-semibold text-slate-700">Formula:</h4>
                <p className="font-mono">AC/A Ratio = IPD + (Hn - Hd) x NFD</p>
                <ul className="text-xs mt-1 list-disc list-inside">
                    <li>IPD - Inter Pupillary Distance (cm)</li>
                    <li>Hn - Heterophoria at Near (PD)</li>
                    <li>Hd - Heterophoria at Distance (PD)</li>
                    <li>NFD - Near Fixation Distance (m)</li>
                </ul>
            </div>
        </div>
    );
}

// --- AC/A Ratio Gradient Calculator ---
function AcaGradientCalculator() {
    const deviationOptions = Array.from({length: 41}, (_, i) => String(i - 20)); // -20 to 20
    const lensOptions = ["-3.00", "-2.00", "-1.00", "+1.00", "+2.00", "+3.00"];

    const [originalDeviation, setOriginalDeviation] = useState('0');
    const [lensDeviation, setLensDeviation] = useState('0');
    const [lensPower, setLensPower] = useState('+1.00');
    const [result, setResult] = useState('');

    const calculateAca = () => {
        const DO = parseFloat(originalDeviation);
        const DL = parseFloat(lensDeviation);
        const p = parseFloat(lensPower);

        if (isNaN(DO) || isNaN(DL) || isNaN(p) || p === 0) {
            setResult('Please enter valid numeric values for all fields, and lens power cannot be zero.');
            return;
        }

        const acaRatio = Math.abs((DL - DO) / p);
        setResult(`AC/A Ratio: ${acaRatio.toFixed(2)} PD/D`);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Note:</h4>
                <p className="text-sm text-slate-500">Give the deviations with and without the lens, and get the AC/A ratio.</p>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Instructions:</h4>
                <p className="text-sm text-slate-500">Select the deviations in prism diopters from the dropdown, choose the lens used, then click 'Calculate'.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="original-deviation">Original Deviation (PD)</Label>
                    <Select value={originalDeviation} onValueChange={setOriginalDeviation}>
                        <SelectTrigger id="original-deviation"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {deviationOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="lens-deviation">Deviation with Lens (PD)</Label>
                    <Select value={lensDeviation} onValueChange={setLensDeviation}>
                        <SelectTrigger id="lens-deviation"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {deviationOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lens-power">Lens Power (D)</Label>
                    <Select value={lensPower} onValueChange={setLensPower}>
                        <SelectTrigger id="lens-power"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {lensOptions.map(o => <SelectItem key={o} value={o}>{o} DS</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button onClick={calculateAca}>Calculate</Button>
            {result && (
                <Alert>
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription className="font-semibold">{result}</AlertDescription>
                </Alert>
            )}
             <div className="text-sm text-slate-500 pt-4">
                <h4 className="font-semibold text-slate-700">Formula:</h4>
                <p className="font-mono">AC/A Ratio = |DL - DO| / p</p>
                <ul className="text-xs mt-1 list-disc list-inside">
                    <li>DL - Deviation with lens (PD)</li>
                    <li>DO - Original Deviation without lens (PD)</li>
                    <li>p - Power of the lens used (D)</li>
                </ul>
            </div>
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
  },
  {
    id: 'va-converter',
    title: 'Visual Acuity Converter',
    description: 'Convert between different visual acuity notations.',
    component: <VisualAcuityConverter />,
    category: 'refraction',
  },
  {
    id: 'retinoscopy-converter',
    title: 'Retinoscopy Rx Converter',
    description: 'Convert retinoscopy findings into a final prescription.',
    component: <RetinoscopyPrescriptionConverter />,
    category: 'refraction',
  },
   {
    id: 'snellen-size',
    title: 'Snellen Letter Size',
    description: 'Calculate the size of Snellen letters based on chart distance.',
    component: <SnellenLetterSizeCalculator />,
    category: 'refraction',
  },
  {
    id: 'aca-ratio-heterophoria',
    title: 'AC/A Ratio (Heterophoria)',
    description: 'Calculate the AC/A ratio using the heterophoria method.',
    component: <AcaRatioCalculator />,
    category: 'binocular-vision'
  },
  {
    id: 'aca-ratio-gradient',
    title: 'AC/A Ratio (Gradient)',
    description: 'Calculate the AC/A ratio using the gradient method.',
    component: <AcaGradientCalculator />,
    category: 'binocular-vision'
  },
];

const categories = [
    { id: 'contact-lens', name: 'Contact Lens', icon: <Contact className="h-5 w-5" /> },
    { id: 'low-vision', name: 'Low Vision', icon: <Eye className="h-5 w-5" /> },
    { id: 'refraction', name: 'Optics & Refraction', icon: <Ruler className="h-5 w-5" /> },
    { id: 'binocular-vision', name: 'Binocular Vision', icon: <Hand className="h-5 w-5" /> },
];

const AnimatedTabs = ({ onTabChange }: { onTabChange: (value: string) => void }) => {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTabNode = tabsRef.current.find(
      (tab) => tab?.dataset.id === activeTab
    );
    if (activeTabNode) {
      setIndicatorStyle({
        left: activeTabNode.offsetLeft,
        width: activeTabNode.offsetWidth,
      });
    }
  }, [activeTab]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onTabChange(id);
  };

  return (
    <div className="relative flex w-full max-w-lg mx-auto p-1 bg-slate-200/80 rounded-full">
      <div
        className="absolute h-[calc(100%-8px)] top-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
      {categories.map((category, index) => (
        <button
          key={category.id}
          ref={(el) => (tabsRef.current[index] = el)}
          data-id={category.id}
          onClick={() => handleTabClick(category.id)}
          className={cn(
            'relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold transition-colors duration-300 rounded-full',
            activeTab === category.id
              ? 'text-primary'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          {category.icon}
          {category.name}
        </button>
      ))}
    </div>
  );
};


export default function OptoToolsPage() {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  
  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Optometry Tools</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          A suite of calculators and converters designed for eye care professionals.
        </p>
      </header>

       <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-16 space-y-16">
        <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800">Optocal Hub</h2>
            <p className="mt-2 text-lg text-slate-600">
              Your one-stop destination for precise and efficient clinical calculations. This hub provides a comprehensive suite of tools designed to streamline daily tasks for optometrists, students, and eye care professionals.
            </p>
            <div className="mt-4 text-sm text-slate-500">
              <p><strong className="text-slate-600">Keywords:</strong> Optometry Calculator, Vertex Distance, LARS Rule, Keratometry, Low Vision Magnification, Kestenbaum's Rule, Transposition, Spherical Equivalent.</p>
            </div>
          </div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Available Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tools.map(tool => (
                  <div key={tool.id} className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="font-semibold text-sm text-slate-700">{tool.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <AnimatedTabs onTabChange={setActiveTab} />
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
        
        <section className="max-w-4xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">About the Creator</h2>
            <Card className="overflow-hidden shadow-lg border-primary/20 bg-primary/5">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-white p-8 flex flex-col items-center justify-center text-center">
                        <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-md">
                            <AvatarImage src="" alt="Shivashangari M" />
                            <AvatarFallback className="bg-slate-200">
                                <UserRound className="h-12 w-12 text-slate-400" />
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold text-slate-800 mt-4">Shivashangari M</h3>
                        <p className="text-sm text-primary font-semibold">Masters in Optometry | Contact Lens Specialist</p>
                        <Button asChild variant="secondary" size="sm" className="mt-4">
                            <Link href="/profile/16">View Profile</Link>
                        </Button>
                    </div>
                    <div className="p-8 md:w-2/3 flex flex-col justify-center">
                        <h4 className="text-lg font-semibold text-slate-800">A Message from the Creator</h4>
                        <blockquote className="mt-2 border-l-4 border-primary/30 pl-4 text-slate-600 italic">
                            "These calculation tools were created to enhance efficiency and accuracy in optometry practices. My goal is to provide user-friendly digital solutions that support fellow professionals and students in their daily clinical work. I hope you find them valuable."
                        </blockquote>
                    </div>
                </div>
            </Card>
        </section>
      </main>
    </div>
  );
}
