"use client"

import { Card } from "@nextui-org/react"
// import Link from "next/link"; // Not strictly needed for this version, but good for future
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Use Case: Code Manipulation
  ArrowLeftRight, // Key Feature: Multiple Reversal Modes, Basic Reversal
  Zap,          // Advanced Tip
  Download,
  Copy,
  Type,         // Use Case: Creative Writing
  Sparkles,     // Key Feature: Special Transformations
  Settings2,    // Key Feature: Preservation Options
  Braces,       // Key Feature: Custom Pattern Reversal, Use Case: Code Manipulation, Advanced Tip
  ArrowRightLeft, // Key Feature: Iterative Processing
  Wand2,        // Advanced Tips section icon
  FlipHorizontal, // Use Case: Visual Text Effects, Special Transformation
  Shuffle,      // Use Case: Data Transformation
  Puzzle,       // Use Case: Word Puzzles, Advanced Tip
  Keyboard,     // Key Feature: Transformation Previews
  AlignLeft,    // Use Case: Language Learning
  Layers,       // Key Feature: Scope Control
  Maximize2,    // Key Feature: Visual Diff Comparison
  RotateCcw,    // Advanced Tip: Reversing Reversals
  Eye,          // For "Show diff view"
  Regex,        // For Custom Patterns in "How to Use"
  Repeat,       // For paragraph/sentence reversal
  ChevronsLeftRight, // For character reversal
  Replace,      // For word reversal
  FileText,     // For applying to input
} from "lucide-react"
import Link from "next/link";

