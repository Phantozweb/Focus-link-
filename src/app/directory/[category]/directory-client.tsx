
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Search, SlidersHorizontal, MapPin, ChevronDown, ListFilter, Users, GraduationCap, Building, Hospital, Factory, Handshake, Stethoscope } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProfileCard } from '@/components/profile-card';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

const categories = [
    { name: 'All Profiles', filter: 'all', icon: <Users className="h-5 w-5"/> },
    { name: 'Professionals', filter: 'professionals', icon: <Stethoscope className="h-5 w-5"/> },
    { name: 'Students', filter: 'students', icon: <GraduationCap className="h-5 w-5"/> },
    { name: 'Clinics & Opticals', filter: 'clinics', icon: <Hospital className="h-5 w-5"/> },
    { name: 'Colleges', filter: 'colleges', icon: <Building className="h-5 w-5"/> },
    { name: 'Associations', filter: 'associations', icon: <Handshake className="h-5 w-5"/> },
    { name: 'Industry Partners', filter: 'industry', icon: <Factory className="h-5 w-5"/> },
];

export function DirectoryClient({ allUsers, title, category }: { allUsers: UserProfile[], title: string, category: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      const term = searchTerm.toLowerCase();
      const country = selectedCountry.toLowerCase();

      const matchesSearch = !term ||
        user.name.toLowerCase().includes(term) ||
        user.experience.toLowerCase().includes(term) ||
        user.bio.toLowerCase().includes(term) ||
        (user.skills && user.skills.some(skill => skill.toLowerCase().includes(term))) ||
        (user.interests && user.interests.some(interest => interest.toLowerCase().includes(term)));

      const matchesCountry = country === 'all' || user.location.toLowerCase().includes(country);
      
      return matchesSearch && matchesCountry;
    });
  }, [allUsers, searchTerm, selectedCountry]);

  const usersToShow = filteredUsers.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };
  
  const handleFilterChange = (key: 'q' | 'country', value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value || value === 'all') {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };


  return (
    <div>
        <div className="filter-container">
            <div className="search-box">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder={`Search in ${title}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFilterChange('q', searchTerm);
                        }
                    }}
                />
                <button className="search-btn" onClick={() => handleFilterChange('q', searchTerm)}><Search /></button>
            </div>
            
            <div className="chip-scroll">
                {categories.map(cat => (
                    <Link href={`/directory/${cat.filter}`} key={cat.filter} className={cn("chip", category === cat.filter && "active")}>
                        {cat.icon}
                        <span>{cat.name}</span>
                    </Link>
                ))}
            </div>
             <div className="advanced-filters">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="dropdown">
                            {selectedCountry === 'all' ? 'Country' : countries.find(c => c.name.toLowerCase() === selectedCountry)?.name || 'Country'}
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-60 overflow-y-auto">
                        <DropdownMenuItem onSelect={() => setSelectedCountry('all')}>All Countries</DropdownMenuItem>
                        {countries.map(country => (
                            <DropdownMenuItem key={country.code} onSelect={() => setSelectedCountry(country.name.toLowerCase())}>
                                {country.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="grid-container">
            {usersToShow.map(user => (
                <ProfileCard key={user.id} user={user} />
            ))}
        </div>

         {usersToShow.length === 0 && (
             <div className="text-center py-16 text-muted-foreground">
                <p>No profiles found matching your criteria.</p>
            </div>
        )}

        {visibleCount < filteredUsers.length && (
            <div className="load-more">
                <button className="btn-load" onClick={loadMore}>Load More</button>
            </div>
        )}
    </div>
  );
}
