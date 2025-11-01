
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogTrigger } from './ui/dialog';
import { QuizEntryDialog } from './webinar-actions';

export type LeaderboardEntry = {
  rank: number;
  avatar: string;
  name: string;
  score: number;
  time: string;
};

interface LeaderboardProps {
  itemsPerPage?: number;
}

export function Leaderboard({ itemsPerPage = 10 }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data.');
        }
        const leaderboardData: LeaderboardEntry[] = await response.json();
        setData(leaderboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center flex flex-col items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading Leaderboard...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return (
        <Card className="text-center bg-red-50 border-red-200">
            <CardContent className="p-8">
                <Info className="h-10 w-10 text-destructive mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-destructive">Could Not Load Leaderboard</h3>
                <p className="text-red-800 mt-1">
                    There was an error fetching the results. Please try refreshing the page.
                </p>
            </CardContent>
        </Card>
    );
  }
  
  if (data.length === 0) {
    return (
        <Card className="text-center">
            <CardContent className="p-8">
                <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                <h3 className="font-semibold text-xl">Be the First on the Leaderboard!</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                    No one has completed the quiz yet. Enter the arena now to claim the top spot.
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                           <Trophy className="mr-2 h-4 w-4" /> Enter the Arena
                        </Button>
                    </DialogTrigger>
                    <QuizEntryDialog webinarId="eye-q-arena-2025" />
                </Dialog>
            </CardContent>
        </Card>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber-500';
    if (rank === 2) return 'text-slate-500';
    if (rank === 3) return 'text-amber-700';
    return 'text-muted-foreground';
  };

  return (
    <div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="text-center font-bold text-lg">
                    <div className="flex items-center justify-center gap-2">
                        {entry.rank <= 3 ? <Trophy className={cn("h-5 w-5", getRankColor(entry.rank))} /> : <span className={cn("h-5 w-5 flex items-center justify-center", getRankColor(entry.rank))}>{entry.rank}</span>}
                    </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{entry.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{entry.score}%</TableCell>
                <TableCell className="text-right">{entry.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
