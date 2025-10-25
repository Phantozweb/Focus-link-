
import type { UserProfile } from '@/types';
import type { LeaderboardEntry } from '@/components/leaderboard';
import { students } from '@/lib/data/students';
import { professionals } from '@/lib/data/professionals';
import { organizations } from '@/lib/data/organizations';

export const users: UserProfile[] = [...students, ...professionals, ...organizations];

export const demoLeaderboardData: LeaderboardEntry[] = [];
