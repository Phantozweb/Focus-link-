
import { z } from 'zod';

export type WorkExperience = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  duration?: string;
};

export type Education = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  university?: string;
};

export type UserProfile = {
  id: string;
  name: string;
  type: 'Optometrist' | 'Student' | 'Academic' | 'Researcher' | 'Association' | 'College' | 'Hospital' | 'Optical' | 'Industry' | 'Ophthalmologist' | 'Optician';
  experience: string;
  location: string;
  skills: string[];
  interests: string[];
  bio: string;
  links: {
    email?: string;
    linkedin?: string;
  };
  avatarUrl: string;
  workExperience: WorkExperience[];
  education: Education[];
  languages: string[];
  verified?: boolean;
};

// Types for AI Flows

// Interviewer (free text to profile)
export const InterviewInputSchema = z.object({
  text: z.string().describe('The free-form text provided by the user describing their profile.'),
});
export type InterviewInput = z.infer<typeof InterviewInputSchema>;

export const UserProfileSchema = z.object({
  id: z.string().describe('A unique identifier for the user.'),
  name: z.string().describe("The user's full name."),
  type: z.enum(['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry']).describe("The user's professional category."),
  location: z.string().describe("The user's city and country (e.g., 'San Francisco, USA')."),
  experience: z.string().describe("A concise, professional headline (e.g., 'Cornea and Contact Lens Specialist')."),
  bio: z.string().describe("A 3-4 sentence professional bio written in the first person."),
  skills: z.array(z.string()).describe("An array of professional skills."),
  interests: z.array(z.string()).describe("An array of professional or academic interests."),
  links: z.object({
    email: z.string().email().optional().describe("The user's email address."),
    linkedin: z.string().url().optional().describe("A URL to the user's LinkedIn profile or personal website."),
  }),
  workExperience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    duration: z.string().optional(),
    description: z.string().optional(),
  })).describe("An array of the user's work experiences."),
  education: z.array(z.object({
    school: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().optional(),
    duration: z.string().optional(),
  })).describe("An array of the user's educational background."),
  avatarUrl: z.string().url().describe("A placeholder URL for the user's avatar."),
  verified: z.boolean().describe("A flag indicating if the profile is verified."),
});

export const InterviewOutputSchema = UserProfileSchema;
export type InterviewOutput = z.infer<typeof InterviewOutputSchema>;


// Conversational Interviewer (Chat)
export const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
    suggestions: z.array(z.string()).optional(),
});
export type Message = z.infer<typeof MessageSchema>;

export const InterviewerChatInputSchema = z.array(MessageSchema);
export type InterviewerChatInput = z.infer<typeof InterviewerChatInputSchema>;

export const InterviewerChatOutputSchema = z.object({
    reply: z.string().describe("The AI's next question or concluding statement for the user."),
    suggestions: z.array(z.string()).optional().describe("An optional array of suggested replies for the user to click."),
    profile: UserProfileSchema.partial().describe("A JSON object containing the profile data extracted so far from the conversation."),
    completenessScore: z.number().min(0).max(10).describe("A score from 0-10 indicating how complete the profile is."),
});
export type InterviewerChatOutput = z.infer<typeof InterviewerChatOutputSchema>;
