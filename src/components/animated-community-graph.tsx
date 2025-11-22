'use client';

import { cn } from "@/lib/utils";

export function AnimatedCommunityGraph() {
  return (
    <div className="relative w-24 h-24 flex items-end justify-center gap-2">
      <div className="w-4 bg-green-500/50 rounded-full" style={{ animation: 'community-graph 1.5s ease-in-out infinite 0.4s' }}></div>
      <div className="w-4 bg-green-500/70 rounded-full" style={{ animation: 'community-graph 1.5s ease-in-out infinite 0.2s' }}></div>
      <div className="w-4 bg-green-500 rounded-full" style={{ animation: 'community-graph 1.5s ease-in-out infinite' }}></div>
    </div>
  );
}
