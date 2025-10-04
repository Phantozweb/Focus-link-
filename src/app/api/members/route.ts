
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const membersFilePath = path.join(process.cwd(), 'src/lib/members.json');

// This API route is for the admin panel to fetch all members.
export async function GET() {
  try {
    const fileContent = await fs.readFile(membersFilePath, 'utf-8');
    const members = JSON.parse(fileContent);
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    // If file doesn't exist, it means no members have joined yet.
    return NextResponse.json([], { status: 200 });
  }
}
