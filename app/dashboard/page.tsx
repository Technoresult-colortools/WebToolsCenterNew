import { Metadata } from 'next';
import DashboardPage from './DashboardPage';

export const metadata: Metadata = {
  title: 'User Dashboard | WebToolsCenter',
  description: 'Access your personalized dashboard on WebToolsCenter. View your favorite tools, manage comments, submit bug reports, and request new tools.',
  keywords: [
    'dashboard',
    'user dashboard',
    'WebToolsCenter dashboard',
    'favorite tools',
    'bug reports',
    'tool requests',
    'user comments',
    'profile settings',
    'developer tools',
    'custom tools'
  ],
  openGraph: {
    title: 'User Dashboard | WebToolsCenter',
    description: 'Access and manage your personal tools, comments, and requests on WebToolsCenter.',
    type: 'website',
    url: '/dashboard',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'User Dashboard | WebToolsCenter',
    description: 'Manage your WebToolsCenter favorites, comments, bug reports, and tool requests from your personalized dashboard.',
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
    canonical: '/dashboard'
  },
};

export default function Page() {
  return <DashboardPage />;
}
