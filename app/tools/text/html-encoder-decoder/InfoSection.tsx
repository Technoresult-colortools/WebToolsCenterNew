"use client"

import { Card } from "@nextui-org/react" // Removed CardBody to match previous structure
// import Link from "next/link"; // Not strictly needed here
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Key Feature: Character Counts, Advanced Tip: Context Matters, Use Case: Data Storage
  ShieldCheck,  // Use Case: Preventing XSS, Advanced Tip: Security First
  Braces,       // Key Feature: Encode & Decode, How to Use: Select Mode, Use Case: HTML Attributes
  Settings2,    // Key Feature: Granular Encoding, How to Use: Configure Options
  ListChecks,   // Use Case section icon
  Copy,         // Key Feature: Easy I/O, How to Use: View & Use Output
  Zap,          // Key Feature: Auto-Processing, Advanced Tips section icon
  Layers,       // Key Feature: Multiple Entity Types, Advanced Tip: Choosing Entity Types
  TerminalSquare, // Use Case: Displaying Code
  Globe,        // Use Case: Internationalization, Advanced Tip: Non-ASCII Characters
  Hash,         // For Numeric entities (Decimal/Hex)
  Type,         // For Named entities
  Eye,
  UploadCloud,
  Filter,
  Settings,
  Share2,          // For "View & Use Output" in How to Use
} from "lucide-react"

