
'use client';

import Image from 'next/image';

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

                <div className="relative w-full aspect-[16/7] bg-slate-100 shadow-lg border-y rounded-lg overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
                    <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/d5d342fec3746c8788c22ad434333607e447d031/IMG_20251206_044102.png" alt="Anatomy of the Eye Overview" layout="fill" objectFit="contain" quality={100} />
                </div>
                
                <div className="text-center max-w-4xl mx-auto py-8 px-4">
                    <div className="prose prose-lg max-w-none text-slate-600 mb-8">
                        <p>Enhance your medical studies with this comprehensive <strong>overview of the anatomy of the eye</strong>. Designed specifically for <strong>optometry students</strong>, <strong>ophthalmology residents</strong>, and healthcare professionals, this labeled diagram provides a clear, professional breakdown of the human eye's physiological structure. Whether you are looking for <strong>optometry revision notes</strong> or a quick reference for patient education, this visual guide covers the 12 essential components of ocular anatomy.</p>
                        <p><strong>Detailed Breakdown of Ocular Structures:</strong> This medical illustration details the path of light and the protective layers of the globe:</p>
                        <ul className="text-left">
                          <li><strong>External Protection:</strong>
                            <ul>
                              <li><strong>1. Eyelid:</strong> The protective external fold that shields the eye.</li>
                              <li><strong>2. Conjunctiva:</strong> The thin, clear membrane covering the <strong>sclera</strong> (12), which is the tough, white outer layer providing structural protection.</li>
                            </ul>
                          </li>
                          <li><strong>The Anterior Segment (Light Entry):</strong>
                            <ul>
                              <li><strong>3. Cornea:</strong> The transparent outer layer responsible for the primary <strong>refraction of light</strong>.</li>
                              <li><strong>6. Pupil:</strong> The central opening that admits light into the eye.</li>
                              <li><strong>5. Iris:</strong> The colored part of the eye that functions as a diaphragm to <strong>control pupil size</strong>.</li>
                            </ul>
                          </li>
                          <li><strong>Fluid Chambers & Focusing:</strong>
                            <ul>
                              <li><strong>4. Anterior Chamber:</strong> The fluid-filled space situated between the cornea and the iris.</li>
                              <li><strong>7. Posterior Chamber:</strong> The narrow space between the iris and the lens.</li>
                              <li><strong>8. Lens:</strong> The crystalline structure that fine-tunes focus to project light onto the retina.</li>
                            </ul>
                          </li>
                          <li><strong>The Posterior Segment (Processing & Support):</strong>
                            <ul>
                              <li><strong>9. Vitreous:</strong> The clear, gel-like substance filling the main globe of the eye to maintain its shape.</li>
                              <li><strong>10. Retina:</strong> The vital <strong>light-sensitive tissue</strong> that converts visual images into neural signals for the brain.</li>
                              <li><strong>11. Choroid:</strong> The vascular layer located between the retina and sclera, providing oxygen and nutrients.</li>
                            </ul>
                          </li>
                        </ul>
                    </div>

                    <h3 className="font-bold text-slate-800 mb-4 text-lg">Key Structures Covered</h3>
                     <div className="flex flex-wrap items-center justify-center gap-2">
                        {["Eyelid", "Lacrimal System", "Conjunctiva", "Cornea", "Anterior Chamber", "Iris", "Pupil", "Posterior Chamber", "Crystalline Lens", "Vitreous", "Retina", "Choroid", "Sclera"].map(item => (
                            <span key={item} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">{item}</span>
                        ))}
                    </div>
                </div>
                
                <main className="container mx-auto px-4">
                    <div className="space-y-16">
                        <section id="eyelid" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">1</div>
                                <h2 className="text-3xl font-bold text-slate-800">Eyelid</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/162455f66faf7eee5cac7587cdfc4324c601f277/1764967080329-019af03b-ac50-7563-bc78-93fe003b9122.png" alt="Eyelid Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="lacrimal" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">2</div>
                                <h2 className="text-3xl font-bold text-slate-800">Lacrimal System</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/88ff63090e2abe518c532f7fb0d9c63ef618e97c/1764967421933-019af040-f9af-796c-a523-e988b9eedd82.png" alt="Lacrimal System" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                        
                         <section id="conjunctiva" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">3</div>
                                <h2 className="text-3xl font-bold text-slate-800">Conjunctiva</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/74ae7175908f68e40807200ed10bfe6c09f7a026/1764967257365-019af03e-2c6d-7457-a939-a9bf417b7a6e.png" alt="Conjunctiva Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="sclera" className="anatomy-section">
                            <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">4</div>
                                <h2 className="text-3xl font-bold text-slate-800">Sclera</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/09126a742be13922e5183a6ef6867c69d994c01d/1764965526361-019af023-f8c5-72a2-8c29-f5d6a0b1c7b0.png" alt="Sclera Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="cornea" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">5</div>
                                <h2 className="text-3xl font-bold text-slate-800">Cornea</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/5232a93b4dac0721822dad65aad45e94cd2b8455/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a__Create_a_visually_a.png" alt="Cornea Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="ant-chamber" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">6</div>
                                <h2 className="text-3xl font-bold text-slate-800">Anterior Chamber</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/d558561d250032de5636e619d7111ab5b3b8286f/1764966193644-019af02d-e226-71ff-b256-8ae677ccd20f.png" alt="Anterior Chamber Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                        
                        <section id="iris" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">7</div>
                                <h2 className="text-3xl font-bold text-slate-800">Iris</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/09126a742be13922e5183a6ef6867c69d994c01d/1764965673884-019af026-53e0-74d6-879f-b6be2809f59c.png" alt="Iris Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                        
                        <section id="pupil" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">8</div>
                                <h2 className="text-3xl font-bold text-slate-800">Pupil</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/09126a742be13922e5183a6ef6867c69d994c01d/1764965970716-019af02a-d20f-70e2-baa5-7417b2ea57ba.png" alt="Pupil Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="post-chamber" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">9</div>
                                <h2 className="text-3xl font-bold text-slate-800">Posterior Chamber</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/d558561d250032de5636e619d7111ab5b3b8286f/1764966329381-019af030-42e4-7dbc-bf9d-9fbc5ce09e21.png" alt="Posterior Chamber Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="lens" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">10</div>
                                <h2 className="text-3xl font-bold text-slate-800">Crystalline Lens</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/09126a742be13922e5183a6ef6867c69d994c01d/1764966042495-019af02b-f0fb-7cf0-958c-cf01cf8288a6.png" alt="Crystalline Lens Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="vitreous" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">11</div>
                                <h2 className="text-3xl font-bold text-slate-800">Vitreous Body</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/a49f56aad81a083987d2eeec96ff7a29b814d05e/1764966489348-019af032-7eab-7268-bf36-ba41478c0ee2.png" alt="Vitreous Body Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                         <section id="retina" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">12</div>
                                <h2 className="text-3xl font-bold text-slate-800">Retina</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/a49f56aad81a083987d2eeec96ff7a29b814d05e/1764966585916-019af034-23d0-72e0-9847-a40c65c727cf.png" alt="Retina Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="choroid" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">13</div>
                                <h2 className="text-3xl font-bold text-slate-800">Choroid</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/a49f56aad81a083987d2eeec96ff7a29b814d05e/1764966733079-019af036-507b-7e9e-9008-a69d298e1188.png" alt="Choroid Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}

