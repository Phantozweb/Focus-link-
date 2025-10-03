
import { webinars } from '@/lib/webinars';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { Separator } from '@/components/ui/separator';

type WebinarPageProps = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: WebinarPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const webinar = webinars.find(w => w.id === params.id);

  if (!webinar) {
    return {
      title: 'Webinar Not Found',
      description: 'The webinar you are looking for does not exist.',
    }
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${webinar.title} | FocusLinks`,
    description: webinar.description,
    openGraph: {
      title: webinar.title,
      description: webinar.description,
      images: [
        {
          url: webinar.imageUrl,
          width: 600,
          height: 400,
          alt: webinar.title,
        },
      ],
    },
  }
}


export default function WebinarDetailPage({ params }: WebinarPageProps) {
  const webinar = webinars.find(w => w.id === params.id);

  if (!webinar) {
    notFound();
  }

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex flex-wrap gap-2 mb-2">
                {webinar.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-white/80 backdrop-blur-sm">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-headline leading-tight">
                {webinar.title}
              </h1>
            </div>
          </div>
          <CardContent className="p-8 space-y-10">
             <div className="p-6 rounded-lg bg-white border shadow-sm">
                  {webinar.isPast ? (
                      <Button size="lg" className="w-full text-lg py-6">
                          <PlayCircle className="mr-2 h-6 w-6" />
                          Watch Recording
                      </Button>
                  ) : (
                      <Button size="lg" className="w-full text-lg py-6">
                          Register Now
                      </Button>
                  )}
                  <div className="space-y-4 mt-6 text-slate-700">
                     <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{webinar.date}</span>
                    </div>
                     <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{webinar.time} ({webinar.duration})</span>
                    </div>
                  </div>
              </div>
              
              <section>
                  <h2 className="text-2xl font-bold font-headline mb-4 text-slate-800">About this event</h2>
                  <div className="prose prose-lg max-w-none text-slate-600">
                      <p>{webinar.description}</p>
                  </div>
              </section>
              
              <Separator />

              <section>
                  <h3 className="text-2xl font-bold font-headline mb-6 text-slate-800">About the Speaker</h3>
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border rounded-lg bg-slate-50">
                      <Avatar className="h-28 w-28">
                          <AvatarImage src={webinar.speaker.avatarUrl} alt={webinar.speaker.name} data-ai-hint="portrait person" />
                          <AvatarFallback className="text-4xl">{webinar.speaker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-bold text-2xl text-slate-800">{webinar.speaker.name}</p>
                          <p className="text-lg text-muted-foreground">{webinar.speaker.title}</p>
                      </div>
                  </div>
              </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

