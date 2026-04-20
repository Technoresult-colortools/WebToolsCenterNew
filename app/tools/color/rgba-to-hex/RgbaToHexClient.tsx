"use client"

import { useState, useEffect, useMemo } from "react"
import { AlertCircle, Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { toast } from "react-hot-toast"
import InfoSectionRgbaToHex from "./info-section"
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


      </div>
      <InfoSectionRgbaToHex />
    </ToolLayout>
  )
}

