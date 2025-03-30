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

        {/* Information Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is SHA-1 Hash Generator & Verifier?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              The SHA-1 Hash Generator & Verifier is a utility built for developers, security professionals, and anyone else dealing with integrity of data. It provides functionality to generate and verify SHA-1 hashes in order to confirm the data has not changed during communication or storage.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              SHA-1 (Secure Hash Algorithm 1) produces a hash value of 160 bits (which is 20 bytes long). Although it has been deprecated for some security-sensitive usage due to attacks in theory to happen, (which means in practical situations attacks exist), it is still being used in many other non-cryptographic situations.
              </p>

              <div className="my-8">
                <Image
                 src="/Images/InfosectionImages/SHA1Preview.png?height=400&width=600"
                  alt="Screenshot of the SHA-1 Hash Generator & Verifier interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the SHA-1 Hash Generator & Verifier
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter your text in the input area or upload a file.</li>
                <li>Choose the desired input encoding (UTF-8, Base64, or Hex).</li>
                <li>Optionally, add a salt value to strengthen the hash.</li>
                <li>Click 'Generate SHA-1' to create the hash value.</li>
                <li>To verify a hash, switch to the 'Verify' tab and enter the hash to compare.</li>
                <li>Use the 'Verify Hash' button to check if the hashes match.</li>
                <li>Copy the generated hash to clipboard or download it as a file.</li>
                <li>Use the 'Reset' button to clear all inputs and start over.</li>
                <li>Save and load presets for frequently used configurations.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Generate SHA-1 hashes from text input or file content</li>
                <li>Verify and compare SHA-1 hashes</li>
                <li>Support for multiple input encodings: UTF-8, Base64, and Hexadecimal</li>
                <li>Optional salt input for enhanced security</li>
                <li>Auto-update feature for real-time hash generation</li>
                <li>Case-sensitive and case-insensitive hash comparison</li>
                <li>File upload capability for hashing file contents</li>
                <li>Clipboard integration for easy copying and pasting</li>
                <li>Download option for saving generated hashes</li>
                <li>Preset system for saving and loading frequently used configurations</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Security Considerations
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>SHA-1 is considered cryptographically broken for security-critical applications.</li>
                <li>For security-sensitive tasks, use SHA-256 or other stronger algorithms.</li>
                <li>
                  Adding a salt can improve resistance to rainbow table attacks, but does not make SHA-1 secure for
                  critical applications.
                </li>
                <li>This tool is primarily for educational purposes and non-security-critical use cases.</li>
                <li>Always use HTTPS when transmitting sensitive data or hash values over the network.</li>
                <li>Regularly update your hashing practices to align with current security standards.</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>
                  <strong>Data Integrity:</strong> Verify that files or data haven't been tampered with during
                  transmission or storage.
                </li>
                <li>
                  <strong>Version Control:</strong> Generate unique identifiers for file versions in version control
                  systems.
                </li>
                <li>
                  <strong>Caching:</strong> Create cache keys for web applications and content delivery networks.
                </li>
                <li>
                  <strong>Digital Signatures:</strong> Understand basic concepts of hashing in digital signature systems
                  (though SHA-1 should not be used for this purpose in practice).
                </li>
                <li>
                  <strong>Educational Purposes:</strong> Learn about hash functions, their properties, and limitations.
                </li>
                <li>
                  <strong>Legacy System Compatibility:</strong> Generate SHA-1 hashes for systems that still require
                  them (while planning for migration to stronger algorithms).
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                The SHA-1 Hash Generator & Verifier is a valuable tool for understanding hash functions and their
                properties. While it's important to recognize the limitations of SHA-1 in modern cryptographic
                applications, this tool provides insights into hashing concepts and can be useful for various
                non-security-critical tasks. Always prioritize security best practices and use appropriate algorithms
                for sensitive applications.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

