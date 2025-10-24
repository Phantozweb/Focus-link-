
import type { UserProfile } from '@/types';
import type { LeaderboardEntry } from '@/components/leaderboard';

export const users: UserProfile[] = [
  {
    id: '19',
    name: 'Janarthan Veeramani',
    type: 'Student',
    experience: 'Founder of Focus-IN | Head of Administration at Optobharat | B.Optom Student',
    location: 'Madurai, Tamil Nadu, India',
    skills: [
      'Administration', 'Keratometry', 'Scientific Writing', 'Business Ownership', 'Start-up Leadership', 'Team Leadership', 
      'Organization Skills', 'Project Management', 'Event Planning', 'Optometry', 'Creativity Skills', 'Artificial Intelligence (AI)',
      'Microsoft Excel', 'Pediatric Vision Screening', 'Clinical Patient Counseling', 'Visual Acuity Testing'
    ],
    interests: ['AI in Optometry', 'Visual Telepathy', 'Bionic Eyes', 'Entrepreneurship', 'Student Collaboration'],
    bio: `I’m Janarthan Veeramani, a third-year B.Sc. Optometry student, on a mission to make eye care smarter, more accessible, and deeply human-centered.

My journey began at LIHSM, Coimbatore, where I discovered that my true strength lies in creative thinking, not just academics. That mindset inspired me to build the tools I once wished I had as a student—tools that support smarter learning, clinical reasoning, and collaboration.

I’m the founder of Focus-IN, a growing ecosystem of AI-powered tools designed to empower optometry students and practitioners across India. As the Head of Administration at OptoBharat, I focus on connecting fellow students, fostering collaboration, and creating opportunities for shared learning and professional growth.

I also authored the research paper “Visual Telepathy: How Bionic Eyes Could Transform Communication,” published in IJFMR, exploring how bionic vision may revolutionize the way we connect.

**"Balancing academics, clinical exposure, and development work is not easy but it's my way of transforming ideas into impact."**

A special thanks to **Mrs. Vijayalakshmi Nivethitha Krishnan (Viji Mam)**, whose mentorship helped transform me from a simple, curious student into someone who thinks with clarity, confidence, and purpose. Her influence continues to shape the vision behind everything I build.

Let’s connect and co-create the future of optometry through bold ideas, smart tools, and a vision that empowers everyone.`,
    links: {
      linkedin: 'https://www.linkedin.com/in/janarthan-v',
      email: 'janarthanv@outlook.com',
    },
    avatarUrl: 'https://iili.io/KTpEi9s.md.jpg',
    workExperience: [
      {
        title: 'Founder',
        company: 'Focus-IN',
        startDate: 'Jul 2024',
        endDate: 'Present',
        duration: '1 yr 3 mos',
        description: 'Building an ecosystem of AI-powered tools to empower optometry students and practitioners.'
      },
       {
        title: 'Head of Administration',
        company: 'OptoBharat',
        startDate: 'Jul 2025',
        endDate: 'Present',
        duration: '3 mos',
        description: 'Leading administrative functions for a national student-led organization.'
      },
      {
        title: 'Managing Director of Southern Region',
        company: 'OptoBharat',
        startDate: 'Mar 2025',
        endDate: 'Jul 2025',
        duration: '5 mos',
        description: 'Connected optometry students, supported teamwork, and created growth opportunities for the community.'
      },
      {
        title: 'Student',
        company: 'VK College of Optometry',
        startDate: 'May 2025',
        endDate: 'Present',
        duration: '5 mos',
        description: 'Continuing my third year of the B.Sc. Optometry program.'
      },
      {
        title: 'Student',
        company: 'Lotus Eye Hospital and Institute',
        startDate: 'Aug 2023',
        endDate: 'May 2025',
        duration: '1 yr 10 mos',
        description: '**Completed the first two years** of the B.Sc. Optometry collaborative program.'
      },
    ],
    education: [
      {
        school: 'VK College of Optometry',
        university: 'Alagappa University, Karaikudi',
        degree: 'B.Sc. Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2023',
        endYear: '2027 (Expected)'
      }
    ],
    languages: ['English (Professional working proficiency)', 'German (Elementary proficiency)', 'Tamil (Native or bilingual proficiency)'],
    verified: true,
  },
  {
    id: '20',
    name: 'Sabitabrata Panja',
    type: 'Optometrist',
    experience: '4 year of Clinical Optometry experience',
    location: 'West Bengal',
    skills: ['Diabetic Retinopathy', 'Contact lens', 'Dispensing optics', 'Opd diagnosis'],
    interests: ['Clinical Research', 'Low vision aids', 'Binocular rehabilitation'],
    bio: 'I am confident in handling refraction, patient counseling, dispensing of spectacles, and managing primary eye care responsibilities at a vision centre. I am fluent in Hindi, which will help me communicate effectively with patients and team members.',
    links: {
      linkedin: 'https://www.linkedin.com/in/sabitabrata-panja-50b3bb229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'sabitabratapanja1999@gmail.com',
    },
    avatarUrl: 'https://iili.io/KuWfZUx.md.jpg',
    workExperience: [
       {
        title: 'Optometrist',
        company: 'Bhoomika Eye Hospital',
        startDate: 'April 2023',
        endDate: 'Present',
        description: ''
      },
      {
        title: 'Optometrist',
        company: 'Disha Eye Hospital',
        startDate: 'June 2021',
        endDate: 'March 2023',
        description: ''
      }
    ],
    education: [
      {
        school: 'Swami vivekananda university, Barrackpore',
        degree: 'Batchelor Of Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2022',
        endYear: '2025'
      },
       {
        school: 'State Medical Faculty W.B',
        degree: 'Diploma in Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2018',
        endYear: '2021'
      }
    ],
    languages: ['Bengali', 'Hindi', 'English', 'Oriya'],
    verified: true,
  },
];

export const demoLeaderboardData: LeaderboardEntry[] = [];
