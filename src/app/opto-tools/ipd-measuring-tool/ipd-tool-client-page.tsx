
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb, Rocket, ScanFace, Gauge, Video, Sparkles, Download, MessageCircle, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ShareButton } from '@/components/share-button';

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
  const shareText = "Check out this free AI tool from Focus Links to measure your pupillary distance (PD) instantly! Super useful for ordering glasses online. #IPD #EyeCare #FocusLinks";

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
            <CardContent className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-800">Ready to Get Your Measurement?</h2>
                <p className="mt-2 text-lg text-slate-600">Our tool uses advanced AI to detect your facial landmarks and calculate your IPD with high accuracy. Click below to start.</p>
                <Button asChild size="lg" className="mt-6">
                  <Link href="/opto-tools/ipd-measuring-tool/launch">
                    <Rocket className="mr-2 h-5 w-5" />
                    Launch IPD Tool
                  </Link>
                </Button>
              </div>
              <div className="relative w-full lg:w-1/3 aspect-square max-w-sm">
                <Image src="https://i.ibb.co/2Z5d3K0/ipd-tool-og-image.png" alt="IPD Tool Demonstration" layout="fill" objectFit="contain" />
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
                        <ShareButton title="Free AI IPD Measuring Tool" text={shareText} className="w-full" />
                    </CardContent>
                </Card>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
