
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Loader2, Send, Sparkles } from 'lucide-react';
import { askOptometryAI } from '@/ai/flows/ask-optometry-ai';
import { useToast } from '@/hooks/use-toast';
import {marked} from 'marked';

export default function AskAIPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('');

    try {
      const result = await askOptometryAI({ question });
      setAnswer(result.answer);
    } catch (error) {
      console.error('AI question failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get an answer from the AI. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen">
      <header className="hero">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Ask Optometry AI</h1>
        <p className="text-base opacity-90 max-w-xl mx-auto">
          Get instant answers to your clinical questions from Focus AI.
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Bot className="h-8 w-8 text-primary" />
              Focus AI Assistant
            </CardTitle>
            <CardDescription>
              Ask a question about diagnoses, treatments, clinical pearls, or any other optometry-related topic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here... e.g., 'What are the key differences between scleritis and episcleritis?'"
                rows={4}
                className="text-base"
                disabled={isLoading}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading || !question.trim()}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                Ask Question
              </Button>
            </form>

            {isLoading && (
              <div className="mt-8 p-4 text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                Focus AI is thinking...
              </div>
            )}

            {answer && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Focus AI's Answer
                </h3>
                <div 
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked(answer) }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
