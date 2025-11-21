
'use client';

import { useParams } from 'next/navigation';
import type { Education, WorkExperience, UserProfile, Achievement } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Briefcase, Building, Check, CheckCircle2, Factory, Globe, GraduationCap, Handshake, History, Hospital, Layers, Linkedin, Mail, MapPin, University, User, Users, FileText, Award, Star } from 'lucide-react';


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

const ModernProfileLayout = ({ user }: { user: UserProfile }) => {
    const isOrg = ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(user.type);
    
    const getOrgIcon = (type: UserProfile['type']) => {
        switch (type) {
            case 'Hospital': return <Hospital className="w-4 h-4" />;
            case 'College': return <University className="w-4 h-4" />;
            case 'Association': return <Handshake className="w-4 h-4" />;
            case 'Industry': return <Factory className="w-4 h-4" />;
            default: return <Briefcase className="w-4 h-4" />;
        }
    };
    
    return (
        <div style={{ background: 'var(--profile-bg-gradient)', fontFamily: "'Poppins', sans-serif" }} className="min-h-screen p-5 md:p-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* --- LEFT SIDE: Profile Card --- */}
                <aside className="lg:col-span-1 lg:sticky top-10">
                    <div className="glass-panel text-center p-8">
                        <div className="relative w-36 h-36 mx-auto mb-4">
                            <Image src={user.avatarUrl || `https://i.pravatar.cc/300?u=${user.id}`} alt={user.name} width={144} height={144} className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg" />
                             {user.verified && (
                                <div className={cn("absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md", user.id === 'marwankorath' ? 'text-green-500' : 'text-green-500')}>
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                            )}
                             {user.isFounder && (
                                <div className="absolute top-1 right-1 w-8 h-8 rounded-full flex items-center justify-center bg-amber-400 text-white shadow-md">
                                    <Star className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-[--profile-primary-dark]">{user.name}</h1>
                        <p className="text-sm font-medium text-[--profile-primary] leading-snug">{user.experience}</p>

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
                        
                        {user.links.linkedin && (
                             <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3.5 px-4 rounded-xl font-semibold bg-[--profile-primary-dark] text-white shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                                <div className="flex items-center justify-center gap-2">
                                  {isOrg ? <Globe className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
                                  <span>{isOrg ? 'Website' : 'LinkedIn'}</span>
                                </div>
                            </a>
                        )}
                    </div>
                </aside>

                {/* --- RIGHT SIDE: Main Content --- */}
                <main className="lg:col-span-2 glass-panel p-8">
                    <SectionTitle icon={<User className="w-5 h-5" />}>Professional Summary</SectionTitle>
                    <p className="text-[--profile-text-light] leading-relaxed text-sm mb-10">{user.bio}</p>

                    {user.skills.length > 0 && (
                        <>
                            <SectionTitle icon={<Layers className="w-5 h-5" />}>Expertise & Interests</SectionTitle>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {user.skills.map(s => <SkillChip key={s} skill={s} />)}
                                {user.interests.map(i => <SkillChip key={i} skill={i} />)}
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
  return <ModernProfileLayout user={user} />;
}
