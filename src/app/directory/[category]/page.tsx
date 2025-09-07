
import { users as allUsers } from '@/lib/data';
import type { UserProfile } from '@/types';
import { DirectoryClient } from './directory-client';
import { notFound } from 'next/navigation';

export default function DirectoryCategoryPage({ params }: { params: { category: string } }) {
  const category = params.category || 'all';
  
  const validCategories = ['students', 'associations', 'colleges', 'clinics', 'industry', 'all', 'professionals'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const clinicTypes: UserProfile['type'][] = ['Hospital', 'Optical'];
  const professionalTypes: UserProfile['type'][] = ['Optometrist', 'Academic', 'Researcher', 'Ophthalmologist', 'Optician'];

  const initialFilteredUsers = allUsers.filter(user => {
      switch (category) {
        case 'students':
          return user.type === 'Student';
        case 'professionals':
            return professionalTypes.includes(user.type);
        case 'associations':
          return user.type === 'Association';
        case 'colleges':
          return user.type === 'College';
        case 'clinics':
          return clinicTypes.includes(user.type);
        case 'industry':
          return user.type === 'Industry';
        case 'all':
        default:
          return true;
      }
  });

  const getTitle = () => {
      switch(category) {
          case 'students': return 'Students';
          case 'professionals': return 'Professionals';
          case 'associations': return 'Associations';
          case 'colleges': return 'Colleges & Schools';
          case 'clinics': return 'Clinics & Opticals';
          case 'industry': return 'Industry Partners';
          case 'all':
          default: return 'All Profiles';
      }
  }

  return <DirectoryClient allUsers={initialFilteredUsers} title={getTitle()} category={category} />;
}
