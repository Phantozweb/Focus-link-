
import type { Webinar } from '@/lib/academy';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface WebinarBannerProps {
  webinar: Webinar;
}

export function WebinarBanner({ webinar }: WebinarBannerProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-cyan-800 to-blue-900 text-white overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
      
      <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
                 {webinar.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 text-white backdrop-blur-sm border-white/20">
                      {tag}
                    </Badge>
                ))}
            </div>
            
        </div>

        {/* Middle Section */}
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <Avatar className="w-24 h-24 border-4 border-white/20 shadow-lg mb-4">
            <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} />
            <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl lg:text-3xl font-bold leading-tight max-w-lg">
            {webinar.title}
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-bold">{webinar.speaker.name}</p>
            <p className="text-white/70">{webinar.speaker.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
