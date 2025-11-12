
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
        setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
      } catch (error) {
        console.error("Invalid date string for TimeAgo:", dateString);
        setTimeAgo('Invalid date');
      }
    }
  }, [dateString]);

  return <span>{timeAgo}</span>;
}
