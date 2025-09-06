export type UserProfile = {
  id: string;
  name: string;
  type: 'Optometrist' | 'Student';
  registeredNumber: string;
  experience: string;
  location: string;
  specialties: string[];
  interests: string[];
  bio: string;
  links: {
    linkedin?: string;
    email?: string;
  };
  avatarUrl: string;
};
