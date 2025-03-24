import { Metadata } from 'next';
import ColorPaletteGeneratorClient from './ColorPaletteGeneratorClient';

export const metadata: Metadata = {
    title: 'AI Color Palette Generator | WebToolsCenter',
    description: 'Create visually stunning color palettes with AI. Simply describe your desired palette in natural language, and our AI will generate custom color schemes perfect for designers, developers, and artists.',
    keywords: [
        'AI color palette generator',
        'text to color palette',
        'AI color scheme tool',
        'natural language color generator',
        'AI design tools',
        'machine learning color palette',
        'AI color harmony',
        'color palette from description',
        'AI-powered design tools',
        'intelligent color scheme',
        'hex code generator',
        'RGB color scheme',
        'HSL colors',
        'UI color preview',
        'AI web design tools'
    ],
    openGraph: {
        title: 'AI Color Palette Generator | Create Palettes from Text Descriptions',
        description: 'Design unique color palettes using AI. Simply describe your desired palette in natural language, and our tool will generate beautiful, harmonious color schemes for your projects.',
        type: 'website',
        url: '/tools/color/ai-color-palette-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Color Palette Generator | WebToolsCenter',
        description: 'Generate custom color palettes using AI. Describe your desired palette in natural language and see it come to life with our interactive UI preview.',
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
        canonical: '/tools/color/ai-color-palette-generator'
    },
};

export default function ColorPaletteGenerator() {
    return <ColorPaletteGeneratorClient />;
}