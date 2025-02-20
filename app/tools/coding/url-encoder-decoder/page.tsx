import { Metadata } from 'next';
import UrlEncoderClient from './UrlEncoderClient';

export const metadata: Metadata = {
    title: 'URL Encoder/Decoder | WebToolsCenter',
    description: 'Effortlessly encode or decode URLs with the URL Encoder/Decoder tool. Supports bulk processing, file uploads, and offers customizable encoding modes for secure and valid URL management.',
    keywords: [
        'URL encoder',
        'URL decoder',
        'encode URL',
        'decode URL',
        'bulk URL processing',
        'file upload URL encode',
        'file upload URL decode',
        'URL validation',
        'encode special characters',
        'URL optimization tool'
    ],
    openGraph: {
        title: 'URL Encoder/Decoder | WebToolsCenter',
        description: 'Easily encode or decode URLs for secure and valid URL management with bulk processing and customizable modes.',
        type: 'website',
        url: '/tools/coding/url-encoder-decoder',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'URL Encoder/Decoder | WebToolsCenter',
        description: 'Encode or decode URLs seamlessly with support for bulk processing and file uploads.',
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
        canonical: '/tools/coding/url-encoder-decoder'
    },
};

export default function URLEncoderDecoder() {
    return <UrlEncoderClient />;
}
