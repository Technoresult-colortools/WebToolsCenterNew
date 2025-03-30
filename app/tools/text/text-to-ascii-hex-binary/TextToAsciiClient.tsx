"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Card, CardBody, Button, Textarea, Select, SelectItem, Switch, Tabs, Tab } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import {
  Copy,
  RefreshCw,
  Info,
  Lightbulb,
  BookOpen,
  ArrowRightLeft,
  Settings,
  FileDown,
  Code,
  Hexagon,
  Binary,
  FileCode,
  ZapIcon,
  Layers,
  Settings2,
  Lock,
  Download,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const outputFormatOptions = [
  { value: "space", label: "Space Separated" },
  { value: "comma", label: "Comma Separated" },
  { value: "none", label: "No Separator" },
]

export default function TextToAsciiHexBinary() {
  const [inputText, setInputText] = useState("")
  const [asciiResult, setAsciiResult] = useState("")
  const [hexResult, setHexResult] = useState("")
  const [binaryResult, setBinaryResult] = useState("")
  const [base64Result, setBase64Result] = useState("")
  const [outputFormat, setOutputFormat] = useState("space")
  const [caseSensitive, setCaseSensitive] = useState(true)

  const convertText = useCallback(
    (text: string) => {
      const processedText = caseSensitive ? text : text.toLowerCase()
      const separator = outputFormat === "space" ? " " : outputFormat === "comma" ? "," : ""

      // ASCII conversion
      const ascii = processedText
        .split("")
        .map((char) => char.charCodeAt(0))
        .join(separator)
      setAsciiResult(ascii)

      // Hexadecimal conversion
      const hex = processedText
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(separator)
      setHexResult(hex)

      // Binary conversion
      const binary = processedText
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(separator)
      setBinaryResult(binary)

      // Base64 conversion
      const base64 = btoa(processedText)
      setBase64Result(base64)
    },
    [caseSensitive, outputFormat],
  )

  useEffect(() => {
    convertText(inputText)
  }, [inputText, convertText])

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }, [])

  const handleClear = useCallback(() => {
    setInputText("")
    setAsciiResult("")
    setHexResult("")
    setBinaryResult("")
    setBase64Result("")
    toast.success("Text Cleared!")
  }, [])

  const handleDownload = useCallback((content: string, fileType: string) => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `converted_${fileType}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }, [])

  return (
    <ToolLayout
      title="Text to ASCII/Hex/Binary Converter"
      description="Convert plain text into ASCII, hexadecimal, binary, and Base64 representations."
      toolId="678f382926f06f912191bc84"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              label="Enter your text:"
              value={inputText}
              onValueChange={setInputText}
              placeholder="Type or paste your text here"
              minRows={4}
              className="w-full mb-4"
              variant="bordered"
            />
            <div className="flex flex-wrap gap-4 mb-4">
            <Select
                label="Output Separator"
                selectedKeys={[outputFormat]}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="max-w-xs"
                variant="bordered"
              >
                {outputFormatOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Switch isSelected={caseSensitive} onValueChange={setCaseSensitive}>
                Case Sensitive
              </Switch>
              
              <Button
                color="danger"
                onPress={handleClear}
                startContent={<RefreshCw size={18} />}
                className="mb-4 w-36"
              >
                Clear
              </Button>
            </div>

            <Tabs aria-label="Conversion Options">
              <Tab
                key="ascii"
                title={
                  <div className="flex items-center gap-2">
                    <Code size={18} />
                    ASCII
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <Textarea value={asciiResult} label="ASCII Result" isReadOnly minRows={4} variant="bordered" />
                    <div className="flex flex-wrap gap-2 mt-2 sm:flex-row sm:justify-start flex-col">
                      <Button color="primary" onPress={() => handleCopy(asciiResult)} startContent={<Copy size={18} />}>
                        Copy ASCII
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleDownload(asciiResult, "ascii")}
                        startContent={<FileDown size={18} />}
                      >
                        Download ASCII
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="hex"
                title={
                  <div className="flex items-center gap-2">
                    <Hexagon size={18} />
                    Hexadecimal
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <Textarea value={hexResult} label="Hexadecimal Result" isReadOnly minRows={4} variant="bordered" />
                    <div className="flex flex-wrap gap-2 mt-2 sm:flex-row sm:justify-start flex-col">
                      <Button color="primary" onPress={() => handleCopy(hexResult)} startContent={<Copy size={18} />}>
                        Copy Hexadecimal
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleDownload(hexResult, "hex")}
                        startContent={<FileDown size={18} />}
                      >
                        Download Hexadecimal
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="binary"
                title={
                  <div className="flex items-center gap-2">
                    <Binary size={18} />
                    Binary
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <Textarea value={binaryResult} label="Binary Result" isReadOnly minRows={4} variant="bordered" />
                    <div className="flex flex-wrap gap-2 mt-2 sm:flex-row sm:justify-start flex-col">
                      <Button
                        color="primary"
                        onPress={() => handleCopy(binaryResult)}
                        startContent={<Copy size={18} />}
                      >
                        Copy Binary
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleDownload(binaryResult, "binary")}
                        startContent={<FileDown size={18} />}
                      >
                        Download Binary
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="base64"
                title={
                  <div className="flex items-center gap-2">
                    <FileCode size={18} />
                    Base64
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <Textarea value={base64Result} label="Base64 Result" isReadOnly minRows={4} variant="bordered" />
                    <div className="flex flex-wrap gap-2 mt-2 sm:flex-row sm:justify-start flex-col">
                      <Button
                        color="primary"
                        onPress={() => handleCopy(base64Result)}
                        startContent={<Copy size={18} />}
                      >
                        Copy Base64
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleDownload(base64Result, "base64")}
                        startContent={<FileDown size={18} />}
                      >
                        Download Base64
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the Text to ASCII/Hex/Binary Converter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The Text to ASCII/Hex/Binary Converter is a multi-purpose application for developers, cryptographers, and digital hobbies. The app provides fast and accurate translations between basic text and several encoded formats in an easy-to-use interface for converting text for programming, data analysis, or educational purposes.This converter provides guaranteed translations back and forth between four formats, ASCII, Hexadecimal, Binary, and Base64, so you don't need to concern yourself with having to look up conversions again. It’s the ultimate stepping stone towards efficiency.
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/TexttoASCIIPreview.png?height=400&width=600"
                alt="Screenshot of the Text to ASCII/Hex/Binary Converter interface showing input area, conversion options, and multiple output formats"
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
              How to Use the Text to ASCII/Hex/Binary Converter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Using our Text to ASCII/Hex/Binary Converter is straightforward. Here's a quick guide to get you started:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Enter or paste your text into the input box.</li>
              <li>The converter will automatically generate ASCII, Hexadecimal, Binary, and Base64 representations.</li>
              <li>Use the tabs to switch between different conversion formats.</li>
              <li>Adjust the output separator and case sensitivity as needed.</li>
              <li>Copy the converted text to the clipboard with a single click, or download it as a text file.</li>
              <li>Use the "Clear" button to reset the input and start a new conversion.</li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <ArrowRightLeft className="w-6 h-6 mr-2" />
              Supported Conversion Types
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Our Text to ASCII/Hex/Binary Converter supports the following conversion types:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>ASCII</strong>: Convert text to ASCII decimal values
              </li>
              <li>
                <strong>Hexadecimal</strong>: Convert text to hexadecimal representation
              </li>
              <li>
                <strong>Binary</strong>: Convert text to binary representation
              </li>
              <li>
                <strong>Base64</strong>: Convert text to Base64 encoding
              </li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Additional Features
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Beyond basic conversion, our tool offers several handy features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Output Separator</strong>: Choose between space-separated, comma-separated, or no separator for
                the output
              </li>
              <li>
                <strong>Case Sensitivity</strong>: Toggle case sensitivity for more precise conversions
              </li>
              <li>
                <strong>Copy to Clipboard</strong>: Easily copy the converted text with one click
              </li>
              <li>
                <strong>Download Results</strong>: Save your conversions as text files
              </li>
              <li>
                <strong>Clear Function</strong>: Quickly reset the converter for new inputs
              </li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Features That Make Us Stand Out
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <ZapIcon className="w-4 h-4 inline-block mr-1" /> <strong>Real-time conversions</strong>: See results
                instantly as you type
              </li>
              <li>
                <Layers className="w-4 h-4 inline-block mr-1" /> <strong>Multiple formats</strong>: Convert to ASCII,
                Hex, Binary, and Base64 simultaneously
              </li>
              <li>
                <Settings2 className="w-4 h-4 inline-block mr-1" /> <strong>Customizable output</strong>: Choose your
                preferred separator style
              </li>
              <li>
                <Lock className="w-4 h-4 inline-block mr-1" /> <strong>Case sensitivity option</strong>: Ensure precise
                conversions when needed
              </li>
              <li>
                <Download className="w-4 h-4 inline-block mr-1" /> <strong>Easy export</strong>: Copy or download your
                converted text effortlessly
              </li>
              <li>
                <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick reset</strong>: Clear and start over
                with a single click
              </li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
              Ready to explore the world of text encoding? Dive into our Text to ASCII/Hex/Binary Converter and
              experience the power of efficient text conversion. Whether you're a developer working on low-level
              programming, a student learning about different number systems, or just someone curious about how
              computers represent text, our tool is here to make your conversions quick and easy. Start converting and
              uncover the digital essence of your text!
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
