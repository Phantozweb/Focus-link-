
import type { Metadata } from 'next';
import { OptoToolsClient } from './opto-tools-client';

export const metadata: Metadata = {
  title: 'Optometry Calculator Suite: 20+ Clinical Tools (Free) | Focus Links',
  description: "Access the ultimate all-in-one Optometry Calculator. Includes 20+ modules for Transposition, Vertex Distance, LARS, Biometry, and Low Vision. Developed by Shivashangari M (M.Optom).",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Focus Links Optometry Calculator Suite",
  "operatingSystem": "Web Browser",
  "applicationCategory": "MedicalApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "Shivashangari M",
    "jobTitle": "Optometrist"
  },
  "featureList": [
    "Vertex Distance Calculator",
    "Spherocylindrical Transposition",
    "LARS Rule for Toric Lenses",
    "Kestenbaum's Rule",
    "AC/A Ratio Calculator",
    "Visual Acuity Converter"
  ],
  "description": "A complete suite of 20+ optometry calculators for clinical use, including refraction, contact lens, and low vision tools."
};

export default function OptoToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <OptoToolsClient />
    </>
  );
}
