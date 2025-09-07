
import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, Linkedin, Globe, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface ProfileCardProps {
  user: UserProfile;
}

const getBadgeVariant = (type: UserProfile['type']) => {
  switch(type) {
    case 'Student': return 'secondary';
    case 'Academic': return 'secondary';
    case 'Researcher': return 'secondary';
    case 'Association':
    case 'College':
    case 'Hospital':
    case 'Optical':
    case 'Industry': return 'outline';
    default: return 'default';
  }
}


export function ProfileCard({ user }: ProfileCardProps) {
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
  
  if(isOrg) {
    return (
       <div className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg h-full">
          <div className="relative">
              <Image alt={`${user.name} Banner`} className="w-full h-24 object-cover rounded-t-lg" src={`https://picsum.photos/seed/${user.id}b/400/100`} width={400} height={100} data-ai-hint="office building" />
              <Avatar className="w-20 h-20 rounded-full object-cover absolute -bottom-10 left-6 border-4 border-white shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="logo building" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
          </div>
          <div className="flex flex-1 flex-col p-6 pt-16">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {user.name}
                {user.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
              </h3>
              <p className="text-sm text-gray-500 flex-grow mt-2">{user.bio.substring(0,100)}...</p>
              <div className="flex gap-2 mt-4">
                  <Button asChild className="h-10 flex-1" variant="outline">
                    <Link href={`/${user.id}`}>View Profile</Link>
                  </Button>
              </div>
          </div>
      </div>
    )
  }

  return (
    <div className="group flex flex-col sm:flex-row rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg h-full">
      <div className="w-full sm:w-1/3">
        <Image alt={user.name} className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none" src={user.avatarUrl} width={200} height={300} data-ai-hint="portrait person" />
      </div>
      <div className="flex flex-1 flex-col p-6 w-full sm:w-2/3">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          {user.name}
          {user.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
        </h3>
        <p className="text-sm text-cyan-600">{user.experience}</p>
        <p className="mt-2 text-sm text-gray-500 flex-grow">{user.bio.substring(0, 70)}...</p>
        <div className="mt-4 space-y-2">
           {user.links.email && <a className="flex items-center text-sm text-gray-600 hover:text-cyan-600" href={`mailto:${user.links.email}`}><Mail className="mr-2 h-4 w-4" /> {user.links.email}</a>}
           {user.links.linkedin && <a className="flex items-center text-sm text-gray-600 hover:text-cyan-600" href={user.links.linkedin}><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>}
        </div>
        <div className="flex gap-2 mt-4">
           <Button asChild className="h-10 flex-1" variant="outline">
              <Link href={`/${user.id}`}>View Profile</Link>
            </Button>
        </div>
      </div>
    </div>
  )
}
