
import { users as allUsers } from '@/lib/data';
import { OpticiansDirectoryClient } from './opticians-directory-client';

export default function OpticiansDirectoryPage() {
  const initialFilteredUsers = allUsers.filter(user => user.type === 'Optician');
  
  return <OpticiansDirectoryClient allUsers={initialFilteredUsers} />;
}
