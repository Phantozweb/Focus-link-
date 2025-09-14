
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
    avatarUrl: 'https://picsum.photos/seed/1/400/400',
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
    languages: ['English', 'Spanish'],
    verified: true,
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
    avatarUrl: 'https://picsum.photos/seed/2/400/400',
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
    languages: ['English', 'Mandarin'],
    verified: true,
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
    avatarUrl: 'https://picsum.photos/seed/3/400/400',
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
        description: 'Completed the first two years of the B.Sc. Optometry collaborative program.'
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
    id: '4',
    name: 'Dr. Ben Carter',
    type: 'Ophthalmologist',
    experience: '12 years in Refractive Surgery',
    location: 'Chicago, IL',
    skills: ['LASIK', 'Cataract Surgery', 'Corneal diseases'],
    interests: ['Surgical Technology', 'Patient Outcomes', 'Laser Vision Correction'],
    bio: 'A board-certified ophthalmologist specializing in vision correction surgery. Committed to providing the highest standard of surgical care and achieving excellent patient outcomes.',
    links: {
      linkedin: 'https://linkedin.com/in/bencarter',
      email: 'b.carter@example.com',
    },
    avatarUrl: 'https://picsum.photos/seed/4/400/400',
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
    avatarUrl: 'https://picsum.photos/seed/5/400/400',
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
    avatarUrl: 'https://picsum.photos/seed/6/400/400',
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
    avatarUrl: 'https://picsum.photos/seed/7/400/400',
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
    avatarUrl: 'https://picsum.photos/seed/8/400/400',
    workExperience: [],
    education: [],
    languages: ['English', 'Urdu']
  },
  {
    id: '9',
    name: 'American Optometric Association',
    type: 'Association',
    experience: 'Leading authority on quality eye care',
    location: 'St. Louis, MO',
    skills: ['Advocacy', 'Continuing Education', 'Practice Management'],
    interests: ['Public Health', 'Legislation', 'Member Resources'],
    bio: 'The American Optometric Association (AOA) is the leading professional organization for optometrists, optometry students, and paraoptometric assistants and technicians. The AOA and its affiliates work to provide the public with quality vision and eye care.',
    links: {
      linkedin: 'https://www.aoa.org/',
      email: 'info@aoa.org',
    },
    avatarUrl: 'https://picsum.photos/seed/9/400/400',
    workExperience: [],
    education: [],
    languages: [],
    verified: true,
  },
  {
    id: '10',
    name: 'UC Berkeley School of Optometry',
    type: 'College',
    experience: 'Excellence in education, research, and patient care',
    location: 'Berkeley, CA',
    skills: ['Graduate Education', 'Clinical Training', 'Vision Science Research'],
    interests: ['OD Program', 'PhD Program', 'Residency Programs'],
    bio: 'The Herbert Wertheim School of Optometry & Vision Science at the University of California, Berkeley is a world-renowned center for clinical and vision science research.',
    links: {
      linkedin: 'https://optometry.berkeley.edu/',
      email: 'optometry@berkeley.edu',
    },
    avatarUrl: 'https://picsum.photos/seed/10/400/400',
    workExperience: [],
    education: [],
    languages: [],
    verified: true,
  },
  {
    id: '11',
    name: 'Metropolitan General Hospital',
    type: 'Hospital',
    experience: 'Comprehensive Ophthalmic Services',
    location: 'Houston, TX',
    skills: ['Cataract Surgery', 'Glaucoma Treatment', 'Retinal Disorders', 'Emergency Eye Care'],
    interests: ['Patient Care', 'Surgical Excellence', 'Community Outreach'],
    bio: 'A leading hospital providing state-of-the-art ophthalmic services. Our team of dedicated ophthalmologists and optometrists offers comprehensive eye care, from routine exams to complex surgical procedures.',
    links: {
      linkedin: 'https://example.com/hospital',
      email: 'eye.care@metropolitan.org',
    },
    avatarUrl: 'https://picsum.photos/seed/11/400/400',
    workExperience: [],
    education: [],
    languages: []
  },
  {
    id: '12',
    name: 'The Visionary Optique',
    type: 'Optical',
    experience: 'Designer Eyewear & Advanced Lens Technology',
    location: 'Los Angeles, CA',
    skills: ['Luxury Eyewear', 'Custom Lens Fitting', 'Contact Lens Services'],
    interests: ['Fashion', 'Optical Technology', 'Personalized Service'],
    bio: 'An exclusive optical boutique offering a curated selection of designer eyewear and the latest in lens technology. Our experienced opticians provide personalized consultations to ensure perfect vision and style.',
    links: {
      linkedin: 'https://example.com/optical',
      email: 'contact@visionaryoptique.com',
    },
    avatarUrl: 'https://picsum.photos/seed/12/400/400',
    workExperience: [],
    education: [],
    languages: []
  },
  {
    id: '13',
    name: 'Visionary Lens Corp.',
    type: 'Industry',
    experience: 'Leading manufacturer of innovative contact lens technologies',
    location: 'Global',
    skills: ['Contact Lenses', 'Material Science', 'Optical Engineering'],
    interests: ['R&D', 'Sustainability', 'Partnerships'],
    bio: 'A global leader in the development and manufacturing of cutting-edge contact lenses and vision care products.',
    links: {
      linkedin: 'https://example.com/visionary-lens',
      email: 'partners@visionarylens.com',
    },
    avatarUrl: 'https://picsum.photos/seed/13/400/400',
    workExperience: [],
    education: [],
    languages: [],
    verified: true,
  },
  {
    id: '14',
    name: 'Ophthalmic Solutions Inc.',
    type: 'Industry',
    experience: 'Providing cutting-edge diagnostic equipment',
    location: 'Boston, MA',
    skills: ['Diagnostic Imaging', 'Ophthalmic Instruments', 'Surgical Equipment'],
    interests: ['Telehealth', 'AI in Diagnostics', 'Clinical Trials'],
    bio: 'Delivering state-of-the-art diagnostic and surgical equipment to eye care professionals worldwide.',
    links: {
      linkedin: 'https://example.com/oph-solutions',
      email: 'sales@oph-solutions.com',
    },
    avatarUrl: 'https://picsum.photos/seed/14/400/400',
    workExperience: [],
    education: [],
    languages: []
  },
  {
    id: '15',
    name: 'FrameWorks Eyewear',
    type: 'Industry',
    experience: 'Stylish and affordable eyewear for every lifestyle',
    location: 'Milan, Italy',
    skills: ['Eyewear Design', 'Fashion Trends', 'Retail Solutions'],
    interests: ['Independent Opticians', 'Sustainable Materials', 'Brand Collaborations'],
    bio: 'A design house that creates and distributes fashionable and high-quality eyewear to a global market.',
    links: {
      linkedin: 'https://example.com/frameworks',
      email: 'info@frameworks.com',
    },
    avatarUrl: 'https://picsum.photos/seed/15/400/400',
    workExperience: [],
    education: [],
    languages: []
  },
  {
    id: '16',
    name: 'Dr. Olivia Martinez',
    type: 'Ophthalmologist',
    experience: '18 years in Retina & Vitreous Surgery',
    location: 'Miami, FL',
    skills: ['Retinal Surgery', 'Macular Degeneration', 'Diabetic Retinopathy'],
    interests: ['Clinical Trials', 'Surgical Innovation', 'Medical Education'],
    bio: 'Renowned ophthalmologist and surgeon specializing in diseases of the retina. Actively involved in clinical trials for new treatments and dedicated to educating future surgeons.',
    links: {
      linkedin: 'https://linkedin.com/in/oliviamartinez',
      email: 'o.martinez@example.com',
    },
    avatarUrl: 'https://picsum.photos/seed/16/400/400',
    workExperience: [],
    education: [],
    languages: ['English', 'Spanish'],
    verified: true,
  },
  {
    id: '17',
    name: 'David Lee',
    type: 'Optician',
    experience: '20+ years as a Master Optician',
    location: 'Seattle, WA',
    skills: ['Lens Technology', 'Frame Styling', 'Advanced Dispensing'],
    interests: ['Independent Eyewear', 'Optical Management', 'Mentoring new opticians'],
    bio: 'A master optician with extensive knowledge of lens design and advanced dispensing techniques. I enjoy helping clients find the perfect eyewear that blends style and function.',
    links: {
      linkedin: 'https://linkedin.com/in/davidlee',
      email: 'd.lee@example.com',
    },
    avatarUrl: 'https://picsum.photos/seed/17/400/400',
    workExperience: [],
    education: [],
    languages: ['English'],
  },
  {
    id: '18',
    name: 'Sophia Williams',
    type: 'Optician',
    experience: '7 years in Optical Retail',
    location: 'London, UK',
    skills: ['Customer Service', 'Frame Selection', 'Contact Lens Training'],
    interests: ['Eyewear Fashion', 'Visual Merchandising', 'Patient Education'],
    bio: 'An experienced optician with a passion for helping customers find eyewear that makes them look and feel great. Skilled in frame selection and patient education.',
    links: {
      linkedin: 'https://linkedin.com/in/sophiawilliams',
      email: 's.williams@example.com',
    },
    avatarUrl: 'https://picsum.photos/seed/18/400/400',
    workExperience: [],
    education: [],
    languages: ['English'],
  },
];
