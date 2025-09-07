
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">Contact Us</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
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
             <p className="text-slate-600 text-sm">
                For advertising inquiries, please contact us at <a href="mailto:ads@focuslink.com" className="text-primary hover:underline">ads@focuslink.com</a>.
             </p>
          </div>

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
  );
}
