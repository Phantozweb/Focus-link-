
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// For demonstration purposes, this API updates two files.
// In a real application, this would be a single database transaction.
const membersPath = path.join(process.cwd(), 'src/lib/members.json');
const mainDataPath = path.join(process.cwd(), 'src/lib/data.ts');

async function readJsonFile(filePath: string) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        return []; // Return empty array if file doesn't exist
    }
}

async function updateUserVerification(userId: string, verifiedStatus: boolean) {
    // This is a simplified and potentially unsafe way to update the live `data.ts` file.
    // It's for demonstration purposes and not suitable for production due to race conditions.
    try {
        let mainDataContent = await fs.readFile(mainDataPath, 'utf-8');
        
        // This regex is fragile and depends on the exact formatting of the user object.
        const userRegex = new RegExp(`(id:\\s*'${userId.replace(/'/g, "\\'")}',[\\s\\S]*?verified:\\s*)(false|true)`);
        
        const match = mainDataContent.match(userRegex);

        if (match) {
            mainDataContent = mainDataContent.replace(userRegex, `$1${verifiedStatus}`);
            await fs.writeFile(mainDataPath, mainDataContent, 'utf-8');
            console.log(`Updated verification for user ${userId} to ${verifiedStatus} in data.ts`);
        } else {
            console.warn(`User with id ${userId} not found in data.ts for verification update.`);
        }

    } catch (e) {
        console.error(`Failed to update verification status in data.ts for user ${userId}:`, e);
    }
}


export async function POST(request: Request) {
  try {
    const { memberId, action } = await request.json(); // action is 'verify' or 'unverify'

    if (!memberId || !action) {
      return NextResponse.json({ message: 'Missing memberId or action' }, { status: 400 });
    }

    const members = await readJsonFile(membersPath);
    const memberIndex = members.findIndex((m: any) => m.id === memberId);

    if (memberIndex === -1) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }

    const shouldBeVerified = action === 'verify';
    members[memberIndex].verified = shouldBeVerified;
    
    // Also attempt to update the main `users` array in data.ts if the member exists there as a user profile.
    // This connects the 'member' to their public 'profile'.
    await updateUserVerification(memberId, shouldBeVerified);

    await fs.writeFile(membersPath, JSON.stringify(members, null, 2));

    return NextResponse.json({ message: `Member status updated to ${action}` }, { status: 200 });

  } catch (error) {
    console.error('Error processing verification:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
