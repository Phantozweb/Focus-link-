
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Shield, Layers, Camera, Droplet, Sun, Dot } from 'lucide-react';

export function AnatomyOfEyeClient() {
    const anatomyPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Anatomy of the Eye: Visual Guide for Optometry Students",
        "description": "An interactive study guide covering the complete anatomy of the human eye, from anterior to posterior, designed for students and professionals in eye care.",
        "mainEntity": {
            "@type": "Article",
            "headline": "Anatomy of the Eye: A Visual Guide",
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
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(anatomyPageSchema) }}
            />
             <div className="bg-brand-bg">
                <div className="text-center max-w-3xl mx-auto py-12 px-4">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Anatomy of the Eye: A Visual Guide</h1>
                     <p className="text-lg text-slate-600">A comprehensive study tool with mind maps covering the full anterior to posterior anatomy, designed for optometry students and professionals.</p>
                </div>

                <div className="relative w-full aspect-[16/7] bg-slate-100 shadow-lg border-y mb-16 rounded-lg overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
                    <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764967742990-019af045-72c7-7fff-a9bc-93b78684126b.png?raw=true" alt="Anatomy of the Eye Overview - A comprehensive visual guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                </div>
                
                <main className="container mx-auto px-4">
                    <div className="space-y-16">
                        <section id="eyelid" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">1</div>
                                <h2 className="text-3xl font-bold text-slate-800">Eyelid</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/162455f66faf7eee5cac7587cdfc4324c601f277/1764967080329-019af03b-ac50-7563-bc78-93fe003b9122.png" alt="Eyelid Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="lacrimal" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">2</div>
                                <h2 className="text-3xl font-bold text-slate-800">Lacrimal System</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/88ff63090e2abe518c532f7fb0d9c63ef618e97c/1764967421933-019af040-f9af-796c-a523-e988b9eedd82.png" alt="Lacrimal System - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                        
                         <section id="conjunctiva" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">3</div>
                                <h2 className="text-3xl font-bold text-slate-800">Conjunctiva</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/74ae7175908f68e40807200ed10bfe6c09f7a026/1764967257365-019af03e-2c6d-7457-a939-a9bf417b7a6e.png" alt="Conjunctiva Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="sclera" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">4</div>
                                <h2 className="text-3xl font-bold text-slate-800">Sclera</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965526361-019af023-f8c5-72a2-8c29-f5d6a0b1c7b0.png?raw=true" alt="Sclera Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="cornea" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">5</div>
                                <h2 className="text-3xl font-bold text-slate-800">Cornea</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a__Create_a_visually_a.png?raw=true" alt="Cornea Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="ant-chamber" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">6</div>
                                <h2 className="text-3xl font-bold text-slate-800">Anterior Chamber</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966193644-019af02d-e226-71ff-b256-8ae677ccd20f.png?raw=true" alt="Anterior Chamber Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                        
                        <section id="iris" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">7</div>
                                <h2 className="text-3xl font-bold text-slate-800">Iris</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965673884-019af026-53e0-74d6-879f-b6be2809f59c.png?raw=true" alt="Iris Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                        
                        <section id="pupil" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">8</div>
                                <h2 className="text-3xl font-bold text-slate-800">Pupil</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965970716-019af02a-d20f-70e2-baa5-7417b2ea57ba.png?raw=true" alt="Pupil Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="post-chamber" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">9</div>
                                <h2 className="text-3xl font-bold text-slate-800">Posterior Chamber</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966329381-019af030-42e4-7dbc-bf9d-9fbc5ce09e21.png?raw=true" alt="Posterior Chamber Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="lens" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">10</div>
                                <h2 className="text-3xl font-bold text-slate-800">Crystalline Lens</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966042495-019af02b-f0fb-7cf0-958c-cf01cf8288a6.png?raw=true" alt="Crystalline Lens Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="vitreous" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">11</div>
                                <h2 className="text-3xl font-bold text-slate-800">Vitreous Body</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966489348-019af032-7eab-7268-bf36-ba41478c0ee2.png?raw=true" alt="Vitreous Body Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                         <section id="retina" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">12</div>
                                <h2 className="text-3xl font-bold text-slate-800">Retina</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966585916-019af034-23d0-72e0-9847-a40c65c727cf.png?raw=true" alt="Retina Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="choroid" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">13</div>
                                <h2 className="text-3xl font-bold text-slate-800">Choroid</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966733079-019af036-507b-7e9e-9008-a69d298e1188.png?raw=true" alt="Choroid Mind Map - Visual Guide from Focus Links" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
