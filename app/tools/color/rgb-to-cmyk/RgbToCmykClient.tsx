"use client"

import { useState, useEffect } from "react"
import { AlertCircle, BookOpen, Info, Lightbulb, RefreshCw, Copy, Eye, Code } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import { Button, Card, CardBody, Input, Slider, Tabs, Tab } from "@nextui-org/react"

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

        <Card className="mt-6 bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About RGB to CMYK Converter
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The CMYK converter from RGB is an advanced tool designed for graphic designers, print professionals and digital artists. This allows you to easily convert RGB (red, green, blue) color values ​​to their cmk (cyan, magenta, yellow, key/black). This tool is particularly useful when preparing a digital design for print, as most printing processes use the cmyk color model.
            </p>


            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use RGB to CMYK Converter?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Adjust the Red slider (0-255) to set the red component of the color.</li>
              <li>Use the Green slider (0-255) to adjust the green component of the color.</li>
              <li>Set the Blue slider (0-255) to control the blue component of the color.</li>
              <li>Observe the real-time color preview updating as you modify the values.</li>
              <li>View the converted CMYK value in the Color Preview section.</li>
              <li>Use the copy buttons to quickly copy RGB or CMYK values to your clipboard.</li>
              <li>Experiment with different RGB combinations to see how they translate to CMYK values.</li>
              <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
            </ol>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Real-time RGB to CMYK conversion</li>
              <li>Interactive sliders for intuitive RGB value adjustments</li>
              <li>Support for both RGB and CMYK color formats</li>
              <li>Live color preview for immediate visual feedback</li>
              <li>One-click copying of RGB and CMYK values to clipboard</li>
              <li>Responsive design for seamless use on desktop and mobile devices</li>
              <li>Reset functionality for quick new color explorations</li>
              <li>User-friendly interface with clear, easy-to-read color information</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Tips for Effective Use
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Use the sliders for fine-tuning RGB values and observe real-time CMYK conversion.</li>
              <li>Experiment with different RGB combinations to understand their CMYK equivalents.</li>
              <li>Remember that some RGB colors may not have exact CMYK equivalents due to different color gamuts.</li>
              <li>Always test your converted colors in actual print scenarios for the most accurate results.</li>
              <li>Use the copy feature to easily transfer color values to your design software.</li>
              <li>
                Consider the intended print medium when converting colors, as different papers may affect color
                appearance.
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Code className="w-6 h-6 mr-2" />
              Integration Tips
            </h2>
            <p className="text-sm md:text-base text-default-600">
              To make the most of your RGB to CMYK conversions in your projects:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600 mt-2">
              <li>
                Use CSS variables for RGB colors in web projects, making it easier to update if CMYK equivalents change
              </li>
              <li>Create a color palette document that includes both RGB and CMYK values for all project colors</li>
              <li>Implement color profiles in your design software to ensure accurate color representation</li>
              <li>Use the CMYK values when setting up your document color swatches in print design software</li>
              <li>Consider creating a custom color conversion table for frequently used colors in your projects</li>
            </ul>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}

