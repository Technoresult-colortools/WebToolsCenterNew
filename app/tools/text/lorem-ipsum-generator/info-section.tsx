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
} from "lucide-react"

export default function InfoSection() {
  // Sample preview style
  const samplePreviewStyle = {
    backgroundImage: `url('/Images/InfosectionImages/LoremIpsumPreview1.png?height=400&width=800')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

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

        <div className="my-8">
          <div className="relative w-full h-64 md:h-80 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0" style={samplePreviewStyle} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 dark:bg-black/80 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-lg font-medium text-default-800">Lorem Ipsum Generator</h3>
                <p className="text-default-600 text-sm">Create customizable placeholder text</p>
              </div>
            </div>
          </div>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Lorem Ipsum Generator
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            Select a <strong>Generation Type</strong> from the dropdown menu (Paragraphs, Sentences, Words, Lists, or
            Headings).
          </li>
          <li>
            Configure the specific settings for your chosen type:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                For <strong>Paragraphs</strong>: Set the number of paragraphs and approximate words per paragraph.
              </li>
              <li>
                For <strong>Sentences</strong>: Set the number of sentences and words per sentence.
              </li>
              <li>
                For <strong>Words</strong>: Simply set the total number of words you need.
              </li>
              <li>
                For <strong>Lists</strong>: Choose between ordered or unordered lists, set the number of items, and
                words per item.
              </li>
              <li>
                For <strong>Headings</strong>: Select the heading level (H1-H6), number of headings, and words per
                heading.
              </li>
            </ul>
          </li>
          <li>
            Toggle <strong>Start with "Lorem ipsum..."</strong> to begin your text with the classic Lorem ipsum phrase.
          </li>
          <li>
            Enable <strong>Include HTML Tags</strong> to wrap your content in appropriate HTML elements.
          </li>
          <li>
            Click <strong>Generate Text</strong> to create your Lorem Ipsum content.
          </li>
          <li>
            Use the utility buttons to:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Copy</strong> the generated text to your clipboard.
              </li>
              <li>
                <strong>Download</strong> the text as a .txt file.
              </li>
              <li>
                <strong>Shuffle</strong> the words to create variation in your placeholder text.
              </li>
              <li>
                <strong>Clear</strong> the output area to start fresh.
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-default-600">
          <li className="flex items-start">
            <Type className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Multiple Text Formats:</strong> Generate paragraphs, sentences, words, lists, or headings based on
              your specific needs.
            </div>
          </li>
          <li className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Customizable Options:</strong> Fine-tune the length, structure, and format of your placeholder
              text.
            </div>
          </li>
          <li className="flex items-start">
            <AlignLeft className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Paragraph Generation:</strong> Create multiple paragraphs with controlled word count for layout
              testing.
            </div>
          </li>
          <li className="flex items-start">
            <WrapText className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Sentence Control:</strong> Generate specific numbers of sentences with customizable length.
            </div>
          </li>
          <li className="flex items-start">
            <Baseline className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Word Count Precision:</strong> Get exactly the number of words you need for your design.
            </div>
          </li>
          <li className="flex items-start">
            <ListOrdered className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>List Generation:</strong> Create ordered or unordered lists with customizable items.
            </div>
          </li>
          <li className="flex items-start">
            <HeadingIcon className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Heading Creation:</strong> Generate H1-H6 headings for testing typography hierarchies.
            </div>
          </li>
          <li className="flex items-start">
            <Zap className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Instant Generation:</strong> Create text immediately with a single click.
            </div>
          </li>
          <li className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>One-Click Copy:</strong> Copy generated text to clipboard with a single action.
            </div>
          </li>
          <li className="flex items-start">
            <Download className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Text Download:</strong> Save your generated text as a file for later use.
            </div>
          </li>
          <li className="flex items-start">
            <Shuffle className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Word Shuffling:</strong> Randomize word order for more varied placeholder text.
            </div>
          </li>
          <li className="flex items-start">
            <RefreshCw className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Quick Reset:</strong> Clear the generator with one click to start over.
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Web Design</h3>
            <p>
              Use Lorem Ipsum text to fill layouts during the design phase, helping you focus on the visual hierarchy
              and spacing without being distracted by actual content.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Typography Testing</h3>
            <p>
              Test different fonts, sizes, and styles with consistent placeholder text to evaluate readability and
              visual appeal across various typographic choices.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg mb-2">UI/UX Mockups</h3>
            <p>
              Create realistic-looking mockups with appropriate text length and structure for user interface elements
              like cards, modals, and content blocks.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Content Placeholders</h3>
            <p>
              Generate placeholder content for websites and applications during development, before final copy is
              available from content creators.
            </p>
          </div>
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
