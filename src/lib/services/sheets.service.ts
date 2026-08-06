import { google } from 'googleapis';
import { env } from '@/lib/config/env';
import { SHEET_CONSTANTS } from '@/lib/config/constants';
import { GoogleAuthProvider } from '@/lib/google/auth';
import { IDatabaseProvider, ISubmissionRecord, ISimpleSubmission } from '@/types/provider.types';
import { Submission } from '@/types/api.types';
import { logger } from '@/utils/logger';
import { DatabaseError, ProviderApiError } from '@/utils/errors';

/**
 * SheetsService
 * Implements IDatabaseProvider to interact with Google Sheets.
 * Encapsulates all Google-specific database logic ensuring the rest of the application
 * remains decoupled from Google's proprietary APIs.
 */
class SheetsService implements IDatabaseProvider {
  
  /**
   * Creates a new submission record in the database.
   * Implements a deterministic sequential ID generation strategy by extracting
   * the atomic row lock range from the append response.
   * 
   * @param {ISubmissionRecord} data - The sanitized submission data
   * @returns {Promise<Submission>} The fully formed submission with its generated ID
   * @throws {DatabaseError | ProviderApiError} If the database operation fails
   */
  public async createSubmission(data: ISubmissionRecord): Promise<Submission> {
    try {
      logger.info('Creating new submission record', { email: data.email });
      
      const authClient = GoogleAuthProvider.getClient();
      const sheets = google.sheets({ version: 'v4', auth: authClient });
      const timestamp = new Date().toISOString();

      // Step 1: Append row with empty ID
      // Columns: ID, Timestamp, Name, Email, Phone, Drive File URL, File Size Bytes, Status, Moderator Notes
      const rowData = [
        '', // Placeholder for ID
        timestamp,
        data.name,
        data.email,
        data.phone || '',
        data.driveFileUrl,
        data.fileSizeBytes,
        data.status,
        data.moderatorNotes || ''
      ];

      const appendResponse = await sheets.spreadsheets.values.append({
        spreadsheetId: env.GOOGLE_SHEET_ID,
        range: `${SHEET_CONSTANTS.SHEET_NAME}!A:I`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [rowData],
        },
      });

      const updatedRange = appendResponse.data.updates?.updatedRange;
      if (!updatedRange) {
        throw new DatabaseError('Failed to retrieve updated range from Database Provider.');
      }

      // Step 2: Extract row number from range (e.g., "Submissions!A42:I42")
      const rowMatch = updatedRange.match(/!A(\d+):/);
      if (!rowMatch || !rowMatch[1]) {
        throw new DatabaseError('Could not parse row number from Database Provider response.');
      }
      
      const rowNumber = parseInt(rowMatch[1], 10);
      
      // Step 3: Generate Deterministic ID (Assuming Row 1 is header)
      const sequenceNumber = rowNumber - 1;
      const submissionId = `GZN-26-${String(sequenceNumber).padStart(5, '0')}`;

      // Step 4: Update the inserted row with the generated ID
      await sheets.spreadsheets.values.update({
        spreadsheetId: env.GOOGLE_SHEET_ID,
        range: `${SHEET_CONSTANTS.SHEET_NAME}!A${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[submissionId]],
        },
      });

      logger.info('Submission created successfully', { 
        submissionId, 
        rowNumber, 
        requestId: data.requestId 
      });

      return {
        id: submissionId,
        name: data.name,
        email: data.email,
        driveFileUrl: data.driveFileUrl,
        status: data.status,
        createdAt: timestamp,
      };

    } catch (error: any) {
      logger.error('Failed to create submission', error);
      
      if (error instanceof DatabaseError) {
        throw error;
      }
      
      // Map raw API errors to our internal domain error
      throw new ProviderApiError(`Database operation failed: ${error.message || 'Unknown error'}`, error.status || 502);
    }
  }

  /**
   * Temporary method for bypassing upload execution.
   * Maps exactly to: Submission ID, Full Name, Email, Mobile Number, City / State, Instagram / Facebook Handle, Created At, Status
   */
  public async createSimpleSubmission(data: ISimpleSubmission): Promise<any> {
    try {
      logger.info('Connecting to Google Sheets Provider for temporary submission...', { email: data.email });
      
      const authClient = GoogleAuthProvider.getClient();
      const sheets = google.sheets({ version: 'v4', auth: authClient });
      const timestamp = new Date().toISOString();
      
      // Get current row count to generate a sequential ID
      const getResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: env.GOOGLE_SHEET_ID,
        range: `${SHEET_CONSTANTS.SHEET_NAME}!A:A`,
      });
      const currentRows = getResponse.data.values ? getResponse.data.values.length : 1;
      const submissionId = currentRows; // 1, 2, 3... (since row 1 is header)

      const rowData = [
        submissionId, // Sequential Submission ID
        data.name,
        data.email,
        data.mobile,
        data.cityState,
        data.socialHandle,
        timestamp
      ];

      const appendResponse = await sheets.spreadsheets.values.append({
        spreadsheetId: env.GOOGLE_SHEET_ID,
        range: `${SHEET_CONSTANTS.SHEET_NAME}!A:G`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [rowData],
        },
      });

      const updatedRange = appendResponse.data.updates?.updatedRange;
      if (!updatedRange) {
        throw new DatabaseError('Failed to retrieve updated range from Database Provider.');
      }

      logger.info('Temporary database append complete.', { updatedRange });

      return { success: true, timestamp };

    } catch (error: any) {
      logger.error('Database operation failed in simple submission', { error: error.message, stack: error.stack });
      if (error instanceof DatabaseError) throw error;
      throw new ProviderApiError(`Database operation failed: ${error.message || 'Unknown error'}`, error.status || 502);
    }
  }
}

export const DatabaseServiceProvider = new SheetsService();
