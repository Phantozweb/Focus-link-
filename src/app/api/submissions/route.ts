// This file is no longer needed as submissions are now handled
// by a Google Apps Script. It can be safely deleted.
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json(
    { message: 'This endpoint is deprecated and no longer in use.' },
    { status: 410 }
  );
}
