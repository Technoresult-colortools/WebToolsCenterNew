"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Image from "next/image"
import { Card, CardBody, Button, Textarea, Select, SelectItem, Switch } from "@nextui-org/react"
import {
  Copy,
  RefreshCw,
  Code,
  FileText,
  Download,
  Upload,
  Clipboard,
  Wand2,
  Info,
  BookOpen,
  Lightbulb,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

const encodingOptions = [
  { value: "named", label: "Named Entities" },
  { value: "decimal", label: "Decimal Entities" },
  { value: "hexadecimal", label: "Hexadecimal Entities" },
]

const namedEntities: { [key: string]: string } = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "¢": "&cent;",
    "£": "&pound;",
    "¥": "&yen;",
    "€": "&euro;",
    "©": "&copy;",
    "®": "&reg;",
    "§": "&sect;",
    "°": "&deg;",
    "±": "&plusmn;",
    "×": "&times;",
    "÷": "&divide;",
    "µ": "&micro;",
    "¶": "&para;",
    "·": "&middot;",
    "½": "&frac12;",
    "¼": "&frac14;",
    "¾": "&frac34;",
    "¿": "&iquest;",
    "ª": "&ordf;",
    "º": "&ordm;",
    "«": "&laquo;",
    "»": "&raquo;",
    "ƒ": "&fnof;",
    "ð": "&eth;",
    "þ": "&thorn;",
    "Ð": "&ETH;",
    "Þ": "&THORN;",
    "æ": "&aelig;",
    "Æ": "&AElig;",
    "œ": "&oelig;",
    "Œ": "&OElig;",
    "ß": "&szlig;",
    "å": "&aring;",
    "Å": "&Aring;",
    "Ø": "&Oslash;",
    "ø": "&oslash;",
    "¯": "&macr;",
    "¨": "&uml;",
    "¬": "&not;",
    "¡": "&iexcl;",
    "ˆ": "&circ;",
    "˜": "&tilde;",
    "∂": "&part;",
    "∆": "&Delta;",
    "∏": "&prod;",
    "∑": "&sum;",
    "∗": "&lowast;",
    "√": "&radic;",
    "∞": "&infin;",
    "∠": "&ang;",
    "∩": "&cap;",
    "∪": "&cup;",
    "∫": "&int;",
    "≈": "&asymp;",
    "≠": "&ne;",
    "≡": "&equiv;",
    "≤": "&le;",
    "≥": "&ge;",
    "⊂": "&sub;",
    "⊃": "&sup;",
    "⊆": "&sube;",
    "⊇": "&supe;",
    "⊕": "&oplus;",
    "⊗": "&otimes;",
    "⊥": "&perp;",
    "⋅": "&sdot;",
    "‾": "&oline;",
    "ℵ": "&alefsym;",
    "ℑ": "&image;",
    "℘": "&weierp;",
    "ℜ": "&real;",
    "™": "&trade;",
    "ℓ": "&ell;",
    "←": "&larr;",
    "↑": "&uarr;",
    "→": "&rarr;",
    "↓": "&darr;",
    "↔": "&harr;",
    "↵": "&crarr;",
    "⇐": "&lArr;",
    "⇑": "&uArr;",
    "⇒": "&rArr;",
    "⇓": "&dArr;",
    "⇔": "&hArr;",
    "∀": "&forall;",
    "∃": "&exist;",
    "∅": "&empty;",
    "∇": "&nabla;",
    "∉": "&notin;",
    "∋": "&ni;",
    "∴": "&there4;",
    "⌈": "&lceil;",
    "⌉": "&rceil;",
    "⌊": "&lfloor;",
    "⌋": "&rfloor;",
    "◊": "&loz;",
    "♠": "&spades;",
    "♣": "&clubs;",
    "♥": "&hearts;",
    "♦": "&diams;",
  };
  
  
  

const reverseNamedEntities: { [key: string]: string } = Object.entries(namedEntities).reduce(
  (acc, [char, entity]) => ({
    ...acc,
    [entity]: char,
  }),
  {}
)

