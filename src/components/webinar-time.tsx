
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
  isQuiz?: boolean;
}

export function WebinarTime({ dateTime, format = {}, isDetailed = false, isQuiz = false }: WebinarTimeProps) {
  const [formatted, setFormatted] = useState<{ date: string; time: string; quizEndDate?: string }>({
    date: 'Loading...',
    time: '',
  });

  useEffect(() => {
    try {
      const date = new Date(dateTime);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      let formattedDate;
      if (isQuiz && isDetailed) {
        // Special formatting for the quiz
        const endDate = new Date(date.getTime() + 10 * 24 * 60 * 60 * 1000); // Add 10 days
        const startDateString = new Intl.DateTimeFormat(undefined, {
            day: 'numeric',
            month: 'long',
        }).format(date);
        const endDateString = new Intl.DateTimeFormat(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(endDate);
        formattedDate = `${startDateString} - ${endDateString}`;
        setFormatted({ date: formattedDate, time: 'Online Event' });
        return;
      } else {
         formattedDate = new Intl.DateTimeFormat(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: userTimeZone,
        }).format(date);
      }
      
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
  }, [dateTime, isQuiz, isDetailed]);

  if (format.dateOnly) {
    // For Eye Q Arena, display the year as 2025
    if (isQuiz) {
        return <span>November 2, 2025</span>;
    }
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
      {!isQuiz && (
        <div className="flex items-center gap-3">
            <TimeIcon className={`h-5 w-5 text-primary ${isDetailed ? '' : 'h-4 w-4'}`} />
            <span className={isDetailed ? 'font-semibold' : ''}>{formatted.time}</span>
        </div>
      )}
    </>
  );
}
