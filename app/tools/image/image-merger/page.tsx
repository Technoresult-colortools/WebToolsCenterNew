import type { Metadata } from "next"
// Assuming your main client component is the default export from ImageMergeTool.tsx
// Adjust the import path and name if necessary
import ImageMergeToolClient from "./ImageMergeToolClient"


export const metadata: Metadata = {
  // --- Core Metadata ---
  title: "Image Merger Tool | Combine Multiple Images | WebToolsCenter",
  description:
    "Easily merge up to 5 images into a single composition with our powerful Image Merger Tool. Arrange horizontally or vertically, customize borders, adjust scaling, and download in multiple formats. Perfect for creating collages, comparisons, and multi-panel graphics.",
  keywords: [
    "image merger tool",
    "combine images",
    "image fusion",
    "photo collage maker",
    "image composition",
    "merge photos online",
    "image joiner",
    "side by side images",
    "before after comparison",
    "image grid creator",
    "horizontal image merger",
    "vertical image stacker",
    "custom image borders",
    "drag and drop image tool",
    "multi-image composition",
    "photo layout tool",
  ],

  // --- Open Graph (for social sharing) ---
  openGraph: {
    title: "Image Merger Tool | Combine Multiple Images | WebToolsCenter",
    description:
      "Merge up to 5 images with customizable layouts, borders, and scaling options. Create professional collages and comparisons with our easy-to-use drag-and-drop interface.",
    type: "website",
    // *** IMPORTANT: Update this URL to the actual deployed URL of your tool ***
    url: "https://webtoolscenter.com/tools/image/image-merger",
    siteName: "WebToolsCenter",
    // Optional: Add an image URL for social sharing previews
    // images: [
    //   {
    //     url: 'https://webtoolscenter.com/path/to/your/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Image Merger Tool Preview',
    //   },
    // ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image", // Use 'summary' if you don't have a large specific image
    title: "Image Merger Tool | Create Custom Image Compositions",
    description:
      "Combine multiple images into one composition. Arrange horizontally or vertically, add borders, adjust scaling, and download in PNG, JPEG, or WEBP format.",
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
    canonical: "https://webtoolscenter.com/tools/image/image-merger",
  },
}

// This remains the default export for the page component
export default function ImageMergerToolPage() {
  return (
    <>
      
      <ImageMergeToolClient />
    </>
  )
}
