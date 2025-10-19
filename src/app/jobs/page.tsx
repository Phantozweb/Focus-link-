
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Board | Focus Links',
  description: 'Find your next career opportunity in the eye care industry on the Focus Links job board. Browse listings from top clinics, hospitals, and companies. Coming soon!',
};

export default function JobsPage() {
  return (
    <div className="bg-muted/40">
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Job Board</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover your next career move. Connect with leading employers in the eye care industry.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-card p-12 rounded-lg shadow-lg border">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Coming Soon!</h2>
            <p className="text-lg text-slate-600">
                Our job board is under construction! Soon, you'll be able to browse and post job opportunities from top clinics, hospitals, opticals, and industry partners.
            </p>
        </div>
      </div>
    </div>
  );
}
