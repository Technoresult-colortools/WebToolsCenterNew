"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input, Button, Textarea, Card, CardBody, Tabs, Tab, Switch } from "@nextui-org/react"
import { FileLock, FileLock2, Upload, Copy, RefreshCw, Check, Info, BookOpen, Lightbulb, Zap } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"
import Link from "next/link"

const MAX_FILE_SIZE_MB = 2 // 2MB limit

export default function HTMLEncoderDecoder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const [fileName, setFileName] = useState("")
  const [preserveNewlines, setPreserveNewlines] = useState(true)
  const [encodeQuotes, setEncodeQuotes] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const encodeHTML = (text: string): string => {
    let encoded = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    if (encodeQuotes) {
      encoded = encoded.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    if (!preserveNewlines) {
      encoded = encoded.replace(/\n/g, "")
    }

    return encoded
  }

  const decodeHTML = (text: string): string => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  }

  const handleProcess = () => {
    try {
      const result = activeTab === "encode" ? encodeHTML(inputText) : decodeHTML(inputText)
      setOutputText(result)
      toast.success(`HTML ${activeTab}d successfully!`)
    } catch {
      toast.error(`Error ${activeTab}ing HTML. Please check your input.`)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`)
        return
      }

      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === "string") {
          setInputText(result)
          // Determine if the content is likely encoded HTML
          if (result.includes("&lt;") || result.includes("&gt;") || result.includes("&amp;")) {
            setActiveTab("decode")
          } else {
            setActiveTab("encode")
          }
          toast.success("File uploaded successfully!")
        }
      }
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.")
      }
      reader.readAsText(file)
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

  const validateHTML = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(inputText, "text/html")
    const errors = doc.getElementsByTagName("parsererror")
    if (errors.length > 0) {
      toast.error("Invalid HTML detected. Please check your input.")
    } else {
      toast.success("HTML is valid!")
    }
  }

  return (
    <ToolLayout
      title="HTML Encoder/Decoder"
      description="Convert HTML special characters to their corresponding HTML entities and vice versa"
      toolId="678f382e26f06f912191bcba"
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
                  label="HTML to Encode"
                  placeholder="Enter HTML to encode..."
                  variant="bordered"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  minRows={4}
                />
                <Textarea label="Encoded HTML" variant="bordered" value={outputText} readOnly minRows={4} />
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
                  label="Encoded HTML to Decode"
                  placeholder="Enter encoded HTML to decode..."
                  variant="bordered"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  minRows={4}
                />
                <Textarea label="Decoded HTML" variant="bordered" value={outputText} readOnly minRows={4} />
              </div>
            </Tab>
          </Tabs>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button color="primary" onClick={handleProcess}>
              {activeTab === "encode" ? "Encode" : "Decode"} HTML
            </Button>
            <Button color="primary" onClick={() => copyToClipboard(outputText)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Result
            </Button>
            <Button color="danger" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button color="success" onClick={validateHTML}>
              <Check className="w-4 h-4 mr-2" />
              Validate HTML
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Options</h3>
            <div className="flex flex-col space-y-2">
              <Switch isSelected={preserveNewlines} onValueChange={setPreserveNewlines}>
                Preserve Newlines
              </Switch>
              <Switch isSelected={encodeQuotes} onValueChange={setEncodeQuotes}>
                Encode Quotes
              </Switch>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Upload File</h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Input 
                type="file" 
                accept=".html,.txt" 
                onChange={handleFileUpload} 
                ref={fileInputRef} 
                className="w-full sm:w-auto"
                variant="bordered"
                />
                <Button 
                color="primary" 
                className="w-full sm:w-auto flex items-center justify-center" 
                onClick={() => fileInputRef.current?.click()}
                >
                <Upload className="w-5 h-5 mr-2" />
                Upload File
                </Button>
            </div>

            {fileName && <p className="text-sm mt-2">Uploaded: {fileName}</p>}

            <p className="text-sm text-default-400 flex items-center mt-2">
                <Info className="w-4 h-4 mr-1" />
                Max file size: {MAX_FILE_SIZE_MB}MB. Allowed types: HTML, TXT
            </p>
            </div>

        </CardBody>
      </Card>

      {/* Info Section */}
      <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the HTML Encoder/Decoder?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
          The HTML Encoder/Decoder is a free, easy-to-use program designed for web developers and content creators who need to work with HTML. It provides an efficient means of converting HTML special character points into the corresponding HTML entity (code) and back again. This allows ensuring all HTML code gets rendered appropriately in the web browser as expected, as well as protecting your code from certain security vulnerabilities sometimes referred to as cross-site scripting (XSS) attacks.With file uploading, HTML validation, options for custom encoding, etc., it is an essential utility for ensuring your web projects are clean and secure.
          </p>

          <div className="my-8">
            <Image
              src="/Images/InfosectionImages/HTMLEncodePreview.png?height=400&width=600"
              alt="Screenshot of the HTML Encoder/Decoder interface showing encoding and decoding options"
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
            How to Use the HTML Encoder/Decoder?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            Using our HTML Encoder/Decoder is straightforward. Here's a quick guide to get you started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Choose between the Encode and Decode tabs based on your needs.</li>
            <li>Enter or paste your HTML content into the input field.</li>
            <li>Adjust the encoding options if needed (Preserve Newlines, Encode Quotes).</li>
            <li>Click the "Encode HTML" or "Decode HTML" button to process the content.</li>
            <li>Review the processed HTML in the output field.</li>
            <li>Use the Copy, Reset, or Validate HTML buttons as needed.</li>
            <li>For file processing, use the file upload feature (max 2MB, HTML or TXT files).</li>
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
              <FileLock className="w-4 h-4 inline-block mr-1" /> <strong>HTML Encoding:</strong> Convert special
              characters to HTML entities
            </li>
            <li>
              <FileLock2 className="w-4 h-4 inline-block mr-1" /> <strong>HTML Decoding:</strong> Convert HTML entities
              back to special characters
            </li>
            <li>
              <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Customizable options:</strong> Preserve
              newlines and encode quotes
            </li>
            <li>
              <Upload className="w-4 h-4 inline-block mr-1" /> <strong>File upload support:</strong> Process HTML and
              TXT files up to 2MB
            </li>
            <li>
              <Check className="w-4 h-4 inline-block mr-1" /> <strong>HTML validation:</strong> Check the validity of
              your HTML structure
            </li>
            <li>
              <Copy className="w-4 h-4 inline-block mr-1" /> <strong>Quick actions:</strong> Copy results to clipboard
              and reset inputs
            </li>
            <li>
              <Zap className="w-4 h-4 inline-block mr-1" /> <strong>Real-time processing:</strong> Instant
              encoding/decoding as you type
            </li>
          </ul>

          <p className="text-sm md:text-base text-default-600 mt-6">
          Are you looking to speed up your HTML encoding and decoding process? Begin using the HTML Encoder/Decoder today and take advantage of efficient and secure HTML handling. Whether you are a professional web developer or new to HTML, our HTML Encoder/Decoder has just the right mix of simplicity and highly advanced functionality.  Give it a try and see how it can improve your next web development project!
          </p>
        </div>
      </Card>
    </ToolLayout>
  )
}

