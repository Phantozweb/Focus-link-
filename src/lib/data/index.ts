import type { UserProfile } from '@/types';
import { students } from './students';
import { professionals } from './professionals';
import { organizations } from './organizations';

export const allUsers: UserProfile[] = [...students, ...professionals, ...organizations];

export { students, professionals, organizations };
