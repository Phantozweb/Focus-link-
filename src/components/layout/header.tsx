
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { UserPlus, ChevronDown, Menu, Sparkles, MessageSquare, Briefcase, User, BookOpen, Users, Tv, Calendar, LogIn, Home, HelpCircle, Info, Mail, Search } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const directoryLinks = [
    { name: 'All Profiles', href: '/directory/all' },
    { name: 'Students', href: '/directory/students' },
    { name: 'Associations', href: '/directory/associations' },
    { name: 'Colleges & Schools', href: '/directory/colleges' },
    { name: 'Clinics & Opticals', href: '/directory/clinics' },
    { name: 'Industry Partners', href: '/directory/industry' },
];

const professionalLinks = [
    { name: 'All Professionals', href: '/directory/professionals' },
    { name: 'Optometrists', href: '/directory/professionals/optometrists' },
    { name: 'Ophthalmologists', href: '/directory/professionals/ophthalmologists' },
    { name: 'Opticians', href: '/directory/professionals/opticians' },
    { name: 'Academics', href: '/directory/professionals/academics' },
];

const communityLinks = [
    { name: 'Events', href: '/events', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Case Forum', href: '/forum', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Job Board', href: '/jobs', icon: <Briefcase className="h-5 w-5" /> },
]

const aboutLinks = [
    { name: 'About Us', href: '/about', icon: <Users className="h-5 w-5" /> },
    { name: 'Help Center', href: '/help-center', icon: <HelpCircle className="h-5 w-5" /> },
    { name: 'Contact', href: '/contact', icon: <Mail className="h-5 w-5" /> },
]

const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <SheetClose asChild>
        <Link href={href} className="flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100">
            {children}
        </Link>
    </SheetClose>
);

export function Header() {
  const { toast } = useToast();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-8">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs p-0">
                  <nav className="flex flex-col h-full">
                    <div className="p-4 border-b">
                       <Link href="/" className="flex items-center gap-3 text-slate-800">
                          <span className="material-symbols-outlined text-3xl text-cyan-600">
                          remove_red_eye
                          </span>
                          <h2 className="text-slate-800 text-lg font-bold leading-tight tracking-[-0.015em]">Focus Links</h2>
                      </Link>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      <div className="space-y-1">
                          <h3 className="px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">Community</h3>
                          {communityLinks.map(link => (
                              <MobileNavLink key={link.name} href={link.href}>
                                  {link.icon}
                                  <span>{link.name}</span>
                              </MobileNavLink>
                          ))}
                      </div>
                      <Separator />
                       <div className="space-y-1">
                          <h3 className="px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">About</h3>
                          {aboutLinks.map(link => (
                              <MobileNavLink key={link.name} href={link.href}>
                                  {link.icon}
                                  <span>{link.name}</span>
                              </MobileNavLink>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 border-t mt-auto space-y-2">
                        <SheetClose asChild>
                          <Button asChild className="w-full">
                            <Link href="/membership"><UserPlus className="mr-2 h-4 w-4" />Membership</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                           <Button variant="outline" asChild className="w-full">
                            <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
                          </Button>
                        </SheetClose>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/" className="flex items-center gap-3 text-slate-800">
                <span className="material-symbols-outlined text-3xl text-cyan-600">
                remove_red_eye
                </span>
                <h2 className="text-slate-800 text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">Focus Links</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild><Link href="/">Home</Link></Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Directory <ChevronDown className="ml-1 h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {directoryLinks.map(link => (
                        <DropdownMenuItem key={link.name} asChild><Link href={link.href}>{link.name}</Link></DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                     <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Professionals
                        </DropdownMenuSubTrigger>
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
                        {communityLinks.map(link => (
                            <DropdownMenuItem key={link.name} asChild><Link href={link.href}>{link.name}</Link></DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">About <ChevronDown className="ml-1 h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {aboutLinks.map(link => (
                        <DropdownMenuItem key={link.name} asChild><Link href={link.href}>{link.name}</Link></DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/membership">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Membership
                  </Link>
                </Button>
            </div>
        </div>
         <div className="md:hidden">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/directory">
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
        </div>
    </header>
  );
}
