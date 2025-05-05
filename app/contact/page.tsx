import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | WebToolsCenter',
  description: 'Get in touch with the WebToolsCenter team. Send us a message or connect with us on social media for support, feedback, or inquiries.',
  keywords: [
    'contact WebToolsCenter',
    'get in touch',
    'support',
    'feedback',
    'WebToolsCenter contact',
    'contact form',
    'reach out',
    'social media',
    'customer support',
    'help'
  ],
  openGraph: {
    title: 'Contact Us | WebToolsCenter',
    description: 'Get in touch with the WebToolsCenter team. Send us a message or connect on social media for support, feedback, or inquiries.',
    type: 'website',
    url: '/contact',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | WebToolsCenter',
    description: 'Get in touch with the WebToolsCenter team. Send us a message or connect with us on social media.',
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
    canonical: '/contact'
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}