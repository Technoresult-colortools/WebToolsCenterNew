"use client"
import type React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import { Card, CardBody, Button, Textarea, Switch, Tabs, Tab } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { Copy, Download, RefreshCw, Code, Eye, Upload, Info, BookOpen, Lightbulb } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { marked } from "marked"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"
import DOMPurify from "dompurify"
import * as emoji from "node-emoji"

// Configure marked with the new API and emoji support
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  }),
)

// Add emoji support through marked extensions
marked.use({
  extensions: [
    {
      name: "emoji",
      level: "inline",
      start(src) {
        return src.match(
          /(:[\w+-]+:|8-\)|\(\w\)|\(\w\)|\(\w\)|\+-)/i
        )?.index;
      },
      tokenizer(src) {
        const rule =
          /^(:[\w+-]+:|8-\)|\(\w\)|\(\w\)|\(\w\)|\+-)/i;
        const match = rule.exec(src);
        if (match) {
          return {
            type: "emoji",
            raw: match[0],
            text: match[0],
          };
        }
      },
      renderer(token) {
        // Define the emoji map with type for text
        const emojiMap: { [key: string]: string } = {
          "8-)": "😎",
          "(c)": "©",
          "(C)": "©",
          "(r)": "®",
          "(R)": "®",
          "(tm)": "™",
          "(TM)": "™",
          "(p)": "℗",
          "(P)": "℗",
          "+-": "±",
        };

        // Ensure the type of token.text is a valid key of emojiMap
        if (emojiMap[token.text as keyof typeof emojiMap]) {
          return `<span class="emoji">${emojiMap[token.text as keyof typeof emojiMap]}</span>`;
        }

        // If it's not in emojiMap, try using node-emoji to find an emoji
        const emojiText = token.text.replace(/:/g, "");
        const emojiChar = emoji.get(emojiText);
        return emojiChar ? `<span class="emoji">${emojiChar}</span>` : token.raw;
      },
    },
  ],
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("")
  const [html, setHtml] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [autoConvert, setAutoConvert] = useState(true)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<Window | null>(null)

  const sanitizeAndFormatHtml = (rawHtml: string) => {
    const config = {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "div",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "img",
        "span",
        "sup",
        "sub",
        "del",
      ],
      ALLOWED_ATTR: ["href", "name", "target", "src", "alt", "title", "class", "id"],
      KEEP_CONTENT: true,
      ADD_TAGS: ["span"],
      ADD_ATTR: ["class"],
      ALLOW_DATA_ATTR: true,
    }

    const sanitized = DOMPurify.sanitize(rawHtml, config)
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
<style>
  body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; }
  pre { background: #f6f8fa; padding: 1rem; border-radius: 4px; overflow-x: auto; }
  code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; }
  blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1rem; color: #666; }
  img { max-width: 100%; height: auto; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #ddd; padding: 8px; }
  th { background-color: #f6f8fa; }
  .emoji { display: inline-block; height: 1.2em; width: 1.2em; vertical-align: -0.2em; }
</style>
</head>
<body>
${sanitized}
</body>
</html>`
  }

  const convertToHtml = useCallback((inputMarkdown: string) => {
    if (!inputMarkdown.trim()) {
      setHtml("")
      setError("")
      return
    }

    setIsConverting(true)
    setError("")

    try {
      const html = marked.parse(inputMarkdown)
      const sanitizedHtml = DOMPurify.sanitize(html, {
        ADD_TAGS: ["iframe", "span"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "class"],
      })
      setHtml(sanitizedHtml)
    } catch (error) {
      console.error("Conversion error:", error)
      setError(`Conversion error: ${error instanceof Error ? error.message : "Unknown error"}`)
      toast.error("Failed to convert markdown")
    } finally {
      setIsConverting(false)
    }
  }, [])

  useEffect(() => {
    if (autoConvert) {
      const timer = setTimeout(() => convertToHtml(markdown), 300)
      return () => clearTimeout(timer)
    }
  }, [markdown, convertToHtml, autoConvert])

  const handleInputChange = (value: string) => {
    setMarkdown(value)
    if (!autoConvert) setError("")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html)
      toast.success("HTML copied to clipboard")
    } catch {
      toast.error("Failed to copy HTML")
    }
  }

  const handleDownload = () => {
    try {
      const blob = new Blob([html], { type: "text/html;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "converted.html"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("HTML file downloaded")
    } catch {
      toast.error("Failed to download HTML")
    }
  }

  const handleClear = () => {
    setMarkdown("")
    setHtml("")
    setError("")
    toast.success("Content cleared")
  }

  const handleShowPreview = () => {
    if (previewRef.current) {
      previewRef.current.close()
    }
    const preview = window.open("", "_blank")
    if (preview) {
      preview.document.write(sanitizeAndFormatHtml(html))
      preview.document.close()
      previewRef.current = preview
    } else {
      toast.error("Unable to open preview. Check popup settings.")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.match(/\.(md|txt)$/i)) {
      toast.error("Please select a markdown or text file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setMarkdown(content)
      if (autoConvert) convertToHtml(content)
    }
    reader.onerror = () => toast.error("Failed to read file")
    reader.readAsText(file)
  }

  return (
    <ToolLayout
      title="Markdown to HTML Converter"
      description="Convert Markdown to clean, properly formatted HTML"
      toolId="678f382926f06f912191bc88"
    >
      <div className="flex flex-col gap-4">
        <Card className="bg-default-50">
          <CardBody className="p-4">
            <div className="flex items-center mb-4">
              <Switch isSelected={autoConvert} onValueChange={setAutoConvert} size="sm">
                Auto Convert
              </Switch>
            </div>

            <Tabs aria-label="Converter tabs">
              <Tab
                key="markdown"
                title={
                  <div className="flex items-center gap-2">
                    <Code size={16} />
                    Markdown
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <Textarea
                      value={markdown}
                      onValueChange={handleInputChange}
                      placeholder="Enter markdown here..."
                      minRows={10}
                      className="w-full font-mono text-sm"
                      variant="bordered"
                    />
                    {error && <p className="text-danger text-sm mt-2">{error}</p>}
                    <div className="flex justify-between items-center mt-4">
                      <Button color="primary" onPress={() => fileInputRef.current?.click()} startContent={<Upload size={18} />}>
                        Upload File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".md,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      {!autoConvert && (
                        <Button
                          onPress={() => convertToHtml(markdown)}
                          isDisabled={isConverting}
                          startContent={<RefreshCw size={18} />}
                          color="primary"
                        >
                          Convert
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="html"
                title={
                  <div className="flex items-center gap-2">
                    <Code size={16} />
                    HTML
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    <pre className="bg-default-200 rounded p-4 text-sm font-mono overflow-x-auto min-h-[240px] max-h-[480px]">
                      {isConverting ? "Converting..." : html || "No HTML generated yet"}
                    </pre>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Button
                color="primary"
                onPress={handleCopy}
                isDisabled={!html || isConverting}
                startContent={<Copy size={18} />}
            
              >
                Copy
              </Button>
              <Button
                color="primary"
                onPress={handleDownload}
                isDisabled={!html || isConverting}
                startContent={<Download size={18} />}

              >
                Download
              </Button>
              <Button
                color="danger"
                onPress={handleClear}
                isDisabled={isConverting}
                startContent={<RefreshCw size={18} />}
     
              >
                Clear
              </Button>
              <Button
                color="primary"
                onPress={handleShowPreview}
                isDisabled={!html || isConverting}
                startContent={<Eye size={18} />}

              >
                Preview
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About the Markdown to HTML Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                Our Markdown to HTML Converter is a powerful, user-friendly tool designed for writers, developers, and
                content creators who work with Markdown and need to convert it to HTML. It provides a simple, efficient
                way to transform your Markdown content into clean, properly formatted HTML that's ready for web
                publishing.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/MarkDownHTMLPreview.png"
                  alt="Screenshot of the Markdown to HTML Converter interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use Markdown to HTML Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter or paste your Markdown text into the input box, or upload a Markdown file.</li>
                <li>
                  The tool automatically converts your Markdown to HTML in real-time (if auto-convert is enabled).
                </li>
                <li>View the generated HTML in the output area.</li>
                <li>Use the "Preview HTML" button to see how your HTML will render in a browser.</li>
                <li>Copy the HTML to your clipboard or download it as a file.</li>
                <li>Use the "Clear" button to start over with a new conversion.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-default-600">
                <li>
                  <strong>Real-time Conversion:</strong> See HTML output instantly as you type
                </li>
                <li>
                  <strong>File Upload:</strong> Easily upload Markdown files for conversion
                </li>
                <li>
                  <strong>Live Preview:</strong> Visualize how your HTML will render in a browser
                </li>
                <li>
                  <strong>Syntax Highlighting:</strong> Easy-to-read HTML output
                </li>
                <li>
                  <strong>One-click Copying:</strong> Easily copy generated HTML to clipboard
                </li>
                <li>
                  <strong>HTML File Download:</strong> Save your converted HTML as a file
                </li>
                <li>
                  <strong>Quick Reset:</strong> Clear function for easy start-over
                </li>
                <li>
                  <strong>No Character Limit:</strong> Convert Markdown of any length
                </li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Practical Applications
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-default-600">
                <li>
                  <strong>Blogging:</strong> Convert Markdown drafts to HTML for your blog platform
                </li>
                <li>
                  <strong>Documentation:</strong> Transform Markdown docs into HTML for web-based documentation
                </li>
                <li>
                  <strong>Web Development:</strong> Quickly generate HTML content from Markdown
                </li>
                <li>
                  <strong>Content Management:</strong> Streamline content creation workflows
                </li>
                <li>
                  <strong>Email Marketing:</strong> Create HTML emails from Markdown templates
                </li>
                <li>
                  <strong>Academic Writing:</strong> Convert research papers or notes from Markdown to HTML
                </li>
                <li>
                  <strong>Technical Writing:</strong> Easily format complex technical documents
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-8">
                Ready to streamline your Markdown to HTML workflow? Start using our Markdown to HTML Converter now and
                experience the ease of converting your content. Whether you're a blogger, developer, researcher, or
                content creator, our tool is here to make your work more efficient. Try it out and see how it can
                enhance your content creation process!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

