
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb, Rocket, ScanFace, Gauge, Video, Sparkles, Download, MessageCircle, Twitter, Copy, Lock, Info, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ShareButton } from '@/components/share-button';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const ipdToolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI IPD Measuring Tool",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0"
    },
    "description": "A free, AI-powered tool to measure interpupillary distance (PD) using a device camera.",
    "url": "https://focuslinks.in/opto-tools/ipd-measuring-tool"
};

const howItWorks = [
    { title: "Enable Camera", description: "Grant permission to use your device's camera.", icon: <Video className="h-6 w-6"/> },
    { title: "Position Your Face", description: "Align your face within the guide on the screen.", icon: <ScanFace className="h-6 w-6"/> },
    { title: "Hold Still", description: "The tool automatically captures when conditions are optimal.", icon: <Gauge className="h-6 w-6"/> },
    { title: "Get Your Result", description: "Receive your precise IPD measurement instantly.", icon: <Sparkles className="h-6 w-6"/> },
];

const bestPractices = [
    "Use a well-lit, evenly illuminated area.",
    "Look directly into the camera.",
    "Remove your glasses before starting.",
    "Hold your head straight and still.",
    "Maintain a distance of about 40cm (16 inches) from the screen."
];

export function IpdToolClientPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [membershipId, setMembershipId] = useState('');
  const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const shareText = "Check out this free AI tool from Focus Links to measure your pupillary distance (PD) instantly! Super useful for ordering glasses online. #IPD #EyeCare #FocusLinks";

  const handleCopy = () => {
    const url = 'https://focuslinks.in/opto-tools/ipd-measuring-tool';
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied',
      description: 'The link has been copied to your clipboard.',
    });
  };

  const checkIdValidity = useCallback(debounce(async (id: string) => {
    if (!id || id.trim().length < 5) {
      setIdStatus('idle');
      return;
    }
    setIdStatus('loading');
    try {
      const response = await fetch(`/api/verify-id?id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (data.isValid) {
        setIdStatus('valid');
      } else {
        setIdStatus('invalid');
      }
    } catch (error) {
      console.error('ID validation failed:', error);
      setIdStatus('invalid');
    }
  }, 500), []);

  useEffect(() => {
    if (membershipId) {
      checkIdValidity(membershipId);
    } else {
      setIdStatus('idle');
    }
  }, [membershipId, checkIdValidity]);

  const handleLaunch = () => {
    if (idStatus === 'valid') {
      router.push('/opto-tools/ipd-measuring-tool/launch');
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ipdToolSchema) }} />
      <div className="bg-brand-bg">
        <header className="hero">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">AI IPD Measuring Tool</h1>
          <p className="text-base opacity-90 max-w-xl mx-auto">
            Get a precise pupillary distance measurement in seconds using your device's camera. Fast, free, and powered by AI.
          </p>
        </header>

        <main className="container mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
          <Card className="shadow-lg">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-800">Ready to Get Your Measurement?</h2>
                <p className="mt-2 text-lg text-slate-600">Our tool uses advanced AI to analyze your camera feed in real-time and calculate your IPD with high accuracy. Click below to start.</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                     <Button size="lg" className="mt-6">
                      <Rocket className="mr-2 h-5 w-5" />
                      Launch IPD Tool
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                     <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><Lock className="h-5 w-5"/> Member Verification</DialogTitle>
                        <DialogDescription>
                            This tool is available for members. Please enter your Membership ID to proceed.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="membershipId">Membership ID</Label>
                        <div className="relative">
                            <Input id="membershipId" value={membershipId} onChange={(e) => setMembershipId(e.target.value)} placeholder="Enter your ID" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                                {idStatus === 'valid' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                            </div>
                        </div>
                        {idStatus === 'invalid' && <p className="text-sm text-destructive">This Membership ID is not valid.</p>}
                        <p className="text-xs text-muted-foreground">
                            Don't have an ID? <Link href="/membership" className="underline text-primary">Get one for free.</Link>
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleLaunch} disabled={idStatus !== 'valid'} className="w-full">
                            <Rocket className="mr-2 h-4 w-4" />
                            Verify & Launch
                        </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">How It Works in 4 Simple Steps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800"><Lightbulb /> Tips for Best Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {bestPractices.map((tip, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <span className="text-blue-900/80">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-slate-800 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles /> Share This Free Tool</CardTitle>
                        <CardDescription className="text-slate-300">Help others get accurate measurements for their eyewear. Share this tool with your friends, family, or patients!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button asChild variant="secondary" className="w-full">
                           <a href={`https://wa.me/?text=${encodeURIComponent('Check out this free AI tool to measure your Pupillary Distance (PD)! https://focuslinks.in/opto-tools/ipd-measuring-tool')}`} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-4 w-4" /> Share on WhatsApp
                            </a>
                        </Button>
                         <Button asChild variant="secondary" className="w-full">
                           <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
                                <Twitter className="mr-2 h-4 w-4" /> Share on X (Twitter)
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full" aria-label="Copy" onClick={handleCopy}>
                          <Copy className="h-4 w-4 text-slate-800 mr-2" />
                          <span className="text-slate-800">Copy Link</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
