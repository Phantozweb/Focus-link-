
import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface ProfileCardProps {
  user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
  
  const getAvatarHint = () => {
    if (isOrg) return "logo building";
    if (user.type === 'Student') return "portrait person";
    return "portrait person";
  }
  
  const getBannerHint = () => {
     if (isOrg) return "office building";
     if (user.type === 'Student') return "university campus";
     return "abstract pattern";
  }

  return (
      <div className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg h-full">
        <div className="relative">
            <Image alt={`${user.name} Banner`} className="w-full h-24 object-cover rounded-t-lg" src={`https://picsum.photos/seed/${user.id}b/400/100`} width={400} height={100} data-ai-hint={getBannerHint()} />
            <Avatar className="w-20 h-20 rounded-full object-cover absolute -bottom-10 left-6 border-4 border-white shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" data-ai-hint={getAvatarHint()} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex flex-1 flex-col p-6 pt-12">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {user.name}
              {user.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
            </h3>
            <p className="text-sm text-cyan-600">{user.experience}</p>
            <p className="text-sm text-gray-500 flex-grow mt-2">{user.bio.substring(0,100)}...</p>
            <div className="flex gap-2 mt-4">
                <Button asChild className="h-10 flex-1" variant="outline">
                  <Link href={`/profile/${user.id}`}>View Profile</Link>
                </Button>
            </div>
        </div>
    </div>
  )
}
