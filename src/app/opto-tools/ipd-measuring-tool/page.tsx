
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IPDToolPage() {
    return (
        <div className="bg-brand-bg">
            <header className="hero">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3">IPD Measuring Tool</h1>
                <p className="text-base opacity-90 max-w-xl mx-auto">
                    This tool is currently under development.
                </p>
            </header>
            <main className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
                <Card className="max-w-md mx-auto text-center">
                    <CardHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <Construction className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>Coming Soon!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">Our advanced AI-powered IPD measuring tool is being refined. Please check back later.</p>
                        <Button asChild>
                            <Link href="/opto-tools">Back to Opto Tools</Link>
                        </Button>
                    </Card