
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
    description: `**"Where Global Vision Meets Knowledge."**

**Eye Q Arena 2025** is an international-level optometry quiz competition that brings together passionate optometry students, interns, and professionals from across the globe. Organized by FocusLinks — The World’s Largest Eye Care Community, this event aims to promote academic excellence, global collaboration, and clinical reasoning skills in the field of eye care.

Participants will engage in a **60-minute timed challenge with 100 questions**, covering essential and emerging areas of optometry. This is your chance to test your knowledge from the anterior to the posterior segment of the eye. Scores, accuracy, and completion time will determine placement on the global leaderboard, recognizing the best minds in vision science.

Step into the Arena — Compete, Learn, and Lead the Vision.

### Rules & Regulations
- **Membership Required**: To participate, you must be a member of Focus Links. <a href="/membership" class="text-primary underline">Join for free</a> if you haven't already.
- **Single Attempt**: Each participant is allowed only one attempt at the quiz.
- **Fair Play**: Any form of malpractice will result in immediate disqualification.
- **Certification**: All participants receive a digital certificate. Top performers earn a Certificate of Excellence.

### Instructions for Participants
- The quiz will be available on the event start date.
- You will have 60 minutes to answer 100 multiple-choice questions.
- A stable internet connection is required.
- Your final score and time will be recorded for the leaderboard.

### Event Highlights:
- **International-Level Competition**: Open to optometry students & practitioners worldwide.
- **100 Questions in 60 Minutes**: Across 10 in-depth modules.
- **Leaderboard Ranking**: By score, accuracy & completion time.
- **Digital Certificates**: For Participation & Excellence.
- **Organized by FocusLinks**: Global Eye Care Community.
- **Networking & Global Recognition**: An opportunity to shine.

---QUIZ_MODULES_TABLE---
| Module | Topic | Questions |
|---|---|---|
| 1 | Eyelids & Adnexa | 10 |
| 2 | Conjunctiva & Sclera | 10 |
| 3 | Cornea | 10 |
| 4 | Anterior Chamber & Aqueous Humor | 10 |
| 5 | Iris & Pupil | 10 |
| 6 | Crystalline Lens & Accommodation | 10 |
| 7 | Vitreous Body | 10 |
| 8 | Retina | 10 |
| 9 | Optic Nerve & Pathways | 10 |
| 10 | Extraocular Muscles & Ocular Motility | 10 |
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
    duration: '60 minutes',
    tags: ['Quiz', 'International', 'Competition', 'Students', 'Professionals', 'Anterior Segment', 'Posterior Segment'],
    registrationLink: '#',
  }
];
