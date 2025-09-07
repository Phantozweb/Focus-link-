
"use client";

import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const professionals = allUsers.filter(u => u.type === 'Optometrist' || u.type === 'Academic' || u.type === 'Researcher').slice(0, 4);
  const organizations = allUsers.filter(u => u.type === 'Association' || u.type === 'College').slice(0, 3);
  const clinicsAndOpticals = allUsers.filter(u => u.type === 'Hospital' || u.type === 'Optical').slice(0, 3);
  const students = allUsers.filter(u => u.type === 'Student').slice(0, 4);

  return (
    <main>
      <section className="relative py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 text-left text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">Find Your Next Opportunity in Eye Care</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-slate-600">Search for professionals, organizations, and resources in the optometry community.</p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex-grow">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-grow">
                  <label className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-gray-500">search</span>
                    <input className="form-input w-full pl-10 pr-4 py-2.5 rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500" placeholder="Professionals, associations, colleges..."/>
                  </label>
                </div>
                <div className="flex-grow">
                  <label className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-gray-500">location_on</span>
                    <input className="form-input w-full pl-10 pr-4 py-2.5 rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500" placeholder="Location"/>
                  </label>
                </div>
                <button className="w-full md:w-auto flex items-center justify-center h-11 px-8 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-700 transition-colors">Search</button>
              </div>
            </div>
             <Button size="lg" asChild className="shadow-lg bg-cyan-600 hover:bg-cyan-700 text-lg">
                <Link href="/join">Join the Directory</Link>
             </Button>
          </div>
        </div>
      </section>

      <div className="px-4 md:px-10 lg:px-20 py-16 bg-white">
        <div className="space-y-16">
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Professionals</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((user) => (
                  <ProfileCard key={user.id} user={user} />
                ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Associations &amp; Colleges</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organizations.map((user) => (
                  <ProfileCard key={user.id} user={user} />
                ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Eye Care Clinics &amp; Opticals</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicsAndOpticals.map((user) => (
                  <ProfileCard key={user.id} user={user} />
                ))}
            </div>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Events &amp; Webinars</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 bg-white">
                <div className="p-6">
                  <p className="text-sm text-cyan-600 font-semibold">Oct 25, 2024</p>
                  <h3 className="text-slate-800 text-xl font-bold mt-2 mb-2">Advances in Glaucoma Management</h3>
                  <p className="text-gray-500 text-sm mb-4">Join our webinar to learn about the latest treatment options for glaucoma.</p>
                  <a className="font-semibold text-cyan-600 hover:underline" href="#">Register Now <span className="material-symbols-outlined text-sm align-middle">arrow_forward</span></a>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 bg-white">
                <div className="p-6">
                  <p className="text-sm text-cyan-600 font-semibold">Nov 12, 2024</p>
                  <h3 className="text-slate-800 text-xl font-bold mt-2 mb-2">Pediatric Vision Screening Workshop</h3>
                  <p className="text-gray-500 text-sm mb-4">A hands-on workshop for professionals on effective pediatric vision screening.</p>
                  <a className="font-semibold text-cyan-600 hover:underline" href="#">Register Now <span className="material-symbols-outlined text-sm align-middle">arrow_forward</span></a>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 bg-white">
                <div className="p-6">
                  <p className="text-sm text-cyan-600 font-semibold">Dec 01, 2024</p>
                  <h3 className="text-slate-800 text-xl font-bold mt-2 mb-2">The Future of Contact Lens Technology</h3>
                  <p className="text-gray-500 text-sm mb-4">Explore innovative materials and designs in contact lenses with industry leaders.</p>
                  <a className="font-semibold text-cyan-600 hover:underline" href="#">Register Now <span className="material-symbols-outlined text-sm align-middle">arrow_forward</span></a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Students List Directory</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {students.map(student => (
                  <div key={student.id} className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg text-center">
                    <div className="p-6 flex flex-col items-center">
                      <img alt={student.name} className="w-32 h-32 rounded-full object-cover mb-4" src={student.avatarUrl} data-ai-hint="portrait person" />
                      <h3 className="text-slate-800 text-lg font-bold">{student.name}</h3>
                      <p className="text-gray-500 text-sm">{student.education[0]?.school || 'Optometry Student'}</p>
                      <p className="text-gray-500 text-sm">Class of {student.education[0]?.endYear || '2025'}</p>
                      <p className="mt-2 text-sm text-gray-500 flex-grow px-4">{student.bio.substring(0,100)}</p>
                    </div>
                    <div className="flex gap-2 p-4 pt-0 mt-auto">
                        <Button asChild className="h-10 flex-1 bg-cyan-600 hover:bg-cyan-700">
                          <Link href={`/${student.id}`}>View Profile</Link>
                        </Button>
                    </div>
                  </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
