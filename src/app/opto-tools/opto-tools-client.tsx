
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Lock, Eye, Calculator, BookOpenText, Sparkles, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Assuming this hook exists and provides membership status
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// If useAuth hook is not available, here's a mock for demonstration
// const useAuth = () => ({ membershipStatus: 'unverified', loading: false }); 

const tools = [
    {
        title: 'RAPD Simulator',
        description: 'An interactive simulator to practice and understand Relative Afferent Pupillary Defect evaluations.',
        href: '/opto-tools/rapd-simulator',
        icon: <Eye className="h-8 w-8" />,
    },
    {
        title: 'IPD Measuring Tool',
        description: 'A webcam-based tool to measure interpupillary distance. Accurate and easy to use.',
        href: '/opto-tools/ipd-measuring-tool',
        icon: <Sparkles className="h-8 w-8" />,
        isNew: true,
    },
    {
        title: 'Optometry Calculator',
        description: 'A collection of essential calculators for daily clinical practice, including vertex conversion and more.',
        href: '/opto-tools/optometry-calculator',
        icon: <Calculator className="h-8 w-8" />,
    },
    {
        title: 'OptoScholar',
        description: 'A specialized clinical search engine for optometry and ophthalmology with over 1M+ indexed articles.',
        href: '/opto-tools/optoscholor',
        icon: <BookOpenText className="h-8 w-8" />,
        isNew: true,
    },
];

interface ToolCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    isVerified: boolean | null;
    isComingSoon?: boolean;
    isNew?: boolean;
}

function ToolCard({ title, description, href, icon, isVerified, isComingSoon, isNew }: ToolCardProps) {
    const isLocked = isVerified === false;

    return (
        <Card className="flex flex-col relative">
            {isLocked && (
                <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center rounded-lg z-10">
                    <Lock className="h-8 w-8 text-white" />
                    <p className="text-white text-sm font-semibold mt-2">Membership Required</p>
                    <Button variant="secondary" size="sm" className="mt-4" asChild>
                        <Link href="/membership">Learn More</Link>
                    </Button>
                </div>
            )}
            {isComingSoon && !isLocked && (
                 <div className="absolute inset-0 bg-slate-100/80 flex flex-col items-center justify-center rounded-lg z-10">
                    <p className="text-slate-800 text-sm font-semibold mt-2">Coming Soon</p>
                </div>
            )}
            <CardHeader className="flex-row gap-4 items-center">
                <div>
                    {icon}
                </div>
                <div className='flex-1'>
                    <CardTitle className='flex items-center justify-between'>
                        {title}
                        {isNew && !isLocked && <span className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">NEW</span>}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button disabled={isLocked || isComingSoon} asChild className='w-full'>
                    <Link href={href}>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        {isComingSoon ? 'Coming Soon' : 'Launch Tool'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}


export default function OptoToolsClient() {
    // This is a mock auth state. In a real app, you'd get this from your auth provider.
    const [isMember, setIsMember] = useState<boolean | null>(null);

    useEffect(() => {
        // Simulate checking auth status
        const authStatus = localStorage.getItem('isVerifiedMember') === 'true';
        setIsMember(authStatus);
    }, []);

    if (isMember === null) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <TooltipProvider>
            <div>
                {!isMember && (
                    <Alert className='mb-8 bg-amber-50 border-amber-200'>
                        <AlertTriangle className="h-4 w-4 !text-amber-600" />
                        <AlertTitle className='text-amber-800'>Membership Required for Some Tools</AlertTitle>
                        <AlertDescription className='text-amber-700'>
                            Some advanced tools are only available to verified FocusLinks members. 
                            <Link href="/membership" className='font-semibold underline ml-2'>
                                Become a member
                            </Link> 
                            to unlock everything.
                        </AlertDescription>
                    </Alert>
                )}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <ToolCard
                            key={tool.title}
                            {...tool}
                            isVerified={tool.href.includes('calculator') ? true : isMember} // Example: calculator is always free
                        />
                    ))}
                </div>
            </div>
        </TooltipProvider>
    );
}
