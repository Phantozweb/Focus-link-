
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
  examinationFindings: z.string().describe("A markdown table of key examination findings with columns for Test, OD (Right Eye), and OS (Left Eye)."),
  diagnosis: z.string().describe("The final diagnosis for the case."),
  clinicalDiscussion: z.string().describe("A detailed discussion of the case, including differential diagnoses, management plan, and key learning points. Use markdown for formatting."),
});
export type GenerateCaseStudyOutput = z.infer<typeof GenerateCaseStudyOutputSchema>;

export async function generateCaseStudy(input: GenerateCaseStudyInput): Promise<GenerateCaseStudyOutput> {
  // The user has requested to use a different endpoint.
  // This will likely break the structured output and UI rendering.
  const prompt = `You are an expert clinical educator in optometry. Your task is to generate a realistic and educational clinical case study based on the provided topic.
The case study should be structured for learning, with clear sections.
Topic: ${input.topic}
Generate the case study with the following structure:
1.  **Title:** A clear, engaging title.
2.  **Patient Presentation:** Describe the patient, their complaint, and relevant history in a paragraph.
3.  **Examination Findings:** Provide key findings from the clinical examination. Format this as a markdown table with three columns: 'Test', 'OD (Right Eye)', and 'OS (Left Eye)'.
4.  **Diagnosis:** State the definitive diagnosis.
5.  **Clinical Discussion:** Elaborate on the decision-making process, differential diagnoses, proposed management plan, and educational takeaways. Use markdown for structure.`;
  
  try {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }
    const fullText = await response.text();
    // Since this endpoint returns a single block of text, we will put it all in the discussion.
    // The UI will likely not render this correctly in separate sections anymore.
    return {
      title: `AI-Generated Case on: ${input.topic}`,
      patientPresentation: "The AI response is not structured. All content is in the clinical discussion.",
      examinationFindings: "",
      diagnosis: "",
      clinicalDiscussion: fullText,
    };
  } catch (error) {
    console.error("Error fetching from custom AI endpoint:", error);
    throw new Error("Failed to generate case study from the new endpoint.");
  }
}

// The original Genkit flow is preserved below but is no longer used by the exported function.

const prompt = ai.definePrompt({
  name: 'generateCaseStudyPrompt',
  input: {schema: GenerateCaseStudyInputSchema},
  output: {schema: GenerateCaseStudyOutputSchema},
  prompt: `You are an expert clinical educator in optometry. Your task is to generate a realistic and educational clinical case study based on the provided topic.

The case study should be structured for learning, with clear sections, and formatted as a professional-looking HTML document.

Topic: {{{topic}}}

Generate the case study with the following structure:
1.  **Title:** A clear, engaging title.
2.  **Patient Presentation:** Describe the patient, their complaint, and relevant history in a paragraph.
3.  **Examination Findings:** Provide key findings from the clinical examination. **Format this as a markdown table** with three columns: 'Test', 'OD (Right Eye)', and 'OS (Left Eye)'. Include results for Visual Acuity, Refraction, Slit Lamp, etc.
4.  **Diagnosis:** State the definitive diagnosis.
5.  **Clinical Discussion:** Elaborate on the decision-making process, differential diagnoses, proposed management plan, and educational takeaways. Use markdown for structure like bold text and bullet points.
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
