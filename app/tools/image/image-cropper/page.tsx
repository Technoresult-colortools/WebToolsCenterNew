import { Metadata } from 'next';
import ImageCropper from './ImageCropperClient';

export const metadata: Metadata = {
    title: 'Image Cropper | WebToolsCenter',
    description: 'The Image Cropper tool allows you to precisely crop, rotate, and adjust images with multiple aspect ratios. Export in various formats including JPEG, PNG, and WebP with adjustable quality settings.',
    keywords: [
        'image cropper',
        'photo editor',
        'crop images',
        'resize images',
        'aspect ratio',
        'image rotation',
        'image flipping',
        'brightness adjustment',
        'contrast adjustment',
        'JPEG',
        'PNG',
        'WebP',
        'responsive design',
        'mobile-friendly',
        'web design',
        'social media images'
    ],
    openGraph: {
        title: 'Image Cropper | Crop and Edit Images Online | WebToolsCenter',
        description: 'Crop, rotate, flip, and adjust your images with our powerful Image Cropper tool. Export in multiple formats with precise control over dimensions and quality.',
        type: 'website',
        url: '/tools/image/image-cropper',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image Cropper | Online Tool for Perfect Image Dimensions',
        description: 'Crop and edit your images with precision using our Image Cropper tool. Perfect for social media, web design, and print materials.',
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
        canonical: '/tools/image/image-cropper'
    },
};

export default function ImageCropperPage() {
    return <ImageCropper />;
}