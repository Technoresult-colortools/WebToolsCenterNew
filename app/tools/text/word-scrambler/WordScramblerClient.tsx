"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  Button,
  Checkbox,
  Textarea,
  Slider,
  Input,
  Select,
  SelectItem,
  Tooltip,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Progress,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import {
  Copy,
  Download,
  Settings,
  Type,
  History,
  BookIcon,
  Zap,
  ArrowLeftRight,
  Loader2,
  MoreVertical,
  Shuffle,
  Undo2,
  Redo2,
  ChevronDown,
  Wand2,
  Lightbulb,
  RotateCcw,
  Trash2,
} from "lucide-react"
import InfoSection from "./InfoSection"

const MAX_CHARS = 10000

// Different scrambling algorithms
const SCRAMBLE_METHODS = {
  RANDOM: "random",
  REVERSE: "reverse",
  SORTED: "sorted",
  VOWEL_SWAP: "vowelSwap",
} as const

type ScrambleMethod = (typeof SCRAMBLE_METHODS)[keyof typeof SCRAMBLE_METHODS]
type DelimiterType = "space" | "newline" | "sentence"

// Words to preserve from scrambling
const COMMON_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "but",
  "or",
  "as",
  "if",
  "when",
  "than",
  "because",
  "while",
  "where",
  "how",
  "that",
  "this",
  "these",
  "those",
])

interface ScrambleOptions {
  preserveEnds: boolean
  intensity: number
  minWordLength: number
  preserveCommonWords: boolean
  preserveCapitalization: boolean
}

