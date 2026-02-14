
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SimulatorContent() {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSimulatorContent() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Rapd.html');
        if (!response.ok) {
          throw new Error(`Failed to load simulator: ${response.statusText}`);
        }
        let text = await response.text();
        
        setHtmlContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchSimulatorContent();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-lg font-semibold">Loading Simulator...</p>
        <p className="text-slate-400">Please wait while we prepare the clinical simulation.</p>
      </div>
    );
  }

  if (error) {
    return (
       <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <p className="text-lg font-semibold text-red-400">Error</p>
        <p className="text-slate-300 mt-2">{error}</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link href="/opto-tools/rapd-simulator">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={htmlContent}
      title="RAPD Simulator"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
      }}
    />
  );
}

export default function RapdSimulatorLaunchPage() {
    return <SimulatorContent />;
}
