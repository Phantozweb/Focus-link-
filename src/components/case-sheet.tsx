'use client';

import { useRef, useCallback } from 'react';
import type { GenerateCaseStudyOutput } from '@/ai/flows/generate-case-study';
import { Button } from '@/components/ui/button';
import { Download, FileText, Sparkles, User, Microscope, HelpCircle, Lightbulb, ChevronLeft } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { marked } from 'marked';
import { toPng } from 'html-to-image';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Table, TableBody, TableCell, TableRow } from './ui/table';


interface CaseSheetProps {
    caseData: GenerateCaseStudyOutput;
    topic: string;
}

export function CaseSheet({ caseData, topic }: CaseSheetProps) {
    const { toast } = useToast();
    const caseSheetRef = useRef<HTMLDivElement>(null);

    const handleDownload = useCallback(() => {
        if (caseSheetRef.current === null) {
          return;
        }
        toPng(caseSheetRef.current, { cacheBust: true, pixelRatio: 2.5 })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `case-study-${topic.replace(/\s+/g, '-')}.png`;
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error(err);
            toast({
                variant: "destructive",
                title: "Download Failed",
                description: "Could not generate an image of the case study."
            });
          });
    }, [topic, toast]);

    const renderMarkdown = (text: string) => {
        const tableRegex = /(\|.*\|(?:\r?\n|\r))+/g;
        let html = text.replace(tableRegex, (match) => {
          const rows = match.trim().split(/\r?\n|\r/);
          const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
          const separator = rows[1];
          
          if (!separator || !separator.includes('|--')) return match;

          const bodyRows = rows.slice(2);
          
          const tableHead = `<thead><tr class="m-0 border-t p-0 even:bg-muted">${headers.map(cell => `<th class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">${cell}</th>`).join('')}</tr></thead>`;
          const tableBody = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-muted">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;

          return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full">${tableHead}${tableBody}</table></div>`;
        });

        const finalHtml = marked(html, { breaks: true });
        return { __html: finalHtml };
    };

    return (
        <>
            <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-t-lg">
                <DialogTitle className="flex items-center gap-2 text-2xl">
                    <FileText className="h-6 w-6" /> AI-Generated Case Study
                </DialogTitle>
                <DialogDescription className="text-blue-100">
                    Topic: <strong>{topic}</strong>. This case is for educational purposes.
                </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-y-auto bg-slate-50" id="case-sheet-content">
                <div ref={caseSheetRef} className="p-4 sm:p-6 bg-white">
                     <div className="text-center mb-6 border-b pb-4">
                        <Badge variant="secondary" className="mb-2">Clinical Case</Badge>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{caseData.title}</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><User className="text-primary h-5 w-5"/> Patient Presentation</h3>
                            <Card className="bg-slate-50/50 shadow-none"><CardContent className="p-4 prose prose-slate max-w-none prose-p:my-2" dangerouslySetInnerHTML={renderMarkdown(caseData.patientPresentation)} /></Card>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><Microscope className="text-primary h-5 w-5"/> Examination Findings</h3>
                            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={renderMarkdown(caseData.examinationFindings)} />
                        </section>
                        
                        <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><HelpCircle className="text-primary h-5 w-5"/> Diagnosis</h3>
                            <Card className="bg-blue-50 border-blue-200 shadow-none"><CardContent className="p-4 prose prose-slate max-w-none font-bold" dangerouslySetInnerHTML={renderMarkdown(caseData.diagnosis)} /></Card>
                        </section>
                        
                         <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><Lightbulb className="text-primary h-5 w-5"/> Clinical Discussion</h3>
                            <div className="prose prose-slate max-w-none prose-p:my-2" dangerouslySetInnerHTML={renderMarkdown(caseData.clinicalDiscussion)} />
                        </section>
                    </div>

                    <div className="mt-8 pt-4 border-t text-xs text-slate-500 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Sparkles className="h-4 w-4 text-purple-500" />
                           <span>Generated by Focus.ai</span>
                        </div>
                        <span className="font-semibold text-primary">Focus Links</span>
                    </div>
                </div>
            </div>

             <DialogFooter className="px-6 pb-4 bg-slate-100 border-t rounded-b-lg flex-col sm:flex-row gap-2">
                <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Generator
                    </Button>
                </DialogClose>
                <div className="flex-grow"></div>
                <Button onClick={handleDownload} variant="secondary" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Download as Image
                </Button>
            </DialogFooter>
        </>
    );
}
