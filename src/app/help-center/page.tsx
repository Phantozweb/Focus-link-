
import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LifeBuoy, UserPlus, Search, Briefcase, MessageSquare, BookOpen, Sparkles, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | Focus Links',
  description: 'Your complete guide to using Focus Links. Find answers on how to create a profile, apply for membership, use the directory, post jobs, and engage with the community forum and academy to grow your career.',
};

const helpTopics = [
    {
        value: "item-1",
        trigger: "Profile & Membership",
        icon: <UserPlus className="h-6 w-6 text-primary" />,
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I create a profile?</h4>
            <p class="mb-4">You can create a profile in two main ways: by filling out the detailed <a href="/membership" class="text-primary underline">Membership Application form</a> for official membership, or by using the <a href="/directory/create" class="text-primary underline">AI Profile Builder</a> for a quick, AI-guided setup.</p>
            
            <h4 class="font-semibold text-lg mb-2">What is the difference between creating a profile and official membership?</h4>
            <p class="mb-4">Creating a profile gets you listed in our directory. Applying for official membership through the detailed form allows our team to review your application. Once approved, you'll receive a 'Verified' badge <span class="inline-flex items-center"><Award className="h-4 w-4 text-primary mx-1" /></span> on your profile. This badge grants you higher visibility, builds trust, and unlocks exclusive perks like posting in the forum and priority event registration.</p>

            <h4 class="font-semibold text-lg mb-2">How can I make my profile stand out?</h4>
            <p class="mb-4">A great profile is your digital handshake. To make it effective:
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Write a compelling bio:</strong> Go beyond your resume. Share your passion, your goals, and what makes you unique in the eye care field.</li>
                    <li><strong>Be specific with skills:</strong> Instead of just 'Contact Lenses', specify 'Scleral Lens Fitting' or 'Myopia Control with Ortho-K'.</li>
                    <li><strong>Highlight key achievements:</strong> Mention any research, presentations, or special projects you've been a part of.</li>
                </ul>
            </p>

            <h4 class="font-semibold text-lg mb-2">How do I edit my profile after it's created?</h4>
            <p>Currently, profile updates are handled by our admin team to ensure data quality. Please <a href="/contact" class="text-primary underline">contact us</a> with your requested changes, and we'll update your profile promptly.</p>
        `
    },
    {
        value: "item-2",
        trigger: "Using the Directory",
        icon: <Search className="h-6 w-6 text-primary" />,
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I find the right people?</h4>
            <p class="mb-4">Our directory is designed for powerful searches. Use the main search bar on the <a href="/" class="text-primary underline">homepage</a> or the filters on directory pages. You can search by name, keywords (like 'Pediatric Optometry'), skills, interests, and location to find exactly who you're looking for.</p>
            
            <h4 class="font-semibold text-lg mb-2">How do I connect with others?</h4>
            <p class="mb-4">Once you find a profile you're interested in, click to view their full details. Most profiles include links to email or LinkedIn. When you reach out, we recommend sending a personalized message mentioning you found them on Focus Links—it’s a great way to start a conversation!</p>

            <h4 class="font-semibold text-lg mb-2">Why should students create a profile?</h4>
            <p>For students, Focus Links is your bridge to the professional world. A profile allows you to:
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li><strong class="text-primary">Find Mentors:</strong> Connect with experienced professionals who can guide your career.</li>
                    <li><strong class="text-primary">Gain Visibility:</strong> Get noticed by leading organizations, clinics, and future employers.</li>
                    <li><strong class="text-primary">Build Your Network:</strong> Start building professional relationships long before you graduate.</li>
                    <li><strong class="text-primary">Stay Informed:</strong> Keep up with industry trends through our Academy and Forum.</li>
                </ul>
            </p>`
    },
    {
        value: "item-3",
        trigger: "Academy & Events",
        icon: <BookOpen className="h-6 w-6 text-primary" />,
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I join a webinar?</h4>
            <p class="mb-4">Visit the <a href="/academy" class="text-primary underline">Academy page</a> to see all upcoming, live, and past events. For upcoming events, click 'View Details' and use the registration link. Once registered, you'll receive an email with the link to join the session one hour before it starts.</p>

            <h4 class="font-semibold text-lg mb-2">Can I view past webinars?</h4>
            <p>Yes! The 'On-Demand & Past Events' section on the Academy page lists all our previous webinars. Click 'View Details' to access recordings and materials, allowing you to learn at your own pace.</p>

            <h4 class="font-semibold text-lg mb-2">How can I host a webinar with Focus Links?</h4>
            <p>We are always looking for experts to share their knowledge. If you have a topic you're passionate about and want to present to our community, please <a href="/contact" class="text-primary underline">contact us</a> with your proposal. We'd love to collaborate!</p>
            `
    },
    {
        value: "item-4",
        trigger: "Community Forum",
        icon: <MessageSquare className="h-6 w-6 text-primary" />,
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I submit a case to the forum?</h4>
            <p class="mb-4">To start a new discussion or share a clinical case, navigate to the <a href="/forum" class="text-primary underline">Case Forum</a> and click the 'Start a New Discussion' button. Please note that only official, verified members can post new topics to maintain the quality of our discussions.</p>
            
            <h4 class="font-semibold text-lg mb-2">What are the rules for posting a case?</h4>
            <p>The most important rule is to **protect patient privacy**. You must anonymize all patient-identifying information (name, date of birth, etc.) before posting. Share clear images and a concise history to get the best feedback from the community. Be respectful and constructive in your own posts and when replying to others.</p>
            `
    },
    {
        value: "item-5",
        trigger: "Job Board",
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        content: `
            <h4 class="font-semibold text-lg mb-2">How do I apply for a job?</h4>
            <p class="mb-4">Browse listings on our <a href="/jobs" class="text-primary underline">Job Board</a>. When you find a position you're interested in, click 'View Details'. On the job detail page, you'll find an 'Apply Now' button which will typically redirect you to the employer's application portal or provide instructions on how to apply.</p>

            <h4 class="font-semibold text-lg mb-2">How can my organization post a job listing?</h4>
            <p>Job posting is a perk for our official members and partners. If your organization is a verified member, you will see an active 'Post a Job' button on the job board. If you are not a member yet, please <a href="/membership" class="text-primary underline">apply for membership</a>. For partnership inquiries, you can also <a href="/contact" class="text-primary underline">contact us</a>.</p>`
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
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-8 rounded-lg shadow-md border">
                    {helpTopics.map((topic) => (
                        <AccordionItem value={topic.value} key={topic.value}>
                            <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">
                                <div className="flex items-center gap-4">
                                    {topic.icon}
                                    <span>{topic.trigger}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-14">
                                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    </div>
  );
}
