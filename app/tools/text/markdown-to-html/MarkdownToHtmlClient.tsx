"use client"
import React, { useState, useRef, useEffect } from "react"
import { Card, CardBody, Button, Textarea, Tabs, Tab, Spinner, Input } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Copy, Download, RefreshCw, Code, Eye, Upload, Cpu, FileCode, FileText, Info, BookOpen, Zap, Settings, Lightbulb } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import DOMPurify from "dompurify"
import Image from "next/image"

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState<string>("")
  const [html, setHtml] = useState<string>("")
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("markdown")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<Window | null>(null)
  const previewIframeRef = useRef<HTMLIFrameElement>(null)

  // Configure DOMPurify to allow interactive elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      DOMPurify.addHook('afterSanitizeAttributes', function(node) {
        // Allow onclick and other events
        if (node.hasAttribute('onclick') || 
            node.hasAttribute('onmouseover') || 
            node.hasAttribute('onmouseout') || 
            node.hasAttribute('onload')) {
          node.setAttribute('data-allowed-script', 'true');
        }
      });
    }
  }, []);

  // Update iframe preview when html changes or tab changes to preview
  useEffect(() => {
    if (activeTab === "preview" && html && previewIframeRef.current) {
      updateIframePreview(html);
    }
  }, [html, activeTab]);

  const sanitizeAndFormatHtml = (rawHtml: string) => {
    // Configuration that preserves interactive elements
    const config = {
      ALLOWED_TAGS: [
        "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol", 
        "nl", "li", "b", "i", "strong", "em", "strike", "code", "hr", "br", "div", 
        "table", "thead", "caption", "tbody", "tr", "th", "td", "pre", "img", 
        "span", "sup", "sub", "del", "button", "svg", "path"
      ],
      ALLOWED_ATTR: [
        "href", "name", "target", "src", "alt", "title", "class", "id", "style", 
        "onclick", "aria-label", "data-lucide", "type", "rel"
      ],
      ADD_TAGS: ["button", "svg", "path", "i"],
      ADD_ATTR: ["onclick", "class", "data-lucide", "aria-label"],
      ALLOW_DATA_ATTR: true,
      ALLOW_UNKNOWN_PROTOCOLS: true
    };

    const sanitized = DOMPurify.sanitize(rawHtml, config);

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
  <script src="https://cdn.jsdelivr.net/npm/lucide@latest"></script>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      color: #333;
    }
    pre {
      background: #f6f8fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      background: #f6f8fa;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 0;
      padding-left: 1rem;
      color: #666;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #f6f8fa;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
    }
    a {
      color: #0969da;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    
    /* Button styles */
    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      font-size: 1rem;
      transition: background-color 0.2s;
      margin: 0.25rem;
    }
    .btn:hover {
      background-color: #0069d9;
    }
    .btn-secondary {
      background-color: #6c757d;
    }
    .btn-secondary:hover {
      background-color: #5a6268;
    }
    .btn-success {
      background-color: #28a745;
    }
    .btn-success:hover {
      background-color: #218838;
    }
    .btn-danger {
      background-color: #dc3545;
    }
    .btn-danger:hover {
      background-color: #c82333;
    }
    .rounded-full {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>
<body>
${sanitized}
<script>
  // Initialize any Lucide icons if present
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Make buttons interactive
  document.querySelectorAll('button').forEach(button => {
    if (!button.hasAttribute('onclick')) {
      button.onclick = function() {
        alert('Button clicked: ' + (this.textContent || 'Interactive button'));
      }
    }
  });
</script>
</body>
</html>`;
  }

  // Convert markdown to HTML using Mistral AI via OpenRouter API
  const convertWithAI = async (inputMarkdown: string) => {
    if (!inputMarkdown.trim()) {
      return "";
    }

    try {
      const response = await fetch("/api/convert-markdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          markdown: inputMarkdown
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error in AI conversion");
      }

      const data = await response.json();
      return data.html;
    } catch (error) {
      console.error("AI conversion error:", error);
      setError(`AI conversion error: ${error instanceof Error ? error.message : "Unknown error"}`);
      toast.error("Failed to convert with AI");
      return "";
    }
  };

  const convertToHtml = async (inputMarkdown: string) => {
    if (!inputMarkdown.trim()) {
      setHtml("");
      setError("");
      return;
    }

    setIsConverting(true);
    setError("");

    try {
      // Use Mistral AI for conversion via OpenRouter
      const parsedHtml = await convertWithAI(inputMarkdown);
      if (!parsedHtml) {
        setIsConverting(false);
        return;
      }
      
      // Enhance markdown button syntax to HTML buttons with interactivity
      let enhancedHtml = enhanceButtonsInHtml(parsedHtml);
      
      // Sanitize the HTML for security while preserving interactive elements
      const sanitizedHtml = DOMPurify.sanitize(enhancedHtml, {
        ADD_TAGS: ["button", "svg", "path", "i"],
        ADD_ATTR: ["onclick", "class", "style", "type"],
        ALLOW_DATA_ATTR: true,
      });
      
      setHtml(sanitizedHtml);
      
      // Update iframe if in preview mode
      if (activeTab === "preview" && previewIframeRef.current) {
        updateIframePreview(sanitizedHtml);
      }
      
      // Show success message
      toast.success("Markdown converted successfully");
    } catch (error) {
      console.error("Conversion error:", error);
      setError(`Conversion error: ${error instanceof Error ? error.message : "Unknown error"}`);
      toast.error("Failed to convert markdown");
    } finally {
      setIsConverting(false);
    }
  };

  // Function to enhance buttons in HTML
  const enhanceButtonsInHtml = (html: string) => {
    // Convert markdown-style button syntax to HTML buttons
    // Example: [Button Text](button:action) becomes <button class="btn" onclick="alert('action')">Button Text</button>
    
    const buttonRegex = /\[(.*?)\]\(button:(.*?)\)/g;
    
    return html.replace(buttonRegex, (match, text, action) => {
      return `<button class="btn" onclick="alert('${action}')">${text}</button>`;
    });
  };
  
  const updateIframePreview = (content: string) => {
    if (!previewIframeRef.current) return;
    
    const iframeDoc = previewIframeRef.current.contentDocument || 
                     (previewIframeRef.current.contentWindow?.document);
    
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(sanitizeAndFormatHtml(content));
      iframeDoc.close();
    }
  };

  const handleInputChange = (value: string) => {
    setMarkdown(value);
    setError("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      toast.success("HTML copied to clipboard");
    } catch {
      toast.error("Failed to copy HTML");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([sanitizeAndFormatHtml(html)], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("HTML file downloaded");
    } catch {
      toast.error("Failed to download HTML");
    }
  };

  const handleClear = () => {
    setMarkdown("");
    setHtml("");
    setError("");
    toast.success("Content cleared");
  };

  const handleShowPreview = () => {
    if (previewRef.current) {
      previewRef.current.close();
    }
    const preview = window.open("", "_blank");
    if (preview) {
      preview.document.write(sanitizeAndFormatHtml(html));
      preview.document.close();
      previewRef.current = preview;
    } else {
      toast.error("Unable to open preview. Check popup settings.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(md|markdown|txt)$/i)) {
      toast.error("Please select a markdown or text file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdown(content);
      toast.success(`File "${file.name}" loaded successfully`);
    };
    reader.onerror = () => toast.error("Failed to read file");
    reader.readAsText(file);
  };

  const handleManualConvert = () => {
    if (markdown.trim()) {
      convertToHtml(markdown);
    } else {
      toast.error("Please enter some markdown text");
    }
  };

  return (
    <ToolLayout
      title="Markdown to HTML Converter"
      description="Convert Markdown to HTML with interactive buttons using AI"
      toolId="678f382926f06f912191bc88"
    >
      <div className="space-y-8">
       <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Header with title and import button */}
            <div className="flex items-center mb-6 justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Cpu size={20} className="text-white" />
                </div>
                <div>
                <h2 className="text-sm sm:text-xl md:text-xl font-semibold">
                  AI-Powered Markdown Converter
                </h2>

                </div>
              </div>
              <Button 
                color="primary" 
                onPress={() => fileInputRef.current?.click()} 
                startContent={<Upload size={16} />}
                variant="flat"
                size="md"
              >
                Import File
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Main content with tabs */}
            <Tabs 
              aria-label="Converter tabs" 
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              classNames={{
                tabList: "gap-2 w-full relative rounded-lg p-1 overflow-x-auto bg-default-100",
                cursor: "bg-primary",
                tab: "max-w-fit px-4 h-10 data-[selected=true]:text-white",
                tabContent: "group-data-[selected=true]:text-white"
              }}
              variant="solid"
              color="primary"
            >
              <Tab
                key="markdown"
                title={
                  <div className="flex items-center gap-2">
                    <FileCode size={18} />
                    <span>Markdown</span>
                  </div>
                }
              >
                <div className="mt-4 relative ">
                  <Textarea
                    value={markdown}
                    onValueChange={handleInputChange}
                    placeholder="Type or paste your markdown here..."
                    minRows={12}
                    className="w-full font-mono text-sm bg-default-100 rounded-lg"
                    variant="bordered"
                    size="lg"
                  />
                  
                  {/* Processing overlay - only shows when converting */}
                  {isConverting && (
                    <div className="absolute inset-0 bg-default-100/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
                      <Spinner size="lg" color="primary" />
                      <p className="text-default-700 font-medium mt-4">Converting using AI...</p>
                    </div>
                  )}
                  
                  {error && <p className="text-danger text-sm mt-2">{error}</p>}
                  
                  <div className="flex justify-between mt-4">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleClear}
                      isDisabled={isConverting || !markdown.trim()}
                      startContent={<RefreshCw size={16} />}
                      size="md"
                    >
                      Clear
                    </Button>
                    
                    <Button
                      onPress={handleManualConvert}
                      isDisabled={isConverting || !markdown.trim()}
                      color="primary"
                      size="md"
                      className="min-w-[140px]"
                    >
                      {isConverting ? (
                        <>
                          <Spinner size="sm" color="white" className="mr-2" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={16} className="mr-2" />
                          Convert Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="html"
                title={
                  <div className="flex items-center gap-2">
                    <Code size={18} />
                    <span>HTML</span>
                  </div>
                }
              >
                <div className="mt-4">
                  <Card shadow="sm" className="bg-default-100">
                    <CardBody>
                      {isConverting ? (
                        <div className="flex flex-col items-center justify-center min-h-[240px]">
                          <Spinner size="lg" color="primary" />
                          <p className="text-default-700 mt-4">Converting with AI...</p>
                        </div>
                      ) : (
                        <pre className="bg-default-200 rounded-lg p-4 text-sm font-mono overflow-x-auto min-h-[240px] max-h-[480px]">
                          {html || "No HTML generated yet. Add some markdown and click 'Convert Now'."}
                        </pre>
                      )}
                    </CardBody>
                  </Card>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={handleCopy}
                      isDisabled={!html || isConverting}
                      startContent={<Copy size={16} />}
                      size="md"
                    >
                      Copy HTML
                    </Button>
                    <Button
                      color="primary"
                      onPress={handleDownload}
                      isDisabled={!html || isConverting}
                      startContent={<Download size={16} />}
                      size="md"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="preview"
                title={
                  <div className="flex items-center gap-2">
                    <Eye size={18} />
                    <span>Preview</span>
                  </div>
                }
              >
                <div className="mt-4">
                  <Card shadow="sm" className="bg-white overflow-hidden">
                    <CardBody className="p-0">
                      {isConverting ? (
                        <div className="flex flex-col items-center justify-center h-[400px]">
                          <Spinner size="lg" color="primary" />
                          <p className="text-default-700 mt-4">Converting using AI...</p>
                        </div>
                      ) : html ? (
                        <iframe 
                          ref={previewIframeRef}
                          className="w-full h-[400px] border-0"
                          title="HTML Preview"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[400px] text-default-500">
                          <FileText size={40} className="opacity-30 mb-4" />
                          <p>No content to preview yet.</p>
                          <p className="text-sm mt-2">Convert some markdown to see the preview.</p>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      color="secondary"
                      onPress={handleShowPreview}
                      isDisabled={!html || isConverting}
                      startContent={<Eye size={16} />}
                      size="md"
                    >
                      Open in New Window
                    </Button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the Markdown to HTML Converter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The Markdown to HTML Converter is an AI-driven tool that takes your Markdown text and converts it into clean, styled HTML. With AI capabilities, this Markdown converter does not simply translate the Markdown syntax, but instead dynamically interprets your Markdown content and produces semantically correct HTML, styled properly and even incorporates interactive elements.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
            No matter if you're a content creator, developers, technical writer, or educator, this tool allows you to turn your markdown documents into web-ready HTML in no time, all while keeping your formatting, links, images (and other assets), as well as interactive buttons, making this output safe and cleaned and/or sanitized output.
            </p>

            <div className="my-8">
              <Image
                 src="/Images/InfosectionImages/MarkdowntoHTMLPreview.png?height=400&width=600" 
                alt="Screenshot of the Markdown to HTML Converter showing the interface with markdown input and HTML output"
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
              How to Use the Markdown to HTML Converter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>
                <strong>Input your Markdown</strong> - Type or paste your Markdown text into the editor, or use the "Import
                File" button to upload a .md, .markdown, or .txt file.
              </li>
              <li>
                <strong>Convert to HTML</strong> - Click the "Convert Now" button to process your Markdown. The AI will
                analyze your content and generate appropriate HTML.
              </li>
              <li>
                <strong>View the HTML code</strong> - Switch to the "HTML" tab to see the generated HTML code that you can
                copy or download.
              </li>
              <li>
                <strong>Preview the result</strong> - Switch to the "Preview" tab to see how your HTML will look when
                rendered in a browser.
              </li>
              <li>
                <strong>Save your work</strong> - Use the "Copy HTML" button to copy the code to your clipboard or
                "Download" to save it as an HTML file.
              </li>
              <li>
                <strong>View in browser</strong> - Click "Open in New Window" in the Preview tab to see the full page in a
                new browser window.
              </li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>AI-Powered Conversion:</strong> Uses AI to intelligently convert Markdown to semantically
                correct HTML.
              </li>
              <li>
                <strong>Interactive Elements:</strong> Supports special syntax for creating interactive buttons in your HTML
                output.
              </li>
              <li>
                <strong>Real-time Preview:</strong> See exactly how your HTML will look when rendered in a browser.
              </li>
              <li>
                <strong>Secure Output:</strong> All HTML is sanitized using DOMPurify to prevent XSS attacks while
                preserving functionality.
              </li>
              <li>
                <strong>File Import/Export:</strong> Upload Markdown files and download the converted HTML with a single
                click.
              </li>
              <li>
                <strong>Syntax Highlighting:</strong> The HTML output includes styling for code blocks with proper syntax
                highlighting.
              </li>
              <li>
                <strong>Responsive Design:</strong> The generated HTML is styled to look great on all devices with a clean,
                modern appearance.
              </li>
              <li>
                <strong>Custom Styling:</strong> The HTML includes a comprehensive stylesheet that makes your content look
                professional.
              </li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Special Features Explained
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <strong>Interactive Buttons:</strong> Create clickable buttons using the syntax{" "}
                <code>[Button Text](button:action)</code> which will be converted to HTML buttons that show an alert with
                the specified action when clicked.
              </li>
              <li>
                <strong>Secure Sanitization:</strong> The converter uses DOMPurify to remove potentially harmful HTML while
                preserving legitimate interactive elements and styling.
              </li>
              <li>
                <strong>Comprehensive Styling:</strong> The HTML output includes CSS for typography, code blocks, tables,
                blockquotes, buttons, and more to ensure your content looks professional.
              </li>
              <li>
                <strong>Icon Support:</strong> The generated HTML includes support for Lucide icons if you reference them in
                your Markdown.
              </li>
              <li>
                <strong>Responsive Preview:</strong> The preview iframe allows you to see exactly how your content will
                appear when published online.
              </li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
              Ready to transform your Markdown content into beautiful, interactive HTML? Start using our AI-powered Markdown
              to HTML Converter now and experience the perfect blend of simplicity and power. Whether you're creating
              content for the web, documentation, or interactive tutorials, our tool makes the conversion process seamless
              and produces professional results every time.
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}