"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button, Textarea, Card, CardBody, Tabs, Tab, Switch, Chip } from "@nextui-org/react"
import {
  FileCode,
  FileJson,
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
  ShieldCheck,
  Code2,
} from "lucide-react"
import { toast, } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionHTMLEncoder from "./info-section"

const MAX_FILE_SIZE_MB = 5

const QUICK_PRESETS = [
  { name: "Basic Tag", icon: "🏷️", text: "<h1>Hello World!</h1>" },
  { name: "Links & Refs", icon: "🔗", text: '<a href="https://example.com?id=1&name=test">Click Here</a>' },
  { name: "Form Code", icon: "📝", text: '<input type="text" value="Default Value" disabled>' },
  { name: "Scripts", icon: "📜", text: '<script>alert("XSS Test & Verification");</script>' },
]

export default function HTMLEncoderDecoder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const [fileName, setFileName] = useState("")
  const [preserveNewlines, setPreserveNewlines] = useState(true)
  const [encodeQuotes, setEncodeQuotes] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEncode = useCallback(() => {
    try {
      let encoded = inputText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")

      if (encodeQuotes) {
        encoded = encoded.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
      }

      if (!preserveNewlines) {
        encoded = encoded.replace(/\n/g, "")
      }

      setOutputText(encoded)
    } catch {
      toast.error("Error encoding HTML entities.")
    }
  }, [inputText, encodeQuotes, preserveNewlines])

  const handleDecode = useCallback(() => {
    try {
      const doc = new DOMParser().parseFromString(inputText, "text/html")
      setOutputText(doc.documentElement.textContent || "")
    } catch {
      // Fallback for environments without DOMParser or complex entities
      const decoded = inputText
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      setOutputText(decoded)
    }
  }, [inputText])

  const validateHTML = () => {
    if (!inputText) return
    const parser = new DOMParser()
    const doc = parser.parseFromString(inputText, "text/html")
    const errors = doc.getElementsByTagName("parsererror")
    if (errors.length > 0) {
      toast.error("Invalid HTML structure detected.")
    } else {
      toast.success("HTML syntax is valid!")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }

      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === "string") {
          setInputText(result)
          // Auto-detect: if it contains entities, suggest decode
          if (/&lt;|&gt;|&amp;/i.test(result)) {
            setActiveTab("decode")
          } else {
            setActiveTab("encode")
          }
          toast.success("File loaded successfully!")
        }
      }
      reader.readAsText(file)
    }
  }

  const copyToClipboard = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
    toast.success("Fields cleared.")
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([outputText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${activeTab === "encode" ? "encoded" : "decoded"}_html.txt`
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
  }, [inputText, activeTab, handleEncode, handleDecode])

  return (
    <ToolLayout
      title="HTML Encoder/Decoder"
      description="Safely convert HTML characters to entities and vice versa for web development"
      toolId="678f382e26f06f912191bcba"
    >

      <div className="flex flex-col gap-6">
        {/* Quick Presets */}
        <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 backdrop-blur-sm border border-primary/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-default-700">Quick Presets</h3>
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
          {/* Main Input/Output Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-primary" />
                    Input Area
                  </h2>
                  <Button size="sm" color="danger" variant="flat" onPress={handleReset} startContent={<RefreshCw className="w-4 h-4" />}>
                    Reset
                  </Button>
                </div>

                <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)} variant="underlined" color="primary">
                  <Tab
                    key="encode"
                    title={
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        <span className="font-medium">Encode Entities</span>
                      </div>
                    }
                  />
                  <Tab
                    key="decode"
                    title={
                      <div className="flex items-center gap-2">
                        <FileJson className="w-4 h-4" />
                        <span className="font-medium">Decode Entities</span>
                      </div>
                    }
                  />
                </Tabs>

                <div className="relative">
                  <Textarea
                    label={activeTab === "encode" ? "Raw HTML to Encode" : "Encoded HTML to Decode"}
                    placeholder={activeTab === "encode" ? "e.g. <div>Hello & Welcome</div>" : "e.g. &lt;div&gt;Hello &amp; Welcome&lt;/div&gt;"}
                    variant="bordered"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    minRows={6}
                    classNames={{ input: "text-sm font-mono" }}
                  />
                </div>

                {/* File Upload Zone */}
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-default-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200">
                    <input type="file" className="hidden" onChange={handleFileUpload} ref={fileInputRef} accept=".html,.txt" />
                    <Upload className="h-8 w-8 text-default-400 mb-2" />
                    <span className="text-default-600 text-sm font-medium">Upload HTML or TXT file</span>
                    <span className="text-default-400 text-xs mt-1">Files are processed locally</span>
                  </label>
                  {fileName && (
                    <div className="mt-2 p-2 bg-success/10 rounded-lg flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-medium">{fileName}</span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card className="w-full bg-gradient-to-br from-success/10 to-primary/10 dark:from-success/20 dark:to-primary/20 backdrop-blur-sm border border-success/30">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-default-700 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-success" />
                    Output
                  </h2>
                  <Chip color="success" variant="flat" size="sm">
                    {activeTab === "encode" ? "Entities Generated" : "HTML Restored"}
                  </Chip>
                </div>

                <Textarea
                  label="Result"
                  variant="bordered"
                  value={outputText}
                  readOnly
                  minRows={6}
                  classNames={{
                    input: "text-sm font-mono text-primary font-semibold",
                    inputWrapper: "bg-white/70 dark:bg-gray-900/50 border-2",
                  }}
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
                    Copy Result
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
                    {showPreview ? "Hide" : "Live"} Preview
                  </Button>
                </div>

                {showPreview && outputText && (
                  <div className="p-4 bg-white/50 dark:bg-gray-900/30 rounded-lg border border-default-200">
                    <p className="text-xs text-default-500 mb-2 font-medium">Visual Preview:</p>
                    <div
                      className="text-sm text-default-700 border p-3 rounded bg-white dark:bg-black/20"
                      dangerouslySetInnerHTML={{ __html: activeTab === 'encode' ? inputText : outputText }}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Configuration Column */}
          <div className="space-y-6">
            <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-default-700">Settings</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Encode Quotes</span>
                        <span className="text-xs text-default-500">Convert " and ' to entities</span>
                      </div>
                      <Switch isSelected={encodeQuotes} onValueChange={setEncodeQuotes} size="sm" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Preserve Newlines</span>
                        <span className="text-xs text-default-500">Keep line breaks in output</span>
                      </div>
                      <Switch isSelected={preserveNewlines} onValueChange={setPreserveNewlines} size="sm" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-default-200">
                    <div
                      className="flex items-center justify-between p-3 bg-default-100 dark:bg-default-50 rounded-lg cursor-pointer hover:bg-default-200 transition-colors"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <span className="text-sm font-medium">Character Stats</span>
                      {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-primary" />}
                    </div>
                  </div>

                  {showAdvanced && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-2 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                        <p className="text-[10px] uppercase text-default-500">Input Size</p>
                        <p className="text-sm font-bold">{inputText.length} ch</p>
                      </div>
                      <div className="p-2 bg-white/50 dark:bg-gray-900/30 rounded-lg text-center">
                        <p className="text-[10px] uppercase text-default-500">Output Size</p>
                        <p className="text-sm font-bold text-secondary">{outputText.length} ch</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm border border-blue-200">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold">Security Tip</h3>
                </div>
                <p className="text-xs text-default-600 leading-relaxed">
                  Always use HTML encoding when displaying user-generated content to prevent
                  <strong> Cross-Site Scripting (XSS)</strong> attacks. Encoding converts
                  dangerous characters like <code className="bg-white/50 px-1">&lt;</code> into
                  harmless entities like <code className="bg-white/50 px-1">&amp;lt;</code>.
                </p>
              </CardBody>
            </Card>

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
                    color="success"
                    size="sm"
                    onPress={validateHTML}
                    startContent={<Check className="w-4 h-4" />}
                  >
                    Validate HTML Syntax
                  </Button>
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
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <InfoSectionHTMLEncoder />
    </ToolLayout>
  )
}