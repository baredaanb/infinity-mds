import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';

// 1. Initialize next-intl middleware for i18n
const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed' 
});

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Extract hostname (e.g., agency1.infinitysolution.com, app.infinitysolution.com)
  const hostname = req.headers.get('host') || '';
  
  // Define our base domains (local and production)
  const isLocal = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  // Ignore port for base domain comparison during local dev
  const baseHost = hostname.split(':')[0]; 
  const isBaseLocal = isLocal && (baseHost === 'localhost' || baseHost === '127.0.0.1');
  
  const baseDomain = isLocal ? hostname : process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'infinitysolution.com';
  
  // 2. Multi-Tenant Subdomain Routing
  // If the request is for a custom subdomain (not the root, not www)
  if (
    !isBaseLocal &&
    hostname !== baseDomain &&
    hostname !== `www.${baseDomain}`
  ) {
    const tenantSubdomain = hostname.replace(`.${baseDomain}`, '');
    
    // Rewrite the URL to a dynamic tenant route: /app/[tenant]/...
    // e.g., agency1.infinitysolution.com/dashboard -> /app/agency1/dashboard
    const searchParams = req.nextUrl.searchParams.toString();
    const newPath = `/app/${tenantSubdomain}${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    
    return NextResponse.rewrite(new URL(newPath, req.url));
  }
  
  if (isBaseLocal) {
    return NextResponse.next();
  }
  
  // 3. Fallback to i18n middleware for the primary root domain marketing pages
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized and tenant pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
