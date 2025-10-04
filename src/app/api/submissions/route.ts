
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// NOTE: This file is being repurposed to automatically add members.
// The concept of "submissions" for review is removed.
// For a production app, a proper database should be used to avoid race conditions.

const membersFilePath = path.join(process.cwd(), 'src/lib/members.json');

export async function POST(request: Request) {
  try {
    const newMember = await request.json();

    if (!newMember || !newMember.id) {
      return NextResponse.json({ message: 'Invalid member data' }, { status: 400 });
    }

    let members = [];
    try {
      const fileContent = await fs.readFile(membersFilePath, 'utf-8');
      members = JSON.parse(fileContent);
    } catch (error) {
      // If the file doesn't exist or is empty, start with an empty array
      console.log('Members file not found or empty, creating a new one.');
    }

    // Assign a unique numeric ID
    const newId = members.length > 0 ? Math.max(...members.map((m: any) => parseInt(m.id, 10))) + 1 : 1;
    newMember.id = String(newId);
    newMember.verified = false; // Default verification status

    members.push(newMember);
    await fs.writeFile(membersFilePath, JSON.stringify(members, null, 2));

    return NextResponse.json({ message: 'Membership successful!', memberId: newMember.id }, { status: 200 });
  } catch (error) {
    console.error('Error processing membership:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// This GET endpoint is no longer for "submissions" but could be adapted if needed.
// The admin panel will use a different endpoint to get all members.
export async function GET() {
    return NextResponse.json({ message: "This endpoint is for POSTing new members." }, { status: 405 });
}
