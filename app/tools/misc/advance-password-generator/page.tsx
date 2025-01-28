import { Metadata } from 'next';
import AdvancedPasswordGeneratorClient from './AdvancedPasswordGeneratorClient';

export const metadata: Metadata = {
    title: 'Advanced Password Generator | Secure & Custom Passwords | WebToolsCenter',
    description: 'Generate strong, secure, and fully customizable passwords instantly. Control length, characters, and complexity to create the perfect password for maximum security.',
    keywords: [
        'password generator',
        'secure password',
        'custom password',
        'strong password',
        'random password',
        'password security',
        'online password tool'
    ],
    openGraph: {
        title: 'Advanced Password Generator | Create Secure Passwords',
        description: 'Easily generate strong and secure passwords with our Advanced Password Generator. Fully customizable with length, numbers, and symbols.',
        type: 'website',
        url: '/tools/misc/advance-password-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Advanced Password Generator | Create Strong Passwords',
        description: 'Generate strong, custom, and secure passwords in seconds. Ultimate password security tool.',
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
        canonical: '/tools/misc/advance-password-generator'
    },
};

export default function AdvancedPasswordGenerator() {
    return <AdvancedPasswordGeneratorClient />;
}
