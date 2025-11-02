
import { NextResponse } from 'next/server';
import { allUsers } from '@/lib/data';

// IMPORTANT: This must be the URL of your deployed Google Apps Script.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzjQxDtM0oZ9hM68Lw593ZZL9YdLz-o4wJONvFAp5krz3A8xyNB1qGPttjh6C2d_JbLjg/exec';

const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) {
        return '00:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const dynamic = 'force-dynamic'; // Ensures the route is always dynamic

export async function GET(request: Request) {
  try {
    const response = await fetch(SCRIPT_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store', // Disable caching to get fresh data
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Script Error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to fetch leaderboard from Google Script. Please ensure the script is deployed and permissions are set to "Anyone".`);
    }

    const scriptData: any[] = await response.json();

    if (!Array.isArray(scriptData)) {
      throw new Error("Invalid data format received from Google Script. Expected an array.");
    }

    const leaderboard = scriptData
      .map((row, index) => {
          if (!row || typeof row !== 'object' || !row['MembershipID']) return null;

          const userProfile = allUsers.find(u => u.id === row.MembershipID);
          
          const scoreValue = parseFloat(row.OverallPercentage);
          const score = !isNaN(scoreValue) ? Math.round(scoreValue * 100) : 0;
          
          const timeValue = row['TotalTimeTaken (Seconds)'];
          let formattedTime: string;

          if (typeof timeValue === 'number' && !isNaN(timeValue)) {
            formattedTime = formatTime(timeValue);
          } else if (typeof timeValue === 'string') {
            const parsedNumber = parseFloat(timeValue);
            if (!isNaN(parsedNumber)) {
                formattedTime = formatTime(parsedNumber);
            } else {
                // If it's already a formatted string like "19:59", use it directly.
                formattedTime = timeValue;
            }
          } else {
            formattedTime = 'N/A';
          }

          return {
              rank: index + 1,
              name: userProfile?.name || row.Name || row.MembershipID,
              avatar: userProfile?.avatarUrl || '',
              score: score,
              time: formattedTime,
          };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null); // Filter out null entries
    
    return NextResponse.json(leaderboard);

  } catch (error) {
    console.error("API Error fetching leaderboard:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: `Failed to load leaderboard data: ${errorMessage}` }, { status: 500 });
  }
}
