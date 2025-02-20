"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card, CardBody,  Input, Switch, Textarea, Tabs, Tab } from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import { FileMinus,  Upload, Info, BookOpen, Lightbulb, FileText, Clipboard, Trash2, DownloadCloud, Settings } from "lucide-react"
import { minify } from "terser"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

// Constants
const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const MAX_CODE_LENGTH = 500000 // 500KB for direct input

export default function JavaScriptMinifier() {
  const [inputJS, setInputJS] = useState("")
  const [outputJS, setOutputJS] = useState("")
  const [fileName, setFileName] = useState("")
  const [minificationStats, setMinificationStats] = useState<{
    original: number
    minified: number
    savings: number
  } | null>(null)
  const [isMinifying, setIsMinifying] = useState(false)
  const [dropConsole, setDropConsole] = useState(false)
  const [mangle, setMangle] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const minifyJavaScript = async (code: string) => {
    setIsMinifying(true)
    try {
      if (code.length > MAX_CODE_LENGTH) {
        throw new Error("Input code exceeds maximum length limit of 500KB")
      }

      const minifyOptions = {
        compress: {
          dead_code: true,
          drop_debugger: true,
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
          passes: 2,
        },
        mangle: mangle,
        format: {
          comments: false,
        },
      }

      const result = await minify(code, minifyOptions)

      if (!result || !result.code) {
        throw new Error("Minification failed: No output generated")
      }

      return result.code
    } catch (error) {
      if (error instanceof Error) {
        console.error("Minification error:", error.message)
        throw new Error(`Minification failed: ${error.message}`)
      }
      throw error
    } finally {
      setIsMinifying(false)
    }
  }

  const handleMinify = async () => {
    if (!inputJS.trim()) {
      toast.error("Please enter some JavaScript to minify.")
      return
    }

    try {
      const minified = await minifyJavaScript(inputJS)
      setOutputJS(minified)

      const originalSize = inputJS.length
      const minifiedSize = minified.length
      const savings = originalSize - minifiedSize
      const savingsPercentage = ((savings / originalSize) * 100).toFixed(2)

      setMinificationStats({ original: originalSize, minified: minifiedSize, savings })
      toast.success(`JavaScript minified successfully! Reduced by ${savingsPercentage}%`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      toast.error(errorMessage)
      setOutputJS("")
      setMinificationStats(null)
    }
  }

  const copyToClipboard = async (text: string) => {
    if (!text.trim()) {
      toast.error("No minified JavaScript to copy.")
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!")
    } catch {
      toast.error("Failed to copy to clipboard")
    }
  }

  const handleReset = () => {
    setInputJS("")
    setOutputJS("")
    setFileName("")
    setMinificationStats(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("Reset successful!")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".js")) {
      toast.error("Please upload a JavaScript file (.js)")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 1MB limit")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      return
    }

    setFileName(file.name)
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content.length > MAX_CODE_LENGTH) {
        toast.error("File content exceeds maximum length limit of 500KB")
        setFileName("")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }
      setInputJS(content)
      toast.success("File uploaded successfully!")
    }

    reader.onerror = () => {
      toast.error("Error reading file")
      setFileName("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }

    reader.readAsText(file)
  }

  const handleDownload = () => {
    if (!outputJS.trim()) {
      toast.error("No minified JavaScript to download.")
      return
    }
    try {
      const blob = new Blob([outputJS], { type: "application/javascript" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName ? `${fileName.replace(".js", ".min.js")}` : "minified.js"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("Download started!")
    } catch {
      toast.error("Failed to download file")
    }
  }

  return (
    <ToolLayout
      title="JavaScript Minifier"
      description="JavaScript Minifier is a powerful tool designed to reduce the file size of your JavaScript code"
      toolId="678f382f26f06f912191bcbe"
    >

      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs aria-label="JavaScript Minifier options">
            <Tab
              key="minify"
              title={
                <div className="flex items-center text-primary">
                  <FileMinus className="w-4 h-4 mr-2 text-primary" />
                  Minify JavaScript
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <Textarea
                  label="JavaScript to Minify"
                  placeholder="Enter JavaScript to minify..."
                  value={inputJS}
                  onChange={(e) => setInputJS(e.target.value)}
                  minRows={4}
                  variant="bordered"
                />
                <Textarea label="Minified JavaScript" variant="bordered" value={outputJS} readOnly minRows={4} />
              </div>
            </Tab>
          </Tabs>

          <div className="flex items-center space-x-4 mt-4">
            <Switch isSelected={dropConsole} onValueChange={setDropConsole}>
              Remove console.log statements
            </Switch>
            <Switch isSelected={mangle} onValueChange={setMangle}>
              Mangle variable names
            </Switch>
          </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 w-full">
            <Button className="w-full md:flex-1" color="primary" onPress={handleMinify} isLoading={isMinifying} startContent={<FileText />}>
                {isMinifying ? "Minifying..." : "Minify"}
            </Button>
            <Button className="w-full md:flex-1" color="secondary" onPress={() => copyToClipboard(outputJS)} startContent={<Clipboard />}>
                Copy
            </Button>
            <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<Trash2 />}>
                Reset
            </Button>
            <Button className="w-full md:flex-1" color="success" onPress={handleDownload} startContent={<DownloadCloud />}>
                Download
            </Button>
            </div>


          {minificationStats && (
            <Card className="mt-4">
              <CardBody>
                <h3 className="font-semibold mb-2">Minification Results:</h3>
                <p>Original size: {minificationStats.original} bytes</p>
                <p>Minified size: {minificationStats.minified} bytes</p>
                <p>
                  Saved: {minificationStats.savings} bytes (
                  {((minificationStats.savings / minificationStats.original) * 100).toFixed(2)}%)
                </p>
              </CardBody>
            </Card>
          )}

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Upload JavaScript File</h3>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <Input type="file" variant="bordered" accept=".js" onChange={handleFileUpload} ref={fileInputRef} />
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
                What is JavaScript Minifier?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
                The JavaScript Minifier is a powerful tool designed for web developers to optimize JavaScript code by reducing its file size. It removes unnecessary characters such as whitespace, newlines, and comments while applying optimizations to improve performance and reduce load times.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
                This tool offers advanced options like **console.log removal** and **variable name mangling**, making it useful for both beginners optimizing their first JavaScript file and experienced developers working on large-scale projects.
            </p>

            {/* Image Preview */}
            <div className="my-8">
                <Image
                src="/Images/JavascriptMinifierPreview.png"
                alt="Screenshot of the JavaScript Minifier interface showing the code editor and minification options"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            {/* How to Use */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use JavaScript Minifier?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter your JavaScript code in the input area or upload a JavaScript file (max 1MB).</li>
                <li>Adjust minification options, such as console.log removal and variable name mangling.</li>
                <li>Click the **"Minify"** button to process your code.</li>
                <li>Review the minified JavaScript in the output area and check minification statistics.</li>
                <li>Use the **"Copy"** button to copy the minified JavaScript to your clipboard.</li>
                <li>Use the **"Download"** button to save the minified JavaScript as a file.</li>
                <li>Click **"Reset"** to clear all inputs and start over.</li>
                <li>Experiment with different options to balance file size and readability.</li>
            </ol>

            {/* Key Features */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Uses **Terser** for efficient JavaScript minification.</li>
                <li>Advanced compression options for optimal file size reduction.</li>
                <li>Removes `console.log` statements to clean up the final code.</li>
                <li>Variable name mangling for further size reduction.</li>
                <li>Supports direct input and file uploads (up to 1MB).</li>
                <li>Real-time minification statistics for better optimization insights.</li>
                <li>Copy to clipboard functionality for quick use.</li>
                <li>Download minified JavaScript as a file.</li>
                <li>Responsive design for seamless use on all devices.</li>
                <li>Syntax error detection and reporting.</li>
            </ul>

            {/* Applications & Use Cases */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Applications and Use Cases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li><strong>Performance Optimization:</strong> Reduce JavaScript file sizes for faster page loads.</li>
                <li><strong>Bandwidth Savings:</strong> Minimize data transfer, beneficial for mobile users.</li>
                <li><strong>Code Obfuscation:</strong> Make it harder for others to reverse-engineer your code.</li>
                <li><strong>Development Workflow:</strong> Integrate minification into your build process.</li>
                <li><strong>CDN Preparation:</strong> Optimize files before uploading to a Content Delivery Network (CDN).</li>
                <li><strong>Legacy System Support:</strong> Reduce code size for memory-constrained systems.</li>
                <li><strong>A/B Testing:</strong> Quickly create minified versions of scripts for performance comparisons.</li>
                <li><strong>Open Source Contributions:</strong> Provide minified versions of your JavaScript libraries for easy distribution.</li>
            </ul>

            </div>

        </Card>
    </ToolLayout>
  )
}

