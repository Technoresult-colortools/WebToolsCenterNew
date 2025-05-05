// app/bug-report/page.tsx
import { Metadata } from 'next'
import BugReportPage from './BugReportPage'

export const metadata: Metadata = {
  title: 'Report a Bug | WebToolsCenter',
  description:
    'Found a bug or issue on WebToolsCenter? Submit a bug report to help us improve the platform and provide a smoother experience.',
  keywords: [
    'bug report',
    'report issue',
    'tool bug report',
    'submit bug',
    'webtoolscenter bug',
    'website issue report',
    'online tool bug',
    'report error',
    'tool feedback',
    'platform bug submission'
  ],
  openGraph: {
    title: 'Report a Bug | WebToolsCenter',
    description:
      'Help us improve WebToolsCenter by reporting any bugs you encounter. Your feedback makes our tools better.',
    type: 'website',
    url: '/bug-report',
    siteName: 'WebToolsCenter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Report a Bug | WebToolsCenter',
    description: 'Submit a bug report to help improve the WebToolsCenter experience for everyone.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/bug-report',
  },
}

export default function Page() {
  return <BugReportPage />
}
