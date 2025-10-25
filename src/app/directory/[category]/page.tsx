
import { allUsers } from '@/lib/data/index';
import type { UserProfile } from '@/types';
import { DirectoryClient } from './directory-client';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
         <Skeleton className="h-64 w-full" />
      </aside>
      <main className="lg:col-span-3">
        <div className="mb-6">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </main>
    </div>
  )
}

export default function DirectoryCategoryPage({ params }: DirectoryCategoryPageProps) {
  const category = params.category || 'all';
  
  const validCategories = ['students', 'associations', 'colleges', 'clinics', 'industry', 'all', 'professionals'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const clinicTypes: UserProfile['type'][] = ['Hospital', 'Optical'];
  const professionalTypes: UserProfile['type'][] = ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'];

  const initialFilteredUsers = allUsers.filter(user => {
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

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<DirectorySkeleton />}>
        <DirectoryClient allUsers={initialFilteredUsers} title={getTitle(category)} category={category} />
      </Suspense>
    </div>
  );
}
