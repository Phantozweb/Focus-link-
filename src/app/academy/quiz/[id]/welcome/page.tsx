
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Check, Clock, Play, Trophy, Users, Award, Star, User } from 'lucide-react';
import Link from 'next/link';
import { quizModules } from '@/lib/quiz-questions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { allUsers } from '@/lib/data';
import type { UserProfile } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function QuizWelcomePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [membershipId, setMembershipId] = useState<string | null>(null);
  const [participant, setParticipant] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem(`quizSession-${id}`);
    if (storedSession) {
      const session = JSON.parse(storedSession);
      setMembershipId(session.membershipId);
      const user = allUsers.find(u => u.id === session.membershipId);
      if (user) {
        setParticipant(user);
      }
    }
  }, [id]);

  const totalQuestions = quizModules.length * 10;
  const totalTime = quizModules.reduce((acc, m) => acc + m.time, 0) / 60;
  const totalQuestionPoints = quizModules.reduce((acc, m) => acc + m.totalPoints, 0);
  const totalBonusPoints = quizModules.reduce((acc, m) => acc + m.timeBonus, 0);
  const grandTotalPoints = totalQuestionPoints + totalBonusPoints;


  const instructions = [
    { text: `${totalQuestions} questions across ${quizModules.length} timed modules.` },
    { text: `A total of ${grandTotalPoints} points are available, including bonus points for speed.` },
    { text: `A score of 50% or higher is required to pass and earn a certificate.` },
    { text: `Top performers get a Certificate of Excellence and a profile badge.` },
    { text: `Your performance points will be recorded for your future platform rewards!` },
  ];

  return (
    <div className="bg-muted/40 min-h-screen py-12">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground">
            <Link href={`/academy/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Event Details
            </Link>
          </Button>
        </div>
        <Card className="shadow-2xl">
          <CardHeader className="text-center bg-slate-50 p-8 rounded-t-lg">
            <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold font-headline">Welcome to the Eye Q Arena!</CardTitle>
            <CardDescription className="text-lg">You are about to begin the International Optometry Knowledge Championship.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            
            {participant && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-blue-200">
                      <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                      <AvatarFallback className="text-xl">
                          {participant.name.charAt(0)}
                      </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                      <p className="font-bold text-lg text-blue-900">{participant.name}</p>
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Participant ID:</span> 
                        <span className="font-mono ml-2 tracking-wider">{membershipId}</span>
                      </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Key Instructions</h2>
              <ul className="space-y-3">
                {instructions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Quiz Modules & Scoring</h2>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead className="text-right">Question Points</TableHead>
                      <TableHead className="text-right">Time Bonus</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizModules.map((module, index) => (
                      <TableRow key={module.topic}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{module.topic}</TableCell>
                        <TableCell className="text-right font-mono">{module.totalPoints}</TableCell>
                        <TableCell className="text-right font-mono">{module.timeBonus}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-50 font-bold">
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right font-mono">{totalQuestionPoints}</TableCell>
                        <TableCell className="text-right font-mono">{totalBonusPoints}</TableCell>
                    </TableRow>
                     <TableRow className="bg-slate-100 font-black">
                        <TableCell colSpan={3}>Grand Total Possible</TableCell>
                        <TableCell className="text-right font-mono">{grandTotalPoints} Points</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <div className="text-center pt-6">
                <Button size="lg" className="w-full max-w-sm text-lg py-6" onClick={() => router.push(`/academy/quiz/${id}?start=true`)}>
                    <Play className="mr-2 h-6 w-6" />
                    I'm Ready, Begin Quiz!
                </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
