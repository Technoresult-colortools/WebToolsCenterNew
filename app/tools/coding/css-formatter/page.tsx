import { Metadata } from 'next';
import CssFormatterClient from './CssFormatterClient';

export const metadata: Metadata = {
    title: 'CSS Formatter | WebToolsCenter',
    description: 'Clean and standardize your CSS code with the CSS Formatter powered by Prettier. Ensure consistent, readable stylesheets with options for indentation, quotes, and property sorting.',
    keywords: [
        'CSS formatter',
        'format CSS',
        'Prettier CSS',
        'clean CSS',
        'CSS code formatting',
        'CSS beautifier',
        'consistent CSS output',
        'CSS code standardization',
        'web development tool',
        'CSS code cleaner'
    ],
    openGraph: {
        title: 'CSS Formatter | Beautify CSS Code | WebToolsCenter',
        description: 'Effortlessly clean and format your CSS code with the CSS Formatter. Powered by Prettier, it ensures consistent and readable stylesheets for developers.',
        type: 'website',
        url: '/tools/coding/css-formatter',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CSS Formatter | Clean and Beautify CSS Online',
        description: 'Standardize and clean your CSS code with our CSS Formatter. Ideal for web developers to ensure consistent, readable stylesheets.',
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
        canonical: '/tools/coding/css-formatter'
    },
};

export default function CSSFormatter() {
    return <CssFormatterClient />;
}
