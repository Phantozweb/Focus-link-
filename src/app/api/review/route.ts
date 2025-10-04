
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const submittedPath = path.join(process.cwd(), 'src/lib/submitted-profiles.json');
const approvedPath = path.join(process.cwd(), 'src/lib/approved-profiles.json');
const mainDataPath = path.join(process.cwd(), 'src/lib/data.ts'); // Path to the main data file

async function readJsonFile(filePath: string) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If file doesn't exist or is empty, return an empty array
        return [];
    }
}

export async function POST(request: Request) {
  try {
    const { profileId, action } = await request.json();

    if (!profileId || !action) {
      return NextResponse.json({ message: 'Missing profileId or action' }, { status: 400 });
    }

    const submittedProfiles = await readJsonFile(submittedPath);
    const approvedProfiles = await readJsonFile(approvedPath);
    
    const profileIndex = submittedProfiles.findIndex((p: any) => p.id === profileId);

    if (profileIndex === -1) {
      return NextResponse.json({ message: 'Profile not found in submissions' }, { status: 404 });
    }

    const [profileToReview] = submittedProfiles.splice(profileIndex, 1);

    if (action === 'approve') {
      approvedProfiles.push(profileToReview);
      
      // WARNING: This is a hacky way to update the main data file for demonstration.
      // This is NOT safe for production as it can lead to race conditions.
      // A proper database should be used.
      try {
        let mainDataContent = await fs.readFile(mainDataPath, 'utf-8');
        
        // Find the `export const users: UserProfile[] = [` line
        const usersArrayRegex = /(export const users: UserProfile\[\] = )(\[[\s\S]*?\])/;
        const match = mainDataContent.match(usersArrayRegex);

        if (match && match[2]) {
            let usersArrayStr = match[2];
            // Remove the closing bracket, add the new profile, and add the bracket back
            usersArrayStr = usersArrayStr.trim().slice(0, -1);
            
            const newProfileStr = JSON.stringify(profileToReview, null, 2);

            // Add a comma if the array is not empty
            if (usersArrayStr.trim() !== '[') {
                 usersArrayStr += ',\n';
            }
            
            usersArrayStr += newProfileStr + '\n];';
            
            mainDataContent = mainDataContent.replace(usersArrayRegex, `$1${usersArrayStr}`);

            await fs.writeFile(mainDataPath, mainDataContent);
        } else {
             console.error("Could not find `users` array in src/lib/data.ts to update.");
        }
      } catch (e) {
        console.error("Failed to update src/lib/data.ts:", e);
        // Even if this fails, proceed with updating the JSON files.
      }


    }
    // For 'reject', we just don't add it to the approved list.

    await fs.writeFile(submittedPath, JSON.stringify(submittedProfiles, null, 2));
    await fs.writeFile(approvedPath, JSON.stringify(approvedProfiles, null, 2));

    return NextResponse.json({ message: `Profile ${action}d successfully` }, { status: 200 });

  } catch (error) {
    console.error('Error processing review:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

