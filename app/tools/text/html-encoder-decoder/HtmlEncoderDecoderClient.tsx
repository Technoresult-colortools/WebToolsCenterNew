"use client"

import type React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Textarea,
  Select,
  SelectItem,
  Switch,
  Badge,
  Divider,
  Progress,
} from "@nextui-org/react"
import {
  Copy,
  RefreshCw,
  Code,
  FileText,
  Download,
  Clipboard,
  Wand2,
  ArrowLeftRight,
  Undo2,
  Redo2,
  FileUp,
  Sparkles,
  FileJson,
  Info,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import { useDebounce } from "@/hooks/useDebounce"
import InfoSection from "./InfoSection"

const encodingOptions = [
  { value: "named", label: "Named Entities", description: "Use named HTML entities like &amp; and &lt;" },
  { value: "decimal", label: "Decimal Entities", description: "Use decimal HTML entities like &#38; and &#60;" },
  { value: "hexadecimal", label: "Hexadecimal Entities", description: "Use hex HTML entities like &#x26; and &#x3C;" },
]

const namedEntities: { [key: string]: string } = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
  "¢": "&cent;",
  "£": "&pound;",
  "¥": "&yen;",
  "€": "&euro;",
  "©": "&copy;",
  "®": "&reg;",
  "§": "&sect;",
  "°": "&deg;",
  "±": "&plusmn;",
  "×": "&times;",
  "÷": "&divide;",
  µ: "&micro;",
  "¶": "&para;",
  "·": "&middot;",
  "½": "&frac12;",
  "¼": "&frac14;",
  "¾": "&frac34;",
  "¿": "&iquest;",
  ª: "&ordf;",
  º: "&ordm;",
  "«": "&laquo;",
  "»": "&raquo;",
  ƒ: "&fnof;",
  ð: "&eth;",
  þ: "&thorn;",
  Ð: "&ETH;",
  Þ: "&THORN;",
  æ: "&aelig;",
  Æ: "&AElig;",
  œ: "&oelig;",
  Œ: "&OElig;",
  ß: "&szlig;",
  å: "&aring;",
  Å: "&Aring;",
  Ø: "&Oslash;",
  ø: "&oslash;",
  "¯": "&macr;",
  "¨": "&uml;",
  "¬": "&not;",
  "¡": "&iexcl;",
  ˆ: "&circ;",
  "˜": "&tilde;",
  "∂": "&part;",
  "∆": "&Delta;",
  "∏": "&prod;",
  "∑": "&sum;",
  "∗": "&lowast;",
  "√": "&radic;",
  "∞": "&infin;",
  "∠": "&ang;",
  "∩": "&cap;",
  "∪": "&cup;",
  "∫": "&int;",
  "≈": "&asymp;",
  "≠": "&ne;",
  "≡": "&equiv;",
  "≤": "&le;",
  "≥": "&ge;",
  "⊂": "&sub;",
  "⊃": "&sup;",
  "⊆": "&sube;",
  "⊇": "&supe;",
  "⊕": "&oplus;",
  "⊗": "&otimes;",
  "⊥": "&perp;",
  "⋅": "&sdot;",
  "‾": "&oline;",
  ℵ: "&alefsym;",
  ℑ: "&image;",
  ℘: "&weierp;",
  ℜ: "&real;",
  "™": "&trade;",
  ℓ: "&ell;",
  "←": "&larr;",
  "↑": "&uarr;",
  "→": "&rarr;",
  "↓": "&darr;",
  "↔": "&harr;",
  "↵": "&crarr;",
  "⇐": "&lArr;",
  "⇑": "&uArr;",
  "⇒": "&rArr;",
  "⇓": "&dArr;",
  "⇔": "&hArr;",
  "∀": "&forall;",
  "∃": "&exist;",
  "∅": "&empty;",
  "∇": "&nabla;",
  "∉": "&notin;",
  "∋": "&ni;",
  "∴": "&there4;",
  "⌈": "&lceil;",
  "⌉": "&rceil;",
  "⌊": "&lfloor;",
  "⌋": "&rfloor;",
  "◊": "&loz;",
  "♠": "&spades;",
  "♣": "&clubs;",
  "♥": "&hearts;",
  "♦": "&diams;",
}

