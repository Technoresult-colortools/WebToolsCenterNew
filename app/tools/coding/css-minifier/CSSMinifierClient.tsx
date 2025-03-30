"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button, Card, CardBody, Input,  Textarea, Tabs, Tab} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Upload, Copy, RefreshCw, Download, Zap, Info, Settings, BookOpen, Lightbulb } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

const MAX_FILE_SIZE_MB = 2 // 2MB limit

const minifyCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/;\}/g, '}')
    .replace(/[^{}]+\{\}/g, '')
    .replace(/;;+/g, ';')
}

const beautifyCSS = (css: string): string => {
  let depth = 0
  const beautified = css.replace(/([{}:;])/g, (match) => {
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
    return match
  })
  return beautified.trim()
}

export default function CSSMinifier() {
  const [inputCSS, setInputCSS] = useState('')
  const [outputCSS, setOutputCSS] = useState('')
  const [fileName, setFileName] = useState('')
  const [processStats, setProcessStats] = useState<{ original: number; processed: number; savings: number } | null>(null)
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processCSS = async () => {
    if (!inputCSS.trim()) {
      toast.error('Please enter some CSS to process.')
      return
    }

    try {
      const processed = mode === 'minify' ? minifyCSS(inputCSS) : beautifyCSS(inputCSS)
      setOutputCSS(processed)
      
      const originalSize = inputCSS.length
      const processedSize = processed.length
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
    }
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
    a.download = `${mode === 'minify' ? 'minified' : 'beautified'}.css`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Download started!')
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
      title={`CSS ${mode === 'minify' ? 'Minifier' : 'Beautifier'}`}
      description="Optimize your CSS with our powerful minification and beautification tool"
      toolId="678f382f26f06f912191bcbd"
    >
      
      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs aria-label="CSS Minifier options" selectedKey={mode} onSelectionChange={(key) => setMode(key as 'minify' | 'beautify')}>
            <Tab key="minify" title="Minify CSS">
              <div className="space-y-4 mt-4">
                <Textarea
                  label="Input CSS"
                  placeholder="Enter CSS to minify or drag and drop a CSS file here..."
                  value={inputCSS}
                  onChange={(e) => setInputCSS(e.target.value)}
                  variant="bordered"
                  minRows={4}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                />
              </div>
            </Tab>
            <Tab key="beautify" title="Beautify CSS">
              <div className="space-y-4 mt-4">
                <Textarea
                  label="Input CSS"
                  placeholder="Enter CSS to beautify or drag and drop a CSS file here..."
                  value={inputCSS}
                  onChange={(e) => setInputCSS(e.target.value)}
                  variant="bordered"
                  minRows={4}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                />
              </div>
            </Tab>
          </Tabs>

          <Textarea 
            label={`${mode === 'minify' ? 'Minified' : 'Beautified'} CSS`} 
            value={outputCSS} 
            variant="bordered" 
            minRows={4} 
            readOnly 
            className="mt-4"
          />

          <div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
            <Button className="w-full md:flex-1" color="primary" onPress={processCSS} startContent={<Zap />}>
              {mode === 'minify' ? 'Minify CSS' : 'Beautify CSS'}
            </Button>
            <Button className="w-full md:flex-1" color="primary" onPress={() => copyToClipboard(outputCSS)} startContent={<Copy />}>
              Copy
            </Button>
            <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<RefreshCw />}>
              Reset
            </Button>
            <Button className="w-full md:flex-1" color="primary" onPress={handleDownload} isDisabled={!outputCSS} startContent={<Download />}>
              Download
            </Button>
          </div>

          {processStats && (
            <Card className="mt-4 bg-default-100 dark:bg-default-200">
              <CardBody>
                <h3 className="text-lg font-semibold mb-2">Processing Results:</h3>
                <p>Original size: {processStats.original} bytes</p>
                <p>{mode === 'minify' ? 'Minified' : 'Beautified'} size: {processStats.processed} bytes</p>
                {mode === 'minify' && (
                  <p>Saved: {processStats.savings} bytes ({((processStats.savings / processStats.original) * 100).toFixed(2)}%)</p>
                )}
              </CardBody>
            </Card>
          )}

          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Upload CSS File</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".css"
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
              Max file size: {MAX_FILE_SIZE_MB}MB. Allowed types: CSS
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-default-50 dark:bg-default-100 mt-8">
        <CardBody>
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About CSS Minifier and Beautifier
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            Our CSS Minifier and Beautiful are a powerful tool designed to customize and format your CSS code. This provides two main functions: CSS minishes to reduce file size, and CSS beautification to improve code readability. Whether you are a web developer who is looking to customize your stylificheet or a designer who wants to clean your CSS, this tool can greatly increase your workflow and website performance.
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/CSSMinifierPreview.png?height=400&width=600"
                alt="Screenshot of the CSS Minifier and Beautifier interface showing input area, options, and output"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use CSS Minifier and Beautifier?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Choose between "Minify CSS" or "Beautify CSS" using the tabs at the top.</li>
              <li>Enter your CSS code in the input area or upload a CSS file (max 2MB).</li>
              <li>Click the "Minify" or "Beautify" button to process your CSS.</li>
              <li>Review the processed CSS in the output area below.</li>
              <li>Check the processing results to see the changes in file size.</li>
              <li>Use the "Copy" button to copy the processed CSS to your clipboard.</li>
              <li>Use the "Download" button to save the processed CSS as a file.</li>
              <li>To process a CSS file:
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Click the "Upload" button or drag and drop a CSS file into the input area.</li>
                  <li>The file content will be loaded into the input area automatically.</li>
                  <li>Click "Minify" or "Beautify" to process the uploaded file.</li>
                </ul>
              </li>
              <li>Use the "Reset" button to clear all inputs and outputs and start over.</li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>CSS Minification for reducing file size and improving load times.</li>
              <li>CSS Beautification for improving code readability and maintainability.</li>
              <li>Support for direct input and file upload (drag and drop supported).</li>
              <li>Real-time processing statistics showing file size reduction.</li>
              <li>Copy to clipboard functionality for quick use of processed CSS.</li>
              <li>Download processed CSS as a file for easy integration into your project.</li>
              <li>File size limit of 2MB for uploads to ensure optimal performance.</li>
              <li>Responsive design for use on various devices and screen sizes.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Tips and Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Always keep a backup of your original CSS files before processing.</li>
              <li>Use minification for production code to improve website load times.</li>
              <li>Use beautification during development for easier code maintenance and debugging.</li>
              <li>Test your minified CSS thoroughly to ensure it works as expected in all browsers.</li>
              <li>Consider using a CSS preprocessor like Sass or Less for more advanced optimizations.</li>
              <li>Combine multiple CSS files into one before minifying to reduce HTTP requests.</li>
              <li>Use CSS compression in conjunction with other web performance techniques like browser caching and CDN usage.</li>
              <li>For very large CSS files, consider breaking them into smaller, more manageable chunks.</li>
              <li>Regularly minify your CSS as part of your development workflow to maintain optimal performance.</li>
              <li>Use version control to track changes in your original, minified, and beautified CSS files.</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </ToolLayout>
  )
}