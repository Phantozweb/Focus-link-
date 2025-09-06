import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, ArrowRight, Lightbulb, Building, Award, Stethoscope } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileCardProps {
  user: UserProfile;
}

const getBadgeVariant = (type: UserProfile['type']) => {
  switch(type) {
    case 'Student':
    case 'Academic':
    case 'Researcher':
      return 'secondary';
    case 'Association':
    case 'College':
      return 'outline';
    default:
      return 'default';
  }
}

const getIcon = (type: UserProfile['type']) => {
  switch(type) {
    case 'Association': return <Award className="h-4 w-4 flex-shrink-0" />;
    case 'College': return <Building className="h-4 w-4 flex-shrink-0" />;
    default: return <Briefcase className="h-4 w-4 flex-shrink-0" />;
  }
}

export function ProfileCard({ user }: ProfileCardProps) {
  const isOrg = user.type === 'Association' || user.type === 'College';

  return (
    <Link href={`/${user.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={isOrg ? "logo building" : "portrait person"}/>
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="font-headline text-xl">{user.name}</CardTitle>
              <CardDescription>
                <Badge variant={getBadgeVariant(user.type)} className="mt-1">{user.type}</Badge>
              </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0"/>
                <span>{user.location}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                {getIcon(user.type)}
                <span>{user.experience}</span>
            </div>
            <div className="pt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" /> {isOrg ? 'Focus Areas' : 'Top Skills'}
                </p>
                <div className="flex flex-wrap gap-2">
                    {user.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button variant="ghost" className="w-full justify-between">
                View Profile
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
