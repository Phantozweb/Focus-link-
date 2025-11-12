
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
    dateTime: '2024-10-05T04:30:00Z',
    duration: '60 minutes',
    tags: ['Keratitis', 'Contact Lenses', 'Cornea', 'Clinical', 'Past Event'],
    registrationLink: 'https://forms.gle/G9nhxqgi1LDTWupz5',
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
| 1 | Eyelids & Adnexa | 10 | 18 | 2 |
| 2 | Conjunctiva & Sclera | 10 | 17 | 1 |
| 3 | Cornea | 10 | 20 | 2 |
| 4 | Anterior Chamber & Aqueous Humor| 10 | 16 | 1 |
| 5 | Iris & Pupil | 10 | 15 | 1 |
| 6 | Crystalline Lens & Accommodation| 10 | 19 | 2 |
| 7 | Vitreous Body | 10 | 15 | 1 |
| 8 | Retina | 10 | 24 | 2 |
| 9 | Optic Nerve & Pathways | 10 | 24 | 2 |
| 10 | Extraocular Muscles & Ocular Motility | 10 | 16 | 1 |
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
    dateTime: '2024-11-02T00:00:00Z',
    duration: '11 days',
    tags: ['Quiz', 'International', 'Competition', 'Students', 'Professionals', 'Anterior Segment', 'Posterior Segment', 'Optometry Certification', 'Clinical Knowledge'],
    registrationLink: '#',
  }
];
