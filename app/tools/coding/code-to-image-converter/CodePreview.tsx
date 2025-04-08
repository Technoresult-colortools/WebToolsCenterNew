//codepreview backup2

"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLayoutEffect } from "react";
import type * as shiki from "shiki";
import {
  jetbrainsMono,
  firaCode,
  sourceCodePro,
  ibmPlexMono,
  robotoMono,
  ubuntuMono,
  inconsolata,
  anonymousPro,
  spaceMono,
  shareTechMono,
  cutiveMono,
  overpassMono,
} from './fonts';

// List known light themes by their value/name used in your 'codeThemes' array
const KNOWN_LIGHT_THEMES = new Set([
  "github-light",
  "solarized-light",
  "slack-ochin", // As identified by you
  "vitesse-light",
  "light-plus", // Default VS Code Light
  // Add any other themes you use that are light
]);



interface CodePreviewProps {
  // Props remain the same
  code: string
  fileName: string
  getFileIcon: (extension: string) => React.ReactNode;
  selectedTheme: string
  selectedLanguage: string
  selectedBackground: string
  selectedPadding: string
  isDarkMode: boolean
  showLineNumbers: boolean
  windowControls: boolean
  onCodeChange: (code: string) => void
  highlighter: shiki.Highlighter | null
  customBackgroundColor?: string
  isHighlighterLoading: boolean
  customBackgroundImage?: string
  selectedFont: string
  selectedFontSize: string
  selectedTabSize: string
  supportWatermark?: boolean
  watermarkText?: string
  watermarkPosition?: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  watermarkType?: "text-only" | "text-icon" | "icon-only"
  watermarkFontColor?: string
  watermarkFontSize?: string
  watermarkIcon?: string
  selectedShadow?: string
}


const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  fileName,
  getFileIcon,
  selectedTheme,
  selectedLanguage,
  selectedBackground,
  selectedPadding,
  isDarkMode,
  showLineNumbers,
  windowControls,
  onCodeChange,
  highlighter,
  customBackgroundColor,
  isHighlighterLoading,
  customBackgroundImage,
  selectedFont,
  selectedFontSize,
  selectedTabSize,
  supportWatermark,
  watermarkText,
  watermarkPosition = "bottom-left",
  watermarkType = "text-only",
  watermarkFontColor = "#ffffff",
  watermarkFontSize = "0.75rem",
  watermarkIcon,
  selectedShadow,
}) => {
  const [highlightedCode, setHighlightedCode] = useState("")
  const [themeBackgroundColor, setThemeBackgroundColor] = useState("#1e1e1e")
  const [, setContainerWidth] = useState(800)
  const [, setContainerHeight] = useState(300)
  const codeEditorRef = useRef<HTMLTextAreaElement>(null)
  const highlightedCodeRef = useRef<HTMLDivElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)

  const isThemeEffectivelyLight = useCallback(() => {
    // 1. Check against our known list
    if (KNOWN_LIGHT_THEMES.has(selectedTheme)) {
      return true;
    }
    // 2. Simple name check as a heuristic (optional, can be removed if list is comprehensive)
    if (selectedTheme.toLowerCase().includes('light')) {
        return true;
    }
    // 3. Fallback: If not explicitly identified as light, use the general isDarkMode prop
    //    This assumes themes not in the list or named 'light' are dark-background themes.
    return !isDarkMode;
  }, [selectedTheme, isDarkMode]);
  // --- END NEW ---
  // Helper function to check color brightness
  const isColorDark = (color: string): boolean => {
    // Simplified check (adjust thresholds/logic if needed for specific theme colors)
    if (!color) return isDarkMode; // Default based on mode if color missing

    // Handle hex colors (most common from themes)
    if (color.startsWith('#')) {
        const hex = color.substring(1);
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        // Simple brightness calculation (Luma)
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return brightness < 128; // Threshold can be adjusted (128 is midpoint)
    }

    // Handle rgb/rgba colors
    if (color.startsWith('rgb')) {
      const rgbValues = color.match(/\d+/g);
      if (rgbValues && rgbValues.length >= 3) {
        const r = parseInt(rgbValues[0]) || 0;
        const g = parseInt(rgbValues[1]) || 0;
        const b = parseInt(rgbValues[2]) || 0;
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return brightness < 128;
      }
    }
    // Fallback based on general dark mode prop
    return isDarkMode;
  }
  // --- End Helper ---
   // --- Logic to get extension and icon ---
   const getCurrentExtension = useCallback(() => {
    const parts = fileName?.split('.') ?? []; // Add null check
    return parts.length > 1 ? parts.pop()?.toLowerCase() ?? '' : '';
  }, [fileName]);

  const currentExtension = getCurrentExtension();
  const FileTypeIcon = getFileIcon(currentExtension);
  // --- End Logic ---



  const fontFamilyMap: { [key: string]: string } = {
    "jetbrains-mono": `${jetbrainsMono.style.fontFamily}, monospace`,
    "fira-code": `${firaCode.style.fontFamily}, monospace`,
    "source-code-pro": `${sourceCodePro.style.fontFamily}, monospace`,
    "ibm-plex-mono": `${ibmPlexMono.style.fontFamily}, monospace`,
    "roboto-mono": `${robotoMono.style.fontFamily}, monospace`,
    "ubuntu-mono": `${ubuntuMono.style.fontFamily}, monospace`,
    "inconsolata": `${inconsolata.style.fontFamily}, monospace`,
    "anonymous-pro": `${anonymousPro.style.fontFamily}, monospace`,
    "space-mono": `${spaceMono.style.fontFamily}, monospace`,
    "share-tech-mono": `${shareTechMono.style.fontFamily}, monospace`,
    "cutive-mono": `${cutiveMono.style.fontFamily}, monospace`,
    "overpass-mono": `${overpassMono.style.fontFamily}, monospace`,
  };
  

