
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BellRing, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { demoJobs } from '@/lib/jobs';

interface NotificationSettingsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (preferences: Record<string, boolean>) => void;
}

const initialPreferences = {
  webinars: true,
  jobs: true,
  forum: false,
};

export function NotificationSettings({
  isOpen,
  onOpenChange,
  onSave,
}: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, [isOpen]);

  const handleSwitchChange = (id: keyof typeof preferences, checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [id]: checked }));
  };

  const showDemoNotification = () => {
    const demoJob = demoJobs[0];
    const title = 'New Job Posting!';
    const options = {
      body: `${demoJob.title} at ${demoJob.company}`,
      icon: '/logo.png',
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    } else {
        // Fallback for environments without a service worker
        new Notification(title, options);
    }
  };


  const handleSave = async () => {
    setIsSaving(true);
    
    if (typeof window === 'undefined' || !('Notification' in window)) {
        toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: 'This browser does not support desktop notifications.',
        });
        setIsSaving(false);
        onOpenChange(false);
        return;
    }
    
    let currentPermission = permission;
    
    if (currentPermission === 'default') {
      currentPermission = await Notification.requestPermission();
      setPermission(currentPermission);
    }
    
    if (currentPermission === 'denied') {
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: 'Please enable notifications in your browser settings to subscribe.',
      });
    } else if (currentPermission === 'granted') {
      onSave(preferences);
      toast({
        title: 'Permissions Granted!',
        description: "You're all set to receive notifications for new updates.",
      });

      // Show a demo notification if the user opted in
      if (preferences.jobs || preferences.webinars || preferences.forum) {
        setTimeout(() => {
            try {
                const title = 'Focus Links Test';
                const options = {
                    body: 'This is a test notification to confirm you are subscribed!',
                    icon: '/logo.png' // Make sure you have a logo.png in your public folder
                };
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification(title, options);
                    });
                } else {
                    // This is a fallback and might trigger the "Illegal constructor" in some strict environments,
                    // but it's the only option without a service worker.
                    new Notification(title, options);
                }
            } catch (e) {
                console.error("Could not show notification:", e);
                // Optionally inform the user that the test notification failed but settings are saved.
                 toast({
                    variant: 'destructive',
                    title: 'Test Notification Failed',
                    description: 'Could not display a test notification, but your preferences are saved.',
                });
            }
        }, 2000);
      }
    }
    
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BellRing className="h-6 w-6" />
            Notification Preferences
          </DialogTitle>
          <DialogDescription>
            Choose what you want to be notified about. We'll send you a browser notification for important updates.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {permission === 'denied' && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/90 rounded-md">
                You have blocked notifications. To receive alerts, you need to enable permissions in your browser settings.
            </div>
          )}
          <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border">
            <Label htmlFor="webinars-switch" className="flex flex-col space-y-1">
              <span>Webinars & Events</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get notified about upcoming live sessions and academy events.
              </span>
            </Label>
            <Switch
              id="webinars-switch"
              checked={preferences.webinars}
              onCheckedChange={(checked) => handleSwitchChange('webinars', checked)}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border">
            <Label htmlFor="jobs-switch" className="flex flex-col space-y-1">
              <span>New Job Postings</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive alerts for new job opportunities in your field.
              </span>
            </Label>
            <Switch
              id="jobs-switch"
              checked={preferences.jobs}
              onCheckedChange={(checked) => handleSwitchChange('jobs', checked)}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 rounded-lg border">
            <Label htmlFor="forum-switch" className="flex flex-col space-y-1">
              <span>Forum & Discussions</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get alerts for replies to your posts and trending topics.
              </span>
            </Label>
            <Switch
              id="forum-switch"
              checked={preferences.forum}
              onCheckedChange={(checked) => handleSwitchChange('forum', checked)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
