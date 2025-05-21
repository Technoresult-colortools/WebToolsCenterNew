"use client"

import { Card } from "@nextui-org/react"
import Link from "next/link"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Use Case: Web Design
  Zap,          // Use Case Section Icon, Advanced Tip
  Shuffle,      // Key Feature, How to Use
  Copy,         // Key Feature, How to Use
  Type,         // Key Feature: Extensive Font Library
  AlignLeft,    // Advanced Tip: Hierarchy
  Sparkles,     // Key Feature: Intelligent Pairing, Advanced Tips Section Icon
  FileText,     // Key Feature: Font Details
  Eye,          // Key Feature: Real-time Preview, Advanced Tip
  RotateCcw,    // Advanced Tip: Context & Mood
  Settings2,    // Key Feature: Full Customization
  ListFilter,   // Key Feature: Advanced Font Filtering, How to Use
  Palette,      // Use Case: Branding & Identity
  LayoutGrid,   // Use Case: UI/UX Design
  Wand2,        // For "Pairing Strategies" section or general "magic" of finding pairs
  Layers,       // Could represent font layers/hierarchy
  CheckSquare,  // For actionable items in "How to Use"
  Search,       // For font selection/finding
  Baseline,     // Representing typography base
} from "lucide-react"

export default function InfoSection() {
  // Image for the preview section
  const previewImageSrc = "/Images/InfosectionImages/GoogleFontpairPreview.png?height=400&width=800";

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-6">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Google Fonts Pair Finder?
        </h2>
        <p className="text-default-600 mb-4">
          The Google Fonts Pair Finder is an innovative tool designed for designers, developers, and typography
          enthusiasts. It simplifies the process of finding harmonious font combinations from Google's extensive font
          library. With customizable options and{" "}
          <Link href="#features" className="text-primary-500 hover:underline">
            powerful features
          </Link>
          , our tool helps you create visually appealing and readable designs for your web projects, print materials,
          or any typographic needs.
        </p>
        <p className="text-default-600 mb-4">
          Whether you're working on a website, creating a brand identity, or just exploring typography, this tool
          offers a comprehensive way to experiment with font pairings. It's like having a typographic playground at
          your fingertips!
        </p>

        <div className="my-8">
          <Link href={previewImageSrc} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img 
                  src={previewImageSrc} 
                  alt="Google Fonts Pair Finder interface preview" 
                  className="w-full h-auto object-contain" 
                />
              </div>
              {/* Overlay text removed to match simpler preview style of other examples */}
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Google Fonts Pair Finder?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong className="flex items-center"><Search className="w-4 h-4 mr-1.5 text-blue-500" />Choose a heading font</strong> from the Google Fonts library.
          </li>
          <li>
            <strong className="flex items-center"><Search className="w-4 h-4 mr-1.5 text-green-500" />Select a complementary body font</strong> to pair with your heading.
          </li>
          <li>
            <strong className="flex items-center"><Settings2 className="w-4 h-4 mr-1.5 text-orange-500" />Adjust font properties</strong> like sizes, weights, and styles.
          </li>
          <li>
            <strong className="flex items-center"><Eye className="w-4 h-4 mr-1.5 text-purple-500" />Use the real-time preview</strong> to see your font pair in action.
          </li>
          <li>
            <strong className="flex items-center"><Shuffle className="w-4 h-4 mr-1.5 text-red-500" />Experiment with "Random Pair"</strong> for quick inspiration.
          </li>
          <li>
            <strong className="flex items-center"><ListFilter className="w-4 h-4 mr-1.5 text-yellow-500" />Filter fonts</strong> by category (serif, sans-serif, etc.) or popularity.
          </li>
          <li>
            <strong className="flex items-center"><Copy className="w-4 h-4 mr-1.5 text-indigo-500" />Easily copy the CSS</strong> for your chosen font pair.
          </li>
          <li>
            <strong className="flex items-center"><FileText className="w-4 h-4 mr-1.5 text-teal-500" />Access "Font Details"</strong> for more on each font's characteristics.
          </li>
        </ol>

        <h2 id="pairing-strategies" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Effective Pairing Strategies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Contrast is Key:</strong> Pair a distinctive heading font (e.g., display, bold serif) with a highly readable, neutral body font (e.g., sans-serif).</div>
          </div>
          <div className="flex items-start">
            <Palette className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Harmonize Styles:</strong> Choose fonts from the same superfamily or those with similar x-heights, letterforms, or historical origins for subtle harmony.</div>
          </div>
          <div className="flex items-start">
            <Baseline className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Readability First:</strong> Ensure the body font is exceptionally legible at small sizes and for long-form text. Test with real content.</div>
          </div>
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Limit to Two (or Three):</strong> Stick to two main fonts for clarity. A third can be used sparingly for accents or specific elements.</div>
          </div>
          <div className="flex items-start">
            <LayoutGrid className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Consider the Mood:</strong> Select fonts that reflect the project's personality—formal, playful, modern, traditional.</div>
          </div>
          <div className="flex items-start">
            <CheckSquare className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Test Across Devices:</strong> Preview your pairs on different screen sizes to ensure they render well everywhere.</div>
          </div>
        </div>

        <h2 id="features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" />
            <div><strong>Vast Font Library:</strong> Full access to Google Fonts.</div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div><strong>Smart Pairing Suggestions:</strong> Curated recommendations.</div>
          </div>
          <div className="flex items-start">
            <Eye className="w-4 h-4 mr-2 mt-0.5 text-success-500 flex-shrink-0" />
            <div><strong>Live Preview:</strong> Instant visualization in various layouts.</div>
          </div>
          <div className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-warning-500 flex-shrink-0" />
            <div><strong>Full Customization:</strong> Adjust size, weight, line height, etc.</div>
          </div>
          <div className="flex items-start">
            <Shuffle className="w-4 h-4 mr-2 mt-0.5 text-danger-500 flex-shrink-0" />
            <div><strong>Random Pair Generator:</strong> Discover unexpected combinations.</div>
          </div>
          <div className="flex items-start">
            <ListFilter className="w-4 h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" />
            <div><strong>Advanced Font Filtering:</strong> By category, popularity, and more.</div>
          </div>
          <div className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div><strong>CSS Export:</strong> Easily copy generated CSS for implementation.</div>
          </div>
          <div className="flex items-start">
            <FileText className="w-4 h-4 mr-2 mt-0.5 text-success-500 flex-shrink-0" />
            <div><strong>Font Details & Licensing:</strong> Comprehensive info for each font.</div>
          </div>
        </div>

        <h2 id="use-cases" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" /> Web Design
            </h3>
            <p className="text-sm">
              Craft engaging and readable websites with harmonious heading and body fonts.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Palette className="w-4 h-4 mr-2 text-secondary-500 flex-shrink-0" /> Branding & Identity
            </h3>
            <p className="text-sm">
              Establish unique visual identities for brands with memorable font pairings.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <LayoutGrid className="w-4 h-4 mr-2 text-success-500 flex-shrink-0" /> UI/UX Design
            </h3>
            <p className="text-sm">
              Enhance user experience in apps and interfaces with well-chosen font combinations.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-warning-500 flex-shrink-0" /> Presentations & Docs
            </h3>
            <p className="text-sm">
              Improve the visual appeal and readability of slideshows, reports, and documents.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-danger-500 flex-shrink-0" /> Print & Publishing
            </h3>
            <p className="text-sm">
              Select effective font pairs for books, magazines, brochures, and other print media.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" /> Personal Projects
            </h3>
            <p className="text-sm">
              Experiment and learn about typography for blogs, portfolios, or creative endeavors.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips for Font Pairing
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1.5 rounded-full mr-3 mt-0.5 flex-shrink-0">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Embrace Contrast:</strong> Combine fonts with distinct characteristics (e.g., serif with sans-serif) for visual interest and hierarchy.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1.5 rounded-full mr-3 mt-0.5 flex-shrink-0">
                <Eye className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Prioritize Readability:</strong> Ensure your body font is highly legible at smaller sizes. Test pairings on actual content.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1.5 rounded-full mr-3 mt-0.5 flex-shrink-0">
                <RotateCcw className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Consider Context & Mood:</strong> The right pair depends on the project's tone. A playful pair for a blog, a formal one for a corporate site.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1.5 rounded-full mr-3 mt-0.5 flex-shrink-0">
                <AlignLeft className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Establish Clear Hierarchy:</strong> Use variations in size, weight, and style within your chosen pair to guide the reader's eye.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to elevate your typography game? Start using our Google Fonts Pair Finder now and discover the perfect
          font combinations for your projects. Whether you're a professional designer or a hobbyist, our tool provides
          the inspiration and functionality you need to create visually stunning designs.
        </p>
      </div>
    </Card>
  );
}