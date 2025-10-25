
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: This is your actual Google Apps Script URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycby-2FKK9TD_UwJ0ZlX2gsYkL9YYjCeqLjMdvQbE46s3qR6LkCKjOdTjhpCf6cyUJfHm/exec";
  
  try {
    const data = await request.json();

    // The frontend should prevent this, but as a safeguard:
    if (!data.membershipId) {
      return NextResponse.json({ status: "error", message: "Membership ID is required." }, { status: 400 });
    }

    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    });

    const resultText = await response.text();
    
    if (!response.ok) {
        // If the script itself throws an error (e.g. rate limit), forward it.
        return NextResponse.json({ message: resultText || "An error occurred with the submission script." }, { status: response.status });
    }

    // The script now returns a standard JSON object with a 'status' field.
    const result = JSON.parse(resultText);
    
    // Forward the structured JSON response from the script to the client.
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 500 });
  }
}
