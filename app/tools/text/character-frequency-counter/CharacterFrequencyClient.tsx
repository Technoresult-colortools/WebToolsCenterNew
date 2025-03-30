"use client"

import React, { useState, useCallback } from "react"
import { Card, CardBody, Button, Textarea, Tooltip, Select, SelectItem, Checkbox, Input } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Download, RefreshCw, BarChart, Info, Lightbulb, BookOpen, Filter } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const countModeOptions = [
  { value: "character", label: "Character Frequency" },
  { value: "word", label: "Word Frequency" },
]

const sortOrderOptions = [
  { value: "descending", label: "Descending" },
  { value: "ascending", label: "Ascending" },
]

export default function CharacterFrequencyCounter() {
  const [inputText, setInputText] = useState("")
  const [charFrequency, setCharFrequency] = useState<Record<string, number>>({})
  const [wordFrequency, setWordFrequency] = useState<Record<string, number>>({})
  const [mode, setMode] = useState("character")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [excludeSpaces, setExcludeSpaces] = useState(false)
  const [excludePunctuation, setExcludePunctuation] = useState(false)
  const [sortOrder, setSortOrder] = useState("descending")
  const [minFrequency, setMinFrequency] = useState(1)

  const calculateFrequency = useCallback(() => {
    const text = caseSensitive ? inputText : inputText.toLowerCase()
    const charFreq: Record<string, number> = {}
    const wordFreq: Record<string, number> = {}

    if (mode === "character") {
      for (const char of text) {
        if (excludeSpaces && char === " ") continue
        if (excludePunctuation && /[^\w\s]/.test(char)) continue
        charFreq[char] = (charFreq[char] || 0) + 1
      }
      setCharFrequency(charFreq)
    } else if (mode === "word") {
      const words = text.split(/\s+/)
      for (const word of words) {
        const cleanWord = excludePunctuation ? word.replace(/[^\w\s]/g, "") : word
        if (cleanWord) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1
        }
      }
      setWordFrequency(wordFreq)
    }
    toast.success(`${mode === "character" ? "Character" : "Word"} frequency calculated!`)
  }, [inputText, mode, caseSensitive, excludeSpaces, excludePunctuation])

  const handleCopy = useCallback(() => {
    const frequency = mode === "character" ? charFrequency : wordFrequency
    const sortedEntries = Object.entries(frequency)
      .filter(([, value]) => value >= minFrequency)
      .sort((a, b) => (sortOrder === "descending" ? b[1] - a[1] : a[1] - b[1]))
    const text = sortedEntries.map(([key, value]) => `${key}: ${value}`).join("\n")
    navigator.clipboard.writeText(text)
    toast.success(`${mode === "character" ? "Character" : "Word"} frequency copied to clipboard`)
  }, [charFrequency, wordFrequency, mode, minFrequency, sortOrder])

  const handleDownload = useCallback(() => {
    const frequency = mode === "character" ? charFrequency : wordFrequency
    const sortedEntries = Object.entries(frequency)
      .filter(([, value]) => value >= minFrequency)
      .sort((a, b) => (sortOrder === "descending" ? b[1] - a[1] : a[1] - b[1]))
    const text = sortedEntries.map(([key, value]) => `${key}: ${value}`).join("\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${mode}_frequency.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`${mode.charAt(0).toUpperCase() + mode.slice(1)} frequency downloaded`)
  }, [charFrequency, wordFrequency, mode, minFrequency, sortOrder])

  const handleClear = useCallback(() => {
    setInputText("")
    setCharFrequency({})
    setWordFrequency({})
    toast.success("Input and results cleared")
  }, [])

  const frequencyResults = useCallback(() => {
    const frequency = mode === "character" ? charFrequency : wordFrequency
    return Object.entries(frequency)
      .filter(([, value]) => value >= minFrequency)
      .sort((a, b) => (sortOrder === "descending" ? b[1] - a[1] : a[1] - b[1]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
  }, [charFrequency, wordFrequency, mode, minFrequency, sortOrder])

  return (
    <ToolLayout
      title="Character Frequency Counter"
      description="Analyze the frequency of characters and words in your text with advanced options and visualizations."
      toolId="678f382926f06f912191bc83"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select label="Count Mode" selectedKeys={[mode]} onChange={(e) => setMode(e.target.value)} variant="bordered">
                {countModeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Sort Order" selectedKeys={[sortOrder]} onChange={(e) => setSortOrder(e.target.value)}  variant="bordered">
                {sortOrderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <Checkbox isSelected={caseSensitive} onValueChange={setCaseSensitive}>
                Case Sensitive
              </Checkbox>
              <Checkbox isSelected={excludeSpaces} onValueChange={setExcludeSpaces}>
                Exclude Spaces
              </Checkbox>
              <Checkbox isSelected={excludePunctuation} onValueChange={setExcludePunctuation}>
                Exclude Punctuation
              </Checkbox>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Input
                type="number"
                label="Min Frequency"
                value={minFrequency.toString()}
                onChange={(e) => setMinFrequency(Number.parseInt(e.target.value) || 1)}
                className="w-32"
                variant="bordered"
              />
            </div>

            <Button
              color="primary"
              onPress={calculateFrequency}
              startContent={<BarChart size={18} />}
              className="w-full mb-4"
            >
              Calculate Frequency
            </Button>

            <Textarea
              value={frequencyResults()}
              readOnly
              label="Frequency Results"
              placeholder="Results will appear here..."
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
          <Tooltip content="Clear text and results">
            <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
              Clear
            </Button>
          </Tooltip>
        </div>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Character Frequency Counter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              The Character Frequency Counter is a sophisticated text analysis tool for writers, linguists, cryptographers, and data analysts. It does more than just count characters; it provides detailed insight into your text’s composition with adjustable settings and features. Whether you are examining writing styles, decoding secret messages, or conducting text data research in languages, our tool provides the flexibility, features, and precision you need.Offering both character level analysis and word frequency counting, you can see your text in a new way. It is like having a microscope for your writing: seeing patterns and frequencies you might not see otherwise!
              </p>
        

              <div className="my-8">
                <Image
                  src="/Images/InfosectionImages/CharacterFrequencyPreview.png?height=400&width=600" 
                  alt="Screenshot of the Character Frequency Counter interface showing text input area, analysis options, and frequency results"
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
                How to Use the Character Frequency Counter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter or paste your text into the input area.</li>
                <li>Choose between Character Frequency or Word Frequency mode.</li>
                <li>Adjust analysis options like case sensitivity, space exclusion, and punctuation handling.</li>
                <li>Set the minimum frequency threshold if you want to filter out rare occurrences.</li>
                <li>Click "Calculate Frequency" to analyze your text.</li>
                <li>View the results in the output area, sorted by frequency.</li>
                <li>Use the "Copy" button to copy results to your clipboard or "Download" to save as a file.</li>
                <li>Click "Clear" to reset the tool for a new analysis.</li>
              </ol>

              <h2
                id="features"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Dual Mode Analysis:</strong> Switch between character and word frequency counting.
                </li>
                <li>
                  <strong>Customizable Options:</strong> Adjust for case sensitivity, space exclusion, and punctuation
                  handling.
                </li>
                <li>
                  <strong>Frequency Threshold:</strong> Filter results based on minimum occurrence count.
                </li>
                <li>
                  <strong>Sorting Options:</strong> View results in ascending or descending order of frequency.
                </li>
                <li>
                  <strong>Instant Calculations:</strong> Get real-time updates as you modify your text or options.
                </li>
                <li>
                  <strong>Export Functionality:</strong> Copy results to clipboard or download as a text file.
                </li>
                <li>
                  <strong>Clear and Reset:</strong> Easily start a new analysis with a single click.
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Filter className="w-6 h-6 mr-2" />
                Advanced Options Explained
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Case Sensitivity:</strong> Choose whether to treat uppercase and lowercase letters as
                  distinct.
                </li>
                <li>
                  <strong>Exclude Spaces:</strong> Option to ignore space characters in character frequency analysis.
                </li>
                <li>
                  <strong>Exclude Punctuation:</strong> Remove punctuation marks from the analysis.
                </li>
                <li>
                  <strong>Minimum Frequency:</strong> Set a threshold to focus on more frequent characters or words.
                </li>
                <li>
                  <strong>Sort Order:</strong> Arrange results from most to least frequent (descending) or vice versa
                  (ascending).
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Practical Applications
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Linguistic Analysis:</strong> Study language patterns and character distributions.
                </li>
                <li>
                  <strong>Cryptography:</strong> Analyze frequency patterns for code-breaking or creating ciphers.
                </li>
                <li>
                  <strong>Writing Style Analysis:</strong> Compare character or word usage across different texts or
                  authors.
                </li>
                <li>
                  <strong>SEO Optimization:</strong> Analyze keyword frequency and density in web content.
                </li>
                <li>
                  <strong>Data Cleaning:</strong> Identify and quantify non-standard characters or typos in large
                  datasets.
                </li>
                <li>
                  <strong>Language Learning:</strong> Study character or word frequency to prioritize vocabulary
                  learning.
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to dive deep into your text analysis? Start using our Character Frequency Counter now and uncover
                the hidden patterns in your writing. Whether you're a professional analyst, a curious writer, or a
                student exploring language, our tool provides the insights you need to understand your text at a
                granular level. Try it out and see what you discover in your words!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

