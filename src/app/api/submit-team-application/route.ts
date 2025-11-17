
import { NextResponse } from 'next/server';

// IMPORTANT: Create a new Google Apps Script and paste the script from the comment below.
// Deploy it as a web app, and replace this URL with your script URL.
const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

export async function POST(request: Request) {
  if (SCRIPT_URL === "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec") {
    return NextResponse.json(
      { error: "Google Apps Script URL is not configured." },
      { status: 500 }
    );
  }
  
  try {
    const data = await request.json();

    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        redirect: 'follow',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "An error occurred with the submission script.");
    }
    
    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Team Application API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 500 });
  }
}

/**
 * --- Google Apps Script for Team Applications ---
 *
 * 1. Create a new Google Sheet. Name the first tab "TeamApplications".
 * 2. Set the following headers in the first row:
 *    Timestamp, Name, Email, LinkedIn, Role, Skills, Contribution
 * 3. In the Google Sheet, go to Extensions > Apps Script.
 * 4. Paste this entire script and save.
 * 5. Click "Deploy" > "New deployment".
 * 6. For "Select type", choose "Web app".
 * 7. In the configuration:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy".
 * 9. Authorize the script when prompted.
 * 10. Copy the Web app URL and paste it into the SCRIPT_URL constant above.
 *
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TeamApplications");
 *     if (!sheet) {
 *       sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("TeamApplications");
 *       sheet.appendRow(["Timestamp", "Name", "Email", "LinkedIn", "Role", "Skills", "Contribution"]);
 *     }
 * 
 *     var data = JSON.parse(e.postData.contents);
 * 
 *     sheet.appendRow([
 *       data.timestamp || new Date().toISOString(),
 *       data.name,
 *       data.email,
 *       data.linkedin,
 *       data.role,
 *       data.skills,
 *       data.contribution
 *     ]);
 * 
 *     return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *       
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 */
