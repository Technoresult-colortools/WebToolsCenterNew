import { Metadata } from 'next';
import HtmlEncodeClient from './HtmlEncodeClient';

export const metadata: Metadata = {
    title: 'HTML Encoder/Decoder | WebToolsCenter',
    description: 'Easily encode or decode HTML special characters and entities with the HTML Encoder/Decoder. Protect your web content from errors and security vulnerabilities like XSS.',
    keywords: [
        'HTML encoder',
        'HTML decoder',
        'HTML special characters',
        'encode HTML',
        'decode HTML',
        'HTML entities',
        'HTML conversion tool',
        'XSS prevention',
        'HTML security',
        'web encoding tool'
    ],
    openGraph: {
        title: 'HTML Encoder/Decoder | Secure Your Web Content',
        description: 'Encode or decode HTML special characters and entities with ease. Prevent XSS vulnerabilities and ensure secure web content.',
        type: 'website',
        url: '/tools/coding/html-encoder-decoder',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HTML Encoder/Decoder | Secure Your HTML Content',
        description: 'Effortlessly encode or decode HTML characters with our HTML Encoder/Decoder. Enhance security and prevent web errors.',
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
        canonical: '/tools/coding/html-encoder-decoder'
    },
};

export default function HTMLEncoderDecoder() {
    return <HtmlEncodeClient />;
}
