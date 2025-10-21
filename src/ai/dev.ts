'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-connections.ts';
import '@/ai/flows/summarize-profile.ts';
import '@/ai/flows/generate-bio.ts';
import '@/ai/flows/generate-interview-questions.ts';
import '@/ai/flows/process-interview-answers.ts';
