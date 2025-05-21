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
  Shuffle,
  Copy,
  RefreshCw,
  AlignLeft,
  WrapText,
  ListOrdered,
  HeadingIcon,
  Baseline,
  Settings2,
  Layers,
  FileText,
  CheckSquare,
  Wand2,
  Palette,
  Keyboard,
  Braces,
} from "lucide-react"
import Link from "next/link"

export default function InfoSection() {
  const imagePath = '/Images/InfosectionImages/LoremIpsumPreview1.png';

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Lorem Ipsum Generator?
        </h2>
        <p className="text-default-600 mb-4">
          The Lorem Ipsum Generator is a powerful tool designed for web developers, designers, and content creators who
          need placeholder text for their projects. This versatile utility creates customizable dummy text in various
          formats including paragraphs, sentences, words, lists, and headings. Whether you're designing a website
          layout, testing typography, or creating a mockup, our generator provides the perfect filler text with precise
          control over length, structure, and formatting.
        </p>

        {/* Section 2: Image Preview - Let's keep this as it's a common area for issues */}
        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath + '?height=400&width=800'}
                  alt="Lorem Ipsum Generator Preview"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* How to Use Section */}
        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Lorem Ipsum Generator
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            Select a <strong>Generation Type</strong> from the dropdown menu (e.g., Paragraphs, Sentences, Words, Lists, or Headings).
          </li>
          <li>
            Configure the specific settings for your chosen type:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>For <strong>Paragraphs</strong>: Set the number of paragraphs and approximate words per paragraph.</li>
              <li>For <strong>Sentences</strong>: Set the number of sentences and words per sentence.</li>
              <li>For <strong>Words</strong>: Simply set the total number of words you need.</li>
              <li>For <strong>Lists</strong>: Choose between ordered or unordered lists, set the number of items, and words per item.</li>
              <li>For <strong>Headings</strong>: Select the heading level (H1-H6), number of headings, and words per heading.</li>
            </ul>
          </li>
          <li>Optionally, toggle <strong>Start with "Lorem ipsum..."</strong> to begin your text with the classic Lorem ipsum phrase.</li>
          <li>Optionally, enable <strong>Include HTML Tags</strong> to wrap your content in appropriate HTML elements (e.g., {'<p>'}, {'<ul>'}, {'<h1>'}).</li>
          <li>Click the <strong>Generate Text</strong> button to create your Lorem Ipsum content.</li>
          <li>Review the generated text in the output area.</li>
          <li>
            Use the utility buttons to:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li><strong>Copy</strong> the generated text to your clipboard.</li>
              <li><strong>Download</strong> the text as a .txt file.</li>
              <li><strong>Shuffle</strong> the words to create variation in your placeholder text.</li>
              <li><strong>Clear</strong> the output area to start fresh.</li>
            </ul>
          </li>

        </ol>
          

        {/* Supported Generation Types Section */}
        <h2 id="generation-types" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Layers className="w-6 h-6 mr-2 text-primary-500" />
          Supported Generation Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <AlignLeft className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div><strong>Paragraphs:</strong> Generate blocks of text, ideal for simulating article content or descriptive sections.</div>
          </div>
          <div className="flex items-start">
            <WrapText className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div><strong>Sentences:</strong> Create a specific number of sentences, useful for short descriptions or captions.</div>
          </div>
          <div className="flex items-start">
            <Baseline className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div><strong>Words:</strong> Generate a precise count of individual words, suitable for taglines or very specific length requirements.</div>
          </div>
          <div className="flex items-start">
            <ListOrdered className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div><strong>Lists:</strong> Create ordered (numbered) or unordered (bulleted) lists for itemized content.</div>
          </div>
          <div className="flex items-start">
            <HeadingIcon className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div><strong>Headings:</strong> Generate H1 to H6 headings to test typography hierarchy and section titles.</div>
          </div>
        </div>

        {/* Customization Options Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Settings2 className="w-6 h-6 mr-2 text-primary-500" />
          Customization Options
        </h2>
        <p className="text-default-600 mb-4">
          Tailor the generated Lorem Ipsum to your exact needs with these powerful customization options:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><Type className="w-4 h-4 mr-2 text-primary-500"/>Quantity Control</h3>
            <p className="text-xs">Specify the exact number of paragraphs, sentences, words, list items, or headings.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><WrapText className="w-4 h-4 mr-2 text-secondary-500"/>Length Variation</h3>
            <p className="text-xs">Control approximate words per paragraph, sentence, list item, or heading for varied text density.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><Baseline className="w-4 h-4 mr-2 text-success-500"/>Classic Start</h3>
            <p className="text-xs">Optionally begin generated text with the traditional "Lorem ipsum dolor sit amet..." phrase.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><Braces className="w-4 h-4 mr-2 text-warning-500"/>HTML Markup</h3>
            <p className="text-xs">Automatically wrap generated content in appropriate HTML tags (e.g., {'<p>'}, {'<ul>'}, {'<h2>'}).</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><ListOrdered className="w-4 h-4 mr-2 text-danger-500"/>List Styles</h3>
            <p className="text-xs">Choose between ordered (numbered) and unordered (bulleted) for list generation.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1 flex items-center"><HeadingIcon className="w-4 h-4 mr-2 text-primary-500"/>Heading Levels</h3>
            <p className="text-xs">Select the specific HTML heading level (H1 through H6) for generated headings.</p>
          </div>
        </div>

        {/* Key Features Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start"><Layers className="w-4 h-4 mr-2 mt-0.5 text-primary-500"/><div><strong>Multiple Generation Types:</strong> Generate paragraphs, sentences, words, lists, or headings.</div></div>
          <div className="flex items-start"><Settings2 className="w-4 h-4 mr-2 mt-0.5 text-secondary-500"/><div><strong>Granular Control:</strong> Fine-tune number of items, words per item, and other structural details.</div></div>
          <div className="flex items-start"><CheckSquare className="w-4 h-4 mr-2 mt-0.5 text-success-500"/><div><strong>Optional HTML Tags:</strong> Include basic HTML structure for more realistic mockups.</div></div>
          <div className="flex items-start"><Baseline className="w-4 h-4 mr-2 mt-0.5 text-warning-500"/><div><strong>Traditional Start:</strong> Option to start text with "Lorem ipsum dolor sit amet...".</div></div>
          <div className="flex items-start"><Zap className="w-4 h-4 mr-2 mt-0.5 text-danger-500"/><div><strong>Instant Generation:</strong> Create placeholder text immediately with a single click.</div></div>
          <div className="flex items-start"><Copy className="w-4 h-4 mr-2 mt-0.5 text-primary-500"/><div><strong>One-Click Copy:</strong> Easily copy generated text to your clipboard.</div></div>
          <div className="flex items-start"><Download className="w-4 h-4 mr-2 mt-0.5 text-secondary-500"/><div><strong>Text Download:</strong> Save generated text as a .txt file for offline use.</div></div>
          <div className="flex items-start"><Shuffle className="w-4 h-4 mr-2 mt-0.5 text-success-500"/><div><strong>Word Shuffling:</strong> Randomize word order for more varied and less repetitive placeholder text.</div></div>
          <div className="flex items-start"><RefreshCw className="w-4 h-4 mr-2 mt-0.5 text-warning-500"/><div><strong>Quick Reset:</strong> Clear the output and settings with one click to start over.</div></div>
        </div>

        {/* Use Cases Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center"><Palette className="w-4 h-4 mr-2 text-primary-500"/> Web & UI Design</h3>
            <p className="text-sm">Fill layouts and mockups to visualize content structure, spacing, and flow before actual content is ready.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center"><Type className="w-4 h-4 mr-2 text-secondary-500"/> Typography Testing</h3>
            <p className="text-sm">Test different fonts, sizes, line heights, and styles to evaluate readability and visual appeal.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center"><Keyboard className="w-4 h-4 mr-2 text-success-500"/> Content Prototyping</h3>
            <p className="text-sm">Generate placeholder text for websites, apps, and presentations during early development stages.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center"><FileText className="w-4 h-4 mr-2 text-warning-500"/> Print Layouts</h3>
            <p className="text-sm">Use in desktop publishing software to mock up magazine articles, brochures, and other print materials.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center"><Braces className="w-4 h-4 mr-2 text-danger-500"/> Development Placeholders</h3>
            <p className="text-sm">Populate databases or front-end components with temporary text during software development.</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center"><Layers className="w-4 h-4 mr-2 text-primary-500"/> Client Presentations</h3>
            <p className="text-sm">Showcase design concepts to clients with realistic text blocks instead of distracting "real" content.</p>
          </div>
        </div>

        {/* Tips for Effective Use Section */}
        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Tips for Effective Use
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5"><Zap className="w-4 h-4 text-primary-500"/></div>
              <div><strong>Combine Generation Types:</strong> Generate headings first, then paragraphs, then lists to build a complete page mockup quickly. Use the clear button selectively if needed.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5"><Braces className="w-4 h-4 text-secondary-500"/></div>
              <div><strong>Use HTML Tags for Context:</strong> Enabling "Include HTML Tags" can help when pasting into WYSIWYG editors or directly into HTML code, providing immediate structure.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5"><Shuffle className="w-4 h-4 text-success-500"/></div>
              <div><strong>Shuffle for Variety:</strong> If the standard Lorem Ipsum feels too repetitive for your audience, use the "Shuffle" feature to create more diverse-looking text blocks.</div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5"><Settings2 className="w-4 h-4 text-warning-500"/></div>
              <div><strong>Experiment with Lengths:</strong> Adjust words per paragraph/sentence to match the anticipated density of the final content for a more accurate visual representation.</div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a web developer, designer, or content creator, our Lorem Ipsum Generator provides the
          flexibility and precision you need for your placeholder text requirements. Generate exactly the right amount
          and type of text for your project, and focus on what matters most—creating great designs and user experiences.
        </p>
      </div>
    </Card>
  )
}