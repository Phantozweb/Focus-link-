
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
  skills: { value: string }[] | string[];
  interests: { value: string }[] | string[];
  bio: string;
  links: {
    email?: string;
    linkedin?: string;
  };
  avatarUrl: string;
  workExperience: WorkExperience[];
  education: Education[];
  languages: { value: string }[] | string[];
  verified?: boolean;
};

export const UserProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry']),
  location: z.string(),
  experience: z.string(),
  bio: z.string().min(10, "Bio should be more descriptive."),
  skills: z.array(z.object({ value: z.string().min(1, "Skill cannot be empty.") })),
  interests: z.array(z.object({ value: z.string().min(1, "Interest cannot be empty.") })),
  links: z.object({
    email: z.string().email().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
  workExperience: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string().optional(),
  })),
  education: z.array(z.object({
    school: z.string().min(1, "School is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().optional(),
    startYear: z.string(),
    endYear: z.string(),
  })),
  avatarUrl: z.string().url("Please enter a valid URL for the avatar image.").optional().or(z.literal('')),
  verified: z.boolean().optional(),
  languages: z.array(z.object({ value: z.string().min(1, "Language cannot be empty.") })),
});

    