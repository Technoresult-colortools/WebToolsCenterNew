"use client"

import { Card } from "@nextui-org/react"
// import Link from "next/link"; // Not strictly needed for this version
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Use Case section icon
  BarChart3,    // Key Feature: Visual Frequency, Analysis Modes & Options
  Zap,          // Advanced Tip
  Sparkles,     // Advanced Tips section icon
  Calculator,   // Key Feature: Comprehensive Text Statistics
  Layers,       // Advanced Tip (was duplicated, kept one instance of similar idea)
  FileText,     // Use Case: Linguistic Research
  Percent,      // Key Feature: Multiple Display Modes
  Eye,          // Advanced Tip: Anomaly Detection
  BarChart2,    // Use Case: Authorship Analysis
  Braces,       // Key Feature: Regex Filtering, Use Case: Cryptography, Advanced Tip
  Globe,        // Use Case: Language Learning
  Filter,       // Key Feature: Advanced Filtering, "How to Use"
  BarChart,     // Key Feature: Multi-Mode Analysis
  BarChart4,    // Use Case: Data Cleaning
  Keyboard,     // Use Case: Keyboard Design
  FileJson,     // Key Feature: Export Options
  Sigma,        // Key Feature: Frequency Thresholds
  Palette,      // Key Feature: Customizable Visualization
  Share2,       // Key Feature: Result Sharing
  Type,         // For character/word frequency modes
  Regex,        // For custom patterns/regex filtering
  Settings2,    // For Analysis Options in "How to Use"
  AreaChart,    // For Visualization tab in "How to Use"
  ExternalLink, // For Export tab in "How to Use"
} from "lucide-react"

