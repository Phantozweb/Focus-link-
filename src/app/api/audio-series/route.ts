import { NextResponse } from 'next/server';

const AUDIO_SERIES_URL = "https://focuscast.netlify.app/data/series.json";

export async function GET() {
  try {
    const response = await fetch(AUDIO_SERIES_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch audio series: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching audio series:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
