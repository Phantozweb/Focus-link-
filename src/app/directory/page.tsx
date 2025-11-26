

'use client';

import { useState, useEffect, useMemo } from 'react';
import { allUsers } from '@/lib/data/index';
import { ProfileCard } from '@/components/profile-card';
import { useRouter, useSearchParams } from 'next/navigation';
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
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const categories = [
    { name: 'All', filter: 'all' },
    { name: 'Professionals', filter: 'professionals' },
    { name: 'Students', filter: 'students' },
    { name: 'Clinics', filter: 'clinics' },
    { name: 'Partners', filter: 'industry' },
];

export default function DirectoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all');
  const [visibleCount, setVisibleCount] = useState(12);

   const handleFilterChange = (key: 'q' | 'country', value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value || value === 'all') {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/directory/all${query}`);
  };

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
  
  const recommendedUsers = useMemo(() => {
    const featuredIds = ['marwankorath', '10', '13', 'DrishtiKit'];
    return featuredIds
      .map(id => allUsers.find(user => user.id === id))
      .filter((user): user is UserProfile => user !== undefined);
  }, [allUsers]);

  const usersToShow = filteredUsers.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <div className="bg-brand-bg">
      <header className="hero">
        <h1>Directory</h1>
        <p className="mb-8">Connect with peers in the global eye care community.</p>
        <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search name, clinic, or keyword..."
                className="w-full pl-12 h-12 rounded-full bg-white/90 text-slate-800 placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilterChange('q', searchTerm)}
              />
            </div>
        </div>
      </header>
        
        <div className="tabs-container">
            <div className="glass-tab-bar">
              {categories.map(cat => (
                <Link href={`/directory/${cat.filter}`} key={cat.filter} className={cn("tab-pill", 'all' === cat.filter && "active")}>
                    {cat.name}
                </Link>
              ))}
            </div>
        </div>
        
        <div className="section-wrap">
            <div className="section-header">
                <div className="sec-title"><Star className="h-5 w-5 text-amber-400" /> Top Recommended</div>
            </div>
            <div className="rec-scroll">
                {recommendedUsers.map(user => <ProfileCard key={user.id} user={user} isFeatured />)}
            </div>
        </div>
        
        <div className="section-wrap">
            <div className="section-header">
                <div className="sec-title">All Profiles</div>
            </div>
            <div className="grid-container">
                {usersToShow.map(user => (
                    <ProfileCard key={user.id} user={user} />
                ))}
            </div>
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
