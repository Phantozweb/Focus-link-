import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 text-primary font-bold text-xl transition-opacity hover:opacity-80">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline hidden sm:inline">OptometryConnect</span>
        </Link>
        <div className="flex items-center gap-2">
            {/* Future auth buttons can go here */}
            {/* <Button variant="ghost">Log In</Button>
            <Button>Sign Up</Button> */}
        </div>
      </div>
    </header>
  );
}
