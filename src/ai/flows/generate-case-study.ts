
'use server';

/**
 * @fileOverview Generates a clinical case study based on a given topic.
 *
 * - generateCaseStudy - A function that creates a case study.
 * - GenerateCaseStudyInput - The input type for the generateCaseStudy function.
 * - GenerateCaseStudyOutput - The return type for the generateCaseStudy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaseStudyInputSchema = z.object({
  topic: z.string().describe('The clinical topic for the case study (e.g., "Progressive Keratoconus").'),
});
export type GenerateCaseStudyInput = z.infer<typeof GenerateCaseStudyInputSchema>;

const GenerateCaseStudyOutputSchema = z.object({
  caseMarkdown: z.string().describe("A complete clinical case study formatted as a single markdown document."),
});
export type GenerateCaseStudyOutput = z.infer<typeof GenerateCaseStudyOutputSchema>;


export async function generateCaseStudy(input: GenerateCaseStudyInput): Promise<GenerateCaseStudyOutput> {
  return generateCaseStudyFlow(input);
}

const promptTemplate = ai.definePrompt({
  name: 'generateCaseStudyPrompt',
  input: {schema: z.object({ topic: z.string() })},
  output: {schema: GenerateCaseStudyOutputSchema},
  prompt: `You are an expert clinical educator in optometry. Your task is to generate a realistic and educational clinical case study based on the provided topic.
The entire case study should be a single, cohesive markdown document.
It must include the following sections, formatted with markdown headings (###):
- ### Patient Presentation
- ### Examination Findings (use a markdown table for clarity)
- ### Diagnosis
- ### Clinical Discussion (use a blockquote for emphasis)
Topic: {{{topic}}}
`,
});

const generateCaseStudyFlow = ai.defineFlow(
  {
    name: 'generateCaseStudyFlow',
    inputSchema: GenerateCaseStudyInputSchema,
    outputSchema: GenerateCaseStudyOutputSchema,
  },
  async input => {
    const {output} = await promptTemplate(input);
    return output!;
  }
);
