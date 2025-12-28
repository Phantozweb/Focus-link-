
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
    bio: 'This is a test profile for an unclaimed account. It demonstrates how a profile waiting to be claimed by a professional would appear in the directory. Claim this profile to update your details and connect with the community.',
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
  },
  {
    id: 'optobharat-unclaimed',
    name: 'OptoBharat',
    type: 'Association',
    experience: "India's Largest Optometry Student Community",
    location: 'India',
    skills: ['Student Collaboration', 'Community Outreach', 'Webinars', 'Clinical Workshops', 'Professional Development', 'Leadership Training', 'Eye Health Awareness'],
    interests: ['Student Leadership', 'Optometry Education', 'National Networking', 'Global Collaboration', 'Vision Care Innovation'],
    bio: "Welcome to OPTOBHARAT, India’s largest optometry student community, dedicated to uniting future optometrists across the nation and worldwide. We are committed to fostering collaboration, knowledge-sharing, and professional growth, empowering aspiring eye care professionals to shape the future of vision health in India and beyond.\n\nOPTOBHARAT represents \"India’s Vision\"—a movement dedicated to advancing eye care education, awareness, and innovation. At OPTOBHARAT, we believe in learning, leading, and revolutionizing vision care. Through expert-led discussions, skill-building workshops, and networking opportunities, our mission is to equip optometry students with the knowledge and support they need to excel in their careers.",
    links: {},
    avatarUrl: 'https://i.ibb.co/bX0vV53/rapd-og-image.png',
    workExperience: [],
    education: [],
    languages: ['English', 'Hindi'],
    verified: false,
    verifiedRole: 'Unclaimed',
  }
];
