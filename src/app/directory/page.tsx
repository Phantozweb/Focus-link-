
'use client';

import { useState } from 'react';
import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Search, SlidersHorizontal, Briefcase, GraduationCap, Building, Hospital } from 'lucide-react';
import type { UserProfile } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const categoryLinks = [
    { name: 'Students', icon: <GraduationCap className="h-8 w-8" />, type: 'Student' },
    { name: 'Professionals', icon: <Briefcase className="h-8 w-8" />, type: 'Optometrist' },
    { name: 'Associations', icon: <Building className="h-8 w-8" />, type: 'Association' },
    { name: 'Clinics & Opticals', icon: <Hospital className="h-8 w-8" />, type: 'Hospital' },
];

export default function DirectoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all');

  const createQueryString = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(params)) {
        if (value === 'all' || !value) {
            newSearchParams.delete(key);
        } else {
            newSearchParams.set(key, value);
        }
    }
    return newSearchParams.toString();
  };

  const handleSearch = () => {
    const queryString = createQueryString({
      q: searchTerm,
      type: selectedType,
      country: selectedCountry,
    });
    router.push(`${pathname}?${queryString}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedCountry('all');
    router.push(pathname);
  };
  
  const handleCategoryClick = (type: string) => {
    const professionalTypes = ['Optometrist', 'Academic', 'Researcher'];
    const clinicTypes = ['Hospital', 'Optical'];
    
    let typesToFilter: string[] = [];
    if (type === 'Optometrist') {
      typesToFilter = professionalTypes;
    } else if (type === 'Hospital') {
        typesToFilter = clinicTypes;
    } else {
        typesToFilter = [type];
    }
    
    setSelectedType(type);
    const queryString = createQueryString({ type });
    router.push(`${pathname}?${queryString}`);
  }


  const filteredUsers = allUsers.filter(user => {
    const currentParams = new URLSearchParams(searchParams);
    const typeParam = currentParams.get('type');
    const countryParam = currentParams.get('country');
    const searchParam = currentParams.get('q');

    const matchesSearch = !searchParam ||
      user.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchParam.toLowerCase())) ||
      user.interests.some(interest => interest.toLowerCase().includes(searchParam.toLowerCase()));

    const professionalTypes = ['Optometrist', 'Academic', 'Researcher'];
    const clinicTypes = ['Hospital', 'Optical'];

    let matchesType = !typeParam || typeParam === 'all';
    if(typeParam) {
        if(typeParam === 'Optometrist') {
            matchesType = professionalTypes.includes(user.type);
        } else if (typeParam === 'Hospital') {
            matchesType = clinicTypes.includes(user.type);
        } else {
            matchesType = user.type === typeParam;
        }
    }

    const matchesCountry = !countryParam || countryParam === 'all' || user.location.toLowerCase().includes(countryParam.toLowerCase());

    return matchesSearch && matchesType && matchesCountry;
  });

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
       {/* Category cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 font-headline">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryLinks.map(link => (
                <button
                    key={link.name}
                    onClick={() => handleCategoryClick(link.type)}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary transition-all duration-300 text-primary"
                >
                    {link.icon}
                    <p className="mt-3 font-semibold text-lg text-slate-700">{link.name}</p>
                </button>
            ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Column */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="space-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                </h3>

                <div className="p-2 rounded-lg bg-white border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                        <div className="flex-grow w-full">
                            <label className="relative flex items-center">
                                <Search className="absolute left-3 text-gray-500 h-5 w-5" />
                                <Input 
                                    className="form-input w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500" 
                                    placeholder="Keyword..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </label>
                        </div>
                        <Button className="w-full md:w-auto h-12" onClick={handleSearch}>Search</Button>
                    </div>
                </div>

              {/* Profile Type Filter */}
              <div>
                <h4 className="font-semibold mb-3">Profile Type</h4>
                <Select onValueChange={(v) => setSelectedType(v)} value={selectedType}>
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
                <Select onValueChange={(v) => setSelectedCountry(v)} value={selectedCountry}>
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

              <Button onClick={clearFilters} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Results Column */}
        <main className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Directory Results</h1>
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
