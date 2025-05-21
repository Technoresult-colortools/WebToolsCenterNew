"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  BarChart3,
  Zap,
  Download,
  Type,
  Hash,
  Clock,
  AlignLeft,
  Sparkles,
  Calculator,
  Layers,
  FileText,
  Timer,
  Percent,
  Eye,
  RotateCcw,
  BarChart2,
  Braces,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function InfoSection() {
  // Image path
  const imagePath = "/Images/InfosectionImages/LetterCounterPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Letter Counter & Text Analyzer?
        </h2>
        <p className="text-default-600 mb-4">
          The Letter Counter & Text Analyzer is a powerful text analysis tool designed for writers, editors, students,
          and language enthusiasts. It provides comprehensive insights into your text, including letter frequency with
          case sensitivity, word count, sentence count, and more. This versatile utility goes beyond simple counting to
          offer detailed analytics about text composition, helping you understand the structure and characteristics of
          your writing. Whether you're analyzing text patterns, optimizing content, or conducting language research, our
          tool delivers precise statistics to enhance your understanding of text.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath || "/placeholder.svg"}
                  alt="Letter Counter interface showing text input area and letter frequency analysis"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Letter Counter & Text Analyzer
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Enter or paste your text</strong> in the input area. The tool automatically analyzes your content in
            real-time.
          </li>
          <li>
            View <strong>basic statistics</strong> in the overview panel at the top, showing character count, word
            count, sentences, paragraphs, and more.
          </li>
          <li>
            Explore the <strong>Letter Frequency</strong> tab to see detailed letter distribution:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Combined Tab:</strong> View the total frequency of each letter, merging uppercase and lowercase
                counts.
              </li>
              <li>
                <strong>Uppercase Tab:</strong> See frequency counts for uppercase letters only.
              </li>
              <li>
                <strong>Lowercase Tab:</strong> View frequency counts for lowercase letters only.
              </li>
            </ul>
          </li>
          <li>
            Switch to the <strong>Advanced Stats</strong> tab to access deeper analysis:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Character Analysis:</strong> See the distribution of vowels and consonants in your text.
              </li>
              <li>
                <strong>Word Analysis:</strong> Explore unique word count and average word length statistics.
              </li>
              <li>
                <strong>Text Structure:</strong> Analyze words per sentence and sentences per paragraph ratios.
              </li>
            </ul>
          </li>
          <li>
            Use the <strong>utility buttons</strong> to toggle between count and percentage views, or change the sorting
            order.
          </li>
          <li>
            <strong>Download</strong> a comprehensive report of your text analysis in JSON format.
          </li>
          <li>
            Use the <strong>Show Stats</strong> button for a quick summary of all text statistics.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Case-Sensitive Letter Analysis:</strong> Separate tracking for uppercase and lowercase letters for
              detailed character distribution.
            </div>
          </div>
          <div className="flex items-start">
            <Hash className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Character Counting:</strong> Precise character count with real-time updates as you type or paste
              text.
            </div>
          </div>
          <div className="flex items-start">
            <AlignLeft className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Word, Sentence & Paragraph Metrics:</strong> Comprehensive counting of textual elements for
              structural analysis.
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Reading Time Estimation:</strong> Calculate how long it takes to read your content based on
              average reading speed.
            </div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Most Common Letter Detection:</strong> Automatically identify the most frequently occurring
              character in your text.
            </div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Tabbed Frequency Views:</strong> Toggle between combined, uppercase-only, and lowercase-only
              letter frequency displays.
            </div>
          </div>
          <div className="flex items-start">
            <BarChart2 className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Visual Frequency Display:</strong> Clear, visual representation of letter frequency with progress
              bars for easy pattern recognition.
            </div>
          </div>
          <div className="flex items-start">
            <Calculator className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Advanced Text Statistics:</strong> Detailed analysis of vowels, consonants, unique words, and text
              structure.
            </div>
          </div>
          <div className="flex items-start">
            <Percent className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Percentage View:</strong> Toggle between count and percentage display for better understanding of
              letter distribution.
            </div>
          </div>
          <div className="flex items-start">
            <Download className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Comprehensive Reports:</strong> Download detailed analysis reports with all statistics in JSON
              format.
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-primary-500" /> Linguistic Research
            </h3>
            <p className="text-sm">
              Analyze letter frequency patterns in different languages, dialects, or writing styles to identify
              characteristic distributions and linguistic features.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Braces className="w-4 h-4 mr-2 text-secondary-500" /> Cryptography
            </h3>
            <p className="text-sm">
              Study character frequency for cryptanalysis, code-breaking, or creating frequency-based encryption systems
              by understanding letter distribution patterns.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Timer className="w-4 h-4 mr-2 text-success-500" /> Content Optimization
            </h3>
            <p className="text-sm">
              Analyze reading time and text structure to optimize content for readability, engagement, and audience
              comprehension.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-warning-500" /> Language Learning
            </h3>
            <p className="text-sm">
              Study character frequency in foreign languages to understand common patterns and focus learning on the
              most frequently used letters and combinations.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-danger-500" /> Writing Analysis
            </h3>
            <p className="text-sm">
              Compare letter frequency across different authors or texts to identify stylistic patterns, authorship
              characteristics, or writing fingerprints.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-primary-500" /> Keyboard Layout Design
            </h3>
            <p className="text-sm">
              Analyze letter frequency to optimize keyboard layouts for specific languages or specialized writing tasks
              based on character usage patterns.
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
                <strong>Comparative Analysis:</strong> Analyze multiple texts separately and download their statistics
                to compare letter frequency patterns across different authors, genres, or time periods.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Pattern Recognition:</strong> Look for unusual letter frequency patterns that might indicate
                specialized vocabulary, technical content, or non-native writing by comparing against standard language
                distributions.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <RotateCcw className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Content Refinement:</strong> Use paragraph and sentence counts along with reading time to
                identify sections of text that might be too dense or complex, then revise for better readability.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Percent className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Statistical Sampling:</strong> For very large texts, analyze representative samples to quickly
                gauge overall letter frequency patterns without processing the entire document.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a linguist studying language patterns, a writer analyzing your style, a student researching
          text characteristics, or anyone curious about the composition of written content, our Letter Counter & Text
          Analyzer provides the comprehensive tools you need to gain valuable insights into text structure and character
          distribution. Start using it today to discover patterns and statistics that will enhance your understanding of
          language and text.
        </p>
      </div>
    </Card>
  )
}
