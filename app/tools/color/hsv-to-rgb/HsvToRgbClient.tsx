"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move hsvToRgb function outside of the component
const hsvToRgb = (h: number, s: number, v: number) => {
  s /= 100
  v /= 100
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let [r, g, b] = [0, 0, 0]

  if (h >= 0 && h < 60) {
    ;[r, g, b] = [c, x, 0]
  } else if (h >= 60 && h < 120) {
    ;[r, g, b] = [x, c, 0]
  } else if (h >= 120 && h < 180) {
    ;[r, g, b] = [0, c, x]
  } else if (h >= 180 && h < 240) {
    ;[r, g, b] = [0, x, c]
  } else if (h >= 240 && h < 300) {
    ;[r, g, b] = [x, 0, c]
  } else if (h >= 300 && h < 360) {
    ;[r, g, b] = [c, 0, x]
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
}

export default function HSVToRGB() {
  const [hsv, setHSV] = useState({ h: 0, s: 0, v: 0 })
  const [rgbValue, setRGBValue] = useState<string>("rgb(0, 0, 0)")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { h, s, v } = hsv
    const [r, g, b] = hsvToRgb(h, s, v)
    setRGBValue(`rgb(${r}, ${g}, ${b})`)
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
      title="HSV to RGB Converter"
      description="Convert HSV Color Codes to RGB with Real-time Preview"
      toolId="678f382c26f06f912191bca6"
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
                    style={{ backgroundColor: rgbValue }}
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
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About HSV to RGB Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              RGB converter from HSV is an advanced tool designed for web developers, designers and digital artists. This allows you to easily convert HSV (hue, saturation, value) color values ​​to their RGB (red, green, blue) equivalent. This tool is particularly useful when working with web design, digital imaging, or any project, requiring accurate color management and conversion between different color models.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              With facilities such as real -time conversion, interactive sliders, and support for both HSV and RGB forms, HSV to RGB converter streamlines your workflow and ensures accurate color representation in various formats. This is perfect for making frequent color schemes, adjusting color properties, or searching for relationships between HSV and RGB color representations only.
              </p>

              <h2
                id="how-to-use"
                className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the HSV to RGB Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Adjust the Hue slider (0-359) to set the base color.</li>
                <li>Use the Saturation slider (0-100) to adjust the color intensity.</li>
                <li>Set the Value slider (0-100) to control the brightness of the color.</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted RGB value in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy HSV or RGB values to your clipboard.</li>
                <li>Experiment with different HSV combinations to see how they translate to RGB values.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time HSV to RGB conversion</li>
                <li>Interactive sliders for intuitive HSV value adjustments</li>
                <li>Support for both HSV and RGB color formats</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of HSV and RGB values to clipboard</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Reset functionality for quick new color explorations</li>
                <li>User-friendly interface with clear, easy-to-read color information</li>
              </ul>


              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to simplify your color workflow? Start using our HSV to RGB Converter now and experience the ease
                of precise color conversion with intuitive controls. Whether you're a professional web developer working
                on complex projects or a hobbyist exploring color theory, our tool provides the accuracy and
                functionality you need. Try it out today and see how it can streamline your design process and enhance
                your understanding of color spaces!
              </p>

          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

