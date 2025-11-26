
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
  const systemPrompt = `You are an expert clinical educator in optometry. Your task is to generate a realistic, detailed, and educational clinical case study based on the provided topic.
The entire case study should be a single, cohesive markdown document.

It must include the following sections, formatted with markdown headings (###):
- ### Patient Presentation: Include chief complaint, HPI, past ocular/medical/family history.
- ### Examination Findings: Use a markdown table for clarity. Include VA, refraction, slit lamp, IOP, and fundus findings.
- ### Ancillary Testing (if applicable): Describe results from tests like OCT, Visual Fields, Topography, etc.
- ### Diagnosis: Provide a primary diagnosis and at least two differential diagnoses.
- ### Clinical Discussion: Use a blockquote for emphasis. Discuss the diagnosis, treatment options, and management plan.
- ### Clinical Pearls: Provide a few key takeaway points.
- ### Question for the Community: End with an engaging question to spark discussion.
`;
  const userMessage = `Topic: ${input.topic}`;

  try {
    const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "deepseek",
            "messages": [
                { "role": "system", "content": systemPrompt },
                { "role": "user", "content": userMessage }
            ],
            "max_tokens": 128000
        })
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0]?.message?.content;

    if (!content) {
        throw new Error("The AI returned an empty or invalid response structure.");
    }

    // Remove the promotional footer
    if (content.includes('---')) {
      content = content.split('---')[0].trim();
    }

    return { caseMarkdown: content };

  } catch (error) {
    console.error("Error fetching or parsing from custom AI endpoint:", error);
    let errorMessage = "Failed to generate case study from the AI.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
     return {
        caseMarkdown: `### Error\n\nThere was an issue communicating with the AI service. Details: ${errorMessage}`,
    };
  }
}

// The original Genkit flow is preserved below but is no longer used by the exported function.
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
