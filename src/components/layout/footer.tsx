
import Link from 'next/link';

export function Footer() {
  return (
     <footer className="bg-slate-800 text-white py-12 px-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-bold text-lg mb-4">Focus Links</h3>
                <p className="text-gray-400 text-sm">Connecting the world of vision care.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-3">For Professionals</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/join">Create a Profile</Link></li>
                    <li><Link className="hover:text-white" href="/join">List Your Clinic</Link></li>
                    <li><Link className="hover:text-white" href="/contact">Advertise</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Community</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a className="hover:text-white" href="#">Articles</a></li>
                    <li><Link className="hover:text-white" href="/academy">Academy</Link></li>
                    <li><Link className="hover:text-white" href="/directory">Directory</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/about">About Us</Link></li>
                    <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
                    <li><Link className="hover:text-white" href="/terms">Terms of Service</Link></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>© 2024 Focus Links. All rights reserved.</p>
        </div>
    </footer>
  );
}
