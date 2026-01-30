"use client"

import type React from "react"
import { useState, useRef, useMemo } from "react"
import { Button, Card, CardBody, Input, Switch, Textarea, Chip, Divider, Tooltip, ButtonGroup } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Copy, Download, Upload, Zap, FileCode, Trash2, FileText, RotateCw, Settings2, CheckCircle2, DownloadCloud, Code, Braces } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import prettier from "prettier/standalone"
import parserBabel from "prettier/plugins/babel"
import parserTypeScript from "prettier/plugins/typescript"
import parserEstree from "prettier/plugins/estree"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionJavascriptFormatter from "./info-section"

export default function JavaScriptFormatter() {
  const [inputJS, setInputJS] = useState("")
  const [outputJS, setOutputJS] = useState("")
  const [isFormatting, setIsFormatting] = useState(false)

  // All original options preserved
  const [useTabs, setUseTabs] = useState(false)
  const [singleQuotes, setSingleQuotes] = useState(false)
  const [semicolons, setSemicolons] = useState(true)
  const [indentSize, setIndentSize] = useState(2)
  const [removeComments, setRemoveComments] = useState(false)
  const [compressCode, setCompressCode] = useState(false)
  const [sortImports, setSortImports] = useState(false)
  const [removeConsoleLog, setRemoveConsoleLog] = useState(false)
  const [selectedParser, setSelectedParser] = useState<'babel' | 'typescript'>('babel')

  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const stats = useMemo(() => ({
    input: inputJS.length,
    output: outputJS.length,
  }), [inputJS, outputJS])

  const formatJS = async () => {
    if (!inputJS.trim()) {
      toast.error("Please enter some JavaScript to format.")
      return
    }

    setIsFormatting(true)
    try {
      const plugins = selectedParser === 'babel'
        ? [parserBabel, parserEstree]
        : [parserTypeScript, parserEstree]

      let formattedCode = await prettier.format(inputJS, {
        parser: selectedParser,
        plugins: plugins,
        useTabs: useTabs,
        tabWidth: indentSize,
        singleQuote: singleQuotes,
        semi: semicolons,
        printWidth: compressCode ? Number.POSITIVE_INFINITY : 80,
      })

      if (removeComments) {
        formattedCode = formattedCode.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1")
      }

      if (sortImports) {
        const importLines = formattedCode.match(/import.*from.*;?/g) || []
        const sortedImports = importLines.sort().join("\n")
        formattedCode = formattedCode.replace(/import.*from.*;?/g, "")
        formattedCode = sortedImports + "\n\n" + formattedCode
      }

      if (removeConsoleLog) {
        formattedCode = formattedCode.replace(/console\.log\(.*\);?/g, "")
      }

      setOutputJS(formattedCode)
      toast.success("JavaScript formatted successfully!")
    } catch (error: any) {
      toast.error(error.message?.includes("SyntaxError") ? "Syntax error detected in code." : "Formatting failed.")
    } finally {
      setIsFormatting(false)
    }
  }

  const handleReset = () => {
    setInputJS(""); setOutputJS(""); setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = ""
    toast.success("Reset completed")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File exceeds 5MB limit.")
        return
      }
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => setInputJS(e.target?.result as string)
      reader.readAsText(file)
      toast.success("File uploaded!")
    }
  }

  const handleDownload = () => {
    if (!outputJS) return
    const blob = new Blob([outputJS], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "formatted.js"
    a.click()
  }

  return (
    <ToolLayout
      title="JavaScript Formatter"
      description="Effortlessly beautify, clean, and standardize JavaScript and TypeScript code online with this professional Prettier-powered formatter and multi-parser tool."
      toolId="678f382f26f06f912191bcc1"
    >
      <div className="flex flex-col gap-6">

        {/* 1. Compact Stats Bar */}
        {/* Compact Stats Bar */}
        <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-2 border-primary/20 shadow-lg">
          <CardBody className="p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-default-700">Input:</span>
                  <span className="text-sm font-bold text-primary">{stats.input.toLocaleString()}</span>
                  <span className="text-xs text-default-500">chars</span>
                </div>

                {outputJS && (
                  <>
                    <div className="text-default-400">→</div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                      <Zap className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-default-700">Output:</span>
                      <span className="text-sm font-bold text-success">{stats.output.toLocaleString()}</span>
                      <span className="text-xs text-default-500">chars</span>
                    </div>

                    {stats.output < stats.input && (
                      <Chip size="sm" color="success" variant="flat" startContent={<CheckCircle2 className="w-3 h-3" />}>
                        {((1 - stats.output / stats.input) * 100).toFixed(1)}% smaller
                      </Chip>
                    )}
                  </>
                )}

                {fileName && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="secondary"
                    className="max-w-[250px]"
                    startContent={<Code className="w-3 h-3" />}
                  >
                    <span className="truncate">{fileName}</span>
                  </Chip>
                )}
              </div>

              <div className="flex gap-2">
                <Tooltip content="Reset all">
                  <Button
                    size="md"
                    variant="flat"
                    color="danger"
                    onPress={handleReset}
                    isIconOnly
                  >
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
                <Braces className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold">Input JavaScript</h3>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="flat" onPress={() => fileInputRef.current?.click()} startContent={<Upload className="w-3.5 h-3.5" />}>
                Upload
              </Button>
            </div>
          </div>
          <CardBody className="p-4">
            <Textarea
              placeholder="Paste your JavaScript/TypeScript here..."
              value={inputJS}
              onChange={(e) => setInputJS(e.target.value)}
              minRows={10}
              variant="bordered"
              classNames={{ input: "font-mono text-sm" }}
            />
          </CardBody>
        </Card>

        {/* 3. Formatting Options Grid */}
        <Card className="shadow-lg border border-default-200 overflow-hidden">
          <div className="p-3 bg-default-100/50 border-b border-default-200">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-warning" />
              <h3 className="text-sm font-bold">Formatting Options</h3>
            </div>
          </div>
          <CardBody className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Parser Selection */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase text-default-400">Parser Selection</p>
                <ButtonGroup size="sm" className="w-full">
                  <Button className="flex-1" color={selectedParser === 'babel' ? 'primary' : 'default'} onPress={() => setSelectedParser('babel')}>Babel</Button>
                  <Button className="flex-1" color={selectedParser === 'typescript' ? 'primary' : 'default'} onPress={() => setSelectedParser('typescript')}>TypeScript</Button>
                </ButtonGroup>
                <div className="pt-2 space-y-2">
                  <Switch size="sm" isSelected={useTabs} onValueChange={setUseTabs}><span className="text-xs">Use Tabs</span></Switch>
                  <div className="space-x-2"><Switch size="sm" isSelected={singleQuotes} onValueChange={setSingleQuotes}><span className="text-xs">Single Quotes</span></Switch></div>

                  <Switch size="sm" isSelected={semicolons} onValueChange={setSemicolons}><span className="text-xs">Add Semicolons</span></Switch>
                </div>
              </div>

              {/* Cleaning Options */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase text-default-400">Clean & Sort</p>
                <div className="space-y-2">
                  <Switch size="sm" color="danger" isSelected={removeComments} onValueChange={setRemoveComments}><span className="text-xs">Remove Comments</span></Switch>
                  <Switch size="sm" color="danger" isSelected={removeConsoleLog} onValueChange={setRemoveConsoleLog}><span className="text-xs">Remove console.log</span></Switch>
                  <div className="space-y-2"><Switch size="sm" color="secondary" isSelected={sortImports} onValueChange={setSortImports}><span className="text-xs">Sort Imports</span></Switch></div>

                  <Switch size="sm" color="warning" isSelected={compressCode} onValueChange={setCompressCode}><span className="text-xs">Compress Code</span></Switch>
                </div>
              </div>

              {/* Indent Size */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase text-default-400">Indentation</p>
                <Input
                  type="number"
                  label="Indent Size"
                  size="sm"
                  variant="bordered"
                  value={indentSize.toString()}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  isDisabled={useTabs}
                />
              </div>
            </div>

            <Divider />

            {/* Smaller Format Action */}
            <div className="flex justify-center">
              <Button
                size="md"
                color="primary"
                variant="shadow"
                onPress={formatJS}
                isLoading={isFormatting}
                className="font-bold px-10"
                startContent={!isFormatting && <Zap className="w-4 h-4" />}
              >
                Format Code
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* 4. Output Section */}
        {outputJS && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="shadow-lg border border-success/30 overflow-hidden">
              <div className="p-4 bg-success/5 border-b border-success/20 flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="text-sm font-bold text-success">Formatted JavaScript</h3>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" color="success" variant="flat" onPress={() => { navigator.clipboard.writeText(outputJS); toast.success("Copied!"); }} startContent={<Copy className="w-3.5 h-3.5" />}>
                    Copy
                  </Button>
                  <Button size="sm" color="success" variant="flat" isIconOnly onPress={handleDownload}>
                    <DownloadCloud className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                customStyle={{ margin: 0, maxHeight: "600px", fontSize: "0.85rem", padding: "1.5rem" }}
              >
                {outputJS}
              </SyntaxHighlighter>
            </Card>
          </div>
        )}


      </div>
      <InfoSectionJavascriptFormatter />

      <input type="file" accept=".js,.jsx,.ts,.tsx" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
    </ToolLayout>
  )
}