import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <Eye className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-4xl font-headline">About OptoConnect</CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-foreground/80 space-y-6">
          <p>
            Welcome to <strong>OptoConnect</strong>, the premier digital directory designed exclusively for the optometry community. Our mission is to foster connections, facilitate collaboration, and empower professionals and students across the field of eye care.
          </p>
          <p>
            In an ever-evolving industry, staying connected is more important than ever. OptoConnect provides a centralized platform for optometrists, students, researchers, academics, and industry organizations to create detailed profiles, showcase their expertise, and discover one another. Whether you're a student seeking mentorship, a practitioner looking to collaborate on a complex case, or an organization wanting to engage with the community, our platform is built for you.
          </p>
          <p>
            Our key features include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Comprehensive Profiles:</strong> Build a detailed profile that highlights your experience, education, skills, and interests.</li>
            <li><strong>Advanced Directory:</strong> Easily search and filter our extensive directory to find the right people and organizations.</li>
            <li><strong>AI-Powered Suggestions:</strong> Leverage our intelligent system to get personalized connection recommendations based on your profile.</li>
            <li><strong>Inclusive Community:</strong> We welcome everyone from individual practitioners and students to large associations, colleges, hospitals, and optical practices.</li>
          </ul>
          <p>
            Join us in building the future of optometry, connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
