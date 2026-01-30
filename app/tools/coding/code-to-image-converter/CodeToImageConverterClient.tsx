//maincode backup 2

"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Selection } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip, Modal, ModalContent, Switch } from "@nextui-org/react"
import { Card, CardBody, Button, Select, SelectItem, Input, Slider, } from "@nextui-org/react"
import {
  Copy,
  Download,
  XCircle,
  Maximize2,
  Hash,
  ImageIcon,
  Image,
  Shuffle,
  Droplet,
  Type,
  Settings,
  X,
  Check,
  FileType,
  Gauge,
  LayoutTemplate,
  Move,
  Text,
  Globe,
  Eye,

} from "lucide-react"
import { toast } from "react-hot-toast"
// Import specific icons from react-icons (example set)
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiCplusplus,
  SiPhp, SiRuby, SiGo, SiRust, SiSwift, SiKotlin, SiGnubash, SiMarkdown, SiYaml,
  SiReact, SiGraphql, SiGit, SiDocker, SiNodedotjs, SiPerl, SiR, SiGnu, SiLatex, SiNginx, SiNim, SiElixir, SiHaskell, SiDart, SiScala, SiSvelte
} from "react-icons/si"; // Using Simple Icons set

import { FaCodeBranch, FaJava, FaMicrochip, FaVuejs } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

import { VscTerminalPowershell, VscTerminalCmd, VscTerminalBash, VscJson, VscSymbolFile } from "react-icons/vsc"; // Visual Studio Code Icons
import { FaRegFileCode, FaRegFileImage, FaRegFileAlt } from "react-icons/fa";
import ToolLayout from "@/components/ToolLayout"
import * as shiki from "shiki"
import CodePreview from "./CodePreview"
import FileUploader from "./FileUploader"
import { codingFonts } from './fonts'; // adjust path if neede
import InfoSectionCodeToImage from "./info-section"


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
  // Already added ones...
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

  // ✅ New ones
  { value: "perl", label: "Perl" },
  { value: "r", label: "R" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "makefile", label: "Makefile" },
  { value: "powershell", label: "PowerShell" },
  { value: "ini", label: "INI" },
  { value: "toml", label: "TOML" },
  { value: "latex", label: "LaTeX" },
  { value: "nginx", label: "Nginx" },
  { value: "diff", label: "Diff" },
  { value: "shellscript", label: "Shell Script" }, // alt for bash
  { value: "nim", label: "Nim" },
  { value: "elixir", label: "Elixir" },
  { value: "haskell", label: "Haskell" },
  { value: "dart", label: "Dart" },
  { value: "scala", label: "Scala" },
  { value: "svelte", label: "Svelte" },
  { value: "matlab", label: "MATLAB" },
];




// Define font sizes
const fontSizes = [
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
  { value: "18px", label: "18px" },
  { value: "20px", label: "20px" },
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
  gradients: [
    { value: "gradient-blue", label: "Blue Gradient", colors: ["#1a91ff", "#0e4e8a"] },
    { value: "gradient-purple", label: "Purple Gradient", colors: ["#8a2be2", "#4b0082"] },
    { value: "gradient-sunset", label: "Sunset", colors: ["#ff7e5f", "#feb47b"] },
    { value: "gradient-mint", label: "Mint", colors: ["#00b09b", "#96c93d"] },
    { value: "gradient-ocean", label: "Ocean", colors: ["#2193b0", "#6dd5ed"] },
    { value: "gradient-blood-orange", label: "Blood Orange", colors: ["#ff416c", "#ff4b2b"] },
    { value: "gradient-dark-blue", label: "Dark Blue", colors: ["#141e30", "#243b55"] },
    { value: "gradient-cosmic", label: "Cosmic", colors: ["#ff00cc", "#333399"] },

    // 🔥 New Gradients Below
    { value: "gradient-neon", label: "Neon", colors: ["#00f260", "#0575e6"] },
    { value: "gradient-midnight", label: "Midnight", colors: ["#232526", "#414345"] },
    { value: "gradient-sakura", label: "Sakura", colors: ["#f8cdda", "#1d2b64"] },
    { value: "gradient-lime-aqua", label: "Lime Aqua", colors: ["#3ec6a8", "#b5ac49"] },
    { value: "gradient-berry", label: "Berry", colors: ["#c94b4b", "#4b134f"] },
    { value: "gradient-nord", label: "Nord", colors: ["#2E3440", "#88C0D0"] },
    { value: "gradient-blush", label: "Blush", colors: ["#dd5e89", "#f7bb97"] },
    { value: "gradient-carbon", label: "Carbon", colors: ["#485563", "#29323c"] },
    { value: "gradient-aurora", label: "Aurora", colors: ["#00c6ff", "#0072ff"] },
    { value: "gradient-forest", label: "Forest", colors: ["#5A3F37", "#2C7744"] },
    { value: "gradient-peach", label: "Peach", colors: ["#ed6ea0", "#ec8c69"] },
  ],
};


