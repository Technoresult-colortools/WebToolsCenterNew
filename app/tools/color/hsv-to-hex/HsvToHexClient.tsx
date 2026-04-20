"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import InfoSectionHsvToHex from "./info-section"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move hsvToRgb and rgbToHex functions outside of the component
const hsvToRgb = (h: number, s: number, v: number) => {
  s /= 100
  v /= 100
  const c = v * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = v - c
  let [r, g, b] = [0, 0, 0]

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0]
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0]
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x]
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c]
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c]
  } else if (h >= 300 && h < 360) {
    [r, g, b] = [c, 0, x]
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ]
}

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

export default function HsvToHex() {
  const [hsv, setHSV] = useState({ h: 0, s: 0, v: 0 })
  const [hexValue, setHexValue] = useState<string>("#000000")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { h, s, v } = hsv
    const [r, g, b] = hsvToRgb(h, s, v)
    const hex = rgbToHex(r, g, b)
    setHexValue(hex)
  }, [hsv])

  const hsvString = useMemo(() => {
    return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
  }, [hsv])

  const handleHSVChange = (color: keyof typeof hsv, value: number) => {
    setHSV((prev) => ({ ...prev, [color]: value }))
  }

  const handleReset = () => {
    setHSV({ h: 0, s: 0, v: 0 })
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="HSV to Hex Converter"
      description="Convert HSV Color Codes to Hex with Real-time Preview"
      toolId="678f382d26f06f912191bcae"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">HSV Input</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Hue (0-359)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={hsv.h.toString()}
                          onChange={(e) => handleHSVChange("h", Number(e.target.value))}
                          className="w-20"
                          size="sm"
                          variant="bordered"
                          min={0}
                          max={359}
                        />
                        <Slider
                          aria-label="Hue"
                          step={1}
                          maxValue={359}
                          minValue={0}
                          value={hsv.h}
                          onChange={(value) => handleHSVChange("h", Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Saturation (0-100)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={hsv.s.toString()}
                          onChange={(e) => handleHSVChange("s", Number(e.target.value))}
                          className="w-20"
                          size="sm"
                          variant="bordered"
                          min={0}
                          max={100}
                        />
                        <Slider
                          aria-label="Saturation"
                          step={1}
                          maxValue={100}
                          minValue={0}
                          value={hsv.s}
                          onChange={(value) => handleHSVChange("s", Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Value (0-100)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={hsv.v.toString()}
                          onChange={(e) => handleHSVChange("v", Number(e.target.value))}
                          className="w-20"
                          size="sm"
                          variant="bordered"
                          min={0}
                          max={100}
                        />
                        <Slider
                          aria-label="Value"
                          step={1}
                          maxValue={100}
                          minValue={0}
                          value={hsv.v}
                          onChange={(value) => handleHSVChange("v", Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleReset}
                  color="danger"
                  startContent={<RefreshCw className="w-4 h-4" />}
                  className="w-full"
                >
                  Reset Values
                </Button>
              </div>

              {/* Preview Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Color Preview</h2>
                <div className="space-y-4">
                  <div
                    className="w-full h-40 rounded-xl shadow-inner overflow-hidden"
                    style={{ backgroundColor: hexValue }}
                  />
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">HSV Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hsvString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hsvString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Hex Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hexValue} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hexValue)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-danger-50 text-danger-foreground rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
          </CardBody>
        </Card>


      </div>
      <InfoSectionHsvToHex />
    </ToolLayout>
  )
}