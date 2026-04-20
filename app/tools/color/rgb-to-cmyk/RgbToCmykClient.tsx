"use client"

import { useState, useEffect } from "react"
import { AlertCircle, RefreshCw, Copy } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import { Button, Card, CardBody, Input, Slider, Tabs, Tab } from "@nextui-org/react"
import InfoSectionRgbToCmyk from "./info-section"

function rgbToCmyk(r: number, g: number, b: number) {
  let c = 1 - r / 255
  let m = 1 - g / 255
  let y = 1 - b / 255
  const k = Math.min(c, m, y)

  c = (c - k) / (1 - k) || 0
  m = (m - k) / (1 - k) || 0
  y = (y - k) / (1 - k) || 0

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  }
}

export default function RgbToCmyk() {
  const [rgb, setRGB] = useState({ r: 0, g: 0, b: 0 })
  const [cmykValue, setCMYKValue] = useState<string>("C: 0%, M: 0%, Y: 0%, K: 100%")
  const [error, setError] = useState<string>("")

  const handleRGBChange = (color: keyof typeof rgb, value: number) => {
    setRGB((prev) => ({ ...prev, [color]: value }))
  }

  const handleReset = () => {
    setRGB({ r: 0, g: 0, b: 0 })
    setCMYKValue("C: 0%, M: 0%, Y: 0%, K: 100%")
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  useEffect(() => {
    const { r, g, b } = rgb
    const { c, m, y, k } = rgbToCmyk(r, g, b)
    setCMYKValue(`C: ${c}%, M: ${m}%, Y: ${y}%, K: ${k}%`)
  }, [rgb])

  return (
    <ToolLayout
      title="RGB to CMYK Converter"
      description="Convert RGB Color Codes to CMYK with Real-time Preview"
      toolId="678f382d26f06f912191bcab"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="gap-6 p-6">
              <h2 className="text-xl font-semibold text-default-900">RGB Input</h2>
              <div className="space-y-4">
                {["r", "g", "b"].map((color) => (
                  <div key={color}>
                    <label htmlFor={`${color}-input`} className="block text-sm font-medium text-default-700 mb-2">
                      {color.toUpperCase()} (0-255)
                    </label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id={`${color}-input`}
                        type="number"
                        min={0}
                        max={255}
                        value={rgb[color as keyof typeof rgb].toString()}
                        onChange={(e) => handleRGBChange(color as keyof typeof rgb, Number(e.target.value))}
                        className="w-20"
                      />
                      <Slider
                        aria-label={`${color.toUpperCase()} value`}
                        value={rgb[color as keyof typeof rgb]}
                        onChange={(value) =>
                          handleRGBChange(color as keyof typeof rgb, Array.isArray(value) ? value[0] : value)
                        }
                        step={1}
                        maxValue={255}
                        minValue={0}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button onPress={handleReset} color="primary" className="w-full mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </CardBody>
          </Card>

          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="gap-6 p-6">
              <h2 className="text-xl font-semibold text-default-900">Color Preview</h2>
              <div
                className="w-full h-40 rounded-lg shadow-inner mb-4"
                style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
              ></div>
              <Tabs aria-label="Color formats">
                <Tab key="rgb" title="RGB">
                  <div className="flex items-center justify-between mt-2">
                    <span>{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      onPress={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Tab>
                <Tab key="cmyk" title="CMYK">
                  <div className="flex items-center justify-between mt-2">
                    <span>{cmykValue}</span>
                    <Button isIconOnly variant="flat" size="sm" onPress={() => handleCopy(cmykValue)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        {error && (
          <div className="bg-danger-50 text-danger-foreground p-4 rounded-lg flex items-center mt-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}


      </div>
      <InfoSectionRgbToCmyk />
    </ToolLayout>
  )
}

