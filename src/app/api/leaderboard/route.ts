
import { NextResponse } from 'next/server';
import { allUsers } from '@/lib/data';

// IMPORTANT: This must be the URL of your deployed Google Apps Script.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJGaDf-xT9XnI49HmKdktKrxti3N5cxKGGfJZEUAZQCaGvPCJR9iR00FnbqqGbo6bhdw/exec';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export async function GET(request: Request) {
  try {
    const response = await fetch(SCRIPT_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard from Google Script: ${response.statusText}`);
    }

    const scriptData: any[] = await response.json();

    const leaderboard = scriptData.map((row, index) => {
        const userProfile = allUsers.find(u => u.id === row.MembershipID);
        const score = parseFloat(row.OverallPercentage) * 100;
        
        return {
            rank: index + 1,
            name: userProfile?.name || row.MembershipID,
            avatar: userProfile?.avatarUrl || '',
            score: Math.round(score),
            time: formatTime(row['TotalTimeTaken (Seconds)']),
        };
    });
    
    return NextResponse.json(leaderboard);

  } catch (error) {
    console.error("API Error fetching leaderboard:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
