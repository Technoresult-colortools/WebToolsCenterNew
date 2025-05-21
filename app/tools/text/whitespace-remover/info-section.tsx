"use client"

import { Card,} from "@nextui-org/react" // Added CardBody
import Image from "next/image" // Using next/image as in your example
import Link from "next/link"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,        // Also for Key Features (Advanced Text Transformations)
  BarChart3,   // Text Statistics, SEO Optimization (Use Case)
  Zap,         // Email Templates (Use Case)
  Download,    // Implied in Export Options
  Copy,        // Export Options
  Sparkles,    // Advanced Tips section icon
  Braces,      // Code Formatting (Use Case)
  Eraser,      // General cleaning icon, could be used for a section title
  FileText,    // Content Creation (Use Case)
  Timer,       // Data Preparation (Use Case)
  Eye,         // Monitor Statistics (Advanced Tip)
  RotateCcw,   // Original Text Restoration
  Scissors,    // Comprehensive Whitespace Cleaning
  Wand2,       // Auto-Detection, Use Auto-Detection First (Advanced Tip)
  Settings,    // Customizable Presets, Choose the Right Preset (Advanced Tip)
  History,     // Version History, Leverage History (Advanced Tip)
  Maximize2,   // Fullscreen Editing
  Undo,        // Undo/Redo Functionality
  CheckSquare, // For specific options in "How to Use"
  Layers,      // Could represent different cleaning layers/options
  AlignJustify,// For line break/compression options
  Trash2,      // For remove options
} from "lucide-react"

