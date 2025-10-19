
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Discussion Forum | Focus Links',
  description: 'Engage with eye care professionals in our case discussion forum. Share your insights, ask questions, and collaborate on complex cases. Coming soon!',
};

export default function ForumPage() {
  return (
    <div className="bg-muted/40">
      <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Case Discussion Forum</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            A dedicated space for eye care professionals to share, discuss, and learn from real-world clinical cases.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-card p-12 rounded-lg shadow-lg border">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Coming Soon!</h2>
            <p className="text-lg text-slate-600">
                We are hard at work building an interactive and secure forum for case discussions. 
                Stay tuned for a platform where you can collaborate with peers, get second opinions, and enhance your clinical knowledge.
            </p>
        </div>
      </div>
    </div>
  );
}
