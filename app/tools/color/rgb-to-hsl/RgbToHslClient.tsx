"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from 'lucide-react'
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move rgbToHsl function outside of the component
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}

export default function RGBToHSL() {
  const [rgb, setRGB] = useState({ r: 0, g: 0, b: 0 })
  const [hslValue, setHSLValue] = useState<string>("hsl(0, 0%, 0%)")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { r, g, b } = rgb
    const [h, s, l] = rgbToHsl(r, g, b)
    setHSLValue(`hsl(${h}, ${s}%, ${l}%)`)
  }, [rgb])

  const rgbString = useMemo(() => {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }, [rgb])

  const handleRGBChange = (color: keyof typeof rgb, value: number) => {
    setRGB(prev => ({ ...prev, [color]: value }))
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
      title="RGB to HSL Converter"
      description="Convert RGB Color Codes to HSL with Real-time Preview"
      toolId="678f382d26f06f912191bcaf"
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
                      <label className="text-sm font-medium block mb-2">HSL Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hslValue} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hslValue)}>
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

        <Card className="mt-8 bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About RGB to HSL Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The RGB to HSL Converter is an advanced tool designed for web developers, designers, and digital artists. It allows you to easily convert RGB (Red, Green, Blue) color values to their HSL (Hue, Saturation, Lightness) equivalents. This tool is particularly useful when working with web design, CSS styling, or any project that requires precise color management and conversion between different color models.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With features like real-time conversion, interactive sliders, and support for both RGB and HSL formats, the RGB to HSL Converter streamlines your workflow and ensures accurate color representation across different formats. It's perfect for creating consistent color schemes, adjusting color properties, or simply exploring the relationship between RGB and HSL color representations.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/InfosectionImages/RGBToHSLPreview.png?height=400&width=600"
                  alt="Screenshot of the RGB to HSL Converter interface showing RGB sliders and color preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 id="how-to-use" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the RGB to HSL Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Adjust the Red slider (0-255) to set the red component of the color.</li>
                <li>Use the Green slider (0-255) to adjust the green component of the color.</li>
                <li>Set the Blue slider (0-255) to control the blue component of the color.</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted HSL value in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy RGB or HSL values to your clipboard.</li>
                <li>Experiment with different RGB combinations to see how they translate to HSL values.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time RGB to HSL conversion</li>
                <li>Interactive sliders for intuitive RGB value adjustments</li>
                <li>Support for both RGB and HSL color formats</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of RGB and HSL values to clipboard</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Reset functionality for quick new color explorations</li>
                <li>User-friendly interface with clear, easy-to-read color information</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to simplify your color workflow? Start using our RGB to HSL Converter now and experience the ease of precise color conversion with intuitive controls. Whether you're a professional web developer working on complex projects or a hobbyist exploring color theory, our tool provides the accuracy and functionality you need. Try it out today and see how it can streamline your design process and enhance your understanding of color spaces!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}
