
'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface TimeAgoProps {
  dateString: string;
}

export function TimeAgo({ dateString }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (dateString) {
      try {
        const date = new Date(dateString);
        // Check if the date is valid before formatting
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date object");
        }
        setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
      } catch (error) {
        // We will no longer log this to the console to prevent error overlays.
        setTimeAgo('Invalid date');
      }
    }
  }, [dateString]);

  return <span>{timeAgo}</span>;
}

