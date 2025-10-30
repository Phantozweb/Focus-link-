
'use client';

import { useState, useTransition, useMemo, useEffect } from 'react';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Search, SlidersHorizontal, ArrowLeft, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { UserProfile } from '@/types';
import { logSearch } from '@/lib/activity-logger';

export function DirectoryClient({ allUsers, title, category }: { allUsers: UserProfile[], title: string, category: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all');
  const [sortedUsers, setSortedUsers] = useState<UserProfile[]>(allUsers);
  const [isSorted, setIsSorted] = useState(false);

   useEffect(() => {
    // When the initial user list changes (e.g., from navigation), reset sorting.
    setSortedUsers(allUsers);
    setIsSorted(false);
  }, [allUsers]);

  const createQueryString = (newParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    for (const [key, value] of Object.entries(newParams)) {
      if (value === 'all' || !value) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    }
    return currentParams.toString();
  };

  const handleSearch = () => {
     startTransition(() => {
      const queryString = createQueryString({
        q: searchTerm,
        country: selectedCountry,
      });
      logSearch(`**Directory Search in \`${title}\`:**
*   **Query:** \`${searchTerm || 'none'}\`
*   **Country:** \`${selectedCountry}\``
      );
      router.push(`/directory/${category}?${queryString}`);
    });
  };
  
  const sortByLocation = () => {
    const usersToSort = [...filteredUsers];
    usersToSort.sort((a, b) => a.location.localeCompare(b.location));
    setSortedUsers(usersToSort);
    setIsSorted(true);
  };

  const clearFilters = () => {
    startTransition(() => {
      setSearchTerm('');
      setSelectedCountry('all');
      setIsSorted(false);
      router.push(`/directory/${category}`);
    });
  };

  const filteredUsers = useMemo(() => {
    const searchParam = searchParams.get('q')?.toLowerCase() || '';
    const countryParam = searchParams.get('country')?.toLowerCase() || 'all';

    let usersToFilter = allUsers;

    if (isSorted) {
      usersToFilter = sortedUsers;
    }
    
    return usersToFilter.filter(user => {
      const matchesCountry = countryParam === 'all' || user.location.toLowerCase().includes(countryParam);

      if (!matchesCountry) return false;

      if (!searchParam) return true;

      // Check all relevant text fields for the search term
      return (
        user.name.toLowerCase().includes(searchParam) ||
        user.experience.toLowerCase().includes(searchParam) ||
        user.location.toLowerCase().includes(searchParam) ||
        user.bio.toLowerCase().includes(searchParam) ||
        user.type.toLowerCase().includes(searchParam) ||
        (user.skills && user.skills.some(skill => skill.toLowerCase().includes(searchParam))) ||
        (user.interests && user.interests.some(interest => interest.toLowerCase().includes(searchParam))) ||
        (user.workExperience && user.workExperience.some(exp => 
          exp.title.toLowerCase().includes(searchParam) ||
          exp.company.toLowerCase().includes(searchParam)
        )) ||
        (user.education && user.education.some(edu => 
          edu.school.toLowerCase().includes(searchParam) ||
          edu.degree.toLowerCase().includes(searchParam)
        ))
      );
    });
  }, [allUsers, searchParams, isSorted, sortedUsers]);


  return (
    <div className="bg-background">
        <div className="mb-8">
            <Button variant="outline" onClick={() => router.push('/directory')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory Hub
            </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="space-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </h3>

                <div className="space-y-4">
                  <div>
                      <label htmlFor="search" className="sr-only">Search</label>
                      <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <Search className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                              id="search"
                              placeholder="Keyword..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                              className="pl-10"
                              disabled={isPending}
                          />
                      </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="sr-only">Country</label>
                    <Select onValueChange={(v) => setSelectedCountry(v)} value={selectedCountry} disabled={isPending}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.map(country => (
                          <SelectItem key={country.code} value={country.name.toLowerCase()}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                    <Button onClick={sortByLocation} variant="secondary" className="w-full">
                        <Map className="mr-2 h-4 w-4" /> Sort by Location
                    </Button>
                </div>

                <div className="space-y-2">
                  <Button onClick={handleSearch} className="w-full" disabled={isPending}>Apply Filters</Button>
                  <Button onClick={clearFilters} variant="outline" className="w-full" disabled={isPending}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold font-headline">{title}</h1>
              <p className="text-muted-foreground mt-1">
                Showing {filteredUsers.length} of {allUsers.length} results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => <ProfileCard key={user.id} user={user} />)
              ) : (
                <div className="md:col-span-2 text-center py-16">
                  <p className="text-lg text-muted-foreground">No profiles match your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>
    </div>
  );
}
