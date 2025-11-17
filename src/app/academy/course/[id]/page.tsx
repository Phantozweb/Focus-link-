
'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function CourseComingSoon() {
  const params = useParams();
  const id = params.id as string;
  
  return (
    <div className="bg-muted/40 min-h-screen py-12 flex items-center">
      <div className="container mx-auto max-w-2xl">
         <Card>
           <CardHeader className="text-center">
             <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
             <CardTitle className="text-3xl font-bold font-headline">Interactive Course Coming Soon!</CardTitle>
             <CardDescription className="text-muted-foreground mt-2 text-lg">
                We're putting the finishing touches on this interactive learning experience.
             </CardDescription>
           </CardHeader>
           <CardContent className="text-center">
             <p className="mb-6">This course will feature AI-powered simulations, 3D models, and hands-on exercises. Check back soon to start mastering your skills!</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/academy/${id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Course Details
                  </Link>
                </Button>
             </div>
           </CardContent>
         </Card>
      </div>
    </div>
  )
}

export default function CoursePage() {
  return (
    <Suspense>
      <CourseComingSoon />
    </Suspense>
  );
}
