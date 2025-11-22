'use client';

export function AnimatedCommunityGraph() {
  return (
    <div className="relative w-10 h-10 flex items-end justify-center gap-1">
      <div className="bar w-2 bg-white/50 rounded-full" style={{ animation: 'community-graph 1.5s ease-in-out infinite' }}></div>
      <div className="bar w-2 bg-white/70 rounded-full" style={{ animation: 'community-graph 1.5s ease-in-out infinite 0.2s' }}></div>
      <div className="bar w-2 bg-white rounded-full" style={{ animation: 'community-graph 1.5s ease-in-out infinite 0.4s' }}></div>
    </div>
  );
}
