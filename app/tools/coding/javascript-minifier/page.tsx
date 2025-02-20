import { Metadata } from 'next';
import JavaScriptMinifierClient from './JavaScriptMinifierClient';

export const metadata: Metadata = {
    title: 'JavaScript Minifier | WebToolsCenter',
    description: 'Optimize your JavaScript code with the JavaScript Minifier tool. Reduce file size by removing unnecessary characters and applying optimizations, improving load times and overall site performance.',
    keywords: [
        'JavaScript minifier',
        'minify JavaScript',
        'compress JavaScript',
        'reduce file size',
        'JavaScript file upload',
        'Terser minification',
        'web performance',
        'optimize JavaScript code',
        'remove whitespace from JavaScript',
        'JavaScript optimization tool'
    ],
    openGraph: {
        title: 'JavaScript Minifier | Optimize JS for Performance | WebToolsCenter',
        description: 'Minify your JavaScript code effortlessly with our JavaScript Minifier. Reduce file sizes, enhance load times, and improve website performance.',
        type: 'website',
        url: '/tools/coding/javascript-minifier',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JavaScript Minifier | Reduce JS File Sizes Online',
        description: 'Optimize your JavaScript code with the JavaScript Minifier. Remove unnecessary characters to improve load times and site performance.',
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
        canonical: '/tools/coding/javascript-minifier'
    },
};

export default function JavaScriptMinifier() {
    return <JavaScriptMinifierClient />;
}
