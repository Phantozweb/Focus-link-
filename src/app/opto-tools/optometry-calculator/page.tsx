
import type { Metadata } from 'next';
import OptoToolsClient from '../opto-tools-client';

export const metadata: Metadata = {
  title: 'Optometry Calculator Suite | Focus Links',
  description: "Access a free, all-in-one suite of 20+ clinical optometry calculators. Includes tools for transposition, vertex distance, contact lenses, low vision, and more. Developed by an eye care professional for accurate results.",
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
    "IPD Measuring Tool",
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
