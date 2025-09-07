
import { users as allUsers } from '@/lib/data';
import { AcademicsDirectoryClient } from './academics-directory-client';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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


export default function AcademicsDirectoryPage() {
  const initialFilteredUsers = allUsers.filter(user => user.type === 'Academic');
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<DirectorySkeleton />}>
        <AcademicsDirectoryClient allUsers={initialFilteredUsers} />
      </Suspense>
    </div>
  );
}
