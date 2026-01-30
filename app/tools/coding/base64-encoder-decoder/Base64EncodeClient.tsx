"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button, Textarea, Card, CardBody, Tabs, Tab, Select, SelectItem, Chip, } from "@nextui-org/react"
import {
  FileLock,
  FileLock2,
  Upload,
  Copy,
  RefreshCw,
  Info,
  Download,
  Eye,
  EyeOff,
  Settings,
  Sparkles,
  Check,
  Zap,
  FileText,
} from "lucide-react"
import { toast, } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionBase64 from "./info-section"

const MAX_FILE_SIZE_MB = 5
const ALLOWED_FILE_TYPES = ["text/plain", "image/png", "image/jpeg", "application/pdf"]

const QUICK_PRESETS = [
  { name: "Sample Text", icon: "📝", text: "Hello, World! This is a Base64 encoding example." },
  { name: "JSON Data", icon: "📊", text: '{"name":"John","age":30,"city":"New York"}' },
  { name: "HTML Code", icon: "🌐", text: "<h1>Hello World</h1><p>This is HTML</p>" },
  { name: "URL String", icon: "🔗", text: "https://example.com/path?query=value&param=data" },
]

export default function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const [fileName, setFileName] = useState("")
  const [encoding, setEncoding] = useState("UTF-8")
  const [showPreview, setShowPreview] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEncode = useCallback(() => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(inputText)
      const encoded = btoa(String.fromCharCode.apply(null, Array.from(data)))
      setOutputText(encoded)
    } catch {
      toast.error(`Error encoding text. Make sure it's valid ${encoding}.`)
    }
  }, [inputText, encoding])

  const handleDecode = useCallback(() => {
    try {
      const decoded = atob(inputText)
      const decoder = new TextDecoder(encoding)
      const decodedText = decoder.decode(new Uint8Array([...decoded].map((char) => char.charCodeAt(0))))
      setOutputText(decodedText)
    } catch {
      toast.error("Error decoding text. Make sure it's valid Base64.")
    }
  }, [inputText, encoding])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error("Invalid file type. Please upload a PNG, JPEG, PDF, or text file.")
        return
      }

      setFileName(file.name)

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === "string") {
          const base64Regex = /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

          if (base64Regex.test(result.split(",")[1] || result)) {
            try {
              const base64Content = result.split(",")[1] || result
              const decoded = atob(base64Content)
              setInputText(base64Content)
              setOutputText(decoded)
              setActiveTab("decode")
              toast.success("Base64 file decoded successfully!")
            } catch {
              toast.error("Error decoding Base64 content. Invalid Base64 format.")
            }
          } else {
            setInputText(result.split(",")[1] || result)
            setOutputText(result)
            setActiveTab("encode")
            toast.success("File uploaded and encoded successfully!")
          }
        }
      }

      reader.onerror = () => {
        toast.error("Error reading file. Please try again.")
      }

      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("All fields have been reset.")
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([outputText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${activeTab === "encode" ? "encoded" : "decoded"}_output.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const applyPreset = (text: string) => {
    setInputText(text)
    setActiveTab("encode")
    toast.success("Preset applied!")
  }

  useEffect(() => {
    if (activeTab === "encode") {
      handleEncode()
    } else {
      handleDecode()
    }
  }, [inputText, activeTab, encoding, handleEncode, handleDecode])

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode data using Base64 encoding with advanced features"
      toolId="678f382e26f06f912191bcb9"
    >

      <div className="flex flex-col gap-6">
        {/* Quick Presets Card */}
        <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-default-700">Quick Presets</h3>
              <Chip size="sm" variant="flat" color="primary">
                New
              </Chip>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  onPress={() => applyPreset(preset.text)}
                  color="primary"
                  variant="flat"
                  className="h-auto py-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="text-sm font-semibold">{preset.name}</span>
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input and Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Input
                  </h2>
                  <div className="flex gap-2">
                    <Button size="sm" color="danger" variant="flat" onPress={handleReset} startContent={<RefreshCw className="w-4 h-4" />}>
                      Clear
                    </Button>
                  </div>
                </div>

                <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)} variant="underlined" color="primary">
                  <Tab
                    key="encode"
                    title={
                      <div className="flex items-center gap-2">
                        <FileLock className="w-4 h-4" />
                        <span className="font-medium">Encode</span>
                      </div>
                    }
                  />
                  <Tab
                    key="decode"
                    title={
                      <div className="flex items-center gap-2">
                        <FileLock2 className="w-4 h-4" />
                        <span className="font-medium">Decode</span>
                      </div>
                    }
                  />
                </Tabs>

                <div className="relative">
                  <Textarea
                    label={activeTab === "encode" ? "Text to Encode" : "Base64 to Decode"}
                    placeholder={activeTab === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                    variant="bordered"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    minRows={6}
                    classNames={{
                      input: "text-sm font-mono",
                    }}
                  />
                  <div className="absolute bottom-3 right-3">
                    <Chip size="sm" variant="flat" color={inputText.length > 0 ? "primary" : "default"}>
                      {inputText.length} chars
                    </Chip>
                  </div>
                </div>

                {/* File Upload */}
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-default-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200">
                    <input type="file" className="hidden" onChange={handleFileUpload} ref={fileInputRef} accept=".txt,.png,.jpg,.jpeg,.pdf" />
                    <Upload className="h-8 w-8 text-default-400 mb-2" />
                    <span className="text-default-600 text-sm font-medium">Upload file to encode/decode</span>
                    <span className="text-default-400 text-xs mt-1">Click or drag and drop</span>
                  </label>
                  {fileName && (
                    <div className="mt-2 p-2 bg-success/10 rounded-lg flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-medium">{fileName}</span>
                    </div>
                  )}
                  <p className="text-xs text-default-500 flex items-center gap-1 mt-2">
                    <Info className="w-3 h-3" />
                    Max {MAX_FILE_SIZE_MB}MB • PNG, JPEG, PDF, TXT
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Output Section */}
            <Card className="w-full bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Output
                  </h2>
                  <Chip color="success" variant="flat" size="sm" startContent={<Check className="w-3 h-3" />}>
                    {activeTab === "encode" ? "Encoded" : "Decoded"}
                  </Chip>
                </div>

                <Textarea
                  label={activeTab === "encode" ? "Encoded Base64" : "Decoded Text"}
                  variant="bordered"
                  value={outputText}
                  readOnly
                  minRows={6}
                  classNames={{
                    input: "text-sm font-mono text-primary font-semibold",
                    inputWrapper: "bg-white/70 dark:bg-gray-900/50 border-2",
                  }}
                  placeholder="Your output will appear here..."
                />

                <div className="flex gap-3 flex-wrap">
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={() => copyToClipboard(outputText)}
                    startContent={<Copy className="w-4 h-4" />}
                    className="flex-1 min-w-[140px]"
                    isDisabled={!outputText}
                  >
                    Copy Output
                  </Button>
                  <Button
                    color="secondary"
                    variant="flat"
                    onPress={handleDownload}
                    startContent={<Download className="w-4 h-4" />}
                    className="flex-1 min-w-[140px]"
                    isDisabled={!outputText}
                  >
                    Download
                  </Button>
                  <Button
                    color="default"
                    variant="bordered"
                    onPress={() => setShowPreview(!showPreview)}
                    startContent={showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  >
                    {showPreview ? "Hide" : "Show"} Preview
                  </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">Input Length</p>
                    <p className="text-lg font-bold text-primary">{inputText.length}</p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                    <p className="text-xs text-default-500">Output Length</p>
                    <p className="text-lg font-bold text-secondary">{outputText.length}</p>
                  </div>
                </div>

                {/* Preview */}
                {showPreview && outputText && (
                  <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-lg border border-default-200">
                    <p className="text-xs text-default-500 mb-2 font-medium">Preview:</p>
                    <div className="text-sm text-default-700 break-all max-h-40 overflow-y-auto">
                      {outputText}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Configuration Section */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-default-700">Configuration</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-default-700">Character Encoding</label>
                    <Select
                      selectedKeys={[encoding]}
                      variant="bordered"
                      onChange={(e) => setEncoding(e.target.value)}
                      size="sm"
                      classNames={{
                        trigger: "bg-white dark:bg-gray-900/50",
                      }}
                    >
                      <SelectItem key="UTF-8" value="UTF-8">
                        UTF-8 (Default)
                      </SelectItem>
                      <SelectItem key="ASCII" value="ASCII">
                        ASCII
                      </SelectItem>
                      <SelectItem key="ISO-8859-1" value="ISO-8859-1">
                        ISO-8859-1 (Latin-1)
                      </SelectItem>
                    </Select>
                    <p className="text-xs text-default-500 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Choose the character encoding format
                    </p>
                  </div>

                  {/* Mode Indicator */}
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-default-700">Current Mode</span>
                      <Chip size="sm" color={activeTab === "encode" ? "primary" : "secondary"} variant="flat">
                        {activeTab === "encode" ? "Encoding" : "Decoding"}
                      </Chip>
                    </div>
                    <p className="text-xs text-default-500">
                      {activeTab === "encode"
                        ? "Converting text to Base64 format"
                        : "Converting Base64 back to original text"}
                    </p>
                  </div>

                  {/* Advanced Settings Toggle */}
                  <div className="pt-4 border-t border-default-200">
                    <div
                      className="flex items-center justify-between p-3 bg-default-100 dark:bg-default-50 rounded-lg cursor-pointer hover:bg-default-200 dark:hover:bg-default-100 transition-colors"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <span className="text-sm font-medium text-default-700">Advanced Options</span>
                      {showAdvanced ? <EyeOff className="w-4 h-4 text-default-400" /> : <Eye className="w-4 h-4 text-primary" />}
                    </div>
                  </div>

                  {showAdvanced && (
                    <div className="space-y-3 pt-2">
                      <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg">
                        <p className="text-xs font-medium text-default-700 mb-1">Output Format</p>
                        <p className="text-xs text-default-500">Standard Base64 encoding with padding</p>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded-lg">
                        <p className="text-xs font-medium text-default-700 mb-1">Line Breaks</p>
                        <p className="text-xs text-default-500">No line breaks (continuous string)</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Info Card */}
            <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-semibold text-default-700">About Base64</h3>
                </div>
                <div className="space-y-2 text-xs text-default-600">
                  <p>Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format.</p>
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                    <p className="font-medium mb-1">Common Uses:</p>
                    <ul className="list-disc list-inside space-y-1 text-default-500">
                      <li>Email attachments</li>
                      <li>Data URLs in HTML/CSS</li>
                      <li>API data transmission</li>
                      <li>Storing binary data in text format</li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-default-700">Quick Actions</h2>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start"
                    variant="flat"
                    color="primary"
                    size="sm"
                    onPress={() => setActiveTab(activeTab === "encode" ? "decode" : "encode")}
                    startContent={<RefreshCw className="w-4 h-4" />}
                  >
                    Switch to {activeTab === "encode" ? "Decode" : "Encode"}
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="flat"
                    color="secondary"
                    size="sm"
                    onPress={() => fileInputRef.current?.click()}
                    startContent={<Upload className="w-4 h-4" />}
                  >
                    Upload File
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="flat"
                    color="default"
                    size="sm"
                    onPress={handleReset}
                    startContent={<RefreshCw className="w-4 h-4" />}
                  >
                    Clear All
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <InfoSectionBase64 />
    </ToolLayout>
  )
}