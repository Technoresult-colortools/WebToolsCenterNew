"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card, CardBody, Input, Switch, Textarea, Tabs, Tab } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { FileMinus, Copy, Download, Upload, Info, BookOpen, Lightbulb, Zap, FileCode, Trash2 } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import prettier from "prettier/standalone"
import parserBabel from "prettier/plugins/babel"
import estree from "prettier/plugins/estree"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

export default function JavaScriptFormatter() {
  const [inputJS, setInputJS] = useState("")
  const [outputJS, setOutputJS] = useState("")
  const [isFormatting, setIsFormatting] = useState(false)
  const [useTabs, setUseTabs] = useState(false)
  const [singleQuotes, setSingleQuotes] = useState(false)
  const [semicolons, setSemicolons] = useState(true)
  const [indentSize, setIndentSize] = useState(2)
  const [removeComments, setRemoveComments] = useState(false)
  const [compressCode, setCompressCode] = useState(false)
  const [sortImports, setSortImports] = useState(false)
  const [removeConsoleLog, setRemoveConsoleLog] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatJS = async () => {
    if (!inputJS.trim()) {
      toast.error("Please enter some JavaScript to format.")
      return
    }

    setIsFormatting(true)
    try {
      let formattedCode = await prettier.format(inputJS, {
        parser: "babel",
        plugins: [parserBabel, estree],
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
        formattedCode = formattedCode.replace(/console\.log$$.*$$;?/g, "")
      }

      setOutputJS(formattedCode)
      toast.success("JavaScript formatted successfully!")
    } catch (error) {
      console.error("Formatting error:", error)
      toast.error("Error formatting JavaScript. Please check your input.")
    } finally {
      setIsFormatting(false)
    }
  }

  const copyToClipboard = () => {
    if (!outputJS.trim()) {
      toast.error("No formatted JavaScript to copy.")
      return
    }
    navigator.clipboard.writeText(outputJS)
    toast.success("Formatted JavaScript copied to clipboard!")
  }

  const handleReset = () => {
    setInputJS("")
    setOutputJS("")
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("Reset done successfully!")
  }

  const handleDownload = () => {
    if (!outputJS.trim()) {
      toast.error("No formatted JavaScript to download.")
      return
    }
    const blob = new Blob([outputJS], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "formatted.js"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Download started!")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputJS(content)
        toast.success("File uploaded successfully!")
      }
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.")
      }
      reader.readAsText(file)
    }
  }

  return (
    <ToolLayout
      title="JavaScript Formatter"
      description="Clean up and standardize your JavaScript code"
      toolId="678f382f26f06f912191bcc1"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="JavaScript Formatter options">
              <Tab
                key="format"
                title={
                  <div className="flex items-center text-primary">
                    <FileMinus className="w-4 h-4 mr-2 text-primary" />
                    Format JavaScript
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <Textarea
                    label="JavaScript to Format"
                    placeholder="Enter JavaScript to format..."
                    value={inputJS}
                    variant="bordered"
                    onChange={(e) => setInputJS(e.target.value)}
                    minRows={4}
                  />
                  <p className="text-sm text-default-500">Characters: {inputJS.length}</p>

                  <SyntaxHighlighter
                    language="javascript"
                    style={atomDark}
                    className="w-full min-h-[100px] max-h-[300px] overflow-auto"
                  >
                    {outputJS}
                  </SyntaxHighlighter>
                  <p className="text-sm text-default-500">Characters: {outputJS.length}</p>
                </div>
              </Tab>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Switch Group */}
              <div className="flex flex-col gap-2">
                <Switch isSelected={useTabs} onValueChange={setUseTabs}>
                  Use Tabs
                </Switch>
                <Switch isSelected={singleQuotes} onValueChange={setSingleQuotes}>
                  Use Single Quotes
                </Switch>
                <Switch isSelected={semicolons} onValueChange={setSemicolons}>
                  Add Semicolons
                </Switch>
                <Switch isSelected={removeComments} onValueChange={setRemoveComments}>
                  Remove Comments
                </Switch>
              </div>

              {/* Input & Additional Switches */}
              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  label="Indent Size"
                  variant="bordered"
                  value={indentSize.toString()}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                />
                <Switch isSelected={compressCode} onValueChange={setCompressCode}>
                  Compress Code
                </Switch>
                <Switch isSelected={sortImports} onValueChange={setSortImports}>
                  Sort Imports
                </Switch>
                <Switch isSelected={removeConsoleLog} onValueChange={setRemoveConsoleLog}>
                  Remove Console.log
                </Switch>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-4 w-full">
              <Button
                className="w-full md:flex-1"
                color="primary"
                onPress={formatJS}
                isLoading={isFormatting}
                startContent={<FileCode />}
              >
                {isFormatting ? "Formatting..." : "Format"}
              </Button>
              <Button
                className="w-full md:flex-1"
                color="secondary"
                onPress={copyToClipboard}
                isDisabled={!outputJS}
                startContent={<Copy />}
              >
                Copy
              </Button>
              <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<Trash2 />}>
                Reset
              </Button>
              <Button
                className="w-full md:flex-1"
                color="success"
                onPress={handleDownload}
                isDisabled={!outputJS}
                startContent={<Download />}
              >
                Download
              </Button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Upload JavaScript File</h3>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <Input
                  type="file"
                  variant="bordered"
                  accept=".js,.jsx,.ts,.tsx"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                />
                <Button color="primary" onPress={() => fileInputRef.current?.click()} startContent={<Upload />}>
                  Upload
                </Button>
              </div>
              {fileName && <p className="text-sm mt-2">Uploaded: {fileName}</p>}
            </div>
          </CardBody>
        </Card>

        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            {/* About Section */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is JavaScript Formatter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              The JavaScript Formatter is a powerful tool designed to clean up and standardize your JavaScript code. It
              uses Prettier, a popular code formatting engine, to ensure consistent and readable JavaScript output.
              Whether you're a web developer, software engineer, or just someone working with JavaScript, this tool can
              help you maintain clean and organized code.
            </p>

            {/* Image Preview */}
            <div className="my-8">
              <Image
                src="/Images/JavaScriptFormatterPreview.png"
                alt="Screenshot of the JavaScript Formatter interface showing input, formatting options, and output"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* How to Use */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use JavaScript Formatter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Enter your JavaScript code in the input area or upload a JavaScript file.</li>
              <li>Adjust formatting options according to your preferences.</li>
              <li>Click the "Format" button to process your code.</li>
              <li>Review the formatted JavaScript in the output area.</li>
              <li>Use the "Copy" button to copy the formatted JavaScript to your clipboard.</li>
              <li>Use the "Download" button to save the formatted JavaScript as a file.</li>
              <li>Click "Reset" to clear all inputs and start over.</li>
            </ol>

            {/* Key Features */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Prettier-powered formatting for consistent results.</li>
              <li>Customizable indentation (spaces or tabs).</li>
              <li>Option to use single or double quotes for strings.</li>
              <li>Control over semicolon insertion.</li>
              <li>Comment removal option for cleaner output.</li>
              <li>Code compression feature for minification.</li>
              <li>Import statement sorting.</li>
              <li>Console.log removal option.</li>
              <li>Syntax highlighting for easy code reading.</li>
              <li>File upload support for formatting existing JavaScript files.</li>
              <li>One-click copy and download of formatted code.</li>
              <li>Character count display for input and output.</li>
            </ul>

            {/* Advanced Usage */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Advanced Usage
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Integrate the JavaScript Formatter into your development workflow for consistent coding style.</li>
              <li>Use the formatted output as a base for creating coding standards in your team.</li>
              <li>Combine with linting tools for comprehensive code quality checks.</li>
              <li>Utilize the compression feature for preparing production-ready code.</li>
              <li>
                Experiment with different formatting options to find the style that best suits your project needs.
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}

