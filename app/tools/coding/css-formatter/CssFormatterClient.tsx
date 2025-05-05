"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card, CardBody, Input, Switch, Textarea, Tabs, Tab } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { FileMinus, Copy, Download, Upload, Info, BookOpen, Lightbulb, Zap, FileCode, Trash2, FileText } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import prettier from "prettier/standalone"
import * as parserCss from "prettier/plugins/postcss"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

export default function CSSFormatter() {
  const [inputCSS, setInputCSS] = useState("")
  const [outputCSS, setOutputCSS] = useState("")
  const [isFormatting, setIsFormatting] = useState(false)
  const [useTabs, setUseTabs] = useState(false)
  const [singleQuotes, setSingleQuotes] = useState(false)
  const [sortProperties, setSortProperties] = useState(false)
  const [lineWidth, setLineWidth] = useState(80)
  const [minify, setMinify] = useState(false)
  const [removeComments, setRemoveComments] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatCSS = async () => {
    if (!inputCSS.trim()) {
      toast.error("Please enter some CSS to format.")
      return
    }

    setIsFormatting(true)
    try {
      // If remove comments is enabled, we'll pre-process the CSS
      let cssToFormat = inputCSS
      
      if (removeComments) {
        // Remove both multi-line and single-line comments
        cssToFormat = cssToFormat.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
      }
      
      const formattedCode = await prettier.format(cssToFormat, {
        parser: "css",
        plugins: [parserCss],
        useTabs: useTabs,
        singleQuote: singleQuotes,
        cssDeclarationSorter: sortProperties ? "alphabetical" : false,
        printWidth: minify ? Number.POSITIVE_INFINITY : lineWidth,
        tabWidth: minify ? 0 : 2,
      })
      setOutputCSS(formattedCode)
      toast.success("CSS formatted successfully!")
    } catch (error) {
      console.error("Formatting error:", error)
      toast.error("Error formatting CSS. Please check your input.")
    } finally {
      setIsFormatting(false)
    }
  }

  const copyToClipboard = () => {
    if (!outputCSS.trim()) {
      toast.error("No formatted CSS to copy.")
      return
    }
    navigator.clipboard.writeText(outputCSS)
    toast.success("Formatted CSS copied to clipboard!")
  }

  const handleReset = () => {
    setInputCSS("")
    setOutputCSS("")
    setFileName("")
    toast.success("Reset done successfully!")
  }

  const handleDownload = () => {
    if (!outputCSS.trim()) {
      toast.error("No formatted CSS to download.")
      return
    }
    const blob = new Blob([outputCSS], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "formatted.css"
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
        setInputCSS(content)
        toast.success("File uploaded successfully!")
      }
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.")
      }
      reader.readAsText(file)
    }
  }

  const cssReset = `
/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
}
body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
  margin: 0;
}
ul[role="list"], ol[role="list"] {
  list-style: none;
}
html:focus-within {
  scroll-behavior: smooth;
}
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}
img, picture {
  max-width: 100%;
  display: block;
}
input, button, textarea, select {
  font: inherit;
}
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

  const addCSSReset = () => {
    setInputCSS((prevCSS) => cssReset + prevCSS)
    toast.success("CSS Reset added successfully!")
  }

  return (
    <ToolLayout title="CSS Formatter"
                description="Clean up and standardize your CSS code" 
                toolId="678f382f26f06f912191bcc0"
    >

    <div className="flex flex-col gap-8">
      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs aria-label="CSS Formatter options">
            <Tab
              key="format"
              title={
                <div className="flex items-center text-primary">
                  <FileMinus className="w-4 h-4 mr-2 text-primary" />
                  Format CSS
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <Textarea
                  label="CSS to Format"
                  placeholder="Enter CSS to format..."
                  value={inputCSS}
                  variant="bordered"
                  onChange={(e) => setInputCSS(e.target.value)}
                  minRows={4}
                />
                <p className="text-sm text-default-500">Characters: {inputCSS.length}</p>

                <SyntaxHighlighter
                  language="css"
                  style={atomDark}
                  className="w-full min-h-[100px] max-h-[300px] overflow-auto"
                >
                  {outputCSS}
                </SyntaxHighlighter>
                <p className="text-sm text-default-500">Characters: {outputCSS.length}</p>
              </div>
            </Tab>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Switch Group */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <Switch isSelected={useTabs} onValueChange={setUseTabs}>Use Tabs</Switch>
                </div>
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <Switch isSelected={singleQuotes} onValueChange={setSingleQuotes}>Use Single Quotes</Switch>
                </div>
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <Switch isSelected={sortProperties} onValueChange={setSortProperties}>Sort Properties</Switch>
                </div>
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <Switch isSelected={removeComments} onValueChange={setRemoveComments}>Remove Comments</Switch>
                </div>
            </div>

            {/* Input & Minify Switch */}
            <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  label="Line Width"
                  variant="bordered"
                  value={lineWidth.toString()}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                />
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <Switch isSelected={minify} onValueChange={setMinify}>Minify Output</Switch>
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-4 w-full">
              <Button className="w-full md:flex-1" color="primary" onPress={formatCSS} isLoading={isFormatting} startContent={<FileCode />}>
                  {isFormatting ? "Formatting..." : "Format"}
              </Button>
              <Button className="w-full md:flex-1" color="secondary" onPress={copyToClipboard} isDisabled={!outputCSS} startContent={<Copy />}>
                  Copy
              </Button>
              <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<Trash2 />}>
                  Reset
              </Button>
              <Button className="w-full md:flex-1" color="success" onPress={handleDownload} isDisabled={!outputCSS} startContent={<Download />}>
                  Download
              </Button>
              <Button className="w-full md:flex-1" color="primary" onPress={addCSSReset} startContent={<FileText />}>
                  Add CSS Reset
              </Button>
          </div>


          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Upload CSS File</h3>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <Input type="file" variant="bordered" accept=".css" onChange={handleFileUpload} ref={fileInputRef} />
              <Button color="primary" onPress={() => fileInputRef.current?.click()} startContent={<Upload />}>
                Upload
              </Button>
            </div>
            {fileName && <p className="text-sm mt-2">Uploaded: {fileName}</p>}
          </div>
        </CardBody>
      </Card>

      <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          
          {/* About Section */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is CSS Formatter?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
          The CSS formatter is a powerful tool designed to clean and standardize your CSS code. It uses a popular code formatting engine <strong>prettier</strong> to ensure consistent and readable CSS output. Whether you're a web developer, designer, or just a person working with CSS, this tool can help you maintain clean and organized stylesheets.
          </p>

          {/* Image Preview */}
          <div className="my-8">
              <Image
              src="/Images/InfosectionImages/CSSFormatterPreview.png?height=400&width=600"
              alt="Screenshot of the CSS Formatter interface showing input, formatting options, and output"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
              />
          </div>

          {/* How to Use */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use CSS Formatter?
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Enter your CSS code in the input area or upload a CSS file.</li>
              <li>Adjust formatting options according to your preferences.</li>
              <li>Click the <strong>"Format"</strong> button to process your code.</li>
              <li>Review the formatted CSS in the output area.</li>
              <li>Use the <strong>"Copy"</strong> button to copy the formatted CSS to your clipboard.</li>
              <li>Use the <strong>"Download"</strong> button to save the formatted CSS as a file.</li>
              <li>Click <strong>"Reset"</strong> to clear all inputs and start over.</li>
              <li>Use the <strong>"Add CSS Reset"</strong> button to include a basic CSS reset in your code.</li>
              <li>Toggle <strong>"Remove Comments"</strong> to strip all comments from your CSS.</li>
          </ol>

          {/* Key Features */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li><strong>Prettier-powered formatting</strong> for consistent results.</li>
              <li>Customizable indentation (spaces or tabs).</li>
              <li>Option to use <strong>single or double quotes</strong> for strings.</li>
              <li>Alphabetical sorting of CSS properties within selectors.</li>
              <li>Adjustable line width for formatting.</li>
              <li>Minification option for compressed output.</li>
              <li><strong>Comment removal</strong> for cleaner production code.</li>
              <li>Character count display for input and output.</li>
              <li>One-click addition of a <strong>CSS reset</strong>.</li>
              <li>Syntax highlighting for easy code reading.</li>
              <li>File upload support for formatting existing CSS files.</li>
              <li>One-click <strong>copy and download</strong> of formatted code.</li>
          </ul>

          {/* Advanced Usage */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Advanced Usage
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Combine the CSS Formatter with <strong>version control</strong> to track changes in your stylesheets.</li>
              <li>Use the formatted output as a base for creating <strong>coding standards</strong> in your team.</li>
              <li>Integrate the formatting process into your <strong>build pipeline</strong> for consistent styling.</li>
              <li>Remove comments in production code while keeping them in development for better performance.</li>
              <li>Experiment with different property sorting algorithms for better organization.</li>
              <li>Use the <strong>character count</strong> feature to optimize performance by identifying verbose selectors or rules.</li>
          </ul>
          </div>
      </Card>
    </div>
    </ToolLayout>
  )
}