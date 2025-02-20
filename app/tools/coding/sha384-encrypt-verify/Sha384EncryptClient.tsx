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
  Clipboard,
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

export default function SHA384Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [compareHash, setCompareHash] = useState("")
  const [fileName, setFileName] = useState("")
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [encoding, setEncoding] = useState<Encoding>("utf8")
  const [iterations, setIterations] = useState(1)
  const [salt, setSalt] = useState("")
  const [presets, setPresets] = useState<Record<string, any>>({})
  const [selectedPreset, setSelectedPreset] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoUpdate) {
      generateSHA384()
    }
  }, [input, encoding, iterations, salt])

  useEffect(() => {
    const savedPresets = localStorage.getItem("sha384Presets")
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets))
    }
  }, [])

  const generateSHA384 = useCallback(() => {
    try {
      const hash = crypto.createHash("sha384")
      hash.update(salt)
      for (let i = 0; i < iterations; i++) {
        hash.update(input, encoding as BufferEncoding)
      }
      const generatedHash = hash.digest("hex")
      setOutput(generatedHash)
      toast.success("SHA-384 hash generated successfully!")
    } catch (error) {
      toast.error("Error generating SHA-384 hash. Please check your input and encoding.")
    }
  }, [input, encoding, iterations, salt])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value
      if (text.length <= MAX_CHARS) {
        setInput(text)
        if (autoUpdate) {
          generateSHA384()
        }
      } else {
        toast.error(`Maximum ${MAX_CHARS} characters allowed`)
      }
    },
    [autoUpdate, generateSHA384],
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
            generateSHA384()
          }
        }
        reader.readAsText(file)
        toast.success("File uploaded successfully!")
      }
    },
    [autoUpdate, generateSHA384],
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
    toast.success("Hash copied to clipboard!")
  }, [output])

  const handleDownload = useCallback(() => {
    const element = document.createElement("a")
    const file = new Blob([output], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "sha384_hash.txt"
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
      localStorage.setItem("sha384Presets", JSON.stringify(newPresets))
      setSelectedPreset(presetName)
      toast.success("Preset saved successfully!")
    }
  }, [input, encoding, iterations, salt, presets])

  return (
    <ToolLayout
      title="SHA-384 Hash Generator & Verifier"
      description="Generate and verify SHA-384 hashes with advanced options and features."
      toolId="678f383026f06f912191bcc6"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="SHA-384 options">
              <Tab key="generate" title="Generate SHA-384">
                <div className="flex flex-col gap-4 mt-4">
                  <Textarea
                  label="Input Text"
                  placeholder="Enter text to generate SHA-384 hash..."
                  value={input}
                  onChange={handleInputChange}
                  variant="bordered"
                  minRows={4}
                />
                <Input label="SHA-384 Hash" variant="bordered" value={output} readOnly />

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
                    <Button color="primary" startContent={<Hash />} onClick={generateSHA384} className="flex-1">
                      Generate SHA-384
                    </Button>
                    <Button color="secondary" startContent={<Upload />} onClick={() => fileInputRef.current?.click()}>
                      Upload File
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  </div>

                  <label className="text-lg font-medium">SHA-384 Hash</label>
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
              <Tab key="verify" title="Verify SHA-384">
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

                  <label className="text-lg font-medium">Generated SHA-384 Hash</label>
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
                    placeholder="Enter SHA-384 hash to compare..."
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
      </div>  

        {/* Advanced Options */}
        <Card className="mt-8 bg-default-50 dark:bg-default-100">
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
                      localStorage.setItem("sha384Presets", JSON.stringify(newPresets))
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
                <Card className="mt-8 bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is SHA-384 Hash Generator & Verifier?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The SHA-384 Hash Generator & Verifier is an advanced cryptographic tool that generates 384-bit (48-byte) hash values, 
                offering enhanced security compared to SHA-256. As part of the SHA-2 family, it provides a robust solution for 
                data integrity verification, digital signatures, and secure hashing applications.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/SHA384HashPreview.png"
                  alt="Screenshot of the SHA-384 Hash Generator & Verifier interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use SHA-384 Hash Generator & Verifier?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter text or upload a file in the input area</li>
                <li>Select your preferred input encoding method</li>
                <li>Add an optional salt value for enhanced security</li>
                <li>Configure the number of hash iterations</li>
                <li>Generate the SHA-384 hash</li>
                <li>Use the verification tab to compare hashes</li>
                <li>Save frequently used configurations as presets</li>
                <li>Export or copy the generated hash as needed</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Advantages of SHA-384
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Higher security compared to SHA-256 due to a longer hash length</li>
                <li>Ideal for cryptographic applications such as digital signatures and SSL certificates</li>
                <li>Resistant to collision attacks, making it suitable for integrity verification</li>
                <li>Widely supported across modern cryptographic frameworks</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Security Considerations
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                While SHA-384 provides strong security, it's essential to use additional cryptographic techniques such as salting 
                and multiple iterations to enhance hash uniqueness. Always ensure that sensitive data is handled securely 
                and never store raw passwords—preferably use SHA-384 in combination with key-stretching algorithms like PBKDF2 or bcrypt.
              </p>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
                Limitations of SHA-384
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>SHA-384 is a one-way function, meaning hashes cannot be reversed to retrieve original data</li>
                <li>Not suitable for storing sensitive passwords without additional security layers</li>
                <li>Can be computationally expensive for applications requiring rapid real-time hashing</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Verifying the integrity of downloaded files</li>
                <li>Creating secure cryptographic signatures</li>
                <li>Protecting sensitive data in security-focused applications</li>
                <li>Ensuring tamper-proof digital records and logs</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Final Thoughts
              </h2>
              <p className="text-sm md:text-base text-default-600">
                The SHA-384 Hash Generator & Verifier is a powerful tool for ensuring data integrity and security. 
                By leveraging SHA-384’s robust cryptographic properties alongside advanced options like salting and multiple iterations, 
                users can create highly secure hashes for various applications. 
                Whether for file verification, secure password hashing, or cryptographic security, SHA-384 remains a trusted solution.
              </p>
            </div>
          </CardBody>
        </Card>
        </ToolLayout>
  )
}


