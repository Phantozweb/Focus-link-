"use client";

import { useState } from 'react';
import { summarizeProfile } from '@/ai/flows/summarize-profile';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileSummaryProps {
  bio: string;
}

export function ProfileSummary({ bio }: ProfileSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeProfile({ profileText: bio });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to summarize profile:', error);
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: 'Could not generate AI summary at this time.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleSummarize} disabled={isLoading} variant="outline" size="sm">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Summarize with AI
      </Button>
      
      {isLoading && (
        <div className="mt-4 p-4 text-center text-sm text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
          Generating summary...
        </div>
      )}

      {summary && (
        <Alert className="mt-4 bg-primary/10 border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-headline">AI Summary</AlertTitle>
          <AlertDescription>{summary}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
