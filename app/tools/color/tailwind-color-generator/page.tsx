import { Metadata } from 'next';
import TailWindColorClient from './TailWindColorClient';

export const metadata: Metadata = {
    title: 'Tailwind Color Generator | WebToolsCenter',
    description: 'Discover and explore the full Tailwind CSS color palette with our Tailwind Color Generator. Easily search, filter, and copy color class names and hex codes for your projects.',
    keywords: [
        'tailwind color generator',
        'tailwind css colors',
        'color palette tool',
        'hex code copy',
        'tailwind class names',
        'web design tools',
        'color filter',
        'responsive design',
        'CSS tools'
    ],
    openGraph: {
        title: 'Tailwind Color Generator | Explore Tailwind CSS Colors',
        description: 'Easily explore and discover Tailwind CSS color palettes with filtering options. Copy class names and hex codes instantly for your design projects.',
        type: 'website',
        url: '/tools/color/tailwind-color-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tailwind Color Generator | WebToolsCenter',
        description: 'Explore Tailwind CSS colors and effortlessly copy hex codes and class names for your projects using our intuitive tool.',
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
        canonical: '/tools/color/tailwind-color-generator'
    },
};

export default function TailwindColorGenerator() {
    return <TailWindColorClient />;
}