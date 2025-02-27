//new code preveiw

"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type * as shiki from "shiki"

interface CodePreviewProps {
  code: string
  fileName: string
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
  selectedShadow?: string
}

const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  fileName,
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
  selectedShadow,
}) => {
  const [highlightedCode, setHighlightedCode] = useState("")
  const [themeBackgroundColor, setThemeBackgroundColor] = useState("#1e1e1e")
  const codeEditorRef = useRef<HTMLTextAreaElement>(null)
  const highlightedCodeRef = useRef<HTMLDivElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)

  const fontFamilyMap: { [key: string]: string } = {
    "source-code-pro": "'Source Code Pro', monospace",
    "fira-code": "'Fira Code', monospace",
    "jetbrains-mono": "'JetBrains Mono', monospace",
    "cascadia-code": "'Cascadia Code', monospace",
    "roboto-mono": "'Roboto Mono', monospace",
    "ubuntu-mono": "'Ubuntu Mono', monospace",
    "ibm-plex-mono": "'IBM Plex Mono', monospace",
    "inconsolata": "'Inconsolata', monospace",
    "anonymous-pro": "'Anonymous Pro', monospace",
    "hack": "'Hack', monospace",
    "monoid": "'Monoid', monospace",
    "consolas": "'Consolas', monospace",
    "menlo": "'Menlo', monospace",
  }

  // Get font family based on selected font
  const getFontFamily = () => {
    return (
      fontFamilyMap[selectedFont] ||
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    )
  }

  // Get background style
  const getBackgroundStyle = () => {
    switch (selectedBackground) {
      case "leaves":
        return {
          backgroundImage: 'url("/api/placeholder/800/600")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "gradient-blue":
        return {
          background: isDarkMode
            ? "linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)"
            : "linear-gradient(45deg, #e0f7ea, #b2ebf2, #80deea)",
        }
      case "gradient-purple":
        return {
          background: isDarkMode
            ? "linear-gradient(45deg, #2b213a, #4c3a51, #774c60)"
            : "linear-gradient(45deg, #f3e5f5, #e1bee7, #ce93d8)",
        }
      case "gradient-sunset":
        return {
          background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
        }
      case "gradient-mint":
        return {
          background: "linear-gradient(45deg, #00b09b, #96c93d)",
        }
      case "gradient-ocean":
        return {
          background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
        }
      case "gradient-blood-orange":
        return {
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
        }
      case "gradient-dark-blue":
        return {
          background: "linear-gradient(45deg, #141e30, #243b55)",
        }
      case "gradient-cosmic":
        return {
          background: "linear-gradient(45deg, #ff00cc, #333399)",
        }
      case "geometric":
        return {
          backgroundImage: 'url("/api/placeholder/800/600")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "solid":
        return {
          backgroundColor: customBackgroundColor || (isDarkMode ? "#1a1a1a" : "#f5f5f5"),
        }
      case "custom-image":
        return {
          backgroundImage: `url(${customBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      case "none":
      default:
        return {
          backgroundColor: "transparent",
        }
    }
  }

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
  }, [code, selectedTheme, selectedLanguage, highlighter, isHighlighterLoading, selectedFont])

  // Auto-resize textarea based on content
  useEffect(() => {
    if (codeEditorRef.current && highlightedCodeRef.current) {
      // Reset height first to get accurate scrollHeight
      codeEditorRef.current.style.height = "auto"
      
      // Calculate the actual content height based on the content and font size
      const lineCount = code.split("\n").length
      const lineHeight = parseFloat(selectedFontSize) * 1.5
      const minHeight = Math.max(300, lineCount * lineHeight + 32) // 32px for padding
      
      // Apply the calculated height to both elements
      const finalHeight = Math.max(minHeight, codeEditorRef.current.scrollHeight)
      codeEditorRef.current.style.height = `${finalHeight}px`
      
      // Also update the highlighted code div height
      if (highlightedCodeRef.current) {
        highlightedCodeRef.current.style.height = `${finalHeight}px`
      }
      
      // Update the container heights as well
      if (codeContainerRef.current) {
        codeContainerRef.current.style.height = `${finalHeight}px`
        codeContainerRef.current.style.minHeight = `${minHeight}px`
      }
    }
  }, [code, selectedFontSize])

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
    // Add these properties to ensure text appears correctly with larger font sizes
    overflow: "visible", // Allow content to expand beyond boundaries
    whiteSpace: "pre",   // Preserve whitespace

  }

  return (
    <div
      className="w-full code-preview-container"
      style={{ 
        ...getBackgroundStyle(), 
        padding: `${selectedPadding}px`, 
        minHeight: "300px",
        width: "100%",
      }}
    >
        <div
        className="rounded-lg h-full"
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
        }}
      >
        {windowControls && (
          <div
            className="flex items-center gap-1.5 px-4 py-2 border-b"
            style={{
              backgroundColor: themeBackgroundColor,
              borderColor: isDarkMode ? "rgba(55, 65, 81, 0.5)" : "rgba(229, 231, 235, 0.5)",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-sm text-gray-500 opacity-80" >
              {fileName}
            </span>
          </div>
        )}

        <div 
          ref={codeContainerRef}
          style={{ 
            backgroundColor: themeBackgroundColor, 
            height: "auto",
            minHeight: "auto",
            width: "100%",
            position: "relative",
            overflow: "hidden", // Hide scrollbar
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
              }}
            >
              <div 
                style={{ 
                  position: "relative",
                  width: "auto",
                  height: "auto",
                }}
              >
                {/* The highlighted code display */}
                <div
                  ref={highlightedCodeRef}
                  className="absolute top-0 left-0 w-full pointer-events-none"
                  style={{
                    zIndex: 1,
                    padding: basePadding,
                    paddingLeft: paddingLeft,
                    height: "auto",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightedCode
                      .replace(
                        /<pre[^>]*>/g,
                        `<pre style="margin:0;background:transparent;white-space:pre;font-family:${getFontFamily()};font-size:${selectedFontSize};overflow:visible;">`,
                      )
                      .replace(
                        /<code/g,
                        `<code style="font-family:${getFontFamily()};font-size:${selectedFontSize};line-height:1.5;background:transparent;display:block;white-space:pre;overflow:visible;"`,
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
                    caretColor: isDarkMode ? "white" : "black",
                    minHeight: "300px",
                    height: "auto",
                    minWidth:"800px",
                    width:"auto",
                    border: "none",
            
                    padding: basePadding,
                    paddingLeft: paddingLeft,

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

      {supportWatermark && watermarkText && (
        <div
          className="absolute bottom-2 right-2 text-xs opacity-70"
          style={{
            color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {watermarkText}
        </div>
      )}
    </div>
  )
}

export default CodePreview

