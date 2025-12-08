
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Orbit, RotateCw, Contact, Eye, ZoomIn, Ruler, Sigma, CheckCircle, XCircle, Loader2, User, UserRound, View, Scale, Link as LinkIcon, Hand, BrainCircuit, RefreshCw, Minus, Plus, Copy, Share2, Info, Building, ArrowRight, ScanFace } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Clinical Optometry Tools | Focus Links',
    description: 'Explore a suite of essential clinical tools for optometrists, from calculators to diagnostic aids.',
};


export default function OptoToolsPage() {
  const tools = [
    {
      id: 'optometry-calculator',
      title: 'Optometry Calculator Suite',
      description: 'Access 20+ clinical calculators for refraction, contact lenses, and low vision.',
      href: '/opto-tools/optometry-calculator',
      icon: <Calculator className="h-8 w-8 text-primary" />,
    },
    {
      id: 'ipd-measuring-tool',
      title: 'IPD Measuring Tool',
      description: 'Measure interpupillary distance with high precision using our AI-powered tool.',
      href: '/opto-tools/ipd-measuring-tool',
      icon: <ScanFace className="h-8 w-8 text-primary" />,
    },
    // Add other tools here in the future
  ];

  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Opto Tools</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          A collection of essential digital tools and calculators designed for the modern eye care professional.
        </p>
      </header>
       <main className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
              <CardHeader>
                 <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                    {tool.icon}
                </div>
                <CardTitle className="text-center">{tool.title}</CardTitle>
                <CardDescription className="text-center h-12">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={tool.href}>
                    Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
