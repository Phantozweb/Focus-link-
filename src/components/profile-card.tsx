
import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, User, Building, Mail, UserPlus, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  user: UserProfile;
  hideButton?: boolean;
}

export function ProfileCard({ user, hideButton }: ProfileCardProps) {
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
  const isPro = ['Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher'].includes(user.type);
  const isStudent = user.type === 'Student';
  
  const getAvatarHint = () => {
    if (isOrg) return "logo building";
    return "portrait person";
  }

  const getBadge = () => {
    if (isPro) return <span className="role-badge badge-pro">Pro</span>;
    if (isStudent) return <span className="role-badge badge-student">Student</span>;
    if (isOrg) return <span className="role-badge badge-org">Org</span>;
    return null;
  }

  return (
    <div className="profile-card">
      {getBadge()}
      <div className="avatar-wrap">
        <img 
          src={user.avatarUrl || `https://i.pravatar.cc/300?u=${user.id}`} 
          alt={user.name}
          className="avatar"
        />
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
