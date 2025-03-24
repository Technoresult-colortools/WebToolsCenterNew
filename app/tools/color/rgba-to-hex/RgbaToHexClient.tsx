"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move rgbaToHex function outside of the component
const rgbaToHex = (r: number, g: number, b: number, a: number) => {
  const toHex = (value: number) => {
    const hex = value.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const colorHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0")
  return { colorHex, alphaHex }
}

export default function RGBAToHex() {
  const [rgba, setRGBA] = useState({ r: 0, g: 0, b: 0, a: 1 })
  const [hexValue, setHexValue] = useState<string>("#000000")
  const [hexAlpha, setHexAlpha] = useState<string>("ff")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const { r, g, b, a } = rgba
    const { colorHex, alphaHex } = rgbaToHex(r, g, b, a)
    setHexValue(colorHex)
    setHexAlpha(alphaHex)
  }, [rgba])

  const rgbaString = useMemo(() => {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a.toFixed(2)})`
  }, [rgba])

  const handleRGBAChange = (color: keyof typeof rgba, value: number) => {
    setRGBA((prev) => ({ ...prev, [color]: value }))
  }

  const handleReset = () => {
    setRGBA({ r: 0, g: 0, b: 0, a: 1 })
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="RGBA to Hex Converter"
      description="Convert RGBA Color Codes to Hex with Real-time Preview"
      toolId="678f382c26f06f912191bca5"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">RGBA Input</h2>
                  <div className="space-y-4">
                    {["r", "g", "b"].map((color) => (
                      <div key={color}>
                        <label className="text-sm font-medium block mb-2">{color.toUpperCase()} (0-255)</label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            value={rgba[color as keyof typeof rgba].toString()}
                            onChange={(e) => handleRGBAChange(color as keyof typeof rgba, Number(e.target.value))}
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
                            value={rgba[color as keyof typeof rgba]}
                            onChange={(value) =>
                              handleRGBAChange(color as keyof typeof rgba, Array.isArray(value) ? value[0] : value)
                            }
                            className="flex-grow"
                          />
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="text-sm font-medium block mb-2">Alpha (0-1)</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={rgba.a.toFixed(2)}
                          onChange={(e) => handleRGBAChange("a", Number(e.target.value))}
                          className="w-20"
                          size="sm"
                          variant="bordered"
                          min={0}
                          max={1}
                          step={0.01}
                        />
                        <Slider
                          aria-label="Alpha value"
                          step={0.01}
                          maxValue={1}
                          minValue={0}
                          value={rgba.a}
                          onChange={(value) => handleRGBAChange("a", Array.isArray(value) ? value[0] : value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onPress={handleReset}
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
                  <div className="relative w-full h-40 rounded-xl shadow-inner overflow-hidden">
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        backgroundColor: rgbaString,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    />
                  </div>
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">RGBA Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={rgbaString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(rgbaString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Hex Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hexValue + hexAlpha} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hexValue + hexAlpha)}>
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
                About RGBA to Hex Converter
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              Hex converter from RGBA is an advanced tool designed for web developers, designers and digital artists. This allows you to easily convert RGBA (red, green, blue, alpha) colors to their hexadesimal counterparts. This tool is particularly useful when working with web design, CSS styling, or any project, which requires accurate color management and conversion between various color representations.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              With features such as real -time conversion, interactive sliders and support for both RGBA and Hex forms, the hex converter from RGBA streamlines your workflow and ensures accurate color representation in various formats. This is perfect for constant color schemes, adjusting color properties, or simply searching for relationships between RGBA and Hex color representations.

              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/InfosectionImages/RGBAToHexPreview.png?height=400&width=600"
                  alt="Screenshot of the RGBA to Hex Converter interface showing RGBA sliders and color preview"
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
                How to Use the RGBA to Hex Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Adjust the Red slider (0-255) to set the red component of the color.</li>
                <li>Use the Green slider (0-255) to adjust the green component of the color.</li>
                <li>Set the Blue slider (0-255) to control the blue component of the color.</li>
                <li>Adjust the Alpha slider (0-1) to set the transparency of the color.</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted Hex value (including alpha) in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy RGBA or Hex values to your clipboard.</li>
                <li>Experiment with different RGBA combinations to see how they translate to Hex values.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time RGBA to Hex conversion</li>
                <li>Interactive sliders for intuitive RGBA value adjustments</li>
                <li>Support for both RGBA and Hex color formats</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of RGBA and Hex values to clipboard</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Reset functionality for quick new color explorations</li>
                <li>User-friendly interface with clear, easy-to-read color information</li>
                <li>Alpha channel support for transparent colors</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to simplify your color workflow? Start using our RGBA to Hex Converter now and experience the ease
                of precise color conversion with intuitive controls. Whether you're a professional web developer working
                on complex projects or a designer exploring new color palettes with transparency, our tool provides the
                accuracy and functionality you need. Try it out today and see how it can streamline your color
                management process and expand your understanding of color spaces and opacity!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

