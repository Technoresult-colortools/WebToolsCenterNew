
"use client";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Switch,
  Textarea,
  Slider,
  Tooltip,
  Chip
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import {
  Upload,
  Info,
  Zap,
  Eye,
  EyeOff,
  FileText,
  Clipboard,
  RotateCw,
  DownloadCloud,
  Settings,
  BookOpen,
  Lightbulb,
  Trash,
  Code
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import ToolLayout from "@/components/ToolLayout";
import Image from "next/image";

interface FormatterOptions {
  useTabs: boolean;
  singleQuotes: boolean; // Note: Primarily affects JS/CSS in HTML, not reliably HTML attributes
  indentSize: number;
  wrapLineLength: number;
  preserveNewlines: boolean; // User-facing state, Prettier's handling is via htmlWhitespaceSensitivity
  removeHtmlComments: boolean; // For standard <!-- --> comments
  removeCssJsComments: boolean; // For /* ... */ comments in <style> and <script> tags
  collapseWhitespace: boolean; // New option to collapse multiple whitespaces
  lowerCaseTags: boolean; // New option to make all HTML tags lowercase
  lowerCaseAttributes: boolean; // New option to make all attributes lowercase
}

const MAX_FILE_SIZE_MB = 5; // 5MB limit

// Helper function to remove standard HTML comments <!-- ... -->
const removeHtmlComments = (htmlString: string): string => {
  return htmlString.replace(/<!--.*?-->/gs, "");
};

// Helper function to remove CSS/JS style comments /* ... */
const removeCssJsStyleComments = (htmlString: string): string => {
  // Create a new DOMParser to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Process <style> tags - remove CSS comments
  const styleTags = doc.querySelectorAll('style');
  styleTags.forEach(styleTag => {
    if (styleTag.textContent) {
      styleTag.textContent = styleTag.textContent.replace(/\/\*[\s\S]*?\*\//g, '');
    }
  });
  
  // Process <script> tags - remove JS comments
  const scriptTags = doc.querySelectorAll('script');
  scriptTags.forEach(scriptTag => {
    if (scriptTag.textContent) {
      scriptTag.textContent = scriptTag.textContent.replace(/\/\*[\s\S]*?\*\//g, '');
    }
  });
  
  // Get the processed HTML as string
  return new XMLSerializer().serializeToString(doc);
};

// New helper function for direct string-based CSS/JS comment removal
// This is a fallback approach that doesn't rely on DOM manipulation
const removeCssJsCommentsRegex = (htmlString: string): string => {
  // Target style and script tags
  return htmlString.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)|(<script[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, styleOpen, styleContent, styleClose, scriptOpen, scriptContent, scriptClose) => {
      if (styleContent) {
        // Remove CSS comments from style content
        const cleanedStyle = styleContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return styleOpen + cleanedStyle + styleClose;
      } else if (scriptContent) {
        // Remove JS multi-line comments from script content
        const cleanedScript = scriptContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return scriptOpen + cleanedScript + scriptClose;
      }
      return match; // Return unchanged if no match
    }
  );
};

// Helper function to convert HTML tags to lowercase
const lowerCaseTags = (htmlString: string): string => {
  return htmlString.replace(/<\/?([A-Z][A-Z0-9]*)\b[^>]*>/g, match => match.toLowerCase());
};

// Helper function to convert HTML attributes to lowercase
const lowerCaseAttributes = (htmlString: string): string => {
  return htmlString.replace(/(<[^>]*\s)([A-Z][A-Z0-9]*)(=[^>]*>|\/?>|\s)/g, 
    (match, before, attr, after) => before + attr.toLowerCase() + after);
};

// Helper to collapse whitespace
const collapseWhitespace = (htmlString: string): string => {
  // Preserve whitespace in pre, code, textarea tags
  const preserveTags = ['pre', 'code', 'textarea'];
  const preservedBlocks: Record<string, string> = {};
  let counter = 0;
  
  // Replace preserved blocks with placeholders
  preserveTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
    htmlString = htmlString.replace(regex, match => {
      const placeholder = `___PRESERVED_BLOCK_${counter}___`;
      preservedBlocks[placeholder] = match;
      counter++;
      return placeholder;
    });
  });
  
  // Collapse whitespace in remaining HTML
  htmlString = htmlString
    .replace(/\s+/g, ' ')  // Collapse multiple spaces to single space
    .replace(/>\s+</g, '><')  // Remove spaces between tags
    .replace(/\s+>/g, '>')   // Remove spaces before closing angle bracket
    .replace(/<\s+/g, '<');  // Remove spaces after opening angle bracket
  
  // Restore preserved blocks
  Object.keys(preservedBlocks).forEach(placeholder => {
    htmlString = htmlString.replace(placeholder, preservedBlocks[placeholder]);
  });
  
  return htmlString;
};

