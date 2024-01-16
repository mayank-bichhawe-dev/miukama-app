import { NextRequest, NextResponse } from 'next/server';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import api_routes from './api/config/routes.json';

const defaultLocale = 'en';
const locales = ['de'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get('token');

  try {
    const response = await fetch(
      `${BASE_URL}/${api_routes.userRoute.getUser}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    if (!response.ok) {
      // response code 401 ie unauthorized
      if (pathname.includes('/dashboard')) {
        return NextResponse.redirect(
          new URL(pathname.replace(pathname, '/login'), req.url),
        );
      }
      if (pathname.includes('/admin')) {
        return NextResponse.redirect(
          new URL(pathname.replace(pathname, '/dashboard'), req.url),
        );
      }
    } else {
      if (pathname.includes('/login')) {
        return NextResponse.redirect(
          new URL(pathname.replace(pathname, '/dashboard/my-profile'), req.url),
        );
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }

  if (req.nextUrl.pathname.startsWith('/_next') || pathname.includes('.'))
    return;

  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? '/' : '',
        ),
        req.url,
      ),
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, req.url),
    );
  }
}
