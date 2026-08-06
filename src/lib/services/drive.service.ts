import { google } from 'googleapis';
import { env } from '@/lib/config/env';
import { GoogleAuthProvider } from '@/lib/google/auth';
import { IStorageProvider, IStorageMetadata, IVerifiedUpload } from '@/types/provider.types';
import { logger } from '@/utils/logger';
import { StorageError, ProviderApiError } from '@/utils/errors';

/**
 * DriveService
 * Implements IStorageProvider to interact with Google Drive.
 * Encapsulates all Google-specific upload logic ensuring the rest of the application
 * remains decoupled from Google's proprietary APIs.
 */
class DriveService implements IStorageProvider {
  /**
   * Generates a Resumable Upload Session URI from Google Drive.
   * 
   * @param {IStorageMetadata} metadata - The file metadata (name, size, mimeType)
   * @returns {Promise<string>} The secure resumable upload URL
   * @throws {StorageError | ProviderApiError} If the session creation fails
   */
  public async createUploadSession(metadata: IStorageMetadata): Promise<string> {
    try {
      logger.info('Creating upload session', { filename: metadata.filename });
      
      const authClient = GoogleAuthProvider.getClient();
      
      const { token } = await authClient.getAccessToken();

      if (!token) {
        throw new StorageError('Failed to retrieve access token from Google Auth Provider.');
      }

      // Use native fetch to bypass Gaxios which is stripping the Location header
      // Add the Origin header to tell Google Drive to allow CORS on the subsequent PUT request
      const fetchHeaders: any = {
        'Authorization': `Bearer ${token}`,
        'X-Upload-Content-Type': metadata.mimeType,
        'X-Upload-Content-Length': metadata.fileSize.toString(),
        'Content-Type': 'application/json',
      };
      
      if (metadata.origin) {
        fetchHeaders['Origin'] = metadata.origin;
      }

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify({
          name: metadata.filename,
          parents: [env.GOOGLE_DRIVE_FOLDER_ID],
          mimeType: metadata.mimeType,
        })
      });

      const uploadUrl = response.headers.get('location');
      
      logger.info('Drive API Response for Session', { 
        status: response.status, 
        uploadUrl: !!uploadUrl 
      });

      if (!uploadUrl || typeof uploadUrl !== 'string') {
        throw new StorageError('Google Drive did not return a resumable upload location header.');
      }

      logger.info('Upload session created successfully');
      return uploadUrl;
    } catch (error: any) {
      logger.error('Failed to create upload session', error);
      
      if (error instanceof StorageError) {
        throw error;
      }
      
      // Map raw API errors to our internal domain error
      throw new ProviderApiError(`Failed to negotiate upload session: ${error.message || 'Unknown error'}`, error.status || 502);
    }
  }

  /**
   * Verifies the integrity of an uploaded file.
   * Checks existence, size, mime type, name, and parent folder against expected values.
   * 
   * @param {string} fileId - The remote Storage File ID
   * @param {IStorageMetadata} expectedMetadata - The client-reported metadata to check against
   * @returns {Promise<IVerifiedUpload>} The verified file details
   * @throws {StorageError | ProviderApiError} If verification fails or file is malformed
   */
  public async verifyUpload(fileId: string, expectedMetadata: IStorageMetadata): Promise<IVerifiedUpload> {
    try {
      logger.info('Verifying upload integrity', { fileId });
      
      const authClient = GoogleAuthProvider.getClient();
      const drive = google.drive({ version: 'v3', auth: authClient });

      const response = await drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, size, parents, webViewLink, webContentLink, createdTime',
      });

      const file = response.data;

      if (!file) {
        throw new StorageError('File does not exist in Storage Provider.');
      }

      // 1. Verify File Exists & ID Matches
      if (file.id !== fileId) {
        throw new StorageError('Storage Provider ID mismatch.');
      }

      // 2. Verify File Size
      if (Number(file.size) !== expectedMetadata.fileSize) {
        logger.warn('File size mismatch detected', { expected: expectedMetadata.fileSize, actual: file.size });
        throw new StorageError(`File size mismatch. Expected ${expectedMetadata.fileSize}, got ${file.size}`);
      }

      // 3. Verify Mime Type
      if (file.mimeType !== expectedMetadata.mimeType) {
        logger.warn('Mime type mismatch detected', { expected: expectedMetadata.mimeType, actual: file.mimeType });
        throw new StorageError(`Mime type mismatch. Expected ${expectedMetadata.mimeType}, got ${file.mimeType}`);
      }
      
      // 4. Verify Filename
      if (file.name !== expectedMetadata.filename) {
        logger.warn('Filename mismatch detected', { expected: expectedMetadata.filename, actual: file.name });
        throw new StorageError(`Filename mismatch. Expected ${expectedMetadata.filename}, got ${file.name}`);
      }

      // 5. Verify Parent Folder
      if (!file.parents || !file.parents.includes(env.GOOGLE_DRIVE_FOLDER_ID)) {
        logger.warn('Parent folder mismatch detected', { expected: env.GOOGLE_DRIVE_FOLDER_ID, actual: file.parents });
        throw new StorageError(`File is not located in the correct target folder.`);
      }

      logger.info('Upload verification passed', { fileId });
      
      return {
        verified: true,
        fileId: file.id as string,
        fileName: file.name as string,
        mimeType: file.mimeType as string,
        size: Number(file.size),
        webViewLink: file.webViewLink || undefined,
        webContentLink: file.webContentLink || undefined,
        createdTime: file.createdTime || undefined,
      };

    } catch (error: any) {
      logger.error('Failed to verify upload', error);
      
      if (error instanceof StorageError) {
        throw error;
      }
      
      throw new ProviderApiError(`Integrity verification failed: ${error.message || 'Unknown error'}`, error.status || 502);
    }
  }
}

export const StorageServiceProvider = new DriveService();
