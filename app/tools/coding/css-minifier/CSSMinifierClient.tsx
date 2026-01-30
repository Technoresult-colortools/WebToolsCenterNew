"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card, CardBody, Input, Textarea, Chip, Progress, Divider, Switch, Slider, Tooltip } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Upload, Copy, RefreshCw, Download, Zap, FileCode, TrendingDown, Sparkles, Code2, Settings, Wand2 } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionCSSMinifier from "./info-section"

const MAX_FILE_SIZE_MB = 2

const minifyCSS = (css: string, options: MinifyOptions): string => {
  let minified = css

  if (options.removeComments) {
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, '')
  }

  if (options.removeWhitespace) {
    minified = minified.replace(/\s+/g, ' ')
  }

  if (options.compressColors) {
    // Convert #RRGGBB to #RGB where possible
    minified = minified.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi, '#$1$2$3')
  }

  if (options.removeEmptyRules) {
    minified = minified.replace(/[^{}]+\{\}/g, '')
  }

  if (options.mergeRules) {
    // Basic rule merging (simplified)
    minified = minified.replace(/\}\s*([^{]+)\{/g, ';}$1{')
  }

  // Standard minification
  minified = minified
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/;\}/g, '}')
    .replace(/;;+/g, ';')

  return minified.trim()
}

const beautifyCSS = (css: string): string => {
  let depth = 0
  const beautified = css.replace(/([{}:;,])/g, (match) => {
    if (match === '{') {
      depth++
      return ' {\n' + '  '.repeat(depth)
    }
    if (match === '}') {
      depth--
      return '\n' + '  '.repeat(depth) + '}\n' + '  '.repeat(depth)
    }
    if (match === ':') return ': '
    if (match === ';') return ';\n' + '  '.repeat(depth)
    if (match === ',') return ',\n' + '  '.repeat(depth)
    return match
  })
  return beautified.trim()
}

interface MinifyOptions {
  removeComments: boolean
  removeWhitespace: boolean
  compressColors: boolean
  removeEmptyRules: boolean
  mergeRules: boolean
}

