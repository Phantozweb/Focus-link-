
import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, User, Building, Mail, UserPlus, MapPin, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  user: UserProfile;
  hideButton?: boolean;
  isFeatured?: boolean;
}

export function ProfileCard({ user, hideButton, isFeatured }: ProfileCardProps) {
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
  
  const getAvatarHint = () => {
    if (isOrg) return "logo building";
    return "portrait person";
  }

  const FallbackIcon = isOrg ? Building : User;

  return (
    <div className={cn("profile-card", isFeatured && "featured")}>
      {isFeatured && <div className="feat-badge">Featured</div>}
      <div className="avatar-wrap">
        <Avatar className="w-20 h-20 border-2 border-white shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={getAvatarHint()} />
            <AvatarFallback className="bg-slate-200">
                <FallbackIcon className="h-10 w-10 text-slate-400" />
            </AvatarFallback>
        </Avatar>
        {user.verified && (
          <CheckCircle2 className="verified" />
        )}
      </div>
      <div className="p-name">{user.name}</div>
      <div className="p-specialty">{user.experience}</div>
      <div className="p-location"><MapPin className="h-3 w-3"/> {user.location}</div>
      <p className="p-bio">{user.bio}</p>
      
      {!hideButton && (
        <div className="card-actions">
          <Link href={`/profile/${user.id}`} className="btn-profile">View Profile</Link>
          {user.links?.email && (
            <a href={`mailto:${user.links.email}`} className="btn-icon">
              <Mail className="h-5 w-5"/>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
