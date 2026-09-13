import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const redirects: Record<string, string> = {
    '/imagined-lives': '/',
    '/original': '/',
    '/choose/review': '/my-five',
    '/app': '/my-five',
    '/app/my-five': '/my-five',
    '/app/interests': '/my-five',
    '/sign-in': '/my-five',
  };
  const destination = redirects[request.nextUrl.pathname];
  if (destination)
    return NextResponse.redirect(new URL(destination, request.url), 301);
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
    path === '/sign-in' ||
    path === '/my-five' ||
    path === '/requests'
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
