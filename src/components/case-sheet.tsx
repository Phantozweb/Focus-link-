

import { useRef } from "react";
import {
  Download,
  Eye,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { type GenerateCaseStudyOutput } from "@/ai/flows/generate-case-study";
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";
import { DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

function formatCaseStudyContent(markdown: string) {
  if (!markdown) return '';
  
  let html = markdown
    .replace(/^#### (.*?$)/gm, '<h4 class="text-md font-semibold text-slate-700 mt-3 mb-1">$1</h4>')
    .replace(/^### (.*?$)/gm, '<h3 class="text-lg font-bold text-slate-800 mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Handle unordered lists (lines starting with - or *)
  html = html.replace(/^[*-] (.*?$)/gm, (match, content) => {
    return `<li class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>${content.trim()}</span></li>`;
  });

  // Handle ordered lists
  html = html.replace(/^\d+\.\s(.*?$)/gm, (match, content) => {
    const number = match.match(/^\d+/)?.[0];
    return `<li class="flex items-start gap-2"><span class="font-semibold text-slate-500">${number}.</span><span>${content.trim()}</span></li>`;
  });
  
  // Wrap list items in <ul> or <ol>
  html = html.replace(/(<li class="flex items-start gap-2"><span class="mt-1\.5.*<\/li>)/gs, (match) => {
    return `<ul class="list-none space-y-1 pl-2 my-4">${match}</ul>`;
  }).replace(/(<li class="flex items-start gap-2"><span class="font-semibold.*<\/li>)/gs, (match) => {
    return `<ol class="list-none space-y-1 pl-2 my-4">${match}</ol>`;
  });
  
  // Handle blockquotes
  html = html.replace(/^> (.*?$)/gm, '<div class="my-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 p-4 rounded-r-lg">$1</div>');
  
  // Handle tables
  const tableRegex = /(?:^\|.*\|(?:\r?\n|$))+/gm;
  html = html.replace(tableRegex, (table) => {
    const rows = table.trim().split(/\r?\n/).filter(row => row.trim());
    if (rows.length < 2) return table;

    const headerSeparator = rows[1];
    if (!headerSeparator.includes('|') || !headerSeparator.includes('-')) return table;

    const header = `<thead><tr class="m-0 border-t p-0 bg-slate-50">${rows[0].split('|').slice(1, -1).map(cell => `<th class="border px-4 py-2 text-left font-bold text-slate-700">${cell.trim()}</th>`).join('')}</tr></thead>`;
    
    const bodyRows = rows.slice(2);
    const body = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-slate-50/50">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left text-slate-600">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;

    return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full text-sm">${header}${body}</table></div>`;
  });

  // Handle paragraphs by splitting by double newlines, then wrapping non-special lines in <p>
  html = html.split(/\r?\n\r?\n/).map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      // A simple check to avoid re-wrapping block-level elements. This could be improved.
      if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<div')) {
          return trimmed.replace(/\r?\n/g, '<br/>'); // Preserve line breaks within already-formatted blocks
      }
      return `<p>${trimmed.replace(/\r?\n/g, '<br/>')}</p>`;
  }).join('');


  return html;
}


export function CaseSheet({ caseData, topic }: { caseData: GenerateCaseStudyOutput, topic: string }) {
  const caseSheetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleDownload = () => {
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
            description: "Could not generate an image of the case sheet."
        });
      });
  };

  return (
    <div>
        <div className="p-6 bg-slate-50 border-b">
             <DialogHeader>
                 <DialogTitle className="flex items-center gap-3 text-2xl font-headline text-slate-800">
                    <Sparkles className="h-6 w-6 text-purple-600" /> AI Generated Case
                </DialogTitle>
                <DialogDescription className="text-left pt-2">
                    Topic: "{topic}". The following case study is AI-generated for reference only. Always verify with trusted clinical sources.
                </DialogDescription>
            </DialogHeader>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
            <div ref={caseSheetRef} className="p-8 bg-white">
                <div className="flex justify-between items-center mb-8 pb-4 border-b">
                    <div className="flex items-center gap-2">
                        <Eye className="h-8 w-8 text-primary" />
                        <div>
                            <p className="font-bold text-xl text-primary">Focus<span className="text-slate-800">Links</span></p>
                            <p className="text-xs text-slate-500">AI Clinical Case Sheet</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-slate max-w-none text-base" dangerouslySetInnerHTML={{ __html: formatCaseStudyContent(caseData.caseMarkdown) }} />
                
                <div className="mt-8 pt-4 border-t text-center text-xs text-slate-500">
                  <p><strong>Disclaimer:</strong> This case sheet was generated by an AI for educational purposes only. It is not a substitute for professional clinical judgment and may not always be accurate. Always verify information with trusted clinical sources.</p>
                </div>
            </div>
        </div>
         <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
             <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download as Image
            </Button>
        </div>
    </div>
  );
}