export default function HTMLEncoderDecoder() {
  const [text, setText] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [preserveNewlines, setPreserveNewlines] = useState(true)
  const [encodeQuotes, setEncodeQuotes] = useState(true)
  const [encodeNonASCII, setEncodeNonASCII] = useState(false)
  const [encodingType, setEncodingType] = useState<"named" | "decimal" | "hexadecimal">("named")

  const encodeHTML = useCallback(
    (input: string) => {
      if (!input) return ""

      const encodeChar = (char: string) => {
        const code = char.charCodeAt(0)

        if (char === "&") return "&amp;"
        if (!encodeQuotes && (char === '"' || char === "'")) return char

        const shouldEncode =
          char === "<" ||
          char === ">" ||
          (encodeQuotes && (char === '"' || char === "'")) ||
          (encodeNonASCII && code > 127)

        if (!shouldEncode) return char

        switch (encodingType) {
          case "named":
            return namedEntities[char] || `&#${code};`
          case "decimal":
            return `&#${code};`
          case "hexadecimal":
            return `&#x${code.toString(16)};`
          default:
            return char
        }
      }

      let result = Array.from(input).map(encodeChar).join("")
      return preserveNewlines ? result : result.replace(/\n/g, "")
    },
    [encodingType, encodeQuotes, preserveNewlines, encodeNonASCII]
  )

  const decodeHTML = useCallback((input: string) => {
    if (!input) return ""

    let result = input

    // Replace named entities
    Object.entries(reverseNamedEntities).forEach(([entity, char]) => {
      result = result.replace(new RegExp(entity, 'g'), char)
    })

    // Replace decimal entities
    result = result.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10))
    })

    // Replace hexadecimal entities
    result = result.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16))
    })

    return result
  }, [])

  const handleProcess = useCallback(() => {
    if (!text.trim()) {
      toast.error("Please enter some text to process")
      return
    }

    const processed = mode === "encode" ? encodeHTML(text) : decodeHTML(text)
    setText(processed)
    toast.success(`Text ${mode}d successfully!`)
  }, [text, mode, encodeHTML, decodeHTML])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }, [text])

  const handleClear = useCallback(() => {
    setText("")
    toast.success("Text cleared!")
  }, [])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
      toast.success("Text pasted from clipboard!")
    } catch (err) {
      toast.error("Failed to read from clipboard")
    }
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.html')) {
      toast.error('Please upload an HTML file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setText(content)
      toast.success("HTML file loaded successfully!")
    }
    reader.onerror = () => toast.error("Error reading file")
    reader.readAsText(file)
  }, [])

  const handleDownload = useCallback(() => {
    if (!text.trim()) {
      toast.error("No content to download")
      return
    }

    const blob = new Blob([text], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${mode}d-html-${new Date().toISOString().slice(0, 10)}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("File downloaded!")
  }, [text, mode])

  return (
    <ToolLayout
      title="HTML Encoder/Decoder"
      description="Convert between plain text and HTML entities"
      toolId="678f382926f06f912191bc87"
    >
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Mode Selection and Options */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex gap-2">
                <Button
                  color={mode === "encode" ? "primary" : "default"}
                  onPress={() => setMode("encode")}
                  startContent={<Code size={18} />}
                >
                  Encode
                </Button>
                <Button
                  color={mode === "decode" ? "primary" : "default"}
                  onPress={() => setMode("decode")}
                  startContent={<FileText size={18} />}
                >
                  Decode
                </Button>
              </div>
              
              {mode === "encode" && (
                <Select
                  label="Encoding Type"
                  selectedKeys={[encodingType]}
                  onChange={(e) => setEncodingType(e.target.value as "named" | "decimal" | "hexadecimal")}
                  className="max-w-xs"
                  variant="bordered"
                >
                  {encodingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-default-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>

            {/* Text Area */}
            <div className="mb-6">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode" : "Enter HTML entities to decode"}
                minRows={8}
                className="w-full"
                variant="bordered"
              />
            </div>

            {/* Encoding Options */}
            {mode === "encode" && (
              <div className="flex flex-wrap gap-4 mb-6">
                <Switch isSelected={preserveNewlines} onValueChange={setPreserveNewlines}>
                  Preserve newlines
                </Switch>
                <Switch isSelected={encodeQuotes} onValueChange={setEncodeQuotes}>
                  Encode quotes
                </Switch>
                <Switch isSelected={encodeNonASCII} onValueChange={setEncodeNonASCII}>
                  Encode non-ASCII
                </Switch>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button color="primary" onPress={handleProcess} startContent={<Wand2 size={18} />}>
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>
              <Button color="primary" onPress={handleCopy} startContent={<Copy size={18} />}>
                Copy
              </Button>
              <Button color="primary" onPress={handlePaste} startContent={<Clipboard size={18} />}>
                Paste
              </Button>
              <Button color="danger" onPress={handleClear} startContent={<RefreshCw size={18} />}>
                Clear
              </Button>
              <Button color="primary" onPress={handleDownload} startContent={<Download size={18} />}>
                Download
              </Button>
              <Button color="primary" as="label" htmlFor="file-upload" startContent={<Upload size={18} />}>
                Upload HTML
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".html"
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          </CardBody>
        </Card>


        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 mt-8 md:p-8">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About HTML Encoder/Decoder
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The HTML Encoder/Decoder is a powerful tool designed for web developers, content creators, and anyone
                working with HTML. It provides a simple and efficient way to convert plain text into HTML entities and
                vice versa, ensuring that your content displays correctly in web browsers and prevents potential
                security vulnerabilities.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/HTMLEncoderDecoderPreview.png"
                  alt="Screenshot of the HTML Encoder/Decoder interface showing input and output areas, encoding options, and various controls"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-default-600">
                <li>
                  <strong>Bidirectional Conversion:</strong> Easily encode plain text to HTML entities and decode HTML
                  entities back to plain text.
                </li>
                <li>
                  <strong>Multiple Encoding Types:</strong> Choose between named entities, decimal entities, or
                  hexadecimal entities for encoding.
                </li>
                <li>
                  <strong>Customizable Options:</strong> Control how newlines, quotes, and non-ASCII characters are
                  handled during encoding.
                </li>
                <li>
                  <strong>Real-time Processing:</strong> See the results of your encoding or decoding instantly as you
                  type or modify options.
                </li>
                <li>
                  <strong>File Handling:</strong> Upload text files for processing and download the results with ease.
                </li>
                <li>
                  <strong>History Tracking:</strong> Keep a record of your recent encodings and decodings for reference.
                </li>
                <li>
                  <strong>Clipboard Integration:</strong> Quickly paste text from and copy results to your clipboard.
                </li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-default-600">
                <li>
                  <strong>Content Management:</strong> Safely prepare text for use in HTML documents, avoiding rendering
                  issues and potential XSS vulnerabilities.
                </li>
                <li>
                  <strong>Data Scraping:</strong> Clean and process HTML content extracted from web pages.
                </li>
                <li>
                  <strong>Email Template Creation:</strong> Ensure special characters in email content display correctly
                  across different email clients.
                </li>
                <li>
                  <strong>XML Processing:</strong> Prepare text for use in XML documents, ensuring proper escaping of
                  special characters.
                </li>
                <li>
                  <strong>Debugging:</strong> Decode encoded HTML to investigate rendering issues or unexpected behavior
                  in web applications.
                </li>
                <li>
                  <strong>Accessibility:</strong> Ensure that screen readers and other assistive technologies can
                  correctly interpret your web content.
                </li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use HTML Encoder and Decoder?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Choose between "Encode" and "Decode" mode based on your task.</li>
                <li>Select the encoding type (Named, Decimal, or Hexadecimal entities) when in encode mode.</li>
                <li>Enter or paste your text into the input field, or upload a text file.</li>
                <li>
                  Adjust the encoding options as needed:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>Toggle preservation of newlines</li>
                    <li>Choose whether to encode quotes</li>
                    <li>Enable non-ASCII character encoding</li>
                  </ul>
                </li>
                <li>View the processed result in real-time in the output field.</li>
                <li>Use the "Encode" or "Decode" button to process the entire text at once.</li>
                <li>Copy the result to your clipboard or download it as a text file.</li>
                <li>Optionally, review your encoding/decoding history for reference.</li>
              </ol>

              <p className="text-sm md:text-base text-default-600 mt-8">
                Whether you're a web developer ensuring your content renders correctly, a content creator preparing text
                for various platforms, or a security professional safeguarding against XSS attacks, the HTML
                Encoder/Decoder is an indispensable tool in your web development toolkit. Its user-friendly interface,
                coupled with powerful features, streamlines the process of working with HTML entities, saving you time
                and reducing errors in your web projects.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

