
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
    description: 'This session, led by renowned expert Abhishek Kumar Banaita, covered the pathophysiology, risk factors, and latest evidence-based approaches for diagnosis and management of Contact Lens Induced Keratitis (CLIK). The event was a great success, with over 80 eye care professionals attending out of 114 who registered. Attendees learned to identify early signs, differentiate between events, and implement effective prevention strategies.',
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
    dateTime: '2024-10-05T04:30:00Z', // This is 10:00 AM IST on a past date
    duration: '90 minutes',
    tags: ['Keratitis', 'Contact Lenses', 'Cornea', 'Clinical', 'Past Event'],
    registrationLink: 'https://forms.gle/G9nhxqgi1LDTWupz5',
    attendance: {
      registered: 114,
      attended: 80,
    }
  }
];
