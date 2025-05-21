import { Metadata } from 'next';
import CaseConverterClient from './CaseConverterClient';

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: "Case Converter & Text Transformer | Multi-Language Text Formatting | WebToolsCenter",
  description:
    "Transform text with our powerful Case Converter & Text Transformer. Convert between camelCase, PascalCase, snake_case and more with multi-language support, advanced text manipulation, and detailed statistics.",
  keywords: [
    "case converter",
    "text transformer",
    "camelCase converter",
    "PascalCase converter",
    "snake_case converter",
    "kebab-case converter",
    "title case converter",
    "multi-language text formatting",
    "text case changer",
    "text manipulation tool",
    "code formatting",
    "text statistics",
    "language detection",
    "text analysis",
    "text formatting",
    "programming naming conventions",
  ],

  // --- Open Graph (for social sharing) ---
  openGraph: {
    title: "Case Converter & Text Transformer | Multi-Language Text Formatting | WebToolsCenter",
    description:
      "Transform text with powerful case conversion and formatting. Support for 12+ case types and 10+ languages with intelligent text analysis.",
    type: "website",
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    url: "https://webtoolscenter.com/tools/text/case-converter",
    siteName: "WebToolsCenter",
    // Optional: Add an image URL for social sharing previews
    // images: [
    //   {
    //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Case Converter & Text Transformer Tool Preview',
    //   },
    // ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image", // Use 'summary' if you don't have a large specific image
    title: "Case Converter & Text Transformer | Multi-Language Text Formatting",
    description:
      "Transform text with powerful case conversion and formatting. Support for 12+ case types and 10+ languages with intelligent text analysis.",
    // Optional: Add Twitter-specific image URL if different from OG
    // images: ['https://webtoolscenter.com/path/to/your/twitter-image.png'],
    // Optional: Add your Twitter username
    // creator: '@YourTwitterHandle',
  },

  // --- Search Engine Directives ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // --- Canonical URL ---
  alternates: {
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    canonical: "https://webtoolscenter.com/tools/text/case-converter",
  },
}
export default function CaseConverter() {
    return <CaseConverterClient />;
}
