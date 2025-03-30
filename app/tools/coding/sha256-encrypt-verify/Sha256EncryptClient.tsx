"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  Textarea,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
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
import crypto from "crypto"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

type Preset = {
  input: string
  encoding: "utf8" | "ascii" | "base64"
  iterations: number
  salt: string
}

export default function SHA256EncryptVerify() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [compareHash, setCompareHash] = useState("")
  const [fileName, setFileName] = useState("")
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [encoding, setEncoding] = useState<"utf8" | "ascii" | "base64">("utf8")
  const [iterations, setIterations] = useState(1)
  const [salt, setSalt] = useState("")
  const [presets, setPresets] = useState<Record<string, Preset>>({})
  const [selectedPreset, setSelectedPreset] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoUpdate) {
      generateSHA256()
    }
  }, [autoUpdate])

  useEffect(() => {
    const savedPresets = localStorage.getItem("sha256Presets")
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets))
    }
  }, [])

  const generateSHA256 = () => {
    try {
      const hash = crypto.createHash("sha256")
      hash.update(salt)
      for (let i = 0; i < iterations; i++) {
        hash.update(input, encoding)
      }
      const generatedHash = hash.digest("hex")
      setOutput(generatedHash)
      toast.success("SHA-256 hash generated successfully!")
    } catch (error) {
      console.error("Error generating SHA-256:", error)
      toast.error("Error generating SHA-256 hash. Please check your input and encoding.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
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
    setEncoding("utf8")
    setIterations(1)
    setSalt("")
    setSelectedPreset("")
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
        if (autoUpdate) {
          generateSHA256()
        }
      }
      reader.readAsText(file)
      toast.success("File uploaded successfully!")
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([output], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "sha256_hash.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("SHA-256 hash downloaded!")
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

  const savePreset = () => {
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
  }

  const loadPreset = (presetName: string) => {
    const preset = presets[presetName]
    if (preset) {
      setInput(preset.input)
      setEncoding(preset.encoding)
      setIterations(preset.iterations)
      setSalt(preset.salt)
      setSelectedPreset(presetName)
      toast.success("Preset loaded successfully!")
    }
  }

  const deletePreset = (presetName: string) => {
    const newPresets = { ...presets }
    delete newPresets[presetName]
    setPresets(newPresets)
    localStorage.setItem("sha256Presets", JSON.stringify(newPresets))
    if (selectedPreset === presetName) {
      setSelectedPreset("")
    }
    toast.success("Preset deleted successfully!")
  }

  return (
    <ToolLayout
      title="SHA-256 Hash Generator and Verifier"
      description="Generate and verify SHA-256 hashes for text and file content"
      toolId="678f383026f06f912191bcc5"
    >
     <div className="flex flex-col gap-8">   

      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs aria-label="SHA-256 options">
            <Tab key="generate" title="Generate SHA-256">
              <div className="space-y-4 mt-4">
                <Textarea
                  label="Input Text"
                  placeholder="Enter text to generate SHA-256 hash..."
                  value={input}
                  onChange={handleInputChange}
                  variant="bordered"
                  minRows={4}
                />
                <Input label="SHA-256 Hash" variant="bordered" value={output} readOnly />
              </div>
            </Tab>
            <Tab key="verify" title="Verify SHA-256">
              <div className="space-y-4 mt-4">
                <Textarea
                  label="Input Text"
                  placeholder="Enter text to verify SHA-256 hash..."
                  value={input}
                  variant="bordered"
                  onChange={handleInputChange}
                  minRows={4}
                />
                <Input label="Generated SHA-256 Hash" variant="bordered" value={output} readOnly />
                <Input
                  label="Hash to Compare"
                  placeholder="Enter SHA-256 hash to compare..."
                  value={compareHash}
                  variant="bordered"
                  onChange={(e) => setCompareHash(e.target.value)}
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
              variant="bordered"
              onChange={(e) => setEncoding(e.target.value as "utf8" | "ascii" | "base64")}
            >
              <SelectItem key="utf8" value="utf8" className="text-default-700">
                UTF-8
              </SelectItem>
              <SelectItem key="ascii" value="ascii" className="text-default-700">
                ASCII
              </SelectItem>
              <SelectItem key="base64" value="base64" className="text-default-700">
                Base64
              </SelectItem>
            </Select>
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

          <div className="mt-4">
            <Input
              label="Salt (optional)"
              placeholder="Enter salt..."
              variant="bordered"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
            <Button className="w-full md:flex-1" color="primary" onPress={generateSHA256} startContent={<Hash />}>
              Generate SHA-256
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

          <div className="mt-4 space-y-4">
            <Select label="Presets" variant="bordered" selectedKeys={[selectedPreset]} onChange={(e) => loadPreset(e.target.value)}>
              {Object.keys(presets).map((presetName) => (
                <SelectItem key={presetName} value={presetName} className="text-default-700">
                  {presetName}
                </SelectItem>
              ))}
            </Select>
            <div className="flex gap-2">
              <Button color="success" onPress={savePreset} startContent={<Save />}>
                Save Preset
              </Button>
              {selectedPreset && (
                <Button color="danger" onPress={() => deletePreset(selectedPreset)} startContent={<Trash2 />}>
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
              SHA-256 hash generator and verifier is a robust cryptographic algorithm that can create values with hash sizes of 256 bits (32 bytes). It can provide assurance of integrity and security of data. Operating in the SHA-2 family, SHA-256 is commonly utilized in blockchain technology, password hashing, and digital signatures. When used appropriately, it exhibits resilience to collisions and preimage attacks.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/InfosectionImages/SHA256Preview.png?height=400&width=600"
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