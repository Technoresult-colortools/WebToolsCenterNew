import { Metadata } from 'next';
import MarkdownToHtmlClient from './MarkdownToHtmlClient';

export const metadata: Metadata = {
    title: 'AI-Powered Markdown to HTML Converter | Transform Content | WebToolsCenter',
    description: 'Convert Markdown to clean, properly formatted HTML with our AI-powered Markdown to HTML Converter. Leverages AI for intelligent content transformation ideal for developers, writers, and content creators.',
    keywords: [
        'AI markdown converter',
        'markdown to html converter',
        'AI-powered html generator',
        'Mistral AI converter',
        'intelligent content transformation',
        'web development tool',
        'markdown parsing',
        'interactive html output',
        'syntax highlighting'
    ],
    openGraph: {
        title: 'AI-Powered Markdown to HTML Converter | Intelligent Content Transformation',
        description: 'Effortlessly transform your Markdown content into clean, interactive HTML using advanced AI. Perfect for developers, writers, and content creators seeking professional results.',
        type: 'website',
        url: '/tools/text/markdown-to-html-converter',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI-Powered Markdown to HTML Converter | Intelligent Transformation',
        description: 'Convert Markdown to HTML with our AI-enhanced tool powered by Mistral AI. Create interactive, professionally styled content with intelligent conversion.',
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