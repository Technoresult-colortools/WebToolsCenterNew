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
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react"
import {
  Copy,
  Download,
  ArrowLeftRight,
  FileText,
  Trash2,
  Sparkles,
  Settings2,
  Braces,
  ArrowRightLeft,
  Wand2,
  Type,
  Hash,
  Shuffle,
  Repeat,
  FlipHorizontal,
  FlipVertical,
  Layers,
  Baseline,
  AlignLeft,
  Puzzle,
  Keyboard,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./info-section"

const MAX_CHARS = 10000 // Character limit

// Reversal options
const reverseOptions = [
  { value: "character", label: "By Character", icon: <Type className="w-4 h-4" /> },
  { value: "word", label: "By Word", icon: <AlignLeft className="w-4 h-4" /> },
  { value: "sentence", label: "By Sentence", icon: <Baseline className="w-4 h-4" /> },
  { value: "paragraph", label: "By Paragraph", icon: <Layers className="w-4 h-4" /> },
]

// Special reversal options
const specialReverseOptions = [
  { value: "mirror", label: "Mirror Text", icon: <FlipHorizontal className="w-4 h-4" /> },
  { value: "flip", label: "Flip Upside Down", icon: <FlipVertical className="w-4 h-4" /> },
  { value: "alternating", label: "Alternating Words", icon: <Shuffle className="w-4 h-4" /> },
  { value: "spiral", label: "Spiral Words", icon: <Repeat className="w-4 h-4" /> },
]

// Mapping for flipped characters (for upside-down text)
const flipMap: Record<string, string> = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  A: "∀",
  B: "𐐒",
  C: "Ɔ",
  D: "ᗡ",
  E: "Ǝ",
  F: "Ⅎ",
  G: "פ",
  H: "H",
  I: "I",
  J: "ſ",
  K: "ʞ",
  L: "˥",
  M: "W",
  N: "N",
  O: "O",
  P: "Ԁ",
  Q: "Ό",
  R: "ᴚ",
  S: "S",
  T: "┴",
  U: "∩",
  V: "Λ",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
  0: "0",
  1: "Ɩ",
  2: "ᄅ",
  3: "Ɛ",
  4: "ㄣ",
  5: "ϛ",
  6: "9",
  7: "ㄥ",
  8: "8",
  9: "6",
  ".": "˙",
  ",": "'",
  "'": ",",
  '"': ",,",
  "`": ",",
  "?": "¿",
  "!": "¡",
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "&": "⅋",
  _: "‾",
  "^": "v",
  "/": "\\",
  "\\": "/",
}

