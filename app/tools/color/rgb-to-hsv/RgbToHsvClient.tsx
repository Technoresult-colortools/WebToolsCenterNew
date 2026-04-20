"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import InfoSectionRgbToHsv from "./info-section"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// RGB to HSV conversion function
const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  let h = 0
  const s = max === 0 ? 0 : diff / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  }
}

export default function RGBToHSV() {
  const [rgb, setRGB] = useState({ r: 0, g: 0, b: 0 })
  const [hsvValue, setHSVValue] = useState<string>("hsv(0, 0%, 0%)")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { r, g, b } = rgb
    const { h, s, v } = rgbToHsv(r, g, b)
    setHSVValue(`hsv(${h}, ${s}%, ${v}%)`)
  }, [rgb])

  const rgbString = useMemo(() => {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }, [rgb])

  const handleRGBChange = (color: keyof typeof rgb, value: number) => {
    setRGB((prev) => ({ ...prev, [color]: Math.max(0, Math.min(255, value)) }))
  }

  const handleReset = () => {
    setRGB({ r: 0, g: 0, b: 0 })
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="RGB to HSV Converter"
      description="Convert RGB Color Codes to HSV with Real-time Preview"
      toolId="678f382c26f06f912191bca7"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">RGB Input</h2>
                  <div className="space-y-4">
                    {["r", "g", "b"].map((color) => (
                      <div key={color}>
                        <label className="text-sm font-medium block mb-2">{color.toUpperCase()} (0-255)</label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            value={rgb[color as keyof typeof rgb].toString()}
                            onChange={(e) => handleRGBChange(color as keyof typeof rgb, Number(e.target.value))}
                            className="w-20"
                            size="sm"
                            variant="bordered"
                            min={0}
                            max={255}
                          />
                          <Slider
                            aria-label={`${color.toUpperCase()} value`}
                            step={1}
                            maxValue={255}
                            minValue={0}
                            value={rgb[color as keyof typeof rgb]}
                            onChange={(value) =>
                              handleRGBChange(color as keyof typeof rgb, Array.isArray(value) ? value[0] : value)
                            }
                            className="flex-grow"
                          />
                        </div>
                      </div>
                    ))}
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
                    style={{ backgroundColor: rgbString }}
                  />
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">RGB Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={rgbString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(rgbString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">HSV Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hsvValue} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hsvValue)}>
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
      <InfoSectionRgbToHsv />
    </ToolLayout>
  )
}

