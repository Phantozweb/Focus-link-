'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, User, Loader2, PartyPopper, KeySquare, ShieldCheck, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8">
        <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 text-green-800 dark:text-green-300">You're on the list!</h3>
        <p className="text-green-700 dark:text-green-400 max-w-2xl mx-auto">
          Thank you for signing up. We'll notify you as soon as OptoScholar is available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</>
          ) : (
            'Join Waitlist'
          )}
        </Button>
        {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
      </form>
  );
}

function AccessForm() {
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const VALID_ACCESS_CODE = "EARLYACCESS";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            if (accessCode === VALID_ACCESS_CODE) {
                router.push('/opto-tools/optoscholar-clinical-research-engine/launch');
            } else {
                setError('Invalid access code. Please check your code and try again.');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Enter Access Code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    required
                    className="pl-10"
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
                ) : (
                    <><ShieldCheck className="mr-2 h-4 w-4" /> Access Tool</>
                )}
            </Button>
            {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
        </form>
    );
}

export function OptoScholarAccess() {
    return (
        <Card className="max-w-lg mx-auto border-2 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">OptoScholar Access</CardTitle>
                <CardDescription className="text-base">
                    The clinical research engine is currently in a limited-access phase.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="waitlist" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted/80">
                        <TabsTrigger value="waitlist">
                            <Mail className="mr-2 h-4 w-4" />
                            Join Waitlist
                        </TabsTrigger>
                        <TabsTrigger value="access">
                             <KeySquare className="mr-2 h-4 w-4" />
                            Enter Code
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="waitlist" className="pt-6">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold">Be the first to know</h3>
                            <p className="text-sm text-muted-foreground">Sign up to get notified when OptoScholar is publicly available.</p>
                        </div>
                        <WaitlistForm />
                    </TabsContent>
                    <TabsContent value="access" className="pt-6">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold">Already have access?</h3>
                            <p className="text-sm text-muted-foreground">Enter your early-access code below to launch the tool.</p>
                        </div>
                        <AccessForm />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
