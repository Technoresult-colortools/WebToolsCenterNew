"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Card, CardBody, Button, Checkbox, Textarea, Tabs, Tab, Badge, Tooltip } from "@nextui-org/react"
import {
  Copy,
  Download,
  Scissors,
  AlignLeft,
  Type,
  BarChart3,
  RotateCcw,
  Trash2,
  History,
  Settings,
  Undo,
  Redo,
  Code,
  Wand2,
  Layers,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./info-section"

const MAX_CHARS = 10000

export default function WhiteSpaceRemover() {
  const [text, setText] = useState("")
  const [originalText, setOriginalText] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [removeLeadingTrailing, setRemoveLeadingTrailing] = useState(true)
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true)
  const [compressLineBreaks, setCompressLineBreaks] = useState(true)
  const [removeTabsIndentation, setRemoveTabsIndentation] = useState(false)
  const [normalizeWhitespace, setNormalizeWhitespace] = useState(false)
  const [selectedTab, setSelectedTab] = useState<React.Key>("options")
  const [statsVisible, setStatsVisible] = useState(true)

  // Calculate statistics
  const charCount = text.length
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
  const lineCount = text === "" ? 0 : text.split(/\r\n|\r|\n/).length
  const spaceCount = text.split(" ").length - 1
  const percentReduction =
    originalText.length > 0 ? Math.round(((originalText.length - text.length) / originalText.length) * 100) : 0

  // Add to history when text changes
  useEffect(() => {
    if (text !== "" && (history.length === 0 || text !== history[historyIndex])) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(text)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [text, history, historyIndex])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (originalText === "") {
      setOriginalText(e.target.value)
    }
  }

  const handleRemoveWhiteSpace = useCallback(() => {
    let result = text

    if (removeLeadingTrailing) {
      result = result.trim()
    }

    if (removeExtraSpaces) {
      result = result.replace(/\s{2,}/g, " ")
    }

    if (compressLineBreaks) {
      result = result.replace(/\n{3,}/g, "\n\n")
    }

    if (removeTabsIndentation) {
      result = result.replace(/^\s+/gm, "")
    }

    if (normalizeWhitespace) {
      // Replace all whitespace characters with a standard space
      result = result.replace(/[\t\n\r\f\v]+/g, " ")
    }

    setText(result)
    toast.success("White spaces removed!")
  }, [text, removeLeadingTrailing, removeExtraSpaces, compressLineBreaks, removeTabsIndentation, normalizeWhitespace])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard")
  }, [text])

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cleaned_text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text downloaded successfully")
  }, [text])

  const handleClear = useCallback(() => {
    setText("")
    setOriginalText("")
    setHistory([])
    setHistoryIndex(-1)
    toast.success("Text cleared")
  }, [])

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setText(history[historyIndex - 1])
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setText(history[historyIndex + 1])
    }
  }, [history, historyIndex])

  const handleRestore = useCallback(() => {
    if (originalText) {
      setText(originalText)
      toast.success("Original text restored")
    }
  }, [originalText])


  const handleAutoDetect = useCallback(() => {
    // Detect which whitespace issues are present in the text
    const hasLeadingTrailing = text.trim() !== text
    const hasExtraSpaces = /\s{2,}/.test(text)
    const hasMultipleLineBreaks = /\n{3,}/.test(text)
    const hasIndentation = /^\s+/m.test(text)

    setRemoveLeadingTrailing(hasLeadingTrailing)
    setRemoveExtraSpaces(hasExtraSpaces)
    setCompressLineBreaks(hasMultipleLineBreaks)
    setRemoveTabsIndentation(hasIndentation)

    toast.success("Whitespace issues detected and options set")
  }, [text])

  return (
    <ToolLayout
      title="Whitespace Remover"
      description="Advanced text cleaning tool to remove and normalize unwanted white spaces"
      toolId="678f382826f06f912191bc80"
    >
      <div className="flex flex-col gap-6">

        {/* Stats Bar */}
        {statsVisible && (
          <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <CardBody className="py-2">
              <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Type className="w-4 h-4 text-primary-500" />
                  <span className="font-medium">Characters:</span> {charCount}/{MAX_CHARS}
                </div>
                <div className="flex items-center gap-1">
                  <AlignLeft className="w-4 h-4 text-primary-500" />
                  <span className="font-medium">Words:</span> {wordCount}
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="w-4 h-4 text-primary-500" />
                  <span className="font-medium">Lines:</span> {lineCount}
                </div>
                <div className="flex items-center gap-1">
                  <Scissors className="w-4 h-4 text-primary-500" />
                  <span className="font-medium">Spaces:</span> {spaceCount}
                </div>
                {percentReduction > 0 && (
                  <Badge color="success" variant="flat" className="ml-auto">
                    {percentReduction}% Reduced
                  </Badge>
                )}
              </div>
            </CardBody>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-default-50 dark:bg-default-100 h-full">
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium text-primary">Text Editor</h3>
                  <div className="flex gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="primary"
                      onPress={() => setStatsVisible(!statsVisible)}
                      aria-label="Toggle statistics"
                    >
                      <BarChart3 size={18} />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter or paste your text here..."
                  minRows={12}
                  maxRows={20}
                  className="w-full mb-4"
                  variant="bordered"
                  maxLength={MAX_CHARS}
                />

                <div className="flex flex-wrap gap-2 mt-2">
        
                    <Button color="primary" variant="flat" onPress={handleCopy} startContent={<Copy size={18} />}>
                      Copy
                    </Button>
      
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={handleDownload}
                      startContent={<Download size={18} />}
                    >
                      Download
                    </Button>
    
     
                    <Button color="danger" variant="flat" onPress={handleClear} startContent={<Trash2 size={18} />}>
                      Clear
                    </Button>
          
               
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleRestore}
                      startContent={<RotateCcw size={18} />}
                      isDisabled={!originalText}
                    >
                      Restore
                    </Button>
          
                  <div className="ml-auto flex gap-1">
                    <Tooltip content="Undo">
                      <Button
                        isIconOnly
                        variant="flat"
                        onPress={handleUndo}
                        isDisabled={historyIndex <= 0}
                        aria-label="Undo"
                      >
                        <Undo size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Redo">
                      <Button
                        isIconOnly
                        variant="flat"
                        onPress={handleRedo}
                        isDisabled={historyIndex >= history.length - 1}
                        aria-label="Redo"
                      >
                        <Redo size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-default-50 dark:bg-default-100 h-full">
              <CardBody className="p-4">
                <Tabs
                  selectedKey={selectedTab as string}
                  onSelectionChange={setSelectedTab}
                  aria-label="Options"
                  classNames={{
                    tabList: "gap-2",
                    tab: "px-3 py-2",
                    tabContent: "group-data-[selected=true]:text-primary-500",
                  }}
                >
                  <Tab
                    key="options"
                    title={
                      <div className="flex items-center gap-2">
                        <Settings size={18} />
                        <span>Options</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      <div className="flex flex-col gap-3 mb-4">
                        <Checkbox isSelected={removeLeadingTrailing} onValueChange={setRemoveLeadingTrailing} size="sm">
                          <div className="flex flex-col">
                            <span>Remove Leading/Trailing Spaces</span>
                            <span className="text-xs text-default-500">Trim spaces at the beginning and end</span>
                          </div>
                        </Checkbox>
                        <Checkbox isSelected={removeExtraSpaces} onValueChange={setRemoveExtraSpaces} size="sm">
                          <div className="flex flex-col">
                            <span>Remove Extra Spaces</span>
                            <span className="text-xs text-default-500">Convert multiple spaces to single space</span>
                          </div>
                        </Checkbox>
                        <Checkbox isSelected={compressLineBreaks} onValueChange={setCompressLineBreaks} size="sm">
                          <div className="flex flex-col">
                            <span>Compress Line Breaks</span>
                            <span className="text-xs text-default-500">Limit consecutive line breaks to two</span>
                          </div>
                        </Checkbox>
                        <Checkbox isSelected={removeTabsIndentation} onValueChange={setRemoveTabsIndentation} size="sm">
                          <div className="flex flex-col">
                            <span>Remove Tabs & Indentation</span>
                            <span className="text-xs text-default-500">Remove spaces at the start of each line</span>
                          </div>
                        </Checkbox>
                        <Checkbox isSelected={normalizeWhitespace} onValueChange={setNormalizeWhitespace} size="sm">
                          <div className="flex flex-col">
                            <span>Normalize All Whitespace</span>
                            <span className="text-xs text-default-500">Convert all whitespace to standard spaces</span>
                          </div>
                        </Checkbox>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button
                          color="primary"
                          onPress={handleRemoveWhiteSpace}
                          startContent={<Scissors size={18} />}
                          className="w-full"
                        >
                          Remove White Spaces
                        </Button>
                        <Tooltip content="Auto-detect whitespace issues">
                          <Button
                            isIconOnly
                            color="secondary"
                            onPress={handleAutoDetect}
                            aria-label="Auto-detect whitespace issues"
                          >
                            <Wand2 size={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="advanced"
                    title={
                      <div className="flex items-center gap-2">
                        <Code size={18} />
                        <span>Advanced</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Presets</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              onPress={() => {
                                setRemoveLeadingTrailing(true)
                                setRemoveExtraSpaces(true)
                                setCompressLineBreaks(true)
                                setRemoveTabsIndentation(false)
                                setNormalizeWhitespace(false)
                              }}
                            >
                              Standard
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              onPress={() => {
                                setRemoveLeadingTrailing(true)
                                setRemoveExtraSpaces(true)
                                setCompressLineBreaks(false)
                                setRemoveTabsIndentation(true)
                                setNormalizeWhitespace(false)
                              }}
                            >
                              Code
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              onPress={() => {
                                setRemoveLeadingTrailing(true)
                                setRemoveExtraSpaces(true)
                                setCompressLineBreaks(true)
                                setRemoveTabsIndentation(true)
                                setNormalizeWhitespace(false)
                              }}
                            >
                              Compact
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              onPress={() => {
                                setRemoveLeadingTrailing(true)
                                setRemoveExtraSpaces(true)
                                setCompressLineBreaks(false)
                                setRemoveTabsIndentation(false)
                                setNormalizeWhitespace(true)
                              }}
                            >
                              Single Line
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Custom Replacements</h3>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              variant="bordered"
                              color="primary"
                              onPress={() => {
                                setText(text.replace(/\t/g, "  "))
                              }}
                            >
                              Convert Tabs to Spaces
                            </Button>
                            <Button
                              size="sm"
                              variant="bordered"
                              color="primary"
                              onPress={() => {
                                setText(text.replace(/\r\n/g, "\n"))
                              }}
                            >
                              Normalize Line Endings
                            </Button>
                            <Button
                              size="sm"
                              variant="bordered"
                              color="primary"
                              onPress={() => {
                                setText(text.replace(/\n/g, " "))
                              }}
                            >
                              Convert Line Breaks to Spaces
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="history"
                    title={
                      <div className="flex items-center gap-2">
                        <History size={18} />
                        <span>History</span>
                      </div>
                    }
                  >
                    <div className="mt-4">
                      {history.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-default-500">Previous versions ({history.length})</p>
                          <div className="max-h-[300px] overflow-y-auto">
                            {history.map((item, index) => (
                              <div
                                key={index}
                                className={`p-2 text-xs border rounded-md mb-2 cursor-pointer hover:bg-default-100 ${
                                  index === historyIndex
                                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                    : "border-default-200"
                                }`}
                                onClick={() => {
                                  setText(item)
                                  setHistoryIndex(index)
                                }}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">Version {index + 1}</span>
                                  <span className="text-default-400">{item.length} chars</span>
                                </div>
                                <p className="truncate">
                                  {item.substring(0, 100)}
                                  {item.length > 100 ? "..." : ""}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-default-400">
                          <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No history available</p>
                          <p className="text-xs mt-1">Make changes to see history</p>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>

      <InfoSection />
      </div>  
    </ToolLayout>
    
  )
}
