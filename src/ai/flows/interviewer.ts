
'use server';

/**
 * @fileOverview An AI flow that acts as an interviewer, extracting structured profile data from a user's free-form text.
 *
 * - interview - A function that processes the user's text and returns a structured profile.
 */

import {ai} from '@/ai/genkit';
import { InterviewInput, InterviewInputSchema, InterviewOutput, InterviewOutputSchema } from '@/types';

// The main function that will be called from the frontend
export async function interview(input: InterviewInput): Promise<InterviewOutput> {
  return interviewerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewerPrompt',
  input: {schema: InterviewInputSchema},
  output: {schema: InterviewOutputSchema.omit({ id: true })},
  prompt: `You are the "Focus Links Interviewer AI". Your task is to act as an expert profile builder for a professional eye care directory.

You will receive free-form text from a user. Your job is to analyze this text and extract all relevant information to create a complete, structured, and professional profile.

**Instructions:**

1.  **Parse Thoroughly**: Read the entire user input carefully. Identify the user's name, role/type, location, skills, interests, work history, education, languages, and contact information (email, LinkedIn/website).
2.  **Determine Profile Type**: Classify the user into one of the following categories: 'Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'.
3.  **Create a Headline**: Synthesize a concise, impactful headline (the 'experience' field) that summarizes their current status or main value proposition.
4.  **Generate a Bio**: Do not just copy and paste from the input. Write a new, engaging, first-person bio (3-4 sentences) that highlights their key strengths, experiences, and goals based on the provided text.
5.  **Structure Data**: Populate all fields of the output schema accurately.
    *   For \`workExperience\` and \`education\`, create structured objects for each entry mentioned.
    *   For \`skills\` and \`interests\`, extract them into separate array elements.
    *   For \`links\`, extract the email and a LinkedIn or personal website URL.
6.  **Defaults**:
    *   Use the default placeholder for \`avatarUrl\`.
    *   Set \`verified\` to \`false\`.
    *   DO NOT generate an \`id\`.

**User Input:**
\`\`\`
{{{text}}}
\`\`\`

Now, create the structured JSON output based on your analysis.`,
});

const interviewerFlow = ai.defineFlow(
  {
    name: 'interviewerFlow',
    inputSchema: InterviewInputSchema,
    outputSchema: InterviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
        ...output!,
        id: String(Date.now()),
    };
  }
);
