/**
 * Standardized API Response Format.
 * Every API route MUST return this structure.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  requestId?: string;
}

export interface EnvironmentConfig {
  GOOGLE_AUTH_PROVIDER: 'oauth' | 'service_account';
  GOOGLE_CLIENT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_DRIVE_FOLDER_ID: string;
  GOOGLE_SHEET_ID: string;
  NODE_ENV: 'development' | 'test' | 'production';
}

export interface UploadSession {
  uploadUrl: string;
  expiresAt: string;
}

export interface DriveUploadSession {
  sessionUri: string;
  fileId?: string;
}

export type DriveUploadStatus = 'INITIATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type SubmissionStatus = 'PENDING_REVIEW' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'WINNER' | 'ARCHIVED';

export interface Submission {
  id: string;
  name: string;
  email: string;
  driveFileUrl: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface GoogleApiError {
  code: number;
  message: string;
  status: string;
}
