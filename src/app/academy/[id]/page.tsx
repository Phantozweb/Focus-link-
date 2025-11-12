
import { webinars } from '@/lib/academy';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Info, Video, Users, Tag, CheckCircle, Award, Trophy, Star, Tv, Share2, Quote } from 'lucide-react';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { WebinarActions } from '@/components/webinar-actions';
import { WebinarBanner } from '@/components/webinar-banner';
import { WebinarTime } from '@/components/webinar-time';
import { Leaderboard } from '@/components/leaderboard';
import { QuizBanner } from '@/components/quiz-banner';
import { ShareButton } from '@/components/share-button';
import { Button } from '@/components/ui/button';

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
  
  const previousImages = (await parent).openGraph?.images || []

  let description = 'Join the Focus Links community for expert-led events, webinars, and quiz competitions. Advance your knowledge in optometry and connect with peers worldwide.';
  let keywords = ['optometry quiz', 'eye care competition', 'clinical knowledge', 'anterior segment', 'posterior segment', ...webinar.tags];
  let title = `${webinar.title} | Focus Links Academy`;
  
  if (webinar.id === 'eye-q-arena-2025') {
    title = 'Eye Q Arena 2025: Results & Highlights | Focus Links';
    description = 'The Eye Q Arena 2025 has concluded! See the final leaderboard, read testimonials, and learn about the winners of the international optometry knowledge championship.';
    keywords.push('quiz results', 'optometry winner', 'leaderboard');
  }

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: webinar.title,
      description: description,
      images: [...previousImages],
    },
  }
}

function formatDescription(text: string) {
    const tableMarker = '---QUIZ_MODULES_TABLE---';
    const parts = text.split(tableMarker);
    const textBeforeTable = parts[0];
    const tableAndAfter = parts.length > 1 ? parts[1] : '';

    const tableRegex = /(\|.*\|(?:\n\|.*\|)+)/g;
    
    let processedTable = '';
    if (tableAndAfter.match(tableRegex)) {
        processedTable = tableAndAfter.replace(tableRegex, (match) => {
            const rows = match.trim().split('\n');
            const header = rows[1]; 
            if (!header) return '';

            const tableHead = `<thead><tr class="m-0 border-t p-0 even:bg-muted">${rows[0].split('|').slice(1, -1).map(cell => `<th class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</th>`).join('')}</tr></thead>`;
            
            const bodyRows = rows.slice(2);
            const tableBody = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-muted">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;

            return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full">${tableHead}${tableBody}</table></div>`;
        });
    }

    const processedText = textBeforeTable
        .replace(/<a href="([^"]*)" class="([^"]*)">([^<]*)<\/a>/g, '<a href="$1" class="$2" target="_blank" rel="noopener noreferrer">$3</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/### (.*?)(?:\n|$)/g, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4">$1</h3>')
        .replace(/^- (.*?)(?:\n|$)/gm, '<li class="flex items-start gap-3 mt-3"><span class="text-primary mt-1 flex-shrink-0">&#10003;</span><span>$1</span></li>')
        .replace(/<\/li>\n<li/g, '</li><li')
        .replace(/(<li.*<\/li>)/gs, '<ul class="list-none p-0">$1</ul>')
        .replace(/\n/g, '<br />');

    return processedText + processedTable.replace(/\n/g, '<br />');
}


const OrganizerInfo = ({webinar}: {webinar: (typeof webinars)[0]}) => (
     <section>
        <h3 className="text-2xl font-bold font-headline mb-6 text-slate-800">About the Organizer</h3>
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
);

const DefaultSpeakerInfo = ({webinar}: {webinar: (typeof webinars)[0]}) => (
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
);

const Testimonials = () => (
    <section>
        <h3 className="text-2xl font-bold font-headline mb-6 text-slate-800">What Participants Are Saying</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div><Quote className="h-8 w-8 text-slate-300" /></div>
                        <div>
                            <p className="text-slate-600 italic">"The Eye Q Arena was a fantastic experience! The questions were challenging and covered a great breadth of topics. It really pushed me to review my knowledge. Can't wait for the next one!"</p>
                            <p className="font-bold text-slate-700 mt-3">– Farhan Sheikh, Participant</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-white">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div><Quote className="h-8 w-8 text-slate-300" /></div>
                        <div>
                            <p className="text-slate-600 italic">"An incredibly well-organized event. The platform was seamless, and the live leaderboard added a thrilling competitive edge. A huge congratulations to the Focus Links team for putting this together."</p>
                            <p className="font-bold text-slate-700 mt-3">– Kritika Dey, Participant</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
);


