
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
        throw new Error('The submission service returned an unexpected response. Please try again later.');
    }


    if (!response.ok) {
        console.error('Google Apps Script returned an error:', result);
        throw new Error(result.message || 'Error submitting to Google Sheet.');
    }

    // The Apps Script should return a clear success or error/exists status.
    // e.g., { result: 'success' } or { result: 'exists' }
    if (result.result === 'success') {
        return NextResponse.json({ result: 'success' });
    } else if (result.result === 'exists') {
         return NextResponse.json({ exists: true });
    } else {
        // If the script returns a 200 OK but doesn't have result:'success' or result:'exists'
        // it might be an unhandled case in the script. We'll treat it as an error.
        console.error("Unknown successful response from Apps Script:", result);
        throw new Error(result.message || 'An unknown error occurred during submission.');
    }

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ result: 'error', message: errorMessage }, { status: 500 });
  }
}
