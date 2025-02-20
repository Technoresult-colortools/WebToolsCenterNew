import { Metadata } from 'next';
import HtmlMinifierClient from './HtmlMinifierClient';

export const metadata: Metadata = {
    title: 'HTML Minifier | WebToolsCenter',
    description: 'Optimize your HTML code by minifying it with the HTML Minifier tool. Remove unnecessary characters, adjust aggressiveness, and improve your website’s performance with smaller file sizes.',
    keywords: [
        'HTML minifier',
        'HTML optimizer',
        'minify HTML',
        'compress HTML',
        'remove whitespace',
        'reduce file size',
        'web performance optimization',
        'HTML compression tool',
        'HTML file upload minification',
        'minified HTML'
    ],
    openGraph: {
        title: 'HTML Minifier | Optimize HTML for Performance | WebToolsCenter',
        description: 'Minify your HTML code effortlessly with our HTML Minifier. Reduce file size, improve load times, and optimize your web performance.',
        type: 'website',
        url: '/tools/coding/html-minifier',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HTML Minifier | Minify HTML for Faster Websites',
        description: 'Reduce file size and optimize web performance with our HTML Minifier. Remove unnecessary characters for faster page loads.',
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
        canonical: '/tools/coding/html-minifier'
    },
};

export default function HTMLMinifier() {
    return <HtmlMinifierClient />;
}
