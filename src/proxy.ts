import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_PATH } from './routes';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  if (PUBLIC_PATH.includes(pathname)) {
    return handlePublicPath(request, pathname, token);
  }

  // Authentication check
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (await isTokenExpired(token)) === true) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const userId = await getUserFromSession(token);
  if (!userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

async function handlePublicPath(
  request: NextRequest,
  pathname: string,
  token?: string
) {
  if (token && PUBLIC_PATH.some((path) => pathname === path)) {
    const userId = await getUserFromSession(token);
    if (userId) {
      return NextResponse.redirect(new URL('/urls', request.url));
    }
  }
  return NextResponse.next();
}

async function getUserFromSession(token: string): Promise<string | null> {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded?.id || null;
  } catch {
    return null;
  }
}

async function isTokenExpired(token: string): Promise<boolean | null> {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);
    if (!decoded.exp) {
      return true;
    }
    return decoded.exp < now;
  } catch {
    return true;
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
