
'use server';

/**
 * @fileOverview Answers questions about optometry.
 *
 * - askOptometryAI - A function that answers optometry questions.
 * - AskOptometryAIInput - The input type for the askOptometryAI function.
 * - AskOptometryAIOutput - The return type for the askOptometryAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskOptometryAIInputSchema = z.object({
  question: z.string().describe('The optometry-related question to answer.'),
});

export type AskOptometryAIInput = z.infer<typeof AskOptometryAIInputSchema>;

const AskOptometryAIOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});

export type AskOptometryAIOutput = z.infer<typeof AskOptometryAIOutputSchema>;

export async function askOptometryAI(input: AskOptometryAIInput): Promise<AskOptometryAIOutput> {
  const question = input.question.trim().toLowerCase();
  const simpleGreetings = ['hi', 'hello', 'hey', 'yo', 'sup'];

  if (simpleGreetings.includes(question)) {
    return { answer: "Hello! I'm Focus.ai, your assistant for optometry questions. How can I help you today?" };
  }

  const systemPrompt = `You are Focus.AI, a specialized AI assistant created by Focus.in exclusively for optometry and ophthalmology professionals.

STRICT DOMAIN RULES:
1. ONLY answer questions related to optometry, ophthalmology, and eye care.

ALLOWED TOPICS:
- Eye diseases: glaucoma, cataracts, macular degeneration, diabetic retinopathy, uveitis, keratitis, conjunctivitis, etc.
- Refractive errors: myopia, hyperopia, astigmatism, presbyopia
- Contact lens fitting, types, complications, and care
- Ocular anatomy and physiology
- Examination techniques: slit-lamp, fundoscopy, tonometry, gonioscopy, pachymetry
- Diagnostic imaging: OCT, fluorescein angiography, visual fields, topography
- Treatment protocols, surgical procedures, medications
- Pediatric optometry and vision development
- Low vision rehabilitation
- Ocular emergencies and trauma
- Neuro-ophthalmology
- Systemic diseases affecting the eye

PROHIBITED TOPICS:
- General medical advice unrelated to eyes
- Personal health consultations for non-professionals
- Non-medical topics (cooking, entertainment, coding, politics, etc.)
- Legal, financial, or business advice
- Any topic not directly related to professional eye care

RESPONSE GUIDELINES:
1. If asked about non-eye-care topics, respond: "I'm Focus.AI, specialized exclusively in optometry and ophthalmology. I can only assist with eye care related questions. Please ask about eye conditions, diseases, diagnostics, or treatments."
2. **Format all responses using markdown.** Use headings (###), bold text (**text**), and bulleted lists (-) to make the answer easy to read and well-structured.
3. Use proper medical terminology with clear explanations.
4. Provide evidence-based information when possible.
5. For clinical cases, offer structured differential diagnoses.
6. Always recommend professional examination for definitive diagnosis.
7. Include relevant ICD codes or clinical classifications when appropriate.
8. Be concise but thorough.

You are a professional reference tool for optometrists and ophthalmologists, not for general public use.`;

  const userMessage = `User Question: ${input.question}\n\nProvide a professional, accurate response:`;
  
  try {
    const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "deepseek",
            "messages": [
                { "role": "system", "content": systemPrompt },
                { "role": "user", "content": userMessage }
            ],
            "max_tokens": 128000
        })
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0]?.message?.content;

    if (!content) {
        throw new Error("The AI returned an empty or invalid response structure.");
    }
    
    // Remove the promotional footer
    if (content.includes('---')) {
      content = content.split('---')[0].trim();
    }

    return { answer: content };

  } catch (error) {
    console.error("Error fetching or parsing from custom AI endpoint:", error);
    let errorMessage = "Failed to get an answer from the AI.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return {
        answer: `### Error\n\nThere was an issue communicating with the AI service. Details: ${errorMessage}`,
    };
  }
}

// The original Genkit flow is preserved below but is no longer used by the exported function.
const prompt = ai.definePrompt({
  name: 'askOptometryAIPrompt',
  input: {schema: AskOptometryAIInputSchema},
  output: {schema: AskOptometryAIOutputSchema},
  prompt: `You are an expert AI assistant for optometrists and optometry students. Your name is Focus.ai.

You are being asked a question from a user on the Focus Links platform.

Answer the following question accurately and concisely, as if you were a knowledgeable colleague. Use markdown for formatting, such as headings (###), bold text (**text**), and bulleted lists (-) to make the answer easy to read and well-structured. If the question is outside the scope of optometry, eye care, or vision science, politely decline to answer.

User's Question:
"{{{question}}}"

Provide a helpful and informative answer.
`,
});

const askOptometryAIFlow = ai.defineFlow(
  {
    name: 'askOptometryAIFlow',
    inputSchema: AskOptometryAIInputSchema,
    outputSchema: AskOptometryAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
