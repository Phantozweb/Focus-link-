
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import Link from "next/link";

export default function RapdSimulatorLaunchPage() {
    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Construction className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Coming Soon!</CardTitle>
                    <CardDescription className="text-lg">
                        The interactive RAPD Simulator is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-muted-foreground">Our team is building this feature. Please check back later!</p>
                    <Button asChild>
                        <Link href="/opto-tools">
                            Back to Opto Tools
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
