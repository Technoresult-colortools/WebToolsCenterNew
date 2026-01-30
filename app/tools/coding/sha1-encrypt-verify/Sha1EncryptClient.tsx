"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Card, CardBody, Button, Select, SelectItem, Textarea, Switch, Tabs, Tab } from "@nextui-org/react"
import InfoSectionSHA1Hash from "./info-section"
import {
  Hash,
  Copy,
  RefreshCw,
  Upload,
  Download,
  CheckCircle2,
  Save,
  Trash2,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import crypto from "crypto"

const MAX_CHARS = 10000

const encodingOptions = [
  { value: "UTF-8", label: "UTF-8" },
  { value: "Base64", label: "Base64" },
  { value: "Hex", label: "Hexadecimal" },
]

export default function SHA1Tool() {
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

  const generateSHA1 = useCallback(() => {
    try {
      let encodedInput = input
      if (encoding === "Base64") {
        encodedInput = Buffer.from(input, "base64").toString("utf8")
      } else if (encoding === "Hex") {
        encodedInput = Buffer.from(input, "hex").toString("utf8")
      }
      let hash = crypto.createHash("sha1").update(salt + encodedInput)
      for (let i = 1; i < iterations; i++) {
        hash = crypto.createHash("sha1").update(salt + hash.digest("hex"))
      }
      setOutput(hash.digest("hex"))
      toast.success("SHA-1 hash generated successfully!")
    } catch {
      toast.error("Error generating SHA-1 hash. Please check your input.")
    }
  }, [input, encoding, iterations, salt])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value
      if (text.length <= MAX_CHARS) {
        setInput(text)
        if (autoUpdate) {
          generateSHA1()
        }
      } else {
        toast.error(`Maximum ${MAX_CHARS} characters allowed`)
      }
    },
    [autoUpdate, generateSHA1],
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
            generateSHA1()
          }
        }
        reader.readAsText(file)
        toast.success("File uploaded successfully!")
      }
    },
    [autoUpdate, generateSHA1],
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
    toast.success("Hash copied to clipboard!")
  }, [output])

  const handleDownload = useCallback(() => {
    const element = document.createElement("a")
    const file = new Blob([output], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "sha1_hash.txt"
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
      localStorage.setItem("sha1Presets", JSON.stringify(newPresets))
      setSelectedPreset(presetName)
      toast.success("Preset saved successfully!")
    }
  }, [input, encoding, iterations, salt, presets])

  return (
    <ToolLayout
      title="SHA-1 Hash Generator & Verifier"
      description="Generate and verify SHA-1 hashes with advanced options and features."
      toolId="678f382f26f06f912191bcc3"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="SHA-1 options">
              <Tab key="generate" title="Generate SHA-1">
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
                    <Button color="primary" startContent={<Hash />} onClick={generateSHA1} className="flex-1">
                      Generate SHA-1
                    </Button>
                    <Button color="secondary" startContent={<Upload />} onClick={() => fileInputRef.current?.click()}>
                      Upload File
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  </div>

                  <label className="text-lg font-medium">SHA-1 Hash</label>
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
              <Tab key="verify" title="Verify SHA-1">
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

                  <label className="text-lg font-medium">Generated SHA-1 Hash</label>
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
                    placeholder="Enter SHA-1 hash to compare..."
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
                      localStorage.setItem("sha1Presets", JSON.stringify(newPresets))
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
      <InfoSectionSHA1Hash />
    </ToolLayout>
  )
}

