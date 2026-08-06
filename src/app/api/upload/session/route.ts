import { NextRequest, NextResponse } from 'next/server';
import { StorageServiceProvider } from '@/lib/services/drive.service';
import { UPLOAD_CONSTANTS } from '@/lib/config/constants';
import { logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const requestId = uuidv4();
  
  try {
    const body = await req.json();
    const { filename, mimeType, fileSize } = body;

    logger.info('Upload session requested', { filename, fileSize, requestId });

    // Basic Validation
    if (!filename || !mimeType || !fileSize) {
      return NextResponse.json(
        { success: false, message: 'Missing metadata', error: 'filename, mimeType, and fileSize are required', timestamp: new Date().toISOString(), requestId },
        { status: 400 }
      );
    }
    
    // Domain Validation
    if (fileSize > UPLOAD_CONSTANTS.MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ success: false, message: 'File too large', timestamp: new Date().toISOString(), requestId }, { status: 413 });
    }
    if (!UPLOAD_CONSTANTS.SUPPORTED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json({ success: false, message: 'Unsupported format', timestamp: new Date().toISOString(), requestId }, { status: 415 });
    }

    // Delegate business logic to Storage Provider
    const uploadUrl = await StorageServiceProvider.createUploadSession({ filename, mimeType, fileSize });

    return NextResponse.json({
      success: true,
      message: 'Session created successfully',
      data: { uploadUrl },
      timestamp: new Date().toISOString(),
      requestId
    });

  } catch (error: any) {
    logger.error('Session creation failed', { error, requestId });
    return NextResponse.json({
      success: false,
      message: 'Failed to create upload session',
      error: error.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      requestId
    }, { status: error.statusCode || 500 });
  }
}
