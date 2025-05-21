import { Metadata } from 'next';
import TextReverserClient from './TextReverserClient';

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: "Text Reverser & Word Manipulator | Transform Text Creatively | WebToolsCenter",
  description:
    "Transform text with our powerful Text Reverser & Word Manipulator. Reverse by character, word, sentence, or paragraph. Create mirror text, flip upside down, and apply custom patterns for creative text effects.",
  keywords: [
    "text reverser",
    "word manipulator",
    "reverse text",
    "mirror text",
    "upside down text",
    "backwards text",
    "word reversal",
    "sentence reversal",
    "text transformation",
    "creative writing tool",
    "word puzzle creator",
    "text flip",
    "character reversal",
    "paragraph reversal",
    "custom text patterns",
    "text manipulation",
  ],

  // --- Open Graph (for social sharing) ---
  openGraph: {
    title: "Text Reverser & Word Manipulator | Transform Text Creatively | WebToolsCenter",
    description:
      "Transform text with powerful reversal options. Reverse by character, word, sentence, or create special effects like mirror text and upside-down text.",
    type: "website",
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    url: "https://webtoolscenter.com/tools/text/text-reverser",
    siteName: "WebToolsCenter",
    // Optional: Add an image URL for social sharing previews
    // images: [
    //   {
    //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Text Reverser & Word Manipulator Tool Preview',
    //   },
    // ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image", // Use 'summary' if you don't have a large specific image
    title: "Text Reverser & Word Manipulator | Transform Text Creatively",
    description:
      "Transform text with powerful reversal options. Create mirror text, flip upside down, and apply custom patterns for creative text effects.",
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
    canonical: "https://webtoolscenter.com/tools/text/text-reverser",
  },
}
export default function TextReverser() {
    return <TextReverserClient />;
}
