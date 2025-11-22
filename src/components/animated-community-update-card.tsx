
'use client';

import { BookOpen, CalendarCheck, Headphones, Video } from 'lucide-react';
import Link from 'next/link';

export function AnimatedCommunityUpdateCard() {
  return (
    <div className="ad-card card-academy">
      <div className="ad-content">
        <span className="highlight-badge">New Update</span>
        <h2 className="ad-title">Introducing a Better Academy Section</h2>
        <p className="ad-desc">Access Premium Ebooks, Video Courses, Audiobooks, Webinars, and Live Events.</p>
        <p className="font-bold mb-5 text-lg">All for <span className="text-amber-300 underline">FREE</span> for our members!</p>
        <Link href="/academy" className="ad-btn">
          Start Learning
        </Link>
      </div>
      
      <div className="ad-visual">
        <div className="icon-grid">
          <div className="glass-icon"><BookOpen /></div>
          <div className="glass-icon"><Video /></div>
          <div className="glass-icon"><Headphones /></div>
          <div className="glass-icon"><CalendarCheck /></div>
        </div>
      </div>
    </div>
  );
}
