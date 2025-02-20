import { Metadata } from 'next';
import Base64ToImageClient from './Base64ToImageClient';

export const metadata: Metadata = {
    title: 'Base64 to Image Converter | WebToolsCenter',
    description: 'Convert Base64 encoded strings back into image files with our Base64 to Image Converter. Perfect for decoding Base64 strings from HTML, CSS, or JavaScript files into viewable images.',
    keywords: [
        'base64 to image',
        'base64 to image converter',
        'convert base64 to image',
        'base64 decoding',
        'base64 image decoder',
        'download decoded image',
        'base64 converter',
        'decode base64 string'
    ],
    openGraph: {
        title: 'Base64 to Image Converter | Decode Base64 to Images | WebToolsCenter',
        description: 'Easily convert Base64 encoded strings back to image files. Perfect for developers working with embedded Base64 image data.',
        type: 'website',
        url: '/tools/image/base64-to-image',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Base64 to Image Converter | Decode Base64 Easily',
        description: 'Convert Base64 strings back to image files. Use our Base64 to Image Converter to decode and download images quickly.',
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
        canonical: '/tools/image/base64-to-image'
    },
};

export default function Base64ToImageConverter() {
    return <Base64ToImageClient />;
}