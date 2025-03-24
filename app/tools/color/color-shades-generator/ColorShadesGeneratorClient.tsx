"use client"

import { useCallback, useState, useEffect } from "react"
import { 
  Copy, 
  Info, 
  BookOpen, 
  Lightbulb, 
  AlertCircle, 
  Download, 
  Eye, 
  Code,
  Check,
  Shuffle
} from "lucide-react"
import NextImage from "next/image"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import { 
  Button, 
  Card, 
  CardBody, 
  Input, 
  Slider, 
  Tabs, 
  Tab, 
  Select, 
  SelectItem,
  Tooltip,
} from "@nextui-org/react"

interface Shade {
  hex: string
  rgb: [number, number, number]
  hsv: [number, number, number]
  hsl: [number, number, number]
  cmyk: [number, number, number, number]
}

const colorConversions = {
  hexToRgb: (hex: string): [number, number, number] => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  },
  rgbToHex: (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  },
  rgbToHsv: (r: number, g: number, b: number): [number, number, number] => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0
    const s = max === 0 ? 0 : (max - min) / max,
      v = max
    if (max !== min) {
      const d = max - min
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)]
  },
  rgbToHsl: (r: number, g: number, b: number): [number, number, number] => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  },

  rgbToCmyk: (r: number, g: number, b: number): [number, number, number, number] => {
    let c = 1 - r / 255
    let m = 1 - g / 255
    let y = 1 - b / 255
    const k = Math.min(c, Math.min(m, y))
    c = (c - k) / (1 - k)
    m = (m - k) / (1 - k)
    y = (y - k) / (1 - k)
    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)]
  },
}

