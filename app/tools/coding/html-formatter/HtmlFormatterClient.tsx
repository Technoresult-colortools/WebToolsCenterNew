"use client";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  Switch,
  Textarea,
  Slider,
  Tooltip,
  Chip,
  Divider,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import {
  Upload,
  Zap,
  Eye,
  EyeOff,
  Clipboard,
  RotateCw,
  DownloadCloud,
  Code,
  FileText,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import ToolLayout from "@/components/ToolLayout";
import InfoSectionHTMLFormatter from "./info-section";

interface FormatterOptions {
  useTabs: boolean;
  singleQuotes: boolean;
  indentSize: number;
  wrapLineLength: number;
  preserveNewlines: boolean;
  removeHtmlComments: boolean;
  removeCssJsComments: boolean;
  collapseWhitespace: boolean;
  lowerCaseTags: boolean;
  lowerCaseAttributes: boolean;
}

const MAX_FILE_SIZE_MB = 5;

const removeHtmlComments = (htmlString: string): string => {
  return htmlString.replace(/<!--.*?-->/gs, "");
};

const removeCssJsCommentsRegex = (htmlString: string): string => {
  return htmlString.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)|(<script[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, styleOpen, styleContent, styleClose, scriptOpen, scriptContent, scriptClose) => {
      if (styleContent) {
        const cleanedStyle = styleContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return styleOpen + cleanedStyle + styleClose;
      } else if (scriptContent) {
        const cleanedScript = scriptContent.replace(/\/\*[\s\S]*?\*\//g, '');
        return scriptOpen + cleanedScript + scriptClose;
      }
      return match;
    }
  );
};

const lowerCaseTags = (htmlString: string): string => {
  return htmlString.replace(/<\/?([A-Z][A-Z0-9]*)\b[^>]*>/g, match => match.toLowerCase());
};

const lowerCaseAttributes = (htmlString: string): string => {
  return htmlString.replace(/(<[^>]*\s)([A-Z][A-Z0-9]*)(=[^>]*>|\/?>|\s)/g,
    (match, before, attr, after) => before + attr.toLowerCase() + after);
};

const collapseWhitespace = (htmlString: string): string => {
  const preserveTags = ['pre', 'code', 'textarea'];
  const preservedBlocks: Record<string, string> = {};
  let counter = 0;

  preserveTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
    htmlString = htmlString.replace(regex, match => {
      const placeholder = `___PRESERVED_BLOCK_${counter}___`;
      preservedBlocks[placeholder] = match;
      counter++;
      return placeholder;
    });
  });

  htmlString = htmlString
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s+>/g, '>')
    .replace(/<\s+/g, '<');

  Object.keys(preservedBlocks).forEach(placeholder => {
    htmlString = htmlString.replace(placeholder, preservedBlocks[placeholder]);
  });

  return htmlString;
};

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
    setOutputHTML("");

    try {
      const prettierOptions = {
        parser: "html",
        plugins: [prettierPluginHtml],
        useTabs: options.useTabs,
        singleQuote: options.singleQuotes,
        tabWidth: options.indentSize,
        printWidth: options.wrapLineLength,
        htmlWhitespaceSensitivity: "ignore" as const,
      };

      let processedHtml = inputHTML;

      if (options.lowerCaseTags) {
        processedHtml = lowerCaseTags(processedHtml);
      }

      if (options.lowerCaseAttributes) {
        processedHtml = lowerCaseAttributes(processedHtml);
      }

      let formattedCode = await prettier.format(processedHtml, prettierOptions);

      if (options.removeHtmlComments) {
        formattedCode = removeHtmlComments(formattedCode);
      }

      if (options.removeCssJsComments) {
        try {
          formattedCode = removeCssJsCommentsRegex(formattedCode);
        } catch (commentError) {
          console.error("Error removing CSS/JS comments:", commentError);
        }
      }

      if (options.collapseWhitespace) {
        formattedCode = collapseWhitespace(formattedCode);
      }

      setOutputHTML(formattedCode);
      toast.success("HTML formatted successfully!");
     } catch (error) {
      console.error("Formatting error:", error);
      const errorMessage = error instanceof Error 
        ? `Formatting Error: ${error.message}` 
        : "Error formatting HTML. Please check your input for syntax errors.";
      
      toast.error(errorMessage, { duration: 5000 });
      
      const displayMessage = error instanceof Error ? error.message : "Unknown error";
      setOutputHTML(
        `// --- Formatting Error --- \n// ${displayMessage}\n// --- Original Input --- \n\n${inputHTML}`
      );
    } finally {
      setIsFormatting(false);
    }
  }, [inputHTML, options]);

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
    const downloadName = (fileName || "formatted.html").replace(/[^a-z0-9._-]/gi, "_");
    a.download = downloadName.endsWith(".html") || downloadName.endsWith(".htm")
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
      if (!file.type.startsWith("text/html") && !file.name.endsWith(".html") && !file.name.endsWith(".htm")) {
        toast.error("Invalid file type. Please upload an HTML (.html, .htm) file.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputHTML(content);
        setOutputHTML("");
        setShowPreview(false);
        toast.success(`File "${file.name}" loaded successfully!`);
      };
      reader.onerror = () => {
        toast.error("Error reading file. Please try again.");
        setFileName("");
      };
      reader.readAsText(file);
    }
  }, []);

   const handleOptionChange = <K extends keyof FormatterOptions>(
    option: K,
    value: FormatterOptions[K] | number | number[]
  ) => {
    let processedValue = value;

    // Handle Slider output which can be number | number[]
    if (Array.isArray(processedValue)) {
      processedValue = processedValue[0];
    }

    if (option === "indentSize" || option === "wrapLineLength") {
      processedValue = Number(processedValue);
      if (isNaN(processedValue)) return;
    }

    setOptions((prev) => ({ ...prev, [option]: processedValue }));
  };
  const handleDragOver = useCallback((e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).classList.add("border-primary");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).classList.remove("border-primary");
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      const event = new Event("change", { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>;
      Object.defineProperty(event, "target", {
        writable: false,
        value: { files: dataTransfer.files },
      });
      handleFileUpload(event);
    } else {
      toast.error("No file detected or file input reference missing.");
    }
  }, [handleFileUpload]);

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
        /* JavaScript multi-line comment that can be removed */
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
      <div className="flex flex-col gap-6">
        {/* 1. Compact Stats Bar */}
        <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-2 border-primary/20 shadow-lg">
          <CardBody className="p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-default-700">Input:</span>
                  <span className="text-sm font-bold text-primary">{characterCount.input.toLocaleString()}</span>
                  <span className="text-xs text-default-500 ml-1">chars</span>
                </div>

                {outputHTML && (
                  <>
                    <div className="text-default-400">→</div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/20 rounded-lg backdrop-blur-sm">
                      <Zap className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold text-default-700">Output:</span>
                      <span className="text-sm font-bold text-success">{characterCount.output.toLocaleString()}</span>
                      <span className="text-xs text-default-500 ml-1">chars</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {fileName && (
                  <Chip size="sm" variant="flat" color="secondary" className="hidden sm:flex" startContent={<Code className="w-3 h-3" />}>
                    {fileName}
                  </Chip>
                )}
                <Tooltip content="Reset All">
                  <Button isIconOnly size="sm" variant="flat" color="danger" onPress={handleReset}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 2. Input Section */}
        <Card className="shadow-lg border border-default-200 overflow-hidden">
          <div className="p-4 bg-default-100/50 border-b border-default-200 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold">Input HTML</h3>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="flat" color="secondary" onPress={handlePasteExample} startContent={<FileText className="w-3.5 h-3.5" />}>
                Example
              </Button>
              <Button size="sm" variant="flat" onPress={() => fileInputRef.current?.click()} startContent={<Upload className="w-3.5 h-3.5" />}>
                Upload
              </Button>
            </div>
          </div>
          <CardBody className="p-4">
            <Textarea
              placeholder="Paste your HTML here..."
              value={inputHTML}
              onChange={(e) => setInputHTML(e.target.value)}
              minRows={10}
              variant="bordered"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              classNames={{ input: "font-mono text-sm" }}
            />
          </CardBody>
        </Card>

        {/* 3. Reallocated Formatting Options (Responsive & Compact) */}
        <Card className="shadow-lg border border-default-200 overflow-hidden">
          <div className="p-3 bg-default-100/50 border-b border-default-200">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-warning" />
              <h3 className="text-sm font-bold tracking-tight">Formatting Options</h3>
            </div>
          </div>

          {/* Added responsive padding: p-4 for mobile, p-6 for desktop */}
          <CardBody className="p-4 sm:p-6 space-y-6 sm:space-y-8">

            {/* Option Grid 1: Basic Toggles */}
            {/* Adjusted gap for mobile (gap-4) vs desktop (gap-6) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

              {/* Group 1: General */}
              <div className="flex flex-col gap-3 sm:gap-4 p-3 bg-default-50 dark:bg-default-100/50 rounded-xl border border-default-200 shadow-lg">
                <Switch size="sm" isSelected={options.useTabs} onValueChange={(c) => handleOptionChange("useTabs", c)}>
                  <span className="text-xs font-bold">Use Tabs</span>
                </Switch>
                <Switch size="sm" isSelected={options.singleQuotes} onValueChange={(c) => handleOptionChange("singleQuotes", c)}>
                  <span className="text-xs font-bold">Single Quotes</span>
                </Switch>
              </div>

              {/* Group 2: Case Logic */}
              <div className="flex flex-col gap-3 sm:gap-4 p-3 bg-default-50 dark:bg-default-100/50 rounded-xl border border-default-200 shadow-lg">
                <Switch size="sm" isSelected={options.lowerCaseTags} onValueChange={(c) => handleOptionChange("lowerCaseTags", c)}>
                  <span className="text-xs font-bold">Lowercase Tags</span>
                </Switch>
                <Switch size="sm" isSelected={options.lowerCaseAttributes} onValueChange={(c) => handleOptionChange("lowerCaseAttributes", c)}>
                  <span className="text-xs font-bold">Lowercase Attributes</span>
                </Switch>
              </div>

              {/* Group 3: Cleanup */}
              <div className="flex flex-col gap-3 sm:gap-4 p-3 bg-default-50 dark:bg-default-100/50 rounded-xl border border-default-200 shadow-lg">
                <Switch size="sm" isSelected={options.collapseWhitespace} onValueChange={(c) => handleOptionChange("collapseWhitespace", c)}>
                  <span className="text-xs font-bold">Collapse Whitespace</span>
                </Switch>
                <Button
                  size="sm"
                  variant="flat"
                  color="danger"
                  className="h-7 px-2 text-[10px] font-bold"
                  onPress={handleReset}
                  startContent={<RotateCw className="w-3 h-3" />}
                >
                  Defaults
                </Button>
              </div>

              {/* Group 4: Stripping (Red Tint for caution) */}
              <div className="flex flex-col gap-3 sm:gap-4 p-3 bg-danger-50 dark:bg-danger-950/20 rounded-xl border border-danger-200/50 shadow-lg">
                <Switch size="sm" color="danger" isSelected={options.removeHtmlComments} onValueChange={(c) => handleOptionChange("removeHtmlComments", c)}>
                  <span className="text-xs font-bold text-danger">Strip HTML Comments</span>
                </Switch>
                <Switch size="sm" color="danger" isSelected={options.removeCssJsComments} onValueChange={(c) => handleOptionChange("removeCssJsComments", c)}>
                  <span className="text-xs font-bold text-danger">Strip CSS/JS Comments</span>
                </Switch>
              </div>
            </div>

            <Divider className="opacity-50" />

            {/* Option Grid 2: Sliders */}
            {/* Increased gap-y for mobile to prevent slider handle collision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 px-1">
              <Slider
                label="Indentation Size"
                size="sm"
                step={1}
                maxValue={8}
                minValue={1}
                value={options.indentSize}
                onChange={(v) => handleOptionChange("indentSize", v)}
                classNames={{ label: "text-xs font-bold uppercase text-default-500 tracking-tighter" }}
                marks={[{ value: 2, label: "2" }, { value: 4, label: "4" }, { value: 8, label: "8" }]}
              />
              <Slider
                label="Max Line Length"
                size="sm"
                step={10}
                maxValue={160}
                minValue={40}
                value={options.wrapLineLength}
                onChange={(v) => handleOptionChange("wrapLineLength", v)}
                classNames={{ label: "text-xs font-bold uppercase text-default-500 tracking-tighter" }}
                marks={[{ value: 80, label: "80" }, { value: 120, label: "120" }]}
              />
            </div>

            {/* Centered Format Action */}
            <div className="flex justify-center pt-2">
              <Button
                size="md"
                color="primary"
                variant="shadow"
                onPress={formatHTML}
                isLoading={isFormatting}
                startContent={!isFormatting && <Zap className="w-4 h-4" />}
                className="font-bold px-10 w-full sm:w-auto"
              >
                {isFormatting ? "Formatting..." : "Format HTML Code"}
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* 4. Output Section */}
        {outputHTML && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="shadow-lg border border-success/30 overflow-hidden">
              <div className="p-4 bg-success/5 border-b border-success/20 flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-success/10 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <h3 className="text-sm font-bold">Formatted Output</h3>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" color="success" variant="flat" onPress={copyToClipboard} startContent={<Clipboard className="w-3.5 h-3.5" />}>
                    Copy
                  </Button>
                  <Tooltip content="Download file">
                    <Button size="sm" color="success" variant="flat" isIconOnly onPress={handleDownload}>
                      <DownloadCloud className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Toggle Preview">
                    <Button size="sm" color="secondary" variant="flat" isIconOnly onPress={() => setShowPreview(!showPreview)}>
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="p-0 border-t border-default-200">
                <MemoizedSyntaxHighlighter
                  language="html"
                  style={atomDark}
                  customStyle={{ margin: 0, maxHeight: "600px", fontSize: "0.85rem", padding: "1.5rem" }}
                  wrapLongLines={true}
                  showLineNumbers={true}
                >
                  {outputHTML}
                </MemoizedSyntaxHighlighter>
              </div>
            </Card>

            {/* 5. Live Preview */}
            {showPreview && (
              <Card className="shadow-lg border border-secondary/30">
                <div className="p-4 bg-secondary/5 border-b border-secondary/20 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-secondary" />
                  <h3 className="text-sm font-bold text-secondary">Render Preview</h3>
                </div>
                <CardBody className="p-0 bg-white min-h-[400px]">
                  <iframe srcDoc={outputHTML} title="HTML Preview" sandbox="allow-same-origin" className="w-full h-[500px] border-none" />
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {/* Hidden File Input */}
        <input type="file" accept=".html,.htm" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />


      </div>
      <InfoSectionHTMLFormatter />
    </ToolLayout>
  );

}