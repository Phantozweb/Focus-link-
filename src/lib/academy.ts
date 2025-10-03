
export type Webinar = {
  id: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  dateTime: string; // ISO 8601 format (e.g., "2024-10-27T04:30:00Z")
  duration: string;
  imageUrl: string;
  tags: string[];
};

export const webinars: Webinar[] = [
  {
    id: 'webinar-clik-1',
    title: 'Contact Lens Induced Keratitis: A Comprehensive Guide',
    description: 'Join us for a deep dive into one of the most critical topics in modern eye care: Contact Lens Induced Keratitis (CLIK). This session, led by renowned expert Abhishek Kumar Banaita, will cover the pathophysiology, risk factors, and latest evidence-based approaches for diagnosis and management. Practitioners will learn to identify early signs, differentiate between infectious and non-infectious events, and implement effective prevention strategies in their daily practice. This is an essential webinar for any professional dedicated to ensuring the long-term safety and ocular health of their contact lens patients.',
    speaker: {
      name: 'Abhishek Kumar Banaita',
      title: 'Cataract Educator and Cornea Consultant at LVPEI KVC campus',
      avatarUrl: 'https://i.ibb.co/Zcyc2H2/IMG-20251004-WA0001.jpg'
    },
    dateTime: '2024-10-27T04:30:00Z', // This is 10:00 AM IST
    duration: '75 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar-clik/600/400',
    tags: ['Keratitis', 'Contact Lenses', 'Cornea', 'Clinical'],
  }
];
