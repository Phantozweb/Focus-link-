
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
    
     const anatomyCards = [
        { number: 1, title: 'Eyelid', description: 'Protective external fold that shields the eye.', icon: <Shield className="w-6 h-6"/> },
        { number: 2, title: 'Conjunctiva', description: 'Thin, clear membrane covering the sclera.', icon: <Layers className="w-6 h-6"/> },
        { number: 3, title: 'Cornea', description: 'Transparent outer layer that refracts light.', icon: <Sun className="w-6 h-6"/> },
        { number: 4, title: 'Anterior Chamber', description: 'Fluid-filled space between the cornea and iris.', icon: <Droplet className="w-6 h-6"/> },
        { number: 5, title: 'Iris', description: 'The colored part of the eye that controls pupil size.', icon: <Dot className="w-8 h-8"/> },
        { number: 6, title: 'Pupil', description: 'Central opening that admits light into the eye.', icon: <Camera className="w-6 h-6"/> },
        { number: 7, title: 'Posterior Chamber', description: 'Narrow space between the iris and the lens.', icon: <Droplet className="w-6 h-6"/> },
        { number: 8, title: 'Lens', description: 'Crystalline structure that fine-tunes focus onto the retina.', icon: <Eye className="w-6 h-6"/> },
        { number: 9, title: 'Vitreous', description: 'Clear, gel-like substance filling the main globe of the eye.', icon: <Droplet className="w-6 h-6"/> },
        { number: 10, title: 'Retina', description: 'Light-sensitive tissue that converts visual images into neural signals.', icon: <Camera className="w-6 h-6"/> },
        { number: 11, title: 'Choroid', description: 'Vascular layer between the retina and sclera, providing nutrients.', icon: <Layers className="w-6 h-6"/> },
        { number: 12, title: 'Sclera', description: 'The tough, white outer layer providing structural protection.', icon: <Shield className="w-6 h-6"/> },
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
                     <p className="text-lg text-slate-600">Enhance your medical studies with this comprehensive overview of the anatomy of the eye. Designed specifically for optometry students, ophthalmology residents, and healthcare professionals, this labeled diagram provides a clear, professional breakdown of the human eye's physiological structure. Whether you are looking for optometry revision notes or a quick reference for patient education, this visual guide covers the 12 essential components of ocular anatomy.</p>
                </div>

                <div className="relative w-full aspect-[16/7] bg-slate-100 shadow-lg border-y mb-16 rounded-lg overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
                    <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/d5d342fec3746c8788c22ad434333607e447d031/IMG_20251206_044102.png" alt="Anatomy of the Eye Overview" layout="fill" objectFit="contain" quality={100} />
                </div>
                
                 <section className="py-16 -mt-16">
                    <div className="container mx-auto px-4">
                       <div className="prose prose-lg max-w-none mb-12 text-center mx-auto">
                            <p>This medical illustration details the path of light and the protective layers of the globe:</p>
                             <ul className="list-none p-0 text-left grid md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                                <li><strong>External Protection:</strong>
                                    <ul className="list-disc pl-5 mt-1">
                                        <li><strong>1. Eyelid:</strong> The protective external fold that shields the eye.</li>
                                        <li><strong>2. Conjunctiva:</strong> The thin, clear membrane covering the <strong>sclera</strong> (12), which is the tough, white outer layer providing structural protection.</li>
                                    </ul>
                                </li>
                                <li className="mt-4 md:mt-0"><strong>The Anterior Segment (Light Entry):</strong>
                                    <ul className="list-disc pl-5 mt-1">
                                        <li><strong>3. Cornea:</strong> The transparent outer layer responsible for the primary <strong>refraction of light</strong>.</li>
                                        <li><strong>6. Pupil:</strong> The central opening that admits light into the eye.</li>
                                        <li><strong>5. Iris:</strong> The colored part of the eye that functions as a diaphragm to <strong>control pupil size</strong>.</li>
                                    </ul>
                                </li>
                                <li className="mt-4 lg:mt-0"><strong>Fluid Chambers & Focusing:</strong>
                                    <ul className="list-disc pl-5 mt-1">
                                        <li><strong>4. Anterior Chamber:</strong> The fluid-filled space situated between the cornea and the iris.</li>
                                        <li><strong>7. Posterior Chamber:</strong> The narrow space between the iris and the lens.</li>
                                        <li><strong>8. Lens:</strong> The crystalline structure that fine-tunes focus to project light onto the retina.</li>
                                    </ul>
                                </li>
                                <li className="mt-4"><strong>The Posterior Segment (Processing & Support):</strong>
                                    <ul className="list-disc pl-5 mt-1">
                                        <li><strong>9. Vitreous:</strong> The clear, gel-like substance filling the main globe of the eye to maintain its shape.</li>
                                        <li><strong>10. Retina:</strong> The vital <strong>light-sensitive tissue</strong> that converts visual images into neural signals for the brain.</li>
                                        <li><strong>11. Choroid:</strong> The vascular layer located between the retina and sclera, providing oxygen and nutrients.</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Key Structures at a Glance</h2>
                            <p className="text-lg text-slate-600 mb-8">Click on a structure to jump to its detailed mind map.</p>
                             <div className="flex flex-wrap items-center justify-center gap-2">
                                {structures.map(structure => (
                                    <Link key={structure.id} href={`#${structure.id}`} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                                        {structure.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
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
                                        <li><strong className="font-semibold text-slate-700">Main Lacrimal Gland:</strong> Located superotemporally in the orbit. Produces reflex (aqueous) tears.</li>
                                        <li><strong className="font-semibold text-slate-700">Accessory Glands (Krause & Wolfring):</strong> Located in conjunctival fornices. Produce basal (maintenance) tears.</li>
                                    </ul>
                                </div>
                                <div className="bg-card p-6 rounded-lg shadow-soft border-t-4 border-primary">
                                    <h3 className="font-bold text-slate-800 mb-3">Excretory System (Tear Drainage)</h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li><strong className="font-semibold text-slate-700">Puncta:</strong> Superior & Inferior entry points on the eyelid margin.</li>
                                        <li><strong className="font-semibold text-slate-700">Canaliculi:</strong> Tiny ducts leading from puncta, joining to form the common canaliculus.</li>
                                        <li><strong className="font-semibold text-slate-700">Lacrimal Sac:</strong> Collects tears before they enter the duct.</li>
                                        <li><strong className="font-semibold text-slate-700">Nasolacrimal Duct:</strong> Drains tears into the nasal cavity at the inferior meatus.</li>
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
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965526361-019af023-f8c5-72a2-8c29-f5d6a0b1c7b0.png?raw=true" alt="Sclera Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="cornea" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">5</div>
                                <h2 className="text-3xl font-bold text-slate-800">Cornea</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                                <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/gemini-3-pro-image-preview-2k%20(nano-banana-pro)_a__Create_a_visually_a.png?raw=true" alt="Cornea Mind Map" layout="fill" objectFit="contain" quality={100} />
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
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966193644-019af02d-e226-71ff-b256-8ae677ccd20f.png?raw=true" alt="Anterior Chamber Mind Map" layout="fill" objectFit="contain" quality={100} />
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
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965673884-019af026-53e0-74d6-879f-b6be2809f59c.png?raw=true" alt="Iris Mind Map" layout="fill" objectFit="contain" quality={100} />
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
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764965970716-019af02a-d20f-70e2-baa5-7417b2ea57ba.png?raw=true" alt="Pupil Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="post-chamber" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">9</div>
                                <h2 className="text-3xl font-bold text-slate-800">Posterior Chamber</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966329381-019af030-42e4-7dbc-bf9d-9fbc5ce09e21.png?raw=true" alt="Posterior Chamber Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="lens" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">10</div>
                                <h2 className="text-3xl font-bold text-slate-800">Crystalline Lens</h2>
                            </div>
                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966042495-019af02b-f0fb-7cf0-958c-cf01cf8288a6.png?raw=true" alt="Crystalline Lens Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="vitreous" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">11</div>
                                <h2 className="text-3xl font-bold text-slate-800">Vitreous Body</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966489348-019af032-7eab-7268-bf36-ba41478c0ee2.png?raw=true" alt="Vitreous Body Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                         <section id="retina" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">12</div>
                                <h2 className="text-3xl font-bold text-slate-800">Retina</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966585916-019af034-23d0-72e0-9847-a40c65c727cf.png?raw=true" alt="Retina Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>

                        <section id="choroid" className="anatomy-section">
                             <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-primary/20">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg flex-shrink-0">13</div>
                                <h2 className="text-3xl font-bold text-slate-800">Choroid</h2>
                            </div>
                             <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-md border mb-6" onContextMenu={(e) => e.preventDefault()}>
                               <Image src="https://raw.githubusercontent.com/Phantozweb/focuslinks-assets/main/1764966733079-019af036-507b-7e9e-9008-a69d298e1188.png?raw=true" alt="Choroid Mind Map" layout="fill" objectFit="contain" quality={100} />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
