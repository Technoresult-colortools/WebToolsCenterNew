"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button, Textarea, Card, CardBody, Tabs, Tab, Select, SelectItem, Chip, Switch, Divider } from "@nextui-org/react"
import {
  Link as LinkIcon,
  Unlink,
  Upload,
  Copy,
  RefreshCw,
  Download,
  Settings,
  Sparkles,
  Check,
  Zap,
  FileText,
  Search,
  Globe,
  AlertCircle,
} from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionURLEncoder from "./info-section"

const MAX_FILE_SIZE_MB = 5
const QUICK_PRESETS = [
  { name: "Query Params", icon: "🔍", text: "search=nextjs & tailwind&category=tools" },
  { name: "Full URL", icon: "🌐", text: "https://example.com/path with spaces/index.php?id=100&user=admin" },
  { name: "Special Chars", icon: "🔣", text: "!@#$%^&*()_+{}[]|\\:;\"'<>,.?/" },
  { name: "Social Media", icon: "📱", text: "https://twitter.com/share?text=Check out this tool!&url=https://mysite.com" },
]

export default function URLEncoderDecoder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const [fileName, setFileName] = useState("")
  const [encodeMode, setEncodeMode] = useState("standard")
  const [decodeMode, setDecodeMode] = useState("standard")
  const [autoTrim, setAutoTrim] = useState(true)
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // URL Breakdown Analysis
  const urlAnalysis = useMemo(() => {
    if (!inputText || activeTab !== "encode") return null
    try {
      const url = new URL(inputText.startsWith("http") ? inputText : `https://${inputText}`)
      return {
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        params: Object.fromEntries(url.searchParams.entries()),
        isValid: true,
      }
    } catch {
      return { isValid: false }
    }
  }, [inputText, activeTab])

  const handleEncode = useCallback(() => {
    if (!inputText) return setOutputText("")
    try {
      const text = autoTrim ? inputText.trim() : inputText
      const lines = preserveLineBreaks ? text.split("\n") : [text]

      const encodedLines = lines.map((line) => {
        if (encodeMode === "all") {
          return line.split("").map(c => `%${c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`).join("")
        } else if (encodeMode === "component") {
          return encodeURIComponent(line)
        } else {
          // Standard RFC 3986
          return encodeURIComponent(line).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
        }
      })

      setOutputText(encodedLines.join(preserveLineBreaks ? "\n" : ""))
    } catch {
      toast.error("Error encoding URL components.")
    }
  }, [inputText, encodeMode, autoTrim, preserveLineBreaks])

  const handleDecode = useCallback(() => {
    if (!inputText) return setOutputText("")
    try {
      const text = autoTrim ? inputText.trim() : inputText
      const lines = preserveLineBreaks ? text.split("\n") : [text]

      const decodedLines = lines.map((line) => {
        let processed = line
        if (decodeMode === "plus") {
          processed = processed.replace(/\+/g, " ")
        }
        return decodeURIComponent(processed)
      })

      setOutputText(decodedLines.join(preserveLineBreaks ? "\n" : ""))
    } catch {
      toast.error("Invalid URL encoding detected.")
    }
  }, [inputText, decodeMode, autoTrim, preserveLineBreaks])

  useEffect(() => {
    if (activeTab === "encode") handleEncode()
    else handleDecode()
  }, [inputText, activeTab, encodeMode, decodeMode, autoTrim, preserveLineBreaks, handleEncode, handleDecode])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File too large (> ${MAX_FILE_SIZE_MB}MB)`)
        return
      }
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputText(content)
        // Simple auto-detect: if it has lots of %, suggest decode
        if ((content.match(/%/g) || []).length > 5) setActiveTab("decode")
        toast.success("File imported!")
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `url-${activeTab}-result.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Professional URL processing with RFC 3986 compliance and deep analysis"
      toolId="678f382f26f06f912191bcbb"
    >
      <Toaster position="top-right" />

      <div className="flex flex-col gap-6">
        {/* Presets Card */}
        <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Quick Presets</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  onPress={() => {
                    setInputText(preset.text)
                    setActiveTab("encode")
                  }}
                  variant="flat"
                  color="primary"
                  className="h-auto py-3 flex flex-col gap-1"
                >
                  <span className="text-xl">{preset.icon}</span>
                  <span className="text-xs font-bold">{preset.name}</span>
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Workspace */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Input
                  </h2>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      setInputText("")
                      setFileName("")
                    }}
                    startContent={<RefreshCw className="w-4 h-4" />}
                  >
                    Clear
                  </Button>
                </div>

                <Tabs selectedKey={activeTab} onSelectionChange={(k) => setActiveTab(k as string)} color="primary" variant="underlined">
                  <Tab key="encode" title={<div className="flex items-center gap-2"><LinkIcon size={16} /> Encode</div>} />
                  <Tab key="decode" title={<div className="flex items-center gap-2"><Unlink size={16} /> Decode</div>} />
                </Tabs>

                <Textarea
                  label={activeTab === "encode" ? "URL or Text to Encode" : "Encoded String to Decode"}
                  variant="bordered"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  minRows={5}
                  classNames={{ input: "font-mono text-sm" }}
                  placeholder="Paste your URL here..."
                />

                <div className="relative border-2 border-dashed border-default-300 rounded-xl p-6 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".txt,.html" />
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-default-400 mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-default-400 mt-1">TXT, HTML up to 5MB</p>
                  </div>
                </div>
                {fileName && <Chip color="success" variant="flat" onClose={() => setFileName("")}>{fileName}</Chip>}
              </CardBody>
            </Card>

            {/* Output Card */}
            <Card className="bg-gradient-to-br from-success/10 to-primary/10 border border-success/30">
              <CardBody className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" /> Result
                  </h2>
                </div>

                <Textarea
                  label="Processed Output"
                  variant="bordered"
                  value={outputText}
                  readOnly
                  minRows={5}
                  classNames={{
                    input: "font-mono text-sm text-primary font-bold",
                    inputWrapper: "bg-white/50 dark:bg-black/20",
                  }}
                />

                <div className="flex gap-2 flex-wrap">
                  <Button color="primary" className="flex-1" onPress={() => {
                    navigator.clipboard.writeText(outputText)
                    toast.success("Copied!")
                  }} startContent={<Copy size={18} />}>Copy Output</Button>
                  <Button color="secondary" variant="flat" className="flex-1" onPress={handleDownload} startContent={<Download size={18} />}>Download</Button>
                </div>
              </CardBody>
            </Card>

            {/* URL Breakdown Analysis (Only in Encode mode) */}
            {activeTab === "encode" && urlAnalysis?.isValid && (
              <Card className="border-primary/20 bg-primary/5">
                <CardBody className="p-4">
                  <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                    <Search className="w-4 h-4" /> URL Analysis Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-white/40 dark:bg-black/20 p-2 rounded">
                      <span className="text-primary font-bold">Protocol:</span> {urlAnalysis.protocol}
                    </div>
                    <div className="bg-white/40 dark:bg-black/20 p-2 rounded">
                      <span className="text-primary font-bold">Host:</span> {urlAnalysis.host}
                    </div>
                    <div className="bg-white/40 dark:bg-black/20 p-2 rounded md:col-span-2">
                      <span className="text-primary font-bold">Path:</span> {urlAnalysis.pathname}
                    </div>
                    {urlAnalysis.params && Object.keys(urlAnalysis.params).length > 0 && (
                      <div className="md:col-span-2 bg-white/40 dark:bg-black/20 p-2 rounded">
                        <span className="text-primary font-bold">Params:</span>
                        <div className="mt-1 pl-2 border-l-2 border-primary/20">
                          {Object.entries(urlAnalysis.params).map(([k, v]) => (
                            <div key={k}>{k}: <span className="text-default-500">{v}</span></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <Card className="bg-default-50/70 border border-default-200/50">
              <CardBody className="p-6 space-y-6">
                <div className="flex items-center gap-2 border-b border-default-200 pb-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold">Configuration</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-default-500">Processing Mode</label>
                    <Select
                      size="sm"
                      variant="bordered"
                      selectedKeys={[activeTab === "encode" ? encodeMode : decodeMode]}
                      onChange={(e) => activeTab === "encode" ? setEncodeMode(e.target.value) : setDecodeMode(e.target.value)}
                    >
                      {activeTab === "encode" ? [
                        <SelectItem key="standard" value="standard">Standard (RFC 3986)</SelectItem>,
                        <SelectItem key="component" value="component">URIComponent</SelectItem>,
                        <SelectItem key="all" value="all">Full Escaping</SelectItem>,
                      ] : [
                        <SelectItem key="standard" value="standard">Standard Decode</SelectItem>,
                        <SelectItem key="plus" value="plus">Decode + as Space</SelectItem>,
                      ]}
                    </Select>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Auto-Trim</span>
                      <Switch size="sm" isSelected={autoTrim} onValueChange={setAutoTrim} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Preserve Lines</span>
                      <Switch size="sm" isSelected={preserveLineBreaks} onValueChange={setPreserveLineBreaks} />
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-primary uppercase">Safe Check</span>
                    </div>
                    <p className="text-[10px] text-default-600">
                      Standard encoding (RFC 3986) is recommended for modern web applications.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200">
              <CardBody className="p-4 flex flex-row gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-700">Encoding Note</h4>
                  <p className="text-[10px] text-amber-600 leading-relaxed">
                    URLs only support ASCII characters. Symbols like <code className="bg-amber-200/50 px-1"># & ? /</code> have special meanings and must be encoded if they are part of data.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-default-50/70 border border-default-200/50">
              <CardBody className="p-4 space-y-3">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Actions
                </h3>
                <Button fullWidth size="sm" variant="flat" onPress={() => setInputText(outputText)}>
                  Move Output to Input
                </Button>
                <Button fullWidth size="sm" variant="flat" color="secondary" onPress={() => {
                  if (activeTab === "encode") {
                    try { new URL(inputText); toast.success("Valid Full URL") }
                    catch { toast.error("Not a valid full URL") }
                  }
                }}>
                  Verify URL Syntax
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <InfoSectionURLEncoder />
    </ToolLayout>
  )
}