
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
    <div className={cn("relative w-full h-full bg-gradient-to-br from-cyan-800 to-blue-900 text-white overflow-hidden rounded-lg p-4 flex flex-col justify-between", className)}>
      {/* Background shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl opacity-80"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl opacity-80"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
          <div>
            <h2 className={cn("font-bold leading-tight", isCard ? "text-lg" : "text-2xl lg:text-3xl max-w-lg")}>
                {webinar.title}
            </h2>
          </div>

          <div className={cn("flex items-center gap-3 text-sm pt-3", isCard ? 'mt-3' : '')}>
            <Avatar className={cn("border-2 border-white/20", isCard ? "w-8 h-8" : "w-12 h-12")}>
                <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} />
                <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold">{webinar.speaker.name}</p>
                <p className="text-white/70 text-xs">{webinar.speaker.title}</p>
            </div>
            </div>
      </div>
    </div>
  );
}
