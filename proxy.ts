import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { PROTECTED_PATH } from '@routes/.';

const isProtectedRoute = createRouteMatcher(PROTECTED_PATH);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
