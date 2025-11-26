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
  title: z.string().describe("A concise and descriptive title for the case study."),
  patientPresentation: z.string().describe("A paragraph detailing the patient's presentation, including age, gender, chief complaint, and history."),
  examinationFindings: z.string().describe("A markdown list of key examination findings (e.g., Visual Acuity, Slit Lamp findings, special test results)."),
  diagnosis: z.string().describe("The final diagnosis for the case."),
  clinicalDiscussion: z.string().describe("A detailed discussion of the case, including differential diagnoses, management plan, and key learning points. Use markdown for formatting."),
});
export type GenerateCaseStudyOutput = z.infer<typeof GenerateCaseStudyOutputSchema>;

export async function generateCaseStudy(input: GenerateCaseStudyInput): Promise<GenerateCaseStudyOutput> {
  return generateCaseStudyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaseStudyPrompt',
  input: {schema: GenerateCaseStudyInputSchema},
  output: {schema: GenerateCaseStudyOutputSchema},
  prompt: `You are an expert clinical educator in optometry. Your task is to generate a realistic and educational clinical case study based on the provided topic.

The case study should be structured for learning, with clear sections. Use markdown formatting for lists.

Topic: {{{topic}}}

Generate the case study with the following structure:
1.  **Title:** A clear, engaging title.
2.  **Patient Presentation:** Describe the patient, their complaint, and relevant history.
3.  **Examination Findings:** Provide key findings from the clinical examination. Format this as a markdown list.
4.  **Diagnosis:** State the definitive diagnosis.
5.  **Clinical Discussion:** Elaborate on the decision-making process, differential diagnoses, proposed management plan, and educational takeaways. Format this using markdown for structure.
`,
});

const generateCaseStudyFlow = ai.defineFlow(
  {
    name: 'generateCaseStudyFlow',
    inputSchema: GenerateCaseStudyInputSchema,
    outputSchema: GenerateCaseStudyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
