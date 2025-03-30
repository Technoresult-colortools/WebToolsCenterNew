"use client"

import React, { useState, useCallback } from "react"
import { Card, CardBody, Button, Checkbox, Textarea,  } from "@nextui-org/react"
import Link from "next/link"
import {
  Copy,
  Download,
  RefreshCw,
  Shuffle,
  Info,
  Lightbulb,
  BookOpen,
  Hash,
  ZapIcon,
  ToggleLeft,
  Type,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const MAX_CHARS = 5000

export default function WordsCounter() {
  const [text, setText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [includeSpaces, setIncludeSpaces] = useState(true)

  const updateCounts = useCallback(() => {
    const words = text.trim().split(/\s+/)
    setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length)
    setCharCount(includeSpaces ? text.length : text.replace(/\s+/g, "").length)
  }, [text, includeSpaces])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    if (newText.length <= MAX_CHARS) {
      setText(newText)
    } else {
      setText(newText.slice(0, MAX_CHARS))
      toast.error(`Character limit of ${MAX_CHARS} reached`)
    }
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard")
  }, [text])

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully")
  }, [text])

  const handleClear = useCallback(() => {
    setText("")
    setWordCount(0)
    setCharCount(0)
    toast.success("Text cleared")
  }, [])

  const handleShuffleWords = useCallback(() => {
    const shuffledText = text
      .split(/\s+/)
      .sort(() => Math.random() - 0.5)
      .join(" ")
    setText(shuffledText)
    toast.success("Text shuffled")
  }, [text])

  React.useEffect(() => {
    updateCounts()
  }, [text, includeSpaces]) //Updated useEffect dependency

  return (
    <ToolLayout
      title="Words Counter"
      description="Count the number of words and characters in your text"
      toolId="678f382826f06f912191bc7f"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your text here..."
              minRows={8}
              className="w-full mb-4"
              variant="bordered"
            />
            <p className="text-sm text-default-500 mb-4">
              {text.length}/{MAX_CHARS} characters
            </p>
            <div className="flex items-center mb-4">
              <Checkbox isSelected={includeSpaces} onValueChange={setIncludeSpaces}>
                Include Spaces in Character Count
              </Checkbox>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-default-700">Word Count: {wordCount}</p>
                <p className="text-lg font-medium text-default-700">Character Count: {charCount}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">

            <Button color="primary" onPress={handleCopy} startContent={<Copy size={18} />}>
              Copy
            </Button>
      
   
            <Button color="primary" onPress={handleDownload} startContent={<Download size={18} />}>
              Download
            </Button>
        
   
            <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
              Clear
            </Button>
       
          
            <Button color="primary" onPress={handleShuffleWords} startContent={<Shuffle size={18} />}>
              Shuffle Words
            </Button>
       
        </div>

        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">

            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              {/* Title Section */}
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Words Counter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Words Counter is a versatile text analysis tool ideal for writers, students, and content creators. It provides comprehensive text statistics and manipulation features with a{" "}
                <Link href="#how-to-use" className="text-primary hover:underline">
                  user-friendly interface
                </Link>, making it the perfect companion for writing, editing, and text analysis tasks.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Whether you're crafting essays, optimizing content for SEO, or analyzing text, the Words Counter delivers valuable insights with ease. It's like having a personal text analyst in your browser!
              </p>

              {/* How-To Section */}
              <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Words Counter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Paste or type text into the input area.</li>
                <li>Counts update automatically as you type or paste.</li>
                <li>Toggle "Include Spaces" to adjust character count.</li>
                <li>Shuffle words for creative exercises.</li>
                <li>Copy text to clipboard with a click.</li>
                <li>Download text as a .txt file.</li>
                <li>Clear input and reset statistics with "Clear".</li>
              </ol>

              {/* Key Features Section */}
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Hash className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li><strong>Word Count:</strong> Accurate word statistics.</li>
                <li><strong>Character Count:</strong> Includes/excludes spaces.</li>
                <li><strong>Real-time Updates:</strong> Instant counts as you type.</li>
                <li><strong>Word Shuffling:</strong> Rearrange words creatively.</li>
                <li><strong>Copy Functionality:</strong> One-click text copying.</li>
                <li><strong>Download Option:</strong> Save as a .txt file.</li>
                <li><strong>Clear Function:</strong> Reset text and counts.</li>
              </ul>

              {/* Stand-Out Features */}
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Features That Make Us Stand Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li><ZapIcon className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Counting:</strong> Instant updates.</li>
                <li><ToggleLeft className="w-4 h-4 inline-block mr-1" /> <strong>Flexible Character Count:</strong> Include/exclude spaces.</li>
                <li><Shuffle className="w-4 h-4 inline-block mr-1" /> <strong>Word Shuffling:</strong> Creative exercises.</li>
                <li><Copy className="w-4 h-4 inline-block mr-1" /> <strong>One-Click Copy:</strong> Easy clipboard access.</li>
                <li><Download className="w-4 h-4 inline-block mr-1" /> <strong>Download:</strong> Save as .txt file.</li>
                <li><RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick Reset:</strong> Start over easily.</li>
                <li><Type className="w-4 h-4 inline-block mr-1" /> <strong>User-Friendly:</strong> Clean, intuitive design.</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to enhance your writing process? Try Words Counter now for accurate, real-time text insights and take your writing to the next level!
              </p>
            </div>

        </Card>

      </div>
    </ToolLayout>
  )
}

