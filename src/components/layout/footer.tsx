import Link from 'next/link';

export function Footer() {
  return (
     <footer className="bg-brand-dark text-white pt-16 pb-28 px-6 mt-12 rounded-t-[40px]">
        <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                <div>
                    <h3 className="font-bold text-lg mb-4">Focus Links</h3>
                    <p className="text-gray-400 text-sm">Connecting the Global Eye Care Community.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Explore</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link className="hover:text-white" href="/directory">Directory</Link></li>
                        <li><Link className="hover:text-white" href="/academy">Academy</Link></li>
                        <li><Link className="hover:text-white" href="/forum">Case Forum</Link></li>
                        <li><Link className="hover:text-white" href="/jobs">Job Board</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-3">Get Involved</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link className="hover:text-white" href="/membership">Become a Member</Link></li>
                        <li><Link className="hover:text-white" href="/profile/create">Create Your Profile</Link></li>
                        <li><Link className="hover:text-white" href="/team-application">Join Our Team</Link></li>
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
                <p>© 2025 Focus Links. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
}
