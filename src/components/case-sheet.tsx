'use client';

import { useRef, useCallback } from 'react';
import type { GenerateCaseStudyOutput } from '@/ai/flows/generate-case-study';
import { Button } from '@/components/ui/button';
import { Download, FileText, Sparkles, Eye, User, Microscope, HelpCircle, Lightbulb } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { marked } from 'marked';
import { toPng } from 'html-to-image';

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
        toPng(caseSheetRef.current, { cacheBust: true, pixelRatio: 2 })
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
        // First, replace markdown tables with HTML tables for better styling control
        const tableRegex = /(\|.*\|(?:\r?\n|\r))+/g;
        let html = text.replace(tableRegex, (match) => {
          const rows = match.trim().split(/\r?\n|\r/);
          const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
          const separator = rows[1];
          
          if (!separator || !separator.includes('|--')) return match; // Not a valid markdown table

          const bodyRows = rows.slice(2);
          
          const tableHead = `<thead><tr class="m-0 border-t p-0 even:bg-muted">${headers.map(cell => `<th class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">${cell}</th>`).join('')}</tr></thead>`;
          const tableBody = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-muted">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;

          return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full">${tableHead}${tableBody}</table></div>`;
        });

        // Then process the rest of the markdown
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

            <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
                <div ref={caseSheetRef} className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div className="text-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-bold text-slate-800">{caseData.title}</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><User /> Patient Presentation</h3>
                            <div className="prose prose-slate max-w-none prose-p:my-2" dangerouslySetInnerHTML={renderMarkdown(caseData.patientPresentation)} />
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><Microscope /> Examination Findings</h3>
                            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={renderMarkdown(caseData.examinationFindings)} />
                        </section>
                        
                        <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><HelpCircle /> Diagnosis</h3>
                            <div className="prose prose-slate max-w-none font-bold" dangerouslySetInnerHTML={renderMarkdown(caseData.diagnosis)} />
                        </section>
                        
                         <section>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-slate-700"><Lightbulb /> Clinical Discussion</h3>
                            <div className="prose prose-slate max-w-none prose-p:my-2" dangerouslySetInnerHTML={renderMarkdown(caseData.clinicalDiscussion)} />
                        </section>
                    </div>

                    <div className="mt-6 pt-4 border-t text-xs text-slate-500 flex items-center justify-end gap-2">
                        <Eye className="h-4 w-4" />
                        Generated by Focus.ai
                    </div>
                </div>
            </div>

             <DialogFooter className="px-6 pb-4 bg-slate-50 border-t rounded-b-lg">
                <Button onClick={handleDownload} variant="secondary">
                    <Download className="mr-2 h-4 w-4" />
                    Download as Image
                </Button>
            </DialogFooter>
        </>
    );
}
