import { Metadata } from 'next';
import ImageFiltersClient from './ImageFiltersClient';

export const metadata: Metadata = {
    title: 'Image Filters | Enhance Your Photos Online | WebToolsCenter',
    description: 'Transform your images effortlessly with the Image Filters tool. Apply artistic filters, adjust intensity, and enhance photos for photographers, designers, and social media enthusiasts.',
    keywords: [
        'image filters',
        'photo editing',
        'image enhancement',
        'filter intensity',
        'grayscale',
        'sepia',
        'hue rotation',
        'image manipulation',
        'visual content creation',
        'social media images',
        'artistic effects',
        'photo filters online'
    ],
    openGraph: {
        title: 'Image Filters | Photo Enhancement Tool | WebToolsCenter',
        description: 'Easily enhance your photos online with a variety of filters. Perfect for photographers, designers, and anyone creating visual content.',
        type: 'website',
        url: '/tools/image/image-filters',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image Filters | Online Photo Editing Tool',
        description: 'Apply stunning filters to your images and adjust intensity for professional results. Transform your visuals with ease.',
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
        canonical: '/tools/image/image-filters'
    },
};

export default function EnhancedImageFilters() {
    return <ImageFiltersClient />;
}