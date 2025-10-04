
'use server';

/**
 * @fileOverview An AI flow that acts as a conversational interviewer, asking questions to fill out a user profile and scoring its completeness.
 *
 * - interviewerChat - A function that handles a single turn in the conversation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { 
  InterviewerChatInput, 
  InterviewerChatInputSchema, 
  InterviewerChatOutput, 
  InterviewerChatOutputSchema 
} from '@/types';

// The main function that will be called from the frontend for each turn of the conversation
export async function interviewerChat(history: InterviewerChatInput): Promise<InterviewerChatOutput> {
  return interviewerChatFlow(history);
}

// Define the prompt for the conversational interviewer
const interviewerChatPrompt = ai.definePrompt({
  name: 'interviewerChatPrompt',
  input: { schema: InterviewerChatInputSchema },
  output: { schema: InterviewerChatOutputSchema },
  
  prompt: `You are the "Focus Links Interviewer AI," a friendly and efficient chatbot whose job is to help users create a professional profile for an eye care directory by conducting a structured interview.

Your goal is to gather all necessary information by having a natural conversation and to score the completeness of the profile.

**Your process:**
1.  **Analyze Conversation**: Review the entire conversation history.
2.  **Calculate Completeness Score**: Based on the information gathered so far, calculate a \`completenessScore\` from 0 to 10. Each of the 10 core fields you gather (name, type, location, experience, bio, skills, interests, links, work experience, education) is worth 1 point.
3.  **Ask the Next Question**: Determine the most important piece of missing information and ask the user a single, clear question to get it.
4.  **Provide Suggestions**: When appropriate, provide suggested replies to make it easier for the user (e.g., for profile type).
5.  **Finalize**: Once the score reaches 10/10, your final reply should be "Your profile is complete! You can now submit it." and you should stop asking questions.

**Fields to gather (1 point each):**
- name: Full name.
- type: 'Student', 'Optometrist', etc.
- location: City, State, Country.
- experience: A short headline.
- bio: A professional summary.
- skills: An array of skills.
- interests: An array of interests.
- links: Email and LinkedIn/website.
- workExperience: At least one job.
- education: At least one degree.

**Conversation History:**
{{#each this}}
  **{{role}}**: {{#if content}}{{content}}{{/if}}
{{/each}}

Based on the history, calculate the score and decide what to ask next.`,
});


const interviewerChatFlow = ai.defineFlow(
  {
    name: 'interviewerChatFlow',
    inputSchema: InterviewerChatInputSchema,
    outputSchema: InterviewerChatOutputSchema,
  },
  async (history) => {
    const { output } = await interviewerChatPrompt(history);
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
