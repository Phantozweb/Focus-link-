
'use client';

import { useParams } from 'next/navigation';
import type { Education, WorkExperience, UserProfile, Achievement } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Briefcase, Building, Check, CheckCircle2, Factory, Globe, GraduationCap, Handshake, History, Hospital, Layers, Linkedin, Mail, MapPin, University, User, Users, FileText, Award, Star, AlertCircle, Target, Eye, ShieldQuestion, UserRound, ArrowUpRight, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


const SectionTitle = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-[--profile-primary-dark] mb-6 flex items-center gap-3">
        {icon}
        <span className="flex-grow border-b-2 border-cyan-500/20 pb-1">{children}</span>
    </h2>
);

const TimelineItem = ({ title, company, date, description, isEducation }: { title: string, company: string, date: string, description: string, isEducation?: boolean }) => (
  <div className="relative pl-8 mb-8 last:mb-0">
    <div className="absolute left-0 top-1.5 w-3 h-3 bg-white border-2 border-[--profile-primary] rounded-full z-10"></div>
    <h3 className="font-semibold text-base text-[--profile-text-main]">{title}</h3>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-[--profile-text-light] mb-2">
      <span className={cn("font-medium", isEducation ? "text-slate-500" : "text-[--profile-primary]")}>{company}</span>
      <span className="italic">{date}</span>
    </div>
    <p className="text-sm text-[--profile-text-light] leading-relaxed">{description}</p>
  </div>
);

const SkillChip = ({ skill }: { skill: string }) => (
    <span className="bg-white border border-cyan-200/80 text-[--profile-text-main] px-4 py-1.5 rounded-full text-xs font-medium cursor-default transition-all hover:bg-[--profile-primary] hover:text-white hover:border-[--profile-primary] hover:-translate-y-0.5">
        {skill}
    </span>
);

const UnclaimedProfileBanner = () => (
    <Alert className="bg-amber-50 border-amber-300 text-amber-900 mb-8">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="font-bold">This Profile is Unclaimed</AlertTitle>
        <AlertDescription>
            Are you part of this organization? Claim your profile to update details and manage your community presence.
             <Dialog>
                <DialogTrigger asChild>
                     <Button size="sm" className="mt-3 bg-amber-500 hover:bg-amber-600 text-white w-full">
                        Claim This Profile
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Claim Your Organization's Profile</DialogTitle>
                        <DialogDescription>
                            To ensure the integrity of our community, please follow these steps to claim your profile:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <p><strong>Step 1:</strong> Send an email from your official organization email address (e.g., yourname@yourorganization.com).</p>
                        <p><strong>Step 2:</strong> In the email, please attach verifiable documents or proofs of your affiliation with the organization.</p>
                        <p><strong>Step 3:</strong> Our team will review your request and get back to you promptly.</p>
                    </div>
                    <DialogFooter>
                         <Button asChild className="w-full">
                            <a href="mailto:team.focuslinks@gmail.com?subject=Profile%20Claim%20Request">
                                <Mail className="mr-2 h-4 w-4" /> Email Us to Claim
                            </a>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AlertDescription>
    </Alert>
);

