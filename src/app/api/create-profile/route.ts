
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: Replace this with your actual Google Apps Script URL
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
        return NextResponse.json({ message: resultText || "An error occurred with the submission script." }, { status: response.status });
    }

    let result;
    try {
        result = JSON.parse(resultText);
    } catch (e) {
        // If the script returns plain text on success, treat it as a success.
        return NextResponse.json({ result: 'success' });
    }
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
