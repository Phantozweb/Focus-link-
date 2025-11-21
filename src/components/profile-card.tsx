import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, User, Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  user: UserProfile;
  hideButton?: boolean;
}

export function ProfileCard({ user, hideButton }: ProfileCardProps) {
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
  
  const getAvatarHint = () => {
    if (isOrg) return "logo building";
    if (user.type === 'Student') return "portrait person";
    return "portrait person";
  }

  const isDrishtiKit = user.id === 'DrishtiKit';

  return (
    <div className="profile-card">
        <div className="avatar-wrapper">
            <Avatar className="w-full h-full border-4 border-blue-50">
              {user.avatarUrl ? (
                <AvatarImage 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className={cn(isDrishtiKit ? "object-contain p-2" : "object-cover")}
                    data-ai-hint={getAvatarHint()} />
              ) : (
                <AvatarFallback className="text-avatar">
                  {isOrg ? <Building className="h-10 w-10" /> : user.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            {user.verified && (
                <div className="verified-badge">
                    <CheckCircle2 className="h-5 w-5" />
                </div>
            )}
        </div>
        <h3 className="p-name">{user.name}</h3>
        <span className="p-role">{user.experience}</span>
        <p className="p-desc">{user.bio}</p>
        {!hideButton && (
          <Button asChild className="btn-view">
            <Link href={`/profile/${user.id}`}>View Profile</Link>
          </Button>
        )}
    </div>
  )
}
