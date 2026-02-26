import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();

    const body = await request.json().catch(() => null);
    const username = body?.username as string | undefined;
    const comment = body?.comment as string | undefined;

    if (!username || !comment) {
      return NextResponse.json(
        {
          success: false,
          error: 'username and comment are required',
        },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('messages').insert({
      username,
      comment,
    });

    if (error) {
      console.error('Error inserting message into Supabase:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to store message in Supabase',
        },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'DM sent successfully',
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Unhandled error in /api/send-dm:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

