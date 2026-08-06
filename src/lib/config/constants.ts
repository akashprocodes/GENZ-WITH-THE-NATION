/**
 * Global Constants
 * Hardcoded values should NOT be used directly in the codebase.
 * Always reference this centralized configuration.
 */
export const UPLOAD_CONSTANTS = {
  // Drive Resumable Upload chunk size must be a multiple of 256 KB (256 * 1024 bytes)
  // 5MB chunk size is standard for robust resumable uploads
  CHUNK_SIZE_BYTES: 5 * 1024 * 1024, 
  
  // Supported video mime types
  SUPPORTED_MIME_TYPES: [
    'video/mp4',
    'video/quicktime', // .mov
    'video/x-msvideo', // .avi
    'video/x-matroska', // .mkv
  ],
  
  // Sizes
  MAX_FILE_SIZE_BYTES: 2 * 1024 * 1024 * 1024, // 2GB
};

export const SHEET_CONSTANTS = {
  SHEET_NAME: 'Sheet1', // Default tab name in Google Sheets
};

export const GOOGLE_CONSTANTS = {
  SCOPES: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
};
