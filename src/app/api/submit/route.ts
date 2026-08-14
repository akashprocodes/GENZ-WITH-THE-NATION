import { NextRequest, NextResponse } from 'next/server';
import { DatabaseServiceProvider } from '@/lib/services/sheets.service';
import { ISimpleSubmission } from '@/types/provider.types';
import { logger } from '@/utils/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.mobile || !body.cityState || !body.socialHandle) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const submissionData: ISimpleSubmission = {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      cityState: body.cityState,
      socialHandle: body.socialHandle
    };

    // Use the Database Provider to append row to Google Sheets
    await DatabaseServiceProvider.createSimpleSubmission!(submissionData);

    return NextResponse.json({ success: true, message: 'Submission successful' });

  } catch (error: any) {
    logger.error('Failed to process temporary submission', { error: error.message });
    return NextResponse.json({ success: false, message: `Server Error: ${error.message}` }, { status: 500 });
  }
}  
