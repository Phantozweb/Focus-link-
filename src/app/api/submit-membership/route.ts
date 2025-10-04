
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwqEoTXDLXbfPzRic-JFfFiaT0sYJOLh0YeNpR2VzXglze_jcsxklB4CBuasEJJTIYm4g/exec";
  
  try {
    const data = await request.json();

    // Step 1: Check if email exists by making a GET request to the script
    const checkEmailUrl = `${scriptUrl}?email=${encodeURIComponent(data.email)}`;
    const emailCheckResponse = await fetch(checkEmailUrl, {
        method: 'GET',
        redirect: 'follow',
    });

    const emailCheckResult = await emailCheckResponse.json();

    if (emailCheckResult.exists) {
        return NextResponse.json({ exists: true });
    }

    // Step 2: If email doesn't exist, proceed with submission (POST)
    const postResponse = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    });

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
