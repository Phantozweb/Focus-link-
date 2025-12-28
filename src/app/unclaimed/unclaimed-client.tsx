
'use client';

import type { UserProfile } from '@/types';
import { ProfileCard } from '@/components/profile-card';

export function UnclaimedClient({ profiles }: { profiles: UserProfile[] }) {
  return (
    <div className="section-wrap">
        <div className="grid-container">
            {profiles.map(user => (
                <ProfileCard key={user.id} user={user} isUnclaimed />
            ))}
        </div>
    </div>
  );
}
