import { Metadata } from 'next';
import YoutubeRegionRestrictionClient from './YoutubeRegionRestrictionClient';

export const metadata: Metadata = {
    title: 'YouTube Region Restriction Finder | WebToolsCenter',
    description: 'Check YouTube video availability across regions with the YouTube Region Restriction Finder. Identify geo-restrictions and optimize your global content strategy for a wider audience reach.',
    keywords: [
        'YouTube region restriction finder',
        'geo-blocking checker',
        'video availability tool',
        'global content strategy',
        'YouTube geo-restrictions',
        'content distribution',
        'international audience',
        'YouTube marketing',
        'video accessibility tool',
        'YouTube analytics'
    ],
    openGraph: {
        title: 'YouTube Region Restriction Finder | Check Video Availability | WebToolsCenter',
        description: 'Discover where YouTube videos are available with our Region Restriction Finder. Instantly identify geo-restrictions to optimize your content strategy.',
        type: 'website',
        url: '/tools/social-media/youtube-region-restriction-finder',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Region Restriction Finder | Geo-Blocking Checker',
        description: 'Easily check YouTube video availability by region. Identify geo-restrictions and optimize your global content strategy with this free tool.'
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
        canonical: '/tools/social-media/youtube-region-restriction-finder'
    }
};
  
export default function YouTubeRegionRestrictionFinder() {
  return <YoutubeRegionRestrictionClient />;
}
