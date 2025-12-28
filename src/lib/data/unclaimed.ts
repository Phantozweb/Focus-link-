
import type { UserProfile } from '@/types';

export const unclaimedProfiles: UserProfile[] = [
  {
    id: 'unclaimed-1',
    name: 'Dr. Test Unclaimed',
    type: 'Optometrist',
    experience: 'Specialist in Cornea & External Disease',
    location: 'Anytown, USA',
    skills: ['Refractive Surgery', 'Corneal Transplants', 'Dry Eye Management'],
    interests: ['Clinical Research', 'Surgical Innovation'],
    bio: 'This is a test profile for an unclaimed account. It demonstrates how a profile waiting to be claimed by a professional would appear in the directory. Claim this profile to update its details and connect with the community.',
    links: {},
    avatarUrl: 'https://i.ibb.co/27Z4CkpY/IMG-20251004-WA0001.jpg',
    workExperience: [
      {
        title: 'Lead Optometrist',
        company: 'Visionary Eye Center',
        startDate: '2018',
        endDate: 'Present',
        description: 'Leading the cornea and external disease unit.'
      }
    ],
    education: [
      {
        school: 'Global Optometry University',
        degree: 'Doctor of Optometry (O.D.)',
        fieldOfStudy: 'Optometry',
        startYear: '2010',
        endYear: '2014',
        university: 'Global Optometry University'
      }
    ],
    languages: ['English'],
    verified: false,
    verifiedRole: 'Unclaimed',
  }
];
