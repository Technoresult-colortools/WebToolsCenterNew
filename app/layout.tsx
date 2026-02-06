// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CookieBanner } from '@/components/CookieBanner';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const metadata = {
  title: 'WebToolsCenter | Online Tools for Developers, Creators & Everyone',
  description:
    'WebToolsCenter offers a curated collection of free, fast, and user-friendly online tools for text, code, design, social media, and more. Boost your productivity today!',
  keywords: [
    'online tools',
    'free tools',
    'text tools',
    'css tools',
    'developer tools',
    'web utilities',
    'image tools',
    'SEO tools',
    'WebToolsCenter',
    'social media tools'
  ],
  openGraph: {
    title: 'WebToolsCenter | Free Online Tools for Everyone',
    description:
      'Discover powerful and easy-to-use tools for web development, writing, design, and productivity at WebToolsCenter.',
    url: 'https://webtoolscenter.com',
    siteName: 'WebToolsCenter',
    type: 'website',
    images: [
      {
        url: 'https://webtoolscenter.com/og-image.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'WebToolsCenter - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebToolsCenter | Online Tools for Productivity',
    description:
      'Access a library of free online tools to make your work easier. From code to content, WebToolsCenter has you covered.',
    images: ['https://webtoolscenter.com/og-image.png'], // Match OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://webtoolscenter.com',
  },
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
        {/* Google AdSense */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1210424325925839"
          crossOrigin="anonymous"
        />
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
