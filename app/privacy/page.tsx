import { Metadata } from 'next';
import PrivacyPolicyPage from './PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | WebToolsCenter',
  description: 'Learn how WebToolsCenter collects, uses, stores, and protects your personal data. Read our full privacy policy to understand your rights and our responsibilities.',
  keywords: [
    'privacy policy',
    'WebToolsCenter privacy',
    'data protection',
    'user data',
    'personal data',
    'data retention',
    'privacy rights',
    'data security',
    'delete personal data',
    'children privacy policy'
  ],
  openGraph: {
    title: 'Privacy Policy | WebToolsCenter',
    description: 'Read the WebToolsCenter Privacy Policy to understand how your data is collected, used, and protected.',
    type: 'website',
    url: '/privacy',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | WebToolsCenter',
    description: 'Understand how your personal data is handled and protected at WebToolsCenter.'
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
    canonical: '/privacy'
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
