"use client";

import { useState, useMemo } from 'react';
import type { UserProfile } from '@/types';
import { users as allUsers } from '@/lib/data';
import { suggestConnections } from '@/ai/flows/suggest-connections';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfileCard } from '@/components/profile-card';
import { Loader2, Search, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const locations = Array.from(new Set(allUsers.map((user) => user.location)));
const allSkills = Array.from(new Set(allUsers.flatMap((user) => user.skills)));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState<UserProfile[]>(allUsers);
  const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);
  const { toast } = useToast();

  const filteredUsers = useMemo(() => {
    if (isShowingSuggestions) {
      return displayedUsers;
    }

    return allUsers.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const locationMatch = locationFilter ? user.location === locationFilter : true;
      const typeMatch = userTypeFilter ? user.type === userTypeFilter : true;
      const skillMatch = skillFilter ? user.skills.includes(skillFilter) : true;
      return nameMatch && locationMatch && typeMatch && skillMatch;
    });
  }, [searchQuery, locationFilter, skillFilter, userTypeFilter, displayedUsers, isShowingSuggestions]);
  
  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setIsShowingSuggestions(true);
    try {
      const student = allUsers.find(user => user.type === 'Student');
      if (!student) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No student profile found to base suggestions on.',
        });
        return;
      }
      
      const optometrists = allUsers.filter(user => user.type === 'Optometrist');
      
      const result = await suggestConnections({
        studentInterests: student.interests.join(', '),
        studentExperience: student.experience,
        studentLocation: student.location,
        optometristProfiles: JSON.stringify(optometrists),
      });

      const suggestedProfiles: UserProfile[] = JSON.parse(result.suggestions);
      const suggestedIds = new Set(suggestedProfiles.map(p => p.id));
      setDisplayedUsers(allUsers.filter(u => suggestedIds.has(u.id)));

    } catch (error) {
      console.error('Failed to get suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: 'Could not generate connection suggestions at this time.',
      });
      setIsShowingSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setSkillFilter('');
    setUserTypeFilter('');
    setDisplayedUsers(allUsers);
    setIsShowingSuggestions(false);
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-headline font-bold text-primary tracking-tight sm:text-5xl lg:text-6xl">Find Your Connection</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Discover and connect with optometrists and students from around the world.
        </p>
      </div>

      <div className="p-6 bg-card rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                placeholder="e.g. Dr. Jane Doe"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (isShowingSuggestions) setIsShowingSuggestions(false);
                }}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Filter by Location</label>
            <Select value={locationFilter} onValueChange={(value) => { setLocationFilter(value === 'all' ? '' : value); if (isShowingSuggestions) setIsShowingSuggestions(false); }}>
              <SelectTrigger><SelectValue placeholder="All Locations" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Filter by Type</label>
            <Select value={userTypeFilter} onValueChange={(value) => { setUserTypeFilter(value === 'all' ? '' : value); if (isShowingSuggestions) setIsShowingSuggestions(false); }}>
              <SelectTrigger><SelectValue placeholder="All Users" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="Optometrist">Optometrists</SelectItem>
                <SelectItem value="Student">Students</SelectItem>
                <SelectItem value="Academic">Academics</SelectItem>
                <SelectItem value="Researcher">Researchers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium">Filter by Skill</label>
            <Select value={skillFilter} onValueChange={(value) => { setSkillFilter(value === 'all' ? '' : value); if (isShowingSuggestions) setIsShowingSuggestions(false); }}>
              <SelectTrigger><SelectValue placeholder="All Skills" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {allSkills.map(spec => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button onClick={handleGetSuggestions} disabled={isLoadingSuggestions}>
            {isLoadingSuggestions ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Suggest Connections
          </Button>
          {(isShowingSuggestions || locationFilter || skillFilter || searchQuery || userTypeFilter) && (
            <Button variant="outline" onClick={clearFilters}>Clear</Button>
          )}
        </div>
      </div>

      {isShowingSuggestions && (
        <Alert className="mb-8 bg-primary/10 border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-headline">AI-Powered Suggestions</AlertTitle>
          <AlertDescription>
            Showing connections suggested for a student interested in Pediatric Optometry.
          </AlertDescription>
        </Alert>
      )}

      {isLoadingSuggestions ? (
        <div className="text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">Generating AI suggestions...</p>
        </div>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((user) => (
                <ProfileCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold">No Profiles Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters, or clear them to see all profiles.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </>
      )}

    </div>
  );
}
