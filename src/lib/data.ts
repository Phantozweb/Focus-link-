
import type { UserProfile } from '@/types';
import type { LeaderboardEntry } from '@/components/leaderboard';
import { students } from '@/lib/data/students';
import { professionals } from '@/lib/data/professionals';
import { organizations } from '@/lib/data/organizations';

export const users: UserProfile[] = [...students, ...professionals, ...organizations];

export const demoLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, avatar: 'https://iili.io/KuWfZUx.md.jpg', name: 'Sabitabrata Panja', score: 195, time: '35:10' },
  { rank: 2, avatar: 'https://i.ibb.co/fzZKkbVm/IMG-20251025-155610.jpg', name: 'Roshan Kumar', score: 192, time: '38:22' },
  { rank: 3, avatar: 'https://i.ibb.co/YF1PmkBm/IMG-20251025-170957.jpg', name: 'Mohd Atif Alam', score: 189, time: '41:05' },
  { rank: 4, avatar: 'https://i.ibb.co/v6XJ3B7X/1747244504223.jpg', name: 'Rudra Kumar Sinha', score: 185, time: '42:15' },
  { rank: 5, avatar: 'https://i.ibb.co/nZ68C4s/IMG-20251019-WA0045.jpg', name: 'Ummer Farooq', score: 181, time: '44:30' },
  { rank: 6, avatar: 'https://i.ibb.co/twWf1ngC/IMG-20251025-172851.jpg', name: 'Anshi Jha', score: 178, time: '45:01' },
  { rank: 7, avatar: 'https://i.ibb.co/wNrCZ5SW/1000245623.jpg', name: 'Harini L', score: 175, time: '46:18' },
  { rank: 8, avatar: 'https://i.ibb.co/LhnqwR5t/IMG-20251025-WA0020.jpg', name: 'V.M. Ram Kumar', score: 172, time: '48:02' },
  { rank: 9, avatar: 'https://i.ibb.co/NddTFdKy/DSC-1027.jpg', name: 'Charles Olamidoyin Laizer', score: 168, time: '49:55' },
  { rank: 10, avatar: 'https://i.ibb.co/wNH01SSV/8e04a6da-88d7-4a3e-97de-dff67da8adba-1-all-470.jpg', name: 'Sajjad Iqbal', score: 165, time: '51:12' },
  { rank: 11, avatar: 'https://picsum.photos/seed/leader11/40/40', name: 'Priya Sharma', score: 162, time: '52:00' },
  { rank: 12, avatar: 'https://picsum.photos/seed/leader12/40/40', name: 'Arjun Gupta', score: 159, time: '53:45' },
];
