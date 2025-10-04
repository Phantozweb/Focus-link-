
import { NextResponse } from 'next/server';

// This API route is no longer used for form submissions,
// as Netlify Forms will handle it directly. This file can be removed
// or kept as a placeholder. We will respond with a 405 Method Not Allowed
// to indicate this endpoint doesn't handle POST requests anymore.

export async function POST(request: Request) {
  return NextResponse.json(
    { message: 'This form is now handled by Netlify Forms.' },
    { status: 405 }
  );
}

// A GET endpoint might be useful for other purposes later,
// but for now, it can also indicate it's not in use.
export async function GET() {
    return NextResponse.json({ message: "This endpoint is not configured for GET requests." }, { status: 405 });
}
