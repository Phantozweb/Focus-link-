import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // IMPORTANT: Replace this with your actual Google Apps Script URL for logging quiz entries.
  const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
  
  try {
    const { membershipId } = await request.json();

    if (!membershipId) {
      return NextResponse.json({ status: "error", message: "Membership ID is required." }, { status: 400 });
    }
    
    const payload = {
        timestamp: new Date().toISOString(),
        membershipId: membershipId,
    };

    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
    });

    const resultText = await response.text();
    
    if (!response.ok) {
        return NextResponse.json({ message: resultText || "An error occurred with the submission script." }, { status: response.status });
    }

    const result = JSON.parse(resultText);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 500 });
  }
}

/**
 * --- Google Apps Script (Code.gs) ---
 *
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("QuizEntries");
 *     if (!sheet) {
 *       sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("QuizEntries");
 *       sheet.appendRow(["Timestamp", "MembershipID"]);
 *     }
 * 
 *     var data = JSON.parse(e.postData.contents);
 *     var timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
 *     var membershipId = data.membershipId;
 * 
 *     sheet.appendRow([timestamp, membershipId]);
 * 
 *     return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *       
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 */