// Get font family based on selected font with fallbacks
const getFontFamily = () => {
  return (
    fontFamilyMap[selectedFont] ||
    `${jetbrainsMono.style.fontFamily}, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
  )
}

const getBackgroundStyle = () => {
  switch (selectedBackground) {
    case "gradient-blue":
      return {
        background: isDarkMode
          ? "linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)"
          : "linear-gradient(45deg, #e0f7ea, #b2ebf2, #80deea)",
      };
    case "gradient-purple":
      return {
        background: isDarkMode
          ? "linear-gradient(45deg, #2b213a, #4c3a51, #774c60)"
          : "linear-gradient(45deg, #f3e5f5, #e1bee7, #ce93d8)",
      };
    case "gradient-sunset":
      return { background: "linear-gradient(45deg, #ff7e5f, #feb47b)" };
    case "gradient-mint":
      return { background: "linear-gradient(45deg, #00b09b, #96c93d)" };
    case "gradient-ocean":
      return { background: "linear-gradient(45deg, #2193b0, #6dd5ed)" };
    case "gradient-blood-orange":
      return { background: "linear-gradient(45deg, #ff416c, #ff4b2b)" };
    case "gradient-dark-blue":
      return { background: "linear-gradient(45deg, #141e30, #243b55)" };
    case "gradient-cosmic":
      return { background: "linear-gradient(45deg, #ff00cc, #333399)" };

    // NEW GRADIENTS
    case "gradient-neon":
      return { background: "linear-gradient(45deg, #00f260, #0575e6)" };
    case "gradient-midnight":
      return { background: "linear-gradient(45deg, #232526, #414345)" };
    case "gradient-sakura":
      return { background: "linear-gradient(45deg, #f8cdda, #1d2b64)" };
    case "gradient-lime-aqua":
      return { background: "linear-gradient(45deg, #3ec6a8, #b5ac49)" };
    case "gradient-berry":
      return { background: "linear-gradient(45deg, #c94b4b, #4b134f)" };
    case "gradient-nord":
      return {
        background: isDarkMode
          ? "linear-gradient(45deg, #2E3440, #4C566A)"
          : "linear-gradient(45deg, #88C0D0, #E5E9F0)",
      };
    case "gradient-blush":
      return { background: "linear-gradient(45deg, #dd5e89, #f7bb97)" };
    case "gradient-carbon":
      return { background: "linear-gradient(45deg, #485563, #29323c)" };
    case "gradient-aurora":
      return { background: "linear-gradient(45deg, #00c6ff, #0072ff)" };
    case "gradient-forest":
      return { background: "linear-gradient(45deg, #5A3F37, #2C7744)" };
    case "gradient-peach":
      return { background: "linear-gradient(45deg, #ed6ea0, #ec8c69)" };

    case "solid":
      return {
        backgroundColor: customBackgroundColor || (isDarkMode ? "#1a1a1a" : "#f5f5f5"),
      };
    case "custom-image":
      return {
        backgroundImage: `url(${customBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    case "none":
    default:
      return {
        backgroundColor: "transparent",
      };
  }
};

  // Extract theme background color from highlighted HTML
  useEffect(() => {
    if (highlightedCode) {
      const bgColorMatch = highlightedCode.match(/background-color:\s*([^;]+);/)
      if (bgColorMatch && bgColorMatch[1]) {
        setThemeBackgroundColor(bgColorMatch[1])
      }
    }
  }, [highlightedCode])

  // Update highlighted code when code, theme, language, or font changes
  // Critical fix: Added selectedFont to the dependency array
// 1. First change: Update the useEffect dependency array
useEffect(() => {
  const updateHighlightedCode = async () => {
    if (!highlighter || isHighlighterLoading) return

    try {
      const html = highlighter.codeToHtml(code, {
        lang: selectedLanguage,
        theme: selectedTheme,
      })
      setHighlightedCode(html)
    } catch (error) {
      console.error("Failed to highlight code:", error)
    }
  }

  updateHighlightedCode()
}, [code, selectedTheme, selectedLanguage, highlighter, isHighlighterLoading, selectedFont]) // Add selectedFont here // Added selectedFont here

  // Auto-resize textarea based on content
  useEffect(() => {
    // Use requestAnimationFrame to avoid update loops
    const resizeEditor = () => {
      // Only proceed if refs are available
      if (!codeEditorRef.current || !highlightedCodeRef.current || !codeContainerRef.current || !mainContainerRef.current) {
        return;
      }
      
      // Reset height first to get accurate scrollHeight
      codeEditorRef.current.style.height = "auto";
      
      // Get the content width based on the longest line
      const lines = code.split("\n");
      const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b, "");
      
      // Calculate width based on font size and longest line
      // This is approximate - adjust the multiplier based on your font
      const charWidth = parseFloat(selectedFontSize) * 0.6; 
      const contentWidth = Math.max(
        800, // minimum width - make sure this is wide enough for initial render
        longestLine.length * charWidth + 64 // 64px for padding and buffer
      );
      
      // Calculate the actual content height
      const lineCount = Math.max(lines.length, 10); // Ensure minimum of 10 lines height initially
      const lineHeight = parseFloat(selectedFontSize) * 1.5;
      const minHeight = Math.max(300, lineCount * lineHeight + 32); // 32px for padding
      
      // Apply the calculated dimensions to both elements
      const finalHeight = Math.max(minHeight, codeEditorRef.current.scrollHeight);
      codeEditorRef.current.style.height = `${finalHeight}px`;
      codeEditorRef.current.style.width = `${contentWidth}px`;
      
      // Update the highlighted code div dimensions
      highlightedCodeRef.current.style.height = `${finalHeight}px`;
      highlightedCodeRef.current.style.width = `${contentWidth}px`;
      
      // Update the container dimensions as well
      codeContainerRef.current.style.height = `${finalHeight}px`;
      codeContainerRef.current.style.minHeight = `${minHeight}px`;
      codeContainerRef.current.style.width = `${contentWidth}px`;
      
      // Store dimensions for watermark positioning
      setContainerWidth(contentWidth);
      setContainerHeight(finalHeight);
    };
    
    // Initial sizing on first render
    requestAnimationFrame(resizeEditor);
    
    // Also resize after a short delay to ensure everything is rendered
    const delayedResize = setTimeout(() => {
      requestAnimationFrame(resizeEditor);
    }, 100);
    
    // Clean up timeout
    return () => clearTimeout(delayedResize);
  }, [code, selectedFontSize, selectedFont]); // Added selectedFont dependency to trigger resize on font change
  
  useLayoutEffect(() => {
    // Force initial sizing on first render
    const handleInitialSizing = () => {
      if (!codeEditorRef.current || !highlightedCodeRef.current || !codeContainerRef.current) {
        return;
      }
      
      // Set initial dimensions
      const initialWidth = 800; // Adjust to your preferred width
      const initialHeight = 300; // Adjust to your preferred height
      
      codeEditorRef.current.style.width = `${initialWidth}px`;
      codeEditorRef.current.style.height = `${initialHeight}px`;
      
      highlightedCodeRef.current.style.width = `${initialWidth}px`;
      highlightedCodeRef.current.style.height = `${initialHeight}px`;
      
      codeContainerRef.current.style.width = `${initialWidth}px`;
      codeContainerRef.current.style.height = `${initialHeight}px`;
      
      // Store dimensions for watermark positioning
      setContainerWidth(initialWidth);
      setContainerHeight(initialHeight);
    };
    
    handleInitialSizing();
    
    // Also handle after a short delay to make sure everything is rendered
    const timeoutId = setTimeout(handleInitialSizing, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Enhanced useEffect for font updates - place this after the highlighted code effect
useEffect(() => {
  if (highlightedCodeRef.current) {
    // Find all elements that might need font updates
    const preElement = highlightedCodeRef.current.querySelector('pre');
    const codeElement = highlightedCodeRef.current.querySelector('code');
    const allSpans = highlightedCodeRef.current.querySelectorAll('span');
    
    // Set the font on all elements to ensure consistency
    const styleToApply = {
      fontFamily: `${getFontFamily()} !important`,
      fontSize: selectedFontSize
    };
    
    if (preElement) {
      Object.assign(preElement.style, styleToApply);
    }
    
    if (codeElement) {
      Object.assign(codeElement.style, styleToApply);
    }
    
    // Apply font to all syntax highlighted spans
    allSpans.forEach(span => {
      span.style.fontFamily = getFontFamily();
      span.style.fontSize = selectedFontSize;
    });
  }
}, [selectedFont, selectedFontSize]);
  // Handle code change
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    onCodeChange(newCode)
  }

  // Base padding for both the highlighted code and textarea
  const basePadding = "16px"

  // Calculate padding based on line numbers visibility
  const paddingLeft = showLineNumbers ? "3em" : basePadding

  // Common styling for code and line numbers
  const commonCodeStyle = {
    fontSize: selectedFontSize,
    lineHeight: "1.5",
    fontFamily: getFontFamily(),
    tabSize: Number.parseInt(selectedTabSize),
    whiteSpace: "pre",   // Preserve whitespace
  }

  // Get watermark position style based on code container dimensions
  const getWatermarkPositionStyle = () => {
    const bottomMargin = 5; // Margin from the bottom of code container
    const sideMargin = 5; // Margin from the sides
    
    // Position the watermark relative to the main container
    // but adjust its position based on code container dimensions
    switch (watermarkPosition) {
      case "bottom-left":
        return { 
          bottom: `${bottomMargin}px`, 
          left: `${sideMargin}px` 
        };
      case "bottom-right":
        return { 
          bottom: `${bottomMargin}px`, 
          right: `${sideMargin}px` 
        };
      case "top-left":
        return { 
          top: `${bottomMargin}px`, 
          left: `${sideMargin}px` 
        };
      case "top-right":
        return { 
          top: `${bottomMargin}px`, 
          right: `${sideMargin}px` 
        };
      default:
        return { 
          bottom: `${bottomMargin}px`, 
          left: `${sideMargin}px` 
        };
    }
  };

  // Render watermark content based on type
  const renderWatermarkContent = () => {
    switch (watermarkType) {
      case "text-only":
        return <span>{watermarkText}</span>;
      case "icon-only":
        return watermarkIcon ? (
          <img 
            src={watermarkIcon} 
            alt="Watermark" 
            className="h-4 w-auto" 
          />
        ) : (
          <span>⚡</span> // Default icon if none provided
        );
      case "text-icon":
        return (
          <div className="flex items-center gap-1">
            {watermarkIcon ? (
              <img 
                src={watermarkIcon} 
                alt="" 
                className="h-4 w-auto" 
              />
            ) : (
              <span>⚡</span> // Default icon if none provided
            )}
            <span>{watermarkText}</span>
          </div>
        );
      default:
        return <span>{watermarkText}</span>;
    }
  };

  return (
    <div
      ref={mainContainerRef}
      className="w-full code-preview-container relative"
      style={{ 
        ...getBackgroundStyle(), 
        padding: `${selectedPadding}px`, 
        minHeight: "300px",
        minWidth: "924px", // Add minimum width for container
        width: "auto",     // Allow expansion
        display: "inline-block", // Ensure it grows with content
        position: "relative" // Important for absolute positioning of watermark
      }}
    >
      <div
        className="rounded-lg h-full overflow-hidden" // Added overflow-hidden to ensure rounded corners work
        style={{
          boxShadow:
            selectedShadow === "none"
              ? "none"
              : selectedShadow === "soft"
                ? "0 4px 6px rgba(0,0,0,0.1)"
                : selectedShadow === "medium"
                  ? "0 6px 12px rgba(0,0,0,0.15)"
                  : selectedShadow === "hard"
                    ? "0 10px 15px rgba(0,0,0,0.2)"
                    : "0 12px 28px rgba(0,0,0,0.25), 0 8px 10px rgba(0,0,0,0.22)", // sharp
          minWidth: "800px", // Add minimum width for inner container
          width: "auto",      // Allow expansion
          borderRadius: "8px", // Ensure consistent border radius
          position: "relative" // For absolute positioning of watermark
        }}
      >
        {/* --- REVISED Window Controls / Filename Section --- */}
        {windowControls && (
          <div
            className="flex items-center gap-2 px-3 py-2 border-b relative z-10" // Added relative and z-index
            style={{
              backgroundColor: themeBackgroundColor,
              borderColor: isThemeEffectivelyLight()
                    ? "rgba(0, 0, 0, 0.1)"     // Border for light themes
                    : "rgba(255, 255, 255, 0.15)",    // More subtle border in light
              borderTopLeftRadius: "inherit", // Inherit from parent
              borderTopRightRadius: "inherit",
              // Ensure this section doesn't shift easily
              position: 'relative', // Crucial for positioning stability
            }}
          >
            {/* Window Control Dots */}
            <div className="flex gap-1.5 flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
            </div>

            {/* Filename Tab Container - Styled like the reference image */}
            <div
              className="flex items-center flex-shrink-0 ml-2 px-2.5 py-[4px] rounded-md" // Adjusted padding/rounding
              style={{
                backgroundColor: isThemeEffectivelyLight()
                ? 'rgba(0, 0, 0, 0.05)'    // Background for light themes
                : 'rgba(255, 255, 255, 0.08)',
                minWidth: '80px', // Prevents collapsing
                maxWidth: 'calc(100% - 60px)', // Prevent overlap with dots potentially
              }}
              // Add data attribute for html2canvas debugging if needed
              data-html2canvas-ignore="false" // Explicitly include
            >
              {/* File Icon */}
              <div className="flex-shrink-0 mr-1.5 flex items-center justify-center" // Icon wrapper
                   style={{
                     // Use icon color defined in getFileIcon or default
                     filter: isColorDark(themeBackgroundColor) ? 'brightness(0.9)' : 'brightness(1.1)', // Subtle adjustment
                   }}>
                {FileTypeIcon} {/* Render the icon component */}
              </div>

              {/* Display File Name (Read-only) */}
              <span
                className="text-sm font-normal truncate filename-display-span" // Smaller font, truncate if needed
                style={{
                  color: isThemeEffectivelyLight()
                  ? 'rgba(0, 0, 0, 0.75)'     // Darker text for light themes
                  : 'rgba(255, 255, 255, 0.85)',     // Darker gray text for light themes
                  lineHeight: '1.5', // Ensure consistent line height
                }}>
                {fileName || "untitled"} {/* Show filename or placeholder */}
              </span>
            </div>
            {/* Optional: Add spacer if needed */}
            {/* <div className="flex-grow"></div> */}
          </div>
        )}
        {/* --- END REVISED Section --- */}
        <div 
          ref={codeContainerRef}
          style={{ 
            backgroundColor: themeBackgroundColor, 
            height: "auto",
            minHeight: "auto",
            width: "auto",
            minWidth:"924px",
            position: "relative",
            overflow: "visible", // Change to visible to prevent scrollbars
            borderBottomLeftRadius: "8px", // Bottom corners rounded
            borderBottomRightRadius: "8px",
            paddingTop: windowControls ? 0 : basePadding, // No extra top padding if header is present
             borderTopLeftRadius: windowControls ? "0" : "inherit", // Use inherit or specific value
            borderTopRightRadius: windowControls ? "0" : "inherit",
          }}
        >
          {isHighlighterLoading ? (
            <div className="p-4 font-mono">
              <span className="opacity-70">Loading syntax highlighter...</span>
            </div>
          ) : (
            <div 
              className="relative code-content-wrapper"
              style={{ 
                width: "auto",
                height: "auto",
                overflow: "visible", // Ensure visibility of content
              }}
            >
             <div 
              style={{ 
                position: "relative",
                width: "auto",
                height: "auto",
                overflow: "visible", // Ensure visibility of content
              }}
            >
                {/* The highlighted code display - updated to use current font */}
                <div
                  ref={highlightedCodeRef}
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{
                    zIndex: 1,
                    padding: basePadding,
                    paddingLeft: paddingLeft,
                    paddingTop: basePadding,
                    height: "auto",
                    width: "auto",
                    minWidth: "924px",
                    overflow: "visible", // Make sure overflow is visible
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightedCode
                      .replace(
                        /<pre[^>]*>/g,
                        `<pre style="margin:0;background:transparent;white-space:pre;font-family:${getFontFamily()} !important;font-size:${selectedFontSize};overflow:visible;">`,
                      )
                      .replace(
                        /<code/g,
                        `<code style="font-family:${getFontFamily()} !important;font-size:${selectedFontSize};line-height:1.5;background:transparent;display:block;white-space:pre;overflow:visible;"`,
                      ),
                  }}
                />

                {/* The editable textarea */}
                <textarea
                  ref={codeEditorRef}
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full outline-none resize-none code-editor"
                  spellCheck="false"
                  style={{
                    position: "relative",
                    zIndex: 2,
                    backgroundColor: "transparent",
                    color: "rgba(0,0,0,0)",
                    caretColor: isThemeEffectivelyLight() ? "black" : "white",
                    minHeight: "300px",
                    height: "auto",
                    width: "auto",
                    minWidth: "100%",
                    border: "none",
                    padding: basePadding,
                    paddingLeft: paddingLeft,
                    paddingTop: basePadding,
                    overflow: "visible", // Make sure overflow is visible
                    ...commonCodeStyle,
                  }}
                />

                {/* Line numbers */}
                {showLineNumbers && (
                  <div
                    className="absolute left-0 top-0 text-gray-500 text-right select-none"
                    style={{
                      zIndex: 3,
                      padding: basePadding,
                      paddingRight: "0.5em",
                      paddingLeft: "0.5em",
                      paddingTop: basePadding,
                      width: "2.5em",
                      userSelect: "none",
                      pointerEvents: "none",
                      height: "auto",
                      ...commonCodeStyle,
                    }}
                  >
                    {code.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                )}

                {/* Placeholder text */}
                {code.trim() === "" && (
                  <div
                    className="absolute left-0 top-0 pointer-events-none"
                    style={{
                      zIndex: 4,
                      color: isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
                      padding: basePadding,
                      paddingLeft: paddingLeft,
                      paddingTop: basePadding,
                      ...commonCodeStyle,
                    }}
                  >
                    Type your code here...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced watermark placed OUTSIDE the code container but still inside the main container */}
      {supportWatermark && watermarkText && (
        <div
          className="absolute pointer-events-none z-10 flex items-center"
          style={{
            ...getWatermarkPositionStyle(),
            color: watermarkFontColor,
            fontSize: watermarkFontSize,
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(3px)",
            maxWidth: "80%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {renderWatermarkContent()}
        </div>
      )}
    </div>
  )
}

export default CodePreview