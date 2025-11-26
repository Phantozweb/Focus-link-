


import { allUsers } from '@/lib/data/index';
import type { UserProfile } from '@/types';
import { DirectoryClient } from './directory-client';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type DirectoryCategoryPageProps = {
  params: { category: string }
};

const getTitle = (category: string) => {
    switch(category) {
        case 'students': return 'Students';
        case 'professionals': return 'Professionals';
        case 'associations': return 'Associations';
        case 'colleges': return 'Colleges & Schools';
        case 'clinics': return 'Clinics & Opticals';
        case 'industry': return 'Industry Partners';
        case 'all':
        default: return 'All Profiles';
    }
}

export function generateMetadata({ params }: DirectoryCategoryPageProps): Metadata {
  const category = params.category || 'all';
  const title = getTitle(category);

  return {
    title: `${title} | Focus Links Directory`,
    description: `Browse and search for ${title.toLowerCase()} in the Focus Links global eye care community. Connect with peers and leaders in the industry.`,
  };
}

function DirectorySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-80 w-full" />
      ))}
    </div>
  )
}

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};


export default function DirectoryCategoryPage({ params }: DirectoryCategoryPageProps) {
  const category = params.category || 'all';
  
  const validCategories = ['students', 'associations', 'colleges', 'clinics', 'industry', 'all', 'professionals'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const clinicTypes: UserProfile['type'][] = ['Hospital', 'Optical'];
  const professionalTypes: UserProfile['type'][] = ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'];

  let filteredUsers = allUsers.filter(user => {
      switch (category) {
        case 'students':
          return user.type === 'Student';
        case 'professionals':
            return professionalTypes.includes(user.type);
        case 'associations':
          return user.type === 'Association';
        case 'colleges':
          return user.type === 'College';
        case 'clinics':
          return clinicTypes.includes(user.type);
        case 'industry':
          return user.type === 'Industry';
        case 'all':
        default:
          return true;
      }
  });

  if (category === 'all') {
    filteredUsers = shuffleArray(filteredUsers);
  }

  return (
    <div className="bg-brand-bg">
        <header className="hero">
            <h1>{getTitle(category)}</h1>
            <p className="mb-8">Connect with peers in the global eye care community.</p>
             <Suspense fallback={<Skeleton className="h-12 w-full max-w-md mx-auto rounded-full" />}>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        placeholder="Search name, clinic, or keyword..."
                        className="w-full pl-12 h-12 rounded-full bg-white/90 text-slate-800 placeholder:text-slate-500"
                        />
                    </div>
                </div>
            </Suspense>
        </header>
        <main>
            <Suspense fallback={<DirectorySkeleton />}>
                <DirectoryClient allUsers={filteredUsers} title={getTitle(category)} category={category} />
            </Suspense>
        </main>
    </div>
  );
}