const reverseNamedEntities: { [key: string]: string } = Object.entries(namedEntities).reduce(
  (acc, [char, entity]) => ({
    ...acc,
    [entity]: char,
  }),
  {},
)

// Common HTML examples for testing
const examples = [
  {
    name: "Basic HTML Tags",
    text: `<div class="container">
  <h1>Hello World</h1>
  <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
  <a href="https://example.com">Visit Example.com</a>
</div>`,
  },
  {
    name: "Special Characters",
    text: `The price is $10 & €15 for "premium" items.
Copyright © 2023 Example Corp.
Temperature: 72° F
Dimensions: 10" × 5" × 3"`,
  },
  {
    name: "Form Elements",
    text: `<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <button type="submit">Submit</button>
</form>`,
  },
]

interface StatsType {
  inputChars: number
  outputChars: number
  entitiesCount: number
  processingTime: number
  specialChars: number
}

interface HistoryItem {
  input: string
  output: string
  mode: "encode" | "decode"
  encodingType?: "named" | "decimal" | "hexadecimal"
  options?: {
    preserveNewlines: boolean
    encodeQuotes: boolean
    encodeNonASCII: boolean
  }
  timestamp: number
  stats: StatsType
}

const MAX_HISTORY_LENGTH = 20

export default function HTMLEncoderDecoder() {
  // State
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [preserveNewlines, setPreserveNewlines] = useState(true)
  const [encodeQuotes, setEncodeQuotes] = useState(true)
  const [encodeNonASCII, setEncodeNonASCII] = useState(false)
  const [encodingType, setEncodingType] = useState<"named" | "decimal" | "hexadecimal">("named")
  const [autoProcess, setAutoProcess] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [stats, setStats] = useState<StatsType>({
    inputChars: 0,
    outputChars: 0,
    entitiesCount: 0,
    processingTime: 0,
    specialChars: 0,
  })
  const [selectedExample, setSelectedExample] = useState<string>("")

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const debouncedInputText = useDebounce(inputText, 500)

  // Load history from localStorage on component mount
  useEffect(() => {
    try {
      const historyJson = localStorage.getItem("htmlEncoderDecoderHistory")
      if (historyJson) {
        const parsedHistory = JSON.parse(historyJson)
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory)
          setHistoryIndex(parsedHistory.length - 1)
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
        localStorage.setItem("htmlEncoderDecoderHistory", JSON.stringify(history))
      }
    } catch (error) {
      console.error("Error saving history:", error)
    }
  }, [history])

  // Process text
  const processText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("")
      setStats({
        inputChars: 0,
        outputChars: 0,
        entitiesCount: 0,
        processingTime: 0,
        specialChars: 0,
      })
      return
    }

    setIsProcessing(true)
    const startTime = performance.now()

    setTimeout(() => {
      try {
        let result = ""
        let entitiesCount = 0
        let specialChars = 0

        if (mode === "encode") {
          const encodeChar = (char: string) => {
            const code = char.charCodeAt(0)

            if (char === "&") {
              entitiesCount++
              specialChars++
              return "&amp;"
            }
            if (!encodeQuotes && (char === '"' || char === "'")) return char

            const shouldEncode =
              char === "<" ||
              char === ">" ||
              (encodeQuotes && (char === '"' || char === "'")) ||
              (encodeNonASCII && code > 127)

            if (!shouldEncode) return char

            if (char === "<" || char === ">" || (encodeQuotes && (char === '"' || char === "'"))) {
              specialChars++
            }
            if (encodeNonASCII && code > 127) {
              specialChars++
            }

            entitiesCount++

            switch (encodingType) {
              case "named":
                return namedEntities[char] || `&#${code};`
              case "decimal":
                return `&#${code};`
              case "hexadecimal":
                return `&#x${code.toString(16)};`
              default:
                return char
            }
          }

          result = Array.from(inputText).map(encodeChar).join("")
          if (!preserveNewlines) {
            result = result.replace(/\n/g, "")
          }
        } else {
          // Decode mode
          result = inputText

          // Count entities before decoding
          const namedMatches = (result.match(/&[a-zA-Z]+;/g) || []).length
          const decimalMatches = (result.match(/&#\d+;/g) || []).length
          const hexMatches = (result.match(/&#x[0-9a-f]+;/gi) || []).length
          entitiesCount = namedMatches + decimalMatches + hexMatches
          specialChars = entitiesCount

          // Replace named entities
          Object.entries(reverseNamedEntities).forEach(([entity, char]) => {
            result = result.replace(new RegExp(entity, "g"), char)
          })

          // Replace decimal entities
          result = result.replace(/&#(\d+);/g, (match, dec) => {
            return String.fromCharCode(Number.parseInt(dec, 10))
          })

          // Replace hexadecimal entities
          result = result.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
            return String.fromCharCode(Number.parseInt(hex, 16))
          })
        }

        setOutputText(result)

        // Update stats
        const endTime = performance.now()
        const newStats = {
          inputChars: inputText.length,
          outputChars: result.length,
          entitiesCount,
          processingTime: Math.round(endTime - startTime),
          specialChars,
        }
        setStats(newStats)

        // Add to history if result is different from current
        if (result !== (history[historyIndex] || {}).output) {
          const newHistoryItem: HistoryItem = {
            input: inputText,
            output: result,
            mode,
            encodingType: mode === "encode" ? encodingType : undefined,
            options:
              mode === "encode"
                ? {
                    preserveNewlines,
                    encodeQuotes,
                    encodeNonASCII,
                  }
                : undefined,
            timestamp: Date.now(),
            stats: newStats,
          }

          setHistory((prev) => {
            // If we're not at the end of history, truncate
            const relevantHistory = historyIndex < prev.length - 1 ? prev.slice(0, historyIndex + 1) : prev

            // Add new item and limit history length
            const newHistory = [...relevantHistory, newHistoryItem].slice(-MAX_HISTORY_LENGTH)
            setHistoryIndex(newHistory.length - 1)
            return newHistory
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        toast.error(`Processing error: ${errorMessage}`)
        console.error("Text processing error:", error)
      } finally {
        setIsProcessing(false)
      }
    }, 0)
  }, [inputText, mode, encodingType, encodeQuotes, preserveNewlines, encodeNonASCII, history, historyIndex])

  // Process text either automatically or manually
  useEffect(() => {
    if (autoProcess && debouncedInputText !== undefined) {
      processText()
    }
  }, [debouncedInputText, autoProcess, processText, mode, encodingType, encodeQuotes, preserveNewlines, encodeNonASCII])

  // Clipboard operations
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
    toast.success("Copied to clipboard!")
  }, [outputText])

  // Clear operations
  const handleClear = useCallback(() => {
    setInputText("")
    setOutputText("")
    setStats({
      inputChars: 0,
      outputChars: 0,
      entitiesCount: 0,
      processingTime: 0,
      specialChars: 0,
    })
    toast.success("Text Cleared!")
  }, [])

  // Paste operations
  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setInputText(clipboardText)
      toast.success("Text pasted from clipboard!")
    } catch {
      toast.error("Failed to read from clipboard")
    }
  }, [])

  // File operations
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    toast.loading("Reading file...", { id: "fileUpload" })

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        if (content) {
          setInputText(content)
          toast.success("File uploaded successfully", { id: "fileUpload" })
        }
        // Clear the file input for future uploads
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        toast.error(`File reading error: ${errorMessage}`, { id: "fileUpload" })
      } finally {
        setIsProcessing(false)
      }
    }

    reader.onerror = () => {
      toast.error("Failed to read file", { id: "fileUpload" })
      setIsProcessing(false)
    }

    reader.readAsText(file)
  }, [])

  const handleDownload = useCallback(() => {
    try {
      if (!outputText.trim()) {
        toast.error("No content to download")
        return
      }

      const element = document.createElement("a")
      const file = new Blob([outputText], { type: "text/html" })
      element.href = URL.createObjectURL(file)
      element.download = `${mode}d-html-${new Date().toISOString().slice(0, 10)}.html`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href)
      toast.success("File downloaded successfully")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Download error: ${errorMessage}`)
    }
  }, [outputText, mode])

  // History navigation
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const historyItem = history[newIndex]
      setInputText(historyItem.input)
      setOutputText(historyItem.output)
      setStats(historyItem.stats)
      setMode(historyItem.mode)

      if (historyItem.encodingType) {
        setEncodingType(historyItem.encodingType)
      }

      if (historyItem.options) {
        setPreserveNewlines(historyItem.options.preserveNewlines)
        setEncodeQuotes(historyItem.options.encodeQuotes)
        setEncodeNonASCII(historyItem.options.encodeNonASCII)
      }

      setHistoryIndex(newIndex)
      toast.success("Undone to previous state")
    } else {
      toast.error("No more history to undo")
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const historyItem = history[newIndex]
      setInputText(historyItem.input)
      setOutputText(historyItem.output)
      setStats(historyItem.stats)
      setMode(historyItem.mode)

      if (historyItem.encodingType) {
        setEncodingType(historyItem.encodingType)
      }

      if (historyItem.options) {
        setPreserveNewlines(historyItem.options.preserveNewlines)
        setEncodeQuotes(historyItem.options.encodeQuotes)
        setEncodeNonASCII(historyItem.options.encodeNonASCII)
      }

      setHistoryIndex(newIndex)
      toast.success("Redone to next state")
    } else {
      toast.error("No more history to redo")
    }
  }, [history, historyIndex])

  // Load example
  const handleExampleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value
      if (!value) return

      const example = examples.find((ex, index) => index.toString() === value)
      if (example) {
        setInputText(example.text)
        setMode("encode")
        toast.success(`Loaded example: ${example.name}`)
      }
      setSelectedExample("")
    },
    [setInputText, setMode],
  )

  // Swap input and output
  const swapTexts = useCallback(() => {
    setInputText(outputText)
    setMode(mode === "encode" ? "decode" : "encode")
    toast.success("Swapped input and output")
  }, [outputText, mode])

  // Export as JSON
  const exportAsJson = useCallback(() => {
    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        mode,
        encodingType: mode === "encode" ? encodingType : undefined,
        options:
          mode === "encode"
            ? {
                preserveNewlines,
                encodeQuotes,
                encodeNonASCII,
              }
            : undefined,
        stats,
        input: {
          text: inputText,
          charCount: inputText.length,
        },
        output: {
          text: outputText,
          charCount: outputText.length,
        },
      }

      const jsonString = JSON.stringify(exportData, null, 2)
      const element = document.createElement("a")
      const file = new Blob([jsonString], { type: "application/json" })
      element.href = URL.createObjectURL(file)
      element.download = `html_${mode}_${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href)
      toast.success("Analysis exported as JSON")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Export error: ${errorMessage}`)
    }
  }, [inputText, outputText, stats, mode, encodingType, preserveNewlines, encodeQuotes, encodeNonASCII])

  return (
    <ToolLayout
      title="HTML Encoder/Decoder"
      description="Convert between plain text and HTML entities with multiple encoding options"
      toolId="678f382926f06f912191bc87"
    >
      <div className="flex flex-col gap-6">
        {/* Main Tool Card */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardHeader className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {mode === "encode" ? <Code size={20} /> : <FileText size={20} />}
              </div>
              <div>
                <h2 className="text-xl font-bold">HTML {mode === "encode" ? "Encoder" : "Decoder"}</h2>
                <p className="text-xs text-default-500">
                  {mode === "encode" ? "Convert text to HTML entities" : "Convert HTML entities back to plain text"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button
                color={mode === "encode" ? "primary" : "default"}
                onPress={() => setMode("encode")}
                startContent={<Code size={18} />}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                Encode
              </Button>
              <Button
                color={mode === "decode" ? "primary" : "default"}
                onPress={() => setMode("decode")}
                startContent={<FileText size={18} />}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                Decode
              </Button>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="p-4 md:p-6">
            {/* Input and Output Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Input Area */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary-500">Input Text</span>
                    {inputText && (
                      <Badge color="primary" variant="flat" size="sm">
                        {inputText.length} chars
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button isIconOnly size="sm" variant="light" color="primary" onPress={handlePaste} title="Paste from clipboard">
                      <Clipboard size={16} />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={handleClear}
                      isDisabled={!inputText}
                      title="Clear text"
                    >
                      <RefreshCw size={16} />
                    </Button>
                  </div>
                </div>

                <Textarea
                  value={inputText}
                  onValueChange={setInputText}
                  placeholder={
                    mode === "encode" ? "Enter text to encode to HTML entities..." : "Enter HTML entities to decode..."
                  }
                  minRows={10}
                  classNames={{
                    base: "w-full",
                    input: "resize-none",
                  }}
                  variant="bordered"
                  isDisabled={isProcessing}
                />

                <div className="flex flex-wrap gap-2 mt-1">
                  <Button
                    size="sm"
                    color="primary"
                    onPress={processText}
                    isDisabled={isProcessing || !inputText}
                    startContent={isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
                    className="flex-1 sm:flex-none"
                  >
                    {isProcessing ? "Processing..." : mode === "encode" ? "Encode" : "Decode"}
                  </Button>

                  <label htmlFor="file-upload" className="cursor-pointer flex-1 sm:flex-none">
                    <Button
                      as="span"
                      size="sm"
                      color="primary"
                      variant="flat"
                      isDisabled={isProcessing}
                      startContent={<FileUp size={16} />}
                      className="w-full"
                    >
                      Upload File
                    </Button>
                    <input
                      id="file-upload"
                      ref={fileInputRef}
                      type="file"
                      accept=".html,.htm,.txt,.xml"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <Select
                    size="sm"
                    variant="bordered"
                    label="Load Example"
                    placeholder="Select an example"
                    selectedKeys={[selectedExample]}
                    onChange={handleExampleChange}
                    className="flex-1"
                  >
                    {examples.map((example, index) => (
                      <SelectItem key={index.toString()} value={index.toString()} className="text-default-700">
                        {example.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Output Area */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-success-500">{mode === "encode" ? "Encoded HTML" : "Decoded Text"}</span>
                    {outputText && (
                      <Badge color="success" variant="flat" size="sm">
                        {outputText.length} chars
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="primary"
                      onPress={handleCopy}
                      isDisabled={!outputText}
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="warning"
                      onPress={swapTexts}
                      isDisabled={!outputText}
                      title="Use as input"
                    >
                      <ArrowLeftRight size={16} />
                    </Button>
                  </div>
                </div>

                <Textarea
                  value={outputText}
                  isReadOnly
                  placeholder={
                    mode === "encode" ? "Encoded HTML will appear here..." : "Decoded text will appear here..."
                  }
                  minRows={10}
                  classNames={{
                    base: "w-full",
                    input: "resize-none font-mono text-sm",
                  }}
                  variant="bordered"
                />

                <div className="flex flex-col sm:flex-row gap-2 mt-1 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-none gap-2 w-full sm:w-auto sm:flex sm:flex-row">
                    <Button
                      size="sm"
                      color="primary"
                      onPress={handleCopy}
                      isDisabled={!outputText}
                      startContent={<Copy size={16} />}
                      className="w-full sm:w-auto"
                    >
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      onPress={handleDownload}
                      isDisabled={!outputText}
                      startContent={<Download size={16} />}
                      className="w-full sm:w-auto"
                    >
                      Download
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={swapTexts}
                    isDisabled={!outputText}
                    startContent={<ArrowLeftRight size={16} />}
                    className="w-full sm:w-auto mt-1 sm:mt-0"
                  >
                    Use as Input
                  </Button>
                </div>
                </div>
            </div>

            {/* Options and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Options Panel */}
              <Card className="bg-default-100/50 dark:bg-default-200/20">
                <CardHeader className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Options</span>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <Switch size="sm" isSelected={autoProcess} onValueChange={setAutoProcess}>
                        Auto Process
                      </Switch>
                    </div>

                    {mode === "encode" && (
                      <>
                        <Select
                          label="Encoding Type"
                          selectedKeys={[encodingType]}
                          onChange={(e) => setEncodingType(e.target.value as "named" | "decimal" | "hexadecimal")}
                          className="w-full"
                          size="sm"
                          variant="bordered"
                        >
                          {encodingOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              description={option.description}
                              className="text-default-700"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>

                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                          <Switch isSelected={preserveNewlines} onValueChange={setPreserveNewlines} size="sm">
                            Preserve newlines
                          </Switch>
                          <Switch isSelected={encodeQuotes} onValueChange={setEncodeQuotes} size="sm">
                            Encode quotes
                          </Switch>
                          <Switch isSelected={encodeNonASCII} onValueChange={setEncodeNonASCII} size="sm">
                            Encode non-ASCII
                          </Switch>
                        </div>
                      </>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={handleUndo}
                        isDisabled={historyIndex <= 0 || history.length === 0}
                        startContent={<Undo2 size={16} />}
                      >
                        Undo
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={handleRedo}
                        isDisabled={historyIndex >= history.length - 1 || history.length === 0}
                        startContent={<Redo2 size={16} />}
                      >
                        Redo
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={exportAsJson}
                        isDisabled={!outputText}
                        startContent={<FileJson size={16} />}
                      >
                        Export JSON
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Stats Panel */}
              <Card className="bg-default-100/50 dark:bg-default-200/20">
                <CardHeader className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Statistics</span>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-default-500">Input:</span>{" "}
                      <span className="font-medium">{stats.inputChars.toLocaleString()} chars</span>
                    </div>
                    <div>
                      <span className="text-default-500">Output:</span>{" "}
                      <span className="font-medium">{stats.outputChars.toLocaleString()} chars</span>
                    </div>
                    <div>
                      <span className="text-default-500">Entities:</span>{" "}
                      <span className="font-medium">{stats.entitiesCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-default-500">Special Chars:</span>{" "}
                      <span className="font-medium">{stats.specialChars.toLocaleString()}</span>
                    </div>
                  </div>

                  {stats.entitiesCount > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Entity Distribution</span>
                      </div>
                      <Progress
                        size="sm"
                        value={(stats.entitiesCount / stats.outputChars) * 100}
                        color="primary"
                        className="mb-1"
                        aria-label="Entity percentage"
                      />
                      <div className="flex justify-between text-xs text-default-500">
                        <span>{Math.round((stats.entitiesCount / stats.outputChars) * 100)}% entities</span>
                        <span>
                          {Math.round(((stats.outputChars - stats.entitiesCount) / stats.outputChars) * 100)}% plain
                          text
                        </span>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>

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
          </CardBody>

          <CardFooter className="flex justify-between items-center px-6 py-4 gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-default-500" />
              <span className="text-sm text-default-500">
                {mode === "encode"
                  ? "Encoding converts special characters to HTML entities"
                  : "Decoding converts HTML entities back to characters"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                color="primary"
                variant="flat"
                startContent={<Sparkles size={16} />}
                onPress={() => {
                  const randomIndex = Math.floor(Math.random() * examples.length)
                  setInputText(examples[randomIndex].text)
                  toast.success(`Loaded example: ${examples[randomIndex].name}`)
                }}
              >
                Random Example
              </Button>
            </div>
          </CardFooter>
        </Card>
        <InfoSection />
      </div>
      
    </ToolLayout>
  )
}
