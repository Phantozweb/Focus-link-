
'use server';
/**
 * @fileOverview Generates a set of interview questions based on initial user data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateInterviewQuestionsInputSchema = z.object({
  initialData: z.string().describe('A JSON string of the partial UserProfile data collected so far.'),
});
export type GenerateInterviewQuestionsInput = z.infer<typeof GenerateInterviewQuestionsInputSchema>;


const GenerateInterviewQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of 3 to 5 targeted interview questions.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<typeof GenerateInterviewQuestionsOutputSchema>;


export async function generateInterviewQuestions(input: GenerateInterviewQuestionsInput): Promise<GenerateInterviewQuestionsOutput> {
  return generateQuestionsFlow(input);
}


const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: GenerateInterviewQuestionsInputSchema,
    outputSchema: GenerateInterviewQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
        prompt: `You are an AI assistant helping a user create a professional profile for an eye care directory. The user has provided some initial information. Your task is to generate a list of 3-5 engaging, open-ended questions to gather the remaining information needed for a complete, high-quality profile.

        **Initial User Data:**
        \`\`\`json
        ${input.initialData}
        \`\`\`

        **Your Goal:**
        Ask questions to fill in the missing details for these key fields:
        - **Bio**: A 3-4 sentence professional summary.
        - **Skills**: A list of professional skills.
        - **Interests**: Professional or academic interests.
        - **Work Experience**: Details about past jobs (title, company, etc.), if applicable.
        - **Education**: Details about degrees and schools, if not already provided.
        - **Contact Info**: Email and LinkedIn/Website.

        **Instructions:**
        1.  Analyze the provided initial data to see what's missing for a perfect profile.
        2.  Create a list of 3-5 friendly, conversational questions to gather this missing information.
        3.  Combine related items into a single question (e.g., "What are some of your key skills and professional interests?").
        4.  Start with a broad question to encourage a detailed response (e.g., "Could you tell me a bit about your professional journey and what you're passionate about in eye care?").
        5.  Ensure your questions are open-ended to encourage descriptive answers.
        
        Generate the questions now.`,
        output: {
            schema: GenerateInterviewQuestionsOutputSchema,
        },
        model: 'googleai/gemini-2.5-flash',
    });

    return output || { questions: [] };
  }
);

    