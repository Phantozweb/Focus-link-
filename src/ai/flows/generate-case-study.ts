
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
  const systemPrompt = `You are an expert clinical educator in optometry. Your task is to generate a realistic and educational clinical case study based on the provided topic.
The case study should be structured for learning, with clear sections.
You MUST return the output as a valid JSON object with the following keys: "title", "patientPresentation", "examinationFindings", "diagnosis", "clinicalDiscussion".
- "title": "A clear, engaging title."
- "patientPresentation": "Describe the patient, their complaint, and relevant history in a paragraph."
- "examinationFindings": "Provide key findings from the clinical examination. Format this as a markdown table with three columns: 'Test', 'OD (Right Eye)', and 'OS (Left Eye)'."
- "diagnosis": "State the definitive diagnosis."
- "clinicalDiscussion": "Elaborate on the decision-making process, differential diagnoses, proposed management plan, and educational takeaways. Use markdown for structure like bold text and bullet points."
`;

  const userPrompt = `Generate a case study on the topic: ${input.topic}`;

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
    
    // The response is expected to be a JSON object with a 'choices' array
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
        title: `Error Generating Case on: ${input.topic}`,
        patientPresentation: "The AI failed to generate the case study content.",
        examinationFindings: "",
        diagnosis: "Error",
        clinicalDiscussion: `There was an issue communicating with the AI service. Details: ${errorMessage}`,
    };
  }
}

// The original Genkit flow is preserved below but is no longer used by the exported function.

const promptTemplate = ai.definePrompt({
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
    const {output} = await promptTemplate(input);
    return output!;
  }
);
