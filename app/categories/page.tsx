import { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';

export const metadata: Metadata = {
  title: 'Web Development Tools | WebToolsCenter',
  description: 'Explore our comprehensive collection of web development and design tools. Find tools for coding, CSS, color manipulation, image editing, text formatting, and more.',
  keywords: [
    'web development tools',
    'coding tools',
    'CSS tools',
    'color tools',
    'image tools',
    'text tools',
    'developer utilities',
    'web design resources',
    'online web tools',
    'free development tools'
  ],
  openGraph: {
    title: 'Web Development Tools Collection | WebToolsCenter',
    description: 'Discover our extensive library of web development and design tools to streamline your workflow. Search, filter, and find the perfect tools for your projects.',
    type: 'website',
    url: '/tools',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Tools | WebToolsCenter',
    description: 'Explore our comprehensive collection of tools designed for web developers and designers.',
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
    canonical: '/tools'
  },
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}