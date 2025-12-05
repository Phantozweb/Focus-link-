
'use client';

import Image from 'next/image';

const sections = [
  { id: 'eyelid', name: 'Eyelid' },
  { id: 'lacrimal', name: 'Lacrimal System' },
  { id: 'conjunctiva', name: 'Conjunctiva' },
  { id: 'cornea', name: 'Cornea' },
  { id: 'ant-chamber', name: 'Anterior Chamber' },
  { id: 'iris', name: 'Iris' },
  { id: 'pupil', name: 'Pupil' },
  { id: 'post-chamber', name: 'Posterior Chamber' },
  { id: 'lens', name: 'Lens' },
  { id: 'vitreous', name: 'Vitreous' },
  { id: 'retina', name: 'Retina' },
  { id: 'choroid', name: 'Choroid' },
  { id: 'sclera', name: 'Sclera' },
];

export default function AnatomyOfEyePage() {
    const anatomyPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Anatomy of the Eye: Visual Guide for Optometry Students",
        "description": "An interactive study guide covering the complete anatomy of the human eye, designed for students and professionals in eye care.",
        "mainEntity": {
            "@type": "Article",
            "headline": "Anatomy of the Eye",
            "author": {
                "@type": "Organization",
                "name": "Focus Links"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Focus Links",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://i.ibb.co/cKdXV9gV/IMG-20251025-WA0014.jpg"
                }
            },
            "about": [
                {"@type": "Thing", "name": "Eyelid"},
                {"@type": "Thing", "name": "Lacrimal System"},
                {"@type": "Thing", "name": "Conjunctiva"},
                {"@type": "Thing", "name": "Cornea"},
                {"@type": "Thing", "name": "Anterior Chamber"},
                {"@type": "Thing", "name": "Iris"},
                {"@type": "Thing", "name": "Pupil"},
                {"@type": "Thing", "name": "Posterior Chamber"},
                {"@type": "Thing", "name": "Lens"},
                {"@type": "Thing", "name": "Vitreous"},
                {"@type": "Thing", "name": "Retina"},
                {"@type": "Thing", "name": "Choroid"},
                {"@type": "Thing", "name": "Sclera"}
            ]
        }
    };
    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(anatomyPageSchema) }}
        />
        <div className="bg-slate-50 text-slate-800">
             {/* Floating Navigation */}
            <aside className="fixed top-1/2 -translate-y-1/2 left-4 z-50 hidden xl:block">
                <div className="bg-white/80 backdrop-blur-md rounded-full border p-2 space-y-1">
                    {sections.map(section => (
                         <a key={section.id} href={`#${section.id}`} className="block w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold text-slate-500 hover:bg-primary hover:text-white transition-colors" title={section.name}>
                            {section.name.substring(0, 3)}
                        </a>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                 <div id="overview" className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Anatomy of the Eye</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">A visual guide and mind map for optometry students and professionals.</p>
                </div>

                {/* Anatomy Sections */}
                <div className="space-y-20">
                     <section id="eyelid" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 border-b pb-2">1. Eyelid</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-3 bg-slate-100 rounded-lg p-4 min-h-[300px] flex items-center justify-center text-slate-500">Image Placeholder</div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-3 text-primary">Layers (Anterior to Posterior)</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Skin:</strong> Thin, elastic, minimal fat.</li>
                                    <li><strong className="text-primary-dark">Subcutaneous Tissue:</strong> Loose connective tissue.</li>
                                    <li><strong className="text-primary-dark">Muscles:</strong> Orbicularis Oculi.</li>
                                    <li><strong className="text-primary-dark">Tarsal Plates:</strong> Dense connective tissue skeleton.</li>
                                    <li><strong className="text-primary-dark">Conjunctiva:</strong> Palpebral layer.</li>
                                </ul>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-3 text-primary">Muscles & Nerves</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Orbicularis Oculi (CN VII):</strong> Closure & blinking.</li>
                                    <li><strong className="text-primary-dark">Levator Palpebrae (CN III):</strong> Elevates upper lid.</li>
                                    <li><strong className="text-primary-dark">Müller’s Muscle (Sympathetic):</strong> Maintains elevation.</li>
                                </ul>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-3 text-primary">Glands</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Meibomian:</strong> Sebaceous, in tarsal plate (Lipid layer).</li>
                                    <li><strong className="text-primary-dark">Zeis:</strong> Sebaceous, associated with cilia.</li>
                                    <li><strong className="text-primary-dark">Moll:</strong> Apocrine sweat glands.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    <section id="lacrimal" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 border-b pb-2">2. Lacrimal System</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-3 bg-slate-100 rounded-lg p-4 min-h-[300px] flex items-center justify-center text-slate-500">
                               <div className="relative w-full h-full min-h-[300px]">
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764967421933-019af040-f9af-796c-a523-e988b9eedd82.png" alt="Lacrimal System" layout="fill" objectFit="contain" quality={100} />
                               </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-1">
                                <h3 className="font-bold text-lg mb-3 text-primary">Secretory System (Tear Production)</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Main Lacrimal Gland:</strong> Produces reflex tears. Located superotemporally.</li>
                                    <li><strong className="text-primary-dark">Accessory Glands (Krause & Wolfring):</strong> Produce basal tears.</li>
                                </ul>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-2">
                                <h3 className="font-bold text-lg mb-3 text-primary">Excretory System (Tear Drainage)</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Puncta:</strong> Openings on the eyelid margin.</li>
                                    <li><strong className="text-primary-dark">Canaliculi:</strong> Tiny channels leading from puncta.</li>
                                    <li><strong className="text-primary-dark">Lacrimal Sac:</strong> Collects tears.</li>
                                    <li><strong className="text-primary-dark">Nasolacrimal Duct:</strong> Drains tears into the nasal cavity.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="conjunctiva" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 border-b pb-2">3. Conjunctiva</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-3 bg-slate-100 rounded-lg p-4 min-h-[300px] flex items-center justify-center text-slate-500">
                               <div className="relative w-full h-full min-h-[300px]">
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764967257365-019af03e-2c6d-7457-a939-a9bf417b7a6e.png" alt="Conjunctiva Mind Map" layout="fill" objectFit="contain" quality={100} />
                               </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-3 text-primary">Gross Anatomy</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Palpebral:</strong> Lines inner eyelid. Highly vascular.</li>
                                    <li><strong className="text-primary-dark">Fornix:</strong> Reflection point/cul-de-sac.</li>
                                    <li><strong className="text-primary-dark">Bulbar:</strong> Covers anterior sclera.</li>
                                </ul>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-3 text-primary">Histology</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Epithelium:</strong> Stratified squamous. Contains Goblet Cells.</li>
                                    <li><strong className="text-primary-dark">Stroma:</strong> Contains Lymphoid & Fibrous layers.</li>
                                </ul>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h3 className="font-bold text-lg mb-3 text-primary">Functions</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><strong className="text-primary-dark">Mucin Production:</strong> From Goblet cells.</li>
                                    <li><strong className="text-primary-dark">Immunological Barrier</strong></li>
                                    <li><strong className="text-primary-dark">Lubrication</strong></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
        </>
    );
}