export default function ColorShadesGenerator() {
  const [baseColor, setBaseColor] = useState("#3da013")
  const [shadeCount, setShadeCount] = useState(10)
  const [shades, setShades] = useState<Shade[]>([])
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null)
  const [error, setError] = useState<string>("")
  const [shadeType, setShadeType] = useState<"tint" | "shade" | "both">("both")
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const generateShades = useCallback((hex: string, count: number, type: "tint" | "shade" | "both"): Shade[] => {
    const [r, g, b] = colorConversions.hexToRgb(hex)
    const shades: Shade[] = []

    if (type === "both") {
      const halfCount = Math.floor(count / 2)
      shades.push(...generateShades(hex, halfCount, "shade"))
      shades.push(...generateShades(hex, count - halfCount, "tint").reverse())
    } else {
      for (let i = 0; i < count; i++) {
        const factor = i / (count - 1)
        let shadeR, shadeG, shadeB
        if (type === "tint") {
          shadeR = Math.round(r + (255 - r) * factor)
          shadeG = Math.round(g + (255 - g) * factor)
          shadeB = Math.round(b + (255 - b) * factor)
        } else {
          shadeR = Math.round(r * (1 - factor))
          shadeG = Math.round(g * (1 - factor))
          shadeB = Math.round(b * (1 - factor))
        }
        const shadeHex = colorConversions.rgbToHex(shadeR, shadeG, shadeB)
        shades.push({
          hex: shadeHex,
          rgb: [shadeR, shadeG, shadeB],
          hsv: colorConversions.rgbToHsv(shadeR, shadeG, shadeB),
          hsl: colorConversions.rgbToHsl(shadeR, shadeG, shadeB),
          cmyk: colorConversions.rgbToCmyk(shadeR, shadeG, shadeB),
        })
      }
    }

    return shades
  }, [])

  useEffect(() => {
    setError("")
    if (!/^#[0-9A-Fa-f]{6}$/.test(baseColor)) {
      setError("Please enter a valid hex color code.")
      return
    }
    const newShades = generateShades(baseColor, shadeCount, shadeType)
    setShades(newShades)
    setSelectedShade(newShades[Math.floor(newShades.length / 2)])
  }, [baseColor, shadeCount, shadeType, generateShades])

  const handleCopyColor = (colorValue: string, format: string) => {
    navigator.clipboard.writeText(colorValue)
    toast.success(`Copied ${colorValue} to clipboard`)
    setCopiedFormat(format)
    setTimeout(() => setCopiedFormat(null), 2000)
  }

  const handleRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    setBaseColor(randomColor)
  }

  const handleDownloadPalette = () => {
    const canvas = document.createElement("canvas")
    canvas.width = shades.length * 100
    canvas.height = 200
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    shades.forEach((shade, index) => {
      ctx.fillStyle = shade.hex
      ctx.fillRect(index * 100, 0, 100, 150)
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText(shade.hex, index * 100 + 10, 170)
      ctx.fillText(`RGB: ${shade.rgb.join(",")}`, index * 100 + 10, 190)
    })

    const link = document.createElement("a")
    link.download = "color_palette.png"
    link.href = canvas.toDataURL()
    link.click()
    toast.success("Palette downloaded as PNG")
  }

  // Function to determine text color based on background
  const getContrastColor = (hexColor: string) => {
    const [r, g, b] = colorConversions.hexToRgb(hexColor)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }

  return (
    <ToolLayout
      title="Color Shades Generator"
      description="Generate and explore harmonious color shades for your projects with advanced features"
      toolId="678f382d26f06f912191bcaa"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">

          <div className="flex flex-wrap items-center gap-3">
                  <Input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="flex-grow w-1/2"
                    placeholder="Enter HEX color"
                    variant="bordered"
                    startContent={
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: baseColor }}></div>
                    }
                    size="lg"
                  />
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        id="color-picker"
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="sr-only"
                      />
                      <Tooltip content="Pick color">
                        <label
                          htmlFor="color-picker"
                          className="w-12 h-12 rounded-lg cursor-pointer border-2 border-default-200 flex items-center justify-center transition-transform hover:scale-105"
                          style={{ backgroundColor: baseColor }}
                        >
                          <div className="w-8 h-8 rounded-sm border border-white/40"></div>
                        </label>
                      </Tooltip>
                    </div>
                    <Tooltip content="Generate random color">
                      <Button 
                        isIconOnly 
                        onPress={handleRandomColor} 
                        color="primary" 
                        size="lg"
                        className="h-12 w-12"
                      >
                        <Shuffle className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>

            <div>
              <label className="block text-sm font-medium text-default-700 mb-2">Shade Count: {shadeCount}</label>
              <Slider
                aria-label="Shade Count"
                step={1}
                minValue={2}
                maxValue={20}
                value={shadeCount}
                onChange={(value) => setShadeCount(Array.isArray(value) ? value[0] : value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-default-700 mb-2">Shade Type</label>
              <Select
                label="Select shade type"
                selectedKeys={[shadeType]}
                onSelectionChange={(value) => setShadeType(Array.from(value)[0] as "tint" | "shade" | "both")}
                variant="bordered"
              >
                <SelectItem key="tint" value="tint" className="text-default-700">
                  Tint (Lighter)
                </SelectItem>
                <SelectItem key="shade" value="shade" className="text-default-700">
                  Shade (Darker)
                </SelectItem>
                <SelectItem key="both" value="both" className="text-default-700">
                  Both
                </SelectItem>
              </Select>
            </div>

            {error && (
              <div className="bg-danger-50 text-danger-foreground p-4 rounded-lg flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            {/* Palette display and selected shade info */}
          <Card className="col-span-1 lg:col-span-2 bg-default-50 dark:bg-default-100 border border-default-200 dark:border-default-100 backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center mb-4">
                  <Eye className="w-5 h-5 mr-2 text-primary-500" />
                  Your Palette
                </h2>
                <div className="rounded-xl overflow-hidden flex" id="shades-container" style={{ height: '120px' }}>
                  {shades.map((shade, index) => (
                    <Tooltip 
                      key={index}
                      content={shade.hex}
                      color="foreground"
                      placement="top"
                    >
                      <div
                        className="flex-1 h-full shade cursor-pointer transition-all hover:flex-[1.5] relative group"
                        style={{ backgroundColor: shade.hex }}
                        onClick={() => setSelectedShade(shade)}
                      >
                        <div 
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: getContrastColor(shade.hex) }}
                        >
                          <span className="text-xs font-mono bg-black/20 dark:bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                            {shade.hex}
                          </span>
                        </div>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            <Button onPress={handleDownloadPalette} color="primary" className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Palette
            </Button>
          </CardBody>
        </Card>

       
        {selectedShade && (
                <div className="mt-4">
                  <h2 className="text-xl font-semibold flex items-center mb-4">
                    <Info className="w-5 h-5 mr-2 text-primary-500" />
                    Selected Color
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden relative group">
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: selectedShade.hex }}
                      ></div>
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                      >
                        <Button 
                          color="default" 
                          variant="solid" 
                          className="bg-white/80 dark:bg-black/80 backdrop-blur-md"
                          onPress={() => handleCopyColor(selectedShade.hex, 'hex')}
                          startContent={copiedFormat === 'hex' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        >
                          Copy HEX
                        </Button>
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-2">
                      <Tabs 
                        aria-label="Color formats" 
                        color="primary"
                        variant="underlined"
                        classNames={{
                          tab: "data-[selected=true]:text-primary-500"
                        }}
                      >
                        <Tab key="hex" title={
                          <div className="flex items-center gap-2">
                            <span>HEX</span>
                            {copiedFormat === 'hex' && <Check className="h-3 w-3 text-success-500" />}
                          </div>
                        }>
                          <div className="flex items-center justify-between mt-2 p-3 bg-default-100 dark:bg-default-200 rounded-lg">
                            <span className="font-mono">{selectedShade.hex}</span>
                            <Button 
                              isIconOnly 
                              variant="light" 
                              size="sm" 
                              onPress={() => handleCopyColor(selectedShade.hex, 'hex')}
                              color={copiedFormat === 'hex' ? "success" : "default"}
                            >
                              {copiedFormat === 'hex' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </Tab>
                        <Tab key="rgb" title={
                          <div className="flex items-center gap-2">
                            <span>RGB</span>
                            {copiedFormat === 'rgb' && <Check className="h-3 w-3 text-success-500" />}
                          </div>
                        }>
                          <div className="flex items-center justify-between mt-2 p-3 bg-default-100 dark:bg-default-200 rounded-lg">
                            <span className="font-mono">rgb({selectedShade.rgb.join(", ")})</span>
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => handleCopyColor(`rgb(${selectedShade.rgb.join(", ")})`, 'rgb')}
                              color={copiedFormat === 'rgb' ? "success" : "default"}
                            >
                              {copiedFormat === 'rgb' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </Tab>
                        <Tab key="hsl" title={
                          <div className="flex items-center gap-2">
                            <span>HSL</span>
                            {copiedFormat === 'hsl' && <Check className="h-3 w-3 text-success-500" />}
                          </div>
                        }>
                          <div className="flex items-center justify-between mt-2 p-3 bg-default-100 dark:bg-default-200 rounded-lg">
                            <span className="font-mono">hsl({selectedShade.hsl.join(", ")})</span>
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => handleCopyColor(`hsl(${selectedShade.hsl.join(", ")})`, 'hsl')}
                              color={copiedFormat === 'hsl' ? "success" : "default"}
                            >
                              {copiedFormat === 'hsl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </Tab>
                        <Tab key="hsv" title={
                          <div className="flex items-center gap-2">
                            <span>HSV</span>
                            {copiedFormat === 'hsv' && <Check className="h-3 w-3 text-success-500" />}
                          </div>
                        }>
                          <div className="flex items-center justify-between mt-2 p-3 bg-default-100 dark:bg-default-200 rounded-lg">
                            <span className="font-mono">hsv({selectedShade.hsv.join(", ")})</span>
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => handleCopyColor(`hsv(${selectedShade.hsv.join(", ")})`, 'hsv')}
                              color={copiedFormat === 'hsv' ? "success" : "default"}
                            >
                              {copiedFormat === 'hsv' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </Tab>
                        <Tab key="cmyk" title={
                          <div className="flex items-center gap-2">
                            <span>CMYK</span>
                            {copiedFormat === 'cmyk' && <Check className="h-3 w-3 text-success-500" />}
                          </div>
                        }>
                          <div className="flex items-center justify-between mt-2 p-3 bg-default-100 dark:bg-default-200 rounded-lg">
                            <span className="font-mono">cmyk({selectedShade.cmyk.join(", ")})</span>
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => handleCopyColor(`cmyk(${selectedShade.cmyk.join(", ")})`, 'cmyk')}
                              color={copiedFormat === 'cmyk' ? "success" : "default"}
                            >
                              {copiedFormat === 'cmyk' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </Tab>
                      </Tabs>

                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-default-100 dark:bg-default-200 rounded-lg p-3">
                          <div className="text-xs text-default-500 mb-1">Red</div>
                          <div className="font-semibold">{selectedShade.rgb[0]}</div>
                        </div>
                        <div className="bg-default-100 dark:bg-default-200 rounded-lg p-3">
                          <div className="text-xs text-default-500 mb-1">Green</div>
                          <div className="font-semibold">{selectedShade.rgb[1]}</div>
                        </div>
                        <div className="bg-default-100 dark:bg-default-200 rounded-lg p-3">
                          <div className="text-xs text-default-500 mb-1">Blue</div>
                          <div className="font-semibold">{selectedShade.rgb[2]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

            <Card className="mt-6 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Color Shades Generator
                </h2>
                <p className="text-sm md:text-base text-default-600 mb-4">
                The Color Shades Generator is a sophisticated tool designed for designers, developers, and color enthusiasts. It allows you to generate a range of harmonious color shades based on a single base color. This tool is perfect for creating color palettes, exploring color relationships, and ensuring color consistency in your projects.
                </p>
                
                <div className="my-8">
                <NextImage
                    src="/Images/InfosectionImages/ColorShadesGeneratorPreview.png?height=400&width=600"
                    alt="Screenshot of the Enhanced Color Shades Generator interface showing color inputs and preview"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                />
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use Color Shades Generator?
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter a hex color code or you can use the color picker to select a base color.</li>
                <li>Adjust the slider to choose the number of shades you want to generate (between 2 and 20).</li>
                <li>Select the shade type: tint (lighter), shade (darker), or both.</li>
                <li>Click on the generated shades to view their details in various color formats.</li>
                <li>Use the copy button next to each color value to easily copy it to your clipboard.</li>
                <li>Download the entire palette as a PNG image for easy reference and sharing.</li>
                </ol>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Generate up to 20 color shades based on a single base color</li>
                <li>Choose between tints, shades, or a combination of both</li>
                <li>View color information in HEX, RGB, HSL, HSV, and CMYK formats</li>
                <li>One-click copy functionality for all color formats</li>
                <li>Download the entire palette as a PNG image</li>
                <li>Random color generation for inspiration</li>
                <li>Real-time updates as you adjust settings</li>
                <li>Responsive design for use on various devices</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Eye className="w-6 h-6 mr-2" />
                Tips for Effective Use
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Experiment with different base colors to discover unique palettes.</li>
                <li>Use the tint and shade options to create monochromatic color schemes.</li>
                <li>Combine multiple generated palettes to create more complex color systems.</li>
                <li>Consider color psychology when selecting base colors for your projects.</li>
                <li>Test your color palettes in different lighting conditions and on various devices.</li>
                <li>Use the CMYK values when preparing designs for print production.</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Code className="w-6 h-6 mr-2" />
                Integration Tips
                </h2>
                <p className="text-sm md:text-base text-default-600">To make the most of your generated color palettes in your projects:</p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600 mt-2">
                <li>Use CSS variables to easily apply and update colors throughout your project</li>
                <li>Create a color system with primary, secondary, and accent colors using different shades</li>
                <li>Utilize the downloaded PNG palette to import colors into design tools</li>
                <li>Use the various color formats (HEX, RGB, HSL) as needed for different contexts in your code</li>
                <li>Consider creating a style guide that incorporates your generated color palette for consistent usage across your project or organization</li>
                </ul>
            </div>
            </Card>
    </ToolLayout>
  )
}

