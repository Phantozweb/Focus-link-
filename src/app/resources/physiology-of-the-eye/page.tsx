
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye } from 'lucide-react';

export default function PhysiologyOfEyePage() {
    const physiologyPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Physiology of the Eye: Visual Guide for Optometry Students",
        "description": "An interactive study guide covering the complete physiology of the human eye, designed for students and professionals in eye care.",
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
        eyelid: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/162455f66faf7eee5cac7587cdfc4324c601f277/1764967080329-019af03b-ac50-7563-bc78-93fe003b9122.png",
        lacrimal: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(1).png",
        conjunctiva: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(2).png",
        sclera: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(3).png",
        cornea: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(4).png",
        "ant-chamber": "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(6).png",
        iris: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(5).png",
        pupil: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965970716-019af02a-d20f-70e2-baa5-7417b2ea57ba.png?raw=true",
        "post-chamber": "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(8).png",
        lens: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966042495-019af02b-f0fb-7cf0-958c-cf01cf8288a6.png?raw=true",
        vitreous: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(10).png",
        retina: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(11).png",
        choroid: "https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)a_Create_a_16_9_ratio%20(12).png",
    };
    
    return (
        <>
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
                    <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/Phy/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a_Change_the_central_t.png" alt="Physiology of the Eye Overview" layout="fill" objectFit="contain" quality={100} />
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
                                        <Image src={imageUrl} alt={`${structure.name} Physiology Mind Map`} layout="fill" objectFit="contain" quality={100} />
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
