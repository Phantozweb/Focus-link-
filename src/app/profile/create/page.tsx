
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProfileSchema, type UserProfileForm } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, User, Save, Upload, Image as ImageIcon, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useDynamicFields } from '@/hooks/use-dynamic-fields';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}


export default function CreateProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [idStatus, setIdStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<UserProfileForm>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      id: '',
      name: '',
      type: 'Student',
      location: '',
      experience: '',
      bio: '',
      skills: [{ value: '' }],
      interests: [{ value: '' }],
      languages: [{ value: '' }],
      links: { email: '', linkedin: '' },
      workExperience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' }],
      avatarUrl: '',
    },
    mode: 'onBlur',
  });
  
  const membershipId = form.watch('id');

  const checkIdValidity = useCallback(debounce(async (id: string) => {
    if (!id || id.trim().length < 5) {
      setIdStatus('idle');
      return;
    }
    setIdStatus('loading');
    try {
      const response = await fetch(`/api/verify-id?id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (data.isValid) {
        setIdStatus('valid');
        form.clearErrors('id');
      } else {
        setIdStatus('invalid');
        form.setError('id', { type: 'manual', message: 'This Membership ID is not valid or does not exist.' });
      }
    } catch (error) {
      console.error('ID validation failed:', error);
      setIdStatus('invalid');
      form.setError('id', { type: 'manual', message: 'Could not verify ID. Please check your connection.' });
    }
  }, 500), [form]);

  useEffect(() => {
    if (membershipId) {
      checkIdValidity(membershipId);
    } else {
      setIdStatus('idle');
    }
  }, [membershipId, checkIdValidity]);


  const { fields: skillFields, add: addSkill, remove: removeSkill } = useDynamicFields(form, 'skills');
  const { fields: interestFields, add: addInterest, remove: removeInterest } = useDynamicFields(form, 'interests');
  const { fields: languageFields, add: addLanguage, remove: removeLanguage } = useDynamicFields(form, 'languages');
  const { fields: expFields, add: addExp, remove: removeExp } = useDynamicFields(form, 'workExperience');
  const { fields: eduFields, add: addEdu, remove: removeEdu } = useDynamicFields(form, 'education');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const apiKey = '58bcdc0482981150fadb03eb2d91b2dc';
    
    const formData = new FormData();
    formData.append('image', file);
    setUploadStatus('Uploading...');

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = data.data.url;
        setUploadStatus('Upload successful!');
        setPreviewUrl(imageUrl);
        form.setValue('avatarUrl', imageUrl);
        toast({
          title: 'Image Uploaded',
          description: 'Your profile picture has been successfully uploaded.',
        });
      } else {
        throw new Error(data.error?.message || 'Unknown upload error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setUploadStatus(`Error: ${errorMessage}`);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: errorMessage,
      });
    }
  };
  
  const onSubmit = async (data: UserProfileForm) => {
    setIsSubmitting(true);
    
    if (idStatus !== 'valid') {
        toast({
            variant: 'destructive',
            title: 'Invalid Membership ID',
            description: 'Please enter a valid Membership ID before saving.',
        });
        setIsSubmitting(false);
        return;
    }

    const payload = {
      membershipId: data.id,
      name: data.name,
      experience: data.experience,
      bio: data.bio,
      email: data.links?.email || '',
      linkedin: data.links?.linkedin || '',
      avatarUrl: data.avatarUrl,
      skills: JSON.stringify(data.skills?.map(s => s.value).filter(Boolean)),
      interests: JSON.stringify(data.interests?.map(i => i.value).filter(Boolean)),
      languages: JSON.stringify(data.languages?.map(l => l.value).filter(Boolean)),
      workExperience: JSON.stringify(data.workExperience?.filter(exp => exp.title || exp.company)),
      education: JSON.stringify(data.education?.filter(edu => edu.school || edu.degree)),
    };
    
    try {
      const response = await fetch('/api/create-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save profile.');
      }

      if (result.status === "error" && result.message.includes("already exists")) {
         toast({
            variant: 'destructive',
            title: 'Profile Already Exists',
            description: 'A profile with this Membership ID has already been created.',
         });
      } else if (result.status === "success") {
        toast({
          title: 'Profile Submitted!',
          description: 'Your profile has been submitted for review! Our Team will Review and make a Profile for you!',
        });
        form.reset();
        setPreviewUrl('');
        setIdStatus('idle');
      } else {
        throw new Error(result.message || 'An unexpected response was received from the server.');
      }

    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mt-4">Create Your Profile</CardTitle>
            <CardDescription className="mt-1 text-base">
              Fill in your details to build a professional profile that stands out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Info Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="membershipId">Membership ID</Label>
                  <div className="relative">
                    <Input id="membershipId" {...form.register('id')} placeholder="Enter the ID you received upon registration" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {idStatus === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                        {idStatus === 'valid' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {idStatus === 'invalid' && <XCircle className="h-5 w-5 text-destructive" />}
                    </div>
                  </div>
                  {form.formState.errors.id && <p className="text-sm text-destructive">{form.formState.errors.id.message}</p>}
                  <p className="text-xs text-muted-foreground">
                    A Membership ID is required to create a profile. If you don't have one,{' '}
                    <Link href="/membership#membership-join" className="text-primary underline font-semibold">get one for free</Link>.
                  </p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...form.register('name')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="experience">Professional Headline</Label>
                        <Input id="experience" {...form.register('experience')} placeholder="e.g., Clinical Optometrist | Myopia Control Specialist" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="bio">About / Bio</Label>
                    <Textarea id="bio" {...form.register('bio')} rows={5} placeholder="Share your professional story, goals, and passions..." />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...form.register('links.email')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn / Website URL</Label>
                        <Input id="linkedin" {...form.register('links.linkedin')} />
                    </div>
                </div>
              </section>

              {/* Avatar Upload */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Profile Picture</h3>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <Image src={previewUrl} alt="Profile preview" width={96} height={96} className="object-cover w-full h-full" />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-grow">
                     <Label htmlFor="avatarUpload" className="block mb-2">Upload an Image</Label>
                    <Input id="avatarUpload" type="file" accept="image/*" onChange={handleImageUpload} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                    {uploadStatus && <p className="text-sm text-muted-foreground mt-2">{uploadStatus}</p>}
                    <input type="hidden" {...form.register('avatarUrl')} />
                  </div>
                </div>
              </section>
              
              {/* Dynamic Fields: Skills */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Skills</h3>
                {skillFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input {...form.register(`skills.${index}.value`)} placeholder="e.g., Scleral Lens Fitting" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)} disabled={skillFields.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addSkill({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Skill</Button>
              </section>

               {/* Dynamic Fields: Interests */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Interests</h3>
                {interestFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input {...form.register(`interests.${index}.value`)} placeholder="e.g., AI in Healthcare" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeInterest(index)} disabled={interestFields.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addInterest({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Interest</Button>
              </section>

               {/* Dynamic Fields: Languages */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Languages</h3>
                {languageFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input {...form.register(`languages.${index}.value`)} placeholder="e.g., English (Professional)" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLanguage(index)} disabled={languageFields.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addLanguage({ value: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Language</Button>
              </section>

              {/* Dynamic Fields: Work Experience */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Work Experience</h3>
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-3 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input {...form.register(`workExperience.${index}.title`)} placeholder="Job Title" />
                        <Input {...form.register(`workExperience.${index}.company`)} placeholder="Company" />
                        <Input {...form.register(`workExperience.${index}.startDate`)} placeholder="Start Date (e.g., Jan 2020)" />
                        <Input {...form.register(`workExperience.${index}.endDate`)} placeholder="End Date (e.g., Present)" />
                    </div>
                    <Textarea {...form.register(`workExperience.${index}.description`)} placeholder="Description..." />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1" onClick={() => removeExp(index)} disabled={expFields.length === 1}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addExp({ title: '', company: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Experience</Button>
              </section>
              
              {/* Dynamic Fields: Education */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Education</h3>
                {eduFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-md space-y-3 relative">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input {...form.register(`education.${index}.school`)} placeholder="School / University" />
                        <Input {...form.register(`education.${index}.degree`)} placeholder="Degree (e.g., B.Sc. Optometry)" />
                        <Input {...form.register(`education.${index}.fieldOfStudy`)} placeholder="Field of Study" />
                         <div className="flex gap-2">
                           <Input {...form.register(`education.${index}.startYear`)} placeholder="Start Year" />
                           <Input {...form.register(`education.${index}.endYear`)} placeholder="End Year" />
                        </div>
                     </div>
                    <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1" onClick={() => removeEdu(index)} disabled={eduFields.length === 1}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addEdu({ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' })}><PlusCircle className="mr-2 h-4 w-4" />Add Education</Button>
              </section>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || idStatus !== 'valid'}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
