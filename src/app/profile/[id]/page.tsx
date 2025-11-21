
import { allUsers } from '@/lib/data/index';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { ProfileClient } from './profile-client';

type ProfilePageProps = {
    params: { id: string }
};

export async function generateMetadata(
  { params }: ProfilePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = allUsers.find((u) => u.id === params.id);

  if (!user) {
    return {
      title: 'Profile Not Found',
    }
  }
  
  if (user.id === 'DrishtiKit') {
    return {
      title: 'DrishtiKit: Portable Eye Testing Solution - Focus Links',
      description: 'Explore DrishtiKit, the innovative, all-in-one portable phoropter for professional vision screening. Learn about this revolutionary eye care technology, proudly partnered with Focus Links.',
       keywords: ['DrishtiKit', 'portable phoropter', 'vision screening device', 'tele-optometry', 'rural eye care', 'community health', 'eye testing equipment', 'Made in India healthcare', 'Focus Links Partner', 'vision care technology'],
      openGraph: {
        title: 'DrishtiKit: The Future of Portable Vision Screening | Focus Links',
        description: 'Revolutionizing community eye care with a portable, affordable, and accurate vision screening solution featured on Focus Links.',
        images: [user.avatarUrl, `https://www.drishtikit.com/phoropter.png`],
      },
    }
  }
  
   if (user.id === '20') {
    return {
      title: `${user.name} | Clinical Optometrist & Low Vision Specialist | Focus Links`,
      description: `Connect with ${user.name}, an experienced clinical optometrist in Lagos, Nigeria, with over 10 years of expertise in low vision, contact lenses, and ocular disease management.`,
       keywords: ['Optometrist in Nigeria', 'Low Vision Specialist Lagos', 'Atueyi Onyinye Perpetua', 'Clinical Optometrist', 'Lagos University Teaching Hospital', 'Eye Care Nigeria', 'Contact Lens Fitting', 'Glaucoma Management'],
      openGraph: {
        title: `${user.name} | Clinical Optometrist & Low Vision Specialist`,
        description: 'Over 10 years of experience in providing comprehensive eye care, low vision rehabilitation, and managing ocular diseases at LUTH, Nigeria.',
        images: [user.avatarUrl],
      },
    }
  }
  
  if (user.id === '21') {
    return {
      title: `${user.name} | Optometrist & M.Optom Student | Focus Links`,
      description: `Connect with ${user.name}, a skilled optometrist and Master of Optometry student at The Sankara Nethralaya Academy, specializing in pediatric vision and contact lenses.`,
      keywords: ['Optometrist in Chennai', 'Sankara Nethralaya student', 'Esakkiammal Iyyappan', 'Pediatric Optometry', 'Aravind Eye Care System Alumna', 'Contact Lens Specialist', 'Clinical Tutor'],
      openGraph: {
        title: `${user.name} | Optometrist & M.Optom Student`,
        description: 'Experienced Clinical Optometrist and Academic Tutor from Aravind Eye Hospital, now pursuing a Master of Optometry at The Sankara Nethralaya Academy.',
        images: [user.avatarUrl],
      },
    }
  }

  if (user.id === 'IN20251102095356') {
    return {
      title: `${user.name} | Optometry Student & Content Creator | Focus Links`,
      description: `Connect with ${user.name}, a passionate first-year optometry student from Odisha, India, with a keen interest in creating content to raise eye health awareness.`,
      keywords: ['Optometry Student India', 'Monalisa Behera', 'Future Optometrist', 'Eye Care Awareness', 'Trilochan School of Optometry', 'Student Content Creator'],
      openGraph: {
        title: `${user.name} | Optometry Student & Content Creator`,
        description: `Follow the journey of Monalisa Behera, a first-year student at Trilochan School of Optometry, passionate about eye health and community awareness.`,
        images: [user.avatarUrl],
      },
    }
  }

  if (user.id === 'marwankorath') {
    return {
      title: `${user.name} | DOH Qualified Clinical Optometrist | Focus Links`,
      description: user.bio,
      keywords: ['DOH Qualified Optometrist', 'Clinical Optometrist Kerala', 'MARWAN K', 'Retinal Imaging Specialist', 'Ocular Diagnostics', 'ABATE Eye Hospital'],
      openGraph: {
        title: `${user.name} | ${user.experience}`,
        description: user.bio,
        images: [user.avatarUrl],
      },
    }
  }


  const title = `${user.name} - ${user.type} | Focus Links`;
  const description = user.bio.substring(0, 160);
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = user.avatarUrl ? [user.avatarUrl, ...previousImages] : previousImages;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://focuslinks.in/profile/${user.id}`,
      type: 'profile',
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage,
    },
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = allUsers.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  return <ProfileClient user={user} />;
}
