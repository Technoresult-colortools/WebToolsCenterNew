import { Metadata } from 'next';
import Base64EncodeClient from './Base64EncodeClient';

export const metadata: Metadata = {
    title: 'Base64 Encoder/Decoder | WebToolsCenter',
    description: 'Easily encode or decode text and files using Base64 Encoder/Decoder. Supports real-time text conversion, file uploads, and clipboard copying for quick and efficient processing.',
    keywords: [
        'Base64 encoder',
        'Base64 decoder',
        'binary to text',
        'text to Base64',
        'encode Base64',
        'decode Base64',
        'file to Base64',
        'Base64 converter',
        'Base64 tool',
        'encode binary data'
    ],
    openGraph: {
        title: 'Base64 Encoder/Decoder | Encode & Decode Online',
        description: 'Encode or decode text and files with the Base64 Encoder/Decoder. Real-time conversion, file upload support, and clipboard copying for fast processing.',
        type: 'website',
        url: '/tools/coding/base64-encoder-decoder',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Base64 Encoder/Decoder | Online Conversion Tool',
        description: 'Quickly encode or decode text and files with our Base64 Encoder/Decoder. Perfect for developers and data encoding needs.',
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
        canonical: '/tools/coding/base64-encoder-decoder'
    },
};

export default function Base64EncoderDecoder() {
    return <Base64EncodeClient />;
}
