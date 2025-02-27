"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip, Modal, ModalContent } from "@nextui-org/react"
import { Card, CardBody, Button, Select, SelectItem, Input, Tabs, Tab, Slider, Checkbox } from "@nextui-org/react"
import {
  Copy,
  Download,
  XCircle,
  Maximize2,
  Sun,
  Moon,
  Hash,
  ImageIcon,
  Image,
  Shuffle,
  Droplet,
  Type,
  Settings,
  X,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import * as shiki from "shiki"
import CodePreview from "./CodePreview"

// Define themes (these are all supported by Shiki)
const codeThemes = [
  { value: "github-dark", label: "GitHub Dark" },
  { value: "github-light", label: "GitHub Light" },
  { value: "dracula", label: "Dracula" },
  { value: "one-dark-pro", label: "One Dark Pro" },
  { value: "material-theme", label: "Material Theme" },
  { value: "night-owl", label: "Night Owl" },
  { value: "monokai", label: "Monokai" },
  { value: "solarized-dark", label: "Solarized Dark" },
  { value: "solarized-light", label: "Solarized Light" },
  { value: "synthwave-84", label: "Synthwave '84" },
  { value: "nord", label: "Nord" },
  { value: "tokyo-night", label: "Tokyo Night" },
  { value: "slack-dark", label: "Slack Dark" },
  { value: "slack-ochin", label: "Slack Ochin" },
  { value: "vitesse-dark", label: "Vitesse Dark" },
  { value: "vitesse-light", label: "Vitesse Light" },
]

// Define languages (these are all supported by Shiki)
const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "bash", label: "Bash" },
  { value: "sql", label: "SQL" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "markdown", label: "Markdown" },
  { value: "yaml", label: "YAML" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "graphql", label: "GraphQL" },
  { value: "vue", label: "Vue" },
]

// Define coding fonts
const codingFonts = [
  { value: "source-code-pro", label: "Source Code Pro" },
  { value: "fira-code", label: "Fira Code" },
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "cascadia-code", label: "Cascadia Code" },
  { value: "roboto-mono", label: "Roboto Mono" },
  { value: "ubuntu-mono", label: "Ubuntu Mono" },
  { value: "ibm-plex-mono", label: "IBM Plex Mono" },
  { value: "inconsolata", label: "Inconsolata" },
  { value: "anonymous-pro", label: "Anonymous Pro" },
  { value: "hack", label: "Hack" },
  { value: "monoid", label: "Monoid" },
  { value: "consolas", label: "Consolas" },
  { value: "menlo", label: "Menlo" },
]

// Define font sizes
const fontSizes = [
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
]

// Define tab sizes
const tabSizes = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "8", label: "8 spaces" },
]

// Define shadow options
const shadowOptions = [
  { value: "none", label: "None" },
  { value: "soft", label: "Soft" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "sharp", label: "Sharp" },
]

// Define image quality options
const imageQualityOptions = [
  { value: "standard", label: "Standard" },
  { value: "high", label: "High" },
  { value: "ultra", label: "Ultra" },
]

// Define background options
const backgroundOptions = {
  premade: [
    { value: "leaves", label: "Leaves" },
    { value: "geometric", label: "Geometric" },
    { value: "none", label: "None" },
  ],
  gradients: [
    { value: "gradient-blue", label: "Blue Gradient", colors: ["#1a91ff", "#0e4e8a"] },
    { value: "gradient-purple", label: "Purple Gradient", colors: ["#8a2be2", "#4b0082"] },
    { value: "gradient-sunset", label: "Sunset", colors: ["#ff7e5f", "#feb47b"] },
    { value: "gradient-mint", label: "Mint", colors: ["#00b09b", "#96c93d"] },
    { value: "gradient-ocean", label: "Ocean", colors: ["#2193b0", "#6dd5ed"] },
    { value: "gradient-blood-orange", label: "Blood Orange", colors: ["#ff416c", "#ff4b2b"] },
    { value: "gradient-dark-blue", label: "Dark Blue", colors: ["#141e30", "#243b55"] },
    { value: "gradient-cosmic", label: "Cosmic", colors: ["#ff00cc", "#333399"] },
  ],
}

