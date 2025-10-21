
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: Replace this with your actual Google Apps Script URL
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwqEoTXDLXbfPzRic-JFfFiaT0sYJOLh0YeNpR2VzXglze_jcsxklB4CBuasEJJTIYm4g/exec";
  
  try {
    const data = await request.json();

    // The AI profile creation doesn't have an email pre-check, so we go straight to POST
    const postResponse = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    });

     // Check if the response from Google is okay before parsing
    if (!postResponse.ok) {
        const errorText = await postResponse.text();
        console.error('Google Apps Script (POST) returned an error:', errorText);
        return NextResponse.json({ result: 'error', message: 'Error submitting data to Google Sheets.' }, { status: postResponse.status });
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
