
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
    id: 'webinar-clik-1',
    title: 'Contact Lens Induced Keratitis: A Comprehensive Guide',
    description: 'Join us for a deep dive into one of the most critical topics in modern eye care: Contact Lens Induced Keratitis (CLIK). This session, led by renowned expert Abhishek Kumar Banaita, will cover the pathophysiology, risk factors, and latest evidence-based approaches for diagnosis and management. Practitioners will learn to identify early signs, differentiate between infectious and non-infectious events, and implement effective prevention strategies in their daily practice. This is an essential webinar for any professional dedicated to ensuring the long-term safety and ocular health of their contact lens patients.',
    speaker: {
      name: 'Abhishek Kumar Banaita',
      title: 'Cataract Educator and Cornea Consultant at LVPEI KVC campus',
      avatarUrl: 'https://iili.io/Jodp9gI.png'
    },
    date: 'Sunday, October 27, 2024',
    time: '10:00 AM IST',
    duration: '75 minutes',
    imageUrl: 'https://picsum.photos/seed/webinar-clik/600/400',
    tags: ['Keratitis', 'Contact Lenses', 'Cornea', 'Clinical'],
  }
];
