
import type { Webinar } from '@/lib/academy';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface WebinarBannerProps {
  webinar: Webinar;
  className?: string;
  variant?: 'default' | 'card';
}

export function WebinarBanner({ webinar, className, variant = 'default' }: WebinarBannerProps) {
  const isCard = variant === 'card';

  return (
    <div className={cn("relative w-full h-full bg-gradient-to-br from-cyan-800 to-blue-900 text-white overflow-hidden rounded-lg", className)}>
      {/* Background shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl opacity-80"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl opacity-80"></div>
      
      <div className={cn("relative z-10 w-full h-full flex flex-col justify-between", isCard ? 'p-4' : 'p-6')}>
        {/* Top Section */}
        <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
                 {webinar.tags.slice(0, isCard ? 1 : 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className={cn("backdrop-blur-sm", isCard ? "bg-white/20 text-white border-white/20 text-xs" : "bg-white/10 text-white border-white/20")}>
                      {tag}
                    </Badge>
                ))}
            </div>
        </div>

        {/* Middle Section */}
        <div className={cn("flex-grow flex flex-col justify-center", isCard ? 'items-start text-left' : 'items-center text-center')}>
          {!isCard && (
            <Avatar className="w-24 h-24 border-4 border-white/20 shadow-lg mb-4">
              <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} />
              <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <h2 className={cn("font-bold leading-tight", isCard ? "text-xl mt-4" : "text-2xl lg:text-3xl max-w-lg")}>
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
