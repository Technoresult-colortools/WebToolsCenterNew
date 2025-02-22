"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardBody, Input, Button, Slider, Tabs, Tab, Modal, ModalContent } from "@nextui-org/react"
import { Copy, Palette, Info, BookOpen, Lightbulb, Maximize2, X } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState("#3498db")
  const [rgb, setRgb] = useState({ r: 52, g: 152, b: 219 })
  const [hsl, setHsl] = useState({ h: 204, s: 70, l: 53 })
  const [hsv, setHsv] = useState({ h: 204, s: 76, v: 86 })
  const [rgba, setRgba] = useState({ r: 52, g: 152, b: 219, a: 1 })
  const [activeTab, setActiveTab] = useState("hex")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [contrastColor, setContrastColor] = useState("#ffffff")

  useEffect(() => {
    updateAllFormats(hex)
  }, [hex]) // Fixed dependency array

  const updateAllFormats = (hexValue: string) => {
    const rgbValue = hexToRgb(hexValue)
    const hslValue = rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b)
    const hsvValue = rgbToHsv(rgbValue.r, rgbValue.g, rgbValue.b)
    const rgbaValue = { ...rgbValue, a: rgba.a }

    setHex(hexValue)
    setRgb(rgbValue)
    setHsl(hslValue)
    setHsv(hsvValue)
    setRgba(rgbaValue)
    updateContrastColor(rgbValue)
  }

  const updateContrastColor = (rgbValue: { r: number; g: number; b: number }) => {
    const brightness = (rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000
    setContrastColor(brightness > 128 ? "#000000" : "#ffffff")
  }

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
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
      h! /= 6
    }

    return { h: Math.round(h! * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    }
  }

  const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h
    const v = max

    const d = max - min
    const s = max === 0 ? 0 : d / max

    if (max === min) {
      h = 0
    } else {
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
      h! /= 6
    }

    return { h: Math.round(h! * 360), s: Math.round(s * 100), v: Math.round(v * 100) }
  }

  const hsvToRgb = (h: number, s: number, v: number): { r: number; g: number; b: number } => {
    s /= 100
    v /= 100
    const k = (n: number) => (n + h / 60) % 6
    const f = (n: number) => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
    return {
      r: Math.round(255 * f(5)),
      g: Math.round(255 * f(3)),
      b: Math.round(255 * f(1)),
    }
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      updateAllFormats(newHex)
    }
    setHex(newHex)
  }

  const handleRgbChange = (color: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [color]: value }
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    updateAllFormats(newHex)
  }

  const handleHslChange = (color: "h" | "s" | "l", value: number) => {
    const newHsl = { ...hsl, [color]: value }
    const rgbValue = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    const newHex = rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b)
    updateAllFormats(newHex)
  }

  const handleRgbaChange = (color: "r" | "g" | "b" | "a", value: number) => {
    const newRgba = { ...rgba, [color]: value }
    setRgba(newRgba)
    if (color !== "a") {
      const newHex = rgbToHex(newRgba.r, newRgba.g, newRgba.b)
      updateAllFormats(newHex)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!")
      },
      () => {
        toast.error("Failed to copy")
      },
    )
  }

  const generateRandomColor = () => {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    updateAllFormats(randomHex)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const renderFullscreenPreview = () => (
    <Modal
      isOpen={isFullscreen}
      onOpenChange={(open: boolean) => setIsFullscreen(open)}
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
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
                  boxShadow: `0 0 40px rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0.5)`
                }}
              >
                <p 
                  className="text-6xl font-bold text-center" 
                  style={{ color: contrastColor }}
                >
                  {hex}
                </p>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, HSL, HSV, and RGBA formats with advanced features"
      toolId="678f382e26f06f912191bcb5"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100 shadow-md mb-8">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-2">Color Preview</h2>
            <p className="text-default-500 mb-4">Current color: {hex}</p>
            <div className="relative">
              <div
                className="w-full h-64 rounded-lg shadow-inner flex items-center justify-center transition-all duration-300 ease-in-out"
                style={{
                  backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
                  boxShadow: `0 0 20px rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0.5)`,
                }}
              >
                <p className="text-4xl font-bold" style={{ color: contrastColor }}>
                  {hex}
                </p>
              </div>
              <Button size="sm" variant="flat" onPress={toggleFullscreen} className="absolute bottom-2 right-2">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between space-x-2 mt-4">
              <Button onPress={() => copyToClipboard(hex)} color="primary" className="w-48">
                <Copy className="mr-2 h-4 w-4" /> Copy HEX
              </Button>
              <Button onPress={generateRandomColor} color="primary" className="w-48">
                <Palette className="mr-2 h-4 w-4" /> Random Color
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100 shadow-md mb-8">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold mb-4">Color Formats</h2>
            <Tabs
              aria-label="Color formats"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
            >
              <Tab key="hex" title="HEX">
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="hex" className="block mb-2">
                      HEX Color
                    </label>
                    <div className="flex space-x-2">
                      <Input id="hex" variant="bordered" value={hex} onChange={handleHexChange} />
                      <Button onPress={() => copyToClipboard(hex)} color="danger" variant="flat">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab key="rgb" title="RGB">
                <div className="mt-4 space-y-4">
                  {["r", "g", "b"].map((color) => (
                    <div key={color}>
                      <label htmlFor={`rgb-${color}`} className="block mb-2">
                        {color.toUpperCase()}: {rgb[color as keyof typeof rgb]}
                      </label>
                      <Slider
                        aria-label={`RGB ${color.toUpperCase()}`}
                        size="sm"
                        step={1}
                        maxValue={255}
                        minValue={0}
                        value={rgb[color as keyof typeof rgb]}
                        onChange={(value) => {
                            const numericValue = Array.isArray(value) ? value[0] : value;
                            handleRgbChange(color as "r" | "g" | "b", numericValue)
                          }}
                     
                      />
                    </div>
                  ))}
                  <Button onPress={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} color="danger" variant="flat">
                    <Copy className="mr-2 h-4 w-4" /> Copy RGB
                  </Button>
                </div>
              </Tab>
              <Tab key="hsl" title="HSL">
                <div className="mt-4 space-y-4">
                  {["h", "s", "l"].map((color) => (
                    <div key={color}>
                      <label htmlFor={`hsl-${color}`} className="block mb-2">
                        {color.toUpperCase()}: {hsl[color as keyof typeof hsl]}
                        {color === "h" ? "°" : "%"}
                      </label>
                      <Slider
                        aria-label={`HSL ${color.toUpperCase()}`}
                        size="sm"
                        step={1}
                        maxValue={color === "h" ? 360 : 100}
                        minValue={0}
                        value={hsl[color as keyof typeof hsl]}
                        onChange={(value) => {
                            const numericValue = Array.isArray(value) ? value[0] : value;
                            handleHslChange(color as "h" | "s" | "l", numericValue)
                          }}
                 
                      />
                    </div>
                  ))}
                  <Button onPress={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} color="danger" variant="flat">
                    <Copy className="mr-2 h-4 w-4" /> Copy HSL
                  </Button>
                </div>
              </Tab>
              <Tab key="hsv" title="HSV">
                <div className="mt-4 space-y-4">
                  {["h", "s", "v"].map((color) => (
                    <div key={color}>
                      <label htmlFor={`hsv-${color}`} className="block mb-2">
                        {color.toUpperCase()}: {hsv[color as keyof typeof hsv]}
                        {color === "h" ? "°" : "%"}
                      </label>
                      <Slider
                        aria-label={`HSV ${color.toUpperCase()}`}
                        size="sm"
                        step={1}
                        maxValue={color === "h" ? 360 : 100}
                        minValue={0}
                        value={hsv[color as keyof typeof hsv]}
                        onChange={(value) => {
                            const numericValue = Array.isArray(value) ? value[0] : value;
                            handleHslChange(color as "h" | "s" | "l", numericValue)
                          }}
                       
                      />
                    </div>
                  ))}
                  <Button onPress={() => copyToClipboard(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`)} color="danger" variant="flat">
                    <Copy className="mr-2 h-4 w-4" /> Copy HSV
                  </Button>
                </div>
              </Tab>
              <Tab key="rgba" title="RGBA">
                <div className="mt-4 space-y-4">
                  {["r", "g", "b", "a"].map((color) => (
                    <div key={color}>
                      <label htmlFor={`rgba-${color}`} className="block mb-2">
                        {color.toUpperCase()}:{" "}
                        {color === "a" ? rgba[color as keyof typeof rgba].toFixed(2) : rgba[color as keyof typeof rgba]}
                      </label>
                      <Slider
                        aria-label={`RGBA ${color.toUpperCase()}`}
                        size="sm"
                        step={color === "a" ? 0.01 : 1}
                        maxValue={color === "a" ? 1 : 255}
                        minValue={0}
                        value={rgba[color as keyof typeof rgba]}
                        onChange={(value) => {
                            const numericValue = Array.isArray(value) ? value[0] : value;
                            handleRgbaChange(color as "r" | "g" | "b" | "a", numericValue)
                          }}
                        
                      />
                    </div>
                  ))}
                  <Button
                    onPress={() => copyToClipboard(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a.toFixed(2)})`)} color="danger" variant="flat"
                  >
                    <Copy className="mr-2 h-4 w-4" /> Copy RGBA
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {renderFullscreenPreview()}

        <Card className="bg-default-50 dark:bg-default-100 mt-8">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Color Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Color Converter is a powerful tool designed for developers, designers, and color enthusiasts. It
                allows you to easily convert colors between various formats, including HEX, RGB, HSL, HSV, and RGBA.
                This tool ensures accurate and fast conversions for all your color-related needs, whether you're working
                on web development, graphic design, or any other project involving colors.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With features like real-time color preview, interactive sliders, fullscreen mode, and support for
                multiple color formats, the Enhanced Color Converter is an invaluable resource for anyone working with
                digital colors. It's perfect for ensuring color consistency across different projects, exploring color
                relationships, or simply converting colors between different formats quickly and accurately.
              </p>
              <div className="my-8">
                <NextImage
                  src="/Images/ColorConverterPreview.png?height=400&width=600"
                  alt="Screenshot of the Color Converter interface showing color input options and preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use Color Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Select the desired color format tab (HEX, RGB, HSL, HSV, or RGBA).</li>
                <li>Adjust the color values using either the input field or the interactive sliders.</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>Use the copy buttons to quickly copy color values in any format.</li>
                <li>Experiment with the "Random Color" button for inspiration or design exploration.</li>
                <li>Switch between tabs to view and compare color values in different formats.</li>
                <li>Use the fullscreen preview option for a detailed view of your selected color.</li>
                <li>Adjust the alpha channel in the RGBA tab to create transparent colors.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Support for multiple color formats: HEX, RGB, HSL, HSV, and RGBA</li>
                <li>Real-time color preview with dynamic text color for optimal readability</li>
                <li>Interactive sliders for precise color value adjustments</li>
                <li>Copy functionality for easy color value copying in any format</li>
                <li>Random color generation for inspiration</li>
                <li>Fullscreen preview mode for detailed color examination</li>
                <li>Seamless switching between different color formats</li>
                <li>Responsive design for optimal use on all devices</li>
                <li>Intuitive user interface with clear, easy-to-read color information</li>
                <li>Dynamic background color and shadow effects for enhanced visual feedback</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>
                  <strong>Web Development:</strong> Easily convert between color formats for CSS styling and JavaScript
                  color manipulation.
                </li>
                <li>
                  <strong>Graphic Design:</strong> Ensure color consistency across different design tools and formats.
                </li>
                <li>
                  <strong>UI/UX Design:</strong> Experiment with color schemes and accessibility in various formats,
                  including transparency with RGBA.
                </li>
                <li>
                  <strong>Digital Marketing:</strong> Create consistent brand colors across different platforms and
                  media.
                </li>
                <li>
                  <strong>Print Design:</strong> Convert web colors to print-friendly formats and vice versa.
                </li>
                <li>
                  <strong>Color Theory Education:</strong> Explore relationships between different color models and
                  learn about color spaces.
                </li>
                <li>
                  <strong>Accessibility Testing:</strong> Check color contrasts and readability in different formats to
                  ensure WCAG compliance.
                </li>
                <li>
                  <strong>Brand Identity Development:</strong> Develop and maintain consistent color palettes across all
                  brand materials, including digital and print.
                </li>
                <li>
                  <strong>Game Development:</strong> Create and adjust color palettes for game assets and UI elements.
                </li>
                <li>
                  <strong>Data Visualization:</strong> Generate color schemes for charts, graphs, and other data
                  representation tools.
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Whether you're a professional designer working on complex projects or a hobbyist exploring the world of
                digital colors, our Enhanced Color Converter provides the accuracy, functionality, and user-friendly
                interface you need. Start using it today to streamline your workflow, enhance your understanding of
                color spaces, and bring your creative visions to life with precision and ease!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

export default ColorConverter

