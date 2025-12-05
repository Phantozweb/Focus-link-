
'use client';

import Image from 'next/image';

export function AnatomyOfEyeClient() {
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
             <div className="bg-brand-bg">
                <div className="text-center max-w-3xl mx-auto py-12 px-4">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Anatomy of the Eye</h1>
                    <p className="text-lg text-slate-600">A Visual Guide with Mind Maps for Optometry Students</p>
                </div>

                <div className="relative w-full aspect-[16/7] bg-slate-100 shadow-lg border-y mb-16" onContextMenu={(e) => e.preventDefault()}>
                    <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/252f68a5286cefc974580f5f4d4d4c269fd2b5f6/1764967742990-019af045-72c7-7fff-a9bc-93b78684126b.png" alt="Anatomy of the Eye Overview" layout="fill" objectFit="contain" quality={100} />
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
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Layers (Anterior to Posterior)</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Skin (Epidermis/Dermis):</strong> Thin, elastic, minimal fat.</li>
                                        <li><strong className="font-semibold text-slate-700">Subcutaneous Tissue:</strong> Loose connective tissue.</li>
                                        <li><strong className="font-semibold text-slate-700">Muscles:</strong> Orbicularis Oculi.</li>
                                        <li><strong className="font-semibold text-slate-700">Tarsal Plates:</strong> Dense connective tissue skeleton (Upper: 10-12mm, Lower: 4mm).</li>
                                        <li><strong className="font-semibold text-slate-700">Conjunctiva:</strong> Palpebral layer.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Muscles & Nerves</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Orbicularis Oculi (CN VII):</strong> Closure & blinking.</li>
                                        <li><strong className="font-semibold text-slate-700">Levator Palpebrae (CN III):</strong> Elevates upper lid.</li>
                                        <li><strong className="font-semibold text-slate-700">Müller’s Muscle (Sympathetic):</strong> Maintains elevation (Superior tarsal).</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Glands</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Meibomian:</strong> Sebaceous, in tarsal plate (Lipid layer).</li>
                                        <li><strong className="font-semibold text-slate-700">Zeis:</strong> Sebaceous, associated with cilia.</li>
                                        <li><strong className="font-semibold text-slate-700">Moll:</strong> Apocrine sweat glands.</li>
                                    </ul>
                                </div>
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
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Secretory System (Tear Production)</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Main Lacrimal Gland:</strong> Produces reflex tears. Located superotemporally in the orbit.</li>
                                        <li><strong className="font-semibold text-slate-700">Accessory Glands (Krause & Wolfring):</strong> Produce basal (maintenance) tears.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Excretory System (Tear Drainage)</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Puncta:</strong> Openings on the eyelid margin.</li>
                                        <li><strong className="font-semibold text-slate-700">Canaliculi:</strong> Tiny channels leading from puncta.</li>
                                        <li><strong className="font-semibold text-slate-700">Lacrimal Sac:</strong> Collects tears.</li>
                                        <li><strong className="font-semibold text-slate-700">Nasolacrimal Duct:</strong> Drains tears into the nasal cavity.</li>
                                    </ul>
                                </div>
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
                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Gross Anatomy</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Palpebral:</strong> Lines inner eyelid (Marginal, Tarsal, Orbital). Highly vascular.</li>
                                        <li><strong className="font-semibold text-slate-700">Fornix:</strong> Reflection point/cul-de-sac. Allows movement.</li>
                                        <li><strong className="font-semibold text-slate-700">Bulbar:</strong> Covers anterior sclera. Thin, mobile, ends at limbus.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Histology</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Epithelium:</strong> Non-keratinized stratified squamous. Contains Goblet Cells.</li>
                                        <li><strong className="font-semibold text-slate-700">Stroma (Substantia Propria):</strong> 
                                            <br />- Adenoid Layer (Lymphoid tissue)
                                            <br />- Fibrous Layer (Vessels/Nerves)
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Functions</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Mucin Production:</strong> By Goblet cells for tear stability.</li>
                                        <li><strong className="font-semibold text-slate-700">Immunological:</strong> Physical barrier & immune cells.</li>
                                        <li><strong className="font-semibold text-slate-700">Lubrication:</strong> Prevents desiccation.</li>
                                    </ul>
                                </div>
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
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">The 5 Layers</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Epithelium:</strong> Outer layer, interacts with tear film, regenerative.</li>
                                        <li><strong className="font-semibold text-slate-700">Bowman’s Layer:</strong> Acellular collagen, protective barrier, scars if damaged.</li>
                                        <li><strong className="font-semibold text-slate-700">Stroma (90%):</strong> Regular collagen arrangement (transparency), contains keratocytes.</li>
                                        <li><strong className="font-semibold text-slate-700">Descemet’s Membrane:</strong> Elastic basement membrane of endothelium.</li>
                                        <li><strong className="font-semibold text-slate-700">Endothelium:</strong> Inner monolayer, non-regenerative.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Physiology</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Pump Mechanism:</strong> Endothelium pumps ions/fluid out to maintain dehydration (deturgescence).</li>
                                        <li><strong className="font-semibold text-slate-700">Transparency:</strong> Due to avascularity and regular fibril lattice in stroma.</li>
                                        <li><strong className="font-semibold text-slate-700">Nutrition:</strong> Via Aqueous Humor (posteriorly) and Tear film/Limbal vessels (anteriorly).</li>
                                    </ul>
                                </div>
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
                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Boundaries</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Anterior:</strong> Corneal Endothelium.</li>
                                        <li><strong className="font-semibold text-slate-700">Posterior:</strong> Iris surface & lens.</li>
                                        <li><strong className="font-semibold text-slate-700">Peripheral:</strong> The Angle structures.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Angle Structures (Post to Ant)</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Ciliary Body Band:</strong> Uveoscleral outflow site.</li>
                                        <li><strong className="font-semibold text-slate-700">Scleral Spur:</strong> Anchor for ciliary muscle.</li>
                                        <li><strong className="font-semibold text-slate-700">Trabecular Meshwork:</strong> Main drainage filter.</li>
                                        <li><strong className="font-semibold text-slate-700">Schwalbe’s Line:</strong> Termination of Descemet's.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Aqueous Dynamics</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li>Produced in Posterior Chamber (Ciliary Processes).</li>
                                        <li>Flows through pupil.</li>
                                        <li>Drains via Canal of Schlemm (Conventional) or Uveoscleral route.</li>
                                    </ul>
                                </div>
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
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Muscles & Function</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Sphincter Pupillae:</strong> Circular muscle, constricts pupil (Parasympathetic).</li>
                                        <li><strong className="font-semibold text-slate-700">Dilator Pupillae:</strong> Radial fibers, dilates pupil (Sympathetic).</li>
                                        <li><strong className="font-semibold text-slate-700">Function:</strong> Regulates light entry (aperture).</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Structure</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Anterior Border Layer:</strong> Surface fibroblasts/melanocytes.</li>
                                        <li><strong className="font-semibold text-slate-700">Stroma:</strong> Vascular connective tissue, determines eye color (melanin).</li>
                                        <li><strong className="font-semibold text-slate-700">Pigmented Epithelium:</strong> Posterior layer, blocks light, absorbs stray light.</li>
                                    </ul>
                                </div>
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
