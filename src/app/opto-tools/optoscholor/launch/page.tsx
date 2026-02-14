
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function OptoScholarLaunchPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const accessId = sessionStorage.getItem('optoscholar_access_id');
    if (accessId) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
      // Redirect back to the main tool page after a short delay
      // to allow the user to see the message.
      const timer = setTimeout(() => {
        router.push('/opto-tools/optoscholor');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
        <p className="ml-4 text-slate-500">Verifying access...</p>
      </div>
    );
  }

  if (isVerified === false) {
    return (
      <div className="container mx-auto p-4 md:p-8 min-h-screen flex items-center justify-center">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access this tool. Please verify your membership ID. You will be redirected shortly.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full h-screen -m-4">
      <iframe
        src="https://optoscholarfocuslinksapp.netlify.app/"
        className="w-full h-full border-0"
        title="OptoScholar Research Engine"
        allow="fullscreen"
      />
    </div>
  );
}
