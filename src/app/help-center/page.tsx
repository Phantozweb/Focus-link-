
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifeBuoy, UserPlus, Search, Briefcase, MessageSquare, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | Focus Links',
  description: 'Your complete guide to using Focus Links. Find answers on how to create a profile, apply for membership, use the directory, post jobs, and engage with the community forum and academy.',
};

const helpSections = [
    {
        icon: <UserPlus className="h-8 w-8 text-primary" />,
        title: "Creating Your Profile & Membership",
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I create a profile?</h4>
            <p class="mb-4">You can create a profile in two main ways: by filling out the <a href="/membership" class="text-primary underline">Membership Application form</a>, or by using the <a href="/directory/create" class="text-primary underline">AI Profile Builder</a>. The AI builder offers a conversational way to build your profile by simply answering questions.</p>
            
            <h4 class="font-semibold text-lg mb-2">What is the difference between creating a profile and official membership?</h4>
            <p class="mb-4">Creating a profile gets you listed in our directory. Applying for official membership through the detailed <a href="/membership" class="text-primary underline">membership form</a> allows our team to review your application. Once approved, you'll receive a 'Verified' badge on your profile, granting you higher visibility, trust within the community, and access to exclusive perks like priority event registration.</p>
            
            <h4 class="font-semibold text-lg mb-2">Why should students create a profile?</h4>
            <p>For students, a profile on Focus Links is your gateway to the professional world. It allows you to:
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>Connect with potential mentors and employers.</li>
                    <li>Showcase your skills, interests, and academic achievements.</li>
                    <li>Gain visibility among leading organizations and clinics.</li>
                    <li>Stay updated with the latest industry trends through our Academy and Forum.</li>
                </ul>
            </p>`
    },
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: "Using the Directory",
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I find the right people?</h4>
            <p class="mb-4">Our directory is designed for powerful, specific searches. Use the search bar on the <a href="/directory" class="text-primary underline">Directory page</a> to search by name, skills (e.g., 'Pediatric Optometry'), or interests. You can also use the filters to narrow down by country and professional role (e.g., 'Student', 'Optometrist').</p>
            
            <h4 class="font-semibold text-lg mb-2">How can I connect with other people?</h4>
            <p>Once you find a profile you're interested in, click 'View Profile' to see their full details. Most profiles include links to their email or LinkedIn, which you can use to reach out directly. We encourage you to send a personalized message mentioning you found them on Focus Links!</p>`
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "Academy & Events",
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I join a webinar?</h4>
            <p>Visit the <a href="/academy" class="text-primary underline">Academy page</a> to see all upcoming, live, and past events. For upcoming events, click 'View Details' and then use the registration link. Once you're registered, you will receive an email with the link to join the live session one hour before it starts.</p>`
    },
    {
        icon: <MessageSquare className="h-8 w-8 text-primary" />,
        title: "Community Forum",
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I submit a case to the forum?</h4>
            <p>To start a new discussion or share a clinical case, navigate to the <a href="/forum" class="text-primary underline">Case Forum</a> and click the 'Start a New Discussion' button. Please note that only official, verified members can post new topics to maintain the quality of discussions. When sharing case details, you **must** anonymize all patient-identifying information to protect their privacy.</p>`
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: "Job Board",
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I apply for a job?</h4>
            <p class="mb-4">Browse listings on our <a href="/jobs" class="text-primary underline">Job Board</a>. When you find a position you're interested in, click 'View Details'. On the job detail page, you'll find an 'Apply Now' button which will typically redirect you to the employer's application page or provide instructions on how to apply.</p>

            <h4 class="font-semibold text-lg mb-2">How can I post a job listing?</h4>
            <p>Posting a job is a perk for our official members and partners. If you are a verified member, you will see an active 'Post a Job' button on the job board. If you're not a member yet, please <a href="/membership" class="text-primary underline">apply for membership</a> first. For partnership inquiries, please <a href="/contact" class="text-primary underline">contact us</a>.</p>`
    },
];

export default function HelpCenterPage() {
  return (
    <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
                <LifeBuoy className="h-16 w-16 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Help Center</h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                    Your guide to making the most of the Focus Links community. Find everything you need to connect, learn, and grow.
                </p>
            </div>
        </section>

        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {helpSections.map((section, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            {section.icon}
                            <CardTitle className="text-2xl font-headline">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
