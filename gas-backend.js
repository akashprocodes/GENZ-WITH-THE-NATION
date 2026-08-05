/**
 * Google Apps Script for Gen-Z Nation Campaign
 * 
 * INSTRUCTIONS:
 * 1. Go to script.google.com and create a new project.
 * 2. Copy and paste this code into Code.gs.
 * 3. Create a Google Sheet and copy its ID (from the URL).
 * 4. Create a Google Drive Folder (e.g. "Gen-Z Nation/Raw Videos") and copy its ID.
 * 5. Replace 'YOUR_SHEET_ID_HERE' and 'YOUR_FOLDER_ID_HERE' below.
 * 6. Click "Deploy" -> "New Deployment".
 * 7. Select type "Web app".
 * 8. Set "Execute as" to "Me".
 * 9. Set "Who has access" to "Anyone".
 * 10. Click Deploy and copy the Web App URL.
 * 11. Add the Web App URL to your Next.js project's .env.local file as:
 *     NEXT_PUBLIC_GAS_URL=your_copied_url_here
 */

const SPREADSHEET_ID = '17u7ZYfuVtv4JpjI7137tDFgCIrdydvm4DH86DtRWOrs';
const PARENT_FOLDER_ID = '1KLZVzkLqqaNB_VXxFnDxHN401aRuQ-2h';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Generate Submission ID
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const lastRow = sheet.getLastRow();
    const idNumber = lastRow === 0 ? 1 : lastRow;
    const submissionId = "GZN-" + idNumber.toString().padStart(6, '0');

    // Extract metadata
    const fullName = data.fullName;
    const email = data.email;
    const mobileNumber = data.mobileNumber;
    const cityState = data.cityState;
    const profileUrl = data.profileUrl;
    const videoUrl = data.videoUrl;
    const submissionDate = new Date().toISOString();
    const status = "Pending Review";

    // Process File Upload
    let driveFolderLink = "";
    if (data.fileData) {
      const parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);

      // Create subfolder
      const folderName = `${submissionId}_${fullName.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const newFolder = parentFolder.createFolder(folderName);
      driveFolderLink = newFolder.getUrl();

      // Decode base64 and create file
      const decodedFile = Utilities.base64Decode(data.fileData);
      const blob = Utilities.newBlob(decodedFile, 'video/mp4', 'raw-video.mp4');
      newFolder.createFile(blob);
    }

    // Add row to Google Sheet
    if (lastRow === 0) {
      // Add headers if sheet is empty
      sheet.appendRow([
        "Submission ID", "Full Name", "Email", "Mobile Number",
        "City / State", "Social Media Profile Link", "Video / Reel URL",
        "Google Drive Folder URL", "Status", "Submitted At"
      ]);
    }

    sheet.appendRow([
      submissionId, fullName, email, mobileNumber,
      cityState, profileUrl, videoUrl,
      driveFolderLink, status, submissionDate
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      submissionId: submissionId,
      status: status
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}


// Handle preflight requests (CORS)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
