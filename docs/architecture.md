# Gen-Z Nation Video Submission Platform

## 1. Architecture Overview
A highly scalable, serverless video submission platform designed with Clean Architecture principles. It facilitates receiving files up to 2GB directly into Google Drive without passing through the Next.js API layer.

## 2. Engineering Standards
1. **Single Responsibility Principle:** Strict separation of Authentication, APIs, Services, and Configuration.
2. **JSDoc Documentation:** All exported functions explain Purpose, Parameters, Return Types, and Throws.
3. **No Hardcoding:** All magic strings, limits, and scopes live in `src/lib/config/constants.ts`.
4. **Standardized Error Handling:** Try/catch wrapping for Google APIs to prevent leaking raw internal errors.
5. **Pluggable Authentication (Strategy Pattern):** We use a Strategy Pattern (`AuthProviderFactory`) to toggle between Service Account (`Auth.JWT`) and OAuth 2.0 (`Auth.OAuth2Client`) using the `GOOGLE_AUTH_PROVIDER` env variable.
6. **Zero Business Logic Changes:** The `IAuthProvider` abstraction guarantees that downstream services (`DriveService`, `SheetsService`) simply call `GoogleAuthProvider.getClient()`. They never know which authentication strategy is active, ensuring perfect isolation.
7. **Unified API Responses:** `{ success, message, data, error }` strictly enforced.
8. **Strong Typing:** Extensive use of TypeScript interfaces in `src/types/`.
9. **Decoupled Business Logic:** API Routes only handle HTTP concerns (Validation -> Service -> Response).
10. **Security First:** Strict `.env` validation via Zod (with dynamic superRefine rules based on active auth strategy), temporary upload URIs, and untrusted client input handling.
11. **Synchronized Documentation:** This file acts as the ultimate truth for the roadmap.

## 3. Project Roadmap
- [ ] Phase 4: Upload Domain
- [ ] Phase 5: Drive Service
- [ ] Phase 6: Upload Session
- [ ] Phase 7: Chunk Upload
- [ ] Phase 8: Verification
- [ ] Phase 9: Google Sheets
- [ ] Phase 10: Frontend Integration

## 4. Complete Upload Lifecycle
1. **Initialize:** Client selects a video file and submits metadata (filename, size, mimetype).
2. **Session Generation:** Next.js uses Service Account credentials to request a Resumable Upload Session URI from Google Drive APIs.
3. **Delegation:** Next.js returns the secure Upload Session URI to the client.
4. **Direct Stream:** The client uses the Resumable Upload API to stream chunks (e.g., 5MB blocks) directly to Google Drive. The Vercel execution limit is bypassed completely.
5. **Completion & Verification:** After uploading the final chunk, the client notifies Next.js.
6. **Metadata Storage:** Next.js queries Drive to ensure the file exists and is fully uploaded, sets appropriate permissions, and writes a metadata record to Google Sheets.

## 5. Folder Structure
```text
src/
  lib/
    config/          # Zod validation and constants
    google/          # Singletons: auth.ts, drive-client.ts, sheets-client.ts
    services/        # Business Logic: drive, sheets, upload, submission
  types/             # Centralized TS types (api.types.ts)
  utils/             # Generic helpers (errors, formatting)
docs/                # Architecture documentation
```
