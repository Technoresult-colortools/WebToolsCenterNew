"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card, CardBody, Input, Textarea, Chip, Progress, Divider, Switch, Slider, Tooltip } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Upload, Copy, RefreshCw, Download, Zap, FileCode, TrendingDown, Sparkles, Code2, Settings, Wand2, Terminal } from "lucide-react"
import { minify } from "terser"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionJavascriptMinifier from "./info-section"

const MAX_FILE_SIZE_MB = 2

interface MinifyOptions {
  mangle: boolean
  compress: boolean
  dropConsole: boolean
  dropDebugger: boolean
  formatComments: boolean
}

export default function JavaScriptMinifier() {
  const [inputJS, setInputJS] = useState("")
  const [outputJS, setOutputJS] = useState("")
  const [fileName, setFileName] = useState("")
  const [processStats, setProcessStats] = useState<{ original: number; processed: number; savings: number } | null>(null)
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify')
  const [showSettings, setShowSettings] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Minification options
  const [mangle, setMangle] = useState(true)
  const [compress, setCompress] = useState(true)
  const [dropConsole, setDropConsole] = useState(false)
  const [dropDebugger, setDropDebugger] = useState(true)
  const [formatComments, setFormatComments] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState(50)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const processJS = async () => {
    if (!inputJS.trim()) {
      toast.error("Please enter some JavaScript to process.")
      return
    }

    setIsProcessing(true)

    try {
      let result;

      if (mode === 'minify') {
        const passes = Math.max(1, Math.floor(compressionLevel / 20))

        result = await minify(inputJS, {
          compress: compress ? {
            dead_code: true,
            drop_debugger: dropDebugger,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            keep_fargs: false,
            hoist_vars: true,
            if_return: true,
            join_vars: true,
            drop_console: dropConsole,
            passes: passes,
          } : false,
          mangle: mangle,
          format: {
            comments: formatComments,
          },
        })
      } else {
        result = await minify(inputJS, {
          compress: false,
          mangle: false,
          format: {
            beautify: true,
            comments: true,
            indent_level: 2,
          },
        })
      }

      if (result && result.code) {
        setOutputJS(result.code)

        const originalSize = new Blob([inputJS]).size
        const processedSize = new Blob([result.code]).size
        const savings = originalSize - processedSize
        const savingsPercentage = originalSize > 0 ? ((savings / originalSize) * 100).toFixed(2) : "0"

        setProcessStats({
          original: originalSize,
          processed: processedSize,
          savings
        })

        toast.success(
          mode === 'minify'
            ? `JavaScript minified! Reduced by ${savingsPercentage}%`
            : "JavaScript beautified successfully!"
        )
      }
    } catch (error: any) {
      console.error("Processing error:", error)
      toast.error(`Error: ${error.message || "Failed to process JavaScript"}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    if (!text.trim()) {
      toast.error(`No output to copy.`)
      return
    }
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setInputJS("")
    setOutputJS("")
    setFileName("")
    setProcessStats(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    toast.success("Reset successful!")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith(".js") && file.type !== "text/javascript") {
        toast.error("Please upload a JavaScript file (.js)")
        return
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputJS(e.target?.result as string)
        toast.success("File uploaded successfully!")
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    if (!outputJS.trim()) return
    const blob = new Blob([outputJS], { type: "application/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
      ? fileName.replace(".js", mode === 'minify' ? ".min.js" : ".pretty.js")
      : (mode === 'minify' ? "script.min.js" : "script.js")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k))
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i]
  }

  const applyPreset = (preset: 'safe' | 'balanced' | 'aggressive') => {
    switch (preset) {
      case 'safe':
        setMangle(false); setCompress(true); setDropConsole(false); setCompressionLevel(20);
        break
      case 'balanced':
        setMangle(true); setCompress(true); setDropConsole(false); setCompressionLevel(50);
        break
      case 'aggressive':
        setMangle(true); setCompress(true); setDropConsole(true); setCompressionLevel(100);
        break
    }
    toast.success(`${preset.charAt(0).toUpperCase() + preset.slice(1)} preset applied`)
  }

  return (
    <ToolLayout
      title="JavaScript Minifier & Beautifier"
      description="Optimize your JS code for production or format it for readability using industry-standard Terser engine"
      toolId="678f382f26f06f912191bcbe"
    >
      <div className="flex flex-col gap-6">
        {/* Mode Selection */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Select Mode</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onPress={() => setMode('minify')}
                variant={mode === 'minify' ? 'solid' : 'flat'}
                color={mode === 'minify' ? 'primary' : 'default'}
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Minify JS</span>
                <span className="text-xs opacity-70">Compress & obfuscate</span>
              </Button>
              <Button
                onPress={() => setMode('beautify')}
                variant={mode === 'beautify' ? 'solid' : 'flat'}
                color={mode === 'beautify' ? 'secondary' : 'default'}
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">✨</span>
                <span className="font-semibold">Beautify JS</span>
                <span className="text-xs opacity-70">Format & prettify</span>
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Presets */}
        {mode === 'minify' && (
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold">Quick Presets</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button onPress={() => applyPreset('safe')} variant="flat" size="lg" className="h-auto py-4 flex flex-col bg-white dark:bg-gray-600 hover:scale-105 transition-transform">
                  <span className="text-2xl">🛡️</span>
                  <span className="font-semibold">Safe</span>
                  <span className="text-xs opacity-70">No mangling</span>
                </Button>
                <Button onPress={() => applyPreset('balanced')} variant="flat" color="primary" size="lg" className="h-auto py-4 flex flex-col hover:scale-105 transition-transform">
                  <span className="text-2xl">⚖️</span>
                  <span className="font-semibold">Balanced</span>
                  <span className="text-xs opacity-70">Standard</span>
                </Button>
                <Button onPress={() => applyPreset('aggressive')} variant="flat" color="warning" size="lg" className="h-auto py-4 flex flex-col hover:scale-105 transition-transform">
                  <span className="text-2xl">🚀</span>
                  <span className="font-semibold">Aggressive</span>
                  <span className="text-xs opacity-70">Max savings</span>
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Stats */}
        {processStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <CardBody className="p-4 flex flex-row items-center justify-between">
                <div>
                  <p className="text-xs opacity-90 mb-1">Original Size</p>
                  <p className="text-xl font-bold">{formatBytes(processStats.original)}</p>
                </div>
                <FileCode className="w-8 h-8 opacity-80" />
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <CardBody className="p-4 flex flex-row items-center justify-between">
                <div>
                  <p className="text-xs opacity-90 mb-1">{mode === 'minify' ? 'Minified' : 'Formatted'} Size</p>
                  <p className="text-xl font-bold">{formatBytes(processStats.processed)}</p>
                </div>
                <TrendingDown className="w-8 h-8 opacity-80" />
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <CardBody className="p-4 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90 mb-1">{mode === 'minify' ? 'Reduced' : 'Change'}</p>
                    <p className="text-xl font-bold">
                      {mode === 'minify'
                        ? `${((processStats.savings / processStats.original) * 100).toFixed(2)}%`
                        : formatBytes(processStats.savings)}
                    </p>
                  </div>
                  <Sparkles className="w-8 h-8 opacity-80" />
                </div>
                {mode === 'minify' && (
                  <Progress value={(processStats.savings / processStats.original) * 100} className="mt-2" size="sm" classNames={{ indicator: "bg-white/80" }} />
                )}
              </CardBody>
            </Card>
          </div>
        )}

        {/* Main Editor */}
        <Card className="bg-default-50 dark:bg-default-100 shadow-xl">
          <CardBody className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload JS File
                </h3>
                {fileName && <Chip size="sm" color="success" variant="flat">{fileName}</Chip>}
              </div>
              <div className="flex gap-2">
                <Input ref={fileInputRef} type="file" accept=".js" onChange={handleFileUpload} variant="bordered" size="sm" className="flex-1" />
                <Button onPress={() => fileInputRef.current?.click()} color="primary" size="sm" startContent={<Upload className="w-3 h-3" />}>Upload</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Terminal className="w-4 h-4" /> Input JS</label>
                <Textarea
                  placeholder="Paste your code here..."
                  value={inputJS}
                  onChange={(e) => setInputJS(e.target.value)}
                  variant="bordered"
                  minRows={12}
                  classNames={{ input: "font-mono text-xs" }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Code2 className="w-4 h-4" /> Output</label>
                <Textarea
                  placeholder="Processed code will appear here..."
                  value={outputJS}
                  variant="bordered"
                  minRows={12}
                  readOnly
                  classNames={{ input: "font-mono text-xs" }}
                />
              </div>
            </div>

            {/* ACTION BUTTONS GROUP */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button color="primary" onPress={processJS} isLoading={isProcessing} startContent={!isProcessing && <Zap className="w-4 h-4" />} className="flex-1 font-semibold">
                {mode === 'minify' ? 'Minify Code' : 'Beautify Code'}
              </Button>
              <Button color="success" variant="flat" onPress={() => copyToClipboard(outputJS)} startContent={<Copy className="w-4 h-4" />}>Copy</Button>
              <Button color="primary" variant="flat" onPress={handleDownload} isDisabled={!outputJS} startContent={<Download className="w-4 h-4" />}>Download</Button>

              {/* ADVANCED SETTINGS ICON BUTTON - POSITIONED BEFORE RESET */}
              {mode === 'minify' && (
                <Tooltip content="Advanced Settings">
                  <Button
                    isIconOnly
                    variant="flat"
                    color="secondary"
                    onPress={() => setShowSettings(!showSettings)}
                    className="transition-all"
                  >
                    <Settings className={`w-5 h-5 transition-transform ${showSettings ? 'rotate-90 text-primary' : ''}`} />
                  </Button>
                </Tooltip>
              )}

              <Button color="danger" variant="flat" onPress={handleReset} startContent={<RefreshCw className="w-4 h-4" />}>Reset</Button>
            </div>

            {/* SETTINGS PANEL */}
            {mode === 'minify' && showSettings && (
              <div className="mt-2 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <Divider className="my-4" />
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h4 className="text-sm font-semibold mb-3">Compression Intensity</h4>
                  <Slider
                    step={20}
                    maxValue={100}
                    minValue={0}
                    value={compressionLevel}
                    onChange={(v) => setCompressionLevel(v as number)}
                    className="max-w-full"
                    size="sm"
                  />
                  <div className="flex justify-between mt-2 text-xs opacity-70">
                    <span>Fast</span>
                    <span className="font-bold text-primary">{compressionLevel}%</span>
                    <span>Maximum (Deep)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30 p-4 rounded-lg">
                  <Switch isSelected={mangle} onValueChange={setMangle} size="sm">
                    <div className="text-xs font-medium">Mangle Variables <span className="block opacity-60 font-normal">Shorten variable names</span></div>
                  </Switch>
                  <Switch isSelected={compress} onValueChange={setCompress} size="sm">
                    <div className="text-xs font-medium">Compress Logic <span className="block opacity-60 font-normal">Optimize loops & ifs</span></div>
                  </Switch>
                  <Switch isSelected={dropConsole} onValueChange={setDropConsole} size="sm">
                    <div className="text-xs font-medium">Drop Console <span className="block opacity-60 font-normal">Remove console.log</span></div>
                  </Switch>
                  <Switch isSelected={formatComments} onValueChange={setFormatComments} size="sm">
                    <div className="text-xs font-medium">Keep Comments <span className="block opacity-60 font-normal">Preserve JSDoc/Comments</span></div>
                  </Switch>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <InfoSectionJavascriptMinifier />
    </ToolLayout>
  )
}