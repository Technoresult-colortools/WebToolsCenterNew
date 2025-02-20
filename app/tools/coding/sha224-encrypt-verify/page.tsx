import { Metadata } from 'next';
import Sha224EncryptClient from './Sha224EncryptClient';

export const metadata: Metadata = {
    title: 'SHA-224 Encrypt Verifier | WebToolsCenter',
    description: 'Generate and verify SHA-224 hashes for text and files using the SHA-224 Encrypt Verifier. Supports multiple input formats, clipboard integration, and easy hash verification.',
    keywords: [
        'SHA-224 encrypt',
        'SHA-224 hash',
        'hash verifier',
        'text to SHA-224',
        'file hashing',
        'SHA-224 tool',
        'hash generator',
        'hash verification',
        'cryptography',
        'data integrity'
    ],
    openGraph: {
        title: 'SHA-224 Encrypt Verifier | WebToolsCenter',
        description: 'Quickly generate and verify SHA-224 hashes for text and files with support for multiple input formats and clipboard integration.',
        type: 'website',
        url: '/tools/coding/sha224-encrypt-verify',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SHA-224 Encrypt Verifier | WebToolsCenter',
        description: 'Generate and verify SHA-224 hashes for enhanced cryptographic security and data integrity.',
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
        canonical: '/tools/coding/sha224-encrypt-verify'
    },
};

export default function SHA224EncryptVerify() {
    return <Sha224EncryptClient />;
}