// Export formats
const exportFormats = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
]

// Define max line count
const MAX_LINES = 100

// --- UPDATED File Icon Mapping ---
const getFileIcon = (extension: string): React.ReactNode => {
  const ext = extension?.toLowerCase() ?? '';
  const iconProps = { className: "w-4 h-4 flex-shrink-0" }; // Common props

  switch (ext) {
    // Programming Languages
    case 'js': return <SiJavascript {...iconProps} color="#F7DF1E" />;
    case 'ts': return <SiTypescript {...iconProps} color="#3178C6" />;
    case 'jsx':
    case 'tsx': return <SiReact {...iconProps} color="#61DAFB" />;
    case 'py': return <SiPython {...iconProps} color="#3776AB" />;
    case 'java': return <FaJava {...iconProps} color="#f89820" />; // Often orange/blue
    case 'html': return <SiHtml5 {...iconProps} color="#E34F26" />;
    case 'css': return <SiCss3 {...iconProps} color="#1572B6" />;
    case 'c':
    case 'cpp': return <SiCplusplus {...iconProps} color="#00599C" />;
    case 'cs': return <TbBrandCSharp {...iconProps} color="#239120" />;
    case 'php': return <SiPhp {...iconProps} color="#777BB4" />;
    case 'rb': return <SiRuby {...iconProps} color="#CC342D" />;
    case 'go': return <SiGo {...iconProps} color="#00ADD8" />;
    case 'rs': return <SiRust {...iconProps} color="#DEA584" />; // Often uses crab icon, SiRust is the logo
    case 'swift': return <SiSwift {...iconProps} color="#FA7343" />;
    case 'kt': return <SiKotlin {...iconProps} color="#7F52FF" />;
    case 'vue': return <FaVuejs {...iconProps} color="#4FC08D" />;
    case 'pl': return <SiPerl {...iconProps} color="#39457E" />;
    case 'r': return <SiR {...iconProps} color="#276DC3" />;
    case 'dockerfile': return <SiDocker {...iconProps} color="#2496ED" />;
    case 'makefile': return <SiGnu {...iconProps} color="#A42E2B" />;
    case 'ini': return <FaRegFileCode {...iconProps} color="#f0f0f0" />;
    case 'toml': return <FaRegFileCode {...iconProps} color="#9c4221" />;
    case 'tex': return <SiLatex {...iconProps} color="#008080" />;
    case 'nginx':
    case 'conf': return <SiNginx {...iconProps} color="#009639" />;
    case 'diff': return <FaCodeBranch {...iconProps} color="#ffa500" />;
    case 'nim': return <SiNim {...iconProps} color="#FFE953" />;
    case 'ex':
    case 'exs': return <SiElixir {...iconProps} color="#4B275F" />;
    case 'hs': return <SiHaskell {...iconProps} color="#5e5086" />;
    case 'dart': return <SiDart {...iconProps} color="#0175C2" />;
    case 'scala': return <SiScala {...iconProps} color="#DC322F" />;
    case 'svelte': return <SiSvelte {...iconProps} color="#FF3E00" />;
    case 's':
    case 'S': return <FaMicrochip {...iconProps} color="#6c757d" />;
    case 'm': return <SiLatex {...iconProps} color="#0076A8" />; // MATLAB


    // Scripting & Shell
    case 'sh': return <VscTerminalBash {...iconProps} color="#4EAA25" />; // Or FaTerminal
    case 'bash': return <SiGnubash {...iconProps} color="#4EAA25" />;
    case 'ps1': return <VscTerminalPowershell {...iconProps} color="#012456" />;
    case 'cmd':
    case 'bat': return <VscTerminalCmd {...iconProps} color="#f0f0f0" />; // White/Gray typically

    // Data & Markup
    case 'json': return <VscJson {...iconProps} color="#f0f0f0" />;
    case 'xml': return <FaRegFileCode {...iconProps} color="#ff9a00" />;
    case 'md': return <SiMarkdown {...iconProps} color="#f0f0f0" />;
    case 'yaml':
    case 'yml': return <SiYaml {...iconProps} color="#f0f0f0" />; // Often just text symbol

    // Other / Config
    case 'sql': return <FaRegFileCode {...iconProps} color="#ffda44" />; // Database often associated
    case 'graphql': return <SiGraphql {...iconProps} color="#E10098" />;
    case 'dockerfile': return <SiDocker {...iconProps} color="#2496ED" />;
    case 'gitignore': return <SiGit {...iconProps} color="#F05032" />;
    case 'npmrc': return <SiNodedotjs {...iconProps} color="#339933" />; // Node associated

    // Images
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
    case 'svg': return <FaRegFileImage {...iconProps} color="#8A2BE2" />; // Generic image, purple maybe

    // Text / Default
    case 'txt': return <FaRegFileAlt {...iconProps} color="#cccccc" />;
    default:
      return <VscSymbolFile {...iconProps} color="#cccccc" />; // Default VSCode file icon
  }
};
// --- End UPDATED Icon Mapping ---

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

