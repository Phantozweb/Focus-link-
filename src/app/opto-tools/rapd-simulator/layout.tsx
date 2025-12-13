
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAPD Simulator | Focus Links',
  description: 'Practice the swinging flashlight test to identify Relative Afferent Pupillary Defects (RAPD) with this interactive clinical simulator for optometrists and students.',
  keywords: ['RAPD', 'Relative Afferent Pupillary Defect', 'Swinging Flashlight Test', 'Optometry Simulator', 'Clinical Skills', 'Pupil Examination', 'Marcus Gunn Pupil'],
  openGraph: {
    title: 'Interactive RAPD Simulator for Eye Care Professionals',
    description: 'Sharpen your diagnostic skills by practicing the swinging flashlight test in a realistic, virtual environment. Free tool from Focus Links.',
    type: 'website',
    url: 'https://focuslinks.in/opto-tools/rapd-simulator',
    images: [
      {
        url: 'https://i.ibb.co/wrSQqJHs/1761374303057-019a1a16-ca7a-7521-a225-6359d53e17ba.png',
        width: 1200,
        height: 630,
        alt: 'RAPD Simulator Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAPD Simulator | Focus Links',
    description: 'Practice identifying RAPD with an interactive swinging flashlight test simulator.',
    images: ['https://i.ibb.co/wrSQqJHs/1761374303057-019a1a16-ca7a-7521-a225-6359d53e17ba.png'],
  },
};

const rapdSimulatorSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "RAPD Simulator Practice Tool",
    "description": "An interactive web-based simulator for medical and optometry students to practice the swinging flashlight test for detecting Relative Afferent Pupillary Defects (RAPD).",
    "provider": {
        "@type": "Organization",
        "name": "Focus Links",
        "url": "https://focuslinks.in"
    },
    "educationalCredentialAwarded": "Completion Certificate (for related quiz events)",
    "learningResourceType": "Simulation",
    "interactivityType": "expositive"
};

export default function RapdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rapdSimulatorSchema) }}
      />
      {children}
    </>
  );
}