export default function InfoSection() {
  // Image for the preview section
  const previewImageSrc = "/Images/InfosectionImages/TextReverserPreview1.png?height=400&width=800";

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Text Reverser & Word Manipulator?
        </h2>
        <p className="text-default-600 mb-4">
          The Text Reverser & Word Manipulator is a versatile text transformation tool designed for writers, developers,
          puzzle creators, and language enthusiasts. This powerful utility goes beyond simple character reversal to offer
          a comprehensive suite of text manipulation options, including word and sentence reversal, special
          transformations like mirroring and flipping text upside down, and even custom pattern-based reversals. Whether
          you're creating word puzzles, generating creative content, or exploring linguistic patterns, our tool provides
          precise control over text transformations.
        </p>

          <div className="my-8">
          <Link href={previewImageSrc} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={previewImageSrc}
                alt="Text Reverser & Word Manipulator interface preview"
                className="w-full h-full object-cover" // object-cover to fill, or object-contain
              />
            </div>
              
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Text Reverser & Word Manipulator?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Enter or paste your text</strong> in the input area.
          </li>
          <li>
            Select the desired transformation type or tab:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong className="flex items-center"><ArrowLeftRight className="w-4 h-4 mr-1.5 text-blue-500" />Basic Reversal:</strong> Choose to reverse by character, word, sentence, etc. Configure preservation options (case, spaces, punctuation).
              </li>
              <li>
                <strong className="flex items-center"><Layers className="w-4 h-4 mr-1.5 text-green-500" />Advanced Scope:</strong> Apply reversals per line or paragraph.
              </li>
              <li>
                <strong className="flex items-center"><Sparkles className="w-4 h-4 mr-1.5 text-orange-500" />Special Transformations:</strong> Effects like mirror, flip upside down, spiral.
              </li>
              <li>
                <strong className="flex items-center"><Regex className="w-4 h-4 mr-1.5 text-purple-500" />Custom Patterns:</strong> Use regular expressions for targeted reversals.
              </li>
            </ul>
          </li>
          <li>Adjust specific settings for your chosen transformation.</li>
          <li>
            Click the <strong>"Reverse Text"</strong> (or similar) button.
          </li>
          <li>Review the transformed text in the output area.</li>
          <li>
            Optionally, toggle <strong className="flex items-center"><Eye className="w-4 h-4 mr-1.5 text-red-500" />"Show diff view"</strong> to compare changes.
          </li>
          <li>
            Use utility buttons to:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong className="flex items-center"><Copy className="w-4 h-4 mr-1.5 text-indigo-500"/>Copy</strong> transformed text.</li>
                <li><strong className="flex items-center"><Download className="w-4 h-4 mr-1.5 text-teal-500"/>Download</strong> as a file.</li>
                <li><strong className="flex items-center"><FileText className="w-4 h-4 mr-1.5 text-pink-500"/>Apply to Input</strong> for further changes.</li>
            </ul>
          </li>
        </ol>

        <h2 id="reversal-modes" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Shuffle className="w-6 h-6 mr-2 text-primary-500" />
          Reversal & Manipulation Modes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <ChevronsLeftRight className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Character Reversal:</strong> Reverses the order of all characters (e.g., "hello" becomes "olleh").</div>
          </div>
          <div className="flex items-start">
            <Replace className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Word Reversal:</strong> Reverses the order of words, while characters within words remain intact (e.g., "hello world" becomes "world hello").</div>
          </div>
          <div className="flex items-start">
            <Repeat className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Sentence Reversal:</strong> Reverses the order of sentences in a paragraph.</div>
          </div>
          <div className="flex items-start">
            <FlipHorizontal className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Mirror Text:</strong> Creates a visually mirrored version of the text.</div>
          </div>
          <div className="flex items-start">
            <RotateCcw style={{ transform: 'scaleY(-1)' }} className="w-4 h-4 mr-2 mt-0.5 text-danger-500" /> {/* Icon for flip */}
            <div><strong>Flip Upside Down:</strong> Renders text as if viewed from below.</div>
          </div>
          <div className="flex items-start">
            <Braces className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Custom Pattern Reversal:</strong> Use regex to define specific parts of text to reverse.</div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <ArrowLeftRight className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Multiple Reversal Modes:</strong> Character, word, sentence, paragraph.</div>
          </div>
          <div className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Preservation Controls:</strong> Maintain or strip case, spaces, punctuation.</div>
          </div>
          <div className="flex items-start">
            <Layers className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Scope Options:</strong> Apply to entire text, per line, or per paragraph.</div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Special Effects:</strong> Mirror text, flip upside down, spiral patterns.</div>
          </div>
          <div className="flex items-start">
            <Braces className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Regex Pattern Reversal:</strong> Advanced custom transformations.</div>
          </div>
          <div className="flex items-start">
            <Maximize2 className="w-4 h-4 mr-2 mt-0.5 text-primary-500" /> {/* Corrected size */}
            <div><strong>Visual Diff Comparison:</strong> Color-coded view of changes.</div>
          </div>
          <div className="flex items-start">
            <ArrowRightLeft className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" /> {/* Corrected size */}
            <div><strong>Iterative Processing:</strong> Apply transformed text back to input.</div>
          </div>
          <div className="flex items-start">
            <Keyboard className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Live Previews:</strong> See example outputs before applying.</div>
          </div>
          <div className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>One-Click Copy & Download.</strong></div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Puzzle className="w-4 h-4 mr-2 text-primary-500" /> Word Puzzles & Games
            </h3>
            <p className="text-sm">
              Create anagrams, backwards words for riddles, and other linguistic challenges.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Type className="w-4 h-4 mr-2 text-secondary-500" /> Creative Writing
            </h3>
            <p className="text-sm">
              Experiment with text structure, generate unique styles, or explore palindromes.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Braces className="w-4 h-4 mr-2 text-success-500" /> Code & Data Snippets
            </h3>
            <p className="text-sm">
              Manipulate string literals or specific patterns in code using custom reversals.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <FlipHorizontal className="w-4 h-4 mr-2 text-warning-500" /> Visual Text Art
            </h3>
            <p className="text-sm">
              Generate mirror text for designs, or flip text for social media and creative content.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <AlignLeft className="w-4 h-4 mr-2 text-danger-500" /> Linguistic Exploration
            </h3>
            <p className="text-sm">
              Analyze how reversing word order affects meaning; create exercises for language learning.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Shuffle className="w-4 h-4 mr-2 text-primary-500" /> Data Obfuscation/Test Data
            </h3>
            <p className="text-sm">
              Transform structured text data for testing or simple anonymization by reversing elements.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg"> {/* Matched styling of prev examples */}
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Compound Transformations:</strong> Apply multiple reversals sequentially (e.g., char reverse then word reverse) for complex effects.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Braces className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Regex Power:</strong> Use custom patterns (regex) to reverse only specific text, like words of a certain length or capitalized words.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Puzzle className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Puzzle Crafting:</strong> For puzzles, try character reversal preserving case & spaces, but not punctuation, to hide clues.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <RotateCcw className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Double Reversal to Undo:</strong> Applying the same reversal twice (character, word, sentence) often restores the original text.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a puzzle creator, writer, developer, or language enthusiast, our Text Reverser & Word
          Manipulator provides the comprehensive tools you need to transform and manipulate text in creative and useful
          ways. Explore new possibilities in text transformation today!
        </p>
      </div>
    </Card>
  );
}