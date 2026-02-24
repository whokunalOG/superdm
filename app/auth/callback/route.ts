import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
      }

      if (data.user) {
        // Save user profile to Supabase
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || '',
            avatar_url: data.user.user_metadata?.avatar_url || '',
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('Error saving user profile:', profileError);
        }
      }

      return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/login?error=no_code`);
}
