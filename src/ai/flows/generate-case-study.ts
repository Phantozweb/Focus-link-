
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
  const systemPrompt = `You are an expert clinical educator in optometry. Your task is to generate a realistic and educational clinical case study based on the provided topic.
The entire case study should be a single, cohesive markdown document.
You MUST return the output as a valid JSON object with a single key: "caseMarkdown".
The value of "caseMarkdown" should be a markdown string containing the following sections:
- "### Patient Presentation": Describe the patient, their complaint, and relevant history.
- "### Examination Findings": Provide key findings from the clinical examination. Format this as a markdown table.
- "### Diagnosis": State the definitive diagnosis, perhaps in a blockquote.
- "### Clinical Discussion": Elaborate on the decision-making process, management plan, and educational takeaways. Use markdown for structure like bold text and bullet points.
`;

  const userPrompt = `Generate a complete case study on the topic: ${input.topic}`;

  try {
    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    
    const content = result.choices[0]?.message?.content;
    if (!content) {
        throw new Error("The AI returned an empty or invalid response structure.");
    }
    
    // The content itself is a stringified JSON, so we need to parse it.
    const parsedOutput = GenerateCaseStudyOutputSchema.safeParse(JSON.parse(content));

    if (!parsedOutput.success) {
      console.error("AI response content did not match expected schema:", parsedOutput.error);
      throw new Error("The AI returned data in an unexpected format.");
    }

    return parsedOutput.data;

  } catch (error) {
    console.error("Error fetching or parsing from custom AI endpoint:", error);
    let errorMessage = "Failed to generate case study from the new endpoint.";
    if (error instanceof Error) {
        if (error.message.includes("unexpected format") || error instanceof SyntaxError) {
            errorMessage = "The AI model did not return a valid JSON object. Please try again later or check the endpoint documentation.";
        } else {
            errorMessage = error.message;
        }
    }
    
    // Provide a fallback error object to the UI
    return {
        caseMarkdown: `### Error Generating Case on: ${input.topic}\n\nThe AI failed to generate the case study content. There was an issue communicating with the AI service. Details: ${errorMessage}`,
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
- ### Examination Findings (use a markdown table)
- ### Diagnosis
- ### Clinical Discussion
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
