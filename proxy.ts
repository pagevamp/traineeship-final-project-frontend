import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { PROTECTED_PATH } from '@routes/.';
import { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher(PROTECTED_PATH);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