// Export formats
const exportFormats = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
]

// Define max line count
const MAX_LINES = 100

// Define the extension map with proper type
const extensionMap: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  html: "html",
  css: "css",
  python: "py",
  java: "java",
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  php: "php",
  ruby: "rb",
  go: "go",
  rust: "rs",
  swift: "swift",
  kotlin: "kt",
  bash: "sh",
  sql: "sql",
  json: "json",
  xml: "xml",
  markdown: "md",
  yaml: "yml",
  jsx: "jsx",
  tsx: "tsx",
  graphql: "graphql",
  vue: "vue",
}

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

// Add type checking for the environment variable
if (!UNSPLASH_ACCESS_KEY) {
  throw new Error("Missing NEXT_PUBLIC_UNSPLASH_ACCESS_KEY environment variable")
}


export default function CodeToImageConverter() {
  // State
  const [code, setCode] = useState("// Write your code here...")
  const [selectedTheme, setSelectedTheme] = useState("github-dark")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  // Set cosmic as the default background
  const [backgroundType, setBackgroundType] = useState("gradient")
  const [selectedBackground, setSelectedBackground] = useState("gradient-cosmic")
  const [customBackgroundColor, setCustomBackgroundColor] = useState("#333333")
  const [customBackgroundImage, setCustomBackgroundImage] = useState("")
  const [selectedPadding, setSelectedPadding] = useState("32")
  const [fileName, setFileName] = useState("example.js")
  const [, setCustomFileName] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [windowControls, setWindowControls] = useState(true)
  const [lineCount, setLineCount] = useState(1)
  const [highlighter, setHighlighter] = useState<shiki.Highlighter | null>(null)
  const [isHighlighterLoading, setIsHighlighterLoading] = useState(true)
  const [selectedExportFormat, setSelectedExportFormat] = useState("png")
  const [, setUploadedImage] = useState<string | null>(null)
  const [, setCssBackground] = useState("")

  // New state for added features
  const [selectedFont, setSelectedFont] = useState("source-code-pro")
  const [selectedFontSize, setSelectedFontSize] = useState("16px")
  const [selectedTabSize, setSelectedTabSize] = useState("4")
  const [selectedShadow, setSelectedShadow] = useState("hard")
  const [selectedImageQuality, setSelectedImageQuality] = useState("standard")
  const [supportWatermark, setSupportWatermark] = useState(false)
  const [watermarkText, setWatermarkText] = useState("")

  const previewRef = useRef<HTMLDivElement>(null)
  const fullscreenPreviewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize Shiki highlighter
  useEffect(() => {
    const initializeHighlighter = async () => {
      try {
        setIsHighlighterLoading(true)
        const highlighter = await shiki.createHighlighter({
          themes: codeThemes.map((theme) => theme.value),
          langs: languages.map((lang) => lang.value),
        })
        setHighlighter(highlighter)
        setIsHighlighterLoading(false)
      } catch (error) {
        console.error("Failed to initialize Shiki:", error)
        toast.error("Failed to load syntax highlighter")
        setIsHighlighterLoading(false)
      }
    }

    initializeHighlighter()
  }, [])

  // Update filename extension when language changes


  // Completely revised file name handling
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.trim() === "") {
      // If input is empty, reset to default with current language extension
      setCustomFileName("")
      const extension = extensionMap[selectedLanguage] || "txt"
      setFileName(`example.${extension}`)
    } else {
      // Store the custom filename (without extension)
      const baseName = value.split(".")[0]
      setCustomFileName(baseName)

      // Update the full filename with proper extension
      const extension = extensionMap[selectedLanguage] || "txt"
      setFileName(`${baseName}.${extension}`)
    }
  }

  // Handle code change
  const handleCodeChange = useCallback((newCode: string) => {
    const lines = newCode.split("\n").length

    if (lines > MAX_LINES) {
      toast.error(`Maximum line limit of ${MAX_LINES} reached!`)
      return
    }

    setCode(newCode)
    setLineCount(lines)
  }, [])

  // Toggle fullscreen
  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen)
  }, [isFullScreen])

  // Handle background type change
  const handleBackgroundTypeChange = useCallback((type: string) => {
    setBackgroundType(type)

    // Set default values for each type
    if (type === "premade") {
      setSelectedBackground("leaves")
    } else if (type === "gradient") {
      setSelectedBackground("gradient-cosmic") // Set cosmic as default gradient
    } else if (type === "solid") {
      setSelectedBackground("solid")
    } else if (type === "custom") {
      setSelectedBackground("custom")
    } else if (type === "random") {
      handleRandomImage()
    }
  }, [])

  // Handle random image
  const handleRandomImage = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?orientation=landscape&query=code,programming`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch image")
      }

      const data = await response.json()
      setCustomBackgroundImage(data.urls.regular)
      setSelectedBackground("custom")
      setBackgroundType("custom")
    } catch (error) {
      console.error("Error fetching Unsplash image:", error)
      toast.error("Failed to load random image")
    }
  }, [])

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string)
          setCustomBackgroundImage(event.target.result as string)
          setSelectedBackground("custom")
          setBackgroundType("custom")
        }
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Get final background style
  const getFinalBackground = useCallback(() => {
    if (backgroundType === "premade") {
      return selectedBackground
    } else if (backgroundType === "gradient") {
      return selectedBackground
    } else if (backgroundType === "solid") {
      return "solid"
    } else if (backgroundType === "custom" && customBackgroundImage) {
      return "custom-image"
    } else {
      return "none"
    }
  }, [backgroundType, selectedBackground, customBackgroundImage])

  // Get background CSS for the fullscreen modal
  useEffect(() => {
    const getBackgroundCSS = () => {
      const background = getFinalBackground()

      if (background.startsWith("gradient-")) {
        const gradient = backgroundOptions.gradients.find((g) => g.value === background)
        if (gradient) {
          return `linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})`
        }
      } else if (background === "solid") {
        return customBackgroundColor
      } else if (background === "custom-image" && customBackgroundImage) {
        return `url(${customBackgroundImage})`
      }

      return isDarkMode ? "#1a1a1a" : "#f5f5f5"
    }

    setCssBackground(getBackgroundCSS())
  }, [getFinalBackground, customBackgroundColor, customBackgroundImage, isDarkMode, selectedBackground])
  const handleDownload = useCallback(async () => {
    const targetRef = isFullScreen ? fullscreenPreviewRef : previewRef;
  
    if (!targetRef.current) {
      toast.error("Preview not available");
      return;
    }
  
    try {
      const loadingToast = toast.loading("Generating image...");
  
      const html2canvas = (await import("html2canvas")).default;
  
      const codePreviewElement = targetRef.current.querySelector(
        ".code-preview-container"
      );
  
      if (!codePreviewElement) {
        toast.dismiss(loadingToast);
        toast.error("Could not find code preview element");
        return;
      }
  
      const styles = window.getComputedStyle(codePreviewElement);
      const width = codePreviewElement.scrollWidth;
      const height = codePreviewElement.scrollHeight;
  
      const clone = codePreviewElement.cloneNode(true) as HTMLElement;
  
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.top = "-9999px";
      wrapper.style.left = "-9999px";
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.overflow = "visible";
      wrapper.style.pointerEvents = "none";
  
      Array.from(styles).forEach((property) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (clone.style as any)[property] = styles.getPropertyValue(property);
      });
  
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.maxWidth = "none";
      clone.style.maxHeight = "none";
      clone.style.overflow = "visible";
  
      const codeContentWrapper = clone.querySelector(".code-content-wrapper");
      if (codeContentWrapper) {
        (codeContentWrapper as HTMLElement).style.width = `${width}px`;
        (codeContentWrapper as HTMLElement).style.height = `${height}px`;
        (codeContentWrapper as HTMLElement).style.overflow = "visible";
      }
  
      const highlightedCodeDiv = clone.querySelector(
        "[dangerouslySetInnerHTML]"
      );
      const textarea = clone.querySelector("textarea");
  
      if (highlightedCodeDiv) {
        (highlightedCodeDiv as HTMLElement).style.width = `${width}px`;
        (highlightedCodeDiv as HTMLElement).style.height = "auto";
        (highlightedCodeDiv as HTMLElement).style.minWidth = "0";
        (highlightedCodeDiv as HTMLElement).style.minHeight = "0";
        (highlightedCodeDiv as HTMLElement).style.overflow = "visible";
      }
  
      if (textarea) {
        (textarea as HTMLElement).style.width = `${width}px`;
        (textarea as HTMLElement).style.height = "auto";
        (textarea as HTMLElement).style.minWidth = "0";
        (textarea as HTMLElement).style.minHeight = "0";
        (textarea as HTMLElement).style.overflow = "visible";
      }
  
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);
  
      try {
        // Apply scaling manually
        const scaleFactor =
          selectedImageQuality === "ultra"
            ? 3
            : selectedImageQuality === "high"
            ? 2
            : 1;
  
        const canvas = await html2canvas(clone, {
          logging: false,
          useCORS: true,
          allowTaint: true,
          background: undefined, // ✅ Fixed property name
          width: width * scaleFactor,
          height: height * scaleFactor,
   
          
          
        });
  
        let mimeType = "image/png";
        let quality = 1;
  
        if (selectedExportFormat === "jpeg") {
          mimeType = "image/jpeg";
          quality = 0.9;
        } else if (selectedExportFormat === "webp") {
          mimeType = "image/webp";
          quality = 0.9;
        }
  
        const image = canvas.toDataURL(mimeType, quality);
  
        const link = document.createElement("a");
        link.href = image;
        link.download = `${fileName.split(".")[0]}-code.${selectedExportFormat}`;
        link.click();
  
        toast.dismiss(loadingToast);
        toast.success(`Image downloaded as ${selectedExportFormat.toUpperCase()}!`);
      } finally {
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Failed to download image. Please try again.");
    }
  }, [fileName, selectedExportFormat, selectedImageQuality, isFullScreen]);
  

  
  const handleCopy = useCallback(async () => {
    const targetRef = isFullScreen ? fullscreenPreviewRef : previewRef;
  
    if (!targetRef.current) {
      toast.error("Preview not available");
      return;
    }
  
    try {
      const loadingToast = toast.loading("Copying to clipboard...");
  
      const html2canvas = (await import("html2canvas")).default;
  
      const codePreviewElement = targetRef.current.querySelector(
        ".code-preview-container"
      );
  
      if (!codePreviewElement) {
        toast.dismiss(loadingToast);
        toast.error("Could not find code preview element");
        return;
      }
  
      const styles = window.getComputedStyle(codePreviewElement);
      const width = codePreviewElement.scrollWidth;
      const height = codePreviewElement.scrollHeight;
  
      const clone = codePreviewElement.cloneNode(true) as HTMLElement;
  
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.top = "-9999px";
      wrapper.style.left = "-9999px";
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.overflow = "visible";
      wrapper.style.pointerEvents = "none";
  
      Array.from(styles).forEach((property) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (clone.style as any)[property] = styles.getPropertyValue(property);
      });
  
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.style.maxWidth = "none";
      clone.style.maxHeight = "none";
      clone.style.overflow = "visible";
  
      const codeContentWrapper = clone.querySelector(".code-content-wrapper");
      if (codeContentWrapper) {
        (codeContentWrapper as HTMLElement).style.width = `${width}px`;
        (codeContentWrapper as HTMLElement).style.height = `${height}px`;
        (codeContentWrapper as HTMLElement).style.overflow = "visible";
      }
  
      const highlightedCodeDiv = clone.querySelector(
        "[dangerouslySetInnerHTML]"
      );
      const textarea = clone.querySelector("textarea");
  
      if (highlightedCodeDiv) {
        (highlightedCodeDiv as HTMLElement).style.width = `${width}px`;
        (highlightedCodeDiv as HTMLElement).style.height = "auto";
        (highlightedCodeDiv as HTMLElement).style.minWidth = "0";
        (highlightedCodeDiv as HTMLElement).style.minHeight = "0";
        (highlightedCodeDiv as HTMLElement).style.overflow = "visible";
      }
  
      if (textarea) {
        (textarea as HTMLElement).style.width = `${width}px`;
        (textarea as HTMLElement).style.height = "auto";
        (textarea as HTMLElement).style.minWidth = "0";
        (textarea as HTMLElement).style.minHeight = "0";
        (textarea as HTMLElement).style.overflow = "visible";
      }
  
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);
  
      try {
        // Correct way to apply scaling (html2canvas does not support `scale` directly)
        const scaleFactor =
          selectedImageQuality === "ultra"
            ? 3
            : selectedImageQuality === "high"
            ? 2
            : 1;
  
        const canvas = await html2canvas(clone, {
          logging: false,
          useCORS: true,
          allowTaint: true,
          background: undefined,
          width: width * scaleFactor, // Apply scaling manually
          height: height * scaleFactor,
   

        });
  
        canvas.toBlob(async (blob) => {
          if (!blob) {
            toast.dismiss(loadingToast);
            toast.error("Failed to create image blob");
            return;
          }
  
          try {
            const item = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([item]);
            toast.dismiss(loadingToast);
            toast.success("Image copied to clipboard!");
          } catch (error) {
            console.error("Clipboard error:", error);
            toast.dismiss(loadingToast);
            toast.error("Failed to copy to clipboard");
          }
        }, "image/png");
      } finally {
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    } catch (error) {
      console.error("Failed to copy image:", error);
      toast.error("Failed to copy image");
    }
  }, [selectedImageQuality, isFullScreen]);
  
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Render fullscreen modal using the provided format
  const renderFullscreenModal = () => (
    <Modal
      isOpen={isFullScreen}
      onOpenChange={setIsFullScreen}
      size="full"
      classNames={{
        base: "bg-black/50 backdrop-blur-md",
        wrapper: "max-w-full h-full",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              ref={fullscreenPreviewRef}
              className="w-[90%] h-[90%] bg-white/10 backdrop-blur-sm rounded-lg overflow-auto shadow-xl relative"
            >
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Action buttons for fullscreen mode */}
              <div className="absolute top-4 left-4 z-50 flex gap-2">
                <Button color="primary" variant="flat" onPress={handleCopy} startContent={<Copy className="h-5 w-5" />}>
                  Copy
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleDownload}
                  startContent={<Download className="h-5 w-5" />}
                >
                  Download
                </Button>
              </div>

              {/* Code Preview in fullscreen */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <CodePreview
                  code={code}
                  fileName={fileName}
                  selectedTheme={selectedTheme}
                  selectedLanguage={selectedLanguage}
                  selectedBackground={getFinalBackground()}
                  selectedPadding={selectedPadding}
                  isDarkMode={isDarkMode}
                  showLineNumbers={showLineNumbers}
                  windowControls={windowControls}
                  onCodeChange={handleCodeChange}
                  highlighter={highlighter}
                  isHighlighterLoading={isHighlighterLoading}
                  customBackgroundColor={customBackgroundColor}
                  customBackgroundImage={customBackgroundImage}
                  selectedFont={selectedFont}
                  selectedFontSize={selectedFontSize}
                  selectedTabSize={selectedTabSize}
                  selectedShadow={selectedShadow}
                  supportWatermark={supportWatermark}
                  watermarkText={watermarkText}
                />
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  )

  return (
    <ToolLayout
      title="Code to Image Converter"
      description="Convert your code snippets into beautiful, shareable images with customizable themes, backgrounds, and styling"
      toolId="code-to-image-converter"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Controls section - responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      
      {/* Code Theme Selector */}
      <Select
          label="Code Theme"
          selectedKeys={new Set([selectedTheme])}
          onSelectionChange={(keys) => setSelectedTheme(Array.from(keys)[0] as string)}
          variant="bordered"
      >
          {codeThemes.map((theme) => (
          <SelectItem key={theme.value} value={theme.value} className="text-default-700">
              {theme.label}
          </SelectItem>
          ))}
      </Select>

      {/* Language Selector */}
      <Select
          label="Language"
          selectedKeys={new Set([selectedLanguage])}
          onSelectionChange={(keys) => setSelectedLanguage(Array.from(keys)[0] as string)}
          variant="bordered"
      >
          {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className="text-default-700">
              {lang.label}
          </SelectItem>
          ))}
      </Select>

      {/* File Name Input */}
      <Input
                    type="text"
                    placeholder="File Name"
                    value={fileName}
                    onChange={handleFileNameChange}
                    className="border border-default-400 rounded-lg px-3 py-2 w-full"
                />

      {/* Settings & Toggles */}
      <div className="flex gap-2 justify-center md:justify-start">

          {/* Dark Mode Toggle */}
          <Tooltip content={isDarkMode ? "Light Mode" : "Dark Mode"}>
          <Button
              isIconOnly
              color={isDarkMode ? "default" : "primary"}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className=" mt-2 transition-transform transform hover:scale-110"
          >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          </Tooltip>

          {/* Line Numbers Toggle */}
          <Tooltip content="Toggle Line Numbers">
          <Button
              isIconOnly
              color={showLineNumbers ? "primary" : "default"}
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className="mt-2 transition-transform transform hover:scale-110"
          >
              <Hash size={20} />
          </Button>
          </Tooltip>

          {/* Window Controls Toggle */}
          <Tooltip content="Toggle Window Controls">
          <Button
              isIconOnly
              color={windowControls ? "primary" : "default"}
              onPress={() => setWindowControls(!windowControls)}
            
              className="mt-2 transition-transform transform hover:scale-110"
            >
              <XCircle size={20} />
          </Button>
          </Tooltip>

              {/* Settings Button */}
              <div className="flex items-center justify-center">
                <Dropdown>
                    <DropdownTrigger>
                    <Button
                            isIconOnly
                            color="primary"
                            variant="bordered"
                            className="transition-transform transform hover:scale-110"
                        >
                            <Settings size={20} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Settings Options">
                    <DropdownItem key="options" isReadOnly>
                        <div className="space-y-4 w-64 md:w-80 p-2">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {/* Font selector */}
                            <Select
                            label="Font Family"
                            selectedKeys={new Set([selectedFont])}
                            onSelectionChange={(keys) => setSelectedFont(Array.from(keys)[0] as string)}
                            variant="bordered"
                            startContent={<Type className="h-4 w-4" />}
                            >
                            {codingFonts.map((font) => (
                                <SelectItem key={font.value} value={font.value} className="text-default-700">
                                {font.label}
                                </SelectItem>
                            ))}
                            </Select>

                            {/* Font size selector */}
                            <Select
                            label="Font Size"
                            selectedKeys={new Set([selectedFontSize])}
                            onSelectionChange={(keys) => setSelectedFontSize(Array.from(keys)[0] as string)}
                            variant="bordered"
                            >
                            {fontSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value} className="text-default-700">
                                {size.label}
                                </SelectItem>
                            ))}
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Tab size selector */}
                            <Select
                            label="Tab Size"
                            selectedKeys={new Set([selectedTabSize])}
                            onSelectionChange={(keys) => setSelectedTabSize(Array.from(keys)[0] as string)}
                            variant="bordered"
                            >
                            {tabSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value} className="text-default-700">
                                {size.label}
                                </SelectItem>
                            ))}
                            </Select>

                            {/* Shadow selector */}
                            <Select
                            label="Shadow"
                            selectedKeys={new Set([selectedShadow])}
                            onSelectionChange={(keys) => setSelectedShadow(Array.from(keys)[0] as string)}
                            variant="bordered"
                            >
                            {shadowOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="text-default-700">
                                {option.label}
                                </SelectItem>
                            ))}
                            </Select>
                        </div>

                        {/* Padding slider */}
                        <div className="px-1">
                            <div className="flex justify-between mb-1">
                            <label className="text-sm text-default-500">Padding: {selectedPadding}px</label>
                            </div>
                            <Slider
                            size="sm"
                            step={8}
                            color="primary"
                            minValue={8}
                            maxValue={96}
                            defaultValue={Number.parseInt(selectedPadding)}
                            value={Number.parseInt(selectedPadding)}
                            onChange={(value) => setSelectedPadding(value.toString())}
                            className="max-w-full"
                            />
                        </div>
                        </div>
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
            </div>
            </div>

            {/* Preview section */}
                            {/* Preview section */}
                <style>
                {`
                    /* Custom scrollbar styling */
                    .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: var(--scrollbar-thumb, rgba(150, 150, 150, 0.5));
                    border-radius: 5px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: var(--scrollbar-thumb-hover, rgba(150, 150, 150, 0.7));
                    }
                    
                    /* Ensure code doesn't shrink */
                    .code-content {
                    white-space: pre;
                    min-width: max-content;
                    width: 100%;
                    }
                    
                    /* Fix for expanding code editor */
                    .code-editor {
                    white-space: pre !important;
                    overflow: visible !important;
                    }
                    
                    /* Container for the code preview */
                    .code-preview-container {
                    display: inline-block;
                    min-width: 100%;
                    }
                    
                    /* Wrapper to ensure proper background extension */
                    .code-content-wrapper {
                    display: inline-block;
                    min-width: 100%;
                    }
                `}
                </style>

                {/* Preview section without scrollbars on the main container */}
                <div
                  ref={previewRef}
                  className="relative rounded-lg border-2 border-gray-400"
                  style={{
                      width: "100%",
                      minHeight: "300px", 
                      maxHeight: "600px",
                  }}
                >
                {/* Scrollable container */}
                <div className="custom-scrollbar" style={{ overflow: "auto", maxHeight: "500px", width: "100%" }}>
                    {/* The CodePreview component will expand as needed */}
                    <div className="code-content">
                    <CodePreview
                        code={code}
                        fileName={fileName}
                        selectedTheme={selectedTheme}
                        selectedLanguage={selectedLanguage}
                        selectedBackground={getFinalBackground()}
                        selectedPadding={selectedPadding}
                        isDarkMode={isDarkMode}
                        showLineNumbers={showLineNumbers}
                        windowControls={windowControls}
                        onCodeChange={handleCodeChange}
                        highlighter={highlighter}
                        isHighlighterLoading={isHighlighterLoading}
                        customBackgroundColor={customBackgroundColor}
                        customBackgroundImage={customBackgroundImage}
                        selectedFont={selectedFont}
                        selectedFontSize={selectedFontSize}
                        selectedTabSize={selectedTabSize}
                        selectedShadow={selectedShadow}
                        supportWatermark={supportWatermark}
                        watermarkText={watermarkText}
                    />
                    </div>
                </div>
                </div>

            <div className="mt-2 text-sm text-default-600">
              Lines: {lineCount}/{MAX_LINES}
              {isHighlighterLoading && " • Loading syntax highlighter..."}
            </div>

            {/* Export options */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button
                color="primary"
                onPress={handleCopy}
                className="flex-1"
                startContent={<Copy className="h-5 w-5" />}
              >
                Copy to Clipboard
              </Button>
              <Button color="primary" onClick={toggleFullScreen} startContent={<Maximize2 className="h-5 w-5" />}>
                Toggle Full Screen
              </Button>
              <Button
                color="primary"
                onPress={handleDownload}
                className="flex-1"
                startContent={<Download className="h-5 w-5" />}
              >
                Download Image
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100" id="settings">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <Tabs aria-label="Code to Image Generator options">

              <Tab
                key="background"
                title={
                  <div className="flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Background
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <Tabs
                    selectedKey={backgroundType}
                    onSelectionChange={(key) => handleBackgroundTypeChange(key as string)}
                  >
                    <Tab title="Premade" key="premade">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                        {backgroundOptions.premade.map((bg) => (
                          <Button
                            key={bg.value}
                            className={`w-full h-16 ${selectedBackground === bg.value ? "ring-2 ring-primary" : ""}`}
                            color={selectedBackground === bg.value ? "primary" : "default"}
                            onClick={() => setSelectedBackground(bg.value)}
                          >
                            {bg.label}
                          </Button>
                        ))}
                      </div>
                    </Tab>

                    <Tab title="Gradient" key="gradient">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                        {backgroundOptions.gradients.map((gradient) => (
                          <Button
                            key={gradient.value}
                            className={`w-full h-16 ${selectedBackground === gradient.value ? "ring-2 ring-primary" : ""}`}
                            style={{
                              background: `linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})`,
                              color: "white",
                              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                            }}
                            onClick={() => {
                              setSelectedBackground(gradient.value)
                            }}
                          >
                            {gradient.label}
                          </Button>
                        ))}
                      </div>
                    </Tab>

                    <Tab title="Solid" key="solid">
                      <div className="mt-4 flex flex-col gap-4">
                        <Input
                          type="color"
                          variant="bordered"
                          value={customBackgroundColor}
                          onChange={(e) => setCustomBackgroundColor(e.target.value)}
                          label="Background Color"
                          startContent={<Droplet className="h-4 w-4" />}
                        />
                        <div className="flex justify-center">
                          <Button
                            color={selectedBackground === "solid" ? "primary" : "default"}
                            onClick={() => setSelectedBackground("solid")}
                          >
                            Apply Solid Color
                          </Button>
                        </div>
                      </div>
                    </Tab>

                    <Tab title="Custom" key="custom">
                      <div className="mt-4 flex flex-col gap-4">
                        <div className="flex gap-2">
                          <Button
                            fullWidth
                            color="primary"
                            variant="flat"
                            onClick={triggerFileInput}
                            startContent={<Image className="h-5 w-5" />}
                          >
                            Upload Image
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          <Button
                            fullWidth
                            color="primary"
                            variant="flat"
                            onClick={handleRandomImage}
                            startContent={<Shuffle className="h-5 w-5" />}
                          >
                            Random Image
                          </Button>
                        </div>
                        {customBackgroundImage && (
                          <div className="relative h-32 w-full overflow-hidden rounded-md">
                            <img
                              src={customBackgroundImage || "/placeholder.svg"}
                              alt="Custom background"
                              className="h-full w-full object-cover"
                            />
                            <Button
                              isIconOnly
                              color="danger"
                              size="sm"
                              className="absolute right-2 top-2"
                              onClick={() => {
                                setCustomBackgroundImage("")
                                setUploadedImage(null)
                              }}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </Tab>

              <Tab
                key="export"
                title={
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Export Format"
                      selectedKeys={new Set([selectedExportFormat])}
                      onSelectionChange={(keys) => setSelectedExportFormat(Array.from(keys)[0] as string)}
                      variant="bordered"
                    >
                      {exportFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value} className="text-default-700">
                          {format.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      label="Image Quality"
                      selectedKeys={new Set([selectedImageQuality])}
                      onSelectionChange={(keys) => setSelectedImageQuality(Array.from(keys)[0] as string)}
                      variant="bordered"
                    >
                      {imageQualityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-default-700">
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </Tab>

              <Tab
                key="watermark"
                title={
                  <div className="flex items-center">
                    <Type className="w-4 h-4 mr-2" />
                    Watermark
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <Checkbox isSelected={supportWatermark} onValueChange={setSupportWatermark}>
                    Add Your Watermark
                  </Checkbox>

                  {supportWatermark && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select label="Position" defaultSelectedKeys={new Set(["bottom-left"])} variant="bordered">
                          <SelectItem key="bottom-left" value="bottom-left">
                            Bottom Left
                          </SelectItem>
                          <SelectItem key="bottom-right" value="bottom-right">
                            Bottom Right
                          </SelectItem>
                          <SelectItem key="top-left" value="top-left">
                            Top Left
                          </SelectItem>
                          <SelectItem key="top-right" value="top-right">
                            Top Right
                          </SelectItem>
                        </Select>

                        <Select label="Watermark Type" defaultSelectedKeys={new Set(["text-only"])} variant="bordered">
                          <SelectItem key="text-only" value="text-only">
                            Text Only
                          </SelectItem>
                          <SelectItem key="text-icon" value="text-icon">
                            Text + Icon
                          </SelectItem>
                          <SelectItem key="icon-only" value="icon-only">
                            Icon Only
                          </SelectItem>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Name/URL"
                          placeholder="your-website.com"
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          variant="bordered"
                        />

                        <Input type="color" label="Font Color" defaultValue="#ffffff" variant="bordered" />
                      </div>
                    </div>
                  )}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
     
    </div>
      {/* Render the fullscreen modal */}
      {renderFullscreenModal()}
    </ToolLayout>
    
  )
}

