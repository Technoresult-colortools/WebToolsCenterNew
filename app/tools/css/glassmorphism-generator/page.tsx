import { Metadata } from 'next';
import GlassMorphismGeneratorClient from './GlassMorphismGeneratorClient';

export const metadata: Metadata = {
    title: 'Glassmorphism Generator | WebToolsCenter',
    description: 'Create stunning glass-like UI elements with the Glassmorphism Generator. Customize shapes, colors, blur intensity, transparency, and more. Real-time preview and easy CSS code generation.',
    keywords: [
        'Glassmorphism generator',
        'glass effect',
        'UI design',
        'CSS glassmorphism',
        'blur effect',
        'customizable glass design',
        'transparency',
        'CSS generator',
        'web design tool'
    ],
    openGraph: {
        title: 'Glassmorphism Generator | Create Stunning Glass-Like UI Designs',
        description: 'Design beautiful glass-like UI elements with customizable settings for shapes, colors, blur intensity, transparency, and more. Generate CSS easily.',
        type: 'website',
        url: '/tools/css/glassmorphism-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Glassmorphism Generator | WebToolsCenter',
        description: 'Generate stunning glass-like UI elements with our Glassmorphism Generator. Fully customizable and easy to use.'
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
        canonical: '/tools/css/glassmorphism-generator'
    }
};

export default function GlassmorphismGenerator() {
    return <GlassMorphismGeneratorClient />;
}
