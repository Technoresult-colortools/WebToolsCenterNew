"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Type,
  Zap,
  Download,
  Copy,
  Sparkles,
  Settings2,
  Braces,
  ArrowRightLeft,
  Wand2,
  Keyboard,
  AlignLeft,
  Layers,
  Globe,
  CaseSensitive,
  CaseLowerIcon,
  CaseUpperIcon,
  Heading1,
  Baseline,
  Minus,
  Scissors,
  Calculator,
  RotateCcw,
  History,
} from "lucide-react"
import Link from "next/link"

export default function InfoSection() {
  // Image path
  const imagePath = '/Images/InfosectionImages/CaseconverterPreview1.png';

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Case Converter & Text Transformer?
        </h2>
        <p className="text-default-600 mb-4">
          The Case Converter & Text Transformer is a versatile text manipulation tool designed for writers, developers,
          content creators, and language enthusiasts. This comprehensive utility goes beyond simple case conversion to
          offer a complete suite of text transformation options, including multiple case formats, language-aware
          conversions, and powerful text manipulation tools. Whether you're formatting code according to naming
          conventions, preparing content for publication, or analyzing text statistics, our tool provides precise
          control over text formatting to enhance your workflow and productivity.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img 
                  src={imagePath} 
                  alt="Case Converter & Text Transformer Preview" 
                  className="w-full h-auto object-contain" 
                />
              </div>
              
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Case Converter & Text Transformer?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Enter or paste your text</strong> in the input area on the left side of the interface.
          </li>
          <li>
            Select the appropriate tab to access different conversion and transformation options:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Case Conversion:</strong> Choose from multiple case formats (lowercase, UPPERCASE, Title Case,
                camelCase, etc.) and language settings.
              </li>
              <li>
                <strong>Advanced Options:</strong> Configure preservation settings for acronyms, whitespace handling,
                and other formatting options.
              </li>
              <li>
                <strong>Text Tools:</strong> Access a variety of text manipulation tools like reverse, remove spaces,
                trim, sort lines, and more.
              </li>
              <li>
                <strong>Text Statistics:</strong> View detailed information about your text, including character count,
                word count, reading time, and language detection.
              </li>
              <li>
                <strong>History:</strong> Access your conversion history to restore previous transformations.
              </li>
            </ul>
          </li>
          <li>Configure the desired options based on your specific needs.</li>
          <li>
            Click the <strong>Convert Text</strong> button to apply your selected transformations.
          </li>
          <li>Review the transformed text in the output area on the right side of the interface.</li>
          <li>
            Toggle <strong>Show diff view</strong> to see a visual comparison of what changed between the original and
            converted text.
          </li>
          <li>
            Use the utility buttons to <strong>Copy</strong> or <strong>Download</strong> your transformed text.
          </li>
          <li>
            Click <strong>Apply to Input</strong> if you want to use the transformed text as a basis for further
            manipulations.
          </li>
        </ol>

        <h2 id="case-types" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Type className="w-6 h-6 mr-2 text-primary-500" />
          Supported Case Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <CaseLowerIcon className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>lowercase:</strong> Convert all characters to lowercase, ideal for consistent formatting and
              readability.
            </div>
          </div>
          <div className="flex items-start">
            <CaseUpperIcon className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>UPPERCASE:</strong> Transform all characters to uppercase, perfect for headings, acronyms, and
              emphasis.
            </div>
          </div>
          <div className="flex items-start">
            <Heading1 className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Title Case:</strong> Capitalize the first letter of each word, with language-aware rules for
              articles and prepositions.
            </div>
          </div>
          <div className="flex items-start">
            <Baseline className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>camelCase:</strong> Join words and capitalize each word after the first, commonly used in
              JavaScript and Java.
            </div>
          </div>
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>PascalCase:</strong> Similar to camelCase, but capitalize the first word too, used in C#,
              TypeScript classes.
            </div>
          </div>
          <div className="flex items-start">
            <Minus className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>snake_case:</strong> Replace spaces with underscores and use all lowercase, popular in Python and
              Ruby.
            </div>
          </div>
          <div className="flex items-start">
            <Minus className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>kebab-case:</strong> Replace spaces with hyphens and use all lowercase, common in URLs and CSS
              classes.
            </div>
          </div>
          <div className="flex items-start">
            <CaseSensitive className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>ToGgLe CaSe:</strong> Alternate between uppercase and lowercase for each character, for creative
              text styling.
            </div>
          </div>
          <div className="flex items-start">
            <AlignLeft className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Alternate CASE:</strong> Alternate between lowercase and uppercase for each word, for stylized
              text.
            </div>
          </div>
          <div className="flex items-start">
            <Braces className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>dot.case:</strong> Replace spaces with dots and use all lowercase, used in package names and
              domains.
            </div>
          </div>
          <div className="flex items-start">
            <Keyboard className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>CONSTANT_CASE:</strong> Replace spaces with underscores and use all uppercase, for constants in
              programming.
            </div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>path/case:</strong> Replace spaces with forward slashes and use all lowercase, for file paths and
              URLs.
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-primary-500" />
          Multi-Language Support
        </h2>
        <p className="text-default-600 mb-4">
          Our Case Converter supports intelligent case conversion across multiple languages, with special rules for
          each:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">English</h3>
            <p className="text-xs">
              Full support for all case types with special rules for articles and prepositions in Title Case.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">Spanish</h3>
            <p className="text-xs">
              Supports all Latin-based case types with special handling for Spanish articles and conjunctions.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">French</h3>
            <p className="text-xs">
              Intelligent case conversion with special rules for French articles, prepositions, and conjunctions.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">German</h3>
            <p className="text-xs">
              Supports all case types with consideration for German capitalization rules for nouns.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">Russian</h3>
            <p className="text-xs">
              Full support for Cyrillic characters with appropriate case conversion for Russian text.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">Chinese</h3>
            <p className="text-xs">
              Limited case support (Chinese doesn't use case), but supports basic text operations and statistics.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">Japanese</h3>
            <p className="text-xs">
              Limited case support (Japanese doesn't use case), but supports basic text operations and statistics.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">Arabic</h3>
            <p className="text-xs">
              Support for right-to-left text with appropriate case conversion for Arabic characters.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Multiple Case Formats:</strong> Convert text to any of 12+ different case formats with a single
              click, from lowercase to PascalCase and beyond.
            </div>
          </div>
          <div className="flex items-start">
            <Globe className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Multi-Language Support:</strong> Intelligent case conversion for 10+ languages with automatic
              language detection and language-specific rules.
            </div>
          </div>
          <div className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Advanced Options:</strong> Fine-tune your conversions with options to preserve acronyms, handle
              whitespace, and normalize text formatting.
            </div>
          </div>
          <div className="flex items-start">
            <Scissors className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Text Manipulation Tools:</strong> Access a comprehensive toolkit for text operations like
              reversing, removing spaces, trimming, sorting, and more.
            </div>
          </div>
          <div className="flex items-start">
            <Calculator className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Detailed Text Statistics:</strong> Get comprehensive analytics about your text, including
              character count, word count, reading time, and language insights.
            </div>
          </div>
          <div className="flex items-start">
            <ArrowRightLeft className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Visual Diff Comparison:</strong> See exactly what changed between your original and converted text
              with a color-coded difference view.
            </div>
          </div>
          <div className="flex items-start">
            <History className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Conversion History:</strong> Access your previous conversions with full undo/redo functionality
              for a seamless editing experience.
            </div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Intelligent Preservation:</strong> Maintain acronyms, special formatting, and language-specific
              features during conversion.
            </div>
          </div>
          <div className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>One-Click Copy:</strong> Easily copy converted text to clipboard for use in other applications.
            </div>
          </div>
          <div className="flex items-start">
            <Download className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Text Download:</strong> Save your converted text as a file for later use or sharing.
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Braces className="w-4 h-4 mr-2 text-primary-500" /> Programming
            </h3>
            <p className="text-sm">
              Convert variable names between different naming conventions (camelCase, snake_case, PascalCase) when
              working across different programming languages or adapting code to specific style guides.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Type className="w-4 h-4 mr-2 text-secondary-500" /> Content Creation
            </h3>
            <p className="text-sm">
              Format titles, headings, and text for publications, ensuring consistent capitalization and style across
              articles, blog posts, and marketing materials in multiple languages.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-success-500" /> Translation Work
            </h3>
            <p className="text-sm">
              Maintain proper capitalization and formatting when working with multilingual content, with automatic
              language detection and language-specific rules for case conversion.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-warning-500" /> Data Formatting
            </h3>
            <p className="text-sm">
              Clean and standardize text data for analysis, database import, or reporting, ensuring consistent
              formatting and removing unwanted characters or duplicate lines.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <AlignLeft className="w-4 h-4 mr-2 text-danger-500" /> Academic Writing
            </h3>
            <p className="text-sm">
              Format citations, references, and bibliographies according to specific style guides, ensuring proper
              capitalization of titles, names, and technical terms.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Calculator className="w-4 h-4 mr-2 text-primary-500" /> Text Analysis
            </h3>
            <p className="text-sm">
              Analyze text for readability, complexity, and structure with detailed statistics on word count, character
              count, sentence length, and reading time across multiple languages.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Multi-Stage Transformations:</strong> Use the "Apply to Input" button to perform sequential
                transformations. For example, first convert to Title Case, then apply to input and convert to camelCase
                to create properly capitalized camelCase text.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Globe className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Language-Specific Formatting:</strong> For multilingual content, use the language selector to
                ensure proper case conversion according to the rules of each language. The auto-detect feature works
                best with paragraphs rather than single words.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Keyboard className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Preserving Special Terms:</strong> Enable the "Preserve acronyms" option when working with
                technical content to maintain the correct capitalization of acronyms like HTML, CSS, or NASA during case
                conversion.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <RotateCcw className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Using History Effectively:</strong> The history tab keeps track of all your conversions,
                allowing you to compare different formatting options or revert to previous versions without losing your
                work.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a developer working with code, a writer crafting content, or anyone who needs to manipulate and
          format text, our Case Converter & Text Transformer provides the comprehensive tools you need to transform and
          manipulate text with precision and efficiency. Start using it today to streamline your text formatting
          workflow and ensure consistent, professional-looking text across all your projects.
        </p>
      </div>
    </Card>
  )
}