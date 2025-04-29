import { Metadata } from 'next';
// Assuming your main client component is the default export from PatternGenerator.tsx
// Adjust the import path and name if necessary
import CSSBackgroundPatternGeneratorClient from './CSSBackgroundPatternGeneratorClient';

export const metadata: Metadata = {
    // --- Core Metadata ---
    title: 'CSS Background Pattern Generator | Create Unique Designs | WebToolsCenter',
    description: 'Generate unique CSS background patterns with our versatile tool. Explore dozens of pattern types (dots, lines, geometric, 3D, textures), customize colors, size, opacity, and more. Preview changes instantly and copy/download the generated CSS for your web projects.',
    keywords: [
        'CSS background pattern generator',
        'background patterns',
        'CSS generator',
        'tileable patterns',
        'custom backgrounds',
        'web design tool',
        'CSS textures',
        'geometric patterns',
        '3D CSS patterns',
        'CSS dots',
        'CSS lines',
        'CSS grid',
        'pattern customization',
        'real-time CSS preview',
        'CSS weave patterns',
        'abstract backgrounds'
    ],

    // --- Open Graph (for social sharing) ---
    openGraph: {
        title: 'CSS Background Pattern Generator | Create Custom Patterns | WebToolsCenter',
        description: 'Visually create and customize diverse CSS background patterns. Choose from many types, control colors, size, opacity. Preview live & copy CSS easily.',
        type: 'website',
        // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
        url: 'https://webtoolscenter.com/tools/css/background-pattern-generator',
        siteName: 'WebToolsCenter',
        // Optional: Add an image URL for social sharing previews
        // images: [
        //   {
        //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
        //     width: 1200,
        //     height: 630,
        //     alt: 'CSS Background Pattern Generator Tool Preview',
        //   },
        // ],
    },

    // --- Twitter Card ---
    twitter: {
        card: 'summary_large_image', // Use 'summary' if you don't have a large specific image
        title: 'CSS Background Pattern Generator | Visual Design Tool',
        description: 'Generate custom CSS background patterns easily. Explore types, control settings, preview live, and get the code for your web projects.',
        // Optional: Add Twitter-specific image URL if different from OG
        // images: ['https://webtoolscenter.com/path/to/your/twitter-image.png'],
        // Optional: Add your Twitter username
        // creator: '@YourTwitterHandle',
    },

    // --- Search Engine Directives ---
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

    // --- Canonical URL ---
    alternates: {
        // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
        canonical: 'https://webtoolscenter.com/tools/css/background-pattern-generator'
    }
};

// This remains the default export for the page component
export default function BackgroundPatternGeneratorPage() {
    // Render the client component that contains the actual generator logic and UI
    return <CSSBackgroundPatternGeneratorClient />;
}