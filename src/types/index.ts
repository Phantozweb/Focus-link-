
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

export type Achievement = {
  event: string;
  place: string;
  description: string;
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
  gallery?: string[];
  isFounder?: boolean;
  achievements?: Achievement[];
};

// This type is for the form data structure before it's processed.
export type UserProfileForm = Omit<UserProfile, 'skills' | 'interests' | 'languages'> & {
  skills?: { value: string }[];
  interests?: { value: string }[];
  languages?: { value: string }[];
};


export const UserProfileSchema = z.object({
  id: z.string().min(5, "A valid Membership ID is required."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry']),
  location: z.string().optional(),
  experience: z.string().optional(),
  bio: z.string().min(10, "Bio should be more descriptive."),
  skills: z.array(z.object({ value: z.string().min(1, "Skill cannot be empty.") })).optional(),
  interests: z.array(z.object({ value: z.string().min(1, "Interest cannot be empty.") })).optional(),
  links: z.object({
    email: z.string().email().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
  workExperience: z.array(z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  education: z.array(z.object({
    school: z.string().optional(),
    degree: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    startYear: z.string().optional(),
    endYear: z.string().optional(),
  })).optional(),
  avatarUrl: z.string().url("Please enter a valid URL for the avatar image.").optional().or(z.literal('')),
  verified: z.boolean().optional(),
  languages: z.array(z.object({ value: z.string().min(1, "Language cannot be empty.") })).optional(),
});

export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  posted: string;
  postedBy: string;
  description: string;
  applyUrl: string;
};

// Types for Forum
export type ForumPost = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  avatar: string;
  category: string;
  tags: string[];
  description: string;
  content: string; // Simplified to a single markdown string
  media: { type: 'image' | 'video'; url: string; caption: string }[];
  mediaCount: number;
  replies: number;
  views: number;
  upvotes: number;
  lastReply: string;
  postedDate: string;
};
