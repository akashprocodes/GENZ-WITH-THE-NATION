import { NextRequest, NextResponse } from 'next/server';
import { StorageServiceProvider } from '@/lib/services/drive.service';
import { DatabaseServiceProvider } from '@/lib/services/sheets.service';
import { logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const requestId = uuidv4();
  
  try {
    const body = await req.json();
    const { fileId, metadata, user } = body; 
    
    logger.info('Upload verification requested', { fileId, requestId });

    if (!fileId || !metadata || !user) {
      return NextResponse.json(
        { success: false, message: 'Missing payload', error: 'fileId, metadata, and user fields are required', timestamp: new Date().toISOString(), requestId },
        { status: 400 }
      );
    }

    // 1. Verify Upload Integrity (Strict adherence to Domain Architecture)
    const verifiedUpload = await StorageServiceProvider.verifyUpload(fileId, metadata);

    // 2. Create Submission (Only if verification succeeded)
    const submission = await DatabaseServiceProvider.createSubmission({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      cityState: user.cityState,
      socialHandle: user.socialHandle,
      driveFileUrl: verifiedUpload.webViewLink || `https://drive.google.com/file/d/${fileId}/view`,
      fileSizeBytes: verifiedUpload.size,
      status: 'PENDING_REVIEW',
      requestId
    });

    return NextResponse.json({
      success: true,
      message: 'Upload completed and verified',
      data: submission,
      timestamp: new Date().toISOString(),
      requestId
    });

  } catch (error: any) {
    logger.error('Upload verification/submission failed', { error, requestId });
    return NextResponse.json({
      success: false,
      message: 'Upload verification or submission creation failed',
      error: error.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      requestId
    }, { status: error.statusCode || 500 });
  }
}