export default function CSSMinifier() {
  const [inputCSS, setInputCSS] = useState('')
  const [outputCSS, setOutputCSS] = useState('')
  const [fileName, setFileName] = useState('')
  const [processStats, setProcessStats] = useState<{ original: number; processed: number; savings: number } | null>(null)
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify')
  const [showSettings, setShowSettings] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Minification options
  const [removeComments, setRemoveComments] = useState(true)
  const [removeWhitespace, setRemoveWhitespace] = useState(true)
  const [compressColors, setCompressColors] = useState(true)
  const [removeEmptyRules, setRemoveEmptyRules] = useState(true)
  const [mergeRules, setMergeRules] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState(50)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const processCSS = async () => {
    if (!inputCSS.trim()) {
      toast.error('Please enter some CSS to process.')
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      try {
        const options: MinifyOptions = {
          removeComments,
          removeWhitespace,
          compressColors,
          removeEmptyRules,
          mergeRules
        }

        const processed = mode === 'minify' ? minifyCSS(inputCSS, options) : beautifyCSS(inputCSS)
        setOutputCSS(processed)

        const originalSize = new Blob([inputCSS]).size
        const processedSize = new Blob([processed]).size
        const savings = originalSize - processedSize
        const savingsPercentage = ((savings / originalSize) * 100).toFixed(2)

        setProcessStats({
          original: originalSize,
          processed: processedSize,
          savings
        })

        toast.success(`CSS ${mode === 'minify' ? 'minified' : 'beautified'} successfully! ${mode === 'minify' ? `Reduced by ${savingsPercentage}%` : 'Formatted for readability'}`)
      } catch (error) {
        console.error(`Error ${mode}ing CSS:`, error)
        toast.error(`Error ${mode === 'minify' ? 'minifying' : 'beautifying'} CSS. Please check your input and try again.`)
      } finally {
        setIsProcessing(false)
      }
    }, 300)
  }

  const copyToClipboard = (text: string) => {
    if (!text.trim()) {
      toast.error(`No ${mode === 'minify' ? 'minified' : 'beautified'} CSS to copy.`)
      return
    }
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleReset = () => {
    setInputCSS('')
    setOutputCSS('')
    setFileName('')
    setProcessStats(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.success('Reset successful!')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.css') && file.type !== 'text/css') {
        toast.error('Please upload a CSS file.')
        return
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputCSS(content)
        toast.success('File uploaded successfully!')
      }
      reader.onerror = () => {
        toast.error('Error reading file. Please try again.')
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    if (!outputCSS.trim()) {
      toast.error(`No ${mode === 'minify' ? 'minified' : 'beautified'} CSS to download.`)
      return
    }
    const blob = new Blob([outputCSS], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName ? `${mode === 'minify' ? 'minified' : 'beautified'}-${fileName}` : `${mode === 'minify' ? 'minified' : 'beautified'}.css`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Download started!')
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
        setCompressColors(false)
        setRemoveEmptyRules(false)
        setMergeRules(false)
        setCompressionLevel(25)
        toast.success('Safe preset applied')
        break
      case 'balanced':
        setRemoveComments(true)
        setRemoveWhitespace(true)
        setCompressColors(true)
        setRemoveEmptyRules(true)
        setMergeRules(false)
        setCompressionLevel(50)
        toast.success('Balanced preset applied')
        break
      case 'aggressive':
        setRemoveComments(true)
        setRemoveWhitespace(true)
        setCompressColors(true)
        setRemoveEmptyRules(true)
        setMergeRules(true)
        setCompressionLevel(100)
        toast.success('Aggressive preset applied')
        break
    }
  }

  return (
    <ToolLayout
      title="CSS Minifier & Beautifier"
      description="Optimize your CSS with powerful minification and beautification tools"
      toolId="678f382f26f06f912191bcbd"
    >
      <div className="flex flex-col gap-6">
        {/* Mode Selection */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
                <span className="font-semibold">Minify CSS</span>
                <span className="text-xs opacity-70">Compress & optimize</span>
              </Button>
              <Button
                onPress={() => setMode('beautify')}
                variant={mode === 'beautify' ? 'solid' : 'flat'}
                color={mode === 'beautify' ? 'secondary' : 'default'}
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-2xl">✨</span>
                <span className="font-semibold">Beautify CSS</span>
                <span className="text-xs opacity-70">Format & prettify</span>
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Presets - Only show in minify mode */}
        {mode === 'minify' && (
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold">Quick Presets</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button onPress={() => applyPreset('safe')} variant="flat" size="lg" className="h-auto py-4 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-600 hover:scale-105 transition-transform">
                  <span className="text-2xl">🛡️</span>
                  <span className="font-semibold">Safe</span>
                  <span className="text-xs opacity-70">Basic compression</span>
                </Button>
                <Button onPress={() => applyPreset('balanced')} variant="flat" color="primary" size="lg" className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform">
                  <span className="text-2xl">⚖️</span>
                  <span className="font-semibold">Balanced</span>
                  <span className="text-xs opacity-70">Recommended</span>
                </Button>
                <Button onPress={() => applyPreset('aggressive')} variant="flat" color="warning" size="lg" className="h-auto py-4 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform">
                  <span className="text-2xl">⚡</span>
                  <span className="font-semibold">Aggressive</span>
                  <span className="text-xs opacity-70">Max compression</span>
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Stats Cards */}
        {processStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <CardBody className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90 mb-1">Original Size</p>
                  <p className="text-xl font-bold">{formatBytes(processStats.original)}</p>
                </div>
                <FileCode className="w-8 h-8 opacity-80" />
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <CardBody className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90 mb-1">{mode === 'minify' ? 'Minified' : 'Beautified'} Size</p>
                  <p className="text-xl font-bold">{formatBytes(processStats.processed)}</p>
                </div>
                <TrendingDown className="w-8 h-8 opacity-80" />
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90 mb-1">{mode === 'minify' ? 'Size Reduced' : 'Size Change'}</p>
                    <p className="text-xl font-bold">
                      {mode === 'minify' ? `${((processStats.savings / processStats.original) * 100).toFixed(2)}%` : formatBytes(Math.abs(processStats.savings))}
                    </p>
                  </div>
                  <Sparkles className="w-8 h-8 opacity-80" />
                </div>
                {mode === 'minify' && (
                  <Progress value={((processStats.savings / processStats.original) * 100)} className="mt-2" size="sm" classNames={{ indicator: "bg-white/80" }} />
                )}
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
                <h3 className="text-sm font-semibold flex items-center gap-2"><Upload className="w-4 h-4" /> Upload CSS File</h3>
                {fileName && <Chip size="sm" color="success" variant="flat">{fileName}</Chip>}
              </div>
              <div className="flex gap-2">
                <Input ref={fileInputRef} type="file" accept=".css" onChange={handleFileUpload} variant="bordered" size="sm" className="flex-1" />
                <Button onPress={() => fileInputRef.current?.click()} color="primary" size="sm" startContent={<Upload className="w-3 h-3" />}>Upload</Button>
              </div>
            </div>

            <Divider className="my-6" />

            {/* Input/Output Textareas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Code2 className="w-4 h-4" /> Input CSS</label>
                <Textarea placeholder="Paste your CSS code here..." value={inputCSS} onChange={(e) => setInputCSS(e.target.value)} variant="bordered" minRows={10} classNames={{ input: "font-mono text-xs" }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> {mode === 'minify' ? 'Minified' : 'Beautified'} Output</label>
                <Textarea placeholder={`${mode === 'minify' ? 'Minified' : 'Beautified'} CSS will appear here...`} value={outputCSS} variant="bordered" minRows={10} readOnly classNames={{ input: "font-mono text-xs" }} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button color="primary" onPress={processCSS} isLoading={isProcessing} startContent={!isProcessing && <Zap className="w-4 h-4" />} className="flex-1 sm:flex-none font-semibold">
                {mode === 'minify' ? 'Minify CSS' : 'Beautify CSS'}
              </Button>
              <Button color="success" variant="flat" onPress={() => copyToClipboard(outputCSS)} startContent={<Copy className="w-4 h-4" />} className="flex-1 sm:flex-none">Copy</Button>
              <Button color="primary" variant="flat" onPress={handleDownload} isDisabled={!outputCSS} startContent={<Download className="w-4 h-4" />} className="flex-1 sm:flex-none">Download</Button>

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

              <Button color="danger" variant="flat" onPress={handleReset} startContent={<RefreshCw className="w-4 h-4" />} className="flex-1 sm:flex-none">Reset</Button>
            </div>

            {/* Settings Section (Now positioned below actions) */}
            {mode === 'minify' && showSettings && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 mt-4">
                <Divider className="my-4" />
                <div className="bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold mb-3">Compression Level</h4>
                  <Slider step={10} maxValue={100} minValue={0} value={compressionLevel} onChange={(value) => setCompressionLevel(value as number)} className="max-w-full" size="sm" />
                  <div className="flex justify-between mt-2 text-xs opacity-70">
                    <span>Gentle</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{compressionLevel}%</span>
                    <span>Maximum</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold mb-3">Minification Options</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Switch size="sm" isSelected={removeComments} onValueChange={setRemoveComments}>
                      <div className="text-xs">
                        <p className="font-medium">Remove Comments</p>
                        <p className="opacity-70">Strip /* comments */</p>
                      </div>
                    </Switch>
                    <Switch size="sm" isSelected={removeWhitespace} onValueChange={setRemoveWhitespace}>
                      <div className="text-xs">
                        <p className="font-medium">Remove Whitespace</p>
                        <p className="opacity-70">Eliminate extra spaces</p>
                      </div>
                    </Switch>
                    <Switch size="sm" isSelected={compressColors} onValueChange={setCompressColors}>
                      <div className="text-xs">
                        <p className="font-medium">Compress Colors</p>
                        <p className="opacity-70">#RRGGBB → #RGB</p>
                      </div>
                    </Switch>
                    <Switch size="sm" isSelected={removeEmptyRules} onValueChange={setRemoveEmptyRules}>
                      <div className="text-xs">
                        <p className="font-medium">Remove Empty Rules</p>
                        <p className="opacity-70">Clean empty selectors</p>
                      </div>
                    </Switch>
                    <Switch size="sm" isSelected={mergeRules} onValueChange={setMergeRules}>
                      <div className="text-xs">
                        <p className="font-medium">Merge Rules</p>
                        <p className="opacity-70">Combine duplicate rules</p>
                      </div>
                    </Switch>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <InfoSectionCSSMinifier />
    </ToolLayout>
  )
} 