const OrganizationProfileLayout = ({ user }: { user: UserProfile }) => {
    const isUnclaimed = !user.verified || user.verifiedRole === 'Unclaimed';
    const mission = "Our mission is to advance the field of vision science and provide exceptional care.";
    const vision = "To be a global leader in eye care innovation and education.";

    const contactEmail = user.links?.email;
    const emailSubject = encodeURIComponent(`Connecting with ${user.name} via Focus Links`);
    const emailBody = encodeURIComponent(`Hello ${user.name} team,\n\nI discovered your organization on FocusLinks.in and would love to learn more about your work.\n\nBest regards,`);
    const mailtoLink = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
  
  return (
    <div className="bg-slate-50">
        <header className="relative h-56 md:h-64 bg-gradient-to-r from-cyan-500 to-blue-600 flex flex-col items-center justify-center text-white text-center p-4">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col items-center">
                 <div className="relative h-28 w-28 mx-auto flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl border-4 border-white shadow-lg">
                    <Image src={user.avatarUrl} alt={`${user.name} logo`} layout="fill" objectFit="contain" className="p-2"/>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mt-4">{user.name}</h1>
                <p className="text-lg text-blue-100">{user.experience}</p>
            </div>
        </header>

        <main className="container mx-auto max-w-5xl py-12 px-4 space-y-12">
            
            <Card>
                <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
                     {user.links?.website && (
                        <Button asChild className="flex-grow" size="lg">
                            <a href={user.links.website} target="_blank" rel="noopener noreferrer">
                                Visit Website <ArrowUpRight className="h-4 w-4 ml-2" />
                            </a>
                        </Button>
                    )}
                    {contactEmail && (
                        <Button variant="secondary" asChild className="flex-grow" size="lg">
                            <a href={mailtoLink}>
                                <Mail className="h-4 w-4 mr-2" /> Enquiry
                            </a>
                        </Button>
                    )}
                </CardContent>
            </Card>

             {isUnclaimed && <UnclaimedProfileBanner />}
            
            <Separator />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><ShieldQuestion className="h-6 w-6 text-primary" /> About Us</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">{user.bio}</p>
                </section>
                
                <aside className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Mission</h3>
                        <p className="text-slate-600">{mission}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2"><Eye className="h-5 w-5 text-primary" /> Vision</h3>
                        <p className="text-slate-600">{vision}</p>
                    </div>
                </aside>
            </div>


             {user.skills && user.skills.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Layers className="h-6 w-6 text-primary" /> Key Activities</h2>
                    <div className="flex flex-wrap gap-3">
                        {user.skills.map(s => (
                           <span key={s} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                                {s}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </main>
    </div>
  );
};


const ModernProfileLayout = ({ user }: { user: UserProfile }) => {
    const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
    const isTeamMember = user.isFounder || user.verifiedRole;
    const isUnclaimed = !user.verified || user.verifiedRole === 'Unclaimed';
    
    const getOrgIcon = (type: UserProfile['type']) => {
        switch (type) {
            case 'Hospital': return <Hospital className="w-4 h-4" />;
            case 'College': return <University className="w-4 h-4" />;
            case 'Association': return <Handshake className="w-4 h-4" />;
            case 'Industry': return <Factory className="w-4 h-4" />;
            default: return <Briefcase className="w-4 h-4" />;
        }
    };

    const FallbackIcon = isOrg ? Building : User;
    
    return (
        <div style={{ background: 'var(--profile-bg-gradient)', fontFamily: "'Poppins', sans-serif" }} className="min-h-screen p-5 md:p-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* --- LEFT SIDE: Profile Card --- */}
                <aside className="lg:col-span-1 lg:sticky top-10">
                    <div className="glass-panel text-center p-8">
                        <div className="relative w-36 h-36 mx-auto mb-4">
                            <Avatar className="w-36 h-36 border-4 border-white shadow-lg">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback className="bg-slate-200">
                                    <FallbackIcon className="h-20 w-20 text-slate-400" />
                                </AvatarFallback>
                            </Avatar>
                             {user.verified && !isUnclaimed && (
                                <div className={cn(
                                    "absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md",
                                    isTeamMember ? "text-green-500" : "text-blue-500"
                                )}>
                                    <CheckCircle2 className="w-6 w-6" />
                                </div>
                            )}
                             {user.isFounder && (
                                <div className="absolute top-1 right-1 w-8 h-8 rounded-full flex items-center justify-center bg-amber-400 text-white shadow-md">
                                    <Star className="w-5 w-5" />
                                </div>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-[--profile-primary-dark]">{user.name}</h1>
                        <p className="text-sm font-medium text-[--profile-primary] leading-snug">{user.experience}</p>
                        {user.verifiedRole && !isUnclaimed && (
                            <div className="mt-4">
                                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                                    <Star className="h-4 w-4" />
                                    {user.verifiedRole}
                                </span>
                            </div>
                        )}

                        <div className="text-left bg-white/50 p-5 my-6 rounded-2xl space-y-3 text-sm">
                            <div className="flex items-center gap-4 text-[--profile-text-light]">
                                <div className="w-5 text-center text-[--profile-primary]">{isOrg ? getOrgIcon(user.type) : <Briefcase className="w-4 h-4" />}</div>
                                <span>{user.type}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[--profile-text-light]">
                                <div className="w-5 text-center text-[--profile-primary]"><MapPin className="w-4 h-4" /></div>
                                <span>{user.location}</span>
                            </div>
                            {user.education.length > 0 && (
                                <div className="flex items-center gap-4 text-[--profile-text-light]">
                                    <div className="w-5 text-center text-[--profile-primary]"><GraduationCap className="w-4 h-4" /></div>
                                    <span>{user.education[0].degree}</span>
                                </div>
                            )}
                        </div>
                        
                        {!isUnclaimed && (
                          <div className="flex items-center gap-2">
                              {user.links?.linkedin && (
                                  <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" className="block flex-grow text-center py-3.5 px-4 rounded-xl font-semibold bg-blue-600 text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-blue-700">
                                      <div className="flex items-center justify-center gap-2">
                                      {isOrg ? <Globe className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
                                      <span>{isOrg ? 'Website' : 'LinkedIn'}</span>
                                      </div>
                                  </a>
                              )}
                               {user.links?.email && (
                                  <a href={`mailto:${user.links.email}`} className="block flex-shrink-0 w-14 h-14 text-center p-4 rounded-xl font-semibold bg-slate-200 text-slate-600 shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-slate-300">
                                      <Mail className="w-full h-full" />
                                  </a>
                              )}
                          </div>
                        )}
                         {isUnclaimed && (
                            <Button asChild className="w-full">
                                <Link href="/membership#membership-join">Claim This Profile</Link>
                            </Button>
                        )}
                    </div>
                </aside>

                {/* --- RIGHT SIDE: Main Content --- */}
                <main className="lg:col-span-2 glass-panel p-8">
                    {isUnclaimed && <UnclaimedProfileBanner />}
                    
                    <SectionTitle icon={<User className="w-5 h-5" />}>Professional Summary</SectionTitle>
                    <p className="text-[--profile-text-light] leading-relaxed text-sm mb-10">{user.bio}</p>

                    {user.skills && user.skills.length > 0 && (
                        <>
                            <SectionTitle icon={<Layers className="w-5 h-5" />}>Expertise & Interests</SectionTitle>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {user.skills.map(s => <SkillChip key={s} skill={s} />)}
                                {user.interests && user.interests.map(i => <SkillChip key={i} skill={i} />)}
                            </div>
                        </>
                    )}
                    
                    {user.achievements && user.achievements.length > 0 && (
                      <>
                        <SectionTitle icon={<Award className="w-5 h-5" />}>Achievements</SectionTitle>
                        <div className="border-l-2 border-cyan-500/20 mb-10">
                            {user.achievements.map((item, index) => (
                                <TimelineItem key={index} title={item.place} company={item.event} date="" description={item.description} isEducation />
                            ))}
                        </div>
                      </>
                    )}

                    {user.workExperience.length > 0 && (
                        <>
                            <SectionTitle icon={<History className="w-5 h-5" />}>Career History</SectionTitle>
                            <div className="border-l-2 border-cyan-500/20 mb-10">
                                {user.workExperience.map((item, index) => (
                                    <TimelineItem key={index} title={item.title} company={item.company} date={`${item.startDate} - ${item.endDate}`} description={item.description} />
                                ))}
                            </div>
                        </>
                    )}
                    
                    {user.education.length > 0 && (
                        <>
                            <SectionTitle icon={<University className="w-5 h-5" />}>Education</SectionTitle>
                            <div className="border-l-2 border-cyan-500/20">
                                {user.education.map((item, index) => (
                                    <TimelineItem key={index} title={item.degree} company={item.school} date={`${item.startYear} - ${item.endYear}`} description={item.fieldOfStudy} isEducation />
                                ))}
                            </div>
                        </>
                    )}
                </main>

            </div>
            <style jsx global>{`
                .glass-panel {
                    background: var(--profile-glass-bg);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: var(--profile-glass-border);
                    box-shadow: var(--profile-glass-shadow);
                }
            `}</style>
        </div>
    )
};


export function ProfileClient({ user }: { user: UserProfile }) {
  const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);

  if (isOrg) {
    return <OrganizationProfileLayout user={user} />;
  }
  
  return <ModernProfileLayout user={user} />;
}
