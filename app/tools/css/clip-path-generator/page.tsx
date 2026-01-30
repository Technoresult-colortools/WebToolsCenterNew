import { Metadata } from 'next';
import ClipPathGeneratorClient from './ClipPathGeneratorClient';

export const metadata: Metadata = {
    title: 'Clip Path Generator | WebToolsCenter',
    description: 'Create custom CSS shapes instantly with our free visual Clip Path Generator. Drag points to sculpt polygons, circles, and complex masks, then copy the CSS code in one click.',
    keywords: [
        'Clip path generator',
        'CSS clip-path',
        'custom shapes',
        'clip-path tool',
        'interactive shape adjustment',
        'CSS generator',
        'clip path preview',
        'web design tools'
    ],
    openGraph: {
        title: 'Clip Path Generator | Design Custom Shapes | WebToolsCenter',
        description: 'Create and customize CSS clip-path shapes with ease. Adjust properties visually, preview changes, and copy the CSS for your web design projects.',
        type: 'website',
        url: '/tools/css/clip-path-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clip Path Generator | Visual CSS Design Tool',
        description: 'Easily design and customize CSS clip-path shapes. Adjust shape settings, preview results, and copy CSS for your creative projects.'
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
        canonical: '/tools/css/clip-path-generator'
    }
};

export default function ClipPathGenerator() {
    return <ClipPathGeneratorClient />;
}
