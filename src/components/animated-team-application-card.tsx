
'use client';

import { ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

export function AnimatedTeamApplicationCard() {
  return (
    <div className="ad-card card-volunteer">
      <div className="ad-content">
        <div className="text-primary font-bold mb-2 uppercase text-sm tracking-widest">We Are Hiring</div>
        <h2 className="ad-title">Join our Official Volunteer Global Team!</h2>
        <p className="ad-desc">Collaborate with vision professionals worldwide. Lead projects, curate content, and shape the future of our community.</p>
        <Link href="/team-application" className="ad-btn">
          Apply Now <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="ad-visual">
        <div className="network-node">
          <div className="node-orbit"></div>
          <div className="node-dot"></div>
          <div className="node-center"><Globe /></div>
        </div>
      </div>
    </div>
  );
}
