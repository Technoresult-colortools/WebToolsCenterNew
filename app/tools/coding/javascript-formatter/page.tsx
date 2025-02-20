import { Metadata } from 'next';
import JavaScriptFormatterClient from './JavaScriptFormatterClient';
export const metadata: Metadata = {
    title: 'JavaScript Formatter | WebToolsCenter',
    description: 'Clean and standardize your JavaScript code with the JavaScript Formatter. Customize indentation, quotes, semicolons, and more for consistent, readable output.',
    keywords: [
        'JavaScript formatter',
        'format JavaScript',
        'JS code cleaner',
        'JS code formatting',
        'JavaScript beautifier',
        'clean JavaScript code',
        'code formatting tool',
        'web development tool',
        'JS code standardization'
    ],
    openGraph: {
        title: 'JavaScript Formatter | Beautify JS Code | WebToolsCenter',
        description: 'Effortlessly format and clean your JavaScript code with our JavaScript Formatter. Ensure consistent and readable output for development projects.',
        type: 'website',
        url: '/tools/coding/javascript-formatter',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JavaScript Formatter | Beautify JS Code Online',
        description: 'Clean and format your JavaScript code with our JavaScript Formatter. Ensure consistent, readable, and error-free code.',
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
        canonical: '/tools/coding/javascript-formatter'
    },
};

export default function JavaScriptFormatter() {
    return <JavaScriptFormatterClient />;
}