// Memoize SyntaxHighlighter for performance
const MemoizedSyntaxHighlighter = React.memo(SyntaxHighlighter);

export default function HTMLFormatter() {
  const [inputHTML, setInputHTML] = useState("");
  const [outputHTML, setOutputHTML] = useState("");
  const [isFormatting, setIsFormatting] = useState(false);
  const [options, setOptions] = useState<FormatterOptions>({
    useTabs: false,
    singleQuotes: false,
    indentSize: 2,
    wrapLineLength: 80,
    preserveNewlines: true,
    removeHtmlComments: false,
    removeCssJsComments: false,
    collapseWhitespace: false,
    lowerCaseTags: false,
    lowerCaseAttributes: false
  });
  const [fileName, setFileName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [characterCount, setCharacterCount] = useState({ input: 0, output: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCharacterCount({
      input: inputHTML.length,
      output: outputHTML.length,
    });
  }, [inputHTML, outputHTML]);

  const formatHTML = useCallback(async () => {
    if (!inputHTML.trim()) {
      toast.error("Please enter some HTML to format.");
      return;
    }
    setIsFormatting(true);
    setOutputHTML(""); // Clear previous output

    try {
      const prettierOptions = {
        parser: "html",
        plugins: [prettierPluginHtml],
        useTabs: options.useTabs,
        singleQuote: options.singleQuotes,
        tabWidth: options.indentSize,
        printWidth: options.wrapLineLength,
        htmlWhitespaceSensitivity: "ignore" as "ignore",
      };

      let processedHtml = inputHTML;
      
      // Apply case transformations if needed (before formatting)
      if (options.lowerCaseTags) {
        processedHtml = lowerCaseTags(processedHtml);
      }
      
      if (options.lowerCaseAttributes) {
        processedHtml = lowerCaseAttributes(processedHtml);
      }

      // Format the HTML with prettier
      let formattedCode = await prettier.format(processedHtml, prettierOptions);
      
      // Apply post-formatting transformations
      
      // Remove HTML comments if option is enabled
      if (options.removeHtmlComments) {
        formattedCode = removeHtmlComments(formattedCode);
      }
      
      // Remove CSS/JS comments if option is enabled
      if (options.removeCssJsComments) {
        try {
          formattedCode = removeCssJsCommentsRegex(formattedCode);
        } catch (commentError) {
          console.error("Error removing CSS/JS comments:", commentError);
          // Continue processing even if comment removal fails
        }
      }
      
      // Collapse whitespace if option is enabled (after other formatting)
      if (options.collapseWhitespace) {
        formattedCode = collapseWhitespace(formattedCode);
      }

      setOutputHTML(formattedCode);
      toast.success("HTML formatted successfully!");
    } catch (error: any) {
      console.error("Formatting error:", error);
      const errorMessage = error?.message
        ? `Formatting Error: ${error.message}`
        : "Error formatting HTML. Please check your input for syntax errors.";
      toast.error(errorMessage, { duration: 5000 });
      setOutputHTML(
        `// --- Formatting Error --- \n// ${
          error?.message || "Unknown error"
        }\n// --- Original Input --- \n\n${inputHTML}`
      );
    } finally {
      setIsFormatting(false);
    }
  }, [inputHTML, options]); // Dependencies: inputHTML and the options object

  const copyToClipboard = useCallback(() => {
    if (!outputHTML.trim()) {
      toast.error("No formatted HTML to copy.");
      return;
    }
    navigator.clipboard.writeText(outputHTML);
    toast.success("Formatted HTML copied to clipboard!");
  }, [outputHTML]);

  const handleReset = useCallback(() => {
    setInputHTML("");
    setOutputHTML("");
    setFileName("");
    setOptions({
      useTabs: false,
      singleQuotes: false,
      indentSize: 2,
      wrapLineLength: 80,
      preserveNewlines: true,
      removeHtmlComments: false,
      removeCssJsComments: false,
      collapseWhitespace: false,
      lowerCaseTags: false,
      lowerCaseAttributes: false
    });
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Reset complete!");
  }, []);

  const handleDownload = useCallback(() => {
    if (!outputHTML.trim()) {
      toast.error("No formatted HTML to download.");
      return;
    }
    const blob = new Blob([outputHTML], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const downloadName = (fileName || "formatted.html").replace(
      /[^a-z0-9._-]/gi,
      "_"
    );
    a.download =
      downloadName.endsWith(".html") || downloadName.endsWith(".htm")
        ? downloadName
        : `${downloadName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started!");
  }, [outputHTML, fileName]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      if (
        !file.type.startsWith("text/html") &&
        !file.name.endsWith(".html") &&
        !file.name.endsWith(".htm")
      ) {
        toast.error(
          "Invalid file type. Please upload an HTML (.html, .htm) file."
        );
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear invalid file
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputHTML(content);
        setOutputHTML(""); // Clear output on new file upload
        setShowPreview(false); // Hide preview on new upload
        toast.success(`File "${file.name}" loaded successfully!`);
      };
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.");
        setFileName("");
      };
      reader.readAsText(file);
    }
  }, []);

  const handleOptionChange = (option: keyof FormatterOptions, value: any) => {
    let processedValue = value;
    if (option === "indentSize" || option === "wrapLineLength") {
      processedValue = Number(value);
      if (isNaN(processedValue)) {
        console.error(`Invalid number value for ${option}:`, value);
        return;
      }
    }
    setOptions((prev) => ({ ...prev, [option]: processedValue }));
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as HTMLElement).classList.add("border-primary");
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as HTMLElement).classList.remove("border-primary");
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as HTMLElement).classList.remove("border-primary");
      const file = e.dataTransfer.files?.[0];
      if (file && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        // Manually create and dispatch the change event for handleFileUpload
        const event = new Event("change", {
          bubbles: true,
        }) as unknown as React.ChangeEvent<HTMLInputElement>;
        Object.defineProperty(event, "target", {
          writable: false,
          value: { files: dataTransfer.files },
        });
        handleFileUpload(event);
      } else {
        toast.error("No file detected or file input reference missing.");
      }
    },
    [handleFileUpload]
  );

  const handlePasteExample = () => {
    const exampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Page</title>
    <style>
        /* CSS comment that can be removed */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        /* Another CSS comment */
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <!-- HTML comment that can be removed -->
    <div class="container">
        <h1>Example HTML</h1>
        <p>This is a sample HTML document with various elements and comments for testing the formatter.</p>
    </div>
    <script>
        // JavaScript single-line comment
        /* JavaScript 
           multi-line comment
           that can be removed */
        function exampleFunction() {
            console.log("Hello world!");
        }
    </script>
</body>
</html>`;
    setInputHTML(exampleHTML);
    toast.success("Example HTML pasted!");
  };

  return (
    <ToolLayout
      title="HTML Formatter"
      description="Clean up, standardize, and optimize your HTML code with advanced formatting options"
      toolId="678f382f26f06f912191bcbf"
    >
      {/* Main Card for Input/Output */}
      <Card className="mb-6 bg-default-50 dark:bg-default-100" shadow="sm">
        <CardHeader className="border-b-1 border-default-200 dark:border-default-200">
          <h2 className="text-lg font-semibold flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" /> Input & Output
          </h2>
        </CardHeader>
        <CardBody className="p-4 space-y-4">
          <div className="flex justify-end mb-2">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onPress={handlePasteExample}
              startContent={<Code className="w-4 h-4" />}
            >
              Paste Example
            </Button>
          </div>
          
          {/* Input Area */}
          <div>
            <Textarea
              label="HTML to Format"
              placeholder="Enter HTML to format or drag and drop an HTML file here..."
              value={inputHTML}
              onChange={(e) => setInputHTML(e.target.value)}
              minRows={8}
              maxRows={15}
              variant="bordered"
              // Apply drag handlers
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              classNames={{
                inputWrapper:
                  "border-dashed border-default-300 hover:border-primary focus-within:border-primary transition-colors",
              }}
            />
            <p className="text-xs text-default-500 mt-1 text-right">
              Input Characters: {characterCount.input}
            </p>
          </div>

          {/* Output Area */}
          <div>
            <label className="block text-sm font-medium text-default-700 mb-1">
              Formatted HTML
            </label>
            <div className="relative border border-default-200 rounded-md">
              <MemoizedSyntaxHighlighter
                language="html"
                style={atomDark}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.375rem", // md radius
                  maxHeight: "400px",
                  overflow: "auto",
                  fontSize: "0.875rem", // text-sm
                  padding: "1rem", // Add padding inside
                }}
                wrapLongLines={true}
                showLineNumbers={outputHTML.split("\n").length > 5}
              >
                {outputHTML || "// Formatted HTML will appear here..."}
              </MemoizedSyntaxHighlighter>
            </div>
            <p className="text-xs text-default-500 mt-1 text-right">
              Output Characters: {characterCount.output}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Options Card */}
      <Card className="mb-6 bg-default-50 dark:bg-default-100">
        <CardHeader className="border-b-1 border-default-200 dark:border-default-100">
          <h2 className="text-lg font-semibold flex items-center">
            <Settings className="w-5 h-5 mr-2 text-secondary" /> Formatting Options
          </h2>
        </CardHeader>
        <CardBody className="p-4">
          <div className="flex flex-col space-y-4">
            {/* Basic Options Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Tooltip content="Choose indentation type" className="text-default-700">
                  <Switch
                    isSelected={options.useTabs}
                    onValueChange={(checked) => handleOptionChange("useTabs", checked)}
                    size="sm"
                  >
                    Use Tabs (vs Spaces)
                  </Switch>
                </Tooltip>
                <Tooltip content="Primarily affects JS/CSS within HTML" className="text-default-700">
                  <Switch
                    isSelected={options.singleQuotes}
                    onValueChange={(checked) => handleOptionChange("singleQuotes", checked)}
                    size="sm"
                  >
                    Use Single Quotes{" "}
                    <Info size={12} className="inline align-text-bottom ml-1" />
                  </Switch>
                </Tooltip>
                <Tooltip content="Convert all HTML tags to lowercase" className="text-default-700">
                  <Switch
                    isSelected={options.lowerCaseTags}
                    onValueChange={(checked) => handleOptionChange("lowerCaseTags", checked)}
                    size="sm"
                  >
                    Lowercase Tags
                  </Switch>
                </Tooltip>
                <Tooltip content="Convert all HTML attributes to lowercase" className="text-default-700">
                  <Switch
                    isSelected={options.lowerCaseAttributes}
                    onValueChange={(checked) => handleOptionChange("lowerCaseAttributes", checked)}
                    size="sm"
                  >
                    Lowercase Attributes
                  </Switch>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-2">
                <Slider
                  label="Indent Size"
                  step={1}
                  maxValue={8}
                  minValue={1}
                  value={options.indentSize}
                  onChange={(value) => handleOptionChange("indentSize", value)}
                  size="sm"
                  showSteps
                  marks={[
                    { value: 2, label: "2" },
                    { value: 4, label: "4" },
                  ]}
                  className="max-w-full"
                />
                <Slider
                  label="Wrap Line Length"
                  step={10}
                  maxValue={160}
                  minValue={40}
                  value={options.wrapLineLength}
                  onChange={(value) => handleOptionChange("wrapLineLength", value)}
                  size="sm"
                  showSteps
                  marks={[
                    { value: 80, label: "80" },
                    { value: 120, label: "120" },
                  ]}
                  className="max-w-full"
                />
              </div>
            </div>

            {/* Comment Removal Section */}
            <div className="border-t border-default-200 dark:border-default-100 pt-4 mt-2">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Trash className="w-4 h-4 mr-2 text-danger" />
                Comment Removal Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Tooltip content="Remove HTML comments <!-- -->" className="text-default-700">
                  <Switch
                    isSelected={options.removeHtmlComments}
                    onValueChange={(checked) => handleOptionChange("removeHtmlComments", checked)}
                    color="danger"
                    size="sm"
                  >
                    Remove HTML Comments (&lt;!-- --&gt;)
                  </Switch>
                </Tooltip>
                <Tooltip content="Remove CSS/JS comments /* */ in style and script tags" className="text-default-700">
                  <Switch
                    isSelected={options.removeCssJsComments}
                    onValueChange={(checked) => handleOptionChange("removeCssJsComments", checked)}
                    color="danger"
                    size="sm"
                  >
                    Remove CSS/JS Comments (/* */)
                  </Switch>
                </Tooltip>
              </div>
            </div>

            {/* Advanced Options Section */}
            <div className="border-t border-default-200 dark:border-default-100 pt-4 mt-2">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-warning" />
                Advanced Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Tooltip content="Reduce file size by minimizing whitespace (preserves content in pre, code, textarea tags)" className="text-default-700">
                  <Switch
                    isSelected={options.collapseWhitespace}
                    onValueChange={(checked) => handleOptionChange("collapseWhitespace", checked)}
                    size="sm"
                  >
                    Collapse Whitespace
                  </Switch>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col justify-between sm:flex-row gap-2 mb-6">
        <Button
          color="primary"
          onPress={formatHTML}
          isLoading={isFormatting}
          startContent={!isFormatting ? <Zap className="w-5 h-5" /> : null}
          size="md"
        >
          {isFormatting ? "Formatting..." : "Format HTML"}
        </Button>
        <Button
          variant="bordered"
          onPress={copyToClipboard}
          isDisabled={!outputHTML}
          startContent={<Clipboard className="w-4 h-4" />}
          size="md"
        >
          Copy Output
        </Button>
        <Button
          size="md"
          variant="bordered"
          color="success"
          onPress={handleDownload}
          isDisabled={!outputHTML}
          startContent={<DownloadCloud className="w-4 h-4" />}
        >
          Download
        </Button>
        <Button
          size="md"
          variant="bordered"
          color="secondary"
          onPress={() => setShowPreview(!showPreview)}
          startContent={
            showPreview ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )
          }
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
        <Button
          size="md"
          variant="bordered"
          color="danger"
          onPress={handleReset}
          startContent={<RotateCw className="w-4 h-4" />}
        >
          Reset All
        </Button>
      </div>

      {/* Preview Section (Conditional) */}
      {showPreview && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100" shadow="sm">
          <CardHeader className="border-b-1 border-default-200 dark:border-default-100">
            <h2 className="text-lg font-semibold flex items-center">
              <Eye className="w-5 h-5 mr-2 text-secondary" /> Preview
            </h2>
          </CardHeader>
          <CardBody className="p-4">
            {outputHTML ? (
              <iframe
                srcDoc={outputHTML}
                title="HTML Preview"
                sandbox="allow-same-origin" // Basic sandbox
                className="w-full h-[400px] border border-default-200 dark:border-default-100 rounded-md bg-white"
                aria-label="Formatted HTML Preview"
              />
            ) : (
              <p className="text-default-500 text-center py-10">
                Format HTML to see the preview.
              </p>
            )}
          </CardBody>
        </Card>
      )}

      {/* File Upload Section */}
      <Card className="mb-6 bg-default-50 dark:bg-default-100" shadow="sm">
        <CardHeader className="border-b-1 border-default-200 dark:border-default-100">
          <h2 className="text-lg font-semibold flex items-center">
            <Upload className="w-5 h-5 mr-2 text-success" /> Upload File
          </h2>
        </CardHeader>
        <CardBody className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              color="primary"
              variant="flat"
              onPress={() => fileInputRef.current?.click()}
              startContent={<Upload className="w-4 h-4" />}
              className="sm:flex-grow-0" // Prevent button stretching too much on small screens
            >
              Choose HTML File
            </Button>
            <input
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden" // Hide the default input
              aria-label="Upload HTML file"
            />
            <span className="text-sm text-default-600 truncate flex-1 text-center sm:text-left">
              {fileName ? `Selected: ${fileName}` : "No file chosen"}
            </span>
          </div>
          <p className="text-xs text-default-500 mt-2 flex items-center">
            <Info className="w-3 h-3 mr-1 flex-shrink-0" />
            Max file size: {MAX_FILE_SIZE_MB}MB. Drag & drop also supported on the
            input area.
          </p>
        </CardBody>
      </Card>

      {/* Info Section */}
      <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            
            {/* About Section */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is HTML Formatter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The HTML Formatter is an effective tool for cleaning up, normalizing, and enhancing your HTML code. It utilizes **Prettier**, an excellent code formatting engine, to ensure that your HTML output is consistent and readable. Whether you're a web developer, designer, or author, this tool allows you to create clean, ordered, and optimized code seamlessly.
            </p>

            {/* Image Preview */}
            <div className="my-8">
                <Image
                src="/Images/InfosectionImages/HTMLFOrmatterPreview.png?height=400&width=600"
                alt="Screenshot of the HTML Formatter interface showing input, options, and output preview"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            {/* How to Use */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use HTML Formatter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Enter your HTML code in the input area or upload an HTML file (max 5MB).</li>
                <li>Adjust formatting options to your preferences.</li>
                <li>Click the "Format" button to process your HTML code.</li>
                <li>Review the formatted HTML in the syntax-highlighted output area.</li>
                <li>Click "Show Preview" to see how the formatted HTML renders in the browser.</li>
                <li>Use the "Copy" button to copy the formatted HTML to your clipboard.</li>
                <li>Click "Download" to save the formatted HTML as a file.</li>
                <li>Click "Reset" to clear all inputs and start over.</li>
            </ol>

            {/* Key Features */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>**Prettier-powered formatting** for consistent, industry-standard results.</li>
                <li>Customizable indentation (spaces or tabs) and indent size.</li>
                <li>Choose between **single or double quotes** for attributes.</li>
                <li>Adjustable line wrapping length for improved readability.</li>
                <li>Option to **preserve newlines** for maintaining document structure.</li>
                <li>Comment removal feature for cleaning up production code.</li>
                <li>**Syntax highlighting** for easy reading and error detection.</li>
                <li>Supports **drag-and-drop** file uploads (max 5MB).</li>
                <li>**Live preview** to see how formatted HTML renders in the browser.</li>
                <li>Character count for both input and output.</li>
                <li>One-click **copy** and **download** options.</li>
            </ul>

            {/* Advanced Usage */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Advanced Usage
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Integrate this formatter into your **development workflow** or CI/CD pipeline for consistent code style.</li>
                <li>Combine with **CSS and JavaScript minification** for optimized web assets.</li>
                <li>Experiment with different formatting options to find the best balance between readability and file size.</li>
                <li>Use with **HTML validation tools** to ensure both well-formatted and structurally correct HTML.</li>
                <li>Create **project-specific presets** for consistent formatting across different projects.</li>
                <li>Utilize the formatter as a **learning tool** for adopting HTML best practices and modern conventions.</li>
            </ul>
            </div>
        </Card>

    </ToolLayout>
  )
}