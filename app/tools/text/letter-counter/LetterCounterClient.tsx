"use client"

import type React from "react"
import { useState, useCallback, useEffect, useMemo } from "react"
import { Card, CardBody, Button, Textarea, Tabs, Tab, Tooltip, Badge, Progress } from "@nextui-org/react"
import {
  Copy,
  Download,
  BarChart2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
  Info,
  RefreshCw,
  FileText,
  Maximize2,
  Minimize2,
  SortAsc,
  SortDesc,
  Percent,
  Hash,
  Type,
  Clock,
  AlignLeft,
  Sparkles,
  Calculator,
  Save,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./info-section"

const MAX_CHARS = 10000

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
  return text.split(/\n\n/).filter((para) => para.trim() !== "").length
}

const getLetterFrequency = (
  text: string,
): {
  combined: Record<string, number>
  uppercase: Record<string, number>
  lowercase: Record<string, number>
} => {
  const combined: Record<string, number> = {}
  const uppercase: Record<string, number> = {}
  const lowercase: Record<string, number> = {}

  // Process all letters
  text
    .replace(/[^a-zA-Z]/g, "")
    .split("")
    .forEach((char) => {
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

// Get vowel and consonant counts
const getVowelConsonantCount = (text: string): { vowels: number; consonants: number } => {
  const vowels = text.toLowerCase().match(/[aeiou]/g)?.length || 0
  const consonants = text.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g)?.length || 0
  return { vowels, consonants }
}

// Get unique words count
const getUniqueWordsCount = (text: string): number => {
  const words = text
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "")
  return new Set(words).size
}

// Get average word length
const getAverageWordLength = (text: string): number => {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "")
  if (words.length === 0) return 0
  const totalLength = words.reduce((sum, word) => sum + word.length, 0)
  return Number.parseFloat((totalLength / words.length).toFixed(1))
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
  const [sortOrder, setSortOrder] = useState<"alphabetical" | "frequency">("frequency")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPercentages, setShowPercentages] = useState(false)
  const [analysisTab, setAnalysisTab] = useState("frequency")

  // Advanced statistics
  const [vowelCount, setVowelCount] = useState(0)
  const [consonantCount, setConsonantCount] = useState(0)
  const [uniqueWordsCount, setUniqueWordsCount] = useState(0)
  const [averageWordLength, setAverageWordLength] = useState(0)

  const analyzeText = useCallback((text: string) => {
    const frequency = getLetterFrequency(text)
    setLetterFrequency(frequency)
    setWordCount(countWords(text))
    setSentenceCount(countSentences(text))
    setParagraphCount(countParagraphs(text))
    setMostCommonLetter(getMostCommonLetter(frequency.combined))
    setReadingTime(estimateReadingTime(text))

    // Advanced statistics
    const { vowels, consonants } = getVowelConsonantCount(text)
    setVowelCount(vowels)
    setConsonantCount(consonants)
    setUniqueWordsCount(getUniqueWordsCount(text))
    setAverageWordLength(getAverageWordLength(text))
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
            vowelCount,
            consonantCount,
            uniqueWordsCount,
            averageWordLength,
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
  }, [
    inputText,
    letterFrequency,
    wordCount,
    sentenceCount,
    paragraphCount,
    mostCommonLetter,
    readingTime,
    vowelCount,
    consonantCount,
    uniqueWordsCount,
    averageWordLength,
  ])

  const handleClear = useCallback(() => {
    setInputText("")
    toast.success("Text cleared")
  }, [])

  const handleShowStats = useCallback(() => {
    toast(
      (t: { id: string }) => (
        <div className="p-2">
          <h3 className="font-bold mb-2">Text Statistics</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <p>Words: {wordCount}</p>
            <p>Characters: {inputText.length}</p>
            <p>Sentences: {sentenceCount}</p>
            <p>Paragraphs: {paragraphCount}</p>
            <p>Vowels: {vowelCount}</p>
            <p>Consonants: {consonantCount}</p>
            <p>Unique words: {uniqueWordsCount}</p>
            <p>Avg. word length: {averageWordLength}</p>
            <p>Most common letter: {mostCommonLetter}</p>
            <p>Reading time: {readingTime} min</p>
          </div>
          <Button size="sm" className="mt-2 w-full" onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </Button>
        </div>
      ),
      { duration: 10000 },
    )
  }, [
    wordCount,
    inputText.length,
    sentenceCount,
    paragraphCount,
    mostCommonLetter,
    readingTime,
    vowelCount,
    consonantCount,
    uniqueWordsCount,
    averageWordLength,
  ])

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

  // Get total count of all letters for percentage calculation
  const totalLetterCount = useMemo(() => {
    const freq = getVisibleLetterFrequency()
    return Object.values(freq).reduce((sum, count) => sum + count, 0)
  }, [getVisibleLetterFrequency])

  // Sort letter frequency entries
  const sortedLetterFrequency = useMemo(() => {
    const freq = getVisibleLetterFrequency()
    const entries = Object.entries(freq)

    if (sortOrder === "alphabetical") {
      return entries.sort((a, b) => a[0].localeCompare(b[0]))
    } else {
      return entries.sort((a, b) => b[1] - a[1])
    }
  }, [getVisibleLetterFrequency, sortOrder])

  // Find the highest frequency for scaling the visualization
  const maxFrequency = useMemo(() => {
    const freq = getVisibleLetterFrequency()
    return Math.max(...Object.values(freq), 0)
  }, [getVisibleLetterFrequency])

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "alphabetical" ? "frequency" : "alphabetical")
  }

  // Generate sample text
  const generateSampleText = () => {
    const sampleText =
      "The quick brown fox jumps over the lazy dog. This pangram contains all the letters of the English alphabet. " +
      "Amazingly few discotheques provide jukeboxes! How vexingly quick daft zebras jump! Pack my box with five dozen liquor jugs. " +
      "Sphinx of black quartz, judge my vow. The five boxing wizards jump quickly. Crazy Fredrick bought many very exquisite opal jewels."

    setInputText(sampleText)
    toast.success("Sample text generated")
  }

  return (
    <ToolLayout
      title="Letter Counter"
      description="Analyze your text with our advanced Letter Counter tool. Get detailed insights on letter frequency, word count, and more!"
      toolId="678f382826f06f912191bc7d"
    >
      <div className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : ""}`}>
        {isFullscreen && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Letter Counter & Text Analyzer</h2>
            <Button isIconOnly variant="light" onPress={toggleFullscreen}>
              <Minimize2 size={20} />
            </Button>
          </div>
        )}

        {/* Stats Overview */}
        <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <CardBody className="py-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-sm">
              <div className="flex flex-col items-center justify-center p-2">
                <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                  <Type size={14} />
                  <span className="font-medium">Characters</span>
                </div>
                <span className="text-lg font-bold">{inputText.length}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2">
                <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                  <Hash size={14} />
                  <span className="font-medium">Words</span>
                </div>
                <span className="text-lg font-bold">{wordCount}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2">
                <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                  <AlignLeft size={14} />
                  <span className="font-medium">Sentences</span>
                </div>
                <span className="text-lg font-bold">{sentenceCount}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2">
                <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                  <FileText size={14} />
                  <span className="font-medium">Paragraphs</span>
                </div>
                <span className="text-lg font-bold">{paragraphCount}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2">
                <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                  <Sparkles size={14} />
                  <span className="font-medium">Most Common</span>
                </div>
                <span className="text-lg font-bold">{mostCommonLetter || "-"}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2">
                <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
                  <Clock size={14} />
                  <span className="font-medium">Reading Time</span>
                </div>
                <span className="text-lg font-bold">{readingTime} min</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-primary">Input Text</h3>
                <div className="flex gap-1">
                  <Tooltip content="Generate sample text" className="text-default-700">
                    <Button isIconOnly size="sm" variant="flat" onPress={generateSampleText}>
                      <RefreshCw size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Toggle fullscreen" className="text-default-700">
                    <Button isIconOnly size="sm" variant="flat" onPress={toggleFullscreen}>
                      <Maximize2 size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <Textarea
                value={inputText}
                onChange={handleInputChange}
                variant="bordered"
                placeholder="Enter your text here for analysis..."
                minRows={12}
                size="lg"
                className="mb-2"
              />

              <div className="flex justify-between items-center">
                <p className="text-sm text-default-500">
                  {inputText.length}/{MAX_CHARS} characters
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={handleClear}
                    startContent={<Trash2 size={16} />}
                    isDisabled={!inputText}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    onPress={handleShowStats}
                    startContent={<BarChart2 size={16} />}
                    isDisabled={!inputText}
                  >
                    Show Stats
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Analysis Section */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-4">
              <Tabs
                aria-label="Analysis tabs"
                selectedKey={analysisTab}
                onSelectionChange={(key) => setAnalysisTab(key as string)}
                className="mb-4"
              >
                <Tab
                  key="frequency"
                  title={
                    <div className="flex items-center gap-1">
                      <BarChart2 size={16} />
                      <span>Letter Frequency</span>
                    </div>
                  }
                />
                <Tab
                  key="advanced"
                  title={
                    <div className="flex items-center gap-1">
                      <Calculator size={16} />
                      <span>Advanced Stats</span>
                    </div>
                  }
                />
              </Tabs>

              {analysisTab === "frequency" ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <Tabs
                      aria-label="Letter frequency tabs"
                      selectedKey={activeTab}
                      onSelectionChange={(key) => setActiveTab(key as string)}
                      size="sm"
                      classNames={{
                        tabList: "gap-0",
                      }}
                    >
                      <Tab
                        key="combined"
                        title={
                          <div className="flex items-center gap-1">
                            <Layers size={14} />
                            <span>Combined</span>
                          </div>
                        }
                      />
                      <Tab
                        key="uppercase"
                        title={
                          <div className="flex items-center gap-1">
                            <ArrowUp size={14} />
                            <span>Uppercase</span>
                          </div>
                        }
                      />
                      <Tab
                        key="lowercase"
                        title={
                          <div className="flex items-center gap-1">
                            <ArrowDown size={14} />
                            <span>Lowercase</span>
                          </div>
                        }
                      />
                    </Tabs>

                    <div className="flex gap-2 items-center">
                      <Tooltip content={showPercentages ? "Show counts" : "Show percentages"} className="text-default-700">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onPress={() => setShowPercentages(!showPercentages)}
                        >
                          {showPercentages ? <Hash size={16} /> : <Percent size={16} />}
                        </Button>
                      </Tooltip>

                      <Tooltip content={sortOrder === "alphabetical" ? "Sort by frequency" : "Sort alphabetically"} className="text-default-700">
                        <Button isIconOnly size="sm" variant="flat" onPress={toggleSortOrder}>
                          {sortOrder === "alphabetical" ? <SortDesc size={16} /> : <SortAsc size={16} />}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-default-600 dark:text-default-400">
                      {activeTab === "combined"
                        ? "Combined counts merge uppercase and lowercase letters"
                        : `Showing ${activeTab} letters only`}
                    </p>
                    <Badge variant="flat" color="primary">
                      {Object.keys(getVisibleLetterFrequency()).length} unique letters
                    </Badge>
                  </div>

                  {totalLetterCount > 0 ? (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {sortedLetterFrequency.map(([letter, count]) => {
                        const percentage = (count / totalLetterCount) * 100
                        const displayValue = showPercentages ? `${percentage.toFixed(1)}%` : count.toString()

                        return (
                          <div key={letter} className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 rounded-md">
                              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{letter}</span>
                            </div>
                            <Progress
                              value={count}
                              maxValue={maxFrequency}
                              className="flex-1"
                              size="sm"
                              color="primary"
                              showValueLabel={false}
                              aria-label={`Letter ${letter} frequency`}
                            />
                            <div className="w-16 text-right">
                              <span className="font-medium">{displayValue}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-default-400">
                      <Info size={48} className="mb-4 opacity-50" />
                      <p className="text-center">Enter text to see letter frequency analysis</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  {/* Character Analysis */}
                  <div>
                    <h3 className="text-md font-medium mb-2 flex items-center gap-1">
                      <Type size={16} className="text-primary-500" />
                      Character Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-default-100/50">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Vowels</span>
                            <Badge variant="flat" color="primary">
                              {vowelCount}
                            </Badge>
                          </div>
                          <Progress
                            value={vowelCount}
                            maxValue={vowelCount + consonantCount || 1}
                            className="mt-2"
                            size="sm"
                            color="primary"
                            showValueLabel={false}
                          />
                          <p className="text-xs text-default-500 mt-1">
                            {vowelCount + consonantCount > 0
                              ? `${((vowelCount / (vowelCount + consonantCount)) * 100).toFixed(1)}% of all letters`
                              : "No letters detected"}
                          </p>
                        </CardBody>
                      </Card>

                      <Card className="bg-default-100/50">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Consonants</span>
                            <Badge variant="flat" color="secondary">
                              {consonantCount}
                            </Badge>
                          </div>
                          <Progress
                            value={consonantCount}
                            maxValue={vowelCount + consonantCount || 1}
                            className="mt-2"
                            size="sm"
                            color="secondary"
                            showValueLabel={false}
                          />
                          <p className="text-xs text-default-500 mt-1">
                            {vowelCount + consonantCount > 0
                              ? `${((consonantCount / (vowelCount + consonantCount)) * 100).toFixed(1)}% of all letters`
                              : "No letters detected"}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>

                  {/* Word Analysis */}
                  <div>
                    <h3 className="text-md font-medium mb-2 flex items-center gap-1">
                      <Hash size={16} className="text-primary-500" />
                      Word Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-default-100/50">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Unique Words</span>
                            <Badge variant="flat" color="success">
                              {uniqueWordsCount}
                            </Badge>
                          </div>
                          <Progress
                            value={uniqueWordsCount}
                            maxValue={wordCount || 1}
                            className="mt-2"
                            size="sm"
                            color="success"
                            showValueLabel={false}
                          />
                          <p className="text-xs text-default-500 mt-1">
                            {wordCount > 0
                              ? `${((uniqueWordsCount / wordCount) * 100).toFixed(1)}% of total words`
                              : "No words detected"}
                          </p>
                        </CardBody>
                      </Card>

                      <Card className="bg-default-100/50">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average Word Length</span>
                            <Badge variant="flat" color="warning">
                              {averageWordLength}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-4 flex-1 rounded-sm ${
                                  i < Math.floor(averageWordLength)
                                    ? "bg-warning-500"
                                    : i < averageWordLength
                                      ? "bg-warning-300"
                                      : "bg-default-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-default-500 mt-1">
                            {wordCount > 0 ? `Average characters per word` : "No words detected"}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>

                  {/* Text Structure */}
                  <div>
                    <h3 className="text-md font-medium mb-2 flex items-center gap-1">
                      <AlignLeft size={16} className="text-primary-500" />
                      Text Structure
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-default-100/50">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Words per Sentence</span>
                            <Badge variant="flat" color="danger">
                              {sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0}
                            </Badge>
                          </div>
                          <p className="text-xs text-default-500 mt-2">
                            {sentenceCount > 0
                              ? `${wordCount} words across ${sentenceCount} sentences`
                              : "No sentences detected"}
                          </p>
                        </CardBody>
                      </Card>

                      <Card className="bg-default-100/50">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Sentences per Paragraph</span>
                            <Badge variant="flat" color="primary">
                              {paragraphCount > 0 ? (sentenceCount / paragraphCount).toFixed(1) : 0}
                            </Badge>
                          </div>
                          <p className="text-xs text-default-500 mt-2">
                            {paragraphCount > 0
                              ? `${sentenceCount} sentences across ${paragraphCount} paragraphs`
                              : "No paragraphs detected"}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button color="primary" onClick={handleCopy} startContent={<Copy size={18} />} isDisabled={!inputText}>
            Copy Analysis
          </Button>
          <Button
            color="primary"
            onClick={handleDownload}
            startContent={<Download size={18} />}
            isDisabled={!inputText}
          >
            Download Report
          </Button>
          <Button
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(inputText)
              toast.success("Text copied to clipboard")
            }}
            startContent={<Save size={18} />}
            isDisabled={!inputText}
          >
            Copy Text
          </Button>
        </div>

        {/* Info Section */}
        <InfoSection />
      </div>
    </ToolLayout>
  )
}
