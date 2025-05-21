"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Textarea,
  Tabs,
  Tab,
  Chip,
  Progress,
  Switch,
  Select,
  SelectItem,
  Checkbox,
  Input,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react"
import {
  Copy,
  Download,
  FileText,
  Trash2,
  Settings2,
  BarChart,
  Type,
  Hash,
  Filter,
  SortAsc,
  SortDesc,
  Percent,
  BarChart3,
  BarChart4,
  AlignLeft,
  Layers,
  Calculator,
  Zap,
  Braces,
  Maximize2,
  Minimize2,
  ArrowDownUp,
  FileJson,
  Share2,
  Palette,
  ListFilter,
  Wand2,
  Clock,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./InfoSection"

const MAX_CHARS = 10000 // Character limit

// Count mode options
const countModeOptions = [
  { value: "character", label: "Character Frequency", icon: <Type className="w-4 h-4" /> },
  { value: "word", label: "Word Frequency", icon: <AlignLeft className="w-4 h-4" /> },
  { value: "bigram", label: "Bigram Frequency", icon: <Layers className="w-4 h-4" /> },
  { value: "trigram", label: "Trigram Frequency", icon: <Braces className="w-4 h-4" /> },
]

// Sort order options
const sortOrderOptions = [
  { value: "descending", label: "Most Frequent First", icon: <SortDesc className="w-4 h-4" /> },
  { value: "ascending", label: "Least Frequent First", icon: <SortAsc className="w-4 h-4" /> },
  { value: "alphabetical", label: "Alphabetical", icon: <ArrowDownUp className="w-4 h-4" /> },
]

// Display mode options
const displayModeOptions = [
  { value: "count", label: "Count", icon: <Hash className="w-4 h-4" /> },
  { value: "percent", label: "Percentage", icon: <Percent className="w-4 h-4" /> },
  { value: "both", label: "Both", icon: <BarChart className="w-4 h-4" /> },
]

// Character categories for filtering

export default function CharacterFrequencyCounter() {
  // Basic state
  const [inputText, setInputText] = useState("")
  const [activeTab, setActiveTab] = useState("analyze")
  const [isProcessing, setIsProcessing] = useState(false)

  // Frequency results
  const [charFrequency, setCharFrequency] = useState<Record<string, number>>({})
  const [wordFrequency, setWordFrequency] = useState<Record<string, number>>({})
  const [bigramFrequency, setBigramFrequency] = useState<Record<string, number>>({})
  const [trigramFrequency, setTrigramFrequency] = useState<Record<string, number>>({})

  // Analysis options
  const [mode, setMode] = useState("character")
  const [sortOrder, setSortOrder] = useState("descending")
  const [displayMode, setDisplayMode] = useState("count")
  const [minFrequency, setMinFrequency] = useState(1)
  const [maxResults, setMaxResults] = useState(100)

  // Filter options
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [excludeSpaces, setExcludeSpaces] = useState(false)
  const [excludePunctuation, setExcludePunctuation] = useState(false)
  const [excludeNumbers, setExcludeNumbers] = useState(false)
  const [filterPattern, setFilterPattern] = useState("")

  // Visualization options
  const [showPercentage, setShowPercentage] = useState(true)
  const [showBars, setShowBars] = useState(true)
  const [colorMode, setColorMode] = useState("gradient")

  // Text statistics
  const [textStats, setTextStats] = useState({
    totalChars: 0,
    charsNoSpaces: 0,
    words: 0,
    uniqueWords: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    avgWordLength: 0,
    readingTime: 0,
    mostFrequent: { item: "", count: 0 },
    leastFrequent: { item: "", count: 0 },
  })

  // Load saved data on component mount
  useEffect(() => {
    const savedInputText = localStorage.getItem("frequencyCounterInputText")
    const savedMode = localStorage.getItem("frequencyCounterMode")
    const savedSortOrder = localStorage.getItem("frequencyCounterSortOrder")
    const savedCaseSensitive = localStorage.getItem("frequencyCounterCaseSensitive")

    if (savedInputText) setInputText(savedInputText)
    if (savedMode) setMode(savedMode)
    if (savedSortOrder) setSortOrder(savedSortOrder)
    if (savedCaseSensitive) setCaseSensitive(savedCaseSensitive === "true")
  }, [])

  // Save data when it changes
  useEffect(() => {
    if (inputText) localStorage.setItem("frequencyCounterInputText", inputText)
    localStorage.setItem("frequencyCounterMode", mode)
    localStorage.setItem("frequencyCounterSortOrder", sortOrder)
    localStorage.setItem("frequencyCounterCaseSensitive", caseSensitive.toString())
  }, [inputText, mode, sortOrder, caseSensitive])

  // Calculate text statistics
  const calculateTextStats = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setTextStats({
          totalChars: 0,
          charsNoSpaces: 0,
          words: 0,
          uniqueWords: 0,
          sentences: 0,
          paragraphs: 0,
          lines: 0,
          avgWordLength: 0,
          readingTime: 0,
          mostFrequent: { item: "", count: 0 },
          leastFrequent: { item: "", count: 0 },
        })
        return
      }

      const totalChars = text.length
      const charsNoSpaces = text.replace(/\s/g, "").length
      const words = text.trim().split(/\s+/).length
      const uniqueWords = new Set(text.toLowerCase().split(/\s+/)).size
      const sentences = text.split(/[.!?]+/).filter(Boolean).length
      const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length
      const lines = text.split("\n").length
      const avgWordLength =
        text
          .trim()
          .split(/\s+/)
          .reduce((sum, word) => sum + word.length, 0) / words || 0
      const readingTime = Math.ceil(words / 200) // Assuming 200 words per minute

      // Calculate most and least frequent items based on current mode
      let mostFrequent = { item: "", count: 0 }
      let leastFrequent = { item: "", count: Number.MAX_SAFE_INTEGER }

      const frequency = mode === "character" ? charFrequency : mode === "word" ? wordFrequency : {}

      Object.entries(frequency).forEach(([item, count]) => {
        if (count > mostFrequent.count) {
          mostFrequent = { item, count }
        }
        if (count < leastFrequent.count && count > 0) {
          leastFrequent = { item, count }
        }
      })

      // If no items found, reset least frequent
      if (leastFrequent.count === Number.MAX_SAFE_INTEGER) {
        leastFrequent = { item: "", count: 0 }
      }

      setTextStats({
        totalChars,
        charsNoSpaces,
        words,
        uniqueWords,
        sentences,
        paragraphs,
        lines,
        avgWordLength,
        readingTime,
        mostFrequent,
        leastFrequent,
      })
    },
    [charFrequency, wordFrequency, mode],
  )

  // Calculate frequency based on current options
  const calculateFrequency = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to analyze")
      return
    }

    setIsProcessing(true)

    // Use setTimeout to prevent UI blocking for large texts
    setTimeout(() => {
      try {
        // Prepare text based on case sensitivity
        const text = caseSensitive ? inputText : inputText.toLowerCase()

        // Character frequency analysis
        if (mode === "character") {
          const charFreq: Record<string, number> = {}

          for (const char of text) {
            // Apply filters
            if (excludeSpaces && /\s/.test(char)) continue
            if (excludePunctuation && /[^\w\s]/.test(char)) continue
            if (excludeNumbers && /\d/.test(char)) continue
            if (filterPattern && !new RegExp(filterPattern, "u").test(char)) continue

            charFreq[char] = (charFreq[char] || 0) + 1
          }

          setCharFrequency(charFreq)
        }
        // Word frequency analysis
        else if (mode === "word") {
          const wordFreq: Record<string, number> = {}
          const words = text.split(/\s+/)

          for (const word of words) {
            // Apply filters
            let cleanWord = word
            if (excludePunctuation) cleanWord = word.replace(/[^\w\s]/g, "")
            if (excludeNumbers) cleanWord = cleanWord.replace(/\d/g, "")
            if (filterPattern && !new RegExp(filterPattern, "u").test(cleanWord)) continue
            if (!cleanWord) continue

            wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1
          }

          setWordFrequency(wordFreq)
        }
        // Bigram frequency analysis
        else if (mode === "bigram") {
          const bigramFreq: Record<string, number> = {}
          const words = text.split(/\s+/)

          for (let i = 0; i < words.length - 1; i++) {
            // Apply filters
            let word1 = words[i]
            let word2 = words[i + 1]

            if (excludePunctuation) {
              word1 = word1.replace(/[^\w\s]/g, "")
              word2 = word2.replace(/[^\w\s]/g, "")
            }
            if (excludeNumbers) {
              word1 = word1.replace(/\d/g, "")
              word2 = word2.replace(/\d/g, "")
            }
            if (!word1 || !word2) continue

            const bigram = `${word1} ${word2}`
            if (filterPattern && !new RegExp(filterPattern, "u").test(bigram)) continue

            bigramFreq[bigram] = (bigramFreq[bigram] || 0) + 1
          }

          setBigramFrequency(bigramFreq)
        }
        // Trigram frequency analysis
        else if (mode === "trigram") {
          const trigramFreq: Record<string, number> = {}
          const words = text.split(/\s+/)

          for (let i = 0; i < words.length - 2; i++) {
            // Apply filters
            let word1 = words[i]
            let word2 = words[i + 1]
            let word3 = words[i + 2]

            if (excludePunctuation) {
              word1 = word1.replace(/[^\w\s]/g, "")
              word2 = word2.replace(/[^\w\s]/g, "")
              word3 = word3.replace(/[^\w\s]/g, "")
            }
            if (excludeNumbers) {
              word1 = word1.replace(/\d/g, "")
              word2 = word2.replace(/\d/g, "")
              word3 = word3.replace(/\d/g, "")
            }
            if (!word1 || !word2 || !word3) continue

            const trigram = `${word1} ${word2} ${word3}`
            if (filterPattern && !new RegExp(filterPattern, "u").test(trigram)) continue

            trigramFreq[trigram] = (trigramFreq[trigram] || 0) + 1
          }

          setTrigramFrequency(trigramFreq)
        }

        // Calculate text statistics
        calculateTextStats(text)

        toast.success(`${mode.charAt(0).toUpperCase() + mode.slice(1)} frequency calculated!`)
      } catch (error) {
        console.error("Error calculating frequency:", error)
        toast.error("Error calculating frequency")
      } finally {
        setIsProcessing(false)
      }
    }, 10)
  }, [
    inputText,
    mode,
    caseSensitive,
    excludeSpaces,
    excludePunctuation,
    excludeNumbers,
    filterPattern,
    calculateTextStats,
  ])

  // Get frequency results based on current mode and options
  const getFrequencyResults = useCallback(() => {
    let frequency: Record<string, number> = {}

    switch (mode) {
      case "character":
        frequency = charFrequency
        break
      case "word":
        frequency = wordFrequency
        break
      case "bigram":
        frequency = bigramFrequency
        break
      case "trigram":
        frequency = trigramFrequency
        break
      default:
        frequency = charFrequency
    }

    // Filter by minimum frequency
    let filteredEntries = Object.entries(frequency).filter(([, value]) => value >= minFrequency)

    // Sort entries based on sort order
    switch (sortOrder) {
      case "descending":
        filteredEntries.sort((a, b) => b[1] - a[1])
        break
      case "ascending":
        filteredEntries.sort((a, b) => a[1] - b[1])
        break
      case "alphabetical":
        filteredEntries.sort((a, b) => a[0].localeCompare(b[0]))
        break
      default:
        filteredEntries.sort((a, b) => b[1] - a[1])
    }

    // Limit results if maxResults is set
    if (maxResults > 0) {
      filteredEntries = filteredEntries.slice(0, maxResults)
    }

    return filteredEntries
  }, [mode, charFrequency, wordFrequency, bigramFrequency, trigramFrequency, minFrequency, sortOrder, maxResults])

  // Format frequency results as text
  const frequencyResultsText = useCallback(() => {
    const entries = getFrequencyResults()
    const total = entries.reduce((sum, [, count]) => sum + count, 0) || 1

    return entries
      .map(([key, value]) => {
        if (displayMode === "count") {
          return `${key}: ${value}`
        } else if (displayMode === "percent") {
          return `${key}: ${((value / total) * 100).toFixed(2)}%`
        } else {
          return `${key}: ${value} (${((value / total) * 100).toFixed(2)}%)`
        }
      })
      .join("\n")
  }, [getFrequencyResults, displayMode])

  // Handle copy to clipboard
  const handleCopy = useCallback(() => {
    const text = frequencyResultsText()
    if (!text) {
      toast.error("No results to copy")
      return
    }
    navigator.clipboard.writeText(text)
    toast.success(`${mode.charAt(0).toUpperCase() + mode.slice(1)} frequency copied to clipboard`)
  }, [frequencyResultsText, mode])

  // Handle download as text file
  const handleDownload = useCallback(() => {
    const text = frequencyResultsText()
    if (!text) {
      toast.error("No results to download")
      return
    }
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
  }, [frequencyResultsText, mode])

  // Handle download as JSON
  const handleDownloadJSON = useCallback(() => {
    const frequency = getFrequencyResults()
    if (frequency.length === 0) {
      toast.error("No results to download")
      return
    }

    const jsonData = {
      mode,
      options: {
        caseSensitive,
        excludeSpaces,
        excludePunctuation,
        excludeNumbers,
        filterPattern,
        sortOrder,
        minFrequency,
      },
      statistics: textStats,
      results: Object.fromEntries(frequency),
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${mode}_frequency_analysis.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Analysis data downloaded as JSON`)
  }, [
    getFrequencyResults,
    mode,
    caseSensitive,
    excludeSpaces,
    excludePunctuation,
    excludeNumbers,
    filterPattern,
    sortOrder,
    minFrequency,
    textStats,
  ])

  // Handle clear all
  const handleClear = useCallback(() => {
    setInputText("")
    setCharFrequency({})
    setWordFrequency({})
    setBigramFrequency({})
    setTrigramFrequency({})
    setTextStats({
      totalChars: 0,
      charsNoSpaces: 0,
      words: 0,
      uniqueWords: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      avgWordLength: 0,
      readingTime: 0,
      mostFrequent: { item: "", count: 0 },
      leastFrequent: { item: "", count: 0 },
    })
    toast.success("Input and results cleared")
  }, [])

  // Handle share results
  const handleShare = useCallback(() => {
    const shareText = `Text Analysis Results:
Mode: ${mode}
Total Characters: ${textStats.totalChars}
Words: ${textStats.words}
Unique Words: ${textStats.uniqueWords}
Most Frequent ${mode}: ${textStats.mostFrequent.item} (${textStats.mostFrequent.count} times)
`

    if (navigator.share) {
      navigator
        .share({
          title: "Text Frequency Analysis Results",
          text: shareText,
        })
        .catch((error) => {
          console.error("Error sharing:", error)
          navigator.clipboard.writeText(shareText)
          toast.success("Results copied to clipboard for sharing")
        })
    } else {
      navigator.clipboard.writeText(shareText)
      toast.success("Results copied to clipboard for sharing")
    }
  }, [mode, textStats])



  // Calculate the maximum frequency for visualization
  const maxFrequency = useCallback(() => {
    const entries = getFrequencyResults();
    return entries.length ? entries[0][1] : 0;
  }, [getFrequencyResults]);

  // Add this function before the renderFrequencyTable callback
  const getProgressColor = useCallback((value: number, max: number): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
    const percentage = (value / max) * 100;

    if (colorMode === "gradient") {
      if (percentage >= 80) return "danger";    // Red for highest
      if (percentage >= 60) return "warning";   // Orange for high
      if (percentage >= 40) return "primary";   // Blue for medium
      if (percentage >= 20) return "secondary"; // Purple for low
      return "success";                         // Green for lowest
    } else {
      // Single color mode - use primary
      return "primary";
    }
  }, [colorMode]);

  // Updated renderFrequencyTable without getProgressColor in dependencies
  const renderFrequencyTable = useCallback(() => {
    const entries = getFrequencyResults();
    const total = entries.reduce((sum, [, c]) => sum + c, 0) || 1;
    const max = maxFrequency();

    // Build column configuration
    const columns = [
      { key: "label", name: mode.charAt(0).toUpperCase() + mode.slice(1) },
      { key: "count", name: "Count" },
      ...(showPercentage ? [{ key: "percent", name: "Percentage" }] : []),
      ...(showBars ? [{ key: "bars", name: "Distribution" }] : []),
    ];

    /* ---------- render ---------- */
    return (
      <Table aria-label="Frequency results" className="mt-4 overflow-y-auto">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {entries.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                {key === ' ' ? (
                  <span className="text-default-400">[Space]</span>
                ) : (
                  key
                )}
              </TableCell>
              <TableCell>{value}</TableCell>
              {/* Always render the percentage cell */}
              <TableCell>
                {showPercentage ? `${((value / total) * 100).toFixed(2)}%` : ""}
              </TableCell>
              {/* Always render the bars cell */}
              <TableCell>
                {showBars ? (
                  <Progress
                    value={(value / max) * 100}
                    color={getProgressColor(value, max)}
                    size="sm"
                    className="max-w-md"
                  />
                ) : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }, [getFrequencyResults, mode, showPercentage, showBars, maxFrequency, getProgressColor]);



  // Auto-calculate on input change
  useEffect(() => {
    // Clear frequency results when input changes
    setCharFrequency({})
    setWordFrequency({})
    setBigramFrequency({})
    setTrigramFrequency({})
  }, [inputText])

  return (
    <ToolLayout
      title="Character Frequency Analyzer"
      description="Analyze the frequency of characters, words, and phrases in your text with advanced filtering and visualization options."
      toolId="678f382926f06f912191bc83"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-6 bg-default-50 dark:bg-default-100">
          <CardHeader className="pb-0">
            {/* row on sm+, column on mobile */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
              {/* heading */}
              <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center">
                <FileText size={20} className="mr-2" />
                Input&nbsp;Text
              </h2>

              {/* chips: row on sm+, stack on mobile */}
              <div className="mt-2 sm:mt-0 flex flex-col xs:flex-row sm:flex-row items-start xs:items-center gap-2">
                <Chip
                  color="primary"
                  variant="flat"
                  size="sm"
                  startContent={<Hash size={14} />}
                >
                  {textStats.totalChars} chars
                </Chip>

                <Chip
                  color="secondary"
                  variant="flat"
                  size="sm"
                  startContent={<Type size={14} />}
                >
                  {textStats.words} words
                </Chip>
              </div>
            </div>
          </CardHeader>

          <CardBody className="py-3">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter or paste your text here to analyze frequency..."
              minRows={12}
              maxRows={20}
              className="w-full"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-default-100/50",
              }}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-default-500">
                {inputText.length}/{MAX_CHARS} characters
              </div>
              <Button
                color="danger"
                variant="light"
                onPress={handleClear}
                startContent={<Trash2 size={14} />}
                size="sm"
                isDisabled={!inputText.trim()}
              >
                Clear
              </Button>
            </div>
            <Progress
              value={(inputText.length / MAX_CHARS) * 100}
              color={inputText.length > MAX_CHARS * 0.9 ? "danger" : "primary"}
              size="sm"
              className="mt-2"
            />
          </CardBody>
        </Card>

        {/* Statistics Panel */}
        <Card className="lg:col-span-6 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex justify-between items-center pb-0">
            <h2 className="text-xl font-semibold text-success-600 dark:text-success-400 flex items-center">
              <BarChart size={20} className="mr-2" /> Text Statistics
            </h2>
            <div className="flex items-center gap-2">
              {textStats.mostFrequent.item && (
                <Chip color="success" variant="flat" size="sm">
                  Most frequent: {textStats.mostFrequent.item === " " ? "[Space]" : textStats.mostFrequent.item}
                </Chip>
              )}
            </div>
          </CardHeader>
          <CardBody className="py-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-default-200/50 p-3 rounded-lg">
                <div className="text-xs text-default-500 mb-1 flex items-center">
                  <Hash size={12} className="mr-1" /> Characters
                </div>
                <div className="text-lg font-semibold">{textStats.totalChars}</div>
                <div className="text-xs text-default-400">{textStats.charsNoSpaces} without spaces</div>
              </div>

              <div className="bg-default-200/50 p-3 rounded-lg">
                <div className="text-xs text-default-500 mb-1 flex items-center">
                  <Type size={12} className="mr-1" /> Words
                </div>
                <div className="text-lg font-semibold">{textStats.words}</div>
                <div className="text-xs text-default-400">{textStats.uniqueWords} unique</div>
              </div>

              <div className="bg-default-200/50 p-3 rounded-lg">
                <div className="text-xs text-default-500 mb-1 flex items-center">
                  <AlignLeft size={12} className="mr-1" /> Sentences
                </div>
                <div className="text-lg font-semibold">{textStats.sentences}</div>
                <div className="text-xs text-default-400">{textStats.paragraphs} paragraphs</div>
              </div>

              <div className="bg-default-200/50 p-3 rounded-lg">
                <div className="text-xs text-default-500 mb-1 flex items-center">
                  <Calculator size={12} className="mr-1" /> Avg Word Length
                </div>
                <div className="text-lg font-semibold">{textStats.avgWordLength.toFixed(2)}</div>
                <div className="text-xs text-default-400">characters per word</div>
              </div>

              <div className="bg-default-200/50 p-3 rounded-lg">
                <div className="text-xs text-default-500 mb-1 flex items-center">
                  <Clock size={12} className="mr-1" /> Reading Time
                </div>
                <div className="text-lg font-semibold">{textStats.readingTime} min</div>
                <div className="text-xs text-default-400">at 200 words/min</div>
              </div>

              <div className="bg-default-200/50 p-3 rounded-lg">
                <div className="text-xs text-default-500 mb-1 flex items-center">
                  <Layers size={12} className="mr-1" /> Lines
                </div>
                <div className="text-lg font-semibold">{textStats.lines}</div>
                <div className="text-xs text-default-400">
                  {textStats.lines > 0 ? (textStats.words / textStats.lines).toFixed(2) : "0"} words/line
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {textStats.mostFrequent.item && (
                <div className="bg-default-200/50 p-3 rounded-lg">
                  <div className="text-xs text-default-500 mb-1 flex items-center">
                    <Maximize2 size={12} className="mr-1" /> Most Frequent {mode}
                  </div>
                  <div className="text-lg font-semibold">
                    {textStats.mostFrequent.item === " " ? "[Space]" : textStats.mostFrequent.item}
                  </div>
                  <div className="text-xs text-default-400">{textStats.mostFrequent.count} occurrences</div>
                </div>
              )}

              {textStats.leastFrequent.item && (
                <div className="bg-default-200/50 p-3 rounded-lg">
                  <div className="text-xs text-default-500 mb-1 flex items-center">
                    <Minimize2 size={12} className="mr-1" /> Least Frequent {mode}
                  </div>
                  <div className="text-lg font-semibold">
                    {textStats.leastFrequent.item === " " ? "[Space]" : textStats.leastFrequent.item}
                  </div>
                  <div className="text-xs text-default-400">{textStats.leastFrequent.count} occurrences</div>
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter className="flex flex-wrap gap-2 justify-start pt-0">
            <Button
              color="primary"
              variant="flat"
              onPress={calculateFrequency}
              startContent={<BarChart size={16} />}
              isDisabled={!inputText.trim() || isProcessing}
              isLoading={isProcessing}
              size="sm"
            >
              {isProcessing ? "Analyzing..." : "Analyze Frequency"}
            </Button>
            <Button
              color="secondary"
              variant="flat"
              onPress={handleShare}
              startContent={<Share2 size={16} />}
              isDisabled={!inputText.trim()}
              size="sm"
            >
              Share Results
            </Button>
          </CardFooter>
        </Card>

        {/* Options Panel */}
        <Card className="lg:col-span-12 bg-default-50 dark:bg-default-100">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key: React.Key) => setActiveTab(String(key))}
              color="primary"
              size="sm"
              variant="underlined"
              className="w-full"
              classNames={{
                tab: "h-8 px-2 sm:px-3",             // tighter padding, same height
                tabList: "w-full justify-start sm:justify-center",
                tabContent: "text-xs sm:text-sm",    // smaller text on mobile
              }}
            >
              <Tab
                key="analyze"
                title={
                  <div className="flex items-center gap-1">
                    <BarChart size={14} />
                    <span className="hidden sm:inline">Frequency&nbsp;Analysis</span>
                    <span className="sm:hidden">Analyze</span>
                  </div>
                }
              />
              <Tab
                key="options"
                title={
                  <div className="flex items-center gap-1">
                    <Settings2 size={14} />
                    <span className="hidden sm:inline">Analysis&nbsp;Options</span>
                    <span className="sm:hidden">Options</span>
                  </div>
                }
              />
              <Tab
                key="filters"
                title={
                  <div className="flex items-center gap-1">
                    <Filter size={14} />
                    <span className="hidden sm:inline">Filters</span>
                    <span className="sm:hidden">Filter</span>
                  </div>
                }
              />
              <Tab
                key="visualization"
                title={
                  <div className="flex items-center gap-1">
                    <BarChart3 size={14} />
                    <span className="hidden sm:inline">Visualization</span>
                    <span className="sm:hidden">Vizual</span>
                  </div>
                }
              />
              <Tab
                key="export"
                title={
                  <div className="flex items-center gap-1">
                    <Download size={14} />
                    <span className="hidden sm:inline">Export</span>
                    <span className="sm:hidden">Export</span>
                  </div>
                }
              />
            </Tabs>

          </CardHeader>
          <CardBody className="py-3 px-4">
            {activeTab === "analyze" && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <Select
                      label="Count Mode"
                      selectedKeys={[mode]}
                      onChange={(e) => setMode(e.target.value)}
                      variant="bordered"
                      startContent={
                        countModeOptions.find((option) => option.value === mode)?.icon || <Type className="w-4 h-4" />
                      }
                    >
                      {countModeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className="text-default-700"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select
                      label="Sort Order"
                      selectedKeys={[sortOrder]}
                      onChange={(e) => setSortOrder(e.target.value)}
                      variant="bordered"
                      startContent={
                        sortOrderOptions.find((option) => option.value === sortOrder)?.icon || (
                          <SortDesc className="w-4 h-4" />
                        )
                      }
                    >
                      {sortOrderOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className="text-default-700"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select
                      label="Display Mode"
                      selectedKeys={[displayMode]}
                      onChange={(e) => setDisplayMode(e.target.value)}
                      variant="bordered"
                      startContent={
                        displayModeOptions.find((option) => option.value === displayMode)?.icon || (
                          <Hash className="w-4 h-4 " />
                        )
                      }
                    >
                      {displayModeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className="text-default-700"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {renderFrequencyTable()}

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={calculateFrequency}
                    startContent={isProcessing ? null : <Zap size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim()}
                  >
                    {isProcessing ? "Analyzing..." : "Analyze Frequency"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "options" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Analysis Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-200/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Basic Options</h4>
                    <div className="space-y-2">
                      <Checkbox isSelected={caseSensitive} onValueChange={setCaseSensitive}>
                        Case Sensitive Analysis
                      </Checkbox>
                      <div className="text-xs text-default-500 ml-6">
                        When enabled, "A" and "a" are counted as different characters
                      </div>

                      <Divider className="my-2" />

                      <div className="flex flex-col gap-2">
                        <label className="text-sm">Minimum Frequency Threshold</label>
                        <Input
                          type="number"
                          value={minFrequency.toString()}
                          onValueChange={(val) => setMinFrequency(Math.max(1, Number.parseInt(val) || 1))}
                          min={1}
                          size="sm"
                          startContent={<Filter className="w-4 h-4 text-default-400" />}
                          description="Only show items that appear at least this many times"
                        />
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                        <label className="text-sm">Maximum Results to Show</label>
                        <Input
                          type="number"
                          value={maxResults.toString()}
                          onValueChange={(val) => setMaxResults(Number.parseInt(val) || 0)}
                          min={0}
                          size="sm"
                          startContent={<ListFilter className="w-4 h-4 text-default-400" />}
                          description="Limit number of results (0 for unlimited)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-default-200/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Mode-Specific Options</h4>
                    <div className="space-y-3">
                      {mode === "character" && (
                        <>
                          <div className="text-sm">Character Analysis Options:</div>
                          <Checkbox isSelected={excludeSpaces} onValueChange={setExcludeSpaces}>
                            Exclude Spaces
                          </Checkbox>
                          <Checkbox isSelected={excludePunctuation} onValueChange={setExcludePunctuation}>
                            Exclude Punctuation
                          </Checkbox>
                          <Checkbox isSelected={excludeNumbers} onValueChange={setExcludeNumbers}>
                            Exclude Numbers
                          </Checkbox>
                        </>
                      )}

                      {mode === "word" && (
                        <>
                          <div className="text-sm">Word Analysis Options:</div>
                          <Checkbox isSelected={excludePunctuation} onValueChange={setExcludePunctuation}>
                            Remove Punctuation from Words
                          </Checkbox>
                          <Checkbox isSelected={excludeNumbers} onValueChange={setExcludeNumbers}>
                            Exclude Words with Numbers
                          </Checkbox>
                        </>
                      )}

                      {(mode === "bigram" || mode === "trigram") && (
                        <>
                          <div className="text-sm">{mode === "bigram" ? "Bigram" : "Trigram"} Analysis Options:</div>
                          <Checkbox isSelected={excludePunctuation} onValueChange={setExcludePunctuation}>
                            Remove Punctuation from Words
                          </Checkbox>
                          <Checkbox isSelected={excludeNumbers} onValueChange={setExcludeNumbers}>
                            Exclude Words with Numbers
                          </Checkbox>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={calculateFrequency}
                    startContent={<Settings2 size={18} />}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim() || isProcessing}
                  >
                    Apply Options & Analyze
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "filters" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Advanced Filtering</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-200/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Pattern Filtering</h4>
                    <div className="space-y-2">
                      <Input
                        label="Regular Expression Filter"
                        placeholder="e.g., [a-zA-Z] for letters only"
                        value={filterPattern}
                        onValueChange={setFilterPattern}
                        variant="bordered"
                        size="sm"
                        startContent={<Braces className="w-4 h-4 text-default-400" />}
                        description="Only include items matching this pattern"
                      />

                      <div className="text-xs text-default-500 mt-2">
                        <p>Example patterns:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>[a-zA-Z] - Letters only</li>
                          <li>[0-9] - Numbers only</li>
                          <li>[aeiouAEIOU] - Vowels only</li>
                          <li>^[a-z]{3}$ - 3-letter lowercase words</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-default-200/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Character Categories</h4>
                    <div className="space-y-2">
                      <div className="text-sm">Quick Filters:</div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="flat" color="primary" onPress={() => setFilterPattern("[a-zA-Z]")}>
                          Letters Only
                        </Button>
                        <Button size="sm" variant="flat" color="secondary" onPress={() => setFilterPattern("[0-9]")}>
                          Numbers Only
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          color="success"
                          onPress={() => setFilterPattern("[aeiouAEIOU]")}
                        >
                          Vowels Only
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          color="warning"
                          onPress={() => setFilterPattern("[^a-zA-Z0-9\\s]")}
                        >
                          Symbols Only
                        </Button>
                        <Button size="sm" variant="flat" color="danger" onPress={() => setFilterPattern("")}>
                          Clear Filter
                        </Button>
                      </div>

                      <Divider className="my-2" />

                      <div className="text-sm">Exclusion Options:</div>
                      <div className="space-y-2">
                        <Checkbox isSelected={excludeSpaces} onValueChange={setExcludeSpaces}>
                          Exclude Spaces
                        </Checkbox>
                        <Checkbox isSelected={excludePunctuation} onValueChange={setExcludePunctuation}>
                          Exclude Punctuation
                        </Checkbox>
                        <Checkbox isSelected={excludeNumbers} onValueChange={setExcludeNumbers}>
                          Exclude Numbers
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={calculateFrequency}
                    startContent={<Wand2 size={18} />}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim() || isProcessing}
                  >
                    Apply Filters & Analyze
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "visualization" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Visualization Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-200/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Display Settings</h4>
                    <div className="space-y-3">
                      <Switch isSelected={showPercentage} onValueChange={setShowPercentage}>
                        Show Percentage Column
                      </Switch>
                      <Switch isSelected={showBars} onValueChange={setShowBars}>
                        Show Visual Bars
                      </Switch>

                      <Divider className="my-2" />

                      <div className="flex flex-col gap-2">
                        <label className="text-sm">Color Mode</label>
                        <Select
                          selectedKeys={[colorMode]}
                          onChange={(e) => setColorMode(e.target.value)}
                          size="sm"
                          variant="bordered"
                          startContent={<Palette className="w-4 h-4 text-default-400" />}
                        >
                          <SelectItem key="gradient" value="gradient" className="text-default-700">
                            Frequency Gradient
                          </SelectItem>
                          <SelectItem key="single" value="single" className="text-default-700">
                            Single Color
                          </SelectItem>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-default-200/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Table Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm">Display Mode</label>
                        <Select
                          selectedKeys={[displayMode]}
                          onChange={(e) => setDisplayMode(e.target.value)}
                          size="sm"
                          variant="bordered"
                          startContent={
                            displayModeOptions.find((option) => option.value === displayMode)?.icon || (
                              <Hash className="w-4 h-4" />
                            )
                          }
                        >
                          {displayModeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              startContent={option.icon}
                              className="text-default-700"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                        <label className="text-sm">Sort Order</label>
                        <Select
                          selectedKeys={[sortOrder]}
                          onChange={(e) => setSortOrder(e.target.value)}
                          size="sm"
                          variant="bordered"
                          startContent={
                            sortOrderOptions.find((option) => option.value === sortOrder)?.icon || (
                              <SortDesc className="w-4 h-4" />
                            )
                          }
                        >
                          {sortOrderOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              startContent={option.icon}
                              className="text-default-700"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                        <label className="text-sm">Maximum Results</label>
                        <Input
                          type="number"
                          value={maxResults.toString()}
                          onValueChange={(val) => setMaxResults(Number.parseInt(val) || 0)}
                          min={0}
                          size="sm"
                          startContent={<ListFilter className="w-4 h-4 text-default-400" />}
                          description="Limit number of results (0 for unlimited)"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={calculateFrequency}
                    startContent={<BarChart4 size={18} />}
                    size="md"
                    className="px-8"
                    isDisabled={!inputText.trim() || isProcessing}
                  >
                    Update Visualization
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "export" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Basic Export</h4>
                    <div className="space-y-3">
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleCopy}
                        startContent={<Copy size={16} />}
                        isDisabled={getFrequencyResults().length === 0}
                        className="w-full"
                      >
                        Copy Results to Clipboard
                      </Button>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleDownload}
                        startContent={<Download size={16} />}
                        isDisabled={getFrequencyResults().length === 0}
                        className="w-full"
                      >
                        Download as Text File
                      </Button>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={handleShare}
                        startContent={<Share2 size={16} />}
                        isDisabled={getFrequencyResults().length === 0}
                        className="w-full"
                      >
                        Share Results
                      </Button>
                    </div>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Advanced Export</h4>
                    <div className="space-y-3">
                      <Button
                        color="secondary"
                        variant="flat"
                        onPress={handleDownloadJSON}
                        startContent={<FileJson size={16} />}
                        isDisabled={getFrequencyResults().length === 0}
                        className="w-full"
                      >
                        Download Complete Analysis (JSON)
                      </Button>

                      <div className="text-xs text-default-500 mt-2">
                        <p>The JSON export includes:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>All frequency data</li>
                          <li>Text statistics</li>
                          <li>Analysis configuration</li>
                          <li>Filter settings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-default-100/50 p-3 rounded-lg mt-4">
                  <h4 className="text-sm font-medium text-default-700 mb-2">Export Preview</h4>
                  <Textarea
                    value={frequencyResultsText()}
                    readOnly
                    minRows={6}
                    maxRows={10}
                    placeholder="Results will appear here after analysis..."
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-default-100/50",
                    }}
                  />
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
