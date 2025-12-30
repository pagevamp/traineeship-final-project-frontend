import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Toaster } from 'sonner';
import ClientAuthInitializer from '@/components/ClientAuthInitiallizer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Outside Ride-Sharing App',
  description:
    'In-House Ride sharing app created by Product trainees(Laxman Rumba & Stuti Upreti) @Outside_Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            cssLayerName: 'clerk',
          }}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ClientAuthInitializer />
          {children}
          <Toaster
            position="bottom-right"
            richColors
            toastOptions={{
              style: {
                background: '#191919',
                color: '#fff8e3',
                border: '1px solid rgba(159, 95, 69, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
              },
              className: 'my-custom-toast',
            }}
          />{' '}
        </ClerkProvider>
      </body>
    </html>
  );
}
