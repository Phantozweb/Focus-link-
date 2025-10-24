
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

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Apps Script returned an error:', errorText);
        // Try to parse the error as JSON, but fall back to the raw text if it's not.
        try {
          const errorJson = JSON.parse(errorText);
          return NextResponse.json({ result: 'error', message: errorJson.message || 'Error submitting to Google Sheet.' }, { status: response.status });
        } catch (e) {
          return NextResponse.json({ result: 'error', message: 'An unexpected error occurred with the submission service.' }, { status: response.status });
        }
    }

    const result = await response.json();

    // The Apps Script should return a clear success or error/exists status.
    // e.g., { result: 'success' } or { result: 'exists' }
    if (result.result === 'success') {
        return NextResponse.json({ result: 'success' });
    } else if (result.result === 'exists') {
         return NextResponse.json({ exists: true });
    }
     else {
        return NextResponse.json({ result: 'error', message: result.message || 'An unknown error occurred during submission.' }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ result: 'error', message: errorMessage }, { status: 500 });
  }
}
