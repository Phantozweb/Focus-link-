
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
import { Card } from '@/components/ui/card';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

const categoryLinks = [
    { name: 'Students', icon: <GraduationCap className="h-8 w-8" />, href: '/directory/students', description: 'Find the next generation of talent.' },
    { name: 'Professionals', icon: <Briefcase className="h-8 w-8" />, href: '/directory/professionals', description: 'Connect with experienced ODs.' },
    { name: 'Associations', icon: <Building className="h-8 w-8" />, href: '/directory/associations', description: 'Explore leading organizations.' },
    { name: 'Clinics & Opticals', icon: <Hospital className="h-8 w-8" />, href: '/directory/clinics', description: 'Discover top-rated practices.' },
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

  const handleSearch = (type?: string) => {
    let path = '/directory/all';
    if(type) {
        if (type === 'Optometrist') path = '/directory/professionals';
        else if (type === 'Student') path = '/directory/students';
        else if (type === 'Association') path = '/directory/associations';
        else if (type === 'Hospital') path = '/directory/clinics';
    }
    const queryString = createQueryString({
      q: searchTerm,
      type: type || selectedType,
      country: selectedCountry,
    });
    router.push(`${path}?${queryString}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedCountry('all');
    router.push(pathname);
  };
  
  const handleCategoryClick = (href: string) => {
    router.push(href);
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
    if(typeParam && typeParam !== 'all') {
        if(typeParam === 'professionals') {
            matchesType = professionalTypes.includes(user.type);
        } else if (typeParam === 'clinics') {
            matchesType = clinicTypes.includes(user.type);
        } else if (typeParam === 'associations') {
            matchesType = user.type === 'Association';
        }
         else if (typeParam === 'students') {
            matchesType = user.type === 'Student';
        } else {
            matchesType = user.type.toLowerCase() === typeParam;
        }
    }

    const matchesCountry = !countryParam || countryParam === 'all' || user.location.toLowerCase().includes(countryParam.toLowerCase());

    return matchesSearch && matchesType && matchesCountry;
  });

  const category = searchParams.get('type') || 'all';

  if (category !== 'all') {
      return (
         <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Button variant="outline" onClick={() => router.push('/directory')}>
                   Back to Directory
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
                            <Button className="w-full md:w-auto h-12" onClick={() => handleSearch()}>Search</Button>
                        </div>
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
            <main className="lg:col-span-3">
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline capitalize">{pathname.split('/').pop()}</h1>
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
      )
  }


  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold font-headline mb-2">FocusLink Directory</h1>
        <p className="text-lg text-muted-foreground">Explore the global eye care community. Find colleagues, mentors, and partners.</p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {categoryLinks.map(link => (
                <Link href={link.href} key={link.name}>
                    <Card className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary transition-all duration-300 text-primary h-full">
                        <div className="mb-4">
                            {link.icon}
                        </div>
                        <h3 className="mt-3 font-semibold text-xl text-slate-800">{link.name}</h3>
                        <p className="text-slate-600 text-center">{link.description}</p>
                    </Card>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
