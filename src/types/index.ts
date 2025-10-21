
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

export const UserProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  type: z.enum(['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry']).optional(),
  location: z.string().optional(),
  experience: z.string().optional(),
  bio: z.string().min(10, "Bio should be more descriptive.").optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  links: z.object({
    email: z.string().email().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
  workExperience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    duration: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    school: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().optional(),
    duration: z.string().optional(),
  })).optional(),
  avatarUrl: z.string().url("Please enter a valid URL for the avatar image.").optional(),
  verified: z.boolean().optional(),
  languages: z.array(z.string()).optional(),
});
