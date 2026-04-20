"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardBody, Input, Button, Slider, Tabs, Tab, Modal, ModalContent } from "@nextui-org/react"
import { Copy, Palette, Maximize2, X } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionColorConverter from "./info-section"


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
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8 bg-default-50 dark:bg-default-100">
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

        <Card className="mb-8 bg-default-50 dark:bg-default-100">
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


      </div>
      <InfoSectionColorConverter />
    </ToolLayout>
  )
}

export default ColorConverter

