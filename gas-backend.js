/**
 * Google Apps Script for Gen-Z Nation Campaign
 * 
 * INSTRUCTIONS:
 * 1. Go to script.google.com and create a new project.
 * 2. Copy and paste this code into Code.gs.
 * 3. Create a Google Sheet and copy its ID (from the URL).
 * 4. Create a Google Drive Folder and copy its ID (from the URL).
 * 5. Replace 'YOUR_SHEET_ID_HERE' and 'YOUR_FOLDER_ID_HERE' below.
 * 6. Click "Deploy" -> "New Deployment".
 * 7. Select type "Web app".
 * 8. Set "Execute as" to "Me".
 * 9. Set "Who has access" to "Anyone".
 * 10. Click Deploy and copy the Web App URL.
 * 11. Add the Web App URL to your Next.js project's .env.local file as:
 *     NEXT_PUBLIC_GAS_URL=your_copied_url_here
 */

const SPREADSHEET_ID = 'YOUR_SHEET_ID_HERE';
const PARENT_FOLDER_ID = 'YOUR_FOLDER_ID_HERE';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Generate Submission ID
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const lastRow = sheet.getLastRow();
    // Assuming row 1 is headers, the count is lastRow (0 if empty)
    const idNumber = lastRow === 0 ? 1 : lastRow; 
    const submissionId = "GZN-" + idNumber.toString().padStart(6, '0');
    
    // Extract metadata
    const fullName = data.fullName;
    const email = data.email;
    const phone = data.phone;
    const platform = data.platform;
    const profileUrl = data.profileUrl;
    const videoUrl = data.videoUrl;
    const submissionDate = new Date().toISOString();
    const status = "Pending Review";
    
    // Process File Upload
    let driveFolderLink = "";
    if (data.fileData && data.fileName) {
      const parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID);
      
      // Create subfolder
      const folderName = `${submissionId}_${fullName.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const newFolder = parentFolder.createFolder(folderName);
      driveFolderLink = newFolder.getUrl();
      
      // Decode base64 and create file
      const decodedFile = Utilities.base64Decode(data.fileData);
      const blob = Utilities.newBlob(decodedFile, data.mimeType, data.fileName);
      newFolder.createFile(blob);
      
      // Create metadata.json in the folder
      const metadataObj = {
        SubmissionID: submissionId,
        CreatorName: fullName,
        Email: email,
        Phone: phone,
        SocialMediaProfile: profileUrl,
        VideoURL: videoUrl,
        SubmissionDate: submissionDate,
        Status: status
      };
      
      const metadataBlob = Utilities.newBlob(JSON.stringify(metadataObj, null, 2), "application/json", "metadata.json");
      newFolder.createFile(metadataBlob);
    }
    
    // Add row to Google Sheet
    if (lastRow === 0) {
      // Add headers if sheet is empty
      sheet.appendRow([
        "Submission ID", "Creator Name", "Email", "Phone", 
        "Platform", "Profile URL", "Video URL", 
        "Google Drive Folder Link", "Submission Date", "Current Status"
      ]);
    }
    
    sheet.appendRow([
      submissionId, fullName, email, phone, 
      platform, profileUrl, videoUrl, 
      driveFolderLink, submissionDate, status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      submissionId: submissionId 
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
