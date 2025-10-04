
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is Focus Links?",
        answer: "Focus Links is a global directory and community platform designed specifically for the eye care industry. We connect students, professionals, institutions, and industry partners to foster collaboration, learning, and growth."
    },
    {
        question: "Is it free to join?",
        answer: "Yes! Creating a profile and becoming a member of the Focus Links community is completely free."
    },
    {
        question: "Who can join the directory?",
        answer: "Our directory is open to everyone in the eye care ecosystem, including Optometrists, Ophthalmologists, Opticians, Students, Academics, Researchers, Associations, Colleges, Hospitals, Optical shops, and Industry partners."
    },
    {
        question: "How do I get my profile 'verified'?",
        answer: "The 'Verified' badge is manually granted by our admin team to profiles that are complete, accurate, and deemed to be authentic contributors to the community. We periodically review profiles to award this status."
    },
    {
        question: "What is the Focus Links Academy?",
        answer: "The Academy is our educational wing, offering expert-led webinars, workshops, and courses on the latest advancements in vision care. It's a place for continuous learning and professional development."
    },
    {
        question: "How can I partner with Focus Links?",
        answer: "We are always open to collaborations! If you represent an organization, institution, or company and are interested in partnering with us, please reach out via our Contact Us page."
    }
]

export default function FAQPage() {
  return (
    <div className="bg-muted/40">
        <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Find answers to common questions about our platform, membership, and features.
            </p>
            </div>
        </section>

        <div className="container mx-auto max-w-3xl py-16 px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </div>
  );
}
