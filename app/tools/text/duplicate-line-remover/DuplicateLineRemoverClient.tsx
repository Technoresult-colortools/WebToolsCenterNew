"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardBody, Button, Textarea, Select, SelectItem, Switch, Tabs, Tab, Input, Progress, Badge, Tooltip, } from "@nextui-org/react"
import Image from "next/image"
import {
  Copy,
  RefreshCw,
  Info,
  BookOpen,
  Settings,
  FileDown,
  FileUp,
  Filter,
  Zap,
  ArrowDown,
  ArrowUp,
  RotateCcw,
  RotateCw,
  Play,
  FileDiff,
  Cpu,
  Hash,
  ToggleLeft,
  Clock,
} from "lucide-react"
import { toast } from "react-hot-toast"
import { Key } from '@react-types/shared';
import ToolLayout from "@/components/ToolLayout"
import { useDebounce } from "@/hooks/useDebounce" // You'll need to create this hook

const filterModeOptions = [
  { value: "remove", label: "Remove duplicates" },
  { value: "keep", label: "Keep only duplicates" },
  { value: "highlight", label: "Highlight duplicates" },
]

const MAX_HISTORY_LENGTH = 10

// Define TypeScript interfaces for our data structures
interface StatsType {
  inputLines: number;
  outputLines: number;
  duplicatesFound: number;
  processingTime: number;
}

interface HistorySettings {
  caseSensitive: boolean;
  trimWhitespace: boolean;
  keepFirstOccurrence: boolean;
  ignoreEmptyLines: boolean;
  filterMode: string;
  useRegex: boolean;
  regexPattern: string;
}

interface HistoryItem {
  input: string;
  output: string;
  settings: HistorySettings;
  stats: StatsType;
}

