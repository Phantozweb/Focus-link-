
import { users as allUsers } from '@/lib/data';
import { AcademicsDirectoryClient } from './academics-directory-client';

export default function AcademicsDirectoryPage() {
  const initialFilteredUsers = allUsers.filter(user => user.type === 'Academic');
  
  return <AcademicsDirectoryClient allUsers={initialFilteredUsers} />;
}
