import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
