
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Star, Users, Briefcase, TrendingUp, ShieldCheck, BatteryCharging, Weight, Puzzle, Award, PlayCircle, Phone, Mail, Package, Server, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DrishtiKit | Revolutionary Portable Eye Testing Solution',
  description: "Explore DrishtiKit, the world's most portable and affordable eye testing solution. Conduct comprehensive vision screenings anywhere with our AI-powered phoropter and mobile app.",
};

const stats = [
  { value: "50+", label: "Healthcare Organizations" },
  { value: "15,000+", label: "Vision Screenings Completed" },
  { value: "10+", label: "Countries Reached" },
  { value: "95%", label: "Clinician Satisfaction Rate" },
];

const mobileAppFeatures = [
    { title: "Patient Registration", description: "Complete patient data collection.", icon: <Users className="w-6 h-6 text-primary"/> },
    { title: "Patient Management", description: "Organize screening campaigns.", icon: <Briefcase className="w-6 h-6 text-primary"/> },
    { title: "Health Records", description: "Detailed vision test results.", icon: <TrendingUp className="w-6 h-6 text-primary"/> },
    { title: "Secure Login", description: "Multi-user access control.", icon: <ShieldCheck className="w-6 h-6 text-primary"/> },
];

const whyChooseFeatures = [
    { title: "Portable & Lightweight", description: "Weighs only 2kg, fits in a briefcase.", icon: <Weight className="w-8 h-8 text-primary"/> },
    { title: "Battery Powered", description: "8+ hours continuous operation.", icon: <BatteryCharging className="w-8 h-8 text-primary"/> },
    { title: "Easy to Use", description: "Minimal training required.", icon: <Puzzle className="w-8 h-8 text-primary"/> },
    { title: "Cost Effective", description: "90% lower cost than traditional setups.", icon: <Star className="w-8 h-8 text-primary"/> },
];

const ecosystemComponents = [
    { title: "Portable Phoropter", description: "Complete refraction testing with digital precision. Sphere: -3D to +3D (0.5D intervals).", icon: <Package className="w-8 h-8 text-primary"/> },
    { title: "AI-Powered Mobile App", description: "Manage patients, get AI summaries, and sync data to the cloud, even when offline.", icon: <PlayCircle className="w-8 h-8 text-primary"/> },
    { title: "Data Management System", description: "Secure cloud-based patient record management with analytics and reporting capabilities.", icon: <Server className="w-8 h-8 text-primary"/> },
    { title: "Training & Support", description: "Comprehensive video modules, live virtual sessions, and 24/7 technical support.", icon: <Wrench className="w-8 h-8 text-primary"/> },
]

const testimonials = [
    { name: "Dr. Priya Sharma", title: "Rural Eye Care Specialist", quote: "DrishtiKit has revolutionized our rural eye camps. We can now screen hundreds of patients in remote villages without electricity or specialized equipment. The accuracy is comparable to our clinic-based equipment.", avatar: "https://picsum.photos/seed/doc1/80/80" },
    { name: "Dr. Puneet", title: "Founder, Curesee", quote: "The innovative design and portability of DrishtiKit make it a game-changer for eye care accessibility. It's exactly what we need to revolutionize vision screening in India's underserved communities.", avatar: "https://picsum.photos/seed/doc2/80/80" },
    { name: "Meera Patel", title: "School Health Program Coordinator", quote: "Our school screening program has been able to reach twice as many children since we started using DrishtiKit. It's simple enough for teachers to use effectively for basic screenings.", avatar: "https://picsum.photos/seed/doc3/80/80" },
    { name: "Optom. Subrata Roy", title: "Director, Eye Vision Prosthetic Lab", quote: "The portability of DrishtiKit has been a game-changer for our disaster response team. We can now include comprehensive vision screening in our medical relief efforts.", avatar: "https://picsum.photos/seed/doc4/80/80" },
]

const faqs = [
    { value: "q1", question: "What types of eye tests can DrishtiKit perform?", answer: "DrishtiKit can perform comprehensive vision screenings including visual acuity testing, refraction measurement (spherical), color vision assessment, and basic eye health screening. It provides the same level of accuracy as traditional phoropters." },
    { value: "q2", question: "How much training is required to use DrishtiKit?", answer: "Basic operation can be learned in 2-3 hours with our training modules. For comprehensive proficiency, we recommend 1-2 days of training. We provide video tutorials, live sessions, and ongoing support." },
    { value: "q3", question: "What is the battery life and power requirements?", answer: "DrishtiKit operates for 8+ hours on a single charge, making it ideal for full-day screening programs. It can be charged using standard power outlets or portable power banks." },
    { value: "q4", question: "How does the mobile app work offline?", answer: "The DrishtiKit mobile app stores patient data locally when internet isn't available. Once connectivity is restored, all data automatically syncs to the cloud, ensuring uninterrupted operation in remote areas." },
    { value: "q5", question: "What support and warranty is provided?", answer: "We provide 24/7 technical support, comprehensive training materials, and a 2-year warranty on all hardware components. Our team offers ongoing support for implementation and training." },
    { value: "q6", question: "Is the data secure?", answer: "Yes, all patient data is encrypted end-to-end and stored in secure cloud infrastructure. We follow strict data protection protocols to ensure compliance with healthcare regulations." }
];


