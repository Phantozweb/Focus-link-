
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Search, Award, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import type { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'About Focus Links | Our Mission for the Global Eye Care Community',
  description: 'Learn about the mission of Focus Links to unite the global eye care community. Discover our vision for connecting students, professionals, and organizations to foster innovation and growth in vision care, led by our founder, Janarthan Veeramani.',
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Focus Links",
  "description": "Learn about the mission of Focus Links to connect the global eye care community and meet the team dedicated to building the future of vision care.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Focus Links",
    "url": "https://focuslinks.pro/about",
    "logo": "https://i.ibb.co/cKdXV9gV/IMG-20251025-WA0014.jpg",
    "founder": {
      "@type": "Person",
      "name": "Janarthan Veeramani",
      "jobTitle": "Founder",
      "url": "https://focuslinks.pro/profile/1"
    }
  }
};


export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Global Directory",
      description: "A comprehensive database of students, optometrists, clinics, and industry partners. Find anyone, anywhere."
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Career Opportunities",
      description: "Explore job boards and connect with leading organizations to find your next role in the eye care industry."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Community & Events",
      description: "Engage in clinical case discussions, attend expert-led webinars, and participate in global knowledge competitions."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <div className="bg-muted/40">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Our Mission: To Unite the World of Eye Care</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              We are building a single, cohesive digital ecosystem where every student, professional, and organization in the eye care industry can connect, learn, and grow together.
            </p>
          </div>
        </section>
        
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-20">
         
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">From a Student's Vision to a Global Community</h2>
                    <div className="space-y-4 text-slate-600 text-lg">
                        <p>Focus Links was born from a simple idea: the world of eye care is vast, but it doesn't have to be fragmented. As an optometry student, our founder, Janarthan Veeramani, saw the need for a unified platform—a place to break down silos between academia, clinical practice, and industry.</p>
                        <p>What started as a tool to connect students has grown into a global mission. We are creating a digital home for every individual and organization dedicated to vision, from the first-year student to the seasoned ophthalmologist, from small clinics to multinational corporations.</p>
                        <p>Our platform isn't just a directory; it's a dynamic ecosystem for collaboration, career advancement, and continuous learning.</p>
                    </div>
                </div>
                 <div className="order-1 lg:order-2">
                    <Image src="https://picsum.photos/seed/about-main/600/500" alt="A team of eye care professionals collaborating in a modern office" width={600} height={500} className="rounded-lg shadow-lg" data-ai-hint="people meeting office" />
                </div>
            </div>
          </section>

          {/* Features Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">What We Offer</h2>
              <p className="mt-2 text-lg text-slate-600">A unified platform for the entire eye care ecosystem.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-8 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Meet the Team Section */}
          <section className="text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Meet the Founder</h2>
              <p className="mt-2 text-lg text-slate-600">The passionate individual building Focus Links.</p>
            </div>
            <Card className="max-w-2xl mx-auto p-8 text-center bg-card shadow-lg border">
                <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary/20 shadow-md">
                    <AvatarImage src="https://iili.io/KTpEi9s.md.jpg" alt="Janarthan Veeramani" />
                    <AvatarFallback className="text-5xl">JV</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-slate-800">Janarthan Veeramani</h3>
                <p className="text-primary font-semibold text-lg">Founder & Visionary</p>
                <p className="text-slate-600 mt-4 max-w-prose mx-auto">
                    "I started Focus Links because I believe connection is the catalyst for innovation. My goal is to build the tools and the community that I wished I had as a student—a space where anyone in the eye care field can find their place, share their knowledge, and shape the future of vision."
                </p>
                 <div className="flex items-center justify-center gap-2 mt-6">
                    <Button asChild variant="outline">
                        <Link href="/profile/1">View Profile</Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <a href="https://www.linkedin.com/in/janarthan-v" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <a href="mailto:janarthanv@outlook.com">
                            <Mail className="h-5 w-5" />
                        </a>
                    </Button>
                 </div>
            </Card>
          </section>

          {/* Mission Section */}
          <section className="py-16 bg-card border rounded-lg shadow-sm">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-800">Join Us in Building the Future of Connected Eye Care</h2>
                <p className="mt-4 text-lg text-slate-600">
                  In an ever-evolving industry, staying connected is more important than ever. Focus Links provides a centralized platform for optometrists, students, researchers, academics, and industry organizations to create detailed profiles, showcase their expertise, and discover one another. Whether you're a student seeking mentorship, a practitioner looking to collaborate on a complex case, or an organization wanting to engage with the community, our platform is built for you.
                </p>
                 <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href="/membership">Become a Member</Link>
                  </Button>
                </div>
            </div>
          </section>
        </div>

      </div>
    </>
  );
}
