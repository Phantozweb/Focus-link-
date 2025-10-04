
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/lib/submitted-profiles.json');

export async function POST(request: Request) {
  try {
    const newProfile = await request.json();

    if (!newProfile || !newProfile.id) {
      return NextResponse.json({ message: 'Invalid profile data' }, { status: 400 });
    }

    let submissions = [];
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (error) {
      // If the file doesn't exist or is empty, start with an empty array
      console.log('Submitted profiles file not found or empty, creating a new one.');
    }

    // Add the new profile and write back to the file
    submissions.push(newProfile);
    await fs.writeFile(dataFilePath, JSON.stringify(submissions, null, 2));

    return NextResponse.json({ message: 'Profile submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const submissions = JSON.parse(fileContent);
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error reading submissions:', error);
    // If file doesn't exist, return empty array
    return NextResponse.json([], { status: 200 });
  }
}
