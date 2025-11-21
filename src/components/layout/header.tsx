
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { UserPlus, ChevronDown, Menu, Sparkles, MessageSquare, Briefcase, User, BookOpen, Users, Tv, Calendar, LogIn, Home, HelpCircle, Info, Mail, Search, GraduationCap, Building, Hospital, Factory, Handshake, Stethoscope, Bell, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { webinars } from '@/lib/academy';
import { Separator } from '@/components/ui/separator';

const directoryLinks = [
    { name: 'All Profiles', href: '/directory/all', icon: <Users className="h-5 w-5"/> },
    { name: 'Students', href: '/directory/students', icon: <GraduationCap className="h-5 w-5"/> },
    { name: 'Institutions', href: '/directory/institutions', icon: <Building className="h-5 w-5"/> },
    { name: 'Clinics & Opticals', href: '/directory/clinics', icon: <Hospital className="h-5 w-5"/> },
    { name: 'Industry Partners', href: '/directory/industry', icon: <Factory className="h-5 w-5"/> },
];

const professionalLinks = [
    { name: 'All Professionals', href: '/directory/professionals' },
    { name: 'Optometrists', href: '/directory/professionals/optometrists' },
    { name: 'Ophthalmologists', href: '/directory/professionals/ophthalmologists' },
    { name: 'Opticians', href: '/directory/professionals/opticians' },
    { name: 'Academics', href: '/directory/professionals/academics' },
];

const communityLinks = [
    { name: 'Academy', href: '/academy', icon: <BookOpen className="h-5 w-5" />, hasLiveIndicator: true },
    { name: 'Case Forum', href: '/forum', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Job Board', href: '/jobs', icon: <Briefcase className="h-5 w-5" /> },
]

const aboutLinks = [
    { name: 'About Us', href: '/about', icon: <Info className="h-5 w-5" /> },
    { name: 'Help Center', href: '/help-center', icon: <HelpCircle className="h-5 w-5" /> },
    { name: 'Contact', href: '/contact', icon: <Mail className="h-5 w-5" /> },
]

const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <SheetClose asChild>
        <Link href={href} className="flex items-center gap-3 rounded-md px-3 py-3 text-lg font-medium text-text-main hover:bg-slate-100">
            {children}
        </Link>
    </SheetClose>
);

export function Header() {
  const pathname = usePathname();
  const [hasUnseenLiveEvent, setHasUnseenLiveEvent] = useState(false);

  useEffect(() => {
    const liveWebinars = webinars.filter(w => {
      const startTime = new Date(w.dateTime).getTime();
      const durationParts = w.duration.split(' ');
      const durationValue = parseInt(durationParts[0], 10);
      const endTime = startTime + (durationValue * 60 * 1000);
      return Date.now() >= startTime && Date.now() < endTime;
    });

    if (liveWebinars.length > 0) {
      const hasSeen = sessionStorage.getItem('seenLiveEvents');
      if (!hasSeen) {
        setHasUnseenLiveEvent(true);
      }
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/academy') && hasUnseenLiveEvent) {
      sessionStorage.setItem('seenLiveEvents', 'true');
      setHasUnseenLiveEvent(false);
    }
  }, [pathname, hasUnseenLiveEvent]);

  return (
    <header className="navbar">
        <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-brand-dark" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs p-0 flex flex-col">
                <div className="p-4 border-b">
                     <Link href="/" className="brand">
                        <Eye />
                        <span>Focus Links</span>
                    </Link>
                  </div>
                <nav className="flex-grow overflow-y-auto p-4 space-y-4">
                  <div className="space-y-1">
                        <h3 className="px-3 text-sm font-semibold uppercase text-text-muted tracking-wider">Account</h3>
                        <MobileNavLink href="/profile"><User className="h-5 w-5" /><span>My Profile</span></MobileNavLink>
                         <MobileNavLink href="/login"><LogIn className="h-5 w-5" /><span>Login</span></MobileNavLink>
                         <MobileNavLink href="/membership"><UserPlus className="h-5 w-5" /><span>Membership</span></MobileNavLink>
                      </div>
                      <Separator />
                  <div className="space-y-1">
                        <h3 className="px-3 text-sm font-semibold uppercase text-text-muted tracking-wider">Directory</h3>
                         {directoryLinks.map(link => (
                            <MobileNavLink key={link.name} href={link.href}>{link.icon}<span>{link.name}</span></MobileNavLink>
                        ))}
                        <Collapsible className="px-3">
                          <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-lg font-medium text-text-main hover:bg-slate-100 rounded-md">
                            <div className="flex items-center gap-3">
                              <Stethoscope className="h-5 w-5" />
                              <span>Professionals</span>
                            </div>
                            <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-8 space-y-1 mt-1">
                             {professionalLinks.map(link => (
                              <SheetClose asChild key={link.name}>
                                  <Link href={link.href} className="block rounded-md px-3 py-2 text-lg font-medium text-slate-600 hover:bg-slate-100">{link.name}</Link>
                              </SheetClose>
                             ))}
                          </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                        <h3 className="px-3 text-sm font-semibold uppercase text-text-muted tracking-wider">Community</h3>
                        {communityLinks.map(link => {
                            const showPing = link.hasLiveIndicator && hasUnseenLiveEvent;
                            return (
                            <MobileNavLink key={link.name} href={link.href}>
                                <div className="relative flex items-center gap-3">
                                  {link.icon}
                                  <span>{link.name}</span>
                                   {showPing && (
                                      <span className="relative flex h-2.5 w-2.5">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                      </span>
                                  )}
                                </div>
                            </MobileNavLink>
                        )})}
                    </div>
                    <Separator />
                     <div className="space-y-1">
                        <h3 className="px-3 text-sm font-semibold uppercase text-text-muted tracking-wider">About</h3>
                        {aboutLinks.map(link => (
                            <MobileNavLink key={link.name} href={link.href}>{link.icon}<span>{link.name}</span></MobileNavLink>
                        ))}
                    </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="brand">
                <Eye/>
                <span className="hidden sm:block">Focus Links</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
                <Button variant="ghost" asChild><Link href="/">Home</Link></Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Directory <ChevronDown className="ml-1 h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {directoryLinks.map(link => (
                        <DropdownMenuItem key={link.name} asChild><Link href={link.href}>{link.icon} <span className="ml-2">{link.name}</span></Link></DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                     <DropdownMenuSub>
                        <DropdownMenuSubTrigger><Stethoscope className="mr-2 h-5 w-5" /> Professionals</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {professionalLinks.map(link => (
                                    <DropdownMenuItem key={link.name} asChild><Link href={link.href}>{link.name}</Link></DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">Community <ChevronDown className="ml-1 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {communityLinks.map(link => {
                            const showPing = link.hasLiveIndicator && hasUnseenLiveEvent;
                            return (
                            <DropdownMenuItem key={link.name} asChild>
                                <Link href={link.href}>
                                  <div className="flex items-center gap-2">
                                    {link.icon}
                                    <span>{link.name}</span>
                                     {showPing && (
                                        <span className="relative flex h-2 w-2 ml-1">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    )}
                                  </div>
                                </Link>
                            </DropdownMenuItem>
                        )})}
                    </DropdownMenuContent>
                </DropdownMenu>

                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">About <ChevronDown className="ml-1 h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {aboutLinks.map(link => (
                        <DropdownMenuItem key={link.name} asChild><Link href={link.href}>{link.icon} <span className="ml-2">{link.name}</span></Link></DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
        <div className="hidden md:flex items-center gap-2">
             <Button className="rounded-full-btn" asChild>
                <Link href="/membership">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Become a Member
                </Link>
             </Button>
             <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                    <User className="h-5 w-5" />
                    <span className="sr-only">My Profile</span>
                </Link>
            </Button>
             <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
        </div>
    </header>
  );
}
