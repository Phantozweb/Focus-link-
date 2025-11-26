import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  User,
  FileText,
  MessageCircle,
  Send,
  Download,
  Image as ImageIcon,
  ArrowLeft,
  RefreshCw,
  Brain,
  HelpCircle,
  Stethoscope,
  GraduationCap,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { type GenerateCaseStudyOutput } from "@/ai/flows/generate-case-study";
import { toPng } from 'html-to-image';
import { useToast } from "@/hooks/use-toast";


function formatCaseStudyContent(markdown: string) {
    if (!markdown) return '';
    let html = markdown
        .replace(/^### (.*?$)/gm, '<h3 class="text-lg font-semibold text-slate-800 mt-4 mb-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle unordered lists
    html = html.replace(/^- (.*?$)/gm, (match, content) => {
        return `<li class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>${content.trim()}</span></li>`;
    });
    html = html.replace(/(<li.*<\/li>)/gs, (match) => {
        if (!match.startsWith('<ul')) {
            return `<ul class="list-none space-y-1 pl-2 my-4">${match}</ul>`;
        }
        return match;
    });

    // Handle ordered lists
     html = html.replace(/^\d+\.\s(.*?$)/gm, (match, content) => {
        return `<li class="flex items-start gap-2"><span class="font-semibold text-slate-500">${match.match(/^\d+/)[0]}.</span><span>${content.trim()}</span></li>`;
    });
     html = html.replace(/(<li class="flex items-start gap-2"><span class="font-semibold.*<\/li>)/gs, (match) => {
        if (!match.startsWith('<ol')) {
            return `<ol class="list-none space-y-1 pl-2 my-4">${match}</ol>`;
        }
        return match;
    });

    // Handle blockquotes/callouts
    html = html.replace(/^> (.*?$)/gm, (match, content) => {
        return `<div class="my-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 p-4 rounded-r-lg">${content.trim()}</div>`;
    });
    
    // Handle tables
    const tableRegex = /(\|.*\|(?:\r\n|\n|\r)?)+/g;
    html = html.replace(tableRegex, (match) => {
        const rows = match.trim().split(/\r\n|\n|\r/).filter(row => row.trim());
        const headerSeparator = rows[1];
        if (!headerSeparator || !headerSeparator.includes('|')) return match; 

        const header = `<thead><tr class="m-0 border-t p-0 bg-slate-50">${rows[0].split('|').slice(1, -1).map(cell => `<th class="border px-4 py-2 text-left font-bold text-slate-700">${cell.trim()}</th>`).join('')}</tr></thead>`;
        
        const bodyRows = rows.slice(2);
        const body = `<tbody>${bodyRows.map(row => `<tr class="m-0 border-t p-0 even:bg-slate-50/50">${row.split('|').slice(1, -1).map(cell => `<td class="border px-4 py-2 text-left text-slate-600">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;

        return `<div class="my-6 overflow-x-auto rounded-lg border shadow-sm"><table class="w-full text-sm">${header}${body}</table></div>`;
    });

    // Handle paragraphs and line breaks
    html = html.split(/\r\n|\n|\r/).map(p => p.trim() ? `<p class="my-4">${p}</p>` : '').join('')
      .replace(/<p><h3>/g, '<h3>').replace(/<\/h3><\/p>/g, '</h3>')
      .replace(/<p><(ul|ol|div class="my-6|div class="my-4)>/g, '<$1>')
      .replace(/<\/(ul|ol|table)><\/p>/g, '</$1></div></p>') // This is tricky, table is wrapped in div
      .replace(/<p><\/p>/g, '');


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
            <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-slate-800">{caseData.title}</h2>
                  <p className="text-sm text-muted-foreground">AI-Generated Case for: "{topic}"</p>
                </div>
                <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
            </div>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
            <div ref={caseSheetRef} className="p-8 bg-white">
                <section className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b-2 border-primary pb-2 mb-4 flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Patient Presentation</h3>
                    <p className="text-slate-600 leading-relaxed">{caseData.patientPresentation}</p>
                </section>
                <section className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b-2 border-primary pb-2 mb-4 flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary"/> Examination Findings</h3>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatCaseStudyContent(caseData.examinationFindings) }} />
                </section>
                <section className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b-2 border-primary pb-2 mb-4 flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary"/> Diagnosis</h3>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                        <p className="font-semibold text-amber-800">{caseData.diagnosis}</p>
                    </div>
                </section>
                <section>
                    <h3 className="text-xl font-bold text-slate-800 border-b-2 border-primary pb-2 mb-4 flex items-center gap-2"><Brain className="h-5 w-5 text-primary"/> Clinical Discussion</h3>
                    <div className="prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: formatCaseStudyContent(caseData.clinicalDiscussion) }} />
                </section>
            </div>
        </div>
        <div className="p-3 text-center bg-slate-800 text-slate-300 text-xs rounded-b-lg">
            AI-generated for educational purposes only. Always verify with clinical sources.
        </div>
    </div>
  );
}
