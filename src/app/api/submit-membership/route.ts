
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: This is your actual Google Apps Script URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzpxTTUokGUhshRGb5a0jUaXMUi0RVNfIRxqfs1bBQGRVEbS15rDReIeBFxL13dM31-/exec";
  
  try {
    const data = await request.json();

    // The Apps Script should handle both email checking and data submission.
    // We send all data in a single POST request.
    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow', // Important for Google Apps Scripts
    });

    const resultText = await response.text();
    let result;
    try {
        result = JSON.parse(resultText);
    } catch (e) {
        // If the response is not JSON, it's likely an error page from Google.
        console.error('Google Apps Script returned non-JSON response:', resultText);
        return NextResponse.json({ message: 'The submission service returned an unexpected response.' }, { status: 502 });
    }


    if (!response.ok) {
        // This case handles network-level errors (e.g., 500 from Apps Script)
        console.error('Google Apps Script returned a server error:', result);
        return NextResponse.json({ message: result.message || 'Error submitting to Google Sheet.' }, { status: response.status });
    }

    // The Apps Script should return a clear success or error/exists status.
    // e.g., { "result": "success" } or { "result": "exists" }
    // We return a 200 OK for both successful data entry and for a detected duplicate.
    if (result.result === 'success') {
        return NextResponse.json({ result: 'success' });
    } else if (result.result === 'exists') {
         return NextResponse.json({ exists: true });
    } else {
        // If the script returns a 200 OK but doesn't have a recognized result,
        // it might be an unhandled case in the script. We treat it as an application-level error.
        console.error("Unknown successful response from Apps Script:", result);
        return NextResponse.json({ message: result.message || 'An unknown error occurred during submission.' }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
