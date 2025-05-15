"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Card, CardBody, Button, Textarea, Tabs, Tab } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import {
  Copy,
  Download,
  Info,
  Lightbulb,
  BookOpen,
  BarChart2,
  Type,
  Zap,
  Calculator,
  Clock,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const MAX_CHARS = 5000

const countWords = (text: string): number => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length
}

const countSentences = (text: string): number => {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim() !== "").length
}

const countParagraphs = (text: string): number => {
  return text.split("\n\n").filter((para) => para.trim() !== "").length
}

const getLetterFrequency = (text: string): {
  combined: Record<string, number>
  uppercase: Record<string, number>
  lowercase: Record<string, number>
} => {
  const combined: Record<string, number> = {}
  const uppercase: Record<string, number> = {}
  const lowercase: Record<string, number> = {}
  
  // Process all letters
  text.replace(/[^a-zA-Z]/g, "").split("").forEach((char) => {
    const lowerChar = char.toLowerCase()
    
    // Combined count (case-insensitive)
    combined[lowerChar] = (combined[lowerChar] || 0) + 1
    
    // Separate uppercase and lowercase counts
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      uppercase[char] = (uppercase[char] || 0) + 1
    } else {
      lowercase[char] = (lowercase[char] || 0) + 1
    }
  })
  
  return { combined, uppercase, lowercase }
}

const getMostCommonLetter = (letterFrequency: Record<string, number>): string => {
  const sortedLetters = Object.entries(letterFrequency).sort((a, b) => b[1] - a[1])
  return sortedLetters.length > 0 ? sortedLetters[0][0] : ""
}

const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200
  const words = countWords(text)
  return Math.ceil(words / wordsPerMinute)
}

