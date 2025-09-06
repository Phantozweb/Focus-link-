'use server';

/**
 * @fileOverview Summarizes an optometrist or student profile.
 *
 * - summarizeProfile - A function that summarizes the profile.
 * - SummarizeProfileInput - The input type for the summarizeProfile function.
 * - SummarizeProfileOutput - The return type for the summarizeProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProfileInputSchema = z.object({
  profileText: z
    .string()
    .describe('The profile text of the optometrist or student.'),
});

export type SummarizeProfileInput = z.infer<typeof SummarizeProfileInputSchema>;

const SummarizeProfileOutputSchema = z.object({
  summary: z.string().describe('A short summary of the profile.'),
});

export type SummarizeProfileOutput = z.infer<typeof SummarizeProfileOutputSchema>;

export async function summarizeProfile(input: SummarizeProfileInput): Promise<SummarizeProfileOutput> {
  return summarizeProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProfilePrompt',
  input: {schema: SummarizeProfileInputSchema},
  output: {schema: SummarizeProfileOutputSchema},
  prompt: `Summarize the following profile in a concise manner, highlighting key qualifications and experience:\n\n{{{profileText}}}`,
});

const summarizeProfileFlow = ai.defineFlow(
  {
    name: 'summarizeProfileFlow',
    inputSchema: SummarizeProfileInputSchema,
    outputSchema: SummarizeProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
