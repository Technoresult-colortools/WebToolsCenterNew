import { Metadata } from 'next';
import LoginPage from './LoginPage';

export const metadata: Metadata = {
  title: 'Login | WebToolsCenter',
  description: 'Log in to WebToolsCenter to access your personalized web toolkit. Sign in securely using Google, GitHub, Twitter, Facebook, and more.',
  keywords: [
    'login',
    'sign in',
    'WebToolsCenter login',
    'developer login',
    'auth0 login',
    'Google login',
    'GitHub login',
    'Twitter login',
    'Facebook login',
    'web tools login'
  ],
  openGraph: {
    title: 'Login | WebToolsCenter',
    description: 'Securely log in to WebToolsCenter to access your personalized tools and settings.',
    type: 'website',
    url: '/login',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | WebToolsCenter',
    description: 'Sign in to your WebToolsCenter account to manage your tools and preferences.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: '/login'
  },
};

export default function Page() {
  return <LoginPage />;
}
