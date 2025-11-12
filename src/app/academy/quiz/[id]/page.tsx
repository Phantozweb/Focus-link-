
'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function QuizClosed() {
  const params = useParams();
  const id = params.id as string;
  
  return (
    <div className="bg-muted/40 min-h-screen py-12 flex items-center">
      <div className="container mx-auto max-w-2xl">
         <Card>
           <CardHeader className="text-center">
             <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
             <CardTitle className="text-3xl font-bold font-headline">The Eye Q Arena is Now Closed</CardTitle>
             <CardDescription className="text-muted-foreground mt-2 text-lg">
                Thank you to all the participants who made this event a massive success!
             </CardDescription>
           </CardHeader>
           <CardContent className="text-center">
             <p className="mb-6">The competition has concluded. Check out the final results and highlights on the event page.</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href={`/academy/${id}#leaderboard`}>
                    View Final Leaderboard
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/academy">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Academy
                  </Link>
                </Button>
             </div>
           </CardContent>
         </Card>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense>
      <QuizClosed />
    </Suspense>
  );
}
