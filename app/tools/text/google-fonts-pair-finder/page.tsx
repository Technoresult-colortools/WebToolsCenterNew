import { Metadata } from 'next';
import GoogleFontsPairClient from './GoogleFontsPairClient';

export const metadata: Metadata = {
    title: 'Google Fonts Pair Finder | WebToolsCenter',
    description: 'Discover harmonious font combinations with our Google Fonts Pair Finder tool. Ideal for designers and developers seeking the perfect typography pairing for web design, print, or branding.',
    keywords: [
        'Google Fonts',
        'font pairing',
        'typography',
        'font combinations',
        'web design',
        'print design',
        'branding',
        'design tools'
    ],
    openGraph: {
        title: 'Google Fonts Pair Finder | Find the Perfect Typography',
        description: 'Explore complementary font combinations using our Google Fonts Pair Finder. Ideal for professional web design, branding, and print projects.',
        type: 'website',
        url: '/tools/design/google-fonts-pair-finder',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Google Fonts Pair Finder | Perfect Typography for Your Projects',
        description: 'Find harmonious Google Fonts combinations effortlessly with our Pair Finder. Tailored for designers and developers creating impactful designs.',
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
        canonical: '/tools/design/google-fonts-pair-finder'
    },
};

export default function GoogleFontsPairFinder() {
    return <GoogleFontsPairClient />;
}
