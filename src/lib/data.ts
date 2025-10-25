
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
  {
    id: '21',
    name: 'Roshan Kumar',
    type: 'Optometrist',
    experience: 'Enlightening Eyes Through Vision & Purposes',
    location: 'Ranchi, Jharkhand, India',
    skills: ['Refraction', 'Qualitative Research', 'Analytical Skills', 'Research Skills'],
    interests: ['Vision Therapy', 'Neuro Optometric Rehabilitation'],
    bio: 'A dedicated optometrist with one year of clinical experience, passionate about providing comprehensive eye care. Experienced in both hospital and specialized eye care settings, with a focus on neuro-optometric rehabilitation and a commitment to ongoing learning and research.',
    links: {
      linkedin: 'https://linkedin.com/in/roshan-kumar-7720a92b0',
      email: 'optomroshankumar@gmail.com',
    },
    avatarUrl: 'https://i.ibb.co/fzZKkbVm/IMG-20251025-155610.jpg',
    workExperience: [
      {
        title: 'Consultant Optometrist',
        company: 'Vision Probe Eye Hospital',
        startDate: 'Aug 2025',
        endDate: 'Present',
        description: 'Providing primary eye care and consultations.',
      },
      {
        title: 'Intern Optometrist',
        company: 'iRIS Superspeciality Eye Care Centre',
        startDate: 'Jul 2024',
        endDate: 'Aug 2025',
        description: 'Gained hands-on clinical experience in a superspeciality setting.',
      },
       {
        title: 'Member',
        company: 'Neuro Optometric Rehabilitation Association, International (NORA)',
        startDate: 'Feb 2024',
        endDate: 'Present',
        description: 'Active member of an international organization focused on neuro-optometric rehabilitation.',
      },
      {
        title: 'Observationship',
        company: 'iRIS Superspeciality Eye Care Centre',
        startDate: 'Dec 2023',
        endDate: 'Jan 2024',
        description: 'Observed and assisted in various clinical procedures.',
      }
    ],
    education: [
      {
        school: 'Swami Vivekanand University',
        degree: 'Bachelor of Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2021',
        endYear: '2025',
      }
    ],
    languages: ['English', 'Hindi', 'Bengali'],
    verified: true,
  },
  {
    id: '22',
    name: 'Braseetha A',
    type: 'Student',
    experience: 'Aspiring Optometrist | Pediatric & Binocular Vision Enthusiast',
    location: 'Madurai, Tamil Nadu, India',
    skills: [
      'Diagnosing and managing eye conditions', 
      'Prescribing corrective lenses', 
      'Refraction', 
      'Contact lens fitting', 
      'Instruments handling', 
      'Diagnosis & prescription management', 
      'Clinical skills & patient communication', 
      'Primary and data analysis research', 
      'Customer service & patient management',
      'Effective communication',
      'Team collaboration',
      'Analytical thinking'
    ],
    interests: ['Pediatric Vision Care', 'Binocular Vision Assessment', 'Congenital Ocular Motor Anomalies', 'Concept-based Learning', 'Peer Learning', 'Research Methodology'],
    bio: `I’m an Optometry student passionate about pediatric vision care, binocular vision assessment, and congenital ocular motor anomalies.
I love simplifying complex academic topics through concept maps, structured notes, and visual learning aids — making learning accessible and engaging.

Beyond academics, I create interactive quizzes and MCQs to support peer learning and foster curiosity in vision science.
I’m currently exploring research methodology and the psychological aspects of human behavior, enriching both my clinical and personal development.`,
    links: {
      linkedin: 'https://linkedin.com/in/braseetha-a-260b60323',
      email: 'brasee66@gmail.com',
    },
    avatarUrl: 'https://picsum.photos/seed/braseetha/400/400',
    workExperience: [
        {
          title: 'First Prize – Science Exhibition',
          company: 'VK College of Science and Optometry',
          startDate: '',
          endDate: 'Achievement',
          description: 'Won first prize in a poster competition, contributing to vision awareness through creativity and clinical insight.'
        },
        {
          title: 'Participant',
          company: 'EuyunCare',
          startDate: '',
          endDate: 'Achievement',
          description: 'Participated in the International Webinar Series on Specialty Contact Lenses, deepening my understanding of clinical care and global collaboration.'
        }
    ],
    education: [
      {
        school: 'V.K. College of Optometry',
        university: 'Alagappa University',
        degree: 'Bachelor of Optometry (B.Optom)',
        fieldOfStudy: 'Medical Sciences focused on Eye Health and Vision Care',
        startYear: '2023',
        endYear: '2027'
      }
    ],
    languages: ['English (Full Professional)', 'Tamil (Native)', 'Hindi (Limited Working)'],
    verified: false,
  },
];

export const demoLeaderboardData: LeaderboardEntry[] = [];
