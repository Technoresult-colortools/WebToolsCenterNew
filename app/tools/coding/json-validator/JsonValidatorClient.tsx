"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Card, CardBody, Button, Textarea, Select, SelectItem, Tabs, Tab } from "@nextui-org/react"
import Image from "next/image"
import {
  Copy,
  Upload,
  Download,
  RefreshCw,
  Minimize,
  Maximize,
  Info,
  BookOpen,
  Lightbulb,
  Check,
  X,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const MAX_CHARS = 100000

interface MinificationDetails {
  originalSize: number
  minifiedSize: number
  savings: number
  savingsPercentage: number
}

export default function JsonValidator() {
  const [jsonInput, setJsonInput] = useState("")
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; error?: string }>({ isValid: true })
  const [formattedJson, setFormattedJson] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("validation")
  const [sortKeys, setSortKeys] = useState(false)
  const [minificationDetails, setMinificationDetails] = useState<MinificationDetails | null>(null)
  const [charCount, setCharCount] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateJson = useCallback(() => {
    setIsLoading(true)
    try {
      JSON.parse(jsonInput)
      setValidationResult({ isValid: true })
      toast.success("JSON is valid!")
    } catch (error) {
      setValidationResult({ isValid: false, error: (error as Error).message })
      toast.error("Invalid JSON. Please check for errors.")
    }
    setIsLoading(false)
  }, [jsonInput])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonInput(content)
        setCharCount(content.length)
      }
      reader.readAsText(file)
      toast.success("File uploaded successfully!")
    }
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!")
    })
  }, [])

  const minifyJson = useCallback(() => {
    try {
      const parsedJson = JSON.parse(jsonInput)
      const minified = JSON.stringify(parsedJson)
      setFormattedJson(minified)
      setActiveTab("formatted")

      const originalSize = jsonInput.length
      const minifiedSize = minified.length
      const savings = originalSize - minifiedSize
      const savingsPercentage = (savings / originalSize) * 100

      setMinificationDetails({
        originalSize,
        minifiedSize,
        savings,
        savingsPercentage,
      })

      toast.success("JSON minified successfully!")
    } catch {
      toast.error("Invalid JSON. Please fix errors before minifying.")
    }
  }, [jsonInput])

  const beautifyJson = useCallback(() => {
    try {
      const parsedJson: unknown = JSON.parse(jsonInput);
  
      // Define the replacer function with correct TypeScript types
      const replacer = sortKeys
        ? (function (_key: string, value: unknown) {
            if (value && typeof value === "object" && !Array.isArray(value)) {
              return Object.keys(value as Record<string, unknown>)
                .sort()
                .reduce<Record<string, unknown>>((sorted, key) => {
                  sorted[key] = (value as Record<string, unknown>)[key];
                  return sorted;
                }, {});
            }
            return value;
          } as (this: unknown, key: string, value: unknown) => unknown)
        : undefined;
  
      const formatted = JSON.stringify(parsedJson, replacer, indentSize);
      setFormattedJson(formatted);
      setActiveTab("formatted");
      setMinificationDetails(null);
      toast.success("JSON beautified successfully!");
    } catch {
      toast.error("Invalid JSON. Please fix errors before beautifying.");
    }
  }, [jsonInput, sortKeys, indentSize]);
  
  const downloadJson = useCallback(() => {
    const blob = new Blob([formattedJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "formatted.json"
    link.click()
    URL.revokeObjectURL(url)
    toast.success("JSON file downloaded!")
  }, [formattedJson])

  const clearJson = useCallback(() => {
    setJsonInput("")
    setFormattedJson("")
    setValidationResult({ isValid: true })
    setMinificationDetails(null)
    setCharCount(0)
    toast.success("JSON input cleared!")
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setJsonInput(text)
      setCharCount(text.length)
    } else {
      toast.error(`Maximum ${MAX_CHARS} characters allowed`)
    }
  }, [])

  return (
    <ToolLayout
      title="JSON Validator and Formatter"
      description="Validate, format, and manipulate JSON with ease"
      toolId="678f383026f06f912191bcca"
    >
      <div className="flex flex-col gap-8">
        {/* Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              value={jsonInput}
              label="JSON Input:"
              onChange={handleInputChange}
              placeholder="Paste your JSON here..."
              minRows={4}
              size="lg"
              className="mb-2"
              variant="bordered"
            />
            <p className="text-sm text-default-500 mt-2">
              {charCount}/{MAX_CHARS} characters
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
            <Select
                id="indent-size"
                label="Indent Size"
                placeholder="Select indent size..."
                selectedKeys={new Set([indentSize.toString()])}
                onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    setIndentSize(Number(selected));
                }}
                className="flex-1 max-w-xs"
                variant="bordered"
                listboxProps={{
                    className: "max-h-[200px] overflow-y-auto", // Control dropdown scrolling
                }}
                classNames={{
                    trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                    listbox: "overflow-y-auto", // Ensure dropdown scrolling
                }}
                >
                {[2, 4, 8].map((size) => (
                    <SelectItem
                    key={size.toString()}
                    value={size.toString()}
                    textValue={`${size} spaces`}
                    className="text-default-700 dark:text-default-600 hover:bg-default-100 dark:hover:bg-default-200"
                    >
                    {size} spaces
                    </SelectItem>
                ))}
                </Select>


              <div className="flex items-center gap-2">
                <Button
                  color={sortKeys ? "primary" : "default"}
                  onClick={() => setSortKeys(!sortKeys)}
                  startContent={sortKeys ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                >
                  Sort Keys
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button color="primary" onClick={validateJson} isLoading={isLoading}>
                Validate JSON
              </Button>
              <Button
                color="secondary"
                onClick={() => fileInputRef.current?.click()}
                startContent={<Upload className="h-4 w-4" />}
              >
                Upload JSON
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".json" className="hidden" />
              <Button color="success" onClick={beautifyJson} startContent={<Maximize className="h-4 w-4" />}>
                Beautify
              </Button>
              <Button color="warning" onClick={minifyJson} startContent={<Minimize className="h-4 w-4" />}>
                Minify
              </Button>
              <Button color="danger" onClick={clearJson} startContent={<RefreshCw className="h-4 w-4" />}>
                Clear
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Output Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
              <Tab key="validation" title="Validation Result">
                <div
                  className={`p-4 rounded-md ${validationResult.isValid ? "bg-success-100 text-success-800" : "bg-danger-100 text-danger-800"}`}
                >
                  {validationResult.isValid ? "Valid JSON" : `Invalid JSON: ${validationResult.error}`}
                </div>
              </Tab>
              <Tab key="formatted" title="Formatted JSON">
                {formattedJson && (
                  <div className="mt-4">
                    <div className="relative">
                      <Textarea value={formattedJson} readOnly minRows={4} size="lg" variant="bordered" />
                      <Button
                        onClick={() => copyToClipboard(formattedJson)}
                        className="absolute top-2 right-2"
                        size="sm"
                        variant="flat"
                        color="danger"
                        startContent={<Copy className="h-4 w-4" />}
                      >
                        Copy
                      </Button>
                    </div>
                    <Button
                      onClick={downloadJson}
                      className="mt-2"
                      color="primary"
                      startContent={<Download className="h-4 w-4" />}
                    >
                      Download JSON
                    </Button>
                    {minificationDetails && (
                      <div className="mt-4 p-4 bg-default-200 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Minification Details</h3>
                        <p>Original Size: {minificationDetails.originalSize} bytes</p>
                        <p>Minified Size: {minificationDetails.minifiedSize} bytes</p>
                        <p>Savings: {minificationDetails.savings} bytes</p>
                        <p>Savings Percentage: {minificationDetails.savingsPercentage.toFixed(2)}%</p>
                      </div>
                    )}
                  </div>
                )}
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is JSON Validator and Formatter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The JSON Validator and Formatter is a powerful tool designed for verification and anyone working with developers, data analysts and anyone working with JSON data. It offers JSON to validate, format and manipulate a broad set of features, ensuring that your data is correct, well structured, and easy to read.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Whether you're debugging API responses, cleaning up configuration files, or preparing data for
                transmission, our JSON Validator and Formatter streamlines your workflow and helps catch errors before
                they become problems.
              </p>

              <div className="my-8">
                <Image
                src="/Images/InfosectionImages/JSONValidatorPreview.png?height=400&width=600"
                  alt="Screenshot of the JSON Validator and Formatter interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use JSON Validator and Formatter?
              </h2>
              <ol className="list-decimal list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Paste your JSON into the input area or upload a JSON file.</li>
                <li>Click 'Validate JSON' to check if your JSON is valid.</li>
                <li>Use 'Minify' to compress your JSON or 'Beautify' to format it with proper indentation.</li>
                <li>Adjust the indent size for beautification as needed (2, 4, or 8 spaces).</li>
                <li>Toggle 'Sort Keys' to alphabetically sort object keys when beautifying.</li>
                <li>View the formatted JSON in the 'Formatted JSON' tab.</li>
                <li>Check minification details after minifying your JSON.</li>
                <li>Copy the formatted JSON to clipboard or download it as a file.</li>
                <li>Use the 'Clear' button to reset the input and start over.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>JSON validation with detailed error messages</li>
                <li>Minification for compact JSON representation</li>
                <li>Beautification with customizable indentation</li>
                <li>Option to sort object keys alphabetically</li>
                <li>Detailed minification statistics</li>
                <li>File upload and download capabilities</li>
                <li>Copy-to-clipboard functionality for quick use</li>
                <li>Clear and intuitive user interface</li>
                <li>Real-time feedback and notifications</li>
                <li>Support for large JSON files</li>
              </ul>


              <p className="text-sm md:text-base text-default-600 mt-6">
                The JSON Validator and Formatter is an essential tool for anyone working with JSON data. By providing a
                user-friendly interface with powerful features, it simplifies the process of working with JSON, helping
                you catch errors early and ensure your data is always in the best possible format. With the added
                minification details, you can now easily track the efficiency of your JSON compression, making it
                invaluable for optimizing data transfer in your applications.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

