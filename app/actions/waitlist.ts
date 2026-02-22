'use server';

import { getSupabaseClient } from '@/lib/supabase';

interface SaveToWaitlistParams {
  email: string;
  intent: 'free' | 'pro';
}

interface SaveToWaitlistResult {
  success: boolean;
  error?: string;
}

export async function saveToWaitlist({
  email,
  intent,
}: SaveToWaitlistParams): Promise<SaveToWaitlistResult> {
  try {
    const supabase = getSupabaseClient();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address.',
      };
    }

    // Validate intent
    if (intent !== 'free' && intent !== 'pro') {
      return {
        success: false,
        error: 'Invalid plan selection.',
      };
    }

    const { error } = await supabase
      .from('leads' as never)
      .insert(
        [
          {
            email: email.toLowerCase().trim(),
            intent,
          },
        ] as never
      );

    if (error) {
      if (error.code === '23505') {
        return {
          success: false,
          error: 'This email is already on the waitlist!',
        };
      }
      console.error('Supabase error:', error);
      return {
        success: false,
        error: error.message || 'Database error. Please try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Waitlist error:', error);

    if (error instanceof Error && error.message.includes('Missing Supabase credentials')) {
      return {
        success: false,
        error:
          'Server is missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save your email. Please try again.',
    };
  }
}
