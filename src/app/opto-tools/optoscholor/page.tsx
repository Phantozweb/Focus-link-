
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const categories = [
    'Myopia Control',
    'Glaucoma Management',
    'Dry Eye Disease',
    'Specialty Contact Lenses',
    'Pediatric Optometry',
    'Neuro-Optometry'
];

export default function OptoScholarPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="bg-brand-bg min-h-screen">
            <header className="hero">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3">OptoScholar</h1>
                <p className="text-base opacity-90 max-w-2xl mx-auto">
                    Your gateway to the world's optometry knowledge. Indexing over 1 million articles from journals, research papers, and clinical studies.
                </p>
            </header>

            <main className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-16 space-y-12">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="outline" asChild>
                        <Link href="/opto-tools">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to All Tools
                        </Link>
                    </Button>
                </div>

                <Card className="shadow-lg">
                    <CardContent className="p-8">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search for articles, authors, or keywords..."
                                className="w-full pl-12 h-14 rounded-full bg-white text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                             <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10">Search</Button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground mb-4">Or explore popular topics:</p>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {categories.map(cat => (
                                    <Button key={cat} variant="outline" size="sm" onClick={() => setSearchTerm(cat)}>
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <div className="text-center text-muted-foreground py-8">
                    <p>Search results will appear here.</p>
                    <p className="text-sm">This is a conceptual interface for the OptoScholar tool.</p>
                </div>
            </main>
        </div>
    );
}