export default function TextReverser() {
  // Basic state
  const [inputText, setInputText] = useState("")
  const [reversedText, setReversedText] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDiff, setShowDiff] = useState(false)

  // Basic options
  const [reverseMode, setReverseMode] = useState("character")
  const [preserveCase, setPreserveCase] = useState(true)
  const [preserveSpaces, setPreserveSpaces] = useState(true)
  const [preservePunctuation, setPreservePunctuation] = useState(true)

  // Advanced options
  const [reverseEachLine, setReverseEachLine] = useState(false)
  const [reverseEachParagraph, setReverseEachParagraph] = useState(false)
  const [specialReverseMode, setSpecialReverseMode] = useState("")
  const [customPattern, setCustomPattern] = useState("")
  const [customSeparator, setCustomSeparator] = useState("")

  // Stats
  const [originalStats, setOriginalStats] = useState({
    chars: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
  })
  const [reversedStats, setReversedStats] = useState({
    chars: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
  })

  // Calculate text statistics
  const calculateStats = useCallback((text: string) => {
    const chars = text.length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0

    return {
      chars,
      words,
      sentences,
      paragraphs,
    }
  }, [])

  // Update original text stats when text changes
  useEffect(() => {
    const stats = calculateStats(inputText)
    setOriginalStats(stats)
  }, [inputText, calculateStats])

  // Update reversed text stats when processed text changes
  useEffect(() => {
    if (reversedText) {
      const stats = calculateStats(reversedText)
      setReversedStats(stats)
    } else {
      setReversedStats({
        chars: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
      })
    }
  }, [reversedText, calculateStats])

  // Basic text reversal function
  const reverseText = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to reverse")
      return
    }

    setIsProcessing(true)

    // Use setTimeout to prevent UI blocking for large texts
    setTimeout(() => {
      try {
        let result = inputText

        // Basic reversal modes
        if (reverseMode === "character") {
          if (reverseEachLine) {
            // Reverse each line separately
            result = result
              .split("\n")
              .map((line) => {
                if (preserveCase && preserveSpaces && preservePunctuation) {
                  return line.split("").reverse().join("")
                } else {
                  // Handle preservation options
                  let processedLine = line
                  const spaces = preserveSpaces ? [] : processedLine.match(/\s+/g) || []
                  const punctuation = preservePunctuation ? [] : processedLine.match(/[^\w\s]/g) || []
                  const caseMap = preserveCase ? [] : processedLine.split("").map((char) => char === char.toUpperCase())

                  // Remove what we don't want to reverse
                  if (!preserveSpaces) processedLine = processedLine.replace(/\s+/g, "")
                  if (!preservePunctuation) processedLine = processedLine.replace(/[^\w\s]/g, "")

                  // Reverse the characters
                  processedLine = processedLine.split("").reverse().join("")

                  // Restore what we removed
                  if (!preserveCase) {
                    processedLine = processedLine
                      .split("")
                      .map((char, i) => (caseMap[i] ? char.toUpperCase() : char.toLowerCase()))
                      .join("")
                  }
                  if (!preserveSpaces && spaces.length) {
                    spaces.forEach((space, i) => {
                      const position = line.indexOf(
                        space,
                        i > 0 ? line.indexOf(spaces[i - 1]) + spaces[i - 1].length : 0,
                      )
                      const relativePos = line.length - position - space.length
                      processedLine =
                        processedLine.substring(0, relativePos) + space + processedLine.substring(relativePos)
                    })
                  }
                  if (!preservePunctuation && punctuation.length) {
                    punctuation.forEach((punct, i) => {
                      const position = line.indexOf(
                        punct,
                        i > 0 ? line.indexOf(punctuation[i - 1]) + punctuation[i - 1].length : 0,
                      )
                      const relativePos = line.length - position - punct.length
                      processedLine =
                        processedLine.substring(0, relativePos) + punct + processedLine.substring(relativePos)
                    })
                  }
                  return processedLine
                }
              })
              .join("\n")
          } else {
            // Reverse the entire text as one unit
            if (preserveCase && preserveSpaces && preservePunctuation) {
              result = result.split("").reverse().join("")
            } else {
              // Handle preservation options
              const spaces = preserveSpaces ? [] : result.match(/\s+/g) || []
              const punctuation = preservePunctuation ? [] : result.match(/[^\w\s]/g) || []
              const caseMap = preserveCase ? [] : result.split("").map((char) => char === char.toUpperCase())

              // Remove what we don't want to reverse
              if (!preserveSpaces) result = result.replace(/\s+/g, "")
              if (!preservePunctuation) result = result.replace(/[^\w\s]/g, "")

              // Reverse the characters
              result = result.split("").reverse().join("")

              // Restore what we removed
              if (!preserveCase) {
                result = result
                  .split("")
                  .map((char, i) => (caseMap[i] ? char.toUpperCase() : char.toLowerCase()))
                  .join("")
              }
              if (!preserveSpaces && spaces.length) {
                spaces.forEach((space, i) => {
                  const position = inputText.indexOf(
                    space,
                    i > 0 ? inputText.indexOf(spaces[i - 1]) + spaces[i - 1].length : 0,
                  )
                  const relativePos = inputText.length - position - space.length
                  result = result.substring(0, relativePos) + space + result.substring(relativePos)
                })
              }
              if (!preservePunctuation && punctuation.length) {
                punctuation.forEach((punct, i) => {
                  const position = inputText.indexOf(
                    punct,
                    i > 0 ? inputText.indexOf(punctuation[i - 1]) + punctuation[i - 1].length : 0,
                  )
                  const relativePos = inputText.length - position - punct.length
                  result = result.substring(0, relativePos) + punct + result.substring(relativePos)
                })
              }
            }
          }
        } else if (reverseMode === "word") {
          if (reverseEachLine) {
            // Reverse words in each line separately
            result = result
              .split("\n")
              .map((line) => line.split(/\s+/).filter(Boolean).reverse().join(" "))
              .join("\n")
          } else if (reverseEachParagraph) {
            // Reverse words in each paragraph separately
            result = result
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.split(/\s+/).filter(Boolean).reverse().join(" "))
              .join("\n\n")
          } else {
            // Reverse all words in the text
            result = result.split(/\s+/).filter(Boolean).reverse().join(" ")
          }
        } else if (reverseMode === "sentence") {
          if (reverseEachParagraph) {
            // Reverse sentences in each paragraph separately
            result = result
              .split(/\n\s*\n/)
              .map((paragraph) => {
                return paragraph
                  .split(/(?<=[.!?])\s+/)
                  .filter(Boolean)
                  .reverse()
                  .join(" ")
              })
              .join("\n\n")
          } else {
            // Reverse all sentences in the text
            result = result
              .split(/(?<=[.!?])\s+/)
              .filter(Boolean)
              .reverse()
              .join(" ")
          }
        } else if (reverseMode === "paragraph") {
          // Reverse paragraphs
          result = result
            .split(/\n\s*\n/)
            .filter(Boolean)
            .reverse()
            .join("\n\n")
        }

        // Special reversal modes
        if (specialReverseMode === "mirror") {
          // Mirror text (character reversal with some special handling)
          result = inputText
            .split("\n")
            .map((line) => line.split("").reverse().join(""))
            .join("\n")
        } else if (specialReverseMode === "flip") {
          // Flip text upside down
          result = inputText
            .split("")
            .map((char) => flipMap[char] || char)
            .reverse()
            .join("")
        } else if (specialReverseMode === "alternating") {
          // Alternating words (reverse every other word)
          result = inputText
            .split(/\s+/)
            .map((word, index) => (index % 2 === 0 ? word : word.split("").reverse().join("")))
            .join(" ")
        } else if (specialReverseMode === "spiral") {
          // Spiral words (first normal, second reversed, third normal, etc.)
          const words = inputText.split(/\s+/)
          const spiralWords = []
          let left = 0
          let right = words.length - 1

          while (left <= right) {
            if (left === right) {
              spiralWords.push(words[left])
            } else {
              spiralWords.push(words[left])
              spiralWords.push(words[right].split("").reverse().join(""))
            }
            left++
            right--
          }

          result = spiralWords.join(" ")
        }

        // Custom pattern reversal
        if (customPattern && customSeparator) {
          try {
            const separator = customSeparator || " "
            const pattern = new RegExp(customPattern, "g")
            const matches = inputText.match(pattern)

            if (matches) {
              result = matches.reverse().join(separator)
            } else {
              toast.error("No matches found for the custom pattern")
            }
          } catch (error) {
            console.error("Error with custom pattern:", error)
            toast.error("Invalid custom pattern")
          }
        }

        setReversedText(result)
        toast.success("Text reversed successfully!")
      } catch (error) {
        console.error("Error reversing text:", error)
        toast.error("Error reversing text")
      } finally {
        setIsProcessing(false)
      }
    }, 10)
  }, [
    inputText,
    reverseMode,
    preserveCase,
    preserveSpaces,
    preservePunctuation,
    reverseEachLine,
    reverseEachParagraph,
    specialReverseMode,
    customPattern,
    customSeparator,
  ])

  const handleCopy = useCallback(() => {
    if (!reversedText) {
      toast.error("No reversed text to copy")
      return
    }
    navigator.clipboard.writeText(reversedText)
    toast.success("Text copied to clipboard")
  }, [reversedText])

  const handleDownload = useCallback(() => {
    if (!reversedText) {
      toast.error("No reversed text to download")
      return
    }
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

  const handleApplyToInput = useCallback(() => {
    if (!reversedText) {
      toast.error("No reversed text to apply")
      return
    }
    setInputText(reversedText)
    toast.success("Reversed text applied to input")
  }, [reversedText])

  // Generate a visual diff between original and reversed text
  const generateDiff = useCallback(() => {
    if (!inputText || !reversedText) {
      return "No text to compare"
    }

    // Simple character-by-character diff for demonstration
    // In a real app, you might want to use a more sophisticated diff algorithm
    const originalChars = inputText.split("")
    const reversedChars = reversedText.split("")

    let diffHtml = ""
    let i = 0,
      j = 0

    while (i < originalChars.length || j < reversedChars.length) {
      if (i < originalChars.length && j < reversedChars.length && originalChars[i] === reversedChars[j]) {
        // Characters match
        diffHtml += originalChars[i]
        i++
        j++
      } else if (j < reversedChars.length && (i >= originalChars.length || originalChars[i] !== reversedChars[j])) {
        // Character added in reversed text
        diffHtml += `<span style="background-color: #d4edda; color: #155724;">+${reversedChars[j]}</span>`
        j++
      } else {
        // Character removed from original text
        diffHtml += `<span style="background-color: #f8d7da; color: #721c24;">-${originalChars[i]}</span>`
        i++
      }
    }

    return diffHtml
  }, [inputText, reversedText])

  return (
    <ToolLayout
      title="Text Reverser & Word Manipulator"
      description="Reverse and transform text by characters, words, sentences, or custom patterns"
      toolId="678f382926f06f912191bc82"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <Card className="lg:col-span-6 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-0">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center">
              <FileText size={20} className="mr-2" /> Input Text
            </h2>
            <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2">
              <Chip color="primary" variant="flat" size="sm" startContent={<Hash size={14} />}>
                {originalStats.chars} chars
              </Chip>
              <Chip color="secondary" variant="flat" size="sm" startContent={<Type size={14} />}>
                {originalStats.words} words
              </Chip>
            </div>
          </CardHeader>

          <CardBody className="py-3">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter or paste your text here to reverse..."
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

        {/* Output Panel */}
        <Card className="lg:col-span-6 bg-default-50 dark:bg-default-100">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-0">
            <h2 className="text-lg sm:text-xl font-semibold text-success-600 dark:text-success-400 flex items-center">
              <ArrowLeftRight size={20} className="mr-2" /> Reversed Text
            </h2>
            <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2">
              {reversedText && (
                <>
                  <Chip color="primary" variant="flat" size="sm" startContent={<Hash size={14} />}>
                    {reversedStats.chars} chars
                  </Chip>
                  <Chip color="secondary" variant="flat" size="sm" startContent={<Type size={14} />}>
                    {reversedStats.words} words
                  </Chip>
                </>
              )}
            </div>
          </CardHeader>

          <CardBody className="py-3">
            {showDiff ? (
              <div
                className="w-full min-h-[300px] p-3 border-2 border-default-200 dark:border-default-700 rounded-lg bg-default-100/50 overflow-auto"
                dangerouslySetInnerHTML={{ __html: generateDiff() }}
              />
            ) : (
              <Textarea
                value={reversedText}
                readOnly
                placeholder="Reversed text will appear here..."
                minRows={12}
                maxRows={20}
                className="w-full"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-default-100/50",
                }}
              />
            )}
            <div className="flex justify-between items-center mt-2">
              <Switch
                size="sm"
                isSelected={showDiff}
                onValueChange={setShowDiff}
                isDisabled={!reversedText}
                classNames={{
                  label: "text-xs",
                }}
              >
                Show diff view
              </Switch>
              <Button
                color="primary"
                variant="light"
                onPress={handleApplyToInput}
                startContent={<ArrowRightLeft size={14} />}
                size="sm"
                isDisabled={!reversedText}
              >
                Apply to Input
              </Button>
            </div>
          </CardBody>
          <CardFooter className="flex flex-wrap gap-2 justify-start pt-0">
            <Button
              color="primary"
              variant="flat"
              onPress={handleCopy}
              startContent={<Copy size={16} />}
              isDisabled={!reversedText}
              size="sm"
            >
              Copy
            </Button>
            <Button
              color="primary"
              variant="flat"
              onPress={handleDownload}
              startContent={<Download size={16} />}
              isDisabled={!reversedText}
              size="sm"
            >
              Download
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
              classNames={{
                tab: "h-8 px-2 sm:px-3",
                tabList: "w-full justify-start sm:justify-center",
                tabContent: "text-xs sm:text-sm"
              }}
              variant="underlined"
              className="w-full"
            >
              <Tab
                key="basic"
                title={
                  <div className="flex items-center gap-1">
                    <ArrowLeftRight size={14} />
                    <span className="hidden sm:inline">Basic Reversal</span>
                    <span className="sm:hidden">Basic</span>
                  </div>
                }
              />
              <Tab
                key="advanced"
                title={
                  <div className="flex items-center gap-1">
                    <Settings2 size={14} />
                    <span className="hidden sm:inline">Advanced Options</span>
                    <span className="sm:hidden">Advanced</span>
                  </div>
                }
              />
              <Tab
                key="special"
                title={
                  <div className="flex items-center gap-1">
                    <Sparkles size={14} />
                    <span className="hidden sm:inline">Special Transformations</span>
                    <span className="sm:hidden">Special</span>
                  </div>
                }
              />
              <Tab
                key="custom"
                title={
                  <div className="flex items-center gap-1">
                    <Braces size={14} />
                    <span className="hidden sm:inline">Custom Patterns</span>
                    <span className="sm:hidden">Custom</span>
                  </div>
                }
              />
            </Tabs>
          </CardHeader>
          <CardBody className="py-3 px-4">
            {activeTab === "basic" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Basic Reversal Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Reversal Mode</h4>
                    <Select
                      label="Select how to reverse the text"
                      selectedKeys={[reverseMode]}
                      onChange={(e) => setReverseMode(e.target.value)}
                      className="max-w-full"
                      variant="bordered"
                      size="sm"
                      startContent={
                        reverseOptions.find((option) => option.value === reverseMode)?.icon || (
                          <Type className="w-4 h-4" />
                        )
                      }
                    >
                      {reverseOptions.map((option) => (
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

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Preservation Options</h4>
                    <div className="space-y-2">
                      <Switch isSelected={preserveCase} onValueChange={setPreserveCase} size="sm">
                        Preserve case (uppercase/lowercase)
                      </Switch>
                      <Switch isSelected={preserveSpaces} onValueChange={setPreserveSpaces} size="sm">
                        Preserve spaces and whitespace
                      </Switch>
                      <Switch isSelected={preservePunctuation} onValueChange={setPreservePunctuation} size="sm">
                        Preserve punctuation
                      </Switch>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={reverseText}
                    startContent={isProcessing ? null : <ArrowLeftRight size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                  >
                    {isProcessing ? "Processing..." : "Reverse Text"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Advanced Reversal Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Scope Options</h4>
                    <div className="space-y-2">
                      <Switch
                        isSelected={reverseEachLine}
                        onValueChange={setReverseEachLine}
                        size="sm"
                        isDisabled={reverseEachParagraph}
                      >
                        Reverse each line separately
                      </Switch>
                      <Switch
                        isSelected={reverseEachParagraph}
                        onValueChange={setReverseEachParagraph}
                        size="sm"
                        isDisabled={reverseEachLine}
                      >
                        Reverse each paragraph separately
                      </Switch>
                    </div>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Transformation Preview</h4>
                    <div className="text-xs text-default-600 space-y-2">
                      <div className="flex items-center">
                        <Maximize2 className="w-3 h-3 mr-1 text-primary-500" />
                        <span>Original: "Hello world. This is a test."</span>
                      </div>
                      <div className="flex items-center">
                        <Minimize2 className="w-3 h-3 mr-1 text-success-500" />
                        <span>
                          {reverseMode === "character" && reverseEachLine
                            ? 'Reversed: ".dlrow olleH .tset a si sihT"'
                            : reverseMode === "character"
                              ? 'Reversed: ".tset a si sihT .dlrow olleH"'
                              : reverseMode === "word" && reverseEachLine
                                ? 'Reversed: "world Hello. test a is This."'
                                : reverseMode === "word"
                                  ? 'Reversed: "test a is This. world Hello."'
                                  : reverseMode === "sentence"
                                    ? 'Reversed: "This is a test. Hello world."'
                                    : reverseMode === "paragraph"
                                      ? 'Reversed: "This is a test. Hello world."'
                                      : "Select options to see preview"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={reverseText}
                    startContent={isProcessing ? null : <Wand2 size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                  >
                    {isProcessing ? "Processing..." : "Apply Advanced Reversal"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "special" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Special Text Transformations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Special Transformation Mode</h4>
                    <RadioGroup
                      value={specialReverseMode}
                      onValueChange={(value: string) => setSpecialReverseMode(value)}
                      orientation="vertical"
                      size="sm"
                    >
                      <Radio value="" description="Use basic reversal options">
                        None
                      </Radio>
                      {specialReverseOptions.map((option) => (
                        <Radio
                          key={option.value}
                          value={option.value}
                          description={
                            option.value === "mirror"
                              ? "Reverse characters in each line"
                              : option.value === "flip"
                                ? "Flip text upside down"
                                : option.value === "alternating"
                                  ? "Reverse every other word"
                                  : "First word normal, last word reversed, etc."
                          }
                        >
                          <div className="flex items-center">
                            {option.icon}
                            <span className="ml-1">{option.label}</span>
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Transformation Preview</h4>
                    <div className="text-xs text-default-600 space-y-2">
                      <div className="flex items-center">
                        <Maximize2 className="w-3 h-3 mr-1 text-primary-500" />
                        <span>Original: "Hello world"</span>
                      </div>
                      <div className="flex items-center">
                        <Minimize2 className="w-3 h-3 mr-1 text-success-500" />
                        <span>
                          {specialReverseMode === "mirror"
                            ? 'Reversed: "dlrow olleH"'
                            : specialReverseMode === "flip"
                              ? 'Reversed: "plɹoʍ ollǝH"'
                              : specialReverseMode === "alternating"
                                ? 'Reversed: "Hello dlrow"'
                                : specialReverseMode === "spiral"
                                  ? 'Reversed: "Hello dlrow"'
                                  : "Select a special transformation"}
                        </span>
                      </div>
                    </div>
                    <Divider className="my-3" />
                    <div className="text-xs text-default-500 mt-2">
                      <p className="mb-2">
                        <Puzzle className="w-3 h-3 inline mr-1" />
                        Special transformations create unique text effects beyond simple reversal.
                      </p>
                      <p>
                        <Keyboard className="w-3 h-3 inline mr-1" />
                        Try different options to see which works best for your needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={reverseText}
                    startContent={isProcessing ? null : <Sparkles size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                  >
                    {isProcessing ? "Processing..." : "Apply Special Transformation"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "custom" && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-default-700">Custom Pattern Reversal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Custom Pattern Settings</h4>
                    <div className="space-y-3">
                      <Textarea
                        label="Regular Expression Pattern"
                        placeholder="e.g., \w+|[^\w\s]+"
                        value={customPattern}
                        onChange={(e) => setCustomPattern(e.target.value)}
                        minRows={1}
                        maxRows={2}
                        variant="bordered"
                        size="sm"
                        description="Enter a regex pattern to match text segments"
                      />
                      <Textarea
                        label="Join Separator"
                        placeholder="e.g., space, comma, etc."
                        value={customSeparator}
                        onChange={(e) => setCustomSeparator(e.target.value)}
                        minRows={1}
                        maxRows={2}
                        variant="bordered"
                        size="sm"
                        description="Character(s) to join reversed segments"
                      />
                    </div>
                  </div>

                  <div className="bg-default-100/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 mb-2">Pattern Examples</h4>
                    <div className="text-xs text-default-600 space-y-3">
                      <div className="p-2 bg-default-200/50 rounded">
                        <div className="font-medium">Match Words:</div>
                        <code>\w+</code>
                        <div className="mt-1 text-default-500">Reverses the order of all words</div>
                      </div>
                      <div className="p-2 bg-default-200/50 rounded">
                        <div className="font-medium">Match Words & Punctuation:</div>
                        <code>\w+|[^\w\s]+</code>
                        <div className="mt-1 text-default-500">Reverses words and punctuation separately</div>
                      </div>
                      <div className="p-2 bg-default-200/50 rounded">
                        <div className="font-medium">Match Numbers:</div>
                        <code>\d+</code>
                        <div className="mt-1 text-default-500">Reverses the order of all numbers</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    color="primary"
                    onPress={reverseText}
                    startContent={isProcessing ? null : <Braces size={18} />}
                    isLoading={isProcessing}
                    size="md"
                    className="px-8"
                    isDisabled={!customPattern}
                  >
                    {isProcessing ? "Processing..." : "Apply Custom Pattern"}
                  </Button>
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
