
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Search, Award } from "lucide-react";
import Image from "next/image";

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">The world's largest eye care community to find, connect, and grow.</h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A product of Focus In. Our mission is to foster connections, facilitate collaboration, and empower professionals and students across the entire field of eye care.
          </p>
        </div>
      </section>
      
      {/* Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
            <Image src="https://picsum.photos/seed/about-main/1200/500" alt="Eye care professionals collaborating" width={1200} height={500} className="rounded-lg shadow-lg" data-ai-hint="people meeting office" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why FocusLink?</h2>
             <p className="mt-2 text-lg text-slate-600">A unified platform for the entire eye care ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20">
         <div className="container mx-auto px-4 text-center max-w-4xl">
            <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-800">Join Us in Building the Future of Connected Eye Care</h2>
            <p className="mt-4 text-lg text-slate-600">
               In an ever-evolving industry, staying connected is more important than ever. FocusLink provides a centralized platform for optometrists, students, researchers, academics, and industry organizations to create detailed profiles, showcase their expertise, and discover one another. Whether you're a student seeking mentorship, a practitioner looking to collaborate on a complex case, or an organization wanting to engage with the community, our platform is built for you.
            </p>
         </div>
      </section>

    </div>
  );
}
