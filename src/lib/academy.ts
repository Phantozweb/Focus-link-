
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
  platform: 'Google Meet' | 'Zoom' | 'Other';
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
    title: 'Clinical Crossroads: An Optometry Quiz Challenge',
    description: "Test your knowledge and compete against peers in our first-ever Optometry Quiz Challenge! This exciting event, officially conducted by Focus Links, will cover a wide range of topics from clinical optometry to optical physics. It's a fun way to learn, challenge yourself, and win bragging rights. The event is expertly organized and hosted by the knowledgeable **V.M. Ram Kumar**.",
    speaker: {
      name: 'V.M. Ram Kumar',
      title: 'M.Sc. Optometry | Lecturer & Clinical Optometrist',
      avatarUrl: 'https://picsum.photos/seed/ramkumar/200/200'
    },
    host: {
      name: 'Focus Links Academy',
      title: 'Official Organizer'
    },
    platform: 'Google Meet',
    dateTime: '2025-11-15T13:00:00Z',
    duration: '90 minutes',
    tags: ['Quiz', 'Student Event', 'Clinical Knowledge', 'Upcoming'],
    registrationLink: '#',
  }
];
