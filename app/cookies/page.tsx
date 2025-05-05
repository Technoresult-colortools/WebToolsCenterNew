import { Metadata } from 'next';
import CookiesPageClient from './CookiesPageClient';

export const metadata: Metadata = {
  title: 'Cookie Settings | WebToolsCenter',
  description: 'Manage your cookie preferences on WebToolsCenter. Learn about how we use cookies to enhance your experience and customize your cookie settings.',
  keywords: [
    'cookie settings',
    'cookie policy',
    'cookie preferences',
    'privacy settings',
    'cookie management',
    'GDPR compliance',
    'website cookies',
    'cookie consent',
    'data privacy',
    'cookie options'
  ],
  openGraph: {
    title: 'Cookie Settings | WebToolsCenter',
    description: 'Manage your cookie preferences and learn how we use cookies to improve your experience on WebToolsCenter.',
    type: 'website',
    url: '/cookies',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Settings | WebToolsCenter',
    description: 'Manage your cookie preferences and understand our cookie policy.',
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
    canonical: '/cookies'
  },
};

export default function CookiesPage() {
  return <CookiesPageClient />;
}