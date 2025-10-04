
'use server';

/**
 * @fileOverview An AI flow that acts as a conversational interviewer, asking questions to fill out a user profile.
 *
 * - interviewerChat - A function that handles a single turn in the conversation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { 
  InterviewerChatInput, 
  InterviewerChatInputSchema, 
  InterviewerChatOutput, 
  InterviewerChatOutputSchema, 
  InterviewOutputSchema 
} from '@/types';


// The main function that will be called from the frontend for each turn of the conversation
export async function interviewerChat(history: InterviewerChatInput): Promise<InterviewerChatOutput> {
  return interviewerChatFlow(history);
}

// Define the prompt for the conversational interviewer
const interviewerChatPrompt = ai.definePrompt({
  name: 'interviewerChatPrompt',
  input: { schema: InterviewerChatInputSchema },
  output: { schema: InterviewerChatOutputSchema.extend({ profile: InterviewOutputSchema.omit({id: true}).optional() }) },
  
  prompt: `You are the "Focus Links Interviewer AI," a friendly and efficient chatbot whose job is to help users create a professional profile for an eye care directory.

Your goal is to gather all the necessary information by having a natural conversation. You will ask questions one at a time until you have enough information to fill out the user's profile completely.

**Your process:**
1.  Start by greeting the user and asking them to introduce themselves.
2.  Analyze the user's response. Identify what information they have provided.
3.  Based on what's missing, ask a clear, specific question to get the next piece of information. For example, if they mention their name and role, ask for their location. If they give their work history, ask about their education.
4.  Continue this conversational loop, asking one question at a time, until you have gathered all required fields for the user's profile (name, type, experience, location, skills, interests, bio, links, workExperience, education, languages).
5.  When you are confident you have ALL the information, your *very last* response should be to provide the complete profile object in the 'profile' field. Do not provide a text 'reply' in this final step. In all other steps, you must provide a 'reply'.
6.  Be friendly and encouraging throughout the process.

**Profile Schema to Fill:**
- **name**: Full name.
- **type**: 'Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'.
- **experience**: A short headline (e.g., "5+ years in pediatric optometry").
- **location**: City, State, Country.
- **skills**: An array of professional skills.
- **interests**: An array of professional interests.
- **bio**: A professional summary. You must **generate** a new one based on the conversation. Do not just copy text.
- **links**: Email and LinkedIn/website.
- **workExperience**: Array of jobs (title, company, dates).
- **education**: Array of degrees (school, degree, dates).
- **languages**: Array of languages spoken.
- **avatarUrl**: Use the default: 'https://i.ibb.co/jG6L8p3/default-avatar.png'
- **verified**: Use the default: false
- **id**: DO NOT generate this field.

**Conversation History:**
{{#each this}}
  **{{role}}**: {{content}}
{{/each}}

Based on the history, decide if you have enough information to create a profile. If yes, provide the full profile object. If not, ask the next question.`,
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
    
    if (output.profile) {
        return {
            ...output,
            profile: {
                ...output.profile,
                id: String(Date.now()),
            },
        };
    }

    return output;
  }
);
