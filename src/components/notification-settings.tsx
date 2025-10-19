
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
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, [isOpen]);

  const handleSwitchChange = (id: keyof typeof preferences, checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
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

