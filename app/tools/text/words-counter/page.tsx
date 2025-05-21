import { Metadata } from 'next';
import WordCounterClient from './WordCounterClient';

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: "Words Counter & Text Analyzer | Advanced Text Statistics | WebToolsCenter",
  description:
    "Analyze text with our comprehensive Words Counter & Text Analyzer. Count words, characters, sentences, and paragraphs. Get keyword density, reading time, and powerful text transformation tools.",
  keywords: [
    "word counter",
    "text analyzer",
    "character counter",
    "word count tool",
    "text statistics",
    "keyword density analyzer",
    "reading time calculator",
    "text transformation tool",
    "SEO text analysis",
    "sentence counter",
    "paragraph counter",
    "unique words counter",
    "text formatter",
    "case converter",
    "content analysis tool",
    "writing assistant",
  ],

  // --- Open Graph (for social sharing) ---
  openGraph: {
    title: "Words Counter & Text Analyzer | Advanced Text Statistics | WebToolsCenter",
    description:
      "Analyze and transform text with our powerful tool. Count words, characters, sentences, and get advanced metrics like keyword density and reading time.",
    type: "website",
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    url: "https://webtoolscenter.com/tools/text/words-counter",
    siteName: "WebToolsCenter",
    // Optional: Add an image URL for social sharing previews
    // images: [
    //   {
    //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Words Counter & Text Analyzer Tool Preview',
    //   },
    // ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image", // Use 'summary' if you don't have a large specific image
    title: "Words Counter & Text Analyzer | Advanced Text Statistics",
    description:
      "Count words, analyze text structure, and transform content with our comprehensive text analysis tool. Perfect for writers, editors, and content creators.",
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
    canonical: "https://webtoolscenter.com/tools/text/words-counter",
  },
}

export default function WordsCounter() {
    return <WordCounterClient />;
}
