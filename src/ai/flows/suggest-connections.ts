'use server';

/**
 * @fileOverview Suggests optometrist connections for students based on shared interests and experience.
 *
 * - suggestConnections - A function to generate connection suggestions.
 * - SuggestConnectionsInput - The input type for the suggestConnections function.
 * - SuggestConnectionsOutput - The return type for the suggestConnections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestConnectionsInputSchema = z.object({
  studentInterests: z
    .string()
    .describe('The interests of the student, comma separated.'),
  studentExperience: z
    .string()
    .describe('The experience of the student, comma separated.'),
  studentLocation: z.string().describe('The location of the student.'),
  optometristProfiles: z
    .string()
    .describe(
      'A JSON array of optometrist profiles containing interests, experience, location and other relevant information.'
    ),
});
export type SuggestConnectionsInput = z.infer<
  typeof SuggestConnectionsInputSchema
>;

const SuggestConnectionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A JSON array of optometrist profiles that are suggested for the student to connect with.'
    ),
});
export type SuggestConnectionsOutput = z.infer<
  typeof SuggestConnectionsOutputSchema
>;

export async function suggestConnections(
  input: SuggestConnectionsInput
): Promise<SuggestConnectionsOutput> {
  return suggestConnectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestConnectionsPrompt',
  input: {schema: SuggestConnectionsInputSchema},
  output: {schema: SuggestConnectionsOutputSchema},
  prompt: `You are an AI assistant that suggests optometrist connections for students based on their interests and experience.

Given the following student information:

Interests: {{{studentInterests}}}
Experience: {{{studentExperience}}}
Location: {{{studentLocation}}}

And the following optometrist profiles:

{{{optometristProfiles}}}

Suggest the best optometrist connections for the student. Return a JSON array of the optometrist profiles that are suggested for the student to connect with.

Only include the optometrist profiles that are a good match for the student based on their interests, experience, and location.
Do not include any additional information or explanations.
Make sure the response can be parsed as JSON.`,
});

const suggestConnectionsFlow = ai.defineFlow(
  {
    name: 'suggestConnectionsFlow',
    inputSchema: SuggestConnectionsInputSchema,
    outputSchema: SuggestConnectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
