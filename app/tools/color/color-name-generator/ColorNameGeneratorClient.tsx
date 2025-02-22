"use client"

import { useState, useEffect } from "react"
import { Copy, Info, BookOpen, Lightbulb, AlertCircle, Palette } from "lucide-react"
import { Button, Card, CardBody, Input, Tabs, Tab } from "@nextui-org/react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"

const apiUrl = 'https://www.thecolorapi.com/id?'

type ColorFormat = 'hex' | 'rgb' | 'hsl'

interface ColorInfo {
  name: string
  hex: string
  rgb: string
  hsl: string
}

const ColorUtils = {
  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  },

  rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b]
      .map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  },

  hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255)
    }
  },

  parseColorInput(input: string, format: ColorFormat): string | null {
    try {
      switch (format) {
        case 'hex':
          if (/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(input)) {
            return input.startsWith('#') ? input : `#${input}`
          }
          break
        case 'rgb': {
          const match = input.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
          if (match) {
            const [, r, g, b] = match.map(Number)
            if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
              return this.rgbToHex(r, g, b)
            }
          }
          break
        }
        case 'hsl': {
          const match = input.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/)
          if (match) {
            const [, h, s, l] = match.map(Number)
            if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
              const { r, g, b } = this.hslToRgb(h, s, l)
              return this.rgbToHex(r, g, b)
            }
          }
          break
        }
      }
      return null
    } catch {
      return null
    }
  },

  generateRandomColor(): string {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return this.rgbToHex(r, g, b)
  },

  getContrastColor(hexColor: string): string {
    const rgb = this.hexToRgb(hexColor)
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    return brightness > 128 ? '#000000' : '#FFFFFF'
  }
}

export default function ColorNameGenerator() {
  const [colorValue, setColorValue] = useState(ColorUtils.generateRandomColor())
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null)
  const [error, setError] = useState('')
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex')

  const fetchColorInfo = async (hex: string): Promise<ColorInfo> => {
    try {
      const response = await fetch(`${apiUrl}hex=${hex.replace('#', '')}`)
      const data = await response.json()

      return {
        name: data.name.value,
        hex: data.hex.value,
        rgb: data.rgb.value,
        hsl: data.hsl.value
      }
    } catch (error) {
      console.error('Error fetching color info:', error)
      throw new Error('Error fetching color info')
    }
  }

  const handleGenerateColorName = async () => {
    setError('')
    try {
      let hex = colorValue
      if (colorFormat === 'rgb' || colorFormat === 'hsl') {
        const parsedColor = ColorUtils.parseColorInput(colorValue, colorFormat)
        if (parsedColor) {
          hex = parsedColor
        } else {
          throw new Error('Invalid color format')
        }
      }
      const info = await fetchColorInfo(hex)
      setColorInfo(info)
      setColorValue(info.hex)
      setColorFormat('hex')
    } catch {
      setError('Invalid color format. Please check your input.')
    }
  }

  const handleCopyColor = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    toast.success(`Copied ${label} to clipboard`)
  }

  const handleColorFormatChange = (format: ColorFormat) => {
    setColorFormat(format)
    if (colorInfo) {
      setColorValue(colorInfo[format])
    }
  }

  const handleColorChange = (value: string) => {
    setColorValue(value)
  }

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    setColorValue(hex)
    setColorFormat('hex')
    handleGenerateColorName()
  }

  useEffect(() => {
    handleGenerateColorName()
  }, [])

  return (
    <ToolLayout
      title="Color Name Generator"
      description="Discover color names and explore color formats with advanced features"
      toolId="678f382d26f06f912191bcb0"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-6">
              {colorInfo && (
                <div className="bg-default-100 rounded-lg p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">Color Name:</h4>
                    <span className="text-lg font-bold text-primary">{colorInfo.name}</span>
                  </div>
                  <div
                    className="w-full h-16 rounded-md shadow-md mb-3 flex items-center justify-center text-xl font-bold"
                    style={{ 
                      backgroundColor: colorInfo.hex, 
                      color: ColorUtils.getContrastColor(colorInfo.hex)
                    }}
                  >
                    {colorInfo.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Name', value: colorInfo.name },
                      { label: 'HEX', value: colorInfo.hex },
                      { label: 'RGB', value: colorInfo.rgb },
                      { label: 'HSL', value: colorInfo.hsl }
                    ].map((item) => (
                      <Button 
                        key={item.label} 
                        onClick={() => handleCopyColor(item.value, item.label)} 
                        variant="flat" 
                        className="w-full text-sm"
                      >
                        <Copy className="mr-1 h-3 w-3" /> {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Tabs
                selectedKey={colorFormat}
                onSelectionChange={(key) => handleColorFormatChange(key as ColorFormat)}
              >
                <Tab key="hex" title="HEX">
                  <Input
                    type="text"
                    value={colorValue}
                    variant="bordered"
                    onChange={(e) => handleColorChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGenerateColorName()
                      }
                    }}
                    placeholder="#FFFFFF"
                  />
                </Tab>
                <Tab key="rgb" title="RGB">
                  <Input
                    type="text"
                    value={colorValue}
                    variant="bordered"
                    onChange={(e) => handleColorChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGenerateColorName()
                      }
                    }}
                    placeholder="rgb(255, 255, 255)"
                  />
                </Tab>
                <Tab key="hsl" title="HSL">
                  <Input
                    type="text"
                    value={colorValue}
                    variant="bordered"
                    onChange={(e) => handleColorChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGenerateColorName()
                      }
                    }}
                    placeholder="hsl(0, 100%, 50%)"
                  />
                </Tab>
              </Tabs>

              <div className="flex gap-2">
                <Button 
                  onClick={handleGenerateColorName} 
                  className="flex-grow"
                  color="primary"
                  startContent={<Lightbulb className="h-4 w-4" />}
                >
                  Generate Color Name
                </Button>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-default-400" />
                  <input
                    type="color"
                    value={colorValue}
                    onChange={handleColorPickerChange}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-danger-50 text-danger-foreground rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card className="mt-8 bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Color Name Generator
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Color Name Generator is a sophisticated tool designed for designers, developers, and color enthusiasts. It allows you to discover color names and explore different color formats with ease and precision.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With features like real-time color preview, multiple format support (HEX, RGB, HSL), and instant color name generation, this tool offers both versatility and accuracy in color exploration and selection.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/ColorNamePreview.png?height=400&width=600"
                  alt="Screenshot of the Enhanced Color Name Generator interface showing color inputs and preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use Color Name Generator?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Select a color format (HEX, RGB, or HSL) using the tabs.</li>
                <li>Enter a valid color value in the selected format using the input field.</li>
                <li>Click the "Generate Color Name" button to get the color information.</li>
                <li>View the color name and preview at the top of the interface.</li>
                <li>Use the copy buttons to easily copy the color name or different color format values.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Support for HEX, RGB, and HSL color formats with accurate parsing and conversions</li>
                <li>Real-time color name retrieval using an external API</li>
                <li>Dynamic color preview with contrasting text for optimal readability</li>
                <li>Easy-to-use copy functionality for color name and all color format values</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Palette className="w-6 h-6 mr-2" />
                Tips and Tricks
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Use the tabs to switch between different color formats for input and exploration.</li>
                <li>Experiment with slight variations in color values to discover new color names.</li>
                <li>Copy color values directly to your clipboard for use in design software or code.</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                The Color Name Generator is more than just a tool—it's a gateway to color exploration and a valuable asset in any creative workflow.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}