export default function InfoSection() {
  // Image for the preview section - REPLACE WITH YOUR ACTUAL IMAGE PATH
  const previewImageSrc = "/Images/InfosectionImages/HTMLEncodePreview1.png?height=400&width=800"; // Placeholder, update this

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          Understanding HTML Encoding & Decoding
        </h2>
        <p className="text-default-600 mb-4">
          HTML encoding (or "escaping") converts special characters (like &lt;, &gt;, &amp;) into HTML entity representations
          (e.g., &lt;, &amp;, &#169;). Decoding reverses this. It's crucial for web security (preventing XSS),
          correct content display, and data integrity in HTML.
        </p>

        <div className="my-8">
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={previewImageSrc}
                alt="HTML Encoder/Decoder interface preview"
                className="w-full h-full object-cover bg-default-200"
              />
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the HTML Encoder/Decoder?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Input your text:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Paste or type the text or HTML code you want to process into the input area.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-4 h-4 text-green-500 flex-shrink-0" />
                <strong className="text-default-700">Select the operation mode:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Choose "Encode" to convert characters into HTML entities, or "Decode" to convert entities back into characters.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <strong className="text-default-700">Configure processing options:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <Settings2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Encoding Type:</strong>
                    <span className="text-default-600 ml-1">Select from Named, Decimal, or Hexadecimal entities.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ListChecks className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Character Options:</strong>
                    <span className="text-default-600 ml-1">Choose how to handle newlines, quotes, and non-ASCII characters.</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Process the text:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Encode" or "Decode" button. For real-time results, enable the "Auto Process" option.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">View the result:</strong>
              </div>
              <p className="text-default-600 ml-6">
                The converted text will appear in the output area, ready for you to review.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-medium">
              6
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <strong className="text-default-700">Copy or download:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Use the provided buttons to copy the output to your clipboard or download it as a text file.
              </p>
            </div>
          </li>
        </ol>

        <h2 id="encoding-types" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Layers className="w-6 h-6 mr-2 text-primary-500" />
          Supported Encoding Entity Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600 mb-6">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Type className="w-4 h-4 mr-2 text-primary-500" /> Named Entities
            </h3>
            <p className="text-sm">Most readable, e.g., <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&lt;</code> for {"<"}, <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&amp;</code> for {"&"}.</p>
            <p className="text-xs mt-1 text-default-500">Covers common special characters.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Hash className="w-4 h-4 mr-2 text-secondary-500" /> Decimal Entities
            </h3>
            <p className="text-sm">Numeric representation, e.g., <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&#60;</code> for {"<"}.</p>
            <p className="text-xs mt-1 text-default-500">Can represent any Unicode character.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-success-500" /> Hexadecimal Entities
            </h3>
            <p className="text-sm">Hex numeric representation, e.g., <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&#x3C;</code> for {"<"}.</p>
            <p className="text-xs mt-1 text-default-500">Alternative numeric, also for any Unicode char.</p>
          </div>
        </div>


        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start"> <Braces className="w-4 h-4 mr-2 mt-0.5 text-primary-500" /> <div><strong>Bidirectional Conversion:</strong> Seamlessly encode to and decode from HTML entities.</div> </div>
          <div className="flex items-start"> <Layers className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" /> <div><strong>Multiple Entity Types:</strong> Supports Named, Decimal, and Hexadecimal entities for encoding.</div> </div>
          <div className="flex items-start"> <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-success-500" /> <div><strong>Granular Encoding Control:</strong> Options for newlines, quotes, and non-ASCII characters.</div> </div>
          <div className="flex items-start"> <Zap className="w-4 h-4 mr-2 mt-0.5 text-warning-500" /> <div><strong>Auto-Processing Option:</strong> Get instant results as you type or change settings.</div> </div>
          <div className="flex items-start"> <Code className="w-4 h-4 mr-2 mt-0.5 text-danger-500" /> <div><strong>Character Counts & Stats:</strong> View input/output lengths and processing details.</div> </div>
          <div className="flex items-start"> <Copy className="w-4 h-4 mr-2 mt-0.5 text-blue-500" /> <div><strong>Easy Input/Output:</strong> Paste, type, upload, copy results, or download files.</div> </div>
        </div>

        <h2 id="use-cases" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <ListChecks className="w-6 h-6 mr-2 text-primary-500" />
          Common Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> <h3 className="font-semibold text-lg mb-2 flex items-center"> <ShieldCheck className="w-4 h-4 mr-2 text-danger-500" /> Preventing XSS </h3> <p className="text-sm">Safely display user content by encoding it, blocking malicious scripts.</p> </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> <h3 className="font-semibold text-lg mb-2 flex items-center"> <TerminalSquare className="w-4 h-4 mr-2 text-blue-500" /> Displaying Code </h3> <p className="text-sm">Show HTML/XML snippets on a webpage without browser interpretation.</p> </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> <h3 className="font-semibold text-lg mb-2 flex items-center"> <Braces className="w-4 h-4 mr-2 text-green-500" /> HTML Attributes </h3> <p className="text-sm">Embed text with special characters safely within tag attributes.</p> </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> <h3 className="font-semibold text-lg mb-2 flex items-center"> <Globe className="w-4 h-4 mr-2 text-purple-500" /> Internationalization </h3> <p className="text-sm">Ensure non-ASCII characters display correctly across systems.</p> </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> <h3 className="font-semibold text-lg mb-2 flex items-center"> <Code className="w-4 h-4 mr-2 text-orange-500" /> Data Integrity </h3> <p className="text-sm">Store or transmit data with special characters without corruption.</p> </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md"> <h3 className="font-semibold text-lg mb-2 flex items-center"> <BookOpen className="w-4 h-4 mr-2 text-teal-500" /> Learning Tool </h3> <p className="text-sm">Understand HTML entity representations of characters.</p> </div>
        </div>

        <h2 id="advanced-tips" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Tips & Considerations
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start"> <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5"> <Layers className="w-4 h-4 text-primary-500" /> </div> <div><strong>Choosing Entity Types:</strong> Named entities (e.g., <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&lt;</code>) are readable but limited. Numeric entities (Decimal: <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&#60;</code>, Hex: <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded">&#x3C;</code>) cover all characters.</div> </li>
            <li className="flex items-start"> <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5"> <Globe className="w-4 h-4 text-secondary-500" /> </div> <div><strong>Non-ASCII Characters:</strong> Use "Encode non-ASCII" for accented letters or symbols outside standard ASCII for maximum compatibility.</div> </li>
            <li className="flex items-start"> <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5"> <ShieldCheck className="w-4 h-4 text-success-500" /> </div> <div><strong>Security First:</strong> Always encode untrusted data before rendering in HTML. Ensure decoded entities are from a trustworthy source.</div> </li>
            <li className="flex items-start"> <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5"> <Code className="w-4 h-4 text-warning-500" /> </div> <div><strong>Context Matters:</strong> Encoding needs vary (HTML content, <code className="text-xs bg-default-200 dark:bg-default-700 px-1 rounded"><script></script></code> tags, URLs, attributes). This tool focuses on HTML content.</div> </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          This HTML Encoder/Decoder tool simplifies managing special characters in web content, helping you build
          more secure and robust web applications.
        </p>
      </div>
    </Card>
  );
}