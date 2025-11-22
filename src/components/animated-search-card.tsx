
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export function AnimatedSearchCard() {
  return (
     <div className="ad-card card-seo">
      <div className="ad-content">
        <h2 className="ad-title">We help you to rank on <span>Search.</span></h2>
        <p className="ad-desc">An optimized profile helps you get discovered by patients and employers. Our SEO tools push your profile to the top.</p>
        <Link href="/membership" className="ad-btn">
          Optimize Profile
        </Link>
      </div>
      
      <div className="ad-visual">
        <div className="browser-mockup">
          <div className="search-bar-mock">
            <Search className="h-3 w-3" /> Best Optometrist near me...
          </div>
          <div className="result-card">
            <div className="res-avatar"></div>
            <div className="res-lines"><div className="res-line"></div><div className="res-line w-1/2"></div></div>
          </div>
          <div className="result-card hero-result">
            <div className="res-avatar"></div>
            <div className="res-lines">
              <div className="res-line bg-blue-600 w-4/5"></div>
              <div className="res-line w-2/5"></div>
            </div>
            <Sparkles className="h-4 w-4 text-blue-600 ml-auto" />
          </div>
          <div className="result-card">
            <div className="res-avatar"></div>
            <div className="res-lines"><div className="res-line"></div><div className="res-line w-3/5"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
