import type { UserProfile } from '@/types';
import { students } from './students';
import { professionals } from './professionals';
import { organizations } from './organizations';
import { unclaimedProfiles } from './unclaimed';

export const allUsers: UserProfile[] = [...students, ...professionals, ...organizations, ...unclaimedProfiles];

export { students, professionals, organizations };
