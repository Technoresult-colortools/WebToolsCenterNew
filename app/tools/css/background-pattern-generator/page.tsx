"use client"
import type React from "react"
import { useState, useMemo, useCallback } from "react"
import { Card, CardBody, Button, Select, SelectItem, Slider, Modal, ModalContent, ModalBody } from "@nextui-org/react"
import {
  Copy,
  Shuffle,
  RefreshCcw,
  Square,
  Circle,
  Grid,
  Maximize2,
  Minimize2,
  Download,
  Hexagon,
  Triangle,
  Waves,
  Leaf,
  Box,
  Cpu,
  BookOpen,
  Info,
  Lightbulb,
  X,
} from "lucide-react"
import { toast } from "react-hot-toast"
import type { ShapesData } from "./types"
import shapesData from "./shapes.json"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

const COLOR_PALETTES = [
  {
    name: "Ocean",
    colors: ["#474bff", "#47d3ff"],
    description: "Cool ocean tones",
    tags: ["blue", "cool"],
  },
  {
    name: "Forest",
    colors: ["#2ecc71", "#27ae60"],
    description: "Natural green tones",
    tags: ["green", "nature"],
  },
  {
    name: "Sunset",
    colors: ["#ff6b6b", "#ffd93d"],
    description: "Warm sunset colors",
    tags: ["warm", "orange"],
  },
  {
    name: "Monochrome",
    colors: ["#333333", "#f5f5f5"],
    description: "Classic black and white",
    tags: ["neutral", "basic"],
  },
  {
    name: "Lavender",
    colors: ["#9b5de5", "#f15bb5"],
    description: "Soft and dreamy purples",
    tags: ["purple", "soft"],
  },
  {
    name: "Autumn",
    colors: ["#d97706", "#b91c1c"],
    description: "Warm earthy fall colors",
    tags: ["warm", "earthy"],
  },
  {
    name: "Cyberpunk",
    colors: ["#ff00ff", "#00ffff"],
    description: "Futuristic neon vibes",
    tags: ["neon", "futuristic"],
  },
  {
    name: "Pastel",
    colors: ["#ffadad", "#ffd6a5"],
    description: "Soft pastel tones",
    tags: ["soft", "pastel"],
  },
  {
    name: "Deep Space",
    colors: ["#0b132b", "#1c2541"],
    description: "Dark cosmic blues",
    tags: ["dark", "space"],
  },
  {
    name: "Sunflower",
    colors: ["#f6b93b", "#fa983a"],
    description: "Bright yellow shades",
    tags: ["yellow", "bright"],
  },
]

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Square: <Square />,
    Circle: <Circle />,
    Grid: <Grid />,
    Hexagon: <Hexagon />,
    Octagon: <Hexagon />,
    Triangle: <Triangle />,
    Waves: <Waves />,
    Leaf: <Leaf />,
    Box: <Box />,
    Cpu: <Cpu />,
  }
  return icons[iconName] || <Square />
}

const typedShapesData: ShapesData = shapesData

const cssStringToObject = (css: string): React.CSSProperties => {
  if (!css) return {}
  
  const properties = css.split(';').filter(Boolean);
  const cssObject: any = {};
  
  properties.forEach(property => {
    const [key, value] = property.split(':').map(part => part.trim());
    if (key && value) {
      const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      cssObject[camelKey] = value;
    }
  });
  
  return cssObject;
}

