
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Membership ID is required' }, { status: 400 });
  }

  // IMPORTANT: This is your actual Google Apps Script URL for verification
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzUsC2yxSAzkIEmr83AFYPaAH6o_sgSJjhLtzgYB8EKKGpKSkh5E9XEVm7RIIcioA7t/exec';
  
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
