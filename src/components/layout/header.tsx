
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { UserPlus, ChevronDown, Menu, Sparkles, MessageSquare, Briefcase, Bell, BookOpen, Users, Tv } from 'lucide-react';
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
} from "@/components/ui/accordion";
import { NotificationSettings } from '@/components/notification-settings';
import { useToast } from '@/hooks/use-toast';

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
    { name: 'Academy', href: '/academy', icon: <BookOpen /> },
    { name: 'Forum', href: '/forum', icon: <MessageSquare /> },
    { name: 'Jobs', href: '/jobs', icon: <Briefcase /> },
]

const aboutLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Help Center', href: '/help-center'},
    { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePreferencesSave = (preferences: Record<string, boolean>) => {
    // This is where you would save the user's preferences to your backend.
    console.log("Saving preferences:", preferences);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-40">
        <NotificationSettings 
          isOpen={isNotificationDialogOpen}
          onOpenChange={setIsNotificationDialogOpen}
          onSave={handlePreferencesSave}
        />
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
                <Button onClick={() => setIsNotificationDialogOpen(true)} variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notification Settings</span>
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
            {/* The hamburger menu is intentionally removed for mobile as per the new design */}
        </div>
    </header>
  );
}
