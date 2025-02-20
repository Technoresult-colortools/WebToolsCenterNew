"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
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
      <div className="max-w-4xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100 shadow-md">
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

        {/* About section */}
        <Card className="mt-8 bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About RGB to HSV Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The RGB to HSV Converter is an advanced tool designed for web developers, designers, and digital
                artists. It allows you to easily convert RGB (Red, Green, Blue) color values to their HSV (Hue,
                Saturation, Value) equivalents. This tool is particularly useful when working with color selection,
                image processing, or any project that requires precise color management and conversion between different
                color models.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With features like real-time conversion, interactive sliders, and support for both RGB and HSV formats,
                the RGB to HSV Converter streamlines your workflow and ensures accurate color representation across
                different formats. It's perfect for creating consistent color schemes, adjusting color properties, or
                simply exploring the relationship between RGB and HSV color representations.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/RGBToHSVPreview.png?height=400&width=600"
                  alt="Screenshot of the RGB to HSV Converter interface showing RGB sliders and color preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the RGB to HSV Converter?
              </h2>
              <ol className="list-decimal list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Adjust the Red slider (0-255) to set the red component of the color.</li>
                <li>Use the Green slider (0-255) to adjust the green component of the color.</li>
                <li>Set the Blue slider (0-255) to control the blue component of the color.</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted HSV value in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy RGB or HSV values to your clipboard.</li>
                <li>Experiment with different RGB combinations to see how they translate to HSV values.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time RGB to HSV conversion</li>
                <li>Interactive sliders for intuitive RGB value adjustments</li>
                <li>Support for both RGB and HSV color formats</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of RGB and HSV values to clipboard</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Reset functionality for quick new color explorations</li>
                <li>User-friendly interface with clear, easy-to-read color information</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>
                  <strong>Web Development:</strong> Easily convert RGB colors to HSV for use in advanced color
                  manipulation in web applications.
                </li>
                <li>
                  <strong>Graphic Design:</strong> Translate RGB values to HSV for software that utilizes HSV color
                  representation for more intuitive color selection.
                </li>
                <li>
                  <strong>UI/UX Design:</strong> Create consistent color schemes by converting between RGB and HSV
                  formats for precise color adjustments.
                </li>
                <li>
                  <strong>Digital Art:</strong> Experiment with color properties using RGB and obtain HSV values for use
                  in various digital art software that prefer HSV for color mixing.
                </li>
                <li>
                  <strong>Image Processing:</strong> Convert RGB values to HSV for advanced image processing techniques
                  that work better in the HSV color space.
                </li>
                <li>
                  <strong>Data Visualization:</strong> Use HSV color model for creating more perceptually uniform color
                  scales in data visualizations.
                </li>
                <li>
                  <strong>Computer Vision:</strong> Convert RGB images to HSV for improved object detection and tracking
                  algorithms.
                </li>
                <li>
                  <strong>Color Theory Education:</strong> Learn about the relationship between RGB and HSV color models
                  to deepen understanding of color theory.
                </li>
               </ul> 
            

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to enhance your color workflow? Start using our RGB to HSV Converter now and experience the ease
                of precise color conversion with intuitive controls. Whether you're a professional developer working on
                complex color manipulation tasks or a designer exploring new color palettes, our tool provides the
                accuracy and functionality you need. Try it out today and see how it can streamline your color
                management process and expand your understanding of color spaces!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

