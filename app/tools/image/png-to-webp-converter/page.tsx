import { Metadata } from 'next';
import PngToWebPClient from './PngToWebPClient';

export const metadata: Metadata = {
    title: 'PNG to WebP Converter | WebToolsCenter',
    description: 'Convert PNG and JPEG images to efficient WebP format with our powerful online converter. Optimize image sizes while maintaining quality.',
    keywords: [
        'PNG to WebP',
        'PNG to WebP converter',
        'convert PNG to WebP',
        'image conversion tool',
        'WebP format',
        'image optimization',
        'web performance',
        'convert images online'
    ],
    openGraph: {
        title: 'PNG to WebP Converter | Optimize Images for Web | WebToolsCenter',
        description: 'Easily convert PNG and JPEG images to WebP format for faster web performance and smaller file sizes.',
        type: 'website',
        url: '/tools/image/png-to-webp-converter',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PNG to WebP Converter | Image Optimization Tool',
        description: 'Convert PNG and JPEG images to WebP format. Improve website loading speeds with our online image converter.',
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
        canonical: '/tools/image/png-to-webp-converter'
    },
};

export default function PNGtoWebPConverter() {
    return <PngToWebPClient />;
}
