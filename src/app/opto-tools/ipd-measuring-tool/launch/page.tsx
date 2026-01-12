
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function IpdToolEmbed() {
  return (
    <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        id="ipd-frame"
        src="https://ipdtester.netlify.app/?embed=true"
        className="w-full h-full border-0"
        allow="camera; microphone"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default function IpdToolLaunchPage() {
    const [isVerified, setIsVerified] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const verifiedId = sessionStorage.getItem('ipd_tool_access_id');
        if (verifiedId) {
            setIsVerified(true);
        } else {
            router.replace('/opto-tools/ipd-measuring-tool');
        }
    }, [router]);

    if (!isVerified) {
        // This is a fallback while redirecting
        return (
            <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline">Redirecting...</CardTitle>
                        <CardDescription className="text-lg">
                           Verifying access...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return <IpdToolEmbed />;
}
