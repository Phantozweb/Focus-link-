import type { UserProfile } from '@/types';

export const users: UserProfile[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    type: 'Optometrist',
    experience: '15+ years in Pediatric Optometry',
    location: 'New York, NY',
    skills: ['Pediatric Optometry', 'Vision Therapy', 'Myopia Control'],
    interests: ['Community Health', 'Clinical Research', 'Mentoring'],
    bio: 'A seasoned optometrist with a passion for pediatric eye care and advanced vision therapy techniques. Dedicated to improving community eye health and mentoring the next generation of optometrists.',
    links: {
      linkedin: 'https://linkedin.com/in/evelynreed',
      email: 'e.reed@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=1',
    workExperience: [
      {
        title: 'Lead Optometrist',
        company: 'NY Vision Associates',
        startDate: 'Jan 2010',
        endDate: 'Present',
        description: 'Leading a team of optometrists and managing complex pediatric vision cases.'
      },
      {
        title: 'Associate Optometrist',
        company: 'City Eye Care',
        startDate: 'Aug 2007',
        endDate: 'Dec 2009',
        description: 'Provided comprehensive eye care services with a focus on family practice.'
      }
    ],
    education: [
      {
        school: 'SUNY College of Optometry',
        degree: 'Doctor of Optometry (OD)',
        fieldOfStudy: 'Optometry',
        startYear: '2003',
        endYear: '2007'
      }
    ],
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'Dr. Samuel Chen',
    type: 'Optometrist',
    experience: '10 years in Ocular Surface Disease',
    location: 'San Francisco, CA',
    skills: ['Specialty Contact Lenses', 'Dry Eye Management', 'Scleral Lenses'],
    interests: ['Telemedicine', 'Ocular Surface Disease', 'Practice Management'],
    bio: 'An innovative optometrist specializing in specialty contact lenses and managing complex dry eye cases. Explores the use of technology and telemedicine to enhance patient care.',
    links: {
      linkedin: 'https://linkedin.com/in/samuelchen',
      email: 's.chen@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=2',
    workExperience: [
      {
        title: 'Optometrist & Founder',
        company: 'Bay Area Dry Eye Center',
        startDate: 'Jun 2015',
        endDate: 'Present',
        description: 'Established a specialty clinic for dry eye and ocular surface disease.'
      }
    ],
    education: [
      {
        school: 'UC Berkeley School of Optometry',
        degree: 'Doctor of Optometry (OD)',
        fieldOfStudy: 'Optometry',
        startYear: '2010',
        endYear: '2014'
      }
    ],
    languages: ['English', 'Mandarin']
  },
  {
    id: '3',
    name: 'Maria Garcia',
    type: 'Student',
    experience: '3rd Year Student',
    location: 'Miami, FL',
    skills: ['Primary Care', 'Ocular Disease', 'Patient Communication'],
    interests: ['Pediatric Optometry', 'Public Health', 'Spanish-speaking communities'],
    bio: 'A dedicated third-year optometry student at Nova Southeastern University. I am passionate about serving diverse communities and have a growing interest in pediatric eye care and public health initiatives.',
    links: {
      linkedin: 'https://linkedin.com/in/mariagarcia',
      email: 'm.garcia@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=3',
    workExperience: [],
    education: [
       {
        school: 'Nova Southeastern University',
        degree: 'Doctor of Optometry (OD)',
        fieldOfStudy: 'Optometry',
        startYear: '2021',
        endYear: '2025 (Expected)'
      }
    ],
    languages: ['English', 'Spanish']
  },
  {
    id: '4',
    name: 'Dr. Ben Carter',
    type: 'Researcher',
    experience: '8 years in Sports Vision',
    location: 'Chicago, IL',
    skills: ['Sports Vision', 'Low Vision Rehabilitation', 'Performance Testing'],
    interests: ['Sports Performance', 'Assistive Technology', 'Geriatric Care'],
    bio: 'Specializes in optimizing visual performance for athletes and providing life-changing low vision rehabilitation. Committed to helping patients of all ages maximize their visual potential.',
    links: {
      linkedin: 'https://linkedin.com/in/bencarter',
      email: 'b.carter@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=4',
    workExperience: [],
    education: [],
    languages: ['English']
  },
  {
    id: '5',
    name: 'Liam Johnson',
    type: 'Student',
    experience: '4th Year Student',
    location: 'New York, NY',
    skills: ['Advanced Contact Lenses', 'Cornea and Contact Lenses', 'Clinical Skills'],
    interests: ['Scleral Lenses', 'Myopia Control', 'Clinical Research'],
    bio: 'A final-year student at SUNY College of Optometry with a strong focus on advanced contact lens fitting and myopia control. Eager to connect with practitioners who are leaders in the field.',
    links: {
      linkedin: 'https://linkedin.com/in/liamjohnson',
      email: 'l.johnson@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=5',
    workExperience: [],
    education: [],
    languages: ['English']
  },
  {
    id: '6',
    name: 'Dr. Chloe Adams',
    type: 'Optometrist',
    experience: '5 years in Medical Optometry',
    location: 'Austin, TX',
    skills: ['Ocular Disease', 'Surgical Co-management', 'Glaucoma'],
    interests: ['Glaucoma', 'Diabetic Retinopathy', 'New Technologies'],
    bio: 'A residency-trained optometrist focused on the diagnosis and management of ocular diseases. Works closely with ophthalmologists in the co-management of surgical patients.',
    links: {
      linkedin: 'https://linkedin.com/in/chloeadams',
      email: 'c.adams@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=6',
    workExperience: [],
    education: [],
    languages: ['English']
  },
  {
    id: '7',
    name: 'Dr. Kenji Tanaka',
    type: 'Academic',
    experience: '20+ years in Practice Management',
    location: 'Los Angeles, CA',
    skills: ['Private Practice', 'Myopia Control', 'Business Management'],
    interests: ['Practice Ownership', 'Optical Design', 'Mentoring'],
    bio: 'A veteran optometrist and successful private practice owner. Passionate about sharing business insights and clinical expertise in myopia control with aspiring optometrists.',
    links: {
      email: 'k.tanaka@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=7',
    workExperience: [],
    education: [],
    languages: ['English', 'Japanese']
  },
  {
    id: '8',
    name: 'Aisha Khan',
    type: 'Student',
    experience: '2nd Year Student',
    location: 'Chicago, IL',
    skills: ['Neuro-Optometry', 'Vision Therapy', 'Binocular Vision'],
    interests: ['Brain Injury Rehabilitation', 'Amblyopia', 'Binocular Vision'],
    bio: 'A second-year student at the Illinois College of Optometry, fascinated by the connection between the eyes and the brain. Keen to learn more about neuro-optometric rehabilitation.',
    links: {
      linkedin: 'https://linkedin.com/in/aishakhan',
      email: 'a.khan@example.com',
    },
    avatarUrl: 'https://picsum.photos/128/128?random=8',
    workExperience: [],
    education: [],
    languages: ['English', 'Urdu']
  },
];
