
'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { UserPlus, ChevronDown, Menu, Sparkles, MessageSquare, Briefcase, Bell } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

const aboutLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq'},
    { name: 'Contact', href: '/contact' },
]

export function Header() {

  const handleNotificationRequest = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("This is a test notification from Focus Links!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("Thanks for subscribing! Here is a test notification.");
        } else {
          alert("You have denied notification permissions.");
        }
      });
    } else {
        alert("You have denied notification permissions. Please enable them in your browser settings.");
    }
  };


  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 bg-white px-10 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 text-slate-800">
                <span className="material-symbols-outlined text-3xl text-cyan-600">
                remove_red_eye
                </span>
                <h2 className="text-slate-800 text-lg font-bold leading-tight tracking-[-0.015em]">Focus Links</h2>
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

                <Button variant="ghost" asChild><Link href="/academy">Academy</Link></Button>
                <Button variant="ghost" asChild><Link href="/forum">Forum</Link></Button>
                <Button variant="ghost" asChild><Link href="/jobs">Jobs</Link></Button>
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
        <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2">
                <Button onClick={handleNotificationRequest} variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Enable Notifications</span>
                </Button>
                <Button asChild>
                  <Link href="/membership">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Membership
                  </Link>
                </Button>
            </div>
             <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                     <Menu />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-2 pt-8 text-lg font-medium">
                    <SheetClose asChild><Link href="/" className="px-3 py-2 rounded-md hover:bg-muted">Home</Link></SheetClose>
                    
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="directory" className="border-b-0">
                            <AccordionTrigger className="px-3 py-2 rounded-md hover:bg-muted focus:no-underline">Directory</AccordionTrigger>
                            <AccordionContent className="pl-6">
                                {directoryLinks.map(link => (
                                    <SheetClose asChild key={link.name}>
                                        <Link href={link.href} className="block px-3 py-2 rounded-md hover:bg-muted">{link.name}</Link>
                                    </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="professionals" className="border-b-0">
                            <AccordionTrigger className="px-3 py-2 rounded-md hover:bg-muted focus:no-underline">Professionals</AccordionTrigger>
                            <AccordionContent className="pl-6">
                                {professionalLinks.map(link => (
                                    <SheetClose asChild key={link.name}>
                                        <Link href={link.href} className="block px-3 py-2 rounded-md hover:bg-muted">{link.name}</Link>
                                    </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <SheetClose asChild><Link href="/academy" className="px-3 py-2 rounded-md hover:bg-muted">Academy</Link></SheetClose>
                    <SheetClose asChild><Link href="/forum" className="px-3 py-2 rounded-md hover:bg-muted">Forum</Link></SheetClose>
                    <SheetClose asChild><Link href="/jobs" className="px-3 py-2 rounded-md hover:bg-muted">Jobs</Link></SheetClose>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="about" className="border-b-0">
                            <AccordionTrigger className="px-3 py-2 rounded-md hover:bg-muted focus:no-underline">About</AccordionTrigger>
                            <AccordionContent className="pl-6">
                                {aboutLinks.map(link => (
                                    <SheetClose asChild key={link.name}>
                                        <Link href={link.href} className="block px-3 py-2 rounded-md hover:bg-muted">{link.name}</Link>
                                    </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                     <Button onClick={handleNotificationRequest} variant="outline" className="w-full justify-start mt-4">
                      <Bell className="mr-2 h-4 w-4" />
                      Enable Notifications
                    </Button>
                    <SheetClose asChild>
                      <Button asChild className="mt-4">
                        <Link href="/membership">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Membership
                        </Link>
                      </Button>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
    </header>
  );
}
