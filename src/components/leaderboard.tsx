
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LeaderboardEntry = {
  rank: number;
  avatar: string;
  name: string;
  score: number;
  time: string;
};

interface LeaderboardProps {
  data: LeaderboardEntry[];
  itemsPerPage?: number;
}

export function Leaderboard({ data, itemsPerPage = 10 }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(1);

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
                <TableCell className="text-right font-semibold">{entry.score}</TableCell>
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
