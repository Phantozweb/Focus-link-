
import { unclaimedProfiles } from '@/lib/data/unclaimed';
import { UnclaimedClient } from './unclaimed-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unclaimed Profiles | Focus Links',
  description: 'Browse profiles that are waiting to be claimed by eye care professionals. If you see your profile, claim it to update your details and connect with the community.',
};

export default function UnclaimedPage() {
  return (
    <div className="bg-brand-bg">
        <header className="hero">
            <h1>Unclaimed Profiles</h1>
            <p className="mb-8">These profiles are waiting to be claimed. If you see yours, claim it!</p>
        </header>
        <main>
            <UnclaimedClient profiles={unclaimedProfiles} />
        </main>
    </div>
  );
}
