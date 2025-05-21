"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  BarChart3,    // Statistics, Analysis
  Zap,          // Quick actions, Social Media, Advanced Tips
  Download,
  Shuffle,
  Copy,
  Type,         // Word count
  Hash,         // Character count
  Clock,        // Reading time
  AlignLeft,    // Sentence/Paragraph count
  Sparkles,     // Advanced Analysis, Advanced Tips section
  Braces,       // Technical Documentation (use case)
  CaseUpper,    // Replaces ImageUpIcon for Uppercase
  CaseLower,    // For Lowercase transformation
  Heading1,     // For Capitalize/Title Case transformation
  Eraser,       // Text Cleaning
  FileText,     // Content Creation (use case), Export Stats
  Timer,        // Presentation Preparation (use case)
  Percent,      // Keyword Density
  Eye,          // Readability (Advanced Tip)
  RotateCcw,    // Workflow (Advanced Tip)
  Layers,       // For different analysis sections / Core Metrics
  Settings2,    // For options like "Include spaces" or general settings
  Wand2,        // Advanced Tips section icon
  ClipboardList,// For Statistics Tab in "How to Use"
  SearchCode,   // For Analysis Tab in "How to Use"
  Wrench,       // For Tools Tab in "How to Use" or for Text Cleaning section
  CheckSquare,  // For "Include spaces in character count" toggle
} from "lucide-react"
import Link from "next/link"

