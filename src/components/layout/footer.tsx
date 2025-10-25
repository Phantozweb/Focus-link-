
import Link from 'next/link';

export function Footer() {
  return (
     <footer className="bg-slate-800 text-white py-12 px-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-bold text-lg mb-4">Focus Links</h3>
                <p className="text-gray-400 text-sm">Connecting the Global Eye Care Community.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Explore</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/directory">Directory</Link></li>
                    <li><Link className="hover:text-white" href="/events">Events</Link></li>
                    <li><Link className="hover:text-white" href="/forum">Case Forum</Link></li>
                    <li><Link className="hover:text-white" href="/jobs">Job Board</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold mb-3">Get Involved</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/membership">Become a Member</Link></li>
                    <li><Link className="hover:text-white" href="/profile/create">Create Your Profile</Link></li>
                    <li><Link className="hover:text-white" href="/about">About Us</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/help-center">Help Center</Link></li>
                    <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
                    <li><Link className="hover:text-white" href="/terms">Terms & Guidelines</Link></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>© 2024 Focus Links. All rights reserved.</p>
        </div>
    </footer>
  );
}
