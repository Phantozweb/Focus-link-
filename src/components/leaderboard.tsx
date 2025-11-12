
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allUsers } from '@/lib/data';
import Link from 'next/link';

export type LeaderboardEntry = {
  rank: number;
  avatar: string;
  name: string;
  score: string;
  time: string;
};

const finalLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Rudra Kumar Sinha', score: '97.5%', time: '24:11', avatar: 'https://i.ibb.co/v6XJ3B7X/1747244504223.jpg' },
  { rank: 2, name: 'Farhan Sheikh', score: '96.0%', time: '31:57', avatar: '' },
  { rank: 3, name: 'Gurman kaur', score: '94.5%', time: '25:39', avatar: '' },
  { rank: 4, name: 'Sofia Petrova', score: '94.0%', time: '28:10', avatar: '' },
  { rank: 5, name: 'Rahul sharma', score: '94.0%', time: '32:18', avatar: '' },
  { rank: 6, name: 'P.kaviya', score: '93.5%', time: '13:39', avatar: '' },
  { rank: 7, name: 'Kritika Dey', score: '93.5%', time: '23:48', avatar: '' },
  { rank: 8, name: 'Naushaba Afreen', score: '93.0%', time: '17:42', avatar: '' },
  { rank: 9, name: 'Abdurrahman', score: '93.0%', time: '45:10', avatar: '' },
  { rank: 10, name: 'Chukwudi Ezeh', score: '92.5%', time: '24:16', avatar: '' },
  { rank: 11, name: 'Alex Ray', score: '92.0%', time: '18:30', avatar: '' },
  { rank: 12, name: 'Mohd Atif Alam', score: '91.5%', time: '19:59', avatar: 'https://i.ibb.co/YF1PmkBm/IMG-20251025-170957.jpg' },
  { rank: 13, name: 'Ashirvad Tiwari', score: '90.0%', time: '19:56', avatar: '' },
  { rank: 14, name: 'Divya Kumari', score: '89.0%', time: '40:35', avatar: '' },
  { rank: 15, name: 'Mohd Danish', score: '88.5%', time: '30:10', avatar: '' },
  { rank: 16, name: 'Ummer Farooq', score: '87.5%', time: '15:10', avatar: 'https://i.ibb.co/nZ68C4s/IMG-20251019-WA0045.jpg' },
  { rank: 17, name: 'Shruti Kulkarni', score: '87.5%', time: '21:27', avatar: '' },
  { rank: 18, name: 'Maria Garcia', score: '87.5%', time: '25:05', avatar: '' },
  { rank: 19, name: 'T N Akshatha', score: '87.5%', time: '39:33', avatar: '' },
  { rank: 20, name: 'Sahib Ansari', score: '86.5%', time: '40:41', avatar: '' },
  { rank: 21, name: 'Mohd Arman', score: '85.5%', time: '23:54', avatar: '' },
  { rank: 22, name: 'Roshan Mehta', score: '85.5%', time: '25:54', avatar: '' },
  { rank: 23, name: 'Harini L', score: '84.5%', time: '16:18', avatar: 'https://i.ibb.co/wNrCZ5SW/1000245623.jpg' },
  { rank: 24, name: 'Ben Carter', score: '84.5%', time: '22:45', avatar: '' },
  { rank: 25, name: 'Yuvarani', score: '84.5%', time: '28:59', avatar: '' },
  { rank: 26, name: 'Priyadharshini kumar', score: '84.0%', time: '33:35', avatar: '' },
  { rank: 27, name: 'Karthika', score: '83.5%', time: '16:20', avatar: '' },
  { rank: 28, name: 'Nithesh S Shetty', score: '83.0%', time: '26:26', avatar: '' },
  { rank: 29, name: 'Nandini Suresh', score: '82.5%', time: '41:48', avatar: '' },
  { rank: 30, name: 'Nkechi Anozie', score: '82.0%', time: '29:26', avatar: '' },
  { rank: 31, name: 'David Lee', score: '82.0%', time: '35:50', avatar: '' },
  { rank: 32, name: 'Appu Raj', score: '82.0%', time: '45:43', avatar: '' },
  { rank: 33, name: 'Kemi Onasanya', score: '81.5%', time: '15:20', avatar: '' },
  { rank: 34, name: 'Marwan K', score: '81.0%', time: '18:04', avatar: '' },
  { rank: 35, name: 'Neelesh', score: '79.5%', time: '29:29', avatar: '' },
  { rank: 36, name: 'Omotola Adebisi', score: '78.5%', time: '33:00', avatar: '' },
  { rank: 37, name: 'Haziel Rynjah', score: '78.0%', time: '50:53', avatar: '' },
  { rank: 38, name: 'Priya Singh', score: '77.0%', time: '31:15', avatar: '' },
  { rank: 39, name: 'Emeka Uzo', score: '76.5%', time: '34:25', avatar: '' },
  { rank: 40, name: 'Charles Olamidoyin LAIZER', score: '75.0%', time: '23:31', avatar: 'https://i.ibb.co/NddTFdKy/DSC-1027.jpg' },
  { rank: 41, name: 'Yashwant', score: '74.5%', time: '26:23', avatar: '' },
  { rank: 42, name: 'Priya Joseph', score: '74.5%', time: '42:58', avatar: '' },
  { rank: 43, name: 'Keerthana P', score: '73.5%', time: '29:05', avatar: '' },
  { rank: 44, name: 'Aisha Bello', score: '72.5%', time: '25:00', avatar: '' },
  { rank: 45, name: 'Noel Fernandes', score: '70.5%', time: '22:22', avatar: '' },
  { rank: 46, name: 'Firoz Ahmed', score: '68.5%', time: '34:47', avatar: '' },
  { rank: 47, name: 'zainab ansari', score: '66.5%', time: '33:37', avatar: '' },
  { rank: 48, name: 'Femi Adebayo', score: '65.0%', time: '26:16', avatar: '' },
  { rank: 49, name: 'Leo Chen', score: '64.8%', time: '25:25', avatar: '' },
  { rank: 50, name: 'Sahbaj khan', score: '64.5%', time: '20:42', avatar: '' },
];


export function Leaderboard({ itemsPerPage = 10 }: { itemsPerPage?: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const data = finalLeaderboardData;

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
            {currentData.map((entry) => {
              const userProfile = allUsers.find(u => u.name === entry.name);
              return (
                <TableRow key={entry.rank}>
                  <TableCell className="text-center font-bold text-lg">
                      <div className="flex items-center justify-center gap-2">
                          {entry.rank <= 3 ? <Trophy className={cn("h-5 w-5", getRankColor(entry.rank))} /> : <span className={cn("h-5 w-5 flex items-center justify-center", getRankColor(entry.rank))}>{entry.rank}</span>}
                      </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userProfile?.avatarUrl || entry.avatar} alt={entry.name} />
                        <AvatarFallback>{entry.name ? entry.name.charAt(0) : '?'}</AvatarFallback>
                      </Avatar>
                      {userProfile ? (
                        <Link href={`/profile/${userProfile.id}`} className="font-medium hover:underline hover:text-primary">
                          {entry.name}
                        </Link>
                      ) : (
                        <span className="font-medium">{entry.name}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{entry.score}</TableCell>
                  <TableCell className="text-right">{entry.time}</TableCell>
                </TableRow>
              );
            })}
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
