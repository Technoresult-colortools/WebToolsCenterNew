import { Metadata } from 'next';
import TermsAndConditions from './TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms and Conditions | WebToolsCenter',
  description: 'Read the Terms and Conditions of using WebToolsCenter. Understand your rights, responsibilities, and our policies when using our website and services.',
  keywords: [
    'terms and conditions',
    'WebToolsCenter terms',
    'terms of service',
    'website terms',
    'user agreement',
    'legal terms',
    'web tools policy',
    'service terms',
    'acceptable use policy',
    'WebToolsCenter usage policy'
  ],
  openGraph: {
    title: 'Terms and Conditions | WebToolsCenter',
    description: 'Review the terms and conditions that govern your use of WebToolsCenter services.',
    type: 'website',
    url: '/terms',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | WebToolsCenter',
    description: 'Learn about the rules and conditions for using WebToolsCenter tools and services.'
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
    canonical: '/terms'
  },
};

export default function Page() {
  return <TermsAndConditions />;
}
