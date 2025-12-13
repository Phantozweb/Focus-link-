
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ListChecks, Play, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RAPD Simulator | Focus Links Opto Tools',
  description: 'Practice and master the swinging flashlight test for detecting Relative Afferent Pupillary Defects (RAPD) with this interactive clinical simulator.',
};

export default function RapdSimulatorInfoPage() {
  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">RAPD Simulator</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          An interactive tool for practicing the swinging flashlight test to identify Relative Afferent Pupillary Defects (RAPD).
        </p>
      </header>

      <main className="container mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-2xl font-headline">Practice the Swinging Flashlight Test</CardTitle>
                    <CardDescription className="text-base mt-1">Sharpen your diagnostic skills in a safe, repeatable environment.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><ListChecks className="text-primary h-5 w-5" /> Features</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Realistic simulation of pupillary responses.</li>
                        <li>Practice identifying normal, mild, moderate, and severe RAPD.</li>
                        <li>Interactive flashlight control to simulate the test.</li>
                        <li>Instant feedback on your observations.</li>
                        <li>Learn to recognize the key signs of an afferent defect.</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="text-primary h-5 w-5" /> Learning Objectives</h3>
                     <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Master the timing of the swinging flashlight test.</li>
                        <li>Differentiate between normal constriction and paradoxical dilation.</li>
                        <li>Build confidence in diagnosing RAPD.</li>
                        <li>Understand the clinical significance of a positive finding.</li>
                    </ul>
                </div>
            </div>
            
            <div className="text-center pt-6">
                <Button size="lg" asChild>
                    <Link href="/opto-tools/rapd-simulator/launch">
                        <Play className="mr-2 h-5 w-5" />
                        Launch Simulator
                    </Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
