import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anatomy of the Eye: A Visual Guide for Optometry Students | Focus Links',
  description: 'Explore the complete anatomy of the human eye from anterior to posterior. This guide for optometry students covers the cornea, lens, retina, and all major structures with detailed descriptions and mind maps.',
};

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


export default function AnatomyOfEyePage() {
    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(anatomyPageSchema) }}
        />
        <style jsx global>{`
            :root {
                --primary-anatomy: #0f4c75;
                --secondary-anatomy: #3282b8;
                --accent-anatomy: #bbe1fa;
                --text-main-anatomy: #1b262c;
                --text-light-anatomy: #52616b;
                --bg-body-anatomy: #f0f4f8;
                --bg-card-anatomy: #ffffff;
                --nav-width-anatomy: 260px;
            }

            .anatomy-body {
                font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
                background-color: var(--bg-body-anatomy) !important;
                color: var(--text-main-anatomy);
                line-height: 1.6;
                display: flex;
            }
            
            html {
                scroll-behavior: smooth;
            }

            .anatomy-nav {
                width: var(--nav-width-anatomy);
                background: var(--primary-anatomy);
                color: white;
                height: 100vh;
                position: fixed;
                top: 8rem;
                left: 0;
                overflow-y: auto;
                z-index: 1000;
                box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                scrollbar-width: thin;
                scrollbar-color: var(--secondary-anatomy) var(--primary-anatomy);
            }

            .anatomy-nav .nav-header {
                padding: 25px 20px;
                background: rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .anatomy-nav h2 { font-size: 1.2rem; font-weight: 700; letter-spacing: 0.5px; }
            .anatomy-nav p { font-size: 0.8rem; opacity: 0.7; margin-top: 5px; }

            .anatomy-nav ul { list-style: none; padding: 10px 0; }
            
            .anatomy-nav a {
                display: block;
                padding: 12px 25px;
                color: rgba(255,255,255,0.8);
                text-decoration: none;
                transition: all 0.2s ease;
                font-size: 0.95rem;
                border-left: 4px solid transparent;
            }

            .anatomy-nav a:hover {
                background: rgba(255,255,255,0.1);
                color: white;
                border-left-color: var(--accent-anatomy);
            }
            
            .anatomy-main {
                margin-left: var(--nav-width-anatomy);
                width: calc(100% - var(--nav-width-anatomy));
                padding: 40px;
                max-width: 1400px;
            }

            .anatomy-hero {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-bottom: 40px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                text-align: center;
            }

            .anatomy-hero h1 { color: var(--primary-anatomy); font-size: 2.5rem; margin-bottom: 10px; }
            .hero-subtitle { color: var(--text-light-anatomy); font-size: 1.1rem; }

            .img-container {
                width: 100%;
                background: #e1e8ed;
                border: 2px dashed #aab8c2;
                border-radius: 8px;
                min-height: 300px;
                margin: 20px 0 30px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #667788;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .img-container:hover { border-color: var(--primary-anatomy); background: #dceefb; }
            
            .img-container img {
                width: 100%;
                height: auto;
                display: block;
                object-fit: contain;
            }
            
            .img-label { font-weight: 600; margin-top: 10px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
            .icon-camera { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }

            .anatomy-section {
                background: transparent;
                margin-bottom: 60px;
                scroll-margin-top: 20px;
            }

            .section-header {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid var(--secondary-anatomy);
                padding-bottom: 10px;
            }

            .section-number {
                background: var(--primary-anatomy);
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.2rem;
                margin-right: 15px;
            }

            .anatomy-section h2 { color: var(--primary-anatomy); font-size: 1.8rem; }

            .content-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }

            .anatomy-card {
                background: var(--bg-card-anatomy);
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                border-top: 4px solid var(--secondary-anatomy);
                transition: transform 0.2s;
            }

            .anatomy-card:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }

            .anatomy-card h3 {
                color: var(--primary-anatomy);
                font-size: 1.1rem;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
            }
            
            .anatomy-card ul { list-style: none; }
            .anatomy-card li {
                margin-bottom: 8px;
                padding-left: 15px;
                position: relative;
                font-size: 0.95rem;
            }
            
            .anatomy-card li::before {
                content: "•";
                color: var(--secondary-anatomy);
                font-weight: bold;
                position: absolute;
                left: 0;
            }

            .highlight { font-weight: 600; color: var(--primary-anatomy); }

            @media (max-width: 1024px) {
                .content-grid { grid-template-columns: 1fr 1fr; }
                 .anatomy-nav { display: none; }
                 .anatomy-main { margin-left: 0; width: 100%; }
            }

            @media (max-width: 768px) {
                 .anatomy-body { flex-direction: column; }
                 .anatomy-main { padding: 20px; }
                 .content-grid { grid-template-columns: 1fr; }
                .anatomy-hero h1 { font-size: 2rem; }
            }
        `}</style>
        <div className="anatomy-body">
            <nav className="anatomy-nav">
                <div className="nav-header">
                    <h2>Ocular Anatomy</h2>
                    <p>Optometry Study Guide</p>
                </div>
                <ul>
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#eyelid">1. Eyelid</a></li>
                    <li><a href="#conjunctiva">2. Conjunctiva</a></li>
                    <li><a href="#cornea">3. Cornea</a></li>
                    <li><a href="#ant-chamber">4. Ant. Chamber</a></li>
                    <li><a href="#iris">5. Iris</a></li>
                    <li><a href="#pupil">6. Pupil</a></li>
                    <li><a href="#post-chamber">7. Post. Chamber</a></li>
                    <li><a href="#lens">8. Lens</a></li>
                    <li><a href="#vitreous">9. Vitreous</a></li>
                    <li><a href="#retina">10. Retina</a></li>
                    <li><a href="#choroid">11. Choroid</a></li>
                    <li><a href="#sclera">12. Sclera</a></li>
                </ul>
            </nav>

            <main className="anatomy-main">
                <div id="overview" className="anatomy-hero">
                    <h1>Anatomy of the Eye</h1>
                    <p className="hero-subtitle">Visual Guide & Mind Maps for Optometry Students</p>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Overview Image Here</div>
                    </div>
                </div>

                <section id="eyelid" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">1</div>
                        <h2>Eyelid</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Eyelid Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Layers (Anterior to Posterior)</h3>
                            <ul>
                                <li><span className="highlight">Skin (Epidermis/Dermis):</span> Thin, elastic, minimal fat.</li>
                                <li><span className="highlight">Subcutaneous Tissue:</span> Loose connective tissue.</li>
                                <li><span className="highlight">Muscles:</span> Orbicularis Oculi.</li>
                                <li><span className="highlight">Tarsal Plates:</span> Dense connective tissue skeleton (Upper: 10-12mm, Lower: 4mm).</li>
                                <li><span className="highlight">Conjunctiva:</span> Palpebral layer.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Muscles & Nerves</h3>
                            <ul>
                                <li><span className="highlight">Orbicularis Oculi (CN VII):</span> Closure & blinking.</li>
                                <li><span className="highlight">Levator Palpebrae (CN III):</span> Elevates upper lid.</li>
                                <li><span className="highlight">Müller’s Muscle (Sympathetic):</span> Maintains elevation (Superior tarsal).</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Glands</h3>
                            <ul>
                                <li><span className="highlight">Meibomian:</span> Sebaceous, in tarsal plate (Lipid layer).</li>
                                <li><span className="highlight">Zeis:</span> Sebaceous, associated with cilia.</li>
                                <li><span className="highlight">Moll:</span> Apocrine sweat glands.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="conjunctiva" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">2</div>
                        <h2>Conjunctiva</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Conjunctiva Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Gross Anatomy</h3>
                            <ul>
                                <li><span className="highlight">Palpebral:</span> Lines inner eyelid (Marginal, Tarsal, Orbital). Highly vascular.</li>
                                <li><span className="highlight">Fornix:</span> Reflection point/cul-de-sac. Allows movement.</li>
                                <li><span className="highlight">Bulbar:</span> Covers anterior sclera. Thin, mobile, ends at limbus.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Histology</h3>
                            <ul>
                                <li><span className="highlight">Epithelium:</span> Non-keratinized stratified squamous. Contains Goblet Cells.</li>
                                <li><span className="highlight">Stroma (Substantia Propria):</span> 
                                    <br />- Adenoid Layer (Lymphoid tissue)
                                    <br />- Fibrous Layer (Vessels/Nerves)
                                </li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Functions</h3>
                            <ul>
                                <li><span className="highlight">Mucin Production:</span> By Goblet cells for tear stability.</li>
                                <li><span className="highlight">Immunological:</span> Physical barrier & immune cells.</li>
                                <li><span className="highlight">Lubrication:</span> Prevents desiccation.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="cornea" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">3</div>
                        <h2>Cornea</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Cornea Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>The 5 Layers</h3>
                            <ul>
                                <li><span className="highlight">Epithelium:</span> Outer layer, interacts with tear film, regenerative.</li>
                                <li><span className="highlight">Bowman’s Layer:</span> Acellular collagen, protective barrier, scars if damaged.</li>
                                <li><span className="highlight">Stroma (90%):</span> Regular collagen arrangement (transparency), contains keratocytes.</li>
                                <li><span className="highlight">Descemet’s Membrane:</span> Elastic basement membrane of endothelium.</li>
                                <li><span className="highlight">Endothelium:</span> Inner monolayer, non-regenerative.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Physiology</h3>
                            <ul>
                                <li><span className="highlight">Pump Mechanism:</span> Endothelium pumps ions/fluid out to maintain dehydration (deturgescence).</li>
                                <li><span className="highlight">Transparency:</span> Due to avascularity and regular fibril lattice in stroma.</li>
                                <li><span className="highlight">Nutrition:</span> Via Aqueous Humor (posteriorly) and Tear film/Limbal vessels (anteriorly).</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="ant-chamber" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">4</div>
                        <h2>Anterior Chamber</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Anterior Chamber Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Boundaries</h3>
                            <ul>
                                <li><span className="highlight">Anterior:</span> Corneal Endothelium.</li>
                                <li><span className="highlight">Posterior:</span> Iris surface & lens.</li>
                                <li><span className="highlight">Peripheral:</span> The Angle structures.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Angle Structures (Post to Ant)</h3>
                            <ul>
                                <li><span className="highlight">Ciliary Body Band:</span> Uveoscleral outflow site.</li>
                                <li><span className="highlight">Scleral Spur:</span> Anchor for ciliary muscle.</li>
                                <li><span className="highlight">Trabecular Meshwork:</span> Main drainage filter.</li>
                                <li><span className="highlight">Schwalbe’s Line:</span> Termination of Descemet's.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Aqueous Dynamics</h3>
                            <ul>
                                <li>Produced in Posterior Chamber (Ciliary Processes).</li>
                                <li>Flows through pupil.</li>
                                <li>Drains via Canal of Schlemm (Conventional) or Uveoscleral route.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="iris" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">5</div>
                        <h2>Iris</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Iris Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Muscles & Function</h3>
                            <ul>
                                <li><span className="highlight">Sphincter Pupillae:</span> Circular muscle, constricts pupil (Parasympathetic).</li>
                                <li><span className="highlight">Dilator Pupillae:</span> Radial fibers, dilates pupil (Sympathetic).</li>
                                <li><span className="highlight">Function:</span> Regulates light entry (aperture).</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Structure</h3>
                            <ul>
                                <li><span className="highlight">Anterior Border Layer:</span> Surface fibroblasts/melanocytes.</li>
                                <li><span className="highlight">Stroma:</span> Vascular connective tissue, determines eye color (melanin).</li>
                                <li><span className="highlight">Pigmented Epithelium:</span> Posterior layer, blocks light, absorbs stray light.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="pupil" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">6</div>
                        <h2>Pupil</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Pupil Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Reflexes</h3>
                            <ul>
                                <li><span className="highlight">Light Reflex:</span> Constriction to bright light.
                                    <br /><i>Path: Retina → Optic Nerve → Pretectal Nucleus → Edinger-Westphal → CN III → Sphincter.</i></li>
                                <li><span className="highlight">Near Reflex:</span> Triad of Convergence, Accommodation, and Miosis.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Autonomic Control</h3>
                            <ul>
                                <li><span className="highlight">Miosis (Constriction):</span> Parasympathetic response (Sleep, bright light).</li>
                                <li><span className="highlight">Mydriasis (Dilation):</span> Sympathetic response (Fear, dim light).</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="post-chamber" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">7</div>
                        <h2>Posterior Chamber</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Posterior Chamber Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Location</h3>
                            <ul>
                                <li>Small space behind the iris and in front of the vitreous face/lens.</li>
                                <li>Contains the <span className="highlight">Ciliary Processes</span> (Pars Plicata).</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Key Contents</h3>
                            <ul>
                                <li><span className="highlight">Aqueous Humor:</span> Secreted here before moving to anterior chamber.</li>
                                <li><span className="highlight">Zonules (Suspensory Ligaments):</span> Connect ciliary body to lens equator.</li>
                                <li><span className="highlight">Canal of Petit:</span> Retro-zonular space.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="lens" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">8</div>
                        <h2>Lens</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Lens Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Anatomy</h3>
                            <ul>
                                <li><span className="highlight">Capsule:</span> Elastic basement membrane.</li>
                                <li><span className="highlight">Cortex:</span> Peripheral, softer fibers.</li>
                                <li><span className="highlight">Nucleus:</span> Central, harder fibers (Embryonic, Fetal, Adult).</li>
                                <li><span className="highlight">Equator:</span> Germinative zone for new fibers.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Function</h3>
                            <ul>
                                <li><span className="highlight">Accommodation:</span> Changes shape to focus on near objects (Ciliary muscle contracts → Zonules relax → Lens rounds up).</li>
                                <li><span className="highlight">Transparency:</span> Crystallin protein arrangement.</li>
                                <li><span className="highlight">Refraction:</span> Provides ~1/3 of eye's optical power.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="vitreous" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">9</div>
                        <h2>Vitreous Body</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Vitreous Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Composition</h3>
                            <ul>
                                <li>99% Water (Bulk volume).</li>
                                <li><span className="highlight">Collagen Fibrils:</span> Type II, IX, XI (Structural framework).</li>
                                <li><span className="highlight">Hyaluronic Acid:</span> Viscosity & hydration.</li>
                                <li><span className="highlight">Cells:</span> Hyalocytes (phagocytes) & Fibroblasts.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Attachments (Strongest to Weakest)</h3>
                            <ol>
                                <li><span className="highlight">Vitreous Base:</span> At Ora Serrata.</li>
                                <li>Posterior Lens Capsule (Weiger's lig).</li>
                                <li>Optic Disc (Weiss Ring).</li>
                                <li>Macula.</li>
                                <li>Retinal Vessels.</li>
                            </ol>
                        </div>
                        <div className="anatomy-card">
                            <h3>Features</h3>
                            <ul>
                                <li><span className="highlight">Cloquet’s Canal:</span> Remnant of embryonic hyaloid artery.</li>
                                <li><span className="highlight">Berger's Space:</span> Retrolental space.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="retina" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">10</div>
                        <h2>Retina</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Retina Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Outer Layers (Choroid Side)</h3>
                            <ul>
                                <li><span className="highlight">RPE:</span> Support, waste removal, vitamin A metabolism.</li>
                                <li><span className="highlight">Photoreceptors:</span> Rods (night vision) & Cones (color/detail).</li>
                                <li><span className="highlight">Outer Nuclear Layer:</span> Photoreceptor cell bodies.</li>
                                <li><span className="highlight">Outer Plexiform Layer:</span> Synapse site.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Inner Layers (Vitreous Side)</h3>
                            <ul>
                                <li><span className="highlight">Inner Nuclear Layer:</span> Bipolar, Horizontal, Amacrine cells.</li>
                                <li><span className="highlight">Inner Plexiform Layer:</span> Synapse site.</li>
                                <li><span className="highlight">Ganglion Cell Layer:</span> Nuclei of ganglion cells.</li>
                                <li><span className="highlight">Nerve Fiber Layer:</span> Axons forming optic nerve.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Support & Supply</h3>
                            <ul>
                                <li><span className="highlight">Müller Cells:</span> Glial support spanning retinal thickness.</li>
                                <li><span className="highlight">Dual Blood Supply:</span> Central Retinal Artery (Inner layers) + Choriocapillaris (Outer layers/Photoreceptors).</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="choroid" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">11</div>
                        <h2>Choroid</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Choroid Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Vascular Layers</h3>
                            <ul>
                                <li><span className="highlight">Haller’s Layer:</span> Outer, large vessels (Arteries/Veins).</li>
                                <li><span className="highlight">Sattler’s Layer:</span> Middle, medium vessels.</li>
                                <li><span className="highlight">Choriocapillaris:</span> Innermost, highly fenestrated. Nourishes RPE and Photoreceptors.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Associated Structures</h3>
                            <ul>
                                <li><span className="highlight">Bruch’s Membrane:</span> Collagen/Elastic barrier between RPE and Choroid.</li>
                                <li><span className="highlight">Suprachoroid (Lamina Fusca):</span> Transition zone to sclera. Potential space.</li>
                                <li><span className="highlight">Stroma:</span> Contains melanocytes (pigment) and immune cells.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="sclera" className="anatomy-section">
                    <div className="section-header">
                        <div className="section-number">12</div>
                        <h2>Sclera</h2>
                    </div>
                    <div className="img-container">
                        <div className="icon-camera">📷</div>
                        <div className="img-label">Insert Sclera Mind Map Here</div>
                    </div>
                    <div className="content-grid">
                        <div className="anatomy-card">
                            <h3>Structure & Layers</h3>
                            <ul>
                                <li><span className="highlight">Episclera:</span> Outer, vascular, connective tissue.</li>
                                <li><span className="highlight">Stroma (Sclera Proper):</span> Thickest part. Dense irregular collagen. Avascular.</li>
                                <li><span className="highlight">Lamina Fusca:</span> Inner pigmented layer adjacent to choroid.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Openings & Landmarks</h3>
                            <ul>
                                <li><span className="highlight">Limbus:</span> Corneo-scleral junction.</li>
                                <li><span className="highlight">Lamina Cribrosa:</span> Sieve-like exit for Optic Nerve fibers.</li>
                                <li><span className="highlight">Vortex Veins:</span> 4+ veins draining the choroid.</li>
                                <li><span className="highlight">Canal of Schlemm:</span> Aqueous drainage.</li>
                            </ul>
                        </div>
                        <div className="anatomy-card">
                            <h3>Nerve Supply</h3>
                            <ul>
                                <li>Innervated by <span className="highlight">Ciliary Nerves</span> (Short and Long).</li>
                                <li>Highly sensitive (especially anteriorly).</li>
                                <li>Pain source in Scleritis.</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </main>
        </div>
        </>
    );
}
