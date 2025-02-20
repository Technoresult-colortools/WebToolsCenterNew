import { Metadata } from 'next';
import HsvToRgbClient from './HsvToRgbClient';

export const metadata: Metadata = {
    title: 'HSV to RGB Converter | WebToolsCenter',
    description: 'Convert HSV (Hue, Saturation, Value) color values to RGB (Red, Green, Blue) format effortlessly with our user-friendly HSV to RGB Converter. Ideal for artists, designers, and developers.',
    keywords: [
        'HSV to RGB',
        'color converter',
        'color conversion tool',
        'web design tools',
        'RGB color codes',
        'digital design',
        'HSV color model',
        'color space conversion',
        'graphic design',
        'UI/UX design',
        'color theory',
        'web development'
    ],
    openGraph: {
        title: 'HSV to RGB Converter | Easy Color Conversion Tool | WebToolsCenter',
        description: 'Easily convert HSV (Hue, Saturation, Value) values to RGB (Red, Green, Blue) format. Perfect for designers and developers needing precise color formats.',
        type: 'website',
        url: '/tools/color/hsv-to-rgb',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HSV to RGB Converter | WebToolsCenter',
        description: 'Effortlessly convert HSV color values to RGB format with our tool. Designed for artists, designers, and developers.',
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
        canonical: '/tools/color/hsv-to-rgb'
    },
};

export default function HSVToRGB() {
    return <HsvToRgbClient />;
}