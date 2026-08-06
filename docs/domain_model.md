# Domain Model & Storage Architecture: Media Ingestion Platform

This document outlines the Domain-Driven Design (DDD) model for the upload lifecycle, state machines, storage architecture, and data schemas.

## 1. Upload State Machine
Governs the lifecycle of a file from the moment it is selected in the browser until it is successfully recorded in the database.

- **`SELECTED`**: File is chosen in the browser.
- **`VALIDATING`**: Client-side checks for max size and mime-type.
- **`SESSION_CREATED`**: Storage Provider returned a secure Upload URI.
- **`UPLOADING`**: Browser is actively streaming chunks.
- **`PAUSED`**: Upload is paused intentionally by the user or network drop.
- **`RESUMED`**: Network restored; client asked the Provider for the last received byte and resumed.
- **`SESSION_EXPIRED`**: The temporary Upload URI expired (e.g., after hours of network failure). Requires negotiating a new session and resuming.
- **`VERIFYING`**: Client finished uploading; Next.js is performing Integrity Verification on the Storage Provider.
- **`COMPLETED`**: Verification passed. At this point, and *only* at this point, a Submission can be created.
- **`FAILED`**: A fatal error occurred, or max retries were exceeded.
- **`CANCELLED`**: User aborted the upload entirely.

*Allowed Transitions:* `SELECTED` -> `VALIDATING` -> `SESSION_CREATED` -> `UPLOADING` <-> `PAUSED`/`RESUMED`. `UPLOADING` -> `SESSION_EXPIRED` -> `SESSION_CREATED`. `UPLOADING` -> `VERIFYING` -> `COMPLETED` OR `FAILED`.

## 2. Submission State Machine
A Submission **cannot** exist until Upload Verification succeeds. The lifecycles are completely separated.

- **`PENDING_REVIEW`**: Initial state upon `COMPLETED` upload and Database insertion.
- **`UNDER_REVIEW`**: A moderator has claimed this submission.
- **`APPROVED`**: Content is safe, meets criteria. File moved to `Approved/`.
- **`REJECTED`**: Content violates policy. File moved to `Rejected/`.
- **`WINNER`**: Selected as a campaign winner.
- **`ARCHIVED`**: Campaign ended, data moved to cold storage (`Archive/`).

## 3. Storage Architecture & Folder Strategy
Regardless of whether we use Google Drive, AWS S3, Azure Blob, or Cloudflare R2, our logical folder structure remains identical to support the state machines:

```text
Gen-Z Nation/
  ├── Uploads/
  │   ├── Temporary/    (In-progress chunks. Cleaned by cron)
  │   ├── Raw/          (Upload COMPLETED, Submission PENDING_REVIEW)
  │   ├── Approved/     (Moved here if APPROVED)
  │   ├── Rejected/     (Moved here if REJECTED)
  │   ├── Archive/      (Cold storage)
  │   └── Logs/         (Audit and error traces)
```
*Why?* This ensures operational cleanliness and maps 1:1 with the Submission State Machine. `Temporary` holds dirty, incomplete data. `Raw` holds untrusted data. `Approved` holds trusted data.

## 4. Upload Integrity Verification
Before a Submission is ever created, the Storage Provider service must strictly verify:
1. **File Exists**: Does the remote file ID actually exist?
2. **File Size**: Does the remote file size match the intended client file size?
3. **Mime Type**: Did the client upload an `.mp4` but spoof it as a `.pdf`?
4. **Provider File ID**: Validate the URI identity to prevent spoofing.
5. **Hash (Future)**: MD5/SHA256 checksum validation to guarantee byte-for-byte integrity.

## 5. Error Categories
- **Network Errors (Retryable)**: Wi-Fi dropped, timeout. Handled via Exponential Backoff.
- **SessionExpired (Retryable)**: Upload session URI timed out.
- **API/Provider Errors (Mixed)**: 
  - `QuotaExceeded` / `RateLimit`: Retryable.
  - `PermissionDenied`: Fatal.
- **Validation Errors (Fatal)**: `InvalidMime`, `FileTooLarge`.
- **Storage Errors (Fatal)**: `StorageLimitReached`.
- **Integrity Errors (Fatal)**: `ChunkCorrupted`.
- **Business Errors (Fatal)**: `DuplicateSubmission`.
- **Security Errors (Future)**: `VirusDetected`.

## 6. Database Schema (Reporting)
- `Submission ID` (String - Deterministic Sequential ID)
- `Timestamp` (ISO-8601 String)
- `Name` (String)
- `Email` (String - Email format)
- `Phone` (String - E.164 format)
- `Storage File URL` (String - Web viewable link)
- `File Size Bytes` (Number)
- `Status` (Enum: PENDING_REVIEW, APPROVED, REJECTED)
- `Moderator Notes` (String - Optional)

## 7. Abstraction & Future Migration
The Storage architecture is strictly defined via the `IStorageProvider` interface. 
The implementation (e.g., `DriveService`) must not leak Google-specific terminology (like "GoogleDriveFileId") into the API routes or business logic. 
If we migrate to AWS S3 tomorrow, we only write `S3Service implementing IStorageProvider` and swap the dependency. The entire Upload State Machine, Submission Lifecycle, and Integrity Verification will remain 100% untouched.
