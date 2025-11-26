
import { NextResponse } from 'next/server';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8FU1aVNk1j0lvbIqt6YJseZIoCwevTRU5zcPeu2r9cRjqyHy--Bd-dZJqcnBBaAg2/exec";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('id');

  if (!caseId) {
    return NextResponse.json({ error: 'Case ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${SCRIPT_URL}?id=${caseId}`, {
      method: 'GET',
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
        throw new Error(`Google Script error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API GET Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get('id');
  const action = searchParams.get('action'); // 'like' or 'view'

  // This endpoint is called from the frontend.
  // - The 'view' action is triggered once when the detailed case page (`/forum/[id]`) loads.
  // - The 'like' action is triggered when a user clicks the 'like' button on that same page.
  // This ensures views are only counted for full page views of a case.

  if (!caseId || !action) {
    return NextResponse.json({ error: 'Case ID and action are required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${SCRIPT_URL}?id=${caseId}&action=${action}`, {
        method: 'POST',
        redirect: 'follow',
    });
    
    if (!response.ok) {
        throw new Error(`Google Script error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API POST Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * --- Google Apps Script (Code.gs) ---
 * 
 * const SHEET_NAME = "CaseStats";
 * 
 * function doGet(e) {
 *   const caseId = e.parameter.id;
 *   if (!caseId) {
 *     return ContentService.createTextOutput(JSON.stringify({ error: "Case ID is required" })).setMimeType(ContentService.MimeType.JSON);
 *   }
 *   
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 *   const data = sheet.getDataRange().getValues();
 *   const headers = data[0];
 *   const caseIdCol = headers.indexOf('caseId');
 *   const likesCol = headers.indexOf('likes');
 *   const viewsCol = headers.indexOf('views');
 * 
 *   for (let i = 1; i < data.length; i++) {
 *     if (data[i][caseIdCol] == caseId) {
 *       return ContentService.createTextOutput(JSON.stringify({
 *         likes: data[i][likesCol] || 0,
 *         views: data[i][viewsCol] || 0
 *       })).setMimeType(ContentService.MimeType.JSON);
 *     }
 *   }
 * 
 *   // If not found, return 0 for both
 *   return ContentService.createTextOutput(JSON.stringify({ likes: 0, views: 0 })).setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * function doPost(e) {
 *   const caseId = e.parameter.id;
 *   const action = e.parameter.action; // 'like' or 'view'
 * 
 *   if (!caseId || !action) {
 *     return ContentService.createTextOutput(JSON.stringify({ error: "Case ID and action are required" })).setMimeType(ContentService.MimeType.JSON);
 *   }
 * 
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 *   const data = sheet.getDataRange().getValues();
 *   const headers = data[0];
 *   const caseIdCol = headers.indexOf('caseId');
 *   const likesCol = headers.indexOf('likes');
 *   const viewsCol = headers.indexOf('views');
 * 
 *   let rowFound = false;
 *   let newLikes = 0;
 *   let newViews = 0;
 * 
 *   for (let i = 1; i < data.length; i++) {
 *     if (data[i][caseIdCol] == caseId) {
 *       rowFound = true;
 *       const currentLikes = parseInt(data[i][likesCol], 10) || 0;
 *       const currentViews = parseInt(data[i][viewsCol], 10) || 0;
 * 
 *       if (action === 'like') {
 *         newLikes = currentLikes + 1;
 *         newViews = currentViews;
 *         sheet.getRange(i + 1, likesCol + 1).setValue(newLikes);
 *       } else if (action === 'view') {
 *         newLikes = currentLikes;
 *         newViews = currentViews + 1;
 *         sheet.getRange(i + 1, viewsCol + 1).setValue(newViews);
 *       }
 *       break;
 *     }
 *   }
 * 
 *   if (!rowFound) {
 *     if (action === 'like') {
 *       newLikes = 1;
 *       newViews = 0;
 *     } else if (action === 'view') {
 *       newLikes = 0;
 *       newViews = 1;
 *     }
 *     sheet.appendRow([caseId, newLikes, newViews]);
 *   }
 * 
 *   return ContentService.createTextOutput(JSON.stringify({
 *     likes: newLikes,
 *     views: newViews,
 *     status: 'success'
 *   })).setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 */
