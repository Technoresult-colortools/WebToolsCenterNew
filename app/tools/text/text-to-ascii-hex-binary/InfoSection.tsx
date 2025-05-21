"use client"

import { Card } from "@nextui-org/react" // Removed CardBody to match previous structure
// import Link from "next/link"; // Not strictly needed here
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Supported Format: ASCII
  ArrowRightLeft, // Supported Conversion Formats section icon
  Zap,          // Advanced Tip
  Sparkles,     // Advanced Tips section icon
  Braces,       // Supported Format: URL Encoded
  Wand2,        // Advanced Tip
  Keyboard,     // Practical Application: Programming
  Layers,       // (Could be used for multi-stage encoding or different formats)
  Share2,       // Practical Application: Communication
  Settings,     // Advanced Options Explained section icon
  Hexagon,      // Supported Format: Hexadecimal
  Binary,       // Supported Format: Binary (Lucide icon)
  FileCode,     // Supported Format: Base64
  Hash,         // Supported Format: Octal
  Cpu,          // Supported Format: Decimal (Unicode), Advanced Tip
  Lock,         // Practical Application: Cybersecurity
  BarChart,     // Practical Application: Data Analysis
  FileDown,     // Advanced Tip: Batch Processing
  UploadCloud,  // For "Upload text files" in How to Use
  History,      // For "Access conversion history" in How to Use
  FileJson,     // For "Export all results in JSON" in How to Use
  Settings2,    // For formatting options
  ListPlus,     // For "Add/remove conversion formats"
  Repeat,
  FileText,       // For bidirectional conversion
} from "lucide-react"

