"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button, Card, CardBody, Input, Switch, Textarea, Slider, Chip, Progress, Divider } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Upload, Copy, RefreshCw, Download, Zap, FileCode, TrendingDown, Sparkles, Code2, Settings } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionHTMLMinifier from "./info-section"

const MAX_FILE_SIZE_MB = 10

export default function HTMLMinifier() {
  const [inputHTML, setInputHTML] = useState("")
  const [outputHTML, setOutputHTML] = useState("")
  const [fileName, setFileName] = useState("")
  const [removeComments, setRemoveComments] = useState(true)
  const [removeWhitespace, setRemoveWhitespace] = useState(true)
  const [removeEmptyAttributes, setRemoveEmptyAttributes] = useState(true)
  const [shortenBooleanAttributes, setShortenBooleanAttributes] = useState(true)
  const [removeOptionalTags, setRemoveOptionalTags] = useState(false)
  const [collapseWhitespace, setCollapseWhitespace] = useState(true)
  const [minifyJS, setMinifyJS] = useState(true)
  const [minifyCSS, setMinifyCSS] = useState(true)
  const [removeDataAttributes, setRemoveDataAttributes] = useState(false)
  const [removeScriptTypeAttributes, setRemoveScriptTypeAttributes] = useState(true)
  const [removeStyleLinkTypeAttributes, setRemoveStyleLinkTypeAttributes] = useState(true)
  const [aggressiveness, setAggressiveness] = useState(50)
  const [minificationStats, setMinificationStats] = useState({ originalSize: 0, minifiedSize: 0, percentReduction: 0 })
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedHTML = localStorage.getItem("inputHTML")
    if (savedHTML) {
      setInputHTML(savedHTML)
    }
  }, [])

  const minifyHTML = () => {
    if (!inputHTML.trim()) {
      toast.error("Please enter some HTML to minify.")
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      try {
        let minified = inputHTML
        const originalSize = new Blob([inputHTML]).size

        if (removeComments) {
          minified = minified.replace(/<!--[\s\S]*?-->/g, "")
        }

        if (removeWhitespace) {
          minified = minified.replace(/\s+/g, " ")
        }

        if (removeEmptyAttributes) {
          minified = minified.replace(/(\s+\w+=")\s*"/g, "")
        }

        if (shortenBooleanAttributes) {
          minified = minified.replace(/(\w+)=["']true["']/g, "$1")
          minified = minified.replace(/(\w+)=["']false["']/g, "")
        }

        if (removeOptionalTags) {
          minified = minified.replace(/<\/?(html|head|body|option)[^>]*>/gi, "")
        }

        if (collapseWhitespace) {
          minified = minified.replace(/>\s+</g, "><")
        }

        if (minifyJS) {
          minified = minified.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, p1) => {
            return `<script>${p1
              .replace(/\/\/.*?(\r?\n|$)/g, "")
              .replace(/\s+/g, " ")
              .trim()}</script>`
          })
        }

        if (minifyCSS) {
          minified = minified.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, p1) => {
            return `<style>${p1
              .replace(/\/\*[\s\S]*?\*\//g, "")
              .replace(/\s+/g, " ")
              .replace(/:\s+/g, ":")
              .replace(/;\s+/g, ";")
              .trim()}</style>`
          })
        }

        if (removeDataAttributes) {
          minified = minified.replace(/ data-[^=]+="[^"]*"/g, "")
        }

        if (removeScriptTypeAttributes) {
          minified = minified.replace(
            /<script(?:\s+(?!type=)[\w-]+=(?:"[^"]*"|'[^']*'))*\s+type=["']text\/javascript["'](?:\s+(?!type=)[\w-]+=(?:"[^"]*"|'[^']*'))*>/gi,
            "<script>",
          )
        }

        if (removeStyleLinkTypeAttributes) {
          minified = minified.replace(
            /<(style|link)(?:\s+(?!type=)[\w-]+=(?:"[^"]*"|'[^']*'))*\s+type=["']text\/css["'](?:\s+(?!type=)[\w-]+=(?:"[^"]*"|'[^']*'))*>/gi,
            "<$1>",
          )
        }

        if (aggressiveness > 0) {
          const extraMinification = Math.floor(aggressiveness / 10)
          for (let i = 0; i < extraMinification; i++) {
            minified = minified.replace(/(\S)\s+(\S)/g, "$1 $2")
          }
        }

        const minifiedSize = new Blob([minified]).size
        const percentReduction = ((originalSize - minifiedSize) / originalSize) * 100

        setOutputHTML(minified)
        setMinificationStats({
          originalSize,
          minifiedSize,
          percentReduction: Number.parseFloat(percentReduction.toFixed(2)),
        })
        toast.success("HTML minified successfully!")
      } catch (error) {
        console.error("Minification error:", error)
        toast.error("Error minifying HTML. Please check your input.")
      } finally {
        setIsProcessing(false)
      }
    }, 300)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }

      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === "string") {
          setInputHTML(result)
          localStorage.setItem("inputHTML", result)
          toast.success("File uploaded successfully!")
        }
      }
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.")
      }
      reader.readAsText(file)
    }
  }

  const copyToClipboard = (text: string) => {
    if (!text.trim()) {
      toast.error("No minified HTML to copy.")
      return
    }
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setInputHTML("")
    setOutputHTML("")
    setFileName("")
    setMinificationStats({ originalSize: 0, minifiedSize: 0, percentReduction: 0 })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    localStorage.removeItem("inputHTML")
    toast.success("All fields have been reset.")
  }

  const handleDownload = () => {
    if (!outputHTML.trim()) {
      toast.error("No minified HTML to download.")
      return
    }
    const blob = new Blob([outputHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName ? `minified-${fileName}` : "minified.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Minified HTML downloaded!")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputHTML(newValue)
    localStorage.setItem("inputHTML", newValue)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'safe':
        setRemoveComments(true)
        setRemoveWhitespace(true)
        setCollapseWhitespace(true)
        setRemoveEmptyAttributes(false)
        setShortenBooleanAttributes(false)
        setRemoveOptionalTags(false)
        setMinifyJS(false)
        setMinifyCSS(false)
        setRemoveDataAttributes(false)
        setRemoveScriptTypeAttributes(true)
        setRemoveStyleLinkTypeAttributes(true)
        setAggressiveness(25)
        toast.success('Safe preset applied')
        break
      case 'balanced':
        setRemoveComments(true)
        setRemoveWhitespace(true)
        setCollapseWhitespace(true)
        setRemoveEmptyAttributes(true)
        setShortenBooleanAttributes(true)
        setRemoveOptionalTags(false)
        setMinifyJS(true)
        setMinifyCSS(true)
        setRemoveDataAttributes(false)
        setRemoveScriptTypeAttributes(true)
        setRemoveStyleLinkTypeAttributes(true)
        setAggressiveness(50)
        toast.success('Balanced preset applied')
        break
      case 'aggressive':
        setRemoveComments(true)
        setRemoveWhitespace(true)
        setCollapseWhitespace(true)
        setRemoveEmptyAttributes(true)
        setShortenBooleanAttributes(true)
        setRemoveOptionalTags(true)
        setMinifyJS(true)
        setMinifyCSS(true)
        setRemoveDataAttributes(true)
        setRemoveScriptTypeAttributes(true)
        setRemoveStyleLinkTypeAttributes(true)
        setAggressiveness(100)
        toast.success('Aggressive preset applied')
        break
    }
  }

  return (
    <ToolLayout
      title="HTML Minifier"
      description="Compress and optimize your HTML code with advanced minification options"
      toolId="678f382f26f06f912191bcbc"
    >
      <div className="flex flex-col gap-6">
        {/* Presets Section - Now at the top */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-lg">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold">Quick Presets</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onPress={() => applyPreset('safe')}
                variant="flat"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-600 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">🛡️</span>
                <span className="font-semibold">Safe</span>
                <span className="text-xs opacity-70">Basic minification</span>
              </Button>
              <Button
                onPress={() => applyPreset('balanced')}
                variant="flat"
                color="primary"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">⚖️</span>
                <span className="font-semibold">Balanced</span>
                <span className="text-xs opacity-70">Recommended</span>
              </Button>
              <Button
                onPress={() => applyPreset('aggressive')}
                variant="flat"
                color="warning"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Aggressive</span>
                <span className="text-xs opacity-70">Max compression</span>
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Stats Cards */}
        {minificationStats.originalSize > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90 mb-1">Original Size</p>
                    <p className="text-xl font-bold">{formatBytes(minificationStats.originalSize)}</p>
                  </div>
                  <FileCode className="w-8 h-8 opacity-80" />
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90 mb-1">Minified Size</p>
                    <p className="text-xl font-bold">{formatBytes(minificationStats.minifiedSize)}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 opacity-80" />
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90 mb-1">Size Reduced</p>
                    <p className="text-xl font-bold">{minificationStats.percentReduction}%</p>
                  </div>
                  <Sparkles className="w-8 h-8 opacity-80" />
                </div>
                <Progress
                  value={minificationStats.percentReduction}
                  className="mt-2"
                  size="sm"
                  classNames={{
                    indicator: "bg-white/80"
                  }}
                />
              </CardBody>
            </Card>
          </div>
        )}

        {/* Main Content Card */}
        <Card className="bg-default-50 dark:bg-default-100 shadow-xl">
          <CardBody className="p-6">
            {/* File Upload Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload HTML File
                </h3>
                {fileName && (
                  <Chip size="sm" color="success" variant="flat">
                    {fileName}
                  </Chip>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".html,.htm"
                  onChange={handleFileUpload}
                  variant="bordered"
                  size="sm"
                  className="flex-1"
                />
                <Button
                  onPress={() => fileInputRef.current?.click()}
                  color="primary"
                  size="sm"
                  startContent={<Upload className="w-3 h-3" />}
                >
                  Upload
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Max {MAX_FILE_SIZE_MB}MB • HTML, HTM</p>
            </div>

            <Divider className="my-6" />

            {/* Input/Output Textareas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Input HTML
                </label>
                <Textarea
                  placeholder="Paste your HTML code here..."
                  value={inputHTML}
                  onChange={handleInputChange}
                  variant="bordered"
                  minRows={10}
                  classNames={{
                    input: "font-mono text-xs"
                  }}
                />
                {inputHTML && (
                  <p className="text-xs text-gray-500 mt-1">
                    {inputHTML.split('\n').length} lines • {formatBytes(new Blob([inputHTML]).size)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Minified Output
                </label>
                <Textarea
                  placeholder="Minified HTML will appear here..."
                  value={outputHTML}
                  variant="bordered"
                  minRows={10}
                  readOnly
                  classNames={{
                    input: "font-mono text-xs"
                  }}
                />
                {outputHTML && (
                  <p className="text-xs text-gray-500 mt-1">
                    {outputHTML.split('\n').length} lines • {formatBytes(new Blob([outputHTML]).size)}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                color="primary"
                onPress={minifyHTML}
                isLoading={isProcessing}
                startContent={!isProcessing && <Zap className="w-4 h-4" />}
                className="flex-1 sm:flex-none font-semibold"
              >
                Minify HTML
              </Button>
              <Button
                color="success"
                variant="flat"
                onPress={() => copyToClipboard(outputHTML)}
                startContent={<Copy className="w-4 h-4" />}
                className="flex-1 sm:flex-none"
              >
                Copy
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={handleDownload}
                isDisabled={!outputHTML}
                startContent={<Download className="w-4 h-4" />}
                className="flex-1 sm:flex-none"
              >
                Download
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={handleReset}
                startContent={<RefreshCw className="w-4 h-4" />}
                className="flex-1 sm:flex-none"
              >
                Reset
              </Button>
            </div>

            <Divider className="my-6" />

            {/* Settings Section - Collapsible */}
            <div>
              <Button
                onPress={() => setShowSettings(!showSettings)}
                variant="flat"
                className="w-full mb-4"
                endContent={<Settings className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-90' : ''}`} />}
              >
                <span className="font-semibold">Advanced Settings</span>
              </Button>

              {showSettings && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Aggressiveness Slider */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold mb-3">Minification Intensity</h4>
                    <Slider
                      step={10}
                      maxValue={100}
                      minValue={0}
                      value={aggressiveness}
                      onChange={(value) => setAggressiveness(value as number)}
                      className="max-w-full"
                      size="sm"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>Gentle</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{aggressiveness}%</span>
                      <span>Maximum</span>
                    </div>
                  </div>

                  {/* Options Grid */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold mb-3">Minification Options</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Switch size="sm" isSelected={removeComments} onValueChange={setRemoveComments}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Comments</p>
                          <p className="opacity-70">Strip HTML comments</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={removeWhitespace} onValueChange={setRemoveWhitespace}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Whitespace</p>
                          <p className="opacity-70">Eliminate extra spaces</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={collapseWhitespace} onValueChange={setCollapseWhitespace}>
                        <div className="text-xs">
                          <p className="font-medium">Collapse Whitespace</p>
                          <p className="opacity-70">Remove space between tags</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={removeEmptyAttributes} onValueChange={setRemoveEmptyAttributes}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Empty Attrs</p>
                          <p className="opacity-70">Clean empty values</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={shortenBooleanAttributes} onValueChange={setShortenBooleanAttributes}>
                        <div className="text-xs">
                          <p className="font-medium">Shorten Boolean</p>
                          <p className="opacity-70">disabled="true" → disabled</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={removeOptionalTags} onValueChange={setRemoveOptionalTags}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Optional Tags</p>
                          <p className="opacity-70">html, head, body</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={minifyJS} onValueChange={setMinifyJS}>
                        <div className="text-xs">
                          <p className="font-medium">Minify JavaScript</p>
                          <p className="opacity-70">&lt;script&gt; content</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={minifyCSS} onValueChange={setMinifyCSS}>
                        <div className="text-xs">
                          <p className="font-medium">Minify CSS</p>
                          <p className="opacity-70">&lt;style&gt; content</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={removeDataAttributes} onValueChange={setRemoveDataAttributes}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Data Attrs</p>
                          <p className="opacity-70">Strip data-*</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={removeScriptTypeAttributes} onValueChange={setRemoveScriptTypeAttributes}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Script Type</p>
                          <p className="opacity-70">type="text/javascript"</p>
                        </div>
                      </Switch>
                      <Switch size="sm" isSelected={removeStyleLinkTypeAttributes} onValueChange={setRemoveStyleLinkTypeAttributes}>
                        <div className="text-xs">
                          <p className="font-medium">Remove Style Type</p>
                          <p className="opacity-70">type="text/css"</p>
                        </div>
                      </Switch>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <InfoSectionHTMLMinifier />
    </ToolLayout>
  )
}