export default function InfoSection() {
  // Image path for Words Counter & Text Analyzer
  const imagePath = '/Images/InfosectionImages/WordsCounterPreview.png';

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Words Counter & Text Analyzer?
        </h2>
        <p className="text-default-600 mb-4">
          The Words Counter & Text Analyzer is a comprehensive tool designed for writers, editors, content creators,
          students, and professionals who need detailed insights into their text. This versatile utility goes beyond
          simple word counting to provide in-depth text analysis, readability metrics, and powerful text transformation
          features. Whether you're optimizing content for SEO, analyzing writing patterns, or preparing academic papers,
          our tool delivers precise statistics and useful transformations to enhance your writing process.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath + '?height=400&width=800'}
                  alt="Words Counter & Text Analyzer Preview"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Words Counter & Text Analyzer
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Enter or paste your text</strong> in the input area. The tool automatically analyzes your content in
            real-time.
          </li>
          <li>
            View <strong>basic statistics</strong> including word count, character count, and estimated reading time displayed prominently.
          </li>
          <li>
            Toggle between <strong>Statistics</strong>, <strong>Analysis</strong>, and <strong>Tools</strong> tabs (if applicable in your UI) to
            access different features:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong className="flex items-center"><ClipboardList className="w-4 h-4 mr-1.5 text-blue-500" />Statistics Tab:</strong> View word count, character count, sentence count, paragraph count, and
                reading time.
              </li>
              <li>
                <strong className="flex items-center"><SearchCode className="w-4 h-4 mr-1.5 text-green-500" />Analysis Tab:</strong> Explore unique words, longest word, most frequent word, and keyword
                density.
              </li>
              <li>
                <strong className="flex items-center"><Wrench className="w-4 h-4 mr-1.5 text-orange-500" />Tools Tab:</strong> Access text transformation features like case conversion, space fixing, and
                line manipulation.
              </li>
            </ul>
          </li>
          <li>
            Configure options like <strong className="flex items-center"><CheckSquare className="w-4 h-4 mr-1.5 text-purple-500 inline-block" />"Include spaces in character count"</strong> to adjust how characters are counted.
          </li>
          <li>
            Apply <strong>text transformations</strong> (e.g., uppercase, lowercase, capitalize) or cleaning tools as needed.
          </li>
          <li>
            Use the utility buttons to:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong className="flex items-center"><Copy className="w-4 h-4 mr-1.5 text-indigo-500"/>Copy</strong> your text.</li>
                <li><strong className="flex items-center"><Download className="w-4 h-4 mr-1.5 text-teal-500"/>Download</strong> your text.</li>
                <li><strong className="flex items-center"><Eraser className="w-4 h-4 mr-1.5 text-pink-500"/>Clear</strong> the input area.</li>
                <li><strong className="flex items-center"><FileText className="w-4 h-4 mr-1.5 text-cyan-500"/>Export Stats</strong> to download a comprehensive report.</li>
            </ul>
          </li>
        </ol>

        <h2 id="core-metrics" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-primary-500" />
          Core Metrics & Analyses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Word Count:</strong> Total number of words in the text.</div>
          </div>
          <div className="flex items-start">
            <Hash className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Character Count:</strong> Total characters, with an option to include/exclude spaces.</div>
          </div>
          <div className="flex items-start">
            <AlignLeft className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Sentence Count:</strong> Total number of sentences detected.</div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-warning-500" /> {/* Using Layers for Paragraphs for variety */}
            <div><strong>Paragraph Count:</strong> Total number of paragraphs.</div>
          </div>
          <div className="flex items-start">
            <Clock className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Reading Time:</strong> Estimated time to read the text based on average speed.</div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Unique Words:</strong> Count of distinct words used.</div>
          </div>
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" /> {/* Reusing Type for longest word */}
            <div><strong>Longest Word:</strong> Identifies the longest word in the text.</div>
          </div>
          <div className="flex items-start">
            <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Most Frequent Word:</strong> Shows the word that appears most often.</div>
          </div>
          <div className="flex items-start">
            <Percent className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Keyword Density:</strong> Analysis of term frequency for SEO and content insights.</div>
          </div>
        </div>

        <h2 id="text-tools" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wrench className="w-6 h-6 mr-2 text-primary-500" />
          Text Transformation Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><CaseUpper className="w-4 h-4 mr-2 text-primary-500"/>UPPERCASE</h3>
            <p className="text-xs">Convert all text to uppercase letters.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><CaseLower className="w-4 h-4 mr-2 text-secondary-500"/>lowercase</h3>
            <p className="text-xs">Convert all text to lowercase letters.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><Heading1 className="w-4 h-4 mr-2 text-success-500"/>Capitalize Words</h3>
            <p className="text-xs">Capitalize the first letter of each word.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><Eraser className="w-4 h-4 mr-2 text-warning-500"/>Fix Spaces</h3>
            <p className="text-xs">Remove extra spaces and trim leading/trailing whitespace.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><AlignLeft className="w-4 h-4 mr-2 text-danger-500"/>Line Manipulation</h3>
            <p className="text-xs">Tools to manage line breaks, sort lines, or remove empty lines.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><Shuffle className="w-4 h-4 mr-2 text-primary-500"/>Shuffle Words</h3>
            <p className="text-xs">Randomize the order of words in the text.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features (Summary)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Real-time Analysis:</strong> Instant statistics as you type or paste text.</div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Comprehensive Metrics:</strong> Counts for words, characters, sentences, and paragraphs.</div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>In-depth Text Insights:</strong> Unique words, frequent terms, and keyword density.</div>
          </div>
          <div className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Customizable Counting:</strong> Option to include/exclude spaces in character counts.</div>
          </div>
          <div className="flex items-start">
            <Wrench className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Text Transformation Suite:</strong> Case conversion, space cleaning, and shuffling.</div>
          </div>
          <div className="flex items-start">
            <FileText className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Statistics Export:</strong> Download detailed analysis reports.</div>
          </div>
          <div className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Easy Export:</strong> One-click copy and download options for text.</div>
          </div>
          <div className="flex items-start">
            <Eraser className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Quick Clear:</strong> Easily reset the input area to start fresh.</div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-primary-500" /> Content Creation & SEO
            </h3>
            <p className="text-sm">
              Optimize blog posts and articles by analyzing word count, keyword density, and readability for better search engine performance.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-secondary-500" /> Academic Writing
            </h3>
            <p className="text-sm">
              Meet length requirements for essays and papers, analyze text complexity, and ensure proper formatting.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Timer className="w-4 h-4 mr-2 text-success-500" /> Presentation & Speeches
            </h3>
            <p className="text-sm">
              Estimate speaking time for presentations and scripts using word count and reading time metrics.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Braces className="w-4 h-4 mr-2 text-warning-500" /> Technical Documentation
            </h3>
            <p className="text-sm">
              Clean, format, and ensure consistency in technical content, code comments, or software documentation.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-danger-500" /> Writing Style Analysis
            </h3>
            <p className="text-sm">
              Analyze writing patterns, vocabulary diversity, and text structure to improve overall writing style and clarity.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-primary-500" /> Social Media Posts
            </h3>
            <p className="text-sm">
              Optimize posts for platforms by checking character limits and incorporating relevant keywords effectively.
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
                <Percent className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Keyword Density for SEO:</strong> Use the keyword density analysis to ensure your target keywords
                appear at an optimal frequency (typically 1-2%) without over-stuffing.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Improve Readability:</strong> Monitor sentence and paragraph lengths. Shorter sentences and paragraphs generally improve readability.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <RotateCcw className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Efficient Text Cleaning:</strong> For messy text, apply transformations sequentially: e.g., remove extra spaces, then fix line breaks, then standardize case.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <BarChart3 className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Track Writing Progress:</strong> Export statistics periodically during long writing projects to monitor changes in style, vocabulary, or complexity.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a professional writer, student, content creator, or anyone who works with text, our Words
          Counter & Text Analyzer provides the comprehensive tools you need to analyze, optimize, and transform your
          content. Start using it today to gain valuable insights into your writing and enhance your text with powerful
          transformation features.
        </p>
      </div>
    </Card>
  );
}