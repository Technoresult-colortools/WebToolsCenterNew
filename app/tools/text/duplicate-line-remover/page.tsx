import { Metadata } from 'next';
import DuplicateLineRemoverClient from './DuplicateLineRemoverClient';

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: "Duplicate Line Remover & Analyzer | Text Deduplication Tool | WebToolsCenter",
  description:
    "Clean, analyze, and visualize duplicate patterns in text with advanced filtering, sorting, and statistics. Perfect for data cleaning, code maintenance, log analysis, and content management.",
  keywords: [
    "duplicate line remover",
    "text deduplication",
    "duplicate analyzer",
    "text cleaning tool",
    "remove duplicate lines",
    "find duplicates in text",
    "duplicate pattern analysis",
    "text processing",
    "data cleaning",
    "code maintenance",
    "log file analysis",
    "content deduplication",
    "text sorting",
    "regex text filter",
    "duplicate visualization",
    "line counter",
  ],

  // --- Open Graph (for social sharing) ---
  openGraph: {
    title: "Duplicate Line Remover & Analyzer | Text Deduplication Tool | WebToolsCenter",
    description:
      "Clean, analyze, and visualize duplicate patterns in text with advanced filtering, sorting, and statistics for efficient text processing.",
    type: "website",
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    url: "https://webtoolscenter.com/tools/text/duplicate-line-remover",
    siteName: "WebToolsCenter",
    // Optional: Add an image URL for social sharing previews
    // images: [
    //   {
    //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Duplicate Line Remover & Analyzer Tool Preview',
    //   },
    // ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image", // Use 'summary' if you don't have a large specific image
    title: "Duplicate Line Remover & Analyzer | Text Deduplication Tool",
    description:
      "Clean, analyze, and visualize duplicate patterns in text with advanced filtering, sorting, and statistics.",
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
    canonical: "https://webtoolscenter.com/tools/text/duplicate-line-remover",
  },
}


export default function DuplicateLineRemover() {
    return <DuplicateLineRemoverClient />;
}
