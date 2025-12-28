
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
    skills: ['Student Collaboration', 'Community Outreach', 'Webinars & Events', 'Clinical Workshops', 'Professional Development', 'Leadership Training', 'Eye Health Awareness', 'Global Networking'],
    interests: ['Student Leadership', 'Optometry Education', 'National Networking', 'Global Collaboration', 'Vision Care Innovation', 'Public Health'],
    bio: "OPTOBHARAT is India’s largest and most impactful optometry student community, dedicated to uniting and empowering the next generation of eye care professionals across the nation and the globe. Our mission is to foster education, innovation, and collaboration in the field of optometry.\n\nOur community serves as a vibrant hub for knowledge-sharing, skill enhancement, and professional networking. We bridge the gap between academic learning and real-world clinical practice through expert-led discussions, hands-on workshops, and global interactions. By joining us, students, practitioners, and educators gain access to exclusive resources, career guidance, and mentorship opportunities designed to foster excellence and leadership in vision care.",
    links: {
        website: 'https://optobharat.simdif.com/'
    },
    avatarUrl: 'https://optobharat.simdif.com/images/public/sd_67d31b9eda24f.png?no_cache=1741890071',
    workExperience: [],
    education: [],
    languages: ['English', 'Hindi'],
    verified: false,
    verifiedRole: 'Unclaimed',
  }
];
