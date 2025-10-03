
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Search, Award } from "lucide-react";
import Image from "next/image";
import type { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: 'About Focus Links | Our Mission and Team',
  description: 'Learn about the mission of Focus Links to connect the global eye care community and meet the team dedicated to building the future of vision care.',
};

const teamMembers = [
  {
    name: 'Janarthan Veeramani',
    role: 'Founder',
    avatarUrl: 'https://iili.io/Jodp9gI.png',
    aiHint: 'portrait person founder',
  },
  {
    name: 'Mohd Asad',
    role: 'Managing Director of Academic',
    avatarUrl: 'https://iili.io/Jodp9gI.png',
    aiHint: 'portrait person director',
  },
  {
    name: 'Adnan',
    role: 'Outreach Marketing MD',
    avatarUrl: 'https://iili.io/Jodp9gI.png',
    aiHint: 'portrait person marketing',
  },
  {
    name: 'Anshi Jha',
    role: 'Team Member',
    avatarUrl: 'https://iili.io/Jodp9gI.png',
    aiHint: 'portrait person team',
  },
  {
    name: 'Shiva Shangari M',
    role: 'Developer',
    avatarUrl: 'https://iili.io/Jodp9gI.png',
    aiHint: 'portrait person developer',
  }
];

export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Comprehensive Profiles",
      description: "Build a detailed profile that highlights your experience, education, skills, and interests to showcase your unique expertise."
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Advanced Directory",
      description: "Easily search and filter our extensive directory to find the right people and organizations that match your needs."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Inclusive Community",
      description: "We welcome everyone from individual practitioners and students to large associations, colleges, hospitals, and optical practices."
    }
  ]

  return (
    <div className="bg-muted/40">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">About Focus Links</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Our mission is to foster connections, facilitate collaboration, and empower professionals and students across the entire field of eye care.
          </p>
        </div>
      </section>
      
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Image Section */}
        <section>
          <div className="container mx-auto px-4">
              <Image src="https://picsum.photos/seed/about-main/1200/500" alt="Eye care professionals collaborating" width={1200} height={500} className="rounded-lg shadow-lg" data-ai-hint="people meeting office" />
          </div>
        </section>

        {/* Features Section */}
        <section>
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Focus Links?</h2>
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
        <section>
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Meet the Team</h2>
             <p className="mt-2 text-lg text-slate-600">The passionate individuals building Focus Links.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
             {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                    <Avatar className="h-32 w-32 mx-auto mb-4 shadow-lg border-4 border-white">
                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.aiHint} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                </div>
             ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 bg-card border rounded-lg shadow-sm">
           <div className="container mx-auto px-4 text-center max-w-4xl">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-800">Join Us in Building the Future of Connected Eye Care</h2>
              <p className="mt-4 text-lg text-slate-600">
                 In an ever-evolving industry, staying connected is more important than ever. Focus Links provides a centralized platform for optometrists, students, researchers, academics, and industry organizations to create detailed profiles, showcase their expertise, and discover one another. Whether you're a student seeking mentorship, a practitioner looking to collaborate on a complex case, or an organization wanting to engage with the community, our platform is built for you.
              </p>
           </div>
        </section>
      </div>

    </div>
  );
}
