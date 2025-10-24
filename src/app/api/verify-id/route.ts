
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Membership ID is required' }, { status: 400 });
  }

  // IMPORTANT: Replace this placeholder with the actual URL of your Google Apps Script for verification
  const scriptUrl = 'YOUR_GOOGLE_APP_SCRIPT_URL_FOR_VERIFICATION';
  
  if (scriptUrl === 'YOUR_GOOGLE_APP_SCRIPT_URL_FOR_VERIFICATION') {
      console.error("Verification script URL is not set.");
      // In a real scenario, you might want to return an error or have a default behavior
      // For this demo, we'll return invalid to prevent submissions without a real check.
      return NextResponse.json({ isValid: false, error: "Verification service not configured." });
  }

  try {
    const validationResponse = await fetch(`${scriptUrl}?id=${encodeURIComponent(id)}`, {
        method: 'GET',
        redirect: 'follow',
    });

    if (!validationResponse.ok) {
      throw new Error(`Google Script execution failed with status: ${validationResponse.statusText}`);
    }

    const result = await validationResponse.json();
    
    return NextResponse.json({ isValid: result.isValid });

  } catch (error) {
    console.error('API Route Error during ID verification:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ isValid: false, error: errorMessage }, { status: 500 });
  }
}
