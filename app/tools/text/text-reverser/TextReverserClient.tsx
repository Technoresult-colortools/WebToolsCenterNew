"use client"

import React, { useState, useCallback } from "react"
import { Card, CardBody, Button, Textarea, Tooltip, Select, SelectItem } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import {
  Copy,
  Download,
  RefreshCw,
  Settings,
  Info,
  Lightbulb,
  BookOpen,
  ArrowLeftRight,
  Zap,
  Type,
  Puzzle,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const reverseOptions = [
  { value: "character", label: "By Character" },
  { value: "word", label: "By Word" },
  { value: "sentence", label: "By Sentence" },
]

export default function TextReverser() {
  const [inputText, setInputText] = useState("")
  const [reversedText, setReversedText] = useState("")
  const [reverseMode, setReverseMode] = useState("character")

  const reverseText = useCallback(() => {
    const text = inputText.trim()
    let result = ""

    if (reverseMode === "character") {
      result = text.split("").reverse().join("")
    } else if (reverseMode === "word") {
      result = text.split(" ").reverse().join(" ")
    } else if (reverseMode === "sentence") {
      result = text
        .split(/(?<=[.!?])\s+/)
        .reverse()
        .join(" ")
    }

    setReversedText(result)
    toast.success("Text reversed!")
  }, [inputText, reverseMode])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(reversedText)
    toast.success("Text copied to clipboard")
  }, [reversedText])

  const handleDownload = useCallback(() => {
    const blob = new Blob([reversedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "reversed_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully")
  }, [reversedText])

  const handleClear = useCallback(() => {
    setInputText("")
    setReversedText("")
    toast.success("Text cleared")
  }, [])

  return (
    <ToolLayout
      title="Text Reverser"
      description="Reverse the order of characters, words, or sentences in your text"
      toolId="678f382926f06f912191bc82"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              minRows={8}
              className="w-full mb-4"
              variant="bordered"
            />
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Select
                label="Reverse Mode"
                selectedKeys={[reverseMode]}
                onChange={(e) => setReverseMode(e.target.value)}
                className="max-w-full sm:max-w-[200px]"
                variant="bordered"
              >
                {reverseOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Button
                color="primary"
                onPress={reverseText}
                startContent={<Settings size={18} />}
                className="w-full sm:w-auto"
              >
                Reverse
              </Button>
            </div>
            <Textarea
              value={reversedText}
              readOnly
              placeholder="Reversed text will appear here..."
              minRows={8}
              className="w-full"
              variant="bordered"
            />
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Tooltip content="Copy to clipboard">
            <Button color="primary" onPress={handleCopy} startContent={<Copy size={18} />}>
              Copy
            </Button>
          </Tooltip>
          <Tooltip content="Download as text file">
            <Button color="primary" onPress={handleDownload} startContent={<Download size={18} />}>
              Download
            </Button>
          </Tooltip>
          <Tooltip content="Clear text">
            <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
              Clear
            </Button>
          </Tooltip>
        </div>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Text Reverser?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Text Reverser is a simple yet powerful tool designed to flip the order of characters, words, or
                sentences in your text. It goes beyond basic reversal, offering a{" "}
                <Link href="#how-to-use" className="text-primary hover:underline">
                  user-friendly interface
                </Link>{" "}
                and additional features to enhance your text manipulation experience. Whether you're creating word
                puzzles, experimenting with text formatting, or just having fun with your content, our Text Reverser
                provides an efficient and enjoyable way to transform your text.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                From reversing single words to entire paragraphs, this tool offers versatility for various creative and
                practical applications. It's like having a magic mirror for your text, instantly showing you the flip
                side of your words!
              </p>

              <div className="my-8">
                <Image
                  src="/Images/TextReverserPreview.png"
                  alt="Screenshot of the Text Reverser interface showing input area, reverse button, and output area with reversed text"
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
                How to Use the Text Reverser?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter or paste your text into the input area provided.</li>
                <li>Select the reversal mode: by character, word, or sentence.</li>
                <li>Click the "Reverse" button to instantly flip your text.</li>
                <li>View the reversed text in the output area below.</li>
                <li>Use the "Copy" button to copy the reversed text to your clipboard.</li>
                <li>Click "Download" to save the reversed text as a .txt file.</li>
                <li>Use the "Clear" button to reset both input and output areas for new content.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <ArrowLeftRight className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Multiple Reversal Modes:</strong> Reverse by character, word, or sentence.
                </li>
                <li>
                  <strong>Instant Reversal:</strong> Flip your text with just one click, no matter the length.
                </li>
                <li>
                  <strong>Multi-line Support:</strong> Reverse entire paragraphs while maintaining structure.
                </li>
                <li>
                  <strong>Preserve Formatting:</strong> Keeps the original spacing and punctuation intact.
                </li>
                <li>
                  <strong>Copy Functionality:</strong> Easily copy your reversed text to the clipboard.
                </li>
                <li>
                  <strong>Download Option:</strong> Save your reversed text as a .txt file.
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
                  <Zap className="w-4 h-4 inline-block mr-1" /> <strong>Lightning-Fast Reversal:</strong> Instantly
                  reverse text of any length
                </li>
                <li>
                  <Type className="w-4 h-4 inline-block mr-1" /> <strong>Flexible Reversal Options:</strong> Choose
                  between character, word, or sentence reversal
                </li>
                <li>
                  <Copy className="w-4 h-4 inline-block mr-1" /> <strong>One-Click Copying:</strong> Easily copy
                  reversed text to clipboard
                </li>
                <li>
                  <Download className="w-4 h-4 inline-block mr-1" /> <strong>Download Option:</strong> Save your
                  reversed text as a file for offline use
                </li>
                <li>
                  <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick Reset:</strong> Clear function for
                  easy start-over
                </li>
                <li>
                  <Puzzle className="w-4 h-4 inline-block mr-1" /> <strong>Versatile Applications:</strong> Useful for
                  puzzles, games, and creative writing
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Practical Applications
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Text Reverser tool can be useful in various creative and practical scenarios:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Word Puzzles:</strong> Create reverse word challenges or riddles for games and quizzes
                </li>
                <li>
                  <strong>Creative Writing:</strong> Experiment with reversed text in poetry or storytelling
                </li>
                <li>
                  <strong>Language Learning:</strong> Practice reading backwards to improve letter recognition
                </li>
                <li>
                  <strong>Cryptography:</strong> Use as a simple form of text encoding
                </li>
                <li>
                  <strong>Graphic Design:</strong> Create mirrored text effects for logos or artistic designs
                </li>
                <li>
                  <strong>Proofreading:</strong> Reverse text to spot errors you might miss reading forward
                </li>
                <li>
                  <strong>Fun and Entertainment:</strong> Amuse friends with reversed messages or create social media
                  content
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to flip your text and explore the world of reversed writing? Start using our Text Reverser tool
                now and experience the fun and utility of instant text reversal. Whether you're a puzzle enthusiast, a
                creative writer, or just someone who enjoys playing with words, our tool is here to add a new dimension
                to your text manipulation toolkit. Give it a try and see your text from a whole new perspective!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

