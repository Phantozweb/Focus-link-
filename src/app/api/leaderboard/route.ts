
import { NextResponse } from 'next/server';

// IMPORTANT: This must be the URL of your deployed Google Apps Script.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzjQxDtM0oZ9hM68Lw593ZZL9YdLz-o4wJONvFAp5krz3A8xyNB1qGPttjh6C2d_JbLjg/exec';

export const dynamic = 'force-dynamic'; // Ensures the route is always dynamic

export async function GET(request: Request) {
  try {
    const response = await fetch(SCRIPT_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Script Error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to fetch leaderboard from Google Script.`);
    }

    const scriptData = await response.json();

    if (!Array.isArray(scriptData)) {
      throw new Error("Invalid data format received from Google Script. Expected an array.");
    }
    
    // Just return the raw data. The frontend will handle processing.
    return NextResponse.json(scriptData);

  } catch (error) {
    console.error("API Error fetching leaderboard:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: `Failed to load leaderboard data: ${errorMessage}` }, { status: 500 });
  }
}
