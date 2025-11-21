
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Focus Links',
  description: 'Get in touch with the Focus Links team. Contact us for support, partnerships, or any questions about our eye care community platform.',
};

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Focus Links",
    "description": "Get in touch with the Focus Links team for support, partnerships, or general inquiries.",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://focuslinks.in/contact"
    }
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <div className="bg-brand-bg">
        <header className="hero">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-base opacity-90 max-w-xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about features, partnerships, or anything else, our team is ready to answer all your questions.
          </p>
        </header>

        <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
          <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-800">Get in Touch</h2>
              <p className="text-slate-600 mt-2 text-lg">
                  The best way to reach us is by email. Our team will get back to you within 24 hours.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full-btn">
                    <a href="mailto:team.focuslinks@outlook.com">
                        <Mail className="mr-2 h-5 w-5" />
                        Contact us via Email
                    </a>
                </Button>
              </div>
              <Card className="mt-12 text-left bg-primary/10 border-primary/20 rounded-3xl">
                  <CardHeader className="flex-row items-center gap-4">
                      <div className="flex-shrink-0">
                        <Handshake className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary">Interested in Collaborating?</CardTitle>
                        <CardContent className="p-0 pt-2 text-slate-700">
                             For partnerships, event hosting, or community collaborations, please reach out to our team via email. We'd be thrilled to hear your ideas.
                        </CardContent>
                      </div>
                  </CardHeader>
              </Card>
          </div>
        </main>
      </div>
    </>
  );
}
