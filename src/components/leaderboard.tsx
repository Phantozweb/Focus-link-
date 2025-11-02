
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';
import { allUsers } from '@/lib/data';

export type LeaderboardEntry = {
  rank: number;
  avatar: string;
  name: string;
  score: number;
  time: string;
};

// This type represents the raw data coming from the Google Sheet via our API
type RawLeaderboardData = {
  MembershipID: string;
  Name?: string;
  OverallPercentage: number | string;
  'TotalTimeTaken (Seconds)': number | string;
};

const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) {
        return '00:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


export function Leaderboard({ itemsPerPage = 10 }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndProcessLeaderboard() {
      try {
        setIsLoading(true);
        setError(null);
        
        // 1. Fetch raw data from our simplified API route
        const response = await fetch('/api/leaderboard', { cache: 'no-store' });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error || 'Failed to load leaderboard data.');
        }

        const rawData: RawLeaderboardData[] = await response.json();

        if (!Array.isArray(rawData)) {
            throw new Error("Invalid data format received from the server.");
        }
        
        // 2. Process and enrich the data on the client-side
        const processedData = rawData.map((row, index) => {
          const userProfile = allUsers.find(u => u.id === row.MembershipID);
          
          const scoreValue = parseFloat(String(row.OverallPercentage));
          const score = !isNaN(scoreValue) ? Math.round(scoreValue * 100) : 0;
          
          const timeValue = row['TotalTimeTaken (Seconds)'];
          let formattedTime: string;

          if (typeof timeValue === 'number' && !isNaN(timeValue)) {
            formattedTime = formatTime(timeValue);
          } else if (typeof timeValue === 'string') {
            const parsedNumber = parseFloat(timeValue);
            formattedTime = !isNaN(parsedNumber) ? formatTime(parsedNumber) : timeValue;
          } else {
            formattedTime = 'N/A';
          }
          
          return {
              rank: index + 1,
              name: userProfile?.name || row.Name || row.MembershipID,
              avatar: userProfile?.avatarUrl || '',
              score: score,
              time: formattedTime,
          };
        })
        .filter(entry => entry.name && entry.score > 0); // Filter out invalid entries

        setData(processedData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error("Failed to fetch or process leaderboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAndProcessLeaderboard();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchAndProcessLeaderboard, 30000);
    return () => clearInterval(interval);

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

  if (error || data.length === 0) {
     return (
        <Card className="text-center bg-blue-50 border-blue-200">
            <CardContent className="p-8">
                <Info className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-blue-800">Leaderboard is Being Updated</h3>
                <p className="text-blue-700 mt-1">
                    Waiting for more members to participate. Please check back after 24 hours to see the latest rankings.
                </p>
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
        <div className="text-right mb-4">
            <p className="text-sm font-semibold text-muted-foreground">{data.length} Participants</p>
        </div>
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
