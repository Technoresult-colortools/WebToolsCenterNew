"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Card,
  CardBody,
  Button,
  Textarea,
  Select,
  SelectItem,
  Switch,
  Tabs,
  Tab,
  Input,
  Chip,
  Tooltip,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react"
import {
  Copy,
  RefreshCw,
  Settings,
  FileDown,
  Code,
  Hexagon,
  Binary,
  FileCode,
  Download,
  Upload,
  RotateCw,
  Eye,
  EyeOff,
  ChevronDown,
  FileText,
  History,
  Braces,
  Hash,
  Cpu,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./InfoSection"

const outputFormatOptions = [
  { value: "space", label: "Space Separated" },
  { value: "comma", label: "Comma Separated" },
  { value: "none", label: "No Separator" },
  { value: "newline", label: "New Line" },
  { value: "custom", label: "Custom Separator" },
]

const additionalFormats = [
  { value: "base64", label: "Base64", icon: <FileCode size={16} /> },
  { value: "octal", label: "Octal", icon: <Hash size={16} /> },
  { value: "url", label: "URL Encoded", icon: <Braces size={16} /> },
  { value: "decimal", label: "Decimal", icon: <Cpu size={16} /> },
]

const presetTexts = [
  { label: "Hello World", value: "Hello World" },
  { label: "ASCII Table (Basic)", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789" },
  { label: "Special Characters", value: "!@#$%^&*()_+-=[]{}|;':\",./<>?" },
  { label: "Lorem Ipsum", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
]

export default function TextToAsciiHexBinary() {
  // State for input text and conversion results
  const [inputText, setInputText] = useState("")
  const [asciiResult, setAsciiResult] = useState("")
  const [hexResult, setHexResult] = useState("")
  const [binaryResult, setBinaryResult] = useState("")
  const [base64Result, setBase64Result] = useState("")
  const [octalResult, setOctalResult] = useState("")
  const [urlEncodedResult, setUrlEncodedResult] = useState("")
  const [decimalResult, setDecimalResult] = useState("")

  // State for options and settings
  const [outputFormat, setOutputFormat] = useState("space")
  const [customSeparator, setCustomSeparator] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [showLineNumbers, setShowLineNumbers] = useState(false)
  const [groupDigits, setGroupDigits] = useState(false)
  const [bytePadding, setBytePadding] = useState(true)
  const [conversionDirection, setConversionDirection] = useState("encode")
  const [selectedTab, setSelectedTab] = useState("ascii")
  const [showPreview, setShowPreview] = useState(true)
  const [activeFormats, setActiveFormats] = useState(["base64"])
  const [conversionHistory, setConversionHistory] = useState<Array<{ text: string; type: string; timestamp: number }>>(
    [],
  )

  // Derived state
  const effectiveSeparator = useMemo(() => {
    if (outputFormat === "space") return " "
    if (outputFormat === "comma") return ","
    if (outputFormat === "newline") return "\n"
    if (outputFormat === "custom") return customSeparator
    return ""
  }, [outputFormat, customSeparator])

  // Stats
  const stats = useMemo(() => {
    if (!inputText)
      return {
        charCount: 0,
        byteSize: 0,
        wordCount: 0,
        lineCount: 0,
      }

    return {
      charCount: inputText.length,
      byteSize: new Blob([inputText]).size,
      wordCount: inputText.split(/\s+/).filter(Boolean).length,
      lineCount: inputText.split(/\r\n|\r|\n/).length,
    }
  }, [inputText])

  // Conversion functions
  const convertToAscii = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Attempt to convert from ASCII to text
          return text
            .split(effectiveSeparator)
            .filter(Boolean)
            .map((code) => String.fromCharCode(Number.parseInt(code, 10)))
            .join("")
        } catch {
          toast.error("Invalid ASCII format for decoding")
          return ""
        }
      } else {
        // Convert from text to ASCII
        const processedText = caseSensitive ? text : text.toLowerCase()
        return processedText
          .split("")
          .map((char, index) => {
            const code = char.charCodeAt(0)
            return showLineNumbers ? `${index + 1}:${code}` : code
          })
          .join(effectiveSeparator)
      }
    },
    [caseSensitive, effectiveSeparator, showLineNumbers, conversionDirection],
  )

  const convertToHex = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Attempt to convert from hex to text
          const hexValues = text.split(effectiveSeparator).filter(Boolean)
          return hexValues.map((hex) => String.fromCharCode(Number.parseInt(hex, 16))).join("")
        } catch {
          toast.error("Invalid hexadecimal format for decoding")
          return ""
        }
      } else {
        // Convert from text to hex
        const processedText = caseSensitive ? text : text.toLowerCase()
        return processedText
          .split("")
          .map((char, index) => {
            const hex = char
              .charCodeAt(0)
              .toString(16)
              .padStart(bytePadding ? 2 : 0, "0")
            return showLineNumbers ? `${index + 1}:${hex}` : hex
          })
          .join(effectiveSeparator)
      }
    },
    [caseSensitive, effectiveSeparator, bytePadding, showLineNumbers, conversionDirection],
  )

  const convertToBinary = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Attempt to convert from binary to text
          const binaryValues = text.split(effectiveSeparator).filter(Boolean)
          return binaryValues.map((binary) => String.fromCharCode(Number.parseInt(binary, 2))).join("")
        } catch {
          toast.error("Invalid binary format for decoding")
          return ""
        }
      } else {
        // Convert from text to binary
        const processedText = caseSensitive ? text : text.toLowerCase()
        return processedText
          .split("")
          .map((char, index) => {
            let binary = char.charCodeAt(0).toString(2)
            if (bytePadding) {
              binary = binary.padStart(8, "0")
            }
            if (groupDigits) {
              binary = binary.match(/.{1,4}/g)?.join(" ") || binary
            }
            return showLineNumbers ? `${index + 1}:${binary}` : binary
          })
          .join(effectiveSeparator)
      }
    },
    [caseSensitive, effectiveSeparator, bytePadding, groupDigits, showLineNumbers, conversionDirection],
  )

  const convertToBase64 = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Attempt to convert from Base64 to text
          return atob(text)
        } catch {
          toast.error("Invalid Base64 format for decoding")
          return ""
        }
      } else {
        // Convert from text to Base64
        try {
          return btoa(text)
        } catch {
          toast.error("Text contains characters that cannot be encoded to Base64")
          return ""
        }
      }
    },
    [conversionDirection],
  )

  const convertToOctal = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Attempt to convert from octal to text
          const octalValues = text.split(effectiveSeparator).filter(Boolean)
          return octalValues.map((octal) => String.fromCharCode(Number.parseInt(octal, 8))).join("")
        } catch {
          toast.error("Invalid octal format for decoding")
          return ""
        }
      } else {
        // Convert from text to octal
        const processedText = caseSensitive ? text : text.toLowerCase()
        return processedText
          .split("")
          .map((char, index) => {
            const octal = char
              .charCodeAt(0)
              .toString(8)
              .padStart(bytePadding ? 3 : 0, "0")
            return showLineNumbers ? `${index + 1}:${octal}` : octal
          })
          .join(effectiveSeparator)
      }
    },
    [caseSensitive, effectiveSeparator, bytePadding, showLineNumbers, conversionDirection],
  )

  const convertToUrlEncoded = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Attempt to convert from URL encoded to text
          return decodeURIComponent(text)
        } catch {
          toast.error("Invalid URL encoded format for decoding")
          return ""
        }
      } else {
        // Convert from text to URL encoded
        try {
          return encodeURIComponent(text)
        } catch {
          toast.error("Error encoding text to URL format")
          return ""
        }
      }
    },
    [conversionDirection],
  )

  const convertToDecimal = useCallback(
    (text: string): string => {
      if (conversionDirection === "decode") {
        try {
          // Convert from decimal (Unicode code points) to text
          const codePoints = text.split(effectiveSeparator).filter(Boolean).map(Number)
          return String.fromCodePoint(...codePoints)
        } catch {
          toast.error("Invalid decimal format for decoding")
          return ""
        }
      } else {
        // Convert from text to decimal (Unicode code points)
        const codePoints = Array.from(text).map((char, index) => {
          const codePoint = char.codePointAt(0) || 0
          return showLineNumbers ? `${index + 1}:${codePoint}` : codePoint
        })
        return codePoints.join(effectiveSeparator)
      }
    },
    [effectiveSeparator, showLineNumbers, conversionDirection],
  )

  // Perform conversions when input or settings change
  useEffect(() => {
    if (inputText) {
      setAsciiResult(convertToAscii(inputText))
      setHexResult(convertToHex(inputText))
      setBinaryResult(convertToBinary(inputText))
      setBase64Result(convertToBase64(inputText))
      setOctalResult(convertToOctal(inputText))
      setUrlEncodedResult(convertToUrlEncoded(inputText))
      setDecimalResult(convertToDecimal(inputText))
    } else {
      setAsciiResult("")
      setHexResult("")
      setBinaryResult("")
      setBase64Result("")
      setOctalResult("")
      setUrlEncodedResult("")
      setDecimalResult("")
    }
  }, [
    inputText,
    convertToAscii,
    convertToHex,
    convertToBinary,
    convertToBase64,
    convertToOctal,
    convertToUrlEncoded,
    convertToDecimal,
  ])

  // Handle conversion from encoded formats back to text
  const handleDecode = useCallback(() => {
    if (!inputText) {
      toast.error("Please enter text to decode")
      return
    }

    let decodedText = ""
    try {
      switch (selectedTab) {
        case "ascii":
          decodedText = convertToAscii(inputText)
          break
        case "hex":
          decodedText = convertToHex(inputText)
          break
        case "binary":
          decodedText = convertToBinary(inputText)
          break
        case "base64":
          decodedText = convertToBase64(inputText)
          break
        case "octal":
          decodedText = convertToOctal(inputText)
          break
        case "url":
          decodedText = convertToUrlEncoded(inputText)
          break
        case "decimal":
          decodedText = convertToDecimal(inputText)
          break
        default:
          toast.error("Please select a format to decode from")
          return
      }

      if (decodedText) {
        // Add to history
        setConversionHistory((prev) => [
          { text: inputText, type: `decode-${selectedTab}`, timestamp: Date.now() },
          ...prev.slice(0, 9),
        ])

        setInputText(decodedText)
        toast.success(`Successfully decoded from ${selectedTab.toUpperCase()}`)
      }
    } catch (error) {
      toast.error(`Failed to decode: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }, [
    inputText,
    selectedTab,
    convertToAscii,
    convertToHex,
    convertToBinary,
    convertToBase64,
    convertToOctal,
    convertToUrlEncoded,
    convertToDecimal,
  ])

  // Utility functions
  const handleCopy = useCallback(
    (text: string, format: string) => {
      navigator.clipboard.writeText(text)
      toast.success(`${format} copied to clipboard!`)

      // Add to history
      setConversionHistory((prev) => [
        { text: inputText, type: `copy-${format}`, timestamp: Date.now() },
        ...prev.slice(0, 9),
      ])
    },
    [inputText],
  )

  const handleClear = useCallback(() => {
    setInputText("")
    setAsciiResult("")
    setHexResult("")
    setBinaryResult("")
    setBase64Result("")
    setOctalResult("")
    setUrlEncodedResult("")
    setDecimalResult("")
    toast.success("Text Cleared!")
  }, [])

  const handleDownload = useCallback(
    (content: string, fileType: string) => {
      const element = document.createElement("a")
      const file = new Blob([content], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `converted_${fileType}_${new Date().toISOString().slice(0, 10)}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      // Add to history
      setConversionHistory((prev) => [
        { text: inputText, type: `download-${fileType}`, timestamp: Date.now() },
        ...prev.slice(0, 9),
      ])

      toast.success(`${fileType.toUpperCase()} downloaded successfully!`)
    },
    [inputText],
  )

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (limit to 1MB)
    if (file.size > 1024 * 1024) {
      toast.error("File too large. Please upload a file smaller than 1MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInputText(content)
      toast.success("File uploaded successfully!")
    }
    reader.onerror = () => {
      toast.error("Error reading file")
    }
    reader.readAsText(file)
  }, [])

  const handleLoadPreset = useCallback((text: string) => {
    setInputText(text)
    toast.success("Preset text loaded!")
  }, [])

  const handleToggleFormat = useCallback((format: string) => {
    setActiveFormats((prev) => {
      if (prev.includes(format)) {
        return prev.filter((f) => f !== format)
      } else {
        return [...prev, format]
      }
    })
  }, [])

  const handleExportAll = useCallback(() => {
    const allResults = {
      input: inputText,
      ascii: asciiResult,
      hex: hexResult,
      binary: binaryResult,
      base64: base64Result,
      octal: activeFormats.includes("octal") ? octalResult : undefined,
      urlEncoded: activeFormats.includes("url") ? urlEncodedResult : undefined,
      decimal: activeFormats.includes("decimal") ? decimalResult : undefined,
      settings: {
        outputFormat,
        caseSensitive,
        showLineNumbers,
        groupDigits,
        bytePadding,
      },
      stats,
      timestamp: new Date().toISOString(),
    }

    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(allResults, null, 2)], { type: "application/json" })
    element.href = URL.createObjectURL(file)
    element.download = `text_conversion_results_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast.success("All conversion results exported!")
  }, [
    inputText,
    asciiResult,
    hexResult,
    binaryResult,
    base64Result,
    octalResult,
    urlEncodedResult,
    decimalResult,
    outputFormat,
    caseSensitive,
    showLineNumbers,
    groupDigits,
    bytePadding,
    stats,
    activeFormats,
  ])

  // Get the current result based on selected tab
  const getCurrentResult = useCallback(() => {
    switch (selectedTab) {
      case "ascii":
        return asciiResult
      case "hex":
        return hexResult
      case "binary":
        return binaryResult
      case "base64":
        return base64Result
      case "octal":
        return octalResult
      case "url":
        return urlEncodedResult
      case "decimal":
        return decimalResult
      default:
        return ""
    }
  }, [selectedTab, asciiResult, hexResult, binaryResult, base64Result, octalResult, urlEncodedResult, decimalResult])

  // Preview text (truncated if needed)
  const previewText = useMemo(() => {
    const result = getCurrentResult()
    if (result.length <= 100) return result
    return result.substring(0, 100) + "..."
  }, [getCurrentResult])

  return (
    <ToolLayout
      title="Text to ASCII/Hex/Binary Converter"
      description="Convert plain text into ASCII, hexadecimal, binary, and more with advanced options and bidirectional conversion."
      toolId="678f382926f06f912191bc84"
    >
      <div className="flex flex-col gap-6">
        {/* Main conversion area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input panel */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2">
                    <FileText size={18} />
                    Input Text
                  </h2>
                  <div className="flex gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="flat" size="sm" endContent={<ChevronDown size={16} />}>
                          Presets
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Preset texts">
                        {presetTexts.map((preset) => (
                          <DropdownItem key={preset.label} onClick={() => handleLoadPreset(preset.value)}>
                            {preset.label}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>

                    <Tooltip content="Upload text file" className="text-default-700">
                      <Button isIconOnly variant="flat" size="sm" aria-label="Upload file">
                        <label className="cursor-pointer flex items-center justify-center w-full h-full">
                          <Upload size={16} />
                          <input
                            type="file"
                            accept=".txt,.md,.json,.csv,.html,.xml,.js,.css,.py"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </Button>
                    </Tooltip>

                    <Tooltip content="Clear text" className="text-default-700">
                      <Button
                        isIconOnly
                        variant="flat"
                        color="danger"
                        size="sm"
                        aria-label="Clear text"
                        onClick={handleClear}
                      >
                        <RefreshCw size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                <Textarea
                  value={inputText}
                  onValueChange={setInputText}
                  placeholder="Type or paste your text here..."
                  minRows={8}
                  className="w-full"
                  variant="bordered"
                />

                <div className="flex flex-wrap gap-2 text-xs text-default-500">
                  <Chip size="sm" variant="flat">
                    Characters: {stats.charCount}
                  </Chip>
                  <Chip size="sm" variant="flat">
                    Bytes: {stats.byteSize}
                  </Chip>
                  <Chip size="sm" variant="flat">
                    Words: {stats.wordCount}
                  </Chip>
                  <Chip size="sm" variant="flat">
                    Lines: {stats.lineCount}
                  </Chip>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <RadioGroup
                    orientation="horizontal"
                    value={conversionDirection}
                    onValueChange={(value: string) => setConversionDirection(value)}
                    size="sm"
                  >
                    <Radio value="encode">Encode</Radio>
                    <Radio value="decode">Decode</Radio>
                  </RadioGroup>

                  {conversionDirection === "decode" && (
                    <Button color="primary" size="sm" startContent={<RotateCw size={16} />} onClick={handleDecode}>
                      Decode from {selectedTab.toUpperCase()}
                    </Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Output panel */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-success-600 dark:text-success-400 flex items-center gap-2">
                    <Code size={18} />
                    Conversion Results
                  </h2>
                  <div className="flex gap-2">
                    <Tooltip content={showPreview ? "Hide preview" : "Show preview"} className="text-default-700">
                      <Button
                        isIconOnly
                        variant="flat"
                        size="sm"
                        aria-label={showPreview ? "Hide preview" : "Show preview"}
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </Tooltip>

                    <Tooltip content="Export all results" className="text-default-700">
                      <Button
                        isIconOnly
                        variant="flat"
                        size="sm"
                        aria-label="Export all results"
                        onClick={handleExportAll}
                      >
                        <FileDown size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                <Tabs
                  aria-label="Conversion formats"
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  classNames={{
                    tabList: "gap-2 w-full relative rounded-lg p-1 bg-default-100 dark:bg-default-200/50",
                    cursor: "bg-white dark:bg-default-50",
                    tab: "max-w-fit px-3 h-8 text-xs",
                    tabContent: "group-data-[selected=true]:text-default-800",
                  }}
                >
                  <Tab
                    key="ascii"
                    title={
                      <div className="flex items-center gap-1">
                        <Code size={14} />
                        <span>ASCII</span>
                      </div>
                    }
                  />
                  <Tab
                    key="hex"
                    title={
                      <div className="flex items-center gap-1">
                        <Hexagon size={14} />
                        <span>Hex</span>
                      </div>
                    }
                  />
                  <Tab
                    key="binary"
                    title={
                      <div className="flex items-center gap-1">
                        <Binary size={14} />
                        <span>Binary</span>
                      </div>
                    }
                  />
                  <Tab
                    key="base64"
                    title={
                      <div className="flex items-center gap-1">
                        <FileCode size={14} />
                        <span>Base64</span>
                      </div>
                    }
                  />

                  {activeFormats.includes("octal") && (
                    <Tab
                      key="octal"
                      title={
                        <div className="flex items-center gap-1">
                          <Hash size={14} />
                          <span>Octal</span>
                        </div>
                      }
                    />
                  )}

                  {activeFormats.includes("url") && (
                    <Tab
                      key="url"
                      title={
                        <div className="flex items-center gap-1">
                          <Braces size={14} />
                          <span>URL</span>
                        </div>
                      }
                    />
                  )}

                  {activeFormats.includes("decimal") && (
                    <Tab
                      key="decimal"
                      title={
                        <div className="flex items-center gap-1">
                          <Cpu size={14} />
                          <span>Decimal</span>
                        </div>
                      }
                    />
                  )}
                </Tabs>

                {showPreview && previewText && (
                  <div className="bg-default-100 dark:bg-default-200/50 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                    {previewText}
                  </div>
                )}

                <Textarea
                  value={getCurrentResult()}
                  isReadOnly
                  placeholder={`${selectedTab.toUpperCase()} result will appear here...`}
                  minRows={6}
                  className="w-full font-mono"
                  variant="bordered"
                />

                <div className="flex flex-wrap gap-2">
                  <Button
                    color="primary"
                    size="sm"
                    startContent={<Copy size={16} />}
                    onClick={() => handleCopy(getCurrentResult(), selectedTab)}
                  >
                    Copy
                  </Button>

                  <Button
                    color="primary"
                    variant="flat"
                    size="sm"
                    startContent={<Download size={16} />}
                    onClick={() => handleDownload(getCurrentResult(), selectedTab)}
                  >
                    Download
                  </Button>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="flat" size="sm" endContent={<ChevronDown size={16} />}>
                        Add Format
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Additional formats" className="text-default-700">
                      {additionalFormats.map((format) => (
                        <DropdownItem
                          key={format.value}
                          startContent={format.icon}
                          onClick={() => handleToggleFormat(format.value)}
                          className={activeFormats.includes(format.value) ? "text-primary" : ""}
                        >
                          {format.label}
                          {activeFormats.includes(format.value) && <span className="ml-2">✓</span>}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Options panel */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Settings size={18} />
                Conversion Options
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Select
                    label="Output Separator"
                    selectedKeys={[outputFormat]}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full"
                    variant="bordered"
                  >
                    {outputFormatOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-default-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>

                  {outputFormat === "custom" && (
                    <Input
                      label="Custom Separator"
                      value={customSeparator}
                      onChange={(e) => setCustomSeparator(e.target.value)}
                      className="mt-2 w-full"
                      variant="bordered"
                      placeholder="Enter custom separator"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Switch isSelected={caseSensitive} onValueChange={setCaseSensitive} size="sm">
                    Case Sensitive
                  </Switch>

                  <Switch isSelected={showLineNumbers} onValueChange={setShowLineNumbers} size="sm">
                    Show Line Numbers
                  </Switch>
                </div>

                <div className="flex flex-col gap-3">
                  <Switch isSelected={bytePadding} onValueChange={setBytePadding} size="sm">
                    Byte Padding (0-prefix)
                  </Switch>

                  <Switch
                    isSelected={groupDigits}
                    onValueChange={setGroupDigits}
                    size="sm"
                    isDisabled={selectedTab !== "binary"}
                  >
                    Group Binary Digits
                  </Switch>
                </div>
              </div>

              {conversionHistory.length > 0 && (
                <>
                  <Divider className="my-2" />

                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <History size={16} />
                      Recent Conversions
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {conversionHistory.slice(0, 5).map((item, index) => (
                        <Chip
                          key={index}
                          variant="flat"
                          size="sm"
                          color="primary"
                          className="cursor-pointer"
                          onClick={() => setInputText(item.text)}
                        >
                          {item.type.split("-")[0]} {item.type.split("-")[1]}
                          <span className="ml-1 opacity-60">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </Chip>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardBody>
        </Card>
        <InfoSection />

      </div>
    </ToolLayout>
  )
}
