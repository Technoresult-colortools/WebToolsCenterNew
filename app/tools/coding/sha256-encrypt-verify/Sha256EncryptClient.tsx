"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardBody, Button, Select, SelectItem, Textarea, Switch, Tabs, Tab, Slider, Input } from "@nextui-org/react"
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
  Lightbulb,
  Save,
  Trash2,
  AlertTriangle,
  FileText,
  Shield,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import crypto from "crypto"

const MAX_CHARS = 10000

const encodingOptions = [
  { value: "utf8", label: "UTF-8" },
  { value: "ascii", label: "ASCII" },
  { value: "base64", label: "Base64" },
] as const

type Encoding = (typeof encodingOptions)[number]["value"]
type Preset = {
  input: string
  encoding: "utf8" | "ascii" | "base64"
  iterations: number
  salt: string
}


export default function SHA256Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [compareHash, setCompareHash] = useState("")
  const [, setFileName] = useState("")
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [encoding, setEncoding] = useState<Encoding>("utf8")
  const [iterations, setIterations] = useState(1)
  const [salt, setSalt] = useState("")
  const [presets, setPresets] = useState<Record<string, Preset>>({})
  const [selectedPreset, setSelectedPreset] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoUpdate) {
      generateSHA256()
    }
  }, [input, encoding, iterations, salt])

  useEffect(() => {
    const savedPresets = localStorage.getItem("sha256Presets")
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets))
    }
  }, [])

  const generateSHA256 = useCallback(() => {
    try {
      const hash = crypto.createHash("sha256")
      hash.update(salt)
      for (let i = 0; i < iterations; i++) {
        hash.update(input, encoding as BufferEncoding)
      }
      const generatedHash = hash.digest("hex")
      setOutput(generatedHash)
      toast.success("SHA-256 hash generated successfully!")
    } catch {
      toast.error("Error generating SHA-256 hash. Please check your input and encoding.")
    }
  }, [input, encoding, iterations, salt])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value
      if (text.length <= MAX_CHARS) {
        setInput(text)
        if (autoUpdate) {
          generateSHA256()
        }
      } else {
        toast.error(`Maximum ${MAX_CHARS} characters allowed`)
      }
    },
    [autoUpdate, generateSHA256],
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
            generateSHA256()
          }
        }
        reader.readAsText(file)
        toast.success("File uploaded successfully!")
      }
    },
    [autoUpdate, generateSHA256],
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
    toast.success("Hash copied to clipboard!")
  }, [output])

  const handleDownload = useCallback(() => {
    const element = document.createElement("a")
    const file = new Blob([output], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "sha256_hash.txt"
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
    setEncoding("utf8")
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
      localStorage.setItem("sha256Presets", JSON.stringify(newPresets))
      setSelectedPreset(presetName)
      toast.success("Preset saved successfully!")
    }
  }, [input, encoding, iterations, salt, presets])

  return (
    <ToolLayout
      title="SHA-256 Hash Generator & Verifier"
      description="Generate and verify SHA-256 hashes with advanced options and features."
      toolId="678f383026f06f912191bcc5"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="SHA-256 options">
              <Tab key="generate" title="Generate SHA-256">
                <div className="flex flex-col gap-4 mt-4">

                <Textarea
                  label="Input Text"
                  placeholder="Enter text to generate SHA-256 hash..."
                  value={input}
                  onChange={handleInputChange}
                  variant="bordered"
                  minRows={4}
                />
                <Input label="SHA-256 Hash" variant="bordered" value={output} readOnly />

                  <div className="flex flex-wrap gap-4">
                    <Select
                      label="Encoding"
                      selectedKeys={[encoding]}
                      onChange={(e) => setEncoding(e.target.value as Encoding)}
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
                    <Button color="primary" startContent={<Hash />} onClick={generateSHA256} className="flex-1" >
                      Generate SHA-256
                    </Button>
                    <Button color="secondary" startContent={<Upload />} onClick={() => fileInputRef.current?.click()}>
                      Upload File
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  </div>

                  <label className="text-lg font-medium">SHA-256 Hash</label>
                  <Textarea
                    value={output}
                    isReadOnly
                    placeholder="Generated hash will appear here..."
                    minRows={2}
                    size="lg"
                    variant="bordered"
                  />

                    <div className="flex flex-col md:flex-row gap-2 w-full">
                      <Button className="w-full md:flex-1" color="primary" startContent={<Copy />} onClick={handleCopy}>
                        Copy Hash
                      </Button>
                      <Button className="w-full md:flex-1" color="primary" startContent={<Download />} onClick={handleDownload}>
                        Download
                      </Button>
                      <Button className="w-full md:flex-1" color="danger" startContent={<RefreshCw />} onClick={handleReset}>
                        Reset
                      </Button>
                    </div>

                </div>
              </Tab>
              <Tab key="verify" title="Verify SHA-256">
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

                  <label className="text-lg font-medium">Generated SHA-256 Hash</label>
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
                    placeholder="Enter SHA-256 hash to compare..."
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

              <div className="mt-4">
                <p className="mb-2">Hash Iterations: {iterations}</p>
                <Slider
                    aria-label="Hash Iterations"
                    step={1}
                    maxValue={10000}
                    minValue={1}
                    value={iterations}
                    onChange={(value) => setIterations(value as number)}
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
                      localStorage.setItem("sha256Presets", JSON.stringify(newPresets))
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
        {/* Information Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is SHA-256 Hash Generator & Verifier?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The SHA-256 Hash Generator & Verifier is a powerful cryptographic tool that generates 256-bit (32-byte) hash values, 
                ensuring data integrity and security. As a part of the SHA-2 family, SHA-256 is widely used in blockchain, password hashing, 
                and digital signatures due to its strong resistance to collisions and preimage attacks.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/SHA256HashPreview.png"
                  alt="Screenshot of the SHA-256 Hash Generator & Verifier interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use SHA-256 Hash Generator & Verifier?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter text or upload a file in the input area.</li>
                <li>Select your preferred input encoding method (UTF-8, Base64, ASCII).</li>
                <li>Optionally, add a salt value for enhanced security.</li>
                <li>Configure the number of hash iterations.</li>
                <li>Click 'Generate SHA-256' to create the hash value.</li>
                <li>To verify a hash, enter the hash in the verification section.</li>
                <li>Use the 'Verify Hash' button to check if hashes match.</li>
                <li>Copy the generated hash to clipboard or download it as a file.</li>
                <li>Use the 'Reset' button to clear all inputs and start over.</li>
                <li>Save frequently used configurations as presets.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features of SHA-256
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Generate SHA-256 hashes from text input or file content.</li>
                <li>Verify and compare SHA-256 hashes with an existing hash.</li>
                <li>Support for multiple input encodings (UTF-8, Base64, ASCII).</li>
                <li>Optional salt input to strengthen security.</li>
                <li>Customizable number of hash iterations for added protection.</li>
                <li>Real-time auto-update feature for hash generation.</li>
                <li>Clipboard integration for easy copying.</li>
                <li>Download generated hashes as files.</li>
                <li>Preset system to save and load frequently used configurations.</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Security Considerations
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                While SHA-256 is highly secure and widely used, it is important to follow best security practices such as adding salts, 
                using multiple iterations, and combining it with key-stretching algorithms like PBKDF2, bcrypt, or Argon2 
                when hashing passwords.
              </p>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
                Limitations of SHA-256
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>SHA-256 is a one-way function, meaning the original input cannot be retrieved from the hash.</li>
                <li>Not suitable for storing passwords without additional security measures like salting and key stretching.</li>
                <li>Can be computationally expensive for applications requiring fast, real-time hashing.</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Use Cases of SHA-256
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Data integrity verification for files and documents.</li>
                <li>Blockchain and cryptocurrency security.</li>
                <li>Secure password hashing with additional salting.</li>
                <li>Digital signatures and certificates.</li>
                <li>Ensuring tamper-proof logs and records.</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Final Thoughts
              </h2>
              <p className="text-sm md:text-base text-default-600">
                The SHA-256 Hash Generator & Verifier is a versatile tool that ensures data integrity and security. 
                Whether you're verifying file integrity, securing passwords, or working on blockchain applications, 
                SHA-256 remains one of the most trusted hashing algorithms available today.
              </p>
            </div>
          </CardBody>
        </Card>

      </div>
    </ToolLayout>
  )
}