
import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LifeBuoy, UserPlus, Search, Briefcase, MessageSquare, BookOpen, Sparkles, Award, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | Focus Links',
  description: 'Your complete guide to using Focus Links. Find answers on how to create a profile, apply for membership, use the directory, post jobs, and engage with the community forum and academy to grow your career.',
};

const helpTopics = [
  // Profile & Membership
  {
    category: 'Profile & Membership',
    icon: <UserPlus className="h-5 w-5 text-primary" />,
    questions: [
      {
        value: 'profile-create',
        question: 'How do I create a profile?',
        answer: `Creating a profile is the first step to becoming part of our community. To start, you must fill out the official <a href="/membership" class="text-primary underline font-semibold">Membership Application form</a>. Our team will review your submission, and once approved, your profile will be created and listed in the directory.`
      },
      {
        value: 'membership-perks',
        question: 'What are the benefits of official membership?',
        answer: `Applying for membership is how you create your official profile. Once our team reviews and approves your application, you'll receive a 'Verified' badge <span class="inline-flex items-center"><Award className="h-4 w-4 text-primary mx-1" /></span> on your profile. This badge grants you higher visibility, builds trust, and unlocks exclusive perks like posting in the forum and job board, plus priority event registration.`
      },
      {
        value: 'profile-standout',
        question: 'How can I make my profile stand out?',
        answer: `A great profile is your digital handshake. To make it effective:
          <ul class="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Write a compelling bio:</strong> Go beyond your resume. Share your passion, your goals, and what makes you unique in the eye care field.</li>
              <li><strong>Be specific with skills:</strong> Instead of just 'Contact Lenses', specify 'Scleral Lens Fitting' or 'Myopia Control with Ortho-K'.</li>
              <li><strong>Highlight key achievements:</strong> Mention any research, presentations, or special projects you've been a part of.</li>
          </ul>`
      },
      {
        value: 'edit-profile',
        question: 'How do I edit my profile after it has been created?',
        answer: `To ensure data quality and consistency, profile updates are currently handled by our admin team. Please <a href="/contact" class="text-primary underline font-semibold">contact us</a> with your requested changes, and we'll update your profile promptly.`
      },
    ]
  },
  // Directory
  {
    category: 'Using the Directory',
    icon: <Search className="h-5 w-5 text-primary" />,
    questions: [
       {
        value: 'find-people',
        question: 'How do I find the right people or organizations?',
        answer: `Our directory is designed for powerful searches. Use the main search bar on the <a href="/" class="text-primary underline font-semibold">homepage</a> or use the advanced filters on any directory page. You can search by name, keywords (like 'Pediatric Optometry'), skills, interests, and location to find exactly who you're looking for.`
      },
      {
        value: 'connect-people',
        question: 'How do I connect with other members?',
        answer: `Once you find a profile you're interested in, click to view their full details. Most profiles include links to email or LinkedIn. When you reach out, we recommend sending a personalized message mentioning you found them on Focus Links—it’s a great way to start a conversation!`
      },
      {
        value: 'why-students-profile',
        question: 'Why is it important for students to create a profile?',
        answer: `For students, Focus Links is your bridge to the professional world. A profile allows you to:
          <ul class="list-disc pl-5 mt-2 space-y-2">
              <li><strong class="text-primary">Find Mentors:</strong> Connect with experienced professionals who can guide your career.</li>
              <li><strong class="text-primary">Gain Visibility:</strong> Get noticed by leading organizations, clinics, and future employers.</li>
              <li><strong class="text-primary">Build Your Network:</strong> Start building professional relationships long before you graduate.</li>
              <li><strong class="text-primary">Stay Informed:</strong> Keep up with industry trends through our Academy and Forum.</li>
          </ul>`
      }
    ]
  },
   // Academy
  {
    category: 'Academy & Events',
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    questions: [
      {
        value: 'join-webinar',
        question: 'How do I join a webinar?',
        answer: `Visit the <a href="/academy" class="text-primary underline font-semibold">Academy page</a> to see all upcoming, live, and past events. For upcoming events, click 'View Details' and use the registration link. Once registered, you'll receive an email with the link to join the session one hour before it starts.`
      },
      {
        value: 'view-past-webinars',
        question: 'Can I view past webinars?',
        answer: `Yes! The 'On-Demand & Past Events' section on the Academy page lists all our previous webinars. Click 'View Details' to access recordings and materials, allowing you to learn at your own pace.`
      },
      {
        value: 'host-webinar',
        question: 'How can my organization host a webinar with Focus Links?',
        answer: `We love collaborating with member organizations! To host a webinar, your organization must first have an approved profile on our platform. Once you are a member, please <a href="/contact" class="text-primary underline font-semibold">contact us</a> with your event proposal. We'd be thrilled to partner with you.`
      }
    ]
  },
  // Forum
  {
    category: 'Community Forum',
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
    questions: [
      {
        value: 'submit-case',
        question: 'How do I submit a case to the forum?',
        answer: `To start a new discussion or share a clinical case, you must have an approved member profile. Navigate to the <a href="/forum" class="text-primary underline font-semibold">Case Forum</a> and click the 'Start a New Discussion' button. If the button is disabled, it means you need to become an official member first.`
      },
      {
        value: 'forum-rules',
        question: 'What are the rules for posting a case?',
        answer: `The most important rule is to <strong>protect patient privacy</strong>. You must anonymize all patient-identifying information (name, date of birth, etc.) before posting. Share clear images and a concise history to get the best feedback from the community. Be respectful and constructive in your own posts and when replying to others.`
      }
    ]
  },
   // Job Board
  {
    category: 'Job Board',
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    questions: [
      {
        value: 'apply-job',
        question: 'How do I apply for a job?',
        answer: `Browse listings on our <a href="/jobs" class="text-primary underline font-semibold">Job Board</a>. When you find a position you're interested in, click 'View Details'. On the job detail page, you'll find an 'Apply Now' button which will typically redirect you to the employer's application portal or provide instructions on how to apply.`
      },
      {
        value: 'post-job',
        question: 'How can my organization post a job listing?',
        answer: `Job posting is a perk for our official members and partners. To post a job, your organization must have an approved profile. If you are a member, you can <a href="/contact" class="text-primary underline font-semibold">contact us</a> to get your job listed. If you are not a member yet, please <a href="/membership" class="text-primary underline font-semibold">apply for membership</a> first.`
      }
    ]
  }
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
            <div className="max-w-3xl mx-auto space-y-12">
                {helpTopics.map((topic) => (
                    <div key={topic.category}>
                        <div className="flex items-center gap-3 mb-6">
                            {topic.icon}
                            <h2 className="text-2xl font-bold text-slate-800">{topic.category}</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full bg-card p-2 sm:p-4 rounded-lg shadow-md border space-y-1">
                            {topic.questions.map((item) => (
                                <AccordionItem value={item.value} key={item.value} className="border-b-0">
                                    <AccordionTrigger className="text-base text-left font-semibold hover:no-underline rounded-md px-4 py-3 hover:bg-muted">
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="h-5 w-5 text-muted-foreground" />
                                            <span>{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pl-4 pr-4">
                                        <div className="prose prose-slate max-w-none text-base" dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