export default function InfoSection() {
  // Image path for Whitespace Remover
  const imagePath = "/Images/InfosectionImages/WhitespaceRemoverPreview1.png";

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8"> {/* Removed CardBody here, main Card is enough */}
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Whitespace Remover?
        </h2>
        <p className="text-default-600 mb-4">
          The Whitespace Remover is an advanced text cleaning tool designed for writers, developers, editors,
          and content creators who need precise control over text formatting. This powerful utility goes beyond
          basic whitespace removal to provide comprehensive text cleaning options, customizable presets, and
          intelligent detection of formatting issues. Whether you're cleaning up code, formatting articles,
          preparing data for analysis, or ensuring consistent text appearance across documents, our tool offers
          the flexibility and precision you need for professional-quality results.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                {/* Using next/image. Ensure imagePath is correct and image is in /public */}
                <Image
                  src={imagePath + '?height=400&width=800'} // Query params might not be needed by next/image unless your server uses them
                  alt="Whitespace Remover Pro interface preview"
                  width={800} // Specify width and height for next/image
                  height={450} // Adjust height for 16:9 aspect ratio if 800 is width
                  className="w-full h-auto object-contain" // object-contain or object-cover
                  priority // Add priority if it's an LCP element
                />
              </div>
               {/* Overlay text - removed from original as per Case Converter format */}
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Whitespace Remover?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Enter or paste your text</strong> in the editor area.
          </li>
          <li>
            Select your <strong>cleaning options</strong> from the available settings:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong className="flex items-center"><Trash2 className="w-4 h-4 mr-1.5 text-red-500" />Remove Leading/Trailing Spaces:</strong> Eliminates spaces at the start and end of lines/text.
              </li>
              <li>
                <strong className="flex items-center"><Eraser className="w-4 h-4 mr-1.5 text-orange-500" />Remove Extra Spaces:</strong> Converts multiple consecutive spaces into a single space.
              </li>
              <li>
                <strong className="flex items-center"><AlignJustify className="w-4 h-4 mr-1.5 text-blue-500" />Compress Line Breaks:</strong> Reduces multiple blank lines to a single blank line.
              </li>
              <li>
                <strong className="flex items-center"><Layers className="w-4 h-4 mr-1.5 text-green-500" />Remove Tabs & Indentation:</strong> Eliminates tabs or leading spaces from each line.
              </li>
              <li>
                <strong className="flex items-center"><Wand2 className="w-4 h-4 mr-1.5 text-purple-500" />Normalize All Whitespace:</strong> Converts all whitespace types (tabs, newlines) to standard spaces (often making text single-line).
              </li>
            </ul>
          </li>
          <li>
            Click the <strong>"Remove Whitespace"</strong> or equivalent button to process your text.
          </li>
          <li>
            Explore <strong>Advanced Options/Presets</strong> (if available) for specialized cleaning tasks (e.g., for code, CSV).
          </li>
          <li>
            Utilize the <strong className="flex items-center"><History className="w-4 h-4 mr-1.5 text-yellow-500" />History/Undo features</strong> to track changes or revert if needed.
          </li>
          <li>
            Use utility buttons to:
             <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong className="flex items-center"><Copy className="w-4 h-4 mr-1.5 text-indigo-500"/>Copy</strong> cleaned text.</li>
                <li><strong className="flex items-center"><Download className="w-4 h-4 mr-1.5 text-teal-500"/>Download</strong> as a file.</li>
                <li><strong className="flex items-center"><Trash2 className="w-4 h-4 mr-1.5 text-pink-500"/>Clear</strong> the input.</li>
                <li><strong className="flex items-center"><RotateCcw className="w-4 h-4 mr-1.5 text-cyan-500"/>Restore Original</strong> text.</li>
            </ul>
          </li>
          <li>
            Toggle <strong className="flex items-center"><Maximize2 className="w-4 h-4 mr-1.5 text-gray-500" />Fullscreen mode</strong> for larger texts.
          </li>
        </ol>

        <h2 id="cleaning-options" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Eraser className="w-6 h-6 mr-2 text-primary-500" />
          Core Cleaning Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Trash2 className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Leading/Trailing Space Removal:</strong> Cleans spaces from the beginning and end of each line or the entire text.</div>
          </div>
          <div className="flex items-start">
            <Eraser className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Extra Space Reduction:</strong> Condenses multiple spaces between words into a single space.</div>
          </div>
          <div className="flex items-start">
            <AlignJustify className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Line Break Compression:</strong> Reduces consecutive blank lines to one, or removes all blank lines.</div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Tab & Indent Removal:</strong> Strips all tab characters or leading spaces from lines.</div>
          </div>
          <div className="flex items-start">
            <Wand2 className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Whitespace Normalization:</strong> Converts various whitespace characters (tabs, newlines) into a single space, often for single-line output.</div>
          </div>
          <div className="flex items-start">
            <CheckSquare className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Remove All Whitespace:</strong> Strips every space, tab, and newline character from the text.</div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Scissors className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Targeted Cleaning:</strong> Multiple options for precise whitespace control.</div>
          </div>
          <div className="flex items-start">
            <Wand2 className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Intelligent Auto-Detection:</strong> (If applicable) Scans and suggests cleaning based on text content.</div>
          </div>
          <div className="flex items-start">
            <Settings className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Customizable Presets:</strong> Pre-configured settings for common tasks like code or data cleaning.</div>
          </div>
          <div className="flex items-start">
            <History className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Version Control:</strong> Track changes and revert to previous text states.</div>
          </div>
          <div className="flex items-start">
            <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Live Statistics:</strong> Real-time metrics on characters, words, lines, and whitespace removed.</div>
          </div>
          <div className="flex items-start">
            <Maximize2 className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Fullscreen Mode:</strong> Distraction-free editing for large documents.</div>
          </div>
          <div className="flex items-start">
            <Undo className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" /> {/* Combined with History, but can be separate */}
            <div><strong>Undo/Redo Actions:</strong> Easily step back and forth through edits.</div>
          </div>
          <div className="flex items-start">
            <RotateCcw className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Restore Original:</strong> One-click reset to the initial input.</div>
          </div>
          <div className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-warning-500" /> {/* Part of Export */}
            <div><strong>Easy Export:</strong> Copy to clipboard or download cleaned text.</div>
          </div>
          <div className="flex items-start">
            <Code className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Advanced Transformations:</strong> Functions like converting tabs to spaces or normalizing line endings.</div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" /> {/* Re-using Code for Use Cases, appropriate */}
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-primary-500" /> Content Polishing
            </h3>
            <p className="text-sm">
              Clean articles, blog posts, and web content for consistent formatting and a professional look.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Braces className="w-4 h-4 mr-2 text-secondary-500" /> Code & Script Cleanup
            </h3>
            <p className="text-sm">
              Normalize indentation, remove unwanted spaces, and prepare code for sharing or documentation.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Timer className="w-4 h-4 mr-2 text-success-500" /> Data Cleansing
            </h3>
            <p className="text-sm">
              Prepare CSV, JSON, or other structured text data by removing extraneous whitespace for proper parsing.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-warning-500" /> Academic Formatting
            </h3>
            <p className="text-sm">
              Ensure consistent spacing and paragraph structure in research papers, essays, and theses.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-danger-500" /> SEO Content Prep
            </h3>
            <p className="text-sm">
              Clean meta descriptions and title tags to meet character limits and formatting guidelines.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-primary-500" /> Email & Template Normalization
            </h3>
            <p className="text-sm">
              Ensure consistent display of email templates and marketing content across various clients.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Wand2 className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Start with Auto-Detection:</strong> If your tool has it, use auto-detect first to get initial suggestions before fine-tuning options.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Settings className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Utilize Presets:</strong> For common tasks (e.g., "Code Cleaning" or "Single Line CSV"), presets can save time and ensure correct settings.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <History className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Iterate with History:</strong> Make incremental changes. Use the history/undo to compare cleaning results and find the best balance.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Watch the Stats:</strong> Keep an eye on character/line counts and the reduction percentage to understand the impact of your cleaning.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a developer cleaning up code, a writer polishing content, or a data analyst preparing
          information for processing, the Whitespace Remover provides the precision tools you need to ensure
          clean, consistent, and properly formatted text. Start using it today to streamline your workflow and
          achieve professional-quality results with just a few clicks.
        </p>
      </div>
    </Card>
  );
}