"use client"

import React, { useState, useCallback } from "react"
import { Card, CardBody, Button, Checkbox, Textarea } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import {
  Copy,
  Download,
  RefreshCw,
  ArchiveIcon,
  Info,
  Lightbulb,
  BookOpen,
  Scissors,
  Zap,
  AlignLeft,
  Type,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const MAX_CHARS = 5000

export default function WhiteSpaceRemover() {
  const [text, setText] = useState("")
  const [removeLeadingTrailing, setRemoveLeadingTrailing] = useState(true)
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true)
  const [compressLineBreaks, setCompressLineBreaks] = useState(true)

  const handleRemoveWhiteSpace = useCallback(() => {
    let result = text

    if (removeLeadingTrailing) {
      result = result.trim()
    }

    if (removeExtraSpaces) {
      result = result.replace(/\s{2,}/g, " ")
    }

    if (compressLineBreaks) {
      result = result.replace(/\n{2,}/g, "\n\n")
    }

    setText(result)
    toast.success("White spaces removed!")
  }, [text, removeLeadingTrailing, removeExtraSpaces, compressLineBreaks])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard")
  }, [text])

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cleaned_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully")
  }, [text])

  const handleClear = useCallback(() => {
    setText("")
    toast.success("Text cleared")
  }, [])

  return (
    <ToolLayout
      title="White Space Remover"
      description="Clean up text by removing unwanted white spaces"
      toolId="678f382826f06f912191bc80"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              minRows={8}
              className="w-full mb-4"
              variant="bordered"
            />
            <p className="text-sm text-default-500 mb-4">
              {text.length}/{MAX_CHARS} characters
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <Checkbox isSelected={removeLeadingTrailing} onValueChange={setRemoveLeadingTrailing}>
                Remove Leading/Trailing Spaces
              </Checkbox>
              <Checkbox isSelected={removeExtraSpaces} onValueChange={setRemoveExtraSpaces}>
                Remove Extra Spaces
              </Checkbox>
              <Checkbox isSelected={compressLineBreaks} onValueChange={setCompressLineBreaks}>
                Compress Line Breaks
              </Checkbox>
            </div>
            <Button
              color="primary"
              onPress={handleRemoveWhiteSpace}
              startContent={<ArchiveIcon size={18} />}
              className="w-full"
            >
              Remove White Spaces
            </Button>
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
     
            <Button color="primary" onPress={handleCopy} startContent={<Copy size={18} />}>
              Copy
            </Button>
    

            <Button color="primary" onPress={handleDownload} startContent={<Download size={18} />}>
              Download
            </Button>

     
            <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
              Clear
            </Button>

        </div>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <label className="block text-lg font-medium text-default-700 mb-2">Cleaned Text:</label>
            <Textarea value={text} readOnly minRows={8} className="w-full" variant="bordered" />
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the White Space Remover?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The White Space Remover is a powerful text cleaning tool designed for writers, developers, editors, and
                anyone who needs to ensure consistent text formatting. It goes beyond simple space removal, offering
                customizable options to clean and optimize your text. With its{" "}
                <Link href="#how-to-use" className="text-primary hover:underline">
                  user-friendly interface
                </Link>{" "}
                and advanced functionality, it's the perfect companion for improving text readability and maintaining
                consistent formatting across your documents.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Whether you're cleaning up code, formatting articles, or preparing data for analysis, our White Space
                Remover provides you with the flexibility and control you need. It's like having a personal text cleaner
                right in your browser, tailored to your specific requirements!
              </p>

              <div className="my-8">
                <Image
                  src="/Images/WhiteSpaceRemoverPreview.png"
                  alt="Screenshot of the White Space Remover interface showing text input area, cleaning options, and action buttons"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the White Space Remover?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Paste or type your text into the input area provided.</li>
                <li>
                  Select the cleaning options you want to apply:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>Remove leading/trailing spaces</li>
                    <li>Remove extra spaces between words</li>
                    <li>Compress multiple line breaks</li>
                  </ul>
                </li>
                <li>Click the "Remove White Spaces" button to process your text.</li>
                <li>Review the cleaned text in the output area.</li>
                <li>Use the "Copy" button to copy the cleaned text to your clipboard.</li>
                <li>Click "Download" to save the cleaned text as a .txt file for offline use.</li>
                <li>If needed, use the "Clear" button to reset both input and output areas for a new task.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Scissors className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Remove Leading/Trailing Spaces:</strong> Eliminates unnecessary spaces at the beginning and
                  end of your text.
                </li>
                <li>
                  <strong>Remove Extra Spaces:</strong> Collapses multiple spaces between words into a single space for
                  consistent formatting.
                </li>
                <li>
                  <strong>Compress Line Breaks:</strong> Reduces multiple consecutive line breaks to a single line
                  break, improving text compactness.
                </li>
                <li>
                  <strong>Customizable Cleaning:</strong> Choose which types of white space to remove based on your
                  specific needs.
                </li>
                <li>
                  <strong>Copy Functionality:</strong> Easily copy your cleaned text to the clipboard with a single
                  click.
                </li>
                <li>
                  <strong>Download Option:</strong> Save your cleaned text as a .txt file for offline access or further
                  use.
                </li>
                <li>
                  <strong>Clear Function:</strong> Quickly reset the input and output areas for a fresh start.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Features That Make Us Stand Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <Zap className="w-4 h-4 inline-block mr-1" /> <strong>Instant Cleaning:</strong> See your text cleaned
                  in real-time as you apply options
                </li>
                <li>
                  <AlignLeft className="w-4 h-4 inline-block mr-1" /> <strong>Flexible Formatting:</strong> Customize
                  which types of white space to remove
                </li>
                <li>
                  <Type className="w-4 h-4 inline-block mr-1" /> <strong>Preserve Intentional Formatting:</strong>{" "}
                  Option to keep necessary line breaks and indentation
                </li>
                <li>
                  <Copy className="w-4 h-4 inline-block mr-1" /> <strong>One-Click Copying:</strong> Easily copy your
                  cleaned text to clipboard
                </li>
                <li>
                  <Download className="w-4 h-4 inline-block mr-1" /> <strong>Download Option:</strong> Save your cleaned
                  text as a file for offline use
                </li>
                <li>
                  <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick Reset:</strong> Clear function for
                  easy start-over
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Practical Applications
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The White Space Remover tool can be invaluable in various scenarios:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Code Cleaning:</strong> Remove unnecessary white spaces in code for better readability and
                  consistency
                </li>
                <li>
                  <strong>Data Preparation:</strong> Clean up data before analysis or import into databases
                </li>
                <li>
                  <strong>Content Editing:</strong> Ensure consistent formatting in articles, blog posts, and other
                  written content
                </li>
                <li>
                  <strong>SEO Optimization:</strong> Clean up meta descriptions and titles for better search engine
                  presentation
                </li>
                <li>
                  <strong>Email Formatting:</strong> Ensure clean, consistent formatting in email templates and
                  newsletters
                </li>
                <li>
                  <strong>Document Conversion:</strong> Clean up text after converting between different file formats
                </li>
                <li>
                  <strong>Collaborative Writing:</strong> Standardize formatting when combining text from multiple
                  authors
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to clean up your text with precision and ease? Start using our White Space Remover tool now and
                experience the power of efficient text formatting at your fingertips. Whether you're a developer
                cleaning up code, an editor polishing an article, or anyone who needs consistently formatted text, our
                tool is here to make your life easier. Try it out and see how it can streamline your text cleaning
                process!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

