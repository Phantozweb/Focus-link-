
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: This is your actual Google Apps Script URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycby-2FKK9TD_UwJ0ZlX2gsYkL9YYjCeqLjMdvQbE46s3qR6LkCKjOdTjhpCf6cyUJfHm/exec";
  
  try {
    const data = await request.json();

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

    let result;
    try {
        // The script should return JSON for business logic results (success, exists, invalid_id)
        result = JSON.parse(resultText);
    } catch (e) {
        // This handles cases where the script might return plain text on success.
        // We'll treat it as a generic success but log a warning.
        console.warn("Apps Script returned non-JSON response:", resultText);
        return NextResponse.json({ result: 'success', message: 'Profile created, but script response format was unexpected.' });
    }
    
    // Forward the structured JSON response from the script to the client.
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
