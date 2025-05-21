"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Textarea,
  Chip,
  Divider,
  Progress,
  Tabs,
  Tab,
  Tooltip,
  Switch,
} from "@nextui-org/react"
import {
  Copy,
  Download,
  RefreshCw,
  Shuffle,
  Type,
  AlignLeft,
  Clock,
  BarChart3,
  FileText,
  ImageUpIcon as Uppercase,
  CaseLowerIcon as Lowercase,
  CaseSensitive,
  Eraser,
  NotepadTextIcon as Paragraph,
  Braces,
  Hash,
  Timer,
  Trash2,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./InfoSection"

const MAX_CHARS = 10000 // Increased character limit

export default function WordsCounter() {
  // Basic state
  const [text, setText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [includeSpaces, setIncludeSpaces] = useState(true)

  // Advanced stats state
  const [sentenceCount, setSentenceCount] = useState(0)
  const [paragraphCount, setParagraphCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [uniqueWords, setUniqueWords] = useState(0)
  const [longestWord, setLongestWord] = useState("")
  const [mostFrequentWord, setMostFrequentWord] = useState({ word: "", count: 0 })
  const [keywordDensity, setKeywordDensity] = useState<{ word: string; count: number; percentage: number }[]>([])

  // UI state
  const [showAdvancedStats, setShowAdvancedStats] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const updateBasicCounts = useCallback(() => {
    // Basic counts
    const words = text.trim().split(/\s+/)
    setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length)
    setCharCount(includeSpaces ? text.length : text.replace(/\s+/g, "").length)

    // Sentence count (basic approximation)
    const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
    setSentenceCount(sentences.length)

    // Paragraph count
    const paragraphs = text.split(/\n+/).filter((para) => para.trim().length > 0)
    setParagraphCount(paragraphs.length)

    // Reading time (average 200 words per minute)
    const minutes = words.length > 0 ? Math.ceil(words.length / 200) : 0
    setReadingTime(minutes)
  }, [text, includeSpaces])

  const updateAdvancedStats = useCallback(() => {
    if (!text.trim()) {
      setUniqueWords(0)
      setLongestWord("")
      setMostFrequentWord({ word: "", count: 0 })
      setKeywordDensity([])
      return
    }

    setIsAnalyzing(true)

    // Use setTimeout to prevent UI blocking for large texts
    setTimeout(() => {
      try {
        // Get all words, lowercase for comparison
        const words = text.toLowerCase().match(/\b[a-z']+\b/g) || []

        // Unique words
        const uniqueWordsSet = new Set(words)
        setUniqueWords(uniqueWordsSet.size)

        // Longest word
        const sortedByLength = [...words].sort((a, b) => b.length - a.length)
        setLongestWord(sortedByLength[0] || "")

        // Word frequency
        const wordFrequency: Record<string, number> = {}
        words.forEach((word) => {
          if (word.length > 2) {
            // Ignore very short words
            wordFrequency[word] = (wordFrequency[word] || 0) + 1
          }
        })

        // Most frequent word
        let maxCount = 0
        let maxWord = ""
        Object.entries(wordFrequency).forEach(([word, count]) => {
          if (count > maxCount) {
            maxCount = count
            maxWord = word
          }
        })
        setMostFrequentWord({ word: maxWord, count: maxCount })

        // Keyword density (top 5)
        const keywordDensityArray = Object.entries(wordFrequency)
          .filter(([word]) => word.length > 3) // Filter out short words
          .map(([word, count]) => ({
            word,
            count,
            percentage: (count / words.length) * 100,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)

        setKeywordDensity(keywordDensityArray)
      } catch (error) {
        console.error("Error analyzing text:", error)
        toast.error("Error analyzing text")
      } finally {
        setIsAnalyzing(false)
      }
    }, 10)
  }, [text])

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
    if (!text.trim()) {
      toast.error("No text to copy")
      return
    }
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard")
  }, [text])

  const handleDownload = useCallback(() => {
    if (!text.trim()) {
      toast.error("No text to download")
      return
    }
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
    toast.success("Text cleared")
  }, [])

  const handleShuffleWords = useCallback(() => {
    if (!text.trim()) {
      toast.error("No text to shuffle")
      return
    }
    const words = text.split(/\s+/)
    const shuffledText = words.sort(() => Math.random() - 0.5).join(" ")
    setText(shuffledText)
    toast.success("Text shuffled")
  }, [text])

  // Text transformation functions
  const transformText = useCallback(
    (transformFn: (text: string) => string) => {
      if (!text.trim()) {
        toast.error("No text to transform")
        return
      }
      setText(transformFn(text))
      toast.success("Text transformed")
    },
    [text],
  )

  const handleUppercase = useCallback(() => {
    transformText((text) => text.toUpperCase())
  }, [transformText])

  const handleLowercase = useCallback(() => {
    transformText((text) => text.toLowerCase())
  }, [transformText])

  const handleCapitalize = useCallback(() => {
    transformText((text) => {
      return text.replace(/\b\w/g, (char) => char.toUpperCase())
    })
  }, [transformText])

  const handleRemoveExtraSpaces = useCallback(() => {
    transformText((text) => {
      return text
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/^\s+|\s+$/g, "") // Trim start and end
    })
  }, [transformText])

  const handleRemoveLineBreaks = useCallback(() => {
    transformText((text) => {
      return text.replace(/\n+/g, " ")
    })
  }, [transformText])

  const handleTrimLines = useCallback(() => {
    transformText((text) => {
      return text
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
    })
  }, [transformText])

  const handleGenerateStats = useCallback(() => {
    if (!text.trim()) {
      toast.error("No text to analyze")
      return
    }

    const stats = {
      words: wordCount,
      characters: charCount,
      charactersNoSpaces: text.replace(/\s+/g, "").length,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      readingTime: readingTime,
      uniqueWords: uniqueWords,
      longestWord: longestWord,
      mostFrequentWord: mostFrequentWord.word,
      keywordDensity: keywordDensity.map((k) => `${k.word}: ${k.percentage.toFixed(1)}%`).join(", "),
    }

    const statsText = Object.entries(stats)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: ${value}`)
      .join("\n")

    const blob = new Blob([statsText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "text_statistics.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Statistics downloaded")
  }, [
    text,
    wordCount,
    charCount,
    sentenceCount,
    paragraphCount,
    readingTime,
    uniqueWords,
    longestWord,
    mostFrequentWord,
    keywordDensity,
  ])

  // Update counts when text or includeSpaces changes
  useEffect(() => {
    updateBasicCounts()
  }, [text, includeSpaces, updateBasicCounts])

  // Update advanced stats when tab changes or when requested
  useEffect(() => {
    if (activeTab === "advanced" || showAdvancedStats) {
      updateAdvancedStats()
    }
  }, [activeTab, showAdvancedStats, updateAdvancedStats])

  return (
    <ToolLayout
      title="Words Counter"
      description="Count words, analyze text statistics, and transform your content with powerful text tools"
      toolId="678f382826f06f912191bc7f"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Text Input Panel */}
        <Card className="lg:col-span-8 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-0">
            <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center">
              <FileText size={20} className="mr-2" /> Text Input
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <Chip color="primary" variant="flat" size="sm" startContent={<Type size={14} />}>
                {wordCount} words
              </Chip>
              <Chip color="secondary" variant="flat" size="sm" startContent={<Hash size={14} />}>
                {charCount} chars
              </Chip>
              <Chip color="success" variant="flat" size="sm" startContent={<Clock size={14} />}>
                ~{readingTime} min read
              </Chip>
            </div>
          </CardHeader>
          <CardBody className="py-3">
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter or paste your text here to analyze..."
              minRows={12}
              maxRows={20}
              className="w-full"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <Switch
                  size="sm"
                  isSelected={includeSpaces}
                  onValueChange={setIncludeSpaces}
                  classNames={{
                    label: "text-xs",
                  }}
                >
                  Include spaces in character count
                </Switch>
              </div>
              <div className="text-xs text-default-500">
                {text.length}/{MAX_CHARS} characters
              </div>
            </div>
            <Progress
              value={(text.length / MAX_CHARS) * 100}
              color={text.length > MAX_CHARS * 0.9 ? "danger" : "primary"}
              size="sm"
              className="mt-2"
            />
          </CardBody>
          <CardFooter className="flex flex-wrap gap-2 justify-start pt-0">
            <Button
              color="primary"
              variant="flat"
              onPress={handleCopy}
              startContent={<Copy size={16} />}
              isDisabled={!text.trim()}
              size="sm"
            >
              Copy
            </Button>
            <Button
              color="primary"
              variant="flat"
              onPress={handleDownload}
              startContent={<Download size={16} />}
              isDisabled={!text.trim()}
              size="sm"
            >
              Download
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={handleClear}
              startContent={<Trash2 size={16} />}
              isDisabled={!text.trim()}
              size="sm"
            >
              Clear
            </Button>
            <Button
              color="secondary"
              variant="flat"
              onPress={handleGenerateStats}
              startContent={<BarChart3 size={16} />}
              isDisabled={!text.trim()}
              size="sm"
            >
              Export Stats
            </Button>
          </CardFooter>
        </Card>

        {/* Stats and Tools Panel */}
        <Card className="lg:col-span-4 bg-default-50 dark:bg-default-100">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key: React.Key) => setActiveTab(key as string)}
              color="primary"
              size="sm"
              classNames={{
                tab: "h-8",
              }}
            >
              <Tab
                key="basic"
                title={
                  <div className="flex items-center gap-1">
                    <BarChart3 size={14} />
                    <span>Statistics</span>
                  </div>
                }
              />
              <Tab
                key="advanced"
                title={
                  <div className="flex items-center gap-1">
                    <Sparkles size={14} />
                    <span>Analysis</span>
                  </div>
                }
              />
              <Tab
                key="tools"
                title={
                  <div className="flex items-center gap-1">
                    <Braces size={14} />
                    <span>Tools</span>
                  </div>
                }
              />
            </Tabs>
          </CardHeader>
          <CardBody className="py-3 px-4">
            {activeTab === "basic" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Text Statistics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <div className="text-xs text-default-500 mb-1 flex items-center">
                      <Type size={12} className="mr-1" /> Words
                    </div>
                    <div className="text-xl font-semibold">{wordCount}</div>
                  </div>
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <div className="text-xs text-default-500 mb-1 flex items-center">
                      <Hash size={12} className="mr-1" /> Characters
                    </div>
                    <div className="text-xl font-semibold">{charCount}</div>
                  </div>
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <div className="text-xs text-default-500 mb-1 flex items-center">
                      <AlignLeft size={12} className="mr-1" /> Sentences
                    </div>
                    <div className="text-xl font-semibold">{sentenceCount}</div>
                  </div>
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <div className="text-xs text-default-500 mb-1 flex items-center">
                      <Paragraph size={12} className="mr-1" /> Paragraphs
                    </div>
                    <div className="text-xl font-semibold">{paragraphCount}</div>
                  </div>
                </div>

                <div className="bg-default-100/50 p-3 rounded-lg">
                  <div className="text-xs text-default-500 mb-1 flex items-center">
                    <Timer size={12} className="mr-1" /> Estimated Reading Time
                  </div>
                  <div className="text-xl font-semibold">
                    {readingTime} minute{readingTime !== 1 ? "s" : ""}
                  </div>
                  <div className="text-xs text-default-400 mt-1">Based on 200 words per minute</div>
                </div>

                <div className="flex justify-center mt-2">
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() => setShowAdvancedStats(true)}
                    startContent={<Sparkles size={14} />}
                    size="sm"
                    isDisabled={!text.trim()}
                  >
                    Show Advanced Analysis
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Advanced Analysis</h3>

                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Progress
                      size="sm"
                      isIndeterminate
                      aria-label="Analyzing text..."
                      className="max-w-md"
                      color="secondary"
                    />
                    <p className="text-sm text-default-500 mt-2">Analyzing text...</p>
                  </div>
                ) : !text.trim() ? (
                  <div className="text-center py-8 text-default-400">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Enter some text to analyze</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-default-100/50 p-3 rounded-lg">
                      <div className="text-xs text-default-500 mb-1">Unique Words</div>
                      <div className="text-xl font-semibold">{uniqueWords}</div>
                      <div className="text-xs text-default-400 mt-1">
                        {wordCount > 0 ? `${Math.round((uniqueWords / wordCount) * 100)}% of total words` : ""}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Longest Word</div>
                        <div className="text-md font-medium truncate">{longestWord || "N/A"}</div>
                        <div className="text-xs text-default-400 mt-1">
                          {longestWord ? `${longestWord.length} characters` : ""}
                        </div>
                      </div>

                      <div className="bg-default-100/50 p-3 rounded-lg">
                        <div className="text-xs text-default-500 mb-1">Most Frequent</div>
                        <div className="text-md font-medium truncate">{mostFrequentWord.word || "N/A"}</div>
                        <div className="text-xs text-default-400 mt-1">
                          {mostFrequentWord.count ? `${mostFrequentWord.count} occurrences` : ""}
                        </div>
                      </div>
                    </div>

                    <div className="bg-default-100/50 p-3 rounded-lg">
                      <div className="text-xs text-default-500 mb-1">Keyword Density (Top 5)</div>
                      {keywordDensity.length > 0 ? (
                        <div className="space-y-2 mt-2">
                          {keywordDensity.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="text-sm truncate max-w-[150px]">{item.word}</div>
                              <div className="flex items-center">
                                <div className="text-xs text-default-400 mr-2">{item.count}x</div>
                                <Chip size="sm" color="primary" variant="flat">
                                  {item.percentage.toFixed(1)}%
                                </Chip>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-default-400 py-2">No keywords detected</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "tools" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Text Transformation</h3>

                <div className="grid grid-cols-2 gap-2">
                  <Tooltip content="Convert text to UPPERCASE">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleUppercase}
                      startContent={<Uppercase size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Uppercase
                    </Button>
                  </Tooltip>

                  <Tooltip content="Convert text to lowercase">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleLowercase}
                      startContent={<Lowercase size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Lowercase
                    </Button>
                  </Tooltip>

                  <Tooltip content="Capitalize First Letter Of Each Word">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleCapitalize}
                      startContent={<CaseSensitive size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Capitalize
                    </Button>
                  </Tooltip>

                  <Tooltip content="Remove extra spaces between words">
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleRemoveExtraSpaces}
                      startContent={<Eraser size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Fix Spaces
                    </Button>
                  </Tooltip>
                </div>

                <Divider className="my-2" />

                <h3 className="text-md font-semibold text-default-700">Text Manipulation</h3>

                <div className="grid grid-cols-2 gap-2">
                  <Tooltip content="Shuffle words randomly">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleShuffleWords}
                      startContent={<Shuffle size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Shuffle
                    </Button>
                  </Tooltip>

                  <Tooltip content="Remove all line breaks">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleRemoveLineBreaks}
                      startContent={<AlignLeft size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      No Breaks
                    </Button>
                  </Tooltip>

                  <Tooltip content="Trim whitespace from start/end of each line">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleTrimLines}
                      startContent={<RotateCcw size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Trim Lines
                    </Button>
                  </Tooltip>

                  <Tooltip content="Reset all changes">
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={handleClear}
                      startContent={<RefreshCw size={16} />}
                      isDisabled={!text.trim()}
                      size="sm"
                      className="w-full"
                    >
                      Reset All
                    </Button>
                  </Tooltip>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Info Section */}
      <InfoSection />
    </ToolLayout>
  )
}
