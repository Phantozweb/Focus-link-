import type { UserProfile } from '@/types';

export type RegionalHead = Pick<UserProfile, 'id' | 'name' | 'avatarUrl' | 'experience' | 'links'> & {
    region: string;
};

export const regionalHeads: RegionalHead[] = [
  {
    id: 'silvester-ogweno',
    name: "Silvester Ogweno Mang'ong'o",
    region: 'Kenya',
    experience: 'Regional Head of Kenya | B.Sc. Optometry Student',
    avatarUrl: 'https://i.ibb.co/PZmfcWqH/IMG-20251203-110801.jpg',
    links: {
      email: 'sildamba20@gmail.com',
      linkedin: ''
    }
  }
];
