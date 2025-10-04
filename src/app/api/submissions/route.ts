
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// NOTE: This file is for auto-registering members.
// For a production app, a proper database should be used to avoid race conditions.

const membersFilePath = path.join(process.cwd(), 'src/lib/members.json');

async function getMembers() {
    try {
        await fs.access(membersFilePath);
        const fileContent = await fs.readFile(membersFilePath, 'utf-8');
        // If file is empty, JSON.parse will fail.
        if (fileContent.trim() === '') {
            return [];
        }
        return JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist, return an empty array.
        return [];
    }
}

export async function POST(request: Request) {
  try {
    const newMemberData = await request.json();

    if (!newMemberData || !newMemberData.email) {
      return NextResponse.json({ message: 'Invalid member data submitted.' }, { status: 400 });
    }

    const members = await getMembers();

    // Check if member already exists
    const existingMember = members.find((m: any) => m.email === newMemberData.email);
    if (existingMember) {
        return NextResponse.json({ message: 'A member with this email already exists.' }, { status: 409 });
    }

    // Assign a unique numeric ID
    const newId = members.length > 0 ? Math.max(...members.map((m: any) => parseInt(m.id, 10))) + 1 : 1;
    
    const newMember = {
      ...newMemberData,
      id: String(newId),
      verified: false, // Default verification status
    };

    members.push(newMember);
    await fs.writeFile(membersFilePath, JSON.stringify(members, null, 2));

    return NextResponse.json({ message: 'Membership successful!', memberId: newMember.id }, { status: 200 });

  } catch (error) {
    console.error('Error processing membership:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// This GET endpoint is not used by the form but is kept for consistency.
export async function GET() {
    return NextResponse.json({ message: "This endpoint is for POSTing new members." }, { status: 405 });
}
