// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { ThemeProvider } from '@/providers/theme-provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <UserProvider>
            <Providers>{children}</Providers>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}