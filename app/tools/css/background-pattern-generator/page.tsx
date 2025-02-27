'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, Button, Select, SelectItem, Input } from "@nextui-org/react";
import { Copy, Download, RefreshCw, Undo2, Shuffle, Eye, EyeOff, Code } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ToolLayout from '@/components/ToolLayout';

// Import patterns from the separate file
import { patterns } from './patterns';

// Define types for state variables
type HistoryItem = string;

const PatternGenerator = () => {
  const [selectedPattern, setSelectedPattern] = useState("checks");
  const [patternColor, setPatternColor] = useState("#474bff");
  const [backgroundColor, setBackgroundColor] = useState("#47d3ff");
  const [patternSize, setPatternSize] = useState(32);
  const [lineWidth, setLineWidth] = useState(2);
  const [dotSize, setDotSize] = useState(5);
  const [cssOutput, setCssOutput] = useState("");
  const [previewStyle, setPreviewStyle] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [includeBackgroundColor, setIncludeBackgroundColor] = useState(true);

  // Generate CSS for the selected pattern
  const generateCSS = useCallback(() => {
    const pattern = patterns.find(p => p.value === selectedPattern);
    if (!pattern) return {};

    // Pass additional parameters for patterns that support them
    const cssProps = pattern.generateCSS(
      patternColor, 
      backgroundColor, 
      patternSize,
      pattern.supportsLineWidth ? lineWidth : undefined,
      pattern.supportsDotSize ? dotSize : undefined
    );
    
    // Format the CSS output in the requested format
    let formattedCSS = `**background-image**: ${cssProps.backgroundImage}; 
**background-position**: ${cssProps.backgroundPosition}; 
**background-size**: ${cssProps.backgroundSize};`;

    if (includeBackgroundColor) {
      formattedCSS += `\n**background-color**: ${backgroundColor};`;
    }
    
    setCssOutput(formattedCSS.trim());
    
    return cssProps;
  }, [selectedPattern, patternColor, backgroundColor, patternSize, lineWidth, dotSize, includeBackgroundColor]);

  // Update preview and CSS output when settings change
  useEffect(() => {
    const styleProps = generateCSS();
    setPreviewStyle(styleProps);
  }, [selectedPattern, patternColor, backgroundColor, patternSize, lineWidth, dotSize, includeBackgroundColor, generateCSS]);

  const addToHistory = useCallback((css: string) => {
    setHistory(prev => [...prev, css]);
    setHistoryIndex(prev => prev + 1);
  }, []);

  const handleApplyPattern = useCallback(() => {
    addToHistory(cssOutput);
    toast.success('Pattern applied successfully');
  }, [cssOutput, addToHistory]);

  const handleCopy = useCallback(() => {
    const plainCSS = cssOutput.replace(/\*\*/g, '');
    navigator.clipboard.writeText(plainCSS);
    toast.success('CSS copied to clipboard');
  }, [cssOutput]);

  const handleDownload = useCallback(() => {
    const plainCSS = cssOutput.replace(/\*\*/g, '');
    const blob = new Blob([plainCSS], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPattern}-pattern.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('CSS downloaded successfully');
  }, [cssOutput, selectedPattern]);

  const handleShuffleColors = useCallback(() => {
    const getRandomColor = () => {
      return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    };
    
    setPatternColor(getRandomColor());
    setBackgroundColor(getRandomColor());
    toast.success('Colors shuffled');
  }, []);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setCssOutput(history[historyIndex - 1]);
      toast.success('Undo successful');
    } else {
      toast.error('No more undo history');
    }
  }, [history, historyIndex]);

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev);
    toast.success(isFullscreen ? 'Exited fullscreen mode' : 'Entered fullscreen mode');
  }, [isFullscreen]);

  const handleClear = useCallback(() => {
    setSelectedPattern("checks");
    setPatternColor("#474bff");
    setBackgroundColor("#47d3ff");
    setPatternSize(32);
    setLineWidth(2);
    setDotSize(5);
    setHistory([]);
    setHistoryIndex(-1);
    toast.success('Settings reset to default');
  }, []);

  const handleToggleBackgroundColor = useCallback(() => {
    setIncludeBackgroundColor(prev => !prev);
    toast.success(includeBackgroundColor ? 'Background color removed' : 'Background color added');
  }, [includeBackgroundColor]);

  // Get current pattern to determine which controls to show
  const currentPattern = patterns.find(p => p.value === selectedPattern);

  return (
    <ToolLayout
      title="CSS Background Pattern Generator"
      description="Create beautiful CSS background patterns with our powerful generator tool. Choose from multiple patterns, customize colors, and download your CSS code."
      toolId="background-pattern"
    >
      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview Section - Left side */}
        <div className="flex flex-col gap-8">
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-lg font-medium text-default-700">Pattern Preview:</label>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={handleFullscreenToggle}
                  aria-label="Toggle fullscreen preview"
                >
                  {isFullscreen ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
              <div 
                className={`w-full border border-default-200 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'aspect-square rounded-lg shadow-md'}`}
                style={previewStyle}
              ></div>
            </CardBody>
          </Card>

        
        </div>

        {/* Settings Section - Right side */}
        <div className="flex flex-col gap-8">
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <label className="block text-lg font-medium text-default-700 mb-4">Pattern Settings:</label>
              
              <div className="mb-4">
                <Select
                  label="Pattern Type"
                  className="w-full"
                  variant="bordered"
                  selectedKeys={[selectedPattern]}
                  onChange={(e) => setSelectedPattern(e.target.value)}
                  classNames={{
                    trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                  }}
                >
                  {patterns.map((pattern) => (
                    <SelectItem key={pattern.value} value={pattern.value} className="text-default-700">
                      {pattern.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-default-700 mb-2">Pattern Color</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={patternColor}
                      onChange={(e) => setPatternColor(e.target.value)}
                      className="w-16 h-10 p-0 border-none"
                    />
                    <Input
                      type="text"
                      value={patternColor}
                      onChange={(e) => setPatternColor(e.target.value)}
                      className="flex-1"
                      variant="bordered"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-default-700 mb-2">Background Color</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-0 border-none"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                      variant="bordered"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-default-700 mb-2">
                  Pattern Size: {patternSize}px
                </label>
                <input
                  type="range"
                  min="8"
                  max="128"
                  step="1"
                  value={patternSize}
                  onChange={(e) => setPatternSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Conditional rendering for line width setting */}
              {currentPattern?.supportsLineWidth && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-default-700 mb-2">
                    Line Width: {lineWidth}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
              
              {/* Conditional rendering for dot size setting */}
              {currentPattern?.supportsDotSize && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-default-700 mb-2">
                    Dot Size: {dotSize}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={dotSize}
                    onChange={(e) => setDotSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
              
              <Button
                onClick={handleApplyPattern}
                className="w-full mb-4"
                color="primary"
                startContent={<Code className="h-5 w-5" />}
              >
                Generate CSS
              </Button>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button color="primary" onClick={handleCopy} startContent={<Copy className="h-4 w-4" />}>
                  Copy CSS
                </Button>
                <Button color="primary" onClick={handleDownload} startContent={<Download className="h-4 w-4" />}>
                  Download CSS
                </Button>
                <Button color="primary" onClick={handleShuffleColors} startContent={<Shuffle className="h-4 w-4" />}>
                  Shuffle Colors
                </Button>
                <Button 
                  color="primary" 
                  onClick={handleToggleBackgroundColor} 
                  startContent={<Code className="h-4 w-4" />}
                  variant={includeBackgroundColor ? "solid" : "bordered"}
                >
                  {includeBackgroundColor ? "Hide BG Color" : "Show BG Color"}
                </Button>
                <Button
                  color="default"
                  onClick={handleUndo}
                  isDisabled={historyIndex <= 0}
                  startContent={<Undo2 className="h-4 w-4" />}
                >
                  Undo
                </Button>
                <Button color="danger" onClick={handleClear} startContent={<RefreshCw className="h-4 w-4" />}>
                  Reset
                </Button>
              </div>
            </CardBody>
            
          </Card>
          
        </div>
        
      </div>
    </ToolLayout>
  );
};

export default PatternGenerator;