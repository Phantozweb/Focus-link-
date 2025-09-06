import Link from 'next/link';
import { Eye } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 text-primary font-bold text-xl transition-opacity hover:opacity-80">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Eye className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline text-2xl">OptoConnect</span>
        </Link>
        <div className="flex items-center gap-2">
           {/* Navigation items can go here */}
        </div>
      </div>
    </header>
  );
}