export default function InfoSection() {
  // Image for the preview section - REPLACE WITH YOUR ACTUAL IMAGE PATH
  const previewImageSrc = "/Images/InfosectionImages/TexttoASCIIPreview.png?height=400&width=600";

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Text to ASCII/Hex/Binary Converter?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
          The Text to ASCII/Hex/Binary Converter is a comprehensive text encoding and decoding tool designed for
          developers, cybersecurity professionals, students, and digital enthusiasts. This versatile utility
          transforms plain text into various encoded formats including ASCII, Hexadecimal, Binary, Base64, Octal,
          URL encoding, and Decimal representations. With bidirectional conversion capabilities, it's an essential tool
          for programming, data analysis, encryption, and education.
        </p>

        <div className="my-8">
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="aspect-w-4 aspect-h-3 w-full"> {/* Adjusted aspect ratio for 600x400 */}
              <img
                src={previewImageSrc}
                alt="/Images/InfosectionImages/TexttoASCIIPreview.png"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Text to ASCII/Hex/Binary Converter?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 text-default-700 flex items-center">
              <Code className="w-5 h-5 mr-2 text-green-500" /> Encoding Text
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-default-600">
              <li>Select "Encode" mode.</li>
              <li>Enter or paste your plain text.</li>
              <li>Choose desired output format (ASCII, Hex, etc.).</li>
              <li>Adjust formatting options (separators, padding).</li>
              <li>View the encoded result.</li>
              <li>Copy or download the result.</li>
            </ol>
          </div>
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 text-default-700 flex items-center">
              <Repeat className="w-5 h-5 mr-2 text-blue-500" /> Decoding Text
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-default-600">
              <li>Select "Decode" mode.</li>
              <li>Enter or paste your encoded text.</li>
              <li>Select the format you're decoding from.</li>
              <li>Click "Decode".</li>
              <li>View decoded plain text.</li>
              <li>Adjust input separator settings if needed.</li>
            </ol>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-default-700 mb-3 mt-6 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-500" /> Additional Features
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600 mb-6">
          <li className="flex items-start"><FileText className="w-4 h-4 mr-2 mt-1 text-primary-500 flex-shrink-0" />Use preset texts for quick testing.</li>
          <li className="flex items-start"><UploadCloud className="w-4 h-4 mr-2 mt-1 text-secondary-500 flex-shrink-0" />Upload text files directly for conversion.</li>
          <li className="flex items-start"><ListPlus className="w-4 h-4 mr-2 mt-1 text-success-500 flex-shrink-0" />Add or remove additional conversion formats.</li>
          <li className="flex items-start"><FileJson className="w-4 h-4 mr-2 mt-1 text-warning-500 flex-shrink-0" />Export all conversion results in a single JSON file.</li>
          <li className="flex items-start"><History className="w-4 h-4 mr-2 mt-1 text-danger-500 flex-shrink-0" />Access recent conversion history.</li>
        </ul>


        <h2 id="supported-formats" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <ArrowRightLeft className="w-6 h-6 mr-2 text-primary-500" />
          Supported Conversion Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {/* ASCII */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <Code className="w-4 h-4 mr-2 text-primary-500" />ASCII
            </h3>
            <p className="text-xs text-default-600">Decimal ASCII (0-127) or extended (0-255).</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"Hi" → "72 105"</div>
          </div>
          {/* Hexadecimal */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <Hexagon className="w-4 h-4 mr-2 text-secondary-500" />Hexadecimal
            </h3>
            <p className="text-xs text-default-600">Base-16 representation of each character.</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"Hi" → "48 69"</div>
          </div>
          {/* Binary */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <Binary className="w-4 h-4 mr-2 text-success-500" />Binary
            </h3>
            <p className="text-xs text-default-600">Base-2 representation of each character.</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"Hi" → "01001000..."</div>
          </div>
          {/* Base64 */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <FileCode className="w-4 h-4 mr-2 text-warning-500" />Base64
            </h3>
            <p className="text-xs text-default-600">Encodes text using Base64 for binary data.</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"Hi" → "SGk="</div>
          </div>
          {/* Octal */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <Hash className="w-4 h-4 mr-2 text-danger-500" />Octal
            </h3>
            <p className="text-xs text-default-600">Base-8 representation of each character.</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"Hi" → "110 151"</div>
          </div>
          {/* URL Encoded */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <Braces className="w-4 h-4 mr-2 text-primary-500" />URL Encoded
            </h3>
            <p className="text-xs text-default-600">Encodes text for safe inclusion in URLs.</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"H W" → "H%20W"</div>
          </div>
          {/* Decimal (Unicode) */}
          <div className="bg-default-100/50 dark:bg-default-200/20 p-4 rounded-lg">
            <h3 className="font-semibold text-base mb-2 flex items-center text-default-700">
              <Cpu className="w-4 h-4 mr-2 text-secondary-500" />Decimal (Unicode)
            </h3>
            <p className="text-xs text-default-600">Unicode code point decimal value.</p>
            <div className="mt-2 text-xs bg-default-200/50 dark:bg-default-300/20 p-2 rounded font-mono">"😀" → "128512"</div>
          </div>
        </div>

        <h2 id="advanced-options" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Options Explained
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Changed gap-4 to gap-6 for consistency */}
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> {/* Added card style */}
            <h3 className="font-semibold text-lg mb-3 text-default-700 flex items-center">
              <Settings2 className="w-5 h-5 mr-2 text-blue-500"/>Output Formatting
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-default-600">
              <li><strong>Output Separator:</strong> Choose spaces, commas, newlines, or custom.</li>
              <li><strong>Byte Padding:</strong> Add leading zeros for consistent length (e.g., "01").</li>
              <li><strong>Group Binary Digits:</strong> Format binary in groups of 4 bits.</li>
              <li><strong>Show Line Numbers:</strong> Add position indicators to encoded values.</li>
            </ul>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> {/* Added card style */}
            <h3 className="font-semibold text-lg mb-3 text-default-700 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-green-500"/>Conversion Settings
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-default-600">
              <li><strong>Case Sensitivity:</strong> Preserve or ignore case differences.</li>
              <li><strong>Bidirectional Conversion:</strong> Switch between encoding and decoding.</li>
              <li><strong>Format Selection:</strong> Add/remove conversion formats.</li>
              <li><strong>Export Options:</strong> Save individual formats or all as JSON.</li>
            </ul>
          </div>
        </div>

        <h2 id="use-cases" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" /> {/* Changed from Lightbulb to Code to match other Use Case titles */}
          Practical Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Programming */}
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center text-default-700">
              <Keyboard className="w-5 h-5 mr-2 text-primary-500" />Programming
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-default-600">
              <li>Convert string literals.</li>
              <li>Debug encoding issues.</li>
              <li>Generate escaped sequences.</li>
            </ul>
          </div>
          {/* Cybersecurity */}
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center text-default-700">
              <Lock className="w-5 h-5 mr-2 text-secondary-500" />Cybersecurity
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-default-600">
              <li>Analyze encoded data.</li>
              <li>Decode suspicious strings.</li>
              <li>Examine network packets.</li>
            </ul>
          </div>
          {/* Education */}
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center text-default-700">
              <BookOpen className="w-5 h-5 mr-2 text-success-500" />Education
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-default-600">
              <li>Understand number systems.</li>
              <li>Learn encoding standards.</li>
              <li>Visualize text representation.</li>
            </ul>
          </div>
          {/* Data Analysis */}
           <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center text-default-700">
              <BarChart className="w-5 h-5 mr-2 text-warning-500" />Data Analysis
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-default-600">
              <li>Convert data formats.</li>
              <li>Prepare text for processing.</li>
              <li>Clean/normalize text data.</li>
            </ul>
          </div>
          {/* Communication */}
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center text-default-700">
              <Share2 className="w-5 h-5 mr-2 text-danger-500" />Communication
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-default-600">
              <li>Encode data for text channels.</li>
              <li>Prepare text for URL params.</li>
              <li>Ensure data integrity.</li>
            </ul>
          </div>
        </div>


        <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips & Techniques
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg mb-6">
          <ul className="space-y-4 text-sm text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Wand2 className="w-4 h-4 text-primary-500" />
              </div>
              <div><strong>Multi-stage Encoding:</strong> Combine encodings sequentially (e.g., Base64 then Hex) for layered schemes.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-secondary-500" />
              </div>
              <div><strong>Unicode Handling:</strong> Use Decimal (Unicode) for emojis/non-Latin characters to see code points and debug issues.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Cpu className="w-4 h-4 text-success-500" />
              </div>
              <div><strong>Byte-level Analysis:</strong> Use byte padding with Hex to examine exact byte representation for debugging.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <FileDown className="w-4 h-4 text-warning-500" />
              </div>
              <div><strong>Batch Processing Workflow:</strong> Export results, clear input, and process next text for efficient multi-tasking.</div>
            </li>
          </ul>
        </div>

        <p className="text-sm md:text-base text-default-600 mt-6">
          Whether you're a developer, cybersecurity pro, student, or anyone needing to convert text formats, our Text to
          ASCII/Hex/Binary Converter offers comprehensive, bidirectional tools. With customizable options and multi-format
          support, it's your ultimate text encoding/decoding solution.
        </p>
      </div>
    </Card>
  );
}