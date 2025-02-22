"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button, Card, CardBody, Input, Switch, Textarea, Tabs, Tab, Select, SelectItem } from "@nextui-org/react"
import { toast, Toaster } from "react-hot-toast"
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
  AlertTriangle,
  FileText,
  Shield,
} from "lucide-react"
import crypto from "crypto-js"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

const MAX_CHARS = 10000

export default function MD5HashGeneratorVerifier() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [compareHash, setCompareHash] = useState("")
  const [fileName, setFileName] = useState("")
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [encoding, setEncoding] = useState("UTF-8")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoUpdate) {
      generateMD5()
    }
  }, [autoUpdate]) // Only autoUpdate is needed here

  const generateMD5 = () => {
    try {
      let encodedInput = input
      if (encoding === "Base64") {
        encodedInput = crypto.enc.Base64.parse(input).toString(crypto.enc.Utf8)
      } else if (encoding === "Hex") {
        encodedInput = crypto.enc.Hex.parse(input).toString(crypto.enc.Utf8)
      }
      const hash = crypto.MD5(encodedInput).toString()
      setOutput(hash)
      toast.success("MD5 hash generated successfully!")
    } catch (error) {
      console.error("Error generating MD5:", error)
      toast.error("Error generating MD5 hash. Please check your input and encoding.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setInput(text)
    } else {
      toast.error(`Maximum ${MAX_CHARS} characters allowed`)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setInput("")
    setOutput("")
    setCompareHash("")
    setFileName("")
    setEncoding("UTF-8")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("All fields have been reset.")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
      toast.success("File uploaded successfully!")
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([output], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "md5_hash.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("MD5 hash downloaded!")
  }

  const compareHashes = () => {
    if (caseSensitive) {
      if (output === compareHash) {
        toast.success("Hashes match!")
      } else {
        toast.error("Hashes do not match.")
      }
    } else {
      if (output.toLowerCase() === compareHash.toLowerCase()) {
        toast.success("Hashes match!")
      } else {
        toast.error("Hashes do not match.")
      }
    }
  }



  return (
    <ToolLayout
      title="MD5 Hash Generator and Verifier"
      description="Generate and verify MD5 hashes for text and file content"
      toolId="678f382f26f06f912191bcc2"
    >
      <Toaster position="top-right" />
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="MD5 options">
              <Tab key="generate" title="Generate MD5">
                <div className="space-y-4 mt-4">
                  <Textarea
                    label="Input Text"
                    placeholder="Enter text to generate MD5 hash..."
                    value={input}
                    onChange={handleInputChange}
                    variant="bordered"
                    minRows={4}
                  />
                  <Input label="MD5 Hash" variant="bordered" value={output} readOnly />
                </div>
              </Tab>
              <Tab key="verify" title="Verify MD5">
                <div className="space-y-4 mt-4">
                  <Textarea
                    label="Input Text"
                    placeholder="Enter text to verify MD5 hash..."
                    value={input}
                    onChange={handleInputChange}
                    variant="bordered"
                    minRows={4}
                  />
                  <Input label="Generated MD5 Hash" variant="bordered" value={output} readOnly />
                  <Input
                    label="Hash to Compare"
                    placeholder="Enter MD5 hash to compare..."
                    value={compareHash}
                    onChange={(e) => setCompareHash(e.target.value)}
                    variant="bordered"
                  />
                  <Button color="primary" onPress={compareHashes} startContent={<CheckCircle2 />}>
                    Compare Hashes
                  </Button>
                </div>
              </Tab>
            </Tabs>

            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Switch isSelected={autoUpdate} onValueChange={setAutoUpdate} />
                <span>Auto-update hash on input change</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch isSelected={caseSensitive} onValueChange={setCaseSensitive} />
                <span>Case-sensitive hash comparison</span>
              </div>
            </div>

            <div className="mt-4">
              <Select
                label="Input Encoding"
                selectedKeys={[encoding]}
                onChange={(e) => setEncoding(e.target.value)}
                variant="bordered"
              >
                <SelectItem key="UTF-8" value="UTF-8" className="text-default-700">
                  UTF-8
                </SelectItem>
                <SelectItem key="Base64" value="Base64" className="text-default-700">
                  Base64
                </SelectItem>
                <SelectItem key="Hex" value="Hex" className="text-default-700">
                  Hexadecimal
                </SelectItem>
              </Select>
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
            <Button className="w-full md:flex-1" color="primary" onPress={generateMD5} startContent={<Hash />}>
                Generate MD5
            </Button>
            <Button className="w-full md:flex-1" color="secondary" onPress={() => copyToClipboard(output)} startContent={<Copy />}>
                Copy Hash
            </Button>
            <Button className="w-full md:flex-1" color="danger" onPress={handleReset} startContent={<RefreshCw />}>
                Reset
            </Button>
            <Button className="w-full md:flex-1" color="primary" onPress={handleDownload} isDisabled={!output} startContent={<Download />}>
                Download Hash
            </Button>
            </div>


            <div className="mt-4 space-y-4">
              <Input type="file" variant="bordered" onChange={handleFileUpload} ref={fileInputRef} />
              <Button color="primary" onPress={() => fileInputRef.current?.click()} startContent={<Upload />}>
                Choose File
              </Button>
              {fileName && <p>{fileName}</p>}
            </div>
          </CardBody>
        </Card>

        <Card className="mt-8 bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is MD5 Hash Generator & Verifier?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The MD5 Hash Generator & Verifier is a tool designed for generating and verifying MD5 (Message Digest
                algorithm 5) hashes. MD5 produces a 128-bit (16-byte) hash value, typically expressed as a 32-digit
                hexadecimal number. While MD5 is no longer considered cryptographically secure, it still finds use in
                various non-security-critical applications for checksums and data verification.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/MD5HashPreview.png"
                  alt="Screenshot of the MD5 Hash Generator & Verifier interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use MD5 Hash Generator & Verifier?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter text or upload a file in the input area</li>
                <li>Select your preferred input encoding method</li>
                <li>Generate the MD5 hash</li>
                <li>Use the verification tab to compare hashes</li>
                <li>Copy, download, or paste hashes as needed</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features of MD5
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Generates 128-bit hash values</li>
                <li>Supports text input and file hashing</li>
                <li>Verifies and compares hashes efficiently</li>
                <li>Supports various input encodings: UTF-8, Base64, Hexadecimal</li>
                <li>Clipboard integration for easy copying and pasting</li>
                <li>Download option to save generated hashes</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Security Considerations
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                MD5 is considered cryptographically broken and is not suitable for security-critical applications. It
                should not be used for storing password hashes or in contexts where collision resistance is important.
                For security-sensitive tasks, use stronger algorithms like SHA-256 or SHA-3.
              </p>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
                Limitations of MD5
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Vulnerable to collision attacks</li>
                <li>Not suitable for cryptographic security</li>
                <li>Should not be used for password hashing</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>File integrity checks (non-security-critical)</li>
                <li>Data deduplication</li>
                <li>Caching mechanisms</li>
                <li>Legacy systems compatibility</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Final Thoughts
              </h2>
              <p className="text-sm md:text-base text-default-600">
                While the MD5 Hash Generator & Verifier remains a useful tool for certain applications, it's crucial to
                understand its limitations and security vulnerabilities. For any security-critical operations, always
                opt for more robust and collision-resistant hash functions. This tool serves educational purposes and
                can be used for non-security-sensitive tasks where MD5 is still applicable.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

