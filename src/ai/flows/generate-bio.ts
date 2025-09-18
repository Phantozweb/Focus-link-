'use server';

/**
 * @fileOverview Generates a professional bio for a user profile.
 *
 * - generateBio - A function that generates the bio.
 * - GenerateBioInput - The input type for the generateBio function.
 * - GenerateBioOutput - The return type for the generateBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBioInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  role: z.string().describe('The professional role of the person (e.g., Student, Optometrist).'),
  points: z.string().describe('A comma-separated list of key points, achievements, or interests.'),
});

export type GenerateBioInput = z.infer<typeof GenerateBioInputSchema>;

const GenerateBioOutputSchema = z.object({
  bio: z.string().describe('A professionally written bio.'),
});

export type GenerateBioOutput = z.infer<typeof GenerateBioOutputSchema>;

export async function generateBio(input: GenerateBioInput): Promise<GenerateBioOutput> {
  return generateBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBioPrompt',
  input: {schema: GenerateBioInputSchema},
  output: {schema: GenerateBioOutputSchema},
  prompt: `You are an expert profile writer for a professional directory. Generate a concise and professional bio for a user.

The bio should be in the first person, engaging, and suitable for a professional networking platform for the eye care industry.

User Details:
- Name: {{{name}}}
- Role: {{{role}}}
- Key Points: {{{points}}}

Based on these points, write a bio that is approximately 3-4 sentences long. Highlight their key strengths and goals.
`,
});

const generateBioFlow = ai.defineFlow(
  {
    name: 'generateBioFlow',
    inputSchema: GenerateBioInputSchema,
    outputSchema: GenerateBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
