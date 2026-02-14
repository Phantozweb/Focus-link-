
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, User, Loader2, KeySquare, ShieldCheck, Search, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const WAITLIST_INFO_KEY = 'optoscholar_waitlist_info';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1443283270765641812/33KsSWnUfoBRTNgCogRCCao4VU-dSkUgSBYlGnIkIfRHnMWQUpTDEa-Szh0eUdi6InLy';

// Helper to generate a unique access code
const generateAccessCode = () => {
  const prefix = 'OPTO';
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${randomPart}`;
};

function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistInfo, setWaitlistInfo] = useState<{joinedAt: number, email: string} | null>(null);
  const [codeNotReceivedLoading, setCodeNotReceivedLoading] = useState(false);
  const [codeNotReceivedSuccess, setCodeNotReceivedSuccess] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem(WAITLIST_INFO_KEY);
    if (storedInfo) {
      setWaitlistInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const newAccessCode = generateAccessCode();
      const discordMessage = {
        content: "A new user has joined the OptoScholar waitlist.",
        embeds: [
          {
            title: "New Waitlist Signup",
            description: "A new user has requested access. You can add them to `access.json` using the details below.",
            color: 3447003, // Blue color
            fields: [
              {
                name: "User Name",
                value: name,
                inline: true
              },
              {
                name: "User Email",
                value: email,
                inline: true
              },
              {
                  name: "Generated Code",
                  value: newAccessCode,
              },
              {
                  name: "JSON to Copy",
                  value: `'''json\n{\n  "email": "${email}",\n  "accessCode": "${newAccessCode}"\n}'''`
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      // Send the discord message without waiting for it to finish
      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage),
      }).catch(error => {
        console.error("Failed to send Discord message:", error);
      });

      // We still use a timeout to simulate backend processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newInfo = { joinedAt: Date.now(), email };
      localStorage.setItem(WAITLIST_INFO_KEY, JSON.stringify(newInfo));
      setWaitlistInfo(newInfo);
      setIsSuccess(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeNotReceived = async () => {
    if (!waitlistInfo) return;
    setCodeNotReceivedLoading(true);

    const newAccessCode = generateAccessCode();
    const discordMessage = {
      content: "A user who waited >24hrs has requested an access code.",
      embeds: [
        {
          title: "New OptoScholar Access Code Generated",
          description: "Please add the following JSON object to the `access.json` file.",
          color: 16705372, // Yellow color
          fields: [
            {
              name: "User Email",
              value: waitlistInfo.email,
              inline: true
            },
            {
              name: "Generated Code",
              value: newAccessCode,
              inline: true
            },
            {
                name: "JSON to Copy",
                value: `'''json\n{\n  "email": "${waitlistInfo.email}",\n  "accessCode": "${newAccessCode}"\n}'''`
            }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage),
      });
      setCodeNotReceivedSuccess(true);
    } catch (error) {
      console.error("Failed to send Discord message:", error);
    } finally {
      setCodeNotReceivedLoading(false);
    }
  }

  if (isSuccess || waitlistInfo) {
    const hasWaited24Hours = waitlistInfo && (Date.now() - waitlistInfo.joinedAt > 24 * 60 * 60 * 1000);
    
    return (
      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-4">
        <Clock className="h-10 w-10 text-green-600 dark:text-green-400 mx-auto" />
        <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Thank You for Your Interest!</h3>
        <p className="text-sm text-green-700 dark:text-green-400 max-w-2xl mx-auto">
          You are on our waitlist. Access codes are typically sent out within 24 hours to <strong>{waitlistInfo?.email}</strong>. Please check your email (and spam folder!).
        </p>
        {hasWaited24Hours && !codeNotReceivedSuccess && (
             <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-2">Waited long enough?</p>
                <Button onClick={handleCodeNotReceived} disabled={codeNotReceivedLoading} variant="secondary" size="sm">
                    {codeNotReceivedLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <AlertTriangle className="mr-2 h-4 w-4"/>}
                    Code Not Received?
                </Button>
            </div>
        )}
        {codeNotReceivedSuccess && (
            <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold pt-2">A notification has been sent to the admins. You should receive your code very soon!</p>
        )}
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
            className="pl-10 h-11 rounded-lg"
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
            className="pl-10 h-11 rounded-lg"
          />
        </div>
        <Button type="submit" className="w-full h-11 rounded-lg font-semibold" disabled={isLoading}>
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
    const [email, setEmail] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const ACCESS_CODES_URL = 'https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/refs/heads/main/access.json';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(ACCESS_CODES_URL, { cache: 'no-store' }); // Disable caching
            if (!response.ok) {
                throw new Error('Could not retrieve access codes. Please try again later.');
            }
            const validCodes: {email: string, accessCode: string}[] = await response.json();

            const isValid = validCodes.some(
                (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.accessCode === accessCode
            );

            if (isValid) {
                // On successful validation, remove from waitlist
                localStorage.removeItem(WAITLIST_INFO_KEY);
                router.push('/opto-tools/optoscholar-clinical-research-engine/launch');
            } else {
                setError('Invalid email or access code. Please check your credentials.');
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11 rounded-lg"
                />
            </div>
            <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Your Access Code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    required
                    className="pl-10 h-11 rounded-lg"
                />
            </div>
            <Button type="submit" className="w-full h-11 rounded-lg font-semibold" disabled={isLoading}>
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
        <Card className="max-w-md mx-auto bg-background/60 backdrop-blur-sm rounded-2xl shadow-lg border">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">OptoScholar Access</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    The tool is in a limited-access phase.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-6">
                <Tabs defaultValue="access" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-primary/20 p-1 h-auto rounded-lg">
                        <TabsTrigger value="waitlist" className="py-2.5 text-sm font-semibold text-primary/80 flex items-center justify-center data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md">
                            <Mail className="mr-2 h-4 w-4" />
                            Join Waitlist
                        </TabsTrigger>
                        <TabsTrigger value="access" className="py-2.5 text-sm font-semibold text-primary/80 flex items-center justify-center data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md">
                             <KeySquare className="mr-2 h-4 w-4" />
                            Access Here
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="waitlist" className="pt-6">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold">Don't have a code?</h3>
                            <p className="text-sm text-muted-foreground">Join our waitlist, and we'll email you an access code within 24 hours.</p>
                        </div>
                        <WaitlistForm />
                    </TabsContent>
                    <TabsContent value="access" className="pt-6">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold">Already have a code?</h3>
                            <p className="text-sm text-muted-foreground">Enter your email and code below to launch the tool.</p>
                        </div>
                        <AccessForm />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
