import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async () => {});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
