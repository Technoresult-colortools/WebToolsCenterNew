import { Metadata } from 'next';
import YoutubeTagExtractClient from './YoutubeTagExtractClient';

export const metadata: Metadata = {
    title: 'YouTube Keyword Tag Extractor | WebToolsCenter',
    description: 'Easily extract keyword tags from any YouTube video with the YouTube Keyword Tag Extractor. Boost your video SEO, discover relevant tags, and enhance video visibility. Free tool, no login required.',
    keywords: [
        'YouTube keyword tag extractor',
        'extract YouTube tags',
        'video SEO tools',
        'YouTube marketing',
        'YouTube video tags',
        'keyword extractor tool',
        'social media tools',
        'YouTube SEO optimization',
        'YouTube tag finder',
        'video optimization tool'
    ],
    openGraph: {
        title: 'YouTube Keyword Tag Extractor | Boost Video SEO | WebToolsCenter',
        description: 'Extract YouTube keyword tags with ease using our free Keyword Tag Extractor. Perfect for video SEO, content marketing, and optimizing video visibility.',
        type: 'website',
        url: '/tools/social-media/youtube-tag-extractor',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Keyword Tag Extractor | Free SEO Tool',
        description: 'Quickly extract YouTube tags and enhance video visibility with our free Keyword Tag Extractor tool. Optimize your YouTube content effortlessly.'
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
        canonical: '/tools/social-media/youtube-tag-extractor'
    },
};

export default function YouTubeKeywordTagExtractor() {
    return <YoutubeTagExtractClient />;
}
