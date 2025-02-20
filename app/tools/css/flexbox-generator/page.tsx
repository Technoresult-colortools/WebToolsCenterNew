import { Metadata } from 'next';
import FlexBoxGeneratorClient from './FlexBoxGeneratorClient';

export const metadata: Metadata = {
    title: 'CSS Flexbox Generator | WebToolsCenter',
    description: 'Create and visualize flexible layouts effortlessly with the CSS Flexbox Generator. Adjust Flexbox properties interactively and see real-time results, perfect for quick prototyping by web developers and designers.',
    keywords: [
        'CSS Flexbox generator',
        'flexible layouts',
        'interactive interface',
        'real-time visualization',
        'web development tools',
        'layout prototyping',
        'CSS tools'
    ],
    openGraph: {
        title: 'CSS Flexbox Generator | Interactive Layout Tool | WebToolsCenter',
        description: 'Effortlessly create and customize flexible layouts with the CSS Flexbox Generator. Adjust properties interactively and visualize layouts in real-time.',
        type: 'website',
        url: '/tools/css/flexbox-generator',
        siteName: 'WebToolsCenter'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CSS Flexbox Generator | Web Design Tool',
        description: 'Visualize and prototype flexible layouts with the CSS Flexbox Generator. Adjust properties interactively and copy the CSS code easily.'
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
        canonical: '/tools/css/flexbox-generator'
    }
};

export default function CSSFlexboxGenerator() {
    return <FlexBoxGeneratorClient />;
}
