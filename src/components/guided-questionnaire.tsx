
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
import { Progress } from './ui/progress';

const profileTypes: UserProfile['type'][] = ['Student', 'Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher', 'Association', 'College', 'Hospital', 'Optical', 'Industry'];

interface GuidedQuestionnaireProps {
  onComplete: (data: Partial<UserProfile>) => void;
}

const isProfessional = (role?: string) => role && ['Optometrist', 'Ophthalmologist', 'Optician', 'Academic', 'Researcher'].includes(role);
const isStudent = (role?: string) => role === 'Student';
const isOrganization = (role?: string) => role && ['Association', 'College', 'Hospital', 'Optical', 'Industry'].includes(role);

export function GuidedQuestionnaire({ onComplete }: GuidedQuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<UserProfile & { university: string, graduationYear: string, specialization: string, yearsOfExperience: number, website: string }>>({
    name: '',
    type: undefined,
    location: '',
    education: [],
    workExperience: [],
    links: { linkedin: '' }
  });

  const baseQuestions = [
    { label: "First, what's your full name or your organization's name?", field: 'name' as const, type: 'text', placeholder: 'e.g., Dr. Jane Doe' },
    { label: 'And which of these best describes you?', field: 'type' as const, type: 'select', placeholder: 'Select a role...', options: profileTypes.map(p => ({ value: p, label: p })) },
    { label: 'Finally, where are you located?', field: 'location' as const, type: 'select', placeholder: 'Select your country...', options: countries.map(c => ({ value: c.name, label: c.name })) },
  ];

  const studentQuestions = [
    { label: 'Which university or college are you attending?', field: 'university' as const, type: 'text', placeholder: 'e.g., University of California, Berkeley' },
    { label: 'What is your expected graduation year?', field: 'graduationYear' as const, type: 'number', placeholder: 'e.g., 2027' },
  ];
  
  const professionalQuestions = [
    { label: 'What is your primary specialization?', field: 'specialization' as const, type: 'text', placeholder: 'e.g., Pediatric Optometry' },
    { label: 'How many years of experience do you have?', field: 'yearsOfExperience' as const, type: 'number', placeholder: 'e.g., 5' },
  ];

  const organizationQuestions = [
    { label: "What is your organization's website?", field: 'website' as const, type: 'url', placeholder: 'https://example.com' },
  ];

  const getRoleSpecificQuestions = () => {
    if (isStudent(data.type)) return studentQuestions;
    if (isProfessional(data.type)) return professionalQuestions;
    if (isOrganization(data.type)) return organizationQuestions;
    return [];
  };
  
  const allQuestions = [...baseQuestions, ...getRoleSpecificQuestions()];
  const currentQuestion = allQuestions[step];

  const handleNext = () => {
    if (step < allQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Prepare final data object
      const finalData: Partial<UserProfile> = {
        name: data.name,
        type: data.type,
        location: data.location,
      };
      if (isStudent(data.type)) {
        finalData.education = [{
          school: data.university || '',
          endYear: String(data.graduationYear) || '',
          degree: '', fieldOfStudy: '', startYear: ''
        }];
      }
      if (isProfessional(data.type)) {
         finalData.workExperience = [{
            title: data.specialization || '',
            company: `${data.yearsOfExperience || 0} years experience`,
            startDate: '', endDate: '', description: ''
        }];
      }
      if (isOrganization(data.type)) {
        finalData.name = data.name; // Org name is same as user name initially
        finalData.links = { email: data.links?.email, linkedin: data.website };
      }
      onComplete(finalData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const isNextDisabled = () => {
    const field = currentQuestion.field;
    const value = (data as any)[field];

    if (value === undefined || value === null) return true;

    const stringValue = String(value).trim();

    if (field === 'type' || field === 'location') return !stringValue;
    if (field === 'name') return stringValue.length < 2;
    if (field === 'university') return stringValue.length < 3;
    if (field === 'graduationYear') return stringValue.length !== 4 || !/^\d{4}$/.test(stringValue);
    if (field === 'specialization') return stringValue.length < 2;
    if (field === 'yearsOfExperience') return isNaN(Number(value)) || Number(value) < 0;
    if (field === 'website') {
      try {
        new URL(stringValue);
        return false;
      } catch {
        return true;
      }
    }
    
    return false;
  };
  
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
              value={(data as any)[currentQuestion.field] || ''}
              onChange={e => handleChange(currentQuestion.field, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="text-center text-lg h-12"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled() && handleNext()}
            />
          )}
           {currentQuestion.type === 'number' && (
            <Input
              id={currentQuestion.field}
              type="number"
              value={(data as any)[currentQuestion.field] || ''}
              onChange={e => handleChange(currentQuestion.field, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="text-center text-lg h-12"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled() && handleNext()}
            />
          )}
           {currentQuestion.type === 'url' && (
            <Input
              id={currentQuestion.field}
              type="url"
              value={(data as any)[currentQuestion.field] || ''}
              onChange={e => handleChange(currentQuestion.field, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="text-center text-lg h-12"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && !isNextDisabled() && handleNext()}
            />
          )}
          {currentQuestion.type === 'select' && currentQuestion.options && (
             <Select 
                onValueChange={value => {
                  handleChange(currentQuestion.field, value);
                  // Automatically move to next step on selection if it's a base question
                  if (step < baseQuestions.length) {
                    setTimeout(() => handleNext(), 100);
                  }
                }}
                value={(data as any)[currentQuestion.field] || ''}
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
          <Button variant="outline" onClick={handleBack} className={cn(step === 0 && "invisible")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button onClick={handleNext} disabled={isNextDisabled()}>
            {step === allQuestions.length - 1 ? 'Start AI Interview' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
