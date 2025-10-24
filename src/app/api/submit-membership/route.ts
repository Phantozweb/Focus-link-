
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzpxTTUokGUhshRGb5a0jUaXMUi0RVNfIRxqfs1bBQGRVEbS15rDReIeBFxL13dM31-/exec";
  
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
    
    // If the Google Script returns a non-200 status, it's an error (e.g., rate limit).
    // The error message from the script is in the response body.
    if (!response.ok) {
        // Forward the error message from the script to the client.
        return NextResponse.json({ message: resultText }, { status: response.status });
    }

    // If the script returns a 200 OK, parse the JSON to check for business logic results.
    let result;
    try {
        result = JSON.parse(resultText);
    } catch (e) {
        console.error('Google Apps Script returned non-JSON response:', resultText);
        return NextResponse.json({ message: 'The submission service returned an unexpected response.' }, { status: 502 });
    }

    if (result.result === 'success') {
        return NextResponse.json({ result: 'success' });
    } else if (result.result === 'exists') {
         return NextResponse.json({ exists: true });
    } else {
        // Handle unexpected successful responses from the script
        console.error("Unknown successful response from Apps Script:", result);
        return NextResponse.json({ message: result.message || 'An unknown error occurred during submission.' }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
