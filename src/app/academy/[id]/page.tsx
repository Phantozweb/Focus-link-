
import { webinars } from '@/lib/academy';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Tv, User, Info, Video, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { WebinarActions } from '@/components/webinar-actions';

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

  return {
    title: `${webinar.title} | Focus Links Academy`,
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
  
  const webinarDate = new Date(webinar.dateTime);
  const isPast = webinarDate.getTime() < Date.now();

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/academy" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Academy
        </Link>
        <Card className="overflow-hidden shadow-xl">
          <div className="relative w-full aspect-video">
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
                 <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm flex items-center gap-1.5">
                    <Tv className="h-3 w-3" />
                    {isPast ? 'On-Demand' : 'Live Event'}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-headline leading-tight">
                {webinar.title}
              </h1>
            </div>
          </div>
          <CardContent className="p-8 space-y-12">
            
            <section>
                <WebinarActions webinar={webinar} />
            </section>

            <Separator />

            <section>
                <h2 className="text-2xl font-bold font-headline mb-4 text-slate-800">About this event</h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                    <p>{webinar.description}</p>
                </div>
            </section>
            
            <Separator />
            
            <section>
                <h2 className="text-2xl font-bold font-headline mb-6 text-slate-800">Event Details</h2>
                 <Card className="bg-slate-50">
                    <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Host & Organizer</h4>
                                <p className="text-sm text-muted-foreground">Hosted by {webinar.host.name} ({webinar.host.title})</p>
                                <p className="text-sm text-muted-foreground">Organized by Focus Links Academy</p>
                                <p className="text-sm text-muted-foreground mt-1">Credits to Mohd Asad</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Video className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">Platform</h4>
                                <p className="text-sm text-muted-foreground">{webinar.platform}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 sm:col-span-2">
                            <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold">How to Join</h4>
                                <p className="text-sm text-muted-foreground">The meeting link will be emailed to registered attendees 1 hour before the session starts.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
