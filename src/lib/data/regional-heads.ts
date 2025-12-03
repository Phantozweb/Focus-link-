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
    avatarUrl: 'https://i.ibb.co/kV2bMWH8/Invoice-Logo-Sun-Nov-30-21-41-48-GMT-03-00-2025.jpg',
    links: {
      email: 'sildamba20@gmail.com',
      linkedin: 'https://silvestermangongo.com.free'
    }
  }
];
