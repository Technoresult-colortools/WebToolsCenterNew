"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Zap,         // Used for Key Features title (already there)
  Settings2,   // Using Settings2 for consistency (was Settings) for "Supported Enhancements"
  Type,        // For "Supported Enhancements" section items, Use Cases
  Lightbulb,   // For Key Features (if Zap is for title, Lightbulb for general Key Features section title)
  Brain,       // AI-Powered Conversion
  MousePointerClick, // Interactive Elements
  Eye,         // Real-time Preview & Tips
  ShieldCheck, // Secure Output/Sanitization
  FileCode,    // File Import/Export
  Highlighter, // Syntax Highlighting
  Smartphone,  // Responsive Design
  Palette,     // Custom Styling
  FileText,    // Use Cases: Documentation, READMEs
  Edit3,       // Use Cases: Blogging & Content Creation
  Mail,        // Use Cases: Emails
  Code,        // Use Cases: Developer Notes & Prototyping & Tips
  GraduationCap, // Use Cases: Education
  Layers,      // Use Cases: Static Site Generation
  Wand2,       // For Advanced Tips title
  Keyboard,    // For Tips
  Puzzle,      // For Tips: Combining features
  Share2,
  UploadCloud,
  FileDiff,      // For Tips: Sharing
 
  // Add other icons as needed from previous examples
} from "lucide-react"
import Link from "next/link"

