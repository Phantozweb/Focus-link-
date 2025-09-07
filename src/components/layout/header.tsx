
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 bg-white px-10 py-3 fixed w-full z-40 top-0">
        <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 text-slate-800">
                <span className="material-symbols-outlined text-3xl text-cyan-600">
                remove_red_eye
                </span>
                <h2 className="text-slate-800 text-lg font-bold leading-tight tracking-[-0.015em]">OptoConnect</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
                <Link className="text-slate-700 text-sm font-medium leading-normal hover:text-cyan-600 transition-colors" href="/">Home</Link>
                <Link className="text-slate-700 text-sm font-medium leading-normal hover:text-cyan-600 transition-colors" href="/about">About Us</Link>
            </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4">
            <div className="flex gap-2">
                <Button variant="ghost" className="hidden md:flex">Login</Button>
                <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                  <Link href="/join">Join</Link>
                </Button>
            </div>
             <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                     <span className="material-symbols-outlined">menu</span>
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-6 pt-8">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary">
                          <span className="material-symbols-outlined">home</span> Home
                        </Link>
                    </SheetClose>
                     <SheetClose asChild>
                        <Link href="/about" className="flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary">
                          <span className="material-symbols-outlined">info</span> About
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/join" className="flex items-center gap-3 text-lg font-medium text-foreground transition-colors hover:text-primary">
                          <span className="material-symbols-outlined">person_add</span> Join Directory
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
