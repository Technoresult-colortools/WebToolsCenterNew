import { Metadata } from 'next';
import MarkdownToHtmlClient from './MarkdownToHtmlClient';

export const metadata: Metadata = {
    title: 'Markdown to HTML Converter | Transform Content | WebToolsCenter',
    description: 'Convert Markdown to clean, properly formatted HTML with our powerful Markdown to HTML Converter. Ideal for developers, writers, and content creators for efficient web content creation.',
    keywords: [
        'markdown to html converter',
        'markdown converter',
        'html generator',
        'content transformation',
        'web development tool',
        'markdown parsing',
        'html output',
        'syntax highlighting'
    ],
    openGraph: {
        title: 'Markdown to HTML Converter | Streamline Content Creation',
        description: 'Effortlessly transform your Markdown content into clean, properly formatted HTML. Perfect for developers, writers, and content creators.',
        type: 'website',
        url: '/tools/text/markdown-to-html-converter',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Markdown to HTML Converter | Transform Content Easily',
        description: 'Convert Markdown to HTML with our feature-rich tool. Ideal for developers, writers, and content creators looking to streamline their workflow.',
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
        canonical: '/tools/text/markdown-to-html-converter'
    },
};

export default function MarkdownConverter() {
    return <MarkdownToHtmlClient />;
}