
'use client';

import { useState } from 'react';
import type { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { countries } from '@/lib/countries';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';


const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

interface GuidedQuestionnaireProps {
  onComplete: (data: Partial<UserProfile>) => void;
}

const questions = [
  {
    label: "What's your full name or your organization's name?",
    field: 'name' as keyof Partial<UserProfile>,
    type: 'text',
    placeholder: 'e.g., Dr. Jane Doe',
  },
  {
    label: 'Which of these best describes you?',
    field: 'type' as keyof Partial<UserProfile>,
    type: 'select',
    placeholder: 'Select a role...',
    options: profileTypes.map(p => ({ value: p, label: p })),
  },
  {
    label: 'Where are you located?',
    field: 'location' as keyof Partial<UserProfile>,
    type: 'select',
    placeholder: 'Select your country...',
    options: countries.map(c => ({ value: c.name, label: c.name })),
  },
];


export function GuidedQuestionnaire({ onComplete }: GuidedQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<UserProfile>>({
    name: '',
    type: undefined,
    location: '',
  });

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleChange = (field: keyof Partial<UserProfile>, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;
  const isNextDisabled = !data[currentQuestion.field];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Let's Get Started</CardTitle>
        <CardDescription>Answer these quick questions to begin building your profile.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <div className="space-y-4">
          <Label htmlFor={currentQuestion.field} className="text-xl font-semibold text-center block">{currentQuestion.label}</Label>
          {currentQuestion.type === 'text' && (
            <Input
              id={currentQuestion.field}
              value={data[currentQuestion.field] as string || ''}
              onChange={e => handleChange(currentQuestion.field, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="text-center text-lg h-12"
            />
          )}
          {currentQuestion.type === 'select' && currentQuestion.options && (
             <Select 
                onValueChange={value => handleChange(currentQuestion.field, value)}
                value={data[currentQuestion.field] as string || ''}
             >
                <SelectTrigger className="text-lg h-12">
                    <SelectValue placeholder={currentQuestion.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {currentQuestion.options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={handleBack} disabled={step === 0} className={cn(step === 0 && "invisible")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button onClick={handleNext} disabled={isNextDisabled}>
            {isLastStep ? 'Start AI Interview' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
