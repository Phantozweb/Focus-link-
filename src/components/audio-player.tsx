
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Rewind, FastForward, ListMusic, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';
import { logAudioPlay } from '@/lib/activity-logger';

type Episode = {
  id: string;
  title: string;
  episodeNumber: number;
  duration: string;
  url: string;
  audioUrl?: string;
};

type AudioSeries = {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  episodes: Episode[];
};

export function AudioPlayer({ series }: { series: AudioSeries }) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentEpisode = series.episodes[currentEpisodeIndex];
  
  const audioUrl = currentEpisode?.audioUrl;

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      if (audioRef.current.src !== audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        // Delay playing until the media can be played
        audioRef.current.oncanplay = () => {
          if (isPlaying) {
             audioRef.current?.play().catch(e => console.error("Audio play failed on load:", e));
          }
        };
      }
    }
  }, [currentEpisodeIndex, audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            logAudioPlay(series.title, currentEpisode.title);
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, series.title, currentEpisode.title]);


  const selectEpisode = (index: number) => {
    if (index !== currentEpisodeIndex) {
      setProgress(0);
      setDuration(0);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    } else {
       togglePlayPause();
    }
  };

  const togglePlayPause = () => {
    if (!audioUrl) return;
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (value: number[]) => {
      if (audioRef.current) {
          audioRef.current.currentTime = value[0];
          setProgress(value[0]);
      }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playNext = () => {
      if (currentEpisodeIndex < series.episodes.length - 1) {
          selectEpisode(currentEpisodeIndex + 1);
      } else {
          setIsPlaying(false);
          setCurrentEpisodeIndex(0);
          setProgress(0);
      }
  };

  const playPrev = () => {
      if (currentEpisodeIndex > 0) {
          selectEpisode(currentEpisodeIndex - 1);
      }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
        src={audioUrl}
      />
      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Left/Top Side: Player */}
        <div className="w-full md:w-2/3 bg-slate-800 text-white flex flex-col justify-between p-4 sm:p-8 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
           <div className="text-center">
                <DialogHeader className="text-center mb-4 sm:mb-6">
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-white leading-tight">{currentEpisode?.title || series.title}</DialogTitle>
                    <DialogDescription className="text-slate-300">{series.title}</DialogDescription>
                </DialogHeader>
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-lg overflow-hidden shadow-2xl mb-4 sm:mb-6">
                    <Image src={series.thumbnailUrl} alt={series.title} layout="fill" objectFit="cover" />
                </div>
           </div>
           
           <div className="space-y-2 sm:space-y-4">
                <Slider
                    value={[progress]}
                    max={duration || 1}
                    onValueChange={handleSeek}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-400">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-4">
                     <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={playPrev} disabled={currentEpisodeIndex === 0}>
                        <Rewind className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full text-white hover:bg-white/30" onClick={togglePlayPause}>
                        {isPlaying ? <Pause className="h-8 w-8 sm:h-10 sm:w-10" /> : <Play className="h-8 w-8 sm:h-10 sm:w-10 ml-1" />}
                    </Button>
                     <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={playNext} disabled={currentEpisodeIndex === series.episodes.length - 1}>
                        <FastForward className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </div>
                
                <div className="flex justify-center items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5"/> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5"/>}
                    </Button>
                </div>
           </div>
        </div>

        {/* Right/Bottom Side: Playlist */}
        <div className="w-full md:w-1/3 bg-white flex flex-col flex-grow md:h-full">
          <div className="p-4 sm:p-6 border-b">
            <h3 className="text-lg font-bold flex items-center gap-2"><ListMusic className="h-5 w-5"/> Up Next</h3>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-2 sm:p-4 space-y-1">
                {series.episodes.map((episode, index) => (
                    <div 
                        key={episode.id} 
                        onClick={() => selectEpisode(index)}
                        className={cn(
                            "w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors cursor-pointer",
                            index === currentEpisodeIndex ? "bg-purple-100 text-purple-800" : "hover:bg-slate-50"
                        )}
                    >
                        <div className="flex-shrink-0 text-sm font-mono text-slate-500 pt-0.5">{String(episode.episodeNumber).padStart(2, '0')}</div>
                        <div className="flex-grow">
                            <p className="font-semibold text-sm leading-tight">{episode.title}</p>
                            <p className="text-xs text-slate-500">{episode.duration}</p>
                        </div>
                         {index === currentEpisodeIndex && isPlaying && (
                            <div className="flex items-center gap-0.5 h-full pt-1">
                                <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                            </div>
                        )}
                        <Link href={`https://focuscast.netlify.app${episode.url}`} target="_blank" rel="noopener noreferrer" className="ml-auto flex-shrink-0 text-slate-400 hover:text-primary" onClick={(e) => e.stopPropagation()}>
                           <ExternalLink className="h-4 w-4" />
                           <span className="sr-only">View on Focus Cast</span>
                        </Link>
                    </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