export default function InfoSection() {
  // Image for the preview section - REPLACE WITH YOUR ACTUAL IMAGE PATH
  const previewImageSrc = "/Images/InfosectionImages/CharacterFrequencyPreview.png?height=400&width=800"; // Placeholder, update this

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8"> {/* Removed shadow-md to match others */}
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Character Frequency Analyzer?
        </h2>
        <p className="text-default-600 mb-4">
          The Character Frequency Analyzer is a sophisticated text analysis tool designed for linguists, writers,
          cryptographers, data scientists, and language enthusiasts. This comprehensive utility goes beyond simple
          character counting to provide detailed insights into the frequency distribution of characters, words, and
          n-grams in your text. With advanced filtering options, customizable visualizations, and detailed statistics,
          our tool helps you uncover patterns and characteristics in text that might otherwise remain hidden.
        </p>

        <div className="my-8">
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={previewImageSrc}
                alt="Character Frequency Analyzer interface preview"
                className="w-full h-full object-cover"
              />
            </div>
             {/* Overlay text removed for consistency, can be re-added */}
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Character Frequency Analyzer
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Enter or paste your text</strong> in the input area.
          </li>
          <li>
            Navigate through different tabs/sections for configuration:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong className="flex items-center"><BarChart3 className="w-4 h-4 mr-1.5 text-blue-500" />Frequency Analysis:</strong> View distributions with sorting/display options.
              </li>
              <li>
                <strong className="flex items-center"><Settings2 className="w-4 h-4 mr-1.5 text-green-500" />Analysis Options:</strong> Set case sensitivity, frequency thresholds, etc.
              </li>
              <li>
                <strong className="flex items-center"><Filter className="w-4 h-4 mr-1.5 text-orange-500" />Filters:</strong> Apply regex or quick filters for specific character types.
              </li>
              <li>
                <strong className="flex items-center"><AreaChart className="w-4 h-4 mr-1.5 text-purple-500" />Visualization:</strong> Customize display (percentages, bars, colors).
              </li>
              <li>
                <strong className="flex items-center"><ExternalLink className="w-4 h-4 mr-1.5 text-red-500" />Export:</strong> Save/share results (text, JSON).
              </li>
            </ul>
          </li>
          <li>
            Choose your <strong>analysis mode</strong> (Character, Word, Bigram, Trigram).
          </li>
          <li>
            Click the <strong>"Analyze Frequency"</strong> button.
          </li>
          <li>
            Review the <strong>text statistics panel</strong> and the detailed <strong>frequency results table</strong>.
          </li>
          <li>
            Use <strong>export options</strong> to save or share your analysis.
          </li>
        </ol>

        <h2 id="analysis-modes" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-primary-500" />
          Analysis Modes & Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Character Frequency:</strong> Analyzes individual character occurrences.</div>
          </div>
          <div className="flex items-start">
            <FileText className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Word Frequency:</strong> Counts occurrences of each distinct word.</div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Bigram Frequency:</strong> Analyzes pairs of adjacent words (e.g., "quick brown").</div>
          </div>
          <div className="flex items-start">
            <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Trigram Frequency:</strong> Analyzes sequences of three consecutive words (e.g., "quick brown fox").</div>
          </div>
          <div className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Case Sensitivity:</strong> Option to treat uppercase and lowercase letters as distinct or the same.</div>
          </div>
          <div className="flex items-start">
            <Filter className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Advanced Filtering:</strong> Use regex and category filters to refine analysis.</div>
          </div>
        </div>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <BarChart className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Multi-Mode Analysis:</strong> Character, word, bigram, trigram levels.</div>
          </div>
          <div className="flex items-start">
            <Filter className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Advanced Filtering:</strong> Regex patterns and character category filters.</div>
          </div>
          <div className="flex items-start">
            <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Visual Frequency Distribution:</strong> Customizable bars and color codes.</div>
          </div>
          <div className="flex items-start">
            <Calculator className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Comprehensive Text Statistics:</strong> Counts, reading time, linguistic measures.</div>
          </div>
          <div className="flex items-start">
            <Sigma className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Frequency Thresholds:</strong> Filter by minimum occurrences.</div>
          </div>
          <div className="flex items-start">
            <Percent className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Multiple Display Modes:</strong> Raw counts, percentages, or both.</div>
          </div>
          <div className="flex items-start">
            <Palette className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Customizable Visualization:</strong> Colors, sorting, visual representations.</div>
          </div>
          <div className="flex items-start">
            <FileJson className="w-4 h-4 mr-2 mt-0.5 text-success-500" /> {/* Reordered for better color cycle */}
            <div><strong>Comprehensive Export:</strong> Plain text or structured JSON.</div>
          </div>
          <div className="flex items-start">
            <Share2 className="w-4 h-4 mr-2 mt-0.5 text-warning-500" /> {/* Reordered for better color cycle */}
            <div><strong>Result Sharing:</strong> Easy sharing for collaboration.</div>
          </div>
        </div>

        <h2 id="use-cases" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-primary-500" /> Linguistic Research
            </h3>
            <p className="text-sm">
              Analyze distributions across languages/dialects to identify patterns.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Braces className="w-4 h-4 mr-2 text-secondary-500" /> Cryptography & Ciphers
            </h3>
            <p className="text-sm">
              Study frequency for code-breaking or creating frequency-based encryption.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2 text-success-500" /> Authorship Attribution
            </h3>
            <p className="text-sm">
              Compare patterns between texts to identify authorship or stylistic fingerprints.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-warning-500" /> Language Learning Aid
            </h3>
            <p className="text-sm">
              Identify common characters/words to prioritize vocabulary and understand patterns.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Keyboard className="w-4 h-4 mr-2 text-danger-500" /> Keyboard & UI Design
            </h3>
            <p className="text-sm">
              Analyze frequency to optimize keyboard layouts or input methods.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart4 className="w-4 h-4 mr-2 text-primary-500" /> Data Cleaning & Validation
            </h3>
            <p className="text-sm">
              Identify unusual patterns, errors, or outliers in large text datasets.
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
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Comparative Analysis:</strong> Export JSON results from multiple texts to compare frequency patterns externally.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Regex className="w-4 h-4 text-secondary-500" /> {/* Using Regex icon */}
              </div>
              <div>
                <strong>Refined Regex Filtering:</strong> Use advanced regex like <code>{'\\b\\w{5,}\\b'}</code> for words of 5+ chars, or <code>{'[aeiou]{2,}'}</code> for multiple vowel sequences.
              </div>
            </li>
            <li className="flex items-start"> {/* Corrected the duplicated tip */}
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>N-Gram Insights:</strong> Analyze bigram and trigram frequencies to understand common word pairings and phrasal structures, useful for stylistic analysis or language modeling.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Anomaly Detection:</strong> Look for unusual frequency spikes or absences against language norms to identify specialized vocabulary, jargon, or potential text manipulations.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a linguist, cryptographer, writer, or data scientist, our Character Frequency Analyzer provides the comprehensive tools you need to gain valuable insights into text structure and composition. Uncover patterns and distributions to enhance your understanding of language and text characteristics.
        </p>
      </div>
    </Card>
  );
}