
'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface WebinarTimeProps {
  dateTime: string;
  format?: {
    dateOnly?: boolean;
    timeOnly?: boolean;
  };
  isDetailed?: boolean;
}

export function WebinarTime({ dateTime, format = {}, isDetailed = false }: WebinarTimeProps) {
  const [formatted, setFormatted] = useState<{ date: string; time: string }>({
    date: 'Loading...',
    time: '',
  });

  useEffect(() => {
    try {
      const date = new Date(dateTime);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const formattedDate = new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: userTimeZone,
      }).format(date);
      
      const formattedTime = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: userTimeZone,
      }).format(date);

      setFormatted({ date: formattedDate, time: formattedTime });

    } catch (e) {
      console.error("Invalid date format for webinar:", dateTime);
      setFormatted({ date: 'Invalid Date', time: '' });
    }
  }, [dateTime]);

  if (format.dateOnly) {
    return <span>{formatted.date}</span>;
  }
  
  if (format.timeOnly) {
     return <span>{formatted.time}</span>;
  }

  const Icon = isDetailed ? Calendar : Calendar;
  const TimeIcon = isDetailed ? Clock : Clock;

  return (
    <>
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 text-primary ${isDetailed ? '' : 'h-4 w-4'}`} />
        <span className={isDetailed ? 'font-semibold' : ''}>{formatted.date}</span>
      </div>
      <div className="flex items-center gap-3">
        <TimeIcon className={`h-5 w-5 text-primary ${isDetailed ? '' : 'h-4 w-4'}`} />
        <span className={isDetailed ? 'font-semibold' : ''}>{formatted.time}</span>
      </div>
    </>
  );
}