export default function WebinarDetailPage({ params }: WebinarPageProps) {
  const webinar = webinars.find(w => w.id === params.id);
  const isQuiz = webinar?.id === 'eye-q-arena-2025';

  if (!webinar) {
    notFound();
  }

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": webinar.title,
    "startDate": webinar.dateTime,
    "description": (webinar.description || '').replace(/<[^>]*>/g, '').replace(/\*+/g, '').replace(/###/g, '').replace(/\n/g, ' ').replace(/\|/g, ''),
    "eventStatus": "https://schema.org/EventCompleted",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://focuslinks.pro/academy/eye-q-arena-2025"
    },
    "image": webinar.speaker.avatarUrl,
    "performer": {
      "@type": "Person",
      "name": webinar.speaker.name
    },
    "organizer": {
      "@type": "Organization",
      "name": webinar.host.name,
      "url": "https://focuslinks.pro"
    }
  };
  
  const { description, highlights, quizModules } = (() => {
    if (isQuiz) {
      const parts = (webinar.description || '').split('### Event Highlights:');
      const mainDesc = parts[0];
      const highlightsAndModules = parts[1] || '';
      
      const highlightsParts = highlightsAndModules.split('---QUIZ_MODULES_TABLE---');
      const highlightsText = highlightsParts[0] ? `### Event Highlights:\n${highlightsParts[0]}` : '';
      const modulesText = highlightsParts[1] ? `---QUIZ_MODULES_TABLE---${highlightsParts[1]}` : '';

      return { description: mainDesc, highlights: highlightsText, quizModules: modulesText };
    }
    return { description: webinar.description, highlights: null, quizModules: null };
  })();

  const founderNote = isQuiz
    ? `"The Eye Q Arena 2025 has been a monumental success, far exceeding our expectations. I want to extend my deepest gratitude to my esteemed lecturer, V.M. Ramkumar, whose guidance was invaluable. A massive thank you to every participant who joined us. Your engagement and passion are what make this community thrive. We are incredibly excited to see you on the leaderboard and can't wait for the next event!"`
    : `"This webinar marked a significant milestone for Focus Links. I want to extend my deepest gratitude to our esteemed speaker, Abhishek Kumar Banaita, for sharing his invaluable expertise. A special thank you to our Organizer, Mohd Asad, for his exceptional organization, and to every participant who joined us. Your engagement and passion are what make this community thrive. We are incredibly excited for what's to come!"`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <div className="bg-muted/40">
        <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/academy" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Academy
            </Link>
            <ShareButton title={webinar.title} text={`Check out this event on Focus Links: ${webinar.title}`} />
          </div>
          <Card className="overflow-hidden shadow-xl">
             <div className="relative aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/1]">
              {isQuiz ? <QuizBanner webinar={webinar} /> : <WebinarBanner webinar={webinar} />}
            </div>
            <CardContent className="p-0">
              <div className="p-8 space-y-8">
                  <div className="text-center space-y-4">
                     <h1 className="text-3xl lg:text-4xl font-bold font-headline text-slate-800">{webinar.title}</h1>
                  </div>

                  <Separator />

                  <div className="max-w-md mx-auto">
                    <WebinarActions webinar={webinar} />
                  </div>
                  
                  <Separator />

                  <div className="max-w-3xl mx-auto space-y-12">
                      <section>
                          <div className="prose prose-lg max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: formatDescription(description) }} />
                      </section>
                      
                       {highlights && (
                        <>
                          <Separator />
                          <section>
                            <div className="prose prose-lg max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: formatDescription(highlights) }} />
                          </section>
                        </>
                      )}
                      
                       {quizModules && (
                        <>
                          <Separator />
                          <section>
                            <div className="prose prose-lg max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: formatDescription(quizModules) }} />
                          </section>
                        </>
                       )}

                      <Separator />

                      <section>
                          <h2 className="text-2xl font-bold font-headline mb-4 text-slate-800">A Note from the Founder</h2>
                          <Card className="bg-blue-50 border-blue-100">
                              <CardContent className="p-6">
                                  <div className="flex gap-4">
                                      <div><Award className="h-8 w-8 text-blue-600" /></div>
                                      <div className="text-blue-800">
                                          <p className="font-semibold italic">{founderNote}</p>
                                          <p className="font-bold mt-3">– Janarthan Veeramani, Founder of Focus Links</p>
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      </section>

                      <Separator />
                      
                      {isQuiz && <Testimonials />}
                      
                      <Separator />
                      
                      <section>
                          <h2 className="text-2xl font-bold font-headline mb-6 text-slate-800">Event Details</h2>
                          <Card className="bg-slate-50">
                              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  <div className="sm:col-span-2 space-y-3 text-sm text-slate-700">
                                    <WebinarTime dateTime={webinar.dateTime} isDetailed />
                                  </div>
                                  <div className="flex items-start gap-3">
                                      <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                      <div>
                                          <h4 className="font-semibold">Organizer</h4>
                                          <p className="text-sm text-muted-foreground">Organized by {webinar.speaker.name}</p>
                                          <p className="text-sm text-muted-foreground">Powered by Focus Links</p>
                                      </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                      <Tv className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                      <div>
                                          <h4 className="font-semibold">Platform</h4>
                                          <p className="text-sm text-muted-foreground">Hosted by Focus Links</p>
                                      </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                      <Tag className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                      <div>
                                          <h4 className="font-semibold">Tags</h4>
                                          <div className="flex flex-wrap gap-2 mt-1">
                                              {webinar.tags.map(tag => (
                                                  <Badge key={tag} variant="secondary">{tag}</Badge>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                                  {webinar.attendance && (
                                    <div className="flex items-start gap-3">
                                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                          <div>
                                              <h4 className="font-semibold">Attendance</h4>
                                              <p className="text-sm text-muted-foreground">{webinar.attendance.attended}+ participants attended</p>
                                              <p className="text-sm text-muted-foreground">{webinar.attendance.registered} total registered</p>
                                          </div>
                                      </div>
                                  )}
                                  <div className="flex items-start gap-3 sm:col-span-2">
                                      <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                      <div>
                                          <h4 className="font-semibold">Event Status</h4>
                                          <p className="text-sm text-muted-foreground">This event has now concluded.</p>
                                      </div>
                                  </div>
                              </CardContent>
                          </Card>
                      </section>
                      
                      <Separator />

                      {isQuiz ? <OrganizerInfo webinar={webinar} /> : <DefaultSpeakerInfo webinar={webinar} />}

                       {isQuiz && (
                        <>
                          <Separator />
                          <section id="leaderboard">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold font-headline text-slate-800 flex items-center gap-2">
                                    <Trophy className="text-amber-500"/>
                                    Final Leaderboard
                                </h3>
                                <Button onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" size="sm">Go to Leaderboard</Button>
                            </div>
                            <Leaderboard itemsPerPage={10} />
                          </section>
                        </>
                       )}
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
