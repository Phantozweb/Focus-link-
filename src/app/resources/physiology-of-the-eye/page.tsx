'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye } from 'lucide-react';
import Head from 'next/head';

export default function PhysiologyOfEyePage() {
    const physiologyPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Physiology of the Eye: Visual Guide for Optometry Students",
        "description": "An interactive study guide covering the complete physiology of the human eye, designed for students and professionals in eye care.",
        "url": "https://focuslinks.vercel.app/resources/physiology-of-the-eye",
        "keywords": "Physiology of the Eye, Optometry, Eye Care, Ocular Structures, Visual Guide, Focus Links",
        "image": "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Edit_without_mention.png?raw=true"
    };
    
    const structures = [
        { name: "Eyelid", id: "eyelid" },
        { name: "Lacrimal System", id: "lacrimal" },
        { name: "Conjunctiva", id: "conjunctiva" },
        { name: "Sclera", id: "sclera" },
        { name: "Cornea", id: "cornea" },
        { name: "Anterior Chamber", id: "ant-chamber" },
        { name: "Iris", id: "iris" },
        { name: "Pupil", id: "pupil" },
        { name: "Posterior Chamber", id: "post-chamber" },
        { name: "Crystalline Lens", id: "lens" },
        { name: "Vitreous", id: "vitreous" },
        { name: "Retina", id: "retina" },
        { name: "Choroid", id: "choroid" },
    ];

    const imageUrls = {
        eyelid: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_.png?raw=true",
        lacrimal: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(1).png?raw=true",
        conjunctiva: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(2).png?raw=true",
        sclera: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(3).png?raw=true",
        cornea: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(4).png?raw=true",
        "ant-chamber": "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(6).png?raw=true",
        iris: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(5).png?raw=true",
        pupil: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965970716-019af02a-d20f-70e2-baa5-7417b2ea57ba.png?raw=true",
        "post-chamber": "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(8).png?raw=true",
        lens: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(9).png?raw=true",
        vitreous: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(10).png?raw=true",
        retina: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(11).png?raw=true",
        choroid: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Create_a_16_9_ratio_%20(12).png?raw=true",
    };
    
    return (
        <>
            <Head>
                <title>Physiology of the Eye: A Visual Guide for Optometry Students</title>
                <meta name="description" content="An interactive study guide covering the complete physiology of the human eye, designed for students and professionals in eye care." />
                <meta name="keywords" content="Physiology of the Eye, Optometry, Eye Care, Ocular Structures, Visual Guide, Focus Links" />
                <meta property="og:title" content="Physiology of the Eye: A Visual Guide for Optometry Students" />
                <meta property="og:description" content="An interactive study guide covering the complete physiology of the human eye, designed for students and professionals in eye care." />
                <meta property="og:image" content="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Edit_without_mention.png?raw=true" />
                <meta property="og:url" content="https://focuslinks.vercel.app/resources/physiology-of-the-eye" />
            </Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(physiologyPageSchema) }}
            />
             <div className="bg-brand-bg">
                <div className="text-center max-w-3xl mx-auto py-12 px-4">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Physiology of the Eye: A Visual Guide</h1>
                     <p className="text-lg text-slate-600">A comprehensive study tool for optometry students and professionals, covering the key physiological functions of ocular structures with detailed mind maps.</p>
                </div>

                <div className="relative w-full aspect-[16/7] bg-slate-100 shadow-lg border-y mb-16 rounded-lg overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
                    <Image src={"https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Edit_without_mention.png?raw=true"} alt="Physiology of the Eye Overview - A comprehensive visual guide from Focus Links" fill style={{objectFit:"contain"}} quality={100} />
                </div>
                
                 <main className="container mx-auto px-4">
                    <section className="mb-16">
                        <Card className="shadow-lg bg-slate-50 border-slate-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="h-6 w-6 text-primary" />
                                    Key Structures at a Glance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {structures.map((structure) => (
                                        <Link
                                            key={structure.id}
                                            href={`#${structure.id}`}
                                            className="block text-center p-3 bg-white rounded-lg border shadow-sm hover:bg-primary hover:text-white font-semibold text-slate-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            {structure.name}
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <div className="space-y-16">
                        {structures.map((structure, index) => {
                             const imageUrl = (imageUrls as any)[structure.id];
                             if (!imageUrl) return null;
                             return (
                                <section key={structure.id} id={structure.id} className="anatomy-section">
                                    <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">{index + 1}</div>
                                        <h2 className="text-3xl font-bold text-slate-800">{structure.name}</h2>
                                    </div>
                                    <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                                        <Image src={imageUrl} alt={`${structure.name} Physiology Mind Map - Visual Guide from Focus Links`} fill style={{objectFit:"contain"}} quality={100} />
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </main>
            </div>
        </>
    );
}
