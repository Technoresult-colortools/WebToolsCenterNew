import { Metadata } from 'next';
import ImageColorPickerClient from './ImageColorPickerClient';

export const metadata: Metadata = {
    title: 'Image Color Picker | WebToolsCenter',
    description: 'Extract colors from any image with our Image Color Picker. Easily select, copy, and save colors in HEX, RGB, and HSL formats for your design projects. Features real-time magnification and color history for quick access.',
    keywords: [
        'image color picker',
        'color extraction',
        'HEX',
        'RGB',
        'HSL',
        'color formats',
        'design tools',
        'color magnifier',
        'color history',
        'web design',
        'graphic design',
        'color picker tool'
    ],
    openGraph: {
        title: 'Image Color Picker | Extract Colors from Images | WebToolsCenter',
        description: 'Extract colors from any image using our Image Color Picker. Ideal for designers to quickly generate HEX, RGB, and HSL palettes.',
        type: 'website',
        url: '/tools/image/image-color-picker',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image Color Picker | Online Tool for Designers',
        description: 'Extract and save colors from images with the Image Color Picker. Create palettes in HEX, RGB, and HSL formats for your projects.',
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
        canonical: '/tools/image/image-color-picker'
    },
};

export default function ImageColorPicker() {
    return <ImageColorPickerClient />;
}