export default function PatternGenerator() {
  const [category, setCategory] = useState<string>(Object.keys(typedShapesData)[0])
  const [pattern, setPattern] = useState<string>(Object.keys(typedShapesData[category])[0])
  const [size, setSize] = useState<number>(32)
  const [lineWidth, setLineWidth] = useState<number>(2)
  const [dotSize, setDotSize] = useState<number>(4)
  const [colors, setColors] = useState<string[]>(COLOR_PALETTES[0].colors)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const processPattern = useCallback((patternCSS: string, values: Record<string, any>): string => {
    let css = patternCSS
    Object.entries(values).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g")
      css = css.replace(regex, value.toString())
    })
    return css
  }, [])

  const currentPattern = useMemo(() => {
    try {
      return typedShapesData[category]?.[pattern];
    } catch (error) {
      console.error('Error getting pattern:', error);
      return null;
    }
  }, [category, pattern]);

  const currentCSS = useMemo(() => {
    if (!currentPattern?.css) return "";
    try {
      return processPattern(currentPattern.css, {
        color1: colors[0],
        color2: colors[1],
        size,
        lineWidth,
        dotSize,
        halfSize: size / 2,
        quarterSize: size / 4,
        doubleSize: size * 2,
        sqrtSize: Math.round(size * Math.sqrt(3)),
        quarterSqrtSize: Math.round((size * Math.sqrt(3)) / 4),
      });
    } catch (error) {
      console.error('Error processing pattern:', error);
      return "";
    }
  }, [currentPattern, colors, size, lineWidth, dotSize, processPattern]);
  const handleShuffleColors = () => {
    const paletteIndex = Math.floor(Math.random() * COLOR_PALETTES.length)
    setColors([...COLOR_PALETTES[paletteIndex].colors])
    toast.success(`Applied ${COLOR_PALETTES[paletteIndex].name} palette`)
  }

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(currentCSS)
    toast.success("CSS copied to clipboard!")
  }

  const handleDownloadCSS = () => {
    const blob = new Blob([currentCSS], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pattern-${pattern}.css`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("CSS file downloaded!")
  }

  const handleReset = () => {
    setSize(32)
    setLineWidth(2)
    setDotSize(4)
    setColors(COLOR_PALETTES[0].colors)
    toast.success("Reset to default settings")
  }



  const renderFullscreenPreview = () => (
    <Modal
      isOpen={isFullscreen}
      onOpenChange={setIsFullscreen}
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
            <div className="w-[90%] h-[90%] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl relative">
              <div
                className="w-full h-screen relative"
                style={cssStringToObject(currentCSS)}
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
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
  

  return (
    <ToolLayout
      title="CSS Background Pattern Generator"
      description="Create beautiful, customizable CSS patterns with advanced options and features"
      toolId="pattern-generator"
    >
      <div className="space-y-6">
        {/* Top section - Preview and Settings side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pattern Preview Card */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getIconComponent(currentPattern?.icon || "Square")}
                  <h3 className="text-lg font-semibold">Pattern Preview</h3>
                </div>
                <Button isIconOnly variant="flat" onPress={() => setIsFullscreen(true)}>
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              <div
                className="w-full h-[300px] rounded-lg relative"
                style={currentCSS ? cssStringToObject(currentCSS) : { backgroundColor: colors[1] }}
              />
            </CardBody>
          </Card>

          {/* Settings Card */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Pattern Settings</h3>
                <Button
                  color="default"
                  size="sm"
                  variant="flat"
                  onPress={handleReset}
                  startContent={<RefreshCcw className="w-4 h-4" />}
                >
                  Reset All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Pattern Selection */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Pattern Type</h4>
                  <div className="grid grid-cols-1 gap-4">
                  <Select
                    label="Category"
                    selectedKeys={new Set([category])}  // Change this line
                    variant="bordered"
                    onChange={(e) => {
                      if (e.target.value) {  // Add this check
                        const newCategory = e.target.value;
                        setCategory(newCategory);
                        // Ensure we select the first pattern of the new category
                        const firstPattern = Object.keys(typedShapesData[newCategory])[0];
                        setPattern(firstPattern);
                      }
                    }}
                  >
                    {Object.keys(typedShapesData).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Pattern"
                    variant="bordered"
                    selectedKeys={new Set([pattern])}  // Change this line
                    onChange={(e) => {
                      if (e.target.value) {  // Add this check
                        setPattern(e.target.value);
                      }
                    }}
                  >
                    {Object.keys(typedShapesData[category] || {}).map((pat) => (
                      <SelectItem key={pat} value={pat}>
                        {pat.charAt(0).toUpperCase() +
                          pat.slice(1).replace(/([A-Z])/g, " $1").trim()}
                      </SelectItem>
                    ))}
                  </Select>
                  </div>
                </div>

                {/* Size Controls */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Pattern Size</h4>
                      <span className="text-sm text-default-500">{size}px</span>
                    </div>
                    <Slider
                      value={size}
                      onChange={(value) => setSize(value as number)}
                      minValue={16}
                      maxValue={128}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {currentPattern?.hasLineWidth && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Line Width</h4>
                        <span className="text-sm text-default-500">{lineWidth}px</span>
                      </div>
                      <Slider
                        value={lineWidth}
                        onChange={(value) => setLineWidth(value as number)}
                        minValue={1}
                        maxValue={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}

                  {currentPattern?.hasDotSize && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Dot Size</h4>
                        <span className="text-sm text-default-500">{dotSize}px</span>
                      </div>
                      <Slider
                        value={dotSize}
                        onChange={(value) => setDotSize(value as number)}
                        minValue={1}
                        maxValue={20}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Color Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Colors</h4>
                    <Button
                      color="secondary"
                      size="sm"
                      variant="flat"
                      onPress={handleShuffleColors}
                      startContent={<Shuffle className="w-4 h-4" />}
                    >
                      Shuffle
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {colors.map((color, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-default-100">
                        <div
                          className="w-12 h-12 rounded-md cursor-pointer border border-default-200 shadow-sm"
                          style={{ backgroundColor: color }}
                        >
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index] = e.target.value;
                              setColors(newColors);
                            }}
                            className="opacity-0 w-full h-full cursor-pointer"
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">Color {index + 1}</div>
                          <div className="text-xs font-mono text-default-500">{color}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Bottom section - Generated CSS (full width) */}
        <Card className="bg-default-50 dark:bg-default-100 w-full">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated CSS</h3>
              <div className="flex gap-2">
                <Button
                  color="primary"
                  size="sm"
                  variant="flat"
                  onPress={handleCopyCSS}
                  startContent={<Copy className="w-4 h-4" />}
                >
                  Copy
                </Button>
                <Button
                  color="secondary"
                  size="sm"
                  variant="flat"
                  onPress={handleDownloadCSS}
                  startContent={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-default-100 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{currentCSS}</code>
            </pre>
          </CardBody>
        </Card>
        {renderFullscreenPreview()}

        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          What is the CSS Background Pattern Generator?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
          The CSS Background Pattern Generator is a powerful tool designed to create customizable background patterns for web projects. It allows you to generate intricate CSS patterns effortlessly, catering to various design needs.
        </p>
        <p className="text-sm md:text-base text-default-600 mb-4">
          Whether you're a developer enhancing UI aesthetics, a designer seeking inspiration, or a hobbyist experimenting with CSS, this tool provides an intuitive interface and advanced customization options.
        </p>
        
        <div className="my-8">
          <Image 
            src="/Images/BackgroundPatternPreview.png?height=400&width=600" 
            alt="Screenshot of the CSS Background Pattern Generator interface showing pattern preview and customization options" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use the CSS Background Pattern Generator?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
          <li>Choose a pattern type from the dropdown menu.</li>
          <li>Adjust the pattern size, opacity, and rotation using the sliders.</li>
          <li>Select colors using the color pickers or predefined palettes.</li>
          <li>Experiment with advanced options like animation, blend modes, and multiple layers.</li>
          <li>Preview your pattern in real-time as you make adjustments.</li>
          <li>Copy the generated CSS or download it as a file.</li>
          <li>Use the randomize feature for inspiration or reset to start over.</li>
        </ol>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
          <li>Wide variety of pattern types</li>
          <li>Real-time pattern preview</li>
          <li>Adjustable size, opacity, and rotation</li>
          <li>Custom color selection with predefined palettes</li>
          <li>Advanced options including animation and blend modes</li>
          <li>Multi-layer support for complex designs</li>
          <li>One-click CSS copying and file download</li>
          <li>Randomize feature for quick pattern ideas</li>
          <li>Fullscreen preview mode</li>
          <li>Responsive design for all devices</li>
        </ul>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          Applications and Use Cases
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
          <li><strong>Web Design:</strong> Create unique backgrounds for websites and landing pages.</li>
          <li><strong>UI/UX Design:</strong> Generate patterns for app interfaces and mockups.</li>
          <li><strong>Digital Art:</strong> Use as a base for digital illustrations.</li>
          <li><strong>Branding:</strong> Develop consistent background patterns for brand materials.</li>
          <li><strong>Presentations:</strong> Enhance slides and digital presentations.</li>
          <li><strong>Print Design:</strong> Generate patterns for posters and packaging.</li>
          <li><strong>Game Development:</strong> Create background textures for 2D games.</li>
          <li><strong>Education:</strong> Teach CSS concepts and visual design techniques.</li>
        </ul>

        <p className="text-sm md:text-base text-default-600 mt-4">
          Ready to create stunning background patterns? Start using our CSS Background Pattern Generator now and explore endless design possibilities!
        </p>
      </div>
    </Card>
      </div>
      
    </ToolLayout>
  );
}

