
import type { ForumPost } from '@/types';
import forumContent from '@/lib/data/forum-content.json';

export const demoDiscussions: ForumPost[] = [
  {
    id: '1',
    title: 'Unusual Presentation of Keratoconus in a Young Patient',
    author: 'Dr. Emily Carter',
    authorId: '4', // Corresponds to a user ID in your data
    avatar: 'https://i.ibb.co/27Z4CkpY/IMG-20251004-WA0001.jpg',
    category: 'Cornea & External Disease',
    tags: ['Keratoconus', 'Topography', 'Corneal Ectasia'],
    description: 'A 19-year-old male presented with rapidly progressing astigmatism and visual distortion. Topography reveals an atypical pattern. Seeking opinions on differential diagnosis and management strategies...',
    content: forumContent.keratoconusCase,
    media: [
      { type: 'image', url: 'https://i.ibb.co/yQWzVvj/corneal-topography-keratoconus.jpg', caption: 'Corneal Topography - Axial Map' },
      { type: 'image', url: 'https://i.ibb.co/Vvz8r7Y/oct-keratoconus.jpg', caption: 'Anterior Segment OCT' },
    ],
    mediaCount: 2,
    replies: 12,
    views: 156,
    upvotes: 45,
    lastReply: '2 hours ago',
    postedDate: '2025-10-27T10:00:00Z'
  },
  {
    id: '2',
    title: 'Managing Progressive Myopia in Children: What’s Working?',
    author: 'Dr. Ben Hanson',
    authorId: '5',
    avatar: 'https://i.ibb.co/v6XJ3B7X/1747244504223.jpg',
    category: 'Pediatric Optometry',
    tags: ['Myopia Control', 'Pediatrics', 'Atropine'],
    description: 'Sharing a case of an 8-year-old with a -1.50D/year progression rate. We\'ve tried multifocal soft lenses with limited success. Has anyone had consistent results with low-dose Atropine or new DIMS lenses?',
    content: forumContent.myopiaControl,
    media: [],
    mediaCount: 0,
    replies: 34,
    views: 432,
    upvotes: 88,
    lastReply: '5 hours ago',
    postedDate: '2025-10-27T08:00:00Z'
  },
  {
    id: '3',
    title: 'Atypical Macular Degeneration Case Study',
    author: 'Dr. Aisha Khan',
    authorId: '6',
    avatar: 'https://i.ibb.co/YF1PmkBm/IMG-20251025-170957.jpg',
    category: 'Retina',
    tags: ['AMD', 'Macular Dystrophy', 'OCT'],
    description: 'Patient is a 55-year-old female with drusen deposits but no CNV, yet experiencing significant central vision loss. OCT and FAF images attached. Is this a rare form of AMD or a macular dystrophy?',
    content: forumContent.amdCase,
    media: [
      { type: 'image', url: 'https://i.ibb.co/qjF1PqH/amd-oct.jpg', caption: 'Macular OCT' },
      { type: 'image', url: 'https://i.ibb.co/GPDj6zR/amd-fundus.jpg', caption: 'Fundus Autofluorescence' },
    ],
    mediaCount: 2,
    replies: 21,
    views: 289,
    upvotes: 62,
    lastReply: '1 day ago',
    postedDate: '2025-10-26T14:00:00Z'
  },
   {
    id: '4',
    title: 'Best Practices for Fitting Scleral Lenses Post-Corneal Transplant',
    author: 'Optom. David Chen',
    authorId: '8',
    avatar: 'https://i.ibb.co/LhnqwR5t/IMG-20251025-WA0020.jpg',
    category: 'Contact Lenses',
    tags: ['Scleral Lenses', 'Post-PKP', 'Specialty Contact Lens'],
    description: 'A patient who underwent a penetrating keratoplasty 1 year ago requires a scleral lens for visual rehabilitation. The graft is clear, but topography is highly irregular. Seeking tips on initial lens selection and vaulting strategies.',
    content: forumContent.scleralLensFit,
    media: [],
    mediaCount: 0,
    replies: 18,
    views: 205,
    upvotes: 51,
    lastReply: '3 days ago',
    postedDate: '2025-10-24T11:00:00Z'
  },
];
