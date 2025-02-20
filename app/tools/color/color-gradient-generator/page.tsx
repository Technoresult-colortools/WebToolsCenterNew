import { Metadata } from 'next';
import ColorGradientGeneratorClient from './ColorGradientGeneratorClient';

export const metadata: Metadata = {
    title: 'Color Gradient Generator | WebToolsCenter',
    description: 'Create beautiful linear, radial, and conic CSS gradients with the Color Gradient Generator. Add up to 5 color stops, adjust angles, and generate CSS code or PNG exports for your web design and graphic projects.',
    keywords: [
        'color gradient generator',
        'CSS gradients',
        'linear gradient',
        'radial gradient',
        'conic gradient',
        'web design tools',
        'gradient CSS code',
        'gradient PNG export',
        'color stops',
        'color picker',
        'gradient generator tool',
        'graphic design'
    ],
    openGraph: {
        title: 'Color Gradient Generator | Create Stunning Gradients',
        description: 'Generate linear, radial, and conic CSS gradients with ease. Add multiple color stops, adjust angles, and export CSS code or PNGs for your web and graphic design projects.',
        type: 'website',
        url: '/tools/color/color-gradient-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Color Gradient Generator | WebToolsCenter',
        description: 'Design and customize CSS gradients with our Color Gradient Generator. Adjust colors, angles, and stops, and export your design as CSS or PNG.',
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
        canonical: '/tools/color/color-gradient-generator'
    },
};

export default function GradientGeneratorPage() {
    return <ColorGradientGeneratorClient />;
}