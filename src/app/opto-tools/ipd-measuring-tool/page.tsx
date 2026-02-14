
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowLeft, ScanFace, Ruler, Download, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function IpdToolInfoPage() {
  const router = useRouter();

  const handleLaunch = () => {
    router.push('/opto-tools/ipd-measuring-tool/launch');
  };

  return (
    <>
      <div className="bg-brand-bg">
        <header className="hero">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">IPD Measure Pro</h1>
          <p className="text-base opacity-90 max-w-xl mx-auto">
            A state-of-the-art tool to accurately measure interpupillary distance using your device's camera.
          </p>
        </header>

        <main className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" asChild>
              <Link href="/opto-tools">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Tools
              </Link>
            </Button>
          </div>
          
          <div className="mt-8">
            <Button size="lg" className="w-full text-lg py-6" onClick={handleLaunch}>
              <Play className="mr-2 h-6 w-6" />
              Launch IPD Measure Pro
            </Button>
          </div>

          <Card className="mt-12">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Tool Features</CardTitle>
                <CardDescription>
                   Leveraging advanced on-device processing for accurate and private measurements.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <ScanFace className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">AI Face Landmark Detection</h4>
                        <p className="text-sm text-muted-foreground">Utilizes advanced AI to accurately detect pupil positions in real-time.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Ruler className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Real-Time IPD Calculation</h4>
                        <p className="text-sm text-muted-foreground">Provides an instant estimation of the interpupillary distance in millimeters.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Info className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">On-Device Processing</h4>
                        <p className="text-sm text-muted-foreground">All calculations are done directly in your browser. Your camera feed never leaves your device, ensuring complete privacy.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Download className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Result History & Download</h4>
                        <p className="text-sm text-muted-foreground">Save multiple readings, view your measurement history, and download your results as an image for your records.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        </main>
      </div>
    </>
  );
}
