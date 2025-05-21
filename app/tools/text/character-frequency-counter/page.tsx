import { Metadata } from 'next';
import CharacterFrequencyClient from './CharacterFrequencyClient';

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: "Character Frequency Analyzer | Text Pattern Analysis Tool | WebToolsCenter",
  description:
    "Analyze character, word, and n-gram frequencies in text with advanced filtering, visualization, and statistics. Perfect for linguistic research, cryptography, authorship analysis, and text pattern discovery.",
  keywords: [
    "character frequency counter",
    "text analyzer",
    "word frequency",
    "n-gram analysis",
    "bigram frequency",
    "trigram frequency",
    "linguistic analysis",
    "text pattern detection",
    "character distribution",
    "frequency visualization",
    "text statistics",
    "cryptography tool",
    "authorship analysis",
    "language patterns",
    "text frequency",
    "regex text filter",
  ],

  // --- Open Graph (for social sharing) ---
  openGraph: {
    title: "Character Frequency Analyzer | Text Pattern Analysis Tool | WebToolsCenter",
    description:
      "Analyze character, word, and n-gram frequencies in text with advanced filtering, visualization, and statistics for linguistic research and pattern discovery.",
    type: "website",
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    url: "https://webtoolscenter.com/tools/text/character-frequency-analyzer",
    siteName: "WebToolsCenter",
    // Optional: Add an image URL for social sharing previews
    // images: [
    //   {
    //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Character Frequency Analyzer Tool Preview',
    //   },
    // ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image", // Use 'summary' if you don't have a large specific image
    title: "Character Frequency Analyzer | Text Pattern Analysis Tool",
    description:
      "Analyze character, word, and n-gram frequencies in text with advanced filtering, visualization, and statistics.",
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
    canonical: "https://webtoolscenter.com/tools/text/character-frequency-analyzer",
  },
}

export default function CharacterFrequencyCounter() {
    return <CharacterFrequencyClient />;
}
