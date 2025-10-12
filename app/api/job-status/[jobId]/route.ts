import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  console.log('[job-status] Checking status for job:', jobId);

  try {
    // Check job status in Supabase
    const { data: job, error } = await supabase
      .from('jobs')
      .select('status')
      .eq('id', jobId)
      .single();

    if (error) {
      console.error('[job-status] Supabase error:', error);
      return NextResponse.json(
        { status: 'error', error: 'Failed to fetch job status' },
        { status: 500 }
      );
    }

    if (!job) {
      console.log('[job-status] Job not found');
      return NextResponse.json(
        { status: 'not_found' },
        { status: 404 }
      );
    }

    console.log('[job-status] Current status:', job.status);

    return NextResponse.json({
      status: job.status || 'processing'
    });

  } catch (error) {
    console.error('[job-status] Error:', error);
    return NextResponse.json(
      { status: 'error', error: 'Internal server error' },
      { status: 500 }
    );
  }
}
