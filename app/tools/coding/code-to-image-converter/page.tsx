'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Card, 
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tabs,
  Tab,
  Textarea,
  ModalContent,
  Modal
} from "@nextui-org/react";
import { Toaster, toast } from 'react-hot-toast';
import { 
  Download, 
  Maximize2, 
  X, 
  Copy, 
  RefreshCw, 
  Info, 
  BookOpen, 
  Lightbulb,
  Code2,
  Settings,
  AlertTriangle,
  Shield,
  Type,
  Image as ImageIcon,
  Palette,
  Monitor
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toPng, toJpeg, toSvg } from 'html-to-image'
import ToolLayout from '@/components/ToolLayout';

// Import your constants
import { languages } from './languages';
import { themes } from './themes';
import { gradients } from './gradients';
import { fontFamilies } from './fonts';


type BackgroundType = 'none' | 'gradient' | 'solid' | 'image';
type ExportFormat = 'png' | 'jpeg' | 'svg';

function CodeToImageConverter() {
  // State management (same as before)
  const [language, setLanguage] = useState(languages[0].value);
  const [theme, setTheme] = useState(themes[0].value);
  const [fileName, setFileName] = useState('example.js');
  const [code, setCode] = useState('// Write your code here\nfunction greet() {\n  console.log("Hello, World!");\n}\n\ngreet();');
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('gradient');
  const [gradient, setGradient] = useState(gradients[0].value);
  const [solidColor, setSolidColor] = useState('#ffffff');
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [layout, setLayout] = useState('compact');
  const [watermark, setWatermark] = useState(false);
  const [watermarkText, setWatermarkText] = useState('Generated by Code to Image Converter');
  const [watermarkPosition, setWatermarkPosition] = useState('bottom-right');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontFamily, setFontFamily] = useState(fontFamilies[0].value);
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(2);
  const [imageQuality, setImageQuality] = useState(1);
  const [padding, setPadding] = useState(16);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [useCustomSize, setUseCustomSize] = useState(false);

  const codeContainerRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    if (codeContainerRef.current) {
      try {
        let dataUrl: string;
        const options = {
          quality: 1,
          pixelRatio: imageQuality,
          skipAutoScale: true,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },
          width: useCustomSize ? customWidth : undefined,
          height: useCustomSize ? customHeight : undefined,
        };

        switch (exportFormat) {
          case 'jpeg':
            dataUrl = await toJpeg(codeContainerRef.current, options);
            break;
          case 'svg':
            dataUrl = await toSvg(codeContainerRef.current, options);
            break;
          default:
            dataUrl = await toPng(codeContainerRef.current, options);
        }
        
        const link = document.createElement('a');
        link.download = `${fileName.split('.')[0]}_code.${exportFormat}`;
        link.href = dataUrl;
        link.click();
        toast.success('Image exported successfully!');
      } catch (error) {
        console.error('Error exporting image:', error);
        toast.error('Failed to export image. Please try again.');
      }
    }
  }, [codeContainerRef, imageQuality, fileName, exportFormat, useCustomSize, customWidth, customHeight]);


  const handleCopyToClipboard = useCallback(async () => {
    if (codeContainerRef.current) {
      try {
        const dataUrl = await toPng(codeContainerRef.current, {
          quality: 1,
          pixelRatio: imageQuality,
          skipAutoScale: true,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },
          width: useCustomSize ? customWidth : undefined,
          height: useCustomSize ? customHeight : undefined,
        });
        
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success('Image copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy image to clipboard. Please try again.');
      }
    }
  }, [codeContainerRef, imageQuality, useCustomSize, customWidth, customHeight]);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const getThemeStyle = (themeName: string) => {
    return (prismStyles as Record<string, { [key: string]: React.CSSProperties }>)[themeName] || prismStyles.atomDark;
  };

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
        setBackgroundType('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundImage(event.target.value);
    setBackgroundType('image');
  };

  const handleShuffleImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const newImageUrl = `https://picsum.photos/seed/${randomId}/600/400`;
    setBackgroundImage(newImageUrl);
    setBackgroundType('image');
  };

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'gradient':
        // Directly use the gradient value as a background image
        return `bg-gradient-to-r`;
      case 'solid':
        return `bg-[${solidColor}]`;
      case 'image':
        return 'bg-cover bg-center';
      default:
        return 'bg-transparent';
    }
  };

  const getWatermarkPosition = () => {
    switch (watermarkPosition) {
      case 'top-left': return 'top-4 left-4';
      case 'top-right': return 'top-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      default: return 'bottom-4 right-4';
    }
  };

  useEffect(() => {
    const loadFonts = async () => {
      // Use proper Google Fonts URLs
      const fonts = {
        'Source Code Pro': 'Source+Code+Pro:400,700',
        'Fira Code': 'Fira+Code:400,700',
        'JetBrains Mono': 'JetBrains+Mono:400,700',
        'Ubuntu Mono': 'Ubuntu+Mono:400,700',
        'Inconsolata': 'Inconsolata:400,700',
        'Roboto Mono': 'Roboto+Mono:400,700',
        'Anonymous Pro': 'Anonymous+Pro:400,700',
        'Space Mono': 'Space+Mono:400,700',
        'IBM Plex Mono': 'IBM+Plex+Mono:400,700',
      };
  
      for (const [fontName, fontPath] of Object.entries(fonts)) {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontPath}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    };
  
    loadFonts();
  }, []);


  const renderCodePreview = () => (
    <div className="relative">
      <div
        ref={codeContainerRef}
        className={`overflow-hidden rounded-lg ${getBackgroundStyle()}`}
        style={{
          padding: `${padding}px`,
          ...(backgroundType === 'gradient' 
            ? { backgroundImage: gradient } 
            : {}),
          ...(backgroundType === 'image' && backgroundImage 
            ? { backgroundImage: `url(${backgroundImage})` } 
            : {}),
          ...(backgroundType === 'solid' 
            ? { backgroundColor: solidColor } 
            : {}),
          transformOrigin: 'top left',
        }}
      >
        <div className={`bg-gray-800 rounded-lg overflow-hidden ${
          layout === 'compact' ? 'w-full' : 
          layout === 'square' ? 'aspect-square' : 
          'w-full aspect-video'
        }`}>
          <div className="flex items-center justify-start px-4 py-2 bg-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-sm text-gray-400">{fileName}</span>
          </div>
          <div className="overflow-auto max-h-[400px]">
          <SyntaxHighlighter
            language={language}
            style={getThemeStyle(theme)}
            customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontFamily: `"${fontFamily}", monospace`, // Add quotes and fallback
                fontSize: `${fontSize}px`,
            }}
            showLineNumbers
            wrapLines
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
        {watermark && (
          <div className={`absolute ${getWatermarkPosition()} text-white text-sm opacity-50`}>
            {watermarkText}
          </div>
        )}
      </div>
      
      {/* Fullscreen button integrated into preview */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button 
          isIconOnly 
          variant="flat" 
          color="primary" 
          onClick={() => setIsFullscreen(true)}
        >
          <Maximize2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderFullscreenPreview = () => (
    <Modal
      isOpen={isFullscreen}
      onOpenChange={setIsFullscreen}
      size="full"
      classNames={{
        base: "bg-black/50 backdrop-blur-md",
        wrapper: "max-w-full h-full",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-[90%] h-[90%] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl relative">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="w-full h-full flex items-center justify-center p-8">
                {renderCodePreview()}
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
      description="Transform your code snippets into beautiful, shareable images with syntax highlighting and customizable styles."
      toolId="678f382e26f06f912191bcb6"
    >
      <div className="flex flex-col gap-8">
        {/* Preview Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Preview</h2>
            </div>
            
            <div className="relative mb-4">
              {renderCodePreview()}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                color="success"
                onClick={handleExport}
                startContent={<Download className="w-4 h-4" />}
              >
                Export Image
              </Button>
              <Button
                color="secondary"
                onClick={handleCopyToClipboard}
                startContent={<Copy className="w-4 h-4" />}
              >
                Copy to Clipboard
              </Button>
            </div>
          </CardBody>
        </Card>
        {/* Code Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Code Input</h2>
            </div>
            
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here..."
              minRows={5}
              size="lg"
              variant="bordered"
              className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-default-700 mb-2">Language</p>
                <Select
                  selectedKeys={[language]}
                  variant='bordered'
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-default-700">
                      {lang.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <p className="text-default-700 mb-2">Theme</p>
                <Select
                  selectedKeys={[theme]}
                  onChange={(e) => setTheme(e.target.value)}
                  variant='bordered'
                >
                  {themes.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-default-700">
                      {t.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

       

        {/* Style Options */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs aria-label="Code to Image options">
              <Tab 
                key="style" 
                title={
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <span>Style</span>
                  </div>
                }
              >
                <div className="space-y-4 py-4">
                  {/* Background settings */}
                  <div>
                    <p className="text-default-700 mb-2">Background Type</p>
                    <Select
                      selectedKeys={[backgroundType]}
                      onChange={(e) => setBackgroundType(e.target.value as BackgroundType)}
                      variant='bordered'
                    >
                      <SelectItem key="none" value="none" className="text-default-700">None</SelectItem>
                      <SelectItem key="gradient" value="gradient" className="text-default-700">Gradient</SelectItem>
                      <SelectItem key="solid" value="solid" className="text-default-700">Solid Color</SelectItem>
                      <SelectItem key="image" value="image" className="text-default-700">Image</SelectItem>
                    </Select>
                  </div>

                  {/* Conditional background options */}
                  {backgroundType === 'gradient' && (
                    <div>
                      <p className="text-default-700 mb-2">Gradient</p>
                      <Select
                        selectedKeys={[gradient]}
                        onChange={(e) => setGradient(e.target.value)}
                        variant='bordered'
                      >
                        {gradients.map((g) => (
                          <SelectItem key={g.value} value={g.value} className="text-default-700">
                            {g.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}

                  {backgroundType === 'solid' && (
                    <div>
                      <p className="text-default-700 mb-2">Color</p>
                      <Input
                        type="color"
                        value={solidColor}
                        variant='bordered'
                        className='w-1/6'
                        onChange={(e) => setSolidColor(e.target.value)}
                      />
                    </div>
                  )}

                  {backgroundType === 'image' && (
                    <div className="space-y-2">
                      <p className="text-default-700 mb-2">Background Image</p>
                      <Input
                        type="file"
                        onChange={handleBackgroundImageUpload}
                        variant='bordered'
                        accept="image/*"
                      />
                      <Input
                        type="text"
                        placeholder="Or enter image URL"
                        variant='bordered'
                        onChange={handleBackgroundImageURL}
                      />
                      <Button
                        color="primary"
                        onClick={handleShuffleImage}
                        startContent={<RefreshCw className="w-4 h-4" />}
                      >
                        Random Image
                      </Button>
                    </div>
                  )}

                  {/* Font settings */}
                  <div>
                    <p className="text-default-700 mb-2">Font Family</p>
                    <Select
                      selectedKeys={[fontFamily]}
                      onChange={(e) => setFontFamily(e.target.value)}
                      variant='bordered'
                    >
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.value} value={font.value} className="text-default-700">
                          {font.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <p className="text-default-700 mb-2">Font Size: {fontSize}px</p>
                    <Slider
                    value={fontSize}
                    onChange={(value) => setFontSize(value as number)}
                    minValue={8}
                    maxValue={24}
                    step={1}
                    />
                  </div>

                  <div>
                    <p className="text-default-700 mb-2">Padding: {padding}px</p>
                    <Slider
                    value={padding}
                    onChange={(value) => setPadding(value as number)}
                    minValue={0}
                    maxValue={64}
                    step={4}
                />
                  </div>
                </div>
              </Tab>

              <Tab 
                key="settings" 
                title={
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                }
              >
                <div className="space-y-4 py-4">
                  <div>
                    <p className="text-default-700 mb-2">Layout</p>
                    <Select
                      selectedKeys={[layout]}
                      onChange={(e) => setLayout(e.target.value)}
                      variant='bordered'
                    >
                      <SelectItem key="compact" value="compact" className="text-default-700">Compact</SelectItem>
                      <SelectItem key="square" value="square" className="text-default-700">Square</SelectItem>
                      <SelectItem key="wide" value="wide" className="text-default-700">Wide</SelectItem>
                    </Select>
                  </div>

                  <div>
                    <p className="text-default-700 mb-2">Tab Size: {tabSize} spaces</p>
                    <Slider
                        value={tabSize}
                        onChange={(value) => setTabSize(value as number)}
                        minValue={2}
                        maxValue={8}
                        step={2}
                        />

                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      isSelected={watermark}
                      onValueChange={setWatermark}
                    />
                    <p className="text-default-700">Show Watermark</p>
                  </div>

                  {watermark && (
                    <>
                      <div>
                        <p className="text-default-700 mb-2">Watermark Text</p>
                        <Input
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          variant='bordered'
                        />
                      </div>
                      <div>
                        <p className="text-default-700 mb-2">Watermark Position</p>
                        <Select
                          selectedKeys={[watermarkPosition]}
                          onChange={(e) => setWatermarkPosition(e.target.value)}
                          variant='bordered'
                        >
                          <SelectItem key="top-left" value="top-left" className="text-default-700">Top Left</SelectItem>
                          <SelectItem key="top-right" value="top-right" className="text-default-700">Top Right</SelectItem>
                          <SelectItem key="bottom-left" value="bottom-left" className="text-default-700">Bottom Left</SelectItem>
                          <SelectItem key="bottom-right" value="bottom-right" className="text-default-700">Bottom Right</SelectItem>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              </Tab>

              <Tab 
                key="export" 
                title={
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </div>
                }
              >
                <div className="space-y-4 py-4">
                  <div>
                    <p className="text-default-700 mb-2">Export Format</p>
                    <Select
                      selectedKeys={[exportFormat]}
                      onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                      variant='bordered'
                    >
                      <SelectItem key="png" value="png" className="text-default-700">PNG</SelectItem>
                      <SelectItem key="jpeg" value="jpeg" className="text-default-700">JPEG</SelectItem>
                      <SelectItem key="svg" value="svg" className="text-default-700">SVG</SelectItem>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      isSelected={useCustomSize}
                      onValueChange={setUseCustomSize}
                    />
                    <p className="text-default-700">Use Custom Size</p>
                  </div>

                  {useCustomSize && (
                    <>
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-default-700 mb-2">Width (px)</p>
                            <Input
                            type="number"
                            value={customWidth.toString()}
                            onChange={(e) => setCustomWidth(Number(e.target.value))}
                            variant="bordered"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-default-700 mb-2">Height (px)</p>
                            <Input
                            type="number"
                            value={customHeight.toString()}
                            onChange={(e) => setCustomHeight(Number(e.target.value))}
                            variant="bordered"
                            />
                        </div>
                        </div>

                    </>
                  )}

                  <div>
                    <p className="text-default-700 mb-2">Image Quality: {imageQuality}x</p>
                    <Slider
                    value={imageQuality}
                    onChange={(value) => setImageQuality(value as number)}
                    minValue={1}
                    maxValue={4}
                    step={1}
                    />

                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Info Section */}
         {/* Info Section */}
         <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <CardBody>
            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the Code to Image Converter?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              The Code to Image Converter is a powerful tool designed to transform your code snippets into visually
              appealing and shareable images. It's perfect for developers, programmers, and educators who want to
              showcase their code in a more engaging and professional manner.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Whether you're creating tutorials, sharing on social media, or enhancing your documentation, our Code to
              Image Converter provides you with a range of customization options to make your code stand out.
            </p>

            <h2
              id="how-to-use"
              className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use the Code to Image Converter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Enter or paste your code into the provided text area.</li>
              <li>Select the programming language for proper syntax highlighting.</li>
              <li>Choose a theme that complements your code and preferences.</li>
              <li>Customize the background, font, and other styling options as desired.</li>
              <li>Adjust export settings such as image format and social media size.</li>
              <li>Preview your code image in real-time as you make adjustments.</li>
              <li>Click the "Export Image" button to download your code as an image file.</li>
              <li>Alternatively, use the "Copy to Clipboard" feature for quick sharing.</li>
            </ol>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Support for multiple programming languages with syntax highlighting</li>
              <li>Wide range of themes to suit different visual preferences</li>
              <li>Customizable backgrounds including gradients and solid colors</li>
              <li>Font customization options</li>
              <li>Export in multiple formats (PNG, JPEG, SVG)</li>
              <li>Social media size presets for optimal sharing</li>
              <li>Optional watermark with customizable text</li>
              <li>Adjustable padding and font size</li>
              <li>Real-time preview of the generated image</li>
              <li>Fullscreen preview mode for detailed inspection</li>
              <li>One-click copy to clipboard functionality</li>
            </ul>
          </CardBody>
        </Card>

      </div>
      {renderFullscreenPreview()}

    </ToolLayout>
  );
}

export default CodeToImageConverter;