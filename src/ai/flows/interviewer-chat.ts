
'use server';

/**
 * @fileOverview An AI flow that acts as a conversational interviewer, asking questions to fill out a user profile.
 *
 * - interviewerChat - A function that handles a single turn in the conversation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
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

const profileTypes = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

// Define the prompt for the conversational interviewer
const interviewerChatPrompt = ai.definePrompt({
  name: 'interviewerChatPrompt',
  input: { schema: InterviewerChatInputSchema },
  output: { schema: InterviewerChatOutputSchema.extend({ profile: InterviewOutputSchema.partial().optional() }) },
  
  prompt: `You are the "Focus Links Interviewer AI," a friendly and efficient chatbot whose job is to help users create a professional profile for an eye care directory.

Your goal is to gather all the necessary information by having a natural conversation. You will ask questions one at a time until you have enough information to fill out the user's profile completely.

**Your process:**
1.  **Analyze and Update**: Look at the conversation history and the most recent user message. Extract any new information and update the \`profile\` object. **You must return the updated \`profile\` object in every single turn.**
2.  **Start the Conversation**: If this is the first message, greet the user and ask for their name.
3.  **Ask the Next Question**: Based on what's missing from the profile, ask the single most important next question. Be specific. For example, if you have their name, ask for their profile type. If you have their type, ask for their location.
4.  **Use Suggested Replies**: Whenever it makes sense, provide suggested replies to speed things up. For example, when asking for the profile type, provide the valid options as suggestions.
5.  **Gather All Info**: Continue this conversational loop, asking one question at a time, until you have gathered all required fields for the user's profile (name, type, experience, location, skills, interests, bio, links, workExperience, education, languages).
6.  **Finalize the Profile**: Once all fields are filled and you have confirmed with the user, your final text reply should be something like "Your profile is complete! You can now submit it." and provide the final, complete profile object.

**Profile Schema to Fill:**
- **name**: Full name.
- **type**: One of: 'Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'.
- **experience**: A short headline (e.g., "5+ years in pediatric optometry").
- **location**: City, State, Country.
- **skills**: An array of professional skills.
- **interests**: An array of professional interests.
- **bio**: A professional summary. You must **generate** a new one based on the conversation once all other information is gathered. Do not just copy text.
- **links**: Email and LinkedIn/website.
- **workExperience**: Array of jobs (title, company, dates).
- **education**: Array of degrees (school, degree, dates).
- **languages**: Array of languages spoken.
- **avatarUrl**: Use the default: 'https://i.ibb.co/jG6L8p3/default-avatar.png'
- **verified**: Use the default: false

**Conversation History:**
{{#each this}}
  **{{role}}**: {{#if content}}{{content}}{{/if}}
{{/each}}

Based on the history, update the profile object, and then decide what to ask next. Always return the current state of the profile.`,
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
    
    // Ensure the ID is added only at the end when the profile is complete
    if (output.profile && !output.profile.id && output.profile.name && output.profile.type && output.profile.location && output.profile.experience && output.profile.bio) {
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
