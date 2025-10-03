
export type Webinar = {
  id: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  date: string;
  time: string;
  duration: string;
  imageUrl: string;
  tags: string[];
  isPast?: boolean;
};

export const webinars: Webinar[] = [
  {
    id: 'webinar-1',
    title: 'The Future of Myopia Control: Innovations and Clinical Insights',
    description: 'Explore the latest advancements in myopia management, from novel optical designs to evidence-based treatment strategies that are shaping the future of pediatric eye care.',
    speaker: {
      name: 'Dr. Evelyn Reed',
      title: 'Pediatric Optometrist & Researcher',
      avatarUrl: 'https://iili.io/Jodp9gI.png'
    },
    date: 'November 15, 2024',
    time: '4:00 PM GMT',
    duration: '60 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar1/600/400',
    tags: ['Myopia', 'Pediatrics', 'Clinical'],
  },
  {
    id: 'webinar-2',
    title: 'AI in Glaucoma Diagnosis: From Theory to Practice',
    description: 'This webinar delves into how artificial intelligence is revolutionizing the early detection and management of glaucoma, with a look at real-world case studies and upcoming technologies.',
    speaker: {
      name: 'Dr. Marcus Thorne',
      title: 'Glaucoma Specialist & AI Enthusiast',
      avatarUrl: 'https://iili.io/Jodp9gI.png'
    },
    date: 'November 28, 2024',
    time: '6:00 PM GMT',
    duration: '75 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar2/600/400',
    tags: ['Glaucoma', 'AI', 'Diagnostics'],
  },
  {
    id: 'webinar-3',
    title: 'Advanced Contact Lens Fitting for Keratoconus',
    description: 'Learn specialized techniques for fitting scleral and hybrid contact lenses in patients with keratoconus, focusing on improving visual outcomes and patient comfort.',
    speaker: {
      name: 'Dr. Sofia Chen',
      title: 'Contact Lens Innovator',
      avatarUrl: 'https://iili.io/Jodp9gI.png'
    },
    date: 'December 5, 2024',
    time: '5:00 PM GMT',
    duration: '90 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar3/600/400',
    tags: ['Contact Lenses', 'Keratoconus', 'Advanced'],
  },
  {
    id: 'webinar-4',
    title: 'Dry Eye Disease: A Modern Management Guide',
    description: 'A comprehensive review of the latest diagnostic tools and treatment modalities for Dry Eye Disease, including IPL therapy, and new pharmaceutical agents.',
    speaker: {
      name: 'Dr. Ben Carter',
      title: 'Ocular Surface Expert',
      avatarUrl: 'https://iili.io/Jodp9gI.png'
    },
    date: 'September 20, 2024',
    time: '7:00 PM GMT',
    duration: '60 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar4/600/400',
    tags: ['Dry Eye', 'Ocular Surface', 'Therapeutics'],
    isPast: true,
  },
   {
    id: 'webinar-5',
    title: 'Surgical Co-Management in the Modern Practice',
    description: 'This session outlines best practices for optometrists in the co-management of cataract and refractive surgery patients, from pre-op assessment to post-op care.',
    speaker: {
      name: 'Dr. Lena Petrova',
      title- 'Surgical Co-Management Consultant',
      avatarUrl: 'https://iili.io/Jodp9gI.png'
    },
    date: 'August 12, 2024',
    time: '6:00 PM GMT',
    duration: '60 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar5/600/400',
    tags: ['Surgery', 'Co-Management', 'Cataract'],
    isPast: true,
  }
];
