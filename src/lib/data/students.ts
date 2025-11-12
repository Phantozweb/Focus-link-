
import type { UserProfile } from '@/types';

export const students: UserProfile[] = [
    {
    id: '1',
    name: 'Janarthan Veeramani',
    type: 'Student',
    experience: 'Founder of FocusLinks | Head of Administration at Optobharat | B.Optom Student',
    location: 'Madurai, Tamil Nadu, India',
    isFounder: true,
    skills: [
      'Administration', 'Keratometry', 'Scientific Writing', 'Business Ownership', 'Start-up Leadership', 'Team Leadership', 
      'Organization Skills', 'Project Management', 'Event Planning', 'Optometry', 'Creativity Skills', 'Artificial Intelligence (AI)',
      'Microsoft Excel', 'Pediatric Vision Screening', 'Clinical Patient Counseling', 'Visual Acuity Testing'
    ],
    interests: ['AI in Optometry', 'Visual Telepathy', 'Bionic Eyes', 'Entrepreneurship', 'Student Collaboration'],
    bio: `I’m Janarthan Veeramani, a third-year B.Sc. Optometry student and the founder of FocusLinks, on a mission to make eye care smarter, more accessible, and deeply human-centered.

My journey began at LIHSM, Coimbatore, where I discovered that my true strength lies in creative thinking, not just academics. That mindset inspired me to build the tools I once wished I had as a student—tools that support smarter learning, clinical reasoning, and collaboration for the global eye care community.

As the Head of Administration at OptoBharat, I focus on connecting fellow students, fostering collaboration, and creating opportunities for shared learning and professional growth.

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
        company: 'FocusLinks',
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
    id: '2',
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
    avatarUrl: '',
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
          description: 'Participated in the International Webinar Series on Specialty Contact Lenses, deepening my understanding of clinical care and global collaboration in optometry.'
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
  {
    id: '3',
    name: 'Anshi Jha',
    type: 'Student',
    experience: 'Optometry Intern | Head of Clinical Development (Focus-IN)',
    location: 'Etawah, Uttar Pradesh, India',
    skills: [
      'Vision Testing & Eye Examination',
      'Patient Communication & Education',
      'Refraction (Optometry) & Diagnostic Techniques',
      'Clinical Training & Workshop Design',
      'Research Methodology & Data Analysis',
      'Myopia Management & Ocular Health Awareness'
    ],
    interests: ['Myopia Management', 'Binocular Vision', 'AI in Eye Care'],
    bio: `I am a Bachelor of Optometry student at Uttar Pradesh University of Medical Sciences with a growing passion for clinical innovation, patient care, and global vision science.

As the Head of Clinical Development at Focus-IN, I lead and design training initiatives, coordinate clinical research projects, and mentor fellow students in evidence-based optometric practice. My work bridges academic knowledge with real-world applications—helping aspiring clinicians build confidence and competence in diverse areas of optometry.

My goal is to build a career that combines clinical leadership with education and research, creating platforms where future optometrists can learn, share, and grow toward global clinical excellence.`,
    links: {
      linkedin: 'https://linkedin.com/in/anshi-jha-6a98b0310',
      email: '12anshijha@gmail.com',
    },
    avatarUrl: 'https://i.ibb.co/twWf1ngC/IMG-20251025-172851.jpg',
    workExperience: [
      {
        title: 'Optometry Intern',
        company: 'L V Prasad Eye Institute',
        startDate: 'July 2025',
        endDate: 'Present',
        description: 'Performing comprehensive eye examinations, vision testing, and assisting in specialized clinics to enhance patient management skills.'
      },
      {
        title: 'Head of Clinical Development',
        company: 'Focus-IN',
        startDate: 'September 2025',
        endDate: 'Present',
        description: 'Oversee clinical content and training modules. Collaborate with professionals to design workshops on clinical refraction, binocular vision, and ocular disease management.'
      },
      {
        title: 'Regional Contributor & Student Representative',
        company: 'OptoBharat (Central Zone)',
        startDate: 'March 2025',
        endDate: 'Present',
        description: 'Supporting student engagement and vision awareness projects across India through collaborations and community events.'
      },
      {
        title: '2nd Place – World Optometry Week 2025 Quiz Competition',
        company: 'UPUMS',
        startDate: '',
        endDate: 'Achievement',
        description: 'Secured second place in a university-level optometry quiz competition.'
      }
    ],
    education: [
      {
        school: 'Uttar Pradesh University of Medical Sciences',
        university: 'Uttar Pradesh University of Medical Sciences',
        degree: 'Bachelor of Optometry (B.Optom)',
        fieldOfStudy: 'Optometry',
        startYear: '2021',
        endYear: '2025 (Expected)'
      }
    ],
    languages: ['English (Full Professional)', 'Hindi (Native or Bilingual)'],
    verified: true,
  },
  {
    id: '7',
    name: 'M. Mega Dharshini',
    type: 'Student',
    experience: 'B.Optom Student',
    location: 'Tirunelveli, Tamil Nadu, India',
    skills: [
        'Vision Examination & Refraction',
        'Auto-Refractometer (AR) & NCT Operation',
        'Patient Handling & Consultation',
        'Systematic Review & Research',
        'Poster Presentation'
    ],
    interests: ['Dispensing Optics', 'Contact Lenses', 'Community Outreach'],
    bio: 'A third-year Optometry student with leadership experience as the State Head for Optobharat in Tamil Nadu. Passionate about community outreach, dispensing optics, and contact lenses. Proven research and presentation skills through systematic reviews and conference participation.',
    links: {
      email: 'megadharshini999@gmail.com'
    },
    avatarUrl: '',
    workExperience: [
      {
        title: 'State Head - Tamil Nadu',
        company: 'Optobharat',
        startDate: '',
        endDate: '',
        description: 'Led state-level initiatives and student engagement for a prominent optometry organization.'
      },
      {
        title: 'Community Eye Camp Participant',
        company: 'Vision Screening Camps',
        startDate: '',
        endDate: '5 Camps',
        description: 'Assisted with vision screenings and patient management in community settings.'
      }
    ],
    education: [
      {
        school: 'VK College of Optometry',
        university: 'VK College of Optometry, Madurai',
        degree: 'Bachelor of Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '',
        endYear: 'Present (Third Year)'
      }
    ],
    languages: ['English', 'Tamil'],
    verified: false,
  },
  {
    id: '11',
    name: 'Rudra Kumar Sinha',
    type: 'Student',
    experience: 'Optometry Intern at CL Gupta Eye Institute | B.Optometry Student',
    location: 'Moradabad, Uttar Pradesh, India',
    skills: [
      'Refraction', 'Applanation Tonometer', 'Marketing and Outreach', 'Patient Counseling', 'Teamwork'
    ],
    interests: ['Innovation in healthcare', 'Contact Lenses', 'Ocular Diseases', 'Vision Science'],
    bio: `I’m Rudra Kumar Sinha, a dedicated and enthusiastic optometry intern at CL Gupta Eye Institute, currently pursuing a Bachelor of Optometry at Chandigarh University. My core interests lie in contact lenses, ocular diseases, and vision science innovation. With a strong academic foundation and hands-on clinical exposure, I’ve conducted research on AI-based digital handheld ophthalmoscopes — exploring how technology can revolutionize eye care in underserved regions. As a former Class Representative, I honed my leadership and teamwork skills, while also winning multiple cultural and sports awards, showcasing my dynamic personality. I’m a confident public speaker, a strong believer in interdisciplinary collaboration, and someone who thrives in learning-rich environments. I aim to bring value to eye care through a blend of clinical expertise, research insight, and people-centered communication. Let’s connect to collaborate, learn, and grow in the field of optometry and beyond!`,
    links: {
      linkedin: 'https://www.linkedin.com/in/rudra-kumar-sinha-29499617a',
      email: 'rudrakumarsinha4@gmail.com',
    },
    avatarUrl: 'https://i.ibb.co/v6XJ3B7X/1747244504223.jpg',
    workExperience: [
      {
        title: 'Intern Optometrist',
        company: 'C L Gupta Eye Institute',
        startDate: 'Jul 2025',
        endDate: 'Present',
        description: ''
      }
    ],
    education: [
      {
        school: 'Chandigarh University',
        university: 'Chandigarh University',
        degree: 'Bachelor of Optometry',
        fieldOfStudy: 'Medical',
        startYear: '2022',
        endYear: '2026'
      }
    ],
    languages: ['English (Full Professional)', 'Hindi (Full Professional)', 'Bhojpuri (Professional Working)'],
    verified: true,
  },
  {
    id: '21',
    name: 'Esakkiammal Iyyappan',
    type: 'Student',
    experience: 'Master of Optometry Student | Former Clinical Optometrist',
    location: 'Chennai, Tamil Nadu, India',
    skills: [
      'Comprehensive Eye Examination', 'Pediatric Refraction', 'Orthoptic Evaluations', 'Specialty Contact Lens Fitting (Soft, RGP, Scleral)',
      'Diagnostic Procedures (OCT, Biometry, Fundus Photography, VF Analysis)', 'Patient Counseling', 'Academic Tutoring', 'Low Vision & Rehabilitation'
    ],
    interests: ['Pediatric Optometry', 'Contact Lenses', 'Low Vision', 'Evidence-Based Practice', 'Clinical Research'],
    bio: `I am Optom. Esakkiammal Iyyappan, passionate about advancing vision care through clinical excellence and continuous learning. With experience as both a Clinical Optometrist and Academic Tutor at the renowned Aravind Eye Hospital, I have a strong foundation in patient care and education.

My goal is to bridge the gap between practice and education. I am currently pursuing a Master of Optometry at The Sankara Nethralaya Academy to further specialize and contribute to improving visual health through evidence-based practice, research, and teaching.`,
    links: {
      linkedin: 'https://www.linkedin.com/in/esakkiammal-iyyappan-263953217',
      email: 'dhanasriiyyappan2020@gmail.com',
    },
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQGqudTp058K9g/profile-displayphoto-crop_800_800/B56ZpaKBmYKEAI-/0/1762449170789?e=1764806400&v=beta&t=I8iXNg6bkBhjaw8LvLO4oFfyGkxhWJ01yQLEd3qdRoU',
    workExperience: [
      {
        title: 'Clinical Optometrist & Academic Tutor',
        company: 'Aravind Eye Care System',
        startDate: 'Aug 2024',
        endDate: 'Aug 2025',
        description: 'Efficiently managed and performed comprehensive eye examinations daily for over 3700 patients, conducted over 140 classes for students, and specialized in pediatric refraction and orthoptic evaluations. Gained proficiency in a wide range of diagnostic procedures and specialty contact lens fitting.'
      },
      {
        title: 'Optometry Intern',
        company: 'Bejan Singh Eye Hospital',
        startDate: 'Feb 2023',
        endDate: 'Mar 2024',
        description: 'Completed a comprehensive internship gaining foundational clinical experience.'
      }
    ],
    education: [
      {
        school: 'The Sankara Nethralaya Academy',
        university: 'Sankara Nethralaya',
        degree: 'Master of Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2025',
        endYear: '2027'
      },
      {
        school: 'Bejan Singh Institute of Ophthalmology',
        university: 'Tamil Nadu Dr. M.G.R. Medical University',
        degree: 'Bachelor of Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2019',
        endYear: '2024'
      }
    ],
    languages: ['English (Professional)', 'Tamil (Native)', 'Malayalam (Limited)'],
    verified: true,
  },
  {
    id: 'IN20251102095356',
    name: 'Monalisa Behera',
    type: 'Student',
    experience: 'First-Year Optometry Student',
    location: 'Khurda, Odisha, India',
    skills: [],
    interests: ['Content Creation', 'Eye Care Awareness', 'Public Health'],
    bio: "Hi everyone! I’m Monalisa, a first‑year Optometry student at Trilochan School of Optometry. I’m passionate about all aspects of eye health and love creating engaging content to raise awareness about the importance of optometry and proper eye care.",
    links: {
      linkedin: 'https://www.linkedin.com/in/monalisa-behera-997361321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'monalisabehers30@gmail.com',
    },
    avatarUrl: 'https://i.ibb.co/q3nPKVwx/IMG-20250825-203303-668.webp',
    workExperience: [],
    education: [
      {
        school: 'Trilochan school of Optometry, Sambalpur',
        university: 'Trilochan Netralaya School of Optometry',
        degree: 'B.Sc. Optometry',
        fieldOfStudy: 'Optometry',
        startYear: '2024',
        endYear: '2028',
      }
    ],
    languages: ['English', 'Hindi', 'Odia'],
    verified: true,
  }
];

    