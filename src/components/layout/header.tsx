import Link from 'next/link';
import { Eye, Menu, Info, UserPlus } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 text-primary font-bold text-xl transition-opacity hover:opacity-80">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline text-2xl">OptoConnect</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            About
          </Link>
          <Button asChild>
            <Link href="/join">Become a Member</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 pt-8">
                <SheetClose asChild>
                    <Link href="/about" className="flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary">
                      <Info /> About
                    </Link>
                </SheetClose>
                <SheetClose asChild>
                    <Link href="/join" className="flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary">
                      <UserPlus /> Join Directory
                    </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
