
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Opto Tools | Focus Links',
  description: 'A collection of useful tools and calculators for optometry students and professionals.',
};

export default function OptoToolsPage() {
  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Optometry Tools</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          A suite of calculators and converters designed for eye care professionals.
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Construction className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-headline">Coming Soon!</CardTitle>
              <CardDescription className="text-lg">
                We're building a powerful suite of optometry tools. Check back soon for updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our team is working on calculators for vertex distance, contact lens fitting, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
