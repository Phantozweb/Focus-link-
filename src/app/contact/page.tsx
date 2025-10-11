
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

export default function ContactPage() {
  return (
    <div className="bg-muted/40">
       <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Contact Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-8">
             <h2 className="text-2xl font-bold text-slate-800">Get in Touch</h2>
             <p className="text-slate-600">
                Fill out the form and our team will get back to you within 24 hours.
             </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:support@focuslink.com" className="text-slate-700 hover:text-primary">support@focuslink.com</a>
              </div>
               <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-slate-700">+1 (555) 123-4567</span>
              </div>
            </div>
             <div className="p-4 rounded-md bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3">
                    <Handshake className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold text-primary">Interested in Collaborating?</h3>
                </div>
                <p className="text-slate-600 text-sm mt-2">
                    For partnerships, advertising, or community collaborations, please use the form and our team will connect with you.
                </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form action="#" className="space-y-6">
                   <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input type="text" id="name" placeholder="John Doe" className="mt-1" />
                  </div>
                   <div>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="you@example.com" className="mt-1" />
                  </div>
                   <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" rows={5} placeholder="Your message..." className="mt-1" />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