export default function DuplicateLineRemover() {
  // States
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [keepFirstOccurrence, setKeepFirstOccurrence] = useState(true)
  const [addLineNumbers, setAddLineNumbers] = useState(false)
  const [startingLineNumber, setStartingLineNumber] = useState(1)
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(false)
  const [customSeparator, setCustomSeparator] = useState("")
  const [filterMode, setFilterMode] = useState("remove")
  const [autoProcess, setAutoProcess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [regexPattern, setRegexPattern] = useState("")
  const [useRegex, setUseRegex] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [stats, setStats] = useState<StatsType>({
    inputLines: 0,
    outputLines: 0,
    duplicatesFound: 0,
    processingTime: 0,
  })
  const [activeTab, setActiveTab] = useState<Key>("output");

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const debouncedInputText = useDebounce(inputText, 500)

  // Process text with performance improvements and better logic
  const processText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("")
      setStats({
        inputLines: 0,
        outputLines: 0,
        duplicatesFound: 0,
        processingTime: 0,
      })
      return
    }

    setIsProcessing(true)
    const startTime = performance.now()

    // Use setTimeout to prevent UI freeze for large inputs
    setTimeout(() => {
      try {
        const lines = inputText.split(customSeparator || "\n")
        const seen = new Map<string, { index: number; count: number }>() // Map instead of Set to track occurrences and indices
        const result: string[] = []
        const duplicateIndices = new Set<number>()
        let duplicateCount = 0

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i]
          if (trimWhitespace) {
            line = line.trim()
          }
          if (ignoreEmptyLines && line === "") {
            continue
          }

          // Apply regex filter if enabled
          if (useRegex && regexPattern) {
            try {
              const regex = new RegExp(regexPattern, caseSensitive ? "" : "i")
              if (!regex.test(line)) {
                continue
              }
            } catch (e) {
              // Skip regex on error, but continue processing
            }
          }

          const key = caseSensitive ? line : line.toLowerCase()

          // Improved duplicate detection logic
          if (!seen.has(key)) {
            seen.set(key, { index: i, count: 1 })
            if (filterMode !== "keep") {
              result.push(line)
            }
          } else {
            const entry = seen.get(key)
            if (entry) {
              entry.count++
              seen.set(key, entry)
              duplicateIndices.add(i)
              duplicateCount++

              if (filterMode === "keep") {
                if (entry.count === 2 && keepFirstOccurrence) {
                  // If this is the second occurrence and we want to keep the first one,
                  // add the first occurrence to the result
                  result.push(lines[entry.index])
                }
                result.push(line)
              } else if (filterMode === "highlight") {
                result.push(line) // We'll highlight these later
              }
            }
          }
        }

        // Generate the output text
        let outputLines: string[] = []
        if (filterMode === "highlight") {
          // For highlight mode, include all lines but mark duplicates
          outputLines = inputText.split(customSeparator || "\n").map((line, i) => {
            const processedLine = trimWhitespace ? line.trim() : line
            const key = caseSensitive ? processedLine : processedLine.toLowerCase()
            const entry = seen.get(key)
            const isDuplicate = entry && entry.count > 1
            
            if (isDuplicate) {
              // Simple highlighting with markdown-style markers
              return `>> ${line} <<`
            }
            return line
          })
        } else {
          outputLines = result
        }

        if (addLineNumbers) {
          // Format line numbers with consistent padding
          const digits = (outputLines.length + startingLineNumber).toString().length
          const formattedLines = outputLines.map(
            (line, index) => `${(index + startingLineNumber).toString().padStart(digits, " ")}  ${line}`
          )
          setOutputText(formattedLines.join("\n"))
        } else {
          setOutputText(outputLines.join("\n"))
        }

        // Update stats
        const endTime = performance.now()
        setStats({
          inputLines: lines.length,
          outputLines: outputLines.length,
          duplicatesFound: duplicateCount,
          processingTime: Math.round(endTime - startTime),
        })

        // Add to history if result is different from current
        if (outputLines.join("\n") !== (history[historyIndex] || {}).output) {
          const newHistoryItem: HistoryItem = {
            input: inputText,
            output: outputLines.join("\n"),
            settings: {
              caseSensitive,
              trimWhitespace,
              keepFirstOccurrence,
              ignoreEmptyLines,
              filterMode,
              useRegex,
              regexPattern,
            },
            stats: {
              inputLines: lines.length,
              outputLines: outputLines.length,
              duplicatesFound: duplicateCount,
              processingTime: Math.round(endTime - startTime),
            },
          }

          setHistory(prev => {
            // If we're not at the end of history, truncate
            const relevantHistory = historyIndex < prev.length - 1 
              ? prev.slice(0, historyIndex + 1) 
              : prev

            // Add new item and limit history length
            const newHistory = [...relevantHistory, newHistoryItem].slice(-MAX_HISTORY_LENGTH)
            setHistoryIndex(newHistory.length - 1)
            return newHistory
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Processing error: ${errorMessage}`)
        console.error("Text processing error:", error)
      } finally {
        setIsProcessing(false)
      }
    }, 0)
  }, [
    inputText,
    caseSensitive,
    trimWhitespace,
    keepFirstOccurrence,
    addLineNumbers,
    startingLineNumber,
    ignoreEmptyLines,
    customSeparator,
    filterMode,
    useRegex,
    regexPattern,
    history,
    historyIndex,
  ])

  // Process text either automatically or manually
  useEffect(() => {
    if (autoProcess && debouncedInputText !== undefined) {
      processText()
    }
  }, [debouncedInputText, autoProcess, processText])

  // Clipboard operations
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }, [])

  // Clear operations
  const handleClear = useCallback(() => {
    setInputText("")
    setOutputText("")
    setStats({
      inputLines: 0,
      outputLines: 0,
      duplicatesFound: 0,
      processingTime: 0,
    })
    toast.success("Text Cleared!")
  }, [])

  // Sorting operations
  const handleSort = useCallback(
    (ascending: boolean) => {
      if (!outputText.trim()) return
      
      setIsProcessing(true)
      setTimeout(() => {
        try {
          const sortedLines = outputText.split("\n").sort((a, b) => {
            if (ascending) {
              return a.localeCompare(b)
            } else {
              return b.localeCompare(a)
            }
          })
          setOutputText(sortedLines.join("\n"))
          toast.success(`Lines sorted ${ascending ? "ascending" : "descending"}`)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          toast.error(`Sorting error: ${errorMessage}`)
        } finally {
          setIsProcessing(false)
        }
      }, 0)
    },
    [outputText],
  )

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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
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

  const handleDownload = useCallback((content: string, fileType: string) => {
    try {
      const element = document.createElement("a")
      const file = new Blob([content], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `processed_${fileType}_${new Date().toISOString().slice(0,10)}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href) // Clean up
      toast.success("File downloaded successfully")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Download error: ${errorMessage}`)
    }
  }, [])

  // History navigation
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const historyItem = history[newIndex]
      setInputText(historyItem.input)
      setOutputText(historyItem.output)
      setStats(historyItem.stats)
      // Optionally restore settings
      // setSettings(historyItem.settings)
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
      // Optionally restore settings
      // setSettings(historyItem.settings)
      setHistoryIndex(newIndex)
      toast.success("Redone to next state")
    } else {
      toast.error("No more history to redo")
    }
  }, [history, historyIndex])

  // Generate diff view
  const generateDiff = useCallback((): string => {
    // Early return with empty string if inputs aren't valid
    if (!inputText || !outputText) {
      return "";
    }
    
    // Create a simple line-by-line diff
    const inputLines = inputText.split("\n");
    const outputLines = outputText.split("\n");
    
    let diffText = "";
    const maxLength = Math.max(inputLines.length, outputLines.length);
    
    for (let i = 0; i < maxLength; i++) {
      const inputLine = i < inputLines.length ? inputLines[i] : "";
      const outputLine = i < outputLines.length ? outputLines[i] : "";
      
      if (inputLine === outputLine) {
        diffText += ` ${inputLine}\n`;
      } else if (inputLine === "") {
        diffText += `+${outputLine}\n`;
      } else if (outputLine === "") {
        diffText += `-${inputLine}\n`;
      } else {
        diffText += `-${inputLine}\n+${outputLine}\n`;
      }
    }
    
    return diffText;
  }, [inputText, outputText]);

  return (
    <ToolLayout
      title="Duplicate Line Remover"
      description="Clean up your text by removing or keeping duplicate lines with advanced options"
      toolId="678f382926f06f912191bc86"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Input Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-md font-semibold">Input Text</div>
                <div className="text-sm text-default-500">
                  {stats.inputLines > 0 && (
                    <Badge color="primary" variant="flat">
                      {stats.inputLines.toLocaleString()} lines
                    </Badge>
                  )}
                </div>
              </div>
              
              <Textarea
                value={inputText}
                onValueChange={setInputText}
                placeholder="Type or paste your text here"
                minRows={4}
                className="w-full mb-2"
                variant="bordered"
                isDisabled={isProcessing}
              />
              
              <div className="flex justify-end">
                <Button
                  size="sm"
                  color="primary"
                  variant="light"
                  onPress={() => handleCopy(inputText)}
                  isDisabled={!inputText}
                  startContent={<Copy size={16} />}
                >
                  Copy Input
                </Button>
              </div>
            </div>
            
            {/* Options Panel */}
            <Card className="mb-6">
              <CardBody>
                <Tabs 
                  aria-label="Options"
                  color="primary"
                  size="sm"
                  classNames={{
                    base: "mb-4",
                    tabList: "bg-default-100 p-1",
                  }}
                >
                  <Tab
                    key="basic"
                    title={
                      <div className="flex items-center gap-1">
                        <Settings size={16} />
                        <span>Basic Options</span>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-3">
                        <Switch 
                          isSelected={caseSensitive} 
                          onValueChange={setCaseSensitive}
                          size="sm"
                        >
                          Case Sensitive
                        </Switch>
                        
                        <Switch 
                          isSelected={trimWhitespace} 
                          onValueChange={setTrimWhitespace}
                          size="sm"
                        >
                          Trim Whitespace
                        </Switch>
                        
                        <Switch 
                          isSelected={keepFirstOccurrence} 
                          onValueChange={setKeepFirstOccurrence}
                          size="sm"
                        >
                          Keep First Occurrence
                        </Switch>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <Switch 
                          isSelected={addLineNumbers} 
                          onValueChange={setAddLineNumbers}
                          size="sm"
                        >
                          Add Line Numbers
                        </Switch>
                        
                        <Switch 
                          isSelected={ignoreEmptyLines} 
                          onValueChange={setIgnoreEmptyLines}
                          size="sm"
                        >
                          Ignore Empty Lines
                        </Switch>
                        
                        <Switch 
                          isSelected={autoProcess} 
                          onValueChange={setAutoProcess}
                          size="sm"
                        >
                          Auto Process
                        </Switch>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab
                    key="advanced"
                    title={
                      <div className="flex items-center gap-1">
                        <Cpu size={16} />
                        <span>Advanced</span>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Select
                          label="Filter Mode"
                          selectedKeys={[filterMode]}
                          onChange={(e) => setFilterMode(e.target.value)}
                          className="w-full mb-3"
                          size="sm"
                          variant="bordered"
                        >
                          {filterModeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </Select>
                        
                        <Input
                          type="text"
                          label="Custom separator (leave empty for newline)"
                          value={customSeparator}
                          onChange={(e) => setCustomSeparator(e.target.value)}
                          variant="bordered"
                          size="sm"
                          className="w-full mb-3"
                        />
                        
                        {addLineNumbers && (
                          <Input
                            type="number"
                            label="Starting line number"
                            value={startingLineNumber.toString()}
                            variant="bordered"
                            size="sm"
                            onChange={(e) => setStartingLineNumber(Number(e.target.value))}
                            className="w-full"
                          />
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Switch 
                            isSelected={useRegex} 
                            onValueChange={setUseRegex}
                            size="sm"
                            className="mr-2"
                          >
                            Use Regular Expression
                          </Switch>
                          <Tooltip content="Filter lines using a regular expression pattern" className="text-default-700">
                            <Info size={16} className="text-default-400" />
                          </Tooltip>
                        </div>
                        
                        <Input
                          type="text"
                          label="Regex Pattern"
                          value={regexPattern}
                          onChange={(e) => setRegexPattern(e.target.value)}
                          variant="bordered"
                          size="sm"
                          isDisabled={!useRegex}
                          className="w-full"
                          placeholder="e.g. ^[A-Z].*\d+$"
                        />
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      color="primary" 
                      onPress={processText}
                      isDisabled={isProcessing || !inputText}
                      startContent={<Play size={18} />}
                    >
                      Process
                    </Button>
                    
                    <Button 
                      color="danger" 
                      variant="light"
                      onPress={handleClear}
                      isDisabled={isProcessing || (!inputText && !outputText)}
                      startContent={<RefreshCw size={18} />}
                    >
                      Clear
                    </Button>
                    
                    <Tooltip content="Undo (Ctrl+Z)">
                      <Button
                        color="default"
                        variant="light"
                        isIconOnly
                        onPress={handleUndo}
                        isDisabled={historyIndex <= 0 || history.length === 0}
                      >
                        <RotateCcw size={18} />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content="Redo (Ctrl+Y)">
                      <Button
                        color="default"
                        variant="light"
                        isIconOnly
                        onPress={handleRedo}
                        isDisabled={historyIndex >= history.length - 1 || history.length === 0}
                      >
                        <RotateCw size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      color="primary" 
                      variant="flat"
                      onPress={() => handleSort(true)}
                      isDisabled={isProcessing || !outputText}
                      startContent={<ArrowDown size={18} />}
                    >
                      Sort A-Z
                    </Button>
                    
                    <Button 
                      color="primary" 
                      variant="flat"
                      onPress={() => handleSort(false)}
                      isDisabled={isProcessing || !outputText}
                      startContent={<ArrowUp size={18} />}
                    >
                      Sort Z-A
                    </Button>
                    
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button 
                        as="span" 
                        color="primary" 
                        variant="flat"
                        isDisabled={isProcessing}
                        startContent={<FileUp size={18} />}
                      >
                        Upload File
                      </Button>
                      <input 
                        id="file-upload" 
                        ref={fileInputRef}
                        type="file" 
                        accept=".txt,.csv,.md,.json,.log" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
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
                
                {/* Stats display */}
                {(stats.inputLines > 0 || stats.outputLines > 0) && (
                  <div className="mt-4 p-2 bg-default-100 rounded-md">
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-default-600">
                      <div className="flex items-center gap-1">
                        <Hash size={14} />
                        <span>Input: {stats.inputLines.toLocaleString()} lines</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Filter size={14} />
                        <span>Output: {stats.outputLines.toLocaleString()} lines</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ToggleLeft size={14} />
                        <span>Duplicates: {stats.duplicatesFound.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Time: {stats.processingTime}ms</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
            
            {/* Output Tabs */}
            <Tabs 
              aria-label="Output Options" 
              selectedKey={activeTab}
              onSelectionChange={(key: Key) => setActiveTab(key)}
            >
              <Tab
                key="output"
                title={
                  <div className="flex items-center gap-2">
                    <Filter size={18} />
                    Processed Output
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-md font-semibold">Result</div>
                      <div className="text-sm text-default-500">
                        {stats.outputLines > 0 && (
                          <Badge color="success" variant="flat">
                            {stats.outputLines.toLocaleString()} lines
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Textarea 
                      value={outputText} 
                      isReadOnly 
                      minRows={6} 
                      variant="bordered" 
                      placeholder="Processed output will appear here"
                    />
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        color="primary" 
                        onPress={() => handleCopy(outputText)}
                        isDisabled={!outputText} 
                        startContent={<Copy size={18} />}
                      >
                        Copy Result
                      </Button>
                      
                      <Button
                        color="primary"
                        onPress={() => handleDownload(outputText, "result")}
                        isDisabled={!outputText}
                        startContent={<FileDown size={18} />}
                      >
                        Download Result
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              
              <Tab
                key="diff"
                title={
                  <div className="flex items-center gap-2">
                    <FileDiff size={18} />
                    Diff View
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <div className="mb-2">
                      <p className="text-sm text-default-600 mb-2">
                        <Info size={14} className="inline mr-1" />
                        This shows changes between input and output. Lines with "-" were removed, "+" were added.
                      </p>
                    </div>
                    
                    <Textarea 
                      value={inputText && outputText ? generateDiff() : ""} 
                      isReadOnly 
                      minRows={6} 
                      variant="bordered"
                      placeholder="Process text to see differences"
                      classNames={{
                        input: "font-mono",
                      }}
                    />
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        color="primary" 
                        onPress={() => {
                          if (inputText && outputText) {
                            handleCopy(generateDiff());
                          } else {
                            toast.error("Both input and output are required for diff");
                          }
                        }}
                        isDisabled={!inputText || !outputText} 
                        startContent={<Copy size={18} />}
                      >
                        Copy Diff
                      </Button>
                      
                      <Button
                        color="primary"
                        onPress={() => {
                          if (inputText && outputText) {
                            handleDownload(generateDiff(), "diff");
                          } else {
                            toast.error("Both input and output are required for diff");
                          }
                        }}
                        isDisabled={!inputText || !outputText}
                        startContent={<FileDown size={18} />}
                      >
                        Download Diff
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className=" bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the Duplicate Line Remover?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The Duplicate Line Remover, a useful text processing utility for developers, data analysts, content writers, and other text data users, detects and handles duplicate lines in your text without modifying the sentence. It intelligently filters duplicate lines using various customizable filtering, processing, and organization options available to your text.Whether you are working to clean log files, organize data, remove unnecessary content, or prepare datasets, the Duplicate Line Remover tool gives you the flexibility and accuracy to make the text processing experience, useful and efficient.
            </p>
          

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/DuplicateLineRemoverPreview.png?height=400&width=600"
                alt="Screenshot of the Duplicate Line Remover interface showing text input area, processing options, and result output"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2
              id="how-to-use"
              className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use the Duplicate Line Remover?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>
                <strong>Input your text</strong> - Type, paste text into the input area, or use the "Upload File" button to
                process larger files (supports .txt, .csv, .md, .json, and .log files).
              </li>
              <li>
                <strong>Configure processing options</strong> - Use the Basic and Advanced tabs to customize how your text
                is processed. Toggle options like case sensitivity, whitespace trimming, and more.
              </li>
              <li>
                <strong>Select filter mode</strong> - Choose whether to remove duplicates, keep only duplicates, or
                highlight duplicates for review.
              </li>
              <li>
                <strong>Process your text</strong> - With Auto Process enabled, your text will update automatically as you
                type or change settings. Otherwise, click the "Process" button.
              </li>
              <li>
                <strong>Review the results</strong> - Check the output area to see your processed text, or switch to the
                Diff View tab to see what changed.
              </li>
              <li>
                <strong>Further refine if needed</strong> - Sort results alphabetically, apply additional processing, or
                make adjustments to your settings.
              </li>
              <li>
                <strong>Copy or download</strong> - Use the Copy or Download buttons to save your processed text for use in
                other applications.
              </li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Multiple Processing Modes:</strong> Remove duplicates, keep only duplicates, or highlight duplicates
                for review.
              </li>
              <li>
                <strong>Smart Comparison Options:</strong> Configure case sensitivity, whitespace handling, and first
                occurrence retention.
              </li>
              <li>
                <strong>Advanced Filtering:</strong> Use regular expressions to filter lines based on patterns, ignore empty
                lines, and apply custom separators.
              </li>
              <li>
                <strong>Line Numbering:</strong> Add sequential numbers to your output with customizable starting position.
              </li>
              <li>
                <strong>Real-time Processing:</strong> See results instantly with the auto-process feature as you type or
                change settings.
              </li>
              <li>
                <strong>Text Organization:</strong> Sort your output alphabetically in ascending or descending order.
              </li>
              <li>
                <strong>Diff View:</strong> Compare input and output side-by-side to see exactly what changed.
              </li>
              <li>
                <strong>File Handling:</strong> Upload text files for processing and download results with a single click.
              </li>
              <li>
                <strong>Undo/Redo History:</strong> Track changes and revert to previous states if needed.
              </li>
              <li>
                <strong>Detailed Statistics:</strong> View counts of input lines, output lines, duplicates found, and
                processing time.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Advanced Options Explained
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Case Sensitivity:</strong> When enabled, "Hello" and "hello" are treated as different lines. When
                disabled, they're considered duplicates.
              </li>
              <li>
                <strong>Trim Whitespace:</strong> Removes spaces at the beginning and end of each line before comparison,
                ensuring that lines with extra spacing aren't falsely identified as unique.
              </li>
              <li>
                <strong>Keep First Occurrence:</strong> When removing duplicates, this option preserves the first instance
                of each line while removing subsequent duplicates.
              </li>
              <li>
                <strong>Add Line Numbers:</strong> Prefixes each line in the output with a sequential number, making it
                easier to reference specific lines.
              </li>
              <li>
                <strong>Ignore Empty Lines:</strong> Skips blank lines during processing, preventing empty lines from being
                counted in duplicate detection.
              </li>
              <li>
                <strong>Custom Separator:</strong> Define your own line separators for specialized formats like CSV data,
                allowing processing of text that isn't separated by newlines.
              </li>
              <li>
                <strong>Filter Mode:</strong> Choose between removing all duplicates, keeping only the lines that have
                duplicates, or highlighting duplicates for review.
              </li>
              <li>
                <strong>Regular Expression:</strong> Filter lines using pattern matching to include only lines that match
                specific criteria before duplicate processing.
              </li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
              Ready to streamline your text processing tasks? Start using our Duplicate Line Remover now and experience the
              power of efficient, customizable text cleaning at your fingertips. Whether you're a data analyst, a content
              creator, or anyone dealing with large volumes of text, our tool is here to make your work easier and more
              productive. Try it out and see how it can transform your text processing workflow!
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}

