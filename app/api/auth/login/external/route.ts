// app/api/auth/login/external/route.ts
import { NextRequest, NextResponse } from 'next/server';

// app/api/auth/login/external/route.ts
export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get('provider');
  
  if (!provider) {
    return NextResponse.json(
      { error: 'Provider is required' },
      { status: 400 }
    );
  }

  const loginUrl = new URL('/api/auth/login', request.nextUrl.origin);
  loginUrl.searchParams.append('connection', provider);
  
  return NextResponse.redirect(loginUrl);
}