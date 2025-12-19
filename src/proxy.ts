import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { PROTECTED_PATH } from '@routes/.';
import { NextRequest, NextResponse } from 'next/server';

const isOnboardingRoute = createRouteMatcher(['/onboarding']);
const isProtectedRoute = createRouteMatcher(PROTECTED_PATH);
const isSignedInRoute = createRouteMatcher(['/sign-in']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();
  const onboardingComplete =
    sessionClaims?.metadata?.onboardingComplete === true;

  if (isAuthenticated && isOnboardingRoute(req)) {
    return NextResponse.next();
  }
  if (isAuthenticated && isSignedInRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (isAuthenticated && !onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  if (!isAuthenticated && isProtectedRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
