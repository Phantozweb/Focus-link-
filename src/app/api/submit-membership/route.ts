
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: Replace this with your actual Google Apps Script URL
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwqEoTXDLXbfPzRic-JFfFiaT0sYJOLh0YeNpR2VzXglze_jcsxklB4CBuasEJJTIYm4g/exec";
  
  if (!scriptUrl) {
    console.error('Google Script URL is not defined in environment variables.');
    return NextResponse.json({ result: 'error', message: 'Server configuration error.' }, { status: 500 });
  }
  
  try {
    const data = await request.json();

    // Step 1: Check if email exists by making a GET request to the script
    // Your Apps Script needs to handle GET requests with an 'email' query parameter.
    const checkEmailUrl = `${scriptUrl}?email=${encodeURIComponent(data.email)}`;
    const emailCheckResponse = await fetch(checkEmailUrl, {
        method: 'GET',
        redirect: 'follow',
    });
    
    if (!emailCheckResponse.ok) {
        const errorText = await emailCheckResponse.text();
        console.error('Google Apps Script (GET) returned an error:', errorText);
        return NextResponse.json({ result: 'error', message: 'Error checking email with the database.' }, { status: emailCheckResponse.status });
    }

    const emailCheckResult = await emailCheckResponse.json();

    if (emailCheckResult.exists) {
        return NextResponse.json({ exists: true });
    }

    // Step 2: If email doesn't exist, proceed with submission (POST)
    // Your Apps Script needs to handle POST requests with the full data payload.
    const postResponse = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, action: 'submit' }), // Add an action for routing in Apps Script
        redirect: 'follow',
    });

    if (!postResponse.ok) {
        const errorText = await postResponse.text();
        console.error('Google Apps Script (POST) returned an error:', errorText);
        return NextResponse.json({ result: 'error', message: 'Error submitting data to the database.' }, { status: postResponse.status });
    }

    const postResult = await postResponse.json();

    if (postResult.result === 'success') {
        return NextResponse.json({ result: 'success' });
    } else {
        return NextResponse.json({ result: 'error', message: postResult.message || 'An error occurred during submission.' }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ result: 'error', message: errorMessage }, { status: 500 });
  }
}
