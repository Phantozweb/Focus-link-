
export type Webinar = {
  id: string;
  title: string;
  description: string;
  speaker: {
    name:string;
    title: string;
    avatarUrl: string;
  };
  host: {
    name: string;
    title: string;
  };
  platform: 'Google Meet' | 'Zoom' | 'Other' | 'Online Platform';
  dateTime: string; // ISO 8601 format (e.g., "2025-10-05T04:30:00Z")
  duration: string;
  tags: string[];
  registrationLink: string;
  type: 'Webinar' | 'Quiz' | 'Course';
  attendance?: {
    registered: number;
    attended: number;
  };
};

export const webinars: Webinar[] = [
    {
    id: 'interactive-retinoscopy-course',
    title: 'Interactive Retinoscopy: Master Objective Refraction',
    description: `**"From Fundamentals to Final Prescription: Your AI-Powered Guide to Mastering Retinoscopy."**

This 5-day interactive course is designed to transform your understanding and execution of retinoscopy, one of the most crucial skills for any eye care practitioner. Using a blend of AI-narrated videos, 3D models, and hands-on simulations, you will move from theory to practical mastery.

### Why This Course is Different
This isn't a passive lecture series. We use cutting-edge technology to create a dynamic learning environment:
- **AI-Powered Simulations:** Practice your technique on a variety of virtual patients with AI-driven feedback.
- **3D Interactive Models:** Explore a virtual retinoscope to understand every component in detail.
- **Gamified Learning:** Test your knowledge with interactive quizzes, timed challenges, and video-based assessments.

---QUIZ_MODULES_TABLE---
| Module | Topic | Interactive Elements |
|---|---|---|
| 1 | **Introduction to Retinoscopy** | AI-narrated video, historical quiz. |
| 2 | **The Retinoscope Deep Dive** | Interactive 3D model of a retinoscope. |
| 3 | **Setting Up for Success** | Animated setup guide & interactive checklist. |
| 4 | **Working Distance Mastery** | Simulation for adjusting and calculating working distance. |
| 5 | **Decoding the Reflex** | Video demos & reflex identification exercises. |
| 6 | **Core Retinoscopy Techniques** | In-depth tutorials on spot, streak, and cylinder. |
| 7 | **Understanding the Optical Cross** | Animated explanations and a tool for plotting findings. |
| 8 | **Calculating the Final Rx** | Step-by-step guides and an interactive calculator. |
| 9 | **Cross Retinoscopy in 3 Steps** | Quick-reference video tutorials. |
| 10 | **Practice Makes Perfect** | Advanced simulator with diverse patient cases. |
| 11 | **Troubleshooting Common Issues** | AI-powered diagnostic tool for problem-solving. |
| 12 | **Final Assessment & Certification**| Comprehensive final exam for course certification. |

### Who Should Attend?
This course is invaluable for optometry students, interns, and early-career optometrists who want to build deep confidence and precision in their objective refraction skills.
`,
    speaker: {
      name: 'Janarthan Veeramani',
      title: 'Course Visionary & Founder',
      avatarUrl: 'https://iili.io/KTpEi9s.md.jpg'
    },
    host: {
      name: 'Focus Links Academy',
      title: 'Official Organizer'
    },
    platform: 'Online Platform',
    dateTime: '2025-11-15T00:00:00Z',
    duration: '5 days',
    tags: ['Retinoscopy', 'Objective Refraction', 'Clinical Skills', 'Course', 'AI in Optometry'],
    registrationLink: '#',
    type: 'Course',
  },
  {
    id: 'webinar-clik-1',
    title: 'Contact Lens Induced Keratitis',
    description: "As our **inaugural event** on the Focus Links platform, this session on Contact Lens Induced Keratitis (CLIK) was a memorable success. Despite some initial technical lag, our esteemed speaker, **Abhishek Kumar Banaita**, delivered an insightful presentation on the pathophysiology, diagnosis, and management of CLIK. The session truly came alive during the Q&A portion, where the engagement from our participants was phenomenal. We extend our heartfelt thanks to our organizer, **Mohd Asad**, for making this milestone event possible.",
    speaker: {
      name: 'Abhishek Kumar Banaita',
      title: 'Cataract Educator and Cornea Consultant at LVPEI KVC campus',
      avatarUrl: 'https://i.ibb.co/27Z4CkpY/IMG-20251004-WA0001.jpg'
    },
    host: {
      name: 'Mohd Asad',
      title: 'Managing Director of Academic, Focus Links'
    },
    platform: 'Google Meet',
    dateTime: '2023-10-05T04:30:00Z',
    duration: '60 minutes',
    tags: ['Keratitis', 'Contact Lenses', 'Cornea', 'Clinical', 'Past Event'],
    registrationLink: 'https://forms.gle/G9nhxqgi1LDTWupz5',
    type: 'Webinar',
    attendance: {
      registered: 114,
      attended: 82,
    }
  },
  {
    id: 'eye-q-arena-2025',
    title: 'Eye Q Arena 2025: The International Optometry Knowledge Championship',
    description: `**"Where Global Vision Meets Knowledge."**

**The Eye Q Arena 2025 has concluded!** This international optometry quiz competition brought together passionate optometry students, interns, and professionals from across the globe for a thrilling test of knowledge. Organized by Focus Links, this event successfully promoted academic excellence, global collaboration, and clinical reasoning skills in the field of eye care.

Participants competed on their knowledge from the anterior to the posterior segment of the eye, with final rankings determined by score, accuracy, and completion time. We extend our immense gratitude to all participants for making this a landmark event.

### Event Highlights
- **International Competition**: The event was a massive success, with participants from over 15 countries.
- **100 Challenging Questions**: Contestants were tested on 10 in-depth modules over 60 minutes.
- **Dynamic Scoring**: The final leaderboard reflects a combination of question difficulty and speed.
- **Digital Certificates**: All qualifying participants will receive their certificates via email. Top performers will receive a prestigious **Certificate of Excellence**.
- **Organized by FocusLinks**: Proudly hosted by the world's largest global eye care community.

---QUIZ_MODULES_TABLE---
| Module | Topic | Questions | Max Question Points | Max Time Bonus |
|---|---|---|---|---|
| 1 | **Eyelids & Adnexa** | 10 | 18 | 2 |
| 2 | **Conjunctiva & Sclera** | 10 | 17 | 1 |
| 3 | **Cornea** | 10 | 20 | 2 |
| 4 | **Anterior Chamber & Aqueous Humor**| 10 | 16 | 1 |
| 5 | **Iris & Pupil** | 10 | 15 | 1 |
| 6 | **Crystalline Lens & Accommodation**| 10 | 19 | 2 |
| 7 | **Vitreous Body** | 10 | 15 | 1 |
| 8 | **Retina** | 10 | 24 | 2 |
| 9 | **Optic Nerve & Pathways** | 10 | 24 | 2 |
| 10 | **Extraocular Muscles & Ocular Motility** | 10 | 16 | 2 |
`,
    speaker: {
      name: 'V.M. Ram Kumar',
      title: 'M.Optom | Lecturer & Clinical Optometrist',
      avatarUrl: 'https://i.ibb.co/LhnqwR5t/IMG-20251025-WA0020.jpg'
    },
    host: {
      name: 'Focus Links',
      title: 'Official Organizer'
    },
    platform: 'Online Platform',
    dateTime: '2023-11-02T00:00:00Z',
    duration: '11 days',
    tags: ['Quiz', 'International', 'Competition', 'Students', 'Professionals', 'Anterior Segment', 'Posterior Segment', 'Optometry Certification', 'Clinical Knowledge'],
    registrationLink: '#',
    type: 'Quiz'
  }
];
