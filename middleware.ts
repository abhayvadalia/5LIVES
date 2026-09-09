import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  const path = request.nextUrl.pathname;
  if (
    path.startsWith('/api/') ||
    path.startsWith('/app') ||
    path.startsWith('/admin') ||
    path.startsWith('/choose') ||
    path === '/sign-in'
  ) {
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  if (path === '/sw.js') {
    response.headers.set('Cache-Control', 'no-cache');
    response.headers.set('Service-Worker-Allowed', '/');
  }
  return response;
}
