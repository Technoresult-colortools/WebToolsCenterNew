import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';

export type BackgroundType = 'none' | 'gradient' | 'solid' | 'image';
export type WatermarkPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface CodePreviewProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  theme: string;
  fileName: string;
  backgroundType: BackgroundType;
  gradient: string;
  solidColor: string;
  backgroundImage: string | null;
  watermark: boolean;
  watermarkText: string;
  watermarkPosition: WatermarkPosition;
  padding: number;
  fontFamily: string;
  fontSize: number;
  showLineNumbers: boolean;
  isFullscreen?: boolean;
}

const getThemeStyle = (themeName: string) => {
  return (prismStyles as Record<string, { [key: string]: React.CSSProperties }>)[themeName] || prismStyles.atomDark;
};

const CodePreview = forwardRef<HTMLDivElement, CodePreviewProps>(
  ({
    code,
    onCodeChange,
    language,
    theme,
    fileName,
    backgroundType,
    gradient,
    solidColor,
    backgroundImage,
    watermark,
    watermarkText,
    watermarkPosition,
    padding,
    fontFamily,
    fontSize,
    showLineNumbers,
    isFullscreen = false
  }, ref) => {
    const themeStyle = getThemeStyle(theme);
    const editorBackground = themeStyle['pre[class*="language-"]']?.background || '#282c34';
    const textColor = themeStyle['pre[class*="language-"]']?.color || '#abb2bf';
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.caretColor = textColor;
      }
    }, [textColor]);

    useEffect(() => {
      const updateScale = () => {
        if (previewRef.current && containerRef.current) {
          const containerHeight = isFullscreen ? window.innerHeight : 400;
          const containerWidth = isFullscreen ? window.innerWidth : containerRef.current.offsetWidth;
          const contentHeight = previewRef.current.scrollHeight;
          const contentWidth = previewRef.current.scrollWidth;

          const heightScale = containerHeight / contentHeight;
          const widthScale = containerWidth / contentWidth;
          
          const newScale = Math.min(
            heightScale,
            widthScale,
            1
          );

          setScale(newScale * 0.9); // 90% of the calculated scale for some padding
        }
      };

      updateScale();
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }, [isFullscreen, code]);

    const getContainerStyle = () => {
      const baseStyle: React.CSSProperties = {
        padding: `${padding}px`,
        height: isFullscreen ? '100vh' : 'auto',
        minHeight: isFullscreen ? '100vh' : '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      };

      switch (backgroundType) {
        case 'solid':
          return { ...baseStyle, backgroundColor: solidColor };
        case 'gradient':
          return { ...baseStyle, backgroundImage: gradient };
        case 'image':
          return backgroundImage
            ? {
                ...baseStyle,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : baseStyle;
        default:
          return baseStyle;
      }
    };

    const getWatermarkPositionClass = (position: WatermarkPosition): string => {
      const positions: Record<WatermarkPosition, string> = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4'
      };
      return positions[position];
    };

    return (
      <div 
        ref={containerRef}
        className="w-full h-full"
        style={getContainerStyle()}
      >
        <div 
          ref={ref}
          className="relative w-full max-w-5xl mx-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease'
          }}
        >
          <div 
            ref={previewRef}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-700 flex items-center px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-gray-400 ml-4">{fileName}</span>
            </div>

            {/* Code Area */}
            <div 
              className="relative"
              style={{ 
                background: editorBackground,
              }}
            >
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                spellCheck="false"
                className="absolute inset-0 w-full h-full resize-none bg-transparent text-transparent caret-white focus:outline-none z-10 p-4 font-mono"
                style={{
                  fontFamily: `"${fontFamily}", monospace`,
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.5',
                  tabSize: '2',
                }}
              />
              
              <SyntaxHighlighter
                language={language}
                style={themeStyle}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  fontFamily: `"${fontFamily}", monospace`,
                  fontSize: `${fontSize}px`,
                  minHeight: '100%',
                  overflow: 'visible',
                }}
                showLineNumbers={showLineNumbers}
                wrapLines
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Watermark */}
          {watermark && (
            <div className={`absolute ${getWatermarkPositionClass(watermarkPosition)} text-white text-sm opacity-50`}>
              {watermarkText}
            </div>
          )}
        </div>
      </div>
    );
  }
);

CodePreview.displayName = 'CodePreview';

export default CodePreview;