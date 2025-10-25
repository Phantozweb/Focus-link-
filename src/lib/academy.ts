
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
    id: 'eye-q-arena-2025',
    title: 'Eye Q Arena 2025: The International Optometry Knowledge Championship',
    description: `**"Where Global Vision Meets Knowledge."**

**Eye Q Arena 2025** is an international-level optometry quiz competition that brings together passionate optometry students, interns, and professionals from across the globe. Organized by FocusLinks — The World’s Largest Eye Care Community, this event aims to promote academic excellence, global collaboration, and clinical reasoning skills in the field of eye care.

This is your chance to test your knowledge from the anterior to the posterior segment of the eye and see how you stack up against peers worldwide. Scores, accuracy, and completion time will determine placement on the global leaderboard.

Step into the Arena — Compete, Learn, and Lead the Vision.

### Rules & Regulations
- **Event Duration**: The quiz will be open from **November 2nd to November 12th, 2025**.
- **Membership Required**: To participate, you must be an official member of Focus Links. <a href="/membership" class="text-primary underline font-semibold">Join for free</a> if you haven't already. It only takes a few minutes!
- **Multiple Attempts**: Each participant is allowed **three attempts** to pass the quiz and earn their certificate.
- **Passing Score**: A score of **50% or higher** is required to pass each module and to pass the quiz overall.
- **Fair Play**: We trust our community to compete with integrity. Any detected form of malpractice may result in disqualification.
- **Scoring**: Questions are assigned points based on difficulty (Easy: 1, Medium: 2, Hard: 5). Your final score is the sum of points from correctly answered questions.
- **Certification & Rewards**: 
    - All participants who meet the passing score will receive a digital **Certificate of Participation**.
    - Top performers, based on a combination of high scores and fast completion times, will earn a prestigious **Certificate of Excellence** and a **special achievement badge** on their Focus Links profile.

### Instructions for Participants
- The quiz takes place directly on this webpage. No external links will be sent.
- The quiz consists of 10 timed modules. Your 60-minute clock is the sum of all module times.
- When you begin a module, its specific timer starts. Time saved from one module will be carried over, giving you extra time for more challenging sections.
- If a module's time expires, your submitted answers will be saved, and you will automatically proceed to the next module. Unanswered questions will be marked as incorrect.
- **Optional Breaks**: Between each module, you can take an optional 2-minute break. This break time does not count against your total 60-minute quiz time.
- At the end of the quiz, you will receive a detailed report of your overall score, module-by-module performance, and timing.

### Event Highlights:
- **International-Level Competition**: Open to optometry students & practitioners worldwide.
- **100 Questions in 60 Minutes**: Test your knowledge across 10 in-depth modules.
- **Variable Scoring**: Questions weighted by difficulty (Easy, Medium, Hard).
- **Live Leaderboard Ranking**: See where you stand based on score, accuracy & completion time.
- **Digital Certificates**: Earn a Certificate of Participation or Excellence.
- **Organized by FocusLinks**: The world's largest global eye care community.
- **Global Recognition**: An opportunity to showcase your expertise and shine.

---QUIZ_MODULES_TABLE---
| Module | Topic | Questions | Total Points |
|---|---|---|---|
| 1 | Eyelids & Adnexa | 10 | 18 |
| 2 | Conjunctiva & Sclera | 10 | 17 |
| 3 | Cornea | 10 | 20 |
| 4 | Anterior Chamber & Aqueous Humor | 10 | 16 |
| 5 | Iris & Pupil | 10 | 15 |
| 6 | Crystalline Lens & Accommodation | 10 | 19 |
| 7 | Vitreous Body | 10 | 15 |
| 8 | Retina | 10 | 25 |
| 9 | Optic Nerve & Pathways | 10 | 24 |
| 10 | Extraocular Muscles & Ocular Motility | 10 | 16 |
`,
    speaker: {
      name: 'V.M. Ram Kumar',
      title: 'M.Sc. Optometry | Lecturer & Clinical Optometrist',
      avatarUrl: 'https://i.ibb.co/F4y8y9DJ/10acc72e-b61b-4bb3-91c9-4c786fb62119-1-all-168.jpg'
    },
    host: {
      name: 'Focus Links',
      title: 'Official Organizer'
    },
    platform: 'Online Platform',
    dateTime: '2025-11-02T13:00:00Z',
    duration: '11 days',
    tags: ['Quiz', 'International', 'Competition', 'Students', 'Professionals', 'Anterior Segment', 'Posterior Segment', 'Optometry Certification', 'Clinical Knowledge'],
    registrationLink: '#',
  }
];
