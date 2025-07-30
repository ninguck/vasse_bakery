import { NextResponse } from 'next/server'

export async function middleware(request) {
  console.log('🔒 MIDDLEWARE RUNNING for:', request.nextUrl.pathname)
  
  // Simple test: redirect all admin routes to login
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    console.log('🔄 Redirecting to login page')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  console.log('✅ No redirect needed')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 