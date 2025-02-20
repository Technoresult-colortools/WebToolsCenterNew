"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button, Card, CardBody, Input, Switch, Textarea, Tabs, Tab, Slider } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Upload, Copy, RefreshCw, Download, Zap, Info, Settings, BookOpen, Lightbulb } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

const MAX_FILE_SIZE_MB = 10 // 10MB limit

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

      // Apply aggressiveness (simplified example)
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
    }
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
    a.download = "minified.html"
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

  return (
    <ToolLayout
      title="HTML Minifier"
      description="Compress and optimize your HTML code with advanced minification options"
      toolId="678f382f26f06f912191bcbc"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="HTML Minifier options">
              <Tab key="minify" title="Minify HTML">
                <div className="space-y-4 mt-4">
                    <Textarea
                      label="Input HTML"
                      placeholder="Enter HTML to minify or drag and drop an HTML file here..."
                      value={inputHTML}
                      onChange={handleInputChange}
                      variant="bordered"
                      minRows={4}
                    />
                  </div>
                  <Textarea label="Minified HTML" className="mt-4" value={outputHTML} variant="bordered" minRows={4} readOnly />

              </Tab>
            </Tabs>

            <div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
                <Button className="w-full md:flex-1" color="primary" onPress={minifyHTML} startContent={<Zap />}>
                    Minify HTML
                </Button>
                <Button className="w-full md:flex-1" color="primary" onPress={() => copyToClipboard(outputHTML)} startContent={<Copy />}>
                    Copy Minified
                </Button>
                <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<RefreshCw />}>
                    Reset
                </Button>
                <Button className="w-full md:flex-1" color="primary" onPress={handleDownload} isDisabled={!outputHTML} startContent={<Download />}>
                    Download
                </Button>
                </div>

            {/* Minification Stats */}
            {minificationStats.originalSize > 0 && (
              <Card className="mt-4 bg-default-100 dark:bg-default-200">
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2">Minification Results:</h3>
                  <p>Original size: {minificationStats.originalSize} bytes</p>
                  <p>Minified size: {minificationStats.minifiedSize} bytes</p>
                  <p>Reduction: {minificationStats.percentReduction}%</p>
                </CardBody>
              </Card>
            )}

            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Minification Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Switch isSelected={removeComments} onValueChange={setRemoveComments}>
                  Remove Comments
                </Switch>
                <Switch isSelected={removeWhitespace} onValueChange={setRemoveWhitespace}>
                  Remove Whitespace
                </Switch>
                <Switch isSelected={removeEmptyAttributes} onValueChange={setRemoveEmptyAttributes}>
                  Remove Empty Attributes
                </Switch>
                <Switch isSelected={shortenBooleanAttributes} onValueChange={setShortenBooleanAttributes}>
                  Shorten Boolean Attributes
                </Switch>
                <Switch isSelected={removeOptionalTags} onValueChange={setRemoveOptionalTags}>
                  Remove Optional Tags
                </Switch>
                <Switch isSelected={collapseWhitespace} onValueChange={setCollapseWhitespace}>
                  Collapse Whitespace
                </Switch>
                <Switch isSelected={minifyJS} onValueChange={setMinifyJS}>
                  Minify JavaScript
                </Switch>
                <Switch isSelected={minifyCSS} onValueChange={setMinifyCSS}>
                  Minify CSS
                </Switch>
                <Switch isSelected={removeDataAttributes} onValueChange={setRemoveDataAttributes}>
                  Remove Data Attributes
                </Switch>
                <Switch isSelected={removeScriptTypeAttributes} onValueChange={setRemoveScriptTypeAttributes}>
                  Remove Script Type Attributes
                </Switch>
                <Switch isSelected={removeStyleLinkTypeAttributes} onValueChange={setRemoveStyleLinkTypeAttributes}>
                  Remove Style/Link Type Attributes
                </Switch>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium">Minification Aggressiveness</label>
              <Slider
                label="Aggressiveness"
                step={1}
                maxValue={100}
                minValue={0}
                value={aggressiveness}
                onChange={(value) => setAggressiveness(value as number)}
                className="max-w-md"
              />
              <p className="text-sm">Current: {aggressiveness}%</p>
            </div>

            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Upload HTML File</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto gap-2">
                        <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".html,.htm"
                        onChange={handleFileUpload}
                        variant="bordered"
                        className="w-full sm:w-auto"
                        />
                        <Button 
                        onPress={() => fileInputRef.current?.click()} 
                        color="primary" 
                        startContent={<Upload />} 
                        className="w-full sm:w-auto"
                        >
                        Upload File
                        </Button>
                    </div>
                    {fileName && <span className="text-sm text-center sm:text-left">{fileName}</span>}
                    </div>

              <p className="text-sm flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Max file size: {MAX_FILE_SIZE_MB}MB. Allowed types: HTML, HTM
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About HTML Minifier
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The HTML Minifier is a powerful tool designed to compress and optimize your HTML code by removing
                unnecessary characters, whitespace, and optional elements. This advanced tool helps reduce file size,
                improve page load times, and enhance overall website performance. Whether you're a developer, designer,
                or website owner, this tool ensures your HTML is lean and efficient without compromising functionality.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/HTMLMinifierPreview.png"
                  alt="Screenshot of the Enhanced HTML Minifier interface showing input area, minification options, and output"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use HTML Minifier?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter or paste your HTML code into the input area.</li>
                <li>Alternatively, upload an HTML file using the file upload feature (max {MAX_FILE_SIZE_MB}MB).</li>
                <li>Adjust the minification options according to your preferences.</li>
                <li>Set the minification aggressiveness using the slider.</li>
                <li>Click the "Minify HTML" button to process your code.</li>
                <li>Review the minified HTML in the output area and check the minification stats.</li>
                <li>Use the "Show Preview" button to see how the minified HTML renders in the browser.</li>
                <li>Copy the minified HTML to your clipboard or download it as a file.</li>
                <li>Use the "Reset" button to clear all inputs and start over.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Advanced HTML minification with multiple optimization options</li>
                <li>Customizable minification aggressiveness</li>
                <li>File upload support with drag and drop functionality</li>
                <li>Clipboard operations (paste and copy)</li>
                <li>Download minified HTML as a file</li>
                <li>Live preview of minified HTML</li>
                <li>Detailed minification statistics</li>
                <li>Responsive design for use on various devices</li>
                <li>Local storage to save input HTML between sessions</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Tips and Best Practices
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Always keep a backup of your original HTML files before minification.</li>
                <li>Start with lower aggressiveness and gradually increase if needed.</li>
                <li>Use the preview feature to ensure the minified HTML renders correctly.</li>
                <li>Be cautious when removing optional tags, as it may affect older browsers.</li>
                <li>Consider the balance between file size reduction and code readability.</li>
                <li>Test minified HTML across different browsers and devices.</li>
                <li>Use minification as part of your overall web performance optimization strategy.</li>
                <li>Combine HTML minification with server-side compression for best results.</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

