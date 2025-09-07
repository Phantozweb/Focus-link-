
import { users as allUsers } from '@/lib/data';
import { OptometristsDirectoryClient } from './optometrists-directory-client';

export default function OptometristsDirectoryPage() {
  const initialFilteredUsers = allUsers.filter(user => user.type === 'Optometrist');
  
  return <OptometristsDirectoryClient allUsers={initialFilteredUsers} />;
}
