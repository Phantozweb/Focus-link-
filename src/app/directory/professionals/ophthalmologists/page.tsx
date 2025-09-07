
import { users as allUsers } from '@/lib/data';
import { OphthalmologistsDirectoryClient } from './ophthalmologists-directory-client';

export default function OphthalmologistsDirectoryPage() {
  const initialFilteredUsers = allUsers.filter(user => user.type === 'Ophthalmologist');
  
  return <OphthalmologistsDirectoryClient allUsers={initialFilteredUsers} />;
}
