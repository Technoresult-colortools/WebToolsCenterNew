import { Metadata } from 'next';
import CodeToImageConverterClient from './CodeToImageConverterClient';

export const metadata: Metadata = {
    title: 'Code to Image Converter | WebToolsCenter',
    description: 'Transform your code snippets into beautiful, shareable images with customizable themes, backgrounds, and styling. Perfect for social media, documentation, and presentations.',
    keywords: [
        'code to image',
        'code screenshot',
        'code image generator',
        'syntax highlighting',
        'code sharing',
        'code presentation',
        'code beautifier',
        'code styling',
        'developer tool',
        'programming screenshot',
        'code snippet image',
        'syntax highlighter',
        'code visualization'
    ],
    openGraph: {
        title: 'Code to Image Converter | Beautiful Code Screenshots | WebToolsCenter',
        description: 'Transform your code snippets into stunning, shareable images with customizable themes, backgrounds, and styling options. Perfect for developers sharing code on social media.',
        type: 'website',
        url: '/tools/coding/code-to-image-converter',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Code to Image Converter | Create Beautiful Code Screenshots',
        description: 'Convert your code into visually appealing images with syntax highlighting, custom backgrounds, and styling options. Ideal for sharing on social media and documentation.',
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
        canonical: '/tools/coding/code-to-image-converter'
    },
};

export default function CodeToImageConverter() {
    return <CodeToImageConverterClient />;
}