export default function InfoSection() {
  // Image path
  const imagePath = '/Images/InfosectionImages/MarkdowntoHTMLPreview.png';

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto"> {/* max-w-6xl for consistency */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center"> {/* Standardized heading */}
          <Info className="w-6 h-6 mr-2 text-primary-500" /> {/* Added text-primary-500 */}
          What is the Markdown to HTML Converter?
        </h2>
        <p className="text-default-600 mb-4"> {/* Standardized text */}
          The Markdown to HTML Converter is an AI-enhanced tool designed to transform your Markdown text into clean, well-structured, and styled HTML. More than a simple syntax translator, this converter leverages AI to interpret your content dynamically, producing semantically correct HTML, applying appropriate styling, and even enabling the creation of interactive elements.
        </p>
        <p className="text-default-600 mb-4">
          Whether you're a content creator, developer, technical writer, or educator, this tool empowers you to convert Markdown documents into web-ready HTML efficiently. It preserves formatting, links, images, and supports interactive features like buttons, all while ensuring the output is sanitized and secure.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath}
                  alt="Screenshot of the Markdown to HTML Converter interface"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Markdown to HTML Converter?
        </h2>

        <ol className="list-none space-y-4 text-default-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
              1
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UploadCloud className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <strong className="text-default-700">Input Markdown:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Type, paste, or upload a <code>.md</code>, <code>.markdown</code>, or <code>.txt</code> file into the editor.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Convert your text:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Convert" button to process your Markdown and generate the corresponding HTML.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">View and Preview:</strong>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">HTML Code:</strong>
                    <span className="text-default-600 ml-1">Switch to the "HTML" tab to see the raw, generated code.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileDiff className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                  <div>
                    <strong className="text-default-700">Live Preview:</strong>
                    <span className="text-default-600 ml-1">Use the "Preview" tab to see how your HTML will render in a browser.</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <strong className="text-default-700">Save or Export:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Copy the code to your clipboard, download it as an <code>.html</code> file, or open the preview in a new window.
              </p>
            </div>
          </li>
        </ol>

        <h2 id="supported-enhancements" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Settings2 className="w-6 h-6 mr-2 text-primary-500" />
          Supported Markdown Elements & Enhancements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Type className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Standard Markdown:</strong>
              <span className="block mt-1">Full support for common Markdown syntax including headings, lists, bold, italics, links, images, blockquotes, and inline code.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Code Blocks & Syntax Highlighting:</strong>
              <span className="block mt-1">Fenced code blocks are converted with appropriate HTML structure (<code className="text-xs bg-default-100 px-1 py-0.5 rounded">&lt;pre&gt;&lt;code&gt;&lt;/code&gt;&lt;/pre&gt;</code>) and often include syntax highlighting for various languages.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MousePointerClick className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Interactive Buttons:</strong>
              <span className="block mt-1">Special syntax like <code className="text-xs bg-default-100 px-1 py-0.5 rounded">[Button Text](button:action)</code> can be used to generate clickable HTML buttons (often with JavaScript for interactivity).</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Secure Sanitization:</strong>
              <span className="block mt-1">Output HTML is typically sanitized (e.g., using DOMPurify) to prevent XSS attacks while preserving intended formatting and safe interactive elements.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Comprehensive Styling:</strong>
              <span className="block mt-1">Generated HTML often includes a default stylesheet for professional typography, tables, code blocks, and other elements.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Icon Support (Lucide):</strong>
              <span className="block mt-1">Some converters may parse and render icon syntax (e.g., for Lucide icons) if referenced within the Markdown.</span>
            </div>
          </div>
        </div>

       <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">AI-Powered Conversion:</strong>
              <span className="block mt-1">Intelligently interprets Markdown to produce semantically correct and contextually appropriate HTML.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Real-time Preview:</strong>
              <span className="block mt-1">Instantly visualize how your Markdown translates to rendered HTML, facilitating quick iterations.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FileCode className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">File Import/Export:</strong>
              <span className="block mt-1">Easily upload Markdown files (<code className="text-xs bg-default-100 px-1 py-0.5 rounded">.md</code>, <code className="text-xs bg-default-100 px-1 py-0.5 rounded">.txt</code>) and download the resulting HTML.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Highlighter className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Enhanced Syntax Highlighting:</strong>
              <span className="block mt-1">Clear and attractive styling for code blocks across multiple programming languages.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Responsive HTML Output:</strong>
              <span className="block mt-1">Generated HTML is styled to be responsive and look great on desktops, tablets, and mobile devices.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Security Focused:</strong>
              <span className="block mt-1">Built-in sanitization to protect against cross-site scripting (XSS) vulnerabilities.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MousePointerClick className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Interactive Element Support:</strong>
              <span className="block mt-1">Go beyond static content by creating interactive elements like buttons directly from Markdown.</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Clean & Modern Aesthetics:</strong>
              <span className="block mt-1">The default styling ensures your converted content is presented professionally without extra effort.</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Type className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases for Markdown to HTML
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Edit3 className="w-4 h-4 mr-2 text-primary-500" />
              Blogging & Content Creation
            </h3>
            <p className="text-sm">
              Write articles in Markdown and quickly convert them to HTML for publishing on websites, CMS platforms, or static site generators.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-secondary-500" />
              Technical Documentation
            </h3>
            <p className="text-sm">
              Create and maintain software documentation, API guides, and knowledge bases in Markdown, then convert to HTML for web hosting.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-success-500" />
              HTML Emails
            </h3>
            <p className="text-sm">
              Draft email content in simple Markdown and convert it to HTML, though careful testing is needed for email client compatibility.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2 text-warning-500" />
              Developer Notes & READMEs
            </h3>
            <p className="text-sm">
              Convert project README files or personal developer notes from Markdown to HTML for sharing or viewing in a browser.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-danger-500" />
              Educational Materials
            </h3>
            <p className="text-sm">
              Prepare lecture notes, tutorials, and course content in Markdown and convert to HTML for online learning platforms.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-primary-500" />
              Static Site Generation
            </h3>
            <p className="text-sm">
              Use as a core component in workflows for static site generators, where Markdown files are routinely converted to HTML pages.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips for Optimal Conversion
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Keyboard className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Master Markdown Syntax:</strong> A solid understanding of Markdown (including GFM - GitHub Flavored Markdown extensions like tables) will yield the best HTML output.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Puzzle className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Utilize Special Features:</strong> Experiment with any unique syntax provided by the converter (e.g., for buttons or icons) to enhance your HTML.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Preview Frequently:</strong> Use the live preview to catch formatting issues or unintended conversions early in your writing process.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Code className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Inspect Generated HTML:</strong> For complex layouts or troubleshooting, briefly inspect the generated HTML to understand its structure. This can help if you plan to add custom CSS later.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-danger-100 dark:bg-danger-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Share2 className="w-4 h-4 text-danger-500" />
              </div>
              <div>
                <strong>Post-Conversion Customization:</strong> The generated HTML provides a great base. You can further customize its appearance by adding your own CSS rules or integrating it into larger web projects.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Ready to transform your Markdown content into beautiful, interactive, and secure HTML? Start using our AI-powered Markdown
          to HTML Converter now and experience the perfect blend of simplicity and advanced capabilities. Whether you're creating
          content for the web, drafting documentation, or building interactive tutorials, our tool streamlines the conversion process
          and produces professional, web-ready results every time.
        </p>
      </div>
    </Card>
  )
}