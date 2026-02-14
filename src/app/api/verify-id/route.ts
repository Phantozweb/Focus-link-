
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The URL for the Google Apps Script that handles ID verification
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwI2FYx1p9hP0c3vhsxG1k35vj2_G0fmc9Iu-Nlcs2-H2s4DDLpDC0T2LcsdJws4Ko/exec';

/**
 * Handles GET requests to verify a membership ID.
 * It forwards the ID to a Google Apps Script which checks for its validity in a Google Sheet.
 * @param {NextRequest} request - The incoming request, expected to have an 'id' query parameter.
 * @returns {NextResponse} - A JSON response indicating whether the ID is valid.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ isValid: false, message: 'Membership ID is required.' }, { status: 400 });
  }

  // Construct the URL for the Google Apps Script, including the ID as a query parameter.
  const verificationUrl = `${SCRIPT_URL}?id=${encodeURIComponent(id)}`;

  try {
    // Make a request to the Google Apps Script.
    const response = await fetch(verificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If the script itself returns an error, forward that.
      const errorText = await response.text();
      console.error(`Google Apps Script error: ${errorText}`);
      return NextResponse.json({ isValid: false, message: `Verification service failed with status: ${response.status}` }, { status: 502 }); // Bad Gateway
    }

    // The Apps Script is expected to return a JSON object, e.g., { isValid: true } or { isValid: false, message: "..." }
    const result = await response.json();

    // Return the result from the Apps Script to the client.
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error contacting verification service:', error);
    return NextResponse.json({ isValid: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
