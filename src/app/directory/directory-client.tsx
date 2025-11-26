
'use client';

import { useState, useMemo, Suspense } from 'react';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { countries } from '@/lib/countries';
import { Search, Users, GraduationCap, Building, Hospital, Factory, Handshake, Stethoscope, Star } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProfileCard } from '@/components/profile-card';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

const categories = [
    { name: 'All', filter: 'all' },
    { name: 'Professionals', filter: 'professionals' },
    { name: 'Students', filter: 'students' },
    { name: 'Clinics', filter: 'clinics' },
    { name: 'Partners', filter: 'industry' },
];

function DirectoryComponent({ allUsers, title, category }: { allUsers: UserProfile[], title: string, category: string }) {
  const router = useRouter();
  const pathname = usePathname();
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
    router.push(`${pathname}${query}`);
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
    let featuredIds: string[];

    if (category === 'students') {
        featuredIds = ['3', '11', '21']; // Anshi Jha, Rudra Kumar, Esakkiammal Iyyappan
    } else if (category === 'clinics' || category === 'industry') {
        return []; // No recommended section for these categories
    } else {
        featuredIds = ['marwankorath', '10', '13', 'DrishtiKit'];
    }

    return featuredIds
      .map(id => allUsers.find(user => user.id === id))
      .filter((user): user is UserProfile => user !== undefined);
  }, [allUsers, category]);

  const usersToShow = filteredUsers.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <div>
        <div className="tabs-container">
            <div className="glass-tab-bar">
              {categories.map(cat => (
                <Link href={`/directory/${cat.filter}`} key={cat.filter} className={cn("tab-pill", category === cat.filter && "active")}>
                    {cat.name}
                </Link>
              ))}
            </div>
        </div>
        
        {recommendedUsers.length > 0 && (
            <div className="section-wrap">
                <div className="section-header">
                    <div className="sec-title"><Star className="h-5 w-5 text-amber-400" /> Top Recommended</div>
                </div>
                <div className="rec-scroll">
                    {recommendedUsers.map(user => <ProfileCard key={user.id} user={user} isFeatured />)}
                </div>
            </div>
        )}
        
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

export default function DirectoryPageClient() {
    return (
        <Suspense>
            <DirectoryComponent allUsers={[]} title="All Profiles" category="all" />
        </Suspense>
    );
}
