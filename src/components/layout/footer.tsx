
import Link from 'next/link';

export function Footer() {
  return (
     <footer className="bg-slate-800 text-white py-12 px-10 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-bold text-lg mb-4">FocusLink</h3>
                <p className="text-gray-400 text-sm">Connecting the world of vision care.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-3">For Professionals</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/join">Claim Your Profile</Link></li>
                    <li><Link className="hover:text-white" href="/join">List Your Clinic</Link></li>
                    <li><Link className="hover:text-white" href="#">Advertise</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a className="hover:text-white" href="#">Articles</a></li>
                    <li><a className="hover:text-white" href="#">Journals</a></li>
                    <li><a className="hover:text-white" href="#">Events</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link className="hover:text-white" href="/about">About Us</Link></li>
                    <li><a className="hover:text-white" href="#">Contact</a></li>
                    <li><a className="hover:text-white" href="#">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>© 2024 FocusLink. All rights reserved.</p>
        </div>
    </footer>
  );
}
