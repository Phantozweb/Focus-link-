
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
  attendance?: {
    registered: number;
    attended: number;
  };
};

export const webinars: Webinar[] = [
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
    dateTime: '2025-10-05T04:30:00Z',
    duration: '60 minutes',
    tags: ['Keratitis', 'Contact Lenses', 'Cornea', 'Clinical', 'Upcoming'],
    registrationLink: 'https://forms.gle/G9nhxqgi1LDTWupz5',
    attendance: {
      registered: 114,
      attended: 82,
    }
  },
  {
    id: 'quiz-event-1',
    title: 'Eye Q Arena 2025: The International Optometry Knowledge Championship',
    description: `**Where Global Vision Meets Knowledge.**

**Eye Q Arena 2025** is an international-level optometry quiz competition that brings together passionate optometry students, interns, and professionals from across the globe.

Organized by FocusLinks — The World’s Largest Eye Care Community, this event aims to promote academic excellence, global collaboration, and clinical reasoning skills in the field of eye care.

Participants will engage in a **45-minute timed challenge**, covering essential and emerging areas of optometry including optics, ocular physiology, binocular vision, clinical techniques, contact lenses, ocular pathology, and AI innovations in eye care.

Scores, accuracy, and completion time will determine placement on the global leaderboard, recognizing the best minds in vision science. All participants will receive a verified digital certificate, while top scorers earn a **Certificate of Excellence** — endorsed by FocusLinks and partner organizations.

Step into the Arena — Compete, Learn, and Lead the Vision.

### Event Highlights:
- **International-Level Competition**: Open to optometry students & practitioners worldwide.
- **45-Minute Timed MCQ Quiz**: Across 7 knowledge modules.
- **Leaderboard Ranking**: By accuracy & completion time.
- **Digital Certificates**: For Participation & Excellence.
- **Organized by FocusLinks**: Global Eye Care Community.
- **Networking & Global Recognition**: An opportunity to shine.
`,
    speaker: {
      name: 'V.M. Ram Kumar',
      title: 'M.Sc. Optometry | Lecturer & Clinical Optometrist',
      avatarUrl: 'https://picsum.photos/seed/ramkumar/200/200'
    },
    host: {
      name: 'Focus Links',
      title: 'Official Organizer'
    },
    platform: 'Online Platform',
    dateTime: '2025-11-15T13:00:00Z',
    duration: '45 minutes',
    tags: ['Quiz', 'International', 'Competition', 'Students', 'Professionals'],
    registrationLink: '#',
  }
];
