"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Card, CardBody, Button, Select, SelectItem, Textarea, Switch, Tabs, Tab } from "@nextui-org/react"
import Image from "next/image"
import {
  Hash,
  Copy,
  RefreshCw,
  Upload,
  Download,
  CheckCircle2,
  Info,
  BookOpen,
  Shield,
  FileText,
  AlertTriangle,
  Save,
  Trash2,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionMD5Hash from "./info-section"
import crypto from "crypto-js"

const MAX_CHARS = 10000

const encodingOptions = [
  { value: "UTF-8", label: "UTF-8" },
  { value: "Base64", label: "Base64" },
  { value: "Hex", label: "Hexadecimal" },
]

export default function MD5HashGenerator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [compareHash, setCompareHash] = useState("")
  const [, setFileName] = useState("")
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [encoding, setEncoding] = useState("UTF-8")
  const [iterations, setIterations] = useState(1)
  const [salt, setSalt] = useState("")
  const [presets, setPresets] = useState<Record<string, unknown>>({})
  const [selectedPreset, setSelectedPreset] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateMD5 = useCallback(() => {
    try {
      let encodedInput = input
      if (encoding === "Base64") {
        encodedInput = crypto.enc.Base64.parse(input).toString(crypto.enc.Utf8)
      } else if (encoding === "Hex") {
        encodedInput = crypto.enc.Hex.parse(input).toString(crypto.enc.Utf8)
      }
      let hash = crypto.MD5(salt + encodedInput).toString()
      for (let i = 1; i < iterations; i++) {
        hash = crypto.MD5(salt + hash).toString()
      }
      setOutput(hash)
      toast.success("MD5 hash generated successfully!")
    } catch {
      toast.error("Error generating MD5 hash. Please check your input.")
    }
  }, [input, encoding, iterations, salt])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value
      if (text.length <= MAX_CHARS) {
        setInput(text)
        if (autoUpdate) {
          generateMD5()
        }
      } else {
        toast.error(`Maximum ${MAX_CHARS} characters allowed`)
      }
    },
    [autoUpdate, generateMD5],
  )

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setFileName(file.name)
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setInput(content)
          if (autoUpdate) {
            generateMD5()
          }
        }
        reader.readAsText(file)
        toast.success("File uploaded successfully!")
      }
    },
    [autoUpdate, generateMD5],
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
    toast.success("Hash copied to clipboard!")
  }, [output])

  const handleDownload = useCallback(() => {
    const element = document.createElement("a")
    const file = new Blob([output], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "md5_hash.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Hash downloaded successfully!")
  }, [output])

  const handleReset = useCallback(() => {
    setInput("")
    setOutput("")
    setCompareHash("")
    setFileName("")
    setEncoding("UTF-8")
    setIterations(1)
    setSalt("")
    setSelectedPreset("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("All fields have been reset.")
  }, [])

  const compareHashes = useCallback(() => {
    const match = caseSensitive ? output === compareHash : output.toLowerCase() === compareHash.toLowerCase()

    if (match) {
      toast.success("Hashes match!")
    } else {
      toast.error("Hashes do not match.")
    }
  }, [output, compareHash, caseSensitive])

  const savePreset = useCallback(() => {
    const presetName = prompt("Enter a name for this preset:")
    if (presetName) {
      const newPresets = {
        ...presets,
        [presetName]: { input, encoding, iterations, salt },
      }
      setPresets(newPresets)
      localStorage.setItem("md5Presets", JSON.stringify(newPresets))
      setSelectedPreset(presetName)
      toast.success("Preset saved successfully!")
    }
  }, [input, encoding, iterations, salt, presets])

  return (
    <ToolLayout
      title="MD5 Hash Generator & Verifier"
      description="Generate and verify MD5 hashes with advanced options and features."
      toolId="678f382f26f06f912191bcc2"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="MD5 options">
              <Tab key="generate" title="Generate MD5">
                <div className="flex flex-col gap-4 mt-4">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter text to hash..."
                    minRows={4}
                    size="lg"
                    variant="bordered"
                  />

                  <div className="flex flex-wrap gap-4">
                    <Select
                      label="Encoding"
                      selectedKeys={[encoding]}
                      onChange={(e) => setEncoding(e.target.value)}
                      className="flex-1"
                      variant="bordered"
                    >
                      {encodingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-default-700">
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <div className="flex items-center gap-2">
                      <Switch checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                      <span>Auto-update</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button color="primary" startContent={<Hash />} onClick={generateMD5} className="flex-1">
                      Generate MD5
                    </Button>
                    <Button color="secondary" startContent={<Upload />} onClick={() => fileInputRef.current?.click()}>
                      Upload File
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  </div>

                  <label className="text-lg font-medium">MD5 Hash</label>
                  <Textarea
                    value={output}
                    isReadOnly
                    placeholder="Generated hash will appear here..."
                    minRows={2}
                    size="lg"
                    variant="bordered"
                  />

                  <div className="flex gap-2">
                    <Button color="primary" startContent={<Copy />} onClick={handleCopy}>
                      Copy Hash
                    </Button>
                    <Button color="primary" startContent={<Download />} onClick={handleDownload}>
                      Download
                    </Button>
                    <Button color="danger" startContent={<RefreshCw />} onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </div>
              </Tab>
              <Tab key="verify" title="Verify MD5">
                <div className="flex flex-col gap-4 mt-4">
                  <label className="text-lg font-medium">Input Text</label>
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter text to verify..."
                    minRows={4}
                    size="lg"
                    variant="bordered"
                  />

                  <label className="text-lg font-medium">Generated MD5 Hash</label>
                  <Textarea
                    value={output}
                    isReadOnly
                    placeholder="Generated hash will appear here..."
                    minRows={2}
                    size="lg"
                    variant="bordered"
                  />

                  <label className="text-lg font-medium">Hash to Compare</label>
                  <Textarea
                    value={compareHash}
                    onChange={(e) => setCompareHash(e.target.value)}
                    placeholder="Enter MD5 hash to compare..."
                    minRows={2}
                    size="lg"
                    variant="bordered"
                  />

                  <div className="flex items-center gap-4">
                    <Button color="success" startContent={<CheckCircle2 />} onClick={compareHashes}>
                      Verify Hash
                    </Button>
                    <div className="flex items-center gap-2">
                      <Switch checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
                      <span>Case-sensitive comparison</span>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Advanced Options */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium">Advanced Options</label>

              <div className="flex flex-col gap-2">
                <label>Salt (optional)</label>
                <Textarea
                  value={salt}
                  onChange={(e) => setSalt(e.target.value)}
                  placeholder="Enter salt value..."
                  minRows={1}
                  size="lg"
                  variant="bordered"
                />
              </div>

              <div className="flex gap-4">
                <Button color="primary" startContent={<Save />} onClick={savePreset}>
                  Save Preset
                </Button>
                {selectedPreset && (
                  <Button
                    color="danger"
                    startContent={<Trash2 />}
                    onClick={() => {
                      const newPresets = { ...presets }
                      delete newPresets[selectedPreset]
                      setPresets(newPresets)
                      localStorage.setItem("md5Presets", JSON.stringify(newPresets))
                      setSelectedPreset("")
                    }}
                  >
                    Delete Preset
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>


      </div>
      <InfoSectionMD5Hash />
    </ToolLayout>
  )
}
