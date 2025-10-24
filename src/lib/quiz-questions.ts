
export type Question = {
    id: string;
    module: string;
    text: string;
    options: { id: 'a' | 'b' | 'c' | 'd'; text: string }[];
    correctAnswer: 'a' | 'b' | 'c' | 'd';
};

export const quizModules = [
  { topic: 'Eyelids & Adnexa', time: 5 * 60 },
  { topic: 'Conjunctiva & Sclera', time: 6 * 60 },
  { topic: 'Cornea', time: 7 * 60 },
  { topic: 'Anterior Chamber & Aqueous Humor', time: 6 * 60 },
  { topic: 'Iris & Pupil', time: 6 * 60 },
  { topic: 'Crystalline Lens & Accommodation', time: 7 * 60 },
  { topic: 'Vitreous Body', time: 5 * 60 },
  { topic: 'Retina', time: 9 * 60 },
  { topic: 'Optic Nerve & Pathways', time: 9 * 60 },
  { topic: 'Extraocular Muscles & Ocular Motility', time: 5 * 60 },
];

export const questions: Question[] = [
    // Module 1: Eyelids & Adnexa
    {
        id: 'm1q1',
        module: 'Eyelids & Adnexa',
        text: 'Which gland is responsible for the oily layer of the tear film?',
        options: [
            { id: 'a', text: 'Lacrimal Gland' },
            { id: 'b', text: 'Glands of Krause' },
            { id: 'c', text: 'Meibomian Gland' },
            { id: 'd', text: 'Glands of Wolfring' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm1q2',
        module: 'Eyelids & Adnexa',
        text: "Bell's phenomenon is the upward and outward rotation of the eyeball on attempted closure of the eyelids. Which cranial nerve mediates this reflex?",
        options: [
            { id: 'a', text: 'CN III (Oculomotor)' },
            { id: 'b', text: 'CN V (Trigeminal)' },
            { id: 'c', text: 'CN IV (Trochlear)' },
            { id: 'd', text: 'CN VII (Facial)' },
        ],
        correctAnswer: 'd',
    },
    // Add 8 more for Module 1
     {
        id: 'm1q3',
        module: 'Eyelids & Adnexa',
        text: 'Ptosis refers to the drooping of which structure?',
        options: [
            { id: 'a', text: 'Lower eyelid' },
            { id: 'b', text: 'Upper eyelid' },
            { id: 'c', text: 'Eyebrow' },
            { id: 'd', text: 'Conjunctiva' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm1q4',
        module: 'Eyelids & Adnexa',
        text: 'The muscle responsible for elevating the upper eyelid is primarily the:',
        options: [
            { id: 'a', text: 'Orbicularis oculi' },
            { id: 'b', text: 'Levator palpebrae superioris' },
            { id: 'c', text: 'Müller\'s muscle' },
            { id: 'd', text: 'Frontalis muscle' },
        ],
        correctAnswer: 'b',
    },
     {
        id: 'm1q5',
        module: 'Eyelids & Adnexa',
        text: 'A chalazion is a blockage of which gland?',
        options: [
            { id: 'a', text: 'Gland of Zeis' },
            { id: 'b', text: 'Gland of Moll' },
            { id: 'c', text: 'Meibomian Gland' },
            { id: 'd', text: 'Lacrimal Gland' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm1q6',
        module: 'Eyelids & Adnexa',
        text: 'The palpebral conjunctiva lines which surface?',
        options: [
            { id: 'a', text: 'The anterior surface of the sclera' },
            { id: 'b', text: 'The posterior surface of the eyelids' },
            { id: 'c', text: 'The cornea' },
            { id: 'd', text: 'The fornix' },
        ],
        correctAnswer: 'b',
    },
     {
        id: 'm1q7',
        module: 'Eyelids & Adnexa',
        text: 'Which part of the lacrimal drainage system is the first point of tear entry?',
        options: [
            { id: 'a', text: 'Lacrimal sac' },
            { id: 'b', text: 'Nasolacrimal duct' },
            { id: 'c', text: 'Canaliculi' },
            { id: 'd', text: 'Lacrimal puncta' },
        ],
        correctAnswer: 'd',
    },
    {
        id: 'm1q8',
        module: 'Eyelids & Adnexa',
        text: 'An internal hordeolum (stye) is an infection of which gland?',
        options: [
            { id: 'a', text: 'Meibomian gland' },
            { id: 'b', text: 'Gland of Zeis' },
            { id: 'c', text: 'Gland of Moll' },
            { id: 'd', text: 'Lacrimal gland' },
        ],
        correctAnswer: 'a',
    },
     {
        id: 'm1q9',
        module: 'Eyelids & Adnexa',
        text: 'The gray line of the eyelid margin is an important surgical landmark that represents the location of the:',
        options: [
            { id: 'a', text: 'Meibomian gland orifices' },
            { id: 'b', text: 'Insertion of the levator aponeurosis' },
            { id: 'c', text: 'Muscle of Riolan (a portion of the orbicularis oculi)' },
            { id: 'd', text: 'Tarsal plate border' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm1q10',
        module: 'Eyelids & Adnexa',
        text: 'Entropion is a condition where the eyelid margin:',
        options: [
            { id: 'a', text: 'Turns outward' },
            { id: 'b', text: 'Turns inward' },
            { id: 'c', text: 'Fails to close completely' },
            { id: 'd', text: 'Is excessively droopy' },
        ],
        correctAnswer: 'b',
    },


    // Module 2: Conjunctiva & Sclera
    {
        id: 'm2q1',
        module: 'Conjunctiva & Sclera',
        text: 'Which type of cells in the conjunctiva are responsible for producing mucin?',
        options: [
            { id: 'a', text: 'Epithelial cells' },
            { id: 'b', text: 'Goblet cells' },
            { id: 'c', text: 'Melanocytes' },
            { id: 'd', text: 'Langerhans cells' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm2q2',
        module: 'Conjunctiva & Sclera',
        text: 'A pinguecula is a degenerative condition of the conjunctiva that is most commonly found in which location?',
        options: [
            { id: 'a', text: 'Superior bulbar conjunctiva' },
            { id: 'b', text: 'Inferior palpebral conjunctiva' },
            { id: 'c', text: 'Nasal and temporal interpalpebral conjunctiva' },
            { id: 'd', text: 'Forniceal conjunctiva' },
        ],
        correctAnswer: 'c',
    },
    // Add 8 more for Module 2
     {
        id: 'm2q3',
        module: 'Conjunctiva & Sclera',
        text: 'The sclera is thinnest at which point?',
        options: [
            { id: 'a', text: 'At the limbus' },
            { id: 'b', text: 'At the posterior pole' },
            { id: 'c', text: 'Just behind the insertions of the extraocular rectus muscles' },
            { id: 'd', text: 'At the equator' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm2q4',
        module: 'Conjunctiva & Sclera',
        text: 'A blueish discoloration of the sclera can be associated with which systemic condition?',
        options: [
            { id: 'a', text: 'Diabetes' },
            { id: 'b', text: 'Hypertension' },
            { id: 'c', text: 'Osteogenesis imperfecta' },
            { id: 'd', text: 'Hyperthyroidism' },
        ],
        correctAnswer: 'c',
    },
     {
        id: 'm2q5',
        module: 'Conjunctiva & Sclera',
        text: 'The palisades of Vogt, a source of corneal epithelial stem cells, are located in which region?',
        options: [
            { id: 'a', text: 'The bulbar conjunctiva' },
            { id: 'b', text: 'The tarsal conjunctiva' },
            { id: 'c', text: 'The limbus' },
            { id: 'd', text: 'The fornix' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm2q6',
        module: 'Conjunctiva & Sclera',
        text: 'Giant papillary conjunctivitis (GPC) is most commonly associated with:',
        options: [
            { id: 'a', text: 'Viral infections' },
            { id: 'b', text: 'Bacterial infections' },
            { id: 'c', text: 'Contact lens wear' },
            { id: 'd', text: 'Seasonal allergies' },
        ],
        correctAnswer: 'c',
    },
     {
        id: 'm2q7',
        module: 'Conjunctiva & Sclera',
        text: 'What is the primary structural protein of the sclera?',
        options: [
            { id: 'a', text: 'Elastin' },
            { id: 'b', text: 'Keratin' },
            { id: 'c', text: 'Collagen Type I' },
            { id: 'd', text: 'Fibronectin' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm2q8',
        module: 'Conjunctiva & Sclera',
        text: 'Episcleritis is an inflammation of the tissue between the:',
        options: [
            { id: 'a', text: 'Sclera and choroid' },
            { id: 'b', text: 'Conjunctiva and sclera' },
            { id: 'c', text: 'Cornea and sclera' },
            { id: 'd', text: 'Sclera and retina' },
        ],
        correctAnswer: 'b',
    },
     {
        id: 'm2q9',
        module: 'Conjunctiva & Sclera',
        text: 'Which vessel layer is superficial to the sclera?',
        options: [
            { id: 'a', text: 'Choroid' },
            { id: 'b', text: 'Retinal artery' },
            { id: 'c', text: 'Episcleral vessels' },
            { id: 'd', text: 'Vortex veins' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm2q10',
        module: 'Conjunctiva & Sclera',
        text: 'A pterygium is a triangular growth of fibrovascular tissue that typically originates from the:',
        options: [
            { id: 'a', text: 'Palpebral conjunctiva and grows onto the eyelid margin' },
            { id: 'b', text: 'Bulbar conjunctiva and grows onto the cornea' },
            { id: 'c', text: 'Sclera and grows over the iris' },
            { id: 'd', text: 'Fornix and grows towards the limbus' },
        ],
        correctAnswer: 'b',
    },


    // Module 3: Cornea
    {
        id: 'm3q1',
        module: 'Cornea',
        text: 'Which layer of the cornea is responsible for maintaining its dehydrated state (deturgescence)?',
        options: [
            { id: 'a', text: 'Epithelium' },
            { id: 'b', text: 'Bowman\'s Layer' },
            { id: 'c', text: 'Stroma' },
            { id: 'd', text: 'Endothelium' },
        ],
        correctAnswer: 'd',
    },
    {
        id: 'm3q2',
        module: 'Cornea',
        text: 'The majority of the cornea\'s total refractive power comes from:',
        options: [
            { id: 'a', text: 'The posterior corneal surface' },
            { id: 'b', text: 'The anterior corneal surface (air-tear film interface)' },
            { id: 'c', text: 'The corneal stroma' },
            { id: 'd', text: 'The endothelium' },
        ],
        correctAnswer: 'b',
    },
    // Add 8 more for Module 3
    {
        id: 'm3q3',
        module: 'Cornea',
        text: 'Fuchs\' Endothelial Dystrophy primarily affects which corneal layer?',
        options: [
            { id: 'a', text: 'Epithelium' },
            { id: 'b', text: 'Stroma' },
            { id: 'c', text: 'Descemet\'s membrane' },
            { id: 'd', text: 'Endothelium' },
        ],
        correctAnswer: 'd',
    },
    {
        id: 'm3q4',
        module: 'Cornea',
        text: 'A dendritic ulcer is a classic sign of which type of keratitis?',
        options: [
            { id: 'a', text: 'Bacterial Keratitis' },
            { id: 'b', text: 'Fungal Keratitis' },
            { id: 'c', text: 'Herpes Simplex Keratitis' },
            { id: 'd', text: 'Acanthamoeba Keratitis' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm3q5',
        module: 'Cornea',
        text: 'What is the approximate average power of the human cornea?',
        options: [
            { id: 'a', text: '20 D' },
            { id: 'b', text: '33 D' },
            { id: 'c', text: '43 D' },
            { id: 'd', text: '58 D' },
        ],
        correctAnswer: 'c',
    },
    {
        id: 'm3q6',
        module: 'Cornea',
        text: 'Which corneal layer is acellular and does not regenerate if damaged?',
        options: [
            { id: 'a', text: 'Epithelium' },
            { id: 'b', text: 'Bowman\'s Layer' },
            { id: 'c', text: 'Stroma' },
            { id: 'd', text: 'Descemet\'s Membrane' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm3q7',
        module: 'Cornea',
        text: 'The main source of glucose for the cornea under normal, eyes-open conditions is:',
        options: [
            { id: 'a', text: 'The limbal vasculature' },
            { id: 'b', text: 'The aqueous humor' },
            { id: 'c', text: 'The tear film' },
            { id: 'd', text: 'Atmospheric oxygen' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm3q8',
        module: 'Cornea',
        text: 'A "Whorl Keratopathy" (vortex keratopathy) can be a side effect of which systemic medication?',
        options: [
            { id: 'a', text: 'Ibuprofen' },
            { id: 'b', text: 'Amiodarone' },
            { id: 'c', text: 'Lisinopril' },
            { id: 'd', text: 'Metformin' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm3q9',
        module: 'Cornea',
        text: 'The corneal endothelial cell density typically does what with age?',
        options: [
            { id: 'a', text: 'Increases' },
            { id: 'b', text: 'Decreases' },
            { id: 'c', text: 'Stays the same' },
            { id: 'd', text: 'Fluctuates seasonally' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm3q10',
        module: 'Cornea',
        text: 'The transparency of the cornea is maintained by the regular arrangement of collagen fibrils in which layer?',
        options: [
            { id: 'a', text: 'Epithelium' },
            { id: 'b', text: 'Bowman\'s Layer' },
            { id: 'c', text: 'Stroma' },
            { id: 'd', text: 'Endothelium' },
        ],
        correctAnswer: 'c',
    },
    
    // ... Continue for all 10 modules
    
    // Module 4: Anterior Chamber & Aqueous Humor
    {
        id: 'm4q1',
        module: 'Anterior Chamber & Aqueous Humor',
        text: 'Aqueous humor is produced by which structure?',
        options: [
            { id: 'a', text: 'Trabecular meshwork' },
            { id: 'b', text: 'Ciliary body' },
            { id: 'c', text: 'Schlemm\'s canal' },
            { id: 'd', text: 'Iris' },
        ],
        correctAnswer: 'b',
    },
    {
        id: 'm4q2',
        module: 'Anterior Chamber & Aqueous Humor',
        text: 'What is the primary pathway for aqueous humor outflow?',
        options: [
            { id: 'a', text: 'Uveoscleral pathway' },
            { id: 'b', text: 'Suprachoroidal space' },
            { id: 'c', text: 'Trabecular meshwork pathway' },
            { id: 'd', text: 'Iris absorption' },
        ],
        correctAnswer: 'c',
    },
    { id: 'm4q3', module: 'Anterior Chamber & Aqueous Humor', text: 'Hyphema is the presence of what in the anterior chamber?', options: [{ id: 'a', text: 'Pus (white blood cells)' },{ id: 'b', text: 'Red blood cells' },{ id: 'c', text: 'Lens particles' },{ id: 'd', text: 'Pigment cells' }], correctAnswer: 'b' },
    { id: 'm4q4', module: 'Anterior Chamber & Aqueous Humor', text: 'Which class of glaucoma medication works by increasing uveoscleral outflow?', options: [{ id: 'a', text: 'Beta-blockers' },{ id: 'b', text: 'Carbonic anhydrase inhibitors' },{ id: 'c', text: 'Alpha-adrenergic agonists' },{ id: 'd', text: 'Prostaglandin analogs' }], correctAnswer: 'd' },
    { id: 'm4q5', module: 'Anterior Chamber & Aqueous Humor', text: 'The normal depth of the anterior chamber is typically:', options: [{ id: 'a', text: '1.5 mm' },{ id: 'b', text: '2.5 mm' },{ id: 'c', text: '3.5 mm' },{ id: 'd', text: '4.5 mm' }], correctAnswer: 'c' },
    { id: 'm4q6', module: 'Anterior Chamber & Aqueous Humor', text: 'Aqueous humor has a lower concentration of _____ compared to blood plasma.', options: [{ id: 'a', text: 'Ascorbate (Vitamin C)' },{ id: 'b', text: 'Protein' },{ id: 'c', text: 'Lactate' },{ id: 'd', text: 'Chloride' }], correctAnswer: 'b' },
    { id: 'm4g7', module: 'Anterior Chamber & Aqueous Humor', text: 'The angle of the anterior chamber is the junction between the:', options: [{ id: 'a', text: 'Iris and Lens' },{ id: 'b', text: 'Cornea and Ciliary body' },{ id: 'c', text: 'Cornea and Iris' },{ id: 'd', text: 'Lens and Sclera' }], correctAnswer: 'c' },
    { id: 'm4q8', module: 'Anterior Chamber & Aqueous Humor', text: 'Gonioscopy is a technique used to visualize the:', options: [{ id: 'a', text: 'Retinal periphery' },{ id: 'b', text: 'Optic nerve head' },{ id: 'c', text: 'Vitreous body' },{ id: 'd', text: 'Anterior chamber angle' }], correctAnswer: 'd' },
    { id: 'm4q9', module: 'Anterior Chamber & Aqueous Humor', text: 'A Krukenberg spindle, seen on the corneal endothelium, is a sign of what condition?', options: [{ id: 'a', text: 'Uveitis' },{ id: 'b', text: 'Pigment dispersion syndrome' },{ id: 'c', text: 'Pseudoexfoliation syndrome' },{ id: 'd', text: 'Fuchs\' dystrophy' }], correctAnswer: 'b' },
    { id: 'm4q10', module: 'Anterior Chamber & Aqueous Humor', text: 'Which medication class reduces aqueous production by inhibiting the enzyme responsible for bicarbonate formation?', options: [{ id: 'a', text: 'Beta-blockers (e.g., Timolol)' },{ id: 'b', text: 'Prostaglandin analogs (e.g., Latanoprost)' },{ id: 'c', text: 'Carbonic anhydrase inhibitors (e.g., Dorzolamide)' },{ id: 'd', text: 'Alpha-agonists (e.g., Brimonidine)' }], correctAnswer: 'c' },


    // Module 5: Iris & Pupil
    { id: 'm5q1', module: 'Iris & Pupil', text: 'The color of the iris is determined by the amount and type of melanin in which layer?', options: [{ id: 'a', text: 'Anterior border layer & Stroma' },{ id: 'b', text: 'Posterior pigment epithelium' },{ id: 'c', text: 'Dilator muscle' },{ id: 'd', text: 'Sphincter muscle' }], correctAnswer: 'a' },
    { id: 'm5q2', module: 'Iris & Pupil', text: 'Pupillary constriction (miosis) is controlled by which muscle and nervous system?', options: [{ id: 'a', text: 'Dilator pupillae, Sympathetic' },{ id: 'b', text: 'Sphincter pupillae, Sympathetic' },{ id: 'c', text: 'Sphincter pupillae, Parasympathetic' },{ id: 'd', text: 'Dilator pupillae, Parasympathetic' }], correctAnswer: 'c' },
    { id: 'm5q3', module: 'Iris & Pupil', text: 'Anisocoria refers to:', options: [{ id: 'a', text: 'An irregularly shaped pupil' },{ id: 'b', text: 'Unequal pupil sizes' },{ id: 'c', text: 'A poor reaction to light' },{ id: 'd', text: 'Inflammation of the iris' }], correctAnswer: 'b' },
    { id: 'm5q4', module: 'Iris & Pupil', text: 'A relative afferent pupillary defect (RAPD) is detected using which test?', options: [{ id: 'a', text: 'Cover-uncover test' },{ id: 'b', text: 'Swinging-flashlight test' },{ id: 'c', text: 'Pupil cycle time test' },{ id: 'd', text: 'Confrontation visual field test' }], correctAnswer: 'b' },
    { id: 'm5q5', module: 'Iris & Pupil', text: 'Pharmacologic dilation of the pupil is called:', options: [{ id: 'a', text: 'Miosis' },{ id: 'b', text: 'Mydriasis' },{ id: 'c', text: 'Cycloplegia' },{ id: 'd', text: 'Anisocoria' }], correctAnswer: 'b' },
    { id: 'm5q6', module: 'Iris & Pupil', text: 'The pupillary light reflex pathway involves signals traveling to the brainstem via the:', options: [{ id: 'a', text: 'Optic nerve (CN II)' },{ id: 'b', text: 'Oculomotor nerve (CN III)' },{ id: 'c', text: 'Trigeminal nerve (CN V)' },{ id: 'd', text: 'Facial nerve (CN VII)' }], correctAnswer: 'a' },
    { id: 'm5q7', module: 'Iris & Pupil', text: 'The iris collarette is a landmark that separates the:', options: [{ id: 'a', text: 'Anterior and posterior iris surfaces' },{ id: 'b', text: 'Pupillary zone and ciliary zone' },{ id: 'c', text: 'Iris stroma and posterior epithelium' },{ id: 'd', text: 'Sphincter and dilator muscles' }], correctAnswer: 'b' },
    { id: 'm5q8', module: 'Iris & Pupil', text: 'Which condition is characterized by inflammation of the iris and ciliary body?', options: [{ id: 'a', text: 'Iritis' },{ id: 'b', text: 'Iridocyclitis' },{ id: 'c', text: 'Keratitis' },{ id: 'd', text: 'Scleritis' }], correctAnswer: 'b' },
    { id: 'm5q9', module: 'Iris & Pupil', text: 'In Horner\'s Syndrome, one of the classic signs related to the pupil is:', options: [{ id: 'a', text: 'Mydriasis (dilation)' },{ id: 'b', text: 'Miosis (constriction)' },{ id: 'c', text: 'A fixed, non-reactive pupil' },{ id: 'd', text: 'An irregularly shaped pupil' }], correctAnswer: 'b' },
    { id: 'm5q10', module: 'Iris & Pupil', text: 'The near reflex triad consists of:', options: [{ id: 'a', text: 'Pupil constriction, accommodation, and divergence' },{ id: 'b', text: 'Pupil dilation, accommodation, and convergence' },{ id: 'c', text: 'Pupil constriction, accommodation, and convergence' },{ id: 'd', text: 'Pupil constriction, lens thinning, and divergence' }], correctAnswer: 'c' },


    // Module 6: Crystalline Lens & Accommodation
    { id: 'm6q1', module: 'Crystalline Lens & Accommodation', text: 'What is the primary function of the crystalline lens?', options: [{ id: 'a', text: 'To absorb UV light' },{ id: 'b', text: 'To produce aqueous humor' },{ id: 'c', text: 'To provide the majority of the eye\'s refractive power' },{ id: 'd', text: 'To fine-tune focus for near and far objects' }], correctAnswer: 'd' },
    { id: 'm6q2', module: 'Crystalline Lens & Accommodation', text: 'A cataract is an opacification of which structure?', options: [{ id: 'a', text: 'Cornea' },{ id: 'b', text: 'Vitreous' },{ id: 'c', text: 'Crystalline lens' },{ id: 'd', text: 'Retina' }], correctAnswer: 'c' },
    { id: 'm6q3', module: 'Crystalline Lens & Accommodation', text: 'During accommodation, what happens to the ciliary muscle and zonular fibers?', options: [{ id: 'a', text: 'Ciliary muscle relaxes, zonules tighten' },{ id: 'b', text: 'Ciliary muscle contracts, zonules relax' },{ id: 'c', text: 'Ciliary muscle contracts, zonules tighten' },{ id: 'd', text: 'Ciliary muscle relaxes, zonules relax' }], correctAnswer: 'b' },
    { id: 'm6q4', module: 'Crystalline Lens & Accommodation', text: 'Presbyopia, the age-related loss of accommodation, is primarily due to:', options: [{ id: 'a', text: 'Weakening of the ciliary muscle' },{ id: 'b', text: 'Stretching of the zonular fibers' },{ id: 'c', text: 'Increased stiffness and loss of elasticity of the crystalline lens' },{ id: 'd', text: 'Shortening of the eyeball' }], correctAnswer: 'c' },
    { id: 'm6q5', module: 'Crystalline Lens & Accommodation', text: 'A posterior subcapsular cataract is most commonly associated with:', options: [{ id: 'a', text: 'Aging' },{ id: 'b', text: 'Long-term steroid use' },{ id: 'c', text: 'Diabetes' },{ id: 'd', text: 'Myopia' }], correctAnswer: 'b' },
    { id: 'm6q6', module: 'Crystalline Lens & Accommodation', text: 'The lens capsule is primarily composed of what type of protein?', options: [{ id: 'a', text: 'Crystallins' },{ id: 'b', text: 'Elastin' },{ id: 'c', text: 'Type IV collagen' },{ id: 'd', text: 'Actin' }], correctAnswer: 'c' },
    { id: 'm6q7', module: 'Crystalline Lens & Accommodation', text: 'What is the term for the condition where the crystalline lens is dislocated from its normal position?', options: [{ id: 'a', text: 'Aphakia' },{ id: 'b', text: 'Pseudophakia' },{ id: 'c', text: 'Ectopia lentis' },{ id: 'd', text: 'Cataract' }], correctAnswer: 'c' },
    { id: 'm6q8', module: 'Crystalline Lens & Accommodation', text: 'Which type of cataract often causes the most significant symptoms of glare?', options: [{ id: 'a', text: 'Nuclear sclerotic' },{ id: 'b', text: 'Cortical' },{ id: 'c', text: 'Posterior subcapsular' },{ id: 'd', text: 'Anterior polar' }], correctAnswer: 'c' },
    { id: 'm6q9', module: 'Crystalline Lens & Accommodation', text: 'The amplitude of accommodation is measured in:', options: [{ id: 'a', text: 'Millimeters (mm)' },{ id: 'b', text: 'Prism diopters (PD)' },{ id: 'c', text: 'Diopters (D)' },{ id: 'd', text: 'Degrees (°)' }], correctAnswer: 'c' },
    { id: 'm6q10', module: 'Crystalline Lens & Accommodation', text: 'What are the proteins that make up the bulk of the lens fibers and are crucial for transparency?', options: [{ id: 'a', text: 'Albumins' },{ id: 'b', text: 'Globulins' },{ id: 'c', text: 'Crystallins' },{ id: 'd', text: 'Collagens' }], correctAnswer: 'c' },


    // Module 7: Vitreous Body
    { id: 'm7q1', module: 'Vitreous Body', text: 'The vitreous body is primarily composed of:', options: [{ id: 'a', text: 'Water and collagen' },{ id: 'b', text: 'Water and hyaluronic acid' },{ id: 'c', text: 'Water, collagen, and hyaluronic acid' },{ id: 'd', text: 'Hyaluronic acid and elastin' }], correctAnswer: 'c' },
    { id: 'm7q2', module: 'Vitreous Body', text: 'A posterior vitreous detachment (PVD) occurs when the vitreous gel separates from the:', options: [{ id: 'a', text: 'Lens' },{ id: 'b', text: 'Ciliary body' },{ id: 'c', text: 'Retina' },{ id: 'd', text: 'Cornea' }], correctAnswer: 'c' },
    { id: 'm7q3', module: 'Vitreous Body', text: 'The most common symptom of an acute PVD is:', options: [{ id: 'a', text: 'Eye pain' },{ id: 'b', text: 'Gradual blurring of vision' },{ id: 'c', text: 'The sudden onset of floaters and/or flashes of light' },{ id: 'd', text: 'A red eye' }], correctAnswer: 'c' },
    { id: 'm7q4', module: 'Vitreous Body', text: 'What is the name of the ring-shaped floater that can appear after a PVD?', options: [{ id: 'a', text: 'Muscae volitantes' },{ id: 'b', text: 'Vitreous syneresis' },{ id: 'c', text: 'Weiss ring' },{ id: 'd', text: 'Asteroid hyalosis' }], correctAnswer: 'c' },
    { id: 'm7q5', module: 'Vitreous Body', text: 'Asteroid hyalosis consists of what type of deposits in the vitreous?', options: [{ id: 'a', text: 'Cholesterol crystals' },{ id: 'b', text: 'Calcium-phosphate soaps' },{ id: 'c', text: 'Red blood cells' },{ id: 'd', text: 'Pigment cells' }], correctAnswer: 'b' },
    { id: 'm7q6', module: 'Vitreous Body', text: 'The strongest attachment of the vitreous to the surrounding structures is at the:', options: [{ id: 'a', text: 'Optic disc margin' },{ id: 'b', text: 'Macula' },{ id: 'c', text: 'Vitreous base (near the ora serrata)' },{ id: 'd', text: 'Posterior lens capsule' }], correctAnswer: 'c' },
    { id: 'm7q7', module: 'Vitreous Body', text: 'Vitreous syneresis refers to:', options: [{ id: 'a', text: 'Inflammation of the vitreous' },{ id: 'b', text: 'Hemorrhage into the vitreous' },{ id: 'c', text: 'The liquefaction and shrinkage of the vitreous gel' },{ id: 'd', text: 'The formation of new blood vessels in the vitreous' }], correctAnswer: 'c' },
    { id: 'm7q8', module: 'Vitreous Body', text: 'The Cloquet\'s canal is a remnant of the embryonic:', options: [{ id: 'a', text: 'Hyaloid artery' },{ id: 'b', text: 'Retinal artery' },{ id: 'c', text: 'Choroidal vessels' },{ id: 'd', text: 'Tarsal artery' }], correctAnswer: 'a' },
    { id: 'm7q9', module: 'Vitreous Body', text: 'The volume of the vitreous humor accounts for approximately what percentage of the eye\'s total volume?', options: [{ id: 'a', text: '20%' },{ id: 'b', text: '40%' },{ id: 'c', text: '60%' },{ id: 'd', text: '80%' }], correctAnswer: 'd' },
    { id: 'm7q10', module: 'Vitreous Body', text: 'A vitreous hemorrhage can cause a sudden, profound loss of vision and is often associated with:', options: [{ id: 'a', text: 'Cataract formation' },{ id: 'b', text: 'Proliferative diabetic retinopathy' },{ id: 'c', text: 'Corneal edema' },{ id: 'd', text: 'Uveitis' }], correctAnswer: 'b' },

    // Module 8: Retina
    { id: 'm8q1', module: 'Retina', text: 'Which photoreceptor is responsible for color vision and high-acuity central vision?', options: [{ id: 'a', text: 'Rods' },{ id: 'b', text: 'Cones' },{ id: 'c', text: 'Ganglion cells' },{ id: 'd', text: 'Bipolar cells' }], correctAnswer: 'b' },
    { id: 'm8q2', module: 'Retina', text: 'The fovea centralis contains a high density of which cells?', options: [{ id: 'a', text: 'Rods only' },{ id: 'b', text: 'Cones only' },{ id: 'c', text: 'Both rods and cones' },{ id: 'd', text: 'Ganglion cells only' }], correctAnswer: 'b' },
    { id: 'm8q3', module: 'Retina', text: 'In Age-Related Macular Degeneration (AMD), "drusen" are yellow deposits that accumulate under which layer?', options: [{ id: 'a', text: 'Nerve Fiber Layer (NFL)' },{ id: 'b', text: 'Inner Plexiform Layer (IPL)' },{ id: 'c', text: 'Retinal Pigment Epithelium (RPE)' },{ id: 'd', text: 'Outer Nuclear Layer (ONL)' }], correctAnswer: 'c' },
    { id: 'm8q4', module: 'Retina', text: 'A "cherry-red spot" at the macula is a classic sign of:', options: [{ id: 'a', text: 'Central Retinal Vein Occlusion (CRVO)' },{ id: 'b', text: 'Central Retinal Artery Occlusion (CRAO)' },{ id: 'c', text: 'Diabetic Retinopathy' },{ id: 'd', text: 'Retinal Detachment' }], correctAnswer: 'b' },
    { id: 'm8q5', module: 'Retina', text: 'How many layers does the neurosensory retina have?', options: [{ id: 'a', text: '3' },{ id: 'b', text: '6' },{ id: 'c', text: '9' },{ id: 'd', text: '10 (including the RPE)' }], correctAnswer: 'c' },
    { id: 'm8q6', module: 'Retina', text: 'The primary function of the Retinal Pigment Epithelium (RPE) is to:', options: [{ id: 'a', text: 'Transmit light signals to the brain' },{ id: 'b', text: 'Nourish and support the photoreceptors' },{ id: 'c', text: 'Produce aqueous humor' },{ id: 'd', text: 'Refract light onto the fovea' }], correctAnswer: 'b' },
    { id: 'm8q7', module: 'Retina', text: 'Which retinal cells form the optic nerve?', options: [{ id: 'a', text: 'Axons of the photoreceptor cells' },{ id: 'b', text: 'Axons of the bipolar cells' },{ id: 'c', text: 'Axons of the ganglion cells' },{ id: 'd', text: 'Axons of the amacrine cells' }], correctAnswer: 'c' },
    { id: 'm8q8', module: 'Retina', text: 'Proliferative Diabetic Retinopathy is characterized by:', options: [{ id: 'a', text: 'Microaneurysms and dot-blot hemorrhages' },{ id: 'b', text: 'Cotton-wool spots and hard exudates' },{ id: 'c', text: 'Neovascularization (growth of new, abnormal blood vessels)' },{ id: 'd', text: 'Macular edema' }], correctAnswer: 'c' },
    { id: 'm8q9', module: 'Retina', text: 'A patient complaining of a "curtain" or "shadow" in their peripheral vision may be experiencing:', options: [{ id: 'a', text: 'A posterior vitreous detachment' },{ id: 'b', text: 'A retinal detachment' },{ id: 'c', text: 'A macular hole' },{ id: 'd', text: 'Epiretinal membrane' }], correctAnswer: 'b' },
    { id: 'm8q10', module: 'Retina', text: 'The photopigment found in rod cells is called:', options: [{ id: 'a', text: 'Photopsin' },{ id: 'b', text: 'Melanopsin' },{ id: 'c', text: 'Rhodopsin' },{ id: 'd', text: 'Opsin' }], correctAnswer: 'c' },


    // Module 9: Optic Nerve & Pathways
    { id: 'm9q1', module: 'Optic Nerve & Pathways', text: 'The optic disc represents the anatomical location of the:', options: [{ id: 'a', text: 'Macula' },{ id: 'b', text: 'Fovea' },{ id: 'c', text: 'Blind spot' },{ id: 'd', text: 'Ora serrata' }], correctAnswer: 'c' },
    { id: 'm9q2', module: 'Optic Nerve & Pathways', text: 'A bitemporal hemianopia is typically caused by a lesion at the:', options: [{ id: 'a', text: 'Optic nerve' },{ id: 'b', text: 'Optic chiasm' },{ id: 'c', text: 'Optic tract' },{ id: 'd', text: 'Visual cortex' }], correctAnswer: 'b' },
    { id: 'm9q3', module: 'Optic Nerve & Pathways', text: 'The cup-to-disc ratio is an important measurement in the diagnosis and management of:', options: [{ id: 'a', text: 'Cataracts' },{ id: 'b', text: 'Macular degeneration' },{ id: 'c', text: 'Glaucoma' },{ id: 'd', text: 'Diabetic retinopathy' }], correctAnswer: 'c' },
    { id: 'm9q4', module: 'Optic Nerve & Pathways', text: 'After the optic chiasm, the nerve fibers travel in the:', options: [{ id: 'a', text: 'Optic nerves' },{ id: 'b', text: 'Optic tracts' },{ id: 'c', text: 'Optic radiations' },{ id: 'd', text: 'Visual cortex' }], correctAnswer: 'b' },
    { id: 'm9q5', module: 'Optic Nerve & Pathways', text: 'A homonymous hemianopia that is "macular sparing" suggests a lesion in the:', options: [{ id: 'a', text: 'Optic chiasm' },{ id: 'b', text: 'Lateral Geniculate Nucleus (LGN)' },{ id: 'c', text: 'Occipital lobe (visual cortex)' },{ id: 'd', text: 'Optic nerve' }], correctAnswer: 'c' },
    { id: 'm9q6', module: 'Optic Nerve & Pathways', text: 'Papilledema refers to swelling of the optic disc due to:', options: [{ id: 'a', text: 'High intraocular pressure (glaucoma)' },{ id: 'b', text: 'Inflammation of the optic nerve (optic neuritis)' },{ id: 'c', text: 'Ischemia (non-arteritic ischemic optic neuropathy)' },{ id: 'd', text: 'Increased intracranial pressure' }], correctAnswer: 'd' },
    { id: 'm9q7', module: 'Optic Nerve & Pathways', text: 'Most of the axons in the optic tract terminate in which part of the thalamus?', options: [{ id: 'a', text: 'Medial Geniculate Nucleus' },{ id: 'b', text: 'Lateral Geniculate Nucleus (LGN)' },{ id: 'c', text: 'Pulvinar' },{ id: 'd', text: 'Superior Colliculus' }], correctAnswer: 'b' },
    { id: 'm9q8', module: 'Optic Nerve & Pathways', text: 'The visual field defect pattern in glaucoma often follows the:', options: [{ id: 'a', text: 'Horizontal meridian' },{ id: 'b', text: 'Vertical meridian' },{ id: 'c', text: 'Arcuate pattern of the nerve fiber layer' },{ id: 'd', text: 'Random, scattered pattern' }], correctAnswer: 'c' },
    { id: 'm9q9', module: 'Optic Nerve & Pathways', text: 'Optic neuritis is most commonly associated with which systemic disease?', options: [{ id: 'a', text: 'Diabetes' },{ id: 'b', text: 'Multiple Sclerosis' },{ id: 'c', text: 'Hypertension' },{ id: 'd', text: 'Rheumatoid Arthritis' }], correctAnswer: 'b' },
    { id: 'm9q10', module: 'Optic Nerve & Pathways', text: 'Which visual field defect respects the vertical midline?', options: [{ id: 'a', text: 'Arcuate scotoma from glaucoma' },{ id: 'b', text: 'Central scotoma from macular disease' },{ id: 'c', text: 'Hemianopia from a post-chiasmal lesion' },{ id: 'd', text: 'Enlarged blind spot from papilledema' }], correctAnswer: 'c' },


    // Module 10: Extraocular Muscles & Ocular Motility
    { id: 'm10q1', module: 'Extraocular Muscles & Ocular Motility', text: 'Which muscle is primarily responsible for abduction (moving the eye outward)?', options: [{ id: 'a', text: 'Medial Rectus' },{ id: 'b', text: 'Lateral Rectus' },{ id: 'c', text: 'Superior Rectus' },{ id: 'd', text: 'Inferior Rectus' }], correctAnswer: 'b' },
    { id: 'm10q2', module: 'Extraocular Muscles & Ocular Motility', text: 'The superior oblique muscle is innervated by which cranial nerve?', options: [{ id: 'a', text: 'CN III (Oculomotor)' },{ id: 'b', text: 'CN IV (Trochlear)' },{ id: 'c', text: 'CN V (Trigeminal)' },{ id: 'd', text: 'CN VI (Abducens)' }], correctAnswer: 'b' },
    { id: 'm10q3', module: 'Extraocular Muscles & Ocular Motility', text: 'According to Hering\'s Law of Equal Innervation, when a signal is sent to an agonist muscle to contract:', options: [{ id: 'a', text: 'An equal inhibitory signal is sent to its antagonist' },{ id: 'b', text: 'An equal excitatory signal is sent to its contralateral synergist (yoke muscle)' },{ id: 'c', text: 'An equal excitatory signal is sent to its ipsilateral antagonist' },{ id: 'd', text: 'An equal inhibitory signal is sent to its contralateral synergist' }], correctAnswer: 'b' },
    { id: 'm10q4', module: 'Extraocular Muscles & Ocular Motility', text: 'A "down and out" position of the eye at rest, along with a dilated pupil, suggests a palsy of which nerve?', options: [{ id: 'a', text: 'CN III (Oculomotor)' },{ id: 'b', text: 'CN IV (Trochlear)' },{ id: 'c', text: 'CN VI (Abducens)' },{ id: 'd', text: 'CN VII (Facial)' }], correctAnswer: 'a' },
    { id: 'm10q5', module: 'Extraocular Muscles & Ocular Motility', text: 'The primary action of the inferior oblique muscle is:', options: [{ id: 'a', text: 'Incyclotorsion' },{ id: 'b', text: 'Depression' },{ id: 'c', text: 'Abduction' },{ id: 'd', text: 'Excyclotorsion' }], correctAnswer: 'd' },
    { id: 'm10q6', module: 'Extraocular Muscles & Ocular Motility', text: 'A patient who complains of vertical diplopia, especially when looking down and in (e.g., reading), may have a palsy of which muscle?', options: [{ id: 'a', text: 'Superior Rectus' },{ id: 'b', text: 'Inferior Rectus' },{ id: 'c', text: 'Superior Oblique' },{ id: 'd', text: 'Inferior Oblique' }], correctAnswer: 'c' },
    { id: 'm10q7', module: 'Extraocular Muscles & Ocular Motility', text: 'Strabismus is the term for:', options: [{ id: 'a', text: 'Lazy eye (poor vision)' },{ id: 'b', text: 'Double vision' },{ id: 'c', text: 'Misalignment of the eyes' },{ id: 'd', text: 'Involuntary eye movements' }], correctAnswer: 'c' },
    { id: 'm10q8', module: 'Extraocular Muscles & Ocular Motility', text: 'Which muscle originates from the orbital floor, not the common tendinous ring (annulus of Zinn)?', options: [{ id: 'a', text: 'Superior Rectus' },{ id: 'b', text: 'Medial Rectus' },{ id: 'c', text: 'Lateral Rectus' },{ id: 'd', text: 'Inferior Oblique' }], correctAnswer: 'd' },
    { id: 'm10q9', module: 'Extraocular Muscles & Ocular Motility', text: 'The "H-pattern" motility test is used to:', options: [{ id: 'a', text: 'Assess pupillary responses' },{ id: 'b', text: 'Measure intraocular pressure' },{ id: 'c', text: 'Isolate and test the action of each extraocular muscle' },{ id: 'd', text: 'Evaluate the visual field' }], correctAnswer: 'c' },
    { id: 'm10q10', module: 'Extraocular Muscles & Ocular Motility', text: 'Sherrington\'s Law of Reciprocal Innervation states that when an agonist muscle contracts:', options: [{ id: 'a', text: 'Its contralateral yoke muscle also contracts' },{ id: 'b', text: 'Its ipsilateral antagonist muscle relaxes' },{ id: 'c', text: 'Its ipsilateral antagonist muscle also contracts' },{ id: 'd', text: 'All other extraocular muscles relax' }], correctAnswer: 'b' },

];

    
