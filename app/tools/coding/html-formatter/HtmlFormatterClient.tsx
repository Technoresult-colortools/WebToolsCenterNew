"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  Textarea,
  Tabs,
  Tab,
  Slider,
} from "@nextui-org/react"
import { toast,} from "react-hot-toast"
import { FileMinus, Upload, Info, BookOpen, Lightbulb, Zap, Eye, EyeOff, FileText, Clipboard, RotateCw, DownloadCloud } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import prettier from "prettier/standalone"
import * as prettierPluginHtml from "prettier/plugins/html"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

interface FormatterOptions {
  useTabs: boolean
  singleQuotes: boolean
  indentSize: number
  wrapLineLength: number
  preserveNewlines: boolean
  removeComments: boolean
}

const MAX_FILE_SIZE_MB = 5 // 5MB limit

export default function HTMLFormatter() {
  const [inputHTML, setInputHTML] = useState("")
  const [outputHTML, setOutputHTML] = useState("")
  const [isFormatting, setIsFormatting] = useState(false)
  const [options, setOptions] = useState<FormatterOptions>({
    useTabs: false,
    singleQuotes: false,
    indentSize: 2,
    wrapLineLength: 80,
    preserveNewlines: true,
    removeComments: false,
  })
  const [fileName, setFileName] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [characterCount, setCharacterCount] = useState({ input: 0, output: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCharacterCount({
      input: inputHTML.length,
      output: outputHTML.length,
    })
  }, [inputHTML, outputHTML])

  const formatHTML = async () => {
    if (!inputHTML.trim()) {
      toast.error("Please enter some HTML to format.")
      return
    }

    setIsFormatting(true)
    try {
      const formattedCode = await prettier.format(inputHTML, {
        parser: "html",
        plugins: [prettierPluginHtml],
        useTabs: options.useTabs,
        singleQuote: options.singleQuotes,
        tabWidth: options.indentSize,
        printWidth: options.wrapLineLength,
        htmlWhitespaceSensitivity: "ignore",
        preserveNewlines: options.preserveNewlines,
        removeComments: options.removeComments,
      })
      setOutputHTML(formattedCode)
      toast.success("HTML formatted successfully!")
    } catch (error) {
      console.error("Formatting error:", error)
      toast.error("Error formatting HTML. Please check your input.")
    } finally {
      setIsFormatting(false)
    }
  }

  const copyToClipboard = () => {
    if (!outputHTML.trim()) {
      toast.error("No formatted HTML to copy.")
      return
    }
    navigator.clipboard.writeText(outputHTML)
    toast.success("Formatted HTML copied to clipboard!")
  }

  const handleReset = () => {
    setInputHTML("")
    setOutputHTML("")
    setFileName("")
    setOptions({
      useTabs: false,
      singleQuotes: false,
      indentSize: 2,
      wrapLineLength: 80,
      preserveNewlines: true,
      removeComments: false,
    })
    setShowPreview(false)
    toast.success("Reset done successfully")
  }

  const handleDownload = () => {
    if (!outputHTML.trim()) {
      toast.error("No formatted HTML to download.")
      return
    }
    const blob = new Blob([outputHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "formatted.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Download started!")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputHTML(content)
        toast.success("File uploaded successfully!")
      }
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.")
      }
      reader.readAsText(file)
    }
  }

  const handleOptionChange = (option: keyof FormatterOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [option]: value }))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        input.files = dataTransfer.files
        const event = { target: input } as React.ChangeEvent<HTMLInputElement>
        handleFileUpload(event)
      }
    }
  }

  return (
    <ToolLayout
      title="HTML Formatter"
      description="Clean up, standardize, and optimize your HTML code with advanced formatting options"
      toolId="678f382f26f06f912191bcbf"
    >

      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs aria-label="HTML Formatter options">
            <Tab
              key="format"
              title={
                <div className="flex items-center text-primary">
                  <FileMinus className="w-4 h-4 mr-2 text-primary" />
                  Format HTML
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <Textarea
                  label="HTML to Format"
                  placeholder="Enter HTML to format or drag and drop an HTML file here..."
                  value={inputHTML}
                  onChange={(e) => setInputHTML(e.target.value)}
                  minRows={4}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  variant="bordered"
                />
                <p className="text-sm text-default-500">Character count: {characterCount.input}</p>

                <SyntaxHighlighter
                  language="html"
                  style={atomDark}
                  className="w-full min-h-[100px] max-h-[300px] overflow-auto"
                >
                  {outputHTML}
                </SyntaxHighlighter>
                <p className="text-sm text-default-500">Character count: {characterCount.output}</p>
              </div>
            </Tab>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mt-2">
            <Switch isSelected={options.useTabs} onValueChange={(checked) => handleOptionChange("useTabs", checked)}>
                Use Tabs
            </Switch>
            <Switch isSelected={options.singleQuotes} onValueChange={(checked) => handleOptionChange("singleQuotes", checked)}>
                Use Single Quotes
            </Switch>
            <Switch isSelected={options.preserveNewlines} onValueChange={(checked) => handleOptionChange("preserveNewlines", checked)}>
                Preserve Newlines
            </Switch>
            </div>

            <div className="space-y-2">
              <Switch
                isSelected={options.removeComments}
                onValueChange={(checked) => handleOptionChange("removeComments", checked)}
              >
                Remove Comments
              </Switch>
              <Slider
                label="Indent Size"
                step={1}
                maxValue={8}
                minValue={1}
                value={options.indentSize}
                onChange={(value) => handleOptionChange("indentSize", value as number)}
                className="max-w-md"
              />
              <Slider
                label="Wrap Line Length"
                step={1}
                maxValue={120}
                minValue={40}
                value={options.wrapLineLength}
                onChange={(value) => handleOptionChange("wrapLineLength", value as number)}
                className="max-w-md"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
            <Button className="w-full md:flex-1" color="primary" onPress={formatHTML} isLoading={isFormatting} startContent={<FileText />}>
                {isFormatting ? "Formatting..." : "Format"}
            </Button>
            <Button className="w-full md:flex-1" color="secondary" onPress={copyToClipboard} isDisabled={!outputHTML} startContent={<Clipboard />}>
                Copy
            </Button>
            <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<RotateCw />}>
                Reset
            </Button>
            <Button className="w-full md:flex-1" color="success" onPress={handleDownload} isDisabled={!outputHTML} startContent={<DownloadCloud />}>
                Download
            </Button>
            <Button
                className="w-full md:flex-1"
                color="primary"
                onPress={() => setShowPreview(!showPreview)}
                startContent={showPreview ? <EyeOff /> : <Eye />}
            >
                {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            </div>


          {showPreview && (
            <Card className="mt-4">
              <CardBody>
                <div dangerouslySetInnerHTML={{ __html: outputHTML }} />
              </CardBody>
            </Card>
          )}

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Upload HTML File</h3>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <Input type="file" variant="bordered" accept=".html,.htm" onChange={handleFileUpload} ref={fileInputRef} />
              <Button color="primary" onPress={() => fileInputRef.current?.click()} startContent={<Upload />}>
                Upload
              </Button>
            </div>
            {fileName && <p className="text-sm mt-2">Uploaded: {fileName}</p>}
            <p className="text-sm text-default-500 mt-1 flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Max file size: {MAX_FILE_SIZE_MB}MB. Allowed types: HTML, HTM
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            
            {/* About Section */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is HTML Formatter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The HTML Formatter is an effective tool for cleaning up, normalizing, and enhancing your HTML code. It utilizes **Prettier**, an excellent code formatting engine, to ensure that your HTML output is consistent and readable. Whether you're a web developer, designer, or author, this tool allows you to create clean, ordered, and optimized code seamlessly.
            </p>

            {/* Image Preview */}
            <div className="my-8">
                <Image
                src="/Images/InfosectionImages/HTMLFOrmatterPreview.png?height=400&width=600"
                alt="Screenshot of the HTML Formatter interface showing input, options, and output preview"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            {/* How to Use */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use HTML Formatter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter your HTML code in the input area or upload an HTML file (max 5MB).</li>
                <li>Adjust formatting options to your preferences.</li>
                <li>Click the "Format" button to process your HTML code.</li>
                <li>Review the formatted HTML in the syntax-highlighted output area.</li>
                <li>Click "Show Preview" to see how the formatted HTML renders in the browser.</li>
                <li>Use the "Copy" button to copy the formatted HTML to your clipboard.</li>
                <li>Click "Download" to save the formatted HTML as a file.</li>
                <li>Click "Reset" to clear all inputs and start over.</li>
            </ol>

            {/* Key Features */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>**Prettier-powered formatting** for consistent, industry-standard results.</li>
                <li>Customizable indentation (spaces or tabs) and indent size.</li>
                <li>Choose between **single or double quotes** for attributes.</li>
                <li>Adjustable line wrapping length for improved readability.</li>
                <li>Option to **preserve newlines** for maintaining document structure.</li>
                <li>Comment removal feature for cleaning up production code.</li>
                <li>**Syntax highlighting** for easy reading and error detection.</li>
                <li>Supports **drag-and-drop** file uploads (max 5MB).</li>
                <li>**Live preview** to see how formatted HTML renders in the browser.</li>
                <li>Character count for both input and output.</li>
                <li>One-click **copy** and **download** options.</li>
            </ul>

            {/* Advanced Usage */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Advanced Usage
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Integrate this formatter into your **development workflow** or CI/CD pipeline for consistent code style.</li>
                <li>Combine with **CSS and JavaScript minification** for optimized web assets.</li>
                <li>Experiment with different formatting options to find the best balance between readability and file size.</li>
                <li>Use with **HTML validation tools** to ensure both well-formatted and structurally correct HTML.</li>
                <li>Create **project-specific presets** for consistent formatting across different projects.</li>
                <li>Utilize the formatter as a **learning tool** for adopting HTML best practices and modern conventions.</li>
            </ul>
            </div>
        </Card>
    </ToolLayout>
  )
}

