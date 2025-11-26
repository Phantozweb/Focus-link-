
'use server';

/**
 * @fileOverview Answers questions about optometry.
 *
 * - askOptometryAI - A function that answers optometry questions.
 * - AskOptometryAIInput - The input type for the askOptometryAI function.
 * - AskOptometryAIOutput - The return type for the askOptometryAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskOptometryAIInputSchema = z.object({
  question: z.string().describe('The optometry-related question to answer.'),
});

export type AskOptometryAIInput = z.infer<typeof AskOptometryAIInputSchema>;

const AskOptometryAIOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});

export type AskOptometryAIOutput = z.infer<typeof AskOptometryAIOutputSchema>;

export async function askOptometryAI(input: AskOptometryAIInput): Promise<AskOptometryAIOutput> {
  return askOptometryAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askOptometryAIPrompt',
  input: {schema: AskOptometryAIInputSchema},
  output: {schema: AskOptometryAIOutputSchema},
  prompt: `You are an expert AI assistant for optometrists and optometry students. Your name is Focus.ai.

You are being asked a question from a user on the Focus Links platform.

Answer the following question accurately and concisely, as if you were a knowledgeable colleague. If the question is outside the scope of optometry, eye care, or vision science, politely decline to answer.

User's Question:
"{{{question}}}"

Provide a helpful and informative answer.
`,
});

const askOptometryAIFlow = ai.defineFlow(
  {
    name: 'askOptometryAIFlow',
    inputSchema: AskOptometryAIInputSchema,
    outputSchema: AskOptometryAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    