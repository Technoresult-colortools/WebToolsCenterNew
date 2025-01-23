import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  // Only require authentication for specific routes
  const protectedRoutes = [
    '/favorites', 
    '/dashboard',
    '/bug-report',
    '/api/bug-reports', 
    '/tool-request',
    '/api/tool-requests'  // Add this
  ];  // Changed '/profile' to '/dashboard'
  
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|favicon.ico).*)',
  ]
};
