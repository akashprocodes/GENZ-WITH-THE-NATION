/**
 * Interface-Driven Design for Core Providers
 * Ensures our business logic depends on abstractions, not concrete implementations.
 * This allows swapping Google Drive for S3 or Google Sheets for PostgreSQL transparently.
 */

export interface IAuthProvider {
  /**
   * Retrieves the authenticated client instance used by the provider.
   * Returns `any` or a generic type to hide implementation details (like JWT vs AWS SigV4).
   */
  getClient(): any;
}

export interface IStorageMetadata {
  filename: string;
  mimeType: string;
  fileSize: number;
  origin?: string;
}

export interface IVerifiedUpload {
  verified: boolean;
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
  webViewLink?: string;
  webContentLink?: string;
  createdTime?: string;
}

export interface IStorageProvider {
  /**
   * Generates a secure, temporary URL for direct browser uploads.
   */
  createUploadSession(metadata: IStorageMetadata): Promise<string>;
  
  /**
   * Verifies the file actually exists and was fully uploaded to the storage bucket/folder.
   * Compares the actual remote file against the expected client metadata.
   */
  verifyUpload(fileId: string, expectedMetadata: IStorageMetadata): Promise<IVerifiedUpload>;
}

import { Submission, SubmissionStatus } from './api.types';

export interface ISubmissionRecord {
  name: string;
  email: string;
  mobile: string;
  cityState: string;
  socialHandle: string;
  driveFileUrl: string;
  fileSizeBytes: number;
  status: SubmissionStatus;
  moderatorNotes?: string;
  requestId?: string;
}

export interface IVideoSubmission {
  name: string;
  email: string;
  mobile: string;
  socialUrl: string;
  driveFileUrl: string;
  fileSizeBytes: number;
  status: string;
}

export interface ISimpleSubmission {
  name: string;
  email: string;
  mobile: string;
  cityState: string;
  socialHandle: string;
}

export interface IDatabaseProvider {
  /**
   * Inserts a record into the target database and generates a deterministic ID.
   * Returns the complete Submission object.
   */
  createSubmission(data: ISubmissionRecord): Promise<Submission>;

  /**
   * Temporary method for handling form-only submissions without file uploads.
   */
  createSimpleSubmission?(data: ISimpleSubmission): Promise<any>;

  /**
   * Method for handling video-only submissions.
   */
  createVideoSubmission?(data: IVideoSubmission): Promise<any>;
}
