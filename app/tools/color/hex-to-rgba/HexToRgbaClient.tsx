"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, BookOpen, Copy, Info, Lightbulb, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
import { Button, Card, CardBody, Input, Slider, Divider } from "@nextui-org/react"

// Move hexToRgba function outside of the component
const hexToRgba = (hex: string, alpha: number) => {
  hex = hex.replace(/^#/, "")

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)

  return { r, g, b, a: alpha }
}

export default function HexToRgba() {
  const [hex, setHex] = useState<string>("#000000")
  const [alpha, setAlpha] = useState<number>(1)
  const [error, setError] = useState<string>("")
  const [rgba, setRGBA] = useState({ r: 0, g: 0, b: 0, a: 1 })

  useEffect(() => {
    const isValidHex = /^#?([0-9A-F]{3}){1,2}$/i.test(hex)
    if (!isValidHex) {
      setError("Please enter a valid Hex color code")
      return
    }
    setError("")
    const newRgba = hexToRgba(hex, alpha)
    setRGBA(newRgba)
  }, [hex, alpha]) // Remove hexToRgba from dependencies

  const rgbaString = useMemo(() => {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a.toFixed(2)})`
  }, [rgba])

  const hexString = useMemo(() => {
    return hex.startsWith("#") ? hex : `#${hex}`
  }, [hex])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value)
  }

  const handleAlphaChange = (value: number) => {
    setAlpha(value)
  }

  const handleAlphaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setAlpha(value)
    }
  }

  const handleReset = () => {
    setHex("#000000")
    setAlpha(1)
    setError("")
    toast.success("Values reset successfully")
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <ToolLayout
      title="Hex to RGBA Converter"
      description="Convert Hex Color Codes to RGBA with Real-time Preview"
      toolId="678f382c26f06f912191bca4"
    >
      <div className="space-y-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="gap-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Color Input</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Hex Color Code</label>
                      <Input
                        value={hex}
                        onChange={handleHexChange}
                        placeholder="#000000"
                        variant="bordered"
                        size="lg"
                        startContent={<div className="w-4 h-4 rounded-full" style={{ backgroundColor: hexString }} />}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Alpha Value</label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          value={alpha.toString()}
                          onChange={handleAlphaInputChange}
                          className="w-26"
                          size="lg"
                          variant="bordered"
                          min={0}
                          max={1}
                          step={0.01}
                        />
                        <Slider
                          aria-label="Alpha"
                          step={0.01}
                          maxValue={1}
                          minValue={0}
                          value={alpha}
                          onChange={(value) => handleAlphaChange(Array.isArray(value) ? value[0] : value)}
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
                      <label className="text-sm font-medium block mb-2">Hex Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={hexString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(hexString)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">RGBA Value</label>
                      <div className="flex items-center gap-2">
                        <Input value={rgbaString} readOnly variant="bordered" size="lg" />
                        <Button isIconOnly variant="flat" size="lg" onClick={() => handleCopy(rgbaString)}>
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
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Hex to RGBA Converter?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              Hex to RGBA converter is a powerful tool designed for web developers, designers and digital artists. This allows you to easily convert the hexadecimal color code to their RGBA (red, green, blue, alpha). This device is particularly useful when working with web design, CSS styling, or any project, which requires accurate color management with transparency.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              With features such as real-time conversion, interactive alpha slider, and support for both 3-numeric and 6-conductive hex code, the hex to RGBA converter streamlines your workflow and ensures accurate color representation in various formats. This is perfect for making consistent color schemes, adjusting the level of transparency, or the discovery of relationships between hex and RGBA color representations.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/InfosectionImages/HexToRgbaConverterPreview.png?height=400&width=600"
                  alt="Screenshot of the Hex to RGBA Converter interface showing hex input, alpha slider, and color preview"
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
                How to Use the Hex to RGBA Converter?
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter a valid hex color code in the input field (with or without the # symbol).</li>
                <li>Adjust the alpha value using the slider or input field (range: 0 to 1).</li>
                <li>Observe the real-time color preview updating as you modify the values.</li>
                <li>View the converted RGBA values in the Color Preview section.</li>
                <li>Use the copy buttons to quickly copy Hex or RGBA values to your clipboard.</li>
                <li>Experiment with different hex codes and alpha values to see how they affect the final color.</li>
                <li>Use the Reset button to quickly return to default values and start a new conversion.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Real-time Hex to RGBA conversion</li>
                <li>Support for both 3-digit and 6-digit hex color codes</li>
                <li>Interactive alpha value slider for precise transparency adjustments</li>
                <li>Live color preview for immediate visual feedback</li>
                <li>One-click copying of Hex and RGBA values to clipboard</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Reset functionality for quick new color explorations</li>
                <li>User-friendly interface with clear, easy-to-read color information</li>
                <li>Error handling for invalid hex codes</li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Ready to simplify your color workflow? Start using our Hex to RGBA Converter now and experience the ease
                of precise color conversion with transparency control. Whether you're a professional web developer
                working on complex projects or a hobbyist exploring color theory, our tool provides the accuracy and
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

