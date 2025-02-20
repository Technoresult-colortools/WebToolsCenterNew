"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// CMYK to RGB conversion function
const cmykToRgb = (c: number, m: number, y: number, k: number) => {
  const r = Math.round(255 * (1 - c / 100) * (1 - k / 100))
  const g = Math.round(255 * (1 - m / 100) * (1 - k / 100))
  const b = Math.round(255 * (1 - y / 100) * (1 - k / 100))
  return { r, g, b }
}

export default function CMYKToRGB() {
  const [cmyk, setCMYK] = useState({ c: 0, m: 0, y: 0, k: 0 })
  const [rgb, setRGB] = useState({ r: 255, g: 255, b: 255 })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { c, m, y, k } = cmyk
    if ([c, m, y, k].some((v) => v < 0 || v > 100)) {
      setError("Please enter valid CMYK values (0-100).")
    } else {
      setError("")
      setRGB(cmykToRgb(c, m, y, k))
    }
  }, [cmyk])

  const rgbString = useMemo(() => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, [rgb])
  const hexString = useMemo(
    () =>
      `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`,
    [rgb],
  )
  const cmykString = useMemo(() => `${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%`, [cmyk])

  const handleCMYKChange = (color: keyof typeof cmyk, value: number) => {
    setCMYK((prev) => ({ ...prev, [color]: Math.max(0, Math.min(100, value)) }))
  }

  const handleReset = () => {
    setCMYK({ c: 0, m: 0, y: 0, k: 0 })
    setRGB({ r: 255, g: 255, b: 255 })
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="CMYK to RGB Converter"
      description="Convert CMYK Color Codes to RGB with Real-time Preview"
      toolId="678f382d26f06f912191bca8"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100 shadow-md">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">CMYK Input</h2>
                  <div className="space-y-4">
                    {["c", "m", "y", "k"].map((color) => (
                      <div key={color}>
                        <label className="text-sm font-medium block mb-2">{color.toUpperCase()} (0-100)</label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            value={cmyk[color as keyof typeof cmyk].toString()}
                            onChange={(e) => handleCMYKChange(color as keyof typeof cmyk, Number(e.target.value))}
                            className="w-20"
                            size="sm"
                            variant="bordered"
                            min={0}
                            max={100}
                          />
                          <Slider
                            aria-label={`${color.toUpperCase()} value`}
                            step={1}
                            maxValue={100}
                            minValue={0}
                            value={cmyk[color as keyof typeof cmyk]}
                            onChange={(value) =>
                              handleCMYKChange(color as keyof typeof cmyk, Array.isArray(value) ? value[0] : value)
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
                      <label className="text-sm font-medium block mb-2">CMYK Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={cmykString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(cmykString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
                      <label className="text-sm font-medium block mb-2">Hex Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hexString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hexString)}>
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
                About CMYK to RGB Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The CMYK to RGB Converter is a sophisticated tool designed for graphic designers, print professionals,
                and digital artists. It allows you to accurately convert colors from the CMYK color model (used in
                print) to the RGB color model (used in digital displays). Whether you're preparing artwork for both
                print and digital media or simply exploring color spaces, our tool provides precise and easy-to-use
                color conversion.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
                With features like real-time conversion, interactive sliders, and support for multiple color formats
                (CMYK, RGB, HEX), the CMYK to RGB Converter is an invaluable resource for anyone working across print
                and digital mediums. It's perfect for ensuring color consistency between different projects, adapting
                print designs for digital use, or simply understanding the relationship between CMYK and RGB color
                spaces.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/CMYKtoRGBPreview.png?height=400&width=600"
                  alt="Screenshot of the CMYK to RGB Converter interface showing CMYK input sliders, RGB output, and color preview"
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
                How to Use the CMYK to RGB Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Adjust the CMYK values using the sliders or input fields (range: 0-100 for each component).</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted RGB values and HEX code in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy CMYK, RGB, or HEX values to your clipboard.</li>
                <li>Experiment with different CMYK combinations to see how they translate to RGB.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
                <li>Refer to the color preview to visually confirm the converted color.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time CMYK to RGB conversion</li>
                <li>Interactive sliders and input fields for precise CMYK value adjustments</li>
                <li>Support for multiple color formats: CMYK, RGB, and HEX</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of color values to clipboard</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Reset functionality for quick new color explorations</li>
                <li>User-friendly interface with clear, easy-to-read color information</li>
                <li>Accurate conversion algorithms ensuring color fidelity</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>
                  <strong>Print to Digital Conversion:</strong> Easily adapt print designs for digital use by converting
                  CMYK colors to RGB.
                </li>
                <li>
                  <strong>Graphic Design:</strong> Ensure color consistency when working on projects that span both
                  print and digital mediums.
                </li>
                <li>
                  <strong>Web Design:</strong> Convert print color references to web-safe RGB colors for accurate online
                  representation.
                </li>
                <li>
                  <strong>Digital Photography:</strong> Convert CMYK color profiles to RGB for optimal display on
                  digital screens.
                </li>
                <li>
                  <strong>Brand Identity:</strong> Maintain color consistency across various brand materials in both
                  print and digital formats.
                </li>
                <li>
                  <strong>Education:</strong> Learn about color theory and the relationship between CMYK and RGB color
                  spaces.
                </li>
                <li>
                  <strong>Print Preparation:</strong> Preview how CMYK colors might appear on RGB displays before
                  printing.
                </li>
                <li>
                  <strong>Color Exploration:</strong> Experiment with color combinations and see how they translate
                  between color models.
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to bridge the gap between print and digital color spaces? Start using our CMYK to RGB Converter
                now and experience the power of precise color conversion and analysis. Whether you're a professional
                designer working on cross-media projects or a curious artist exploring color relationships, our tool
                provides the accuracy and functionality you need. Try it out today and see how it can streamline your
                workflow and enhance your understanding of color spaces!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

