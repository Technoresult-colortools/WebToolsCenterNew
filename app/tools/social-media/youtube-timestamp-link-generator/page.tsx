import { Metadata } from 'next';
import YouTubeTimestampLinkGeneratorClient from './YouTubeTimestampLinkGeneratorClient'; // Assuming your client component is the default export of './page.tsx' or similar

export const metadata: Metadata = {
    title: 'YouTube Timestamp Link Generator | Interactive Timestamping | WebToolsCenter',
    description: 'Create shareable YouTube timestamp links with custom labels. Interactively pick timestamps while watching or enter them manually. Generates links & descriptions for easy sharing. Free, no login needed.',
    keywords: [
        'YouTube timestamp generator',
        'timestamp link creator',
        'YouTube time links',
        'interactive YouTube timestamp',
        'custom YouTube timestamps',
        'share YouTube video section',
        'link to specific time YouTube',
        'YouTube navigation tool',
        'video timestamp tool',
        'YouTube tools',
        'add labels to timestamps',
        'YouTube comments timestamps',
        'generate YouTube chapters'
    ],
    openGraph: {
        title: 'YouTube Timestamp Link Generator | Share Specific Video Moments | WebToolsCenter',
        description: 'Generate timestamped YouTube links with custom labels interactively or manually. Easily share specific video sections with our free tool.',
        type: 'website',
        url: '/tools/social-media/youtube-timestamp-generator', // <-- Replace with your actual URL path
        siteName: 'WebToolsCenter'
        // Consider adding an 'images' array here with a relevant preview image if you have one
        // images: [
        //   {
        //     url: '/images/youtube-timestamp-generator-preview.png', // Example path
        //     width: 1200,
        //     height: 630,
        //     alt: 'YouTube Timestamp Link Generator Tool Interface',
        //   },
        // ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Create YouTube Timestamp Links Interactively | Free Tool | WebToolsCenter',
        description: 'Easily create & share timestamped YouTube links with custom labels. Pick times while watching or enter manually! Free generator.'
        // Consider adding 'images' here too if you have a specific Twitter image
        // images: ['/images/youtube-timestamp-generator-twitter-card.png'], // Example path
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1, // Standard setting
            'max-image-preview': 'large', // Standard setting
            'max-snippet': -1 // Standard setting
        }
    },
    alternates: {
        canonical: '/tools/social-media/youtube-timestamp-generator' // <-- Replace with your actual URL path
    },
};

// Assuming your actual page component is the default export from './page.tsx' or wherever it lives
export default function YouTubeTimestampGeneratorPage() {
    // The actual JSX for the page is in the client component
    return <YouTubeTimestampLinkGeneratorClient />;
}