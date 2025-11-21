
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '@/types';
import { countries } from '@/lib/countries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, SlidersHorizontal } from 'lucide-react';
import { logSearch } from '@/lib/activity-logger';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry', 'Ophthalmologist', 'Optician'];

export function HomepageSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // Can be 'all', 'forum', 'jobs', or a profile type
  const [filterCountry, setFilterCountry] = useState('all');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const handleSearch = () => {
    setIsFilterDialogOpen(false);
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);

    logSearch(`🔍 **Homepage Search:**
*   **Query:** \`${searchTerm || 'none'}\`
*   **Type:** \`${filterType}\`
*   **Country:** \`${filterCountry}\``
    );

    let path = '/directory/all'; // Default search path

    if (filterType === 'forum') {
        path = '/forum';
    } else if (filterType === 'jobs') {
        path = '/jobs';
    } else if (filterType !== 'all') {
        // It's a profile type, map to the correct category
        const categoryMap: { [key: string]: string } = {
            'Student': 'students',
            'Optometrist': 'professionals',
            'Ophthalmologist': 'professionals',
            'Optician': 'professionals',
            'Academic': 'professionals',
            'Researcher': 'professionals',
            'Association': 'associations',
            'College': 'colleges',
            'Hospital': 'clinics',
            'Optical': 'clinics',
            'Industry': 'industry',
        };
        const category = categoryMap[filterType] || 'all';
        path = `/directory/${category}`;
        if (filterCountry !== 'all') {
          params.set('country', filterCountry);
        }
    } else { // 'all' profiles
       if (filterCountry !== 'all') {
          params.set('country', filterCountry);
       }
    }
    
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <div className="search-box">
        <Input
            className="search-input"
            placeholder="Search by name, skill, job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
             <button className="filter-btn">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="sr-only">Advanced Filters</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Advanced Search</DialogTitle>
              <DialogDescription>
                Narrow down your search by content type and location.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="filter-type" className="text-right">
                  Content
                </Label>
                <div className="col-span-3">
                  <Select onValueChange={setFilterType} value={filterType}>
                    <SelectTrigger id="filter-type">
                      <SelectValue placeholder="All Content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Profiles</SelectItem>
                      <SelectItem value="forum">Case Forum</SelectItem>
                      <SelectItem value="jobs">Job Board</SelectItem>
                      <SelectGroup>
                        <SelectLabel>Profile Types</SelectLabel>
                        {profileTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {filterType !== 'forum' && filterType !== 'jobs' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="filter-country" className="text-right">
                    Country
                  </Label>
                  <div className="col-span-3">
                    <Select onValueChange={setFilterCountry} value={filterCountry}>
                      <SelectTrigger id="filter-country">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries.map(country => (
                          <SelectItem key={country.code} value={country.name.toLowerCase()}>{country.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleSearch} className="w-full">Apply Filters & Search</Button>
          </DialogContent>
        </Dialog>

        <button className="search-btn" onClick={handleSearch}>
            Search
        </button>
      </div>
  );
}
