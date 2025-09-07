
"use client";

import { users as allUsers } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { Globe, Search, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Home() {
  const professionals = allUsers.filter(u => ['Optometrist', 'Academic', 'Researcher'].includes(u.type)).slice(0, 6);
  const organizations = allUsers.filter(u => ['Association', 'College'].includes(u.type)).slice(0, 6);
  const clinicsAndOpticals = allUsers.filter(u => ['Hospital', 'Optical'].includes(u.type)).slice(0, 6);
  const students = allUsers.filter(u => u.type === 'Student').slice(0, 4);
  const industry = allUsers.filter(u => u.type === 'Industry').slice(0, 6);
  const router = useRouter();


  const handleSearch = () => {
    // In a real app, you'd collect filter values from state
    // and pass them as query params to the directory page.
    router.push('/directory');
  }

  return (
    <main>
       <section className="relative py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 text-left text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">Find Your Next Opportunity in Eye Care</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-slate-600">Search for professionals, organizations, and resources in the eye care community.</p>
            <div className="w-full max-w-2xl bg-white p-2 rounded-lg shadow-lg border border-gray-200">
               <div className="flex flex-col md:flex-row gap-2 items-center">
                 <div className="flex-grow w-full">
                    <label className="relative flex items-center">
                     <Search className="absolute left-3 text-gray-500 h-5 w-5" />
                     <input className="form-input w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-800 border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500" placeholder="Search by name, skill, or keyword..."/>
                   </label>
                 </div>
                 
                 <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto h-12">
                      <SlidersHorizontal className="mr-2 h-5 w-5" />
                      Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Advanced Search Filters</DialogTitle>
                       <DialogDescription>
                        Refine your search to find the perfect connection.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                       <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Type</label>
                        <div className="col-span-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a profile type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Profiles</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="optometrist">Optometrist</SelectItem>
                              <SelectItem value="academic">Academic / Researcher</SelectItem>
                              <SelectItem value="association">Association</SelectItem>
                              <SelectItem value="college">College / University</SelectItem>
                              <SelectItem value="hospital">Hospital / Clinic</SelectItem>
                              <SelectItem value="optical">Optical</SelectItem>
                              <SelectItem value="industry">Industry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Country</label>
                         <div className="col-span-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map(country => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                     <Button type="submit" onClick={handleSearch} className="w-full">
                        Show Results
                      </Button>
                  </DialogContent>
                </Dialog>

                 <Button className="w-full md:w-auto h-12" onClick={handleSearch}>Search</Button>
               </div>
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
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {professionals.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Associations &amp; Colleges</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
             <div className="relative">
               <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {organizations.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Eye Care Clinics &amp; Opticals</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {clinicsAndOpticals.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>
          
           <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-slate-800 text-3xl font-bold leading-tight tracking-tight">Featured Industry Partners</h2>
              <a className="text-cyan-600 font-semibold hover:underline" href="#">View All</a>
            </div>
            <div className="relative">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                  {industry.map((user) => (
                    <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <ProfileCard user={user} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
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
                      <Image alt={student.name} className="w-32 h-32 rounded-full object-cover mb-4" src={student.avatarUrl} width={128} height={128} data-ai-hint="portrait person" />
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
