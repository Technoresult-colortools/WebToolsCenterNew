import { Metadata } from 'next';
import UrlToSlugClient from './UrlToSlugClient';

export const metadata: Metadata = {
    title: 'URL to Slug Creator | WebToolsCenter',
    description: 'Easily convert text into SEO-friendly URL slugs with the URL to Slug Creator. Customize separators, case options, and more for optimized URLs.',
    keywords: [
        'URL to slug',
        'slug generator',
        'URL slug',
        'SEO-friendly URLs',
        'text to slug converter',
        'URL optimization',
        'slug creator tool',
        'URL to text'
    ],
    openGraph: {
        title: 'URL to Slug Creator | WebToolsCenter',
        description: 'Convert text into SEO-friendly URL slugs effortlessly. Customize separators, case options, and optimize your URLs for better performance.',
        type: 'website',
        url: '/tools/coding/url-slug-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'URL to Slug Creator | WebToolsCenter',
        description: 'Quickly generate SEO-friendly URL slugs. Customize for better URL optimization and readability.',
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
        canonical: '/tools/coding/url-slug-generator'
    },
};

export default function URLSlugCreator() {
    return <UrlToSlugClient />;
}
