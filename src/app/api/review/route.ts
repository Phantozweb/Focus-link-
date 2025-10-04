
import { NextResponse } from 'next/server';

// This API route is no longer used and can be safely deleted.
// It is being replaced by the /api/verify endpoint and a manual
// data entry workflow that is compatible with serverless environments.

export async function POST(request: Request) {
  return NextResponse.json(
    { message: 'This endpoint is deprecated.' },
    { status: 410 }
  );
}
