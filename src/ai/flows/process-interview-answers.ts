
'use server';
/**
 * @fileOverview Processes a full interview transcript into a structured user profile.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { UserProfileSchema } from '@/types';

const ProcessInterviewInputSchema = z.object({
  initialData: z.string().describe('A JSON string of the partial UserProfile data collected from the initial questionnaire.'),
  questions: z.array(z.string()).describe('The array of questions the AI asked the user.'),
  answers: z.array(z.string()).describe('The array of answers the user provided, corresponding to the questions.'),
});
export type ProcessInterviewInput = z.infer<typeof ProcessInterviewInputSchema>;

const ProcessInterviewOutputSchema = z.object({
  profile: UserProfileSchema.partial().describe('The final, structured user profile data extracted from the entire conversation.'),
  completenessScore: z.number().min(0).max(10).describe('A score from 0-10 indicating how complete the final profile is.'),
});
export type ProcessInterviewOutput = z.infer<typeof ProcessInterviewOutputSchema>;


export async function processInterviewAnswers(input: ProcessInterviewInput): Promise<ProcessInterviewOutput> {
  return processAnswersFlow(input);
}


const processAnswersFlow = ai.defineFlow(
  {
    name: 'processInterviewAnswersFlow',
    inputSchema: ProcessInterviewInputSchema,
    outputSchema: ProcessInterviewOutputSchema,
  },
  async (input) => {

    const conversation = input.questions.map((q, i) => `AI: ${q}\nUser: ${input.answers[i]}`).join('\n\n');

    const { output } = await ai.generate({
        prompt: `You are an expert AI that processes interview transcripts to create structured professional profiles.

        You will receive initial data and a Q&A transcript. Your job is to analyze all the information and extract it into a structured JSON profile object. You must also calculate a completeness score.

        **1. Initial Data Provided by User:**
        \`\`\`json
        ${input.initialData}
        \`\`\`

        **2. Interview Transcript:**
        \`\`\`
        ${conversation}
        \`\`\`

        **Your Task:**
        1.  **Extract & Synthesize**: Read through the initial data and the entire interview. Combine all information to populate the fields of the user profile.
        2.  **Generate a Bio**: If not explicitly provided, write a new, engaging, first-person bio (3-4 sentences) based on all available information.
        3.  **Generate a Headline**: Create a concise, impactful headline (the 'experience' field).
        4.  **Calculate Completeness Score**: Based on the *final extracted data* in the 'profile' object, calculate a \`completenessScore\` from 0 to 10. Each of the 10 core fields is worth 1 point:
            - name
            - type
            - location
            - experience (headline)
            - bio
            - skills (at least one)
            - interests (at least one)
            - links (email or linkedin/website)
            - workExperience (at least one job)
            - education (at least one degree)
        5.  **Output**: Return the final 'profile' object and the 'completenessScore'.

        Now, process the information and generate the final JSON output.`,
        output: {
            schema: ProcessInterviewOutputSchema,
        },
        model: 'googleai/gemini-2.5-flash',
    });

    return output || { profile: {}, completenessScore: 0 };
  }
);
