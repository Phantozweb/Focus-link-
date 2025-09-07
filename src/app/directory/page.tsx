
'use client';

import { useState } from 'react';
import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { UserProfile } from '@/types';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  }

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'all' || user.type === selectedType;

    const matchesCountry = selectedCountry === 'all' || user.location.toLowerCase().includes(selectedCountry.toLowerCase());

    return matchesSearch && matchesType && matchesCountry;
  });

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Column */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="space-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                </h3>

                 {/* Search Input */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">Keyword</label>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                          id="search"
                          placeholder="Search by name, skill..."
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
                </div>

              {/* Profile Type Filter */}
              <div>
                <h4 className="font-semibold mb-3">Profile Type</h4>
                <Select onValueChange={handleTypeChange} value={selectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a profile type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {profileTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Country Filter */}
              <div>
                <h4 className="font-semibold mb-3">Country</h4>
                <Select onValueChange={handleCountryChange} value={selectedCountry}>
                  <SelectTrigger>
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

              <Button onClick={() => { setSelectedType('all'); setSelectedCountry('all'); setSearchTerm(''); }} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Results Column */}
        <main className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Directory</h1>
            <p className="text-muted-foreground">
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
