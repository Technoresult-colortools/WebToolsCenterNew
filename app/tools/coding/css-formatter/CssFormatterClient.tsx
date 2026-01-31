"use client"

import type React from "react"
import { useState, useRef, useMemo } from "react"
import { Button, Card, CardBody, Switch, Textarea, Chip, Divider, Slider, Tooltip } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Copy, Upload, Zap, FileCode, FileText, RotateCw, Settings2, CheckCircle2, DownloadCloud } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import prettier from "prettier/standalone"
import * as parserCss from "prettier/plugins/postcss"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionCSSFormatter from "./info-section"

export default function CSSFormatter() {
  const [inputCSS, setInputCSS] = useState("")
  const [outputCSS, setOutputCSS] = useState("")
  const [isFormatting, setIsFormatting] = useState(false)

  // Options
  const [useTabs, setUseTabs] = useState(false)
  const [singleQuotes, setSingleQuotes] = useState(false)
  const [sortProperties, setSortProperties] = useState(false)
  const [lineWidth, setLineWidth] = useState(80)
  const [minify, setMinify] = useState(false)
  const [removeComments, setRemoveComments] = useState(false)

  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Memoized stats for the top bar
  const stats = useMemo(() => ({
    input: inputCSS.length,
    output: outputCSS.length,
  }), [inputCSS, outputCSS])

  const formatCSS = async () => {
    if (!inputCSS.trim()) {
      toast.error("Please enter some CSS to format.")
      return
    }

    setIsFormatting(true)
    try {
      let cssToFormat = inputCSS
      if (removeComments) {
        cssToFormat = cssToFormat.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
      }

      const formattedCode = await prettier.format(cssToFormat, {
        parser: "css",
        plugins: [parserCss],
        useTabs: useTabs,
        singleQuote: singleQuotes,
        cssDeclarationSorter: sortProperties ? "alphabetical" : false,
        printWidth: minify ? 10000 : lineWidth,
        tabWidth: useTabs ? 1 : 2,
      })
      setOutputCSS(formattedCode)
      toast.success("CSS formatted successfully!")
    } catch (error) {
      console.error("Formatting error:", error)
      toast.error("Error formatting CSS. Please check your syntax.")
    } finally {
      setIsFormatting(false)
    }
  }

  const copyToClipboard = () => {
    if (!outputCSS.trim()) return
    navigator.clipboard.writeText(outputCSS)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setInputCSS("")
    setOutputCSS("")
    setFileName("")
    toast.success("Reset successful!")
  }

  const handleDownload = () => {
    if (!outputCSS.trim()) return
    const blob = new Blob([outputCSS], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "formatted.css"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => setInputCSS(e.target?.result as string)
      reader.readAsText(file)
      toast.success("File uploaded!")
    }
  }

  const addCSSReset = () => {
    const cssReset = `/* CSS Reset */\n*, *::before, *::after { box-sizing: border-box; }\nbody { margin: 0; line-height: 1.5; min-height: 100vh; }\nimg, picture { max-width: 100%; display: block; }\n\n`
    setInputCSS(prev => cssReset + prev)
    toast.success("CSS Reset added!")
  }

  return (
    <ToolLayout
      title="CSS Formatter"
      description="Clean up and standardize your CSS code with advanced formatting options"
      toolId="678f382f26f06f912191bcc0"
    >
      <div className="flex flex-col gap-6">

        {/* 1. Compact Stats Bar */}
        <Card className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/30 dark:via-blue-950/30 dark:to-cyan-950/30 border-2 border-primary/20 shadow-lg">
          <CardBody className="p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-default-700">Input:</span>
                  <span className="text-sm font-bold text-primary">{stats.input.toLocaleString()}</span>
                  <span className="text-xs text-default-500 ml-1">chars</span>
                </div>

                {outputCSS && (
                  <>
                    <div className="text-default-400">→</div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                      <Zap className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-default-700">Output:</span>
                      <span className="text-sm font-bold text-success">{stats.output.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {fileName && (
                  <Chip size="sm" variant="flat" color="secondary" className="hidden sm:flex" startContent={<FileCode className="w-3 h-3" />}>
                    {fileName}
                  </Chip>
                )}
                <Tooltip content="Reset All">
                  <Button isIconOnly size="sm" variant="flat" color="danger" onPress={handleReset}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 2. Input Section */}
        <Card className="shadow-lg border border-default-200 overflow-hidden">
          <div className="p-4 bg-default-100/50 border-b border-default-200 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <FileCode className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold">Input CSS</h3>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="flat" color="secondary" onPress={addCSSReset} startContent={<RotateCw className="w-3.5 h-3.5" />}>
                CSS Reset
              </Button>
              <Button size="sm" variant="flat" onPress={() => fileInputRef.current?.click()} startContent={<Upload className="w-3.5 h-3.5" />}>
                Upload
              </Button>
            </div>
          </div>
          <CardBody className="p-4">
            <Textarea
              placeholder="Paste your CSS here..."
              value={inputCSS}
              onChange={(e) => setInputCSS(e.target.value)}
              minRows={10}
              variant="bordered"
              classNames={{ input: "font-mono text-sm" }}
            />
          </CardBody>
        </Card>

        {/* 3. Reallocated Formatting Options Grid */}
        <Card className="shadow-lg border border-default-200 overflow-hidden">
          <div className="p-3 bg-default-100/50 border-b border-default-200">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-warning" />
              <h3 className="text-sm font-bold">Formatting Options</h3>
            </div>
          </div>
          <CardBody className="p-6 space-y-8">

            {/* Toggles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <Switch size="sm" isSelected={useTabs} onValueChange={setUseTabs}>
                <span className="text-xs font-bold">Use Tabs</span>
              </Switch>
              <Switch size="sm" isSelected={singleQuotes} onValueChange={setSingleQuotes}>
                <span className="text-xs font-bold">Single Quotes</span>
              </Switch>
              <Switch size="sm" isSelected={sortProperties} onValueChange={setSortProperties}>
                <span className="text-xs font-bold">Sort Alphabetical</span>
              </Switch>
              <Switch size="sm" isSelected={removeComments} onValueChange={setRemoveComments} color="danger">
                <span className="text-xs font-bold text-danger">Strip Comments</span>
              </Switch>
              <Switch size="sm" isSelected={minify} onValueChange={setMinify} color="warning">
                <span className="text-xs font-bold text-warning">Minify Output</span>
              </Switch>
            </div>

            <Divider />

            {/* Slider & Action Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Slider
                label="Max Line Width"
                size="sm"
                step={10}
                maxValue={200}
                minValue={40}
                value={lineWidth}
                onChange={(v) => setLineWidth(v as number)}
                isDisabled={minify}
                classNames={{ label: "text-xs font-bold uppercase text-default-500" }}
                marks={[{ value: 80, label: "80" }, { value: 120, label: "120" }, { value: 180, label: "180" }]}
              />
              <div className="flex items-center justify-center">
                <Button
                  size="md"
                  color="primary"
                  variant="shadow"
                  onPress={formatCSS}
                  isLoading={isFormatting}
                  className="font-bold px-10"
                  startContent={!isFormatting && <Zap className="w-5 h-5" />}
                >
                  {isFormatting ? "Formatting..." : "Format CSS Code"}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 4. Output Section */}
        {outputCSS && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="shadow-lg border border-success/30 overflow-hidden">
              <div className="p-4 bg-success/5 border-b border-success/20 flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-success/10 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <h3 className="text-sm font-bold text-success">Formatted CSS</h3>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" color="success" variant="flat" onPress={copyToClipboard} startContent={<Copy className="w-3.5 h-3.5" />}>
                    Copy
                  </Button>
                  <Tooltip content="Download file">
                    <Button size="sm" color="success" variant="flat" isIconOnly onPress={handleDownload}>
                      <DownloadCloud className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <SyntaxHighlighter
                language="css"
                style={atomDark}
                customStyle={{ margin: 0, maxHeight: "600px", fontSize: "0.85rem", padding: "1.5rem" }}
              >
                {outputCSS}
              </SyntaxHighlighter>
            </Card>
          </div>
        )}

        {/* Hidden File Input */}
        <input type="file" accept=".css" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />


      </div>
      {/* 5. Info Section */}
      <InfoSectionCSSFormatter />
    </ToolLayout>
  )
}