// Add type checking for the environment variable
if (!UNSPLASH_ACCESS_KEY) {
  throw new Error("Missing NEXT_PUBLIC_UNSPLASH_ACCESS_KEY environment variable")
}


export default function CodeToImageConverter() {
  const [code, setCode] = useState("// Write your code here...")
  const [selectedTheme, setSelectedTheme] = useState("github-dark")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [backgroundType, setBackgroundType] = useState("gradient")
  const [selectedBackground, setSelectedBackground] = useState("gradient-cosmic")
  const [customBackgroundColor, setCustomBackgroundColor] = useState("#7EDAEC")
  const [customBackgroundImage, setCustomBackgroundImage] = useState("")
  const [selectedPadding, setSelectedPadding] = useState("32")
  const [fileName, setFileName] = useState("example.js")
  const [isDarkMode,] = useState(true)
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
  //Watermark
  const [supportWatermark, setSupportWatermark] = useState(false)
  const [watermarkText, setWatermarkText] = useState("")
  const [watermarkPosition, setWatermarkPosition] = useState<"bottom-left" | "bottom-right" | "top-left" | "top-right">("bottom-left")
  const [watermarkType, setWatermarkType] = useState<"text-only" | "text-icon" | "icon-only">("text-only")
  const [watermarkFontColor, setWatermarkFontColor] = useState("#ffffff")
  const [watermarkFontSize, setWatermarkFontSize] = useState("0.75rem")
  const [watermarkIcon, setWatermarkIcon] = useState<string | undefined>(undefined)

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
  //For LocalStorage this section will load the user settings
  useEffect(() => {
    // Load saved values when component mounts
    const savedCode = localStorage.getItem('codeToImage_code');
    const savedTheme = localStorage.getItem('codeToImage_theme');
    const savedLanguage = localStorage.getItem('codeToImage_language');
    const savedFileName = localStorage.getItem('codeToImage_fileName');
    const savedFont = localStorage.getItem('codeToImage_font');
    const savedFontSize = localStorage.getItem('codeToImage_fontSize');
    const savedTabSize = localStorage.getItem('codeToImage_tabSize');
    const savedShadow = localStorage.getItem('codeToImage_shadow');
    const savedPadding = localStorage.getItem('codeToImage_padding');

    if (savedCode) setCode(savedCode);
    if (savedTheme) setSelectedTheme(savedTheme);
    if (savedLanguage) setSelectedLanguage(savedLanguage);
    if (savedFileName) setFileName(savedFileName);
    if (savedFont) setSelectedFont(savedFont);
    if (savedFontSize) setSelectedFontSize(savedFontSize);
    if (savedTabSize) setSelectedTabSize(savedTabSize);
    if (savedShadow) setSelectedShadow(savedShadow);
    if (savedPadding) setSelectedPadding(savedPadding);
  }, []);
  //Fullscreenmodal scaldown

  useEffect(() => {
    if (isFullScreen && fullscreenPreviewRef.current) {
      const handleResize = () => {
        if (!fullscreenPreviewRef.current) return;

        const container = fullscreenPreviewRef.current;
        const codeElement = container.querySelector('.code-preview-container') as HTMLElement | null;

        if (!codeElement) return;

        // Reset any previous transform and positioning to get true dimensions
        container.style.transform = 'none';
        container.style.position = 'relative';
        container.style.top = '0';
        container.style.left = '0';

        // Calculate original dimensions
        const originalWidth = codeElement.offsetWidth;
        const originalHeight = codeElement.offsetHeight;

        // Calculate available space (with padding/margin for controls)
        const maxWidth = window.innerWidth * 0.9;  // 90% of viewport width
        const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

        // Calculate scale factors
        const scaleX = maxWidth / originalWidth;
        const scaleY = maxHeight / originalHeight;

        // Use the smaller scale factor to ensure it fits both dimensions
        const scale = Math.min(scaleX, scaleY, 1); // Cap at 1 to prevent upscaling

        // Set the container back to a centered flex item
        container.style.position = 'relative';
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'center center';
      };

      // Initial scaling
      handleResize();

      // Handle window resizing
      window.addEventListener('resize', handleResize);

      // Additional trigger when code content changes
      const observer = new MutationObserver(handleResize);
      observer.observe(fullscreenPreviewRef.current, {
        subtree: true,
        childList: true,
        characterData: true
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
      };
    }
  }, [isFullScreen, code, lineCount]);

  // For theme selection
  const handleThemeChange = useCallback((keys: Selection) => {
    if (keys === "all") return;
    const newTheme = Array.from(keys)[0] as string;
    setSelectedTheme(newTheme);
    localStorage.setItem('codeToImage_theme', newTheme);
  }, []);

  // For language selection
  const handleLanguageChange = useCallback((keys: Selection) => {
    if (keys === "all") return;
    const newLanguage = Array.from(keys)[0] as string;
    setSelectedLanguage(newLanguage);
    localStorage.setItem('codeToImage_language', newLanguage);
  }, []);

  // Font Family
  const handleFontChange = useCallback((keys: Selection) => {
    if (keys === "all") return;
    const newFont = typeof keys === "object" && "currentKey" in keys
      ? keys.currentKey as string
      : Array.from(keys)[0] as string;
    setSelectedFont(newFont);
    localStorage.setItem('codeToImage_font', newFont);
  }, []);

  // Font Size
  const handleFontSizeChange = useCallback((keys: Selection) => {
    const newFontSize = Array.from(keys)[0] as string;
    setSelectedFontSize(newFontSize);
    localStorage.setItem('codeToImage_fontSize', newFontSize);
  }, []);

  // Tab Size
  const handleTabSizeChange = useCallback((keys: Selection) => {
    const newTabSize = Array.from(keys)[0] as string;
    setSelectedTabSize(newTabSize);
    localStorage.setItem('codeToImage_tabSize', newTabSize);
  }, []);

  // Shadow
  const handleShadowChange = useCallback((keys: Selection) => {
    const newShadow = Array.from(keys)[0] as string;
    setSelectedShadow(newShadow);
    localStorage.setItem('codeToImage_shadow', newShadow);
  }, []);

  // Padding
  const handlePaddingChange = useCallback((value: number | number[]) => {
    // Convert to string, handling both number and array of numbers
    const paddingValue = Array.isArray(value) ? value[0].toString() : value.toString();
    setSelectedPadding(paddingValue);
    localStorage.setItem('codeToImage_padding', paddingValue);
  }, []);


  // Completely revised file name handling
  const handleFileNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileName = e.target.value;
    setFileName(newFileName);
    localStorage.setItem('codeToImage_fileName', newFileName);
  }, []);
  // --- END UPDATED File Name Handler ---

  // Handle code change
  const handleCodeChange = useCallback((newCode: string) => {
    const lines = newCode.split("\n").length

    if (lines > MAX_LINES) {
      toast.error(`Maximum line limit of ${MAX_LINES} reached!`)
      return
    }

    setCode(newCode)
    localStorage.setItem('codeToImage_code', newCode);
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
    if (type === "gradient") {
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

      // Import html-to-image instead of html2canvas
      const htmlToImage = await import("html-to-image");

      const codePreviewElement = targetRef.current.querySelector(
        ".code-preview-container"
      );

      if (!codePreviewElement) {
        toast.dismiss(loadingToast);
        toast.error("Could not find code preview element");
        return;
      }

      // Calculate scale factor based on quality setting
      const scaleFactor =
        selectedImageQuality === "ultra"
          ? 3
          : selectedImageQuality === "high"
            ? 2
            : 1;

      // Create a clone with proper structure preservation
      const clone = codePreviewElement.cloneNode(true) as HTMLElement;

      // Create a wrapper that maintains the original dimensions and layout context
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.top = "-9999px";
      wrapper.style.left = "-9999px";
      wrapper.style.width = `${codePreviewElement.scrollWidth}px`;
      wrapper.style.height = `${codePreviewElement.scrollHeight}px`;
      wrapper.style.overflow = "visible";

      // Maintain original styles for the clone itself
      clone.style.position = "relative"; // Use relative instead of absolute
      clone.style.top = "0";
      clone.style.left = "0";
      clone.style.width = `${codePreviewElement.scrollWidth}px`;
      clone.style.height = `${codePreviewElement.scrollHeight}px`;

      // Ensure window controls maintain their position
      const windowControls = clone.querySelector(".flex.items-center.gap-1\\.5");
      if (windowControls) {
        (windowControls as HTMLElement).style.position = "relative";
        (windowControls as HTMLElement).style.zIndex = "5"; // Ensure it's on top
      }

      // Add website branding
      const watermark = document.createElement("div");
      watermark.textContent = "WebToolsCenter";
      watermark.style.position = "absolute";
      watermark.style.bottom = "8px";
      watermark.style.right = "12px";
      watermark.style.fontSize = "14px";
      watermark.style.fontWeight = "500";
      watermark.style.opacity = "0.75";
      watermark.style.color = "#ffffff";
      watermark.style.textShadow = "0 1px 2px rgba(0, 0, 0, 0.5)";
      watermark.style.fontFamily = "system-ui, -apple-system, sans-serif";
      watermark.style.zIndex = "10";
      clone.appendChild(watermark);

      // Append clone to wrapper, then wrapper to document
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Delay capture slightly to allow for proper rendering
      setTimeout(async () => {
        try {
          let image: string;
          // Choose appropriate method based on export format
          if (selectedExportFormat === "png") {
            image = await htmlToImage.toPng(clone, {
              pixelRatio: scaleFactor,
              width: codePreviewElement.scrollWidth,
              height: codePreviewElement.scrollHeight
            });
          } else if (selectedExportFormat === "jpeg") {
            image = await htmlToImage.toJpeg(clone, {
              pixelRatio: scaleFactor,
              width: codePreviewElement.scrollWidth,
              height: codePreviewElement.scrollHeight,
              quality: 0.9
            });
          } else if (selectedExportFormat === "webp") {
            // html-to-image doesn't have a direct webp method, use toCanvas and convert
            const canvas = await htmlToImage.toCanvas(clone, {
              pixelRatio: scaleFactor,
              width: codePreviewElement.scrollWidth,
              height: codePreviewElement.scrollHeight
            });
            image = canvas.toDataURL('image/webp', 0.9);
          } else {
            // Fallback to PNG
            image = await htmlToImage.toPng(clone, {
              pixelRatio: scaleFactor,
              width: codePreviewElement.scrollWidth,
              height: codePreviewElement.scrollHeight
            });
          }

          const link = document.createElement("a");
          link.href = image;
          // Add WebToolsCenter to the filename
          link.download = `WebToolsCenter-${fileName.split(".")[0]}-code.${selectedExportFormat}`;
          link.click();

          toast.dismiss(loadingToast);
          toast.success(`Image downloaded as ${selectedExportFormat.toUpperCase()}!`);
        } finally {
          // Clean up
          if (wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
          }
        }
      }, 100); // Short delay to ensure rendering

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

      // Import html-to-image instead of html2canvas
      const htmlToImage = await import("html-to-image");

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
        // Apply scaling for higher quality
        const scaleFactor =
          selectedImageQuality === "ultra"
            ? 3
            : selectedImageQuality === "high"
              ? 2
              : 1;

        // Use toPng from html-to-image
        const dataUrl = await htmlToImage.toPng(clone, {
          pixelRatio: scaleFactor,
          width: width,
          height: height
        });

        // Convert dataUrl to blob for clipboard API
        const response = await fetch(dataUrl);
        const blob = await response.blob();

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
      } finally {
        // Clean up
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

  const renderFullscreenModal = () => (
    <Modal
      isOpen={isFullScreen}
      onOpenChange={setIsFullScreen}
      size="full"
      classNames={{
        base: "bg-black/50 backdrop-blur-md",
        wrapper: "max-w-full h-full",
        body: "p-0", // Remove padding to maximize available space
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
            {/* Header with controls - positioned absolutely */}
            <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-8 z-10">
              <div className="flex gap-2">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleCopy}
                  startContent={<Copy className="h-5 w-5" />}
                >
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
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex items-center justify-center w-full h-full">
              {/* Center container for the code preview */}
              <div
                ref={fullscreenPreviewRef}
                className="origin-center" // Only keep the origin-center class
                style={{
                  // Remove any positioning styles from here
                  // The parent flex container will handle the centering
                }}
              >
                <CodePreview
                  code={code}
                  fileName={fileName}// Pass handler
                  getFileIcon={getFileIcon}
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
                  watermarkFontColor={watermarkFontColor}
                  watermarkPosition={watermarkPosition}
                  watermarkFontSize={watermarkFontSize}
                  watermarkIcon={watermarkIcon}
                  watermarkType={watermarkType}
                />
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <ToolLayout
      title="Code to Image Converter"
      description="Convert your code snippets into beautiful, shareable images with customizable themes, backgrounds, and styling"
      toolId="678f382e26f06f912191bcb6"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Controls section - modern layout with improved spacing */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
              {/* Main controls - take up more space */}
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Code Theme Selector */}
                <Select
                  label="Code Theme"
                  selectedKeys={new Set([selectedTheme])}
                  onSelectionChange={handleThemeChange}
                  disallowEmptySelection
                  variant="bordered"
                  classNames={{
                    trigger: "bg-default-100 dark:bg-default-200 border-default-300"
                  }}
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
                  disallowEmptySelection
                  onSelectionChange={handleLanguageChange}
                  variant="bordered"
                  classNames={{
                    trigger: "bg-default-100 dark:bg-default-200 border-default-300"
                  }}
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
                  label="File Name"
                  aria-label="File Name Input" // Better accessibility
                  placeholder="Enter file name"
                  value={fileName}
                  onChange={handleFileNameChange} // Use the reverted handler
                  variant="bordered"
                  classNames={{
                    input: "bg-default-100 dark:bg-default-200",
                    inputWrapper: "border-default-300"
                  }}
                />

              </div>

              {/* Action buttons - modern, minimal design */}
              <div className="md:col-span-4 flex items-center justify-end gap-2">
                {/* Settings Dropdown */}
                <Tooltip content="Font Settings" className="text-default-700">
                  <div>
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant="flat"
                          color="success"
                          className="rounded-full hover:scale-105 transition-all"
                          aria-label="Settings"
                        >
                          <Settings size={18} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Settings Options" className="w-64 md:w-80">
                        <DropdownItem key="options" isReadOnly>
                          <div className="space-y-4 p-2">
                            <div className="grid grid-cols-1 gap-4">
                              {/* Font Selector */}
                              <Select
                                label="Font Family"
                                selectedKeys={new Set([selectedFont])}
                                disallowEmptySelection
                                onSelectionChange={handleFontChange}
                                variant="bordered"
                                startContent={<Type className="h-4 w-4 text-default-700" />}
                              >
                                {codingFonts.map((font) => (
                                  <SelectItem key={font.value} value={font.value} className="text-default-700">
                                    {font.label}
                                  </SelectItem>
                                ))}
                              </Select>

                              {/* Font Size Selector */}
                              <Select
                                label="Font Size"
                                selectedKeys={new Set([selectedFontSize])}
                                disallowEmptySelection
                                onSelectionChange={handleFontSizeChange}
                                variant="bordered"
                              >
                                {fontSizes.map((size) => (
                                  <SelectItem key={size.value} value={size.value} className="text-default-700">
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Tab Size Selector */}
                              <Select
                                label="Tab Size"
                                selectedKeys={new Set([selectedTabSize])}
                                disallowEmptySelection
                                onSelectionChange={handleTabSizeChange}
                                variant="bordered"
                              >
                                {tabSizes.map((size) => (
                                  <SelectItem key={size.value} value={size.value} className="text-default-700">
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </Select>

                              {/* Shadow Selector */}
                              <Select
                                label="Shadow"
                                selectedKeys={new Set([selectedShadow])}
                                disallowEmptySelection
                                onSelectionChange={handleShadowChange}
                                variant="bordered"
                              >
                                {shadowOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            {/* Padding Slider */}
                            <div className="px-1">
                              <div className="flex justify-between mb-1">
                                <label className="text-sm text-default-500">Padding: {selectedPadding}px</label>
                              </div>
                              <Slider
                                size="sm"
                                step={8}
                                color="primary"
                                minValue={20}
                                maxValue={200}
                                defaultValue={Number.parseInt(selectedPadding)}
                                value={Number.parseInt(selectedPadding)}
                                onChange={handlePaddingChange}
                                className="max-w-full"
                                classNames={{
                                  track: "bg-default-200 dark:bg-default-700",
                                  filler: "bg-gradient-to-r from-blue-500 to-violet-500",
                                  thumb: "shadow-md bg-white dark:bg-zinc-800 border-0",
                                  label: "font-medium text-xs bg-default-100 dark:bg-default-800"
                                }}
                              />
                            </div>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Tooltip>

                {/* Fullscreen Button */}
                <Tooltip content="Fullscreen" className="text-default-700">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    onPress={toggleFullScreen}
                    className="rounded-full hover:scale-105 transition-all"
                    size="md"
                    aria-label="Toggle Full Screen"
                  >
                    <Maximize2 size={18} />
                  </Button>
                </Tooltip>


                {/* Line Numbers Toggle */}
                <Tooltip content="Toggle Line Numbers" className="text-default-700">
                  <Button
                    isIconOnly
                    variant="flat"
                    className={`${showLineNumbers ? 'bg-primary-100 text-primary-500' : 'bg-default-200 text-default-700'} rounded-full hover:scale-105 transition-all`}
                    onPress={() => setShowLineNumbers(!showLineNumbers)}
                  >
                    <Hash size={18} />
                  </Button>
                </Tooltip>

                {/* Window Controls Toggle */}
                <Tooltip content="Toggle Window Controls" className="text-default-700">
                  <Button
                    isIconOnly
                    variant="flat"
                    className={`${windowControls ? 'bg-primary-100 text-primary-500' : 'bg-default-200 text-default-700'} rounded-full hover:scale-105 transition-all`}
                    onPress={() => setWindowControls(!windowControls)}
                  >
                    <XCircle size={18} />
                  </Button>
                </Tooltip>
              </div>

            </div>

            <style>
              {`
              /* Custom scrollbar styling */
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
                height: 6px;
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
              
              /* Full screen button positioning */
              .fullscreen-button {
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 10;
                opacity: 0.6;
                transition: opacity 0.2s ease;
              }
              .fullscreen-button:hover {
                opacity: 1;
              }
            `}
            </style>

            {/* Preview section with added fullscreen button inside */}
            <div
              ref={previewRef}
              className="relative rounded-lg border border-default-300 dark:border-default-400 custom-scrollbar overflow-auto"
              style={{
                width: "100%",
                minHeight: "300px",
                maxHeight: "800px"
              }}
            >


              {/* Content container */}
              <div className="w-full">
                <CodePreview
                  code={code}
                  fileName={fileName}
                  getFileIcon={getFileIcon}
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
                  watermarkFontColor={watermarkFontColor}
                  watermarkPosition={watermarkPosition}
                  watermarkFontSize={watermarkFontSize}
                  watermarkIcon={watermarkIcon}
                  watermarkType={watermarkType}
                />
              </div>
            </div>

            <div className="mt-2 text-sm text-default-600 flex justify-between">
              <span>Lines: {lineCount}/{MAX_LINES} {isHighlighterLoading && "• Loading syntax highlighter..."}</span>
            </div>
          </CardBody>
        </Card>


        {/* Main Settings Card */}
        <Card className="bg-default-50 dark:bg-default-100" id="settings">
          <CardBody className="p-6">
            <h2 className="text-xl font-bold flex items-center text-primary-600 dark:text-primary-400">
              <ImageIcon className="w-5 h-5 mr-2" />
              Background
            </h2>

            {/* Background Section */}
            <section className="mt-4">
              <Select
                label="Background Type"
                aria-label="Background options"
                variant="bordered"
                disallowEmptySelection
                selectedKeys={[backgroundType]}
                onSelectionChange={(keys) => handleBackgroundTypeChange(keys.currentKey as string)}
                className="max-w-xs mb-4"
              >
                <SelectItem key="gradient" value="gradient" className="text-default-700">Gradient</SelectItem>
                <SelectItem key="solid" value="solid" className="text-default-700">Solid Color</SelectItem>
                <SelectItem key="custom" value="custom" className="text-default-700">Custom Image</SelectItem>
              </Select>

              {/* Gradient Options */}
              {backgroundType === "gradient" && (
                <div className="space-y-4 w-full">
                  <label className="block text-sm font-medium mb-1">Background Style</label>


                  {/* Color swatches grid */}
                  <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 gap-2 mt-3">
                    {backgroundOptions.gradients.map((gradient) => (
                      <button
                        key={gradient.value}
                        className={`h-12 rounded-md transition-all hover:scale-105 ${selectedBackground === gradient.value ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
                          }`}
                        style={{
                          background: `linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})`,
                        }}
                        onClick={() => setSelectedBackground(gradient.value)}
                        title={gradient.label}
                        aria-label={`Select ${gradient.label} gradient`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Solid Color Options */}
              {backgroundType === "solid" && (
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Input
                      type="color"
                      variant="bordered"
                      value={customBackgroundColor}
                      onChange={(e) => setCustomBackgroundColor(e.target.value)}
                      label="Background Color"
                      startContent={<Droplet className="h-4 w-4" />}
                      className="sm:max-w-sm"
                    />
                    <Button
                      color="primary"
                      onClick={() => setSelectedBackground("solid")}
                      className="flex-shrink-0"
                      startContent={<Check className="h-4 w-4" />}
                    >
                      Apply Color
                    </Button>
                  </div>

                  <div className="h-12 rounded-lg mt-2" style={{ backgroundColor: customBackgroundColor }}></div>
                </div>
              )}

              {/* Custom Image Options */}
              {backgroundType === "custom" && (
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
                    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-default-200">
                      <img
                        src={customBackgroundImage || "/placeholder.svg"}
                        alt="Custom background"
                        className="h-full w-full object-cover"
                      />
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        className="absolute right-2 top-2 bg-default-100/80 backdrop-blur-sm"
                        onClick={() => {
                          setCustomBackgroundImage("");
                          setUploadedImage(null);
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </section>
          </CardBody>
        </Card>
        {/* Combined Settings Card */}
        <Card className="bg-default-50 dark:bg-default-100" id="settings">
          <CardBody className="p-6">
            {/* Watermark Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center text-primary-600 dark:text-primary-400">
                  <Type className="w-5 h-5 mr-2" />
                  Watermark
                </h2>

                <Switch
                  isSelected={supportWatermark}
                  onValueChange={setSupportWatermark}
                  size="md"
                  color="primary"
                  className="ml-2"
                />
              </div>

              {supportWatermark && (
                <div className="space-y-4 mt-4 pl-3 border-l-2 border-primary/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Watermark Type"
                      selectedKeys={new Set([watermarkType])}
                      disallowEmptySelection
                      onChange={(e) => setWatermarkType(e.target.value as "text-only" | "text-icon" | "icon-only")}
                      variant="bordered"
                      startContent={<LayoutTemplate className="h-4 w-4 text-default-400" />}
                    >
                      <SelectItem key="text-only" value="text-only" className="text-default-700">Text Only</SelectItem>
                      <SelectItem key="text-icon" value="text-icon" className="text-default-700">Text + Icon</SelectItem>
                      <SelectItem key="icon-only" value="icon-only" className="text-default-700">Icon Only</SelectItem>
                    </Select>

                    <Select
                      label="Position"
                      selectedKeys={new Set([watermarkPosition])}
                      disallowEmptySelection
                      onChange={(e) => setWatermarkPosition(e.target.value as "bottom-left" | "bottom-right" | "top-left" | "top-right")}
                      variant="bordered"
                      startContent={<Move className="h-4 w-4 text-default-400" />}
                    >
                      <SelectItem key="bottom-left" value="bottom-left" className="text-default-700">Bottom Left</SelectItem>
                      <SelectItem key="bottom-right" value="bottom-right" className="text-default-700">Bottom Right</SelectItem>
                      <SelectItem key="top-left" value="top-left" className="text-default-700">Top Left</SelectItem>
                      <SelectItem key="top-right" value="top-right" className="text-default-700">Top Right</SelectItem>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {watermarkType !== "icon-only" && (
                      <Input
                        label="Text/URL"
                        placeholder="your-website.com"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        variant="bordered"
                        startContent={<Text className="h-4 w-4 text-default-400" />}
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <Input
                        type="color"
                        label="Font Color"
                        value={watermarkFontColor}
                        onChange={(e) => setWatermarkFontColor(e.target.value)}
                        variant="bordered"
                        className="flex-1"
                      />
                      <div className="mt-6 h-8 w-8 rounded-full border border-default-200" style={{ backgroundColor: watermarkFontColor }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Font Size"
                      selectedKeys={new Set([watermarkFontSize])}
                      disallowEmptySelection
                      onChange={(e) => setWatermarkFontSize(e.target.value)}
                      variant="bordered"
                      startContent={<Text className="h-4 w-4 text-default-400" />}
                    >
                      <SelectItem key="0.625rem" value="0.625rem" className="text-default-700">Extra Small</SelectItem>
                      <SelectItem key="0.75rem" value="0.75rem" className="text-default-700">Small</SelectItem>
                      <SelectItem key="0.875rem" value="0.875rem" className="text-default-700">Medium</SelectItem>
                      <SelectItem key="1rem" value="1rem" className="text-default-700">Large</SelectItem>
                    </Select>

                    {watermarkType !== "text-only" && (
                      <FileUploader
                        id="watermark-icon"
                        label="Watermark Icon"
                        onFileSelect={(fileUrl) => setWatermarkIcon(fileUrl)}
                      />
                    )}
                  </div>

                  <div className="mt-6 p-3 bg-default-50 rounded-lg shadow-md border border-default-200">
                    <div className="text-sm text-default-500 mb-2 flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> Watermark Preview
                    </div>
                    <div className="h-16 rounded-md bg-default-200 flex items-center justify-center relative">
                      <div
                        className={`absolute ${watermarkPosition === "bottom-left" ? "bottom-2 left-2" :
                          watermarkPosition === "bottom-right" ? "bottom-2 right-2" :
                            watermarkPosition === "top-left" ? "top-2 left-2" : "top-2 right-2"
                          } flex items-center gap-1`}
                        style={{
                          color: watermarkFontColor,
                          fontSize: watermarkFontSize
                        }}
                      >
                        {(watermarkType === "text-icon" || watermarkType === "icon-only") && (
                          <span className="flex-shrink-0 w-4 h-4">
                            {watermarkIcon ?
                              <img src={watermarkIcon} alt="Icon" className="w-full h-full object-contain" /> :
                              <Globe className="w-full h-full" />
                            }
                          </span>
                        )}
                        {(watermarkType === "text-only" || watermarkType === "text-icon") && (
                          <span>{watermarkText || "your-website.com"}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Export Options Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center text-primary-600 dark:text-primary-400">
                <Download className="w-5 h-5 mr-2" />
                Export Options
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Export Format"
                  selectedKeys={new Set([selectedExportFormat])}
                  disallowEmptySelection
                  onSelectionChange={(keys) => setSelectedExportFormat(Array.from(keys)[0] as string)}
                  variant="bordered"
                  startContent={<FileType className="h-4 w-4 text-default-400" />}
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
                  disallowEmptySelection
                  onSelectionChange={(keys) => setSelectedImageQuality(Array.from(keys)[0] as string)}
                  variant="bordered"
                  startContent={<Gauge className="h-4 w-4 text-default-400" />}
                >
                  {imageQualityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-default-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  color="primary"
                  onPress={handleCopy}
                  className="flex-1 w-full sm:w-auto px-6 py-3 text-base"
                  startContent={<Copy className="h-5 w-5" />}
                >
                  Copy to Clipboard
                </Button>
                <Button
                  color="primary"
                  onPress={handleDownload}
                  className="flex-1 w-full sm:w-auto px-6 py-3 text-base"
                  startContent={<Download className="h-5 w-5" />}
                >
                  Download Image
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>


      </div>
      <InfoSectionCodeToImage />
      {/* Render the fullscreen modal */}
      {renderFullscreenModal()}
    </ToolLayout>

  )
}

