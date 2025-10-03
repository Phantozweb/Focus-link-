
import { webinars } from '@/lib/webinars';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function WebinarDetailPage({ params }: { params: { id: string } }) {
  const webinar = webinars.find(w => w.id === params.id);

  if (!webinar) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/webinars" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all webinars
        </Link>
        <Card className="overflow-hidden shadow-xl">
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={webinar.imageUrl}
              alt={webinar.title}
              fill
              className="object-cover"
              data-ai-hint="presentation conference"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white font-headline leading-tight">
                {webinar.title}
              </h1>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold font-headline mb-4">About this event</h2>
                <div className="prose prose-lg max-w-none text-foreground/80">
                    <p>{webinar.description}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-muted border">
                    {webinar.isPast ? (
                        <Button size="lg" className="w-full">
                            <PlayCircle className="mr-2 h-5 w-5" />
                            Watch Recording
                        </Button>
                    ) : (
                        <Button size="lg" className="w-full">
                            Register Now
                        </Button>
                    )}
                    <div className="space-y-4 mt-6 text-sm text-foreground">
                       <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>{webinar.date}</span>
                      </div>
                       <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>{webinar.time} ({webinar.duration})</span>
                      </div>
                    </div>
                </div>

                <div className="p-6 rounded-lg bg-muted border">
                    <h3 className="text-lg font-bold font-headline mb-4">Speaker</h3>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} data-ai-hint="portrait person" />
                            <AvatarFallback>{webinar.speaker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{webinar.speaker.name}</p>
                            <p className="text-sm text-muted-foreground">{webinar.speaker.title}</p>
                        </div>
                    </div>
                </div>

                 <div className="p-6 rounded-lg bg-muted border">
                  <h3 className="text-lg font-bold font-headline mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {webinar.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-base px-3 py-1">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
