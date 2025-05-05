import { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us | WebToolsCenter',
  description: 'Learn about WebToolsCenter, your all-in-one platform for web development tools. Discover our mission, story, and comprehensive suite of 80+ tools designed to simplify web development.',
  keywords: [
    'WebToolsCenter',
    'web development tools',
    'web design tools',
    'online development platform',
    'coding tools',
    'CSS tools',
    'color tools',
    'image tools',
    'text tools',
    'web development utilities'
  ],
  openGraph: {
    title: 'About WebToolsCenter | Web Development Tools Platform',
    description: 'Discover WebToolsCenter - a comprehensive suite of 80+ web development and design tools in one place. Simplifying web development, one tool at a time.',
    type: 'website',
    url: '/about',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About WebToolsCenter | Web Development Tools Platform',
    description: 'Discover our mission to simplify web development with 80+ specialized tools for developers and designers.',
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
    canonical: '/about'
  },
};

export default function AboutUs() {
  return <AboutUsClient />;
}