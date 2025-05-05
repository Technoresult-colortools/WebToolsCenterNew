import { Metadata } from 'next';
import ToolRequestPage from './ToolRequestPage';

export const metadata: Metadata = {
  title: 'Request a Tool | WebToolsCenter',
  description: 'Submit your idea for a new tool to be added to WebToolsCenter. Help us build tools that solve real problems and serve a broader community.',
  keywords: [
    'tool request',
    'submit tool idea',
    'suggest a tool',
    'new tool submission',
    'request new feature',
    'WebToolsCenter tools',
    'tool proposal form',
    'web tool suggestions',
    'online tools request',
    'tool development request'
  ],
  openGraph: {
    title: 'Request a Tool | WebToolsCenter',
    description: 'Have a great idea for a web tool? Share it with us and help expand the WebToolsCenter ecosystem.',
    type: 'website',
    url: '/tool-request',
    siteName: 'WebToolsCenter'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Tool | WebToolsCenter',
    description: 'Submit your tool idea to help shape the future of WebToolsCenter.'
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
    canonical: '/tool-request'
  },
};

export default function Page() {
  return <ToolRequestPage />;
}