const scrambleWord = (word: string, method: ScrambleMethod, options: ScrambleOptions): string => {
  // Skip punctuation-only strings
  if (/^[^\w]+$/.test(word)) return word

  // Extract punctuation
  const leadingPunct = word.match(/^[^\w]+/) || [""]
  const trailingPunct = word.match(/[^\w]+$/) || [""]

  // Get the actual word without punctuation
  const cleanWord = word.replace(/^[^\w]+/, "").replace(/[^\w]+$/, "")

  // Skip short words or common words if specified
  if (
    cleanWord.length < options.minWordLength ||
    (options.preserveCommonWords && COMMON_WORDS.has(cleanWord.toLowerCase()))
  ) {
    return word
  }

  let scrambled = cleanWord
  const start = options.preserveEnds ? 1 : 0
  const end = options.preserveEnds ? cleanWord.length - 1 : cleanWord.length

  if (start >= end) return word // Word too short to scramble with preserved ends

  // Middle part to scramble
  const middleChars = cleanWord.slice(start, end).split("")

  switch (method) {
    case SCRAMBLE_METHODS.RANDOM:
      const shuffleCount = Math.floor(middleChars.length * options.intensity)
      for (let i = 0; i < shuffleCount; i++) {
        const j = Math.floor(Math.random() * middleChars.length)
        const k = Math.floor(Math.random() * middleChars.length)
        // Fix the destructuring assignment:
        const temp = middleChars[j]
        middleChars[j] = middleChars[k]
        middleChars[k] = temp
      }
      scrambled =
        (options.preserveEnds ? cleanWord[0] : "") +
        middleChars.join("") +
        (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break

    case SCRAMBLE_METHODS.REVERSE:
      scrambled =
        (options.preserveEnds ? cleanWord[0] : "") +
        middleChars.reverse().join("") +
        (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break

    case SCRAMBLE_METHODS.SORTED:
      scrambled =
        (options.preserveEnds ? cleanWord[0] : "") +
        [...middleChars].sort().join("") +
        (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break

    case SCRAMBLE_METHODS.VOWEL_SWAP:
      // Swap vowels with each other, keep consonants
      const vowels = middleChars.filter((c) => /[aeiou]/i.test(c))
      const shuffledVowels = [...vowels]
      for (let i = 0; i < shuffledVowels.length; i++) {
        const j = Math.floor(Math.random() * shuffledVowels.length)
        const k = Math.floor(Math.random() * shuffledVowels.length)
        // Fix the destructuring assignment:
        const temp = shuffledVowels[j]
        shuffledVowels[j] = shuffledVowels[k]
        shuffledVowels[k] = temp
      }

      let vowelIndex = 0
      const newMiddle = middleChars.map((c) => {
        if (/[aeiou]/i.test(c)) {
          return shuffledVowels[vowelIndex++]
        }
        return c
      })

      scrambled =
        (options.preserveEnds ? cleanWord[0] : "") +
        newMiddle.join("") +
        (options.preserveEnds ? cleanWord[cleanWord.length - 1] : "")
      break
  }

  // Reattach punctuation
  return leadingPunct[0] + scrambled + trailingPunct[0]
}

const separateByDelimiter = (text: string, delimiter: DelimiterType): string[] => {
  if (delimiter === "space") return text.split(" ")
  if (delimiter === "newline") return text.split(/\n/)
  if (delimiter === "sentence") return text.split(/(?<=[.!?])\s+/)
  return text.split(" ") // Default
}

interface HistoryItem {
  original: string
  scrambled: string
  timestamp: number
  method: ScrambleMethod
}

const MAX_HISTORY = 10



export default function WordScrambler() {
  // State for text and options
  const [text, setText] = useState("")
  const [scrambledText, setScrambledText] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Scramble options
  const [scrambleMethod, setScrambleMethod] = useState<ScrambleMethod>(SCRAMBLE_METHODS.RANDOM)
  const [delimiter, setDelimiter] = useState<DelimiterType>("space")
  const [preserveEnds, setPreserveEnds] = useState(true)
  const [preserveCommonWords, setPreserveCommonWords] = useState(true)
  const [preserveCapitalization, setPreserveCapitalization] = useState(true)
  const [intensity, setIntensity] = useState(0.7)
  const [minWordLength, setMinWordLength] = useState(4)

  // UI state
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("wordScramblerHistory")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory)
        }
      }
    } catch (error) {
      console.error("Error loading history:", error)
    }
  }, [])

  // Save history to localStorage when it changes
  useEffect(() => {
    try {
      if (history.length > 0) {
        localStorage.setItem("wordScramblerHistory", JSON.stringify(history))
      }
    } catch (error) {
      console.error("Error saving history:", error)
    }
  }, [history])

  const handleScramble = useCallback(() => {
    if (!text.trim()) {
      toast.error("Please enter some text to scramble")
      return
    }

    setIsProcessing(true)

    // Use setTimeout to prevent UI freeze for large inputs
    setTimeout(() => {
      try {
        const units = separateByDelimiter(text, delimiter)
        const options: ScrambleOptions = {
          preserveEnds,
          intensity,
          minWordLength,
          preserveCommonWords,
          preserveCapitalization,
        }

        const scrambledUnits = units.map((unit) => {
          if (delimiter === "space") {
            // For word-level scrambling
            return scrambleWord(unit, scrambleMethod, options)
          } else {
            // For multi-word units (lines, sentences, etc)
            const words = unit.split(" ")
            return words.map((word) => scrambleWord(word, scrambleMethod, options)).join(" ")
          }
        })

        const result = scrambledUnits.join(
          delimiter === "space" ? " " : delimiter === "newline" ? "\n" : delimiter === "sentence" ? " " : " ",
        )

        setScrambledText(result)

        // Add to history if different from previous
        if (result !== scrambledText) {
          const newHistoryItem = {
            original: text,
            scrambled: result,
            timestamp: Date.now(),
            method: scrambleMethod,
          }

          setHistory((prev) => {
            // If we're not at the end of history, truncate
            const relevantHistory = historyIndex < prev.length - 1 ? prev.slice(0, historyIndex + 1) : prev

            // Add new item and limit history length
            const newHistory = [...relevantHistory, newHistoryItem].slice(-MAX_HISTORY)
            setHistoryIndex(newHistory.length - 1)
            return newHistory
          })
        }

        toast.success("Text scrambled successfully!")
      } catch (error) {
        console.error("Scrambling error:", error)
        toast.error("Something went wrong while scrambling")
      } finally {
        setIsProcessing(false)
      }
    }, 0)
  }, [
    text,
    scrambleMethod,
    delimiter,
    preserveEnds,
    preserveCommonWords,
    preserveCapitalization,
    intensity,
    minWordLength,
    scrambledText,
    historyIndex,
  ])

  const handleCopy = useCallback(() => {
    if (!scrambledText) {
      toast.error("No scrambled text to copy")
      return
    }
    navigator.clipboard.writeText(scrambledText)
    toast.success("Scrambled text copied to clipboard")
  }, [scrambledText])

  const handleDownload = useCallback(() => {
    if (!scrambledText) {
      toast.error("No scrambled text to download")
      return
    }
    const blob = new Blob([scrambledText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scrambled_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Scrambled text downloaded")
  }, [scrambledText])

  const handleClear = useCallback(() => {
    setText("")
    setScrambledText("")
    toast.success("Text cleared")
  }, [])

  const loadFromHistory = useCallback(
    (index: number) => {
      if (history[index]) {
        setText(history[index].original)
        setScrambledText(history[index].scrambled)
        setScrambleMethod(history[index].method)
        setHistoryIndex(index)
        toast.success("Loaded from history")
      }
    },
    [history],
  )

  // History navigation
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      loadFromHistory(newIndex)
      toast.success("Undone to previous state")
    } else {
      toast.error("No more history to undo")
    }
  }, [historyIndex, loadFromHistory])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      loadFromHistory(newIndex)
      toast.success("Redone to next state")
    } else {
      toast.error("No more history to redo")
    }
  }, [history.length, historyIndex, loadFromHistory])

  // Random text examples
  const examples = [
    "The quick brown fox jumps over the lazy dog.",
    "According to research at Cambridge University, it doesn't matter in what order the letters in a word are, the only important thing is that the first and last letter be at the right place.",
    "This sentence demonstrates how scrambled text can still be readable when first and last letters are preserved.",
  ]

  const loadExample = useCallback((index: number) => {
    setText(examples[index])
  }, [])

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getMethodName = (method: ScrambleMethod) => {
    switch (method) {
      case SCRAMBLE_METHODS.RANDOM:
        return "Random Shuffle"
      case SCRAMBLE_METHODS.REVERSE:
        return "Reverse Letters"
      case SCRAMBLE_METHODS.SORTED:
        return "Alphabetical Sort"
      case SCRAMBLE_METHODS.VOWEL_SWAP:
        return "Vowel Swap"
      default:
        return "Unknown Method"
    }
  }

  const getMethodColor = (method: ScrambleMethod) => {
    switch (method) {
      case SCRAMBLE_METHODS.RANDOM:
        return "primary"
      case SCRAMBLE_METHODS.REVERSE:
        return "secondary"
      case SCRAMBLE_METHODS.SORTED:
        return "success"
      case SCRAMBLE_METHODS.VOWEL_SWAP:
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <ToolLayout
      title="Word Scrambler"
      description="Shuffle the letters in your text with multiple algorithms and customization options"
      toolId="word-scrambler"
    >
      <div className="flex flex-col gap-6">
        {/* Main Tool Card */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-0 overflow-hidden">
            {/* Header with tool title and actions */}
            <div className="bg-default-50 dark:bg-default-100 p-4 flex justify-between items-center border-b border-default-300/50 dark:border-default-900/30">
              
              <div className="flex items-center gap-2">
                <Tooltip content="Undo" placement="top" className="text-default-700">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleUndo}
                    isDisabled={historyIndex <= 0 || history.length === 0}
                  >
                    <Undo2 size={18} />
                  </Button>
                </Tooltip>
                <Tooltip content="Redo" placement="top" className="text-default-700">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleRedo}
                    isDisabled={historyIndex >= history.length - 1 || history.length === 0}
                  >
                    <Redo2 size={18} />
                  </Button>
                </Tooltip>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem
                      key="clear"
                      startContent={<Trash2 size={16} />}
                      onPress={handleClear}
                      isDisabled={!text && !scrambledText}
                      className="text-danger"
                    >
                      Clear All
                    </DropdownItem>
                    <DropdownItem
                      key="example"
                      startContent={<BookIcon size={16} />}
                      onPress={() => loadExample(Math.floor(Math.random() * examples.length))}
                      className="text-default-700"
                    >
                      Load Example
                    </DropdownItem>
                    <DropdownItem
                      key="toggle-options"
                      startContent={<Settings size={16} />}
                      onPress={() => setShowOptions(!showOptions)}
                      className="text-default-700"
                    >
                      {showOptions ? "Hide Options" : "Show Options"}
                    </DropdownItem>
                    <DropdownItem
                      key="toggle-history"
                      startContent={<History size={16} />}
                      onPress={() => setShowHistory(!showHistory)}
                      className="text-default-700"
                    >
                      {showHistory ? "Hide History" : "Show History"}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            {/* Main content area */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-success-100 dark:bg-success-900/30 p-1.5 rounded-md">
                      <Type size={16} className="text-primary-600 dark:text-primary-600" />
                    </div>
                    <h3 className="text-md font-semibold text-primary-600 dark:text-primary-400">Input Text</h3>
                  </div>
                  <div className="relative">
                    <Textarea
                      value={text}
                      onValueChange={setText}
                      placeholder="Enter your text here..."
                      minRows={10}
                      className="w-full"
                      variant="bordered"
                      maxLength={MAX_CHARS}
                      isDisabled={isProcessing}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-default-400">
                      {text.length}/{MAX_CHARS}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center mt-1 gap-3 sm:gap-0">
                    <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={handleClear}
                        isDisabled={!text}
                        startContent={<RotateCcw size={14} />}
                        className="flex-1 sm:flex-initial"
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        color="secondary"
                        variant="flat"
                        onPress={() => loadExample(Math.floor(Math.random() * examples.length))}
                        startContent={<BookIcon size={14} />}
                        className="flex-1 sm:flex-initial"
                      >
                        Example
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      color="primary"
                      onPress={handleScramble}
                      isDisabled={isProcessing || !text.trim()}
                      startContent={
                        isProcessing ? <Loader2 className="animate-spin" size={14} /> : <Shuffle size={14} />
                      }
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      {isProcessing ? "Processing..." : "Scramble"}
                    </Button>
                  </div>
                </div>

                {/* Output Section */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-success-100 dark:bg-success-900/30 p-1.5 rounded-md">
                      <Zap size={16} className="text-success-600 dark:text-success-400" />
                    </div>
                    <h3 className="text-md font-semibold text-success-600 dark:text-success-400">Scrambled Result</h3>
                  </div>
                  <Textarea
                    value={scrambledText}
                    isReadOnly
                    placeholder="Scrambled text will appear here..."
                    minRows={10}
                    className="w-full"
                    variant="bordered"
                  />

                  <div className="flex flex-col sm:flex-row justify-between items-center mt-1 gap-3 sm:gap-0">
                    <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
                      <Button
                        size="sm"
                        color="primary"
                        onPress={handleCopy}
                        isDisabled={!scrambledText}
                        startContent={<Copy size={14} />}
                        className="flex-1 sm:flex-initial"
                      >
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={handleDownload}
                        isDisabled={!scrambledText}
                        startContent={<Download size={14} />}
                        className="flex-1 sm:flex-initial"
                      >
                        Download
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      color="secondary"
                      variant="flat"
                      onPress={() => {
                        setText(scrambledText)
                        toast.success("Scrambled text applied to input")
                      }}
                      isDisabled={!scrambledText}
                      startContent={<ArrowLeftRight size={14} />}
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      Apply to Input
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Options Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-3 p-3 bg-default-200/80 dark:bg-default-300/20 rounded-xl shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-default-50 dark:bg-default-100 p-1.5 rounded-md ">
                    <Wand2 size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm font-medium">Quick Options:</span>
                </div>

                <Select
                  selectedKeys={[scrambleMethod]}
                  onChange={(e) => setScrambleMethod(e.target.value as ScrambleMethod)}
                  className="w-40 min-w-0"
                  size="sm"
                  variant="flat"
                  aria-label="Scramble Method"
                  classNames={{
                    trigger: "bg-white dark:bg-gray-800 shadow-sm",
                  }}
                >
                  <SelectItem key={SCRAMBLE_METHODS.RANDOM} value={SCRAMBLE_METHODS.RANDOM} className="text-default-700">
                    Random Shuffle
                  </SelectItem>
                  <SelectItem key={SCRAMBLE_METHODS.REVERSE} value={SCRAMBLE_METHODS.REVERSE} className="text-default-700">
                    Reverse Letters
                  </SelectItem>
                  <SelectItem key={SCRAMBLE_METHODS.SORTED} value={SCRAMBLE_METHODS.SORTED} className="text-default-700">
                    Alphabetical Sort
                  </SelectItem>
                  <SelectItem key={SCRAMBLE_METHODS.VOWEL_SWAP} value={SCRAMBLE_METHODS.VOWEL_SWAP} className="text-default-700">
                    Vowel Swap
                  </SelectItem>
                </Select>

                <Select
                  selectedKeys={[delimiter]}
                  onChange={(e) => setDelimiter(e.target.value as DelimiterType)}
                  className="w-40 min-w-0"
                  size="sm"
                  variant="flat"
                  aria-label="Scramble Unit"
                  classNames={{
                    trigger: "bg-white dark:bg-gray-800 shadow-sm",
                  }}
                >
                  <SelectItem key="space" value="space" className="text-default-700">
                    Words
                  </SelectItem>
                  <SelectItem key="newline" value="newline" className="text-default-700">
                    Lines
                  </SelectItem>
                  <SelectItem key="sentence" value="sentence" className="text-default-700">
                    Sentences
                  </SelectItem>
                </Select>

                <Checkbox isSelected={preserveEnds} onValueChange={setPreserveEnds} size="sm" color="secondary">
                  <span className="text-sm">Preserve First/Last</span>
                </Checkbox>

                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  endContent={<ChevronDown size={14} />}
                  onPress={() => setShowOptions(!showOptions)}
                >
                  {showOptions ? "Hide Advanced" : "Show Advanced"}
                </Button>
              </div>

              {/* Advanced Options Panel (collapsible) */}
              {showOptions && (
                <div className="mt-4 p-4 bg-default-50 dark:bg-default-100 rounded-xl border border-default-200/50 dark:border-default-800/30 shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                        <Settings size={16} className="text-primary-500" />
                        <span>Scrambling Settings</span>
                      </h3>

                      <div className="space-y-8">
                        <div>
                          <p className="text-sm mb-2 flex items-center justify-between">
                            <span>Scramble Intensity: {intensity.toFixed(2)}</span>
                            <span className="text-xs text-default-400">
                              {intensity < 0.3 ? "Low" : intensity < 0.7 ? "Medium" : "High"}
                            </span>
                          </p>
                          <Slider
                            step={0.01}
                            maxValue={1}
                            minValue={0}
                            value={intensity}
                            onChange={(value) => setIntensity(Number(value))}
                            className="max-w-md"
                            color="secondary"
                            showSteps={false}
                            marks={[
                              { value: 0, label: "Low" },
                              { value: 0.5, label: "Medium" },
                              { value: 1, label: "High" },
                            ]}
                          />
                        </div>

                        <Input
                          type="number"
                          label="Minimum Word Length"
                          value={minWordLength.toString()}
                          onChange={(e) => setMinWordLength(Number(e.target.value))}
                          min={0}
                          max={20}
                          className="max-w-xs"
                          variant="bordered"
                          size="sm"
                          description="Words shorter than this will not be scrambled"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                        <Lightbulb size={16} className="text-success-500" />
                        <span>Preservation Options</span>
                      </h3>

                      <div className="space-y-3">
                        <Checkbox isSelected={preserveEnds} onValueChange={setPreserveEnds} color="primary">
                          Preserve first and last letter
                          <p className="text-xs text-default-500 ml-6">
                            Keeps the first and last letters of each word intact
                          </p>
                        </Checkbox>

                        <Checkbox
                          isSelected={preserveCommonWords}
                          onValueChange={setPreserveCommonWords}
                          color="primary"
                        >
                          Don't scramble common words
                          <p className="text-xs text-default-500 ml-6">
                            Keeps words like "the", "and", "for", etc. unchanged
                          </p>
                        </Checkbox>

                        <Checkbox
                          isSelected={preserveCapitalization}
                          onValueChange={setPreserveCapitalization}
                          color="primary"
                        >
                          Preserve capitalization
                          <p className="text-xs text-default-500 ml-6">Maintains the original capitalization pattern</p>
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Panel (collapsible) */}
              {showHistory && (
                <div className="mt-4 p-4 bg-default-50 dark:bg-default-100 rounded-xl border border-default-200/50 dark:border-default-800/30 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-md font-medium flex items-center gap-2">
                      <History size={16} className="text-primary-500" />
                      <span>Scrambling History</span>
                    </h3>
                    {history.length > 0 && (
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => {
                          setHistory([])
                          setHistoryIndex(-1)
                          localStorage.removeItem("wordScramblerHistory")
                          toast.success("History cleared")
                        }}
                        startContent={<Trash2 size={14} />}
                      >
                        Clear History
                      </Button>
                    )}
                  </div>

                  {history.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {history.map((item, index) => (
                        <Card
                          key={index}
                          className={`${
                            index === historyIndex
                              ? "bg-primary-100/50 dark:bg-primary-900/20 border-2 border-primary-300 dark:border-primary-700"
                              : "bg-default-50 dark:bg-default-100"
                          } shadow-sm`}
                          isPressable
                          onPress={() => loadFromHistory(index)}
                        >
                          <CardBody className="p-3">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Chip
                                    size="sm"
                                    color={getMethodColor(item.method) as "primary" | "secondary" | "success" | "warning" | "default"}
                                    variant="flat"
                                    className="text-xs"
                                  >
                                    {getMethodName(item.method)}
                                  </Chip>
                                  <span className="text-xs text-default-400">{formatTimestamp(item.timestamp)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-xs text-default-500 mb-1">Original:</p>
                                    <p className="text-xs text-default-700 line-clamp-1 font-mono bg-white/50 dark:bg-gray-800/50 p-1 rounded">
                                      {item.original}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-default-500 mb-1">Scrambled:</p>
                                    <p className="text-xs text-default-700 line-clamp-1 font-mono bg-white/50 dark:bg-gray-800/50 p-1 rounded">
                                      {item.scrambled}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                color="primary"
                                variant="flat"
                                isIconOnly
                                onPress={() => loadFromHistory(index)}
                              >
                                <ArrowLeftRight size={14} />
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-default-500 bg-default-50 dark:bg-default-100 rounded-lg">
                      <History size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No history yet</p>
                      <p className="text-sm mt-2">Scramble some text to see your history here</p>
                    </div>
                  )}
                </div>
              )}

              {/* Processing indicator */}
              {isProcessing && (
                <div className="mt-4">
                  <Progress
                    size="sm"
                    isIndeterminate
                    color="primary"
                    className="max-w-md mx-auto"
                    aria-label="Processing..."
                  />
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <InfoSection />
      </div>
    </ToolLayout>
  )
}
