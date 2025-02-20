"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Input, Button, Textarea, Card, CardBody, Tabs, Tab, Select, SelectItem } from "@nextui-org/react"
import {
  FileLock,
  FileLock2,
  Upload,
  Copy,
  RefreshCw,
  Info,
  BookOpen,
  Settings,
  Lightbulb,
  Download,
  Eye,
  EyeOff,
} from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react" // Import Clock icon

const MAX_FILE_SIZE_MB = 5
const ALLOWED_FILE_TYPES = ["text/plain", "image/png", "image/jpeg", "application/pdf"]

export default function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const [fileName, setFileName] = useState("")
  const [encoding, setEncoding] = useState("UTF-8")
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEncode = () => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(inputText)
      const encoded = btoa(String.fromCharCode.apply(null, Array.from(data)))
      setOutputText(encoded)
    } catch (error) {
      toast.error(`Error encoding text. Make sure it's valid ${encoding}.`)
    }
  }

  const handleDecode = () => {
    try {
      const decoded = atob(inputText)
      const decoder = new TextDecoder(encoding)
      const decodedText = decoder.decode(new Uint8Array([...decoded].map((char) => char.charCodeAt(0))))
      setOutputText(decodedText)
    } catch (error) {
      toast.error("Error decoding text. Make sure it's valid Base64.")
    }
  }

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
            } catch (err) {
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

  useEffect(() => {
    if (activeTab === "encode") {
      handleEncode()
    } else {
      handleDecode()
    }
  }, [inputText, activeTab, encoding]) // Added encoding to dependencies

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode data using Base64 encoding with advanced features"
      toolId="678f382e26f06f912191bcb9"
    >

      <Card className="bg-default-50 dark:bg-default-100 mb-8">
        <CardBody className="p-6">
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
            <Tab
              key="encode"
              title={
                <div className="flex items-center">
                  <FileLock className="w-4 h-4 mr-2" />
                  Encode
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <Textarea
                  label="Text to Encode"
                  placeholder="Enter text to encode..."
                  variant="bordered"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  minRows={4}
                />
                <Textarea label="Encoded Base64" variant="bordered" value={outputText} readOnly minRows={4} />
              </div>
            </Tab>
            <Tab
              key="decode"
              title={
                <div className="flex items-center">
                  <FileLock2 className="w-4 h-4 mr-2" />
                  Decode
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <Textarea
                  label="Base64 to Decode"
                  placeholder="Enter Base64 to decode..."
                  variant="bordered"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  minRows={4}
                />
                <Textarea label="Decoded Text" variant="bordered" value={outputText} readOnly minRows={4} />
              </div>
            </Tab>
          </Tabs>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button color="primary" onClick={() => copyToClipboard(outputText)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy {activeTab === "encode" ? "Encoded" : "Decoded"}
            </Button>
            <Button color="danger" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button color="success" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button color="primary" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Upload File to Encode/Decode</h3>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Input type="file" variant="bordered" onChange={handleFileUpload} ref={fileInputRef} className="w-3/4" />
              <Button color="primary" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
            {fileName && <p className="text-sm mt-2">Uploaded: {fileName}</p>}
            <p className="text-sm text-default-400 flex items-center mt-2">
              <Info className="w-4 h-4 mr-1" />
              Max file size: {MAX_FILE_SIZE_MB}MB. Allowed types: PNG, JPEG, PDF, TXT
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Options</h3>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Select
                label="Encoding"
                selectedKeys={[encoding]}
                variant="bordered"
                onSelectionChange={(keys) => setEncoding(Array.from(keys)[0] as string)}
              >
                <SelectItem key="UTF-8" value="UTF-8" className="text-default-700">
                  UTF-8
                </SelectItem>
                <SelectItem key="ASCII" value="ASCII" className="text-default-700">
                  ASCII
                </SelectItem>
                <SelectItem key="ISO-8859-1" value="ISO-8859-1" className="text-default-700">
                  ISO-8859-1
                </SelectItem>
              </Select>
            </div>
          </div>

          {showPreview && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="bg-white p-4 rounded-md">
                <div dangerouslySetInnerHTML={{ __html: outputText }} />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Info Section */}
      <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the Base64 Encoder/Decoder?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            The Base64 Encoder/Decoder is a versatile tool designed for developers, IT professionals, and anyone working
            with data encoding. It offers a{" "}
            <Link href="#how-to-use" className="text-primary hover:underline">
              user-friendly interface
            </Link>{" "}
            for encoding and decoding text and files using the Base64 scheme. Whether you're working on web development,
            data transmission, or just need to convert between text and Base64, our tool simplifies the process with
            real-time conversion and advanced features.
          </p>
          <p className="text-sm md:text-base text-default-600 mb-4">
            With support for multiple file types, various text encodings, and instant preview functionality, it's like
            having a Swiss Army knife for Base64 operations right in your browser. Say goodbye to command-line tools or
            limited online converters and hello to a comprehensive Base64 solution!
          </p>

          <div className="my-8">
            <Image
              src="/Images/Base64EncoderDecoderPreview.png?height=400&width=600"
              alt="Screenshot of the Base64 Encoder/Decoder interface showing encoding and decoding options"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          <h2
            id="how-to-use"
            className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
          >
            <BookOpen className="w-6 h-6 mr-2" />
            How to Use the Base64 Encoder/Decoder?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            Using our Base64 Encoder/Decoder is straightforward. Here's a quick guide to get you started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Choose between the Encode and Decode tabs based on your needs.</li>
            <li>Enter or paste your text or Base64 string into the input field.</li>
            <li>Watch as the conversion happens in real-time in the output field.</li>
            <li>For file encoding/decoding, use the file upload feature.</li>
            <li>Customize the encoding type in the Advanced Options if needed.</li>
            <li>Use the Copy, Reset, or Download buttons to manage your output.</li>
            <li>Toggle the Preview feature to see a rendered version of decoded HTML content.</li>
          </ol>

          <h2
            id="features"
            className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
          >
            <Lightbulb className="w-6 h-6 mr-2" />
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li>
              <Settings className="w-4 h-4 inline-block mr-1" /> <strong>Real-time conversion:</strong> Instantly encode
              or decode as you type
            </li>
            <li>
              <Upload className="w-4 h-4 inline-block mr-1" /> <strong>File support:</strong> Upload and process PNG,
              JPEG, PDF, and text files
            </li>
            <li>
              <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Multiple encodings:</strong> Support for
              UTF-8, ASCII, and ISO-8859-1
            </li>
            <li>
              <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Preview functionality:</strong> Render decoded HTML
              content
            </li>
            <li>
              <Copy className="w-4 h-4 inline-block mr-1" /> <strong>Quick actions:</strong> Copy, reset, and download
              results easily
            </li>
            <li>
              <Info className="w-4 h-4 inline-block mr-1" /> <strong>Error handling:</strong> Clear notifications for
              invalid inputs or processing issues
            </li>
            <li>
              <Clock className="w-4 h-4 inline-block mr-1" /> <strong>Automatic detection:</strong> Identifies Base64
              content in uploaded files
            </li>
          </ul>

          <p className="text-sm md:text-base text-default-600 mt-6">
            Ready to simplify your Base64 encoding and decoding tasks? Start using our Base64 Encoder/Decoder now and
            experience the power of efficient data conversion. Whether you're a seasoned developer working with complex
            data formats or a beginner exploring the world of encoding, our tool provides the perfect balance of
            simplicity and advanced features. Try it out and see how it can streamline your workflow!
          </p>
        </div>
      </Card>
    </ToolLayout>
  )
}

