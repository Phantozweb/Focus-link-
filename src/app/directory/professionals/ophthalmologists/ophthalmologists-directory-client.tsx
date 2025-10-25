
'use client';

import { useState } from 'react';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Search, SlidersHorizontal, ArrowLeft, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { UserProfile } from '@/types';

export function OphthalmologistsDirectoryClient({ allUsers }: { allUsers: UserProfile[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all');
  const [sortedUsers, setSortedUsers] = useState<UserProfile[]>(allUsers);
  const [isSorted, setIsSorted] = useState(false);

  const createQueryString = (newParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(searchParams);
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
    const queryString = createQueryString({
      q: searchTerm,
      country: selectedCountry,
    });
    router.push(`/directory/professionals/ophthalmologists?${queryString}`);
  };

  const sortByLocation = () => {
    const usersToSort = [...filteredUsers];
    usersToSort.sort((a, b) => a.location.localeCompare(b.location));
    setSortedUsers(usersToSort);
    setIsSorted(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('all');
    setIsSorted(false);
    setSortedUsers(allUsers);
    router.push(`/directory/professionals/ophthalmologists`);
  };

  const filteredUsers = allUsers.filter(user => {
    const usersToFilter = isSorted ? sortedUsers : allUsers;
    const searchParam = searchParams.get('q');
    const countryParam = searchParams.get('country');

    const matchesSearch = !searchParam ||
      user.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchParam.toLowerCase())) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchParam.toLowerCase()));

    const matchesCountry = !countryParam || countryParam === 'all' || user.location.toLowerCase().includes(countryParam.toLowerCase());

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <Button variant="outline" onClick={() => router.push('/directory/professionals')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Professionals
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
                          />
                      </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="sr-only">Country</label>
                    <Select onValueChange={(v) => setSelectedCountry(v)} value={selectedCountry}>
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
                  <Button onClick={handleSearch} className="w-full">Apply Filters</Button>
                  <Button onClick={clearFilters} variant="outline" className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold font-headline">Ophthalmologist Directory</h1>
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
    </div>
  );
}

    