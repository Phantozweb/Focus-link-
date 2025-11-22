
'use client';

import { useState, useEffect, useMemo } from 'react';
import { allUsers } from '@/lib/data/index';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, GraduationCap, Building, Hospital, Users, Factory, Handshake, Stethoscope, MapPin, ListFilter, ChevronDown, Search } from 'lucide-react';
import type { UserProfile } from '@/types';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { countries } from '@/lib/countries';

const categories = [
    { name: 'All Profiles', filter: 'all', icon: <Users className="h-5 w-5"/> },
    { name: 'Professionals', filter: 'professionals', icon: <Stethoscope className="h-5 w-5"/> },
    { name: 'Students', filter: 'students', icon: <GraduationCap className="h-5 w-5"/> },
    { name: 'Clinics & Opticals', filter: 'clinics', icon: <Hospital className="h-5 w-5"/> },
    { name: 'Colleges', filter: 'colleges', icon: <Building className="h-5 w-5"/> },
    { name: 'Associations', filter: 'associations', icon: <Handshake className="h-5 w-5"/> },
    { name: 'Industry Partners', filter: 'industry', icon: <Factory className="h-5 w-5"/> },
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
        const term = searchTerm.toLowerCase();
        const country = selectedCountry.toLowerCase();

        const matchesSearch = !term ||
            user.name.toLowerCase().includes(term) ||
            user.experience.toLowerCase().includes(term) ||
            user.bio.toLowerCase().includes(term) ||
            user.type.toLowerCase().includes(term) ||
            (user.skills && user.skills.some(skill => skill.toLowerCase().includes(term))) ||
            (user.interests && user.interests.some(interest => interest.toLowerCase().includes(term)));
        
        const matchesCountry = country === 'all' || user.location.toLowerCase().includes(country);

        if (!matchesSearch || !matchesCountry) return false;

        if (activeCategory === 'all') return true;

        const professionalTypes: UserProfile['type'][] = ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'];
        const clinicTypes: UserProfile['type'][] = ['Hospital', 'Optical'];

        switch (activeCategory) {
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
            default:
                return true;
        }
    });
  }, [searchTerm, activeCategory, selectedCountry]);

  const usersToShow = filteredUsers.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1>Global Directory</h1>
        <p>Connect with the world's leading vision care professionals.</p>
      </header>

       <div className="filter-container">
        <div className="search-box">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by name, clinic, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn"><Search className="h-5 w-5"/></button>
        </div>

        <div className="chip-scroll">
          {categories.map(cat => (
             <Link href={`/directory/${cat.filter}`} key={cat.filter} className={cn("chip", activeCategory === cat.filter && "active")}>
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
            <button className="btn-load" onClick={loadMore}>Load More Profiles</button>
        </div>
      )}

    </div>
  );
}
