"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move hslToRgb function outside of the component
const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))]
}

export default function HSLToRGB() {
  const [hsl, setHSL] = useState({ h: 0, s: 0, l: 0 })
  const [rgbValue, setRGBValue] = useState<string>("rgb(0, 0, 0)")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { h, s, l } = hsl
    const [r, g, b] = hslToRgb(h, s, l)
    setRGBValue(`rgb(${r}, ${g}, ${b})`)
  }, [hsl])

  const hslString = useMemo(() => {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  }, [hsl])

  const handleHSLChange = (color: keyof typeof hsl, value: number) => {
    setHSL((prev) => ({ ...prev, [color]: value }))
  }

  const handleReset = () => {
    setHSL({ h: 0, s: 0, l: 0 })
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="HSL to RGB Converter"
      description="Convert HSL Color Codes to RGB with Real-time Preview"
      toolId="678f382d26f06f912191bcac"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100 shadow-md">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">HSL Input</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Hue (0-359)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={hsl.h.toString()}
                          onChange={(e) => handleHSLChange("h", Number(e.target.value))}
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
                          value={hsl.h}
                          onChange={(value) => handleHSLChange("h", Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Saturation (0-100)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={hsl.s.toString()}
                          onChange={(e) => handleHSLChange("s", Number(e.target.value))}
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
                          value={hsl.s}
                          onChange={(value) => handleHSLChange("s", Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Lightness (0-100)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={hsl.l.toString()}
                          onChange={(e) => handleHSLChange("l", Number(e.target.value))}
                          className="w-20"
                          size="sm"
                          variant="bordered"
                          min={0}
                          max={100}
                        />
                        <Slider
                          aria-label="Lightness"
                          step={1}
                          maxValue={100}
                          minValue={0}
                          value={hsl.l}
                          onChange={(value) => handleHSLChange("l", Array.isArray(value) ? value[0] : value)}
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
                    style={{ backgroundColor: rgbValue }}
                  />
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">HSL Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hslString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hslString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">RGB Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={rgbValue} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(rgbValue)}>
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
                About HSL to RGB Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The HSL to RGB Converter is an advanced tool designed for web developers, designers, and digital
                artists. It allows you to easily convert HSL (Hue, Saturation, Lightness) color values to their RGB
                (Red, Green, Blue) equivalents. This tool is particularly useful when working with web design, digital
                imaging, or any project that requires precise color management and conversion between different color
                models.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With features like real-time conversion, interactive sliders, and support for both HSL and RGB formats,
                the HSL to RGB Converter streamlines your workflow and ensures accurate color representation across
                different formats. It's perfect for creating consistent color schemes, adjusting color properties, or
                simply exploring the relationship between HSL and RGB color representations.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/HSLToRGBPreview.png?height=400&width=600"
                  alt="Screenshot of the HSL to RGB Converter interface showing HSL sliders and color preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the HSL to RGB Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Adjust the Hue slider (0-359) to set the base color.</li>
                <li>Use the Saturation slider (0-100) to adjust the color intensity.</li>
                <li>Set the Lightness slider (0-100) to control the brightness of the color.</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted RGB value in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy HSL or RGB values to your clipboard.</li>
                <li>Experiment with different HSL combinations to see how they translate to RGB values.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time HSL to RGB conversion</li>
                <li>Interactive sliders for intuitive HSL value adjustments</li>
                <li>Support for both HSL and RGB color formats</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of HSL and RGB values to clipboard</li>
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
                  <strong>Web Development:</strong> Easily convert HSL colors to RGB for use in CSS and HTML.
                </li>
                <li>
                  <strong>Graphic Design:</strong> Translate HSL values to RGB codes for software that primarily uses
                  RGB color representation.
                </li>
                <li>
                  <strong>UI/UX Design:</strong> Create consistent color schemes by converting between HSL and RGB
                  formats.
                </li>
                <li>
                  <strong>Digital Art:</strong> Experiment with color properties using HSL and obtain RGB values for use
                  in various digital art software.
                </li>
                <li>
                  <strong>Brand Identity:</strong> Maintain color consistency across various digital platforms by
                  converting between color models.
                </li>
                <li>
                  <strong>Education:</strong> Learn about color theory and the relationship between different color
                  representations.
                </li>
                <li>
                  <strong>Accessibility Testing:</strong> Adjust color properties to ensure proper contrast and
                  readability in web designs.
                </li>
                <li>
                  <strong>Color Exploration:</strong> Experiment with HSL color combinations and see their RGB
                  equivalents for creative inspiration.
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to simplify your color workflow? Start using our HSL to RGB Converter now and experience the ease
                of precise color conversion with intuitive controls. Whether you're a professional web developer working
                on complex projects or a hobbyist exploring color theory, our tool provides the accuracy and
                functionality you need. Try it out today and see how it can streamline your design process and enhance
                your understanding of color spaces!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

