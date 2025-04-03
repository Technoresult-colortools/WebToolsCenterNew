// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { ThemeProvider } from '@/providers/theme-provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CookieBanner } from '@/components/CookieBanner';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const metadata = {
  title: 'WebToolsCenter',
  description: 'A collection of useful online tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <UserProvider>
            {children}
            <CookieBanner />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}