'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  title: string;
  text: string;
  className?: string;
}

export function ShareButton({ title, text, className }: ShareButtonProps) {
  const { toast } = useToast();
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.share) {
      setIsShareSupported(true);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Silently fail if user cancels share dialog.
        // We check for AbortError, but also just ignore other errors
        // as some browsers might throw different permission errors on cancel.
        if ((err as Error).name !== 'AbortError') {
           // Intentionally left blank to prevent error overlay on share cancel.
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'The link has been copied to your clipboard.',
        });
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Copy Failed',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" size="icon" className={cn(className)} aria-label="Share">
      {isShareSupported ? <Share2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
    </Button>
  );
}