export default function DrishtiKitPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="py-20 md:py-28 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <Image src="https://i.ibb.co/VvZ1g3q/drishtikit-logo.png" alt="DrishtiKit Logo" width={100} height={100} className="mx-auto mb-4 invert" data-ai-hint="logo eye"/>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Revolutionary Eye Care Technology</h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        दृष्टिKit - The world's most portable and affordable eye testing solution. Conduct comprehensive vision screenings anywhere with our revolutionary all-in-one portable phoropter.
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button size="lg" asChild>
                            <a href="https://app.drishtikit.com/" target="_blank" rel="noopener noreferrer">Try Mobile App</a>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900">
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* Stats Section */}
            <section className="bg-muted/50 py-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</h3>
                                <p className="text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-20">
                {/* Mobile App Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Digital Eye Care Companion</h2>
                        <p className="text-lg text-slate-600 mb-8">A powerful companion to the physical vision screening kit, our mobile app enables healthcare workers to conduct professional-level exams and manage patient data—even offline.</p>
                        <div className="grid grid-cols-2 gap-6">
                            {mobileAppFeatures.map(feature => (
                                <div key={feature.title} className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">{feature.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-slate-700">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex gap-4">
                            <Button asChild><a href="https://app.drishtikit.com/" target="_blank" rel="noopener noreferrer">Access Mobile App</a></Button>
                            <Button variant="outline">Request Demo</Button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image src="https://i.ibb.co/L5w2b8b/drishtikit-app.png" alt="DrishtiKit Mobile App" width={400} height={600} className="rounded-2xl shadow-2xl" data-ai-hint="mobile phone"/>
                    </div>
                </section>

                {/* Made in India Section */}
                <section className="bg-slate-50 p-8 md:p-12 rounded-lg border">
                    <div className="grid md:grid-cols-3 gap-8 items-center text-center">
                        <div className="md:col-span-2 md:text-left">
                            <h2 className="text-3xl font-bold text-slate-800">Government Recognized & Proudly Made in India</h2>
                            <p className="text-lg text-slate-600 mt-4">DrishtiKit is a proud Indian innovation, officially recognized by DPIIT under the Startup India initiative. Our indigenous healthcare technology represents the best of Indian innovation in portable eye care solutions.</p>
                        </div>
                        <div className="flex justify-center md:justify-end items-center gap-8">
                            <Image src="https://i.ibb.co/dMvH17H/dpiit-logo.png" alt="DPIIT Recognized" width={120} height={120} data-ai-hint="logo government"/>
                            <Image src="https://i.ibb.co/JqjT7M1/make-in-india.png" alt="Made in India" width={120} height={120} data-ai-hint="logo india"/>
                        </div>
                    </div>
                </section>
                
                 {/* Why Choose Section */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Choose DrishtiKit?</h2>
                        <p className="mt-2 text-lg text-slate-600">The ultimate solution for portable, affordable, and accurate vision screening.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseFeatures.map(feature => (
                            <div key={feature.title} className="text-center p-8 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow border">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Ecosystem Section */}
                 <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">The Complete Ecosystem</h2>
                        <p className="mt-2 text-lg text-slate-600">Everything you need for professional eye care, anywhere.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {ecosystemComponents.map(component => (
                           <Card key={component.title} className="flex flex-col sm:flex-row items-start gap-6 p-6">
                               <div className="bg-primary/10 p-4 rounded-lg">{component.icon}</div>
                               <div>
                                   <h3 className="text-xl font-bold text-slate-800">{component.title}</h3>
                                   <p className="text-slate-600 mt-1">{component.description}</p>
                               </div>
                           </Card>
                       ))}
                    </div>
                </section>


                {/* Testimonials */}
                <section>
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Trusted by Healthcare Professionals Worldwide</h2>
                         <p className="mt-2 text-lg text-slate-600">Hear from the experts transforming eye care with DrishtiKit.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map(testimonial => (
                            <Card key={testimonial.name} className="p-6">
                                <CardContent className="p-0">
                                    <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14">
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="portrait person" />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-slate-800">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Frequently Asked Questions</h2>
                         <p className="mt-2 text-lg text-slate-600">Everything you need to know about DrishtiKit.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                        {faqs.map(faq => (
                            <AccordionItem value={faq.value} key={faq.value}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-slate-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
                
                 {/* Pricing */}
                <section>
                    <Card className="bg-gradient-to-br from-primary to-cyan-600 text-white shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Simple, Transparent Pricing</CardTitle>
                            <CardDescription className="text-blue-100 text-lg">Get your complete DrishtiKit at an affordable price.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="max-w-md mx-auto bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                                <h4 className="text-2xl font-bold">DrishtiKit Complete</h4>
                                <ul className="text-left space-y-2 my-4">
                                    <li className="flex items-center gap-2"><Check/> Portable Phoropter</li>
                                    <li className="flex items-center gap-2"><Check/> Vision Charts (Distance & Near)</li>
                                    <li className="flex items-center gap-2"><Check/> AI-Powered Mobile App License</li>
                                    <li className="flex items-center gap-2"><Check/> 2-Year Warranty & Support</li>
                                </ul>
                                <Button size="lg" className="w-full mt-4 bg-white text-primary hover:bg-slate-100">
                                    Order DrishtiKit Now
                                </Button>
                            </div>
                            <p className="mt-4 text-sm text-blue-200">Special bulk discounts available for NGOs, healthcare organizations, and government programs.</p>
                        </CardContent>
                    </Card>
                </section>

                 {/* Final CTA */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Ready to Transform Eye Care in Your Community?</h2>
                    <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">Join the revolution in portable eye testing technology. Contact us today to learn how DrishtiKit can help you bring professional vision screening to underserved populations.</p>
                    <div className="flex justify-center gap-4 mt-8">
                       <Button size="lg" asChild>
                            <a href="mailto:contact@drishtikit.com"><Mail className="mr-2 h-5 w-5"/> Contact Us</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="tel:+919244094145"><Phone className="mr-2 h-5 w-5"/> Call Us</a>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
