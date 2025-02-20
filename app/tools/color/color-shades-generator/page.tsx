import { Metadata } from 'next';
import ColorShadesGeneratorClient from './ColorShadesGeneratorClient';

export const metadata: Metadata = {
    title: 'Color Shades Generator | WebToolsCenter',
    description: 'Easily generate multiple shades from a base color with our Color Shades Generator. Perfect for designers and developers looking for harmonious color palettes.',
    keywords: [
        'color shades generator',
        'color palette tool',
        'generate shades',
        'color converter',
        'design tools',
        'web design',
        'color harmonies'
    ],
    openGraph: {
        title: 'Color Shades Generator | Generate Harmonious Color Palettes',
        description: 'Generate multiple harmonious shades from a base color with ease. Ideal for designers and developers working on web design or graphic projects.',
        type: 'website',
        url: '/tools/color/color-shades-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Color Shades Generator | WebToolsCenter',
        description: 'Create harmonious color palettes by generating multiple shades from a base color. Perfect for web designers and developers.',
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
        canonical: '/tools/color/color-shades-generator'
    },
};

export default function ColorShadesGenerator() {
    return <ColorShadesGeneratorClient />;
}