export default function LetterCounter() {
  const [inputText, setInputText] = useState("")
  const [letterFrequency, setLetterFrequency] = useState<{
    combined: Record<string, number>
    uppercase: Record<string, number>
    lowercase: Record<string, number>
  }>({
    combined: {},
    uppercase: {},
    lowercase: {},
  })
  const [wordCount, setWordCount] = useState(0)
  const [sentenceCount, setSentenceCount] = useState(0)
  const [paragraphCount, setParagraphCount] = useState(0)
  const [mostCommonLetter, setMostCommonLetter] = useState("")
  const [readingTime, setReadingTime] = useState(0)
  const [activeTab, setActiveTab] = useState("combined")

  const analyzeText = useCallback((text: string) => {
    const frequency = getLetterFrequency(text)
    setLetterFrequency(frequency)
    setWordCount(countWords(text))
    setSentenceCount(countSentences(text))
    setParagraphCount(countParagraphs(text))
    setMostCommonLetter(getMostCommonLetter(frequency.combined))
    setReadingTime(estimateReadingTime(text))
  }, [])

  useEffect(() => {
    analyzeText(inputText)
  }, [inputText, analyzeText])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setInputText(text)
    } else {
      setInputText(text.slice(0, MAX_CHARS))
      toast.error(`Character limit of ${MAX_CHARS} reached`)
    }
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(letterFrequency, null, 2))
    toast.success("Letter frequency copied to clipboard")
  }, [letterFrequency])

  const handleDownload = useCallback(() => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            text: inputText,
            letterFrequency,
            wordCount,
            sentenceCount,
            paragraphCount,
            mostCommonLetter,
            readingTime,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "text_analysis.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Analysis downloaded successfully")
  }, [inputText, letterFrequency, wordCount, sentenceCount, paragraphCount, mostCommonLetter, readingTime])

  const handleClear = useCallback(() => {
    setInputText("")
    toast.success("Text cleared")
  }, [])

  const handleShowStats = useCallback(() => {
    toast(
      (t: { id: string }) => (
        <div>
          <p>Words: {wordCount}</p>
          <p>Sentences: {sentenceCount}</p>
          <p>Paragraphs: {paragraphCount}</p>
          <p>Most common letter: {mostCommonLetter}</p>
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </div>
      ),
      { duration: 5000 },
    )
  }, [wordCount, sentenceCount, paragraphCount, mostCommonLetter])

  const getVisibleLetterFrequency = useCallback(() => {
    switch (activeTab) {
      case "uppercase":
        return letterFrequency.uppercase
      case "lowercase":
        return letterFrequency.lowercase
      default:
        return letterFrequency.combined
    }
  }, [activeTab, letterFrequency])

  return (
    <ToolLayout
      title="Letter Counter"
      description="Analyze your text with our advanced Letter Counter tool. Get detailed insights on letter frequency, word count, and more!"
      toolId="678f382826f06f912191bc7d"
    >
      <div className="space-y-8">
        {/* Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <label className="block text-lg font-medium text-primary mb-2">Input Text:</label>
            <Textarea
              value={inputText}
              onChange={handleInputChange}
              variant="bordered"
              placeholder="Enter your text here for analysis..."
              minRows={4}
              size="lg"
              className="mb-4"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-default-600">
              <div>Words: {wordCount}</div>
              <div>Characters: {inputText.length}</div>
              <div>Sentences: {sentenceCount}</div>
              <div>Paragraphs: {paragraphCount}</div>
              <div>Most common letter: {mostCommonLetter}</div>
              <div>Reading time: {readingTime} min</div>
            </div>
            <p className="text-sm text-default-500 mt-2">
              {inputText.length}/{MAX_CHARS} characters
            </p>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button color="primary" onClick={handleCopy} startContent={<Copy className="h-4 w-4" />}>
            Copy Analysis
          </Button>
          <Button color="primary" onClick={handleDownload} startContent={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button color="primary" onClick={handleShowStats} startContent={<BarChart2 className="h-4 w-4" />}>
            Show Stats
          </Button>
          <Button color="danger" onClick={handleClear} startContent={<Trash2 className="h-4 w-4" />}>
            Clear
          </Button>
        </div>

         {/* Letter Frequency Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Letter Frequency:</h2>
            
            <Tabs 
              aria-label="Letter frequency tabs" 
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              className="mb-4"
            >
              <Tab 
                key="combined" 
                title={
                  <div className="flex items-center">
                    <Layers className="w-4 h-4 mr-1" />
                    Combined
                  </div>
                }
              />
              <Tab 
                key="uppercase" 
                title={
                  <div className="flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    Uppercase
                  </div>
                }
              />
              <Tab 
                key="lowercase" 
                title={
                  <div className="flex items-center">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    Lowercase
                  </div>
                }
              />
            </Tabs>
            
            <p className="text-sm text-default-600 dark:text-default-400 mb-4">
              {activeTab === "combined" 
                ? "Note: Combined counts merge uppercase and lowercase letters." 
                : `Note: Showing ${activeTab} letters only.`}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {Object.entries(getVisibleLetterFrequency()).map(([letter, count]) => (
                <div
                  key={letter}
                  className="bg-default-200 dark:bg-default-800 rounded-lg p-3 text-center flex flex-col items-center border border-default-300 dark:border-default-600 shadow-sm"
                >
                  <span className="text-xl font-bold text-default-900 dark:text-default-100">
                    {letter}
                  </span>
                  <span className="text-lg text-default-600 dark:text-default-400">{count}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the Letter Counter?
            </h2>
            <p className="text-default-600 mb-4">
              The Letter Counter is a powerful text analysis tool designed for writers, editors, students, and language
              enthusiasts. It provides comprehensive insights into your text, including letter frequency with case sensitivity, word count,
              sentence count, and more. With its{" "}
              <Link href="#how-to-use" className="text-primary hover:underline">
                user-friendly interface
              </Link>
              , you can quickly analyze any piece of text and gain valuable information about its composition.
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/LetterCounterPreview.png?height=400&width=600" 
                alt="Screenshot of the Letter Counter interface showing text input area and letter frequency analysis"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use the Letter Counter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-default-600">
              <li>Enter or paste your text into the input box. You can input up to 5000 characters.</li>
              <li>As you type or paste, the tool automatically analyzes your text in real-time.</li>
              <li>Use the tabs to toggle between combined, uppercase-only, and lowercase-only letter frequency.</li>
              <li>View the letter frequency chart and text statistics below the input area.</li>
              <li>Use the "Copy Analysis" button to copy the letter frequency data to your clipboard.</li>
              <li>Click "Download" to save a comprehensive JSON file with all analysis data.</li>
              <li>To start fresh, use the "Clear" button to reset the input and analysis.</li>
            </ol>
            <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-warning" />
              Features That Make Us Stand Out
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-default-600">
              <li>
                <Zap className="w-4 h-4 inline-block mr-1 text-danger" /> <strong>Case-sensitive letter tracking:</strong> Separate uppercase and lowercase letter counts
              </li>
              <li>
                <Zap className="w-4 h-4 inline-block mr-1 text-danger" /> <strong>Real-time analysis:</strong> See results instantly as you type
              </li>
              <li>
                <BarChart2 className="w-4 h-4 inline-block mr-1 text-primary" /> <strong>Comprehensive text statistics:</strong> Get word count, sentence count, and more
              </li>
              <li>
                <Type className="w-4 h-4 inline-block mr-1 text-secondary" /> <strong>Letter frequency visualization:</strong> Easy-to-read chart of letter distribution
              </li>
              <li>
                <Calculator className="w-4 h-4 inline-block mr-1 text-success" /> <strong>Most common letter identification:</strong> Quickly spot dominant characters
              </li>
              <li>
                <Clock className="w-4 h-4 inline-block mr-1 text-warning" /> <strong>Reading time estimation:</strong> Know how long it takes to read your text
              </li>
              <li>
                <Download className="w-4 h-4 inline-block mr-1 text-info" /> <strong>Downloadable analysis:</strong> Save comprehensive results as a JSON file
              </li>
            </ul>


            <p className="text-default-600 mt-4">
              Ready to dive deep into your text? Start using our Letter Counter tool now and unlock insights that will
              elevate your writing, editing, and analysis tasks. Whether you're a professional writer, a student, or
              just curious about the composition of your text, our tool is here to provide you with accurate, instant,
              and comprehensive text analysis. Try it out and see the difference it can make in your work!
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}