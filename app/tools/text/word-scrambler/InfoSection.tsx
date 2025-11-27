"use client"

import { Card } from "@nextui-org/react" // Removed CardBody to match previous structure
// import Link from "next/link"; // Not strictly needed here
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,         // Could be a Use Case if scrambling code snippets
  Zap,          // Advanced Tips section icon, or for quick options
  Shuffle,      // Supported Method: Random Shuffle, How to Use
  Copy,         // How to Use
  Type,         // General text/word icon
  Sparkles,     // For creative effects or advanced tips
  Settings2,    // For advanced options
  Repeat,       // Supported Method: Reverse Letters
  ArrowDownAZ,  // Supported Method: Alphabetical Sort
  Replace,      // Supported Method: Vowel Swap
  Puzzle,       // Use Case: Puzzles & Games
  MessageSquare, // Use Case: Creative Messaging
  Lock,         // Use Case: Simple Obfuscation
  GraduationCap,// Use Case: Educational Tool
  Eye,          // For "Tips for Best Results" / Readability
  Layers,       // For "Intensity" control
  Wand2,
  Settings,
  Filter,
  UploadCloud,
  Share2,        // For general "magic" of scrambling or advanced tips
} from "lucide-react"

export default function InfoSection() {
  // Image for the preview section - REPLACE WITH YOUR ACTUAL IMAGE PATH
  const previewImageSrc = "/Images/InfosectionImages/WordScramblerPreview.png?height=400&width=800"; // Placeholder, update this

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Word Scrambler?
        </h2>
        <p className="text-default-600 mb-4">
          The Word Scrambler is a fun and versatile tool designed to rearrange the letters within words in your text.
          It can be used for creating puzzles, generating creative text effects, simple obfuscation, or for educational
          purposes. This tool often allows preserving the first and last letters of words to maintain a degree of
          readability while still achieving the scrambling effect.
        </p>
        <p className="text-default-600 mb-4">
          Explore different scrambling methods and options to transform your text in unique and interesting ways!
        </p>

        <div className="my-8">
          <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <img
                src={previewImageSrc}
                alt="Word Scrambler interface preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Word Scrambler?
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
                Enter or paste the text you want to scramble into the input area.
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
                <strong className="text-default-700">Choose a scrambling method:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Select from quick options like Random Shuffle, Reverse Letters, or other available modes.
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
                <strong className="text-default-700">Adjust advanced options:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Fine-tune settings like preserving end letters or adjusting the scrambling intensity.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <strong className="text-default-700">Scramble your text:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Click the "Scramble" button to apply the chosen transformation to your text.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <strong className="text-default-700">Copy or Download:</strong>
              </div>
              <p className="text-default-600 ml-6">
                Use the utility buttons to copy the scrambled text to your clipboard or download it as a file.
              </p>
            </div>
          </li>
        </ol>

        <h2 id="scrambling-methods" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Supported Scrambling Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600 mb-6">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Shuffle className="w-4 h-4 mr-2 text-primary-500" /> Random Shuffle
            </h3>
            <p className="text-sm">Randomly shuffles all letters (or inner letters if ends are preserved) within each word.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Repeat className="w-4 h-4 mr-2 text-secondary-500" /> Reverse Letters
            </h3>
            <p className="text-sm">Reverses the order of letters within each word (e.g., "scramble" becomes "elpmarcs").</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <ArrowDownAZ className="w-4 h-4 mr-2 text-success-500" /> Alphabetical Sort
            </h3>
            <p className="text-sm">Sorts the letters within each word alphabetically (e.g., "scramble" becomes "abcElmrs").</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Replace className="w-4 h-4 mr-2 text-warning-500" /> Vowel Swap / Consonant Swap
            </h3>
            <p className="text-sm">Swaps the positions of vowels (or consonants) within each word, or shuffles them.</p>
          </div>
          {/* Add more methods if your tool supports them */}
        </div>

        <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
          <div className="flex items-start gap-3">
            <Shuffle className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Multiple Scrambling Algorithms:</strong>
              <span className="block mt-1">Choose from various methods like random shuffle, reverse, sort, etc.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Settings2 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Customizable Options:</strong>
              <span className="block mt-1">Control over preserving first/last letters, case sensitivity, and scrambling intensity.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Type className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Handles Various Text Inputs:</strong>
              <span className="block mt-1">Works with single words, sentences, or entire paragraphs.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Readability Controls:</strong>
              <span className="block mt-1">Options like "Preserve Ends" help maintain some legibility.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Quick Transformation:</strong>
              <span className="block mt-1">Scrambles text instantly with a click.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Copy className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
            <div>
              <strong className="text-default-700">Easy Export:</strong>
              <span className="block mt-1">Copy the scrambled text to your clipboard or download as a file.</span>
            </div>
          </div>
        </div>

        <h2 id="use-cases" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" /> {/* Using Code icon for Use Cases */}
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Puzzle className="w-4 h-4 mr-2 text-primary-500" /> Puzzles & Games
            </h3>
            <p className="text-sm">Create word jumbles, anagram challenges, or scrambled messages for fun and games.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-secondary-500" /> Creative Messaging
            </h3>
            <p className="text-sm">Add a playful or mysterious touch to social media posts, invitations, or digital art.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-success-500" /> Simple Obfuscation
            </h3>
            <p className="text-sm">Lightly disguise text to make it less immediately readable, useful for spoilers or notes.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-warning-500" /> Educational Tool
            </h3>
            <p className="text-sm">Help students with spelling, vocabulary, or understanding word structure by unscrambling words.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-danger-500" /> Text Art & Design
            </h3>
            <p className="text-sm">Generate abstract text patterns for visual design projects or typographic experiments.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Type className="w-4 h-4 mr-2 text-primary-500" /> Testing Readability
            </h3>
            <p className="text-sm">Explore how much scrambling affects text comprehension (e.g., the "Typoglycemia" effect).</p>
          </div>
        </div>

        <h2 id="advanced-tips" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary-500" />
          Tips for Best Results & Advanced Use
        </h2>
        <div className="bg-default-200/50 dark:bg-default-300/20 p-5 rounded-lg shadow-md">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Wand2 className="w-4 h-4 text-primary-500" />
              </div>
              <div><strong>Experiment with Methods:</strong> Different scrambling methods yield very different results. Try them all to see what fits your purpose.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Eye className="w-4 h-4 text-secondary-500" />
              </div>
              <div><strong>Preserve End Letters:</strong> For most human-readable scrambling, enabling the "Preserve First & Last Letters" option is highly recommended.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Layers className="w-4 h-4 text-success-500" /> {/* Icon for intensity/layers of scrambling */}
              </div>
              <div><strong>Adjust Intensity/Scope:</strong> If your tool allows, control the intensity of scrambling (e.g., how many inner letters are shuffled) or apply scrambling only to certain word lengths.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Sparkles className="w-4 h-4 text-warning-500" />
              </div>
              <div><strong>Combine with Other Tools:</strong> For more complex effects, you could scramble text and then pass it to a case converter or text reverser.</div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Have fun scrambling your text! Whether for puzzles, creative projects, or just for a bit of linguistic play,
          the Word Scrambler offers a simple yet powerful way to transform your words. Experiment with the settings
          to achieve the perfect scrambled effect.
        </p>
      </div>
    </Card>
  );
}